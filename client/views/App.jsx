import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopicList from "./topic-list/index";
import TopicDetail from "./topic-detail/index";
import Routers from "../config/router";

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Link to="/">Home page</Link>
          <br />
          <Link to="/detail">Detail</Link>
          <Routers />
        </div>
      </Router>
    );
  }
}

App.propTypes = {};

export default App;
