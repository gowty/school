import React from "react";
import { Panel, Button, Col } from "react-bootstrap";
import Styles from "../../style.css";
import { Link } from "react-router";

class Instruction extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Panel bsStyle="primary" className="instructionpanel">
            <Panel.Heading>
              <Panel.Title componentClass="h3" style={{ fontWeight: "900" }}>
                INSTRUCTIONS
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <div style={{ fontSize: "20px" }}>
                <p>
                  <i className="fas fa-star" />
                  &nbsp;The oldest classical Greek and Latin writing had little
                  or no space between words and could be written in
                  boustrophedon
                </p>
                <p>
                  <i className="fas fa-star" />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star" />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star " />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star " />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star " />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star " />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star " />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star" />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
                <p>
                  <i className="fas fa-star " />&nbsp;The oldest classical Greek
                  and Latin writing had little or no space between words and
                  could be written in boustrophedon
                </p>
              </div>
              <Col lg={4} />
              <Col lg={4}>
                <Link
                  to="/test"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    bsStyle="primary"
                    style={{
                      fontWeight: "900",
                      alignSelf: "center",
                      fontSize: "17px"
                    }}
                    className="pull-center col-lg-12"
                  >
                    <i className="fas fa-pencil-alt" />&nbsp;Click Here To
                    Proceed Test
                  </Button>
                </Link>
              </Col>
              <Col lg={4} />
            </Panel.Body>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Instruction;
