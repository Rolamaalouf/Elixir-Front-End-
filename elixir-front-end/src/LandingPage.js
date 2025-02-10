import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LandingPage.css";

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
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${data.heroSection.image})` }}>
        <div className="hero-content">
          <h1>{data.heroSection.siteTitle}</h1>
          <h2>{data.heroSection.subtitle}</h2>
         </div>
      </section>

      {/* Main Section */}
      <main className="main">
      <h1>{data.mainSection.tagline}</h1>
        {/* Our Menu */}
        <section className="section our-menu">
          <h2>{data.mainSection.ourMenu.title}</h2>
          <p>{data.mainSection.ourMenu.description}</p>
          <img src={data.mainSection.ourMenu.image} alt="Our Menu" />
          <button className="btn">Download Menu</button>
        </section>

        {/* Our Story */}
        <section className="section our-story">
          <h2>{data.mainSection.ourStory.title}</h2>
          <p>{data.mainSection.ourStory.description}</p>
          <img src={data.mainSection.ourStory.image} alt="Our Story" />
          <button className="btn">Check Us</button>
        </section>

        {/* Visit Us */}
        <section className="section visit-us">
          <h2>{data.mainSection.visitUs.title}</h2>
          <p>{data.mainSection.visitUs.description}</p>
          <img src={data.mainSection.visitUs.image} alt="Visit Us" />
          <button className="btn">Contact Us</button>
        </section>
      </main>
      <footer>Elixir</footer>
    </div>
  );
};

export default LandingPage;
