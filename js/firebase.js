
let scoreArray = [];



// Funktion zum regelmäßigen Berechnen und Anzeigen der Daten im Sekundentakt
function updateDataEverySecond() {
    loadDatabase();
    renderScore();
}
setInterval(updateDataEverySecond, 1000);


const BASE_URL = "https://skat-b66c5-default-rtdb.europe-west1.firebasedatabase.app/";


function initDatabase() {
    scoreArray = [];
    saveDatabase();
}


async function saveDatabase() {
    try {
        await putData("/finale2024", scoreArray);
    } catch (error) {
        console.error("Fehler beim Speichern:", error);
    }
}

async function loadDatabase() {
    try {
        await loadData("/finale2024", scoreArray);
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
}

async function loadData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json");
        if (!response.ok) {
            throw new Error(`Fehler beim Laden: ${response.statusText}`);
        }
        let responseToJson = await response.json();
        Object.assign(data, responseToJson);
    } catch (error) {
        console.error("Fehler bei loadData:", error);
    }
}

async function putData(path = "", data = {}) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Speichern: ${response.statusText}`);
        }
        let responseToJson = await response.json();
    } catch (error) {
        console.error("Fehler bei putData:", error);
    }
}


// Funktion zum Rendern der Tabelle
function renderScore() {
    // Sortiere die Daten nach 'gesamtergebnis' absteigend
    const sortedData = [...scoreArray].sort((a, b) => b.score - a.score);

    // Leere die vorherige Tabelle
    const contentSection = document.getElementById("contentScore");
    contentSection.innerHTML = "";

    // Erstelle die Tabelle
    const table = document.createElement("table");
    table.classList.add("resultTable");

    // Erstelle die Kopfzeile der Tabelle
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Platz</th>
        <th>Name</th>
        <th>Score</th>
    `;
    table.appendChild(headerRow);

    // Erstelle eine Zeile für jede Person
    sortedData.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        table.appendChild(row);
    });

    // Füge die Tabelle dem Inhalt hinzu
    contentSection.appendChild(table);
}



