const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 8006;
const todoRoutes = require("./Routes/TodoRoutes");
require("dotenv").config();
require("./db");

app.use(bodyParser.json());
app.use("/todoroutes", todoRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "The API is working!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
