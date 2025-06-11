
const gameScreen = document.getElementById("gameScreen");
const winOverlay = document.getElementById("win");

let contentWidth = 1059;
let contentHeight = 480;

let cols = 12;
let rows = Math.round(cols / (1278 / 579));

let tileWidth = contentWidth / cols;
let tileHeight = contentHeight / rows;
let totalTiles = cols * rows;

let tiles = [];
let selected = [];

function setDifficulty(level) {
  if (level === "facil") cols = 6;
  else if (level === "medio") cols = 9;
  else cols = 12;

  rows = Math.round(cols / (1278 / 579));
  tileWidth = contentWidth / cols;
  tileHeight = contentHeight / rows;
  totalTiles = cols * rows;

  createTiles();
}

function createTiles() {
  tiles = [];
  selected = [];
  gameScreen.innerHTML = "";

  for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = i;

    const x = i % cols;
    const y = Math.floor(i / cols);

    tile.style.width = tileWidth + "px";
    tile.style.height = tileHeight + "px";
    tile.style.backgroundSize = `${contentWidth}px ${contentHeight}px`;
    tile.style.backgroundPosition = `-${x * tileWidth}px -${y * tileHeight}px`;
    tile.dataset.correct = i;

    tiles.push(tile);
  }

  shuffle(tiles);

  for (let i = 0; i < tiles.length; i++) {
    positionTile(tiles[i], i);
    tiles[i].addEventListener("click", () => handleTileClick(tiles[i]));
    gameScreen.appendChild(tiles[i]);
  }
}

function positionTile(tile, index) {
  const x = index % cols;
  const y = Math.floor(index / cols);
  tile.style.left = x * tileWidth + "px";
  tile.style.top = y * tileHeight + "px";
  tile.dataset.current = index;
}

function handleTileClick(tile) {
  if (selected.length === 0) {
    tile.classList.add("selected");
    selected.push(tile);
  } else if (selected.length === 1 && selected[0] !== tile) {
    selected.push(tile);
    swapTiles(selected[0], selected[1]);
    selected.forEach(t => t.classList.remove("selected"));
    selected = [];
    checkWin();
  } else {
    selected[0].classList.remove("selected");
    selected = [];
  }
}

function swapTiles(tileA, tileB) {
  const indexA = parseInt(tileA.dataset.current);
  const indexB = parseInt(tileB.dataset.current);
  positionTile(tileA, indexB);
  positionTile(tileB, indexA);
  tileA.dataset.current = indexB;
  tileB.dataset.current = indexA;
}

function checkWin() {
  const allCorrect = [...gameScreen.children].every(tile =>
    tile.dataset.correct === tile.dataset.current
  );
  if (allCorrect) {
    setTimeout(() => {
      winOverlay.classList.add("show");
      launchConfetti();
    }, 300);
  }
}

function restartGame() {
  winOverlay.classList.remove("show");
  createTiles();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function launchConfetti() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  script.onload = () => {
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };
  document.body.appendChild(script);
}

setDifficulty("dificil");
