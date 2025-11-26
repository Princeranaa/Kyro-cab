const express = require("express");
const routes = express.Router();
const { authMiddleware } = require("../middlewares/auth.middlewares");
const { createRide, getFare } = require("../controllers/createRide.controller");


routes.post("/create", authMiddleware, createRide)
routes.get("/get-fare", authMiddleware, getFare)




module.exports = routes;