"use strict";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import store from "./store/store";
import Main from "./components/navfoo/main";
import Login from "./components/logreg/Loginpanel";
import Instruction from "./components/test/instruction";
import Test from "./components/test/test";

const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="/test" component={Test} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
