const express = require("express");
const { createPost, getFeed } = require("../controllers/postController");
const protectRoute = require("../middleware/protectRoute");
const { upload } = require("../utils/cloudinary");

const router = express.Router();

// 'media' is the name of the field the frontend will send
router.post("/create", protectRoute, upload.single("media"), createPost);
router.get("/feed", protectRoute, getFeed);

module.exports = router;
