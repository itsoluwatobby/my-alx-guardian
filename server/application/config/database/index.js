require('dotenv').config();

module.exports = {
  MONGODB_LOCAL_URL: process.env.MONGODB_URI_LOCAL,
  MONGODB_URL: process.env.MONGODB_URI,
};
