/* eslint-disable indent */
const config = require('../config');
const { templateWrapper } = require('../utils/templateWrapper');

/**
 * @description Registration template
 * @param recipientEmail email
 * @param username sender name
 * @param option - account | password
 * @returns
 */
exports.successTemplate = (recipientEmail, username, option, link) => {
  const message = option === 'account' ? 'Account Activation Successful' : 'Password Reset Successfull';
  const year = new Date().getFullYear();
  return {
    to: recipientEmail,
    from: config.USER_MAIL,
    subject: `${option === 'account' ? 'Account Confirmation' : 'Password Reset'} Successfull`,
    html: templateWrapper(
      `Success Response for ${username}`,
      `
        <div style='background-color: rgba(0,0,0,0.9); color: white; border-radius: 5px; height: fit-content; padding-top: 20px; padding-left: 10px; padding-right: 10px;'>
            <div style="padding: 2px 10px 5px 10px;">
              <h2 style='text-shadow: 2px 2px 10px rgba(0,0,0,0.1); font-size: 2rem; text-align: center;'>MY ALX GUARDIAN</h2>
              <h2 style="text-align: center; margin-top: 3rem; text-decoration: underline; font-size: 1.8rem;">${message}</h2>
              <h3 style='font-weight: 600; text-transform: capitalize; margin-top: 2rem;'>Hi, ${username}</h3>
              ${
                  option === 'account'
                    ? `<div>
                        <p>Your account has successfully been activated</p>
                        <p style="margin-top: -5px;">Thank you for choosing us.</p>
                      </div>`
                    : '<p>Your password reset was successful, Please login</p>'
              }
            </div>
            <a href=${link} target="_blank">
              <button style="border-radius: 5px; text-decoration: none; color: black; margin-left: 40%; margin-right: 40%; padding: 10px; margin-top: 25px; width: 20%; margin-bottom: 10px; background-color: rgb(8, 112, 191); color: white; border: none; font-weight: 600; font-size: medium;">
                Login
              </button>
            </a>
            <footer>
              <p style="text-align: center;">#WE DO HARD THINGS 💪</p>
              <p style="background-color: rgba(0,0,0,0.8); padding: 20px; text-align: center;">Copyright &copy; ${year}</p>
            </footer>
          </div>
        `,
    ),
  };
};
