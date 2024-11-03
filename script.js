// Selecciona el contenedor donde se mostrará la información de los personajes
const characterInfoContainer = document.getElementById("character-info");

// URL de imagen de marcador de posición (puedes cambiarla por la imagen real si está disponible)
const placeholderImage = "https://via.placeholder.com/200x150?text=Star+Wars";

// Asigna eventos de "mouseenter" a cada rango de la lista
document.querySelectorAll(".sidebar li").forEach((item) => {
    item.addEventListener("mouseenter", async () => {
    const range = item.getAttribute("data-range");
    const [start, end] = range.split("-").map(Number);
    characterInfoContainer.innerHTML = ""; // Limpia el contenido anterior

    // Utiliza el generador para obtener personajes en el rango especificado
    for await (const character of getCharactersInRange(start, end)) {
        displayCharacter(character);
    }
});
});

// Generador asíncrono para obtener personajes en un rango específico
async function* getCharactersInRange(start, end) {
    for (let i = start; i <= end; i++) {
    const response = await fetch(`https://swapi.dev/api/people/${i}/`);
    if (response.ok) {
        const character = await response.json();
        yield character;
    } else {
        console.error(`Error al obtener el personaje ${i}`);
    }
}
}

// Función para mostrar un personaje en la interfaz
function displayCharacter(character) {
    const card = document.createElement("div");
    card.classList.add("card");

  // Usa la imagen de marcador de posición por ahora, o cámbiala por una imagen real
    const characterId = character.url.match(/\/people\/(\d+)\//)[1];
    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;

    card.innerHTML = `
    <img src="${imageUrl}" alt="${character.name}" onerror="this.src='https://via.placeholder.com/200x150?text=Image+Not+Found'">
    <h3>${character.name}</h3>
    <p>Altura: ${character.height} cm</p>
    <p>Peso: ${character.mass} kg</p>`;

  // Agrega la tarjeta al contenedor
characterInfoContainer.appendChild(card);
}
