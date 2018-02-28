import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { LOGIN } from '../route/routes';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  render() {
    return (
      <div>
        <h1>Signup to Short Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        <Link to={formatRoute(LOGIN)}>Login</Link>
      </div>
    );
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value;

    Accounts.createUser({email, password}, (err) => {
      if (err) this.setState({error: err.message});
    });
  }
}
