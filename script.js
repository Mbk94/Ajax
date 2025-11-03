// Une fois que le HTML ressemble à ce que vous voulez : 
// 1. Faire une variable count, qui stockera le nombre de clics
// 2. Faire un eventListener sur le bouton
let compteur = 0;
let tempsRestant = 5;     // secondes
let started = false;      // le chrono n'a pas démarré tant qu'on n'a pas cliqué
let finished = false;     // devient vrai quand le temps est écoulé
let interval = null;

const compteurEl = document.getElementById("compteur");
const chronoEl   = document.getElementById("chrono");
const bouton     = document.getElementById("btn");
const retourBtn  = document.getElementById("retourBtn");

// Clic sur le bouton principal
bouton.addEventListener("click", () => {
  // Démarre le chrono au premier clic
  if (!started) {
    started = true;
    chronoEl.textContent = `Temps restant : ${tempsRestant}s`;

    interval = setInterval(() => {
      tempsRestant--;
      chronoEl.textContent = `Temps restant : ${tempsRestant}s`;

      if (tempsRestant <= 0) {
        clearInterval(interval);
        finished = true;
        chronoEl.textContent = "⏰ Temps écoulé !";
        bouton.disabled = true;

        // Affiche le bouton retour uniquement à la fin
        retourBtn.classList.remove("hidden");
        retourBtn.classList.add("visible");
      }
    }, 1000);
  }

  // Si le temps est fini, on ignore les clics
  if (finished) return;

  // Incrémente le compteur tant que le chrono tourne
  compteur++;
  compteurEl.textContent = compteur;
});

// Gestion du bouton Retour (robuste)
retourBtn.addEventListener("click", (e) => {
  // Si l'onglet a un historique, on revient en arrière
  if (window.history.length > 1) {
    e.preventDefault();
    window.history.back();
    return;
  }
  // Sinon, le <a href="./index.html"> servira de fallback
  // (ne pas preventDefault ici)
});
