import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import "../../styles/upcommingevents.css";
import image1 from "../../Assets/NNE.jpg"
import image2 from "../../Assets/bible.jpeg"
const UpCommingEvents = () => {
  return (
    <div>
      <div class="card-list">
      <a href="#" class="card-item">
        <img src={image1} alt="Card Image" />
        <span class="developer">Developer</span>
        <h3>A "developer" codes software and websites.</h3>
        <div class="arrow">
          <i class="fas fa-arrow-right card-icon"></i>
        </div>
      </a>
      <a href="#" class="card-item">
        <img src={image2} alt="Card Image" />
        <span class="designer">Designer</span>
        <h3>A "designer" is a design expert.</h3>
        <div class="arrow">
          <i class="fas fa-arrow-right card-icon"></i>
        </div>
      </a>
      <a href="#" class="card-item">
        <img src="images/editor.jpg" alt="Card Image" />
        <span class="editor">Editor</span>
        <h3>An "editor" ensures content quality and accuracy.</h3>
        <div class="arrow">
          <i class="fas fa-arrow-right card-icon"><BsArrowUpRight /></i>
        </div>
      </a>
    </div>
    </div>
  );
};

export default UpCommingEvents;
