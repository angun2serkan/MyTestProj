const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const PORT = 8004;
require("dotenv").config();
const app = express();
require("./db");
const User = require("./models/userSchema");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cors());

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET_KEY
    );
    req.userId = decoded.id;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      console.log("Invalid Token: ", err.message);
      return res.status(401).json({ message: "Invalid Token" });
    }

    console.log("Error: ", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

app.get("/", (req, res) => {
  res.send("The API is working");
});

app.post("/register", async (req, res) => {
  try {
    const { name, password, email, age, gender } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).jsonp({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    console.log("salt: " + salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashedPassword: " + hashedPassword);
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      age,
      gender,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      message: "User logged in successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/getmyprofile", authenticateToken, async (req, res) => {
  const userId = req.userId; // Use the authenticated user's ID

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
