import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//import FBRequestsNavbar from "../../../src/components/dashboard/FBRequestsNavBar";
import DisplayListItem from "./DisplayListItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/styles.css";

let fbRequestsTable = [];

function FeedbackRequests() {
  const [allFBRequestsFetched, setAllFBRequestsFetched] = useState([]);
  const [fbRequestsSelectedInfo, setPlanSelectedInfo] = useState(null);
  const navigate = useNavigate();

  const handleClick = (_, theIndex) => {
    // Need to subtract one because the 0th item represents the "Create Plan" message
    // So the first fbRequests is indexed with the value 1
    // The second is indexed as 2, etc.
    // Therefore subtract 1 to determine the actual true index
    const actualIndex = theIndex - 1;
    const name = localStorage.getItem("username");
    setPlanSelectedInfo({
      theIndex: theIndex,
      theUserName: name,
      thePlan: allFBRequestsFetched[actualIndex],
    });
  };

  function deletePlan(index) {
    let answer = window.confirm("Are You Sure?");
    if (answer) {
      deletePlan2(index);
    }
  }

  async function deletePlan2(deleteIndex) {
    // Need to subtract one because the 0th item represents the "Create Plan" message
    // So the first fbRequests is indexed with the value 1
    // The second is indexed as 2, etc.
    // Therefore subtract 1 to determine the actual true index

    const actualIndex = deleteIndex - 1;
    const serialId = allFBRequestsFetched[actualIndex].fbRequests_serial_id;
    const PORT = localStorage.getItem("port");
    try {
      await fetch(`http://localhost:${PORT}/FBReq/${serialId}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setAllFBRequestsFetched(
        allFBRequestsFetched.filter((_, index) => index !== actualIndex)
      );
      toast.success("Plan has been deleted.", {});
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

      // Otherwise setup the Mentor Table for Display
      fbRequestsTable = fbRequestsTable.map(
        (element, index) => element
        // Object.assign(element, {
        //   rowId: index,
        //   fullname: normaliseNames(element.user_fname, element.user_lname),
        //        })
      );
      //setArrayUpdate(true);
    }
  }, [allFBRequestsFetched, navigate]);

  // Fetch all the user's Feedback Requests
  useEffect(() => {
    const getFBRequests = async () => {
      const PORT = localStorage.getItem("port");
      const name = localStorage.getItem("username");

      try {
        const response = await fetch(
          `http://localhost:${PORT}/feedback_requests/` + name
        );
        const jsonData = await response.json();
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


  return (null);

  useEffect(() => {
    if (fbRequestsSelectedInfo) {
      navigate("/fbRequests-editor", {
        state: { fbRequestsSelectedInfo: fbRequestsSelectedInfo },
        replace: true,
      });
    }
  }, [fbRequestsSelectedInfo, navigate]);

  const keysArray = [];
  const preambleTextArray = [];
  allFBRequestsFetched.forEach((element, index) => {
    keysArray.push(element.amended_timestamp.replace(/:/g, "")); // YYYYMMDDHHMMSS
    preambleTextArray.push(element.preamble);
  });

  // Create a 'dummy' record for the NEW RECORD OPTION
  keysArray.unshift(0);
  preambleTextArray.unshift("Click to create a new fbRequests.");

  const orderedList = (
    <ol className="main-menu-items">
      {keysArray.map((eachKey, index) => {
        return (
          <li className="main-menu-item-container" key={eachKey}>
            <DisplayListItem
              theIndex={index}
              theKey={eachKey}
              preambleText={preambleTextArray[index]}
              handleClick={handleClick}
              deletePlan={deletePlan}
            />
          </li>
        );
      })}
    </ol>
  );

  const name = localStorage.getItem("username");

  return (
    <>
      {/* <FBRequestsNavbar /> */}
      <div className="username-header">{name}</div>
      <div className="main-menu-container">
        <div className="main-menu">{orderedList}</div>
      </div>
    </>
  );
}

export default FeedbackRequests;
