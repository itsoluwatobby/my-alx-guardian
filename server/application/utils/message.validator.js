const Joi = require('joi');

exports.createMessageValidator = (data) => {
  const createMessageSchema = Joi.object().keys({
    conversationId: Joi.string().required()
      .messages({
        'any.required': 'conversationId is required',
      }),
    senderId: Joi.string().required()
      .messages({
        'any.required': 'senderId is required',
      }),
    recipientId: Joi.string().allow()
      .messages({
        'any.required': 'recipientId are required',
      }),
    message: Joi.string().required()
      .messages({
        'any.required': 'message is required',
      }),
    image: Joi.array().allow()
      .messages({
        'any.required': 'image is required',
      }),
    profilePicture: Joi.string().allow('')
      .messages({
        'any.required': 'profilePicture is required',
      }),
  });

  const validationResponse = createMessageSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.getMessagesValidator = (data) => {
  const getMessagesSchema = Joi.object().keys({
    conversationId: Joi.string().required()
      .messages({
        'any.required': 'conversationId is required',
      }),
  });

  const validationResponse = getMessagesSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.messageIdValidator = (data) => {
  const messageIdSchema = Joi.object().keys({
    messageId: Joi.string().required()
      .messages({
        'any.required': 'messageId is required',
      }),
  });

  const validationResponse = messageIdSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
