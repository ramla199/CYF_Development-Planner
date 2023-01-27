import React from "react";
import {
  FEEDBACK_TEXTAREA_NUMROWS,
  FEEDBACK_TEXTAREA_NUMCOLS,
  FEEDBACK_ENTRY_MAXLENGTH,
} from "../../data/constants";
import "../../../src/styles.css";

import RemainingCharactersText from "./RemainingCharactersText";

import { normaliseNames } from "./normaliseNames";


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
  selectedInfo,
  feedbackText,
  feedbackCharacterCount,
  allEmpty,
  newOrChanged,
  discardFeedback,
  saveThenGotoFeedback,
  indicateSentThenGotoFeedback,
  handleChange,
}) => {
  const fullname = normaliseNames(selectedInfo.user_fname, selectedInfo.user_lname);
  return (
    <div className="feedbacks-page-style">
      <header className="feedbacks-display-flex">
        <div className="title-username-header">{fullname}</div>
        <div className="title-header">Feedback</div>
      </header>
      <section>
        <section className="flex-container">
          <div className="flex-child scroll">
            {/* Only show the nonnull portions of a plan */}
            {selectedInfo.splan.length > 0 && (
              <>
                <h2 className="feedbacks-goal-attribute">SPECIFIC</h2>
                <p className="feedbacks-show-plan">{selectedInfo.splan}</p>
              </>
            )}
            {selectedInfo.mplan.length > 0 && (
              <>
                <h2 className="feedbacks-goal-attribute">MEASURABLE</h2>
                <p className="feedbacks-show-plan">{selectedInfo.mplan}</p>
              </>
            )}
            {selectedInfo.aplan.length > 0 && (
              <>
                <h2 className="feedbacks-goal-attribute">ACHIEVABLE</h2>
                <p className="feedbacks-show-plan">{selectedInfo.aplan}</p>
              </>
            )}
            {selectedInfo.rplan.length > 0 && (
              <>
                <h2 className="feedbacks-goal-attribute">RELEVANT</h2>
                <p className="feedbacks-show-plan">{selectedInfo.rplan}</p>
              </>
            )}
            {selectedInfo.tplan.length > 0 && (
              <>
                <h2 className="feedbacks-goal-attribute">TIMEBOUND</h2>
                <p className="feedbacks-show-plan">{selectedInfo.tplan}</p>
              </>
            )}
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
                  onChange={(event) => handleChange(event)}
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
