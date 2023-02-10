import React from "react";
import Logout from "./Logout";

// components
import BackButton from "../BackButton";
import Files from "./mentor/Files";
import Inbox from "./mentor/Inbox";
import Name from "./Name";

function Dashboard({ setAuth }) {
  return (
    <>
      <section>
        <BackButton />
        <Name />
        <Logout setAuth={setAuth} />
        <Files setAuth={setAuth} />
        <Inbox />
      </section>
    </>
  );
}

export default Dashboard;
