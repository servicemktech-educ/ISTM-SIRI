// =======================
// 🔵 FORMULAIRE INSCRIPTION
// =======================

// Sélection
let form = document.getElementById("form");
let ancien = document.getElementById("ancien");
let codeBox = document.getElementById("codeBox");
let codeInput = document.getElementById("code");

// cacher au départ
if (codeBox) {
  codeBox.style.display = "none";
}

// afficher si coché
if (ancien) {
  ancien.addEventListener("change", function() {
    if (this.checked) {
      codeBox.style.display = "block";
      codeInput.required = true;
    } else {
      codeBox.style.display = "none";
      codeInput.required = false;
    }
  });
}

// =======================
// 🔵 ENVOI WHATSAPP + SAVE
// =======================

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nom = document.getElementById("nom").value;
    let postnom = document.getElementById("postnom").value;
    let prenom = document.getElementById("prenom").value;
    let sexe = document.getElementById("sexe").value;
    let date = document.getElementById("date").value;
    let lieu = document.getElementById("lieu").value;
    let ancienVal = ancien.checked ? "Oui" : "Non";
    let code = codeInput.value;
    let classe = document.getElementById("classe").value;
    let quartier = document.getElementById("quartier").value;
    let ecole = document.getElementById("ecole").value;
    let option = document.getElementById("option").value;
    let pourcentage = document.getElementById("pourcentage").value;
    let filiere = document.getElementById("filiere").value;
    let tuteur = document.getElementById("tuteur").value;
    let numtuteur = document.getElementById("numtuteur").value;

    // =======================
    // 🔵 SAUVEGARDE LOCAL STORAGE
    // =======================
    let inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];

    inscriptions.push({
      nom,
      postnom,
      prenom,
      sexe,
      date,
      lieu,
      ancien: ancienVal,
      code,
      classe,
      quartier,
      ecole,
      option,
      pourcentage,
      filiere,
      tuteur,
      numtuteur
    });

    localStorage.setItem("inscriptions", JSON.stringify(inscriptions));

    // =======================
    // 🔵 MESSAGE WHATSAPP
    // =======================
    let message =
`INSCRIPTION ISTM M'SIRI 1er

Nom: ${nom}
Post-nom: ${postnom}
Prénom: ${prenom}
Sexe: ${sexe}
Date de naissance: ${date}
Lieu: ${lieu}

Ancien: ${ancienVal}
Code: ${code}

Classe: ${classe}
Quartier: ${quartier}
École: ${ecole}
Option: ${option}
Pourcentage: ${pourcentage}%

Filière: ${filiere}

Tuteur: ${tuteur}
Numéro: ${numtuteur}`;

    let numero = "243976786849";

    let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);

    let confirmation = confirm("Envoyer l'inscription sur WhatsApp ?");

    if (confirmation) {
      window.open(url, "_blank");
      form.reset();
      codeBox.style.display = "none";
    }
  });
}

// =======================
// 🔵 ADMIN PANEL
// =======================

function loadUsers() {
  let inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];

  let table = document.getElementById("userTable");

  if (!table) return;

  table.innerHTML = "";

  inscriptions.forEach((u, index) => {
    table.innerHTML += `
      <tr>
        <td>${u.nom} ${u.postnom} ${u.prenom}</td>
        <td>${u.filiere}</td>
        <td>${u.classe}</td>
        <td>${u.numtuteur}</td>
        <td><button onclick="deleteInscription(${index})">Supprimer</button></td>
      </tr>
    `;
  });
}

// supprimer inscription
function deleteInscription(index) {
  let inscriptions = JSON.parse(localStorage.getItem("inscriptions")) || [];

  inscriptions.splice(index, 1);

  localStorage.setItem("inscriptions", JSON.stringify(inscriptions));

  loadUsers();
}

// charger admin
loadUsers();

// =======================
// 🔵 LOGIN (si présent)
// =======================

function login() {
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;

  let btnText = document.getElementById("btnText");
  let spinner = document.getElementById("spinner");

  if (btnText && spinner) {
    btnText.style.display = "none";
    spinner.style.display = "block";
  }

  setTimeout(() => {

    if (user === "admin" && pass === "admin123") {
      window.location.href = "admin.html";
      return;
    }

    if (user === "étudiant" && pass === "Bac123") {
      window.location.href = "bibliothèque.html";
    } else {
      alert("Accès refusé !");

      if (btnText && spinner) {
        btnText.style.display = "block";
        spinner.style.display = "none";
      }
    }

  }, 2000);
}