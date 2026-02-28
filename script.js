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