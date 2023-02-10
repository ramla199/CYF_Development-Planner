import React, { useState } from "react";

const EditTodo = ({ feedback, setFeedbacksChange }) => {
  //editText function

  const editText = async (id) => {
    try {
      const body = { feedbackText };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/dashboard/feedbacks/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setFeedbacksChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [feedbackText, setFeedbackText] = useState(feedback.feedback_text);
  return (
    <>
      <button type="button" data-target={`#id${feedback.feedback_id}`}>
        Edit
      </button>
      {/* id = "id21"*/}
      <div
        id={`id${feedback.feedback_id}`}
        onClick={() => setFeedbackText(feedback.feedback_text)}
      >
        <div>
          <div>
            <div>
              <h4>Edit Todo</h4>
              <button
                type="button"
                onClick={() => setFeedbackText(feedback.feedback_text)}
              >
                &times;
              </button>
            </div>

            <div>
              <input
                type="text"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>

            <div>
              <button onClick={() => editText(feedback.feedback_id)}>
                Edit
              </button>
              <button onClick={() => setFeedbackText(feedback.feedback_text)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
