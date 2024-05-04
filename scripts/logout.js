document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", async function() {
        try {
            const response = await fetch('/logout', {
                method: "GET",
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = 'login.html';
            } else {
                // Handle logout error
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Logout error:", error);
        }
    });
});