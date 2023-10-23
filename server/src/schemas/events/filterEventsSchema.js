const Joi = require("joi");

const filterEventsSchema = Joi.object({
  theme: Joi.string().max(200),
  city: Joi.string().max(200),
});

module.exports = filterEventsSchema;
