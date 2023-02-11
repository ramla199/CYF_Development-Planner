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
        <div className="buttons">
          <BackButton />
          <Logout setAuth={setAuth} />
        </div>

        <Name />
        <div className="flex">
          <Files setAuth={setAuth} />
          <Inbox />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
