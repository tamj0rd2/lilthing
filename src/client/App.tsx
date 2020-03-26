import React, { useState, useCallback } from 'react'
import { MessageList, Debug, MessageForm, AppStyle } from './styles'

export type Message = { info: string }

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [received, setReceived] = useState<Message[]>([])

  const toggleConnection = useCallback(() => {
    const shouldConnect = !isConnected

    if (shouldConnect) {
      const wsNew = new WebSocket('ws://localhost:8080')

      wsNew.onopen = function open() {
        wsNew.send('I connected :D')
      }

      wsNew.onmessage = function incoming({ data }) {
        let message: Message
        try {
          message = JSON.parse(data)
        } catch (err) {
          message = { info: data }
        }

        setReceived(received => [...received, message])
      }

      setWs(wsNew)
    } else if (ws) {
      ws.close()
    }

    setIsConnected(shouldConnect)
  }, [isConnected, setIsConnected, setReceived])

  return (
    <AppStyle>
      <h1>Dots</h1>
      <button onClick={toggleConnection}>{isConnected ? 'Disconnect' : 'Connect'}</button>
      <Debug>
        <MessageForm>
          <textarea placeholder="Message..."></textarea>
          <button type="submit">Send message</button>
        </MessageForm>
        <MessageList>
          {received.slice().reverse().map((message, index) => <li key={message.info}>{message.info}</li>)}
        </MessageList>
      </Debug>
    </AppStyle>
  )
}

export default App
