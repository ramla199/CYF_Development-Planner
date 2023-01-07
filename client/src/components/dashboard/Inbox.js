import React, { useState, useEffect } from "react";
import BackButton from "../BackButton";
import { Link } from "react-router-dom";

function Inbox() {
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch("http://localhost:4000/messages", {
        method: "GET",
        headers: { "Content-Type": "aplication/json" },
      });
      const jsonData = await response.json();

      setAllMessages(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  async function deleteMessage(id) {
    try {
      await fetch(`http://localhost:4000/messages/${id}`, {
        method: "DELETE",
      });
      setMessages(messages.filter((message) => message.message_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);
  return (
    <>
      <BackButton />
      <h1>Inbox</h1>
      <section>
        <h2>Saved Messages</h2>
        {messages.length !== 0 &&
          messages[0].message_id !== null &&
          messages.map((message) => (
            <div>
              <div key={message.message_id}>{message.message_text}</div>
              <button onClick={() => deleteMessage(message.message_id)}>
                Delete
              </button>
            </div>
          ))}
      </section>
      <Link to="/new-message">
        <button>insert new message</button>
      </Link>
    </>
  );
}

export default Inbox;
