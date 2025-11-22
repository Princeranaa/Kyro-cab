const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");
const { registerUser, loginUser } = require("../controllers/user.controller");


router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);


module.exports = router

