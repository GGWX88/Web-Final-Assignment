window.addEventListener('DOMContentLoaded', function() {
  // Step 1: Create the theme toggle button first
  setupThemeToggle();

  // Step 2: Now that the button exists, apply the saved preference
  loadThemePreference();
});

// ===== FUNCTION 1: LOAD SAVED THEME PREFERENCE =====
function loadThemePreference() {
  // Get the saved theme from browser memory
  let savedTheme = localStorage.getItem('fuku-theme');

  // If user had dark mode on before, apply it
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeButton('☀️'); // Show sun icon (switch to light)
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeButton('🌙'); // Show moon icon (switch to dark)
  }
}

// ===== FUNCTION 2: SETUP THEME TOGGLE BUTTON =====
function setupThemeToggle() {
  // Find or create the theme toggle button
  let themeButton = document.querySelector('.theme-toggle');

  // If button doesn't exist, create it
  if (!themeButton) {
    themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.setAttribute('aria-label', 'Toggle dark mode');

    // Add it to the header
    let header = document.querySelector('header');
    if (header) {
      header.appendChild(themeButton);
    }
  }

  // Add click listener to toggle theme
  themeButton.addEventListener('click', function() {
    toggleTheme();
  });
}

// ===== FUNCTION 3: TOGGLE THEME =====
function toggleTheme() {
  let isDarkMode = document.body.classList.contains('dark-mode');

  if (isDarkMode) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('fuku-theme', 'light');
    updateThemeButton('🌙'); // Show moon (to switch to dark)
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('fuku-theme', 'dark');
    updateThemeButton('☀️');
  }
}

// ===== FUNCTION 4: UPDATE THEME BUTTON ICON =====
function updateThemeButton(icon) {
  let themeButton = document.querySelector('.theme-toggle');
  if (themeButton) {
    themeButton.textContent = icon;
  }
}
