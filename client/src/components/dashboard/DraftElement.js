import React, { useState } from "react";

import MentorsList from "../MentorsList";

function DraftElement({ draft, deleteDraft }) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div>
        <div className="flex">
          <div>{draft.draft_title}</div>
          <button onClick={handleClick}>open</button>
          <button>delete</button>
          <button>edit</button>
          <button>send</button>
        </div>

        {toggle ? (
          <div>
            {draft.draft_text}
            <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        {/* <SharedDrafts /> */}
        <MentorsList />
      </div>
    </>
  );
}

export default DraftElement;
