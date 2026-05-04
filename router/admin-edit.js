
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth')
const {
getSingleUser,
updateUser
} = require('../controller/admin-edit')








router.patch('/users/:id', authMiddleware, updateUser)
router.get('/users/:id', authMiddleware, getSingleUser)

module.exports = router