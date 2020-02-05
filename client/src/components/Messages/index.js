import React, { useState, useEffect } from "react";
import firebase from "../Firebase";

function RetrieveMessages(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(props.listId)
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(newMessages);
      });

      return () => unsubscribe()
  }, []);

  return messages;
}

const ChatMessages = (props) => {
  const messageList = RetrieveMessages(props);

  return (
    <div className="chat-div">
      <ul>
        {messageList.map(message => (
          <li key={message.id}>
            <div className="message">
              {message.message}
              <code className="user">{message.user}</code>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;
