/* eslint-disable class-methods-use-this */
const AuthenticationService = require('../services/authentication.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class AuthenticationController {
  authenticationService = new AuthenticationService();

  registration(req, res) {
    return tryCatchWrapper(res, async () => {
      const authentication = await this.authenticationService.registration(req.body);
      return res.json(response.success(authentication.data, authentication.message));
    });
  }
}

module.exports = new AuthenticationController();
