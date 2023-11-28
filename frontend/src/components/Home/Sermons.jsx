import React from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import word from "../../Assets/word.jpeg";
import "../../styles/onlineSermon.css";

const Sermons = () => {
  return (
    <div className="online-sermon-container">
      <div className="online-sermon-wraper">
        <h1 className="online-sermon-heading">
          A community <br /> of unlikely <br /> friends <br /> following Jesus{" "}
          <br />
          together.
        </h1>
        <div className="online-sermon-content">
          <div className="online-sermon-image">
            <img src={word} alt="word of God" />
          </div>
          <div className="online-sermon-text">
            <p className="online-sermon-subheading">Online Sermons</p>
            <h5 className="online-sermon-desc">
              Now you can experience the word anytime, anywhere.
            </h5>
            <p className="online-sermon-paragraph">
              Sunday mornings you can worship live with our modern service at
              9:30 or our traditional service at 10:45. At every service we hear
              from God’s word, offer prayers, and worship through music.
            </p>
            <p className="online-sermon-link">
              Worship Online
              <FaGripLinesVertical />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sermons;
