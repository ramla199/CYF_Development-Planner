import React from "react";

// import { NavLink } from "react-router-dom";

// import { useAuth } from "../auth";
import NavbarLink from "./NavbarLink";

import Logo from "./Logo";

function Navbar() {
  // const auth = useAuth();
  return (
    <>
      <nav className="primary-nav">
        <Logo />
        <NavbarLink />

        {/* <div className="nav-link">
          {" "}
          <NavLink to="/dashboard">Dashboard</NavLink>
        </div> */}

        {/* {!auth.user && <NavLink to="login">Login</NavLink>} */}
      </nav>
    </>
  );
}

export default Navbar;
