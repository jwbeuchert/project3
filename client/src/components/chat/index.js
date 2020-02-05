import React, { useState, useContext } from "react";
import firebase from '../Firebase'
import { UserContext } from "../../utils/UserContext";

const Chat = (props) => {
  const [message, setMessage] = useState('')
  const {dbUser} = useContext(UserContext)

  function onSubmit(e) {
    e.preventDefault()

    firebase
    .firestore()
    .collection(props.listId)
    .add({
      message,
      dbUser: dbUser._id,
      dbList: props.listId
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