import React from "react";
import "../../styles/Admin.css";
import SideNav from "./SideNav";

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="navigation">
        <SideNav />
      </div>
      <div className="other-componets"></div>
    </div>
  );
};

export default Admin;
