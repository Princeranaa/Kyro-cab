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
      vehicleType,
    });

    await newCaptain.save();

    // Generate token
    const token = newCaptain.generateToken();
    res.cookie("token", token);

    // Send response
    res.status(201).json({
      message: "Captain registered successfully",
      captain: {
        _id: newCaptain._id,
        fullname: newCaptain.fullname,
        email: newCaptain.email,
        vehicle: newCaptain.vehicle,
        capacity: newCaptain.capacity,
        vehicleType: newCaptain.vehicleType,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginCaptian = async (req, res) => {
  const { email, password } = req.body;

  const captain = await Captain.findOne({ email });
  if (!captain) {
    return res.status(401).json({ message: "invalid email or password" });
  }

  const isPasswordValid = await captain.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = captain.generateToken();
  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful",
    captain: {
      _id: captain._id,
      fullname: captain.fullname,
      email: captain.email,
      vehicle: captain.vehicle,
      capacity: captain.capacity,
      vehicleType: captain.vehicleType,
    },
    token,
  });
};

exports.logoutcaptain = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Captain logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCaptainProfile = async (req, res) => {
  console.log(req.body);
  return res.status(200).json({
    captain: req.captain, // <-- IMPORTANT
    success: true,
  });
};
