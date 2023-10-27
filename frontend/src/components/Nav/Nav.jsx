import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import "./nav.scss";

const Nav = () => {
  const [isDropdownVisible, setDropdownVisible] = useState("notvisible");

  const handleMouseEnter = () => {
    setDropdownVisible("visible");
  };

  const handleMouseLeave = () => {
    setDropdownVisible("notvisible");
  };
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      const menuIcon = document.querySelector(".menu");
      const navbarMenu = document.querySelector(".navbar__menu");

      if (menuIcon && navbarMenu) {
        menuIcon.addEventListener("click", () => {
          menuIcon.classList.toggle("active");
          navbarMenu.classList.toggle("right-open");
        });
      }
    });
  }, []);

  return (
    <header>
      <nav className="navbar container">
        <h4>pefa nairobi north</h4>
        <div className="navbar__menu">
          <ul className="navbar__list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="about" smooth={true} duration={500}>
                About
              </NavLink>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
            <li>
              <NavLink exact to="/gallery">
                Gallery
              </NavLink>
            </li>
          </ul>
          <div className="navbar__buttons">
            <NavLink to="/login" className="navbar__buttons-login">
              Login
            </NavLink>
            <button className="navbar__buttons-register">
              <NavLink to="/register">NEW</NavLink>
            </button>
            <div
              className="profile-picture"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="https://t4.ftcdn.net/jpg/03/83/25/83/240_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                alt=""
              />

              <div className={`navbar-dropdown ${isDropdownVisible}`}>
                <p>hey nichols</p>
                <div className="drop-links">
                  <Link>settings</Link>
                  <Link>prayer request</Link>
                </div>
                <button>logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className="demo">
          <div id="menu-icon" className="menu">
            <span className="bar1"></span>
            <span className="bar2"></span>
            <span className="bar3"></span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
