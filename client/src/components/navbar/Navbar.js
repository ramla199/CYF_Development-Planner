import React from "react";

import NavbarLink from "./NavbarLink";

import Logo from "./Logo";

function Navbar() {
  // const auth = useAuth();
  return (
    <>
      <nav className="primary-nav">
        <Logo />
        <NavbarLink />
      </nav>
    </>
  );
}

export default Navbar;
