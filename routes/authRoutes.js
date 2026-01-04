const express = require("express");
const { signup, login, getMe } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protectRoute, getMe);
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
