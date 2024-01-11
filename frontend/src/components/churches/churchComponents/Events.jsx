import React from "react";
import { useParams } from 'react-router-dom';
import { EventsCarousel } from "../../Home/Carousel";

const Events = () => {
  const { uuid } = useParams();
  return (
    <section id="events-section">
      <EventsCarousel  link={`/church/${uuid}/events`}/>
    </section>
  );
};

export default Events;
