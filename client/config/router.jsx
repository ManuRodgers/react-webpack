import React from "react";
import { Route, Redirect } from "react-router-dom";
import TopicList from "../views/topic-list/index";
import TopicDetail from "../views/topic-detail/index";

export default () => [
  <Route
    key="/"
    path="/"
    exact
    render={() => {
      return <Redirect to="/list" />;
    }}
  />,
  <Route key="/list" path="/list" component={TopicList} />,
  <Route key="/detail" path="/detail" component={TopicDetail} />
];
