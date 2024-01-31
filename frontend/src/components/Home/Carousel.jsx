import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import poster from "../../Assets/NNE.jpg";
import Button from "../ReusableComponents/Button";
import { FaArrowRightLong } from "react-icons/fa6";
import "../../styles/carousel.css";
import { Link } from "react-router-dom";

export const EventsCarousel = ({link}) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <section className="skill" id="skills">
      <div className="container">
        <div >
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <div className="events-content">
                <p className="events-title">Upcoming Events</p>
                <h4 className="events-heading">
                  Here's what's happening next at pefa Darasha.
                </h4>
                <p className="events-desc">
                  Church doesn’t just happen on Sundays. Find times and
                  locations for events you don’t want to miss by clicking below.
                </p>
                <Button
                  className={"btn"}
                  children={<Link to={link}>Upcoming Events</Link>}
                  type={"Button"}
                  style={{ backgroundColor: "skyblue", color: "black" }}
                  icon={<FaArrowRightLong />}

                />
              </div>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                <div className="item">
                  <img src={poster} alt="background" />
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
