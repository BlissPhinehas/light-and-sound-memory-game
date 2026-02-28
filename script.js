const lossActions = [
  {
    fact: "Over 8 million tons of plastic enter the ocean every year — most of it from land-based sources.",
    action: "Next time you're outside, pick up 5 pieces of trash. It takes 2 minutes and it adds up.",
    link: null
  },
  {
    fact: "The average American generates about 4.4 pounds of trash per day. Less than a quarter of it gets recycled.",
    action: "Start a recycling habit at home — separate paper, plastic and glass before your next trash day.",
    link: null
  },
  {
    fact: "A single plastic bag can take up to 1,000 years to decompose in a landfill.",
    action: "Switch to reusable bags. Most grocery stores sell them for under $2.",
    link: null
  },
  {
    fact: "Forests absorb about 2.6 billion tons of CO2 every year — but we lose 15 billion trees annually.",
    action: "Plant a tree or sponsor one through a verified program.",
    link: { text: "Volunteer with The Nature Conservancy", url: "https://www.nature.org/en-us/get-involved/how-to-help/volunteer/" }
  },
  {
    fact: "The ocean produces over 50% of the world's oxygen, but rising temperatures are bleaching coral reefs at record rates.",
    action: "Support ocean conservation by joining a local beach cleanup or donating to a verified org.",
    link: { text: "Ocean Conservancy Volunteer Programs", url: "https://oceanconservancy.org/trash-free-seas/international-coastal-cleanup/volunteer/" }
  },
  {
    fact: "Food waste is the single largest category of material in US landfills, making up 24% of all waste.",
    action: "Start composting your food scraps. Even a small bin on your counter makes a difference.",
    link: null
  },
  {
    fact: "Air pollution kills an estimated 7 million people per year — more than malaria, AIDS and tuberculosis combined.",
    action: "Advocate for cleaner air in your community by joining a local climate action group.",
    link: { text: "Join Citizens' Climate Lobby", url: "https://citizensclimatelobby.org/join-citizens-climate-lobby/" }
  },
  {
    fact: "Less than 1% of the world's water is accessible fresh water. Most of it is locked in glaciers.",
    action: "Fix leaky faucets at home — a single dripping tap wastes over 3,000 gallons of water a year.",
    link: null
  },
  {
    fact: "Urban green spaces reduce city temperatures by up to 8 degrees and improve mental health significantly.",
    action: "Volunteer to maintain a local park, community garden or green space in your neighborhood.",
    link: { text: "Find a local Sierra Club volunteer opportunity", url: "https://www.sierraclub.org/volunteer" }
  },
  {
    fact: "Electronic waste is the fastest growing waste stream in the world. Most of it is never properly recycled.",
    action: "Look up your nearest e-waste drop-off location before throwing out old phones or electronics.",
    link: null
  },
  {
    fact: "Bees pollinate about one third of everything we eat, but populations have declined by nearly 30% in recent decades.",
    action: "Plant native flowers in your yard or a pot on your balcony. Even a small patch helps.",
    link: null
  },
  {
    fact: "Switching to a plant-based diet just one day a week reduces your carbon footprint more than buying local food.",
    action: "Try one plant-based meal this week and see how it feels. Small changes at scale matter.",
    link: null
  }
];

// Shuffle helper and queue for loss actions (avoids repeats)
let lossActionQueue = [];
function getNextLossAction() {
  if (lossActionQueue.length === 0) {
    // Reshuffle when exhausted
    lossActionQueue = [...lossActions];
    for (let i = lossActionQueue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lossActionQueue[i], lossActionQueue[j]] = [lossActionQueue[j], lossActionQueue[i]];
    }
  }
  return lossActionQueue.pop();
}

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
  addToPattern(); // start with one step
}

function addToPattern() {
  let next;
  const len = pattern.length;
  do {
    next = Math.floor(Math.random() * 4) + 1;
  } while (len >= 2 && next === pattern[len-1] && next === pattern[len-2]);
  pattern.push(next);
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

function showMessage(msg, type) {
  messageText.textContent = msg;
  const actionBox = document.getElementById("messageAction");
  const msgBtn = document.getElementById("messageBtn");

  if (type === "loss") {
    const item = getNextLossAction();
    actionBox.innerHTML = `
      <p class="action-fact">${item.fact}</p>
      <p class="action-text">${item.action}${item.link 
        ? ` <a href="${item.link.url}" target="_blank">${item.link.text} →</a>` 
        : ""
      }</p>
    `;
    actionBox.style.display = "block";
    msgBtn.style.display = "block";
  } else if (type === "win") {
    actionBox.innerHTML = `
      <p class="action-fact">You remembered the pattern. The planet needs that same attention.</p>
      <p class="action-text">Take that energy outside. <a href="https://www.nature.org/en-us/get-involved/how-to-help/volunteer/" target="_blank">Find a volunteer opportunity near you →</a></p>
    `;
    actionBox.style.display = "block";
    msgBtn.style.display = "block";
  } else {
    // Strike message — hide button and action box
    actionBox.innerHTML = "";
    actionBox.style.display = "none";
    msgBtn.style.display = "none";
  }

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
      showMessage("You lost — but the earth doesn't give up that easily either.", "loss");
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
    progress++;
    addToPattern();
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