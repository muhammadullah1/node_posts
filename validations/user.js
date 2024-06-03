const Joi = require("joi");
module.exports = {
  createUser: {
    body: Joi.object({
      name: Joi.string().required().label("Name"),
      email: Joi.string().required().email().label("Email"),
      password: Joi.string().required().label("Password"),
    }),
  },
  updateUser: {
    body: Joi.object({
      name: Joi.string().required().label("Name"),
      email: Joi.string().required().email().label("Email"),
      password: Joi.string().required().label("Password"),
    }),
  },
};
