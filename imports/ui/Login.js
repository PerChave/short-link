import React from 'react';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { SIGNUP } from '../route/routes';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login to Short Lnk</h1>

        <p>Login form here</p>

        <Link to={formatRoute(SIGNUP)}>Signup</Link>
      </div>
    );
  }
}
