// Fonction pour créer un champion HTML
function createChampionElement(champion) {
    return `
        <div class="champ__item">
            <div class="champ__item__container">
                <div class="champ__item__content">
                    <div class="image__container">
                        <img src="${champion.portrait}" alt="${champion.name}" loading="lazy">
                    </div>
                    <div class="champ__item__content__infos">
                        <h3>${champion.name}</h3>
                        <p>${champion.title}</p>
                    </div>
                </div>
                <div class="champ__item__editor">
                    <a href="edit.html?name=${champion.name}" class="link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
                        </svg>
                    </a>
                    <a href="#" class="link" onclick="createDeletePopup('${champion.name}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour afficher les champions
async function fetchChampions() {
    try {
        const response = await fetch('http://localhost:3000/champions');
        const champions = await response.json();
        const championList = document.getElementById('champion-list');

        champions.forEach(champion => {
            const championElement = createChampionElement(champion);
            championList.insertAdjacentHTML('beforeend', championElement);
        });

        const aside = document.querySelector('aside span');
        aside.textContent = `${champions.length} champions trouvés`;
    } catch (error) {
        console.error('Error fetching champions:', error);
    }
}

async function deleteChampion(name) {
    try {
        const response = await fetch(`http://localhost:3000/champions/${name}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error deleting champion:', error);
    }
}

function closePopup() {
    const popup = document.querySelector('.popup');
    popup.remove();
}

function createDeletePopup(name) {
    const body = document.querySelector('body');
    const popupBody = `
        <div class="popup">
            <div class="popup__content">
                <h2>Supprimer ${name} ?</h2>
                <p>Êtes-vous sûr de vouloir supprimer ${name} ? Cette action est irréversible.</p>
                <div class="popup__buttons">
                    <button class="btn btn-secondary btn--danger" onclick="deleteChampion('${name}')">Supprimer</button>
                    <button class="btn btn-secondary btn--cancel" onclick="closePopup()">Annuler</button>
                </div>
            </div>
        </div>
    `;

    body.insertAdjacentHTML('beforeend', popupBody);
}


fetchChampions();
