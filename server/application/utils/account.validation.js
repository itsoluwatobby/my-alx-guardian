const Joi = require('joi');

const userTypesValue = Joi.string().valid('Brand', 'Influencer');
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

exports.userValidator = (data) => {
  const userValidatorSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    userType: userTypesValue.required()
      .messages({
        'any.required': 'userType is required',
      }),
  });

  const validationResponse = userValidatorSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
