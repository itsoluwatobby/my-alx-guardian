// const config = require('../config/index');
const logger = require('./logger');

module.exports = {

  async sendMail() {
    try {
      logger.trace('Scheduling message');
      // eslint-disable-next-line no-unused-vars

      return true;
    } catch (err) {
      logger.debug(`An error occurred sending the mail with metadata: ${err}`);
      return 'An error occurred sending the mail';
    }
  },
};
