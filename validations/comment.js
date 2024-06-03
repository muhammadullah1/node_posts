const Joi = require("joi");
module.exports = {
  createComment: {
    body: Joi.object({
      body: Joi.string().required().label("Body"),
    }),
  },
  updateComment: {
    body: Joi.object({
      body: Joi.string().required().label("Body"),
    }),
  },
};
