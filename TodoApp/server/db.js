const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    dbName: "todoApp",
  })
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log("MongoDB connection failed " + err);
  });
