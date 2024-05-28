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

  login(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.login(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }

  accountActivation(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.accountActivation(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }

  logout(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.logout(req.body.userId, req.headers);
      return res.json(response.success(user.data, user.message));
    });
  }

  forgotPassword(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.forgotPassword(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }

  passwordReset(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.passwordReset(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }

  resendOTP(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.resendOTP(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }

  verifyOTP(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.authenticationService.verifyOTP(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }
}

module.exports = new AuthenticationController();
