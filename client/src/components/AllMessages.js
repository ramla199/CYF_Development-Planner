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

  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      // TODO: fetch receipientId and senderUsername
      const receipientId = "2ddc9080-32ca-4942-a452-4fc53dbf4bbe";
      const senderUsername = "ken";

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

      // setDraftsChange(true);

      setMessageText("");
      setMessageTitle("");
    } catch (err) {
      console.error(err.message);
    }
  }
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
                    <form onSubmit={onSubmitForm}>
                      <section>{`message to: ${message.sender_username}`}</section>
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
                      <button onClick={handleSend}>send</button>
                    </form>
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
