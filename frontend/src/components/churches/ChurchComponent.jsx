import React from "react";
import "../../styles/churchcomponent.css";
const ChurchComponent = ({ image, title, description }) => {
  return (
    <div class="img-card iCard-style2">
      <div class="card-content">
        <div class="card-image">
          <span class="card-caption">Image Caption</span>
          <img src="https://www.dropbox.com/s/63v40eqeq9lgz3k/bald-eagle-2715461_640.jpg?raw=1" />
        </div>

        <span class="card-title">Card Title</span>

        <div class="card-text">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Image by{" "}
            <a
              href="https://pixabay.com/users/moonzigg-6341937/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2715461"
              style="text-decoration: none"
            >
              moonzigg
            </a>{" "}
            from{" "}
            <a
              href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2715461"
              style="text-decoration: none"
            >
              Pixabay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChurchComponent;
