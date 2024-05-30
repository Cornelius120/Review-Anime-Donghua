const form = document.getElementById('ratingForm');
const averageRatingDiv = document.getElementById('averageRating');
const reviewsDiv = document.getElementById('reviews');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  fetch('YOUR_WEB_APP_URL', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(response => response.json()).then(data => {
    if (data.result === 'success') {
      alert('Review submitted successfully!');
      fetchReviews();
    } else {
      alert('Error submitting review.');
    }
  });
});

function fetchReviews() {
  fetch('YOUR_WEB_APP_URL')
    .then(response => response.json())
    .then(data => {
      averageRatingDiv.innerText = `Average Rating: ${data.averageRating.toFixed(2)}`;
      reviewsDiv.innerHTML = '';
      data.reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.innerText = `${review[0]}: ${review[1]} stars - ${review[2]}`;
        reviewsDiv.appendChild(reviewElement);
      });
    });
}

// Fetch reviews when the page loads
fetchReviews();