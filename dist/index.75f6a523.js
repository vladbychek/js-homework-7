async function getResponse() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20");
    let content = await response.json();
    let list = document.querySelector("#all");
    for(let key in content.results)list.innerHTML += `
        <div id="pokemon">
            <div id="pokemon_name">${content.results[key].name}</div>
            <div id="pokemon_img">${content.results[key].url}</div>
            <button id="pokemon_btn">Show more</button>
        </div>
        `;
}
getResponse();

//# sourceMappingURL=index.75f6a523.js.map
