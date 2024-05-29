const config = require('../config');
const { templateWrapper } = require('../utils/templateWrapper');

/**
 * @description Registration template
 * @param recipientEmail email
 * @param username sender name
 * @param otp
 * @param ttl - time to live
 * @returns
 */
exports.passwordresetTemplate = (recipientEmail, username, otp, ttl = 12) => {
  const year = new Date().getFullYear();
  return {
    to: recipientEmail,
    from: config.USER_MAIL,
    subject: `Password Reset Request for ${username}`,
    html: templateWrapper(
      `Password Reset for ${username}`,
      `
        <div style='background-color: rgba(0,0,0,0.9); color: white; border-radius: 5px; height: fit-content; padding-top: 20px; padding-left: 10px; padding-right: 10px;'>
            <div style="padding: 2px 10px 5px 10px;">
              <h2 style='text-shadow: 2px 2px 10px rgba(0,0,0,0.1); font-size: 2rem; text-align: center;'>MY ALX GUARDIAN</h2>
              <h2 style="text-align: center; margin-top: 3rem; font-size: 1.8rem;">Password Reset</h2>
              <h3 style='font-weight: 600; text-transform: capitalize; margin-top: 2rem;'>Hi, ${username}</h3>
              <p>You made an attempt to reset your password</p>
              <p>Please use the One Time Password (OTP) below to authenticate the reset. OTP expires in ${ttl} hours</p>
              <br/>
              <h2 style='font-size: 2.5rem;'>${otp}</h2>
              <br/>
            </div>
            <footer>
              <p style="text-align: center;">#WE DO HARD THINGS 💪</p>
              <p style="background-color: rgba(0,0,0,0.8); padding: 20px; text-align: center;">Copyright &copy; ${year}</p>
            </footer>
          </div>
        `,
    ),
  };
};
