const express = require("express");
const routes = express.Router();
const { authMiddleware, captainMiddleware } = require("../middlewares/auth.middlewares");
const { createRide, getFare,startRide,confirmRide} = require("../controllers/createRide.controller");

routes.post("/create", authMiddleware, createRide);
routes.get("/get-fare", authMiddleware, getFare);
routes.post("/confirm", captainMiddleware, confirmRide);
routes.get("/start-ride", captainMiddleware, startRide);



module.exports = routes;
