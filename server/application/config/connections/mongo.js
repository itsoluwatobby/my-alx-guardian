const mongoose = require('mongoose');
const { DATABASE, isProduction } = require('..');

const DB_URL = isProduction ? DATABASE.MONGODB_URL : DATABASE.MONGODB_URL;

exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    process.exit(1);
  }
};
