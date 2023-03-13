import React, { useState, useEffect } from "react";
import SendNewMessage from "./dashboard/SendNewMessage";

function AllMessages() {
  const [messageClicked, setMessageClicked] = useState(false);
  const [buttonText, setButtonText] = useState("open");
  const [answerField, setAnswerField] = useState(false);
  const [answerButtonText, setAnswerButtonText] = useState("answer");

  function handleMessageClicked() {
    setMessageClicked(!messageClicked);
    setButtonText((state) => (state === "open" ? "close" : "open"));
  }

  const [allMessages, setAllMessages] = useState([]);
  const [username, setUsername] = useState("");
  const getMessages = async () => {
    try {
      const res = await fetch("/dashboard/messages", {
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

  const sendAnswer = () => {
    console.log("I was clicked");
    setAnswerField(!answerField);
    setAnswerButtonText((state) => (state === "answer" ? "cancel" : "answer"));
  };

  const getCurrentUsername = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();
      setUsername(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getMessages();
    getCurrentUsername();
  }, []);
  return (
    <>
      <h2>All Messages</h2>

      {allMessages.map((message) => {
        return (
          <section>
            <section>{`message from: ${message.sender_username}`}</section>
            <section>{`Title: ${message.message_title}`}</section>
            <section>{`Id: ${message.sender_id}`}</section>
            {messageClicked ? (
              <section>
                {message.message_text}
                <button onClick={sendAnswer}>{answerButtonText}</button>
                {answerField ? (
                  <section>
                    <SendNewMessage
                      senderUsername={username}
                      receipientId={message.sender_id}
                    />
                  </section>
                ) : (
                  <></>
                )}
              </section>
            ) : (
              <></>
            )}
            <button onClick={handleMessageClicked}>{buttonText}</button>
          </section>
        );
      })}
    </>
  );
}

export default AllMessages;
