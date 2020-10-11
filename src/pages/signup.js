//Core
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
//Redux
import { connect } from "react-redux";
import { signupUser, pageChangeErrorClear } from "../redux/actions/userActions";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }

  componentWillUnmount() {
    if (this.props.UI.errors !== null) {
      this.props.pageChangeErrorClear();
    }
    if (this.props.UI.message !== null) {
      this.props.pageChangeErrorClear();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div className="containerBody">
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="signupSection">
            <p className="loginSignupLabel">Email</p>
            <input
              placeholder="Email"
              className="emailSignup"
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            ></input>
            <span className="helper-text">{errors.email}</span>
          </div>

          {/* password */}
          <div className="passwordSection">
            <p className="loginSignupLabel">
              Password (8 characters in length)
            </p>
            <input
              placeholder="Password"
              className="passwordSignup"
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></input>
            <span className="helper-text">{errors.password}</span>
          </div>
          {/* confrim password */}
          <div className="passwordSection">
            <p className="loginSignupLabel">Confirm Password</p>
            <input
              placeholder="Confirm Password"
              className="passwordSignup"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            ></input>
            <span className="helper-text">{errors.confirmPassword}</span>
          </div>
          {/* Handle */}
          <div className="passwordSection">
            <p className="loginSignupLabel">Username</p>
            <input
              placeholder="Username"
              className="handle"
              id="handle"
              name="handle"
              type="text"
              value={this.state.handle}
              onChange={this.handleChange}
            ></input>
            <span className="helper-text">{errors.handle}</span>
          </div>

          <div className="submitSpinner">
            <button type="submit" class="submitSignup" 
            // disabled={loading}
            >
              Signup
            </button>
            <div className="spinner">
              {loading === true ? (
                <div>
                  {" "}
                  <ScaleLoader className="spinner" size={240} loading />{" "}
                </div>
              ) : null}{" "}
            </div>
          </div>

          <div className="signupErrorsGeneral">
            <span className="helper-text">{errors.general}</span>
          </div>
        </form>
        <span>
          Already have an account? Login <Link to="/login">here</Link>
        </span>
      </div>
    );
  }
}

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});
const mapActionsToProps = {
  signupUser,
  pageChangeErrorClear
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
