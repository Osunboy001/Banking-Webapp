const {myuser} = require('../data')


const displayEditUser =  (req, res) => {
  const id = Number(req.params.id);
  const user = myuser.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
  console.log(user);  
};

const userUpdateDeposit =  (req, res) => {
  const id = Number(req.params.id);
  const user = myuser.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
  console.log(user);  
};


const userDeposit = (req, res) => {
  const id = Number(req.params.id);
  const { amount } = req.body;
  const user = myuser.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.balance = user.balance +  Number(amount);
  res.json({ name: user.name, balance: user.balance });
}
const userWithdraw = (req, res) => {
  const id = Number(req.params.id);
  const { amount } = req.body;
  const user = myuser.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.balance = user.balance - Number(amount);
  res.json({ name: user.name, balance: user.balance });
}

module.exports = {displayEditUser,userUpdateDeposit, userDeposit,userWithdraw}