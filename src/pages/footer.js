//Core
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Components

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors !== null) {
  //     this.setState({ errors: nextProps.UI.errors });
  //   }

  // }

  render() {
    return (
      <div>
           <p className="footerTextTop">Make it a G'drop for everyone!</p>
        <img
          className="footerimg"
          src={require("../images/footerimg.png")}
        ></img>
        <footer>
          <div className="footerTop">
            <div className="footerLeft">
              <Link to="/">
                <img
                  className="footerLogo"
                  src={require("../images/footerlogo.svg")}
                ></img>
              </Link>
              <p className="footerLeftText">Re-Selling made easy!</p>
            </div>

            <div className="footerTopText">
              <ul>
                <div className="footerTopTextLeft">
                  <Link to="/aboutus">
                    <li>About Us</li>
                  </Link>
                  <Link to="/faqs">
                    <li>FAQ's</li>
                  </Link>
                  <Link to="/blog">
                    <li>Blog</li>
                  </Link>
                  <Link to="/careers">
                    <li>Careers</li>
                  </Link>
                </div>
                <div className="footerTopTextRight">
                  <Link to="/contactus">
                    <li>Contact Us</li>
                  </Link>
                  <Link to="/terms">
                    <li>Terms & Conditions</li>
                  </Link>
                  <Link to="/privacypolicy">
                    <li>Privacy Policy</li>
                  </Link>
                </div>
              </ul>
            </div>
          </div>

          <div className="footertextBottom">
              <p>Made with &#10084; in Melbourne, Australia</p>
            <div className="footerImages">
            <img
                  className="footerSocialImages"
                  src={require("../images/facebook.svg")}
                ></img>
                   <img
                  className="footerSocialImages"
                  src={require("../images/instagram.svg")}
                ></img>
                   <img
                  className="footerSocialImages"
                  src={require("../images/twitter.svg")}
                ></img>
                   <img
                  className="footerSocialImages"
                  src={require("../images/youtube.svg")}
                ></img>
                   <img
                  className="footerSocialImages"
                  src={require("../images/linkedin.svg")}
                ></img>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
Nav.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps)(Nav);
