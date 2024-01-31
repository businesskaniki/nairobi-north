import React from "react";
import { useParams } from "react-router-dom";
import "../../../styles/Aboutchurch.css";
import Button from "../../ReusableComponents/Button";
import { Link } from "react-router-dom";

const About = ({ChurchName,AboutChurch,AboutImage}) => {
  const { uuid } = useParams();

  return (
    <div className="about-container" id="about-us-section">
      <div className="text-part">
        <p className="welcome">Welcome to Pefa {ChurchName}</p>
        <h3>Join us this Sunday</h3>
        <p className="about_p">
          {AboutChurch}
        </p>
        <Button children={<Link to={`/church/${uuid}/about`}  >AboutUs</Link>} />
      </div>
      <div className="image-part">
        <img src={AboutImage} alt="About us" className="about-image" />
      </div>
    </div>
  );
};

export default About;
