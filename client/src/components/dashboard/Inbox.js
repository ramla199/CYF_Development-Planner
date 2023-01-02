import React from "react";

import BackButton from "../BackButton";
import { messages } from "../../data/messages";

function Inbox() {
  return (
    <>
      <BackButton />
      <h1>Inbox</h1>
      <section className="inbox-messages">
        {messages.map((message, index) => {
          return (
            <ul key={index}>
              <li>{message.sender}</li> <li>{message.message}</li>
            </ul>
          );
        })}
      </section>
    </>
  );
}

export default Inbox;
