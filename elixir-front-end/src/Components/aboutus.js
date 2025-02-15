import React, { useEffect, useState } from "react";
import axios from "axios";
import './AboutUs.css'; // Import CSS

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
//[] means this code will run only once when the component is first loaded.
  return (
    
    <div className="about-us-container">
      {aboutData ? (
        //aboutData ? (...) : (...): conditional rendering. loads from aboutdata, if null gives "loading"
        <>
          {/* Our Story Section */}
          <div className="our-story">
          <div className="storyimage">
            <img src={aboutData.ourStory.image} alt="Our Story" />
          </div>
          <div className="storytitle">
            <h1>{aboutData.ourStory.title}</h1>
            <p>{aboutData.ourStory.content}</p>
          </div>
          </div>
          
          {/* Gallery Section */}
          <div className="thegallery">
          <h2>{aboutData.gallery.title}</h2>
          <div className="gallery">
            {aboutData.gallery.images.map((image, index) => (
              <img key={index} src={image} alt={`Gallery Image ${index + 1}`} />
            ))}
          </div>

          {/* Mission Section */}
          <div className="mission">
          <h2>{aboutData.mission.title}</h2>
          <p>{aboutData.mission.content}</p>
          <img src={aboutData.mission.image} alt="Mission" />
          </div>

          {/* Vision Section */}
          <div className="vision">
          <h2>{aboutData.vision.title}</h2>
          <p>{aboutData.vision.content}</p>
          <img src={aboutData.vision.image} alt="Vision" />
          </div>

          {/* Go Padel Section */}
          <div className="gopadel">
          <h2>{aboutData.goPadel.title}</h2>
          <p>{aboutData.goPadel.content}</p>
          <a href={aboutData.goPadel.buttonLink} className="go-padel-button">
            {aboutData.goPadel.buttonText}
          </a>
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
