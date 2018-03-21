import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { path } from '../router/routes';
import { formatRoute } from 'react-router-named-routes';
import createHistory from 'history/createBrowserHistory';

const PrivateHeader = (props) => {
  return (
    <div>
      <h1>{ props.title }</h1>
      <button onClick={() => {
        Accounts.logout(() => {
          props.history.push(formatRoute(path.login));
        });
      }}>Logout</button>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(createHistory).isRequired
};

export default PrivateHeader;
