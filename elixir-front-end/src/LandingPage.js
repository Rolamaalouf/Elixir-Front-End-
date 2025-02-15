import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";
import Header from "./Components/header"; // Keep Header for all routes
import ball from "./Assets/ball.png";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";


const LandingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/landing-page")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching landing page data:", error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="landing-page">
        <Header /> {/* This header will be displayed on all routes */}

        {/* Render HeroSection conditionally based on the path */}
        <HeroSection data={data} />

        {/* Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<MainContent data={data} />} />
          <Route path="/menu" element={<Menu />} /> {/* Assuming Menu component exists */}
        </Routes>

        {/* Footer */}
        <footer>Elixir</footer>
      </div>
    </Router>
  );
};

// Hero section component
const HeroSection = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  
  // Only render the hero section on the root path
  if (location.pathname !== '/') return null;

  const handleMenuClick = () => {
    // Navigate to the /menu route
    navigate('/menu'); // Use navigate for routing
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${data.heroSection.image})` }}
    >
      <div className="hero-content">
        <h1>{data.heroSection.siteTitle}</h1>
        <h2>{data.heroSection.subtitle}</h2>
      </div>
      <div className="ball-button" onClick={handleMenuClick}>
        <img 
          src={ball}
          alt="Menu"
          className="ball-image"
        />
        <span className="ball-text">Menu</span>
      </div>
    </section>
  );
};

// Main content component for the home page
const MainContent = ({ data }) => (
  <main className="main">
    <h1>{data.mainSection.tagline}</h1>
    <section className="section our-menu">
      <h2>{data.mainSection.ourMenu.title}</h2>
      <p>{data.mainSection.ourMenu.description}</p>
      <img src={data.mainSection.ourMenu.image} alt="Our Menu" />
      <button className="btn">Download Menu</button>
    </section>
    <section className="section our-story">
      <h2>{data.mainSection.ourStory.title}</h2>
      <p>{data.mainSection.ourStory.description}</p>
      <img src={data.mainSection.ourStory.image} alt="Our Story" />
      <button className="btn">Check Us</button>
    </section>
    <section className="section visit-us">
      <h2>{data.mainSection.visitUs.title}</h2>
      <p>{data.mainSection.visitUs.description}</p>
      <img src={data.mainSection.visitUs.image} alt="Visit Us" />
      <button className="btn">Contact Us</button>
    </section>
  </main>
);

export default LandingPage;