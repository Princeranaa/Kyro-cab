const UserModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

exports.authMiddleware = async (req, res, next) => {

        console.log("req.cookies:", req.cookies);
    console.log("req.headers.authorization:", req.headers.authorization);
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }

}