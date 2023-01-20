import React, { useState } from "react";

import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewMessage({ setMessagesChange }) {
  const [messageText, setMessageText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = { messageText };
      const response = await fetch("dashboard/messages", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setMessagesChange(true);
      setMessageText("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <section className="login-signin-buttons">
        <form onSubmit={onSubmitForm} className="header-flex">
          <button>save</button>
          <button>send</button>
          <textarea
            type="text"
            placeholder="add"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          {/* <Editor
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          /> */}
        </form>
      </section>
    </>
  );
}

export default NewMessage;
