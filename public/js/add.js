document.getElementById('add-champion-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    await addChampion();
});

const nameField = document.getElementById('name');
const portraitField = document.getElementById('portrait');
const titleField = document.getElementById('title');

nameField.addEventListener('change', async function () {
    await updateChampionDetails();
});

async function addChampion() {
    const name = nameField.value;
    const title = titleField.value;
    const portrait = portraitField.value;

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
            console.log(response)
        } else {
            alert('Erreur lors de l\'ajout du champion');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateChampionDetails() {
    let name = nameField.value;

    name
        .replaceAll(' ', '')
        .replaceAll('-', '')
        .replaceAll('\'', '')
        .replaceAll('.', '');

    if (name.toLowerCase() === 'wukong') {
        name = 'MonkeyKing';
    }

    portraitField.value = `https://cdn.communitydragon.org/latest/champion/${name.toLowerCase()}/square`;

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    try {
        const championData = await fetchChampionData(formattedName);
        titleField.value = championData.title;
    } catch (error) {
        console.error('Le champion n\'existe pas');
    }
}

async function fetchChampionData(championName) {
    const version = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const latestVersionData = await version.json().then(data => data[0]);

    championName
        .replaceAll(' ', '')
        .replaceAll('-', '')
        .replaceAll('\'', '')
        .replaceAll('.', '');

    if (championName.toLowerCase() === 'wukong') {
        championName = 'MonkeyKing';
    }

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersionData}/data/fr_FR/champion/${championName}.json`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data[championName];
}
