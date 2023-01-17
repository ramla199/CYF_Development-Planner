import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);

        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <main>
        <form onSubmit={onSubmitForm} className="form">
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email.toLowerCase()}
            onChange={(e) => onChange(e)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <div className="login-signin-buttons">
            <button>login</button>
          </div>
        </form>
        <Link to="/register">Signup</Link>
      </main>
    </>
  );
}

export default Login;
