import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LOGIN, SIGNUP, LINK } from '../imports/route/routes';

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

const routes = (
  <Router>
    <Switch>
      <Route path={LOGIN} component={Login} />
      <Route path={SIGNUP} component={Signup} />
      <Route path={LINK} component={Link} />
      <Route component={NotFound}/>
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
