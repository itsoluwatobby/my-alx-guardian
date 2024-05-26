const { verifyAccessToken } = require('../middleware/verifyAccessToken');
const UserRoute = require('./user.routes');

exports.appRoutes = (app) => {
  app.use(verifyAccessToken);
  // after logged in
  app.use('/v1/auth', UserRoute);
};
