import React, { Component } from "react";
import PropTypes from "prop-types";
import Routers from "../config/router";

class App extends Component {
  render() {
    return [<div> you suck this is App component</div>, <Routers />];
  }
}

App.propTypes = {};

export default App;
