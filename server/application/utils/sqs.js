// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const config = require('../config/index');

class SQS {
  static getInstance() {
    AWS.config.update({
      accessKeyId: config.AWSACCESSKEYID,
      secretAccessKey: config.AWSSECRETACCESSKEY,
      region: 'eu-west-1',
    });
    return new AWS.SQS({ apiVersion: '2012-11-05' });
  }
}

module.exports = SQS.getInstance();
