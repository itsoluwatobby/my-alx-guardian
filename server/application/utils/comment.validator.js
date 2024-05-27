const Joi = require('joi');

exports.createCommentValidator = (data) => {
  const createCommentSchema = Joi.object().keys({
    comment: Joi.string().required()
      .messages({
        'any.required': 'body is required',
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
    commentId: Joi.string().required()
      .messages({
        'any.required': 'commentId is required',
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
    commentId: Joi.string().required()
      .messages({
        'any.required': 'commentId is required',
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
