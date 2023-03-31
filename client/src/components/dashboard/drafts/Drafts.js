import React, { useState, useEffect } from "react";

function Drafts() {
  const [allDrafts, setAllDrafts] = useState([]);

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
  }, []);
  return (
    <>
      {allDrafts.map((draft, index) => {
        return (
          <section>
            <section>{`Title: ${draft.draft_title}`}</section>
            <section>{`Text: ${draft.draft_text}`}</section>
          </section>
        );
      })}
    </>
  );
}

export default Drafts;
