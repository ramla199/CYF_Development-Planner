import React from "react";
import Logout from "./Logout";
import Name from "./Name";
import DashboardNavigation from "./DashboardNavigation";

function Dashboard({ setAuth }) {
  return (
    <>
      <div className="flex">
        <Name setAuth={setAuth} />
        <Logout setAuth={setAuth} />
      </div>
      <DashboardNavigation />
    </>
  );
}

export default Dashboard;
