// Get the champion's details from db

const urlParams = new URLSearchParams(window.location.search);
const championName = urlParams.get('name');

async function fetchChampionDetails(name) {
    try {
        const response = await fetch(`http://localhost:3000/champions/${name}`);
        const champion = await response.json().then(data => data[0]);

        const idField = document.getElementById('id');
        const nameField = document.getElementById('name');
        const titleField = document.getElementById('title');
        const portraitField = document.getElementById('portrait');

        idField.value = champion._id;
        nameField.value = champion.name;
        titleField.value = champion.title;
        portraitField.value = champion.portrait;
    } catch (error) {
        console.error('Error fetching champion:', error);
    }
}

fetchChampionDetails(championName);


// Edit the champion in db

async function editChampion() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const portrait = document.getElementById('portrait').value;

    console.log('newName:', name + ' title:', title + ' portrait:', portrait);

    try {
        const response = await fetch(`http://localhost:3000/champions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, title, portrait })
        });

        if (response.ok) {
            alert('Champion modifié avec succès');
            window.location.href = 'index.html';
        } else {
            alert('Erreur lors de la modification du champion');

            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const updatedChampion = await response.json();
        console.log('Champion updated:', updatedChampion);
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('edit-champion-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    await editChampion();
});


