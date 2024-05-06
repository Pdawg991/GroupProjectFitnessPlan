// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        firstname: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Send form data to server using fetch API
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log(data); // Log the server response
        // Display success message to the user
        document.getElementById('messageContainer').innerHTML = '<p>Your message was sent successfully! We\'ll get back to you as soon as possible.</p>';
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
        // Display error message to the user
        document.getElementById('messageContainer').innerHTML = '<p>There was an error sending your message. Please try again later.</p>';
    });
}

document.getElementById('contactForm').addEventListener('submit', handleSubmit);
