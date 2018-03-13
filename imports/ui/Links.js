import { Meteor } from 'meteor/meteor';
import React from 'react';
import { path } from '../router/routes';
import { formatRoute } from 'react-router-named-routes';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default class Links extends React.Component {
  componentWillMount () {
    if (!Meteor.userId()) {
      this.props.history.replace(formatRoute(path.login));
    }
  }
  render () {
    return (
      <div>
        <PrivateHeader title="Vos liens" history={this.props.history} />
        <LinksList />
        <AddLink />
      </div>
    );
  }
}
