import React from "react";
import "../../styles/churchcomponent.css";
import { NavLink } from "react-router-dom";

const ChurchComponent = ({ image, title, description, id }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-overlay">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <NavLink to={`/church/${id}`} className="see-more-button">
          See More
        </NavLink>
      </div>
    </div>
  );
};

export default ChurchComponent;
