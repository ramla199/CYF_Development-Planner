import React from "react";
import homeIcon from "../../images/icons8-home-page-24.png";
import { NavLink, useLocation } from "react-router-dom";
import dashIcon from "../../images/icons8-dashboard-48.png";

function NavbarLink() {
  return (
    <>
      <NavLink to="/" className="nav-link">
        <img alt="home nav link icon" src={homeIcon} />
        <p className="icon-p">Home</p>
      </NavLink>

      <NavLink to="dashboard" className="nav-link">
        <img alt="dashboard nav link icon" src={dashIcon} />
        <p className="icon-p">Dashboard</p>
      </NavLink>
    </>
  );
}

export default NavbarLink;
