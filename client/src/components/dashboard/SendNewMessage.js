import React, { useState } from "react";

function SendNewMessage({ senderUsername, receipientId }) {
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  console.log(senderUsername);
  console.log(receipientId);

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { messageTitle, messageText, receipientId, senderUsername };
      const response = await fetch("/dashboard/messages", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setMessageText("");
      setMessageTitle("");
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <section>{`message to: ${receipientId}`}</section>
        <input
          type="text"
          placeholder="add title"
          value={messageTitle}
          onChange={(e) => setMessageTitle(e.target.value)}
        />
        <textarea
          placeholder="add text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button>send</button>
      </form>
    </>
  );
}

export default SendNewMessage;
