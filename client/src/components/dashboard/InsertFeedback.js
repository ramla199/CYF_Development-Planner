import React, { useState } from "react";

function InsertFeedback() {
  const [feedbackText, setFeedbackText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { feedbackText };
      const response = await fetch("http://localhost:4000/feedbacks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <h1>Insert Feedback</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default InsertFeedback;
