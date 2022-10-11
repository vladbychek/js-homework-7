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
            let arr = []
            arr.push(pokeData)
            let list = document.querySelector('#all')
            for(let key in arr) {
                list.innerHTML += `
                <div id="pokemon">
                    <div id="more_info">
                        <div id="pokemon_name">${arr[key].name}</div>
                        <img id="more_img1" src="${pokeData.sprites.back_default}" alt="">
                        <img id="more_img2" src="${pokeData.sprites.front_default}" alt="">
                        <div id="more_abil" class="abil">${pokeData.abilities[key].ability.name}</div>
                        <button id="back_btn">Back to all</button>
                    </div>
                    <div id="static">
                        <div id="pokemon_name">${arr[key].name}</div>
                        <img id="pokemon_img" src="${pokeData.sprites.other.dream_world.front_default}" alt="">
                        <button id="pokemon_btn">Show more</button>
                    </div>
                </div>`
            } 
        })
} 

function show() {
    const show = document.getElementById('more_info')
    const static = document.getElementById('static')
    show.style.display = "block";
    static.style.display = "none";
}
document.querySelector('#pokemon_btn').addEventListener('click', show)

function hide() {
    const show = document.getElementById('more_info')
    const static = document.getElementById('static')
    show.style.display = "none";
    static.style.display = "block";
}
document.querySelector('#back_btn').addEventListener('click', hide)




{/* <div id="more_abil">${pokeData.abilities[key].ability.name}</div> */}
{/* <div id="more_abil">${pokeData.abilities[key].ability.name}</div> */}