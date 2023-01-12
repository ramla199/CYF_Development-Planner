import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./auth";

function Navbar() {
  const auth = useAuth();
  return (
    <>
      <nav className="primary-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {!auth.user && <NavLink to="login">Login</NavLink>}
      </nav>
    </>
  );
}

export default Navbar;
