// --- JSON interne pour tester ---
let recettes = [
  { 
    "titre":"Pizza", 
    "type":"plat", 
    "temps":20, 
    "ingredients":["farine","tomate","fromage"], 
    "tags":["italien","four"] 
  },
  { 
    "titre":"Omelette", 
    "type":"plat", 
    "temps":10, 
    "ingredients":["oeufs","sel","beurre"], 
    "tags":["rapide"] 
  },
  { 
    "titre":"Salade César", 
    "type":"entrée", 
    "temps":15, 
    "ingredients":["laitue","poulet","parmesan"], 
    "tags":["rapide","fraîche"] 
  }
];

let recettesAffichees = []; // tableau des recettes affichées

window.addEventListener("DOMContentLoaded", () => {

  // --- Créer les boutons pour chaque tag ---
  const tagsDisponibles = Array.from(new Set(recettes.flatMap(r => r.tags)));
  const tagFiltersDiv = document.getElementById("tagFilters");

  tagsDisponibles.forEach(tag => {
    const bouton = document.createElement("button");
    bouton.textContent = tag;
    tagFiltersDiv.appendChild(bouton);
  });

  // --- Clic sur un tag (OR cumulatif) ---
  tagFiltersDiv.addEventListener("click", (e) => {
    const bouton = e.target.closest("button");
    if (bouton) {
      ajouterRecettesParTag(bouton.textContent.trim());
    }
  });

  // --- Recherche sur le titre ---
  document.getElementById("searchTitle").addEventListener("input", () => {
    afficherListe(filtrerRecettes());
  });

  // --- Affichage initial aléatoire ---
  recettesAffichees = shuffle(recettes); // on commence avec toutes les recettes mélangées
  afficherListe(recettesAffichees);

});

// --- Mélanger un tableau (Fisher-Yates) ---
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- Ajouter les recettes correspondant à un tag ---
function ajouterRecettesParTag(tag) {
  const tagMin = tag.toLowerCase().trim();

  // nouvelles recettes qui contiennent le tag et pas déjà affichées
  const nouvelles = recettes.filter(r => 
    r.tags.map(t => t.toLowerCase().trim()).includes(tagMin) &&
    !recettesAffichees.some(a => a.titre.toLowerCase().trim() === r.titre.toLowerCase().trim())
  );

  recettesAffichees = recettesAffichees.concat(nouvelles);
  afficherListe(recettesAffichees);
}

// --- Filtrer selon le titre ---
function filtrerRecettes() {
  const texte = document.getElementById("searchTitle").value.toLowerCase().trim();
  return recettesAffichees.filter(r => r.titre.toLowerCase().includes(texte));
}

// --- Afficher la liste des recettes ---
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
