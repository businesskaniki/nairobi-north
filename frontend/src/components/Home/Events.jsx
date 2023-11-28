import React from "react";
import Button from "../ReusableComponents/Button";
import { EventsCarousel } from "./Carousel";
import "../../styles/events.css"

const Events = () => {
  return (
    <div className="events-container">
      <div className="events-wraper">
        <div className="events-content">
          <p className="events-title">Upcoming Events</p>
          <h4 className="events-heading">Here's what's happening next.</h4>
          <p className="events-desc">
            Church doesn’t just happen on Sundays. Find times and locations for
            events you don’t want to miss by clicking below.
          </p>
          <Button children={"Upcoming Events"} type={Button} />
        </div>
        <div className="events-carousel">
          <EventsCarousel />
        </div>
      </div>
    </div>
  );
};

export default Events;
