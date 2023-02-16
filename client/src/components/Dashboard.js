import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import InputDraft from "./InputDraft";
import ListDrafts from "./ListDrafts";

function Dashboard() {
  const [name, setName] = useState("");
  const [allDrafts, setAllDrafts] = useState([]);
  const [draftsChange, setDraftsChange] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/drafts", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllDrafts(parseData);

      setName(parseData[0].username);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setDraftsChange(false);
  }, [draftsChange]);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <button>
        <Link to="/mdn">mdn</Link>
      </button>

      <h1>{name}'s dashboard</h1>

      <div>
        <button onClick={handleToggle}>toggle new</button>

        {toggle ? <InputDraft setDraftsChange={setDraftsChange} /> : <></>}
      </div>
      <ListDrafts allDrafts={allDrafts} setDraftsChange={setDraftsChange} />
    </>
  );
}

export default Dashboard;
