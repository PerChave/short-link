import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { path } from '../router/routes';
import { formatRoute } from 'react-router-named-routes';

import { Links as ApiLinks } from '../api/links';
import LinksList from './LinksList';

export default class Links extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  componentWillMount () {
    if (!Meteor.userId()) {
      this.props.history.replace(formatRoute(path.login));
    }
  }
  onSubmit (e) {
    const url = this.refs.url.value.trim();
    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (e, r) => {
        if (e) {
          this.setState({error: e.message});
        } else {
          this.setState({error: ''});
        }
      });
      this.refs.url.value = '';
    }
  }
  render () {
    return (
      <div>
        <h1>Your links</h1>
        <button onClick={() => this.onLogout()}>Logout</button>
        <LinksList />
        <p>Add Link</p>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button type="submit">Add Link</button>
        </form>
      </div>
    );
  }
  onLogout () {
    Accounts.logout();
    this.props.history.push(formatRoute(path.login));
  }
}
