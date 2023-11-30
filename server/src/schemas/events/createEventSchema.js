const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string().min(4).max(200).required().messages({
    "string.min": "Mínimo 4 caracteres",
    "string.max": "Máximo 200 caracteres",
    "any.required": "Título es requerido",
    "string.base": "Debe ser una cadena de texto",
  }),
  description: Joi.string().min(4).max(5000).required().messages({
    "string.min": "Mínimo 4 caracteres",
    "string.max": "Máximo 200 caracteres",
    "any.required": "Descripcion es requerido",
    "string.base": "Debe ser una cadena de texto",
  }),
  theme: Joi.string().min(4).max(200).required(),
  city: Joi.string().min(2).max(200).required(),
  date: Joi.date().required(),
});

module.exports = createEventSchema;
