import React, { useState, useEffect } from "react";

function Dashboard({ setAuth }) {
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

  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <h1>Dashboard {name}</h1>
      <button onClick={(e) => logout(e)}>Logout</button>
    </>
  );
}

export default Dashboard;
