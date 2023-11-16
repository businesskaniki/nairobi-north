import React from "react";
import "../../styles/aboutus.css";
import bible from "../../Assets/bible.jpeg";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-wraper">
        <h1 className="about-heading">Who Are We ?</h1>
        <div className="about-desc">
          <div className="about-text">
            <p>
              PEFA Nairobi North East is a warm and inclusive church community
              in Nairobi. As part of the Pentecostal Evangelistic Fellowship of
              Africa (PEFA), we're dedicated to spreading the message of faith,
              hope, and love. With a diverse congregation and a strong
              commitment to serving our local community, we strive to create a
              place of worship where people can come together to grow in faith
              and build meaningful relationships. Join us in our journey of
              faith and community building.
            </p>
          </div>
          <div
            className="about-image"
            style={{ backgroundImage: `url(${bible})` }}
          ></div>
        </div>
      </div>
    </div> 
  );
};

export default AboutUs;
