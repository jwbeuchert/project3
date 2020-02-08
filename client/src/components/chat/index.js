import React, { useState, useContext } from "react";
import firebase from "../Firebase";
import { UserContext } from "../../utils/UserContext";
import "./index.css";

const Chat = props => {
  const [message, setMessage] = useState("");
  const { dbUser } = useContext(UserContext);

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .firestore()
      .collection(props.listId)
      .add({
        message,
        dbUser: dbUser.email,
        dbList: props.listId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        setMessage("");
      });
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="chat-form">
        <div className="input-group message-form">
          <input
            type="text"
            className="form-control form-input"
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.currentTarget.value)}
          />
          <div className="input-group-append">
            <button className="message-btn btn-primary">Send Message</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;
