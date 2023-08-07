const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8008;
const cors = require("cors");

require("dotenv").config();
require("./db");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
