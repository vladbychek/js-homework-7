baseUrl('https://pokeapi.co/api/v2/pokemon/?offset=1120&limit=20')
let nextPage
let prevPage

async function baseUrl(mainLink) {
    let mainUrl = await fetch(mainLink)
    let content = await mainUrl.json()
    nextPage = content.next
    prevPage = content.previous
    content.results.forEach(function (pokemon){
        getPokemon(pokemon);
    })
    if(!prevPage){
        document.getElementById('prev_btn').setAttribute("disabled", true)
    }
    else{
        document.getElementById('prev_btn').removeAttribute("disabled")
    }
    if(!nextPage){
        document.getElementById('next_btn').setAttribute("disabled", true)
    }
    else{
        document.getElementById('next_btn').removeAttribute("disabled")
    }
}

let newPage = document.createElement('div')
newPage.id = 'new_page'
all.append(newPage)

function getPokemon(pokemon){
    let mainUrl = pokemon.url
    fetch(mainUrl)
        .then(response => response.json())
        .then(function(pokeData){
            const arr = []
            arr.push(pokeData)    
            for(let key in arr) {
                new_page.innerHTML += `
                <div id="pokemon">
                    <div id="more_info">
                        <div id="pokemon_name">${arr[key].name}</div>
                        <img id="more_img1" src="${pokeData.sprites.back_default}" alt="back_pokemon">
                        <img id="more_img2" src="${pokeData.sprites.front_default}" alt="fron_pokemon">
                        <div id="more_abil" class="abil">${pokeData.abilities[0].ability.name}</div>
                        <button id="back_btn">Back to all</button>
                    </div>
                    <div id="static">
                        <div id="pokemon_name">${arr[key].name}</div>
                        <img id="pokemon_img" src="${pokeData.sprites.front_default}" alt="main_pokemon">
                        <button id="pokemon_btn">Show more</button>
                    </div>
                </div>`
            }
        })
} 


function next() {
    baseUrl(nextPage)
    removeEl()
    let newPage = document.createElement('div')
    newPage.id = 'new_page'
    all.append(newPage)

}
function prev() {
    baseUrl(prevPage)
    removeEl()
    let newPage = document.createElement('div')
    newPage.id = 'new_page'
    all.append(newPage)

}
function removeEl() {
    let del = document.querySelector('#new_page')
    del.remove()
};


document.querySelector('#next_btn').addEventListener('click', next)
document.querySelector('#prev_btn').addEventListener('click', prev)













// function show() {
//     const show = document.getElementById('more_info')
//     const static = document.getElementById('static')
//     show.style.display = "block";
//     static.style.display = "none";
// }
// document.querySelector('#pokemon_btn').addEventListener('click', show)

// function hide() {
//     const show = document.getElementById('more_info')
//     const static = document.getElementById('static')
//     show.style.display = "none";
//     static.style.display = "block";
// }
// document.querySelector('#back_btn').addEventListener('click', hide)