let allReviews = loadReviewsFromMemory();
displayAllReviews();
setupStarRatings();
setupCharacterCounter();
setupFormSubmission();

// ===== FUNCTION 1: LOAD REVIEWS FROM MEMORY =====
function loadReviewsFromMemory() {
  let savedReviews = localStorage.getItem('fuku-reviews');

  if (savedReviews) {
    return JSON.parse(savedReviews);
  }

  return [];
}

// ===== FUNCTION 2: SAVE REVIEWS TO MEMORY =====
function saveReviewsToMemory() {
  let reviewsAsText = JSON.stringify(allReviews);
  localStorage.setItem('fuku-reviews', reviewsAsText);
}

// ===== FUNCTION 3: STAR RATING SYSTEM =====
function setupStarRatings() {
  let selectedRating = 0;

  let stars = document.querySelectorAll('.star');

  stars.forEach(function(star) {
    star.addEventListener('click', function() {
      selectedRating = parseInt(star.dataset.value);

      colorTheStars(selectedRating);
    });
  });

  window.userSelectedRating = selectedRating;

  stars.forEach(function(star, position) {
    star.addEventListener('mouseover', function() {
      colorTheStars(position + 1);
    });
  });

  document.getElementById('star-picker').addEventListener('mouseleave', function() {
    colorTheStars(window.userSelectedRating);
  });
}

function colorTheStars(rating) {
  let stars = document.querySelectorAll('.star');

  stars.forEach(function(star, position) {
    if (position < rating) {
      star.style.color = '#fbbf24';
    } else {
      star.style.color = '#d1d5db';
    }
  });
}

// ===== FUNCTION 4: CHARACTER COUNTER =====
function setupCharacterCounter() {
  let textarea = document.getElementById('rv-text');
  let charDisplay = document.getElementById('char-count');

  textarea.addEventListener('input', function() {
    let currentLength = textarea.value.length;
    charDisplay.textContent = currentLength + ' / 400';
  });
}

// ===== FUNCTION 5: FORM SUBMISSION =====
function setupFormSubmission() {
  let submitButton = document.getElementById('rv-submit');
  let messageBox = document.getElementById('rv-msg');

  submitButton.addEventListener('click', function() {
    // Get all the form values
    let name = document.getElementById('rv-name').value.trim();
    let email = document.getElementById('rv-email').value.trim();
    let phone = document.getElementById('rv-phone').value.trim();
    let rating = window.userSelectedRating;
    let reviewText = document.getElementById('rv-text').value.trim();

    // CHECK 1: Did user enter a name?
    if (name === '') {
      messageBox.textContent = '❌ Please enter your name.';
      messageBox.style.color = '#ef4444';
      return;
    }

    // CHECK 2: Did user enter an email?
    if (email === '') {
      messageBox.textContent = '❌ Please enter your email.';
      messageBox.style.color = '#ef4444';
      return;
    }

    // CHECK 3: Did user enter a phone number?
    if (phone === '') {
      messageBox.textContent = 'Please enter your phone number.';
      messageBox.style.color = '#ef4444';
      return;
    }

    // CHECK 4: Did user select a rating?
    if (rating === 0) {
      messageBox.textContent = 'Please select a rating (1-5 stars).';
      messageBox.style.color = '#ef4444';
      return;
    }

    // CHECK 5: Did user write a review?
    if (reviewText === '') {
      messageBox.textContent = 'Please write a review.';
      messageBox.style.color = '#ef4444';
      return;
    }

    // CHECK 6: Has this email been used before?
    let emailAlreadyUsed = false;
    for (let i = 0; i < allReviews.length; i++) {
      if (allReviews[i].email === email) {
        emailAlreadyUsed = true;
      }
    }

    if (emailAlreadyUsed) {
      messageBox.textContent = 'A review from this email already exists.';
      messageBox.style.color = '#f59e0b';
      return;
    }

    // All checks passed! Create a review object
    let newReview = {
      name: name,
      email: email,
      phone: phone,
      rating: rating,
      text: reviewText,
      date: new Date().toLocaleDateString()
    };

    allReviews.unshift(newReview);

    saveReviewsToMemory();

    messageBox.textContent = 'Thank you! Your review has been posted.';
    messageBox.style.color = '#4ade80';

    clearTheForm();

    displayAllReviews();

    setTimeout(function() {
      messageBox.textContent = '';
    }, 3000);
  });
}

// ===== FUNCTION 6: CLEAR FORM =====
function clearTheForm() {
  document.getElementById('rv-name').value = '';
  document.getElementById('rv-email').value = '';
  document.getElementById('rv-phone').value = '';
  document.getElementById('rv-text').value = '';
  document.getElementById('char-count').textContent = '0 / 400';

  window.userSelectedRating = 0;
  colorTheStars(0);
}

// ===== FUNCTION 7: DISPLAY ALL REVIEWS =====
function displayAllReviews() {
  let reviewContainer = document.getElementById('reviews-container');

  reviewContainer.innerHTML = '';

  if (allReviews.length === 0) {
    reviewContainer.innerHTML = '<p style="color: #999; font-style: italic;">No reviews yet. Be the first!</p>';
    return;
  }

  for (let i = 0; i < allReviews.length; i++) {
    let review = allReviews[i];

    let reviewCard = document.createElement('div');
    reviewCard.className = 'review-item';

    let stars = '';
    for (let s = 0; s < review.rating; s++) {
      stars += '★';
    }
    for (let s = 0; s < (5 - review.rating); s++) {
      stars += '<span style="color: #d1d5db;">★</span>';
    }

    reviewCard.innerHTML = `
      <div class="review-header-item">
        <strong>${review.name}</strong>
        <span class="review-date">${review.date}</span>
      </div>
      <div class="review-rating">${stars}</div>
      <p class="review-text">${review.text}</p>
    `;

    reviewContainer.appendChild(reviewCard);
  }
}
