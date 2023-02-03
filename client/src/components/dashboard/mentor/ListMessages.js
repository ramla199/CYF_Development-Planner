import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import NewMessage from "../mentor/NewMessage";
import Name from "../Name";

function ListMessages({ setAuth }) {
  const [allMessages, setAllMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  const [messagesChange, setMessagesChange] = useState(false);
  const getMessages = async () => {
    try {
      const response = await fetch("dashboard/messages", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const jsonData = await response.json();

      setAllMessages(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMessages();
    setMessagesChange(false);
  }, [messagesChange]);

  // delete message

  async function deleteMessage(id) {
    try {
      await fetch(`dashboard/messages/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setMessages(messages.filter((message) => message.message_id !== id));
    } catch (err) {
      console.log(allMessages);
    }
  }

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages]);

  console.log(messages);

  return (
    <>
      <Name />
      <Logout setAuth={setAuth} />

      <Link to="/new-message">
        <button>new</button>
      </Link>
      <section>
        <h1>files</h1>
        {messages.length !== 0 &&
          messages[0].message_id !== null &&
          messages.map((message) => (
            <div>
              <div key={message.message_id}>{message.message_text}</div>
              {/* <div>
                <EditFeedback />
              </div> */}
              <button onClick={() => deleteMessage(message.message_id)}>
                delete
              </button>
            </div>
          ))}
      </section>
      {/* <NewMessage /> */}
    </>
  );
}

export default ListMessages;
