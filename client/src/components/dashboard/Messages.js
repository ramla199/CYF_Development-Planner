import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";
import messagesIcon from "../../images/E-mail-icon.png";

function Messages() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch("/dashboard/messages");
      const jsonData = await response.json();

      setMessages(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <BackButton />
      <Link to="/new-message">
        <button>create new message</button>
      </Link>
      <h1>Messages</h1>
      <img alt="messages icon" src={messagesIcon} />
      <section>
        {messages.map((message) => (
          <div key={message.message_id}>
            <div>{message.message_text}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Messages;
