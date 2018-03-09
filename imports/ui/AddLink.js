import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddLink extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit (e) {
    const url = this.refs.url.value.trim();
    e.preventDefault();

    if (url) {
      Meteor.call('link.insert', url, (e, r) => {
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
        <p>Add Link</p>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL" />
          <button type="submit">Add Link</button>
        </form>
      </div>
    );
  }
}
