import React, { useState } from "react";

const InputDraft = ({ setDraftsChange }) => {
  const [draftText, setDraftText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { draftText };
      const response = await fetch("/dashboard/drafts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setDraftsChange(true);
      setDraftText("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add draft"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
        <button>Add</button>
      </form>
    </>
  );
};

export default InputDraft;
