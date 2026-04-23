

const express = require('express')
  const router = express.Router()

const userDashboard = require('../controller/dashboard')
const authmiddleware = require('../middleware/auth')

 router.get('/dashboard', authmiddleware, userDashboard )



  module.exports = router