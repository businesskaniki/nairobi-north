import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/churchnav.css";

const ChurchNav = ({ churchName }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    console.log(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="church-nav">
      <div className="church-logo">
        <p className="church-name">{churchName}</p>
      </div>
      <div className="church-ul-menu">
        <ul>
          <li onClick={() => scrollToSection("about-us-section")}>About</li>
          <li onClick={() => scrollToSection("get-connected-section")}>
            Connect
          </li>
          <li onClick={() => scrollToSection("sermons-section")}>Watch</li>

          <li onClick={() => scrollToSection("next-step-section")}>
            Next Step
          </li>
          <li onClick={() => scrollToSection("events-section")}>Event</li>
          <li onClick={() => scrollToSection("give-section")}>Give</li>
          <li>
            <Link to="/im-new">I`m New</Link>{" "}
          </li>
          <li>
            <Link to="/">NNE district</Link>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ChurchNav;
