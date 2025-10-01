// ===== KONSTANTY PRO ANIMACE =====
const TYPING_SPEED = 40;      // Rychlost psaní (ms na znak)
const DELETING_SPEED = 70;    // Rychlost mazání (ms na znak)
const LINE_DELAY = 250;       // Zpoždění mezi řádky (ms)
const PHRASE_PAUSE = 2000;    // Pauza mezi frázemi (ms)

// ===== TYPEWRITER EFEKT =====
// Rotující typewriter efekt pro hero sekci s více větami
const nameText = "Jan Zatloukal";
const phrases = [
  { text: "Python · Flask · Django · SQL" },    // Backend technologie
  { text: "HTML · CSS · JavaScript" },          // Frontend technologie  
  { text: "Git & GitHub · Deployment" }         // Nástroje a deployment
];
const nameElem = document.querySelector('#name-text');
const claimElem = document.querySelector('#claim-text');

// Nastavit jméno rovnou
nameElem.textContent = nameText;

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex].text;
  if (!deleting) {
    claimElem.innerHTML = `<span class="code-style">${currentPhrase.substring(0, charIndex + 1)}</span>`;
    charIndex++;
    if (charIndex === currentPhrase.length) {
      deleting = true;
      setTimeout(typeEffect, PHRASE_PAUSE); // pauza před mazáním
      return;
    }
  } else {
    claimElem.innerHTML = `<span class="code-style">${currentPhrase.substring(0, charIndex - 1)}</span>`;
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, deleting ? TYPING_SPEED : DELETING_SPEED);
}

// ===== POMOCNÁ FUNKCE =====
function typeWriterLine(line, element, speed, callback) {
  let charPos = 0;
  function typeChar() {
    if (charPos < line.length) {
      const current = element.textContent.replace(/▌$/, '');
      element.textContent = current + line[charPos] + '▌';
      charPos++;
      setTimeout(typeChar, speed);
    } else {
      element.textContent = element.textContent.replace(/▌$/, '') + '\n';
      if (callback) callback();
    }
  }
  typeChar();
}

// ===== HLAVNÍ TERMINÁL =====
const terminalOutput = document.getElementById("terminal-output");
const demoLines = [
  '>>> python portfolio.py',
  '[INFO]  Načítám knihovny... hotovo.',
  '[INFO]  Připojuji se k databázi nápadů...',
  '[INFO]  Kompiluji životní příběh...',
  '[INFO]  Spouštím unit testy: 42 prošlo, 0 selhalo ✅',
  '',
  '[SUCCESS] Aplikace úspěšně nasazena! ✅',
  '[OUTPUT] Výsledek: Uživatelská zkušenost +100',
  '[OUTPUT] Mission accomplished bez jediného bugu 🐞',
  '[OUTPUT] Varování: příliš mnoho kofeinu zjištěno ☕',
  '[OUTPUT] Poznámka: Python > všechno ostatní 🐍'
];
const runBtn = document.getElementById("run-terminal");

// --- Terminal animation fix: Only one instance runs at a time ---
let typingTimeout;
let typingInterval;

function runTerminalDemo() {
  clearTimeout(typingTimeout);
  clearInterval(typingInterval);
  terminalOutput.textContent = ''; // vždy úplně čistý start
  runBtn.style.display = "none";

  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex < demoLines.length) {
      typeWriterLine(demoLines[lineIndex], terminalOutput, TYPING_SPEED, () => {
        lineIndex++;
        setTimeout(typeNextLine, LINE_DELAY);
      });
    }
  }
  typeNextLine();
}

if (runBtn) {
  runBtn.addEventListener("click", runTerminalDemo);
}

// ===== PROJEKTY TERMINÁL =====
const projectsTerminalOutput = document.getElementById("projects-terminal-output");
const runProjectsBtn = document.getElementById("run-projects-terminal");

// Náhodné přístupové hlášky pro terminál projektů
const accessMessages = [
  '[ACCESS GRANTED] Identita ověřena: Jan Zatloukal. Zahajuji načítání...',
  '[SECURITY] Autentizace OK. Otevírám projektový vault.',
  '[OK] Token validní. Stahování seznamu projektů...',
  '[AUTH] Ověření dokončeno — spuštění modulu projects.load()',
  '[SYS] Přihlášení potvrzeno. Inicializuji zobrazení projektů.',
  '[TRACE] Identita shodná. Přesměrování do sandboxu projektů.',
  '[ROOT] Přístup povolen — probíhá dešifrování manifestu.',
  '[NET] Připojeno k repozitáři. Parsování projektů...',
  '[DAEMON] Služba projectsd aktivní. Vykresluji položky.',
  '[OK] Autorizace: SUCCESS. Získávám metadata projektů.',
  '[SEC] Checksum OK — obsah bude vystaven.',
  '[BOOT] Projektový režim: odemčeno. Připravte se na výpis.'
];

// Přístupový prompt před projekty
const accessPrompt = [
  '>>> run projects.py',
  '[INFO] Pro odemčení projektů musíte znát jméno autora.',
  '[TIP] Stačí opsat celé jméno z horní části stránky.',
  '[INPUT] Zadejte celé jméno:'
];

const projectLines = [
  '[INFO] Načítám seznam projektů...',
  '[OK] 1) Subly – správa předplatného',
  '[OK] 2) Password Manager – generátor a správce hesel',
  '[SUCCESS] Projekty úspěšně načteny!'
];

function runProjectsDemo() {
  projectsTerminalOutput.textContent = '';
  runProjectsBtn.style.display = "none";
  showAccessPrompt();
}

function showAccessPrompt() {
  let promptIndex = 0;

  function typePromptLine() {
    if (promptIndex < accessPrompt.length) {
      typeWriterLine(accessPrompt[promptIndex], projectsTerminalOutput, TYPING_SPEED, () => {
        promptIndex++;
        setTimeout(typePromptLine, LINE_DELAY);
      });
    } else {
      validateAccessInput();
    }
  }
  typePromptLine();
}

function validateAccessInput() {
  // Nejprve odstraníme případný předchozí input (pro opakované spuštění)
  const prevInput = projectsTerminalOutput.querySelector('input.terminal-input');
  prevInput?.remove();
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Zadejte jméno...";
  input.classList.add("terminal-input");
  projectsTerminalOutput.appendChild(input);
  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const enteredName = input.value.trim();
      input.remove();
      projectsTerminalOutput.textContent += `[USER] ${enteredName}\n`;

      if (enteredName.toLowerCase() === "jan zatloukal") {
        // Náhodná hláška před výpisem projektů
        const randomMsg = accessMessages[Math.floor(Math.random() * accessMessages.length)];
        projectsTerminalOutput.textContent += randomMsg + '\n';
        printProjects();
      } else {
        projectsTerminalOutput.textContent += "[ERROR] Přístup zamítnut.\n";
        setTimeout(validateAccessInput, 500);
      }
    }
  });
}

function printProjects() {
  let lineIndex = 0;

  function typeProjectLine() {
    if (lineIndex < projectLines.length) {
      typeWriterLine(projectLines[lineIndex], projectsTerminalOutput, TYPING_SPEED, () => {
        lineIndex++;
        setTimeout(typeProjectLine, LINE_DELAY);
      });
    } else {
      const projectsGrid = document.querySelector('.projects-grid');
      if (projectsGrid) {
        projectsGrid.classList.add('show-projects');
      }
    }
  }
  typeProjectLine();
}

if (runProjectsBtn) {
  runProjectsBtn.addEventListener("click", runProjectsDemo);
}

// ===== Animace na scroll =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.reveal-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, index * 150); // stagger efekt
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(reveal => observer.observe(reveal));

// ===== FLIP KARTY FUNKCIONALITA =====
// Inicializace flip karet po načtení DOM
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      // Přepnutí třídy flipped
      card.classList.toggle('flipped');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  typeEffect();
  // typeTerminal(); // Animace terminálu už se nespouští automaticky
});
