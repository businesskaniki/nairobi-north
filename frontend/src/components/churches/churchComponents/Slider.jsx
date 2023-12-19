import React from "react";
import "../../../styles/churchslider.css";

const ChurchSlider = ({ image, text }) => {
  return (
  <div className="churchslider-container">
      <h4>{text}</h4>
      <img src={image} alt="text" />
  </div>
  );
};

export default ChurchSlider;
