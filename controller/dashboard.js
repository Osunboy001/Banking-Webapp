   
   
   const myuser = require('../model/user')

  //  Find each user and update
   
   const userDashboard = async (req, res) => {
      try {
        console.log('user from token:', req.user) 
        
        const user = await myuser.findById(req.user.userId)
        console.log('user from db:', user) 

        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({
          name: user.name,
          balance: user.balance,
          accountnumber: user.accountnumber
        })
      } catch (error) {
        console.log('dashboard error:', error.message) // ← add this
        res.status(500).json({ message: error.message })
      }
    }



module.exports = userDashboard