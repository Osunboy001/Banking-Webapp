const BASE_URL = "http://localhost:3000/api/v1";
const formAlertDOM = document.querySelector(".form-alert");
async function request(endpoint, method, body) {

  try {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE_URL + endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
     
    },
   
    body: body ? JSON.stringify(body) : undefined
    
  });


if (!res.ok) {
  setError(data.message); 
  return;
}
    return res.json();
   console.log(token)
  
}
  

 
catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.response.data.msg
    localStorage.removeItem('token')
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'no token present'
    tokenDOM.classList.remove('text-success')
  }



}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  if (!email || !password) return alert("Fill all fields");

  const data = await request("/auth/signin", "POST", { email, password });
  if (!data.token) return alert(data.message || "Login failed");

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  showDashboard();
  loadDashboard();
}

async function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  if (!name || !email || !password) return alert("Fill all fields");

  const data = await request("/auth/signup", "POST", { name, email, password });
  if (!data.token) return alert(data.message || "Signup failed");

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  showDashboard();
  loadDashboard();
}

async function loadDashboard() {
  const data = await request("/dashboard", "GET");
  if (!data) return logout();
  renderDashboard(data);
}

function renderDashboard(data) {
 document.querySelector("#username").innerHTML = `<h1 style="color: ;">Hi, ${data.user?.name || data.name}</h1>`;
  document.querySelector("#balance").textContent =` #${data.balance}`;
    document.querySelector("#accountnumber").textContent =`  acctnumber:${data.accountnumber} ` ;
  
}

function showDashboard() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("dashboardPage").classList.remove("hidden")
 document.querySelector(".layout-wrapper").classList.add("hidden");
}

function showLogin() {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("dashboardPage")?.classList.add("hidden");
 document.querySelector(".layout-wrapper").classList.remove("hidden");
}

function showSignup() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.remove("hidden");
 document.querySelector(".layout-wrapper").classList.remove("hidden");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showLogin();
}

function initapp () {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if(token && user) {
    showDashboard()
    loadDashboard()
  }
  else {
    showLogin
  }
}


initapp()


function myFunction() {
  var x = document.getElementById("loginPassword");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function myFunc() {
  var y = document.getElementById("signupPassword");
  if (y.type === "password") {
    y.type = "text";
  } else {
    y.type = "password";
  }
}
