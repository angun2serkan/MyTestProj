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

router.get("/users/:id", (req, res) => {
  const users = readDataFromFile();
  const userId = req.params.id;
  const user = users.find((user) => user.id === parseInt(userId));

  if (user) {
    res.send(user);
  } else {
    res.status(404).send({
      error: "User not found!",
    });
  }
  res.send(users);
});

router.post("/users", (req, res) => {
  const user = req.body;
  console.log("user: ", user);
  res.send("Ok");
});

router.get("/test", (req, res) =>
  res.send({
    message: "Test is working",
    path: dataFilePath,
  })
);

module.exports = router;
