import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

//components
import Home from "./components/Home";
import Plans from "./components/dashboard/Plans";
import PlanEditor from "./components/dashboard/PlanEditor";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/auth";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="plans" element={<Plans />} />
          <Route path="plan-editor" element={<PlanEditor />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
