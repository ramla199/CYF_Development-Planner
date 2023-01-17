import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../images/icons8-home-page-24.png";

function PlansNavbar() {
  
  return (
    <>
      <nav>
        <Link to="/dashboard" >
          <img src={homeIcon} alt="home icon" />
        </Link>
      </nav>
    </>
  );
}

export default PlansNavbar;
