import React from "react";
import SubLandSection from "../ReusableComponents/SubLandSection";
import EventComponent from "./EventComponent";

const Events = () => {
  return (
    <div>
      <SubLandSection
        churchName={"Pefa Darasha"}
        title={"Upcoming Events"}
        description={`Here's what's happening next at`}
      />
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
      <EventComponent />
    </div>
  );
};

export default Events;
