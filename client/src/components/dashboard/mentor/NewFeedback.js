import React, { useState } from "react";

// import { Editor } from "react-draft-wysiwyg";
// import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function NewFeedback({ setFeedbacksChange }) {
  const [feedbackText, setFeedbackText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const body = { feedbackText };
      const response = await fetch("/dashboard/feedbacks", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setFeedbacksChange(true);
      setFeedbackText("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <section>
        <form onSubmit={onSubmitForm}>
          <h3 className="subheading">Insert feedback</h3>
          <div className="buttons">
            <button>save</button>
            <button>send</button>
          </div>

          <textarea
            placeholder="add"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>

          {/* <Editor
    value={feedbackText}
    onChange={(e) => setFeedbackText(e.target.value)}
  /> */}
        </form>
      </section>
    </>
  );
}

export default NewFeedback;
