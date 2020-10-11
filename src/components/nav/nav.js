//Core
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Components
import NavFull from "./navFull";

import "../../App.css";

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
        <header>
          <NavFull history={this.props.history} />
        </header>
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
