import React from "react";
import {
  PanelGroup,
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Modal,
  Well
} from "react-bootstrap";
import { Link } from "react-router";
import { findDOMNode } from "react-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Instruction from "../test/instruction";
import { Redirect } from "react-router";

import {
  signUp,
  signIn,
  forgotPassword,
  getAuth
} from "../../actions/authAction";
import { RiseLoader } from "react-spinners";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      panel: "login",
      error: "",
      loggedin: null
    };
  }

  componentWillMount() {
    this.props.getAuth();
    setTimeout(() => {
      if (this.props.user._id != null) {
        this.setState({ loggedin: true });
      } else {
        this.setState({ loggedin: false });
      }
    }, 500);
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  signuppanel() {
    this.setState({ panel: "signup" });
  }

  signinpanel() {
    this.setState({ panel: "login", error: "" });
  }

  // validateEmail
  validateEmail() {
    var x = findDOMNode(this.refs.email).value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmit() {
    // checking input required
    if (
      findDOMNode(this.refs.email).value === "" ||
      findDOMNode(this.refs.fullname).value === "" ||
      findDOMNode(this.refs.community).value === "" ||
      findDOMNode(this.refs.contactnumber).value === "" ||
      findDOMNode(this.refs.fathersname).value === "" ||
      findDOMNode(this.refs.registernumber).value === "" ||
      findDOMNode(this.refs.groupin12th).value === "" ||
      findDOMNode(this.refs.password).value === "" ||
      findDOMNode(this.refs.confirmpassword).value === ""
    ) {
      this.setState({ error: "please checkout all fields" });
    } else if (this.validateEmail() == false) {
      if (this.validateEmail() == false) {
        this.setState({ error: "Enter a valid e-mail address" });
      }
    } else {
      if (
        findDOMNode(this.refs.password).value !=
        findDOMNode(this.refs.confirmpassword).value
      ) {
        this.setState({ error: "password does not match" });
      } else {
        this.setState({ error: "" });
        this.handleSignup();
      }
    }
  }

  handleSignup() {
    const user = {
      email: findDOMNode(this.refs.email).value,
      fullname: findDOMNode(this.refs.fullname).value,
      community: findDOMNode(this.refs.community).value,
      contactnumber: findDOMNode(this.refs.contactnumber).value,
      fathersname: findDOMNode(this.refs.fathersname).value,
      registernumber: findDOMNode(this.refs.registernumber).value,
      groupin12th: findDOMNode(this.refs.groupin12th).value,
      password: findDOMNode(this.refs.password).value,
      confirmpassword: findDOMNode(this.refs.confirmpassword).value
    };
    this.props.signUp(user);
  }
  // handle signIn
  handleSignin() {
    this.setState({ loggedin: null });
    const user = {
      email: findDOMNode(this.refs.emaillogin).value,
      password: findDOMNode(this.refs.passwordlogin).value
    };
    if (user.email == "" || user.password == "") {
      this.setState({ error: "checkout all fields" });
    } else {
      findDOMNode(this.refs.emaillogin).value = "";
      findDOMNode(this.refs.passwordlogin).value = "";
      this.setState({ error: "" });
      this.props.signIn(user);
    }
    setTimeout(() => {
      if (this.props.user._id == null) {
        this.setState({ error: "Invalid Username or Password" });
      } else {
        this.setState({ error: "", loggedin: true });
      }
    }, 800);
  }

  // forgot email
  handleforgotPassword() {
    this.props.forgotPassword({
      email: findDOMNode(this.refs.forgotemail).value
    });
    this.setState({ show: false });
  }
  render() {
    switch (this.state.loggedin) {
      case false:
        return (
          <div>
            {this.state.panel == "login" ? (
              <Panel bsStyle="primary" className="loginpanel">
                <Panel.Heading>
                  <Panel.Title
                    componentClass="h3"
                    style={{ fontWeight: "900" }}
                  >
                    Login
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  {this.state.error != "" ? (
                    <div className="alert alert-danger">{this.state.error}</div>
                  ) : (
                    <div />
                  )}
                  <form>
                    <FormGroup>
                      <ControlLabel>Email Id</ControlLabel>
                      <FormControl
                        type="email"
                        placeholder="Enter Email"
                        ref="emaillogin"
                        name="email"
                      />
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type="password"
                        placeholder="Enter Password"
                        ref="passwordlogin"
                        name="password"
                      />
                      <br />
                    </FormGroup>
                    <Button
                      bsStyle="primary"
                      style={{ fontWeight: "900" }}
                      className="pull-right col-lg-3"
                      onClick={this.handleSignin.bind(this)}
                    >
                      Submit
                    </Button>
                  </form>
                  <h5
                    style={{ fontWeight: "900", cursor: "pointer" }}
                    onClick={this.handleShow.bind(this)}
                  >
                    Forgot Password?
                  </h5>
                  <br />
                  <Button
                    bsStyle="danger"
                    style={{ fontWeight: "900" }}
                    className="pull-right col-lg-3"
                    onClick={this.signuppanel.bind(this)}
                  >
                    Signup
                  </Button>
                </Panel.Body>
              </Panel>
            ) : (
              <Panel bsStyle="primary" className="signuppanel">
                <Panel.Heading>
                  <Panel.Title
                    componentClass="h3"
                    style={{ fontWeight: "900" }}
                  >
                    Signup
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  {this.state.error != "" ? (
                    <div className="alert alert-danger">{this.state.error}</div>
                  ) : (
                    <div />
                  )}
                  <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="email"
                      placeholder="Enter Email"
                      ref="email"
                      name="email"
                    />
                    <ControlLabel>Full Name</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Full Name"
                      ref="fullname"
                    />
                    <ControlLabel>Father Name</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Father Name"
                      ref="fathersname"
                    />
                    <ControlLabel>Register Number</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Register Number"
                      ref="registernumber"
                    />
                    <ControlLabel>Contact Number</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Contact Number"
                      ref="contactnumber"
                    />
                    <ControlLabel>12th Group</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter 12th Group"
                      ref="groupin12th"
                    />
                    <ControlLabel>Community</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Community"
                      ref="community"
                    />
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                      type="password"
                      placeholder="Enter Password"
                      ref="password"
                    />
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                      type="password"
                      placeholder="Enter Confirm Password"
                      ref="confirmpassword"
                    />
                    <br />
                  </FormGroup>
                  <Link
                    href="/"
                    bsstyle="primary"
                    style={{ fontWeight: "900" }}
                    className="pull-right col-lg-6 btn btn-primary"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    Submit
                  </Link>
                  <Button
                    bsStyle="danger"
                    style={{ fontWeight: "900" }}
                    className="pull-left col-lg-6"
                    onClick={this.signinpanel.bind(this)}
                  >
                    <i className="fas fa-hand-point-left" />&nbsp; Go Back
                  </Button>
                </Panel.Body>
              </Panel>
            )}

            {/* forgot password modal */}
            <div>
              <Modal
                show={this.state.show}
                onHide={this.handleClose.bind(this)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <FormGroup>
                      <ControlLabel>Email Id (Registered)</ControlLabel>
                      <FormControl
                        type="email"
                        placeholder="Enter Email"
                        ref="forgotemail"
                        name="email"
                      />
                    </FormGroup>
                  </form>
                  <a
                    href="/"
                    className="btn btn-primary"
                    style={{ fontWeight: "900" }}
                    onClick={this.handleforgotPassword.bind(this)}
                  >
                    Reset Password
                  </a>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClose.bind(this)}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        );
        break;

      case true:
        return <Instruction />;
        break;

      default:
        return (
          <center style={{ marginTop: "15%" }}>
            <RiseLoader size={40} color="red" />
          </center>
        );
        break;
    }
  }
}

function mapStateToProps(state) {
  return { user: state.user.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { signUp, signIn, forgotPassword, getAuth },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
