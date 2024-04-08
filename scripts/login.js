const form = document.getElementById('loginSubmit');
  //Listens for when the submit button is clicked.
  form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  window.location.href = 'fitnessTest.html';});