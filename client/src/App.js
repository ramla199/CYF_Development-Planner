import "./styles/general.css";
import "./styles/navbar.css";
import "./styles/buttons.css";
import "./styles/form.css";
import "./styles/typography.css";
import "./styles/media.css";

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

//components

import Login from "./components/login-and-register/Login";
import Register from "./components/login-and-register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import NoMatch from "./components/NoMatch";

import Plans from "./components/dashboard/Plans";
import PlanEditor from "./components/dashboard/PlanEditor";
import SelectMentor from "./components/dashboard/SelectMentor";

import FeedbackRequests from "./components/dashboard/FeedbackRequests";
import FeedbackRequests2 from "./components/dashboard/FeedbackRequests";
/*
import ListFeedbacks from "./components/dashboard/mentor/ListFeedbacks";
import ListMessages from "./components/dashboard/mentor/ListMessages";
*/

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
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

  let location = useLocation();

  return (
    <>
      {/* Don't show Home Icon for Plan's menus */}
      {!location.pathname.startsWith("/plan") && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
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

        <Route path="list-feedbacks" element={<ListFeedbacks />} />
        <Route path="list-messages" element={<ListMessages />} />
        <Route path="plans" element={<Plans />} />
        <Route path="plan-editor" element={<PlanEditor />} />
        <Route path="select-mentor" element={<SelectMentor />} />

        <Route path="feedback-requests" element={<FeedbackRequests />} />

/*
        <Route path="*" element={<NoMatch />} />
*/
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
