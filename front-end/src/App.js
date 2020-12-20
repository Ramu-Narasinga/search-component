import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Search from "./containers/search";
import User from "./containers/user";
import Results from "./containers/results";

export default function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
    </Router>
  );
}