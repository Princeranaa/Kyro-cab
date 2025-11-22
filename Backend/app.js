const express = require("express");
const app = express();
const cors = require("cors");
const authUser = require("../Backend/src/routes/user.routes")
const captainRoutes = require("../Backend/src/routes/captain.routes")
const cookieParser = require("cookie-parser")

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/users", authUser)
app.use("/captains", captainRoutes)

module.exports = app