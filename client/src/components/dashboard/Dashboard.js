import React, { useState, useEffect } from "react";
import BackButton from "../BackButton";
import Files from "./Files";
import Inbox from "./Inbox";

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
      setName(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <div className="login-signin-buttons">
        <BackButton />
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>

      <section>
        <h1 className="heading">Dashboard {name}</h1>

        <Files />
        <Inbox />
      </section>
    </>
  );
}

export default Dashboard;
