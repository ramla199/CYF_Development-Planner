import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayFeedbackEditorPage from "./DisplayFeedbackEditorPage";

import { setupTimeValues } from "./planFunctions";
import { saveFeedback } from "./feedbackFunctions";

import "../../../src/styles.css";

const FeedbackEditor = () => {
  const [userName, setUserName] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const [feedbackText, setFeedbackText] = useState("");

  const [feedbackCharacterCount, setFeedbackCharacterCount] = useState(0);

  const [newFeedback, setNewFeedback] = useState(null);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [feedbackTimeStamp, setFeedbackTimeStamp] = useState(null);
  const [timeValues] = useState(setupTimeValues());
  const [locationState,setLocationState] = useState(null);
  const [backToPageToggle, setBackToPageToggle] = useState(false);

  const navigate = useNavigate();

  //let [, theCurrentTimeStamp] = timeValues;

  const saveThenGotoFeedback = () => {
    saveFeedback(
      userName,
//      theCurrentTimeStamp,
//      feedbackTimeStamp,
      feedbackText,
      newFeedback,
      setNewFeedback,
      setSaved,
      setChanged,
      setSelectedInfo,
//      setFeedbackTimeStamp
      backToPageToggle,
      setBackToPageToggle
    );

    // Go to the Feedback Requests page
    navigate("/feedback-requests", {
      replace: true,
    });
  };


  function handleChange(event) {
    const enteredText = event.target.value.trim();
    // Indicate there has been a change
    setChanged(true);

    // Show Entered Text
    setFeedbackText(enteredText);

    // Show Number Of Characters Remaining
    const updatedCount = enteredText.length;
    setFeedbackCharacterCount(updatedCount);
  }
// DG
  const gotoSelectFeedback = () => { // DG
    let feedbackId = location.state.feedbackSelectedInfo.theFeedback.feedback_serial_id;
    // Go to the Select Mentor page
    navigate("/select-mentor", {
      state: {
        username: userName,
        feedbackSerialId: feedbackId,
      },
      replace: true,
    });
  };

  const allEmpty = () => feedbackCharacterCount === 0;

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
  console.log(newFeedback)
  console.log(location.state)
  useEffect(() => {
    console.log("SET")
setLocationState(location.state);
  }, [location.state])
  
console.log("WELL?",locationState, newFeedback);
  useEffect(() => {
    console.log(locationState, newFeedback);
    // ONLY DO THIS THE ONCE! USE 'newFeedback' TO DETERMINE THIS I.E. AS IF useEffect({...}, [])
    if (locationState && newFeedback === null) {
      // Ensure done ONCE!
      console.log(location.state.selectedInfo);
      console.log(location.state.planFetched);
      let {
        feedback_req_id,
        feedback_req_plan_serial_id,
        feedback_req_mentor_username,
        feedback_req_student_username,
//        feedback_req_timestamp,
      } = location.state.selectedInfo;
      let { username, splan, mplan, aplan, rplan, tplan } =
        location.state.planFetched;
    //   setSelectedInfo({
    //     ...location.state.selectedInfo,
    //     ...location.state.planFetched,
    //   });
      const newObject = Object.assign(
        {},
        location.state.selectedInfo,
        location.state.planFetched
      );
      setSelectedInfo(newObject);     
      setUserName(username);
      // Indicate whether creating a new Feedback or amending Feedback
      setNewFeedback(location.state.isNew);
      console.log(location.state);
      console.log(
        "SET>>",
        username,
        location.state.isNew
      );
    }
  }, [
    newFeedback,
    location.state,
    locationState,
  ]);
/*
  // DG
  useEffect(() => {
    setSelectedInfo({ ...selectedInfo });
  }, [backToPageToggle, selectedInfo]);
  */

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

      console.log(userName, selectedInfo);
console.log(locationState)
console.log(newFeedback)
  return (
    locationState &&
    newFeedback !== null && (
      <DisplayFeedbackEditorPage
        userName={userName}
        //displayTimeStamp={displayTimeStamp}
        //      theCurrentTimeStamp={theCurrentTimeStamp}
        //   splan={selectedInfo.splan}
        //   mplan={selectedInfo.mplan}
        //   aplan={selectedInfo.aplan}
        //   rplan={selectedInfo.rplan}
        //   tplan={selectedInfo.tplan}
        selectedInfo={selectedInfo}
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
        backToPageToggle={backToPageToggle}
        setBackToPageToggle={setBackToPageToggle}
        allEmpty={allEmpty}
        discardFeedback={discardFeedback}
        saveThenGotoFeedback={saveThenGotoFeedback}
        newOrChanged={newOrChanged}
        gotoSelectFeedback={gotoSelectFeedback}
        handleChange={handleChange}
      />
    )
  );
};
export default FeedbackEditor;
