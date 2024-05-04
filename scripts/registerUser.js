const form = document.getElementById('registrationForm');
  //Listens for when the submit button is clicked.
  form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  //Gets the values contained in the form wrapper.
  const payload = new FormData(form);

const data = {
    user: payload.get('regUsername'),
    pwd: payload.get('regPassword'),
    clientName: payload.get('clientName'),
    clientAge: payload.get('clientAge')
};

fetch('/register', {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
})
.then(res => res.json(data))
.then(window.location.href = 'login.html')
.catch(err => console.log(err));
  });
