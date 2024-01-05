import React from 'react';
import { Link } from 'react-router-dom';
import "../../../styles/churchnav.css";

const ChurchNav = ({ churchName }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    console.log(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="church-nav">
      <div className='church-logo'>
        <p className='church-name'>
          {churchName}
        </p>
      </div>
      <div className='church-ul-menu'>
        <ul>
          <li onClick={() => scrollToSection('home-section')}>Home</li>
          <li onClick={() => scrollToSection('about-us-section')}>About</li>
          <li onClick={() => scrollToSection('contact-section')}>Contact</li>
          <li onClick={() => scrollToSection('gallery-section')}>Gallery</li>
          <li onClick={() => scrollToSection('give-section')}>Give</li>
          <li><Link to="/">NNE district</Link> </li>
        </ul>
      </div>
    </nav>
  );
};

export default ChurchNav;
