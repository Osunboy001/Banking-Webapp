const { myuser } = require('../data');

// GET user by account number
const getUserByAccount = (req, res) => {
  try {
    const accountNumber = req.params.accountNumber.trim();

    const user = myuser.find(
      u => u.accountNumber === accountNumber
    );

    if (!user) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DEPOSIT
const deposit = (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const user = myuser.find(
    u => u.accountNumber === accountNumber
  );

  if (!user) {
    return res.status(404).json({ error: 'Account not found' });
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }


  user.balance = user.balance + Number(amount);

  res.json({
    message: 'Deposit successful',
    balance: user.balance
  });
};

// WITHDRAW
const withdraw = (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const user = myuser.find(
    u => u.accountNumber === accountNumber
  );

  if (!user) {
    return res.status(404).json({ error: 'Account not found' });
  }

  if (Number(amount) > user.balance) {
    return res.status(400).json({ error: 'Insufficient funds' });
  }

  user.balance = user.balance - Number(amount)    ;

  res.json({
    message: 'Withdraw successful',
    balance: user.balance
  });
};

module.exports = { getUserByAccount, deposit, withdraw };