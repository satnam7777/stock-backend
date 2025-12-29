const express = require('express');
const User = require('../models/user'); 
const router = express.Router();

/**
 * @route   GET /api/user/:id
 * @desc    Fetch user details by ID
 * @access  Public (you can secure later with auth middleware)
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return profile virtual (auto excludes password)
    return res.status(200).json({
      success: true,
      data: user.profile 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
