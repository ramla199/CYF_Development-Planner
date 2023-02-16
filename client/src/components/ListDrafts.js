import React, { useState, useEffect } from "react";
import Draft from "./Draft";
import EditDraft from "./EditDraft";

const ListDrafts = ({ titlesList, draftsList, allDrafts, setDraftsChange }) => {
  console.log(allDrafts);
  const [drafts, setDrafts] = useState([]); //empty array
  const [toggle, setToggle] = useState(false);
  //delete draft function

  async function deleteDraft(id) {
    try {
      await fetch(`/dashboard/drafts/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setDrafts(drafts.filter((draft) => draft.draft_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setDrafts(allDrafts);
  }, [allDrafts]);

  console.log(drafts);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div>
        <div>
          {drafts.length !== 0 &&
            drafts[0].draft_id !== null &&
            drafts.map((draft) => (
              <div>
                <div key={draft.draft_id}>
                  <div>{draft.draft_text}</div>
                </div>
                <button onClick={() => deleteDraft(draft.draft_id)}>
                  Delete
                </button>
                <button onClick={handleClick}>edit</button>
                {toggle ? (
                  <EditDraft draft={draft} setDraftsChange={setDraftsChange} />
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>

        <div>{draftsList}</div>
      </div>
    </>
  );
};

export default ListDrafts;
