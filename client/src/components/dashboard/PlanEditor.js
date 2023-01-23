import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DisplayPlanEditorPage from "./DisplayPlanEditorPage";

import { savePlan, setupTimeValues } from "./planFunctions";

import "../../../src/styles.css";

const PlanEditor = () => {
  const [userName, setUserName] = useState(null);
  const [selectedRecordInfo, setSelectedRecordInfo] = useState(null);

  const [planTextArray, setPlanTextArray] = useState(["", "", "", "", ""]);

  const [planCharacterCount, setPlanCharacterCount] = useState([0, 0, 0, 0, 0]);

  const [newPlan, setNewPlan] = useState(null);
  const [changed, setChanged] = useState(false);
  const [saved, setSaved] = useState(false);
  const [planCreatedTimeStamp, setPlanCreatedTimeStamp] = useState(null);
  const [timeValues] = useState(setupTimeValues());

  const navigate = useNavigate();

  let [displayTimeStamp, theCurrentTimeStamp] = timeValues;

  const saveThenGotoPlans = () => {
    savePlan(
      userName,
      theCurrentTimeStamp,
      planCreatedTimeStamp,
      planTextArray,
      newPlan,
      setNewPlan,
      setSaved,
      setChanged,
      setSelectedRecordInfo,
      setPlanCreatedTimeStamp
    );

    // Go to the Plans page
    navigate("/plans", {
      replace: true,
    });
  };

  const gotoSelectMentor = () => {
    let planId = location.state.planSelectedInfo.thePlan.plan_serial_id;
    // Go to the Select Mentor page
    navigate("/select-mentor", {
      state: {
        username: userName,
        planSerialId: planId,
      },
      replace: true,
    });
  };

  const allEmpty = () => planCharacterCount.every((element) => element === 0);

  const newOrChanged = () => newPlan || changed;

  const discardPlan = () => {
    let leavePage, answer;
    if (newPlan) {
      if (!changed) {
        // No changes
        leavePage = true;
      } else {
        answer = window.confirm(
          "Be aware,\nif you press OK now,\nALL your changes will be lost!"
        );
      }
    }
    // Existent Plan
    else if (changed) {
      if (saved) {
        answer = window.confirm(
          "Be aware,\nif you press OK now,\nALL your changes since your last SAVE will be lost!"
        );
      } else {
        answer = window.confirm(
          "Be aware,\nif you press OK now,\nALL your changes will be lost!"
        );
      }
    } else {
      // Otherwise leave the page
      leavePage = true;
    }

    if (leavePage || answer) {
      // Go to the Plans page
      navigate("/plans", {
        replace: true,
      });
    }
  };

  const location = useLocation();

  useEffect(() => {
    // ONLY DO THIS THE ONCE! USE 'newPlan' TO DETERMINE THIS I.E. AS IF useEffect({...}, [])
    if (newPlan === null) {
      // Ensure done ONCE!
      let { theIndex, thePlan, theUserName } = location.state.planSelectedInfo;
      setSelectedRecordInfo({ theIndex: theIndex, thePlan: thePlan });
      setUserName(theUserName);
      if (theIndex === 0) {
        // This indicates that the user is creating a new plan
        setNewPlan(true);
      } else {
        setNewPlan(false);
      }
    }
  }, [location, newPlan]);

  useEffect(() => {
    // Check whether this is a new plan?
    // No!
    if (selectedRecordInfo !== null && !newPlan) {
      setPlanTextArray(() => [
        selectedRecordInfo.thePlan.splan,
        selectedRecordInfo.thePlan.mplan,
        selectedRecordInfo.thePlan.aplan,
        selectedRecordInfo.thePlan.rplan,
        selectedRecordInfo.thePlan.tplan,
      ]);
      setPlanCharacterCount(() => [
        selectedRecordInfo.thePlan.splan.length,
        selectedRecordInfo.thePlan.mplan.length,
        selectedRecordInfo.thePlan.aplan.length,
        selectedRecordInfo.thePlan.rplan.length,
        selectedRecordInfo.thePlan.tplan.length,
      ]);
      setPlanCreatedTimeStamp(selectedRecordInfo.thePlan.created_timestamp);
    }
    // Otherwise for a new plan the above fields will be empty and 0
  }, [selectedRecordInfo, newPlan]);

  return (
    <DisplayPlanEditorPage
      userName={userName}
      displayTimeStamp={displayTimeStamp}
      theCurrentTimeStamp={theCurrentTimeStamp}
      planTextArray={planTextArray}
      setPlanTextArray={setPlanTextArray}
      planCharacterCount={planCharacterCount}
      setPlanCharacterCount={setPlanCharacterCount}
      newPlan={newPlan}
      setNewPlan={setNewPlan}
      setSelectedRecordInfo={setSelectedRecordInfo}
      setSaved={setSaved}
      setChanged={setChanged}
      setPlanCreatedTimeStamp={setPlanCreatedTimeStamp}
      allEmpty={allEmpty}
      discardPlan={discardPlan}
      planCreatedTimeStamp={planCreatedTimeStamp}
      saveThenGotoPlans={saveThenGotoPlans}
      newOrChanged={newOrChanged}
      gotoSelectMentor={gotoSelectMentor}
    />
  );
};
export default PlanEditor;
