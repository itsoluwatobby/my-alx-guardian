/* eslint-disable class-methods-use-this */
const { AuthOtpModel } = require('../models');

class AuthOTPRepository {
  async getOTP(email) {
    if (!email) return null;
    const user = await AuthOtpModel.findOne({ email });
    return user;
  }

  async updateOTP(email, otpObj) {
    const result = await AuthOtpModel.findOneAndUpdate(
      { email },
      { $set: { token: otpObj } },
      { new: true },
    );
    return result;
  }

  async createOTP(newOTPObj) {
    const result = await AuthOtpModel.create(newOTPObj);
    return result;
  }

  async deleteAccountOTP(email) {
    await AuthOtpModel.deleteOne({ email });
  }
}

exports.authOTPRepository = new AuthOTPRepository();
