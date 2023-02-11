import React, { useState, useEffect } from "react";

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  console.log(drafts);

  const getDrafts = async () => {
    try {
      const res = await fetch("/dashboard/drafts", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setDrafts(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDrafts();
  }, []);
  return (
    <>
      <section>
        {drafts.map((draft) => {
          return <div>{draft.draft_text}</div>;
        })}
      </section>
    </>
  );
}

export default Drafts;
