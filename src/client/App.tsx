import React, { useState, useCallback } from 'react'

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [ws, setWs] = useState<WebSocket | null>(null)

  const toggleConnection = useCallback(() => {
    const shouldConnect = !isConnected

    if (shouldConnect) {
      const wsNew = new WebSocket('ws://localhost:8080')

      wsNew.onopen = function open() {
        wsNew.send('I connected :D')
      }

      wsNew.onmessage = function incoming(data) {
        console.log(data)
      }

      setWs(wsNew)
    } else if (ws) {
      ws.close()
    }

    setIsConnected(shouldConnect)
  }, [isConnected, setIsConnected])

  return (
    <>
      <h1>Dots</h1>
      <button onClick={toggleConnection}>{isConnected ? 'Disconnect' : 'Connect'}</button>
    </>
  )
}

export default App
