// imports/api/links.js
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    if (this.userId) {
      return Links.find({ userId: this.userId }, {
        fields: {
          userId: 0
        }
      });
    } else {
      return [];
    }
  });
}

// Meteor.methods({
//   'links.insert' (url) {
//     if (!this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
//
//     new SimpleSchema({
//       url: {
//         type: String,
//         label: 'Your link',
//         regEx: SimpleSchema.RegEx.Url
//       }
//     }).validate({ url });
//
//     Links.insert({
//       url,
//       userId: this.userId
//     });
//   }
// });
