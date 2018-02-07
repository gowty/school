import React from "react";
import { Well, Span } from "react-bootstrap";
import Styles from "../../style.css";

class Footer extends React.Component {
  render() {
    return (
      <div>
        <Well bsSize="small" className="footer navbar-fixed-bottom">
          <span>© 2018 All Rights Reserved</span>
          <span className="pull-right">
            <a
              href="http://www.kitinfonest.com/"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <i className="fas fa-hand-point-right" /> KIT-Infonest
            </a>
          </span>
        </Well>
      </div>
    );
  }
}

export default Footer;
