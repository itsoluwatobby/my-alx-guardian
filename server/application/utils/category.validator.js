const Joi = require('joi');
const { CategoryEnum } = require('./accountEnum');

const { Forums, Cohorts } = CategoryEnum;
exports.createCategoryValidator = (data) => {
  const createCategorySchema = Joi.object().keys({
    category: Joi.object().keys({
      type: Joi.string().valid(Forums, Cohorts).required()
        .messages({
          'any.required': 'category.type is required',
        }),
      name: Joi.string().required()
        .messages({
          'any.required': 'category.name is required',
        }),
    }).required()
      .messages({
        'any.required': 'category is required',
      }),
    banner: Joi.string()
      .messages({
        'any.required': 'picture is required',
      }),
    authorId: Joi.string().required()
      .messages({
        'any.required': 'authorId is required',
      }),
    description: Joi.string()
      .messages({
        'any.required': 'description is required',
      }),
  });

  const validationResponse = createCategorySchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.updateCategoryValidator = (data) => {
  const updateCategorySchema = Joi.object().keys({
    category: Joi.object().keys({
      type: Joi.string().valid(Forums, Cohorts).required()
        .messages({
          'any.required': 'category.type is required',
        }),
      name: Joi.string()
        .messages({
          'any.required': 'category.name is required',
        }),
    })
      .messages({
        'any.required': 'category is required',
      }),
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    banner: Joi.string()
      .messages({
        'any.required': 'banner is required',
      }),
    authorId: Joi.string().required()
      .messages({
        'any.required': 'authorId is required',
      }),
    description: Joi.string()
      .messages({
        'any.required': 'description is required',
      }),
  });

  const validationResponse = updateCategorySchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.updateCategoryDescriptionValidator = (data) => {
  const updateCategoryDescriptionSchema = Joi.object().keys({
    description: Joi.string().required()
      .messages({
        'any.required': 'description is required',
      }),
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
  });

  const validationResponse = updateCategoryDescriptionSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.getCategoriesValidator = (data) => {
  const getCategoriesSchema = Joi.object().keys({
    pageNumber: Joi.number().min(1)
      .messages({
        'any.required': 'pageNumber is required',
      }),
    limit: Joi.number().min(1)
      .messages({
        'any.required': 'limit is required',
      }),
    activeId: Joi.string().required()
      .messages({
        'any.required': 'activeId is required',
      }),
    type: Joi.string().valid(Cohorts, Forums).required()
      .messages({
        'any.required': 'type is required',
      }),
  });

  const validationResponse = getCategoriesSchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};

exports.followCategoryValidator = (data) => {
  const followCategorySchema = Joi.object().keys({
    userId: Joi.string().required()
      .messages({
        'any.required': 'userId is required',
      }),
    id: Joi.string().required()
      .messages({
        'any.required': 'id is required',
      }),
  });

  const validationResponse = followCategorySchema.validate(data);
  return {
    valid: validationResponse.error == null,
    error: validationResponse.error?.message,
  };
};
