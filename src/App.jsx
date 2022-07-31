import React from "react";
import { HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import Certificate from "./components/Certficate";

function App() {
  return (
    <Router basename="certificate-web-wonders">
      <Switch>
        <Route path="/:id">
          <Certificate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
