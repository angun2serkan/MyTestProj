const express = require("express");
const port = 8001;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
