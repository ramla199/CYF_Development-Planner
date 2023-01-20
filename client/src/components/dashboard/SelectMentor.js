import { useState, useEffect, useCallback  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/styles.css";
import { normaliseNames } from "./normaliseNames";
import { setupTimeValues } from "./planFunctions";

let mentorTable = [];

function SelectMentor() {
  const [allMentors, setAllMentors] = useState(null);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [arrayUpdate, setArrayUpdate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const allMentorsCallback = useCallback(() => {
    if (allMentors) {
      if (allMentors.length === 0) {
        toast("There are no signed up mentors available !", {
          position: toast.POSITION.TOP_CENTER,
          className: "toast-error-message",
        });
        // Go to the Plans page
        navigate("/plans", {
          state: { username: location.state.username },
          replace: true,
        });
      }

      // Otherwise setup the Mentor Table for Display
      mentorTable = allMentors.map((element, index) =>
        Object.assign(element, {
          rowId: index,
          fullname: normaliseNames(element.user_fname, element.user_lname),
        })
      );
      setArrayUpdate(true);
    }
  }, [allMentors, location.state.username, navigate]);

  useEffect(() => {
    const getAllMentors = async () => {
      try {
        const PORT = localStorage.getItem("port");
        const response = await fetch(`http://localhost:${PORT}/mentors`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        const jsonData = await response.json();
        setAllMentors(jsonData);
      } catch (err) {
            console.error(err.message);
      }
    };

    getAllMentors();
    if (setAllMentors.length === 0) {
      toast("There are no signed up mentors available !", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-error-message",
      });
      // Go to the Plans page
      navigate("/plans", {
        //state: { username: location.state.username },
        replace: true,
      });
    }
  }, [location.state.username, navigate]);


  useEffect(() => {
    allMentorsCallback();
  }, [allMentorsCallback, arrayUpdate]);

  const writeFeedbackRequest = async (mentor_username, created_timestamp) => {
    try {
      const body = {
        plan_serial_id: location.state.planSerialId,
        requester_username: location.state.username,
        mentor_username: mentor_username,
        timestamp: created_timestamp,
      };
      const PORT = localStorage.getItem("port");
      const response = await fetch(
        `http://localhost:${PORT}/feedback_requests/write`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      await response.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  const process_selection = (selection) => {
    const [currentDateAndTime, created_timestamp] = setupTimeValues();
    writeFeedbackRequest(selection.username, created_timestamp);
    toast(
      `A feedback request has been sent to ${selection.fullname} dated ${currentDateAndTime}`,
      {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-display-message",
      }
    );
    // Then go to the Plans page
    navigate("/plans", {
      state: { username: location.state.username },
      replace: true,
    });
  };


  return (
    mentorTable.length > 0 && (
      <>
        <h1 className="centre-text">
          Please Click the Mentor's Name to request Feedback
        </h1>
        <table className="mentor-table">
          <thead>
            <tr>
              <th>Mentor's Name</th>
            </tr>
          </thead>
          <tbody>
            {mentorTable.map((mentor, index) => {
              return (
                <tr
                  key={mentor.user_id}
                  className={"clickable-row ".concat(
                    selectedRow === mentor.rowId ? "selected" : ""
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedRow(mentor.rowId);
                    process_selection(mentorTable[mentor.rowId]);
                  }}
                >
                  <td>
                    {normaliseNames(mentor.user_fname, mentor.user_lname)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    )
  );
}

export default SelectMentor;
