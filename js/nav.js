window.addEventListener('DOMContentLoaded', function() {
  setupMobileNav();
});

// ===== FUNCTION 1: SETUP MOBILE NAV TOGGLE =====
function setupMobileNav() {
  let nav = document.querySelector('.main-nav');
  let header = document.querySelector('header');

  if (!nav || !header) {
    return;
  }

  let toggleButton = document.createElement('button');
  toggleButton.className = 'nav-toggle';
  toggleButton.setAttribute('aria-label', 'Toggle navigation menu');
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

  header.insertBefore(toggleButton, nav);

  toggleButton.addEventListener('click', function() {
    let isOpen = nav.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu once a link is clicked, so it doesn't stay open after navigating
  let navLinks = nav.querySelectorAll('a');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('open');
      toggleButton.setAttribute('aria-expanded', 'false');
    });
  });
}
