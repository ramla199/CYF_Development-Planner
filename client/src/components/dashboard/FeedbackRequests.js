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
  const [arrayUpdate, setArrayUpdate] = useState(false);
  const [fbRequestsSelectedInfo, setFBRequestsSelectedInfo] = useState(null);
  const [planFetched, setPlanFetched] = useState(null);

  const navigate = useNavigate();

  const handleCreateEditClick = (event, isNew, rowId, planId) => {
    //event.stopPropagation();
    const feedbackInfo = fbRequestsTable.find(
      (element) => element.rowId === rowId
    );
    // Fetch the plan details that are related to this selection
    getAPlanById(planId);
    // Indicate that a selection has been made
    setFBRequestsSelectedInfo({ isNew, planId, feedbackInfo });
  };

  function deleteFeedback(index) {
    let answer = window.confirm("Are You Sure?");
    if (answer) {
      deleteFeedback2(index);
    }
  }

  const createFeedback = (event, rowId, planId) => handleCreateEditClick(event, true, rowId, planId);
  const editFeedback = (event) => {};

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

  const AllFBRequestsCallback = useCallback(() => {
    if (allFBRequestsFetched) {
      if (allFBRequestsFetched.length === 0) {
        toast("You have no Feedback Requests !", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error-message",
        });
        // Go to the Dashboard
        navigate("/dashboard", {
          replace: true,
        });
      }

      // Otherwise setup the Feedback Requests Table for Display
      fbRequestsTable = allFBRequestsFetched.map((element, index) =>
        Object.assign(element, {
          rowId: "R" + element.feedback_req_id,
        })
      );
      // Indicate that the Feedback Requests Table has been populated
      setArrayUpdate(true);
    }
  }, [allFBRequestsFetched, navigate]);

  const getAPlanById = async (planId) => {
      try {
        const PORT = localStorage.getItem("port");
        const response = await fetch(`http://localhost:${PORT}/planbyid/` + planId, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
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

  // Fetch all the current user's Feedback Requests
  useEffect(() => {
    const getFBRequests = async () => {
      const PORT = localStorage.getItem("port");
      const name = localStorage.getItem("username");

      try {
        const response = await fetch(
          `http://localhost:${PORT}/feedback_requests/` + name
        );
        const jsonData = await response.json();
        console.log(name,jsonData)
        setAllFBRequestsFetched(jsonData);
      } catch (err) {
            console.error(err.message);
      }
    };

    getFBRequests();
  }, []);


  useEffect(() => {
    AllFBRequestsCallback();
  }, [AllFBRequestsCallback]);

/* Ensure that we have both the Plan and the selected info before going 
   to the Feedback Editor Page
*/
  useEffect(() => {
    if (fbRequestsSelectedInfo && planFetched) {
      const selectedInfo = fbRequestsSelectedInfo.feedbackInfo;
      const isNew = fbRequestsSelectedInfo.isNew
      navigate("/feedback-editor", {
        state: { selectedInfo, planFetched, isNew },
        replace: true,
      });
    }
  }, [fbRequestsSelectedInfo, navigate, planFetched]);

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
