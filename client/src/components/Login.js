import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
   Replaced 
   function Login({ setAuth })
   with
   function Login({ setUsername })    
*/

function Login({ setUsername }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(null);

  const { email, password } = inputs;

  const navigate = useNavigate();

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // const body = { email, password };

      const theUrl = "/auth/login/" + email + "/" + password;
      const response = await fetch(theUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.length !== 0) {
        const theUserName = parseRes[0].username;
        setUsername(theUserName);
        setLoggedIn(theUserName);
      } else {
        alert("Incorrect username or password");
        setUsername(null);
        setInputs({ email: "", password: "" });
      }
    } catch (err) {
      console.error(err.message);
    }

    /*
    if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
*/
  };

  /* 
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
*/

  useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn, setUsername);
      navigate("/dashboard", {
        state: { username: loggedIn },
      });
    }
  }, [loggedIn, navigate, setUsername]);

  return (
    <>
      <main>
        <form onSubmit={onSubmitForm}>
          <h1>Login</h1>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <button>login</button>
        </form>
        <Link to="/register">Signup</Link>
      </main>
    </>
  );
}

export default Login;
