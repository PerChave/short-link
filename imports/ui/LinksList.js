import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import FlipMove from 'react-flip-move';

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
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount () {
    console.log('component will unmount links list');
    this.linksTracker.stop();
  }
  renderLinksListItem () {
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">Votre liste est vide</p>
        </div>
      );
    } else {
      return this.state.links.map((link) => <LinksListItem key={link._id} link={link} />);
      // return (
      //   <FlipMove duration={750} easing="ease-out">
      //     {this.state.links.map((link) => <LinksListItem key={link._id} link={link} />)}
      //   </FlipMove>
      // );
    }
  }
  render () {
    return (
      <div>
        <FlipMove>
          {this.renderLinksListItem()}
        </FlipMove>
      </div>
    );
  }
}
