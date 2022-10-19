baseUrl('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
let nextPage
let prevPage

async function baseUrl(mainLink) {
    const mainUrl = await fetch(mainLink)
    const content = await mainUrl.json()
    nextPage = content.next
    prevPage = content.previous
    content.results.forEach(function (pokemon){
        getPokemon(pokemon);
    });
    !prevPage ? document.querySelector('.prev_btn').setAttribute("disabled", true) : document.querySelector('.prev_btn').removeAttribute("disabled")
    !nextPage ? document.querySelector('.next_btn').setAttribute("disabled", true) : document.querySelector('.next_btn').removeAttribute("disabled")
}

const newPage = document.createElement('div')
newPage.id = 'new_page'
all.append(newPage)

function getPokemon(pokemon){
    const mainUrl = pokemon.url
    fetch(mainUrl)
        .then(response => response.json())
        .then(function(pokeData){
            let ul = document.createElement('ul');
            let abils = '<ul>';
            for(a of pokeData.abilities){
                abils += `<li>${a.ability.name}</li>`
            }
            abils += '</ul>'
            const arr = []
            arr.push(pokeData)    
            console.log(pokeData)
            for(let key in arr) {
                new_page.innerHTML +=
                 `<div class="pokemon">
                    <div class="more_info">
                        <div class="pokemon_name">${arr[key].name}</div>
                        <img class="more_img1" src="${pokeData.sprites.back_default}" alt="back_pokemon">
                        <img class="more_img2" src="${pokeData.sprites.front_default}" alt="front_pokemon">
                        ${abils}
                        <button class="back_btn">Back</button>
                    </div>
                    <div class="static">
                        <div class="pokemon_name">${arr[key].name}</div>
                        <img class="pokemon_img" src="${pokeData.sprites.front_default}" alt="main_pokemon">
                        <button class="pokemon_btn">Show more</button>
                    </div>
                </div>`
            }
            const wrappers = document.querySelectorAll('.pokemon');


            [].forEach.call(wrappers,function(el){
                const more_info = el.querySelector('.more_info')
                const static_info = el.querySelector('.static')
                static_info.querySelector('.pokemon_btn').addEventListener('click', () => {
                    static_info.style.display = "none"
                    more_info.style.display = "block"                   
                })
            });
            [].forEach.call(wrappers,function(el){
                const more_info = el.querySelector('.more_info')
                const static_info = el.querySelector('.static')
                more_info.querySelector('.back_btn').addEventListener('click', () => {
                    static_info.style.display = "block"
                    more_info.style.display = "none"                   
                })
            });

        })
} 

function removePage() {
    const pageToDelete = document.querySelector('#new_page')
    pageToDelete.remove()
};

document.querySelector('.next_btn').addEventListener('click', () => {
    baseUrl(nextPage)
    removePage()
    const newPage = document.createElement('div')
    newPage.id = 'new_page'
    all.append(newPage)
})

document.querySelector('.prev_btn').addEventListener('click', () => {
    baseUrl(prevPage)
    removePage()
    const newPage = document.createElement('div')
    newPage.id = 'new_page'
    all.append(newPage)
})
