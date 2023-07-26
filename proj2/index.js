const express = require("express");
const app = express();
const PORT = 8002;
app.get("/", (req, res) => {
  res.send({
    message: "The API is working!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
