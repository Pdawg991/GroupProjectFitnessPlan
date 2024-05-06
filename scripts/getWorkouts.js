document.addEventListener('DOMContentLoaded', async function(){
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
    const getData = async() =>{
        await sendRefreshToken();
        const data = { sortBy: "createdAt", sortOrder: -1 };
        //Find the document tied to the user.
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
        var tableBody = document.getElementById("workoutTable");
        tableBody.innerHTML = "<tr><th>Exercise</th><th>Reps/Duration</th><th>Rest Time</th></tr>";
        // Populate table with exercise data
        resData.exercises.forEach(exercise => {
            var row = `<tr><td>${exercise[0]}</td><td>${exercise[1]}</td><td>${exercise[2]}</td></tr>`;
            tableBody.innerHTML += row;
        });

        document.getElementById('WorkoutNotes').textContent = "Repeat exercises for 2 more rounds. Rest for 1 minute (60 seconds) in between each round";

    };
    getData();
    
 
});
