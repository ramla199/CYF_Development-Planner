import React from "react";
import { monthNames, PREAMBLE_SIZE } from "../../../src/data/constants.js";

/*
EG

theIndex => 1 
theKey => 20230007114954 for 07 Jan 2023 11:49:54am
preambleText => Hello World
*/

const DisplayListItem = ({
  theIndex,
  theKey,
  preambleText,
  handleClick,
  deletePlan,
}) => {
  let colourClass, theDateAndTime, thePreamble;

  if (theIndex === 0) {
    // This is the exception - this will display CREATE PLAN instead
    return (
      <div
        className="main-menu-item"
        onClick={(event) => handleClick(event, theIndex)}
      >
        <div className="main-menu-date datetime0-colour">
          <>
            <span className="line1">Create</span>
            <span className="line2">Plan</span>
          </>
        </div>
        <div className="new-plan-desc">Click to create a new plan</div>
      </div>
    );
  } else {
    [colourClass, theDateAndTime] = createDateDisplay(theIndex, theKey);
    thePreamble = createPreamble(preambleText) + " ...";
    colourClass += " main-menu-date";
  }

  return (
    <>
      <div
        className="main-menu-item"
        onClick={(event) => handleClick(event, theIndex, theKey)}
      >
        <div className={colourClass}>
          <p className="date-and-time">{theDateAndTime}</p>
        </div>
        <div className="main-menu-description">{thePreamble}</div>
      </div>
      <button className={"delete-button"} onClick={() => deletePlan(theIndex)}>
        Delete
      </button>
    </>
  );
};

function createDateDisplay(index, eachKey) {
  // 01234567890123
  // YYYYMMDDHHMMSS

  const displayTimeStamp =
    `${eachKey.slice(6, 8)} ${monthNames[+eachKey.slice(4, 6)]} ${eachKey.slice(
      0,
      4
    )} ` +
    `${eachKey.slice(8, 10)}:${eachKey.slice(10, 12)}:${eachKey.slice(12, 14)}`;
  const theClassName = "datetime" + (index % 4) + "-colour";
  return [theClassName, displayTimeStamp];
}

function createPreamble(preambleTextArray) {
  let result = "";
  for (let i = 0; i < preambleTextArray.length; i++) {
    result += preambleTextArray[i];
    if (result.length > PREAMBLE_SIZE) {
      break;
    }
  }
  return result.slice(0, PREAMBLE_SIZE);
}

export default DisplayListItem;
