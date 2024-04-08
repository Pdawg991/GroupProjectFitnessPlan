const form = document.getElementById('changeAccount');
const nameData = { sortBy: "createdAt", sortOrder: -1};

fetch('/bio/find', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(nameData),
})
.then(res => res.json())
.then(data => {
    document.getElementById("fitGoal").textContent = data.fitness_goal;
    document.getElementById("curWeight").textContent = data.current_weight;
    document.getElementById("goalWeight").textContent = data.goal_weight;
    document.getElementById("curMax").textContent = data.current_max;
    document.getElementById("goalMax").textContent = data.goal_max;
    //document.getElementById("fitGoal").textContent = data.fitness_level;
})
.catch(err => console.log(err));
