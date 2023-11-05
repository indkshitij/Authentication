const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_DB_URL, { dbName: "Authentication" })
    .then(() => {
      console.log("DB CONNECTED");
    })
    .catch(() => {
      console.log("DB NOT CONNECTED");
    });
};

module.exports = connectDB;
