document.addEventListener('DOMContentLoaded', function() {
    const updateAccountButton = document.getElementById('updateAccount');
        updateAccountButton.addEventListener('click', async function(event) {
            event.preventDefault();
            await sendRefreshToken();

            const payload = new FormData(document.getElementById('updateForm'));
            console.log(...payload);
            const data = {
                clientName: payload.get('clientName'),
                clientAge: payload.get('clientAge')
            };
            const response = await fetch('/bio/updateAccount', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });
        });
});
