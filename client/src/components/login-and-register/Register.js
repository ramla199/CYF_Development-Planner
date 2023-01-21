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
      <section className="form-container">
        <h1>Signup</h1>
        <form onSubmit={onSubmitForm} className="form">
          <label htmlFor="fname">first name</label>
          <input
            id="fname"
            type="text"
            name="fname"
            value={fname}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
            required
          />
          <label htmlFor="lname">last name</label>
          <input
            id="lname"
            type="text"
            name="lname"
            value={lname}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
            required
          />
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
            required
          />
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
            required
          />

          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder="type here..."
            onChange={(e) => onChange(e)}
            required
          />

          <fieldset>
            <legend>Your CYF role:</legend>

            <label htmlFor="student">
              trainee{" "}
              <input
                id="student"
                type="radio"
                name="role"
                value="student"
                placeholder="type here..."
                onChange={(e) => onChange(e)}
              />
            </label>

            <label htmlFor="mentor">
              mentor{" "}
              <input
                id="mentor"
                type="radio"
                name="role"
                value="mentor"
                onChange={(e) => onChange(e)}
              ></input>
            </label>
          </fieldset>
          <div className="buttons">
            <button>submit</button>
          </div>
          <Link to="/login" className="form-link">
            Login
          </Link>
        </form>
      </section>
    </>
  );
}

export default Register;
