import React, { useState } from "react";
import EditDraft from "./EditDraft";
import ShowMentors from "./ShowMentors";

function Element({
  draft,
  deleteDraft,
  setDraftsChange,
  senderUsername,
  allDrafts,
}) {
  // console.log(allDrafts);
  // console.log(draft);
  // console.log(senderUsername);
  const [toggle, setToggle] = useState(false);
  const [toggleSendToMentor, setToggleSendToMentor] = useState(false);

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const handleToggleSendToMentor = () => {
    setToggleSendToMentor(!toggleSendToMentor);
  };

  return (
    <>
      <div className="flex" key={`elem-${draft.draft_id}`}>
        <button onClick={handleEdit}>edit</button>
        <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
      </div>
      <>{draft.draft_text}</>
      <div className="flex">
        {" "}
        <button onClick={handleToggleSendToMentor}>send to mentor</button>
        {toggleSendToMentor ? (
          <ShowMentors senderUsername={senderUsername} draft={draft} />
        ) : (
          <></>
        )}
      </div>

      {toggle ? (
        <EditDraft draft={draft} setDraftsChange={setDraftsChange} />
      ) : (
        <></>
      )}
    </>
  );
}

export default Element;
