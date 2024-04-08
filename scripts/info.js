// info.js

document.addEventListener("DOMContentLoaded", function() {
    var updateButton = document.getElementById("update");
    updateButton.addEventListener("click", function() {
      // Redirect to the fitnessTest page
      window.location.href = "fitnessTest.html";
    });
  
    var changeButton = document.getElementById("change");
    changeButton.addEventListener("click", function() {
      // Redirect to the updateAccount page
      window.location.href = "updateAccount.html";
    });
  });
  