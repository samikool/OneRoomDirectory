import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import app from './app';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path='/' component={app} exact />  
      </Switch>  
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);