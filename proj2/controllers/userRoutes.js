const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../UserDatabase.json");

function readDataFromFile() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

router.get("/users", (req, res) => {
  const users = readDataFromFile();
  res.send(users);
});

router.get("/test", (req, res) =>
  res.send({
    message: "Test is working",
    path: dataFilePath,
  })
);

module.exports = router;
