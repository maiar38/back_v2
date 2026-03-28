const User = require("../models/user.model")

// GET /api/users/profile
const getProfile = async (req, res, next) => {
  try {
    res.json(req.user)
  } catch (err) {
    next(err)
  }
}

// PUT /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: "User not found" })

    user.name  = req.body.name   || user.name
    user.email = req.body.email  || user.email
    user.phone = req.body.phone  || user.phone
    user.avatar = req.body.avatar || user.avatar
    user.address = req.body.address || user.address
    if (req.body.password) user.password = req.body.password

    const updated = await user.save()

    res.json({
      _id:  updated._id,
      name:  updated.name,
      email: updated.email,
      phone: updated.phone,
      avatar:updated.avatar,
      address:updated.address,
      role:updated.role,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { getProfile, updateProfile }
