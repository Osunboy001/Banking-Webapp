const express = require('express')
  const router = express.Router()
const authMiddleware = require('../middleware/auth')

const {  getUserByAccount, deposit, withdraw} = require('../controller/user')




  router.get('/:accountnumber',  getUserByAccount )

  router.put('/:accountnumber/deposit',authMiddleware, deposit )

  router.put('/:accountnumber', withdraw )


module.exports = router

 