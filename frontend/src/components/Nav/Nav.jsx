import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import "./nav.scss";

const Nav = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Wrap your code inside a DOMContentLoaded event listener
    document.addEventListener("DOMContentLoaded", function () {
      const menuIcon = document.querySelector(".menu"); // Select the menu icon
      const navbarMenu = document.querySelector(".navbar__menu"); // Select the menu content
  
      if (menuIcon && navbarMenu) {
        // Add a click event listener to the menu icon
        menuIcon.addEventListener("click", () => {
          menuIcon.classList.toggle("active");
          navbarMenu.classList.toggle("right-open");
        });
      }
    });
  
    // Clean up the event listener when the component unmounts
  
  }, []);

  // Conditionally render the navigation bar based on the current route

  return(
    <header>
      <nav className="navbar container">
        <div className="navbar__menu">
          <ul className="navbar__list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="about" smooth={true} duration={500}>About</NavLink>
            </li>
            <li>
              <Link to="#contact">Contact</Link>
            </li>
            <li>
              <NavLink exact to="/gallery">Gallery</NavLink>
            </li>
          </ul>
          <div className="navbar__buttons">
            <NavLink to="/login" className="navbar__buttons-login">Login</NavLink>
            <button className="navbar__buttons-register">
             <NavLink to="/register"> Register</NavLink>
            </button>
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
  ) 
};

export default Nav;
