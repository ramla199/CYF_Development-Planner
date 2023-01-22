import React, { useState, useEffect } from "react";
import NewMessage from "../mentor/NewMessage";

function ListMessages() {
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
        <h1>messages</h1>
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
      <NewMessage />
    </>
  );
}

export default ListMessages;
