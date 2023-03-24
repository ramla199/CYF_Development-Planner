import React, { useState } from "react";
import MentorsDropdown from "./MentorsDropdown";

function ShowMentors({ name }) {
  const [toggleshowMentors, setToggleShowMentors] = useState(false);

  function handleToggleSelectMentor() {
    setToggleShowMentors(!toggleshowMentors);
  }
  return (
    <>
      <button onClick={handleToggleSelectMentor}>select mentor</button>
      {toggleshowMentors ? <MentorsDropdown name={name} /> : <></>}
    </>
  );
}

export default ShowMentors;
