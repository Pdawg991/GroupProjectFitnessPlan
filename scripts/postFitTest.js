document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('fitnessTestForm');
  
  // Listens for when the submit button is clicked.
  form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent default form submission
      
      // Gets the values contained in the form wrapper.
      const payload = new FormData(form);

      let selectedFitnessLevel = 0;
      
      // Get all elements with a name equal to radio.
      const fitnessLevelRadios = document.querySelectorAll('input[name^="fitnessLevel"]');
      
      // Anonymous function to loop through all radio buttons. Find which is checked.
      fitnessLevelRadios.forEach(radio => {
          if (radio.checked) {
              // If radio is checked, remove the level text, and then parse the 
              // remaining string representation of the integer into an integer.
              selectedFitnessLevel = parseInt(radio.id.replace('level', ''));
          }
      });


      
      // Get access token and send fitness test data
      await sendRefreshToken();
      const data = {
        fitness_goal: payload.get('fitGoal'),
        current_weight: payload.get('curWeight'),
        goal_weight: payload.get('goalWeight'),
        clientAge: payload.get('clientAge'),
        gender: payload.get('gender'),
        height: payload.get('height'),
        fitness_level: selectedFitnessLevel
    };
      await sendFitTest(data);
  });
});

const sendFitTest = async (data) => {
  try {
      const response = await fetch('/bio', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          credentials: 'include',
          body: JSON.stringify(data),
      });
      if (!response.ok) {
          if (response.status === 401) {
              throw new Error("Unauthorized");
          }
          throw new Error(`${response.status} ${response.statusText}`);
      }
      window.location.href = 'information.html';
  } catch (error) {
      console.error('Error sending fitness test data:', error);
      // Handle the error as needed
  }
};

const sendRefreshToken = async () => {
  try {
      const response = await fetch('/refresh', {
          method: "GET",
          credentials: 'include'
      });
      
      if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
      }
      const responseBody = await response.json();
      localStorage.setItem('accessToken', responseBody.accessToken);
  } catch (error) {
      console.error('Error refreshing token:', error);
      // Handle the error as needed
      return null;
  }
};