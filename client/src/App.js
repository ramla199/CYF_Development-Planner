import "./styles/general.css";
import "./styles/navbar.css";
import "./styles/buttons.css";
import "./styles/form.css";
import "./styles/typography.css";
import "./styles/media.css";

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//components

import Login from "./components/login-and-register/Login";
import Register from "./components/login-and-register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import NoMatch from "./components/NoMatch";

import ListFeedbacks from "./components/dashboard/mentor/ListFeedbacks";
import ListMessages from "./components/dashboard/mentor/ListMessages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:4000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          exact
          path="login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
