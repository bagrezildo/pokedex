

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

// const url = 'https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}'

// fetch(url).then(function (response){
//    console.log(response)
// })


function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <div>
                    <div>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <ol class="abilities">
                            ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="size">
                        <span class="weight">Weight: ${pokemon.weight}</span>
                        <span class="height">Height: ${pokemon.height}</span>
                    </div>
                </div>
                
                <div class="sprites">
                    <img class="sprite" src="${pokemon.sprite}"
                        alt="${pokemon.name}">
                    
                </div>    
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonItens(offset, limit)
    }
})

