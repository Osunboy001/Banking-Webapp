const form = document.getElementById('depositForm');
const userIdInput = document.getElementById('userId');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');
const currentBalance = document.getElementById('currentBalance');
const BASE_URL = "http://localhost:3000/api/v1";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const accountNumber = userIdInput.value.trim();
  const amount = amountInput.value.trim();
  const token = localStorage.getItem('token');

  if (!accountNumber || !amount) {
    return;
    showResult('Please enter both account number and amount', 'error');
  }

  try {
    const res = await fetch(`${BASE_URL}/users/${accountNumber}/deposit`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify({ amount: Number(amount) })
    });

    if (res.ok) {
      const data = await res.json();
      currentBalance.textContent = `Current Balance: ₦${data.balance.toLocaleString()}`;
      showResult(`Deposit Successful! New Balance: ₦${data.balance.toLocaleString()}`, 'success');
      amountInput.value = '';
    } else {
      showResult('Error: Account not found', 'error');
    }
  } catch (error) {
    showResult('Error: ' + error.message, 'error');
  }
});



// error function
function showResult(message, type) {
  result.textContent = message;
  result.className = 'show ' + type;
}