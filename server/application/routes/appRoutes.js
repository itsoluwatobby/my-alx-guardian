const { verifyAccessToken } = require('../middleware/verifyAccessToken');
const userRoute = require('./user.routes');
const authenticationRoute = require('./authentication.routes');
const postRoute = require('./post.routes');
const getPostRoute = require('./getPosts.routes');
const commentRoute = require('./comment.routes');
const categoryRoute = require('./category.routes');

exports.appRoutes = (app) => {
  app.use('/v1/auth', authenticationRoute);

  app.use('/v1/post', getPostRoute);

  app.use(verifyAccessToken);
  // after logged in
  app.use('/v1/user', userRoute);
  app.use('/v1/post', postRoute);
  app.use('/v1/comment', commentRoute);
  app.use('/v1/category', categoryRoute);
};
