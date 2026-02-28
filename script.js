// Global Variables
let pattern = [2, 2, 4, 3, 2, 1, 2, 4];
let progress = 0;
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;
const clueHoldTime = 1000;
const cluePauseTime = 333;
const nextClueWaitTime = 1000;

// Store the start and stop buttons
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function startGame() {
    progress = 0;
    gamePlaying = true;
    startBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    playClueSequence();
}

function stopGame() {
    gamePlaying = false;
    startBtn.classList.remove("hidden");
    stopBtn.classList.add("hidden");
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
    let delay = nextClueWaitTime;
    for (let i = 0; i <= progress; i++) {
        setTimeout(playSingleClue, delay, pattern[i]);
        delay += clueHoldTime;
        delay += cluePauseTime;
    }
}

function guess(btn) {
    if (!gamePlaying) return;

    if (pattern[progress] !== btn) {
        stopGame();
        alert("Wrong button. The earth resets.");
        return;
    }

    if (progress === pattern.length - 1) {
        stopGame();
        alert("You did it. Pattern complete.");
        return;
    }

    progress++;
    playClueSequence();
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
    tonePlaying = true;
    const osc = context.createOscillator();
    osc.connect(gainNode);
    osc.type = "sine";
    osc.frequency.value = freqMap[btn];
    osc.start(context.currentTime);
    gainNode.gain.setTargetAtTime(volume, context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(0, context.currentTime + len / 1000, 0.01);
    osc.stop(context.currentTime + (len / 1000) + 0.5);
    tonePlaying = false;
}

function startTone(btn) {
    if (!tonePlaying) {
        context.resume();
        tonePlaying = true;
        const osc = context.createOscillator();
        osc.connect(gainNode);
        osc.type = "sine";
        osc.frequency.value = freqMap[btn];
        osc.start(context.currentTime);
        gainNode.gain.setTargetAtTime(volume, context.currentTime, 0.01);
        window.currentOscillator = osc;
    }
}

function stopTone() {
    gainNode.gain.setTargetAtTime(0, context.currentTime, 0.01);
    if (window.currentOscillator) {
        window.currentOscillator.stop(context.currentTime + 0.05);
        window.currentOscillator = null;
    }
    tonePlaying = false;
}