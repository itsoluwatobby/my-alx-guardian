const logger = require('./logger');
const response = require('./responseAdapter');

const convertToJson = (errorMessage) => {
  try {
    return JSON.parse(errorMessage);
  } catch (error) {
    return errorMessage;
  }
};

const parseErrorResponse = (errorMessage) => {
  const res = convertToJson(errorMessage);
  if (typeof res === 'string') return [res, 400];
  return [res.message, res.statusCode];
};

exports.tryCatchWrapperWithError = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.tryCatchWrapper = async (res, callback) => {
  try {
    return await callback();
  } catch (error) {
    logger.error(error);
    const msg = parseErrorResponse(error.message);
    return res.status(msg[1]).json(response.error(error, msg[0], msg[1]));
  }
};
