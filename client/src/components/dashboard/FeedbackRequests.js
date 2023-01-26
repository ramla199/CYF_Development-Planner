import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//import FBRequestsNavbar from "../../../src/components/dashboard/FBRequestsNavBar";
import PopulateFeedbackDisplay from "./PopulateFeedbackDisplay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/styles.css";

let fbRequestsTable = [];

function FeedbackRequests() {
  const [allFBRequestsFetched, setAllFBRequestsFetched] = useState(null);
  const [allFeedbacksFetched, setAllFeedbacksFetched] = useState(null);
  const [arrayUpdated, setArrayUpdated] = useState(null);
  const [fbRequestsSelectedInfo, setFBRequestsSelectedInfo] = useState(null);
  const [planFetched, setPlanFetched] = useState(null);
  const [feedbackFetched, setFeedbackFetched] = useState(null);

  const navigate = useNavigate();

  const handleCreateEditClick = (event, isNew, rowId, planId) => {
    event.stopPropagation();
    const feedbackInfo = fbRequestsTable.find(
      (element) => element.rowId === rowId
    );
    // Fetch the Plan details that are related to this selection
    getAPlanById(planId);
    // Indicate that a selection has been made
    setFBRequestsSelectedInfo({ isNew, planId, feedbackInfo });
    console.log(isNew, feedbackInfo);

    // If 'Edit' then fetch the Feedback record
    // isNew === false indicates Editing
    if (!isNew) {
      // Fetch the Feedback details that are related to this selection
      getFeedbackRecord(rowId.slice(1));
    }
  };

  const createFeedback = (event, rowId, planId) =>
    handleCreateEditClick(event, true, rowId, planId);

  const editFeedback = (event, rowId, planId) =>
    handleCreateEditClick(event, false, rowId, planId);

  function deleteFeedback(event, rowId) {
    event.stopPropagation();
    let answer = window.confirm("Are You Sure?");
    if (answer) {
      deleteFeedback2(rowId);
    }
  }

  /*
    Which type of record is being deleted?
    rowId beginning with "F" denotes a Feedback record
    rowId beginning with "R" denotes a Feedback Request record
    So determine which Delete to use accordingly
  */

  async function deleteFeedback2(rowId) {
    const idNumber = rowId.slice(1);
    const whichTable = rowId.startsWith("F")
      ? "feedbacks"
      : "feedback_requests";
    const message =
      "Feedback" +
      (rowId.startsWith("R") ? " Request" : "") +
      " has been deleted.";
    const PORT = localStorage.getItem("port");
    try {
      await fetch(`http://localhost:${PORT}/${whichTable}/${idNumber}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      console.log(fbRequestsTable, rowId, idNumber, whichTable);
      fbRequestsTable = fbRequestsTable.filter(
        (element) => element.rowId !== rowId
      );
      console.log(fbRequestsTable);

      toast.success(message);
    } catch (err) {
      console.error(err.message);
    }
 
    if (fbRequestsTable.length === 0) {
        toast("You have no more Feedback Requests !", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error-message",
        });
        // Go to the Dashboard
        navigate("/dashboard", {
          replace: true,
        });
    }
    
    // Otherwise Indicate that the array has been changed
    setArrayUpdated(fbRequestsTable);
  }

  // Add to the table in Sorted Descending Order
  function addAndSort(array, value) {
    array.push(value);
    let i = array.length - 1;
    let element = array[i];
    while (i > 0 && element.req_timestamp > array[i - 1].req_timestamp) {
      array[i] = array[i - 1];
      i -= 1;
    }
    array[i] = element;
    return array;
  }

  const AllFBRequestsCallback = useCallback(() => {
    console.log(allFBRequestsFetched);
    console.log(allFeedbacksFetched);
    if (allFBRequestsFetched && allFeedbacksFetched) {
      if (
        allFBRequestsFetched.length === 0 &&
        allFeedbacksFetched.length === 0
      ) {
        toast("You have no Feedback Requests !", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error-message",
        });
        // Go to the Dashboard
        navigate("/dashboard", {
          replace: true,
        });
      }

      /* Otherwise set up the Feedback Requests Table for Display
         This table will contain both Feedback Requests and
         created Feedbacks that have not been sent. 
         It will be listed in descending Feedback Request Date order

         Arbitrary characters "R" and "F" are used to denote
         Feedback Request and Feedback records;
         and to ensure React key values are unique
      */

      // First: Add the Feedback Request records to the table
      fbRequestsTable = allFBRequestsFetched.map((element, index) =>
        ({
          rowId: "R" + element.feedback_req_id,
          plan_serial_id: element.feedback_req_plan_serial_id,
          req_mentor_username: element.feedback_req_mentor_username,
          req_student_username: element.feedback_req_student_username,
          req_timestamp: element.feedback_req_timestamp,
          user_fname: element.user_fname,
          user_lname: element.user_lname,
          preamble: element.preamble,
        })
      );

      // Second: Add the Feedback records to fbRequestsTable
      allFeedbacksFetched.forEach((element, index) => {
        const entry = {
          rowId: "F" + element.feedback_id,
          plan_serial_id: element.feedback_plan_serial_id,
          req_mentor_username: element.feedback_mentor_username,
          req_student_username: element.feedback_student_username,
          req_timestamp: element.feedback_request_timestamp,
          user_fname: element.user_fname,
          user_lname: element.user_lname,
          preamble: element.preamble,
        };
        // Add to the table in Sorted Descending Order
        fbRequestsTable = addAndSort(fbRequestsTable, entry);
      });
console.log(fbRequestsTable)
      // Indicate that the Feedback Requests Table has been populated
      setArrayUpdated(fbRequestsTable);
      console.log(fbRequestsTable);
    }
  }, [allFBRequestsFetched, allFeedbacksFetched, navigate]);

  const getAPlanById = async (planId) => {
    try {
      const PORT = localStorage.getItem("port");
      const response = await fetch(
        `http://localhost:${PORT}/planbyid/` + planId,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const jsonData = await response.json();
      setPlanFetched(jsonData[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFeedbackRecord = async (feedbackId) => {
    try {
      const PORT = localStorage.getItem("port");
      const response = await fetch(
        `http://localhost:${PORT}/feedbacks/` + feedbackId,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setFeedbackFetched(jsonData[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch all the Mentor's Feedback Requests
  useEffect(() => {
    const getFBRequests = async () => {
      const PORT = localStorage.getItem("port");
      const name = localStorage.getItem("username");

      try {
        const response = await fetch(
          `http://localhost:${PORT}/feedback_requests/` + name
        );
        const jsonData = await response.json();
        console.log("FBreq", name, jsonData);
        setAllFBRequestsFetched(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getFBRequests();
    console.log("OK2");
  }, []);

  // Fetch all the Mentor's Feedbacks that have been created but not yet sent
  useEffect(() => {
    const getAllFeedbacks = async () => {
      const PORT = localStorage.getItem("port");
      const name = localStorage.getItem("username");

      try {
        const response = await fetch(
          `http://localhost:${PORT}/feedbacks/notsent/` + name
        );
        const jsonData = await response.json();
        console.log("FB", name, jsonData);
        setAllFeedbacksFetched(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getAllFeedbacks();
    console.log("OKK");
  }, []);

  useEffect(() => {
    AllFBRequestsCallback();
  }, [AllFBRequestsCallback]);

  /* Ensure that we have both the Plan and the selected info before going 
   to the Feedback Editor Page
*/
  useEffect(() => {
    if (fbRequestsSelectedInfo && planFetched) {
      const isNew = fbRequestsSelectedInfo.isNew;
      if (isNew) {
        // Creating a New Feedback Option
        const selectedInfo = fbRequestsSelectedInfo.feedbackInfo;
        const feedbackText = ""; // Empty text seeing that it is a new Feedback entry
        navigate("/feedback-editor", {
          state: { selectedInfo, planFetched, feedbackText, isNew },
          replace: true,
        });
        // isNew is false therefore test 'feedbackFetched'
      } else if (feedbackFetched) {
        // Editing an Existent Feedback Option
        const selectedInfo = fbRequestsSelectedInfo.feedbackInfo;
        const feedbackText = feedbackFetched.feedback_text;
        navigate("/feedback-editor", {
          state: { selectedInfo, planFetched, feedbackText, isNew },
          replace: true,
        });
      }
    }
  }, [fbRequestsSelectedInfo, navigate, planFetched, feedbackFetched]);

  return (
    arrayUpdated && (
      <>
        <table className="feedback-display-table">
          <thead>
            <tr>
              <th className="column1-display" width="10%">
                Feedback
                <br />
                Request Date
              </th>
              <th width="15%">
                Requested
                <br />
                By
              </th>
              <th width="60%">
                Plan
                <br />
                Summary
              </th>
              <th width="5%"></th>
              <th width="5%">Actions</th>
              <th width="5%"></th>
            </tr>
          </thead>
          <tbody>
            <PopulateFeedbackDisplay
              fbRequestsTable={fbRequestsTable}
              createFeedback={createFeedback}
              editFeedback={editFeedback}
              deleteFeedback={deleteFeedback}
            />
          </tbody>
        </table>
      </>
    )
  );
}

export default FeedbackRequests;
