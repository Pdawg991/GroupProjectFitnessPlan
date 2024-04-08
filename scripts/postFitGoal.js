const form = document.getElementById('fitnessGoalSelect');
  //Listens for when the submit button is clicked.
  form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  //Gets the values contained in the form wrapper.
  const payload = new FormData(form);

  let selectedFitnessLevel = 0;
  //Get all elements with a name equal to radio
  const fitnessLevelRadios = document.querySelectorAll('input[name^="radio"]');
 //Anonymous function to loop through all radio buttons. Find which is checked.
  fitnessLevelRadios.forEach(radio => {
    if (radio.checked) {
      //If radio is checked, remove the level text, and then parse the 
      //remaining string representation of the integer into an integer.
      selectedFitnessLevel = parseInt(radio.id.replace('level', ''));
    }
  });
  //Logs to console all values of items in payload
  //console.log(...payload);
  const data = {
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
          .then(data => window.location.href = 'information.html')
          .catch(err => console.log(err));
      });