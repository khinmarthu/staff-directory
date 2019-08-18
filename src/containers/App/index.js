import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../NotFound';
import Home from '../Home';
import Overview from '../Overview';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/overview/:employeeName" exact={false} component={Overview} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
