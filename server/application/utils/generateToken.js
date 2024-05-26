/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');
const config = require('../config');
const { throwError } = require('./responseAdapter');
const { Constants } = require('./constants');

const createToken = (email, userId, userType) => {
  const signedToken = jwt.sign(
    {
      user: { email, userId, userType },
    },
    config.JWT_SECRET,
    { expiresIn: Constants.TOKEN_DURATION },
  );
  return signedToken;
};

const verifyToken = (token) => {
  let result;
  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err?.name === 'TokenExpiredError') throwError(403, 'Expired token, Please login');
    if (err?.name === 'JsonWebTokenError') throwError(401, 'Bad token');
    else {
      result = {
        email: decoded.user?.email,
        userId: decoded.user?.userId,
        provider: decoded.user?.provider,
      };
    }
  });
  return result;
};

module.exports = { createToken, verifyToken };
