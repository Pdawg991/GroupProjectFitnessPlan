document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  //Listens for when the submit button is clicked.
  form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  window.location.href = 'fitnessTest.html';});
  });