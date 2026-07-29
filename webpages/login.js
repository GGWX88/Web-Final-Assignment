window.addEventListener('DOMContentLoaded', function() {
  checkIfAlreadyLoggedIn();
  setupLoginForm();
});

// ===== FUNCTION 1: CHECK IF USER IS ALREADY LOGGED IN =====
function checkIfAlreadyLoggedIn() {
  let savedEmail = localStorage.getItem('noru-logged-in-user');
  if (savedEmail) {
    showWelcomeMessage(savedEmail);
  }
}

// ===== FUNCTION 2: SETUP LOGIN FORM =====
function setupLoginForm() {
  let form = document.querySelector('form');

  if (!form) {
    console.log('Form not found');
    return;
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let rememberCheckbox = document.getElementById('checkbox');

    let messageBox = document.querySelector('.form-msg');

    // CHECK 1: Did user enter email?
    if (email === '') {
      showFormMessage(messageBox, 'Please enter your email', 'error');
      return;
    }

    // CHECK 2: Did user enter password?
    if (password === '') {
      showFormMessage(messageBox, 'Please enter your password', 'error');
      return;
    }

    // CHECK 3: Is password at least 6 characters?
    if (password.length < 6) {
      showFormMessage(messageBox, 'Password must be at least 6 characters', 'error');
      return;
    }

    // CHECK 4: Is this email registered in our system?
    let isRegistered = checkIfEmailRegistered(email);
    if (!isRegistered) {
      showFormMessage(messageBox, 'Email not found. Please register first.', 'error');
      return;
    }

    // CHECK 5: Does the password match the registered password?
    let isCorrectPassword = checkIfPasswordMatches(email, password);
    if (!isCorrectPassword) {
      showFormMessage(messageBox, 'Incorrect password. Please try again.', 'error');
      return;
    }

    handleSuccessfulLogin(email, rememberCheckbox.checked);
  });
}

// ===== FUNCTION 3: HANDLE SUCCESSFUL LOGIN =====
function handleSuccessfulLogin(email, isRemembered) {
  if (isRemembered) {
    localStorage.setItem('noru-logged-in-user', email);
  } else {
    localStorage.removeItem('noru-logged-in-user');
  }

  showWelcomeMessage(email);
}

// ===== FUNCTION 4: SHOW WELCOME MESSAGE =====
function showWelcomeMessage(email) {
  let userName = getRegisteredFirstName(email);

  let loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.style.display = 'none';
  }

  let welcomeBox = document.createElement('div');
  welcomeBox.className = 'success-box';

  welcomeBox.innerHTML = `
    <h2>Login Successful!</h2>
    <p>Welcome back, <strong>${userName}</strong>! You are now logged into your Noru account.</p>
    <button id="logout-btn" class="shop-button">Logout</button>
  `;

  let formSection = document.querySelector('.form-section');
  formSection.appendChild(welcomeBox);

  let logoutButton = document.getElementById('logout-btn');
  logoutButton.addEventListener('click', function() {
    handleLogout();
  });
}

// ===== FUNCTION 5: HANDLE LOGOUT =====
function handleLogout() {
  localStorage.removeItem('noru-logged-in-user');

  location.reload();
}

// ===== FUNCTION 5B: LOAD ALL REGISTERED USERS =====
function loadAllUsers() {
  let usersStr = localStorage.getItem('noru-users');

  if (usersStr) {
    return JSON.parse(usersStr);
  }

  return [];
}

// ===== FUNCTION 5C: FIND A USER BY EMAIL =====
function findUserByEmail(email) {
  let allUsers = loadAllUsers();

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      return allUsers[i];
    }
  }

  return null;
}

// ===== FUNCTION 5D: GET THE REGISTERED FIRST NAME =====
function getRegisteredFirstName(email) {
  let user = findUserByEmail(email);

  if (user && user.fullname) {
    // Just take the first name (everything before the first space)
    return user.fullname.split(' ')[0];
  }

  // Fallback: no name on file, so use the part of the email before @
  let fallbackName = email.split('@')[0];
  return fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);
}

// ===== FUNCTION 6: CHECK IF EMAIL IS REGISTERED =====
function checkIfEmailRegistered(email) {
  return findUserByEmail(email) !== null;
}

// ===== FUNCTION 7: CHECK IF PASSWORD MATCHES =====
function checkIfPasswordMatches(email, password) {
  let user = findUserByEmail(email);

  if (user && user.password === password) {
    return true;
  }

  return false;
}
