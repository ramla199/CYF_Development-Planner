import React, { useState, useEffect } from "react";

function MentorsDropdown({ name }) {
  const [list, setList] = useState([]);
  console.log(name);
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
  };

  return (
    <>
      <form>
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
