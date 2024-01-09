import React from "react";
import "../../../styles/NextStep.css";
import Button from "../../ReusableComponents/Button";

const NextStep = () => {
  return (
    <section id="next-step-section">
      <div className="next-step-wraper">
        <div className="next-step-heading-div">
          <h6>Next Steps</h6>
          <h3>Life Transformation begins with a step.</h3>
        </div>
        <div className="next-step-cards">
          <div className="next-step-card">
            <h2>Life Groups</h2>
            <p>
              Church doesn’t just happen on a Sunday. As believers, God has put
              us into a larger community, a church! At 614 Church, we believe
              life groups are the lifeblood of our church body. We hope life
              groups are a place people can find a home. We have different types
              of groups meeting in different locations around the city of
              Columbus and its suburbs.
            </p>
            <Button children={"learn More"} />
          </div>
          <div className="next-step-card">
            <h2>Life Groups</h2>
            <p>
              Church doesn’t just happen on a Sunday. As believers, God has put
              us into a larger community, a church! At 614 Church, we believe
              life groups are the lifeblood of our church body. We hope life
              groups are a place people can find a home. We have different types
              of groups meeting in different locations around the city of
              Columbus and its suburbs.
            </p>
            <Button children={"learn More"} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextStep;
