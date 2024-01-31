import React, { useState } from "react";
import Button from "../../ReusableComponents/Button";
import "../../../styles/churchslider.css";
import ime from "../../../Assets/churchbg.png";
import { Link } from "react-router-dom";
const ChurchSlider = ({bgimage,welcomeText}) => {
  const [image, setImage] = useState(ime); // Replace with your image URL

  const [text, setText] = useState("Welcome to Our Church!");

  return (
    <div className="landing-page">
      <div className="background" style={{ backgroundImage: `url(${bgimage})` }}>
        <div className="overlay-text">
          <h1 className="description">{text}</h1>
          <h1 className="Jesus">Jesus the </h1>
          <Button
            children={<Link to="/about">New Here!</Link>}
            style={{ backgroundColor: "skyblue", color: "black" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChurchSlider;
