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
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        var tableBody = document.getElementById("dietTable");
        tableBody.innerHTML = "<tr><th>Protein</th><th>Fat</th><th>Carbs</th><th> Water</th><th>Fiber</th></tr>";
        
        // Populate table with data table
        var row = "<tr>";
        resData.diet.forEach(value => {
            row += `<td>${value}</td>`;
        });
        row += "</tr>";
        tableBody.innerHTML += row;
        document.getElementById("totalCalories").textContent = resData.caloricIntake;
    };
    
    getData();
});