---
render_with_liquid: false
title: "JavaScript Debugging: Debugging Basics · The Console · Breakpoints · Error Types · Async Debugging"
nav_order: 23
---

## Table of Contents
1. [What Is Debugging?](#1-what-is-debugging)
2. [The Console Object](#2-the-console-object)
3. [Breakpoints & DevTools](#3-breakpoints--devtools)
4. [JavaScript Error Types](#4-javascript-error-types)
5. [Debugging Asynchronous Code](#5-debugging-asynchronous-code)
6. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
7. [Phase 3 — Project Simulation](#phase-3--project-simulation)
8. [Completion Checklist](#completion-checklist)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. What Is Debugging?

### 1.1 The Big Picture

Imagine you bake a cake and it comes out flat. You don't throw away your entire kitchen — you **investigate**. Did you forget baking powder? Did you use the wrong oven temperature? The process of finding and fixing that mistake is *debugging*.

In programming, **debugging** is the process of finding, understanding, and fixing errors (called **bugs**) in your code. The term "bug" actually comes from a real moth found in a 1940s computer that caused a malfunction — engineers "debugged" the machine by removing it.

**Why debugging matters in real life:**
- A bank transfers the wrong amount because of a floating-point bug → millions lost
- A hospital dosage calculator has an off-by-one error → patient safety risk
- An e-commerce checkout crashes → sales lost every minute

As a JavaScript developer, debugging will consume a significant portion of your working day. Learning it properly is as important as learning to write code.

---

### 1.2 How Bugs Enter Your Code

Bugs are introduced in three main ways:

| Source | Example |
|--------|---------|
| **Typing mistakes** | Writing `lenght` instead of `length` |
| **Logic errors** | Dividing instead of multiplying |
| **Missing knowledge** | Not knowing that `typeof null === "object"` |

---

### 1.3 The JavaScript Debugging Toolkit

JavaScript gives you several tools to find bugs:

| Tool | What It Does |
|------|-------------|
| `console.log()` | Prints values to the browser console |
| Browser DevTools | A full debugging environment built into every browser |
| `debugger` statement | Pauses code execution right in your script |
| Error messages | JavaScript tells you what went wrong and where |
| Breakpoints | Points where the browser pauses and lets you inspect state |

---

### 1.4 The `debugger` Statement

The `debugger` keyword is a built-in JavaScript instruction that **pauses execution** of your program — but only if the browser's developer tools are open. If DevTools is closed, `debugger` does nothing.

**Simple Example:**

```javascript
let price = 100;
let discount = 0.2;

debugger; // ← Execution pauses HERE when DevTools is open

let finalPrice = price - (price * discount);
console.log("Final price:", finalPrice);
// Expected Output (in console): Final price: 80
```

**What happens step by step:**
1. `price` is set to `100`
2. `discount` is set to `0.2`
3. The browser hits `debugger` and **freezes**
4. You can now inspect `price` and `discount` in DevTools before the calculation runs
5. When you press "Resume", the rest of the code continues

**Real-world use:** You place `debugger` just *before* the line you think is causing a problem, so you can check what all the variables contain at that exact moment.

> 💡 **Thinking Question:** What if you placed `debugger` *after* line 5 instead of before line 4? What would you see differently?

**Common Beginner Mistake:** Forgetting to remove `debugger` statements before publishing your code. Always search for and remove them before deployment.

---

### 1.5 The General Debugging Workflow

Before diving into specific tools, here's the mindset:

```
1. Observe the problem   → "The total shows as NaN"
2. Form a hypothesis     → "Maybe one input is undefined"
3. Test your hypothesis  → Add console.log / breakpoint
4. Fix and verify        → Make the change, re-run
5. Repeat if needed      → Until the bug is gone
```

---

## 2. The Console Object

### 2.1 What Is the Console?

The **console** is a panel inside your browser's developer tools where JavaScript can print messages. Think of it as a "communication channel" between your code and yourself. When something goes wrong, you ask your code: *"What are you doing right now?"* — and the console answers.

**How to open the console:**
- **Chrome/Edge/Firefox:** Press `F12` → click the **Console** tab
- **Mac:** `Cmd + Option + J`
- **Windows/Linux:** `Ctrl + Shift + J`

---

### 2.2 `console.log()` — The Foundation

`console.log()` prints any value to the console. It is the most used debugging tool in JavaScript.

**Micro-demo — Logging a single value:**

```javascript
let userName = "Babatunde";
console.log(userName);
// Expected Output: Babatunde
```

**Micro-demo — Logging multiple values:**

```javascript
let age = 25;
let city = "Lagos";
console.log("Name:", userName, "| Age:", age, "| City:", city);
// Expected Output: Name: Babatunde | Age: 25 | City: Lagos
```

**Why add labels?** Without labels, multiple `log()` calls look identical:

```javascript
console.log(100);   // Is this price? tax? quantity?
console.log(100);   // Impossible to tell

// Better:
console.log("price:", 100);
console.log("tax:", 100);  // Now clearly different
```

---

### 2.3 `console.warn()` — Yellow Warnings

`console.warn()` prints a **yellow warning** message. Use it when something is not broken but is potentially dangerous or unexpected.

```javascript
let userAge = 17;

if (userAge < 18) {
  console.warn("User is under 18 — some features will be restricted.");
}
// Expected Output: ⚠️ User is under 18 — some features will be restricted.
```

**Real-world use:** API rate limit approaching, optional config missing, deprecated method used.

---

### 2.4 `console.error()` — Red Errors

`console.error()` prints a **red error** message with a stack trace (a list of which functions called which). Use it when something has actually gone wrong.

```javascript
function getUser(id) {
  if (!id) {
    console.error("getUser() called without an ID. This will cause a database failure.");
    return null;
  }
  return { id: id, name: "Alice" };
}

getUser(); // No argument provided
// Expected Output: ❌ getUser() called without an ID. This will cause a database failure.
```

---

### 2.5 `console.table()` — Display Arrays and Objects as Tables

`console.table()` takes an array or object and displays it as a **formatted table** in the console — much easier to read than a raw object.

**Without table:**

```javascript
let students = [
  { name: "Alice", grade: "A" },
  { name: "Bob",   grade: "B" },
  { name: "Carol", grade: "A" }
];

console.log(students);
// Output: Array(3) [ {...}, {...}, {...} ] ← hard to read
```

**With table:**

```javascript
console.table(students);
// Expected Output:
// ┌─────────┬─────────┬───────┐
// │ (index) │  name   │ grade │
// ├─────────┼─────────┼───────┤
// │    0    │ "Alice" │  "A"  │
// │    1    │  "Bob"  │  "B"  │
// │    2    │ "Carol" │  "A"  │
// └─────────┴─────────┴───────┘
```

**Real-world use:** Inspecting API response data, reviewing form inputs, checking shopping cart contents.

---

### 2.6 `console.group()` and `console.groupEnd()` — Organised Output

When you have many log statements, grouping them keeps the console clean and readable.

```javascript
console.group("Order Summary");
  console.log("Item: Laptop");
  console.log("Quantity: 1");
  console.log("Price: ₦450,000");
console.groupEnd();

console.group("Customer Info");
  console.log("Name: Tunde");
  console.log("Email: tunde@email.com");
console.groupEnd();

// Expected Output:
// ▼ Order Summary
//     Item: Laptop
//     Quantity: 1
//     Price: ₦450,000
// ▼ Customer Info
//     Name: Tunde
//     Email: tunde@email.com
```

> 💡 Use `console.groupCollapsed()` to start a group in a **collapsed** state — useful when you don't always need to see the details.

---

### 2.7 `console.time()` and `console.timeEnd()` — Performance Timing

These measure how long a block of code takes to run. Use the same label string for both.

```javascript
console.time("loopTimer");

let total = 0;
for (let i = 0; i < 1_000_000; i++) {
  total += i;
}

console.timeEnd("loopTimer");
// Expected Output: loopTimer: 3.45ms  (time will vary)
```

**Real-world use:** Comparing two sorting algorithms, measuring API call duration, optimising render time.

---

### 2.8 `console.count()` — Count How Many Times Something Runs

```javascript
function processOrder(order) {
  console.count("Orders processed");
  // ... processing logic
}

processOrder({ id: 1 });
processOrder({ id: 2 });
processOrder({ id: 3 });

// Expected Output:
// Orders processed: 1
// Orders processed: 2
// Orders processed: 3
```

**Real-world use:** Verifying that a callback fires the expected number of times, debugging event listeners firing repeatedly.

---

### 2.9 `console.assert()` — Conditional Error Logging

`console.assert(condition, message)` only logs the message if the condition is **false**. Think of it as a built-in sanity check.

```javascript
let quantity = -5;

console.assert(quantity > 0, "❌ Quantity must be positive! Got:", quantity);
// Expected Output: Assertion failed: ❌ Quantity must be positive! Got: -5

let price = 100;
console.assert(price > 0, "Price must be positive");
// No output — condition is true, so nothing is logged
```

---

### 2.10 `console.clear()` — Clean Slate

Clears all previous console output. Useful at the start of a function you're debugging to avoid confusion with old messages.

```javascript
console.clear();
console.log("Fresh start!");
```

---

### 2.11 Labelled Object Logging with `{}`

A neat shortcut: wrap variables in `{}` to log their names and values together.

```javascript
let firstName = "Tunde";
let score = 95;
let passed = true;

console.log({ firstName, score, passed });
// Expected Output: { firstName: "Tunde", score: 95, passed: true }
```

This is far more readable than:
```javascript
console.log(firstName, score, passed);
// Output: Tunde 95 true  ← which variable is which?
```

---

### 2.12 Console Method Reference Table

| Method | Colour | Use For |
|--------|--------|---------|
| `console.log()` | White/default | General values, debugging |
| `console.warn()` | Yellow ⚠️ | Non-critical issues |
| `console.error()` | Red ❌ | Actual errors |
| `console.info()` | Blue ℹ️ | Informational messages |
| `console.table()` | Table | Arrays and objects |
| `console.group()` | Grouped | Organising related logs |
| `console.time()` | Timer | Performance measurement |
| `console.count()` | Counter | How often code runs |
| `console.assert()` | Red if false | Sanity checks |
| `console.clear()` | — | Wipe the console |

---

## 3. Breakpoints & DevTools

### 3.1 What Is a Breakpoint?

A **breakpoint** is a marker you place on a line of code that tells the browser: *"Stop here. Freeze everything. Let me look around."*

When the browser hits a breakpoint:
- All JavaScript execution **pauses**
- You can see the **exact value** of every variable at that moment
- You can step through the code **one line at a time**
- You can inspect the **call stack** (which functions led to this point)

**Real-world analogy:** A breakpoint is like hitting `Pause` during a sports replay — you can see exactly what position every player is in at that precise moment.

---

### 3.2 Opening Chrome DevTools Sources Panel

1. Open Chrome and navigate to your page
2. Press **F12** to open DevTools
3. Click the **Sources** tab
4. In the left panel, find and click your JavaScript file
5. Your code appears in the centre panel with line numbers

---

### 3.3 Setting a Breakpoint in DevTools

To set a breakpoint:
1. Click on the **line number** in the Sources panel
2. A blue marker appears — that's your breakpoint
3. Reload the page or trigger the function
4. The browser pauses at your breakpoint

**Example code:**

```javascript
function calculateTotal(price, quantity, taxRate) {
  let subtotal = price * quantity;         // Line 2
  let tax = subtotal * taxRate;            // Line 3
  let total = subtotal + tax;              // Line 4
  return total;                            // Line 5
}

let result = calculateTotal(50, 3, 0.1);
console.log("Total:", result);
// Expected final output: Total: 165
```

If you set a breakpoint on **Line 3**, when the function runs:
- Line 2 has already executed → `subtotal = 150`
- You can hover over `subtotal` and see `150`
- Line 3 has **not** run yet → `tax` is undefined
- You can now step forward to watch `tax` get its value

---

### 3.4 Stepping Controls — Moving Through Code

Once paused at a breakpoint, you use the control buttons in DevTools:

| Button | Keyboard | What It Does |
|--------|----------|-------------|
| ▶ Resume | F8 | Continue running until the next breakpoint |
| ↷ Step Over | F10 | Run the current line, stay in current function |
| ↓ Step Into | F11 | Jump inside a function call on the current line |
| ↑ Step Out | Shift+F11 | Finish current function, return to caller |
| ↺ Restart Frame | — | Re-run from the start of the current function |

**When to use each:**

```javascript
function greet(name) {         // Step Into goes here
  return "Hello, " + name;
}

function welcome() {
  let msg = greet("Tunde");    // ← Paused here
  console.log(msg);
}
```

- Press **Step Over (F10):** `greet("Tunde")` runs completely, you land on `console.log(msg)`, `msg` is now `"Hello, Tunde"`
- Press **Step Into (F11):** You jump *inside* the `greet` function to watch it run line by line

---

### 3.5 The Scope Panel

While paused, the **Scope panel** (on the right side of Sources) shows you:
- **Local:** Variables in the current function
- **Closure:** Variables from outer functions
- **Global:** Window-level variables

This is incredibly powerful — you see the *entire state* of your program at one moment in time.

---

### 3.6 Watch Expressions

You can add **Watch Expressions** in DevTools to monitor specific variables or expressions across steps:

1. In the Sources panel, find "Watch" on the right
2. Click the `+` button
3. Type any expression, e.g., `subtotal * 2` or `users.length`

As you step through code, the watch panel automatically updates with the current value.

---

### 3.7 Conditional Breakpoints

Sometimes a bug only occurs on a specific iteration of a loop (e.g., when `i === 500`). You don't want to click Resume 500 times. Use a **conditional breakpoint**:

1. **Right-click** a line number
2. Select **"Add conditional breakpoint"**
3. Type a condition: `i === 500`

The browser only pauses when that condition is `true`.

```javascript
for (let i = 0; i < 1000; i++) {
  processItem(items[i]);  // ← Conditional breakpoint: i === 500
}
```

---

### 3.8 Logpoints — Breakpoints That Log Without Stopping

A **logpoint** is like a `console.log()` you add through DevTools without modifying your code:

1. Right-click a line number
2. Select **"Add logpoint"**
3. Type a message like: `"i is: " + i`

The message is printed to the console every time that line runs — without pausing execution. This is ideal when stopping would change the behaviour (e.g., timing-sensitive code).

---

### 3.9 The `debugger` Statement vs DevTools Breakpoints

| Feature | `debugger` statement | DevTools Breakpoint |
|---------|---------------------|---------------------|
| In your code? | Yes | No |
| Must be removed before deploy | Yes | No (it's in the browser) |
| Works without DevTools open | No | Yes |
| Conditional? | With `if` statement | Built-in |
| Portable? | Yes (anyone can run it) | Only on your machine |

**Best practice:** Use the `debugger` statement during fast iteration. Use DevTools breakpoints for structured investigation.

---

### 3.10 The Call Stack Panel

The **Call Stack** panel shows the chain of function calls that led to the current breakpoint. It reads from bottom (first call) to top (current position).

```javascript
function step3() {
  debugger; // ← We're paused here
}

function step2() {
  step3();
}

function step1() {
  step2();
}

step1();
```

**Call Stack will show:**
```
step3   ← current position (top)
step2
step1
(anonymous)
```

Clicking any entry **jumps you to that function's context**, letting you inspect its local variables.

---

### 3.11 Event Listener Breakpoints

DevTools lets you pause on any **DOM event** without writing any code. In the Sources panel, look for **"Event Listener Breakpoints"** and expand it. You can check things like:

- Mouse → click
- Keyboard → keydown
- XHR/Fetch → request started

This is useful when you can't figure out which piece of code is triggering a behaviour.

---

## 4. JavaScript Error Types

### 4.1 Why Understanding Error Types Matters

When JavaScript encounters a problem, it throws an **Error object** with:
- A **type** (what kind of error)
- A **message** (what went wrong)
- A **stack trace** (where it happened)

Reading errors correctly is the fastest way to debug. The error message is JavaScript telling you *exactly* what is wrong.

```
ReferenceError: userName is not defined
    at greetUser (app.js:5)
    at main (app.js:12)
```

This tells you:
1. **Type:** `ReferenceError`
2. **Message:** `userName is not defined`
3. **Location:** Line 5 in `greetUser`, called from line 12 in `main`

---

### 4.2 SyntaxError — Code That Cannot Be Parsed

A **SyntaxError** happens before your code even runs. JavaScript's parser reads your file and finds something that isn't valid JavaScript syntax.

**Think of it as:** A grammar mistake so severe that the sentence cannot be understood.

```javascript
// Missing closing parenthesis
let result = (5 + 3;

// SyntaxError: Unexpected token ';'
```

```javascript
// Misspelled keyword
funtion greet() {
  return "hello";
}

// SyntaxError: Unexpected identifier 'greet'
```

**Common causes:**
- Missing `{`, `}`, `(`, `)`, `[`, `]`
- Misspelled `function`, `return`, `const`, `let`
- Missing commas in object/array literals
- Invalid template literal syntax

**How to fix:** The line number in the error message is where the *parser got confused*, not always where the actual typo is. Often the mistake is one line **above** the reported line.

> 💡 **Thinking Question:** If a `{` is missing on line 3, JavaScript might only report an error on line 10. Why?

---

### 4.3 ReferenceError — Using Something That Doesn't Exist

A **ReferenceError** occurs when you try to use a variable that has not been declared or is out of scope.

```javascript
console.log(customerName);
// ReferenceError: customerName is not defined
```

```javascript
function getDiscount() {
  let rate = 0.1;
}

console.log(rate); // rate only exists inside getDiscount
// ReferenceError: rate is not defined
```

**Common causes:**
- Typo in a variable name (`usreName` instead of `userName`)
- Using a variable before declaring it (with `let` or `const`)
- Accessing a `let`/`const` variable in its Temporal Dead Zone
- Variable declared inside a function, used outside

```javascript
// Temporal Dead Zone example
console.log(myVar); // ReferenceError
let myVar = 10;     // Declaration is here
```

> 💡 **Note:** `var` behaves differently — it is **hoisted** and gives `undefined` instead of a ReferenceError. This is why `let` and `const` are safer.

---

### 4.4 TypeError — Wrong Type for the Operation

A **TypeError** occurs when you perform an operation on a value that is the wrong type — or when you try to call something that isn't a function, or access a property on `null`/`undefined`.

```javascript
let count = 42;
count(); // Trying to call a number as a function
// TypeError: count is not a function
```

```javascript
let user = null;
console.log(user.name);
// TypeError: Cannot read properties of null (reading 'name')
```

```javascript
let total = "100" * "hello";
// Result: NaN (Not a Number) — not a TypeError but a logic error
```

**Common causes:**
- Calling a non-function
- Accessing a property on `null` or `undefined` (the #1 most common bug)
- Using array methods on non-arrays
- Wrong data type passed to a function

**Real-world fix pattern:**

```javascript
// Instead of:
console.log(user.name); // Might crash

// Use optional chaining:
console.log(user?.name); // Returns undefined safely if user is null
```

---

### 4.5 RangeError — Value Outside Acceptable Range

A **RangeError** occurs when a value is outside the valid range for an operation.

```javascript
let arr = new Array(-5);
// RangeError: Invalid array length

let num = 3.14159;
console.log(num.toFixed(200));
// RangeError: toFixed() digits argument must be between 0 and 100
```

```javascript
// Stack overflow from infinite recursion
function countdown(n) {
  return countdown(n - 1); // No stopping condition!
}
countdown(10);
// RangeError: Maximum call stack size exceeded
```

**Common causes:**
- Infinite recursion (function calling itself with no base case)
- Invalid array length
- Passing too large a number to formatting methods

---

### 4.6 URIError — Invalid URI Operations

A **URIError** is thrown when `decodeURIComponent()` or similar functions receive an invalid URI sequence.

```javascript
decodeURIComponent("%");
// URIError: URI malformed
```

This is rare in everyday code but can appear when handling URL parameters from external sources.

---

### 4.7 EvalError — Legacy `eval()` Errors

**EvalError** was historically thrown for errors in `eval()`. Modern JavaScript no longer throws it, but it exists for legacy compatibility. Avoid using `eval()` entirely — it is a security and performance risk.

---

### 4.8 Custom Errors with `throw`

You can create your own error messages using `throw`:

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

try {
  let result = divide(10, 0);
} catch (error) {
  console.error("Caught an error:", error.message);
}
// Expected Output: Caught an error: Division by zero is not allowed.
```

**Real-world use:** Validating function inputs, enforcing business rules, signalling impossible states.

---

### 4.9 `try`, `catch`, `finally` — Handling Errors Gracefully

These three keywords let you **catch errors before they crash your program**:

```javascript
try {
  // Code that might throw an error
  let data = JSON.parse("{ invalid json }");
} catch (error) {
  // Runs only if an error occurred
  console.error("Failed to parse JSON:", error.message);
} finally {
  // ALWAYS runs, error or not
  console.log("Parsing attempt complete.");
}

// Expected Output:
// Failed to parse JSON: Unexpected token 'i', "{ invalid json }" is not valid JSON
// Parsing attempt complete.
```

**The `error` object has:**
- `error.name` — Type of error (e.g., `"SyntaxError"`)
- `error.message` — Human-readable description
- `error.stack` — Full stack trace

---

### 4.10 Reading a Stack Trace

A **stack trace** tells you the sequence of function calls that led to an error. Read it **top-to-bottom** — the top is where the error occurred, the bottom is where execution started.

```
TypeError: Cannot read properties of undefined (reading 'price')
    at calculateTotal (checkout.js:15:18)
    at processCart (checkout.js:42:5)
    at handleCheckout (app.js:103:3)
    at HTMLButtonElement.onclick (app.js:87:1)
```

**Reading this:**
1. Error happened in `calculateTotal` at line 15, column 18 of `checkout.js`
2. `calculateTotal` was called from `processCart` at line 42
3. `processCart` was called from `handleCheckout` at line 103 of `app.js`
4. `handleCheckout` was triggered by a button click

**Action:** Open `checkout.js`, go to line 15, inspect what object `price` is being read from.

---

### 4.11 Error Type Summary

| Error Type | When It Happens | Classic Example |
|------------|-----------------|-----------------|
| `SyntaxError` | Invalid syntax, code won't parse | Missing `}` or `)` |
| `ReferenceError` | Variable doesn't exist | Using `x` before `let x` |
| `TypeError` | Wrong type, null access | `null.name` |
| `RangeError` | Value out of bounds | Infinite recursion |
| `URIError` | Malformed URI | `decodeURIComponent("%")` |
| `EvalError` | Legacy `eval()` issue | Rarely seen today |

---

## 5. Debugging Asynchronous Code

### 5.1 Why Async Code Is Harder to Debug

Synchronous code runs in order — line 1, then line 2, then line 3. Errors appear exactly where they happen.

Asynchronous code is different. A fetch request, a setTimeout, or a database query happens **in the future**. When it completes, a callback or Promise resolves. Errors may appear in a completely different place from where the async operation was started.

**The core challenge:**

```javascript
console.log("1 - Start");

setTimeout(() => {
  console.log("2 - Inside timeout");
  throw new Error("Async error!"); // ← Where does this error appear?
}, 1000);

console.log("3 - End");

// Output:
// 1 - Start
// 3 - End
// (1 second later...)
// 2 - Inside timeout
// Uncaught Error: Async error!
```

The code after the timeout (`"3 - End"`) runs before the timeout's callback. The error appears 1 second later, seemingly disconnected from the rest of the code.

---

### 5.2 Async/Await vs Callbacks vs Promises

JavaScript has three ways to handle async code. Understanding each is key to debugging them.

**Callbacks (old way):**

```javascript
fs.readFile("data.txt", function(err, data) {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File contents:", data);
});
```

**Promises (modern way):**

```javascript
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Fetch failed:", error));
```

**Async/Await (cleanest syntax):**

```javascript
async function getUsers() {
  try {
    let response = await fetch("https://api.example.com/users");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
```

All three do the same thing. Async/await is the easiest to debug because it reads like synchronous code.

---

### 5.3 Debugging Promises

**Problem:** An unhandled Promise rejection.

```javascript
function getUserData(id) {
  return fetch(`https://api.example.com/users/${id}`)
    .then(res => res.json());
}

getUserData(999); // No .catch() — if this fails, error is silent or printed as warning
```

**Fix — Always add `.catch()`:**

```javascript
getUserData(999)
  .then(data => console.log("User:", data))
  .catch(error => console.error("Could not load user:", error.message));
```

**Simulating a rejection for debugging:**

```javascript
let brokenPromise = Promise.reject(new Error("Simulated failure"));

brokenPromise.catch(err => {
  console.error("Caught:", err.message);
});
// Expected Output: Caught: Simulated failure
```

---

### 5.4 Debugging with `async`/`await` and `try`/`catch`

Using `try/catch` with `async/await` is the gold standard for handling async errors:

```javascript
async function loadProduct(productId) {
  try {
    console.log("Fetching product...");
    
    let response = await fetch(`/api/products/${productId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    let product = await response.json();
    console.log("Product loaded:", product.name);
    return product;
    
  } catch (error) {
    console.error("Failed to load product:", error.message);
    return null;
  }
}

loadProduct(42);
// If successful: Fetching product... → Product loaded: Laptop
// If failed: Fetching product... → Failed to load product: HTTP error! Status: 404
```

---

### 5.5 Async Stack Traces in DevTools

Modern DevTools (Chrome, Firefox, Edge) support **async stack traces** — they show you not just where the error occurred, but also the *asynchronous chain* that led there.

When you see a stack trace like:

```
Error: Network failure
    at processResponse (api.js:12)
    at async loadUser (user.js:8)     ← async frame
    at async renderProfile (app.js:45) ← async frame
```

The `async` labels show you which parts of the chain are asynchronous.

**Enabling Async Stack Traces:**
In Chrome DevTools → Settings (⚙️) → "Capture async stack traces" → Enable

---

### 5.6 Debugging `setTimeout` and `setInterval`

These create **deferred execution** — code that runs after a delay. If they contain bugs, the error appears after the delay with no obvious connection to where the timer was set.

**Debugging strategy: add logging before, inside, and after:**

```javascript
console.log("Timer is being set...");

let counter = 0;
let intervalId = setInterval(() => {
  counter++;
  console.log("Interval tick:", counter);
  
  if (counter >= 5) {
    console.log("Clearing interval after 5 ticks");
    clearInterval(intervalId);
  }
}, 500);

// Expected Output (every 500ms):
// Timer is being set...
// Interval tick: 1
// Interval tick: 2
// Interval tick: 3
// Interval tick: 4
// Interval tick: 5
// Clearing interval after 5 ticks
```

**Common mistake:** Forgetting to clear an interval, causing it to run forever.

---

### 5.7 Debugging Parallel Async Operations with `Promise.all()`

When running multiple async operations at once, you need to handle errors for the whole group:

```javascript
async function loadDashboard(userId) {
  try {
    let [user, orders, notifications] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/orders/${userId}`).then(r => r.json()),
      fetch(`/api/notifications/${userId}`).then(r => r.json())
    ]);
    
    console.log("User:", user.name);
    console.log("Orders count:", orders.length);
    console.log("Notifications:", notifications.length);
    
  } catch (error) {
    // If ANY of the three requests fail, we land here
    console.error("Dashboard failed to load:", error.message);
  }
}
```

**Debugging tip:** If `Promise.all()` fails and you don't know which request caused it, use `Promise.allSettled()` during debugging — it resolves with the status of *all* promises, succeeded or failed:

```javascript
let results = await Promise.allSettled([
  fetch("/api/users/1").then(r => r.json()),
  fetch("/api/orders/1").then(r => r.json()),
  fetch("/api/broken-endpoint").then(r => r.json())
]);

results.forEach((result, index) => {
  if (result.status === "fulfilled") {
    console.log(`Request ${index} succeeded:`, result.value);
  } else {
    console.error(`Request ${index} FAILED:`, result.reason.message);
  }
});
```

---

### 5.8 The Async XHR/Fetch Breakpoints

In DevTools → Sources panel → Event Listener Breakpoints → expand **XHR/fetch**:
- Check **"Request is sent"** to pause when any fetch starts
- Check **"Request is completed"** to pause when the response arrives

This is powerful for debugging API calls without adding any `console.log()` to your code.

---

### 5.9 Common Async Debugging Mistakes

| Mistake | Effect | Fix |
|---------|--------|-----|
| No `.catch()` on a Promise | Silent failure | Always chain `.catch()` |
| `await` outside `async` function | SyntaxError | Wrap in `async function` |
| Forgetting `await` on a Promise | Operates on Promise object, not resolved value | Add `await` |
| Not checking `response.ok` | Treats HTTP error responses as success | Check `response.ok` |
| Infinite `setInterval` | Memory leak, performance issues | Always `clearInterval()` |

**The "missing await" bug is particularly sneaky:**

```javascript
async function processData() {
  let data = fetch("/api/data"); // ← Missing await!
  console.log(data);             // Logs a Promise object, not the data
  // Expected (wrong): Promise { <pending> }
  // Should be: { ...actual data... }
}

// Fix:
async function processData() {
  let data = await fetch("/api/data"); // ← Fixed
  let json = await data.json();
  console.log(json); // Now logs actual data
}
```

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Console Detective

**Objective:** Use multiple `console` methods to investigate a shopping cart calculation.

**Scenario:** You're building the shopping cart for an online store. The total seems wrong but you don't know where the error is.

**Warm-up example:**

```javascript
// Before starting — practice console.table:
let items = [
  { name: "Pen",   qty: 3, price: 50 },
  { name: "Book",  qty: 1, price: 800 },
  { name: "Ruler", qty: 2, price: 150 }
];
console.table(items);
```

**Your task — debug this cart function:**

```javascript
function calculateCartTotal(items) {
  let total = 0;
  
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemTotal = item.qty * item.price;
    total = total + itemTotal;
  }
  
  let discount = 0.10;
  let discountAmount = total / discount; // ← Possible bug here?
  let finalTotal = total - discountAmount;
  
  return finalTotal;
}

let cart = [
  { name: "Headphones", qty: 1, price: 15000 },
  { name: "USB Cable",  qty: 2, price: 1500  },
  { name: "Mouse",      qty: 1, price: 8000  }
];

console.log("Cart total:", calculateCartTotal(cart));
// This gives a strange answer — find and fix the bug!
```

**Step-by-step instructions:**

1. Add `console.group("Cart Debug")` at the start of the function
2. Inside the loop, add `console.log("Item:", item.name, "| Item total:", itemTotal)`
3. After the loop, log `total` with a label
4. Log `discount`, `discountAmount`, and `finalTotal` separately
5. Close the group with `console.groupEnd()`
6. Read the output and identify the bug
7. Fix it and verify the correct total

**Hints:**
- Look carefully at the discount formula: should `total / discount` give you 10% of the total?
- 10% of `₦26,000` should be `₦2,600`, not `₦260,000`

**Self-check questions:**
- What is `total` after the loop completes?
- What does `total / 0.10` produce vs `total * 0.10`?
- What should `finalTotal` be after a 10% discount?

**What-if challenge:** What happens if one of the cart items has `price: undefined`? Add a `console.assert()` check to catch this.

---

## Exercise 2 — DevTools Breakpoint Investigation

**Objective:** Use breakpoints to step through a grade calculation function.

**Scenario:** A school app calculates student grades. A student scored 72 on all three tests but their final grade is showing incorrectly.

```javascript
function calculateGrade(scores) {
  let total = 0;
  
  for (let score of scores) {
    total = total + score;
  }
  
  let average = total / scores.length;
  let grade;
  
  if (average >= 90) {
    grade = "A";
  } else if (average >= 80) {
    grade = "B";
  } else if (average >= 70) {
    grade = "C";
  } else if (average >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }
  
  return { average, grade };
}

let studentScores = [72, 72, 72];
let result = calculateGrade(studentScores);
console.log(`Average: ${result.average}, Grade: ${result.grade}`);
// Expected Output: Average: 72, Grade: C
```

**Step-by-step instructions:**

1. Open this code in a browser (create a simple `.html` file)
2. Open DevTools → Sources
3. Set a breakpoint on the line `let average = total / scores.length;`
4. Reload the page
5. When paused, check the Scope panel — what is `total`?
6. Step over to the next line — what is `average` now?
7. Continue stepping until `grade` is assigned
8. Verify that `grade === "C"` for an average of 72

**Optional challenge:** Change the scores array to `[55, 90, 78]` and set a **conditional breakpoint** that only fires when `average < 70`. Observe the grade assignment.

---

## Exercise 3 — Error Type Identification

**Objective:** Read JavaScript errors and identify their type and cause without running the code.

**Instructions:** For each snippet, predict the error type and message, then explain the fix.

```javascript
// Snippet A
function showGreeting() {
  console.log(welcomeMessage);
}
showGreeting();
```

```javascript
// Snippet B
let data = null;
console.log(data.username);
```

```javascript
// Snippet C
function countDown(n) {
  console.log(n);
  countDown(n - 1); // No base case
}
countDown(5);
```

```javascript
// Snippet D
let numbers = [1, 2, 3];
numbers.forEach(console.log);
let reversed = numbers.reverse(10); // reverse() takes no arguments, but this won't error — what DOES the call return?
let bad = numbers.toUpperCase(); // Arrays don't have this method
```

```javascript
// Snippet E
let json = '{ "name": "Tunde", "age": }'; // Invalid JSON
JSON.parse(json);
```

**Expected answers (for self-check):**
- A: `ReferenceError` — `welcomeMessage` not declared
- B: `TypeError` — Cannot read properties of null
- C: `RangeError` — Maximum call stack size exceeded
- D: `TypeError` — `numbers.toUpperCase is not a function`
- E: `SyntaxError` — Unexpected token `}` in JSON

---

## Exercise 4 — Async Debugging Challenges

**Objective:** Fix three async bugs.

**Bug 1 — Missing await:**

```javascript
async function getProductName(id) {
  let response = fetch(`/api/products/${id}`);
  let product = response.json(); // Both missing await
  return product.name;
}

// Fix this function so it correctly returns the product name
```

**Bug 2 — No error handling:**

```javascript
async function deleteUser(userId) {
  let response = await fetch(`/api/users/${userId}`, {
    method: "DELETE"
  });
  let data = await response.json();
  console.log("User deleted:", data);
}

// This function has no error handling
// Add try/catch and check response.ok
```

**Bug 3 — Infinite interval:**

```javascript
function startLiveScoreUpdater(matchId) {
  setInterval(async () => {
    let res = await fetch(`/api/scores/${matchId}`);
    let score = await res.json();
    document.getElementById("score").textContent = score.current;
  }, 2000);
  // This interval runs forever — how would you stop it?
}

// Fix: return the interval ID and call clearInterval() when the match ends
```

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Personal Finance Debugger Dashboard

**Overview:** You are building a personal finance tracker. The application loads transactions from an API, categorises expenses, and displays a summary. But the code has bugs — your job is to find and fix all of them using the techniques from this tutorial.

**Real-world connection:** Every fintech product (Paystack, Flutterwave, bank apps) has transaction processing code just like this. Debugging it correctly can mean the difference between correct and incorrect balances.

---

### Stage 1 — Setup and Core Logic

**Simple example first:**

```javascript
// Micro-example: basic transaction processing
let transactions = [
  { id: 1, type: "income",  amount: 50000, category: "Salary" },
  { id: 2, type: "expense", amount: 3000,  category: "Food"   }
];

let total = transactions.reduce((acc, t) => {
  return t.type === "income" ? acc + t.amount : acc - t.amount;
}, 0);

console.log("Net balance:", total); // Expected: 47000
```

**Full stage 1 code with bugs to find:**

```javascript
const transactions = [
  { id: 1, type: "income",  amount: 150000, category: "Salary",   date: "2024-01-01" },
  { id: 2, type: "expense", amount: 12000,  category: "Rent",     date: "2024-01-02" },
  { id: 3, type: "expense", amount: 3500,   category: "Food",     date: "2024-01-05" },
  { id: 4, type: "income",  amount: 25000,  category: "Freelance",date: "2024-01-10" },
  { id: 5, type: "expense", amount: 8000,   category: "Transport",date: "2024-01-15" },
  { id: 6, type: "expense", amount: 5000,   category: "Food",     date: "2024-01-20" }
];

function getNetBalance(transactions) {
  let balance = 0;
  for (let t of transactions) {
    if (t.type === "income") {
      balance = balance + t.amount;
    } else {
      balance = balance - t.amount;  
    }
  }
  return balance;
}

function getTotalByCategory(transactions, category) {
  return transactions
    .filter(t => t.category = category)  // Bug: = instead of ===
    .reduce((sum, t) => sum + t.amount, 0);
}

function getMostExpensiveCategory(transactions) {
  let expenses = transactions.filter(t => t.type === "expense");
  
  let categoryTotals = {};
  for (let t of expenses) {
    if (categoryTotals[t.category]) {
      categoryTotals[t.category] += t.amount;
    } else {
      categoryTotals[t.category] = t.amount;
    }
  }
  
  let maxCategory = null;
  let maxAmount = 0;
  
  for (let [category, amount] of Object.entries(categoryTotals)) {
    if (amount > maxAmount) {
      maxAmount = amount;
      maxCategory = category;
    }
  }
  
  return { category: maxCategory, total: maxAmount };
}

// Test the functions:
console.log("Net balance:", getNetBalance(transactions));
// Expected: 146500

console.log("Food total:", getTotalByCategory(transactions, "Food"));
// Expected: 8500 (3500 + 5000)
// Bug in filter will make this wrong!

console.log("Most expensive:", getMostExpensiveCategory(transactions));
// Expected: { category: "Rent", total: 12000 }

console.table(transactions);
```

**Your tasks:**
1. Add `console.group` and `console.log` statements to each function
2. Identify the bug in `getTotalByCategory()` (Hint: assignment vs comparison)
3. Set a breakpoint inside `getMostExpensiveCategory()` to watch `categoryTotals` build up
4. Fix all bugs and verify all three expected outputs

---

### Stage 2 — Adding Async Data Loading

**Simple example first:**

```javascript
// Micro-example: basic async fetch
async function loadData(url) {
  try {
    let res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error("Load failed:", e.message);
    return [];
  }
}
```

**Full stage 2 — async data loading with bugs:**

```javascript
// Simulated API using local data (for practice without a real server)
function simulateAPI(delay = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 7, type: "income",  amount: 75000, category: "Bonus",    date: "2024-02-01" },
        { id: 8, type: "expense", amount: 15000, category: "Rent",     date: "2024-02-02" },
        { id: 9, type: "expense", amount: 4200,  category: "Utilities",date: "2024-02-10" }
      ]);
    }, delay);
  });
}

async function loadAndProcessTransactions() {
  console.time("data-load");
  
  // Bug 1: no await
  let newTransactions = simulateAPI(500);
  
  console.timeEnd("data-load");
  
  // Bug 2: newTransactions is a Promise, not an array — this will fail
  let allTransactions = [...transactions, ...newTransactions];
  
  console.log("Total transactions:", allTransactions.length);
  // Expected: 9 (6 original + 3 from API)
  
  let balance = getNetBalance(allTransactions);
  console.log("Updated balance:", balance);
  // Expected: 206300
  
  return allTransactions;
}

loadAndProcessTransactions();
```

**Your tasks:**
1. Identify why `allTransactions.length` is wrong
2. Fix the missing `await`
3. Add a `try/catch` block around the entire function body
4. Add `console.assert(allTransactions.length === 9, "Expected 9 transactions")`
5. Verify the balance is `206300` after the fix

---

### Stage 3 — Error Reporting and Display

```javascript
// Final stage: a complete, production-ready version

async function runFinanceDashboard() {
  console.group("💰 Finance Dashboard");
  
  try {
    console.log("Loading transactions...");
    let apiTransactions = await simulateAPI(300);
    let allTransactions = [...transactions, ...apiTransactions];
    
    // Validate data
    for (let t of allTransactions) {
      console.assert(
        typeof t.amount === "number" && t.amount > 0,
        `Invalid amount in transaction ID ${t.id}:`, t.amount
      );
      console.assert(
        t.type === "income" || t.type === "expense",
        `Invalid type in transaction ID ${t.id}:`, t.type
      );
    }
    
    // Display summary
    console.group("Summary");
    console.log("Total transactions:", allTransactions.length);
    console.log("Net balance: ₦" + getNetBalance(allTransactions).toLocaleString());
    console.log("Food spending: ₦" + getTotalByCategory(allTransactions, "Food").toLocaleString());
    let top = getMostExpensiveCategory(allTransactions);
    console.log(`Top expense: ${top.category} (₦${top.total.toLocaleString()})`);
    console.groupEnd();
    
    // Display table
    console.table(allTransactions.map(t => ({
      ID:       t.id,
      Type:     t.type,
      Category: t.category,
      Amount:   `₦${t.amount.toLocaleString()}`,
      Date:     t.date
    })));
    
  } catch (error) {
    console.error("Dashboard crashed:", error.message);
    console.error(error.stack);
  } finally {
    console.groupEnd();
    console.log("Dashboard run complete.");
  }
}

runFinanceDashboard();
```

**Expected final output:**
```
▼ 💰 Finance Dashboard
  Loading transactions...
  ▼ Summary
    Total transactions: 9
    Net balance: ₦206,300
    Food spending: ₦8,500 (or ₦12,700 with Food from month 2 if any)
    Top expense: Rent (₦27,000)
  [table of all 9 transactions]
Dashboard run complete.
```

---

### Reflection Questions

1. **Why is `console.group()` more professional than plain `console.log()` for dashboard output?**
2. **In Stage 2, how did the missing `await` cause the spread operator to fail?**
3. **If this were a real bank app with 50,000 transactions, how would you modify `loadAndProcessTransactions()` to handle pagination and progressive loading?**
4. **What is the difference between an error that crashes your app and one that you `catch` and handle gracefully? Which is better from a user experience perspective?**
5. **How would you use `console.time()` to compare two different implementations of `getMostExpensiveCategory()`?**

---

### Advanced Challenges (Optional)

1. **Source Maps:** Research what source maps are and why they're needed when debugging minified production code.
2. **Error Monitoring:** Look up Sentry or LogRocket — tools that automatically capture and report JavaScript errors from real users.
3. **Custom Error Classes:** Create `class ValidationError extends Error` and `class NetworkError extends Error` and throw them appropriately from your functions.
4. **Performance Profiling:** Use the Chrome DevTools **Performance** tab to record and analyse a heavy computation in your dashboard.

---

# Completion Checklist

- [x] **Debugging basics:** Understand what bugs are, how they enter code, and the general debugging workflow
- [x] **`debugger` statement:** Know when to use it and remember to remove it before deployment
- [x] **Console methods:** `log`, `warn`, `error`, `table`, `group`, `time`, `count`, `assert`, `clear` — all explained with examples
- [x] **DevTools breakpoints:** Set, remove, and use conditional breakpoints and logpoints
- [x] **Stepping controls:** Step Over, Step Into, Step Out — know which to use when
- [x] **Call Stack and Scope panels:** Understand the state of the program at any paused moment
- [x] **Error types:** SyntaxError, ReferenceError, TypeError, RangeError — causes and fixes
- [x] **`try/catch/finally`:** Handle errors gracefully without crashing the app
- [x] **Stack traces:** Read and interpret them to locate bugs quickly
- [x] **Async debugging:** Promises, async/await, missing `await`, unhandled rejections
- [x] **`Promise.allSettled()`:** Debug parallel async operations
- [x] **Exercises completed:** Console detective, breakpoint investigation, error identification, async fixes
- [x] **Project built:** Finance Dashboard with debugging instrumentation across all three stages
- [x] **Common mistakes highlighted:** missing `await`, `=` vs `===`, no `.catch()`, infinite intervals
- [x] **Reflection questions answered**

---

**One-sentence summary:** Debugging is the systematic process of finding and fixing errors using JavaScript's built-in error types, the browser console, DevTools breakpoints, and async-aware error handling — skills that transform you from someone who writes code into someone who *understands* code.
