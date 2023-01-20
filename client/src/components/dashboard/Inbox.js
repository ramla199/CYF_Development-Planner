import React, { useState, useEffect } from "react";
import messagesIcon from "../../images/E-mail-icon.png";
import { Link } from "react-router-dom";

function Inbox() {
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  const getMessages = async () => {
    try {
      const res = await fetch("/dashboard/messages", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      setAllMessages(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  //delete message

  async function deleteMessage(id) {
    try {
      await fetch(`/dashboard/messages/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setMessages(messages.filter((message) => message.message_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);
  // console.log(allMessages);
  // console.log(messages);
  // console.log(messages.length, messages[0]);

  return (
    <>
      <section>
        <div className="icon-heading">
          <h2>Inbox</h2>
          <img alt="messages icon" src={messagesIcon} />
        </div>
        <div className="login-signin-buttons">
          <Link to="/new-message">
            <button>new</button>
          </Link>
        </div>
      </section>

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
    </>
  );
}

export default Inbox;
