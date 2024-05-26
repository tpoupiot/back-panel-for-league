async function fetchChampions() {
    try {
        const response = await fetch('http://localhost:3000/champions');
        const champions = await response.json();
        const championList = document.getElementById('champion-list');

        champions.forEach(champion => {
            const item = document.createElement('div');
            item.classList.add('champ__item');
            const content = document.createElement('div');
            content.classList.add('champ__item__content');
            const infos = document.createElement('div');
            infos.classList.add('champ__item__content__infos');

            const h3 = document.createElement('h3');
            h3.textContent = champion.name;

            const p = document.createElement('p');
            p.textContent = champion.title;

            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = champion.portrait;
            img.alt = champion.name;

            const a = document.createElement('a');
            a.href = `edit.html?id=${champion.name}`;
            a.classList.add('link', 'btn');
            a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>';

            const b = document.createElement('a');
            b.href = `delete.html?id=${champion.name}`;
            b.classList.add('link', 'btn');
            b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';

            div.appendChild(a);
            div.appendChild(b);

            infos.appendChild(h3);
            infos.appendChild(p);

            content.appendChild(img);
            content.appendChild(infos);

            item.appendChild(content);
            item.appendChild(div);
            championList.appendChild(item);
        });

        const aside = document.querySelector('aside span');
        aside.textContent = `${champions.length} champions trouvés`;
    } catch (error) {
        console.error('Error fetching champions:', error);
    }
}

fetchChampions();
