import React from "react";
import {
  FEEDBACK_TEXTAREA_NUMROWS,
  FEEDBACK_TEXTAREA_NUMCOLS,
  FEEDBACK_ENTRY_MAXLENGTH,
} from "../../data/constants";
import "../../../src/styles.css";

import RemainingCharactersText from "./RemainingCharactersText";

import { saveFeedback } from "./feedbackFunctions";

import { useNavigate } from "react-router-dom";


function showRemainingChars(feedbackCharacterCount) {
  let diff = FEEDBACK_ENTRY_MAXLENGTH - feedbackCharacterCount;
  let newRemainingText =
    String(diff).padStart(4, "0") + " Remaining Characters";
  let s = String(diff);
  newRemainingText = " ".repeat(4 - s.length) + diff + " Remaining Characters";
  return <pre>{newRemainingText}</pre>;
}

const DisplayFeedbackEditorPage = ({
  userName,
  //displayTimeStamp,
  //  theCurrentTimeStamp,
  //splan,mplan,aplan,rplan,tplan,
  selectedInfo,
  planFetched,
  feedbackText,
  setFeedbackText,
  feedbackCharacterCount,
  setFeedbackCharacterCount,
  newFeedback,
  setNewFeedback,
  // setSelectedRecordInfo,
  setSaved,
  setChanged,
  // feedbackCreatedTimeStamp,
  // setFeedbackCreatedTimeStamp,
  allEmpty,
  discardFeedback,
  saveThenGotoFeedback,
  newOrChanged,
  indicateSentThenGotoFeedback,
  handleChange,
  saveThenRedisplay
}) => {
  const navigate = useNavigate();
  return (
    <div className="feedbacks-page-style">
      <header className="feedbacks-display-flex">
        <div className="title-username-header">{userName}</div>
        <div className="title-header">Feedback:</div>
      </header>
      <section className="display-flex-column-container">
        <section className="flex-container">
          <div className="flex-child scroll">
            <h2 className="feedbacks-goal-attribute">SPECIFIC</h2>
            <p className="feedbacks-show-plan">{selectedInfo.splan}</p>
            <h2 className="feedbacks-goal-attribute">MEASURABLE</h2>
            <p className="feedbacks-show-plan">{selectedInfo.mplan}</p>
            <h2 className="feedbacks-goal-attribute">ACHIEVABLE</h2>
            <p className="feedbacks-show-plan">{selectedInfo.aplan}</p>
            <h2 className="feedbacks-goal-attribute">RELEVANT</h2>
            <p className="feedbacks-show-plan">{selectedInfo.rplan}</p>
            <h2 className="feedbacks-goal-attribute">TIMEBOUND</h2>
            <p className="feedbacks-show-plan">{selectedInfo.tplan}</p>
          </div>
          <div className="flex-child">
            <form>
              <div className="textarea-label">
                <textarea
                  className="text-area"
                  rows={FEEDBACK_TEXTAREA_NUMROWS}
                  cols={FEEDBACK_TEXTAREA_NUMCOLS}
                  maxLength={FEEDBACK_ENTRY_MAXLENGTH}
                  autoFocus
                  placeholder="Please enter Feedback"
                  id="feedback"
                  name="feedback"
                  autoComplete="off"
                  value={feedbackText}
                  // onChange={(event) => handleChange(event)}
                  // DG
                  onChange={(event) => {
                    console.log(event.target.value);
                    handleChange(event);
                  }}
                ></textarea>
              </div>
            </form>
          </div>
        </section>
        <section className="buttons-container">
          <div className="td-remaining-and-button">
            <RemainingCharactersText
              maxLength={FEEDBACK_ENTRY_MAXLENGTH}
              remainNum={feedbackCharacterCount}
              text={showRemainingChars(feedbackCharacterCount)}
            />
          </div>
          <button className="button-78" onClick={() => discardFeedback()}>
            Discard
          </button>
          <button
            className="button-78"
            onClick={saveThenRedisplay}

            // DG navigate("/feedback-editor");
            // If the Text Area is empty, disable the Save option
            disabled={allEmpty()}
          >
            Save
          </button>
          <button
            className="button-78"
            onClick={saveThenGotoFeedback}
            // If the Text Area is empty, disable the 'Save & Close' option
            disabled={allEmpty()}
          >
            Save & Close
          </button>
          <button
            className="button-78"
            onClick={indicateSentThenGotoFeedback}
            // If it is an unsaved new feedback entry or changes have been made, disable this button
            disabled={newOrChanged()}
          >
            Send Feedback
          </button>
        </section>
      </section>
    </div>
  );
};

export default DisplayFeedbackEditorPage;
