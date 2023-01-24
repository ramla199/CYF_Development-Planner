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
  const [arrayUpdate, setArrayUpdate] = useState(false);
  const [fbRequestsSelectedInfo, setFBRequestsSelectedInfo] = useState(null);
  const [planFetched, setPlanFetched] = useState(null);
  const [feedbackFetched, setFeedbackFetched] = useState(null);

  const navigate = useNavigate();

  const handleCreateEditClick = (event, isNew, rowId, planId) => {
    //event.stopPropagation();
    const feedbackInfo = fbRequestsTable.find(
      (element) => element.rowId === rowId
    );
    // Fetch the Plan details that are related to this selection
    getAPlanById(planId);
    // Indicate that a selection has been made
    setFBRequestsSelectedInfo({ isNew, planId, feedbackInfo });
    console.log(isNew,feedbackInfo)

    // If 'Edit' then fetch the Feedback record 
    // isNew === false indicates Editing
    if (!isNew) {
      // Fetch the Feedback details that are related to this selection
      getFeedbackRecord(rowId.slice(1));
    }
  };

  function deleteFeedback(index) {
    let answer = window.confirm("Are You Sure?");
    if (answer) {
      deleteFeedback2(index);
    }
  }

  const createFeedback = (event, rowId, planId) =>
    handleCreateEditClick(event, true, rowId, planId);

  const editFeedback = (event, rowId, planId) =>
    handleCreateEditClick(event, false, rowId, planId);

  async function deleteFeedback2(deleteIndex) {
    // Need to subtract one because the 0th item represents the "Create Feedback Request" message
    // So the first fbRequests is indexed with the value 1
    // The second is indexed as 2, etc.
    // Therefore subtract 1 to determine the actual true index

    const actualIndex = deleteIndex - 1;
    const serialId = allFBRequestsFetched[actualIndex].fbRequests_serial_id;
    const PORT = localStorage.getItem("port");
    try {
      await fetch(`http://localhost:${PORT}/feedback_requests/${serialId}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setAllFBRequestsFetched(
        allFBRequestsFetched.filter((_, index) => index !== actualIndex)
      );
      toast.success("Feedback Request has been deleted.");
    } catch (err) {
      console.error(err.message);
    }
  }

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
    if (allFBRequestsFetched && allFeedbacksFetched) {
      // console.log(
      //   allFBRequestsFetched.length,
      //   allFeedbacksFetched.length,
      //   allFBRequestsFetched.length === 0 && allFeedbacksFetched.length === 0
      // ); DG
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

      /* Otherwise setup the Feedback Requests Table for Display
         This table will contain both Feedback Requests and
         created Feedback that has not been sent 
         It will be in descending Feedback Request Date order

         Arbitrary characters "R" and "F" are used to denote
         Feedback Request and Feedback records;
         and to ensure React key values are unique
      */

      // First: Add the Feedback Request records to the table
      fbRequestsTable = allFBRequestsFetched.map((element, index) =>
        // Object.assign(element, {
        //   rowId: "R" + element.feedback_req_id, DG
        // })

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
        // Object.assign(element, {
        //   rowId: "R" + element.feedback_req_id,
        // })
        console.log(element);
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
        fbRequestsTable = addAndSort(fbRequestsTable, entry);
      });

      // Indicate that the Feedback Requests Table has been populated
      setArrayUpdate(true);
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
      console.log(jsonData)
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
    arrayUpdate && (
      <>
        <table>
          <thead>
            <tr>
              <th>
                Feedback
                <br />
                Request Date
              </th>
              <th>
                Requested
                <br />
                By
              </th>
              <th>
                Plan
                <br />
                Summary
              </th>
              <th>Action 1</th>
              <th>Action 2</th>
              <th>Action 3</th>
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
