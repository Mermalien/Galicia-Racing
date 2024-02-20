const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().min(6).max(100).optional(),
  password: Joi.string().min(8).max(50).optional(),
  bio: Joi.string().max(2000).optional(),
  avatar: Joi.any().optional(),
});

module.exports = updateUserSchema;
