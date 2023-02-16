import React, { useState } from "react";

const EditDraft = ({ draft, setDraftsChange }) => {
  //editText function

  const editText = async (id) => {
    try {
      const body = { draftText };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/dashboard/drafts/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setDraftsChange(true);
      setDraftText("");

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [draftText, setDraftText] = useState(draft.draft_text);
  return (
    <>
      <div
        id={`id${draft.draft_id}`}
        onClick={() => setDraftText(draft.draft_text)}
      >
        <input
          type="text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />

        <button type="button" onClick={() => editText(draft.draft_id)}>
          save
        </button>
      </div>
    </>
  );
};

export default EditDraft;
