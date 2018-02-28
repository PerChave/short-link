import React from 'react';
import { formatRoute } from 'react-router-named-routes';
import { LOGIN } from '../route/routes';

export default class Link extends React.Component {
  render() {
    return (
      <div>
        <h1>Your links</h1>
        <button onClick={() => this.props.history.push(formatRoute(LOGIN))}>Logout</button>
      </div>
    );
  }
}
