'use strict';

var getConfig = module.exports = function() {
    return {
        port: process.env.PORT || 8080,
        gcloud: {
            projectId: process.env.GCLOUD_PROJECT || 'venturehub2'
        },
        mongodb: {
            url: process.env.MONGO_URL || 'mongodb://104.196.112.198:27017',
            collection: process.env.MONGO_COLLECTION || 'users'
        }
    };
};

var config = getConfig();
var projectId = config.gcloud.projectId;
if (!projectId || projectId === 'your-project-id') {
  throw new Error('You must set the GCLOUD_PROJECT env var or add your ' +
    'project id to config.js!');
}
