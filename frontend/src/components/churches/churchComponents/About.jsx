import React from "react";
import about from "../../../Assets/About.png";
import "../../../styles/Aboutchurch.css";

const About = () => {
  return (
    <div class="about-container" id="about-us-section">
      <div class="text-part">
        <p className="welcome">Welcome</p>
        <h3>Join us this Sunday</h3>
        <p className="about_p">
          Everyone, absolutely everyone is invited by Jesus to get to know Him
          and his great love for us. We are a multi-generational and
          multi-ethnic community celebrating each person's unique contribution
          to the local church, and to the community in and around Columbus OH.
          We pursue an encounter with Jesus through His Word, through
          relationships, and through a passionate expression of worship. It
          doesn't matter where you are on your spiritual journey, whether you’re
          unfamiliar with Christianity, or whether you’ve been doing this for a
          while, we are all on a journey of learning and growing together.
        </p>
        <button>About us</button>
      </div>
      <div class="image-part">
        <img src={about} alt="About us" class="about-image" />
      </div>
    </div>
  );
};

export default About;
