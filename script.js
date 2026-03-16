let recettes = [];

fetch("recettes.json")
.then(r => r.json())
.then(data => recettes = data);

document.getElementById("random").onclick = () => {

let r = recettes[Math.floor(Math.random() * recettes.length)];

document.getElementById("recette").innerHTML = `
<h2>${r.titre}</h2>
<p>Type : ${r.type}</p>
<p>Temps : ${r.temps} min</p>
<p>Ingrédients : ${r.ingredients.join(", ")}</p>
`;

};
