import React from "react";
import cat from "../../images/cat.jpg";

import Heading from "./Heading";
import LoginSignInButtons from "./LoginSignInButtons";

function Home() {
  return (
    <>
      <main>
        {" "}
        <header className="header">
          <Heading />

          <div className="header-flex">
            <div>
              <LoginSignInButtons />
              <h2 className="subheading">
                CYF Dev Planner is a tool for our graduates and mentors designed
                to help them send plans and receive feedback.
              </h2>
            </div>

            <img alt="" src={cat} className="header-img" />
          </div>
        </header>
      </main>
    </>
  );
}

export default Home;
