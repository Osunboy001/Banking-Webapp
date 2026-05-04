   
   
  

  //  Find each user and update
   
const User = require('../model/user')  // ← THIS WAS MISSING

const userDashboard = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password')

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  return res.status(200).json({
    name: user.name,
    balance: user.balance,
    accountnumber: user.accountnumber,
    role: user.role
  })
}




module.exports = userDashboard