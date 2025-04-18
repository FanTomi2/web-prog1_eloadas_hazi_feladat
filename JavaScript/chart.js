const table = document.getElementById("dataTable");
const ctx = document.getElementById("lineChart").getContext("2d");
const tbody = document.getElementById("tableBody");
let szamok = [];
const in1 = prompt("Adja meg a legkisebb számot amit a táblázatban megjelenjen:")
const in2 = prompt("Adja meg a legnagyobb számot amit a táblázatban megjelenjen:")
const min = Number(in1);
const max = Number(in2);
if (isNaN(min) || isNaN(max)) {
  alert("Hibás szám! Csak számot adhat meg.");
  location.reload();
} else {
  for (let i = 0; i < 25; i++) {
    szamok[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  console.log(szamok);
  let sorok = [];
  sorok[0] = document.createElement('tr');
  sorok[0].innerHTML = `<td>${szamok[0]}</td><td>${szamok[1]}</td><td>${szamok[2]}</td><td>${szamok[3]}</td><td>${szamok[4]}</td>`;
  tbody.appendChild(sorok[0]);
  let segedi = 0;
  for (let i = 1; i < 5; i++) {
    sorok[i] = document.createElement('tr');
    segedi += 5;
    sorok[i].innerHTML = `<td>${szamok[segedi]}</td><td>${szamok[segedi + 1]}</td><td>${szamok[segedi + 2]}</td><td>${szamok[segedi + 3]}</td><td>${szamok[segedi + 4]}</td>`;
    tbody.appendChild(sorok[i]);
  }
}

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [{
      label: "Kiválasztott sor adatai",
      data: [],
      fill: false,
      borderColor: 'blue',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

table.querySelectorAll("tr").forEach(row => {
  row.addEventListener("click", () => {
    // Eltávolítja az összes selected class-t a sorokbol
    table.querySelectorAll("tr").forEach(r => r.classList.remove("selected"));
    // Hozzáadja a rákattintott sorhoz a selected class-t
    row.classList.add("selected");
    const values = Array.from(row.children).map(td => Number(td.textContent));
    chart.data.datasets[0].data = values;
    chart.update();
  });
});