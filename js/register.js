// Step 1: Setup the registration form when page loads
setupRegistrationForm();

// ===== FUNCTION 1: SETUP REGISTRATION FORM =====
function setupRegistrationForm() {
  // Store form data as we collect it
  window.registrationData = {
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: false
  };

  window.currentStep = 1;

  showStep(1);

  setupButtonListeners();

  setupInputListeners();
}

// ===== FUNCTION 2: SHOW SPECIFIC STEP =====
function showStep(stepNumber) {
  let allSteps = document.querySelectorAll('.step-1, .step-2, .step-3');
  allSteps.forEach(function(step) {
    step.style.display = 'none';
  });

  let currentStepDiv = document.querySelector('.step-' + stepNumber);
  if (currentStepDiv) {
    currentStepDiv.style.display = 'block';
  }

  updateProgressBar(stepNumber);

  window.currentStep = stepNumber;
}

// ===== FUNCTION 3: UPDATE PROGRESS BAR =====
function updateProgressBar(stepNumber) {
  let progressBar = document.querySelector('.progress-bar');
  let progressText = document.querySelector('.progress-text');

  if (progressBar) {
    let percentage = (stepNumber / 3) * 100;
    progressBar.style.width = percentage + '%';
  }

  if (progressText) {
    progressText.textContent = stepNumber + ' / 3';
  }
}

// ===== FUNCTION 4: SETUP BUTTON LISTENERS =====
function setupButtonListeners() {
  let nextButtons = document.querySelectorAll('.btn-next');
  nextButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      handleNextStep();
    });
  });

  let prevButtons = document.querySelectorAll('.btn-prev');
  prevButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      handlePrevStep();
    });
  });

  let submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function() {
      handleSubmitRegistration();
    });
  }
}

// ===== FUNCTION 5: HANDLE NEXT STEP =====
function handleNextStep() {
  let currentStep = window.currentStep;
  let isValid = validateStep(currentStep);

  if (isValid) {
    // Move to next step
    showStep(currentStep + 1);
  }
}

// ===== FUNCTION 6: HANDLE PREVIOUS STEP =====
function handlePrevStep() {
  let currentStep = window.currentStep;
  if (currentStep > 1) {
    showStep(currentStep - 1);
  }
}

// ===== FUNCTION 7: VALIDATE STEP =====
function validateStep(stepNumber) {
  let messageBox = document.querySelector('.form-msg');

  if (stepNumber === 1) {
    let fullname = document.getElementById('fullname').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();

    if (fullname === '') {
      showFormMessage(messageBox, 'Please enter your full name.', 'error');
      return false;
    }

    if (email === '') {
      showFormMessage(messageBox, 'Please enter your email.', 'error');
      return false;
    }

    if (phone === '') {
      showFormMessage(messageBox, 'Please enter your phone number.', 'error');
      return false;
    }

    // Check if this email is already registered
    if (isEmailAlreadyRegistered(email)) {
      showFormMessage(messageBox, 'This email is already registered. Please login instead.', 'error');
      return false;
    }

    window.registrationData.fullname = fullname;
    window.registrationData.email = email;
    window.registrationData.phone = phone;
    showFormMessage(messageBox, 'Personal info saved!', 'success');
    return true;
  }

  if (stepNumber === 2) {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (password === '') {
      showFormMessage(messageBox, 'Please enter a password.', 'error');
      return false;
    }

    if (password.length < 6) {
      showFormMessage(messageBox, 'Password must be at least 6 characters.', 'error');
      return false;
    }

    if (confirmPassword === '') {
      showFormMessage(messageBox, 'Please confirm your password.', 'error');
      return false;
    }

    if (password !== confirmPassword) {
      showFormMessage(messageBox, 'Passwords do not match.', 'error');
      return false;
    }

    window.registrationData.password = password;
    window.registrationData.confirmPassword = confirmPassword;
    showFormMessage(messageBox, 'Password saved!', 'success');
    return true;
  }

  if (stepNumber === 3) {
    let agreeTerms = document.getElementById('agreeTerms').checked;

    if (!agreeTerms) {
      showFormMessage(messageBox, 'You must agree to the Terms & Conditions.', 'error');
      return false;
    }

    window.registrationData.agreeTerms = agreeTerms;
    window.registrationData.newsletter = document.getElementById('newsletter').checked;
    showFormMessage(messageBox, 'Ready to register!', 'success');
    return true;
  }

  return false;
}

// ===== FUNCTION 8: HANDLE SUBMIT REGISTRATION =====
function handleSubmitRegistration() {
  let messageBox = document.querySelector('.form-msg');

  if (!validateStep(3)) {
    return;
  }

  // Load the existing list of users, add the new one, and save the whole list back
  let allUsers = loadAllUsers();
  allUsers.push(window.registrationData);
  localStorage.setItem('fuku-users', JSON.stringify(allUsers));

  showSuccessPage();
}

// ===== FUNCTION 8B: LOAD ALL REGISTERED USERS =====
function loadAllUsers() {
  let usersStr = localStorage.getItem('fuku-users');

  if (usersStr) {
    return JSON.parse(usersStr);
  }

  return [];
}

// ===== FUNCTION 8C: CHECK IF EMAIL IS ALREADY REGISTERED =====
function isEmailAlreadyRegistered(email) {
  let allUsers = loadAllUsers();

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].email === email) {
      return true;
    }
  }

  return false;
}

// ===== FUNCTION 9: SHOW SUCCESS PAGE =====
function showSuccessPage() {
  let form = document.querySelector('form');
  let formSection = document.querySelector('.form-section');

  if (form) {
    form.style.display = 'none';
  }

  let successBox = document.createElement('div');
  successBox.className = 'success-box';

  let userName = window.registrationData.fullname.split(' ')[0];

  successBox.innerHTML = `
    <h2>Registration Successful!</h2>
    <p>Welcome to Fuku, <strong>${userName}</strong>! A confirmation email has been sent to ${window.registrationData.email}</p>
    <a href="login.html" class="shop-button">Go to Login</a>
  `;

  formSection.appendChild(successBox);
}

// ===== FUNCTION 10: SETUP INPUT LISTENERS =====
function setupInputListeners() {
  let inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(function(input) {
    input.addEventListener('focus', function() {
      let messageBox = document.querySelector('.form-msg');
      hideFormMessage(messageBox);
    });
  });
}
