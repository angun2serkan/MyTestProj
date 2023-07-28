const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected Database");
  })
  .catch((err) => {
    console.log("Error connecting to database " + err);
  });
