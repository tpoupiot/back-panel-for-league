document.getElementById('add-champion-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const portrait = document.getElementById('portrait').value;

    try {
        const response = await fetch('http://localhost:3000/champions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, title, portrait })
        });

        if (response.ok) {
            alert('Champion ajouté avec succès');
            window.location.href = 'index.html';
        } else {
            alert('Erreur lors de l\'ajout du champion');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
