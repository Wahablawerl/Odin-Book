const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image or video" });
    }

    const newPost = new Post({
      user: userId,
      caption,
      mediaUrl: req.file.path, // Cloudinary URL
      mediaType: req.file.mimetype.startsWith("video") ? "video" : "image",
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getFeed = async (req, res) => {
  try {
    // Get posts from people the user follows
    const posts = await Post.find({ user: { $in: req.user.following } })
      .sort({ createdAt: -1 })
      .populate("user", "username profilePic"); // Join user data

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching feed" });
  }
};
