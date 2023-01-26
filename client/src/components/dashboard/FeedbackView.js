import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ViewFeedbackPage from "./ViewFeedbackPage";

const FeedbackView = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [newView, setNewView] = useState(false);
  const [locationState, setLocationState] = useState(null);


  const location = useLocation();
  useEffect(() => {
    setLocationState(location.state);
  }, [location.state]);


  useEffect(() => {
    if (locationState && !newView) {
      const newObject = Object.assign(
        {},
        location.state.selectedInfo,
        location.state.planFetched
      );
      setSelectedInfo(newObject);
      setFeedbackText(location.state.feedbackText);
      // Indicate ready to view the Feedback
      setNewView(true);
    }
  }, [newView, location.state, locationState]);

  return (
    locationState && newView && (
      <ViewFeedbackPage
        userName={location.state.planFetched.username}
        selectedInfo={selectedInfo}
        feedbackText={feedbackText}
      />
    )
  );
};
export default FeedbackView;
