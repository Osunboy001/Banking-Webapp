



  //  Find each user and update

const User = require('../model/user')  // ← THIS WAS MISSING
const path = require('path')
const fs = require('fs')

const userDashboard = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password')

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  return res.status(200).json({
    name: user.name,
    email: user.email,
    balance: user.balance,
    accountnumber: user.accountnumber,
    role: user.role,
    profilePicture: user.profilePicture
  })
}


// Let the logged-in user upload / change their own profile picture
const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please choose an image to upload" })
    }

    const user = await User.findById(req.user.userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Remove the old picture so we don't leave orphan files behind
    if (user.profilePicture) {
      const oldImagePath = path.join(__dirname, '../public', user.profilePicture)
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath)
      }
    }

    user.profilePicture = `/uploads/${req.file.filename}`
    await user.save()

    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: user.profilePicture
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}


module.exports = { userDashboard, updateProfilePicture }
