document.addEventListener('DOMContentLoaded', function() {
  let newsletterBox = document.querySelector('.newsletter');

  if (!newsletterBox) {
    return;
  }

  let input = newsletterBox.querySelector('input[type="email"]');
  let button = newsletterBox.querySelector('button');

  button.addEventListener('click', function(event) {
    event.preventDefault();

    let email = input.value.trim();

    let msg = newsletterBox.parentNode.querySelector('.newsletter-msg');
    if (!msg) {
      msg = document.createElement('p');
      msg.className = 'newsletter-msg';
      newsletterBox.parentNode.appendChild(msg);
    }

    if (email === '' || !email.includes('@')) {
      msg.textContent = '❌ Please enter a valid email.';
      msg.classList.remove('success');
      msg.classList.add('error');
      return;
    }

    msg.textContent = '✅ Thanks for subscribing!';
    msg.classList.remove('error');
    msg.classList.add('success');
    input.value = '';
  });
});
