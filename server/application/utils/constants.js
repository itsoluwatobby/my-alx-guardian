exports.Constants = {
  DAY_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  TOKEN_DURATION: 12 * 60 * 60 * 1000, // 12 hours
};

exports.OTP_PURPOSE = {
  ACCOUNTACTIVATION: 'ACCOUNTACTIVATION',
  RESETPASSWORDREQUEST: 'RESETPASSWORDREQUEST',
  PASS: 'PASS',
};

exports.Provider = {
  Local: 'Local',
  Google: 'Google',
  Github: 'Github',
};
