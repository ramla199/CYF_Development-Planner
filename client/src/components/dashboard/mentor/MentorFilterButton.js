import React from "react";

function MentorFilterButton(props) {
  return (
    <>
      <button type="button" onClick={() => props.setFilter(props.name)}>
        {props.name}
      </button>
    </>
  );
}

export default MentorFilterButton;
