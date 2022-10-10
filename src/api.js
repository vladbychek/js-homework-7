let number = 0

async function getResponse(newNum) {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset='+ newNum +'&limit=20'
    let response = await fetch(url)
    let content = await response.json()
    content.results.forEach(function (pokemon){
        getPokemon(pokemon);
    })
}

getResponse()

function getPokemon(pokemon){
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        .then(function(pokeData){
            let list = document.querySelector('#all')
            for(let key in pokeData.species) {
                list.innerHTML += `
                <div id="pokemon">
                    <div id="pokemon_name">${pokeData[key].name}</div>
                    <img id="pokemon_img" src="${pokeData.sprites.other.dream_world.front_default}" alt="">
                    <button id="pokemon_btn">Show more</button>
                </div>
                `
            } 
        })
} 

function next(){
    let newNum = number + 20
    getResponse(newNum)
    console.log(newNum)
}

document.querySelector('#next_btn').addEventListener('click', next)


