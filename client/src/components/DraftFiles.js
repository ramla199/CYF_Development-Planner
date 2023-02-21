import React, { useState, useEffect } from "react";

//components
import InputDraft from "./InputDraft";
import ListDrafts from "./ListDrafts";

function DraftFiles() {
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
      <button onClick={handleToggle}>new</button>
      {toggle ? <InputDraft setDraftsChange={setDraftsChange} /> : <></>}
      <ListDrafts allDrafts={allDrafts} setDraftsChange={setDraftsChange} />
    </>
  );
}

export default DraftFiles;
