import React, { useState, useEffect } from "react";
import SendNewMessage from "../messages/SendNewMessage";

function AddNewFile({ senderUsername }) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftText, setDraftText] = useState("");

  const [list, setList] = useState([]);

  const getMentors = async () => {
    try {
      const res = await fetch("/dashboard/mentors", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      setList(parseData);

      console.log(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { draftTitle, draftText };
      const response = await fetch("/dashboard/drafts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      // setDraftsChange(true);

      setDraftText("");
      setDraftTitle("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const [receipientId, setReceipientId] = useState("");

  const onMentorDropdownMenuChange = (e) => {
    setReceipientId(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div className="flex">
          <button>save</button>
        </div>
        <input
          type="text"
          placeholder="add title"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
        />

        <textarea
          type="text"
          placeholder="add text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
      </form>

      <select onChange={onMentorDropdownMenuChange}>
        <option>--select mentor--</option>
        {list.map((mentor) => (
          <option value={mentor.user_id} key={mentor.mentor_id}>
            {mentor.username}
          </option>
        ))}
      </select>
      <SendNewMessage
        senderUsername={senderUsername}
        receipientId={receipientId}
      />
    </>
  );
}

export default AddNewFile;
