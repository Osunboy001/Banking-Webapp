const myUser = require('../model/user');

const userDashboard =   (req, res) => {
  
    let list = myUser.map(user => `
      <li>

        <div class="user-info">
          <strong>${user.name}</strong>
          <span class="balance">#${user.balance.toLocaleString()}</span>
        </div>
       <a href="/deposit.html?accountNumber=${user.accountNumber}" class="deposit-btn">
  Deposit
</a>        
 <a href="/withdraw.html?accountNumber=${user.accountNumber}" class="deposit-btn">Withdraw</a>

 
      </li>


    `
  
  
  ).join('');
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bank - User Management</title>
        <link rel="stylesheet" href="home-style.css">
      </head>
      <body>
        <div class="container">
          <div class="bank-header">
            <h1></h1>
            <p>Manage Your Accounts</p>
          </div>

          <div class="users-section">
            <h2>Your Accounts</h2>
            <ul class="users-list">${list}</ul>
          </div>

          <div class="add-user-section">
            <h2>Create New Account</h2>
            <form action="/users" method="POST">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Account Holder Name</label>
                  <input type="text" id="name" name="name" placeholder="Please enter full name" required>
                </div>
                <div class="form-group">
                  <label for="balance">Initial Balance</label>
                  <input type="number" id="balance" value="0" disabled name="balance" placeholder="Please enter initial amount" required>
                </div>
              </div>
              <button type="submit" class="submit-btn">Create Account</button>
            </form>
          </div>
        </div>
      </body>
      </html>
  
  
      `);}


      





module.exports = {userDashboard}