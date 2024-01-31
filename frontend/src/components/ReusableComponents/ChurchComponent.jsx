import React from "react";
import "../../styles/churchcomponent.css";
import { NavLink } from "react-router-dom";

const ChurchComponent = ({ image, title, description, id }) => {
  return (
    <div class="card">
      <img src={image} alt={title} class="card-image" />

      <div class="card-content">
        <h2 class="card-title">{title}</h2>

        <p class="card-description">{description} </p>

        <button class="card-button">
          <NavLink to={`/church/${id}`} className="see-more-button">
            See More
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default ChurchComponent;
