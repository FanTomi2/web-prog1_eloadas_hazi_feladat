const sub = document.getElementById('submit');
const tbody = document.getElementById('tableBody');
const table = document.getElementById('dataTable');
const thead = document.getElementById('tableHead');

// Táblázat rendezése
const sortTable = (columnIndex, isNumeric = false, ascending = true) => {
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();
        if (isNumeric) {
            return ascending ? aText - bText : bText - aText;
        } else {
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
        }
    });
    rows.forEach(row => tbody.appendChild(row));
};

// Fejléc eseménykezelő hozzáadása
const headers = thead.querySelectorAll('td');
const sortStates = Array(headers.length).fill(true); // Kezdetben növekvő rendezés
let previousHeader = null;
headers.forEach((header, index) => {
    header.addEventListener('click', async () => {
        if (header.id !== 'torl' && header.id !== 'szerk') {
            header.style = "background-color: lightgrey; border: 2px solid black; font-weight: bold;";
            const isNumeric = index === 3; // a 4. oszlop (kor) numerikus
            sortTable(index, isNumeric, sortStates[index]);
            sortStates[index] = !sortStates[index]; // Váltás a sorrend állapotában
            if (previousHeader && previousHeader != header) {
                previousHeader.textContent = previousHeader.textContent.replace('🔼', '');
                previousHeader.textContent = previousHeader.textContent.replace('🔽', '');
                previousHeader.style = "";
            }
            if (sortStates[index]) {
                header.textContent = header.textContent.replace('🔼', '');
                header.textContent += '🔽';
            } else {
                header.textContent = header.textContent.replace('🔽', '');
                header.textContent += '🔼';
            }
            previousHeader = header;
        }
    });
});
//hozzáadás
let adatok = [];
sub.addEventListener('click', () => {
    const nev = document.getElementById('nev');
    const email = document.getElementById('email');
    const varos = document.getElementById('varos');
    const kor = document.getElementById('kor');
    if (nev.value === '' || email.value === '' || kor.value === '' || varos.value === '') {
        alert('Az összes mezőt kötelező kitölteni!');
        return;
    } else if (nev.value.length > 30 || kor.value > 99 || varos.value.length > 30) {
        alert('Túl hosszú!');
        return;
    } else if (!email.value.includes('@')) {
        alert('Helytelen e-mail cím');
        return;
    } else {
        let adat = {
            nev: nev.value,
            email: email.value,
            varos: varos.value,
            kor: kor.value
        };
        adatok.push(adat);
        nev.value = '';
        email.value = '';
        varos.value = '';
        kor.value = '';
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${adat.nev}</td><td>${adat.email}</td><td>${adat.varos}</td><td>${adat.kor}</td><td class="szerk">✏️</td><td class="torl">❌</td>`;
        tbody.appendChild(tr);

        const torles = tr.querySelector('.torl');
        torles.addEventListener('click', () => {
            tbody.removeChild(tr);
            adatok = adatok.filter(item => item.nev !== adat.nev);
        });

        const szerkeszt = tr.querySelector('.szerk');
        szerkeszt.addEventListener('click', () => {
            nev.value = adat.nev;
            email.value = adat.email;
            varos.value = adat.varos;
            kor.value = adat.kor;
            tbody.removeChild(tr);
            adatok = adatok.filter(item => item.nev !== adat.nev);
        });
    }
});