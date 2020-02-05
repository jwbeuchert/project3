import React, { useState, useContext } from "react";
import firebase from '../Firebase'
import { UserContext } from "../../utils/UserContext";

const Chat = () => {
  const [message, setMessage] = useState('')
  const {dbUser} = useContext(UserContext)

  function onSubmit(e) {
    e.preventDefault()

    firebase
    .firestore()
    .collection('messages')
    .add({
      message,
      dbUser: dbUser._id,
    })
    .then(() => {
      setMessage('')
    })
  }
  
  return (
    <form onSubmit ={onSubmit}>
      <div>
        <input type="text" value={message} onChange={e => setMessage(e.currentTarget.value)}/>
      </div>
      <button>Send Message</button>
    </form>
  )
}

export default Chat