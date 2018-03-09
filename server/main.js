// server/main.js
import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users.js';
import { Links } from '../imports/api/links.js';
import '../imports/server/linkMethods.js';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const redirectLink = Links.findOne({ _id });

    if (redirectLink) {
      res.statusCode = 302;
      res.setHeader('location', redirectLink.url);
      res.end();
    } else {
      next();
    }
  });
});
