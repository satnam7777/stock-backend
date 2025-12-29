// const express = require("express");
// const jwt = require("jsonwebtoken");
// const User = require("./models/user");
// const router = express.Router();

// router.get("/me", async (req, res) => {
//   try {
//     const token = req.cookies?.token; // token is stored in cookie

//     if (!token) {
//       return res.status(401).json({ message: "No token found" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user); // sends { _id, username, email, role, etc. }
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// module.exports = router;






















const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    // Token stored in cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user (hide password)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
