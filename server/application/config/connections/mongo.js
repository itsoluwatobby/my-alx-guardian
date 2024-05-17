const mongoose = require('mongoose');
const { DATABASE } = require('..');

const DB_URL = DATABASE.MONGODB_LOCAL_URL || DATABASE.MONGODB_URL;

exports.connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    process.exit(1);
  }
};
