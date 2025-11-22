const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");
const { registerUser, loginUser,getUserProfile,logoutUser } = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middlewares");


router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, getUserProfile);


module.exports = router

