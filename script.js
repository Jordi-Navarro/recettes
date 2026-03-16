let recettes = [];

window.addEventListener("DOMContentLoaded", () => {

  // Charger les recettes
  fetch("recettes.json")
    .then(r => r.json())
    .then(data => {
      recettes = data;

      // Extraire tous les tags uniques
      const tagsDisponibles = Array.from(new Set(data.flatMap(r => r.tags)));

      // Créer les checkboxes pour les facettes
      const tagFiltersDiv = document.getElementById("tagFilters");
      tagsDisponibles.forEach(tag => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${tag}"> ${tag}`;
        tagFiltersDiv.appendChild(label);
      });

      // Activer le bouton aléatoire
      document.getElementById("random").onclick = () => {
        afficherRecetteAleatoire();
      };
    });

});

// Fonction pour filtrer les recettes selon titre et tags
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

// Afficher une recette aléatoire
function afficherRecetteAleatoire() {
  const listeFiltree = filtrerRecettes();

  if (listeFiltree.length === 0) {
    document.getElementById("recette").innerHTML = "<p>Aucune recette correspondante</p>";
    return;
  }

  const r = listeFiltree[Math.floor(Math.random() * listeFiltree.length)];

  document.getElementById("recette").innerHTML = `
    <h2>${r.titre}</h2>
    <p>Type : ${r.type}</p>
    <p>Temps : ${r.temps} min</p>
    <p>Ingrédients : ${r.ingredients.join(", ")}</p>
    <p>Tags : ${r.tags.join(", ")}</p>
  `;
}
