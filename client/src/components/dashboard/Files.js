import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";

function Files() {
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:4000/feedbacks");
      const jsonData = await response.json();

      setFeedbacks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      <BackButton />
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
