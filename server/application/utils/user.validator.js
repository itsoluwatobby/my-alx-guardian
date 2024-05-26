const Joi = require('joi');

exports.updateUserValidator = (data) => {
  const updateUserSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    firstName: Joi.string()
      .messages({
        'any.required': 'firstName is required',
      }),
    lastName: Joi.string()
      .messages({
        'any.required': 'lastName is required',
      }),
    title: Joi.string()
      .messages({
        'any.required': 'title is required',
      }),
    cohort: Joi.string()
      .messages({
        'any.required': 'description is required',
      }),
    bio: Joi.string()
      .messages({
        'any.required': 'description is required',
      }),
    skills: Joi.array()
      .messages({
        'any.required': 'skills is required',
      }),
    profilePicture: Joi.string()
      .messages({
        'any.required': 'profilePicture is required',
      }),
    country: Joi.string()
      .messages({
        'any.required': 'country is required',
      }),
    location: Joi.object().keys({
      address: Joi.string()
        .messages({
          'any.required': 'location.address is required',
        }),
      country: Joi.string()
        .messages({
          'any.required': 'location.country is required',
        }),
    })
      .messages({
        'any.required': 'location is required',
      }),
    activeAccounts: Joi.object()
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
