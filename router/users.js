const express = require('express')
  const router = express.Router()


const {displayEditUser,userUpdateDeposit, userDeposit, userWithdraw} = require('../controller/user')


 

  router.get('/:id',  displayEditUser)

  router.put('/:id', userDeposit )

  router.put('/:id/withdraw', userWithdraw )

  module.exports = router