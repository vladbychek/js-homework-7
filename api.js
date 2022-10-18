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
            // console.log(pokeData.abilities)
            const ul = document.createElement('ul');
            let y = '<ul>';
            for(a of pokeData.abilities){
                y+= `<li>${a.ability.name}</li>`
                
            }
            y += '</ul>'
            // y.append(t1)
            const arr = []
            arr.push(pokeData)    
            for(let key in arr) {
                new_page.innerHTML +=
                 `<div id="pokemon">
                    <div id="more_info" class="more_class">
                        <div id="pokemon_name">${arr[key].name}</div>
                        <img id="more_img1" src="${pokeData.sprites.back_default}" alt="back_pokemon">
                        <img id="more_img2" src="${pokeData.sprites.front_default}" alt="fron_pokemon">
                        ${y}
                        <button id="back_btn" class="rr">Back to all</button>
                    </div>
                    <div id="static" class="staic_class">
                        <div id="pokemon_name">${arr[key].name}</div>
                        <img id="pokemon_img" src="${pokeData.sprites.front_default}" alt="main_pokemon">
                        <button id="pokemon_btn" class="pok_btn">Show more</button>
                    </div>
                </div>`
            }
            let buttons = document.getElementsByClassName('pok_btn');
            
            [].forEach.call(buttons,function(el){
                el.addEventListener('click', function () {
                    el.closest('.static_class').style.display = "none";
                });
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












