import React from 'react';
import PropTypes from 'prop-types';
import { Accounts } from 'meteor/accounts-base';
import { path } from '../router/routes';
import { formatRoute } from 'react-router-named-routes';
import createHistory from 'history/createBrowserHistory';

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{ props.title }</h1>
        <button className="button button--link-text" onClick={() => {
          Accounts.logout(() => {
            props.history.push(formatRoute(path.login));
          });
        }}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(createHistory).isRequired
};

export default PrivateHeader;
