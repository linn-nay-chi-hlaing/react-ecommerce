import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../css/user/header.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <section>
        <div className="contact-info">
          <img
            className="footer-img"
            src="public/images/ferfi parfum.png"
            alt=""
          />
          <div>
            <h3>Contact Info</h3>
            <p>
              <FontAwesomeIcon icon={faEnvelope} />
              Amara@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} />
              +959-1234-5678
            </p>
            <a href="">
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faInstagram} />
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </section>

      <div className="footer">
        <p>
          2025 © Amara, Inc. (a Revolve Group company). All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
