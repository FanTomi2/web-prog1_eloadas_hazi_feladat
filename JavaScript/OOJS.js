class Allatok {
    constructor(nev, fajta) {
        this.nev = nev;
        this.fajta = fajta;
    }

    speak() {
        alert(`${this.nev} beszél!`);
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('animal-card');
        card.classList.add(this.fajta.toLowerCase());
        card.id = `${this.nev.toLowerCase()}`;

        const nameEl = document.createElement('h2');
        nameEl.textContent = `Név: ${this.nev}`;

        const typeEl = document.createElement('p');
        typeEl.textContent = `Típus: ${this.fajta}`;

        const btn = document.createElement('button');
        btn.textContent = "Szólalj meg!";
        btn.addEventListener("click", () => this.speak());

        card.appendChild(nameEl);
        card.appendChild(typeEl);
        card.appendChild(btn);

        const kimenet = document.getElementById('kimenet');
        kimenet.appendChild(card);
    }
}

class Kutya extends Allatok {
    constructor(nev) {
        super(nev, 'kutya');
    }

    speak() {
        alert(`${this.nev} ugat!`);
    }
}

class Macska extends Allatok {
    constructor(nev) {
        super(nev, 'macska');
    }

    speak() {
        alert(`${this.nev} nyávog!`);
    }
}

const keszAllatok = [];
async function crAllat() {
    const nev = prompt("Adja meg az állat nevét: ");
    const fajta = prompt(`Adja meg ${nev} fajtáját: `).toLowerCase();
    if (fajta == "kutya") {
        const ujKutya = new Kutya(nev);
        ujKutya.createCard();
        keszAllatok.push(ujKutya);
    } else if (fajta == "macska") {
        const ujMacska = new Macska(nev);
        ujMacska.createCard();
        keszAllatok.push(ujMacska);
    } else {
        const ujAllat = new Allatok(nev, fajta);
        ujAllat.createCard();
        keszAllatok.push(ujAllat);
    }
    document.getElementById('eltav').style = "visibility: visible;"
}
async function crKutya() {
    const nev = prompt("Adja meg a kutya nevét: ");
    const ujKutya = new Kutya(nev);
    ujKutya.createCard();
    keszAllatok.push(ujKutya);
    document.getElementById('eltav').style = "visibility: visible;"
}
async function crMacska() {
    const nev = prompt("Adja meg a macska nevét: ");
    const ujMacska = new Macska(nev);
    ujMacska.createCard();
    keszAllatok.push(ujMacska);
    document.getElementById('eltav').style = "visibility: visible;"
}
async function eltav() {
    const neve = prompt("Adja meg annak az állatnak a nevét amelyiket eltávolítja:").toLowerCase();
    const nevId = document.getElementById(neve);
    nevId.remove();
    console.log(keszAllatok);
    for (let i = 0; i < keszAllatok.length; i++) {
        if (keszAllatok[i].nev.toLowerCase() == neve) {
            keszAllatok.splice(i, 1);
            break;
        }
    }
    console.log(keszAllatok);
    if (keszAllatok.length == 0) {
        document.getElementById('eltav').style = "visibility: hidden;"
    }
}

