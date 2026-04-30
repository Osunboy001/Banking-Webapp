const unauthorization  = require('../err/autherrorhandler')
const jwt =  require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const authMiddleware = async (req,res,next) => {

  const authHeader = req.headers.authorization 
  if(!authHeader  || !authHeader.startsWith('Bearer')) {
    throw new unauthorization("No Token provided")
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log(payload);

    req.user = {
      userId: payload.userId,
      name: payload.name,
        role: payload.role  
    };

    next();
  }
      catch (err) {
      console.log(err)
    return res.status(401).json({ message: 'Invalid token' });
      }
}

module.exports = authMiddleware