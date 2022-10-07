async function getResponse() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
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
            for(let key in pokeData.forms) {
                list.innerHTML += `
                <div id="pokemon">
                    <div id="pokemon_name">${pokeData.forms[key].name}</div>
                    <img id="pokemon_img" src="${pokeData.sprites.other.dream_world.front_default}" alt="">
                    <button id="pokemon_btn">Show more</button>
                </div>
                `
            } 
        })
} 





