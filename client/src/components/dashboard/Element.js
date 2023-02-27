import React, { useState, useEffect } from "react";
import EditDraft from "./EditDraft";
import MentorsDropdown from "./MentorsDropdown";

function Element({ draft, deleteDraft, setDraftsChange }) {
  const [toggle, setToggle] = useState(false);

  const handleEdit = () => {
    setToggle(!toggle);
  };

  const [showMentors, setShowMentors] = useState(false);
  function handleSend() {
    setShowMentors(!showMentors);
  }

  const [mentorName, setMentorName] = useState("");
  const [allMentors, setAllMentors] = useState([]);
  const getMentorName = async () => {
    try {
      const res = await fetch("/dashboard/mentors", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      console.log(parseRes);
      setMentorName(parseRes.username);
      setAllMentors(allMentors);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMentorName();
  }, []);
  return (
    <>
      <section>
        <div className="flex" key={`elem-${draft.draft_id}`}>
          <button onClick={handleEdit}>edit</button>
          <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
        </div>
        <section>
          <section>
            {" "}
            <button onClick={handleSend}>send</button>{" "}
            {showMentors ? <MentorsDropdown /> : <></>}
          </section>

          {draft.draft_text}
        </section>
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
