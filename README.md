# Pre-work - *EcoMemory*

**EcoMemory** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Bliss Phinehas**

Time spent: **[11]** hours spent in total

Link to project: [https://BlissPhinehas.github.io/light-and-sound-memory-game]
## Video Walkthrough

Here's a walkthrough of implemented user stories:

**User losing the game:**

[[Loom Link  Fail Demo](https://www.loom.com/share/f9c151de85134c109ee654bdee61baea)]

**User winning the game:**

[[Loom Link Win Demo](https://www.loom.com/share/99a287d98a6641209e2137aa03bf3bdc)]

## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/7bfa13dfd66d4c3394f65b0136724ea6)

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked
- [x] Game buttons each light up and play a sound when clicked
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) have been styled differently than in the tutorial
- [x] Buttons use a b lighter color version of the same color while playing
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g., shape, gradient, etc.)
- [x] Game button sound is more complex than a single tone (e.g., chord, sound file, etc.)
- [x] User has a limited amount of time to enter their guess on each turn
- [x] Players can now choose between "Endless Mode" and "Fixed Rounds Mode".
- [x] In "Fixed Rounds Mode", players can specify the number of rounds they want to play.

The following **additional** features are implemented:

- [x] Endless mode — the pattern grows until you lose, no fixed limit
- [x] Personal best score that persists across sessions using localStorage
- [x] Styled loss overlay with actionable environmental facts and volunteer suggestions
- [x] Rotating nature facts displayed throughout gameplay
- [x] Animated particle background
- [x] Color-blind accessible — unique shape icons on each button (circle, square, triangle, star)
- [x] Environmental awareness theme with curated facts
- [x] Game button appearance change goes beyond color (e.g., shape, gradient, etc.)
- [x] Game button sound is more complex than a single tone (e.g., chord, sound file, etc.)
- [x] User has a limited amount of time to enter their guess on each turn
- [x] Players can now choose between "Endless Mode" and "Fixed Rounds Mode".
- [x] In "Fixed Rounds Mode", players can specify the number of rounds they want to play.


## Reflection Questions

### 1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.

- [MDN Web Docs — Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MDN Web Docs — setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [MDN Web Docs — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Google Fonts — Inter & Playfair Display](https://fonts.google.com)
- [favicon.io](https://favicon.io)

### 2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

The most frustrating challenge I ran into was a bug where every button press was registering 
multiple guesses at the same time. The game would fail me instantly on moves I knew were correct, 
and I couldn't figure out why. When I opened the console and added logs to the guess function, 
I could see it firing three or four times per click, each one with a different value of 
`allowInput`, which meant some were being counted and some weren't, completely at random.

The root cause turned out to be that I had three separate event handlers on each button — 
`onmousedown`, `onmouseup`, and `onclick`, and all three were triggering the guess function 
in sequence on a single press. I had assumed only one would fire at a time, but that's not 
how the browser handles it.

The fix required rethinking how input was being registered. Instead of calling `guess` on press, 
I moved it to the moment the player releases the button inside `stopTone`. I also used a local 
variable to capture which button was active before clearing it, because I found that the value 
was sometimes disappearing before the function could read it, a race condition I hadn't 
anticipated. Once both of those changes were in place, each press registered exactly once 
and the game played correctly.

What I took away from this was that debugging isn't just about finding the error — it's about 
understanding why your assumptions about how something works were wrong in the first place. 
I assumed events fired one at a time. They don't. Once I understood that, the fix was straightforward.

### 3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

Working with the Web Audio API raised a lot of questions for me about how browsers handle 
real-time processes. I was creating a new oscillator every time a button was pressed, which 
works fine for a small game but feels like it could become a problem in something more complex. 
I'd like to understand more about how audio context management works at scale and whether 
there's a cleaner pattern for reusing audio nodes rather than creating and discarding them.

I also want to understand JavaScript's event loop more deeply. This project made it clear that I had surface-level knowledge of how timing and async code works, but the bugs I ran into showed me there's a lot more going on underneath. I'd like to go deeper on how `setTimeout`, event handlers, and state updates interact with each other — especially in situations where timing is critical.

More broadly, I'm curious about how larger applications manage state. In this project I used global variables, which worked fine, but I can already see how that would get messy in something bigger. I want to learn more about state management patterns and when frameworks like React start making sense versus just using vanilla JavaScript.

### 4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)

If I had a few more hours to work on this project, I would focus on the following improvements:

1. **Dynamic Difficulty Scaling**: I would implement a feature where the game dynamically adjusts its difficulty based on the player's performance. For example, the clue sequence could speed up or the time allowed for user input could decrease as the player progresses.

2. **Enhanced Visual Feedback**: I would add more engaging visual effects, such as button animations and transitions, to make the game more immersive. For instance, buttons could pulse or glow when activated.

3. **Expanded Accessibility Features**: I would further enhance accessibility by adding support for screen readers and ensuring the game is fully navigable using only a keyboard or assistive devices.

4. **Leaderboard Integration**: I would add a leaderboard feature to allow players to compete for high scores. This would encourage replayability and add a competitive element to the game.

5. **Code Refactoring**: I would refactor the codebase to improve maintainability. This includes modularizing the game logic, grouping related functions, and using modern JavaScript patterns to make the code easier to extend in the future.

These improvements would enhance the user experience, make the game more engaging, and ensure the codebase is robust and scalable for future updates.

---


## How to Play

1. Press **Start**
2. Watch the sequence of buttons light up and listen to their tones
3. When the status reads *Your turn*, repeat the sequence by clicking the buttons in order
4. Each correct round adds one more step to the pattern
5. You have 3 strikes per game, use them wisely

---

## The Four Elements

Each button represents one of four natural elements, each with its own color, tone, and shape for accessibility:

| Button | Element | Color | Shape |
|--------|---------|-------|-------|
| 1 | Earth | Emerald green | Circle |
| 2 | Water | Deep ocean blue | Square |
| 3 | Fire | Amber | Triangle |
| 4 | Wind | Crimson | Star |

---

## Theme: Environmental Awareness

Environmental awareness felt like the right theme because it's a cause that actually matters. 
Climate change and biodiversity loss don't affect everyone equally, underrepresented 
communities often bear the worst of it while having the least say in what gets done about it. 
Building something small that keeps that conversation present felt worthwhile, even in the context of a memory game.

The nature facts in the game are ones most people haven't heard before. Not the headline statistics, but the quieter details about how the natural world actually works. The kind of facts that stick with you.

---

## Main Functions

### `generatePattern()` / `addToPattern()`
Starts the game with a single random step, then adds one new step each round. Logic prevents the same button from repeating more than twice in a row. The pattern grows indefinitely until the player loses.

### `playClueSequence()`
Iterates through the pattern up to the current round and schedules each clue to play with a calculated delay, so they play one after another rather than all at once. Blocks player input while the sequence is running and opens it up only after the last clue has fully finished.

### `guess(btn)`
Called when the player releases a button, compares their input against the expected value in the pattern. If correct, advances the round; if wrong, increments the strike count. Handles win and loss conditions.

### `startTone(btn)` / `stopTone()`
Manages real-time audio using the Web Audio API. `startTone` creates an oscillator and begins playing a frequency mapped to the button. `stopTone` fades the gain and stops the oscillator, then registers the player's guess on release rather than on press, which prevents double-firing.

### `updateBestScore()`
Compares the current progress against the stored best score in localStorage. If the player beats their record, it saves the new score and highlights it in green.

### `rotateFact()` / `initFacts()`
Cycles through an array of environmental facts every 90 seconds with a fade transition. Facts are displayed at the bottom of the screen throughout the game.

### `drawParticles()`
Renders a canvas-based particle animation in the background — small green dots that drift slowly upward like spores or seeds, giving the page a living, organic quality without being distracting.

### `getNextLossAction()`
Returns the next environmental action/volunteer suggestion from a shuffled queue. Ensures no repeats until all suggestions have been shown, then reshuffles.

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Web Audio API

## License

    Copyright [2026] [Bliss Phinehas]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
