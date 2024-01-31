import React from "react";
import SubLandSection from "../ReusableComponents/SubLandSection";
import Button from "../ReusableComponents/Button";
import aboutImage from "../../Assets/serom.png";
import OurMission from "./OurMission";
import OurTeam from "./OurTeam";
import "../../styles/aboutpage.css";
import { Link } from "react-router-dom";
import NewHere from "./NewHere";

const About = () => {
  const ourMission =
    " To make new disciples of Jesus Christ for the transformation of the world";
  const missiondesc =
    "This mission is inspired by Christ’s call to “go and make disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit, and teaching them to obey everything I have commanded you.” (Matthew 28:18-20) Jesus is the “Why” behind our mission. To accomplish this mission we have a strategy of helping others to Know Christ (Philippians 3:10) Grow together (Matthew 18:20) and Go serve the world (Acts 1:8). Everything we do as a church is driven by one of these three things";
  return (
    <section>
      <SubLandSection
        title={"Join In This Sunday"}
        description={
          "8am Traditional | 9am Modern | 10am Modern | 11am Traditional"
        }
        button={<Button children={<Link to="#Newhere">New Here!</Link>} />}
      />
      <div className="about-our-mission-container">
        <div className="about-container-wraper">
          <OurMission
            aboutImage={aboutImage}
            mision={ourMission}
            missionDescription={missiondesc}
          />
        </div>
        <OurTeam />
        <NewHere />
      </div>
    </section>
  );
};

export default About;
