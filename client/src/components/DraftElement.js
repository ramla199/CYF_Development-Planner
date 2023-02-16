import React from "react";

function DraftElement({ draft }) {
  return (
    <>
      <div key={draft.draft_id}>
        <div>{draft.draft_title}</div>
        <div>{draft.draft_text}</div>
      </div>
    </>
  );
}

export default DraftElement;
