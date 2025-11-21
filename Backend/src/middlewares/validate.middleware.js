module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }
  };
};
