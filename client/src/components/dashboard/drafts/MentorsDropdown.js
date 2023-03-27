import React, { useState, useEffect } from "react";

function MentorsDropdown({ senderUsername }) {
  const [list, setList] = useState([]);

  const [receipientId, setReceipientId] = useState("");
  console.log(senderUsername);
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
    console.log(e.target.value);
    setReceipientId(e.target.value);
    console.log(receipientId);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { receipientId, senderUsername };
      const response = await fetch("/dashboard/messages", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      // setDraftsChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <button type="button">send</button>

        <select onChange={onChange}>
          <option>--select mentor--</option>
          {list.map((mentor) => (
            <option value={mentor.user_id} key={mentor.mentor_id}>
              {mentor.username}
            </option>
          ))}
        </select>
      </form>
    </>
  );
}

export default MentorsDropdown;
