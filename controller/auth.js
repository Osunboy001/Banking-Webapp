
const { StatusCodes } = require("http-status-codes")


const badRequest = require('../err/badrequesterr')
const unauth = require('../err/autherrorhandler')
const User = require('../model/user')

const signup = async (req,res) => {
const user = await User.create({...req.body})
const token = user.createJWT()

res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}


const signin = async (req,res) => {
  const {email,password} = req.body
  if(!email || !password) {
    throw new badRequest('Please enter user name and password')
  }
const user = await User.findOne({ email })
  if(!user) {
    throw new  unauth('User does not exist')
  }

  const ispasswordCorrect = await user.comparePassword(password)
if(!ispasswordCorrect){ 
  throw new unauth('"Invalid email or password"')
}
console.log(ispasswordCorrect)
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}


module.exports ={
  signin,
  signup
}