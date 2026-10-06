/**
 * Kings Travels - Home Page Scripts
 * Handles Destination Tabs, Min Date Selection, and Live Google Reviews
 */

// Destination tabs switcher
function switchTab(tab) {
  document.querySelectorAll('.dest-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dest-panel').forEach(p => p.classList.remove('active'));
  
  const tabBtn = document.getElementById('tab-' + tab);
  const panel = document.getElementById('panel-' + tab);
  
  if (tabBtn) tabBtn.classList.add('active');
  if (panel) {
    panel.classList.add('active');
    panel.querySelectorAll('.fade-up').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  }
}

window.switchTab = switchTab;

// Initialize Home Elements on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Set min date for departure datepicker
  const dateInput = document.getElementById('hero-date');
  if (dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }

  // Live Google Reviews Fetcher
  fetchLatestGoogleReviews();
});

// Google Reviews & Places API Dynamic Fetcher
const GOOGLE_REVIEWS_CONFIG = {
  // Paste your Google Cloud Places API Key below to fetch real-time updates directly from Google:
  apiKey: "", 
  // Google Place ID / Knowledge Graph ID:
  placeId: "11vyrq3glb", 
  defaultCount: 6,
  defaultRating: "5.0",
  profileUrl: "https://share.google/047qTUBYLNEfL6nUd"
};

async function fetchLatestGoogleReviews() {
  const countEls = document.querySelectorAll('.dynamic-review-count');
  const ratingEls = document.querySelectorAll('.dynamic-rating-score');
  
  let totalReviews = GOOGLE_REVIEWS_CONFIG.defaultCount;
  let averageRating = GOOGLE_REVIEWS_CONFIG.defaultRating;

  if (GOOGLE_REVIEWS_CONFIG.apiKey && GOOGLE_REVIEWS_CONFIG.placeId) {
    try {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_REVIEWS_CONFIG.placeId}&fields=user_ratings_total,rating&key=${GOOGLE_REVIEWS_CONFIG.apiKey}`;
      const res = await fetch(apiUrl);
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          if (data.result.user_ratings_total) totalReviews = data.result.user_ratings_total;
          if (data.result.rating) averageRating = data.result.rating.toFixed(1);
        }
      }
    } catch (err) {
      console.warn("Google Places API live fetch fallback:", err);
    }
  }

  countEls.forEach(el => el.textContent = totalReviews);
  ratingEls.forEach(el => el.textContent = averageRating);
}
