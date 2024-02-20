const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Debes añadir un nombre de usuario",
    "string.min": "Debe contener mínimo 3 caracteres",
    "string.max": "Máximo 50 caracteres",
  }),
  email: Joi.string().email().min(6).max(100).required().messages({
    "any.required": "Debes añadir una dirección de correo electrónico",
    "string.min": "Debe contener mínimo 6 caracteres",
    "string.max": "Máximo 100 caracteres",
  }),
  password: Joi.string().min(8).max(50).required().messages({
    "string.min": "La contraseña debe contener mínimo 8 caracteres",
    "string.max": "Máximo 50 caracteres",
  }),
  bio: Joi.string().max(1500).required(),
  avatar: Joi.any().optional(),
});

module.exports = createUserSchema;
