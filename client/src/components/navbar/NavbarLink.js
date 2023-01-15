import React from "react";
import homeIcon from "../../images/icons8-home-page-24.png";
import { NavLink } from "react-router-dom";

function NavbarLink() {
  return (
    <>
      <NavLink to="/" className="nav-link">
        <img alt="home nav link icon" src={homeIcon} />
        <p className="icon-p">Home</p>
      </NavLink>
    </>
  );
}

export default NavbarLink;
