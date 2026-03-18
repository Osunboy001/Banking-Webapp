
const form = document.getElementById('depositForm');
const userIdInput = document.getElementById('userId');
const amountInput = document.getElementById('amount');
const result = document.getElementById('result');
const currentBalance = document.getElementById('currentBalance');

// Set userId from URL parameter if present
const urlParams = new URLSearchParams(window.location.search);
const userIdFromUrl = urlParams.get('id');
if (userIdFromUrl) {
  userIdInput.value = userIdFromUrl;
  fetchUserBalance(userIdFromUrl);
}

// My user id change fetch diplay and show user balance
userIdInput.addEventListener('change', () => {
const userId = userIdInput.value.trim();
if(userId) {
  fetchUserBalance(userId);

}
else {
  currentBalance.textContent = 'Enter account number to see balance';
}
});

async function fetchUserBalance(userId) {
  try {
    const res = await fetch(`/users/${userId}`);
    if (res.ok) {
      const user = await res.json();
      currentBalance.textContent = `Current Balance: #${user.balance.toLocaleString()}`;
    } else {
      currentBalance.textContent = 'Account not found';
    }
  } catch (error) {
    currentBalance.textContent = 'Error loading account';
    console.error('Error:', error);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = userIdInput.value.trim();
  const amount = amountInput.value.trim();

  if (!userId || !amount) {
    showResult('Please enter both account number and amount', 'error');
    return;
  }

  try {
    const res = await fetch(`/users/${userId}
      `, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amount) })
    });

    if (res.ok) {
      const data = await res.json();
      showResult(`Deposit Successful!\nNew Balance: #${data.balance.toLocaleString()}`, 'success');
      amountInput.value = '';
      fetchUserBalance(userId);
    } else {
      showResult('Error: Account not found', 'error');
    }
  } catch (error) {
    showResult('Error: ' + error.message, 'error');
    console.error('Error:', error);
  }
});

function showResult(message, type) {
  result.textContent = message;
  result.className = 'show ' + type;
}


