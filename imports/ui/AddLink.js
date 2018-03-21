import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class AddLink extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: '',
      url: ''
    };
  }
  onSubmit (e) {
    const { url } = this.state;
    e.preventDefault();

    if (url) {
      Meteor.call('link.insert', url, (e, r) => {
        if (e) {
          this.setState({error: e.message});
        } else {
          this.setState({error: ''});
          this.setState({'url': ''});
        }
      });
    }
  }
  onChange (e) {
    this.setState({'url': e.target.value.trim()});
  }
  render () {
    return (
      <div>
        <p>Add Link</p>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange}
          />
          <button type="submit">Add Link</button>
        </form>
      </div>
    );
  }
}
