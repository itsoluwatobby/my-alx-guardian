exports.Constants = {
  DAY_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  TOKEN_DURATION: 12 * 60 * 60 * 1000, // 12 hours
};

exports.OTP_PURPOSE = {
  ACCOUNTACTIVATION: 'ACCOUNTACTIVATION',
  RESETPASSWORDREQUEST: 'RESETPASSWORDREQUEST',
  PASS: 'PASS',
};

exports.EMAIL_TEMPLATES = {
  CONTACTUS: 'CONTACTUS',
  WELCOMEMAIL: 'WELCOMEMAIL',
  ACCOUNTACTIVATION: 'ACCOUNTACTIVATION',
  WELCOME_ACCOUNTACTIVATION: 'WELCOME_ACCOUNTACTIVATION',
  RESETPASSWORDREQUEST: 'RESETPASSWORDREQUEST',
  RESETPASSWORDSUCCESFUL: 'RESETPASSWORDSUCCESFUL',
  SUCCESSACCOUNTACTIVATION: 'SUCCESSACCOUNTACTIVATION',
  NEWSLETTERS: 'NEWSLETTERS',
};

exports.Provider = {
  Local: 'Local',
  Google: 'Google',
};
