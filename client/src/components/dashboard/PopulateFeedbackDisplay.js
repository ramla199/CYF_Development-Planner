import React from "react";

import { normaliseNames } from "./normaliseNames";
import { monthNames } from "../../../src/data/constants.js";

import "../../../src/styles.css";

const PopulateFeedbackDisplay = ({
  fbRequestsTable,
  createFeedback,
  editFeedback,
  deleteFeedback,
}) => {
    const setupTable = fbRequestsTable.map((element, index) => {
    const rowId = element.rowId;
    const planId = element.plan_serial_id;
    let temp = element.req_timestamp.replace(/:/g, ""); // YYYYMMDDHHMMSS
    const displayDate =
      `${temp.slice(6, 8)} ${monthNames[+temp.slice(4, 6)]} ${temp.slice(0,4)} ` + 
      `${temp.slice(8, 10)}:${temp.slice(10, 12)}:${temp.slice(12, 14)}`;
    const fullname = normaliseNames(element.user_fname, element.user_lname);
    const summary = element.preamble;
    const showCreate =
      "button " + (rowId.startsWith("F") ? "HIDDEN" : "VISIBLE");
    const showEdit = "button " + (rowId.startsWith("R") ? "HIDDEN" : "VISIBLE");

    return {
      rowId,
      planId,
      displayDate,
      fullname,
      summary,
      showCreate,
      showEdit,
    };
  });


  return setupTable.map(
    ({
      rowId,
      planId,
      displayDate,
      fullname,
      summary,
      showCreate,
      showEdit,
    }) => {
      return (
        <tr key={rowId}>
          <td className="table-show-date">{displayDate}</td>
          <td className="td-centre">{fullname}</td>
          <td>{summary.slice(0,240)}</td>
          <td>
            <button
              className={showCreate}
              onClick={(event) => createFeedback(event, rowId, planId)}
              disabled={rowId.startsWith("F")}
            >
              Create
            </button>
          </td>
          <td>
            <button
              className={showEdit}
              onClick={(event) => editFeedback(event, rowId, planId)}
              disabled={rowId.startsWith("R")}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              className="button"
              onClick={(event) => deleteFeedback(event, rowId)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  );
};

export default PopulateFeedbackDisplay;
