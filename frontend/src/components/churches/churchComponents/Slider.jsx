import React, { useState } from "react";
import "../../../styles/churchslider.css";
import { FaCircleArrowLeft,FaCircleArrowRight } from "react-icons/fa6";

const ChurchSlider = ({ images,text }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  return (
    <div id="home-section" className="churchslider-container">
      <button onClick={prevSlide}><FaCircleArrowLeft /></button>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={index === currentSlide ? "slide active" : "slide"}
            style={{ backgroundImage: `url(${image})` }}
          >
            {text}
          </div>
        ))}
      </div>
      <button onClick={nextSlide}><FaCircleArrowRight /></button>
    </div>
  );
};

export default ChurchSlider;
