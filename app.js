const rows = [
  ["H", "A", "T", "E"],
  ["L", "A", "T", "E"],
  ["L", "I", "T", "E"],
  ["L", "I"],
  ["L", "O", "V", "E"]
];

const ladderBoard = document.getElementById("ladderBoard");

rows.forEach((row, index) => {
  const rowEl = document.createElement("div");
  rowEl.className = `ladder-row ${index === 1 || index === 2 ? "active" : ""} ${row.length < 4 ? "tiny" : ""} ${index === rows.length - 1 ? "target" : ""} ${index === 0 ? "start" : ""}`;

  row.forEach((letter) => {
    const box = document.createElement("span");
    box.className = "letter-box";
    box.textContent = letter;
    rowEl.appendChild(box);
  });

  ladderBoard.appendChild(rowEl);
});

const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

const keyboard = document.getElementById("keyboard");
keyboardLayout.forEach((row) => {
  const rowEl = document.createElement("div");
  rowEl.className = "keyboard-row";

  row.forEach((key) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `key ${key === "ENTER" || key === "⌫" ? "wide" : ""}`;
    btn.textContent = key;
    rowEl.appendChild(btn);
  });

  keyboard.appendChild(rowEl);
});

const playToggle = document.querySelector(".plus-button");
playToggle.addEventListener("click", () => {
  const panel = document.querySelector(".howto-panel");
  panel.classList.toggle("expanded");
  const isExpanded = panel.classList.contains("expanded");
  playToggle.textContent = isExpanded ? "−" : "+";
  panel.setAttribute("aria-expanded", String(isExpanded));
});
