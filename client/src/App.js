import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
// import FeedbacksForm from "./components/dashboard/FeedbacksForm";
//components
// import Home from "./components/Home";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Register from "./components/Register";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/dashboard/Navbar";
//dashboard routes
import Inbox from "./components/dashboard/Inbox";
import Files from "./components/dashboard/Files";
import Messages from "./components/dashboard/Messages";
import Message from "./components/dashboard/Message";
import DummyComponent from "./components/dashboard/DummyComponent";
// import NewFeedback from "./components/dashboard/NewFeedback";

// import FeedbacksList from "./components/dashboard/FeedbacksList";
function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const setAuth = (boolean) => {
  //   setIsAuthenticated(boolean);
  // };

  // async function isAuth() {
  //   try {
  //     const response = await fetch("http://localhost:4000/auth/is-verify", {
  //       method: "GET",
  //       headers: { token: localStorage.token },
  //     });

  //     const parseRes = await response.json();

  //     parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
  //     console.log(parseRes);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // useEffect(() => {
  //   isAuth();
  // }, []);

  // const [feedback, setFeedback] = useState("");
  // const [feedbacksList, setFeedbacksList] = useState([]);
  return (
    <>
      {/* <Routes>
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
      </Routes> */}
      <Navbar />
      <Routes>
        <Route path="*" element={<NoMatch />} />
        {/* <Route path="new-feedback" element={<NewFeedback />} /> */}
        <Route path="inbox" element={<Inbox />} />
        <Route path="files" element={<Files />} />
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:messageid" element={<Message />} />
        <Route path="dummy-component" element={<DummyComponent />} />
      </Routes>
      {/* <FeedbacksForm
        feedback={feedback}
        setFeedback={setFeedback}
        feedbacksList={feedbacksList}
        setFeedbacksList={setFeedbacksList}
      />
      <FeedbacksList
        setFeedbacksList={setFeedbacksList}
        feedbacksList={feedbacksList}
      /> */}
    </>
  );
}

export default App;
