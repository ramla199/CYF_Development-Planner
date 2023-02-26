import React, { useState } from "react";
import EditDraft from "./EditDraft";

function Element({ draft, deleteDraft, setDraftsChange }) {
  const [toggle, setToggle] = useState(false);

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const [showMentors, setShowMentors] = useState(false);
  function handleSend() {
    setShowMentors(!showMentors);
  }

  return (
    <>
      <section>
        <div className="flex" key={`elem-${draft.draft_id}`}>
          <button onClick={handleEdit}>edit</button>
          <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
          <button onClick={handleSend}>send</button>
        </div>{" "}
      </section>

      {toggle ? (
        <EditDraft draft={draft} setDraftsChange={setDraftsChange} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Element;
