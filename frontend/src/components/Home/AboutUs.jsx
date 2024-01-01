import React,{useEffect} from "react";
import "../../styles/aboutus.css";
import bible from "../../Assets/bible.jpeg";
import { FaGripLinesVertical } from "react-icons/fa";

const AboutUs = () => {

  
  return (
    <div id="About" className="about-container">
      <div className="about-wraper">
        <div className="text-container">
          <p className="welcome-txt">Welcome</p>
          <h2 className="about-heading">We Are Glad You're Here</h2>
          <h2 className="about-paragraph">
            We are a community of unlikely friends following Jesus together. In
            a divided world filled with tension, we feel called to create a rare
            place where relationships are formed that don't make sense according
            to the world. No matter your age or stage in life, we are united in
            Jesus. It is our hope and prayer that we can help you to Know
            Christ, Grow together in faith, and Go serve the world.
          </h2>
          <p className="about-link">About Us <FaGripLinesVertical /></p>
        </div>
        <div className="image-div">
          <img src={bible} alt="bible" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
