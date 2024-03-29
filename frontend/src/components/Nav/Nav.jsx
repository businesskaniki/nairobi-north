import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import AuthChecker from "../../Helpers/AuthChecker";
import LogoutButton from "../Auth/LogOut";
import "../../styles/nav.scss";

const Nav = () => {
  const [isDropdownVisible, setDropdownVisible] = useState("notvisible");
  const username = "nicholas-maina";

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
    <header className="navheader">
      <nav className="navbar container">
        <h4>Pefa Nairobi North</h4>
        <div className="navbar__menu">
          <ul className="navbar__list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="about">About</NavLink>
            </li>
            <li>
              <Link smooth to="contact_us">
                Contact
              </Link>
            </li>
            <li>
              <NavLink to="churches">Churches</NavLink>
            </li>
            <li>
              <NavLink to="events">Events</NavLink>
            </li>
            <li>
              <NavLink exact to="/sermons">
                Sermons
              </NavLink>
            </li>
            <AuthChecker
              compo={
                <li>
                  <NavLink exact to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              }
            />
          </ul>
          <div className="navbar__buttons">
            <AuthChecker
              compo={
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
                      <NavLink to={`settings/${username}`}>settings</NavLink>
                      <Link>prayer request</Link>
                    </div>
                    <LogoutButton />
                  </div>
                </div>
              }
              logins={
                <div className="buttons">
                  <NavLink to="/login" className="navbar__buttons-login">
                    Login
                  </NavLink>
                  <button className="navbar__buttons-register">
                    <NavLink to="/register">NEW</NavLink>
                  </button>
                </div>
              }
            />
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
