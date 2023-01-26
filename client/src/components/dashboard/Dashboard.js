import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// components
/*
import Files from "./mentor/Files";
import Inbox from "./mentor/Inbox";

import NewMessage from "./mentor/NewMessage";
*/
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

  let theRole = localStorage.getItem("role");
  
  return (
    <>
      <section>
        <h1 className="heading db-heading">{name}</h1>
        <div className="login-signin-buttons">
          {theRole === "student" && 
                    <button onClick={() => navigate("/plans")}>Plans</button>}
          {theRole === "student" && 
                    <button onClick={() => navigate("/feedback-received")}>
                      Feedback<br/>Received<br/>Inbox</button>}

          {theRole === "mentor" &&  
                    <button onClick={() => navigate("/feedback-requests")}>
                      Feedback<br/>Requests<br/>Inbox</button>}
          <button onClick={(e) => logout(e)}>Logout</button>
        </div>
        {/* <Files />
        <Inbox /> */}
      </section>
    </>
  );
}

export default Dashboard;
