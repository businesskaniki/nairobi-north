import React from 'react';
import '../../../src/styles/sublandingsection.css';
import Image from '../../Assets/sublanding.jpg'; 

const SubLandSection = ({ title,churchName,bgImage,description,button}) => {
  return (
    <div className="sublanding-container">
      <div className="sublanding-div-text">
        <h1>{title}</h1>
        <p>{description} {churchName}</p>
        {button}
      </div>
      <div className="sublanding-div-image" style={{ backgroundImage: `url(${Image})` }}></div>
    </div>
  );
};

export default SubLandSection;
