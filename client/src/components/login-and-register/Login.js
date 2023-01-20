import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;
  
  const onChange = (e) => {
    /*
    A strange bug is occurring whilst logging in
    The last character is being capitalised

    setInputs({ ...inputs, [e.target.name]: e.target.value });  
    {email: 'jsmith@gmail.coM', password: 'jsmith'}

    Nevertheless need to ensure that the email value is case-insensitive
    So it is converted to lowercase
    */
   
   if (e.target.name === "email") {
    // Ensure email value is lowercase
       setInputs({ ...inputs, email: e.target.value.toLowerCase() });  
   } else {
       setInputs({ ...inputs, password: e.target.value });
   } 

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
          if (parseRes.jwtToken) {
              localStorage.setItem("token", parseRes.jwtToken);
              setAuth(true);

        /* 
           At this point seeing that Login is successful
           The current value of the port number is needed for Plans and Feedbacks
           So, this endpoint "/port-value" is fetched to retrieve this value
           The port number will be stored in local-storage
        */

              try {
                   const response = await fetch("/port-value", {
                      method: "GET",
                      headers: { "Content-Type": "application/json" },
                   });
                   const portvalue = await response.json();
                   localStorage.setItem("port", portvalue);
              }
              catch (err) {
                      console.error(err.message);
              } 
          } else { // Login Failed!
                setAuth(false);
                  }
        } catch (err) {
            console.error(err.message);
    }
  };


  return (
    <>
      <section>
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
          <Link to="/register" className="signin-login-link">
            Signup
          </Link>
        </form>
      </section>
    </>
  );
}

export default Login;
