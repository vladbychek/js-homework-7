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
    !prevPage ? document.querySelector('.prev_btn').style.display = "none" : document.querySelector('.prev_btn').style.display = "block"
    !nextPage ? document.querySelector('.next_btn').style.display = "none" : document.querySelector('.next_btn').style.display = "block"
}

const newPage = document.createElement('div')
newPage.id = 'new_page'
all.append(newPage)

function getPokemon(pokemon){
    const mainUrl = pokemon.url
    fetch(mainUrl)
        .then(response => response.json())
        .then(function(pokeData){
            let abils = '<ul>';
            for(a of pokeData.abilities){
                abils += `<li>${a.ability.name}</li>`
            }
            abils += '</ul>'
            const arr = []
            arr.push(pokeData)    
            for(let key in arr) {
                let img1=pokeData.sprites.front_default
                let img2 = pokeData.sprites.back_default
                if(!img2){
                    img2="./img/noimg.jpg"
                }
                if(!img1){
                    img1="./img/noimg.jpg"
                }
                new_page.innerHTML +=
                 `<div class="pokemon">
                    <div class="more_info">
                        <div class="more_pokemon_name">${arr[key].name}</div>
                        <div class="more_img_wrapper">
                            <img class="more_img1" src="${img2}" >
                            <img class="more_img2" src="${img1}" >
                        </div>
                        ${abils}
                        <div class="more_stats">
                            <div class="stat"><i class="fa-solid fa-heart hp"></i> ${pokeData.stats[0].base_stat}</div>
                            <div class="stat"><i class="fa-solid fa-hand-back-fist dmg"></i> ${pokeData.stats[1].base_stat}</div>
                            <div class="stat"><i class="fa-solid fa-shield def"></i> ${pokeData.stats[2].base_stat}</div>
                            <div class="stat"><i class="fa-solid fa-bolt spec"></i> ${pokeData.stats[3].base_stat}</div>
                            <div class="stat"><i class="fa-solid fa-person-running speed"></i> ${pokeData.stats[4].base_stat}</div>
                        </div>
                        <button class="back_btn">Back</button>
                    </div>
                    <div class="static">
                        <div class="pokemon_name">${arr[key].name}</div>
                        <div class="static_img_wrapper"><img class="pokemon_img" src="${img1}"></div>
                        <button class="pokemon_btn">Show more</button>
                    </div>
                </div>`
            }
        })
        .then(function(){
            const wrappers = document.querySelectorAll('.pokemon');

            [].forEach.call(wrappers,function(el){
                const more_info = el.querySelector('.more_info')
                const static_info = el.querySelector('.static')
                static_info.querySelector('.pokemon_btn').addEventListener('click', () => {
                    static_info.style.display = "none"
                    more_info.style.display = "block"                   
                })
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
    createNewPage()
    baseUrl(nextPage)
})

document.querySelector('.prev_btn').addEventListener('click', () => {
    createNewPage()
    baseUrl(prevPage)
})

function createNewPage() {
    removePage()
    const newPage = document.createElement('div')
    newPage.id = 'new_page'
    all.append(newPage)
}

