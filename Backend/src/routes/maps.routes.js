const express = require("express");
const { authMiddleware } = require("../middlewares/auth.middlewares");
const { getCoordinates, getDistanceTime, getSuggestions } = require("../controllers/map.controller");
const { getCoordinatesSchema, distanceMatrixSchema } = require("../validations/auth.validation");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

router.get("/get-coordinates", validate(getCoordinatesSchema), authMiddleware, getCoordinates)
router.get("/get-distance", validate(distanceMatrixSchema), authMiddleware, getDistanceTime)
router.get("/get-suggestions", authMiddleware, getSuggestions)
module.exports = router;
