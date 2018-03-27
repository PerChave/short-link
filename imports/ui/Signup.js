import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { formatRoute } from 'react-router-named-routes';
import { path } from '../router/routes';

export default class Signup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
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
            <button className="button">Create Account</button>
          </form>
          <Link to={formatRoute(path.login)}>Login</Link>
        </div>
      </div>
    );
  }
  onSubmit (e) {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value;

    if (password.length < 4) {
      return this.setState({
        error: 'Mettez un mot de passe valide'
      });
    }

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
        this.props.history.replace(formatRoute(path.links));
      }
    });
  }
}
