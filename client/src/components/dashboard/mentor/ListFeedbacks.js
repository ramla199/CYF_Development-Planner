import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import NewFeedback from "../mentor/NewFeedback";
import Name from "../Name";
import EditFeedback from "./EditFeedback";

function ListFeedbacks({ setAuth }) {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [feedbacksChange, setFeedbacksChange] = useState(false);
  const getFeedbacks = async () => {
    try {
      const response = await fetch("dashboard/feedbacks", {
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
    setFeedbacksChange(false);
  }, [feedbacksChange]);

  // delete feedback

  async function deleteFeedback(id) {
    try {
      await fetch(`dashboard/feedbacks/${id}`, {
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

  console.log(feedbacks);

  return (
    <>
      <Name />

      <Logout setAuth={setAuth} />

      <Link to="/new-feedback">
        <button>new</button>
      </Link>
      <section>
        <h1>files</h1>
        {feedbacks.length !== 0 &&
          feedbacks[0].feedback_id !== null &&
          feedbacks.map((feedback) => (
            <div>
              <div key={feedback.feedback_id}>{feedback.feedback_text}</div>
              {/* <div>
                <EditFeedback />
              </div> */}
              <button onClick={() => deleteFeedback(feedback.feedback_id)}>
                delete
              </button>
            </div>
          ))}
      </section>
      {/* <NewFeedback /> */}
    </>
  );
}

export default ListFeedbacks;
