import express from 'express'
import WebSocket from 'ws'
import path from 'path'
import { getMiddlewares as getWebpackMiddlewares } from './webpack'
import { Message } from '~client/App'

const app = express()
const port = 8080

app.use('/static', express.static('dist'))
getWebpackMiddlewares().forEach(middleware => app.use(middleware))

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}`))

const wss = new WebSocket.Server({ server })
wss.on('listening', function () {
  console.log(`Listening on ws://localhost:${port}`)
})

let connectionID = 0
wss.on('connection', function connection(ws) {
  const userId = connectionID++

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  ws.on('close', function close(code, reason) {
    console.log(`User ${userId} disconnected`)
    console.dir({ code, reason })
  })

  const res: Message = { info: `You're connected with ID ${userId} :D` }
  ws.send(JSON.stringify(res))
})

wss.on('close', function closing() {
  console.log('Bye 👋')
})
