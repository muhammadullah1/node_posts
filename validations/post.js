const Joi = require("joi");
module.exports = {
  createPost: {
    body: Joi.object({
      title: Joi.string().required().label("Title"),
      body: Joi.string().required().label("Body"),
    }),
  },
  updatePost: {
    body: Joi.object({
      title: Joi.string().required().label("Title"),
      body: Joi.string().required().label("Body"),
    }),
  },
};
