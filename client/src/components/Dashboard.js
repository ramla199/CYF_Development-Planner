import React, { useState, useEffect } from "react";
import messagesIcon72 from "../images/messages-icon-72.png";
import filesIcon72 from "../images/files-icon-72.png";
import { Link, useLocation } from "react-router-dom";

/*
   Replaced 
   function Dashboard({ setAuth })
   with
   function Dashboard()   
*/

function Dashboard() {
  /* 

  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const res = await fetch("http://localhost:4000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
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

*/

  const logout = async (e) => {
    e.preventDefault();
    // setUsername(null);
  };

  const location = useLocation();

  console.log(location)
  const name = location.state.username;
  // const setUsername = location.state.setUsername;

  return (
    <>
      <header className="dash-header">
        <h1>{name}'s Dashboard</h1>
        <button onClick={(e) => logout(e)}>Logout</button>
      </header>
      <nav className="inbox-and-files">
        <Link to="/inbox">
          <h2>Inbox</h2>
          <img src={messagesIcon72} alt="messages icon" />
        </Link>
        <Link to="/files">
          <h2>Files</h2>
          <img src={filesIcon72} alt="files icon" />
        </Link>
      </nav>
    </>
  );
}

export default Dashboard;
