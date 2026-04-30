const express = require('express')
const router = express.Router()

const {
  getAllUser,
  getAllUserBalance,
  blockUser,
} = require('../controller/admidashboard')

const authMiddleware = require('../middleware/auth')


// GET ALL USERS
router.get('/users', authMiddleware, getAllUser)

//  GET DASHBOARD STATS
router.get('/stats', authMiddleware, getAllUserBalance)


module.exports = router



