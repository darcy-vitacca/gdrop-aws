//Core
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux stuff
import { connect } from "react-redux";
import {
  loginUser,
  forgotPassword,
  resetUI,
} from "../redux/actions/userActions";
//Packages
import { ScaleLoader } from "react-spinners";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: null,
      forgotPassword: false,
      forgotPasswordEmail: "",
      message: "",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors !== null) {
      this.setState({ errors: nextProps.UI.errors, message: null });
      this.props.resetUI();
    } else if (nextProps.UI.message !== null) {
      this.setState(
        { message: nextProps.UI.message, errors: null, forgotPassword: false }
      );
      this.props.resetUI();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.id === "loginForm") {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };

      this.props.loginUser(userData, this.props.history);
    } else if (event.target.id === "forgotPasswordForm") {
      const userData = {
        email: this.state.forgotPasswordEmail,
      };

      this.props.forgotPassword(userData, this.props.history);
    }
  };

  handleForgetPassword = () => {
    if (this.state.errors === null) {
      this.setState(
        {
          forgotPassword: !this.state.forgotPassword,
        }
      );
    }
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
    let { forgotPassword } = this.state;
    const { errors, message } = this.state;
    //LOGIN
    return (
      <div className="containerBody">
         {!forgotPassword ? (
          <Fragment>
           
            <h1>Login</h1>

            <form onSubmit={this.handleSubmit} id="loginForm">
              {/* login */}
              <div className="loginSection">
                <p className="loginSignupLabel">Email</p>
                <input
                  placeholder="Email"
                  className="emailLogin"
                  id="email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input>
                <span className="helper-text">
                  {errors !== null ? errors.email : null}
                </span>
              </div>

              <div className="passwordSection">
                <p className="loginSignupLabel">Password</p>
                <input
                  placeholder="Password"
                  className="passwordLogin"
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>
                <span>
                  <Link onClick={this.handleForgetPassword} id="forgotPassowrd">
                    Forgot Password?
                  </Link>
                </span>
                <span className="helper-text">
                  {errors !== null ? errors.password : null}
                </span>
              </div>

              <div className="submitSpinner">
                <button
                  type="submit"
                  className="submitLogin"
                  disabled={loading}
                >
                  Login
                </button>

                <div className="spinner">
                  {loading === true ? (
                    <div>
                      {" "}
                      <ScaleLoader
                        className="spinner"
                        size={240}
                        loading
                      />{" "}
                    </div>
                  ) : null}{" "}
                </div>
              </div>

              <div className="loginErrorsGeneral">
                <span className="helper-text">
                  {errors !== null ? errors.general : message}
                </span>
              </div>
            </form>

            <span>
              Don't have an account? Sign up <Link to="/signup">here</Link>
            </span>
          </Fragment>
        ) : (
          //FORGOT PASSWORD
          <Fragment>
           
            <h1>Password Reset</h1>

            <form onSubmit={this.handleSubmit} id="forgotPasswordForm">
              <div className="loginSection">
                <p className="loginSignupLabel">Email</p>
                <input
                  placeholder="Email"
                  className="emailLogin"
                  id="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  type="email"
                  value={this.state.forgotPasswordEmail}
                  onChange={this.handleChange}
                ></input>
                <p>Please enter your email associated with your account</p>
              </div>

              <div className="submitSpinner">
                <button
                  type="submit"
                  className="submitLogin"
                  disabled={loading}
                >
                  Reset Password
                </button>

                <div className="spinner">
                  {loading === true ? (
                    <div>
                      {" "}
                      <ScaleLoader
                        className="spinner"
                        size={240}
                        loading
                      />{" "}
                    </div>
                  ) : null}{" "}
                </div>
              </div>

              <div className="loginErrorsGeneral">
                <span className="helper-text">
                  {errors !== null ? errors.error : null}
                </span>
              </div>
            </form>

            <span>
              Don't have an account? Sign up <Link to="/signup">here</Link>
            </span>
          </Fragment>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});
const mapActionsToProps = {
  loginUser,
  forgotPassword,
  resetUI,
};
export default connect(mapStateToProps, mapActionsToProps)(Login);
