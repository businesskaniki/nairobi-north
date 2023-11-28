import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import poster from "../../Assets/poster.jpeg"
import "../../styles/carousel.css"

export const EventsCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>what we do</h2>
              <p>The following is a brief of the services offered at MTC</p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                <div className="item">
                  <img src={poster} alt="background" />
                  <h5>PREPARING TAX DOCUMENTS</h5>
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                  <h5>FILING OF TAX RETURNS</h5>
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                  <h5>TAX CONSULTANCY</h5>
                </div>
                <div className="item">
                  <img  src={poster} alt="background" />
                  <h5>PAYROLL</h5>
                </div>
                <div className="item">
                  <img src={poster} alt="background" />
                  <h5>KEEP TRACK OF FINANCIAL STATEMENTS</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
