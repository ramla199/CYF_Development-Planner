import React, { useState, useEffect } from "react";
import messagesIcon from "../../images/E-mail-icon.png";
import { Link } from "react-router-dom";

function Inbox() {
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const response = await fetch("/messages", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
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
      await fetch(`/messages/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setMessages(messages.filter((message) => message.message_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);
  console.log(allMessages);
  console.log(messages);
  console.log(messages.length, messages[0]);

  return (
    <>
      <section>
        <div className="icon-heading">
          <h1>Inbox</h1>
          <img alt="messages icon" src={messagesIcon} />
        </div>

        <section>
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

        <div className="login-signin-buttons">
          <Link to="/new-message">
            <button>new</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Inbox;
