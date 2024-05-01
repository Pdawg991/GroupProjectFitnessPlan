document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  //Listens for when the submit button is clicked.
  form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const payload = new FormData(form);
  const data = {
    user: payload.get('logUsername'),
    pwd: payload.get('logPassword')
};

sendLogin(data);
});
});
const sendLogin = async(data) =>{
 const response = await fetch('/auth', {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  
  const newestPlan = { sortBy: "createdAt", sortOrder: -1 };
    
  const checkForPlan = await fetch('/bio/find', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      credentials: 'include',
      body: JSON.stringify(newestPlan),
  });
  if(response.ok){
    if(!checkForPlan.ok) window.location.href = 'fitnessTest.html';
    else window.location.href = 'information.html';
  }
}