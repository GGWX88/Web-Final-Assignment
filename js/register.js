// Member page: tab switching + simple localStorage-based register/login (demo only)

// ---- Tab switching ----
document.querySelectorAll(".member-tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".member-tab").forEach(function (t) {
      t.classList.remove("active");
    });
    document.querySelectorAll(".member-panel").forEach(function (p) {
      p.classList.remove("active");
    });
    tab.classList.add("active");
    document.getElementById("panel-" + tab.dataset.tab).classList.add("active");
  });
});

// ---- Helpers ----
function getAccounts() {
  return JSON.parse(localStorage.getItem("fuku-accounts") || "[]");
}

function saveAccounts(accounts) {
  localStorage.setItem("fuku-accounts", JSON.stringify(accounts));
}

function showMsg(el, text, ok) {
  el.textContent = text;
  el.style.color = ok ? "#2e7d32" : "#c0392b";
}

// ---- Register ----
var regBtn = document.getElementById("reg-submit");
if (regBtn) {
  regBtn.addEventListener("click", function () {
    var msg = document.getElementById("reg-msg");
    var name = document.getElementById("reg-name").value.trim();
    var email = document.getElementById("reg-email").value.trim();
    var password = document.getElementById("reg-password").value;
    var confirm = document.getElementById("reg-confirm").value;
    var terms = document.getElementById("reg-terms").checked;

    if (!name || !email || !password) {
      return showMsg(msg, "Please fill in name, email and password.", false);
    }
    if (password !== confirm) {
      return showMsg(msg, "Passwords do not match.", false);
    }
    if (!terms) {
      return showMsg(msg, "Please agree to the Terms & Conditions.", false);
    }

    var accounts = getAccounts();
    if (accounts.some(function (a) { return a.email === email; })) {
      return showMsg(msg, "An account with this email already exists.", false);
    }

    accounts.push({
      name: name,
      email: email,
      password: password,
      phone: document.getElementById("reg-phone").value.trim(),
      address: document.getElementById("reg-address").value.trim(),
      city: document.getElementById("reg-city").value.trim(),
      postcode: document.getElementById("reg-postcode").value.trim()
    });
    saveAccounts(accounts);
    showMsg(msg, "Account created! You can now log in.", true);
  });
}

// ---- Login ----
var loginBtn = document.getElementById("login-submit");
if (loginBtn) {
  loginBtn.addEventListener("click", function () {
    var msg = document.getElementById("login-msg");
    var email = document.getElementById("login-email").value.trim();
    var password = document.getElementById("login-password").value;

    var accounts = getAccounts();
    var user = accounts.find(function (a) {
      return a.email === email && a.password === password;
    });

    if (!user) {
      return showMsg(msg, "Incorrect email or password.", false);
    }
    localStorage.setItem("fuku-current-user", email);
    showMsg(msg, "Welcome back, " + user.name + "!", true);
  });
}
