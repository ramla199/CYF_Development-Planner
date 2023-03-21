import React, { useState } from "react";

function DraftElement({ draft, deleteDraft }) {
  const [toggle, setToggle] = useState(false);
  const [openButtonText, setOpenButtonText] = useState("open");

  const handleClick = () => {
    setToggle(!toggle);
    setOpenButtonText((state) => (state === "open" ? "close" : "open"));
  };

  return (
    <>
      <div>
        <div className="flex">
          <div>{draft.draft_title}</div>
          <button onClick={handleClick}>{openButtonText}</button>
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
      <div>{/* <SharedDrafts /> */}</div>
    </>
  );
}

export default DraftElement;
