import {
  PLAN_ENTRY_MAXLENGTH,
  PLAN_TEXTAREA_NUMROWS,
  PLAN_TEXTAREA_NUMCOLS,
  PLAN_PLACEHOLDERS,
} from  "../../../src/data/constants";
import "../../../src/styles.css"

import RemainingCharactersText from "./RemainingCharactersText";

import React from "react";

const PlanDefinition = ({
  whichPlan,
  letter,
  attribute,
  planTextArray,
  setPlanTextArray,
  planCharacterCount,
  setPlanCharacterCount,
  setChanged
}) => {
  function showRemainingChars(whichPlan) {
    let diff = PLAN_ENTRY_MAXLENGTH - planCharacterCount[whichPlan];
    let newRemainingText =
      String(diff).padStart(4, "0") + " Remaining Characters";
    let s = String(diff);
    newRemainingText =
      " ".repeat(4 - s.length) + diff + " Remaining Characters";
    return <pre>{newRemainingText}</pre>;
  }

  function handleChange(event, whichPlan) {
    let enteredPlan = event.target.value.trim();
    // Indicate there has been a change
    setChanged(true);

    // Update display with the Remaining Characters
    const updatedText = [...planTextArray];
    updatedText[whichPlan] = enteredPlan;
    // Show Entered Text
    setPlanTextArray(updatedText);

    // Show Number Of Characters Remaining
    const updatedCount = [...planCharacterCount];
    updatedCount[whichPlan] = enteredPlan.length;
    setPlanCharacterCount(updatedCount);
  }

  return (
    <section className="grid-container">
      <div className="td-goal-letter">
        <div className="goal-letter">{letter}</div>
      </div>
      <div className="td-goal-attribute">
        <div className="goal-attribute">{attribute}</div>
      </div>
      <div className="td-goal-text-entry">
        <div>
          <form>
            <div className="textarea-label">
              <textarea
                className="text-area"
                rows={PLAN_TEXTAREA_NUMROWS}
                cols={PLAN_TEXTAREA_NUMCOLS}
                placeholder={PLAN_PLACEHOLDERS[whichPlan]}
                maxLength={PLAN_ENTRY_MAXLENGTH}
                // EG "S-input"
                id={letter + "-input"}
                // EG "S-goal"
                name={letter + "-goal"}
                autoComplete="off"
                value={planTextArray[whichPlan]}
                onChange={(event) => handleChange(event, whichPlan)}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="td-remaining-and-button">
        <RemainingCharactersText
          maxLength={PLAN_ENTRY_MAXLENGTH}
          remainNum={planCharacterCount[whichPlan]}
          text={showRemainingChars(whichPlan)}
        />
        <div>
          <button className="button-76 expand-button-styling">Expand</button>
        </div>
      </div>
    </section>
  );
};

export default PlanDefinition;