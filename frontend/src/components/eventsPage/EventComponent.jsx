import React from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import "../../styles/EventComponent.css";
import Button from "../ReusableComponents/Button";

const EventComponent = ({image,title,description,time,date,place}) => {
  return (
    <div className="event-container-wraper">
      <div className="event-component-card">
        <div className="events-component-img">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />
        </div>
        <div className="event-component-desc">
          <h2>Sunday Worship</h2>
          <p>Join us on Sundays at 8AM Traditional, 9AM </p>
        </div>
        <div className="event-component-time">
          <p>
            <FaCalendarDays />
            24 Dec - 07 Feb
          </p>
          <p  className="time">
            <GoClock />
            8:00 am - 12:00 pm
          </p>
          <p className="place">
            <FaLocationDot />
            Sanctuary
          </p>
        </div>
      </div>
      <div className="event-component-share">
        <div className="share">
          <GoShareAndroid className="share-icon" />
        </div>
        <Button children={"Details"} />
      </div>
    </div>
  );
};

export default EventComponent;
