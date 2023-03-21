import React, { useState } from "react";
import MentorsDropdown from "./MentorsDropdown";
function ShowMentors({ setCurrentlySelectedMentorId, onSubmitForm }) {
  const [toggleshowMentors, setToggleShowMentors] = useState(false);

  function handleToggleSelectMentor() {
    setToggleShowMentors(!toggleshowMentors);
  }
  return (
    <>
      <button onClick={handleToggleSelectMentor}>select mentor</button>
      {toggleshowMentors ? (
        <MentorsDropdown
          setCurrentlySelectedMentorId={setCurrentlySelectedMentorId}
          onSubmitForm={onSubmitForm}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default ShowMentors;
