import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
// import FeedbacksForm from "./components/dashboard/FeedbacksForm";
//components
import Plans from "./components/dashboard/Plans";
import PlanEditor from "./components/dashboard/PlanEditor";
// import Navbar from "./components/Navbar";

function App() {
  // const [username, setUsername] = useState(null);

  // let location = useLocation();
  // console.log(location);

  return (
    <>
      {/* {location.pathname !== "/plans" && <Navbar />} */}

      <Routes>
        <Route path="plans" element={<Plans />} />
        <Route path="plan-editor" element={<PlanEditor />} />
      </Routes>
    </>
  );
}

export default App;
