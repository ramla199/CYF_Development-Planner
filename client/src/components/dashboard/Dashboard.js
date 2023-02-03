import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

import Files from "./mentor/Files";
import Inbox from "./mentor/Inbox";

import NewMessage from "./mentor/NewMessage";

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");

  const navigate = useNavigate();

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
    localStorage.removeItem("port");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <section>
        <h1 className="heading db-heading">{name}</h1>
        <div className="login-signin-buttons">
          <button onClick={(e) => logout(e)}>Logout</button>
        </div>
        <Files />
        <Inbox />
      </section>
    </>
  );
}

export default Dashboard;
