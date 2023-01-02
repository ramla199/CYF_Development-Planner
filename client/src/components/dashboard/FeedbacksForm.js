import React from "react";
import uuid from "react-uuid";

function FeedbacksForm({
  feedback,
  setFeedback,
  feedbacksList,
  setFeedbacksList,
}) {
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    console.log(feedback);
  };

  const handleSubmitFeedback = (event) => {
    event.preventDefault();
    setFeedbacksList([...feedbacksList, { name: feedback, id: uuid() }]);
    console.log(feedbacksList);
    setFeedback("");
  };
  return (
    <>
      <form onSubmit={handleSubmitFeedback}>
        <button>save</button>
        <label>New feedback</label>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          cols="70"
          rows="30"
          placeholder="type here..."
        ></textarea>
      </form>
    </>
  );
}

export default FeedbacksForm;
