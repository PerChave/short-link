import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';

export default class LinksList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount () {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount () {
    console.log('component will unmount links list');
    this.linksTracker.stop();
  }
  renderLinksListItem () {
    return this.state.links.map((link) => <p key={link._id}>{link.url}</p>);
  }
  render () {
    return (
      <div>
        <p>Links List</p>
        <div>
          {this.renderLinksListItem()}
        </div>
      </div>
    );
  }
}