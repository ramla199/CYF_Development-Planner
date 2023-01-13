import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

// COMPONENTS

// navbar (rendered on every page)
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Plans from "./components/dashboard/Plans";
import PlanEditor from "./components/dashboard/PlanEditor";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="plans" element={<Plans />} />
        <Route path="plan-editor" element={<PlanEditor />} />
      </Routes>
    </>
  );
}

export default App;
