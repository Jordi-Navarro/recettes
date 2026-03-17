//202603171326
let recettes = [];
let recettesAffichees = [];

window.addEventListener("DOMContentLoaded", () => {

  // Charger le JSON
  let recettes = [
  { "titre":"Pizza","type":"plat","temps":20,"ingredients":["farine","tomate","fromage"],"tags":["italien","four"] },
  { "titre":"Omelette","type":"plat","temps":10,"ingredients":["oeufs","sel","beurre"],"tags":["rapide"] }
];
let recettesAffichees = recettes.slice();
afficherListe(recettesAffichees);

      // Créer les facettes pour les tags
      const tagsDisponibles = Array.from(new Set(data.flatMap(r => r.tags)));
      const tagFiltersDiv = document.getElementById("tagFilters");
      tagsDisponibles.forEach(tag => {
        const bouton = document.createElement("button");
        bouton.textContent = tag;
        bouton.style.marginRight = "5px";

        bouton.addEventListener("click", () => {
          ajouterRecettesParTag(tag);
        });

        tagFiltersDiv.appendChild(bouton);
      });

      // Afficher initialement la liste aléatoire
      recettesAffichees = shuffle(recettes);
      afficherListe(recettesAffichees);
    });



// Mélanger un tableau (Fisher-Yates)
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Ajouter les recettes correspondant à un tag
function ajouterRecettesParTag(tag) {
  const nouvelles = recettes.filter(r => r.tags.includes(tag) && !recettesAffichees.includes(r));
  recettesAffichees = recettesAffichees.concat(nouvelles);
  afficherListe(recettesAffichees);
}

// Afficher la liste des recettes
function afficherListe(liste) {
  const conteneur = document.getElementById("recetteListe");
  conteneur.innerHTML = "";

  if (liste.length === 0) {
    conteneur.innerHTML = "<p>Aucune recette correspondante</p>";
    return;
  }

  liste.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2>${r.titre}</h2>
      <p>Type : ${r.type} | Temps : ${r.temps} min</p>
      <p>Ingrédients : ${r.ingredients.join(", ")}</p>
      <p>Tags : ${r.tags.join(", ")}</p>
      <hr>
    `;
    conteneur.appendChild(div);
  });
}
