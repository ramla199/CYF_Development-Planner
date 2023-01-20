import React, { useState, useEffect } from "react";

// components
import Files from "./Files";
import Inbox from "./Inbox";
import NewFeedback from "./NewFeedback";
import NewMessage from "./NewMessage";

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
      <div className="login-signin-buttons">
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>

      <section>
        <h1 className="heading">Dashboard {name}</h1>
        <div className="header-flex">
          <Files />
          <Inbox />
        </div>
        <div className="header-flex">
          <h3 className="subheading">Insert Feedback</h3>
          <h3 className="subheading">Insert message text</h3>
        </div>

        <div className="header-flex">
          <NewFeedback />
          <NewMessage />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
