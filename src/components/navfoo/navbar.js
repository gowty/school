import React from "react";
import { Navbar, Button, Col } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getAuth } from "../../actions/authAction";
import Styles from "../../style.css";
import Image from "../../img/logo.png";
import { logout } from "../../actions/authAction";
import { Redirect } from "react-router";
import { Link } from "react-router";
// import Instruction from "../test/instruction";

class Navbars extends React.Component {
  state = { loggedin: false };
  componentWillMount() {
    this.props.getAuth();
    setTimeout(() => {
      if (this.props.user._id == null) {
        this.setState({ loggedin: false });
      } else {
        this.setState({ loggedin: true });
      }
    }, 500);
  }

  handleLogout() {
    const user = this.props.user._id;
    this.props.logout(user);
    this.setState({ loggedin: false });
  }

  render() {
    return (
      // this.state.loggedin == false ?
      <div>
        <Navbar id="custom-nav" className="pad">
          <Navbar.Header>
            <Col lg={2} sm={3} md={3} xs={4}>
              <Navbar.Brand>
                <img src={Image} className="logoimg" />
                <Navbar.Link />
              </Navbar.Brand>
            </Col>
            <Col lg={10} sm={9} md={9} xs={8}>
              <Navbar.Text className="kitname">
                <Navbar.Link
                  href="http://kitcbe.com/"
                  style={{ textDecoration: "none" }}
                  target="_blank"
                >
                  Kalaignar Karunanidhi Institute Of Technology
                </Navbar.Link>
              </Navbar.Text>
            </Col>
          </Navbar.Header>
          {this.state.loggedin === true ? (
            <div className="logoutbut">
              <Link
                href="/"
                type="submit"
                className="pull-right btn btn-sm btn-warning"
                style={{
                  fontWeight: "900",
                  marginTop: "25px",
                  fontSize: "16px"
                }}
                onClick={this.handleLogout.bind(this)}
              >
                <i className="fas fa-sign-out-alt" /> &nbsp;Logout
              </Link>
            </div>
          ) : (
            <div />
          )}
        </Navbar>
      </div>
      //  : (
      //   <Instruction />
      // );
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user.user };
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ getAuth, logout }, dispatch);
}
export default connect(mapStateToProps, mapDispathToProps)(Navbars);
