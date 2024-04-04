const form = document.getElementById('loginSubmit');
  //Listens for when the submit button is clicked.
  form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  window.location.href = 'information.html';});
  /*const data = {
          fitness_goal: payload.get('fitGoal'),
          current_weight: payload.get('curWeight'),
          goal_weight: payload.get('goalWeight'),
          current_max: payload.get('curMax'),
          goal_max: payload.get('goalMax'),
          fitness_level: selectedFitnessLevel
          }
          fetch('/bio', {
              method: "POST",
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
          })
          .then(res => res.json())
          .then(data=> window.location.href = 'information.html')
          .catch(err => console.log(err));
      });*/