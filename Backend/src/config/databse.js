const mongoose = require("mongoose");

exports.connectToDb = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1)
    }
}