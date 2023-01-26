import React from "react";
import {
  FEEDBACK_TEXTAREA_NUMROWS,
  FEEDBACK_TEXTAREA_NUMCOLS,
  FEEDBACK_ENTRY_MAXLENGTH,
} from "../../data/constants";

import "../../../src/styles.css";

import { useNavigate } from "react-router-dom";



const ViewFeedbackPage = ({
  userName,
  selectedInfo,
  feedbackText,
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="feedbacks-page-style">
      <header className="display-flex">
        <div className="title-viewfeedback-header">{userName}</div>
      </header>
      <section className="display-flex-column-container">
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
                  readOnly
                ></textarea>
              </div>
            </form>
          </div>
        </section>
        <section className="buttons-container">
          {/* Return to the Feedback Editor page */}
          <button className="previous-button"
            onClick={() => navigate("/feedback-received", { replace: true })}
          >
            Previous
          </button>
        </section>
      </section>
    </div>
  );
};

export default ViewFeedbackPage;
