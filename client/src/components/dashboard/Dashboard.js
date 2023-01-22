import React, { useState, useEffect } from "react";

// components
import Files from "./mentor/Files";
import Inbox from "./mentor/Inbox";

import NewMessage from "./mentor/NewMessage";

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      console.log(parseRes);

      // setName(parseRes.username);

      setName(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>
      <main>
        <button onClick={(e) => logout(e)}>logout</button>
        <h1>{name}'s Dashboard</h1>
        <div className="icon-container-wrapper">
          <Files />
          <Inbox />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
