// Retrieve stored information from MongoDB
const Bio = require('../model/Bio.js'); // Import the Bio model

Bio.findOne()
    .then(bio => {
        if (bio) {
            // Populate HTML elements with retrieved data
            document.getElementById("fitGoalInfo").textContent = bio.fitness_goal;
            document.getElementById("curWeightInfo").textContent = bio.current_weight;
            document.getElementById("goalWeightInfo").textContent = bio.goal_weight;
            document.getElementById("curMaxInfo").textContent = bio.current_max;
            document.getElementById("goalMaxInfo").textContent = bio.goal_max;
            document.getElementById("fitnessLevelInfo").textContent = bio.fitness_level;
        } else {
            console.log('No bio data found.');
        }
    })
    .catch(error => {
        console.error('Error retrieving bio data:', error);
    });
