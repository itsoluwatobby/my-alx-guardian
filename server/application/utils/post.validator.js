const Joi = require('joi');
const { CategoryEnum } = require('./accountEnum');

const { General, Cohorts, Forums } = CategoryEnum;
const CategorySchema = Joi.string().valid(General, Cohorts, Forums);

exports.createPostValidator = (data) => {
  const createPostSchema = Joi.object().keys({
    body: Joi.string().required()
      .messages({
        'any.required': 'body is required',
      }),
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    category: Joi.object().keys({
      type: CategorySchema.required()
        .messages({
          'any.required': 'category.type is required',
        }),
      name: Joi.string().allow('')
        .messages({
          'any.required': 'category.name is required',
        }),
    }).required()
      .messages({
        'any.required': 'category is required',
      }),
    picture: Joi.string().allow('')
      .messages({
        'any.required': 'picture is required',
      }),
  });

  const validationResponse = createPostSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.updatePostValidator = (data) => {
  // const { Forums, Cohorts, General } = CategoryEnum;
  const updatePostSchema = Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    body: Joi.string().required()
      .messages({
        'any.required': 'body is required',
      }),
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    category: Joi.object().keys({
      type: CategorySchema.required()
        .messages({
          'any.required': 'category.type is required',
        }),
      name: Joi.string().allow('')
        .messages({
          'any.required': 'category.name is required',
        }),
    }).required()
      .messages({
        'any.required': 'category is required',
      }),
    picture: Joi.string().allow('')
      .messages({
        'any.required': 'picture is required',
      }),
  });

  const validationResponse = updatePostSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.getPostsValidator = (data) => {
  const updatePostSchema = Joi.object().keys({
    pageNumber: Joi.number().min(1).allow('')
      .messages({
        'any.required': 'pageNumber is required',
      }),
    limit: Joi.number().min(1).allow('')
      .messages({
        'any.required': 'limit is required',
      }),
  });

  const validationResponse = updatePostSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.likePostValidator = (data) => {
  const likePostSchema = Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
  });

  const validationResponse = likePostSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.postModificationValidator = (data) => {
  const postModificationSchema = Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
  });

  const validationResponse = postModificationSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.sharePostValidator = (data) => {
  const sharePostSchema = Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    postId: Joi.string().required()
      .messages({
        'any.required': 'postId is required',
      }),
    platform: Joi.object().keys({
      name: Joi.string().required()
        .messages({
          'any.required': 'platform.name is required',
        }),
      link: Joi.string().required()
        .messages({
          'any.required': 'platform.link is required',
        }),
    }).required()
      .messages({
        'any.required': 'platform is required',
      }),
  });

  const validationResponse = sharePostSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
