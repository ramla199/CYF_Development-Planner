import React from "react";

import { normaliseNames } from "./normaliseName";
import { monthNames } from "../../data/constants.js";

import "../../../src/styles.css";

const PopulateReceivedFeedbackDisplay = ({
  feedbacksTable,
  viewFeedback,
  deleteFeedback,
}) => {
  const setupTable = feedbacksTable.map((element, index) => {
    const feedbackId = element.feedback_id;
    const planId = element.feedback_plan_serial_id;
    let temp = element.feedback_request_timestamp.replace(/:/g, ""); // YYYYMMDDHHMMSS
    const displayRequestDate =
      `${temp.slice(6, 8)} ${monthNames[+temp.slice(4, 6)]} ${temp.slice(
        0,
        4
      )} ` + `${temp.slice(8, 10)}:${temp.slice(10, 12)}:${temp.slice(12, 14)}`;

    temp = element.feedback_sent_timestamp.replace(/:/g, ""); // YYYYMMDDHHMMSS
    const displaySentDate =
      `${temp.slice(6, 8)} ${monthNames[+temp.slice(4, 6)]} ${temp.slice(
        0,
        4
      )} ` + `${temp.slice(8, 10)}:${temp.slice(10, 12)}:${temp.slice(12, 14)}`;
    const fullname = normaliseNames(element.user_fname, element.user_lname);

    const summary = element.preamble;

    return {
      feedbackId,
      planId,
      displayRequestDate,
      displaySentDate,
      fullname,
      summary,
    };
  });

  return setupTable.map(
    ({
      feedbackId,
      planId,
      displayRequestDate,
      displaySentDate,
      fullname,
      summary,
    }) => {
      return (
        <tr key={feedbackId}>
          <td className="table-show-date">{displayRequestDate}</td>
          <td className="td-centre">{fullname}</td>
          <td className="table-show-date">{displaySentDate}</td>
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
