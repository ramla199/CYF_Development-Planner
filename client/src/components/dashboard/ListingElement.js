import React, { useState } from "react";
import Element from "./Element";

function ListingElement({ draft, deleteDraft, allDrafts, setDraftsChange }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <section>
        <div className="flex">
          <h2 className="subheading">{draft.draft_title}</h2>
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

export default ListingElement;
