import React, { useState } from "react";
import Logout from "../Logout";

// import { Editor } from "react-draft-wysiwyg";
// import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewMessage({ setMessagesChange }) {
  const [messageText, setMessageText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { messageText };
      const response = await fetch("/dashboard/messages", {
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
      <Logout />
      <section>
        <form onSubmit={onSubmitForm}>
          <h3 className="subheading">Insert message</h3>
          <div className="buttons">
            <button>save</button>
            {/* <button>send</button> */}
          </div>

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
