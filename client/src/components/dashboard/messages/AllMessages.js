import React, { useState, useEffect } from "react";
import SendNewMessage from "./SendNewMessage";

function AllMessages({ name }) {
  const [messageClicked, setMessageClicked] = useState(false);
  const [buttonText, setButtonText] = useState("open");
  const [answerField, setAnswerField] = useState(false);
  const [answerButtonText, setAnswerButtonText] = useState("answer");

  function handleMessageClicked() {
    setMessageClicked(!messageClicked);
    setButtonText((state) => (state === "open" ? "close" : "open"));
  }

  const [allMessages, setAllMessages] = useState([]);

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
    // console.log("I was clicked");
    setAnswerField(!answerField);
    setAnswerButtonText((state) => (state === "answer" ? "cancel" : "answer"));
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      {allMessages.map((message) => {
        return (
          <>
            <div>
              <h3>{`message from: ${message.sender_username}`}</h3>
              <div>
                {/* <h3>{`Title: ${message.message_title}`}</h3>
                <h3> {`Id: ${message.sender_id}`}</h3> */}
              </div>
              <button onClick={handleMessageClicked}>{buttonText}</button>
            </div>
            <div>
              {messageClicked ? (
                <section>
                  {message.message_text}
                  <button onClick={sendAnswer}>{answerButtonText}</button>
                  {answerField ? (
                    <SendNewMessage
                      senderUsername={name}
                      receipientId={message.sender_id}
                    />
                  ) : (
                    <></>
                  )}
                </section>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      })}
    </>
  );
}

export default AllMessages;
