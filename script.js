// Fun facts about nature — obscure and genuinely surprising
const facts = [
  "Wood is the rarest resource in the universe. It only exists where life has evolved to create trees—so far, only on Earth.",
  "Trees in a forest share nutrients with each other through a underground fungal network scientists call the Wood Wide Web.",
  "The immortal jellyfish (Turritopsis dohrnii) can revert to its juvenile form after becoming sexually mature, making it potentially immortal.",
  "There are plants that can hear. The South African plant 'sensitive mimosa' folds its leaves when it hears the sound of a caterpillar chewing.",
  "The ocean's deepest point, Challenger Deep, is so remote that more people have walked on the moon than have visited it.",
  "A single teaspoon of healthy soil contains more living organisms than there are humans on Earth.",
  "Sharks are older than trees. They have existed for over 450 million years, trees for only 350 million.",
  "The Amazon rainforest creates its own weather system — it generates half of its own rainfall.",
  "A bee must visit approximately two million flowers to produce one pound of honey.",
  "Glaciers store about 69% of the world's fresh water. At current rates, most will be gone by 2100.",
  "Whales communicate in songs that can travel thousands of miles through the ocean.",
  "A single mature oak tree can support over 500 different species of insects, birds and mammals.",
  "The blue whale's heartbeat is so loud it can be detected from two miles away.",
  "The fungus Armillaria ostoyae in Oregon is the largest living organism on Earth, covering nearly 4 square miles underground.",
  "The mantis shrimp can see colors that humans can't even imagine, with 16 types of color-receptive cones in their eyes.",
  "The tardigrade, or water bear, can survive in space, boiling water, and even radiation that would kill most life.",
  "The axolotl, a Mexican salamander, can regrow entire limbs, parts of its heart, and even parts of its brain.",
  "The Sahara Desert was once a lush, green area with lakes and forests.",
  "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
  "A day on Mercury is longer than its year.",
  "Some turtles can breathe through their butts!"
];

let currentFact = 0;

// cycles through facts with a fade transition
function rotateFact() {
  const factEl = document.getElementById("factText");
  factEl.classList.add("fade");
  setTimeout(() => {
    currentFact = (currentFact + 1) % facts.length;
    factEl.textContent = facts[currentFact];
    factEl.classList.remove("fade");
  }, 1000);
}

// initialize first fact and start rotation
function initFacts() {
  const factEl = document.getElementById("factText");
  factEl.textContent = facts[0];
  setInterval(rotateFact, 90000);
}

initFacts();

// Particle background — slow floating particles like spores or dust
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speedY: Math.random() * 0.3 + 0.1,
    speedX: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.3 + 0.05
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(76, 175, 80, ${p.opacity})`;
    ctx.fill();
    p.y -= p.speedY;
    p.x += p.speedX;
    if (p.y < -5) {
      p.y = canvas.height + 5;
      p.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawParticles);
}

drawParticles();
// Global Variables
let pattern = [];
let progress = 0;
let guessCounter = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
let allowInput = false;
let strikes = 0;
const maxStrikes = 3;

const clueHoldTime = 1000;
const cluePauseTime = 333;
const nextClueWaitTime = 1000;

// DOM references
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusText = document.getElementById("statusText");
const roundCounter = document.getElementById("roundCounter");
const strikeCounter = document.getElementById("strikeCounter");
const gameMessage = document.getElementById("gameMessage");
const messageText = document.getElementById("messageText");
const bestScoreDisplay = document.getElementById("bestScore");
let bestScore = Number(localStorage.getItem("ecoMemoryBest")) || 0;

function updateBestScore() {
  if (progress > bestScore) {
    bestScore = progress;
    localStorage.setItem("ecoMemoryBest", bestScore);
    bestScoreDisplay.textContent = "Best — " + bestScore;
    bestScoreDisplay.classList.add("new-record");
  } else {
    bestScoreDisplay.classList.remove("new-record");
  }
}

function generatePattern() {
  pattern = [];
  for (let i = 0; i < 8; i++) {
    let next;
    do {
      next = Math.floor(Math.random() * 4) + 1;
    } while (i >= 2 && next === pattern[i-1] && next === pattern[i-2]);
    pattern.push(next);
  }
}

function startGame() {
  generatePattern();
  progress = 0;
  strikes = 0;
  gamePlaying = true;
  allowInput = false;
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  roundCounter.classList.remove("hidden");
  strikeCounter.classList.remove("hidden");
  bestScoreDisplay.classList.remove("hidden");
  bestScoreDisplay.textContent = "Best — " + bestScore;
  updateCounters();
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  allowInput = false;
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  roundCounter.classList.add("hidden");
  strikeCounter.classList.add("hidden");
  bestScoreDisplay.classList.add("hidden");
  statusText.textContent = "";
  statusText.classList.remove("active");
}

function updateCounters() {
  roundCounter.textContent = "Round " + (progress + 1);
  strikeCounter.textContent = "Strikes — " + strikes + " / " + maxStrikes;
  if (strikes >= 2) {
    strikeCounter.classList.add("warn");
  } else {
    strikeCounter.classList.remove("warn");
  }
}

function showMessage(msg) {
  messageText.textContent = msg;
  gameMessage.classList.remove("hidden");
}

function dismissMessage() {
  gameMessage.classList.add("hidden");
  setTimeout(() => {
    startGame();
  }, 100); // slight delay to ensure overlay is hidden before game starts
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  context.resume();
  allowInput = false;
  window.activeBtn = null;
  statusText.textContent = "Watch.";
  statusText.classList.remove("active");
  let delay = nextClueWaitTime;
  for (let i = 0; i <= progress; i++) {
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  setTimeout(() => {
    allowInput = true;
    guessCounter = 0;
    statusText.textContent = "Your turn.";
    statusText.classList.add("active");
  }, delay);
}

function guess(btn) {
  if (!gamePlaying || !allowInput) return;

  if (pattern[guessCounter] !== btn) {
    strikes++;
    updateCounters();
    if (strikes >= maxStrikes) {
      stopGame();
      showMessage("The earth resets. You ran out of chances.");
      return;
    }
    showMessage("Wrong step. " + (maxStrikes - strikes) + " chance" + (maxStrikes - strikes === 1 ? "" : "s") + " remaining.");
    // let them retry the same round
    setTimeout(() => {
      gameMessage.classList.add("hidden");
      gamePlaying = true;
      guessCounter = 0;
      playClueSequence();
    }, 2000);
    return;
  }

  guessCounter++;
  if (guessCounter > progress) {
    if (progress === pattern.length - 1) {
      stopGame();
      showMessage("Pattern complete. The earth remembers those who listen.");
      return;
    }
    progress++;
    updateBestScore();
    updateCounters();
    playClueSequence();
  }
}

// Sound synthesis
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const gainNode = context.createGain();
gainNode.connect(context.destination);
gainNode.gain.setValueAtTime(0, context.currentTime);

const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2
};

function playTone(btn, len) {
  const osc = context.createOscillator();
  osc.connect(gainNode);
  osc.type = "sine";
  osc.frequency.value = freqMap[btn];
  osc.start(context.currentTime);
  gainNode.gain.setTargetAtTime(volume, context.currentTime, 0.01);
  gainNode.gain.setTargetAtTime(0, context.currentTime + len / 1000, 0.01);
  osc.stop(context.currentTime + (len / 1000) + 0.5);
}

function startTone(btn) {
  if (tonePlaying) return;
  context.resume();
  tonePlaying = true;
  window.activeBtn = btn;
  const osc = context.createOscillator();
  osc.connect(gainNode);
  osc.type = "sine";
  osc.frequency.value = freqMap[btn];
  osc.start(context.currentTime);
  gainNode.gain.setTargetAtTime(volume, context.currentTime, 0.01);
  window.currentOscillator = osc;
}

function stopTone() {
  gainNode.gain.setTargetAtTime(0, context.currentTime, 0.01);
  if (window.currentOscillator) {
    window.currentOscillator.stop(context.currentTime + 0.05);
    window.currentOscillator = null;
  }
  tonePlaying = false;
  const btn = window.activeBtn;
  window.activeBtn = null;
  if (btn !== null && btn !== undefined && gamePlaying && allowInput) {
    guess(btn);
  }
}

for (let i = 1; i <= 4; i++) {
  const button = document.getElementById("button" + i);
  button.addEventListener("mousedown", function () {
    startTone(i);
  });
  button.addEventListener("mouseup", function () {
    stopTone();
  });
  button.addEventListener("mouseleave", function () {
    stopTone();
  });
  button.addEventListener("touchstart", function (event) {
    event.preventDefault();
    startTone(i);
  }, { passive: false });
  button.addEventListener("touchend", function (event) {
    event.preventDefault();
    stopTone();
  });
  button.addEventListener("touchcancel", function () {
    stopTone();
  });
}