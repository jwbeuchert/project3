import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// Alias BrowserRouter as Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Wrap app with Router component and declare single route that always renders the App component
ReactDOM.render(
  <Router>
    {/* Component rendered (App) as a variable instead of JSX */}
    <Route component={App} />
  </Router>,
  document.getElementById("root")
);
// App component is wrapped within the router so all components can interact with React Router
