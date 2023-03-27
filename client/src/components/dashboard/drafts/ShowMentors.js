import React, { useState } from "react";
import MentorsDropdown from "./MentorsDropdown";

function ShowMentors({ senderUsername }) {
  const [toggleshowMentors, setToggleShowMentors] = useState(false);

  function handleToggleSelectMentor() {
    setToggleShowMentors(!toggleshowMentors);
  }
  return (
    <>
      <button onClick={handleToggleSelectMentor}>select mentor</button>
      {toggleshowMentors ? (
        <MentorsDropdown senderUsername={senderUsername} />
      ) : (
        <></>
      )}
    </>
  );
}

export default ShowMentors;
