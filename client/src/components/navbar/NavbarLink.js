import React from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../../images/icons8-home-page-24.png";
import dashIcon from "../../images/icons8-dashboard-48.png";

function NavbarLink() {
  return (
    <>
      <div className="nav-links">
        <NavLink to="/" className="nav-link">
          <img alt="home nav link icon" src={homeIcon} />
          <p className="icon-p">Home</p>
        </NavLink>

        <NavLink to="dashboard" className="nav-link">
          <img alt="dashboard nav link icon" src={dashIcon} />
          <p className="icon-p">Dashboard</p>
        </NavLink>
      </div>
    </>
  );
}

export default NavbarLink;
