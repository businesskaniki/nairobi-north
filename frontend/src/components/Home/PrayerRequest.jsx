import React from "react";
import "../../styles/prayerRequest.css";
import Button from "../ReusableComponents/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PrayerRequest = () => {
  return (
    <div className="prcontainer">
      <div className="bottom-div"></div>
      <div className="top-div">
        <div className="prayers-text-div">
          <h6 className="prayer-title">Prayer Request</h6>
          <h2 className="prayer-heading">How can we be praying with you?</h2>
          <p className="prayer-desc">
            We believe prayer makes a difference. Each week our team prays over
            every request we receive. It is an honor to join with you in prayer.
            Please indicate whether you would like your prayer to be shared on
            our prayer chain or remain confidential with the Pastors.
          </p>
          <Button
            icon={<FaArrowRightLong />}
            style={{ backgroundColor: "white", color: "black" }}
            className={"prayerbtn"}
            children={<Link to="/prayer_request">pray for me</Link>}
          />
        </div>
      </div>
    </div>
  );
};

export default PrayerRequest;
