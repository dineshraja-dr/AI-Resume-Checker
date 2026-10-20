const mongoose = require("mongoose");
const env = require("./env");

mongoose.set("strictQuery", true);

async function connectDB() {
    const conn = await mongoose.connect(env.mongoUri, {
        serverSelectionTimeoutMS: 10_000,
    });
    console.log(
        `mongo db connected:${conn.connection.host}/${conn.connection.name}`
    );
    mongoose.connection.on('error', (err) => {
        console.error("MongoDB server error: ", err.message);

    });
    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
    });
}

module.exports = connectDB;
module.exports.connectDB = connectDB;