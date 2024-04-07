// Handle form submission
document.getElementById("submitTest").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const formData = {
        fitness_goal: document.getElementById("fitGoal").value,
        current_weight: parseFloat(document.getElementById("curWeight").value),
        goal_weight: parseFloat(document.getElementById("goalWeight").value),
        current_max: parseFloat(document.getElementById("curMax").value),
        goal_max: parseFloat(document.getElementById("goalMax").value),
        fitness_level: parseInt(document.querySelector('input[name="radio"]:checked').value)
    };

    // Save data to MongoDB using Mongoose
    const Bio = require('../model/Bio.js');
    const newBio = new Bio(formData);

    newBio.save()
        .then(result => {
            console.log('New Bio created:', result);
            // Redirect to personal information page after successful submission
            window.location.href = "Information.html";
        })
        .catch(error => {
            console.error('Error creating Bio:', error);
        });
});
