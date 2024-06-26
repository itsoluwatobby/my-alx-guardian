const Joi = require('joi');
const { Provider } = require('./constants');

const REGEX_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!£%*?&])[A-Za-z\d@£$!%?&]{9,}$/;
exports.emailCheckValidator = async (data) => {
  const emailCheckSchema = Joi.object().keys({
    email: Joi.string().email()
      .required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
  });
  const validationResponse = emailCheckSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.registrationValidator = async (data) => {
  const registrationSchema = Joi.object().keys({
    email: Joi.string().email()
      .required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
    password: Joi.string().regex(REGEX_PATTERN, {
      name: JSON.stringify({
        a: 'Should atleast contain a symbol and number',
        b: 'An uppercase and a lowerCase letter',
        c: 'And a minimum of nine characters',
        d: 'This symbols [^()"_+-*\\//] are not allowed ',
      }),
    }).required()
      .messages({
        'regex.passowrd': 'invalid password format',
        'any.required': 'password is required',
      }),
    firstName: Joi.string().required()
      .messages({
        'any.required': 'firstName is required',
      }),
    lastName: Joi.string().required()
      .messages({
        'any.required': 'lastName is required',
      }),
    provider: Joi.string().valid('Local', 'Google', 'Github').required()
      .messages({
        'any.required': 'provider is required',
      }),
  });
  const validationResponse = registrationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.thirdPartySignInValidator = async (data) => {
  const { Google, Github } = Provider;
  const thirdPpartySignInSchema = Joi.object().keys({
    email: Joi.string().email()
      .required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
    firstName: Joi.string().required()
      .messages({
        'any.required': 'firstName is required',
      }),
    lastName: Joi.string().required()
      .messages({
        'any.required': 'lastName is required',
      }),
    picture: Joi.optional()
      .messages({
        'any.required': 'picture is a string',
      }),
    provider: Joi.string().valid(Google, Github).required()
      .messages({
        'any.required': 'provider is required',
      }),
  });
  const validationResponse = thirdPpartySignInSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.loginValidator = async (data) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().email()
      .required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'password is required',
      }),
  });
  const validationResponse = loginSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.idValidator = async (data) => {
  const idSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
  });
  const validationResponse = idSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.passwordResetValidator = async (data) => {
  const passwordResetSchema = Joi.object().keys({
    email: Joi.string().email()
      .required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
    newPassword: Joi.string().regex(REGEX_PATTERN, {
      name: JSON.stringify({
        a: 'Should atleast contain a symbol and number',
        b: 'An uppercase and a lowerCase letter',
        c: 'And a minimum of nine characters',
        d: 'This symbols [^()"_+-*\\//] are not allowed ',
      }),
    }).required()
      .messages({
        'regex.passowrd': 'invalid password format',
        'any.required': 'newPassword is required',
      }),
  });
  const validationResponse = passwordResetSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.otpRequestValidator = (data) => {
  const otpRequestSchema = Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
  });

  const validationResponse = otpRequestSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.otpVerificationValidator = (data) => {
  const otpVerificationSchema = Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
    otp: Joi.string().min(6).max(6).required()
      .messages({
        'any.required': 'otp is required',
      }),
  });

  const validationResponse = otpVerificationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
