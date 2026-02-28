// Global Variables
let pattern = [];
let progress = 0;
let inputCount = 0;

function generatePattern() {
  pattern = [];
  for (let i = 0; i < 8; i++) {
    let newButton;
    
    // Prevent more than 2 consecutive repeats
    if (i >= 2 && pattern[i - 1] === pattern[i - 2]) {
      // Last two buttons are the same, pick a different one
      do {
        newButton = Math.floor(Math.random() * 4) + 1;
      } while (newButton === pattern[i - 1]);
    } else {
      // No restriction, any button is fine
      newButton = Math.floor(Math.random() * 4) + 1;
    }
    
    pattern.push(newButton);
  }
  console.log("New pattern:", pattern);
}
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
let allowInput = false;

const clueHoldTime = 1000;
const cluePauseTime = 333;
const nextClueWaitTime = 1000;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

for (let i = 1; i <= 4; i++) {
    const button = document.getElementById("button" + i);
    button.addEventListener("mousedown", function () {
        console.log("You clicked button:", i);
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
        console.log("You tapped button:", i);
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

function startGame() {
    generatePattern();
    progress = 0;
    inputCount = 0;
    gamePlaying = true;
    allowInput = false;
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    playClueSequence();
}

function stopGame() {
    gamePlaying = false;
    allowInput = false;
    inputCount = 0;
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
    
    // Hide status message
    const statusMsg = document.getElementById("statusMessage");
    statusMsg.classList.add("hidden");
}

function lightButton(btn) {
    document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
    document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
    if (gamePlaying) {
        console.log("Playing clue for button:", btn);
        lightButton(btn);
        playTone(btn, clueHoldTime);
        setTimeout(clearButton, clueHoldTime, btn);
    }
}

function playClueSequence() {
  context.resume();
  allowInput = false;
  
  // Show "Watch..." message
  const statusMsg = document.getElementById("statusMessage");
  statusMsg.textContent = "Watch...";
  statusMsg.classList.remove("hidden");
  
  let delay = nextClueWaitTime;
  for (let i = 0; i <= progress; i++) {
    setTimeout(playSingleClue, delay, pattern[i]);
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  // wait for last clue to fully finish before allowing input
  setTimeout(() => { 
    allowInput = true;
    statusMsg.textContent = "Your turn!";
    console.log("player can now input");
  }, delay + 200);
}

function guess(btn) {
    console.log("guess called, btn:", btn, "allowInput:", allowInput, "progress:", progress, "inputCount:", inputCount);

    if (!gamePlaying || !allowInput) return;

    // Check if the button matches the next expected button in the sequence
    if (pattern[inputCount] !== btn) {
        console.log("wrong! expected", pattern[inputCount], "got", btn);
        stopGame();
        alert("Wrong button. The earth resets.");
        return;
    }

    inputCount++;
    console.log("correct! inputCount now:", inputCount, "need:", progress + 1);

    // Check if player has completed the current round
    if (inputCount > progress) {
        progress++;
        inputCount = 0;
        
        if (progress === pattern.length) {
            stopGame();
            alert("You did it. Pattern complete.");
            return;
        }
        
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
  // Only register the button if input is allowed (prevents clicks during clue sequence)
  if (allowInput) {
    window.activeBtn = btn;
  }
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
  if (window.activeBtn !== null && window.activeBtn !== undefined) {
    guess(window.activeBtn);
    window.activeBtn = null;
  }
} 