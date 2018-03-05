import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { LOGIN, LINK } from '../route/routes';

export default class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  render () {
    return (
      <div>
        <h1>Signup to Short Lnk</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>
        <Link to={formatRoute(LOGIN)}>Login</Link>
      </div>
    );
  }
  onSubmit (e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value;

    if (password.length < 9) {
      return this.setState({
        error: 'Mettez un mot de passe valide'
      });
    }

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
        this.props.history.replace(formatRoute(LINK));
      }
    });
  }
}
