import React from "react";
import "../../../styles/getconnected.css";
import { Link } from "react-router-dom";

const GetConnected = ({
  ministries,
  aboutImage,
  churchName,
  getConnectedText,
}) => {
  const backgroundStyles = {
    backgroundImage: `url(${aboutImage})`,
  };
  return (
    <section style={backgroundStyles} id="get-connected-section">
      <div className="get-connected-wraper">
        <div className="about-overlay-div">
          <p className="church-get-connected">get conected</p>
          <h2 className="church-get-connected-heading">
            There is a place for you at pefa Church {churchName}
          </h2>
          <p className="church-get-connected-p">{getConnectedText}</p>
        </div>
        <div className="about-background-div"></div>
      </div>
      <div className="church-ministries">
        {ministries &&
          ministries.map((ministry, index) => (
            <div key={index} className="box">
              <Link to="/churches">{ministry.name}</Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default GetConnected;
