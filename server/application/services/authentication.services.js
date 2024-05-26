/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { userRepository } = require('../repositories/user.repository');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { throwError } = require('../utils/responseAdapter');
const { registrationValidator } = require('../utils/account.validation');

class UserService {
  async registration(userObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = registrationValidator(userObj);
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
