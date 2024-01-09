import React from "react";
import aboutImage from "../../../Assets/aboutchurch.jpg";
import "../../../styles/getconnected.css";

const GetConnected = () => {
  const backgroundStyles = {
    backgroundImage: `url(${aboutImage})`,
  };

  const ministries = [
    { nam: "youths" },
    { nam: "children" },
    { nam: "women" },
    { nam: "men" },
    { nam: "women" }
  ];
  return (
    <section style={backgroundStyles} id="get-connected-section">
      <div className="get-connected-wraper">
        <div className="about-overlay-div">
          <p className="church-get-connected">get conected</p>
          <h2 className="church-get-connected-heading">There is a place for you at pefa Church Darasha</h2>
          <p className="church-get-connected-p">
            At 614 Church we aim to create a space where you can encounter Him
            and get to know His will and ways. Whether through meeting together
            on a Sunday, in a home throughout the week, or serving the needs of
            our community, we welcome you to call this place home. We have
            groups in many areas around Columbus, for couples, men, women, first
            responders, college age, youth, and continue to add to this list. We
            are a people who cultivate, enjoy, and invite belonging
          </p>
        </div>
        <div className="about-background-div"></div>
      </div>
      <div className="church-ministries">
        {ministries.map((ministry, index) => (
          <div key={index} className="box">
            <p>{ministry.nam}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetConnected;
