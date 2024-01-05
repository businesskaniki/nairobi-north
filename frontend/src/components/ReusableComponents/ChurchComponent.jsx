import React from "react";
import "../../styles/churchcomponent.css";
import { NavLink } from "react-router-dom";
const ChurchComponent = ({ image, title, description,id }) => {
  return (
    <div className="img-card iCard-style2">
      <div className="card-content">
        <div className="card-image">
          <span className="card-caption">Image Caption</span>
          <img src={image}  alt={title}/>
        </div>

        <span className="card-title">{title}</span>

        <div className="card-text">
          <p>
            {description}
            <button>
              <NavLink to={`/church/${id}`}>see our church</NavLink>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChurchComponent;
