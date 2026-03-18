

const express = require('express')
  const router = express.Router()






const {userDashboard} = require('../controller/home')

 router.get('/', userDashboard )



  module.exports = router