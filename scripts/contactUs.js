document.getElementById('contactForm').addEventListener('submit', handleSubmit);

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

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        firstname: document.getElementById('fname').value,
        lastname: document.getElementById('lname').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Send form data to server using fetch API
    await sendRefreshToken();
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        credentials: 'include',
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
        // Show success pop-up message
        alert('Your message was sent successfully! We\'ll get back to you as soon as possible.');
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors
        // Show error pop-up message
        alert('There was an error sending your message. Please try again later.');
    });
}
