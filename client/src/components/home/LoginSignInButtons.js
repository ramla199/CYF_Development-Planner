import React from "react";
import { Link } from "react-router-dom";

function LoginSignInButtons() {
  return (
    <>
      <div className="buttons">
        <Link to="/register">
          <button>Sign Up</button>
        </Link>

        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
}

export default LoginSignInButtons;
