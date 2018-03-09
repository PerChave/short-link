import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { path } from '../router/routes';
import { formatRoute } from 'react-router-named-routes';
import createHistory from 'history/createBrowserHistory';

export default class PrivateHeader extends React.Component {
  onLogout () {
    Accounts.logout(() => {
      this.props.history.push(formatRoute(path.login));
    });
  }
  render () {
    return (
      <div>
        <h1>{ this.props.title }</h1>
        <button onClick={() => this.onLogout()}>Logout</button>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(createHistory).isRequired
};
