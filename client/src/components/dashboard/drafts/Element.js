import React, { useState } from "react";
import EditDraft from "./EditDraft";
import ShowMentors from "./ShowMentors";
import SendFileToMentor from "./SendMessageToMentor";

function Element({
  draft,
  deleteDraft,
  setDraftsChange,
  setCurrentlySelectedMentorId,
  onSubmitForm,
}) {
  const [toggle, setToggle] = useState(false);

  const handleEdit = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div className="flex" key={`elem-${draft.draft_id}`}>
        <button onClick={handleEdit}>edit</button>
        <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
      </div>
      <>{draft.draft_text}</>

      <ShowMentors
        setCurrentlySelectedMentorId={setCurrentlySelectedMentorId}
        onSubmitForm={onSubmitForm}
      />
      <SendFileToMentor />

      {toggle ? (
        <EditDraft draft={draft} setDraftsChange={setDraftsChange} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Element;
