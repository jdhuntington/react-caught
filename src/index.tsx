import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ExplicitState } from "./components/explicit-state/explicit-state";

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
          </ul>
        </nav>
        <Switch>
          <Route path="/explicit">
            <ExplicitState />
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
