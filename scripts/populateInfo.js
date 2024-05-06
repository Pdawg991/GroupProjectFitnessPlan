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
        const response2 = await fetch('/bio/getClient', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            credentials: 'include',
        });


            const nameRes = await response2.json();
            var gender = resData.gender == 'm' ? "Male" : (resData.gender == 'f' ? "Female" : "");
            document.getElementById("clientNameOutput").textContent = nameRes.clientName;
            document.getElementById("curWeightOutput").textContent = resData.current_weight;
            document.getElementById("goalWeightOutput").textContent = resData.goal_weight;
            document.getElementById("clientAgeOutput").textContent = nameRes.clientAge;
            document.getElementById("genderOutput").textContent = gender;
            document.getElementById("heightOutput").textContent = parseInt(resData.height-resData.height%12)/12 + "'" + resData.height%12 + "\"";
    
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