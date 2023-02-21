import React, { useState, useEffect } from "react";

function MentorsList() {
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
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMentors();
  }, []);

  return (
    <>
      <h2>select mentor</h2>
      <select>
        {list.map((mentor) => (
          <option>{mentor.username}</option>
        ))}
      </select>
    </>
  );
}

export default MentorsList;
