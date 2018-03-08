import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.defineValidationErrorTransform((e) => {
  let msg;
  switch (e.message) {
    case 'Your link must be a valid URL':
      msg = 'Votre lien doit être une URL valide';
      break;
    default:
      msg = e.reason;
  }

  return new Meteor.Error(400, msg);
});
