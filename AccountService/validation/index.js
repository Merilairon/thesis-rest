const Joi = require("joi");

module.exports = {
  postRegisterSchema: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().require(),
      password: Joi.string().required(),
    },
  },
  postLoginSchema: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  getAccountSchema: {
    params: {
      id: Joi.string().required(),
    },
  },
  patchAccountSchema: {
    body: {
      username: Joi.string().optional(),
      email: Joi.string().optional(),
      password: Joi.string().optional(),
    },
  },
};
