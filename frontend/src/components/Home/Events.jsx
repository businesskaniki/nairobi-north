import React from "react";
import { EventsCarousel } from "./Carousel";

const Events = () => {
  return (
    <div className="events-container">
      <div className="events-wraper">
        <div className="events-carousel">
          <EventsCarousel />
        </div>
      </div>
    </div>
  );
};

export default Events;
