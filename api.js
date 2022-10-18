baseUrl('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
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
        document.querySelector('.prev_btn').setAttribute("disabled", true)
    }
    else{
        document.querySelector('.prev_btn').removeAttribute("disabled")
    }
    if(!nextPage){
        document.querySelector('.next_btn').setAttribute("disabled", true)
    }
    else{
        document.querySelector('.next_btn').removeAttribute("disabled")
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
            const ul = document.createElement('ul');
            let y = '<ul>';
            for(a of pokeData.abilities){
                y+= `<li>${a.ability.name}</li>`
            }
            y += '</ul>'
            const arr = []
            arr.push(pokeData)    
            for(let key in arr) {
                new_page.innerHTML +=
                 `<div class="pokemon">
                    <div class="more_info">
                        <div class="pokemon_name">${arr[key].name}</div>
                        <img class="more_img1" src="${pokeData.sprites.back_default}" alt="back_pokemon">
                        <img class="more_img2" src="${pokeData.sprites.front_default}" alt="fron_pokemon">
                        ${y}
                        <button class="back_btn">Back to all</button>
                    </div>
                    <div class="static">
                        <div class="pokemon_name">${arr[key].name}</div>
                        <img class="pokemon_img" src="${pokeData.sprites.front_default}" alt="main_pokemon">
                        <button class="pokemon_btn">Show more</button>
                    </div>
                </div>`
            }
            let wrappers = document.querySelectorAll('.pokemon');


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

            // function hide() {
                // const show = document.getElementById('more_info')
                // const static = document.getElementById('static')
                // show.style.display = "none";
                // static.style.display = "block";
            // }
            // document.querySelector('#back_btn').addEventListener('click', hide)
        })
} 


function next() {
    baseUrl(nextPage)
    removeEl()
    let newPage = document.createElement('div')
    newPage.className = 'new_page'
    all.append(newPage)

}
function prev() {
    baseUrl(prevPage)
    removeEl()
    let newPage = document.createElement('div')
    newPage.className = 'new_page'
    all.append(newPage)
}
function removeEl() {
    let del = document.querySelector('.new_page')
    del.remove()
};


document.querySelector('.next_btn').addEventListener('click', next)
document.querySelector('.prev_btn').addEventListener('click', prev)












