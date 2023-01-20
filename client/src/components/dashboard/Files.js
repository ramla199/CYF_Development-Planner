import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";
import filesIcon from "../../images/Documents-icon-48.png";

function Files() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    try {
      const response = await fetch("/feedbacks", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
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
      await fetch(`/feedbacks/${id}`, {
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
      <section>
        <div className="icon-heading">
          <h1>Files</h1>
          <img alt="files icon" src={filesIcon} />
        </div>
        <div className="login-signin-buttons">
          <Link to="/new-feedback">
            <button>new</button>
          </Link>
        </div>
      </section>
      <section>
        <section>
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
      </section>
    </>
  );
}

export default Files;
