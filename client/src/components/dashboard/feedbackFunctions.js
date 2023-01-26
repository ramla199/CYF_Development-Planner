
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

  try {
    await fetch(`http://localhost:${PORT}/feedback_requests/${reqId}`, {
      method: "DELETE",
      headers: { token: localStorage.token },
    });
  } catch (err) {
    console.error(err.message);
  }
};


const writeFeedback = async (
  feedbackText,
  selectedInfo,
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

  const theCurrentTimeStamp = // EG :20221122:184715
    `:${yearNumber}${String(monthNumber).padStart(2, "0")}${String(
      dayNumber
    ).padStart(2, "0")}:` +
    `${String(hoursNumber).padStart(2, "0")}${String(minutesNumber).padStart(
      2,
      "0"
    )}` +
    `${String(secondsNumber).padStart(2, "0")}`;

 
  try {
    const body = {
      mentor_username: selectedInfo.req_mentor_username,
      student_username: selectedInfo.req_student_username,
      request_timestamp: selectedInfo.req_timestamp,
      sent_timestamp: theCurrentTimeStamp,
      feedbackText: feedbackText.trimEnd(),
      thePlanSerialId: selectedInfo.plan_serial_id,
      sent: "no",
    };

    await fetch(`http://localhost:${PORT}/feedbacks/write`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err.message);
  }
};


const updateFeedback = async (
  isSent,
  feedbackText,
  selectedInfo,
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

  const theCurrentTimeStamp = // EG :20221122:184715
    `:${yearNumber}${String(monthNumber).padStart(2, "0")}${String(
      dayNumber
    ).padStart(2, "0")}:` +
    `${String(hoursNumber).padStart(2, "0")}${String(minutesNumber).padStart(
      2,
      "0"
    )}` +
    `${String(secondsNumber).padStart(2, "0")}`;



/*
  The Feedback record is identified by an ID represented as Fnnn 
  - nnn being 'feedback_id' 
  e.g. for rowId: "F1", feedback_id is 1
  Hence selectedInfo.rowId.slice(1)
*/


  try {
    const body = {
      feedback_id: selectedInfo.rowId.slice(1),
      sentTimestamp: theCurrentTimeStamp,
      feedbackText: feedbackText.trimEnd(),
      isSent: isSent,
    };

    await fetch(`http://localhost:${PORT}/feedbacks/updatefeedback`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err.message);
  }
};


export function saveFeedback( // DG
  isSent,
  feedbackText,
  selectedInfo,
  newFeedback,
) {
  if (newFeedback) {
    // Write a new Feedback record
    writeFeedback(feedbackText, selectedInfo);

/*
  Seeing that the Feedback has been successfully written 
  The next step is to Remove the corresponding Feedback Request
  That is, the next time the Mentor looks at the Feedback Requests page,
  the Mentor will instead see the new Feedback entry!
  Its request would have been removed.

  The Feedback Request is identified by an ID represented as Rnnn 
  - nnn being 'feedback_req_id' 
  e.g. for rowId: "R3", feedback_req_id is 3
  Hence selectedInfo.rowId.slice(1)
*/
    deleteFeedbackRequest(selectedInfo.rowId.slice(1));
  } else {
    // Update existing Feedback
    updateFeedback(
      isSent,
      feedbackText,
      selectedInfo
    );
  }

  if (isSent === "yes") {
        toast.success("Feedback has been sent.", { autoClose: 3000 });
  } else {
        toast.success("Feedback has been saved.", { autoClose: 3000 });
  }
  return;
}