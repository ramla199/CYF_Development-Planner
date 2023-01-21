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
      <section className="form-container">
        <h1>Login</h1>
        <form onSubmit={onSubmitForm} className="form">
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email.toLowerCase()}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
          />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
          />
          <div className="buttons">
            <button>login</button>
          </div>
          <Link to="/register" className="form-link">
            Signup
          </Link>
        </form>
      </section>
    </>
  );
}

export default Login;
