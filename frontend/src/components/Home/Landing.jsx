import React from "react";
import "../../styles/landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="background-div"></div>
      <div className="overlay-div">
        <h2 className="landing-heading">Welcome to pefa Nairobi North East District</h2>
        <p className="landing-paragraph">
          where we worship in truth and in spirit for we are Gods creation.
        </p>
        <div className="landing-btns">
          <button className="landing-semons-btn">sermons</button>
          <button className="landing-churches-btn">churches</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
