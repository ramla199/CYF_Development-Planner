import React from "react";

function Logout({ setAuth }) {
  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>
      <div className="login-signin-buttons">
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>
    </>
  );
}

export default Logout;
