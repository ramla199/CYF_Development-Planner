import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../images/home-icon.png";
function Navbar() {
  return (
    <>
      <nav>
        <Link to="/">
          <img src={homeIcon} alt="home icon" />
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
