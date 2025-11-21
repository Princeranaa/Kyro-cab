const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const { registerSchema } = require("../validations/auth.validation");
const { registerUser } = require("../controllers/user.controller");


router.post("/register", validate(registerSchema), registerUser);


module.exports = router

