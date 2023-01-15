import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const { fname, lname, username, email, password, role } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { fname, lname, username, email, password, role };
      const response = await fetch("/authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.jwtToken);
      console.log(parseRes);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <main>
        <form onSubmit={onSubmitForm} className="form">
          <h1>Signup</h1>
          <label htmlFor="fname">First Name</label>
          <input
            id="fname"
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => onChange(e)}
            required
          />
          <label htmlFor="lname">Last Name</label>
          <input
            id="lname"
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => onChange(e)}
            required
          />
          <label html="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />

          <label htnlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />

          <fieldset>
            <legend>Your CYF role:</legend>
            <input
              id="student"
              type="radio"
              name="role"
              value="student"
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="student">Student</label>
            <input
              id="mentor"
              type="radio"
              name="role"
              value="mentor"
              onChange={(e) => onChange(e)}
            ></input>
            <label htmlFor="mentor">Mentor</label>
          </fieldset>
          <div className="login-signin-buttons">
            <button>Submit</button>
          </div>
        </form>
        <Link to="/login">Login</Link>
      </main>
    </>
  );
}

export default Register;
