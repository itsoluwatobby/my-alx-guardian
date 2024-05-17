const sqs = require('./sqs');
const config = require('../config/index');
const logger = require('./logger');

module.exports = {

  async sendMail(messageObj) {
    try {
      logger.trace('Scheduling message');
      const params = {
        DelaySeconds: 10,
        MessageBody: JSON.stringify(messageObj),
        QueueUrl: config.SQSEMAILQUEUE,
      };

      // eslint-disable-next-line no-unused-vars
      sqs.sendMessage(params, (err, data) => {
        if (err) {
          logger.error(`Message schedule failed due to: ${err}`);
        } else {
          logger.trace('Message schedule successful');
        }
      });
      return true;
    } catch (err) {
      logger.debug(`An error occurred sending the mail with metadata: ${err}`);
      return 'An error occurred sending the mail';
    }
  },
};
