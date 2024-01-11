import React from 'react';
import '../../../src/styles/sublandingsection.css';
import Image from '../../Assets/sublanding.jpg'; 

const SubLandSection = ({churchName,bgImage}) => {
  return (
    <div className="sublanding-container">
      <div className="sublanding-div-text">
        <h1>Upcoming Events</h1>
        <p>Here's what's happening next at pefa Darasha</p>
      </div>
      <div className="sublanding-div-image" style={{ backgroundImage: `url(${Image})` }}></div>
    </div>
  );
};

export default SubLandSection;
