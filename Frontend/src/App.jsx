// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Components/HomePage";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} />
    </Router>
  );
};

export default App;
