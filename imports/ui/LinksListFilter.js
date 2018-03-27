import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilter extends React.Component {
  constructor (props) {
    super(props);
    this.changeVisible = this.changeVisible.bind(this);
    this.state = {
      'showVisible': true
    };
  }
  componentDidMount () {
    this.tracker = Tracker.autorun(() => {
      this.setState({
        'showVisible': Session.get('showVisible')
      });
    });
  }
  changeVisible (e) {
    Session.set('showVisible', e.target.checked);
  }
  render () {
    return (
      <div>
        <label className="checkbox">
          <input
            className="checked__box"
            ref="checkboxVisible"
            type="checkbox"
            checked={this.state.showVisible}
            onChange={this.changeVisible}
          />
          Show visible links
        </label>
      </div>
    );
  }
}
