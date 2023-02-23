import React, { useState, useEffect } from "react";

import EditDraft from "./EditDraft";
import MentorsList from "../MentorsList";
function ListingElement({ draft, deleteDraft, allDrafts, setDraftsChange }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {" "}
      <section>
        <div className="flex">
          <li>{draft.draft_title}</li>
          <button onClick={handleOpen}>open</button>
        </div>
        {open ? (
          <Element
            draft={draft}
            deleteDraft={deleteDraft}
            allDrafts={allDrafts}
            setDraftsChange={setDraftsChange}
          />
        ) : (
          <></>
        )}
      </section>
    </>
  );
}

function Element({ draft, deleteDraft, setDraftsChange }) {
  const [toggle, setToggle] = useState(false);
  const handleEdit = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <section>
        <section className="flex" key={draft.draft_id}>
          <button onClick={handleEdit}>edit</button>
          <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
          <button>send</button>
        </section>

        <div key={draft.draft_id}>{draft.draft_text}</div>
      </section>

      {toggle ? (
        <EditDraft draft={draft} setDraftsChange={setDraftsChange} />
      ) : (
        <></>
      )}
    </>
  );
}
const ListFiles = () => {
  const [allDrafts, setAllDrafts] = useState([]);
  const [draftsChange, setDraftsChange] = useState(false);

  const getFiles = async () => {
    try {
      const res = await fetch("/dashboard/drafts", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllDrafts(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFiles();
    setDraftsChange(false);
  }, [draftsChange]);

  //delete draft function

  const [drafts, setDrafts] = useState([]); //empty array
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

  return (
    <>
      <div>
        {drafts.length !== 0 &&
          drafts[0].draft_id !== null &&
          drafts.map((draft) => {
            return (
              <>
                <ListingElement
                  draft={draft}
                  deleteDraft={deleteDraft}
                  allDrafts={allDrafts}
                  setDraftsChange={setDraftsChange}
                />
              </>
            );
          })}
      </div>
      <MentorsList />
    </>
  );
};

export default ListFiles;
