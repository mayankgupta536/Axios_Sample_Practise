import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
const theme = "";
const Footer = () => {
  return (
    <footer>
      <h2 style={{ fontSize: "25px" }}>Creator :Your Name |@2021</h2>

      <small style={{ fontSize: "15px", margin: "0px", padding: "0px" }}>
        *****The data has been taken from the cowin.govin.api*****
      </small>
      <ul className="contact">
        <li>
          <a href="#">
            <FontAwesomeIcon
              color={theme == "light" ? "cyan" : "#012C48"}
              icon={faGithub}
            ></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon
              color={theme == "light" ? "cyan" : "#012C48"}
              icon={faLinkedin}
            ></FontAwesomeIcon>
          </a>
        </li>
        <li>
          <a href="mailto:#">
            <FontAwesomeIcon
              color={theme == "light" ? "cyan" : "#012C48"}
              icon={faEnvelope}
            ></FontAwesomeIcon>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
