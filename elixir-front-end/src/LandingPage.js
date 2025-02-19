import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import "./LandingPage.css";
import Header from "./Components/header"; // Keep Header for all routes
import ball from "./Assets/ball.png";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import AboutUs from "./aboutus";
import ContactUs from "./contactus";
import Footer from "./Components/footer";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://elixir-repo-3.onrender.com/api/landing-page")
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
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

const HeroSection = ({ data }) => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  
  if (location.pathname !== '/') return null;

  const handleMenuClick = () => {
    navigate('/menu'); 
  };

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${data?.heroSection?.image || ''})` }}
    >
      <div className="hero-content">
        <h1>{data?.heroSection?.siteTitle || ''}</h1>
        <h2>{data?.heroSection?.subtitle || ''}</h2>
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

const MainContent = ({ data }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${process.env.PUBLIC_URL}/menu.jpeg`;
    link.download = "menu.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="main">
      <h3>{data?.mainSection?.tagline || ''}</h3>
      
      <section className="section our-menu">
        <h2>{data?.mainSection?.ourMenu?.title || ''}</h2>
        <p>{data?.mainSection?.ourMenu?.description || ''}</p>
        <img src={data?.mainSection?.ourMenu?.image || ''} alt="Our Menu" />
        <button className="btn" onClick={handleDownload}>Download Menu</button>
      </section>

      <section className="section our-story">
        <h2>{data?.mainSection?.ourStory?.title || ''}</h2>
        <p>{data?.mainSection?.ourStory?.description || ''}</p>
        <img src={data?.mainSection?.ourStory?.image || ''} alt="Our Story" />
        <Link to="/about">
          <button className="btn">Check Us</button>
        </Link>
      </section>

      <section className="section visit-us">
        <h2>{data?.mainSection?.visitUs?.title || ''}</h2>
        <p>{data?.mainSection?.visitUs?.description || ''}</p>
        <img src={data?.mainSection?.visitUs?.image || ''} alt="Visit Us" />
        <Link to="/contact">
          <button className="btn">Contact Us</button>
        </Link>
      </section>
    </main>
  );
};

export default LandingPage;
