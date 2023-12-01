import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaTachometerAlt, FaChurch } from "react-icons/fa";
import { RiGroup2Fill } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import "../../styles/SideNav.css";
import ChurchAdmin from "./churches/ChurchAdmin";
import Ministries from "./Ministries/Ministries";
import Events from "./Events/Events";
import Gallery from "./Gallery/Gallery";
import Members from "./members/Members";

const SideNav = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "ChurchAdmin":
        return <ChurchAdmin />;
      case "Ministries":
        return <Ministries />;
      case "Gallery":
        return <Gallery />;
      case "Members":
        return <Members />;
      case "Events":
        return <Events />;
      default:
        return <ChurchAdmin />;
    }
  };
  return (
    <div className="SideNav-container">
      <div className="nav-container">
        <div className="home-icon">
          <div className="icon">
            <MdDashboard />
          </div>
          <p>Dashboard</p>
        </div>
        <nav className="sidenav">
          <ul className="sidenav-ul">
            <li>
              <Link to={"/"}>
                <div className="icon">
                  <FaTachometerAlt />
                </div>
                <p>Home</p>
              </Link>
            </li>
            <li onClick={() => handleComponentClick("Ministries")}>
              <p>Ministries</p>
              <div className="icon">
                <FaPeopleGroup />
              </div>
            </li>
            <li onClick={() => handleComponentClick("Gallery")}>
              <p>Gallery</p>
              <div className="icon">
                <GrGallery />
              </div>
            </li>
            <li onClick={() => handleComponentClick("Events")}>
              <p>Events</p>
              <div className="icon">
                <MdEvent />
              </div>
            </li>
            <li onClick={() => handleComponentClick("ChurchAdmin")}>
              <p>Churches</p>
              <div className="icon">
                <FaChurch />
              </div>
            </li>
            <li onClick={() => handleComponentClick("Members")}>
              <p>Members</p>
              <div className="icon">
                <RiGroup2Fill />
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="dashboard-components">{renderComponent()}</div>
    </div>
  );
};

export default SideNav;
