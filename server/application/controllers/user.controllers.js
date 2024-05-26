/* eslint-disable class-methods-use-this */
const UserService = require('../services/user.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class UserController {
  userService = new UserService();

  updateUser(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.userService.updateUser(req.body);
      return res.json(response.success(user.data, user.message));
    });
  }
}

module.exports = new UserController();
