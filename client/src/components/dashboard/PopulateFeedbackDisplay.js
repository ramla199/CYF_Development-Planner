import React from "react";

import { normaliseNames } from "./normaliseNames";
import { monthNames } from "../../../src/data/constants.js";

import "../../../src/styles.css";

const PopulateFeedbackDisplay = ({
  fbRequestsTable,
  createFeedback,
  editFeedback,
  deleteFeedback
}) => {    
    console.log(fbRequestsTable)
   const setupTable = fbRequestsTable.map((element, index) => {
        const rowId = element.rowId; 
        const planId = element.plan_serial_id;
        let temp = element.req_timestamp.replace(/:/g, ""); // YYYYMMDDHHMMSS 
        const displayDate = `${temp.slice(6, 8)} ${monthNames[+temp.slice(4, 6)]} ${temp.slice(0, 4)} ` +
                            `${temp.slice(8, 10)}:${temp.slice(10, 12)}:${temp.slice(12, 14)}`;
        const fullname = normaliseNames(element.user_fname, element.user_lname);
        const summary = element.preamble;
        const showCreate = "button " + (rowId.startsWith("F") ? 'HIDDEN' : 'VISIBLE');
        const showEdit = "button " + (rowId.startsWith("R") ? "HIDDEN" : "VISIBLE");
 
        return {rowId, planId, displayDate, fullname, summary, showCreate, showEdit, }
    });

    console.log(fbRequestsTable);
    console.log(setupTable)
    
    return (
        setupTable.map(({ rowId, planId, displayDate, fullname, summary, showCreate, showEdit }) => {
        return (
          <tr key={rowId}>
            <td>{displayDate}</td>
            <td>{fullname}</td>
            <td>{summary}</td>
            <td className="operation">
              <button
                className={showCreate}
                onClick={(event) => createFeedback(event, rowId, planId)}
                disabled={rowId.startsWith("F")}
              >
                Create
              </button>
              <button
                className={showEdit}
                onClick={(event) => editFeedback(event, rowId, planId)}
                disabled={rowId.startsWith("R")}
              >
                Edit
              </button>
              <button
                className="button"
                onClick={(event) => deleteFeedback(event, rowId, planId)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })
    )

};


export default PopulateFeedbackDisplay;