import styled from 'styled-components'
import { Message } from './App'

export const AppStyle = styled.div`
  button,
  textarea,
  li {
    font-size: 14px;
    font-family: sans-serif;
  }
`

export const Debug = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 30% auto;
  grid-gap: 10px;
  height: 100px;
  height: 250px;
`

export const MessageList = styled.ul`
  border: 2px solid black;
  list-style: none;
  padding: 0;
  margin: 0;

  overflow: scroll;
`

export const MessageItem = styled.li`
  padding: 10px 5px 10px 5px;
  border-bottom: 1px solid black;

  span {
    color: green;
  }

  span::after {
    margin: 0 5px 0 5px;
    border-right: 1px solid black;
    content: '';
  }
`

export const MessageForm = styled.form`
  display: grid;
  grid-template-rows: auto 30px;
  margin-bottom: 0;

  textarea {
    font-size: normal;
    resize: none;
  }
`
