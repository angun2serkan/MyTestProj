const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../UserDatabase.json");

function readDataFromFile() {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
}

function writeDataToFile(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
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
    res.send(user); // Send the user object if found
  } else {
    res.status(404).send({
      error: "User not found!",
    }); // Otherwise, send the error response
  }
});

router.post("/users", (req, res) => {
  const user = req.body;
  const users = readDataFromFile();
  user.id = new Date().getTime();
  users.push(user);
  writeDataToFile(users);
  console.log("user: ", user);
  res.send(user);
});

router.put("/users/:id", (req, res) => {
  const users = readDataFromFile();
  const userId = req.params.id;
  const updateUser = req.body;
  const userIndex = users.findIndex((user) => user.id === parseInt(userId));

  if (userIndex === -1) {
    return res.status(404).send({
      error: "User not found!",
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updateUser,
    id: parseInt(userId), // Ensure the ID remains the same
  };

  writeDataToFile(users);
  res.send(users[userIndex]);
});

router.get("/test", (req, res) =>
  res.send({
    message: "Test is working",
    path: dataFilePath,
  })
);

module.exports = router;
