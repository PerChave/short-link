import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { path } from '../router/routes';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  componentWillMount () {
    if (Meteor.userId()) {
      this.props.history.replace(formatRoute(path.links));
    }
  }
  render () {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="box-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">Login</button>
          </form>

          <Link to={formatRoute(path.signup)}>Signup</Link>
        </div>
      </div>
    );
  }
  onSubmit (e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.props.history.replace(formatRoute(path.links));
      }
    });
  }
}
