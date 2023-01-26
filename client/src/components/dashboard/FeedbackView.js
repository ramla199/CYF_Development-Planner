import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewFeedbackPage from "./ViewFeedbackPage";

import { saveFeedback } from "./feedbackFunctions";

const FeedbackView = () => {
  //const [userName, setUserName] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [, setFeedbackCharacterCount] = useState(0);
  //  const [newFeedback, setNewFeedback] = useState(null);
  const [newView, setNewView] = useState(false);
  const [, setChanged] = useState(false);

  const [locationState, setLocationState] = useState(null);

  const navigate = useNavigate();

  const gotoFeedbackReceivedPage = () => {
    // Go to the Feedback Requests page
    navigate("/feedback-received", {
      replace: true,
    });
  };

  const indicateSentThenGotoFeedback = () => {
    saveFeedback(
      // userName,
      //      theCurrentTimeStamp,
      //      feedbackTimeStamp,
      "yes", // indicate that this feedback is now being sent to the student
      feedbackText,
      selectedInfo
      // newFeedback
      // setNewFeedback,
      // setSaved,
      // setChanged,
      // setSelectedInfo
      //      setFeedbackTimeStamp
    );

    // Go to the Feedback Requests page
    navigate("/feedback-requests", {
      replace: true,
    });
  };

  function handleChange(event) {
    const enteredText = event.target.value;
    // Indicate there has been a change
    setChanged(true);

    // Show Entered Text
    setFeedbackText(enteredText);

    // Show Number Of Characters Remaining
    const updatedCount = enteredText.length;
    setFeedbackCharacterCount(updatedCount);
  }

  const location = useLocation();
  console.log(newView);
  console.log(location.state);
  useEffect(() => {
    console.log("SET");
    setLocationState(location.state);
  }, [location.state]);

  console.log("WELL?", locationState);

  useEffect(() => {
    if (locationState && !newView) {
      console.log(location.state.selectedInfo);
      console.log(location.state.planFetched);

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
        planFetched={location.state.planFetched}
        feedbackText={feedbackText}
        // setFeedbackText={setFeedbackText}
        // feedbackCharacterCount={feedbackCharacterCount}
        // setFeedbackCharacterCount={setFeedbackCharacterCount}
        // newFeedback={newFeedback}
        // setNewFeedback={setNewFeedback}
        // setSelectedInfo={setSelectedInfo}
        // setSaved={setSaved}
        // setChanged={setChanged}
        //      feedbackTimeStamp={feedbackTimeStamp}
        //      setFeedbackTimeStamp={setFeedbackTimeStamp}

        // allEmpty={allEmpty}
        // discardFeedback={discardFeedback}
        gotoFeedbackReceivedPage={gotoFeedbackReceivedPage}
        // newOrChanged={newOrChanged}
        // indicateSentThenGotoFeedback={indicateSentThenGotoFeedback}
        handleChange={handleChange}
      />
    )
  );
};
export default FeedbackView;
