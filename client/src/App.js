import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import FeedbacksForm from "./components/dashboard/FeedbacksForm";
//components
import Plans from "./components/dashboard/Plans";
import PlanEditor from "./components/dashboard/PlanEditor";
import Navbar from "./components/Navbar";

function App() {
  const [username, setUsername] = useState(null);

  // let location = useLocation();
  // console.log(location);

  return (
    <>
      {/* {location.pathname !== "/plans" && <Navbar />} */}

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
