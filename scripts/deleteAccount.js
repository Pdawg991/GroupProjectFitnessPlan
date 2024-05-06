document.addEventListener("DOMContentLoaded", function() {
    var deleteButton = document.getElementById("delete");
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
    deleteButton.addEventListener("click", async function() {
      if (confirm("Are you sure you want to delete your account?")) {
        await sendRefreshToken();
        try{
        const response = await fetch('/delete', {
          method: "DELETE",
          credentials: 'include',   
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
        });
          
        const response2 = await fetch('/logout', {
          method: "GET",
          credentials: 'include'
      });

      if (response2.ok) {
          window.location.href = 'login.html';
      } else {
          // Handle logout error
          console.error("Logout failed:", response.statusText);
      }
  } catch (error) {
      // Handle network or other errors
      console.error("Logout error:", error);
  }
    }
  });
});