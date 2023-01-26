import React from "react";

import { normaliseNames } from "./normaliseNames";
import { monthNames } from "../../data/constants.js";

import "../../../src/styles.css";

const PopulateReceivedFeedbackDisplay = ({
  feedbacksTable,
  viewFeedback,
  deleteFeedback,
}) => {
  console.log(feedbacksTable);
  const setupTable = feedbacksTable.map((element, index) => {
    const feedbackId = element.feedback_id;
    const planId = element.feedback_plan_serial_id;
    let temp = element.feedback_request_timestamp.replace(/:/g, ""); // YYYYMMDDHHMMSS
    const displayDate =
          `${temp.slice(6, 8)} ${monthNames[+temp.slice(4, 6)]} ${temp.slice(0,4)} ` +
          `${temp.slice(8, 10)}:${temp.slice(10, 12)}:${temp.slice(12, 14)}`;
    const fullname = normaliseNames(element.user_fname, element.user_lname);
    const summary = element.preamble;

    return {
      feedbackId,
      planId,
      displayDate,
      fullname,
      summary,
    };
  });

  console.log(feedbacksTable);
  console.log(setupTable);

  return setupTable.map(
    ({
      feedbackId,
      planId,
      displayDate,
      fullname,
      summary,
    }) => {
      return (
        <tr key={feedbackId}>
          <td className="table-show-date">{displayDate}</td>
          <td className="td-centre">{fullname}</td>
          <td>{summary.slice(0, 240)}</td>
          <td>
            <button
              className="button"
              onClick={(event) => viewFeedback(event, feedbackId, planId)}
            >
              View
            </button>
          </td>
          <td>
            <button
              className="button"
              onClick={(event) => deleteFeedback(event, feedbackId)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  );
};


export default PopulateReceivedFeedbackDisplay;