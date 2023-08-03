const express = require("express");
const router = express.Router();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const User = require("../models/userSchema");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/uploadprofilepic", upload.single("myimage"), async (req, res) => {
  const file = req.file;
  const { userid } = req.body;
  if (!file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  const existingUser = await User.findById(userid);
  if (!existingUser) {
    return res.status(400).json({ error: "No user found" });
  }

  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "auto",
      },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res
            .status(500)
            .json({ error: "Error uploading image to Cloudinary" });
        }

        existingUser.pdfUpload = result.secure_url;

        await existingUser.save();

        res.status(200).json({ result });

        // xyz.com
        //   existingUser.pdfUpload = result.url;

        //   res.send({
        //     file,
        //   });
      }
    )
    .end(file.buffer);
});

module.exports = router;
