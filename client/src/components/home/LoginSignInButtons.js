import React from "react";
import { Link } from "react-router-dom";

function LoginSignInButtons() {
  return (
    <>
      <div className="login-signin-buttons">
        <Link to="/sign-in">
          <button>Sign in</button>
        </Link>

        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
}

export default LoginSignInButtons;
