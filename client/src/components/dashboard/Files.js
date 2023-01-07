import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";

function Files() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:4000/feedbacks", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();

      setAllFeedbacks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  async function deleteFeedback(id) {
    try {
      await fetch(`http://localhost:4000/feedbacks/${id}`, {
        method: "DELETE",
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
      <BackButton />
      <h1>Feedbacks</h1>
      <section>
        <h2>Saved Feedbacks</h2>
        {feedbacks.length !== 0 &&
          feedbacks[0].feedback_id !== null &&
          feedbacks.map((feedback) => (
            <div>
              <div key={feedback.feedback_id}>{feedback.feedback_text}</div>
              <button onClick={() => deleteFeedback(feedback.feedback_id)}>
                delete feedback
              </button>
            </div>
          ))}
      </section>
      <Link to="/new-feedback">
        <button>create new feedback</button>
      </Link>
      <h1>Files</h1>
      <section>
        {feedbacks.map((feedback) => (
          <div key={feedback.feedback_id}>
            <div>{feedback.feedback_text}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Files;
