/* eslint-disable global-require */
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DATABASE: require('./database'),
  isProduction: process.env.NODE_ENV === 'production',
  SQSEMAILQUEUE: process.env.SQSEMAILQUEUE,
  AWSACCESSKEYID: process.env.AWSACCESSKEYID,
  AWSSECRETACCESSKEY: process.env.AWSSECRETACCESSKEY,
  JWT_SECRET: process.env.JWT_SECRET,
};
