import React, { useEffect, useState } from "react";
import axios from "axios";
import './AboutUs.css'; // Import CSS
import Header from "./header"; // Keep Header for all routes
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//aboutus: functional React component.
const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null); // State to store data
  //useState(null) initializes a state variable aboutData with null; where we store data
 //setAboutData is the function that updates the aboutData state.

  // Fetch data from backend API when component loads
  useEffect(() => {
    axios.get("http://localhost:5000/api/about-us")
    //if successful
    //response.data contains the data returned from the backend.
      .then(response => {
        console.log("Fetched Data:", response.data); // Check the response in console
        setAboutData(response.data); // Store data in state |setAboutData(response.data): Once we receive the data from the backend, we store it in the aboutData state.
      })
      //.catch(error): If there's an error while fetching the data (like the backend is down, or the URL is incorrect), the error is logged in the console.
      .catch(error => {
        console.error("Error fetching About Us data:", error);
      });
  }, []);
    // Slider settings
    const sliderSettings = {
      dots: true, 
      infinite: true, 
      speed: 500, 
      slidesToShow: 1, 
      slidesToScroll: 1,
      autoplay: true, 
      autoplaySpeed: 3000,
    };
  
//[] means this code will run only once when the component is first loaded.
  return (
    
    <div className="about-us-container1">
      <div className="head">
      <Header /> {/* This header will be displayed on all routes */}
      </div>
      
      {aboutData ? (
        //aboutData ? (...) : (...): conditional rendering. loads from aboutdata, if null gives "loading"
        <>
          {/* Our Story Section */}
          <div className="our-story1">
            <div className="storyimage1">
                  <img src={aboutData.ourStory.image} alt="Our Story" />
                </div>
                <div className="storytitle1">
                  <h1>{aboutData.ourStory.title}</h1>
                  <p>{aboutData.ourStory.content}</p>
                </div>
            </div>
            
            {/* Gallery Section */}
            <div className="thegallery1">
              <h2>{aboutData.gallery.title}</h2>
              <Slider {...sliderSettings} className="gallery-carousel">
                {aboutData.gallery.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Gallery Image ${index + 1}`} className="carousel-image" />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="all11">
                {/* Mission Section */}
                
                <div className="mission1">
                <section>
                    <h2>{aboutData.mission.title}</h2>
                    <p>{aboutData.mission.content}</p>
                </section>
                  <img src={aboutData.mission.image} alt="Mission" />
                </div>

                {/* Vision Section */}
                <div className="vision1">
                  <section>
                    <h2>{aboutData.vision.title}</h2>
                    <p>{aboutData.vision.content}</p>
                  </section>
                  <img src={aboutData.vision.image} alt="Vision" />
                </div>

                {/* Go Padel Section */}
                <div className="gopadel1">
                  <section>
                    <h2>{aboutData.goPadel.title}</h2>
                    <p>{aboutData.goPadel.content}</p>
                    <button className="buttonpadel">
                    <a href={aboutData.goPadel.buttonLink} className="go-padel-button">
                      {aboutData.goPadel.buttonText}
                    </a></button>
                  </section>
                  
                  <img src={aboutData.goPadel.image} alt="Go Padel" />
                </div>
             </div>
                
          
        </>
      ) : (
        <p>Loading...</p> // Show loading while data is being fetched
      )}
    </div>
  );
};

export default AboutUs;
