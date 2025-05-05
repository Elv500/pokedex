const lista = document.getElementById('lista');

function showPokemons(cantidad) {
    for(let i=1; i<=cantidad; i++){
        pokeapi(i);
    }
    document.body.append(lista);
}

async function pokeapi(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await response.json();
    createPokemon(data);
}

function createPokemon(pokemon) {
    const imagen = document.createElement('img');
    imagen.src = pokemon.sprites.front_default;

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('div');
    name.textContent = pokemon.name;

    const element = document.createElement('li');
    element.append(number);
    element.append(imagen);
    element.append(name);

    lista.append(element);
}

showPokemons(9);