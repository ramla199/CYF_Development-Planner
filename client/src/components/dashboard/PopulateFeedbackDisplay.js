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
        const planId = element.feedback_req_plan_serial_id 
        let temp = element.feedback_req_timestamp.replace(/:/g, ""); // YYYYMMDDHHMMSS 
        const displayDate = `${temp.slice(6, 8)} ${monthNames[+temp.slice(4, 6)]} ${temp.slice(0, 4)} ` +
                            `${temp.slice(8, 10)}:${temp.slice(10, 12)}:${temp.slice(12, 14)}`;
        const fullname = normaliseNames(element.user_fname, element.user_lname);
        const summary = element.preamble;
        const showCreate = true;
        const showEdit = false;
 
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
              <button className="button" onClick={(event) => createFeedback(event, rowId, planId)}>
                Create
              </button>
              <button className="button" onClick={(event) => editFeedback(event, rowId, planId)}>
                Edit
              </button>
              <button className="button" onClick={(event) => deleteFeedback(event, rowId, planId)}>
                Delete
              </button>
            </td>
          </tr>
        )
      })
    )

};


export default PopulateFeedbackDisplay;