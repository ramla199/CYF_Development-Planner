import React, { useState, useEffect } from "react";
import Logout from "./Logout";

import DashboardNavigation from "./DashboardNavigation";

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

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <div className="flex">
        <h1 className="heading">Dashboard {name}</h1>
        <Logout setAuth={setAuth} />
      </div>
      <DashboardNavigation name={name} setName={setName} getName={getName} />
    </>
  );
}

export default Dashboard;
