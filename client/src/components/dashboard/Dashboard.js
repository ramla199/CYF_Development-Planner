import React from "react";
import Logout from "./Logout";

// components

import Files from "./mentor/Files";
import Inbox from "./mentor/Inbox";
import Name from "./Name";

function Dashboard({ setAuth }) {
  return (
    <>
      <section>
        <Name />
        <Logout setAuth={setAuth} />
        <Files />
        <Inbox />
      </section>
    </>
  );
}

export default Dashboard;
