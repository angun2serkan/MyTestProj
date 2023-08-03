const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Connected Database");
  })
  .catch((err) => {
    console.log("Error connecting to database " + err);
  });
