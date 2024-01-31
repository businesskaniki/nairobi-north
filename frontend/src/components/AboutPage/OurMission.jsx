import React from "react";
import { Link } from "react-router-dom";
import { FaGripLinesVertical } from "react-icons/fa";

const OurMission = ({mision,missionDescription,aboutImage}) => {
  return (
    <div className="about-our-mission-text-wraper">
      <div className="about-our-mission-text">
        <p className="about-us-sub-heading">Our Mission</p>
        <h2>
         {mision}
        </h2>
        <p className="about-us-text-desc">
          {missionDescription}
        </p>
        <Link className="aboutus-page-link">
          get connected <FaGripLinesVertical />
        </Link>
      </div>
      <div className="about-our-mission-image">
        <img src={aboutImage} alt="About our church" />
      </div>
    </div>
  );
};

export default OurMission;
