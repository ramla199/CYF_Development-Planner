import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1>Dashboard {name}</h1>
      <div className="login-signin-buttons">
        {" "}
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>
      <Link to="/plans" >
        <h2>Plans</h2>
      </Link>
    </>
  );
}

export default Dashboard;
