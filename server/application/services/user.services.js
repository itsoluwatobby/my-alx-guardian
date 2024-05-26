/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { userRepository } = require('../repositories/user.repository');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { throwError, responsetemplate } = require('../utils/responseAdapter');
const { userValidator, idValidator } = require('../utils/account.validation');
const { updateUserValidator } = require('../utils/user.validator');
const { authOTPRepository } = require('../repositories/authOTP.repository');
const logger = require('../utils/logger');
const { verifyToken } = require('../utils/generateToken');
const { postsRepository } = require('../repositories/post.repository');

class UserService {
  constructor() {
    this.userRepository = userRepository;
    this.postsRepository = postsRepository;
    this.authOTPRepository = authOTPRepository;
  }

  async getUsers(reqBody) {
    return tryCatchWrapperWithError(async () => {
      const { query } = reqBody;
      if (!query) throwError(400, 'query is required');
      const users = await this.userRepository.getSearchedUsers(query);
      return { data: users, message: 'Users fetched successfully' };
    });
  }

  async getUser(userObj) {
    return tryCatchWrapperWithError(async () => {
      const validatorResponse = userValidator({ id: userObj.userId });
      if (!validatorResponse.valid) {
        throw new Error(validatorResponse.error);
      }

      const user = await this.userRepository.getUser(userObj.userId);
      if (!user) { throwError(404, 'User not found'); }
      const { isPasswordReset, ...rest } = user._doc;
      return { data: rest, message: 'User fetched successfully' };
    });
  }

  async updateUser(req) {
    const userObj = req.body;
    return tryCatchWrapperWithError(async () => {
      const { id, ...others } = userObj;
      const influencerValidationResponse = updateUserValidator(userObj);
      if (!influencerValidationResponse.valid) {
        throw new Error(influencerValidationResponse.error);
      }

      if (req.query.activeId !== id) {
        throwError(401, 'You are unauthorised to modify post');
      }
      const user = await this.userRepository.getUser(id);
      if (!user) throwError(404, 'Account not found');
      const result = await this.userRepository.updateUser(user._id, others);
      const { isPasswordReset, ...rest } = result._doc;
      return {
        data: rest,
        message: 'BE: Account updated successfully',
      };
    });
  }

  async deleteUser(userObj, headers) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = idValidator(userObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { id } = userObj;
      const userCredential = verifyToken(headers.authorization?.split(' ')[1]);
      // verify user
      if (id !== userCredential.userId) {
        logger.debug(`UnAuthorised user: >>>>> Token not for <${id}>`);
        throwError(401, responsetemplate.BADTOKEN);
      }
      const user = await this.userRepository.getUser(id);
      if (!user) throwError(404, 'Account not found');

      // deletes all users posted reviews and recieved reviews
      await this.postsRepository.deleteAllPosts(user._id);
      const result = await this.userRepository.deleteUser(user._id);
      await this.authOTPRepository.deleteAccountOTP(user.email);

      return {
        data: {
          id: result._id,
        },
        message: 'BE: Account deleted successfully',
      };
    });
  }
}

module.exports = UserService;
