import React, { useState, useEffect } from "react";

function MentorsDropdown({ setCurrentlySelectedMentorId, onSubmitForm }) {
  const [list, setList] = useState([]);
  const [id, setId] = useState("");

  const getMentors = async () => {
    try {
      const res = await fetch("/dashboard/mentors", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);

      setList(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  const onChange = (e) => {
    setCurrentlySelectedMentorId(e.target.value);

    console.log(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <select onChange={onChange}>
          <option>--select mentor--</option>
          {list.map((mentor) => (
            <option value={mentor.mentor_id} key={mentor.mentor_id}>
              {mentor.username}
            </option>
          ))}
        </select>
        <button>send</button>
      </form>
    </>
  );
}

export default MentorsDropdown;
