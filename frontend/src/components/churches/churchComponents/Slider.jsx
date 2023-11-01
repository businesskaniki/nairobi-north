import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../styles/hero-slider.css";

const SliderC = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">kenya deffensive drivng</h4>
            <h1 className="text-light mb-4">best in deffesnsive driving</h1>

            <button className="btn reserve__btn mt-4">
              <Link to="/cars">services</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">Find us at</h4>
            <h1 className="text-light mb-4">eastern bypass opposite shell</h1>

            <button className="btn reserve__btn mt-4">
              <Link to="/cars">services</Link>
            </button>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">JOIN US TODAY</h4>
            <h1 className="text-light mb-4">join us for the best driving courses</h1>

            <button className="btn reserve__btn mt-4">
              <Link to="/cars">services</Link>
            </button>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default SliderC;
