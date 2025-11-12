const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const mongoDBUrl = process.env.MONGO_DB_URL;
    if (mongoDBUrl) {
      const isConnected = await mongoose.connect(mongoDBUrl, { dbName: "" });
      if (isConnected) {
        console.log("Connected to MongoDB Cloud...");
      }
    }
  } catch (err) {
    console.log("Error connecting to MongoDB Cloud...");
    process.exit(1); // stop the server
    console.log(err);
  }
};

module.exports = connectToDB;
