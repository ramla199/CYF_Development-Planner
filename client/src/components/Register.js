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
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      console.log(parseRes);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <main>
        <form onSubmit={onSubmitForm}>
          <h1>Signup</h1>
          <label>First Name</label>
          <input
            type="text"
            name="fname"
            value={fname}
            onChange={(e) => onChange(e)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            name="lname"
            value={lname}
            onChange={(e) => onChange(e)}
            required
          />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />

          <label>Email</label>
          <input
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

          <button>Submit</button>
        </form>
        <Link to="/login">Login</Link>
      </main>
    </>
  );
}

export default Register;
