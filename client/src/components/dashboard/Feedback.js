import React from "react";

function Feedback({ feedbackItem, feedbacksList, setFeedbacksList }) {
  const deleteFeedback = () => {
    setFeedbacksList(
      feedbacksList.filter((item) => item.id !== feedbackItem.id)
    );
  };
  return (
    <>
      <div>Feedback</div>
      <h3>{feedbackItem.name}</h3>
      <button onClick={deleteFeedback}>delete</button>
    </>
  );
}

export default Feedback;
