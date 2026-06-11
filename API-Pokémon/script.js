let currentId = 1; 
const maxPokemon = 151;
const rotationSpeed = 3000;

async function fetchPokemonData(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar dados');
        
        const data = await response.json();
        updateCardDOM(data);
    } catch (error) {
        console.error(error);
    }
}

function updateCardDOM(pokemon) {
    const container = document.getElementById('pokedex-container');
    
    const formattedId = String(pokemon.id).padStart(3, '0');
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
    const typesHtml = pokemon.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');

    container.innerHTML = `
        <div class="pokemon-card" id="poke-card">
            <div class="image-container">
                <img src="${imageUrl}" alt="${pokemon.name}">
            </div>
            <div class="card-info">
                <h2 class="pokemon-name">${pokemon.name}</h2>
                <span class="pokemon-number">nº ${formattedId}</span>
                <div class="types-container">
                    ${typesHtml}
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const card = document.getElementById('poke-card');
        if (card) card.classList.add('show');
    }, 50);
}

function startPokemonRotation() {

    fetchPokemonData(currentId);

    setInterval(() => {
        currentId++;
        
        if (currentId > maxPokemon) {
            currentId = 1;
        }
        
        fetchPokemonData(currentId);
    }, rotationSpeed);
}

startPokemonRotation();