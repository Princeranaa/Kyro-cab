const UserModel = require("../Models/user.model");

exports.registerUser = async (req, res) => {
    const { fullname: { firstname, lastname }, email, password } = req.body;

    /* if already exist  */
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
        return res.status(400).json({ message: "User already exist" })
    }

    const hashPassword = await UserModel.hashPassword(password)

    const user = await UserModel.create({
        fullname: { firstname, lastname },
        email,
        password: hashPassword
    });


    const token = user.generateToken();
    res.cookie("token", token)

    res.status(201).json({
        token,
        user
    });
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    res.cookie("token", token)

    res.status(200).json({
        token,
        user
    })


}

exports.getUserProfile = async (req, res) => {
    return res.status(200).json({
        user: req.user,      // <-- IMPORTANT
    });
}

exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}