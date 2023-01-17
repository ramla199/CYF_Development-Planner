import React from "react";
import PlanDefinition from "./PlanDefinition";

import {
  S_PLAN,
  M_PLAN,
  A_PLAN,
  R_PLAN,
  T_PLAN,
} from "../../data/constants.js";

import { savePlan } from "./planFunctions";

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
  setPlanCreatedTimeStamp,
  allEmpty,
  discardPlan,
  planCreatedTimeStamp,
  saveThenGotoPlans,
  newOrChanged,
  gotoSelectMentor,
}) => {
  return (
    <div className="plans-page-style">
      <header className="display-flex">
        <div className="title-username-header">{userName}</div>
        <div className="title-header timestamp-header">{displayTimeStamp}</div>
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
        />
      </section>
      <section className="buttons-container">
        <button
          className="button-78"
          onClick={() => discardPlan(theCurrentTimeStamp)}
        >
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
          // If all the fields are empty, disable the Save option
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
  );
};

export default DisplayPlanEditorPage;