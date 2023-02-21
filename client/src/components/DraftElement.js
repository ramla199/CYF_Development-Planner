import React, { useState } from "react";
import SharedDrafts from "./SharedDrafts";
import MentorsList from "./MentorsList";

function DraftElement({ draft, deleteDraft }) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleShare = () => {
    console.log("this draft will be shared");
  };

  return (
    <>
      <div key={draft.draft_id}>
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
            <button onClick={handleShare}>share</button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <SharedDrafts />
        <MentorsList />
      </div>
    </>
  );
}

export default DraftElement;
