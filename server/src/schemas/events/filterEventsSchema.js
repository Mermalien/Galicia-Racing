const Joi = require("joi");

const filterEventsSchema = Joi.object({
  city: Joi.string().max(200),
  theme: Joi.string().max(200),
});

module.exports = filterEventsSchema;
