import React from "react";
import EditUpdateDeleteChurch from "./EditUpdateDeleteChurch";
import { NavLink } from "react-router-dom";

const ChurchAdmin = () => {
  return (
    <div>
      <button>
        <NavLink to="/addchurch">ADD A CHURCH</NavLink>
      </button>

      <EditUpdateDeleteChurch />
    </div>
  );
};

export default ChurchAdmin;
