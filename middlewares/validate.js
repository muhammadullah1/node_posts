const Joi = require('joi');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, _res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .validate(object, {
            errors: { label: "key", wrap: { label: false }, abortEarly: false },
        });
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(400, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;
