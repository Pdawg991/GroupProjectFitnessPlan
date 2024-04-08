document.addEventListener('DOMContentLoaded', function() {
    
    const updateAccount = document.getElementById('updateAccount');

updateAccount.addEventListener('click', function(event) {
    event.preventDefault();


    const payload = new FormData(updateAccount);
    console.log(...payload);
    console.log(payload.get('clientNameInput'));
    console.log(payload.get('clientAgeInput'));

    
    document.getElementById('clientName').textContent = payload.get('clientName');
    document.getElementById('clientAge').textContent = payload.get('clientAge');
});
});

