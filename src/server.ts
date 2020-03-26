import WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 8080 })
wss.on('listening', function () {
  console.log('Listening on ws://localhost:8080')
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

process.on('SIGINT', (sig) => {
  console.log()
  wss.close((err) => {
    if (!err) process.exit(0)

    console.log(err.stack)
    process.exit(1)
  })
})
