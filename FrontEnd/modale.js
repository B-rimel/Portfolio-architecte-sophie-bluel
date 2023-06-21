import {token, projets, categories, genererListeProjets} from './index.js';

categories.splice(0, 1);
const toutesCategories = {
  id: 0,
  name: '',
}
categories.unshift(toutesCategories);
console.log(categories);

const boutonModale2 = document.querySelector('#bouton-suivant');
boutonModale2.addEventListener('click', event => deuxiemeModale());

const fenetreModale1 = document.querySelector('.modale1');
const fenetreModale2 = document.querySelector('.modale2');
const boutonFermer = document.querySelector('#bouton-fermer');
const boutonPrecedent = document.querySelector('#bouton-precedent');

function retourModaleUn() {
  fenetreModale1.style.display = 'flex';
  fenetreModale2.style.display = 'none';

}

boutonPrecedent.addEventListener('click', retourModaleUn);

function afficherModale() {
  fenetreModale1.style.display = 'flex';
}

function fermerModale() {
  const modaleWrapper = document.querySelector('#modale-wrapper');

  boutonFermer.addEventListener('click', event => {
    modaleWrapper.style.display = 'none';
  });

  modaleWrapper.addEventListener('click', event => {
    if (event.target === modaleWrapper) {
      modaleWrapper.style.display = 'none';
    }
  });
}

fermerModale();

function deuxiemeModale() {
  const fenetreModale2 = document.querySelector('.modale2');
  fenetreModale1.style.display = 'none';
  fenetreModale2.style.display = 'flex';
}

const modifierWorks = document.querySelector('#ouvrir-modale');
modifierWorks.addEventListener('click', afficherModale);

const grilleWorks = document.querySelector('#grille-works');

function genererListeModale(projets) {
  for (const projet of projets) {
    const figureGrille = document.createElement('figure');
    figureGrille.dataset.id = projet.id;
    grilleWorks.appendChild(figureGrille);
    figureGrille.id = 'figure-grille';

    const imageGrille = document.createElement('img');
    imageGrille.src = projet.imageUrl;
    figureGrille.appendChild(imageGrille);

    const texteGrille = document.createElement('figcaption');
    texteGrille.innerText = 'éditer';
    figureGrille.appendChild(texteGrille);

    const divBoutons = document.createElement('div');
    divBoutons.id = 'boutons-modale';
    figureGrille.appendChild(divBoutons);

    const boutonEditer = document.createElement('p');
    boutonEditer.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
    divBoutons.appendChild(boutonEditer);
    boutonEditer.style.display = 'none';

    const boutonSupprimer = document.createElement('p');
    boutonSupprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    divBoutons.appendChild(boutonSupprimer);

    figureGrille.addEventListener('mouseover', event => {
      boutonEditer.style.display = 'block';
    });

    figureGrille.addEventListener('mouseout', event => {
      boutonEditer.style.display = 'none';
    });

    boutonSupprimer.addEventListener('click', function (event) {
      event.preventDefault();
      const projetASupprimer = event.target.closest('#figure-grille');
      const projetId = projetASupprimer.dataset.id;
      fetch(`http://localhost:5678/api/works/${projetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((response) => {
          if (response.ok) {
            projetASupprimer.remove();
            const index = projets.findIndex(projet => projet.id == projetId);
            projets.splice(index, 1);
            grilleWorks.innerHTML = '';
            genererListeModale(projets);
            genererListeProjets(projets);
          }
          else {
            alert("Une erreur s'est produite lors de la suppression du projet");
          }
        })
    })
  };
}

function supprimerProjet() {

}
genererListeModale(projets);

const menu = document.querySelector('select');

for (let i = 0; i < categories.length; i++) {
  const category = categories[i];
  
  const option = document.createElement("option");
  
  option.value = [i];
  
  option.text = category.name;
  
  menu.add(option);
}


let imgOk = false;
let titleOk = false;
let categoryOk = false;
let file = '';
const boutonEnvoyer = document.getElementById('bouton-envoyer');
boutonEnvoyer.disabled = true;
function togglePreview() {
  document.querySelector('.fenetre-ajout').classList.toggle('hidden');
  document.querySelector('.preview').classList.toggle('hidden');
}
const inputImage = document.getElementById('input-photo');
inputImage.addEventListener('change', (event) => {
  let file = event.target.files[0];
  const tailleMaximum = 2048 * 2048;

  if (file && file.size <= tailleMaximum) {

    let UrlImage = URL.createObjectURL(file);
    let img = document.getElementById('preview');
    img.src = UrlImage;
    img.onload = () => {
      togglePreview();
      URL.revokeObjectURL(file);
    }
    imgOk = true;    
    checkEntries();
    console.log('L\'image est valide')
  }

  else {
    alert('Le fichier est trop gros');
    inputImage.value = '';
    imgOk = false;
    checkEntries();
  }


});

function checkEntries() {
  if (imgOk && titleOk && categoryOk) {
    boutonEnvoyer.disabled = false;
    boutonEnvoyer.style.backgroundColor = '#1D6154';
  }

  else{
    boutonEnvoyer.disabled = true;
    boutonEnvoyer.style.backgroundColor= '#A7A7A7';
  }
}

const champTitre = document.getElementById('input-texte');
const contenuTitre = document.getElementById('input-texte').value;
const champCategorie = document.getElementById('categorie');
const containerErreur = document.getElementById('container-erreur');
const contenuCategorie = champCategorie.value;
champTitre.addEventListener('change', event => {
  if (event.target.value.length < 3 || event.target.value.length > 50) {
    titleOk = false;
    containerErreur.innerHTML = ('Votre titre n\'est pas valide');
    containerErreur.style.color = 'red';
  }
  else {
    titleOk = true;
    containerErreur.innerText = '';
  }
  checkEntries();
});

champCategorie.addEventListener('change', event => {
  categoryOk = true;
  console.log(categoryOk);
  checkEntries();
});

const formulaireWork = document.getElementById('input-form');

formulaireWork.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputFile = document.getElementById('input-photo');
  const file = inputFile.files[0];

  const inputTexte = document.getElementById('input-texte');
  const contenuTitre = inputTexte.value;

  const selectCategorie = document.getElementById('categorie');
  const contenuCategorie = selectCategorie.value;

  const dataFormulaire = new FormData();
  dataFormulaire.append('image', file);
  dataFormulaire.append('category', contenuCategorie);
  dataFormulaire.append('title', contenuTitre);

  console.log(dataFormulaire);

  fetch(`http://localhost:5678/api/works`, {
    method: 'POST',
    body: dataFormulaire,
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.log('erreur');
      formulaireWork.reset();
    }
  }).then(projet => {
    grilleWorks.innerHTML = '';
    projets.push(projet);
    retourModaleUn();
    genererListeModale(projets);
    genererListeProjets(projets);
    formulaireWork.reset();
  })
});

