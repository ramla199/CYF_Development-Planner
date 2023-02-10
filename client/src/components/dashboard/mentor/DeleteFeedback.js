import React, { useState, useEffect } from "react";

function DeleteFeedback({ allFeedbacks }) {
  const [feedbacks, setFeedbacks] = useState([]);

  // delete feedback

  async function deleteFeedback(id) {
    try {
      await fetch(`/dashboard/feedbacks/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setFeedbacks(feedbacks.filter((feedback) => feedback.feedback_id !== id));
    } catch (err) {
      console.log(allFeedbacks);
    }
  }

  useEffect(() => {
    setFeedbacks(allFeedbacks);
  }, [allFeedbacks]);
  return (
    <>
      {" "}
      <button onClick={() => deleteFeedback(feedback.feedback_id)}>
        delete
      </button>
    </>
  );
}

export default DeleteFeedback;
