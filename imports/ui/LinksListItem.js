import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from '../services/momentFr';

export default class LinksListItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount () {
    const copyBtn = this.refs.copy;
    this.clipboard = new Clipboard(copyBtn);

    this.clipboard.on('success', () => {
      this.setState({justCopied: true});
      setTimeout(() => this.setState({justCopied: false}), 1000);
    }).on('error', () => {
      alert('Copy failed. Please copy by hand');
    });
  }
  componentWillUnmount () {
    this.clipboard.destroy()
  }
  renderStats () {
    const visitMessage = this.props.link.visitedCount === 1 ? "visite" : "visites";
    let visitedMessage = null;

    if (typeof this.props.link.lastVisitedAt === 'number') {
      visitedMessage = ` - (visité ${moment(this.props.link.lastVisitedAt).fromNow()})`;
    }

    return <p>{this.props.link.visitedCount} {visitMessage} {visitedMessage}</p>
  }
  render () {
    const link = this.props.link;
    return (
      <div>
        <p>{link.url}</p>
        <p>{Meteor.absoluteUrl(link._id)}</p>
        {this.renderStats()}
        <a href={Meteor.absoluteUrl(link._id)} target="_blank">Visit</a>
        <button ref="copy" data-clipboard-text={Meteor.absoluteUrl(link._id)} >{this.state.justCopied ? "Copied" : "Copy"}</button>
        <button ref="hide" onClick={() => {
          Meteor.call('link.toggleVisible', link._id);
        }}>{link.visible ? "visible" : "hidden"}</button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  link: PropTypes.object.isRequired
};
