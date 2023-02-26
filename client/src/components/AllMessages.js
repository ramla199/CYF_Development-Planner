import React, { useState, useEffect } from "react";

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
  useEffect(() => {
    getMessages();
  }, []);

  const sendAnswer = () => {
    console.log("I was clicked");
    setAnswerField(!answerField);
    setAnswerButtonText((state) => (state === "answer" ? "cancel" : "answer"));
  };

  const handleSend = () => {
    console.log("I am a sending button but I'm not working yet");
  };
  return (
    <>
      <h2>All Messages</h2>

      {allMessages.map((message) => {
        return (
          <section>
            <section>{`message from: ${message.sender_username}`}</section>
            <section>{`Title: ${message.message_title}`}</section>
            {messageClicked ? (
              <section>
                {message.message_text}
                <button onClick={sendAnswer}>{answerButtonText}</button>
                {answerField ? (
                  <section>
                    <textarea />
                    <button onClick={handleSend}>send</button>
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
