import React, { useState, useEffect } from "react";
import BackButton from "../BackButton";

function Inbox() {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch("http://localhost:4000/messages");
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
      <h1>Inbox</h1>
      <section>
        <h2>Saved Messages</h2>
        {messages.map((message) => (
          <div key={message.message_id}>
            <div>{message.message_text}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Inbox;
