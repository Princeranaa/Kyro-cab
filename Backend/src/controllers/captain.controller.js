const Captain = require("../Models/captain.model"); // ✅ import the model

exports.registerCaptian = async (req, res) => {
    try {
        const {
            fullname: { firstname, lastname },
            email,
            password,
            vehicle: { color, plate },
            capacity,
            vehicleType,
        } = req.body;

        // Check if email already exists
        const existingCaptain = await Captain.findOne({ email }); // use Captain, not captainModel
        if (existingCaptain) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashedPassword = await Captain.hashPassword(password);

        // Create new captain
        const newCaptain = new Captain({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword,
            vehicle: { color, plate },
            capacity,
            vehicleType
        });

        await newCaptain.save();

        // Generate token
        const token = newCaptain.generateToken();

        // Send response
        res.status(201).json({
            message: "Captain registered successfully",
            captain: {
                id: newCaptain._id,
                fullname: newCaptain.fullname,
                email: newCaptain.email,
                vehicle: newCaptain.vehicle,
                capacity: newCaptain.capacity,
                vehicleType: newCaptain.vehicleType,

            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.loginCaptian = async (req, res) => {
    const { email, password } = req.body;

    const user = await Captain.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = user.generateToken();
    res.cookie("token", token)
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            vehicle: user.vehicle,
            capacity: user.capacity,
            vehicleType: user.vehicleType,
        },
        token
    })

}

exports.logoutcaptain = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Captain logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getCaptainProfile = async (req, res) => {
      res.status(200).json(req.user);
}
