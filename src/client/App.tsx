import React, { useState, useCallback } from 'react'
import { MessageList, Debug, MessageForm, AppStyle, MessageItem } from './styles'
import { useRef } from 'react'
import { useEffect } from 'react'

export interface Message {
  info: string,
  source: string
}

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState("")
  const messageListRef = useRef<HTMLUListElement>(null)

  const toggleConnection = useCallback(() => {
    const shouldConnect = !isConnected

    if (shouldConnect) {
      const wsNew = new WebSocket('ws://localhost:8080')

      wsNew.onopen = function open(e) {
        wsNew.send('I connected :D')
        console.log(this)
        console.log(e)
      }

      wsNew.onmessage = function incoming({ data }) {
        let message: Message
        try {
          message = JSON.parse(data)
        } catch (err) {
          message = { info: data, source: 'server' }
        }

        setMessages(messages => [...messages, message])
      }

      setWs(wsNew)
    } else if (ws) {
      ws.close()
    }

    setIsConnected(shouldConnect)
  }, [isConnected, setIsConnected, setMessages])

  const onMessageSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (ws && ws.readyState === 1) {
      ws.send(messageText)

      const message: Message = { info: messageText, source: 'self' }
      setMessages(messages => [...messages, message])

      setMessageText("")
    } else {
      alert("Error. WS is either undefined or has bad readystate of " + ws?.readyState)
    }
  }, [ws, setMessages, messageText, setMessageText, messageListRef.current?.scrollHeight])

  useEffect(() => {
    const finalMessage = messages[messages.length - 1]

    if (finalMessage?.source === 'self') {
      messageListRef.current?.querySelector('li:last-child')?.scrollIntoView()
    }
  }, [messages, messageListRef])

  return (
    <AppStyle>
      <h1>Dots</h1>
      <button onClick={toggleConnection}>{isConnected ? 'Disconnect' : 'Connect'}</button>
      <Debug>
        <MessageForm onSubmit={onMessageSubmit}>
          <textarea placeholder="Message..." value={messageText} onChange={e => setMessageText(e.target.value)}></textarea>
          <button type="submit" disabled={!ws || ws.readyState !== 1}>Send message</button>
        </MessageForm>
        <MessageList ref={messageListRef}>
          {messages.map(({ info, source }, i) => <MessageItem key={i}><span>{source}</span>{info}</MessageItem>)}
        </MessageList>
      </Debug>
    </AppStyle>
  )
}

export default App
