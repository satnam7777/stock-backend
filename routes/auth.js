const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const auth = require("../middleware/auth"); // middleware for JWT auth

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Save JWT in HttpOnly cookies (both legacy 'token' and 'auth-token' for frontend middleware)
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // true in production, false in development
      sameSite: isProduction ? "none" : "lax", // 'none' for cross-site (prod), 'lax' for local
      maxAge: 24 * 60 * 60 * 1000,
    };

    res.cookie("token", token, cookieOptions);
    res.cookie("auth-token", token, cookieOptions);

    res.json({ message: "Login successful", token });
    // res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("auth-token");
  res.json({ message: "Logged out successfully" });
});

// ME (protected)
router.get("/me", auth, async (req, res) => {
  try {
    // Re-fetch user to get latest data
    const user = await User.findById(req.userProfile._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      bio: user.bio,
      photo: user.photo,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE PROFILE
router.put("/update", auth, async (req, res) => {
  try {
    const { username, email, fullName, phone, bio, photo } = req.body;

    // Build update object
    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    if (fullName) updateFields.fullName = fullName;
    if (phone) updateFields.phone = phone;
    if (bio) updateFields.bio = bio;
    if (photo) updateFields.photo = photo;

    // Check if email/username is taken if changed (optional validation)
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.userProfile._id } });
      if (existingUser) return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(
      req.userProfile._id,
      { $set: updateFields },
      { new: true, runValidators: true } // Return updated doc
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        bio: user.bio,
        photo: user.photo,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
