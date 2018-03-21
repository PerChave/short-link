// imports/server/linkMethods.js
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Links } from '../api/links.js';
import shortid from 'shortid';

Meteor.methods({
  'link.insert' (url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true
    });
  },
  'link.toggleVisible' (_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const link = Links.findOne({_id, userId: this.userId});
    if (link) {
      Links.update({_id}, { $set: {visible: !link.visible} });
    } else {
      throw new Meteor.Error('Link is undefined');
    }
  }
});
