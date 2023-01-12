import React from "react";
import bulletinBoard from "../images/bulletin-board.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <header className="header">
        <h1>Welcome to CYF Dev Planner</h1>
        <div className="header-flex">
          <img alt="" src={bulletinBoard} className="header-img" />
          <div>
            {" "}
            <h2>
              Pellentesque vel ultricies magna. Integer eget felis ac sapien
              ultricies sagittis sit amet et ante. Nunc placerat maximus ante,
              sit amet convallis purus. Nulla convallis vulputate dui, vel
              faucibus libero aliquam vitae.
            </h2>{" "}
            <div className="buttons">
              <button>
                <Link to="/sign-in">Sign in</Link>
              </button>
              <button>
                {" "}
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Home;
