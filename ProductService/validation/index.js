const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  getProductSchema: celebrate({
    [Segments.PARAMS]: Joi.object({
      params: { id: Joi.string().required() },
    }),
  }),
  postProductSchema: celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().optional().default(""),
      pictureUrl: Joi.string().optional().default(""),
      price: Joi.number().required(),
    }),
  }),
  patchProductSchema: celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      pictureUrl: Joi.string().optional(),
      price: Joi.number().required(),
    }),
  }),
  deleteProductSchema: celebrate({
    [Segments.PARAMS]: Joi.object({ id: Joi.string().required() }),
  }),
};
