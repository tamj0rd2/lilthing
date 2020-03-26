import express from 'express'
import WebSocket from 'ws'
import path from 'path'
import { getMiddlewares as getWebpackMiddlewares } from './webpack'
import { Message } from '~client/App'
import { v4 as uuid4 } from 'uuid'

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

const kill = () => {
  wss.close(err => {
    if (err) {
      console.log(err.stack || err)
      process.exit(1)
    }

    console.log('Bye 👋')
    process.exit(0)
  })
}
process.on('SIGINT', kill).on('SIGTERM', kill)

type ExtendedWebSocket = WebSocket & { id: string }

const broadcast = (message: Message, ...excludeIds: string[]) => {
  wss.clients.forEach(client => {
    if (!excludeIds.includes((client as ExtendedWebSocket).id)) {
      client.send(JSON.stringify(message))
    }
  })
}

wss.on('connection', function connection(ws: ExtendedWebSocket) {
  ws.id = uuid4()

  ws.on('message', function incoming(message) {
    console.log(`received from ${ws.id}: ${message}`)
    const forwardMsg: Message = { info: message.toString(), source: ws.id }
    broadcast(forwardMsg, ws.id)
  })

  ws.on('close', function close(code, reason) {
    const logmsg = `${ws.id} disconnected`
    console.log(logmsg)
    const msg: Message = { info: logmsg, source: 'server' }
    broadcast(msg, ws.id)
  })

  const res: Message = { info: `You're connected with ID ${ws.id} :D`, source: 'server' }
  ws.send(JSON.stringify(res))
})
