let recettes = [];

window.addEventListener("DOMContentLoaded", () => {

  // Charger le JSON
  fetch("recettes.json")
    .then(r => r.json())
    .then(data => {
      recettes = data;

      // Créer les facettes pour les tags
      const tagsDisponibles = Array.from(new Set(data.flatMap(r => r.tags)));
      const tagFiltersDiv = document.getElementById("tagFilters");
      tagsDisponibles.forEach(tag => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${tag}"> ${tag}`;
        tagFiltersDiv.appendChild(label);
      });

      // Afficher la liste initiale aléatoire
      afficherListe(filtrerRecettes());

      // Ajouter des écouteurs pour recherche et filtres
      document.getElementById("searchTitle").addEventListener("input", () => {
        afficherListe(filtrerRecettes());
      });

      tagFiltersDiv.querySelectorAll("input[type=checkbox]").forEach(cb => {
        cb.addEventListener("change", () => {
          afficherListe(filtrerRecettes());
        });
      });
    });

});

// Filtrer selon titre et tags
function filtrerRecettes() {
  const texte = document.getElementById("searchTitle").value.toLowerCase();
  const checkedTags = Array.from(document.querySelectorAll("#tagFilters input:checked"))
    .map(cb => cb.value);

  return recettes.filter(r => {
    const titreOk = r.titre.toLowerCase().includes(texte);
    const tagsOk = checkedTags.every(tag => r.tags.includes(tag));
    return titreOk && tagsOk;
  });
}

// Mélanger un tableau (Fisher-Yates)
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Afficher la liste des recettes
function afficherListe(liste) {
  const conteneur = document.getElementById("recetteListe");
  conteneur.innerHTML = "";

  if (liste.length === 0) {
    conteneur.innerHTML = "<p>Aucune recette correspondante</p>";
    return;
  }

  // Mélanger pour ordre aléatoire
  const melange = shuffle(liste);

  melange.forEach(r => {
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
