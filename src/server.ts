import WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 8080 })

console.log('doing somethin!')

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message)
  })

  ws.send('you connected :D')
})
