const myUser = require('../model/user');

// GET user by account number
const getUserByAccount = async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber.trim();

    const user = await myUser.findOne({
      accountNumber: accountNumber
    });

    if (!user) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deposit =  async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const user = await myUser.findOne({
    accountNumber: accountNumber
  });

  if (!user) {
    return res.status(404).json({ error: 'Account not found' });
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  user.balance += Number(amount);
  await user.save();

  res.json({
    message: 'Deposit successful',
    balance: user.balance
  });
};


// WITHDRAW
const withdraw = async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const user = await myUser.findOne({
    accountNumber: accountNumber
  });

  if (!user) {
    return res.status(404).json({ error: 'Account not found' });
  }

  if (Number(amount) > user.balance) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }
user.balance -=Number(amount) ;
await user.save();  

  res.json({
    message: 'Withdraw successful',
    balance: user.balance
  });
};

module.exports = { getUserByAccount, deposit, withdraw };