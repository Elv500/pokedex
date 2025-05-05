const lista = document.getElementById('lista');

async function showPokemons(cantidad) {
    
    showSkeletons(cantidad);
    
    console.time('Measuring time');
    const promises = [];
    
    for (let i = 1; i <= cantidad; i++) {
        promises.push(pokeapi(i));
    }
    
    const pokemons = await Promise.all(promises);

    lista.innerHTML = '';

    pokemons.sort((a, b) => a.id - b.id);
    pokemons.forEach(createPokemon);
    document.body.append(lista);
    console.timeEnd('Measuring time');
}

async function pokeapi(id){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {cache: "no-store"});
    const data = await response.json();
    return data;
}

function createPokemon(pokemon){

    const imagen = document.createElement('img');
    imagen.src = pokemon.sprites.front_default;
    imagen.style.filter = "drop-shadow(0 0 5px gray)"

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('div');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const element = document.createElement('li');
    element.append(number);
    element.append(imagen);
    element.append(name);

    lista.append(element);
}

showPokemons(100);

function showSkeletons(count) {
    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('li');
        skeleton.classList.add('skeleton-card');

        const img = document.createElement('div');
        img.classList.add('skeleton', 'skeleton-img');

        const line1 = document.createElement('div');
        line1.classList.add('skeleton', 'skeleton-text');

        const line2 = document.createElement('div');
        line2.classList.add('skeleton', 'skeleton-text');

        skeleton.append(line1, img, line2);
        lista.append(skeleton);
    }
}