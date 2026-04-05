---
title: "JavaScript: Scope, Code Blocks, Hoisting & Strict Mode"
nav_order: 11
---

## 📑 Table of Contents
1. [Background: What is a Variable?](#background-what-is-a-variable)
2. [Topic 1 — JavaScript Scope](#topic-1--javascript-scope) (Global, Function, Block)
3. [Topic 2 — Code Blocks `{ }`](#topic-2--javascript-code-blocks)
4. [Topic 3 — Hoisting](#topic-3--javascript-hoisting)
5. [Topic 4 — Strict Mode ("use strict")](#topic-4--javascript-strict-mode-use-strict)
6. [Applied Exercises](#applied-exercises)
7. [Mini Project: Safe Student Score Tracker](#mini-project-safe-student-score-tracker)
8. [Completion Checklist](#completion-checklist)

---

## 🧱 Background: What is a Variable?

Before we talk about *scope*, you need to know what a variable is. A **variable** is a named container that holds a value. Think of it like a labelled box.

```javascript
let age = 25;        // "age" is the label, 25 is the value inside
let name = "Maria";  // "name" holds the text "Maria"
const PI = 3.14;     // "PI" holds a fixed number (can't be changed)
```

In JavaScript there are three ways to declare a variable:

| Keyword | Can be changed? | Block-scoped? | Hoisted? |
|---------|----------------|--------------|---------|
| `var` | ✅ Yes | ❌ No | ✅ Yes (fully — value = `undefined`) |
| `let` | ✅ Yes | ✅ Yes | ✅ Yes (but in Temporal Dead Zone) |
| `const` | ❌ No | ✅ Yes | ✅ Yes (but in Temporal Dead Zone) |

This table will make complete sense by the end of this lesson. Let's go through each topic step by step.

---

## 🔭 Topic 1 — JavaScript Scope

> **Phase 1 — Conceptual Understanding**

**Scope** simply means: *"Where can this variable be seen?"*

Imagine you write a private diary. Only you can read it (local/function scope). But a notice board at school can be read by everyone (global scope). That is exactly how scope works in code.

JavaScript variables have **3 types of scope:**

- 🌍 **Global Scope**
- 🏠 **Function Scope**
- 📦 **Block Scope**

---

### 1A — Global Scope

A variable declared **outside any function or block** has *global scope*. Any part of your program can read or change it — like a whiteboard everyone in the office can see and write on.

```javascript
let carName = "Volvo";  // declared outside everything → GLOBAL

function myFunction() {
  console.log(carName); // ✅ works fine inside the function too
}

myFunction();
console.log(carName);   // ✅ works here too
```

**▶ Expected Output:**
```
Volvo
Volvo
```

All three keywords behave the same when declared globally:

```javascript
var x = 1;   // global
let y = 2;   // global
const z = 3; // global
```

> ⚠️ **WATCH OUT:** Global variables defined with `var` become a property of the browser's `window` object, so `window.carName` would work. Variables declared with `let` or `const` are global but do **NOT** attach to `window`. Always prefer `let` and `const`.

> 🏢 **REAL WORLD:** In a company's JavaScript codebase, global variables are avoided because multiple developers or scripts can accidentally overwrite them. Instead, developers use functions and modules to keep variables private.

#### ⚡ The Danger: Accidentally Global Variables

If you assign a value to a variable you never declared, JavaScript (without strict mode) *silently* creates a global variable. This is a major bug source!

```javascript
function myFunction() {
  carName = "Volvo"; // ← No let/const/var! Becomes GLOBAL automatically.
}

myFunction();
console.log(carName); // "Volvo" — visible everywhere! Dangerous!
```

**▶ Expected Output:**
```
Volvo
```

> 🤔 **THINK ABOUT IT:** What happens if two different functions both accidentally create a global variable called `price`? The second one would overwrite the first — silent bug!

---

### 1B — Function Scope (Local Variables)

Variables declared **inside a function** are called *local* variables. They only exist inside that function. Once the function ends, they are deleted from memory.

Think of it like a whiteboard inside a private office — only people in that room can see it.

```javascript
// code HERE cannot use carName

function myFunction() {
  let carName = "Volvo";  // LOCAL variable
  console.log(carName);   // ✅ works inside the function
}

myFunction();
// console.log(carName);  // ❌ ReferenceError — carName does not exist here
```

**▶ Expected Output:**
```
Volvo
```

All three keywords (`var`, `let`, `const`) behave the same way inside a function — they are all function-scoped:

```javascript
function myFunction1() { var   city = "Lagos";  } // local
function myFunction2() { let   city = "Paris";  } // local
function myFunction3() { const city = "Tokyo";  } // local
```

**Key rules for local/function-scoped variables:**

- Only accessible from *inside* the function
- Variables with the same name can exist in different functions without conflict
- Created when the function starts running
- Deleted (garbage-collected) when the function finishes
- Function parameters also act as local variables

```javascript
// Same name "score" in two different functions — no conflict!
function getStudentScore() {
  let score = 85;
  console.log("Student:", score);
}

function getTeacherScore() {
  let score = 95;
  console.log("Teacher:", score);
}

getStudentScore(); // Student: 85
getTeacherScore(); // Teacher: 95
```

**▶ Expected Output:**
```
Student: 85
Teacher: 95
```

> 🏢 **REAL WORLD:** In a payroll system, each employee's salary calculation runs inside its own function. The variable `salary` inside one function never interferes with the `salary` inside another function.

---

### 1C — Block Scope (ES6+)

A **block** is any code surrounded by curly braces `{ }` — like inside an `if` statement, a `for` loop, or even a standalone pair of braces.

Before 2015 (ES6), JavaScript only had global and function scope. ES6 introduced `let` and `const`, which gave us **block scope**.

#### With `let` or `const` — Block-Scoped ✅ (RECOMMENDED)

```javascript
{
  let x = 10;      // x only exists inside these braces
  console.log(x);  // ✅ 10
}
// console.log(x); // ❌ ReferenceError: x is not defined
```

**▶ Expected Output:**
```
10
```

#### With `var` — NOT Block-Scoped ❌ (AVOID)

```javascript
{
  var x = 10;      // var IGNORES the block!
}
console.log(x);    // ✅ 10 — wait, it leaked out of the block!
```

**▶ Expected Output:**
```
10
```

> 🐛 **COMMON MISTAKE:** This is one of the most common beginner mistakes. Using `var` inside an `if` or `for` block makes the variable visible *outside* the block, causing unexpected bugs. Always use `let` or `const`.

#### Real example: for-loop variable leaking with `var`

```javascript
// BAD — var leaks out of the loop
for (var i = 0; i < 3; i++) {
  console.log("inside:", i);
}
console.log("outside:", i); // 3 — i leaked out!

// GOOD — let stays inside the loop
for (let j = 0; j < 3; j++) {
  console.log("inside:", j);
}
// console.log("outside:", j); // ❌ ReferenceError — j is gone
```

**▶ Expected Output:**
```
inside: 0
inside: 1
inside: 2
outside: 3
inside: 0
inside: 1
inside: 2
```

### Variable Lifetime

| Variable Type | Created | Deleted |
|---------------|---------|---------|
| Global | When the script starts | When the browser tab is closed |
| Function (local) | When the function runs | When the function returns |
| Block (`let`/`const`) | When the block starts | When the block ends |

> 💡 **TIP:** Golden rule — **Always use `const` if the value won't change; use `let` if it will. Never use `var`** in modern JavaScript. This prevents scope bugs entirely.

---

---

## 📦 Topic 2 — JavaScript Code Blocks

> **Phase 1 — Conceptual Understanding**

Now that you understand scope, let's look more closely at **code blocks** — because blocks are what *create* scope.

A **code block** (also called a *block statement*) is a group of one or more statements enclosed in curly braces `{ }`.

> 💡 **TIP:** Think of curly braces like a fence around a yard. Everything inside the fence belongs to that yard (block). Variables declared inside with `let`/`const` cannot escape through the fence.

### Why Do Code Blocks Exist?

Code blocks allow multiple statements to be treated as a single unit. Without them, `if` statements and loops would only be able to execute exactly one line.

---

### 2A — Blocks in Functions

Every function body is a code block:

```javascript
function greetUser(name) {   // ← opens a code block
  let message = "Hello, " + name + "!";
  console.log(message);
}                             // ← closes the code block

greetUser("Amara");
```

**▶ Expected Output:**
```
Hello, Amara!
```

---

### 2B — Blocks in `if / else` Statements

Code blocks are what make `if/else` work with multiple lines:

```javascript
let temperature = 35;

if (temperature > 30) {          // opens block 1
  console.log("It's hot!");
  console.log("Stay hydrated.");
} else {                         // opens block 2
  console.log("Nice weather.");
  console.log("Enjoy your day.");
}
```

**▶ Expected Output:**
```
It's hot!
Stay hydrated.
```

---

### 2C — Blocks in Loops

```javascript
for (let i = 1; i <= 3; i++) {   // loop block
  let squared = i * i;
  console.log(i + " squared is " + squared);
}
// squared and i are NOT accessible here
```

**▶ Expected Output:**
```
1 squared is 1
2 squared is 4
3 squared is 9
```

---

### 2D — Standalone Code Blocks

This is a lesser-known feature: you can write a code block completely on its own, not attached to any function, loop, or condition. This is useful for *temporary calculations* — you need a variable briefly, then want it gone.

```javascript
// Standalone block — creates its own scope
{
  let x = 10;
  let y = 100;
  let area = x * y;
  console.log("Area:", area);
}
// x, y, area are all gone now — cannot cause name conflicts later
console.log("Block finished. Memory cleaned up.");
```

**▶ Expected Output:**
```
Area: 1000
Block finished. Memory cleaned up.
```

Standalone blocks are useful for three reasons:

1. **Encapsulation** — Variables inside the block are invisible outside, preventing "pollution" of the global scope.
2. **Temporary use** — Declare variables, use them, then discard them automatically when the block ends.
3. **Organized code** — Group related variables and statements without forcing them into a function or object. Improves readability and avoids name collisions.

> 🏢 **REAL WORLD:** Large company codebases sometimes use standalone blocks to isolate initialization logic for one specific component, preventing variable name conflicts with other parts of the app.

#### Demonstrating Name Isolation

```javascript
// Both blocks use "result" — zero conflict!
{
  let result = 10 * 5;
  console.log("Block A result:", result); // 50
}

{
  let result = "Hello World".toUpperCase();
  console.log("Block B result:", result); // HELLO WORLD
}

// Both "result" variables are GONE here — never interfered with each other
```

**▶ Expected Output:**
```
Block A result: 50
Block B result: HELLO WORLD
```

> 🤔 **THINK ABOUT IT:** What would happen if you used `var result` instead of `let result` in both blocks above? (Hint: `var` ignores block scope — the second block would overwrite the first!)

---

---

## 🚀 Topic 3 — JavaScript Hoisting

> **Phase 1 — Conceptual Understanding**

Hoisting is one of JavaScript's most confusing behaviours — but once you understand it, many mysterious bugs make sense.

**Hoisting** = JavaScript's default behaviour of moving all *declarations* to the top of their scope before code runs.

Imagine you hire a new assistant. Before they start working, they read through your entire task list to note down all the task names (declarations). Then they start doing the actual work. That's hoisting — declarations are "pre-read" first.

---

### 3A — Variable Declarations Are Hoisted (with `var`)

With `var`, you can technically *use* a variable before declaring it. JavaScript moves the declaration to the top automatically.

#### Example 1 — Declare AFTER use (this works!)

```javascript
x = 5;                    // Assign value to x
console.log(x);           // Use x
var x;                    // Declare x ← This line is hoisted to the top!
```

**▶ Expected Output:**
```
5
```

#### Example 2 — Declare BEFORE use (the normal way)

```javascript
var x;       // Declare x
x = 5;       // Assign value
console.log(x); // Use x
```

**▶ Expected Output:**
```
5
```

Both examples give the same result! JavaScript internally treats Example 1 as if it were Example 2.

> 💡 **TIP:** Internally, JavaScript reads your code twice. On the first pass it collects all `var` declarations. On the second pass it runs your code. This is why declarations are always "at the top" even if you wrote them at the bottom.

---

### 3B — Initializations Are NOT Hoisted

Here is the critical rule beginners get wrong: **only the declaration is hoisted — not the value assignment.**

Think of it like this: the "box" (variable name) is created at the top, but the "contents" (value) don't get put in until the original line runs.

#### Compare these two examples carefully:

```javascript
// EXAMPLE A — works as expected
var x = 5;  // Initialize x
var y = 7;  // Initialize y
console.log(x + " " + y); // 5 7
```

**▶ Expected Output:**
```
5 7
```

```javascript
// EXAMPLE B — y is hoisted but its value is NOT
var x = 5;
console.log(x + " " + y); // x=5, but y=???
var y = 7;                 // y's declaration hoisted, but value "7" stays here
```

**▶ Expected Output:**
```
5 undefined
```

**Why is `y` undefined?** Because JavaScript treats Example B internally like this:

```javascript
var x;          // declaration hoisted
var y;          // declaration hoisted (value NOT hoisted — y = undefined for now)

x = 5;
console.log(x + " " + y);  // "5 undefined" — y has no value yet
y = 7;          // NOW y gets its value — but too late for the console.log above
```

> 🐛 **COMMON MISTAKE:** Beginners often expect `y` to be 7 in this case. But initialization (assigning a value) is never hoisted — only the empty box (declaration) is hoisted. The box stays empty (`undefined`) until your code reaches the assignment line.

---

### 3C — `let` and `const` Are Hoisted Differently: The Temporal Dead Zone

`let` and `const` ARE hoisted (their existence is registered at the top of the block), but they are **NOT initialized**. This creates what is called a **Temporal Dead Zone (TDZ)** — a period between the start of the block and the actual declaration line, where the variable *exists* but is completely *unusable*.

```javascript
console.log(carName); // ❌ ReferenceError: Cannot access 'carName' before initialization
let carName = "Volvo";
```

```javascript
carName = "Volvo"; // ❌ SyntaxError — cannot use const before initialization
const carName;
```

Hoisting behaviour summary across keywords:

| Keyword | Declaration hoisted? | Value hoisted? | Usable before declaration? |
|---------|---------------------|---------------|--------------------------|
| `var` | ✅ Yes | ❌ No (value = `undefined`) | ✅ Yes (but value = `undefined`) |
| `let` | ✅ Yes (in TDZ) | ❌ No | ❌ No — `ReferenceError` |
| `const` | ✅ Yes (in TDZ) | ❌ No | ❌ No — `SyntaxError` |

---

### 3D — Function Declarations Are Fully Hoisted

Function declarations (not expressions) are hoisted *completely* — both the name AND the body. This means you can call a function before writing it:

```javascript
greet(); // ✅ Works! Function is hoisted completely.

function greet() {
  console.log("Good morning!");
}
```

**▶ Expected Output:**
```
Good morning!
```

> ⚠️ **WATCH OUT:** Function *expressions* (like `const greet = function() { }` or arrow functions) are **NOT** hoisted the same way. Only the variable declaration is hoisted (as `undefined`), not the function body. Calling them before their line causes a `TypeError`.

---

### 3E — Best Practice: Always Declare at the Top

Since hoisting can cause confusing behaviour, the solution is simple: **always declare your variables and functions at the very top of their scope**. This is what JavaScript does internally anyway — so you're just making it explicit and readable.

```javascript
// ✅ GOOD PRACTICE — declare at the top
function calculateTax(price) {
  const TAX_RATE = 0.15;   // const declared first
  let tax = price * TAX_RATE;
  let total = price + tax;
  return total;
}

console.log(calculateTax(100)); // 115
```

**▶ Expected Output:**
```
115
```

> 🏢 **REAL WORLD:** Senior developers always declare variables at the top of their functions. Code review tools and linters flag variables used before declaration as errors. Strict mode (next topic!) also prevents this.

---

---

## 🔒 Topic 4 — JavaScript Strict Mode (`"use strict"`)

> **Phase 1 — Conceptual Understanding**

By now you've seen that JavaScript is quite forgiving — it allows undeclared variables, implicit globals, and other "bad" behaviours. **Strict Mode** turns off this forgiveness and makes JavaScript stricter, safer, and more predictable.

Think of strict mode like switching your car from "automatic forgiveness mode" to "advanced driver mode" — it demands you follow all the rules properly, which makes you a better driver.

Strict mode was introduced in ECMAScript 5 (ES5) in 2009. All modern browsers fully support it.

---

### 4A — How to Declare Strict Mode

Strict mode is activated by adding the string `"use strict";` at the very beginning of a script or a function. It must be the **first statement** — nothing else can come before it (except comments).

#### Global Strict Mode (entire script)

```javascript
"use strict";         // ← MUST be the very first line

x = 3.14;             // ❌ ReferenceError — x is not declared
console.log(x);
```

#### Local Strict Mode (inside one function only)

```javascript
x = 3.14;         // ✅ No error — outside the function, no strict mode here

function strictFunction() {
  "use strict";   // ← strict mode only inside this function
  y = 3.14;       // ❌ ReferenceError — y not declared
}

strictFunction();
```

> 💡 **TIP:** Notice that `"use strict"` is a string — not a keyword. Older browsers that don't understand it simply evaluate it as a harmless string expression and ignore it. This makes it backward-compatible.

---

### 4B — Why Use Strict Mode?

Strict mode changes previously accepted "bad syntax" into real errors. This is actually a *good thing* — silent bugs become loud errors that you can fix immediately.

| Without Strict Mode | With Strict Mode |
|---------------------|-----------------|
| Undeclared variable → silently creates global | Undeclared variable → ❌ `ReferenceError` |
| Writing to read-only property → silently fails | Writing to read-only property → ❌ `TypeError` |
| Duplicate function parameters → silently ignores | Duplicate function parameters → ❌ `SyntaxError` |
| `delete` a variable → silently ignores | `delete` a variable → ❌ `SyntaxError` |

---

### 4C — What Is NOT Allowed in Strict Mode

Let's go through every restriction with a simple demo:

#### 1. Using an undeclared variable
```javascript
"use strict";
x = 3.14; // ❌ ReferenceError — x was never declared
```

#### 2. Using an undeclared object
```javascript
"use strict";
x = { p1: 10, p2: 20 }; // ❌ ReferenceError — x is not declared
```

#### 3. Deleting a variable or object
```javascript
"use strict";
let x = 3.14;
delete x; // ❌ SyntaxError — deleting a variable is not allowed
```

#### 4. Deleting a function
```javascript
"use strict";
function myFunc(p1, p2) {}
delete myFunc; // ❌ SyntaxError
```

#### 5. Duplicate parameter names
```javascript
"use strict";
function add(a, a) { } // ❌ SyntaxError — two parameters named "a"
```

#### 6. Octal (base-8) numeric literals
```javascript
"use strict";
let x = 010; // ❌ SyntaxError — octal literals not allowed
```

> 💡 **TIP:** Octal means a number starting with `0` in base-8. For example, `010` in normal mode equals `8` in decimal — very confusing! Strict mode disallows this to prevent mistakes.

#### 7. Octal escape characters
```javascript
"use strict";
let x = "\010"; // ❌ SyntaxError — octal escape characters not allowed
```

#### 8. Writing to a read-only property
```javascript
"use strict";
const obj = {};
Object.defineProperty(obj, "x", { value: 0, writable: false });
obj.x = 3.14; // ❌ TypeError — x is read-only
```

#### 9. Writing to a getter-only property
```javascript
"use strict";
const obj = { get x() { return 0; } };
obj.x = 3.14; // ❌ TypeError — x has no setter
```

#### 10. Deleting an undeletable property
```javascript
"use strict";
delete Object.prototype; // ❌ TypeError — Object.prototype cannot be deleted
```

#### 11. Using `eval` or `arguments` as variable names
```javascript
"use strict";
let eval = 3.14;       // ❌ SyntaxError
let arguments = 3.14;  // ❌ SyntaxError
```

> 💡 **TIP:** `eval` is a built-in JavaScript function that evaluates code from a string. `arguments` is a special object inside functions. Using them as variable names would override these built-in features — strict mode prevents this.

#### 12. The `with` statement
```javascript
"use strict";
with (Math) { x = cos(2); } // ❌ SyntaxError — "with" is not allowed
```

#### 13. `eval()` cannot create variables in its calling scope
```javascript
"use strict";
eval("x = 2");
alert(x); // ❌ ReferenceError — eval cannot leak variables into the outer scope
```

#### 14. `this` behaves differently in strict mode

In a regular function, `this` defaults to the global object (`window`). In strict mode, if the function is called without an owner object, `this` returns `undefined` instead — safer and more predictable.

```javascript
"use strict";
function showThis() {
  console.log(this); // undefined — not the window object
}
showThis();
```

**▶ Expected Output:**
```
undefined
```

---

### 4D — Reserved Keywords for the Future

In strict mode, you cannot use words reserved for future JavaScript versions as variable names:

`implements` · `interface` · `let` · `package` · `private` · `protected` · `public` · `static` · `yield`

```javascript
"use strict";
let public = 1500; // ❌ SyntaxError — "public" is a reserved word
```

> ⚠️ **WATCH OUT:** The `"use strict"` directive **ONLY works** if placed at the very beginning of a script or function. If placed anywhere else, it has no effect and is silently ignored.

> 🏢 **REAL WORLD:** All modern JavaScript frameworks (React, Vue, Angular) and bundlers (Webpack, Vite) automatically run code in strict mode. Node.js modules run in strict mode by default. As a developer, you should always write strict-mode-compatible code.

---

---

## ✏️ Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Scope Detective

**Objective:** Predict the output of each code snippet before running it.

**Scenario:** You're debugging a school grade management system. For each snippet, write down what you think the output will be, then verify by running it in your browser console.

#### Warm-up Micro-Demo:

```javascript
let subject = "Math";

function getGrade() {
  let grade = "A";
  console.log(subject); // What prints here?
  console.log(grade);   // What prints here?
}

getGrade();
// console.log(grade);  // Is this line safe? Why or why not?
```

#### Step-by-step instructions:
1. For each snippet below, write your prediction first.
2. Then run the code.
3. If your prediction was wrong, explain why.

#### Snippet A:

```javascript
let schoolName = "Greenwood Academy";

function printInfo() {
  let studentName = "Kwame";
  console.log(schoolName);    // Prediction?
  console.log(studentName);   // Prediction?
}

printInfo();
console.log(schoolName);      // Prediction?
// console.log(studentName);  // Would this cause an error?
```

#### Snippet B:

```javascript
for (let i = 0; i < 3; i++) {
  let doubled = i * 2;
}
console.log(i);       // Prediction? (Remember: let vs var!)
console.log(doubled); // Prediction?
```

#### Snippet C (tricky!):

```javascript
var count = 10;
{
  var count = 20;  // Note: var, not let
}
console.log(count); // Prediction?

let score = 10;
{
  let score = 20;  // Note: let
}
console.log(score); // Prediction?
```

**Self-check questions:** Why did `var count` get overwritten but `let score` did not? What does this tell you about block scope?

**Optional what-if:** Replace all `var` with `let` in Snippet C. What changes?

**Real-world connection:** In an e-commerce cart system, having two `var totalPrice` variables in nested blocks would cause exactly this problem — silent overwriting of values, leading to wrong totals charged to customers.

---

### Exercise 2 — Hoisting Explorer

**Objective:** Understand what gets hoisted and what doesn't.

**Scenario:** You are a bank developer debugging a loan calculator that was written carelessly — variables declared in the middle of code.

#### Warm-up Micro-Demo:

```javascript
// What does this print?
console.log(myVar);
var myVar = "I was declared below!";
```

**▶ Expected Output:**
```
undefined
```

#### Task 1: Predict before running

```javascript
console.log(loanAmount);
var loanAmount = 5000;
console.log(loanAmount);
```

Predict: Line 1 prints _____, Line 3 prints _____

#### Task 2: Fix the hoisting bug

The following code has a hoisting bug. Rewrite it to be clear and correct:

```javascript
// BUGGY version — hard to read, relies on hoisting
calculateInterest();

function calculateInterest() {
  console.log("Rate:", rate);   // Bug! What prints here?
  var rate = 0.05;
  var principal = 10000;
  var interest = principal * rate;
  console.log("Interest:", interest);
}
```

**Hints:** Move all variable declarations to the top of the function. Replace `var` with `let` or `const`. What is the correct output after fixing?

#### Task 3: `let` vs `var` hoisting

```javascript
// Try this — what error do you get?
console.log(customerName);
let customerName = "Fatima";
```

**Self-check:** Why does `let` throw an error while `var` gives `undefined`? Which behaviour is safer for a developer?

**Real-world connection:** Hoisting bugs in banking software can cause interest rates or account balances to be read as `undefined` (instead of an error), leading to silent wrong calculations. Using `let`/`const` would have thrown an error immediately.

---

### Exercise 3 — Strict Mode Guardian

**Objective:** Activate strict mode and see which bad practices it catches.

**Scenario:** You're reviewing junior developer code on a weather tracking app. Activate strict mode and identify all the errors.

#### Warm-up Micro-Demo:

```javascript
"use strict";
city = "Lagos"; // What happens?
```

**▶ Expected Output:**
```
❌ ReferenceError: city is not defined
```

#### Task: Find all 5 errors in this code when strict mode is added

```javascript
// Add "use strict"; at the top, then identify every error:

temperature = 38.5;        // Line 1
humidity = 78;             // Line 2
let windSpeed = 12;

function forecast(temp, temp) { // Line 5 — note: duplicate param
  return "Sunny";
}

let status = 010;          // Line 9
delete windSpeed;          // Line 10

console.log(temperature, humidity, forecast(30, 40), status);
```

#### Step-by-step instructions:
1. Add `"use strict";` at line 1.
2. Run the code.
3. Note every error message.
4. Fix each error one at a time.
5. Verify the corrected code runs cleanly.

**Self-check questions:** Which lines were already perfectly fine? What rule did each error break? How does strict mode make this code safer?

**Optional what-if:** Remove strict mode and run the code — do you still get errors, or does it silently produce wrong results?

---

---

## 🏗️ Mini Project: Safe Student Score Tracker

> **Phase 3 — Project Simulation**

**Real-world scenario:** You are a developer at an EdTech company building a student score tracker. You must apply scope rules, code blocks, hoisting best practices, and strict mode to build a clean, bug-free solution.

**What you will build:** A script that stores student scores, calculates the class average, finds the highest score, and prints a report — all written using proper scope, blocks, and strict mode.

---

### 🔵 Stage 1 — Setup & Core Logic

**Goal:** Set up strict mode, declare variables properly, and store scores.

#### Simple preview first — understand the building blocks:

```javascript
// Preview: storing and accessing array items
const scores = [78, 92, 65, 88, 71];
console.log("First score:", scores[0]);  // 78
console.log("Count:", scores.length);    // 5
```

**▶ Expected Output:**
```
First score: 78
Count: 5
```

#### Stage 1 Code:

```javascript
"use strict";  // ← Always first

// Global constants — visible to all functions
const CLASS_NAME = "Grade 10A";
const PASS_MARK = 50;

// Student scores array
const studentScores = [
  { name: "Amara",   score: 78 },
  { name: "Kwame",   score: 92 },
  { name: "Fatima",  score: 65 },
  { name: "Emeka",   score: 88 },
  { name: "Priya",   score: 45 }  // below pass mark
];

console.log("=== " + CLASS_NAME + " Score Tracker ===");
console.log("Total students:", studentScores.length);
```

**▶ Expected Output:**
```
=== Grade 10A Score Tracker ===
Total students: 5
```

**Reflection:** Why did we use `const` for `CLASS_NAME` and `PASS_MARK`? What would happen if a developer accidentally wrote `PASS_MARK = 70` somewhere later?

---

### 🟢 Stage 2 — Adding Features: Calculate Average & Find Top Score

**Goal:** Write functions using proper function scope and local variables.

#### Simple preview — calculating average:

```javascript
function calculateAverage(numbers) {
  let total = 0;             // LOCAL variable — exists only in this function
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total / numbers.length;
}

console.log(calculateAverage([70, 80, 90])); // 80
```

**▶ Expected Output:**
```
80
```

#### Stage 2 Code — full feature functions:

```javascript
"use strict";

const CLASS_NAME = "Grade 10A";
const PASS_MARK = 50;

const studentScores = [
  { name: "Amara",   score: 78 },
  { name: "Kwame",   score: 92 },
  { name: "Fatima",  score: 65 },
  { name: "Emeka",   score: 88 },
  { name: "Priya",   score: 45 }
];

// Function to calculate class average
function getClassAverage(students) {
  let total = 0;       // LOCAL — only lives here
  for (let i = 0; i < students.length; i++) {
    total += students[i].score;
  }
  return total / students.length;
}

// Function to find the top scorer
function getTopScorer(students) {
  let topStudent = students[0]; // LOCAL — starts as first student
  for (let i = 1; i < students.length; i++) {
    if (students[i].score > topStudent.score) {
      topStudent = students[i];
    }
  }
  return topStudent;
}

// Function to check pass/fail using a block
function checkPassFail(students, passMark) {
  const passed = [];  // LOCAL array
  const failed = [];  // LOCAL array

  for (const student of students) {
    if (student.score >= passMark) {
      passed.push(student.name);
    } else {
      failed.push(student.name);
    }
  }

  return { passed, failed };
}

const average    = getClassAverage(studentScores);
const topScorer  = getTopScorer(studentScores);
const results    = checkPassFail(studentScores, PASS_MARK);

console.log("Class Average:", average.toFixed(1));
console.log("Top Scorer:", topScorer.name, "with", topScorer.score);
console.log("Passed:", results.passed.join(", "));
console.log("Failed:", results.failed.join(", "));
```

**▶ Expected Output:**
```
Class Average: 73.6
Top Scorer: Kwame with 92
Passed: Amara, Kwame, Fatima, Emeka
Failed: Priya
```

**Reflection:** Notice that `total`, `topStudent`, `passed`, and `failed` are all LOCAL variables — they don't pollute the global scope. Why is this important when other developers might also use variable names like `total` in their parts of the code?

---

### 🟠 Stage 3 — Displaying Results: Formatted Report

**Goal:** Use a standalone block to create a temporary formatting scope, and display the final report.

#### Simple preview — standalone block for temp work:

```javascript
{
  // Temporary formatting block
  const header = "=".repeat(30);
  console.log(header);
  console.log("   REPORT READY");
  console.log(header);
}
// header is gone — no global pollution
```

**▶ Expected Output:**
```
==============================
   REPORT READY
==============================
```

#### Stage 3 Code — full `printReport` function:

```javascript
function printReport(className, students, average, topScorer, results) {
  // Use a standalone block for the separator — keep it local
  {
    const line = "=".repeat(40);
    console.log("\n" + line);
    console.log("       STUDENT SCORE REPORT");
    console.log("       Class: " + className);
    console.log(line);
  }
  // Note: "line" variable is gone here — block ended

  for (const student of students) {
    const status = student.score >= PASS_MARK ? "✅ PASS" : "❌ FAIL";
    console.log(student.name.padEnd(12) + " | " + student.score + "  " + status);
  }

  console.log("-".repeat(40));
  console.log("Class Average : " + average.toFixed(1));
  console.log("Top Scorer    : " + topScorer.name + " (" + topScorer.score + ")");
  console.log("Passed        : " + results.passed.length + " students");
  console.log("Failed        : " + results.failed.length + " students");
}

printReport(CLASS_NAME, studentScores, average, topScorer, results);
```

**▶ Expected Output:**
```
========================================
       STUDENT SCORE REPORT
       Class: Grade 10A
========================================
Amara        | 78  ✅ PASS
Kwame        | 92  ✅ PASS
Fatima       | 65  ✅ PASS
Emeka        | 88  ✅ PASS
Priya        | 45  ❌ FAIL
----------------------------------------
Class Average : 73.6
Top Scorer    : Kwame (92)
Passed        : 4 students
Failed        : 1 students
```

**Reflection questions:**
- How would this report look in a real EdTech company's admin dashboard?
- What would break if we used `var` instead of `const` inside the standalone block?
- Why is strict mode particularly important in a multi-developer project like this?
- Could you add a function to find the lowest scorer? What scope rules would you apply?

**Optional advanced challenge:** Add a `getGradeLetter` function that returns A/B/C/D/F based on score ranges (90+, 80+, 70+, 60+, below 60). Use `const` for grade boundaries. Make sure it's strict-mode safe.

---

---

## ✅ Completion Checklist

- ✅ I understand what **scope** means and can explain global, function, and block scope in my own words.
- ✅ I know why `let` and `const` are preferred over `var` for block-scoped variables.
- ✅ I understand what a **code block** is and where they appear (functions, if/else, loops, standalone).
- ✅ I can explain the three benefits of standalone code blocks (encapsulation, temporary use, organized code).
- ✅ I understand **hoisting**: declarations move to the top; initializations do not.
- ✅ I know that `var` gives `undefined` when used before assignment, while `let`/`const` throw a `ReferenceError`.
- ✅ I understand the **Temporal Dead Zone (TDZ)** for `let` and `const`.
- ✅ I know how to activate **strict mode** globally and locally inside a function.
- ✅ I can name at least five things that strict mode prevents.
- ✅ I completed all three exercises and the mini-project.
- ✅ I can explain how each topic applies in a real-world JavaScript codebase.

---

### 📌 One-Sentence Summary of Each Topic

**Scope:** Scope controls *where* a variable can be seen — global scope is everywhere, function scope is inside a function, and block scope is inside curly braces (only with `let`/`const`).

**Code Blocks:** Code blocks are groups of statements inside `{ }` that define a scope boundary and allow multiple lines to act as one unit.

**Hoisting:** JavaScript automatically moves variable and function declarations to the top of their scope before running code, but values are not moved — so always declare at the top yourself to avoid surprises.

**Strict Mode:** Adding `"use strict";` tells JavaScript to stop silently accepting bad code and instead throw real errors, making your programs safer and more professional.

---

> 📘 *Lesson generated from W3Schools.com — js_scope | js_codeblocks | js_hoisting | js_strict*
> *Framework: Understand → Practice → Create*
