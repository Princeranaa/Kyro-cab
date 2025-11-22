module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });

    if (error) {
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    // Optional: replace req.body with validated data
    req.body = value;
    next();
  };
};