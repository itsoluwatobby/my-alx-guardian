const Joi = require('joi');

exports.updateUserValidator = (data) => {
  const updateUserSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    firstName: Joi.string().optional()
      .messages({
        'any.required': 'firstName is required',
      }),
    lastName: Joi.string().optional()
      .messages({
        'any.required': 'lastName is required',
      }),
    title: Joi.string().optional()
      .messages({
        'any.required': 'title is required',
      }),
    cohort: Joi.string().optional()
      .messages({
        'any.required': 'description is required',
      }),
    bio: Joi.string().optional()
      .messages({
        'any.required': 'description is required',
      }),
    skills: Joi.array().optional()
      .messages({
        'any.required': 'skills is required',
      }),
    profilePicture: Joi.string().optional()
      .messages({
        'any.required': 'profilePicture is required',
      }),
    country: Joi.string().optional()
      .messages({
        'any.required': 'country is required',
      }),
    location: Joi.object().keys({
      address: Joi.string().optional()
        .messages({
          'any.required': 'location.address is required',
        }),
      country: Joi.string().optional()
        .messages({
          'any.required': 'location.country is required',
        }),
    })
      .messages({
        'any.required': 'location is required',
      }),
    activeAccounts: Joi.object().optional()
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
