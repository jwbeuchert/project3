import React, { useState, useEffect } from "react";
import firebase from "../Firebase";
import "./index.css";

function RetrieveMessages(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(props.listId)
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, []);

  return messages;
}

const ChatMessages = props => {
  const messageList = RetrieveMessages(props);

  return (
    <div className="card chat-div">
      <ul className="card-body">
        {messageList.map(message => (
          <li key={message.id}>
            <div className="message">
              <code className="user">{message.dbUser}: </code>
              {message.message}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
