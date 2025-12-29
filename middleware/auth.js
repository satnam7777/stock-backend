const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    // ✅ Read token from HttpOnly cookie
    const token =
      req.cookies?.token ||
      req.cookies?.['auth-token']

    if (!token) {
      return res.status(401).json({
        message: 'Access denied. No token provided.',
      })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    const userId = decoded.id
    const user = await User.findById(userId).select('-password')

    if (!user || user.isActive === false) {
      return res.status(401).json({
        message: 'Invalid or inactive user.',
      })
    }

    req.user = decoded
    req.userProfile = user

    next()
  } catch (err) {
    console.error('❌ Auth error:', err.message)
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = auth
