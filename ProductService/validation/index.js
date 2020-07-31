const Joi = require("joi");

module.exports = {
  getProductSchema: {
    params: {
      params: { id: Joi.string().required() },
    },
  },
  postProductSchema: {
    body: {
      name: Joi.string().required(),
      description: Joi.string().optional().default(""),
      pictureUrl: Joi.string().optional().default(""),
      price: Joi.number().required(),
    },
  },
  patchProductSchema: {
    params: { id: Joi.string().required() },
    body: {
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      pictureUrl: Joi.string().optional(),
      price: Joi.number().required(),
    },
  },
  deleteProductSchema: {
    params: { id: Joi.string().required() },
  },
};
