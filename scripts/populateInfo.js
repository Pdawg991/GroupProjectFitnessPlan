document.addEventListener('DOMContentLoaded', function(){
getData();
});

const getData = async() => {
    await sendRefreshToken();
    const data = { sortBy: "createdAt", sortOrder: -1 };
    
    const response = await fetch('/bio/find', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    const response2 = await fetch('/bio/getName', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include',
    });
        const nameRes = await response2.json();
        var gender;
        if(resData.gender == 'm') gender = "Male";
        else gender = "Female";
        document.getElementById("clientName").textContent = nameRes;
        document.getElementById("fitGoal").textContent = resData.fitness_goal;
        document.getElementById("curWeight").textContent = resData.current_weight;
        document.getElementById("goalWeight").textContent = resData.goal_weight;
        document.getElementById("clientAge").textContent = resData.clientAge;
        document.getElementById("gender").textContent = gender;
        document.getElementById("height").textContent = resData.height;

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