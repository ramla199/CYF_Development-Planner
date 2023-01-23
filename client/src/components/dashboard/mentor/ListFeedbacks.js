import React, { useState, useEffect } from "react";
import NewFeedback from "../mentor/NewFeedback";
import EditFeedback from "./EditFeedback";

function ListFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

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
  }, []);

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
      <NewFeedback />
    </>
  );
}

export default ListFeedbacks;
