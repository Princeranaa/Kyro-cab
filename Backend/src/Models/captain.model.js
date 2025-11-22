const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Active","inactive"],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true
        },
        plate: {
            type: String,
            required: true
        }
    },
    capacity: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "auto"]
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number
        }
    }
});

captainSchema.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET)
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}



module.exports = mongoose.model("captain", captainSchema)