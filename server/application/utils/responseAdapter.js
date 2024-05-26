const responsetemplate = require('../config/responseTemplates');

module.exports = {
  responsetemplate,
  success(data = {}, message = '', statuscode = 200) {
    const response = {
      statuscode,
      data,
      message,
    };
    return response;
  },
  error: (error = {}, message = '', statuscode = 400) => {
    const response = {
      statuscode,
      error,
      message,
    };
    return response;
  },
  throwError: (statusCode = 400, message = 'An Error Occurred') => {
    throw new Error(JSON.stringify({
      statusCode, message: `BE: ${message}`,
    }));
  },
};
