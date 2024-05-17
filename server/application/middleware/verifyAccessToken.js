const { microInfluxAsyncWrapper } = require('../utils/asyncWrapper');
const { verifyToken } = require('../utils/generateToken');
const logger = require('../utils/logger');
const responseDecorator = require('../utils/responseAdapter');

exports.verifyAccessToken = (req, res, next) => {
  microInfluxAsyncWrapper(res, async () => {
    logger.trace(`>>>> Request details ${JSON.stringify(req.headers)}`);
    const accessToken = req.headers.authorization;
    if (!accessToken || !accessToken.startsWith('Bearer ')) {
      logger.debug(`No Bearer token found in request ${accessToken}`);
      return res.json(responseDecorator.error(
        {},
        responseDecorator.responsetemplate.NOBEARERTOKEN,
        401,
      ));
    }
    const token = accessToken?.split(' ')[1];
    const result = verifyToken(token);
    // verify user
    if (req.body.userId !== result.userId) {
      logger.debug(`UnAuthorised user: >>>>> Token not for <${req.body.userId}>`);
      return res.json(responseDecorator.error(
        {},
        responseDecorator.responsetemplate.BADTOKEN,
        401,
      ));
    }
    return next();
  });
};
