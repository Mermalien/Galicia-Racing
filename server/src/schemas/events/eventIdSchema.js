const Joi = require("joi");

const eventIdSchema = Joi.number().positive().required();

module.exports = eventIdSchema;
