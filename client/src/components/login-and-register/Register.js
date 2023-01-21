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

  const [role, setRole] = useState("student"); // DEFAULT VALUE


  const { fname, lname, username, email, password,  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Handle radio buttons separately
  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

/* Need to ensure that the email value is case-insensitive
   So it is converted to lowercase
*/
    try {
      const lowerEmail = email.toLowerCase();
      const body = {
        fname,
        lname,
        username,
        email: lowerEmail,
        password,
        role,
      };
      const response = await fetch("/authentication/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.jwtToken);
    /*
       The 'role' is also needed for Feedback Functionality
       It will be stored in local-storage
    */
      localStorage.setItem("role", role);
      setAuth(true);
    } catch (err) {
            console.error(err.message);
    }
  };
  return (
    <>
      <section>
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
            minLength="3"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
            minLength="3"
          />

          <label htmlFor="email">Email</label>
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

            <label htmlFor="student">
              Student
              <input
                id="student"
                type="radio"
                name="role"
                value="student"
                onChange={(e) => onRoleChange(e)}
                checked={role === "student"}
              />
            </label>

            <label htmlFor="mentor">
              Mentor
              <input
                id="mentor"
                type="radio"
                name="role"
                value="mentor"
                onChange={(e) => onRoleChange(e)}
                checked={role === "mentor"}
              ></input>
            </label>
          </fieldset>
          <div className="login-signin-buttons">
            <button>Submit</button>
          </div>
          <Link to="/login" className="signin-login-link">
            Login
          </Link>
        </form>
      </section>
    </>
  );
}

export default Register;
