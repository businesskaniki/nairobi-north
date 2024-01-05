import React from "react";
import { Link } from "react-router-dom";
import "../../styles/landing.css";
import Button from "../ReusableComponents/Button";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="background-div"></div>
      <div className="overlay-div">
        <h2 className="landing-heading">Welcome to</h2>
        <h2 className="landing-heading">pefa Nairobi North East</h2>
        <h2 className="landing-heading">District</h2>
        <div className="landing-btns">
          <Button
            icon={<FaRegArrowAltCircleRight />}
            type={"button"}
            children={<Link to="/about">New Here</Link>}
            style={{ backgroundColor: "skyblue", color: "black" }}
          />
          <Button
            icon={<FaRegArrowAltCircleRight />}
            type={"button"}
            children={<Link to="/churches">our churches</Link>}
            style={{ backgroundColor: "white", color: "white" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
