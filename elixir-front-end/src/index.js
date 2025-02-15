import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LandingPage from "./LandingPage"; // Import LandingPage directly

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router and Routes
import AboutUs from "./Components/aboutus.js"; // Import AboutUs Page

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Define Routes */}
        <Route path="/" element={<LandingPage />} />  {/* LandingPage Route */}
        <Route path="/about-us" element={<AboutUs />} />  {/* AboutUs Route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
