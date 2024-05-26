/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userRepository } = require('../repositories/user.repository');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { throwError } = require('../utils/responseAdapter');
const {
  registrationValidator, accountActivationValidator, loginValidator,
  emailCheckValidator, passwordResetValidator,
} = require('../utils/account.validation');
const { Constants, Provider, EMAIL_TEMPLATES } = require('../utils/constants');
const { authOTPRepository } = require('../repositories/authOTP.repository');
const { createToken } = require('../utils/generateToken');
const logger = require('../utils/logger');
const config = require('../config');
const mailer = require('../utils/mailer');

class UserService {
  isOTPExpired(createdAt) {
    const EXPIRES_IN_A_DAY = Constants.DAY_DURATION;
    const presentTime = new Date();
    const elaspedTime = +presentTime - +createdAt;
    return elaspedTime > EXPIRES_IN_A_DAY;
  }

  async generateOTP(length = 6) {
    const chars = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }
    return otp;
  }

  async registration(userObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await registrationValidator(userObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { password, email } = userObj;

      // checking if user registered and account is active
      const isEmailTaken = await userRepository.findUser(email);
      if (isEmailTaken) {
        if (isEmailTaken.isAccountDeleted) {
          await userRepository.deleteAccount(isEmailTaken._id);
          return;
        }
        const matchingPassword = await bcrypt.compare(password, isEmailTaken.password);
        if (!matchingPassword) throwError(409, `Email: <${email}> already taken`);
        if (isEmailTaken?.verified) {
          throwError(409, 'You already have an account, Please login');
        }
        throwError(406, 'Please check your email to activate your account');
      }

      // generate token
      // const otp = await this.generateOTP();
      // const token = {
      //   otp, createdAt: new Date(), purpose: OTP_PURPOSE.ACCOUNTACTIVATION,
      // };
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { ...userObj, password: hashedPassword };
      const user = await userRepository.createUser(newUser);
      // await authOTPRepository.createOTP({ email: userObj.email, token });

      // send welcome and account activation emails
      // logger.trace(' >>>> Call to mailer service');
      // const { firstName, email } = user;
      // const { WELCOMEMAIL, ACCOUNTACTIVATION, WELCOME_ACCOUNTACTIVATION } = EMAIL_TEMPLATES;
      // const templateType = WELCOME_ACCOUNTACTIVATION;
      // const multipleEmails = [
      //   { templateType: WELCOMEMAIL, firstName, email: email.toLowerCase() },
      //   {
      //     templateType: ACCOUNTACTIVATION, firstName, email: email.toLowerCase(), otp,
      //   },
      // ];
      // await mailer.sendMail({ templateType, multipleEmails, email });
      return {
        data: {
          id: user._id,
          email: user.email,
        },
        message: 'BE: Account created',
      };
    });
  }

  async accountActivation(credentials) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await accountActivationValidator(credentials);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { email, otp } = credentials;
      const user = await this.getUserInfo(email);
      if (user.verified) throwError(406, 'Account already activated');

      const userOTP = await authOTPRepository.getOTP(email);
      if (!userOTP.token.createdAt) throwError(403, 'You need to request for an OTP');
      // check token if token is expired
      if (this.isOTPExpired(userOTP.token.createdAt)) {
        // validate token
        // resend otp
        const newOTP = await this.generateOTP();
        const token = { otp: newOTP, createdAt: new Date(), purpose: userOTP.token.purpose };
        await authOTPRepository.updateOTP(email, token);
        logger.trace(' >>>> Call to mailer service');
        await mailer.sendMail(
          {
            templateType: userOTP.token.purpose,
            firstName: user.firstName,
            email: userOTP.email.toLowerCase(),
            otp: newOTP,
          },
        );
        throwError(406, 'OTP expired: Please check your email for the new OTP');
      }
      if (userOTP.token.otp !== otp) throwError(403, 'Wrong token');
      await authOTPRepository.updateOTP(email, this.initTokenObj);
      const result = await userRepository.updateUser(user._id, {
        verified: true,
      });

      // send email for successful activation
      // logger.trace(' >>>> Call to mailer service');
      // const templateType = EMAIL_TEMPLATES.SUCCESSACCOUNTACTIVATION;
      // await mailer.sendMail(
      //   {
      //     templateType,
      //     firstName: user.firstName,
      //     email: user.email.toLowerCase(),
      //     link: '',
      //   },
      // );

      return {
        data: {
          id: result._id,
          email: result.email,
          verified: result.verified,
        },
        message: 'BE: Account activation successful',
      };
    });
  }

  async login(credentials) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await loginValidator(credentials);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { email, password } = credentials;
      const user = await userRepository.getUser(email, true);
      if (user.provider !== Provider.Local) throwError(403, `Please login with ${user.provider}`);
      // if (!user.verified) {
      //   const userOTP = await authOTPRepository.getOTP(email);
      //   // // if OTP is expired - RESEND
      //   if (this.isOTPExpired(userOTP.token.createdAt)) {
      //     // resend otp
      //     const templateType = EMAIL_TEMPLATES.ACCOUNTACTIVATION;

      //     const newOTP = await this.generateOTP();
      //     const token = {
      //       otp: newOTP, createdAt: new Date(), purpose: templateType,
      //     };
      //     // send email account activation otp
      //     logger.trace(' >>>> Call to mailer service');
      //     await authOTPRepository.updateOTP(email, token);

      //     await mailer.sendMail(
      //       {
      //         templateType,
      //         firstName: user.firstName,
      //         email: user.email.toLowerCase(),
      //         otp: newOTP,
      //       },
      //     );
      //     throwError(406, 'OTP expired: Please check your email for the new OTP');
      //   }
      //   throwError(406, 'Please check your email to activate your account');
      // }
      // check for matching password
      const matchingPassword = await bcrypt.compare(password, user.password);
      if (!matchingPassword) throwError(403, 'Wrong credentials');
      // generate accessToken
      const accessToken = createToken(user.email, user._id, user.provider);
      const result = await userRepository.updateUser(user._id, { accessToken });
      return {
        data: {
          id: result._id,
          email: result.email,
          provider: user.provider,
          accessToken,
        },
        message: 'BE: Login successful',
      };
    });
  }

  async logout(req) {
    return tryCatchWrapperWithError(async () => {
      let query = req.body.userId;
      if (!query) {
        const accessToken = req.headers.authorization;
        if (!accessToken || !accessToken.startsWith('Bearer ')) {
          logger.debug(`No Bearer token found in request ${accessToken}`);
          return { data: {}, message: 'BE: Logout successful' };
        }
        const token = accessToken?.split(' ')[1];
        // eslint-disable-next-line consistent-return
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
          if (err) return { data: {}, message: 'BE: Logout successful' };
          query = decoded.user?.userId;
        });
      }
      if (!query) return { data: {}, message: 'BE: Logout successful' };
      const user = await this.getUserInfo(query, true);
      // remove accessToken
      const result = await userRepository.updateUser(user._id, { accessToken: '' });
      return {
        data: {
          id: result._id,
        },
        message: 'BE: Logout successful',
      };
    });
  }

  async forgotPassword(credentials) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await emailCheckValidator(credentials);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { email } = credentials;
      const user = await this.getUserInfo(email);
      if (user.provider === Provider.Google) throwError(403, 'Please login with google');
      if (!user.verified) throwError(406, 'Please check your email to activate your account');

      // generate OTP
      if (user.isPasswordReset.reset) throwError(400, 'OTP already sent to your email');
      const templateType = EMAIL_TEMPLATES.RESETPASSWORDREQUEST;
      const otp = await this.generateOTP();
      const token = {
        otp, createdAt: new Date(), purpose: templateType,
      };
      const result = await userRepository.updateUser(
        user._id,
        { isPasswordReset: { reset: true, otpVerified: false } },
      );
      if (!result) throwError(400, 'Mongo error: Error updating');
      await authOTPRepository.updateOTP(email, token);

      // send email for password reset token
      logger.trace(' >>>> Call to mailer service');
      await mailer.sendMail(
        {
          templateType,
          firstName: user.firstName,
          email: user.email.toLowerCase(),
          otp,
        },
      );

      return {
        data: {
          id: result._id,
          email: result.email,
        },
        message: 'BE: Password Reset token sent to email',
      };
    });
  }

  async passwordReset(credentials) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await passwordResetValidator(credentials);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { email, newPassword } = credentials;
      const user = await this.getUserInfo(email, true);
      // check if user did not initiate a password reset
      if (!user.isPasswordReset.reset) throwError(403, 'Password reset request not initiated');
      if (!user.isPasswordReset.otpVerified) throwError(406, 'OTP not verified');

      // check if newPassword is same as previous
      const matchingPassword = await bcrypt.compare(newPassword, user.password);
      if (matchingPassword) throwError(406, 'Same as old, Enter a different password');

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      const result = await userRepository.updateUser(
        user._id,
        {
          isPasswordReset: { reset: false, otpVerified: false },
          password: hashedNewPassword,
        },
      );
      if (!result) throwError(400, 'Mongo error: Error updating');

      // send email for successful password reset
      logger.trace(' >>>> Call to mailer service');
      const templateType = EMAIL_TEMPLATES.RESETPASSWORDSUCCESFUL;
      await mailer.sendMail(
        {
          templateType,
          firstName: user.firstName,
          email: user.email.toLowerCase(),
          link: '',
        },
      );
      return {
        data: {
          id: result._id,
          email: result.email,
        },
        message: 'BE: Password Reset successful',
      };
    });
  }
}

module.exports = UserService;
