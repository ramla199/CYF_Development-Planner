import React from "react";
import bulletinBoard from "../../images/bulletin-board.jpg";
import { Link } from "react-router-dom";
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
            CYF Dev Planner is a tool for our graduates and mentors designed to
            help them send and receive feedback.
          </h2>
          <img alt="" src={bulletinBoard} className="header-img" />
        </div>
      </header>
    </>
  );
}

export default Home;
