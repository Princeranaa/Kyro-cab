const express = require("express");
const app = express();
const cors = require("cors");
const authUser = require("../Backend/src/routes/user.routes")


app.use(cors());
app.use(express.json());


app.use("/api/auth", authUser)

module.exports = app