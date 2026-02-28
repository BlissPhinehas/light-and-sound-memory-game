
# light-and-sound-memory-game
Light and Sound Memory Game, Futureforce Tech Launchpad
# EcoMemory

A light and sound memory game built with HTML, CSS, and JavaScript, themed around environmental awareness.

---

## Overview

EcoMemory is a browser-based memory game inspired by the classic Simon toy. The computer plays a sequence of lights and sounds, and the player must repeat it back in the correct order. Each round adds one more step to the sequence. Miss too many times, and the game resets. Complete the full pattern and you win.

The game is built entirely with vanilla HTML, CSS, and JavaScript; no frameworks, no libraries. Just the fundamentals.

---

## How to Play

1. Press **Start**
2. Watch the sequence of buttons light up and listen to their tones
3. When the status reads *Your turn*, repeat the sequence by clicking the buttons in order
4. Each correct round adds one more step to the pattern
5. You have 3 strikes per game, use them wisely

---

## Features

- Randomly generated 8-step pattern every game
- 3-strike system with visual warning on the final chance
- Round counter that updates in real time
- Personal best score that persists across sessions using localStorage
- Styled win and loss overlay, no browser alerts
- Status indicator that tells you when to watch and when to play
- Rotating nature facts that appear while you play
- Animated particle background
- Fully keyboard and mouse accessible

---

## The Four Elements

Each button represents one of four natural elements, each with its own color and tone:

| Button | Element | Color |
|--------|---------|-------|
| 1 | Earth | Emerald green |
| 2 | Water | Deep ocean blue |
| 3 | Fire | Amber |
| 4 | Wind | Crimson |

---

## Theme, Environmental Awareness

## Theme ; Environmental Awareness

Environmental awareness felt like the right theme because it's a cause that actually matters. 
Climate change and biodiversity loss don't affect everyone equally, underrepresented 
communities often bear the worst of it while having the least say in what gets done about it. 
Building something small that keeps that conversation present felt worthwhile, even in the context of a memory game.

The nature facts in the game are ones most people haven't heard before. Not the headline statistics, but the quieter details about how the natural world actually works. The kind of facts that stick with you.

---

## Main Functions

### `generatePattern()`
Builds a random 8-step sequence using integers 1 through 4, with logic to prevent the same button from repeating more than twice in a row. Called at the start of every new game.

### `playClueSequence()`
Iterates through the pattern up to the current round and schedules each clue to play with a calculated delay, so they play one after another rather than all at once. Blocks player input while the sequence is running and opens it up only after the last clue has fully finished.

### `guess(btn)`
Called when the player releases a button, compares their input against the expected value in the pattern. If correct, advances the round; if wrong, increments the strike count. Handles win and loss conditions.

### `startTone(btn)` / `stopTone()`
Manages real-time audio using the Web Audio API. `startTone` creates an oscillator and begins playing a frequency mapped to the button. `stopTone` fades the gain and stops the oscillator, then registers the player's guess on release rather than on press, this prevents double-firing.

### `updateBestScore()`
Compares the current progress against the stored best score in localStorage. If the player beats their record, it saves the new score and highlights it in green.

### `rotateFact()` / `initFacts()`
Cycles through an array of environmental facts every 90 seconds with a fade transition. Facts are displayed at the bottom of the screen throughout the game.

### `drawParticles()`
Renders a canvas-based particle animation in the background — small green dots that drift slowly upward like spores or seeds, giving the page a living, organic quality without being distracting.

---

## Challenges

### 1. The Double-Fire Bug
The most persistent issue during development was that each button press was registering multiple guesses at once. The root cause was that `onmousedown`, `onmouseup`, and `onclick` were all firing in sequence, each triggering the `guess` function separately. The fix was to move the guess registration entirely to `stopTone` — the moment the player releases the button — and use a local variable to capture the active button before clearing it, preventing a race condition where the value disappeared before the function could read it.

### 2. Input Timing
Early on, the window for player input was opening before the last clue had fully finished playing. This meant clicking a button immediately after the sequence ended would either be ignored or count as a wrong answer even if the guess was correct. The fix was to calculate the total duration of the clue sequence — including the hold time of the final clue — and only open input after that full duration had elapsed.

### 3. False Fails
Even after fixing the timing window, correct answers were occasionally being marked as wrong. The issue was a race condition between `allowInput` becoming `true` and the `guess` function checking it. The solution was to add an explicit `gamePlaying && allowInput` check directly inside `stopTone` at the exact moment of button release, rather than relying on a state that could shift between the mousedown and mouseup events.

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Web Audio API

---

## Resources Referenced

- [MDN Web Docs — Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN Web Docs — setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [MDN Web Docs — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Google Fonts — Inter & Playfair Display](https://fonts.google.com)
- [favicon.io](https://favicon.io)

---

*Screenshots and live link coming soon.*