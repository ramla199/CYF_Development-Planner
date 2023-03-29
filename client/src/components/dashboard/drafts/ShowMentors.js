import React, { useState } from "react";
import MentorsDropdown from "./MentorsDropdown";

function ShowMentors({ senderUsername, draft }) {
  const [toggleshowMentors, setToggleShowMentors] = useState(false);

  // console.log(draft);
  function handleToggleSelectMentor() {
    setToggleShowMentors(!toggleshowMentors);
  }
  return (
    <>
      <button onClick={handleToggleSelectMentor}>select mentor</button>
      {toggleshowMentors ? (
        <MentorsDropdown senderUsername={senderUsername} draft={draft} />
      ) : (
        <></>
      )}
    </>
  );
}

export default ShowMentors;
