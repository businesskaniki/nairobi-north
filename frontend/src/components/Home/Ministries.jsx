import React from "react";
import { Link } from "react-router-dom";
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

  // Dummy data for grid items
  const dummyData = [
    {
      name: "Youth",
      description: "Impacting students in their relationship with Jesus.",
    },
    {
      name: "children",
      description: "Impacting students in their relationship with Jesus.",
    },
    {
      name: "women",
      description: "Impacting students in their relationship with Jesus.",
    },
    {
      name: "men",
      description: "Impacting students in their relationship with Jesus.",
    },
  ];

  return (
    <div className="ministries-container">
      <div className="ministries-wraper">
        <h2 className="ministries-heading">Get Connected</h2>
        <div className="grid-container">
          {/* Map dummy data to generate grid items */}
          {dummyData.map((data, index) => (
            <div
              className="grid-item"
              key={index}
              style={{
                flexDirection: index % 4 < 2 ? "row" : "row-reverse",
              }}
            >
              <div className="ministries-text">
                <p className="ministry-name">{data.name}</p>
                <h4 className="ministry-desc">{data.description}</h4>
                <p className="ministry-link">
                <Link to={`/ministries/${data.name.toLowerCase()}`} className="ministry-link">
                  learn more<FaGripLinesVertical />
                </Link>
                </p>
              </div>
              <div
                style={containerStyle}
                className="ministry-image"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ministries;
