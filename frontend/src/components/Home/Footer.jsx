import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer id="contact">
      <div class="row primary">
        <div class="column about">
          <h3>Pefa Nairobi North</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
            voluptatem corporis error non,
          </p>

          <div class="social">
            <i class="fa-brands fa-facebook-square"></i>
            <i class="fa-brands fa-instagram-square"></i>
            <i class="fa-brands fa-twitter-square"></i>
            <i class="fa-brands fa-youtube-square"></i>
            <i class="fa-brands fa-whatsapp-square"></i>
          </div>
        </div>

        <div class="column links">
          <h3>Some Links</h3>

          <ul>
            <li>
              <a href="#faq">F.A.Q</a>
            </li>
            <li>
              <a href="#cookies-policy">Cookies Policy</a>
            </li>
            <li>
              <a href="#terms-of-services">Terms Of Service</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>

        <div class="column links">
          <h3>Some Links</h3>
          <ul>
            <li>
              <Link to="/FAQ">F.A.Q</Link>
            </li>
            <li>
              <a href="#cookies-policy">Cookies Policy</a>
            </li>
            <li>
              <a href="#terms-of-services">Terms Of Service</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
          </ul>
        </div>

        <div class="column subscribe">
          <h3>Newsletter</h3>
          <div>
            <input type="email" placeholder="Your email id here" />
            <button className="subBtn">Subscribe</button>
          </div>
        </div>
      </div>

      <div class="row copyright">
        <div class="footer-menu">
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Blog</a>
          <a href="">Social</a>
        </div>
        <p>Copyright &copy; Pefa Nairobi North</p>
      </div>
    </footer>
  );
};

export default Footer;
