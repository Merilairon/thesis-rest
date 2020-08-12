const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  getOrderSchema: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  postOrderSchema: celebrate({
    [Segments.BODY]: Joi.object({
      products: Joi.array().required(),
    }),
  }),
  patchOrderSchema: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      account: Joi.object().optional(),
      products: Joi.array().optional(),
      status: Joi.bool().optional(),
    }),
  }),
  deleteOrderSchema: celebrate({
    [Segments.PARAMS]: Joi.object({ id: Joi.string().required() }),
  }),
};
