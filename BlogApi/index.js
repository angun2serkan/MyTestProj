const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = 8008;
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use("/users", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
