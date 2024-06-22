const Joi = require('joi');
const { userTypeEnums } = require('./constants');

const userTypesSchema = Joi.string().valid(userTypeEnums.Brand, userTypeEnums.Influencer);

exports.userValidator = (data) => {
  const userValidatorSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    userType: userTypesSchema.required()
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

exports.createConversationValidator = (data) => {
  const createConversationSchema = Joi.object().keys({
    authorId: Joi.string().required()
      .messages({
        'any.required': 'authorId is required',
      }),
    campaignId: Joi.string().required()
      .messages({
        'any.required': 'campaignId is required',
      }),
    userType: userTypesSchema.required()
      .messages({
        'any.required': 'userType is required',
      }),
    members: Joi.array().required()
      .messages({
        'any.required': 'members are required',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'title is required',
      }),
    banner: Joi.string().allow('')
      .messages({
        'any.required': 'banner is required',
      }),
  });

  const validationResponse = createConversationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.createChatValidator = (data) => {
  const createChatSchema = Joi.object().keys({
    authorId: Joi.string().required()
      .messages({
        'any.required': 'authorId is required',
      }),
    userType: userTypesSchema.required()
      .messages({
        'any.required': 'userType is required',
      }),
    members: Joi.array().min(2).max(2).required()
      .messages({
        'any.required': 'members are required',
      }),
  });

  const validationResponse = createChatSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.getConversationValidator = (data) => {
  const getConversationSchema = Joi.object().keys({
    conversationId: Joi.string().required()
      .messages({
        'any.required': 'conversationId is required',
      }),
  });

  const validationResponse = getConversationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.endConversationValidator = (data) => {
  const endConversationSchema = Joi.object().keys({
    conversationId: Joi.string().required()
      .messages({
        'any.required': 'conversationId is required',
      }),
    activeId: Joi.string().required()
      .messages({
        'any.required': 'activeId is required',
      }),
  });

  const validationResponse = endConversationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
