import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayFeedbackEditorPage from "./DisplayFeedbackEditorPage";

import { saveFeedback } from "./feedbackFunctions";


const FeedbackEditor = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackCharacterCount, setFeedbackCharacterCount] = useState(0);
  const [newFeedback, setNewFeedback] = useState(null);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [locationState, setLocationState] = useState(null);

  const navigate = useNavigate();


  const saveThenGotoFeedback = () => {
    saveFeedback(
      "no",
      feedbackText,
      selectedInfo,
      newFeedback,
    );

    // Go to the Feedback Requests page
    navigate("/feedback-requests", {
      replace: true,
    });
  };

  const indicateSentThenGotoFeedback = () => {
    saveFeedback(
      "yes", // indicate that this feedback is now being sent to the student
      feedbackText,
      selectedInfo,
      newFeedback
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

  const allEmpty = () => feedbackText.trim() === "";

  const newOrChanged = () => newFeedback || changed;

  const discardFeedback = () => {
    let leavePage, answer;
    if (newFeedback) {
      if (!changed) {
        // No changes
        leavePage = true;
      } else {
        answer = window.confirm(
          "Be aware,\nif you press OK now,\nALL your changes will be lost!"
        );
      }
    }
    // Existent Feedback
    else if (changed) {
      if (saved) {
        answer = window.confirm(
          "Be aware,\nif you press OK now,\nALL your changes since your last SAVE will be lost!"
        );
      } else {
        answer = window.confirm(
          "Be aware,\nif you press OK now,\nALL your changes will be lost!"
        );
      }
    } else {
      // Otherwise leave the page
      leavePage = true;
    }

    if (leavePage || answer) {
      // Go to the Feedback Requests page
      navigate("/feedback-requests", {
        replace: true,
      });
    }
  };

  const location = useLocation();

  useEffect(() => {
    setLocationState(location.state);
  }, [location.state]);

  useEffect(() => {
    // ONLY DO THIS THE ONCE! USE 'newFeedback' TO DETERMINE THIS I.E. AS IF useEffect({...}, [])
    if (locationState && newFeedback === null) {
      // Ensure done ONCE!

      const newObject = Object.assign(
        {},
        location.state.selectedInfo,
        location.state.planFetched
      );
      setSelectedInfo(newObject);
      // Indicate whether creating a new Feedback or amending Feedback
      setNewFeedback(location.state.isNew);
    }
  }, [newFeedback, location.state, locationState]);

  // If editing a Feedback record i.e. location.state.isNew === false
  // Update the states accordingly
  useEffect(() => {
    // if amending Feedback update the states accordingly
    if (location.state.isNew === false) {
      // Show Entered Text
      setFeedbackText(location.state.feedbackText);
      // Show Number Of Characters Remaining
      const updatedCount = location.state.feedbackText.length;
      setFeedbackCharacterCount(updatedCount);
      // Indicate that the record is saved
      setSaved(true);
    }
  }, [location.state.isNew,location.state.feedbackText]);

  
  return (
    locationState &&
    newFeedback !== null && (
      <DisplayFeedbackEditorPage
        userName={location.state.planFetched.username}
        selectedInfo={selectedInfo}
        feedbackText={feedbackText}
        feedbackCharacterCount={feedbackCharacterCount}
        allEmpty={allEmpty}
        newOrChanged={newOrChanged}
        discardFeedback={discardFeedback}
        saveThenGotoFeedback={saveThenGotoFeedback}
        indicateSentThenGotoFeedback={indicateSentThenGotoFeedback}
        handleChange={handleChange}
      />
    )
  );
};
export default FeedbackEditor;
