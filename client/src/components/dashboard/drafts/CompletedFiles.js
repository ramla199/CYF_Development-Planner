import React, { useState, useEffect } from "react";

function CompletedFiles() {
  const [allSentDrafts, setAllSentDrafts] = useState([]);

  const getSentFiles = async () => {
    try {
      const res = await fetch("/dashboard/messages/sent", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllSentDrafts(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSentFiles();
  }, []);
  return (
    <>
      {allSentDrafts.map((draft, index) => {
        return (
          <section>
            <section>{`Title: ${draft.message_title}`}</section>
            <section>{`Text: ${draft.message_text}`}</section>
          </section>
        );
      })}
    </>
  );
}

export default CompletedFiles;
