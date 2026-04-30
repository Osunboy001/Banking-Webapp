   
   
   const myUser = require('../model/user')

  //  Find each user and update
   
   
//  Get every user for admin dashboard,to know all the user in bank

const getAllUser = async (req, res) => {
  try {
    const users = await myUser
      .find({ role: 'user' })
      .select('-password')

    const activeUsers = await myUser.countDocuments({
      role: 'user',
      status: 'active'
    })

    res.status(200).json({
      users,
      count: users.length,
      activeUsers
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




// Get all user total balance, active and blocked user count for admin dashboard

const getAllUserBalance = async (req, res) => {
  try {
    const users = await myUser
      .find({ role: 'user' })
      .select('-password')

    const activeUsers = await myUser.countDocuments({
      role: 'user',
      status: 'active'
    })

    const blockedUsers = await myUser.countDocuments({
      role: 'user',
      status: 'blocked'
    })

    const totalBalanceResult = await myUser.aggregate([
      { $match: { role: 'user' } },
      { $group: { _id: null, total: { $sum: "$balance" } } }
    ])

    const totalBalance = totalBalanceResult[0]?.total || 0

    res.status(200).json({
      users,
      totalUsers: users.length,
      activeUsers,
      blockedUsers,
      totalBalance
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}




const blockUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await myUser.findById(userId)  
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: `User ${user.status === 'blocked' ? 'unblocked' : 'blocked'} successfully` })

    user.status = user.status === 'blocked' ? 'active' : 'blocked'
    await user.save()

console.log(`User ${user.status === 'blocked' ? 'blocked' : 'unblocked'}:`, user)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }



}




  module.exports = {

getAllUser,
getAllUserBalance,
blockUser
  }




