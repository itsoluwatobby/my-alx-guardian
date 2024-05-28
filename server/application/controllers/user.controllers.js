/* eslint-disable class-methods-use-this */
const UserService = require('../services/user.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class UserController {
  userService = new UserService();

  getUsers(req, res) {
    return tryCatchWrapper(res, async () => {
      const users = await this.userService.getUsers(req.query);
      return res.json(response.success(users.data, users.message));
    });
  }

  getUser(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.userService.getUser(req.params);
      return res.json(response.success(user.data, user.message));
    });
  }

  updateUser(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.userService.updateUser(req.body, req.query.activeId);
      return res.json(response.success(user.data, user.message));
    });
  }

  deleteUser(req, res) {
    return tryCatchWrapper(res, async () => {
      const user = await this.userService.deleteUser(req.params, req.headers);
      return res.json(response.success(user.data, user.message));
    });
  }
}

module.exports = new UserController();
