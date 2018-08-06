import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import NoMatch from './NoMatch';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
