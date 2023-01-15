import "./App.css";
import React, { useState, useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

//components

import Login from "./components/Login";
import Register from "./components/login-and-register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import NoMatch from "./components/NoMatch";
import Inbox from "./components/dashboard/Inbox";
import Messages from "./components/dashboard/Messages";
import Message from "./components/dashboard/Message";
import Files from "./components/dashboard/Files";
import NewFeedback from "./components/dashboard/NewFeedback";
import NewMessage from "./components/dashboard/NewMessage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/authentication/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:messageid" element={<Message />} />
        <Route path="files" element={<Files />} />
        <Route path="new-feedback" element={<NewFeedback />} />
        <Route path="new-message" element={<NewMessage />} />
      </Routes>
    </>
  );
}

export default App;
