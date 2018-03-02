import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { LOGIN } from '../route/routes';
import { formatRoute } from 'react-router-named-routes';

export default class Link extends React.Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.replace(formatRoute(LOGIN));
    }
  }
  render() {
    return (
      <div>
        <h1>Your links</h1>
        <button onClick={() => this.onLogout()}>Logout</button>
      </div>
    );
  }
  onLogout() {
    Accounts.logout();
    this.props.history.push(formatRoute(LOGIN));
  }
}
