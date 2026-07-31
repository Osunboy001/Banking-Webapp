

const express = require('express')
  const router = express.Router()

const { userDashboard, updateProfilePicture } = require('../controller/dashboard')
const authmiddleware = require('../middleware/auth')
const upload = require('../middleware/multer-middleware')

 router.get('/dashboard', authmiddleware, userDashboard )

 router.put('/profile-picture', authmiddleware, upload.single('profilePicture'), updateProfilePicture )



  module.exports = router
