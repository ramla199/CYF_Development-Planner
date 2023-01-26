import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PopulateReceivedFeedbackDisplay from "./PopulateReceivedFeedbackDisplay";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/styles.css";

let feedbacksTable = [];

function FeedbackReceived() {
  const [allFeedbacksFetched, setAllFeedbacksFetched] = useState(null);
  const [arrayUpdated, setArrayUpdated] = useState(null);
  const [feedbackSelectedInfo, setFeedbackSelectedInfo] = useState(null);
  const [planFetched, setPlanFetched] = useState(null);
  const [feedbackFetched, ] = useState(null);

  const navigate = useNavigate();

  const viewFeedback = (event, feedbackId, planId) => {
    event.stopPropagation();
    const feedbackInfo = feedbacksTable.find(
      (element) => element.feedback_id === feedbackId
    );
    // Fetch the Plan details that are related to this selection
    getAPlanById(planId);
    // Indicate that a selection has been made
    setFeedbackSelectedInfo({ planId, feedbackInfo });
  };

  function deleteFeedback(event, feedbackId) {
    event.stopPropagation();
    let answer = window.confirm("Are You Sure?");
    if (answer) {
      deleteFeedback2(feedbackId);
    }
  }

  async function deleteFeedback2(feedbackId) {
    const PORT = localStorage.getItem("port");
    try {
      await fetch(`http://localhost:${PORT}/feedbacks/${feedbackId}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });

      feedbacksTable = feedbacksTable.filter(
        (element) => element.feedback_id !== feedbackId
      );

      toast.success("Feedback has been deleted.");
    } catch (err) {
      console.error(err.message);
    }

    if (feedbacksTable.length === 0) {
      toast("You have no more Feedbacks !", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-error-message",
      });
      // Go to the Dashboard
      navigate("/dashboard", {
        replace: true,
      });
    }

    // Otherwise Indicate that the array has been changed
    setArrayUpdated(feedbacksTable);
  }

  const AllReceivedFeedbackCallback = useCallback(() => {
    if (allFeedbacksFetched) {
      if (allFeedbacksFetched.length === 0) {
        toast("You have not received any Feedbacks !", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error-message",
        });
        // Go to the Dashboard
        navigate("/dashboard", {
          replace: true,
        });
      }

      /* Otherwise set up the Received Feedback Table for Display */
      feedbacksTable = [...allFeedbacksFetched];

      // Indicate that the Feedbacks Table has been populated
      setArrayUpdated(feedbacksTable);
    }
  }, [allFeedbacksFetched, navigate]);

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

  // Fetch all the Student's Received Feedbacks
  useEffect(() => {
    const getReceivedFeedback = async () => {
      const PORT = localStorage.getItem("port");
      const name = localStorage.getItem("username");

      try {
        const response = await fetch(
          `http://localhost:${PORT}/feedbacks/sent/` + name
        );
        const jsonData = await response.json();
        setAllFeedbacksFetched(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };

    getReceivedFeedback();
  }, []);

  useEffect(() => {
    AllReceivedFeedbackCallback();
  }, [AllReceivedFeedbackCallback]);

/* Ensure that we have both the Plan and the Selected Info before going 
   to the Feedback Display Page
*/
  useEffect(() => {
    if (feedbackSelectedInfo && planFetched) {
      // View the Feedback
      const selectedInfo = feedbackSelectedInfo.feedbackInfo;
      const feedbackText = selectedInfo.feedback_text;
      navigate("/feedback-view", {
        state: { selectedInfo, planFetched, feedbackText },
        replace: true,
      });
    }
  }, [feedbackSelectedInfo, navigate, planFetched, feedbackFetched]);

  return (
    arrayUpdated && (
      <>
        <table className="feedback-display-table">
          <thead>
            <tr>
              <th className="column1-display" width="10%">
                Feedback
                <br />
                Requested On
              </th>
              <th width="16%">
                Request
                <br />
                Sent By
              </th>
              <th width="60%">
                Plan
                <br />
                Summary
              </th>
              <th width="7%">Actions</th>
              <th width="7%"></th>
            </tr>
          </thead>
          <tbody>
            <PopulateReceivedFeedbackDisplay
              feedbacksTable={feedbacksTable}
              viewFeedback={viewFeedback}
              deleteFeedback={deleteFeedback}
            />
          </tbody>
        </table>
      </>
    )
  );
}

export default FeedbackReceived;
