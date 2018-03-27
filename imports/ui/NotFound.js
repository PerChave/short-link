import React from 'react';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { path } from '../router/routes';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page not found</h1>
        <p>This page doesn't exist</p>
        <Link className="button button--link" to={formatRoute(path.signup)}>Signup</Link>
      </div>
    </div>
  );
};
