import React from "react";

// import { messages } from "../../data/messages";

// import { Link } from "react-router-dom";
import InsertMessage from "./InsertMessage";

function Messages() {
  return (
    <>
      <h1>Messages</h1>
      {/* <section className="inbox-messages">
        {messages.map((message, index) => {
          return (
            <ul key={index}>
              <li>{message.sender}</li>
              <li>
                <Link to="/message/:messageId"> {message.message}</Link>
              </li>
            </ul>
          );
        })}
      </section> */}

      <InsertMessage />
    </>
  );
}

export default Messages;
