import React, { useState, useEffect } from "react";

function SentMessages() {
  const [allMessages, setAllMessages] = useState([]);
  const getMessages = async () => {
    try {
      const res = await fetch("/dashboard/messages/sent", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllMessages(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <>
      {allMessages.map((message) => {
        return (
          <div>
            <div>{message.message_title}</div>
            <div>{message.message_text}</div>
          </div>
        );
      })}
    </>
  );
}

export default SentMessages;
