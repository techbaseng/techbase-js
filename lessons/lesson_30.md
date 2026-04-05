---
render_with_liquid: false
title: "JavaScript Projects: Five Beginner-Friendly Projects: Counter · Event Listener · To-Do List · Modal Popup · Form Validation"
nav_order: 30
---

> **How to use this tutorial**
> Each project follows the three-phase framework:
> - **Phase 1 – Comprehension:** What it is, why it matters, how every line works
> - **Phase 2 – Practice:** Exercises with real-world scenarios, hints, and self-checks
> - **Phase 3 – Creation:** A full mini-project built stage by stage
>
> Work through each project in order. Concepts from earlier projects are reused in later ones.

---

# TABLE OF CONTENTS

1. [Project 1 – Counter](#project-1--counter)
2. [Project 2 – Event Listener](#project-2--event-listener)
3. [Project 3 – To-Do List](#project-3--to-do-list)
4. [Project 4 – Modal Popup](#project-4--modal-popup)
5. [Project 5 – Form Validation](#project-5--form-validation)
6. [Completion Checklist](#completion-checklist)

# PROJECT 1 – COUNTER

## PHASE 1 — CONCEPTUAL UNDERSTANDING

### What Is a Counter?

A **counter** is a simple interactive program that keeps track of a number and lets the user change it by clicking buttons. You see counters everywhere in real life:

- A shopping cart showing "3 items"
- A YouTube like button showing the like count
- A fitness app counting your reps
- An online ticket booking page counting how many seats you've selected

In JavaScript terms, a counter project teaches you three fundamental skills:

| Skill | What You Learn |
|---|---|
| Variables | Storing and updating a number |
| DOM Manipulation | Displaying that number on the page |
| Event Handling | Responding when a user clicks a button |

---

### Concept 1 — Variables: Storing a Number in Memory

A **variable** is like a labelled box. You put a value inside it, and you can open the box later to read or change the value.

```js
let count = 0;
```

**Line-by-line explanation:**

| Part | Meaning |
|---|---|
| `let` | Declares a variable that can be changed later |
| `count` | The name of the box (you choose this name) |
| `=` | The assignment operator — "put this value into the box" |
| `0` | The starting value (zero, because nothing has been counted yet) |

> 💡 **Why `let` and not `const`?**
> Use `const` when the value will never change (e.g., the number of days in a week). Use `let` when the value will change — and a counter's value definitely changes every time someone clicks. Using `const` for a counter would cause an error.

**Micro-demo — changing a variable:**

```js
let count = 0;
console.log(count);  // Output: 0

count = count + 1;   // Add 1 to whatever is already inside count
console.log(count);  // Output: 1

count = count + 1;
console.log(count);  // Output: 2
```

`count = count + 1` is a very common pattern. It means: "take the current value of `count`, add 1 to it, and store the result back in `count`."

You will also see this written as the **increment shorthand:**

```js
count++;    // Exactly the same as count = count + 1
count--;    // Exactly the same as count = count - 1
```

> 🤔 **Thinking question:** What would happen if you wrote `count = 1` instead of `count = count + 1` inside a click handler? What would be different about how the counter behaves?

---

### Concept 2 — The DOM: Your JavaScript Window Into the Web Page

**DOM** stands for **Document Object Model**. When a browser loads an HTML page, it creates a live "model" of every element on that page — every heading, paragraph, button, and div — as a JavaScript object. You can use JavaScript to read and change any of those objects.

Think of the DOM like a live blueprint of your house. You can look at it and say "change the colour of the living room wall" and the actual room updates instantly.

**How to grab an element from the DOM:**

```js
const display = document.getElementById("counter-display");
```

| Part | Meaning |
|---|---|
| `document` | The whole HTML page |
| `.getElementById()` | A built-in method that searches the page for an element with a matching `id` |
| `"counter-display"` | The id we're looking for — it must match the `id` in the HTML exactly |
| `const display` | We store the found element in a variable so we can use it later |

**Micro-demo — reading and writing to the DOM:**

```html
<!-- HTML -->
<p id="message">Hello</p>
```

```js
// JavaScript
const msg = document.getElementById("message");
console.log(msg.innerText);   // Output: Hello

msg.innerText = "Goodbye";
// The page now shows: Goodbye
```

`innerText` is a **property** of any element. Reading it gives you the current text. Writing to it updates the page instantly.

---

### Concept 3 — Functions: Reusable Blocks of Instructions

A **function** is a named set of instructions. Instead of writing the same code every time, you write it once inside a function and call it whenever needed.

```js
function increment() {
  count++;
  display.innerText = count;
}
```

**Line-by-line:**

| Line | Meaning |
|---|---|
| `function increment()` | Declare a function named `increment` |
| `count++` | Add 1 to the variable `count` |
| `display.innerText = count` | Update the text on the page to show the new value |
| `}` | End of the function |

> 💡 **Real-world analogy:** A function is like a vending machine button. You press "B3" (call the function) and the machine always does the same thing (dispenses the drink). You don't need to understand the internal mechanics every time.

**Micro-demo — calling a function multiple times:**

```js
let count = 0;

function increment() {
  count++;
  console.log("Count is now: " + count);
}

increment();  // Output: Count is now: 1
increment();  // Output: Count is now: 2
increment();  // Output: Count is now: 3
```

---

### Concept 4 — Event Listeners: Responding to Clicks

An **event listener** watches an element and runs a function when something happens to it — like a click, a key press, or a mouse hover.

```js
document.getElementById("increment-btn").addEventListener("click", increment);
```

| Part | Meaning |
|---|---|
| `document.getElementById("increment-btn")` | Find the button on the page |
| `.addEventListener()` | Attach a listener to this element |
| `"click"` | The event we're listening for |
| `increment` | The function to call when the click happens — no parentheses here! |

> ⚠️ **Common Mistake: Don't write `increment()` with parentheses**
> Writing `addEventListener("click", increment)` says "when clicked, run `increment`."
> Writing `addEventListener("click", increment())` says "run `increment` right now, and pass its return value to the listener." This means the function fires immediately when the page loads — not on click. Always omit the parentheses when passing a function as a callback.

---

### Putting It All Together — The Full Counter Project

**HTML structure:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Counter</title>
</head>
<body>

  <h1>Counter</h1>
  <p id="counter-display">0</p>

  <button id="decrement-btn">−</button>
  <button id="reset-btn">Reset</button>
  <button id="increment-btn">+</button>

  <script src="counter.js"></script>
</body>
</html>
```

**JavaScript (counter.js):**

```js
// Step 1: Create a variable to store the count
let count = 0;

// Step 2: Grab the display element from the page
const display = document.getElementById("counter-display");

// Step 3: Define the three functions
function increment() {
  count++;                        // Increase count by 1
  display.innerText = count;      // Update the page
}

function decrement() {
  count--;                        // Decrease count by 1
  display.innerText = count;      // Update the page
}

function reset() {
  count = 0;                      // Set count back to zero
  display.innerText = count;      // Update the page
}

// Step 4: Connect buttons to functions
document.getElementById("increment-btn").addEventListener("click", increment);
document.getElementById("decrement-btn").addEventListener("click", decrement);
document.getElementById("reset-btn").addEventListener("click", reset);
```

**Expected behaviour:**

| User Action | `count` Before | `count` After | Page Shows |
|---|---|---|---|
| Click `+` | 0 | 1 | 1 |
| Click `+` | 1 | 2 | 2 |
| Click `−` | 2 | 1 | 1 |
| Click Reset | 1 | 0 | 0 |

---

### Enhancements — Colour Coding the Counter

A real-world counter often changes colour to show negative, zero, or positive states. This is done by changing the element's `style` property:

```js
function updateDisplay() {
  display.innerText = count;

  if (count > 0) {
    display.style.color = "green";
  } else if (count < 0) {
    display.style.color = "red";
  } else {
    display.style.color = "black";
  }
}

function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}
```

**What changed:** Instead of repeating `display.innerText = count` in every function, we created a helper function `updateDisplay()` that handles both updating the text and changing the colour. This avoids **code duplication** — a key principle in real software development.

> 🤔 **Thinking question:** What would you need to change if the designer decided the positive colour should be blue instead of green? Where would you make that change?

---

## PHASE 2 — APPLIED EXERCISES

### Exercise 1 — Fitness Rep Counter

**Objective:** Build a counter that tracks workout repetitions, prevents the count from going below zero, and shows a motivational message at specific milestones.

**Scenario:** You're building a fitness app. Users tap a button every time they complete a rep. The counter should never show a negative number (you can't do −2 reps). When the user hits 10 reps, show "Great set! Rest now." When they hit 20, show "Amazing! That's two sets!"

**Warm-up mini-example:**

```js
// How to prevent a number from going below zero:
function decrement() {
  if (count > 0) {
    count--;
  }
  // If count is already 0, do nothing
}
```

**Step-by-step instructions:**

1. Create an HTML page with a `<p>` to show the count, an `Add Rep` button, a `Remove Rep` button, and a `Reset` button.
2. Add a `<p id="message">` below the counter for milestone messages.
3. In JavaScript, write the `increment` function. After increasing the count, check: if `count === 10`, set `message.innerText` to "Great set! Rest now." If `count === 20`, set it to "Amazing! That's two sets!" Otherwise, clear the message.
4. In the `decrement` function, only decrease `count` if it is greater than 0.
5. In the `reset` function, reset both `count` and the message.

**Hints:**
- Use `===` (strict equality) to check exact values, not `==`.
- To clear a message: `message.innerText = "";`

**Self-check questions:**
1. What happens if someone clicks `Remove Rep` when the counter is already at 0?
2. If the user reaches 10 reps and then removes one, should the message disappear? How would you code that?
3. Where exactly in your code would you add support for a milestone at 50 reps?

**What-if challenge:** Add a maximum limit of 30. Once `count === 30`, the `+` button should stop working. How would you implement that?

---

### Exercise 2 — Shopping Cart Item Counter

**Objective:** Build a counter where each product on a page has its own independent counter.

**Scenario:** An online store has three products. Each one needs its own `+` and `−` button to add or remove quantities. A "Total Items" display should show the combined count of all three.

**Step-by-step instructions:**

1. Create three `<div>` elements in HTML, each with a product name, a display `<span>`, and two buttons.
2. Use `data-` attributes to identify each product:
   ```html
   <button class="add-btn" data-product="apple">+</button>
   ```
3. Create a JavaScript object to store counts:
   ```js
   const counts = { apple: 0, banana: 0, cherry: 0 };
   ```
4. Use `event.target.dataset.product` inside your click handler to know which product was clicked.
5. After every change, loop through `counts` and sum the values to update a "Total Items" display.

**Hint — summing an object's values:**

```js
let total = 0;
for (let key in counts) {
  total += counts[key];
}
document.getElementById("total").innerText = total;
```

---

## PHASE 3 — PROJECT SIMULATION

### Project: Score Tracker for a Two-Player Game

**Scenario:** Build a score tracker for a two-player card game. Each player has their own score displayed on screen. Buttons allow each player to add or subtract points. A "Winner" banner appears when a player reaches 10 points.

---

**Stage 1 — Setup & Core Logic**

```html
<h1>Card Game Score Tracker</h1>

<div class="player" id="player1-section">
  <h2>Player 1</h2>
  <p id="score1">0</p>
  <button id="add1">+ Point</button>
  <button id="sub1">− Point</button>
</div>

<div class="player" id="player2-section">
  <h2>Player 2</h2>
  <p id="score2">0</p>
  <button id="add2">+ Point</button>
  <button id="sub2">− Point</button>
</div>

<p id="winner-message"></p>
<button id="reset-game">Reset Game</button>
```

```js
let score1 = 0;
let score2 = 0;
const WIN_SCORE = 10;   // Using a constant makes it easy to change the win condition later

function updateScores() {
  document.getElementById("score1").innerText = score1;
  document.getElementById("score2").innerText = score2;
  checkWinner();
}

function checkWinner() {
  const msg = document.getElementById("winner-message");
  if (score1 >= WIN_SCORE) {
    msg.innerText = "🏆 Player 1 Wins!";
  } else if (score2 >= WIN_SCORE) {
    msg.innerText = "🏆 Player 2 Wins!";
  } else {
    msg.innerText = "";
  }
}
```

**Expected output at Stage 1:** Two independent score displays that update when buttons are clicked, with a winner message appearing at 10 points.

---

**Stage 2 — Adding Features**

```js
// Prevent scores from going below 0
document.getElementById("sub1").addEventListener("click", function() {
  if (score1 > 0) score1--;
  updateScores();
});

document.getElementById("sub2").addEventListener("click", function() {
  if (score2 > 0) score2--;
  updateScores();
});

document.getElementById("add1").addEventListener("click", function() {
  score1++;
  updateScores();
});

document.getElementById("add2").addEventListener("click", function() {
  score2++;
  updateScores();
});
```

---

**Stage 3 — Reset and Polish**

```js
document.getElementById("reset-game").addEventListener("click", function() {
  score1 = 0;
  score2 = 0;
  updateScores();
  document.getElementById("winner-message").innerText = "";
});
```

**Advanced challenge:** Disable all scoring buttons once a winner has been declared, and only re-enable them on reset.

**Reflection questions:**
1. How would you extend this to support 3 or 4 players without rewriting most of the code?
2. In a real multiplayer game app, where would the scores be stored so they persist if the page reloads?
3. What happens right now if both players reach 10 at the same time? How would you handle that?

---

---

# PROJECT 2 – EVENT LISTENER

---

## PHASE 1 — CONCEPTUAL UNDERSTANDING

### What Is an Event Listener?

An **event listener** is a mechanism that waits — quietly, in the background — for something to happen on the page, and then runs a specific function in response.

Think of it like a smoke detector. The detector doesn't do anything until there's smoke. When smoke appears (the event), it triggers the alarm (the function). You don't have to keep checking manually.

**Events that JavaScript can listen for:**

| Event | Triggered When... |
|---|---|
| `click` | User clicks an element |
| `mouseover` | Mouse pointer moves over an element |
| `mouseout` | Mouse pointer moves away from an element |
| `keydown` | A keyboard key is pressed down |
| `keyup` | A keyboard key is released |
| `input` | The value of an input field changes |
| `submit` | A form is submitted |
| `load` | The page finishes loading |
| `resize` | The browser window is resized |
| `scroll` | The user scrolls the page |

---

### Concept 1 — `addEventListener()` Syntax

```js
element.addEventListener(eventType, callbackFunction);
```

| Part | Meaning |
|---|---|
| `element` | The HTML element you're watching |
| `addEventListener` | The built-in method to attach a listener |
| `eventType` | A string: the name of the event (`"click"`, `"mouseover"`, etc.) |
| `callbackFunction` | The function to run when the event fires |

**Micro-demo — basic click:**

```js
const btn = document.getElementById("my-button");

btn.addEventListener("click", function() {
  console.log("Button was clicked!");
});
// When the button is clicked → Output: Button was clicked!
```

The function passed to `addEventListener` is called a **callback** — it's a function you provide to be called back later, when the event happens.

---

### Concept 2 — Anonymous Functions vs Named Functions

You can pass the callback in two ways:

**Way 1 — Anonymous function (inline):**

```js
btn.addEventListener("click", function() {
  console.log("Clicked!");
});
```

The function has no name. It exists only inside `addEventListener`. This is convenient for short, one-off actions.

**Way 2 — Named function (defined separately):**

```js
function handleClick() {
  console.log("Clicked!");
}

btn.addEventListener("click", handleClick);  // No parentheses!
```

> ✅ **Prefer named functions when:**
> - The same function is reused in multiple listeners
> - You need to remove the listener later (you can't remove anonymous functions)
> - The function is complex and naming it improves readability

---

### Concept 3 — The `event` Object

When an event fires, JavaScript automatically creates an **event object** and passes it to your callback. This object contains information about what happened.

```js
btn.addEventListener("click", function(event) {
  console.log(event.type);    // Output: click
  console.log(event.target);  // Output: the button element that was clicked
});
```

| Property | What it contains |
|---|---|
| `event.type` | The type of event (`"click"`, `"keydown"`, etc.) |
| `event.target` | The specific element that triggered the event |
| `event.key` | (For keyboard events) Which key was pressed |
| `event.clientX`, `event.clientY` | (For mouse events) Mouse cursor position |

**Micro-demo — detecting which key was pressed:**

```js
document.addEventListener("keydown", function(event) {
  console.log("You pressed: " + event.key);
});
// Press 'a' → Output: You pressed: a
// Press 'Enter' → Output: You pressed: Enter
// Press 'ArrowUp' → Output: You pressed: ArrowUp
```

---

### Concept 4 — Removing an Event Listener

Sometimes you want a listener to stop working — for example, after a button has been clicked once.

```js
function handleOnce() {
  console.log("This runs only once!");
  btn.removeEventListener("click", handleOnce);  // Remove itself
}

btn.addEventListener("click", handleOnce);
```

> ⚠️ **Important:** `removeEventListener` only works with named functions. You cannot remove an anonymous function because there is no reference to it.

---

### Concept 5 — Multiple Listeners on One Element

You can attach multiple listeners to the same element:

```js
const box = document.getElementById("hover-box");

box.addEventListener("mouseover", function() {
  box.style.backgroundColor = "yellow";
  console.log("Mouse entered the box");
});

box.addEventListener("mouseout", function() {
  box.style.backgroundColor = "white";
  console.log("Mouse left the box");
});
```

**Expected behaviour:** The box turns yellow when the mouse moves over it and returns to white when the mouse leaves.

---

### Concept 6 — Event Delegation

**Event delegation** is a powerful technique where, instead of adding a listener to every child element, you add one listener to a parent and let events "bubble up."

**The problem without delegation:**

```js
// If you have 100 buttons, this creates 100 separate listeners — inefficient
document.querySelectorAll(".item-btn").forEach(function(btn) {
  btn.addEventListener("click", handleClick);
});
```

**The solution with delegation:**

```js
// One listener on the parent handles ALL button clicks
document.getElementById("button-container").addEventListener("click", function(event) {
  if (event.target.classList.contains("item-btn")) {
    console.log("Item button clicked: " + event.target.innerText);
  }
});
```

`event.target` tells you which specific child element was actually clicked. `classList.contains()` checks if that element has a particular CSS class.

> 💡 **Real-world use:** Social media feeds, to-do lists, product catalogues — any situation where items are added or removed dynamically. Listeners added to specific elements stop working if that element is removed from the DOM; a delegated listener on a stable parent keeps working.

---

### The Full Event Listener Project

This project demonstrates click, mouseover, mouseout, and keydown events working together on a single page.

```html
<!DOCTYPE html>
<html>
<body>

  <h1 id="page-title">Event Listener Demo</h1>

  <button id="color-btn">Change Colour</button>
  <div id="hover-box" style="width:200px; height:100px; background:lightblue;">
    Hover over me
  </div>
  <p id="key-display">Press any key...</p>

  <script src="events.js"></script>
</body>
</html>
```

```js
// --- Click Event ---
const colorBtn = document.getElementById("color-btn");
const title = document.getElementById("page-title");
const colors = ["red", "green", "blue", "orange", "purple"];
let colorIndex = 0;

colorBtn.addEventListener("click", function() {
  title.style.color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;  // Cycle through colours
});

// --- Mouse Events ---
const hoverBox = document.getElementById("hover-box");

hoverBox.addEventListener("mouseover", function() {
  hoverBox.style.backgroundColor = "coral";
  hoverBox.innerText = "You're hovering!";
});

hoverBox.addEventListener("mouseout", function() {
  hoverBox.style.backgroundColor = "lightblue";
  hoverBox.innerText = "Hover over me";
});

// --- Keyboard Event ---
const keyDisplay = document.getElementById("key-display");

document.addEventListener("keydown", function(event) {
  keyDisplay.innerText = "You pressed: " + event.key;
});
```

**Expected behaviour:**

| Action | Result |
|---|---|
| Click "Change Colour" button | Title colour cycles: red → green → blue → orange → purple → red... |
| Hover over the box | Box turns coral and text changes |
| Move mouse away | Box returns to light blue |
| Press any key | Display shows which key was pressed |

> 🤔 **Thinking question:** The colour cycling uses `(colorIndex + 1) % colors.length`. What does the `%` operator do here? What would happen without it after the last colour?

---

## PHASE 2 — APPLIED EXERCISES

### Exercise 3 — Interactive Image Gallery

**Objective:** Build a simple image gallery where clicking thumbnail buttons changes the main displayed image, and hovering over thumbnails shows a preview label.

**Scenario:** A photography portfolio site. Five small labelled buttons represent photo categories. Clicking one updates the main `<div>` to show a description of that photo. Hovering shows a tooltip.

**Warm-up mini-example:**

```js
// Updating text content when a button is clicked:
btn.addEventListener("click", function() {
  document.getElementById("main-display").innerText = "You selected: Landscape";
});
```

**Step-by-step instructions:**

1. Create 5 buttons in HTML, each with a `data-category` attribute and a `data-description` attribute.
2. Create a `<div id="main-display">` and a `<p id="tooltip">`.
3. Add a single `click` listener to each button that reads `event.target.dataset.description` and updates `#main-display`.
4. Add `mouseover` and `mouseout` listeners for the tooltip.

**Self-check questions:**
1. Why is it better to use `data-` attributes instead of reading the button's text content?
2. Could you use event delegation here? How would the code change?

---

### Exercise 4 — Live Search Filter

**Objective:** As the user types in a search box, filter a list of names in real time.

**Scenario:** An employee directory with 10 names listed. As the user types in the search field, only the names containing the typed text remain visible.

**Step-by-step instructions:**

1. Create an `<input id="search">` and a `<ul id="name-list">` with 10 `<li>` elements.
2. Add an `input` event listener to the search field.
3. Inside the handler:
   ```js
   const query = event.target.value.toLowerCase();
   const items = document.querySelectorAll("#name-list li");
   items.forEach(function(item) {
     const name = item.innerText.toLowerCase();
     item.style.display = name.includes(query) ? "" : "none";
   });
   ```

**Hint:** `"".includes()` returns `true` when `query` is empty, so all items show when the search box is blank.

---

## PHASE 3 — PROJECT SIMULATION

### Project: Interactive Keyboard Colour Painter

**Scenario:** Build a page with a grid of 16 coloured boxes. Pressing number keys 1–4 selects an active colour. Hovering over a box while holding the mouse button "paints" it with the selected colour.

---

**Stage 1 — Grid Setup**

```html
<div id="palette">
  <button class="color-swatch" data-color="#FF6B6B" style="background:#FF6B6B">1</button>
  <button class="color-swatch" data-color="#4ECDC4" style="background:#4ECDC4">2</button>
  <button class="color-swatch" data-color="#45B7D1" style="background:#45B7D1">3</button>
  <button class="color-swatch" data-color="#96CEB4" style="background:#96CEB4">4</button>
</div>

<div id="canvas"></div>
<p>Selected colour: <span id="selected-colour">None</span></p>
```

```js
// Create 16 boxes dynamically
const canvas = document.getElementById("canvas");
for (let i = 0; i < 16; i++) {
  const box = document.createElement("div");
  box.classList.add("paint-box");
  canvas.appendChild(box);
}
```

**Stage 2 — Colour Selection**

```js
let selectedColor = null;
let isMouseDown = false;

document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup",   () => isMouseDown = false);

document.getElementById("palette").addEventListener("click", function(event) {
  if (event.target.classList.contains("color-swatch")) {
    selectedColor = event.target.dataset.color;
    document.getElementById("selected-colour").innerText = selectedColor;
    document.getElementById("selected-colour").style.color = selectedColor;
  }
});
```

**Stage 3 — Painting**

```js
canvas.addEventListener("mouseover", function(event) {
  if (isMouseDown && selectedColor && event.target.classList.contains("paint-box")) {
    event.target.style.backgroundColor = selectedColor;
  }
});
```

**Reflection questions:**
1. How does using one `mouseover` listener on `#canvas` instead of 16 listeners on each box demonstrate event delegation?
2. What would you need to add to support an "erase" feature?
3. In a professional design tool, how might you save the painted state so it persists after page refresh?

---

---

# PROJECT 3 – TO-DO LIST

---

## PHASE 1 — CONCEPTUAL UNDERSTANDING

### What Is a To-Do List App?

A **to-do list** is one of the most common beginner JavaScript projects because it combines almost every fundamental skill in one place:

- Creating new HTML elements with JavaScript
- Reading values from an input field
- Adding and removing elements from the DOM
- Responding to events (clicking "Add", clicking "Delete", pressing Enter)

To-do apps exist in every workplace — project management (Jira, Asana), note-taking apps (Notion), and personal productivity tools. Understanding how to build one teaches you the core skills behind all of them.

---

### Concept 1 — Getting Input Values

A text input's current value is read using its `.value` property.

```html
<input type="text" id="task-input" placeholder="Enter a task..." />
```

```js
const input = document.getElementById("task-input");
const userText = input.value;  // Whatever the user typed
console.log(userText);
```

**Micro-demo — reading and clearing an input:**

```js
const input = document.getElementById("task-input");
const btn = document.getElementById("add-btn");

btn.addEventListener("click", function() {
  const text = input.value;          // Read what's there
  console.log("You entered: " + text);
  input.value = "";                   // Clear the field after reading
  input.focus();                      // Put the cursor back in the field
});
```

> ⚠️ **Common mistake:** Forgetting to clear the input after adding a task. Users expect the field to be empty and ready for the next task.

---

### Concept 2 — Creating New HTML Elements with JavaScript

`document.createElement()` creates a new HTML element entirely in JavaScript — it doesn't exist in the original HTML file.

```js
const li = document.createElement("li");    // Create a <li> element
li.innerText = "Buy groceries";             // Set its text
document.getElementById("task-list").appendChild(li);  // Add it to the list
```

**Step-by-step explanation:**

| Step | Code | What Happens |
|---|---|---|
| 1 | `document.createElement("li")` | Creates a new `<li>` element in memory (not on page yet) |
| 2 | `li.innerText = "Buy groceries"` | Sets the text content of the new element |
| 3 | `list.appendChild(li)` | Inserts the element as the last child of `#task-list` |

**Micro-demo — building a list dynamically:**

```js
const fruits = ["Apple", "Banana", "Cherry"];
const ul = document.getElementById("fruit-list");

fruits.forEach(function(fruit) {
  const li = document.createElement("li");
  li.innerText = fruit;
  ul.appendChild(li);
});
// Output on page:
// • Apple
// • Banana
// • Cherry
```

---

### Concept 3 — Removing Elements from the DOM

To remove an element, use `.remove()` on the element itself, or use `.removeChild()` on its parent.

```js
// Method 1: remove() - simpler, modern
const item = document.getElementById("task-1");
item.remove();

// Method 2: removeChild() - useful when you have the parent reference
const list = document.getElementById("task-list");
const item = document.getElementById("task-1");
list.removeChild(item);
```

**How to set up a delete button for each task:**

```js
function createTask(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", function() {
    li.remove();    // Remove the entire <li> when delete is clicked
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("task-list").appendChild(li);
}
```

> 💡 **Key insight:** The delete button's click listener uses a **closure** — it "remembers" which `li` it belongs to, even after the function that created it has finished. Each delete button knows exactly which list item to remove.

---

### Concept 4 — Toggling a Task as Complete

A common feature is clicking a task to mark it as done. This is achieved by toggling a CSS class.

```js
// CSS:
// .completed { text-decoration: line-through; color: grey; }

li.addEventListener("click", function() {
  li.classList.toggle("completed");
});
```

`classList.toggle("completed")` adds the class if it's not there, removes it if it is. One line handles both marking as done and un-marking.

**Micro-demo:**

```js
const li = document.createElement("li");
li.innerText = "Walk the dog";

li.addEventListener("click", function() {
  li.classList.toggle("done");
  console.log(li.classList.contains("done") ? "Marked complete" : "Marked incomplete");
});
```

---

### Concept 5 — Triggering "Add" on Enter Key

Users expect to press Enter after typing a task, not just click the button.

```js
const input = document.getElementById("task-input");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
```

---

### Concept 6 — Input Validation

Before adding a task, check that the input isn't empty or just spaces:

```js
function addTask() {
  const text = input.value.trim();  // .trim() removes leading/trailing spaces

  if (text === "") {
    alert("Please enter a task before clicking Add.");
    return;  // Stop the function here — don't add an empty task
  }

  createTask(text);
  input.value = "";
  input.focus();
}
```

`.trim()` is important because a user could type several spaces and technically the field wouldn't be "empty", but the resulting task would be invisible. `.trim()` catches this.

---

### The Full To-Do List Project

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>To-Do List</title>
  <style>
    .completed { text-decoration: line-through; color: grey; }
    li { margin: 6px 0; }
    li button { margin-left: 10px; }
  </style>
</head>
<body>

  <h1>My To-Do List</h1>

  <input type="text" id="task-input" placeholder="What needs to be done?" />
  <button id="add-btn">Add Task</button>

  <ul id="task-list"></ul>

  <p id="task-count">0 tasks remaining</p>

  <script src="todo.js"></script>
</body>
</html>
```

**JavaScript (todo.js):**

```js
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

function updateCount() {
  const remaining = taskList.querySelectorAll("li:not(.completed)").length;
  taskCount.innerText = remaining + " task(s) remaining";
}

function createTask(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;
  span.style.cursor = "pointer";

  // Toggle complete on click
  span.addEventListener("click", function() {
    li.classList.toggle("completed");
    updateCount();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "✕";
  deleteBtn.addEventListener("click", function() {
    li.remove();
    updateCount();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  updateCount();
}

function addTask() {
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  createTask(text);
  input.value = "";
  input.focus();
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
```

**Expected behaviour:**

| Action | Result |
|---|---|
| Type "Buy milk" and click Add | Item appears in the list; count shows 1 task remaining |
| Click the task text | Item gets strikethrough; count decreases |
| Click the ✕ button | Item is removed; count updates |
| Try to add an empty task | Alert: "Please enter a task." |
| Press Enter after typing | Same as clicking Add |

---

## PHASE 2 — APPLIED EXERCISES

### Exercise 5 — Priority To-Do List

**Objective:** Extend the to-do list so that each task has a priority level (High / Medium / Low) and is colour-coded accordingly.

**Warm-up mini-example:**

```js
// Setting a background colour based on a dropdown value:
const priority = document.getElementById("priority-select").value;
if (priority === "high")   li.style.borderLeft = "4px solid red";
if (priority === "medium") li.style.borderLeft = "4px solid orange";
if (priority === "low")    li.style.borderLeft = "4px solid green";
```

**Step-by-step instructions:**

1. Add a `<select id="priority-select">` with options: High, Medium, Low.
2. When creating a task, read the select value alongside the input text.
3. Apply a left border colour based on priority.
4. Add a `data-priority` attribute to each `<li>` for future sorting features.

**Self-check questions:**
1. What would happen if you forgot to read the select value before clearing the form?
2. How would you add a feature to filter the list to show only "High" priority tasks?

---

### Exercise 6 — Task Counter with Local Persistence Simulation

**Objective:** When the page loads, show a message telling the user how many tasks were added in the "current session."

**Step-by-step instructions:**

1. Declare a `sessionCount` variable at the top of your script.
2. Increment it inside `createTask()` every time a task is added.
3. Add a `<p id="session-info">` that always shows: "You've added X tasks this session."
4. Update this message from within `createTask()`.

---

## PHASE 3 — PROJECT SIMULATION

### Project: Daily Planner App

**Scenario:** Build a planner that organises tasks into three columns: "Morning", "Afternoon", and "Evening." Each column has its own input and task list.

---

**Stage 1 — Three-Column Layout**

```html
<div class="planner">
  <div class="time-block" id="morning-block">
    <h2>☀️ Morning</h2>
    <input class="task-input" placeholder="Add morning task..." />
    <button class="add-btn">Add</button>
    <ul class="task-list"></ul>
  </div>

  <div class="time-block" id="afternoon-block">
    <h2>🌤️ Afternoon</h2>
    <input class="task-input" placeholder="Add afternoon task..." />
    <button class="add-btn">Add</button>
    <ul class="task-list"></ul>
  </div>

  <div class="time-block" id="evening-block">
    <h2>🌙 Evening</h2>
    <input class="task-input" placeholder="Add evening task..." />
    <button class="add-btn">Add</button>
    <ul class="task-list"></ul>
  </div>
</div>
```

**Stage 2 — Shared Logic with Event Delegation**

```js
// Because all three blocks have the same structure, one function handles them all
document.querySelector(".planner").addEventListener("click", function(event) {
  const block = event.target.closest(".time-block");
  if (!block) return;

  if (event.target.classList.contains("add-btn")) {
    const input = block.querySelector(".task-input");
    const text = input.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.innerText = text;

    const del = document.createElement("button");
    del.innerText = "✕";
    del.addEventListener("click", () => li.remove());
    li.appendChild(del);

    block.querySelector(".task-list").appendChild(li);
    input.value = "";
    input.focus();
  }
});
```

**Stage 3 — Summary Bar**

Add a `<p id="summary">` at the top that reads: "Total tasks planned: X". Update it whenever a task is added or removed.

**Reflection questions:**
1. How does using `.closest(".time-block")` make the code work for all three columns without repeating yourself?
2. What would you need to change to add a fourth time block ("Late Night") with zero code duplication?
3. In a real productivity app, how would tasks be stored so they're still there after closing the browser?

---

---

# PROJECT 4 – MODAL POPUP

---

## PHASE 1 — CONCEPTUAL UNDERSTANDING

### What Is a Modal Popup?

A **modal** is a dialog box that appears on top of the current page, requiring the user to interact with it before returning to the page behind it. The background page is typically dimmed to draw attention to the modal.

You encounter modals constantly:
- "Are you sure you want to delete this file?" confirmation dialogs
- Login/signup forms that appear over the current page
- Image lightboxes on portfolio sites
- Cookie consent banners
- Terms and conditions dialogs

---

### Concept 1 — How Modals Work: Show and Hide

A modal is just a regular HTML element that is **hidden by default** and **made visible** when triggered.

```html
<!-- Hidden by default via CSS -->
<div id="my-modal" style="display: none;">
  <p>This is the modal content.</p>
  <button id="close-btn">Close</button>
</div>
```

```js
// Show the modal
document.getElementById("my-modal").style.display = "block";

// Hide the modal
document.getElementById("my-modal").style.display = "none";
```

**The core mechanism:**

| `display` Value | Result |
|---|---|
| `"none"` | Element is invisible and takes up no space |
| `"block"` | Element is visible as a block-level box |
| `"flex"` | Element is visible and uses flexbox layout |

---

### Concept 2 — The Overlay (Background Dim)

A proper modal dims everything behind it. This is done with a full-screen overlay element:

```css
/* CSS */
.overlay {
  position: fixed;       /* Fixed to the viewport — doesn't scroll with the page */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);  /* Semi-transparent black */
  display: none;
  z-index: 100;          /* Sit above everything else */
}

.modal-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  /* Perfectly centred */
  background: white;
  padding: 30px;
  z-index: 101;          /* Sit above the overlay */
  display: none;
}
```

**Micro-demo — understanding z-index:**

```
Stacking order (highest z-index = on top):
  z-index: 101 → Modal box (visible, on top)
  z-index: 100 → Overlay (below modal, above page)
  z-index: 0   → Normal page content (at the bottom)
```

---

### Concept 3 — Opening and Closing a Modal

```js
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal-box");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");

function openModal() {
  overlay.style.display = "block";
  modal.style.display = "block";
}

function closeModal() {
  overlay.style.display = "none";
  modal.style.display = "none";
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
```

---

### Concept 4 — Closing the Modal by Clicking the Overlay

Users expect to be able to dismiss a modal by clicking outside of it (on the dim overlay). This is a very common UX pattern.

```js
overlay.addEventListener("click", closeModal);
```

Because the overlay covers the entire screen behind the modal, clicking anywhere outside the modal box clicks the overlay — triggering `closeModal`.

> ⚠️ **Gotcha:** Make sure clicking inside the modal does not also close it. This works automatically because the modal box sits on top of the overlay and clicking on it does not "pass through" to the overlay. However, if you structure your HTML with the modal inside the overlay div, you need `event.stopPropagation()`:

```js
// If modal is inside the overlay div:
modal.addEventListener("click", function(event) {
  event.stopPropagation();  // Prevent the click from reaching the overlay
});
```

---

### Concept 5 — Closing with the Escape Key

Professional modals also close when the user presses Escape.

```js
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
```

---

### Concept 6 — Preventing Background Scroll

When a modal is open, users should not be able to scroll the background page. This is done by adding a CSS class to the `<body>`:

```css
/* CSS */
body.modal-open {
  overflow: hidden;
}
```

```js
function openModal() {
  overlay.style.display = "block";
  modal.style.display = "block";
  document.body.classList.add("modal-open");     // Lock scroll
}

function closeModal() {
  overlay.style.display = "none";
  modal.style.display = "none";
  document.body.classList.remove("modal-open");  // Re-enable scroll
}
```

---

### The Full Modal Popup Project

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Modal Popup</title>
  <style>
    .overlay {
      position: fixed; top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display: none; z-index: 100;
    }
    .modal-box {
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white; padding: 30px;
      border-radius: 8px; z-index: 101;
      display: none; min-width: 300px;
    }
    .modal-box h2 { margin-top: 0; }
    body.modal-open { overflow: hidden; }
  </style>
</head>
<body>

  <h1>Modal Demo</h1>
  <button id="open-btn">Open Modal</button>

  <div class="overlay" id="overlay"></div>

  <div class="modal-box" id="modal-box">
    <h2>Hello from the Modal!</h2>
    <p>This is a modal popup. You can put any content here.</p>
    <button id="close-btn">Close</button>
  </div>

  <script src="modal.js"></script>
</body>
</html>
```

**JavaScript (modal.js):**

```js
const overlay = document.getElementById("overlay");
const modalBox = document.getElementById("modal-box");

function openModal() {
  overlay.style.display = "block";
  modalBox.style.display = "block";
  document.body.classList.add("modal-open");
}

function closeModal() {
  overlay.style.display = "none";
  modalBox.style.display = "none";
  document.body.classList.remove("modal-open");
}

// Open on button click
document.getElementById("open-btn").addEventListener("click", openModal);

// Close via close button
document.getElementById("close-btn").addEventListener("click", closeModal);

// Close via overlay click
overlay.addEventListener("click", closeModal);

// Close via Escape key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
```

**Expected behaviour:**

| Action | Result |
|---|---|
| Click "Open Modal" | Overlay appears; modal box appears centred |
| Click "Close" button | Modal and overlay disappear |
| Click outside the modal | Modal closes |
| Press Escape | Modal closes |

---

## PHASE 2 — APPLIED EXERCISES

### Exercise 7 — Image Lightbox

**Objective:** Build an image gallery where clicking a thumbnail opens a larger version of the image in a modal.

**Warm-up mini-example:**

```js
// Setting an image source dynamically:
const modalImg = document.getElementById("modal-image");
modalImg.src = "photo1.jpg";
```

**Step-by-step instructions:**

1. Create a row of 4 thumbnail `<img>` elements with `data-full-src` attributes pointing to larger versions.
2. Add a modal that contains a large `<img id="modal-image">` and a caption `<p>`.
3. When a thumbnail is clicked, read its `data-full-src`, set it as `modal-image.src`, and open the modal.
4. Include keyboard (Escape) and overlay-click close functionality.

**Self-check questions:**
1. What attribute on the thumbnail tells your JavaScript which large image to load?
2. Why shouldn't you put the full-size images in the HTML by default?

---

### Exercise 8 — Confirmation Modal

**Objective:** Replace the browser's default `confirm()` dialog with a custom styled modal.

**Scenario:** A delete button on a page. When clicked, instead of using the ugly browser `confirm()`, a custom modal appears asking "Are you sure you want to delete this item?" with "Yes, Delete" and "Cancel" buttons.

**Step-by-step instructions:**

1. Create a modal with two buttons: one with `id="confirm-yes"` and one with `id="confirm-no"`.
2. When the main "Delete" button is clicked, open the modal.
3. Clicking "Yes, Delete" performs the deletion (e.g., removes an element from the page) and closes the modal.
4. Clicking "Cancel" just closes the modal.

---

## PHASE 3 — PROJECT SIMULATION

### Project: Multi-Modal Product Detail Viewer

**Scenario:** Build a product listing page with 4 products. Clicking "View Details" on any product opens a modal showing that product's full description, price, and a simulated "Add to Cart" button.

---

**Stage 1 — Data and Structure**

```js
const products = [
  { id: 1, name: "Wireless Headphones", price: "$59.99", description: "Noise-cancelling, 30hr battery, Bluetooth 5.0" },
  { id: 2, name: "Mechanical Keyboard", price: "$89.99", description: "TKL layout, blue switches, RGB backlight" },
  { id: 3, name: "USB-C Hub",           price: "$34.99", description: "7-in-1 adapter: HDMI, USB 3.0 x3, SD, PD" },
  { id: 4, name: "Webcam 1080p",        price: "$49.99", description: "Auto-focus, built-in mic, plug & play" },
];
```

**Stage 2 — Generate Product Cards and Populate Modal**

```js
const grid = document.getElementById("product-grid");

products.forEach(function(product) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button class="view-btn" data-id="${product.id}">View Details</button>
  `;
  grid.appendChild(card);
});

// Open modal with correct product data on button click
grid.addEventListener("click", function(event) {
  if (event.target.classList.contains("view-btn")) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);

    document.getElementById("modal-name").innerText = product.name;
    document.getElementById("modal-price").innerText = product.price;
    document.getElementById("modal-desc").innerText = product.description;

    openModal();
  }
});
```

**Stage 3 — Add to Cart Feedback**

```js
document.getElementById("cart-btn").addEventListener("click", function() {
  const name = document.getElementById("modal-name").innerText;
  closeModal();
  alert(name + " added to cart!");  // In a real app, update a cart counter instead
});
```

**Reflection questions:**
1. How does using `data-id` allow one click handler to work for all four products?
2. What is the advantage of keeping product data in a JavaScript array rather than hard-coding it in the HTML?
3. How would you implement an "out of stock" state that disables the "Add to Cart" button for specific products?

---

---

# PROJECT 5 – FORM VALIDATION

---

## PHASE 1 — CONCEPTUAL UNDERSTANDING

### What Is Form Validation?

**Form validation** is the process of checking that a user has filled out a form correctly before it is submitted. It protects the application from bad data and helps users fix mistakes.

There are two types:

| Type | When It Runs | Example |
|---|---|---|
| **Client-side** (JavaScript) | In the browser, before data is sent | "Email must contain @" |
| **Server-side** (back-end) | After data is received on the server | "This email is already registered" |

Client-side validation is faster (no server round-trip needed) and gives immediate feedback. However, it is not sufficient alone — users can disable JavaScript. Always validate on the server too.

---

### Concept 1 — Reading Form Field Values

```html
<input type="text"     id="username" />
<input type="email"    id="email" />
<input type="password" id="password" />
```

```js
const username = document.getElementById("username").value;
const email    = document.getElementById("email").value;
const password = document.getElementById("password").value;
```

All input values come back as **strings**, even if the input type is `number`. Always account for this in your validation logic.

---

### Concept 2 — The `submit` Event and `preventDefault()`

By default, submitting a form causes the page to reload (or navigate to the URL in the `action` attribute). In a JavaScript-validated form, you need to **prevent this default behaviour** so you can handle it yourself.

```js
const form = document.getElementById("my-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();  // Stop the page from reloading
  validateForm();
});
```

`event.preventDefault()` is one of the most important tools in form handling. Without it, the page reloads before your validation code even runs.

---

### Concept 3 — Displaying Error Messages

Rather than using `alert()` (which is intrusive and blocks the page), professional forms display inline error messages next to each field.

**HTML pattern:**

```html
<div class="field-group">
  <label for="username">Username</label>
  <input type="text" id="username" />
  <span class="error" id="username-error"></span>
</div>
```

**JavaScript pattern:**

```js
function showError(fieldId, message) {
  const errorSpan = document.getElementById(fieldId + "-error");
  errorSpan.innerText = message;
  errorSpan.style.display = "block";
  document.getElementById(fieldId).classList.add("invalid");
}

function clearError(fieldId) {
  document.getElementById(fieldId + "-error").innerText = "";
  document.getElementById(fieldId).classList.remove("invalid");
}
```

**CSS:**

```css
.error {
  color: red;
  font-size: 0.85em;
  display: none;
}

input.invalid {
  border: 2px solid red;
}

input.valid {
  border: 2px solid green;
}
```

---

### Concept 4 — Validation Rules

**Rule 1 — Required field (not empty):**

```js
if (username.trim() === "") {
  showError("username", "Username is required.");
  isValid = false;
}
```

**Rule 2 — Minimum length:**

```js
if (password.length < 8) {
  showError("password", "Password must be at least 8 characters.");
  isValid = false;
}
```

**Rule 3 — Email format (using Regular Expression):**

```js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  showError("email", "Please enter a valid email address.");
  isValid = false;
}
```

**Breaking down the email regex:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

| Part | Meaning |
|---|---|
| `^` | Start of string |
| `[^\s@]+` | One or more characters that are NOT a space or `@` |
| `@` | Literal `@` symbol |
| `[^\s@]+` | One or more characters that are NOT a space or `@` |
| `\.` | Literal `.` dot |
| `[^\s@]+` | One or more characters that are NOT a space or `@` |
| `$` | End of string |

**Rule 4 — Password confirmation match:**

```js
const password = document.getElementById("password").value;
const confirm  = document.getElementById("confirm-password").value;

if (password !== confirm) {
  showError("confirm-password", "Passwords do not match.");
  isValid = false;
}
```

---

### Concept 5 — Real-Time (Live) Validation

Instead of only validating on submit, you can validate each field as the user types or moves away from it:

```js
// Validate when the user leaves the field (blur event)
document.getElementById("email").addEventListener("blur", function() {
  validateEmail();
});

// Validate as the user types (input event)
document.getElementById("password").addEventListener("input", function() {
  validatePassword();
});
```

| Event | When it fires |
|---|---|
| `blur` | When the user clicks away from the field (leaves focus) |
| `focus` | When the user clicks into the field |
| `input` | Every time the field value changes |
| `change` | When the value changes AND the user leaves the field |

Real-time validation gives faster feedback but can feel intrusive if errors appear before the user has finished typing. A common compromise: validate on `blur`, update on `input` only if there's already an error showing.

---

### Concept 6 — A Validation Helper Pattern

To avoid repeating validation logic, create a reusable helper function:

```js
function validate(value, rules) {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return rule.message;  // Return the first failing message
    }
  }
  return null;  // null means all rules passed
}

// Usage:
const usernameError = validate(username, [
  { test: v => v.trim() !== "",    message: "Username is required." },
  { test: v => v.length >= 3,      message: "Username must be at least 3 characters." },
  { test: v => /^[a-zA-Z0-9]+$/.test(v), message: "Username can only contain letters and numbers." }
]);
```

---

### The Full Form Validation Project

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Form Validation</title>
  <style>
    .field-group { margin-bottom: 16px; }
    label { display: block; font-weight: bold; margin-bottom: 4px; }
    input { width: 100%; padding: 8px; box-sizing: border-box; }
    .error { color: red; font-size: 0.85em; display: none; }
    input.invalid { border: 2px solid red; }
    input.valid   { border: 2px solid green; }
    #success-msg  { color: green; display: none; font-weight: bold; }
  </style>
</head>
<body>

  <h1>Create an Account</h1>

  <form id="signup-form">
    <div class="field-group">
      <label for="username">Username</label>
      <input type="text" id="username" placeholder="At least 3 characters" />
      <span class="error" id="username-error"></span>
    </div>

    <div class="field-group">
      <label for="email">Email</label>
      <input type="email" id="email" />
      <span class="error" id="email-error"></span>
    </div>

    <div class="field-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="At least 8 characters" />
      <span class="error" id="password-error"></span>
    </div>

    <div class="field-group">
      <label for="confirm-password">Confirm Password</label>
      <input type="password" id="confirm-password" />
      <span class="error" id="confirm-password-error"></span>
    </div>

    <button type="submit">Create Account</button>
  </form>

  <p id="success-msg">✅ Account created successfully!</p>

  <script src="validation.js"></script>
</body>
</html>
```

**JavaScript (validation.js):**

```js
const form = document.getElementById("signup-form");

// --- Helper functions ---

function showError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + "-error");
  errorEl.innerText = message;
  errorEl.style.display = "block";
  const inputEl = document.getElementById(fieldId);
  inputEl.classList.remove("valid");
  inputEl.classList.add("invalid");
}

function showSuccess(fieldId) {
  const errorEl = document.getElementById(fieldId + "-error");
  errorEl.innerText = "";
  errorEl.style.display = "none";
  const inputEl = document.getElementById(fieldId);
  inputEl.classList.remove("invalid");
  inputEl.classList.add("valid");
}

// --- Individual field validators ---

function validateUsername() {
  const val = document.getElementById("username").value.trim();
  if (val === "") {
    showError("username", "Username is required.");
    return false;
  }
  if (val.length < 3) {
    showError("username", "Username must be at least 3 characters.");
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(val)) {
    showError("username", "Only letters, numbers, and underscores allowed.");
    return false;
  }
  showSuccess("username");
  return true;
}

function validateEmail() {
  const val = document.getElementById("email").value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val === "") {
    showError("email", "Email is required.");
    return false;
  }
  if (!regex.test(val)) {
    showError("email", "Please enter a valid email address.");
    return false;
  }
  showSuccess("email");
  return true;
}

function validatePassword() {
  const val = document.getElementById("password").value;
  if (val === "") {
    showError("password", "Password is required.");
    return false;
  }
  if (val.length < 8) {
    showError("password", "Password must be at least 8 characters.");
    return false;
  }
  showSuccess("password");
  return true;
}

function validateConfirmPassword() {
  const password = document.getElementById("password").value;
  const confirm  = document.getElementById("confirm-password").value;
  if (confirm === "") {
    showError("confirm-password", "Please confirm your password.");
    return false;
  }
  if (password !== confirm) {
    showError("confirm-password", "Passwords do not match.");
    return false;
  }
  showSuccess("confirm-password");
  return true;
}

// --- Real-time validation on blur ---

document.getElementById("username").addEventListener("blur", validateUsername);
document.getElementById("email").addEventListener("blur", validateEmail);
document.getElementById("password").addEventListener("blur", validatePassword);
document.getElementById("confirm-password").addEventListener("blur", validateConfirmPassword);

// --- Update confirm field live if it already has an error ---
document.getElementById("confirm-password").addEventListener("input", function() {
  if (this.classList.contains("invalid")) {
    validateConfirmPassword();
  }
});

// --- Form submit ---

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const allValid = [
    validateUsername(),
    validateEmail(),
    validatePassword(),
    validateConfirmPassword()
  ].every(Boolean);  // every() returns true only if ALL values are true

  if (allValid) {
    document.getElementById("success-msg").style.display = "block";
    form.reset();   // Clear all fields
    // Reset field styling
    ["username", "email", "password", "confirm-password"].forEach(id => {
      document.getElementById(id).classList.remove("valid");
    });
  }
});
```

**Expected behaviour:**

| Scenario | Result |
|---|---|
| Submit empty form | All four fields show red error messages |
| Type "ab" in username and tab away | "Must be at least 3 characters" appears immediately |
| Type an email without `@` | "Please enter a valid email address." |
| Passwords don't match | "Passwords do not match." |
| All fields valid and submitted | Success message; form clears |

> 🤔 **Thinking question:** The `validateConfirmPassword` listener on `input` only runs if the field already has the "invalid" class. Why is this a better UX approach than validating on every keystroke from the beginning?

---

## PHASE 2 — APPLIED EXERCISES

### Exercise 9 — Password Strength Indicator

**Objective:** As the user types in the password field, show a live strength indicator (Weak / Medium / Strong) based on the password's complexity.

**Warm-up mini-example:**

```js
function getStrength(password) {
  let score = 0;
  if (password.length >= 8)            score++;
  if (/[A-Z]/.test(password))          score++;  // Has uppercase
  if (/[0-9]/.test(password))          score++;  // Has a number
  if (/[^A-Za-z0-9]/.test(password))   score++;  // Has a special character
  return score;
}

// score 0–1: Weak | 2–3: Medium | 4: Strong
```

**Step-by-step instructions:**

1. Add a `<div id="strength-bar">` and a `<p id="strength-label">` below the password field.
2. Attach an `input` listener to the password field.
3. Call `getStrength()` on every keystroke.
4. Based on the score, set the width and colour of `#strength-bar` and the text of `#strength-label`.

**Self-check questions:**
1. What minimum password would score exactly 2 (Medium)?
2. How does the `^` inside `[^A-Za-z0-9]` change the meaning of the character class?

---

### Exercise 10 — Multi-Step Form

**Objective:** Build a 3-step form where each "Next" button validates the current step before proceeding.

**Scenario:** Step 1 collects personal info (name, email). Step 2 collects account info (username, password). Step 3 is a summary/review page.

**Step-by-step instructions:**

1. Create three `<div class="step">` sections, initially only the first is visible.
2. The "Next" button validates the current step's fields. If valid, hide the current step and show the next.
3. Add a "Previous" button that goes back without re-validating.
4. Step 3 displays all entered values as a summary.

**Hint — showing/hiding steps:**

```js
let currentStep = 1;

function goToStep(n) {
  document.getElementById("step" + currentStep).style.display = "none";
  currentStep = n;
  document.getElementById("step" + currentStep).style.display = "block";
}
```

---

## PHASE 3 — PROJECT SIMULATION

### Project: Job Application Form with Full Validation

**Scenario:** Build a job application form for a fictional company. The form collects: Full Name, Email, Phone, LinkedIn URL (optional), Cover Letter (textarea), and Agreement to Terms (checkbox). Every required field must be validated before submission.

---

**Stage 1 — HTML Structure**

Include these field types:

```html
<input type="text"     id="fullname" />
<input type="email"    id="app-email" />
<input type="tel"      id="phone" />
<input type="url"      id="linkedin" />    <!-- Optional -->
<textarea id="cover-letter" rows="5"></textarea>
<input type="checkbox" id="terms" />
<label for="terms">I agree to the terms and conditions</label>
```

**Stage 2 — Validation Rules**

| Field | Rules |
|---|---|
| Full Name | Required; at least 2 words (first + last) |
| Email | Required; valid format |
| Phone | Required; 7–15 digits, can include spaces and `+` |
| LinkedIn | Optional; if filled in, must start with `https://linkedin.com/` |
| Cover Letter | Required; at least 50 characters |
| Terms | Must be checked |

**Phone number regex:**

```js
const phoneRegex = /^[+\d][\d\s\-]{6,14}$/;
```

**At-least-two-words check:**

```js
const words = fullname.trim().split(/\s+/);
if (words.length < 2) {
  showError("fullname", "Please enter your first and last name.");
}
```

**Optional URL validation:**

```js
const linkedin = document.getElementById("linkedin").value.trim();
if (linkedin !== "" && !linkedin.startsWith("https://linkedin.com/")) {
  showError("linkedin", "LinkedIn URL must start with https://linkedin.com/");
}
```

**Checkbox validation:**

```js
if (!document.getElementById("terms").checked) {
  showError("terms", "You must agree to the terms to apply.");
}
```

**Stage 3 — Submission Summary**

On successful validation, hide the form and show a `<div id="confirmation">` with:

```
Thank you, [Full Name]! Your application has been received.
We'll be in touch at [email] within 5 business days.
```

**Reflection questions:**
1. Why is client-side validation not enough on its own for a real job application system?
2. How would you handle the case where the same email has already applied (information only available from the server)?
3. If a user fills in 4 of the 6 fields and the page reloads, all their data is lost. What browser API would you use to temporarily save their progress?

---

---

# COMPLETION CHECKLIST

| # | Requirement | ✓ |
|---|---|---|
| 1 | All main ideas are fully explained with simple language | ✓ |
| 2 | Every concept includes at least one micro-demo with expected output | ✓ |
| 3 | Common beginner errors are highlighted and corrected | ✓ |
| 4 | Each project has at least two practice exercises | ✓ |
| 5 | Each project culminates in a full mini-project simulation | ✓ |
| 6 | Projects increase in complexity from Counter → Form Validation | ✓ |
| 7 | Reflection questions are included at each project's end | ✓ |
| 8 | Real-world relevance is shown for every major concept | ✓ |

---

## One-Sentence Summary

> These five projects — Counter, Event Listener, To-Do List, Modal Popup, and Form Validation — cover the complete foundation of interactive JavaScript: storing state in variables, reading and updating the DOM, responding to user events, creating and removing elements dynamically, and protecting applications from bad input.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Projects*
