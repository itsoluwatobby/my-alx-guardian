const Joi = require('joi');

exports.updateUserValidator = (data) => {
  const updateUserSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    firstName: Joi.string().allow('')
      .messages({
        'any.required': 'firstName is required',
      }),
    lastName: Joi.string().allow('')
      .messages({
        'any.required': 'lastName is required',
      }),
    title: Joi.string().allow('')
      .messages({
        'any.required': 'title is required',
      }),
    cohort: Joi.string().allow('')
      .messages({
        'any.required': 'cohort is required',
      }),
    bio: Joi.string().allow('')
      .messages({
        'any.required': 'bio is required',
      }),
    skills: Joi.array().allow('')
      .messages({
        'any.required': 'skills is required',
      }),
    profilePicture: Joi.string().allow('')
      .messages({
        'any.required': 'profilePicture is required',
      }),
    country: Joi.string().allow('')
      .messages({
        'any.required': 'country is required',
      }),
    location: Joi.object().keys({
      address: Joi.string().allow('')
        .messages({
          'any.required': 'location.address is required',
        }),
      country: Joi.string().allow('')
        .messages({
          'any.required': 'location.country is required',
        }),
    }).allow('')
      .messages({
        'any.required': 'location is required',
      }),
    activeAccounts: Joi.array().allow('')
      .messages({
        'any.required': 'activeAccounts is required',
      }),
  });

  const validationResponse = updateUserSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
