import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
/* Removed StrictMode in order to STOP Rendering Twice!
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
*/

root.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
