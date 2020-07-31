const Joi = require("joi");

module.exports = {
  getOrderSchema: {
    params: { id: Joi.string().required() },
  },
  postOrderSchema: {
    body: { products: Joi.array().required() },
  },
  patchOrderSchema: {
    params: { id: Joi.string().required() },
    body: {
      account: Joi.object().optional(),
      products: Joi.array().optional(),
      status: Joi.bool().optional(),
    },
  },
  deleteOrderSchema: {
    params: { id: Joi.string().required() },
  },
};
