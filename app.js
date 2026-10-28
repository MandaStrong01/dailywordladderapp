const ladders = [
  {
    start: "COLD",
    target: "WARM",
    solution: ["COLD", "CORD", "CARD", "WARD", "WARM"],
  },
  {
    start: "HEAD",
    target: "TAIL",
    solution: ["HEAD", "HEAL", "TEAL", "TELL", "TALL", "TAIL"],
  },
  {
    start: "LAMP",
    target: "BOLT",
    solution: ["LAMP", "LIMP", "LIME", "TIME", "TIME", "TONE", "BONE", "BOLT"],
  },
  {
    start: "RAIN",
    target: "SNOW",
    solution: ["RAIN", "RAIN", "ROIN", "SOIN", "SNOW"],
  },
  {
    start: "WIND",
    target: "COLD",
    solution: ["WIND", "WINE", "WONE", "CONE", "COLD"],
  },
];

const validWords = new Set(
  [
    "COLD",
    "CORD",
    "CARD",
    "WARD",
    "WARM",
    "HEAD",
    "HEAL",
    "TEAL",
    "TELL",
    "TALL",
    "TAIL",
    "LAMP",
    "LIMP",
    "LIME",
    "TIME",
    "TONE",
    "BONE",
    "BOLT",
    "RAIN",
    "ROIN",
    "SOIN",
    "SNOW",
    "WIND",
    "WINE",
    "WONE",
    "CONE",
    "COLD",
    "SAND",
    "BAND",
    "BEND",
    "BONE",
    "DONE",
    "DONE",
    "TONE",
    "BONE",
    "BOLT",
    "BLOT",
    "BLOT",
    "CLOT",
    "CLOT",
    "CLOT",
    "COAT",
    "BOAT",
    "GOAT",
    "GOAD",
    "GOLD",
    "GOLD",
    "HOLD",
    "WOLD",
    "WORLD",
    "WORL", 
  ].filter(Boolean)
);

const dateLabel = document.getElementById("dateLabel");
const startWordEl = document.getElementById("startWord");
const goalWordEl = document.getElementById("goalWord");
const currentPathEl = document.getElementById("currentPath");
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const statusEl = document.getElementById("status");
const wordBankEl = document.getElementById("wordBank");
const resetButton = document.getElementById("resetButton");
const solutionButton = document.getElementById("solutionButton");

let currentChallenge = null;
let currentPath = [];

function getDailyChallenge() {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return ladders[dayIndex % ladders.length];
}

function isOneLetterAway(a, b) {
  if (a.length !== b.length) return false;

  let differences = 0;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) differences += 1;
  }

  return differences === 1;
}

function updateDateLabel() {
  const date = new Date();
  dateLabel.textContent = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function renderWordBank() {
  const words = new Set(
    [...validWords].filter((word) => word.length === currentChallenge.start.length)
  );

  wordBankEl.innerHTML = "";
  [...words].sort().forEach((word) => {
    const chip = document.createElement("span");
    chip.className = "bank-word";
    chip.textContent = word;
    wordBankEl.appendChild(chip);
  });
}

function renderPath() {
  currentPathEl.innerHTML = "";

  if (currentPath.length === 0) {
    currentPathEl.innerHTML = '<span class="placeholder">Start by adding a word.</span>';
    return;
  }

  currentPath.forEach((word) => {
    const token = document.createElement("span");
    token.className = "path-token";
    token.textContent = word;
    currentPathEl.appendChild(token);
  });
}

function setStatus(message, kind = "") {
  statusEl.textContent = message;
  statusEl.className = "status";

  if (kind) {
    statusEl.classList.add(kind);
  }
}

function resetCurrentPath() {
  currentPath = [currentChallenge.start];
  renderPath();
  setStatus("The challenge is ready. Build your ladder step by step.", "warning");
}

function addWordToPath(inputWord) {
  const submitted = inputWord.trim().toUpperCase();

  if (!submitted) {
    setStatus("Please enter a word.", "error");
    return;
  }

  if (submitted.length !== currentChallenge.start.length) {
    setStatus(`Word must be ${currentChallenge.start.length} letters long.`, "error");
    return;
  }

  if (!validWords.has(submitted)) {
    setStatus(`"${submitted}" is not in the word bank. Try another word.`, "error");
    return;
  }

  const lastWord = currentPath[currentPath.length - 1];

  if (!isOneLetterAway(lastWord, submitted)) {
    setStatus(`"${submitted}" is not one letter away from "${lastWord}".`, "error");
    return;
  }

  currentPath.push(submitted);
  renderPath();

  if (submitted === currentChallenge.target) {
    setStatus("You solved it! Great work.", "success");
    return;
  }

  setStatus("Nice move. Keep going!", "warning");
}

function showSolution() {
  currentPath = [...currentChallenge.solution];
  renderPath();
  setStatus("Here is the winning ladder.", "success");
}

function initializeGame() {
  currentChallenge = getDailyChallenge();
  currentPath = [currentChallenge.start];

  startWordEl.textContent = currentChallenge.start;
  goalWordEl.textContent = currentChallenge.target;
  updateDateLabel();
  renderWordBank();
  renderPath();
  setStatus("The challenge is ready. Build your ladder step by step.", "warning");
}

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addWordToPath(guessInput.value);
  guessInput.value = "";
  guessInput.focus();
});

resetButton.addEventListener("click", () => {
  resetCurrentPath();
  guessInput.focus();
});

solutionButton.addEventListener("click", () => {
  showSolution();
});

initializeGame();

