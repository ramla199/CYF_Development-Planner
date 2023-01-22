import {
  PREAMBLE_SIZE,
  S_PLAN,
  M_PLAN,
  A_PLAN,
  R_PLAN,
  T_PLAN,
  monthNames,
} from "../../../src/data/constants.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Determine the current time
export function determine_current_timestamp() {
  const currentTimeStamp = new Date(); // Current Date and Time
  const dayNumber = currentTimeStamp.getUTCDate(); // Day

  // getUTCMonth() is zero-based value (where zero indicates the first month of the year).
  // So January is ZERO
  const monthNumber = currentTimeStamp.getUTCMonth(); // Month
  const yearNumber = currentTimeStamp.getUTCFullYear(); // Year
  const hoursNumber = currentTimeStamp.getUTCHours(); // Hours
  const minutesNumber = currentTimeStamp.getUTCMinutes(); // Minutes
  const secondsNumber = currentTimeStamp.getUTCSeconds(); // Second

  return [
    dayNumber,
    monthNumber,
    yearNumber,
    hoursNumber,
    minutesNumber,
    secondsNumber,
  ];
}

const deleteFeedbackRequest = async (reqId) => {
  const PORT = localStorage.getItem("port");

  console.log(reqId);
  try {
    await fetch(`http://localhost:${PORT}/feedback_requests/${reqId}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
  } catch (err) {
    console.error(err.message);
  }
};

const deleteFeedback = async (reqId) => {
  const PORT = localStorage.getItem("port");

  console.log(reqId);
  try {
    await fetch(`http://localhost:${PORT}/feedback/${reqId}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
  } catch (err) {
    console.error(err.message);
  }
}

const writeFeedback = async (
  theUserName,
  feedbackText,
  selectedInfo,
  setNewFeedback,
  setSaved,
  setChanged,
  // setSelectedRecordInfo,
  backToPageToggle,
  setBackToPageToggle,
) => {
  
  // Determine the current time
  const [
    dayNumber,
    monthNumber,
    yearNumber,
    hoursNumber,
    minutesNumber,
    secondsNumber,
  ] = determine_current_timestamp();

  const theCurrentTimeStamp = // EG :20221122:184715
    `:${yearNumber}${String(monthNumber).padStart(2, "0")}${String(
      dayNumber
    ).padStart(2, "0")}:` +
    `${String(hoursNumber).padStart(2, "0")}${String(minutesNumber).padStart(
      2,
      "0"
    )}` +
    `${String(secondsNumber).padStart(2, "0")}`;
  const PORT = localStorage.getItem("port");

  try {
    const body = {
      mentor_username: selectedInfo.feedback_req_mentor_username,
      student_username: selectedInfo.feedback_req_student_username,
      timestamp: theCurrentTimeStamp,
      feedbackText: feedbackText,
      thePlanSerialId: selectedInfo.feedback_req_plan_serial_id,
      sent: "no",
    };

    await fetch(`http://localhost:${PORT}/feedbacks/write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(body);

    // setSelectedRecordInfo({ theFeedback: jsonData[0].feedback });
    // setFeedbackCreatedTimeStamp(jsonData[0].created_timestamp);
  } catch (err) {
    console.error(err.message);
  }
};

/*
const updateFeedback = async (
  theUserName,
  feedbackTextArray,
  createdTimestamp,
  setSaved,
  setChanged
) => {
  const PORT = localStorage.getItem("port");

  // Determine the current time
  const [
    dayNumber,
    monthNumber,
    yearNumber,
    hoursNumber,
    minutesNumber,
    secondsNumber,
  ] = determine_current_timestamp();

  try {
    const body = {
      username: theUserName,
      created_timestamp: createdTimestamp,
      amended_timestamp: amendedTimeStamp,
      sfeedback: feedbackTextArray[S_PLAN],
      mfeedback: feedbackTextArray[M_PLAN],
      afeedback: feedbackTextArray[A_PLAN],
      rfeedback: feedbackTextArray[R_PLAN],
      tfeedback: feedbackTextArray[T_PLAN],
      preamble: preambleText,
    };

    await fetch(`http://localhost:${PORT}/feedbacks/updatefeedback`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaved(true);
    setChanged(false);
  } catch (err) {
    console.error(err.message);
  }
};
*/

export function saveFeedback( // DG
  theUserName,
  //theCurrentTimeStamp,
  //theCreatedTimeStamp,
  feedbackText,
  selectedInfo,
  newFeedback,
  setNewFeedback,
  setSaved,
  setChanged,
  // setSelectedRecordInfo,
  // setFeedbackCreatedTimeStamp
  backToPageToggle,
  setBackToPageToggle
) {
  console.log(theUserName, feedbackText, newFeedback, selectedInfo)
  if (newFeedback) {
    // Write a new Feedback record
    writeFeedback(
      theUserName,
      feedbackText,
      selectedInfo,
      setNewFeedback,
      setSaved,
      setChanged,
      // setSelectedRecordInfo,
      // setFeedbackCreatedTimeStamp
      backToPageToggle,
      setBackToPageToggle
    );

/*
  Seeing that the Feedback has been successfully written 
  The next step is to Remove the corresponding Feedback Request
  That is, the next time the Mentor looks at the Feedback Requests page,
  the Mentor will instead see the Feedback entry!
  Its request would have been removed.

  The Feedback Request is identified by the ID of the form Rnnn 
  - nnn being 'feedback_req_id' 
  e.g. for rowId: "R3", feedback_req_id is 3
*/
console.log("ROWID", selectedInfo.rowId);
    deleteFeedbackRequest(selectedInfo.rowId.slice(1));
  } else {
    // Update existing Feedback
    writeFeedback(
    //updateFeedback(
      theUserName,
      // feedbackTextArray,
      // theCreatedTimeStamp,
      setSaved,
      setChanged
    );
  }

  setNewFeedback(false);
  setSaved(true);
  setChanged(false);
  setBackToPageToggle(!backToPageToggle);

  toast.success("Feedback has been saved.", { autoClose: 3000 });
  return;
}


// DG ******

function createPreambleText(feedbackTextArray) {
  let result = "";
  for (let i = 0; i < feedbackTextArray.length; i++) {
    result += feedbackTextArray[i].trim() + " ";
    if (result.length > PREAMBLE_SIZE) {
      break;
    }
  }
  return result.trim().slice(0, PREAMBLE_SIZE);
}
export const setupTimeValues = () => {

  // Determine the current time
  let [
    dayNumber,
    monthNumber,
    yearNumber,
    hoursNumber,
    minutesNumber,
    secondsNumber,
  ] = determine_current_timestamp();

  /* EG FOR new Date("2022-03-01") 
   displayTimeStamp => 01 Mar 2022 00:00:00 - shown onscreen
*/

  const displayTimeStamp =
    `${String(dayNumber).padStart(2, "0")} ${
      monthNames[monthNumber]
    } ${yearNumber}` +
    ` ${String(hoursNumber).padStart(2, "0")}:${String(minutesNumber).padStart(
      2,
      "0"
    )}:` +
    `${String(secondsNumber).padStart(2, "0")}`;

  /* EG FOR new Date("2022-03-01" 
   theCurrentTimeStamp => USERNAME:20220301:000000
                          This is used as the unique key for the Feedback SQL records
*/

  const theCurrentTimeStamp = // EG :20221122:184715
    `:${yearNumber}${String(monthNumber).padStart(2, "0")}${String(
      dayNumber
    ).padStart(2, "0")}:` +
    `${String(hoursNumber).padStart(2, "0")}${String(minutesNumber).padStart(
      2,
      "0"
    )}` +
    `${String(secondsNumber).padStart(2, "0")}`;

  return [displayTimeStamp, theCurrentTimeStamp];
};
