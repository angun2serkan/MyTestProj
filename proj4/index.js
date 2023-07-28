const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = 8004;
require("dotenv").config();
const app = express();

require("./db");

app.get("/", (req, res) => {
  res.send("The API is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
