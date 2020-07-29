import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ExplicitState } from "./components/explicit-state/explicit-state";
import { Chainable } from "./components/chainable-state/chainable-state";
import { DumbButtons } from "./components/dumb-buttons/dumb-buttons";

const App: React.FC<{}> = (props) => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explicit">Explicit state</Link>
            </li>
            <li>
              <Link to="/chain">Chainable state</Link>
            </li>
            <li>
              <Link to="/DB">Dumb Buttons</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/explicit">
            <ExplicitState />
          </Route>

          <Route path="/chain">
            <Chainable />
          </Route>
          <Route path="/DB">
            <DumbButtons />
          </Route>
          <Route path="/">
            <h2>Click a link.</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
