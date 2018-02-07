import React, { Component } from "react";
import { connect } from "react-redux";
import Navbars from "./navbar";
import Footer from "./footer";

class Main extends Component {
  render() {
    return (
      <div>
        <Navbars />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Main;
