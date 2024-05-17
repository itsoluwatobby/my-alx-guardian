/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { userRepository } = require('../repositories/user.repository');
const { servicesAsyncWrapper } = require('../utils/asyncWrapper');
const { throwError } = require('../utils/responseAdapter');
const { userValidator } = require('../utils/account.validation');

class UserService {
  async updateUser(userObj) {
    return servicesAsyncWrapper(async () => {
      const { id, userType } = userObj;
      const validationResponse = userValidator({ id, userType });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      return {
        data: {},
        message: 'BE: Account updated successfully',
      };
    });
  }
}

module.exports = UserService;
