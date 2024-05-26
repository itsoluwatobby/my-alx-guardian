/* eslint-disable import/no-extraneous-dependencies */
const { createTransport } = require('nodemailer');
const config = require('../config');

exports.transporter = createTransport({
  service: 'gmail',
  // host: 'smtp.gmail.com', 'smtp.vercel.app'
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: config.USER_MAIL,
    pass: config.USER_PASS,
  },
});
