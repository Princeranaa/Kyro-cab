const express = require("express");
const routes = express.Router();
const { authMiddleware } = require("../middlewares/auth.middlewares");
const { createRide } = require("../controllers/createRide.controller");


routes.post("/create-ride", authMiddleware, createRide)




module.exports = routes;