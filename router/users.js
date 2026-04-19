const express = require('express')
  const router = express.Router()


const {  getUserByAccount, deposit, withdraw} = require('../controller/user')




  router.get('/:accountNumber',  getUserByAccount )

  router.put('/:accountNumber/deposit', deposit )

  router.put('/:accountNumber', withdraw )


module.exports = router

