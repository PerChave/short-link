import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signup from '../ui/Signup';
import Links from '../ui/Links';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const path = {
  login: '/login',
  signup: '/signup',
  links: '/links'
};

export const routes = (
  <Router>
    <Switch>
      <Route path={path.login} component={Login} />
      <Route path={path.signup} component={Signup} />
      <Route path={path.links} component={Links} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
