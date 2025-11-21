const Joi = require("joi");


exports.registerSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(2).max(40)
    .message("firstname must be between 3 characters long")
    .required(),
    lastname: Joi.string().min(2).max(40)
    .message("lastname must be between 3 characters long")
    .required(),
  }).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("email is required")
    .required(),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)
    .message("Password must include uppercase, lowercase & number")
    .required(),
});

