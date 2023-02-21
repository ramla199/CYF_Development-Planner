import React from "react";
import cat from "../../images/cat.jpg";

import Heading from "./Heading";
import LoginSignInButtons from "./LoginSignInButtons";

function Home() {
  return (
    <>
      <header className="header">
        <Heading />
        <LoginSignInButtons />
        <div className="header-flex">
          <h2 className="subheading">
            CYF Development Planner is a tool for our graduates and mentors. It
            is designed to help graduates write SMART Plans send them to their
            mentors and receive feedback.
          </h2>
          <img alt="" src={cat} className="header-img" />
        </div>
      </header>
    </>
  );
}

export default Home;
