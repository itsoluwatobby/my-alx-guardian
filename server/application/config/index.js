/* eslint-disable global-require */
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DATABASE: require('./database'),
  isProduction: process.env.NODE_ENV === 'production',
  JWT_SECRET: process.env.JWT_SECRET,
  USER_MAIL: process.env.USER_MAIL,
  USER_PASS: process.env.USER_PASS,
};
