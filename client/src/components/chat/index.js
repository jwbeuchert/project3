import React, { useState } from "react";
import firebase from '../Firebase'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [user, setUser] = useState('')

  function onSubmit(e) {
    e.preventDefault()

    firebase
    .firestore()
    .collection('messages')
    .add({
      message,
      user
    })
    .then(() => {
      setMessage('')
      setUser('')
    })
  }
  
  return (
    <form onSubmit ={onSubmit}>
      <div>
        <input type="text" value={message} onChange={e => setMessage(e.currentTarget.value)}/>
        <input type="text" value={user} onChange={e => setUser(e.currentTarget.value)}/>
      </div>
      <button>Send Message</button>
    </form>
  )
}

export default Chat