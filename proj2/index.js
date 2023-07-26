const express = require("express");
const userRoutes = require("./controllers/userRoutes");
const PORT = 8002;
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// CORS
// const allowedOrigins = ["http://localhost:3001", "http://localhost:3002"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log("origin", origin);
//       if (!origin) return callback(null, true);
//       else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

app.use(cors());

app.use("/userapis", userRoutes);
app.get("/", (req, res) => {
  res.send({
    message: "The API is working!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
