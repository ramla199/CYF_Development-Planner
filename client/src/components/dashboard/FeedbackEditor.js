import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayFeedbackEditorPage from "./DisplayFeedbackEditorPage";

import { saveFeedback } from "./feedbackFunctions";

import "../../../src/styles.css"; // DG

const FeedbackEditor = () => {
  //const [userName, setUserName] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackCharacterCount, setFeedbackCharacterCount] = useState(0);
  const [newFeedback, setNewFeedback] = useState(null);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [locationState, setLocationState] = useState(null);

  const navigate = useNavigate();

  const saveThenRedisplay = () => {
    saveFeedback(
      // userName,
      //      theCurrentTimeStamp,
      //      feedbackTimeStamp,
      "no",
      feedbackText,
      selectedInfo,
      newFeedback
      // setNewFeedback,
      // setSaved,
      // setChanged,
      // setSelectedInfo
      //      setFeedbackTimeStamp
    );
    console.log("IAMBACKYES");
    const isNew = false;
    const planFetched = location.state.planFetched;
    console.log(isNew, planFetched);
    setNewFeedback(false);
    navigate(location.pathname, {
      state: { selectedInfo, planFetched, feedbackText, isNew },
      replace: true,
    });
    /*
    navigate("/feedback-editor", {
                state: { selectedInfo, planFetched, feedbackText, isNew },
                replace: true,
    });
     */   
    // Go to the Feedback Requests page
    // navigate("/feedback-requests", {
    //   replace: true,
    // });
  };

  const saveThenGotoFeedback = () => {
    saveFeedback(
      // userName,
      //      theCurrentTimeStamp,
      //      feedbackTimeStamp,
      "no",
      feedbackText,
      selectedInfo,
      newFeedback,
      // setNewFeedback,
      // setSaved,
      // setChanged,
      // setSelectedInfo
      //      setFeedbackTimeStamp
    );
console.log("IAMBACK2");
    // Go to the Feedback Requests page
    navigate("/feedback-requests", {
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
      selectedInfo,
      newFeedback
      // setNewFeedback,
      // setSaved,
      // setChanged,
      // setSelectedInfo
      //      setFeedbackTimeStamp
    );
console.log("IAMBACK1")
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
  console.log(newFeedback);
  console.log(location.state);
  useEffect(() => {
    console.log("SET");
    setLocationState(location.state);
  }, [location.state]);

  console.log("WELL?", locationState, newFeedback);

  useEffect(() => {
    console.log(locationState, newFeedback);
    // ONLY DO THIS THE ONCE! USE 'newFeedback' TO DETERMINE THIS I.E. AS IF useEffect({...}, [])
    if (locationState && newFeedback === null) {
      // Ensure done ONCE!
      console.log(location.state.selectedInfo);
      console.log(location.state.planFetched);

      const newObject = Object.assign(
        {},
        location.state.selectedInfo,
        location.state.planFetched
      );
      setSelectedInfo(newObject);
      // Indicate whether creating a new Feedback or amending Feedback
      setNewFeedback(location.state.isNew);
      console.log(location.state);
      console.log(
        "SET>>",
        location.state.planFetched.username,
        location.state.isNew
      );
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

  /*  
  useEffect(() => {
    // Check whether this is a new feedback?
    // No!
    if (selectedInfo !== null && !newFeedback) {
      setFeedbackTextArray(() => [
        selectedInfo.theFeedback.sfeedback,
        selectedInfo.theFeedback.mfeedback,
        selectedInfo.theFeedback.afeedback,
        selectedInfo.theFeedback.rfeedback,
        selectedInfo.theFeedback.tfeedback,
      ]);
      setFeedbackCharacterCount(() => [
        selectedInfo.theFeedback.sfeedback.length,
        selectedInfo.theFeedback.mfeedback.length,
        selectedInfo.theFeedback.afeedback.length,
        selectedInfo.theFeedback.rfeedback.length,
        selectedInfo.theFeedback.tfeedback.length,
      ]);
      setFeedbackCreatedTimeStamp(selectedInfo.theFeedback.created_timestamp);
    }
    // Otherwise for a new feedback the above fields will be empty and 0
  }, [selectedInfo, newFeedback]);
*/

  console.log(location.state.planFetched.username, selectedInfo);
  console.log(locationState);
  console.log(newFeedback);
  return (
    locationState &&
    newFeedback !== null && (
      <DisplayFeedbackEditorPage
        userName={location.state.planFetched.username}
        selectedInfo={selectedInfo}
        planFetched={location.state.planFetched}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
        feedbackCharacterCount={feedbackCharacterCount}
        setFeedbackCharacterCount={setFeedbackCharacterCount}
        newFeedback={newFeedback}
        setNewFeedback={setNewFeedback}
        // setSelectedInfo={setSelectedInfo}
        setSaved={setSaved}
        setChanged={setChanged}
        //      feedbackTimeStamp={feedbackTimeStamp}
        //      setFeedbackTimeStamp={setFeedbackTimeStamp}

        allEmpty={allEmpty}
        discardFeedback={discardFeedback}
        saveThenGotoFeedback={saveThenGotoFeedback}
        newOrChanged={newOrChanged}
        indicateSentThenGotoFeedback={indicateSentThenGotoFeedback}
        handleChange={handleChange}
        saveThenRedisplay={saveThenRedisplay}
      />
    )
  );
};
export default FeedbackEditor;
