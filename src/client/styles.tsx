import styled from 'styled-components'

export const AppStyle = styled.div`
  button,
  textarea,
  li {
    font-size: 14px;
    font-family: sans-serif;
  }
`

export const MessageList = styled.ul`
  border: 2px solid black;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 5px 10px 5px;
    border: 1px solid black;
  }

  li::before {
    content: "server | ";
    color: green;
  }
`

export const Debug = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 30% auto;
  grid-gap: 10px;
  min-height: 300px;
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
