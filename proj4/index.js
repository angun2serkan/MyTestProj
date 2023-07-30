const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { ValidationError } = require("mongoose").Error;
const cookieParser = require("cookie-parser");

require("dotenv").config();

const db = require("./db");
const User = require("./models/userSchema");

const PORT = 8004;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Custom middleware to verify JWT token
function verifyAuthToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Auth Error: No token provided" });
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          return res
            .status(401)
            .json({ message: "Auth Error: Token has expired" });
        } else if (err instanceof jwt.JsonWebTokenError) {
          console.log("Invalid Token: ", err.message);
          return res.status(401).json({ message: "Auth Error: Invalid Token" });
        } else {
          console.log("Error: ", err);
          return res.status(500).json({ message: "Internal server error" });
        }
      }

      req.userId = decoded.id;
      next();
    }
  );
}

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const validationErrors = Object.values(err.errors).map(
      (error) => error.message
    );
    console.log("Validation Errors: ", validationErrors);
    return res
      .status(422)
      .json({ message: "Validation Error", errors: validationErrors });
  }

  console.error("Error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

app.get("/", (req, res) => {
  res.json({ message: "The API is working" });
});

app.post("/register", async (req, res, next) => {
  try {
    const { name, password, email, age, gender } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
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
    next(err);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("User does not exist");
      return next(error);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      const error = new Error("Invalid credentials");
      return next(error);
    }

    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_REFRESH_SECRET_KEY
    );

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/refresh_token",
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      message: "User logged in successfully",
    });
  } catch (err) {
    next(err);
  }
});

// New endpoint to handle token refresh
app.get("/refresh_token", async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decodedRefresh = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET_KEY
    );
    const userId = decodedRefresh.id;

    const existingUser = await User.findById(userId);

    if (!existingUser || token !== existingUser.refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("refreshToken", token, {
      httpOnly: true,
      path: "/refresh_token",
    });

    res.status(200).json({
      accessToken: newAccessToken,
      message: "Token refreshed successfully",
    });
  } catch (err) {
    next(err);
  }
});

app.post("/getmyprofile", verifyAuthToken, async (req, res, next) => {
  const userId = req.userId; // Use the authenticated user's ID

  try {
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("User not found");
      return next(error);
    }

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
