//Core
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
//Functions
//Packages
import { ScaleLoader } from "react-spinners";
import { uuid } from "uuidv4";
//Dropdowns

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChange = (e) => {};

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="containerBody">
        <h1>G'drop</h1>
        <p className="homeSubhead">Re-selling made easy</p>
        <div>
          <div className="homePageContainer">
            <div className="homePageImage"></div>
            <div className="homeCenter">
              <div className="homeSearchButtons"></div>
            </div>
          </div>
          <div className="loginSignupHome"></div>
        </div>
      </div>
    );
  }
}

export default Home;
