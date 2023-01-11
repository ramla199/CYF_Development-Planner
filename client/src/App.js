import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import FeedbacksForm from "./components/dashboard/FeedbacksForm";
//components
import Login from "./components/Login";
import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/dashboard/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
// //dashboard components
import Inbox from "./components/dashboard/Inbox";
import Files from "./components/dashboard/Files";
import Messages from "./components/dashboard/Messages";
import Message from "./components/dashboard/Message";
import NewFeedback from "./components/dashboard/NewFeedback";
import NewMessage from "./components/dashboard/NewMessage";
import Plans from "./components/dashboard/Plans";
import PlanEditor from "./components/dashboard/PlanEditor";


function App() {
/*
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
*/

const [username, setUsername] = useState(null);

let location = useLocation();
console.log(location);

  return (
    <>
      {location.pathname !== "/plans" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="register"
          //        element={ <Register setAuth={setAuth} /> } />
          element={<Register setUsername={setUsername} />}
        />
        <Route
          exact
          path="login"
          //        element={ <Login setAuth={setAuth} /> } />
          element={<Login setUsername={setUsername} />}
        />
        <Route
          exact
          path="dashboard"
          //        element={ <Dashboard setAuth={setAuth} /> } />
          element={<Dashboard setUsername={setUsername} />}
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
        <Route path="plans" element={<Plans />} />
        <Route path="plan-editor" element={<PlanEditor />} />
      </Routes>
    </>
  );
}

export default App;
