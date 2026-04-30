// ===================== SIDEBAR =====================

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  sidebar.classList.toggle('active');
  overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}

// Close sidebar with ESC
document.addEventListener('keydown', function (e) {
  if (e.key === "Escape") {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    sidebar.classList.remove('active');
    overlay.style.display = 'none';
  }
});

// ===================== SEARCH USER =====================

function searchUser() {
  let input = document.getElementById("search").value.toLowerCase();
  let rows = document.querySelectorAll("#users tr");

  rows.forEach(row => {
    let acc = row.cells[1].innerText.toLowerCase();
    let name = row.cells[0].innerText.toLowerCase();
    row.style.display = (acc.includes(input) || name.includes(input)) ? "" : "none";

  });
}

// ===================== BLOCK / UNBLOCK UI ONLY =====================

function toggle(btn) {
  let row = btn.parentElement.parentElement;
  let status = row.querySelector(".status");

  if (status.classList.contains("active")) {
    status.classList.remove("active");
    status.classList.add("blocked");
    status.innerText = "Blocked";

    btn.classList.remove("block");
    btn.classList.add("unblock");
    btn.innerText = "Unblock";
  } else {
    status.classList.remove("blocked");
    status.classList.add("active");
    status.innerText = "Active";

    btn.classList.remove("unblock");
    btn.classList.add("block");
    btn.innerText = "Block";
  }
}

// ===================== BASE URL =====================

const BASE_URL = "http://localhost:3000/api/v1";

// ===================== LOAD STATS =====================

async function loadStats() {
  try {
    const token = localStorage.getItem("token")

    console.log(" TOKEN (stats):", token)

    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log("STATS RESPONSE:", res)

    const data = await res.json()

    console.log("STATS DATA:", data)

    document.querySelectorAll(".card p")[0].textContent = data.totalUsers
    document.querySelectorAll(".card p")[1].textContent = `₦${data.totalBalance.toLocaleString()}`
    document.querySelectorAll(".card p")[2].textContent = data.activeUsers
    document.querySelectorAll(".card p")[3].textContent = data.blockedUsers

  } catch (err) {
    console.log(" STATS ERROR:", err)
  }
}

// ===================== LOAD USERS =====================

async function loadUsers() {
  try {
    const token = localStorage.getItem("token")

    console.log("TOKEN (users):", token)

    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log("USERS RESPONSE:", res)

    const data = await res.json()

    console.log(" USERS DATA:", data)

    const tbody = document.getElementById("users")
    tbody.innerHTML = ""

    data.users.forEach(user => {
      console.log("👤 USER:", user)

      tbody.innerHTML += `
        <tr>
          <td>${user.name}</td>
          <td>${user.accountnumber}</td>
          <td>₦${user.balance.toLocaleString()}</td>
          <td>
            <span class="status ${user.status === 'blocked' ? 'blocked' : 'active'}">
              ${user.status || "active"}
            </span>
          </td>
          <td>
            <button class="btn view">View</button>
            <button class="btn ${user.status === 'blocked' ? 'unblock' : 'block'}">
              ${user.status === 'blocked' ? 'Unblock' : 'Block'}
            </button>
          </td>
        </tr>
      `
    })

  } catch (err) {
    console.log("USERS ERROR:", err)
  }
}






 loadUsers()
    loadStats()



function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("us")

  // redirect to login page
  window.location.href = "/index.html"
}



