const Joi = require('joi');

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
    password: Joi.string().required()
      .messages({
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
    provider: Joi.string().valid('Local, Google').required()
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

exports.accountActivationValidator = async (data) => {
  const accountActivationSchema = Joi.object().keys({
    email: Joi.string().email()
      .required()
      .messages({
        'string.email': 'email is not valid',
        'any.required': 'email is required',
      }),
    otp: Joi.string().min(6).max(6).required()
      .messages({
        'any.required': 'otp is required',
      }),
  });
  const validationResponse = accountActivationSchema.validate(data);
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
    newPassword: Joi.string().min(6).required()
      .messages({
        'any.required': 'newPassword is required',
      }),
  });
  const validationResponse = passwordResetSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
