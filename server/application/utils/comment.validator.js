const Joi = require('joi');

exports.createCommentValidator = (data) => {
  const createCommentSchema = Joi.object().keys({
    comment: Joi.string().required()
      .messages({
        'any.required': 'comment is required',
      }),
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
  });

  const validationResponse = createCommentSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.updateCommentValidator = (data) => {
  const updateCommentSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    comment: Joi.string().required()
      .messages({
        'any.required': 'comment is required',
      }),
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
  });

  const validationResponse = updateCommentSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.getCommentsValidator = (data) => {
  const getCommentsSchema = Joi.object().keys({
    pageNumber: Joi.number().min(1)
      .messages({
        'any.required': 'pageNumber is required',
      }),
    limit: Joi.number().min(1)
      .messages({
        'any.required': 'limit is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
  });

  const validationResponse = getCommentsSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.likeCommentValidator = (data) => {
  const likeCommentSchema = Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
  });

  const validationResponse = likeCommentSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.tagCommentValidator = (data) => {
  const tagCommentSchema = Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
    comment: Joi.string().required()
      .messages({
        'any.required': 'comment is required',
      }),
  });

  const validationResponse = tagCommentSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
