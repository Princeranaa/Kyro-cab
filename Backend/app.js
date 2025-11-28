const express = require("express");
const app = express();
const cors = require("cors");
const authUser = require("../Backend/src/routes/user.routes");
const captainRoutes = require("../Backend/src/routes/captain.routes");
const mapsRoutes = require("../Backend/src/routes/maps.routes");
const rideRoutes = require("../Backend/src/routes/ride.routes");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://nz8j4s2p-5174.inc1.devtunnels.ms"
    ],

    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", authUser);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
