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
    updateThemeButton('sun'); // Show sun icon (switch to light)
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeButton('moon'); // Show moon icon (switch to dark)
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

      //header.appendChild(themeButton);
		let actionsWrapper = document.querySelector('.header-actions') || header;
		actionsWrapper.appendChild(themeButton);
		//

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
    updateThemeButton('moon'); // Show moon (to switch to dark)
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('fuku-theme', 'dark');
    updateThemeButton('sun');
  }
}

// ===== FUNCTION 4: UPDATE THEME BUTTON ICON =====
// Uses inline SVG (instead of emoji) so the icon can be styled as a solid
// black/white colour via CSS "fill: currentColor" rather than the OS's
// built-in colour emoji glyph.
function updateThemeButton(icon) {
  let themeButton = document.querySelector('.theme-toggle');
  if (!themeButton) {
    return;
  }

  let sunSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/><line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/><line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/><line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/></g></svg>';
  let moonSvg = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/></svg>';

  themeButton.innerHTML = icon === 'sun' ? sunSvg : moonSvg;
}
