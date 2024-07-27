const mongoose = require("mongoose");

// Connect to the database
async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database");
    console.log(error);
  }
}

module.exports = connect;
