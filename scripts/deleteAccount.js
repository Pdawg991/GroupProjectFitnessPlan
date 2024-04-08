document.addEventListener("DOMContentLoaded", function() {
    /*var updateButton = document.getElementById("update");
    updateButton.addEventListener("click", function(event) {
      event.preventDefault();
      // need to update information in database.
    });*/
  
    var deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", function() {
      if (confirm("Are you sure you want to delete your account?")) {
        // Need to actual delete account after confirming deletion.
      }
    });
  });