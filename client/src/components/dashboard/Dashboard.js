import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import Files from "./Files";
// import Inbox from "./Inbox";

/*
// components
import Files from "./mentor/Files";
import Inbox from "./mentor/Inbox";
*/

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


     // console.log(parseRes);

      // setName(parseRes.username);

      setName(parseRes.username);
      // Also store the username in local-storage for the usage of Plans and Feedbacks
      localStorage.setItem("username", parseRes.username);
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
        <h1 className="heading">Dashboard {name}</h1>
        <div className="login-signin-buttons">
          {theRole === "student" && 
                    <button onClick={() => navigate("/plans")}>Plans</button>}
          {theRole === "mentor" &&  
                    <button onClick={() => navigate("/feedback-requests")}>Feedback<br/>Requests</button>}
          <button onClick={(e) => logout(e)}>Logout</button>
        </div>
        {/* <Files />
        <Inbox /> */}
      </section>
/*
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
  */
}

export default Dashboard;
