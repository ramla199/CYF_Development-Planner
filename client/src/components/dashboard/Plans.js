import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlansNavbar from "../../../src/components/dashboard/PlansNavBar";
import DisplayListItem from "./DisplayListItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../src/styles.css";


function Plans() {
  const [allPlansFetched, setAllPlansFetched] = useState([]);
  const [planSelectedInfo, setPlanSelectedInfo] = useState(null);
  const navigate = useNavigate();

  const handleClick = (_, theIndex) => {
    // Need to subtract one because the 0th item represents the "Create Plan" message
    // So the first plan is indexed with the value 1
    // The second is indexed as 2, etc.
    // Therefore subtract 1 to determine the actual true index
    const actualIndex = theIndex - 1;
    const name = localStorage.getItem("username");
    setPlanSelectedInfo({
      theIndex: theIndex,
      theUserName: name,
      thePlan: allPlansFetched[actualIndex],
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
    // So the first plan is indexed with the value 1
    // The second is indexed as 2, etc.
    // Therefore subtract 1 to determine the actual true index

    const actualIndex = deleteIndex - 1;
    const serialId = allPlansFetched[actualIndex].plan_serial_id;
    const PORT = localStorage.getItem("port");
    try {
      await fetch(`http://localhost:${PORT}/plans/${serialId}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setAllPlansFetched(
        allPlansFetched.filter((_, index) => index !== actualIndex)
      );
      toast.success("Plan has been deleted.", {});
    } catch (err) {
          console.error(err.message);
    }
  }

/*  
  useEffect(() => {
    getName();
  }, []);
*/

  // Fetch all the user's plans
  useEffect(() => {
    const getPlans = async () => {
      const PORT = localStorage.getItem("port");
      const name = localStorage.getItem("username");

      try {
        const response = await fetch(`http://localhost:${PORT}/plans/` + name);
        const jsonData = await response.json();
        setAllPlansFetched(jsonData);
        console.log(jsonData)
      } catch (err) {
            console.error(err.message);
      }
    };

    getPlans();
  }, []);

  useEffect(() => {
    if (planSelectedInfo) {
      navigate("/plan-editor", {
        state: { planSelectedInfo: planSelectedInfo },
        replace: true,
      });
    }
  }, [planSelectedInfo, navigate]);

  const keysArray = [];
  const preambleTextArray = [];
  allPlansFetched.forEach((element, index) => {
    keysArray.push(element.amended_timestamp.replace(/:/g, "")); // YYYYMMDDHHMMSS
    preambleTextArray.push(element.preamble);
  });

  // Create a 'dummy' record for the NEW RECORD OPTION
  keysArray.unshift(0);
  preambleTextArray.unshift("Click to create a new plan.");

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
      <PlansNavbar />
      <div className="username-header">{name}</div>
      <div className="main-menu-container">
      <div className="main-menu">{orderedList}</div>
      </div>
    </>
  );
}

export default Plans;
