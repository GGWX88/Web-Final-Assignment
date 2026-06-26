const USERS_KEY = "fukuUsers";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = "form-msg " + type;
}

// Tab switching
const tabs = document.querySelectorAll(".member-tab");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".member-panel").forEach(p => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
  });
});

// Register
const regMsg = document.getElementById("reg-msg");
document.getElementById("reg-submit").addEventListener("click", () => {
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;
  const phone = document.getElementById("reg-phone").value.trim();
  const address = document.getElementById("reg-address").value.trim();
  const city = document.getElementById("reg-city").value.trim();
  const postcode = document.getElementById("reg-postcode").value.trim();
  const terms = document.getElementById("reg-terms").checked;

  if (!name || !email || !password || !confirm || !phone || !address || !city || !postcode) {
    showMsg(regMsg, "Please fill in all fields.", "error");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showMsg(regMsg, "Please enter a valid email address.", "error");
    return;
  }
  if (password.length < 6) {
    showMsg(regMsg, "Password must be at least 6 characters.", "error");
    return;
  }
  if (password !== confirm) {
    showMsg(regMsg, "Passwords do not match.", "error");
    return;
  }
  if (!terms) {
    showMsg(regMsg, "You must agree to the Terms & Conditions.", "error");
    return;
  }

  const users = getUsers();
  if (users.some(u => u.email === email)) {
    showMsg(regMsg, "An account with this email already exists.", "error");
    return;
  }

  users.push({ name, email, password, phone, address, city, postcode });
  saveUsers(users);
  showMsg(regMsg, "Account created! You can now log in.", "success");
  document.getElementById("register-form").querySelectorAll("input").forEach(i => {
    if (i.type === "checkbox") i.checked = false;
    else i.value = "";
  });
});

// Login
const loginMsg = document.getElementById("login-msg");
document.getElementById("login-submit").addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    showMsg(loginMsg, "Please enter your email and password.", "error");
    return;
  }

  const user = getUsers().find(u => u.email === email && u.password === password);
  if (!user) {
    showMsg(loginMsg, "Incorrect email or password.", "error");
    return;
  }

  showMsg(loginMsg, "Welcome back, " + user.name + "!", "success");
});
