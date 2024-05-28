const logger = require('./logger');
const { transporter } = require('./nodemailer');
const { throwError } = require('./responseAdapter');
const { tryCatchWrapperWithError } = require('./asyncWrapper');

module.exports = {

  async sendMail(messageTemplate) {
    return tryCatchWrapperWithError(async () => {
      logger.trace('Sending message');
      // eslint-disable-next-line no-unused-vars
      transporter.sendMail(messageTemplate, (err, info) => {
        if (err) {
          logger.debug(`An error occurred sending the mail with metadata: ${err}`);
          throwError(400, 'unable to send mail, please retry');
        }
        logger.debug(`Email sent || MESSAGEID: ${info.messageId} | to - ${info.accepted[0]}`);
        return true;
      });
    });
  },
};
