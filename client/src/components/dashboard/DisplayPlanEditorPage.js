import React, { useState } from "react";
import PlanDefinition from "./PlanDefinition";

import {
  S_PLAN,
  M_PLAN,
  A_PLAN,
  R_PLAN,
  T_PLAN,
} from "../../data/constants.js";

import { savePlan } from "./planFunctions";

import {
  PLAN_ENTRY_MAXLENGTH,
  PLAN_TEXTAREA_NUMCOLS,
  PLAN_PLACEHOLDERS,
  PLAN_ATTRIBUTES
} from "../../../src/data/constants";

import RemainingCharactersText from "./RemainingCharactersText";
import { showRemainingChars } from "./planFunctions";


import "../../../src/styles.css";


const DisplayPlanEditorPage = ({
  userName,
  displayTimeStamp,
  theCurrentTimeStamp,
  planTextArray,
  setPlanTextArray,
  planCharacterCount,
  setPlanCharacterCount,
  newPlan,
  setNewPlan,
  setSelectedRecordInfo,
  setSaved,
  setChanged,
  planCreatedTimeStamp,
  setPlanCreatedTimeStamp,
  allEmpty,
  discardPlan,
  saveThenGotoPlans,
  newOrChanged,
  gotoSelectMentor,
}) => {
  // 0-4 to show the Expanded Overlay
  // -1 to hide the Overlay
  const [planNumber, setPlanNumber] = useState(-1);


  function handleOverlayChange(event, whichPlan) {
    let enteredPlan = event.target.value;
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
    <div className="overlay-grid-container">
      <div className="non-overlay-content plans-page-style">
        <header className="display-flex">
          <div className="title-username-header">{userName}</div>
          <div className="title-header timestamp-header">
            {displayTimeStamp}
          </div>
        </header>
        <section className="grid-container-border">
          <PlanDefinition
            whichPlan={S_PLAN}
            letter={"S"}
            attribute={"SPECIFIC"}
            planTextArray={planTextArray}
            setPlanTextArray={setPlanTextArray}
            planCharacterCount={planCharacterCount}
            setPlanCharacterCount={setPlanCharacterCount}
            setChanged={setChanged}
            setPlanNumber={setPlanNumber}
          />
          <PlanDefinition
            whichPlan={M_PLAN}
            letter={"M"}
            attribute={"MEASURABLE"}
            planTextArray={planTextArray}
            setPlanTextArray={setPlanTextArray}
            planCharacterCount={planCharacterCount}
            setPlanCharacterCount={setPlanCharacterCount}
            setChanged={setChanged}
            setPlanNumber={setPlanNumber}
          />
          <PlanDefinition
            whichPlan={A_PLAN}
            letter={"A"}
            attribute={"ACHIEVABLE"}
            planTextArray={planTextArray}
            setPlanTextArray={setPlanTextArray}
            planCharacterCount={planCharacterCount}
            setPlanCharacterCount={setPlanCharacterCount}
            setChanged={setChanged}
            setPlanNumber={setPlanNumber}
          />
          <PlanDefinition
            whichPlan={R_PLAN}
            letter={"R"}
            attribute={"RELEVANT"}
            planTextArray={planTextArray}
            setPlanTextArray={setPlanTextArray}
            planCharacterCount={planCharacterCount}
            setPlanCharacterCount={setPlanCharacterCount}
            setChanged={setChanged}
            setPlanNumber={setPlanNumber}
          />
          <PlanDefinition
            whichPlan={T_PLAN}
            letter={"T"}
            attribute={"TIMEBOUND"}
            planTextArray={planTextArray}
            setPlanTextArray={setPlanTextArray}
            planCharacterCount={planCharacterCount}
            setPlanCharacterCount={setPlanCharacterCount}
            setChanged={setChanged}
            setPlanNumber={setPlanNumber}
          />
        </section>
        <section className="buttons-container">
          <button className="button-78" onClick={() => discardPlan()}>
            Discard
          </button>
          <button
            className="button-78"
            onClick={() =>
              savePlan(
                userName,
                theCurrentTimeStamp,
                planCreatedTimeStamp,
                planTextArray,
                newPlan,
                setNewPlan,
                setSaved,
                setChanged,
                setSelectedRecordInfo,
                setPlanCreatedTimeStamp
              )
            }
            // If all the fields are empty, disable the Save option
            disabled={allEmpty()}
          >
            Save
          </button>
          <button
            className="button-78"
            onClick={saveThenGotoPlans}
            // If all the fields are empty, disable the 'Save & Close' option
            disabled={allEmpty()}
          >
            Save & Close
          </button>
          <button
            className="button-78"
            onClick={gotoSelectMentor}
            // If it is an unsaved new plan or changes have been made, disable this button
            disabled={newOrChanged()}
          >
            Request Feedback
          </button>
        </section>
      </div>
      {/* The Overlay */}
      <section
        className={
          "overlay-content " +
          (planNumber < 0 ? " OVERLAY-HIDDEN" : "OVERLAY-VISIBLE")
        }
      >
        <div className="plans-page-style">
          <header className="display-flex">
            <div className="title-username-header">{userName}</div>
            <div className="title-header timestamp-header">
              {displayTimeStamp}
            </div>
          </header>
          <div className="td-goal-attribute">
            <div className="goal-attribute">{PLAN_ATTRIBUTES[planNumber]}</div>
          </div>
          <div className="td-goal-text-entry">
            <div>
              <form>
                <div className="textarea-label">
                  <textarea
                    className="text-area"
                    rows="25"
                    cols={PLAN_TEXTAREA_NUMCOLS}
                    placeholder={PLAN_PLACEHOLDERS[planNumber]}
                    maxLength={PLAN_ENTRY_MAXLENGTH}
                    autoFocus
                    id="expanded-input"
                    name="expanded-input"
                    autoComplete="off"
                    value={planTextArray[planNumber]}
                    onChange={(event) => handleOverlayChange(event, planNumber)}
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
          <div className="td-remaining-and-button td-remaining-centre">
            <RemainingCharactersText
              maxLength={PLAN_ENTRY_MAXLENGTH}
              remainNum={planCharacterCount[planNumber]}
              text={showRemainingChars(
                planNumber,
                PLAN_ENTRY_MAXLENGTH,
                planCharacterCount
              )}
            />
            <div>
              <button
                className="button-76 collapse-button-styling"
                onClick={() => setPlanNumber(-1)}
              >
                Collapse
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisplayPlanEditorPage;
