import React from "react";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";

const feedbacks = ["feedback 1", "feedback 1", "feedback 1", "feedback 1"];
function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  return (
    <>
      <h1>Welcome {auth.user}</h1>
      <button onClick={handleLogout}>Logout</button>
      <nav>
        <select>
          {feedbacks.map((feedback) => {
            return <option>{feedback}</option>;
          })}
        </select>
      </nav>
      <h2>new feedback</h2>
      <button>create</button>
    </>
  );
}

export default Dashboard;
