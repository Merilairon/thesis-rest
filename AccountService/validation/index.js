const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  //body
  postRegisterSchema: celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  //body
  postLoginSchema: celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  //params
  getAccountSchema: celebrate({
    [Segments.QUERY]: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  //body
  patchAccountSchema: celebrate({
    [Segments.BODY]: Joi.object({
      username: Joi.string().optional(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    }),
  }),
};
