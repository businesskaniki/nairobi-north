import React from "react";
import "../../styles/ministries.css";
import sundaySch from "../../Assets/Sunday.png";
import { FaGripLinesVertical } from "react-icons/fa";

const Ministries = () => {
  const containerStyle = {
    backgroundImage: `url(${sundaySch})`,
    backgroundColor: "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "50%", 
    height: "100%",
  };

  return (
    <div className="ministries-container">
      <div className="ministries-wraper">
        <h2 className="ministries-heading">Get Connected</h2>
        <div className="grid-container">
          <div className="grid-item">
            <div className="ministries-text">
              <p className="ministry-name">Youth</p>
              <h4 className="ministry-desc">
                Impacting students in their relationship with Jesus.
              </h4>
              <p className="ministry-link">learn more<FaGripLinesVertical /></p>
            </div>
            <div style={containerStyle} className="ministry-image"></div>
          </div>
          <div className="grid-item">
            <div className="ministries-text">
              <p className="ministry-name">Youth</p>
              <h4 className="ministry-desc">
                Impacting students in their relationship with Jesus.
              </h4>
              <p className="ministry-link">learn more<FaGripLinesVertical /></p>
            </div>
            <div style={containerStyle} className="ministry-image"></div>
          </div>
          <div className="grid-item">
            <div style={containerStyle} className="ministry-image"></div>
            <div className="ministries-text">
              <p className="ministry-name">Youth</p>
              <h4 className="ministry-desc">
                Impacting students in their relationship with Jesus.
              </h4>
              <p className="ministry-link">learn more<FaGripLinesVertical /></p>
            </div>
          </div>
          <div className="grid-item">
            <div style={containerStyle} className="ministry-image"></div>
            <div className="ministries-text">
              <p className="ministry-name">Youth</p>
              <h4 className="ministry-desc">
                Impacting students in their relationship with Jesus.
              </h4>
              <p className="ministry-link">learn more<FaGripLinesVertical /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ministries;
