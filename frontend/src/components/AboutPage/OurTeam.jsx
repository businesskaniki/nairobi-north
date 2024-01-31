import React from "react";

const OurTeam = () => {
  return (
    <div className="Leadership-container">
      <div className="leadership-wraper">
        <p className="leadership-subheading">Our Leadership</p>
        <h2 className="leadership-heading">Meet Our Team</h2>
        <div className="leadership-div">
          <div className="leadership-card">
            <div class="leadrship-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTta1_LbfVyr3sFb-x2s6UzPDhei1JFzx4vuw&usqp=CAU"
                alt="Person 2"
              />
              <div class="leadership-card-content">
                <h2>Jane Smith</h2>
                <p>Designer</p>
                <p>jane.smith@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
