const Joi = require('joi');

exports.userValidator = (data) => {
  const userValidatorSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
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

exports.getConversationsByUserValidator = (data) => {
  const getConversationsByCampaignSchema = Joi.object().keys({
    activeId: Joi.string().required()
      .messages({
        'any.required': 'activeId is required',
      }),
  });

  const validationResponse = getConversationsByCampaignSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.addInfluencerToConversationValidator = (data) => {
  const addInfluencerToConversationSchema = Joi.object().keys({
    conversationId: Joi.string().required()
      .messages({
        'any.required': 'conversationId is required',
      }),
    influencerId: Joi.string().required()
      .messages({
        'any.required': 'influencerId is required',
      }),
  });

  const validationResponse = addInfluencerToConversationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.getInfluencersInConversationValidator = (data) => {
  const getInfluencersInConversationSchema = Joi.object().keys({
    conversationId: Joi.string().required()
      .messages({
        'any.required': 'conversationId is required',
      }),
  });

  const validationResponse = getInfluencersInConversationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
