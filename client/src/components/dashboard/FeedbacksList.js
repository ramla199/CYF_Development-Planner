import React from "react";
import Feedback from "./Feedback";

function FeedbacksList({ feedbacksList, setFeedbacksList }) {
  return (
    <>
      <div>
        {feedbacksList.map((feedbackItem) => (
          <Feedback
            key={feedbackItem.id}
            feedbackItem={feedbackItem}
            feedbacksList={feedbacksList}
            setFeedbacksList={setFeedbacksList}
          />
        ))}
      </div>
    </>
  );
}

export default FeedbacksList;
