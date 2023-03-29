import React, { useState } from "react";

function SendNewMessage({ senderUsername, receipientId }) {
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  console.log(senderUsername);
  console.log(receipientId);

  async function sendMessage(isDraft) {
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      let body;
      let endpoint;
      if (isDraft) {
        body = { draftTitle: messageTitle, draftText: messageText };
        endpoint = "/dashboard/drafts";
      } else {
        body = { messageTitle, messageText, receipientId, senderUsername };
        endpoint = "/dashboard/messages";
      }

      // const body = { messageTitle, messageText, receipientId, senderUsername };
      const response = await fetch(endpoint, {
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
      <form>
        <button type="button" onClick={() => sendMessage(false)}>
          send
        </button>
        <button type="button" onClick={() => sendMessage(true)}>
          save
        </button>
        {/* <section>{`message to: ${receipientId}`}</section> */}
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
      </form>
    </>
  );
}

export default SendNewMessage;
