import express from 'express'
import WebSocket from 'ws'
import path from 'path'

const app = express()
const port = 8080

app.use('/static', express.static('dist'))
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))
const server = app.listen(8080, () => console.log(`Listening on http://localhost:${port}`))

const wss = new WebSocket.Server({ server })
wss.on('listening', function () {
  console.log(`Listening on ws://localhost:${port}`)
})

let connectionID = 0
wss.on('connection', function connection(ws) {
  connectionID++

  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  const res = { info: `You're connected with ID ${connectionID} :D` }
  ws.send(JSON.stringify(res))
})

wss.on('close', function closing() {
  console.log('Bye 👋')
})
