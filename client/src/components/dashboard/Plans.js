import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayListItem from "./DisplayListItem";
import "../../../src/styles.css";

function Plans() {
  const [allPlansFetched, setAllPlansFetched] = useState([]);
  const [planSelected, setPlanSelected] = useState(null);
  const navigate = useNavigate();

  const theUserName = "joeb";

  const getPlans = async () => {
    try {
      const response = await fetch("/plans/joeb");
      console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      setAllPlansFetched(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClick = (event, theIndex, theKey = null) => {
    //  setSelectedRecordInfo({ theIndex: theIndex, theKey: theKey });
    //  setStage(2); // Second Stage: Allow User to enter/edit plan
    console.log(event);
    console.log(theIndex, theKey);
    setPlanSelected({
      theIndex: theIndex,
      theKey: theKey,
      theUserName: theUserName,
    });
  };

  function deletePlan(index) {
    let answer = window.confirm("Are You Sure?");
    console.log(index);
    console.log(allPlansFetched);
    if (answer) {
      deletePlan2(index);
    }
  }

  async function deletePlan2(deleteIndex) {
    // Need to subtract one because the 0th item represents the "Create Plan" message
    // So the first plan is indexed with the value 1
    // The second is indexed as 2, etc.
    const actualIndex = deleteIndex - 1;
    const serialId = allPlansFetched[actualIndex].plan_serial_id;
    console.log(actualIndex, serialId);
    console.log(deleteIndex);
    try {
      await fetch(`plans/${serialId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setAllPlansFetched(
        allPlansFetched.filter((_, index) => index !== actualIndex)
      );
      console.log(allPlansFetched);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    setAllPlansFetched(allPlansFetched);
  }, [allPlansFetched]);

  useEffect(() => {
    if (planSelected) {
      navigate("../plan-editor");
    }
  }, [planSelected, navigate]);

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

  return (
    <>
      <div className="username-header">{theUserName}</div>
      <div className="main-menu-container">
        <div className="main-menu">{orderedList}</div>
      </div>
    </>
  );
}

export default Plans;
