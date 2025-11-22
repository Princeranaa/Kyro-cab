const Joi = require("joi");


exports.registerSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string()
      .min(2)
      .max(40)
      .required()
      .messages({
        'string.empty': 'firstname is required',
        'string.min': 'firstname must be at least 2 characters long',
        'string.max': 'firstname cannot exceed 40 characters',
        'any.required': 'firstname is required'
      }),
    
    lastname: Joi.string()
      .min(2)
      .max(40)
      .required()
      .messages({
        'string.empty': 'lastname is required',
        'string.min': 'lastname must be at least 2 characters long',
        'string.max': 'lastname cannot exceed 40 characters',
        'any.required': 'lastname is required'
      }),
  }).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'email is required',
      'any.required': 'email is required'
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase & number',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    }),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .required()
    .messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
});


exports.registerCaptainSchema = Joi.object({
  fullname: Joi.object({
    firstname: Joi.string().min(2).max(50).required().messages({
      "string.empty": "First name is required",
      "string.min": "`First name must be at least 2 characters"
    }),
    lastname: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters"
    })
  }).required(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters"
  }),
  vehicle: Joi.object({
    color: Joi.string().required().messages({
      "string.empty": "Vehicle color is required"
    }),
    plate: Joi.string().required().messages({
      "string.empty": "Vehicle plate is required"
    })
  }).required(),
  capacity: Joi.string().required().messages({
    "string.empty": "Capacity is required"
  }),
  vehicleType: Joi.string().valid("car", "bike", "auto").required().messages({
    "any.only": "Vehicle type must be one of car, bike, or auto",
    "string.empty": "Vehicle type is required"
  })
});

exports.loginCaptainSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be a valid email address"
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters"
  })
});

