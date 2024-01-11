import React from "react";
import Button from "../../ReusableComponents/Button";
import { FaArrowRight } from "react-icons/fa6";
import backgroundImage from "../../../Assets/serom.png";
import "../../../styles/churchsermons.css";
import { Link } from "react-router-dom";

const OnlineSermons = () => {
  return (
    <section className="d" id="sermons-section">
    <div className="church-sermons-wraper">
      <div className="zooming-div">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="overlay-text1">
          <h2>Jan 23rd</h2>
          <p>The power of small habits</p>
        </div>
      </div>
      <div className="church-sermon-content">
        <h6>Join Us Online</h6>
        <h2>watch anytime, anywhere.</h2>
        <p>
          We invite you to join us online if you cannot attend in person.
          While we recognize online experience cannot replace face-to-face
          gathering, we understand the complexities of work, travel, illness,
          and hope this option is a great alternative for when you’re unable
          to make it in person.
        </p>
        <Button children={<Link to="/sermons">watch Now!</Link>}  icon={<FaArrowRight />}/>
      </div>
    </div>
  </section>
  )
}

export default OnlineSermons