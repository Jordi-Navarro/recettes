let recettes = [];
let recettesAffichees = [];

window.addEventListener("DOMContentLoaded", () => {

  // Charger le JSON
  fetch("recettes.json")
    .then(r => r.json())
    .then(data => {
      recettes = data;

      // Créer les boutons pour chaque tag
      const tagsDisponibles = Array.from(new Set(data.flatMap(r => r.tags)));
      const tagFiltersDiv = document.getElementById("tagFilters");

      tagsDisponibles.forEach(tag => {
        const bouton = document.createElement("button");
        bouton.textContent = tag;
        tagFiltersDiv.appendChild(bouton);
      });

      // Event delegation pour accumulation par tag
      tagFiltersDiv.addEventListener("click", (e) => {
        const bouton = e.target.closest("button");
        if (bouton) {
          ajouterRecettesParTag(bouton.textContent.trim());
        }
      });

      // Recherche sur le titre
      document.getElementById("searchTitle").addEventListener("input", () => {
        afficherListe(filtrerRecettes());
      });

      // Affichage initial aléatoire
      recettesAffichees = shuffle(recettes);
      afficherListe(recettesAffichees);
    });

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

// Ajouter les recettes correspondant à un tag (accumulation)
function ajouterRecettesParTag(tag) {
  const nouvelles = recettes.filter(r => 
    r.tags.includes(tag) &&
    !recettesAffichees.some(a => a.titre === r.titre)
  );
  recettesAffichees = recettesAffichees.concat(nouvelles);
  afficherListe(recettesAffichees);
}

// Filtrer selon titre sur les recettes affichées
function filtrerRecettes() {
  const texte = document.getElementById("searchTitle").value.toLowerCase();
  return recettesAffichees.filter(r => r.titre.toLowerCase().includes(texte));
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
