const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { registerCaptian, loginCaptian, logoutcaptain, getCaptainProfile } = require("../controllers/captain.controller");
const { registerCaptainSchema } = require("../validations/auth.validation");
const { captainMiddleware } = require("../middlewares/auth.middlewares");
const router = express.Router();

router.post("/register",validate(registerCaptainSchema), registerCaptian)
router.post("/login", loginCaptian)
router.post("/logout", logoutcaptain)
router.get("/Profile",captainMiddleware, getCaptainProfile)

module.exports = router;