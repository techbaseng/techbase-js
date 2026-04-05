---
title: "JavaScript Statements, Reserved Words, Operators & Operator Precedence"
nav_order: 25
---

## Table of Contents
1. [JavaScript Statements Reference](#1-javascript-statements-reference)
2. [JavaScript Reserved Words](#2-javascript-reserved-words)
3. [JavaScript Operators Reference](#3-javascript-operators-reference)
4. [JavaScript Operator Precedence](#4-javascript-operator-precedence)
5. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
6. [Phase 3 — Project Simulation](#phase-3--project-simulation)
7. [Completion Checklist](#completion-checklist)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. JavaScript Statements Reference

### 1.1 What Is a Statement?

A **statement** is a complete instruction that tells JavaScript to *do something*. If expressions are ingredients (values, variables, calculations), statements are the recipe steps — the actions that structure how your program flows, repeats, and makes decisions.

**Real-world analogy:** Think of a statement as a sentence in English. A sentence doesn't just contain words — it makes a complete thought. `let x = 5;` is a complete instruction. `x + 3` alone is just an expression — it calculates but doesn't *do* anything until it's part of a statement.

JavaScript programs are sequences of statements executed top to bottom, unless a control statement (like `if`, `for`, or `return`) redirects the flow.

---

### 1.2 Block Statement `{}`

A **block** groups multiple statements together inside curly braces `{}`. Blocks are used with control structures (`if`, `for`, `while`, functions) to treat multiple statements as one logical unit.

```javascript
// A block groups these three statements together
{
  let name = "Tunde";
  let age  = 28;
  console.log(name + " is " + age + " years old.");
}
// Expected Output: Tunde is 28 years old.
```

Blocks also define **scope** for `let` and `const` — variables declared inside a block are not accessible outside it.

```javascript
{
  let secret = "password123";
  console.log(secret); // "password123" ✅
}
console.log(secret); // ReferenceError: secret is not defined ❌
```

> 💡 **Thinking Question:** What happens if you replace `let` with `var` inside the block above? Try it — the answer reveals why `let` is safer than `var`.

---

### 1.3 `break` Statement

`break` **immediately exits** the nearest enclosing loop or `switch` statement. Execution continues at the statement following the loop or switch.

**Micro-demo — break out of a loop early:**

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // Stop the loop when i reaches 5
  }
  console.log(i);
}
// Expected Output: 1  2  3  4
// (5 and above never print — loop exited at i === 5)
```

**Real-world use — stop searching once found:**

```javascript
let students = ["Alice", "Bob", "Tunde", "Carol", "David"];
let target = "Tunde";
let foundAt = -1;

for (let i = 0; i < students.length; i++) {
  if (students[i] === target) {
    foundAt = i;
    break; // No need to keep looping — we already found the answer
  }
}

console.log(foundAt === -1 ? "Not found" : `Found at index ${foundAt}`);
// Expected Output: Found at index 2
```

Without `break`, the loop would continue checking the remaining students unnecessarily.

#### Labelled `break` — Exiting Nested Loops

When loops are nested, plain `break` only exits the innermost loop. A **label** lets you break out of an outer loop from deep inside.

```javascript
outerLoop: for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    if (row === 1 && col === 1) {
      break outerLoop; // Exits BOTH loops, not just the inner one
    }
    console.log(`[${row},${col}]`);
  }
}
// Expected Output: [0,0]  [0,1]  [0,2]  [1,0]
// Stops when it hits [1,1] — both loops exit
```

---

### 1.4 `continue` Statement

`continue` **skips the rest of the current iteration** and jumps to the next one. Unlike `break`, it doesn't exit the loop — it just skips this pass.

```javascript
// Print only even numbers from 1 to 10
for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue; // Skip odd numbers
  }
  console.log(i);
}
// Expected Output: 2  4  6  8  10
```

**Real-world use — skip invalid data:**

```javascript
let transactions = [150, -20, 300, null, 500, undefined, 75];

let validTotal = 0;
for (let amount of transactions) {
  if (!amount || amount <= 0) {
    continue; // Skip null, undefined, and negative values
  }
  validTotal += amount;
}

console.log("Valid total: ₦" + validTotal.toLocaleString());
// Expected Output: Valid total: ₦1,025
```

> 💡 **Thinking Question:** What is the difference in result between using `break` and `continue` when `i === 5` in a loop from 1 to 10?

---

### 1.5 `const` Statement

`const` declares a **block-scoped variable** whose **binding cannot be reassigned**. Once assigned, the name always refers to the same value.

```javascript
const TAX_RATE = 0.075;
const APP_NAME = "StoreApp";

TAX_RATE = 0.08; // TypeError: Assignment to constant variable ❌
```

**Important nuance — const with objects and arrays:**

`const` prevents *reassignment of the variable binding*, not mutation of the value it points to. Objects and arrays declared with `const` can still have their contents changed.

```javascript
const user = { name: "Tunde", age: 28 };

user.age = 29;           // ✅ Allowed — mutating the object's property
user.city = "Lagos";     // ✅ Allowed — adding a new property
console.log(user);       // { name: "Tunde", age: 29, city: "Lagos" }

user = { name: "Alice" }; // ❌ TypeError — reassigning the binding itself

const scores = [85, 92, 78];
scores.push(95);          // ✅ Allowed — mutating the array
scores = [1, 2, 3];       // ❌ TypeError — reassigning the binding
```

**Rule of thumb:** Use `const` by default. Only upgrade to `let` when you genuinely need to reassign the variable.

---

### 1.6 `let` Statement

`let` declares a **block-scoped variable** that *can* be reassigned. It was introduced in ES6 to fix the confusing function-scope behaviour of `var`.

```javascript
let counter = 0;

for (let i = 0; i < 5; i++) {
  counter += i;
}

console.log(counter); // 10
console.log(i);       // ReferenceError — i only exists inside the for block
```

**`let` vs `var` — the scoping difference:**

```javascript
// var is function-scoped — leaks out of blocks
function testVar() {
  if (true) {
    var x = "I'm var";
  }
  console.log(x); // "I'm var" — x leaked out of the if-block!
}

// let is block-scoped — stays inside its block
function testLet() {
  if (true) {
    let y = "I'm let";
  }
  console.log(y); // ReferenceError — y stayed in the block ✅
}
```

**`let` prevents the temporal dead zone trap:**

```javascript
console.log(myLet); // ReferenceError: Cannot access before initialisation
let myLet = 10;     // This is safer — it tells you the bug directly

console.log(myVar); // undefined — silently wrong, harder to debug
var myVar = 10;
```

---

### 1.7 `var` Statement

`var` is the **original** JavaScript variable declaration. It is **function-scoped** (not block-scoped) and is **hoisted** to the top of its function with an initial value of `undefined`.

```javascript
function demonstrateVar() {
  console.log(name); // undefined — hoisted but not yet assigned
  var name = "Tunde";
  console.log(name); // "Tunde"
}
demonstrateVar();
```

JavaScript interprets this as:

```javascript
function demonstrateVar() {
  var name; // hoisting moves declaration to the top
  console.log(name); // undefined
  name = "Tunde";
  console.log(name); // "Tunde"
}
```

**When to use `var`:** Essentially never in modern JavaScript. `let` and `const` are safer replacements for every use case. `var` is documented here because you will encounter it in legacy codebases.

---

### 1.8 `if`, `else if`, `else` Statements

`if` evaluates a condition and runs a block of code only if the condition is **truthy**.

```javascript
let score = 72;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
// Expected Output: Grade: C
```

**Falsy values in JavaScript** (values that make an `if` condition fail):

```javascript
// These are ALL falsy:
if (false)      { } // boolean false
if (0)          { } // number zero
if (-0)         { } // negative zero
if (0n)         { } // BigInt zero
if ("")         { } // empty string
if (null)       { } // null
if (undefined)  { } // undefined
if (NaN)        { } // Not a Number

// Everything else is truthy, including:
if ("0")        { console.log("Truthy!"); } // Non-empty string — even "false"
if ([])         { console.log("Truthy!"); } // Empty array
if ({})         { console.log("Truthy!"); } // Empty object
```

---

### 1.9 `switch` Statement

`switch` compares a value against multiple `case` values using **strict equality (`===`)**. It's cleaner than long `else if` chains when checking one variable against many specific values.

```javascript
let day = "Tuesday";
let message;

switch (day) {
  case "Monday":
    message = "Back to work!";
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    message = "Midweek grind.";
    break;
  case "Friday":
    message = "Almost weekend!";
    break;
  case "Saturday":
  case "Sunday":
    message = "Weekend!";
    break;
  default:
    message = "Invalid day.";
}

console.log(message);
// Expected Output: Midweek grind.
```

**Fall-through behaviour:** Without `break`, execution *falls through* to the next case. This is why Tuesday, Wednesday, and Thursday share the same message above — `case "Tuesday":` has no code of its own, so it falls through to Wednesday's code.

**Common beginner mistake — forgetting `break`:**

```javascript
let colour = "red";

switch (colour) {
  case "red":
    console.log("Red light — stop!"); // ← No break!
  case "yellow":
    console.log("Yellow light — caution!"); // Also runs!
  case "green":
    console.log("Green light — go!"); // Also runs!
}
// Output: Red light — stop!
//         Yellow light — caution!
//         Green light — go!
// All three run because of fall-through!
```

---

### 1.10 `for` Loop

The classic `for` loop repeats a block of code a specific number of times. It has three parts:

```
for (initialisation; condition; update) { body }
```

```javascript
// Print multiplication table for 5
for (let i = 1; i <= 10; i++) {
  console.log(`5 × ${i} = ${5 * i}`);
}
// Expected Output:
// 5 × 1 = 5
// 5 × 2 = 10
// ...
// 5 × 10 = 50
```

**All three parts are optional:**

```javascript
let i = 0;
for (; i < 3; ) {    // Initialisation and update moved outside
  console.log(i);
  i++;
}
// Expected Output: 0  1  2
```

---

### 1.11 `for...in` Loop

`for...in` iterates over the **enumerable property keys** of an object. It gives you the *names* of the properties, not the values.

```javascript
let car = {
  brand: "Toyota",
  model: "Camry",
  year:  2022,
  colour: "Silver"
};

for (let key in car) {
  console.log(key + ": " + car[key]);
}
// Expected Output:
// brand: Toyota
// model: Camry
// year: 2022
// colour: Silver
```

**⚠️ Important warning — do not use `for...in` with arrays:**

```javascript
let scores = [85, 92, 78];

for (let index in scores) {
  console.log(index, typeof index); // "0" string, "1" string, "2" string
}
// The indexes are strings, not numbers!
// Use for...of or a regular for loop with arrays instead
```

---

### 1.12 `for...of` Loop

`for...of` iterates over the **values** of any iterable — arrays, strings, Sets, Maps, and more. It is the modern, clean way to loop over array contents.

```javascript
let fruits = ["mango", "pineapple", "pawpaw"];

for (let fruit of fruits) {
  console.log(fruit);
}
// Expected Output: mango  pineapple  pawpaw

// Works on strings too — iterates over characters
for (let char of "Hello") {
  console.log(char);
}
// Expected Output: H  e  l  l  o

// Works on Sets
let uniqueIds = new Set([101, 102, 103]);
for (let id of uniqueIds) {
  console.log(id);
}
// Expected Output: 101  102  103
```

---

### 1.13 `while` Loop

`while` repeats a block of code **as long as a condition is true**. Use it when you don't know in advance how many times the loop will run.

```javascript
let attempts = 0;
let maxAttempts = 5;
let success = false;

while (attempts < maxAttempts && !success) {
  attempts++;
  console.log(`Attempt ${attempts}...`);

  if (attempts === 3) {    // Simulate success on 3rd try
    success = true;
    console.log("Connection established!");
  }
}
// Expected Output:
// Attempt 1...
// Attempt 2...
// Attempt 3...
// Connection established!
```

**Common mistake — infinite loop:**

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  // count++; ← Forgetting this means count never changes — infinite loop!
}
// Browser tab will freeze!
```

Always make sure the condition will eventually become false.

---

### 1.14 `do...while` Loop

`do...while` is like `while`, except the body **always executes at least once** — the condition is checked *after* the first run.

```javascript
let userInput;

do {
  userInput = prompt("Enter a number between 1 and 10:");
  userInput = Number(userInput);
} while (userInput < 1 || userInput > 10); // Repeat until valid

console.log("You entered:", userInput);
```

**Micro-demo showing the "at least once" difference:**

```javascript
let x = 100; // Already greater than 5

// while — body never runs (condition is false from the start)
while (x < 5) {
  console.log("while:", x);
}
// (no output)

// do...while — body runs ONCE before checking
do {
  console.log("do...while:", x);
} while (x < 5);
// Expected Output: do...while: 100
```

---

### 1.15 `function` Statement

The `function` statement defines a named function that can be called anywhere in the same scope (even before its definition, due to **hoisting**).

```javascript
// Can be called BEFORE definition — function declarations are hoisted
let result = add(10, 5);
console.log(result); // 15 ✅

function add(a, b) {
  return a + b;
}
```

**Function declaration vs function expression:**

```javascript
// Declaration — hoisted
function multiply(a, b) {
  return a * b;
}

// Expression — NOT hoisted, must be defined before use
const divide = function(a, b) {
  return a / b;
};

// Arrow function expression — also not hoisted
const subtract = (a, b) => a - b;
```

---

### 1.16 `return` Statement

`return` **exits a function** and optionally sends a value back to the caller. Once `return` is reached, no further code in the function runs.

```javascript
function getGrade(score) {
  if (score >= 90) return "A"; // Early return — function exits here if score >= 90
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F"; // Reached only if none of the above conditions matched
}

console.log(getGrade(85)); // "B"
console.log(getGrade(55)); // "F"
```

A function with no `return` statement (or just `return;` with no value) returns `undefined`.

```javascript
function doNothing() {
  // No return statement
}
console.log(doNothing()); // undefined
```

---

### 1.17 `try`, `catch`, `finally`, `throw`

These work together to handle errors gracefully. (Covered in depth in the Debugging tutorial — summarised here for completeness.)

```javascript
function parseUserAge(input) {
  let age = Number(input);

  if (isNaN(age)) {
    throw new TypeError(`"${input}" is not a valid age.`);
  }
  if (age < 0 || age > 150) {
    throw new RangeError(`Age ${age} is out of realistic range.`);
  }

  return age;
}

try {
  let age = parseUserAge("twenty");
  console.log("Age:", age);
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
} finally {
  console.log("Parsing attempt complete.");
}
// Expected Output:
// TypeError: "twenty" is not a valid age.
// Parsing attempt complete.
```

---

### 1.18 `class` Statement

`class` defines a blueprint for creating objects. Covered fully in the OOP section — presented here for reference.

```javascript
class Product {
  constructor(name, price) {
    this.name  = name;
    this.price = price;
  }

  getFormattedPrice() {
    return "₦" + this.price.toLocaleString();
  }
}

let laptop = new Product("Laptop", 450000);
console.log(laptop.getFormattedPrice()); // ₦450,000
```

---

### 1.19 `import` and `export` Statements

`export` marks values (functions, classes, variables) to be shared from one module file. `import` brings them into another file.

```javascript
// utils.js — exporting
export const TAX_RATE = 0.075;

export function formatCurrency(amount) {
  return "₦" + amount.toLocaleString();
}

export default class Cart {
  constructor() { this.items = []; }
}
```

```javascript
// app.js — importing
import Cart, { TAX_RATE, formatCurrency } from "./utils.js";

let myCart = new Cart();
console.log(formatCurrency(50000)); // ₦50,000
console.log(TAX_RATE);              // 0.075
```

---

### 1.20 `debugger` Statement

Pauses execution when DevTools is open. Covered fully in the Debugging tutorial.

```javascript
let total = calculateTotal(items);
debugger; // Pause here to inspect `total` before continuing
displayTotal(total);
```

---

### 1.21 Statements Reference Summary

| Statement | Purpose |
|-----------|---------|
| `{}` Block | Group multiple statements |
| `break` | Exit loop or switch immediately |
| `continue` | Skip current iteration |
| `const` | Block-scoped, non-reassignable binding |
| `let` | Block-scoped, reassignable binding |
| `var` | Function-scoped binding (legacy) |
| `if / else if / else` | Conditional branching |
| `switch` | Multi-value branching |
| `for` | Count-based loop |
| `for...in` | Loop over object keys |
| `for...of` | Loop over iterable values |
| `while` | Condition-first loop |
| `do...while` | Body-first loop (runs at least once) |
| `function` | Define a named function |
| `return` | Exit function, optionally with value |
| `try/catch/finally` | Error handling |
| `throw` | Raise a custom error |
| `class` | Define a class blueprint |
| `import` | Bring in exported values |
| `export` | Share values from a module |
| `debugger` | Pause execution in DevTools |

---

## 2. JavaScript Reserved Words

### 2.1 What Are Reserved Words?

**Reserved words** are identifiers that JavaScript has already claimed for its own use. You cannot use them as variable names, function names, or property names (in most contexts). Trying to do so causes a `SyntaxError`.

```javascript
// ❌ Using reserved words as variable names
let class   = "Math 101"; // SyntaxError
let return  = 5;          // SyntaxError
let if      = true;       // SyntaxError
let for     = 10;         // SyntaxError
```

**Why do reserved words exist?** JavaScript needs to parse your code unambiguously. If `if` could also be a variable name, `if (x > 5)` would be impossible to interpret — is `if` the keyword or a variable?

---

### 2.2 Current JavaScript Reserved Words

These are the words currently used as keywords in the JavaScript language. **None of these may be used as identifiers:**

| | | | | |
|--|--|--|--|--|
| `break` | `case` | `catch` | `class` | `const` |
| `continue` | `debugger` | `default` | `delete` | `do` |
| `else` | `export` | `extends` | `false` | `finally` |
| `for` | `function` | `if` | `import` | `in` |
| `instanceof` | `let` | `new` | `null` | `return` |
| `static` | `super` | `switch` | `this` | `throw` |
| `true` | `try` | `typeof` | `var` | `void` |
| `while` | `with` | `yield` | | |

---

### 2.3 Strict Mode Reserved Words

These words are only reserved when `"use strict"` is active. They are legal identifiers in non-strict code but reserved in strict mode:

| Word | Purpose in Strict Mode |
|------|------------------------|
| `implements` | Future class feature |
| `interface` | Interface declaration |
| `package` | Module packaging |
| `private` | Private class member |
| `protected` | Protected class member |
| `public` | Public class member |
| `static` | Static class member |
| `let` | Block-scoped variable |
| `yield` | Generator function return |

```javascript
"use strict";

let private = 5;     // SyntaxError in strict mode
let public  = true;  // SyntaxError in strict mode
let static  = {};    // SyntaxError in strict mode
```

---

### 2.4 Future Reserved Words

These words are reserved for **future versions** of JavaScript. They do nothing today but cannot be used as identifiers to avoid breaking future code:

| | | | |
|--|--|--|--|
| `enum` | `await` | `abstract` | `boolean` |
| `byte` | `char` | `double` | `final` |
| `float` | `goto` | `int` | `long` |
| `native` | `short` | `synchronized` | `throws` |
| `transient` | `volatile` | | |

> 💡 Some of these (like `boolean`, `int`, `float`) come from Java and C — languages that influenced JavaScript's syntax design. Even though JavaScript doesn't use static types, these words are reserved so a potential future type system wouldn't break existing code.

---

### 2.5 Words to Avoid — Not Reserved but Dangerous

These words are **not reserved** (you *can* use them as variable names) but doing so is a terrible practice that causes subtle, hard-to-find bugs:

| Word | What It Is | Risk If Used as Variable |
|------|------------|--------------------------|
| `undefined` | The primitive undefined value | Hiding the real undefined |
| `NaN` | Not a Number | Hiding floating-point checks |
| `Infinity` | Mathematical infinity | Hiding overflow detection |
| `eval` | Execute string as code | Hiding the dangerous function |
| `arguments` | Function argument list | Hiding access to all arguments |
| `name` | Window/global name | Conflicts with browser globals |

```javascript
// ❌ You CAN do this but NEVER should:
let undefined = "I redefined undefined!";
console.log(undefined); // "I redefined undefined!" — real undefined is hidden

let NaN = 42;
console.log(isNaN(NaN)); // false! — isNaN(42) is false

// ✅ Always treat these as read-only reserved words
```

---

### 2.6 Built-in Global Objects and Functions

These are also not reserved words but are part of the global environment. Shadowing them causes loss of their functionality:

| Category | Examples |
|----------|---------|
| Global objects | `Math`, `JSON`, `Date`, `Array`, `Object`, `String`, `Number`, `Boolean` |
| Global functions | `parseInt()`, `parseFloat()`, `isNaN()`, `isFinite()`, `encodeURI()` |
| Error types | `Error`, `TypeError`, `ReferenceError`, `SyntaxError`, `RangeError` |

```javascript
// ❌ Shadowing built-ins — lose their functionality
let Math = { PI: 3 };     // Real Math object is now unreachable
let Array = [];            // Real Array constructor is gone!

// ✅ Pick different names
let mathUtils = { PI: 3.14159 };
let productList = [];
```

---

### 2.7 Reserved Words in Object Properties

Reserved words *can* be used as **object property names** (keys) — this is an exception to the rule. However, it's still poor practice when avoidable.

```javascript
// Allowed — as object properties
let config = {
  class: "premium",      // ✅ Legal as a property key
  return: true,          // ✅ Legal as a property key
  default: "light"       // ✅ Legal as a property key
};

console.log(config.class);   // "premium"
console.log(config.return);  // true
console.log(config.default); // "light"

// But still confusing — prefer descriptive alternatives:
let config2 = {
  tier: "premium",          // Clearer
  redirectOnSuccess: true,  // Clearer
  defaultTheme: "light"     // Clearer
};
```

---

## 3. JavaScript Operators Reference

### 3.1 What Is an Operator?

An **operator** is a symbol (or keyword) that performs an operation on one or more **operands** (values). The result is a new value.

```javascript
let result = 10 + 5; // + is the operator, 10 and 5 are operands, 15 is the result
```

Operators are categorised by:
- **Arity:** how many operands they take (unary = 1, binary = 2, ternary = 3)
- **Purpose:** arithmetic, comparison, logical, bitwise, etc.

---

### 3.2 Arithmetic Operators

These perform mathematical calculations on numbers.

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3.3333...` |
| `%` | Modulus (remainder) | `10 % 3` | `1` |
| `**` | Exponentiation | `2 ** 8` | `256` |
| `++` | Increment | `x++` / `++x` | Adds 1 |
| `--` | Decrement | `x--` / `--x` | Subtracts 1 |

**Modulus `%` — the remainder operator:**

```javascript
console.log(10 % 3);  // 1  (10 = 3×3 + 1)
console.log(15 % 4);  // 3  (15 = 4×3 + 3)
console.log(20 % 5);  // 0  (20 = 5×4 + 0, perfectly divisible)

// Real-world use 1: Even/odd check
function isEven(n) { return n % 2 === 0; }
console.log(isEven(8));  // true
console.log(isEven(7));  // false

// Real-world use 2: Wrap around (circular indexing)
let items = ["A", "B", "C", "D"];
for (let i = 0; i < 10; i++) {
  console.log(items[i % items.length]); // A B C D A B C D A B
}
```

**Exponentiation `**`:**

```javascript
console.log(2 ** 10);   // 1024  (2 to the power of 10)
console.log(9 ** 0.5);  // 3     (square root of 9)
console.log(27 ** (1/3)); // 3   (cube root of 27)
```

**Increment/decrement — prefix vs postfix:**

This is a subtle but important distinction:

```javascript
let a = 5;
let b = a++; // Postfix: b gets the CURRENT value (5), THEN a increments
console.log(a); // 6
console.log(b); // 5 ← Got the old value

let c = 5;
let d = ++c; // Prefix: c increments FIRST, THEN d gets the NEW value
console.log(c); // 6
console.log(d); // 6 ← Got the new value
```

> 💡 **Memory aid:** With *postfix* (`a++`), use the value first, update after — like using a coupon and then punching it. With *prefix* (`++a`), update first, then use — like charging your phone before making a call.

---

### 3.3 Assignment Operators

Assignment operators write a value into a variable. The compound assignment operators are shortcuts that combine an operation with assignment.

| Operator | Meaning | Example | Equivalent |
|----------|---------|---------|------------|
| `=` | Assign | `x = 5` | — |
| `+=` | Add and assign | `x += 3` | `x = x + 3` |
| `-=` | Subtract and assign | `x -= 3` | `x = x - 3` |
| `*=` | Multiply and assign | `x *= 3` | `x = x * 3` |
| `/=` | Divide and assign | `x /= 3` | `x = x / 3` |
| `%=` | Modulus and assign | `x %= 3` | `x = x % 3` |
| `**=` | Exponentiate and assign | `x **= 3` | `x = x ** 3` |
| `&&=` | Logical AND assign | `x &&= y` | `x && (x = y)` |
| `\|\|=` | Logical OR assign | `x \|\|= y` | `x \|\| (x = y)` |
| `??=` | Nullish coalescing assign | `x ??= y` | `x ?? (x = y)` |

**Compound assignment in action:**

```javascript
let balance = 10000;

balance += 5000;  // Deposit
console.log(balance); // 15000

balance -= 2000;  // Withdrawal
console.log(balance); // 13000

balance *= 1.05;  // 5% interest
console.log(balance); // 13650
```

**The logical assignment operators (newer, very useful):**

```javascript
// ||= : Assign only if current value is falsy
let username = "";
username ||= "Guest";
console.log(username); // "Guest" — because "" is falsy

let title = "Admin";
title ||= "User";
console.log(title); // "Admin" — because "Admin" is truthy (no assignment)

// ??= : Assign only if current value is null or undefined
let config = null;
config ??= { theme: "dark" };
console.log(config); // { theme: "dark" }

let settings = { theme: "light" };
settings ??= { theme: "dark" };
console.log(settings); // { theme: "light" } — not null/undefined, no assignment

// &&= : Assign only if current value is truthy
let user = { name: "Tunde", isAdmin: true };
user.isAdmin &&= false; // Only updates if isAdmin is currently truthy
console.log(user.isAdmin); // false
```

---

### 3.4 Comparison Operators

Comparison operators return `true` or `false`. They are used in conditions.

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `==` | Loose equal | `"5" == 5` | `true` |
| `===` | Strict equal | `"5" === 5` | `false` |
| `!=` | Loose not equal | `"5" != 5` | `false` |
| `!==` | Strict not equal | `"5" !== 5` | `true` |
| `>` | Greater than | `10 > 5` | `true` |
| `<` | Less than | `10 < 5` | `false` |
| `>=` | Greater than or equal | `10 >= 10` | `true` |
| `<=` | Less than or equal | `9 <= 10` | `true` |

**Loose vs strict in depth:**

```javascript
// == performs type coercion before comparing
console.log(0   == false);      // true  ← 0 coerced to false
console.log(1   == true);       // true  ← 1 coerced to true
console.log(""  == false);      // true  ← "" coerced to false
console.log("1" == 1);          // true  ← "1" coerced to 1
console.log(null == undefined); // true  ← special rule

// === never coerces — same type AND same value required
console.log(0   === false);     // false ← number vs boolean
console.log("1" === 1);         // false ← string vs number
console.log(null === undefined);// false ← different types
```

**Comparing strings — lexicographic (dictionary) order:**

```javascript
console.log("apple" < "banana"); // true  — a comes before b
console.log("Z" < "a");          // true  — uppercase letters come before lowercase in Unicode
console.log("10" > "9");         // false — "1" comes before "9" in string comparison!

// To compare numbers stored as strings, convert first:
console.log(Number("10") > Number("9")); // true ✅
```

---

### 3.5 String Operators

The `+` operator concatenates strings. The `+=` operator appends to an existing string.

```javascript
let firstName = "Babatunde";
let lastName  = "Adewale";
let fullName  = firstName + " " + lastName;
console.log(fullName); // Babatunde Adewale

let message = "Hello";
message += ", world!"; // Same as: message = message + ", world!"
console.log(message);  // Hello, world!
```

**Template literals are the modern alternative to `+` concatenation:**

```javascript
// Old way — concatenation
let greeting = "Dear " + firstName + ",\nYour balance is ₦" + balance + ".";

// Modern way — template literals (much cleaner)
let greeting2 = `Dear ${firstName},
Your balance is ₦${balance}.`;
```

---

### 3.6 Logical Operators

Logical operators work with boolean values (true/false) but have powerful behaviour with non-boolean values through **short-circuit evaluation**.

| Operator | Name | Description |
|----------|------|-------------|
| `&&` | Logical AND | Returns first falsy value, or last value |
| `\|\|` | Logical OR | Returns first truthy value, or last value |
| `!` | Logical NOT | Inverts boolean value |
| `??` | Nullish Coalescing | Returns right side only if left is null/undefined |

**`&&` — AND:**

```javascript
// Returns the FIRST FALSY value encountered, or the LAST value if all are truthy
console.log(true  && true);   // true   — both truthy, returns last: true
console.log(true  && false);  // false  — hits false, returns it
console.log(false && true);   // false  — hits false immediately, returns it
console.log(false && false);  // false  — hits false immediately

// With non-boolean values:
console.log(1 && 2 && 3);     // 3     — all truthy, returns last
console.log(1 && 0 && 3);     // 0     — 0 is falsy, returns it
console.log("hi" && null && "there"); // null — first falsy

// Real-world use — guard clauses:
let user = { name: "Tunde", address: { city: "Lagos" } };
let city = user && user.address && user.address.city;
console.log(city); // "Lagos" — only accesses .address if user exists
```

**`||` — OR:**

```javascript
// Returns the FIRST TRUTHY value, or the LAST value if all are falsy
console.log(false || true);   // true
console.log(false || false);  // false — all falsy, returns last
console.log(0     || "hello");// "hello" — first truthy
console.log(""    || "Guest");// "Guest" — first truthy

// Real-world use — default values:
function createUser(name, role) {
  return {
    name: name || "Anonymous",   // Use "Anonymous" if name is falsy
    role: role || "viewer"       // Use "viewer" if role is falsy
  };
}

console.log(createUser("Tunde", "admin")); // { name: "Tunde", role: "admin" }
console.log(createUser("", ""));           // { name: "Anonymous", role: "viewer" }
```

**`??` — Nullish Coalescing (the safer default-value operator):**

`??` is like `||` but *only* treats `null` and `undefined` as "missing". It does NOT treat `0`, `""`, or `false` as missing.

```javascript
// The problem with || for defaults:
let quantity = 0;      // User set quantity to 0 — legitimately empty
let display = quantity || 1; // Gets 1 — WRONG! 0 is a valid value
console.log(display); // 1 ← Bug: treats 0 as "no value"

// ?? solves this:
let display2 = quantity ?? 1; // Only uses 1 if quantity is null/undefined
console.log(display2); // 0 ← Correct!

// More comparisons:
console.log(0     ?? "default"); // 0        — 0 is not null/undefined
console.log(""    ?? "default"); // ""       — "" is not null/undefined
console.log(false ?? "default"); // false    — false is not null/undefined
console.log(null  ?? "default"); // "default"— null triggers ??
console.log(undefined ?? "def"); // "def"   — undefined triggers ??
```

**`!` — NOT:**

```javascript
console.log(!true);    // false
console.log(!false);   // true
console.log(!0);       // true  — 0 is falsy, so !0 is true
console.log(!"");      // true  — "" is falsy
console.log(!"hello"); // false — "hello" is truthy

// Double negation !! — converts any value to its boolean equivalent
console.log(!!"hello"); // true   — truthy value → true
console.log(!!0);       // false  — falsy value → false
console.log(!!null);    // false
console.log(!!{});      // true   — empty object is truthy
```

---

### 3.7 Type Operators

These operators inspect or convert the type of values.

| Operator | Use | Example |
|----------|-----|---------|
| `typeof` | Returns the type name as a string | `typeof 42` → `"number"` |
| `instanceof` | Tests if an object is an instance of a class | `[] instanceof Array` → `true` |

**`typeof` complete reference:**

```javascript
console.log(typeof 42);          // "number"
console.log(typeof 3.14);        // "number"
console.log(typeof NaN);         // "number" ← NaN is technically a number type
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  ← famous JavaScript bug
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"  ← arrays are objects
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 42n);         // "bigint"
```

**`instanceof` for class/type checking:**

```javascript
let arr = [1, 2, 3];
let date = new Date();
let err  = new TypeError("oops");

console.log(arr  instanceof Array);     // true
console.log(arr  instanceof Object);    // true  — arrays are objects too
console.log(date instanceof Date);      // true
console.log(date instanceof Object);    // true
console.log(err  instanceof TypeError); // true
console.log(err  instanceof Error);     // true  — TypeError extends Error

// Use Array.isArray() to definitively check for arrays:
console.log(Array.isArray(arr));        // true
console.log(Array.isArray({}));         // false
```

---

### 3.8 Bitwise Operators

Bitwise operators treat numbers as sequences of 32-bit binary digits and perform operations on individual bits. They are used in low-level programming, flags, and optimisations.

| Operator | Name | Example | Description |
|----------|------|---------|-------------|
| `&` | AND | `5 & 3` = `1` | 1 only where both bits are 1 |
| `\|` | OR | `5 \| 3` = `7` | 1 where either bit is 1 |
| `^` | XOR | `5 ^ 3` = `6` | 1 where bits differ |
| `~` | NOT | `~5` = `-6` | Inverts all bits |
| `<<` | Left shift | `5 << 1` = `10` | Shifts bits left (×2) |
| `>>` | Right shift | `5 >> 1` = `2` | Shifts bits right (÷2) |
| `>>>` | Unsigned right shift | `5 >>> 1` = `2` | Shifts right, fills with 0 |

**Visualising with 4-bit examples:**

```
5  in binary:  0101
3  in binary:  0011

5 & 3:         0001 = 1  (AND: 1 only where BOTH are 1)
5 | 3:         0111 = 7  (OR:  1 where EITHER is 1)
5 ^ 3:         0110 = 6  (XOR: 1 where bits DIFFER)
~5:          ...11111010 = -6 (all bits flipped, two's complement)
5 << 1:        1010 = 10 (shift left by 1 = multiply by 2)
5 >> 1:        0010 = 2  (shift right by 1 = floor divide by 2)
```

**Real-world use — permission flags:**

```javascript
// Use bits as on/off flags (common in systems programming and game dev)
const READ    = 0b001; // 1
const WRITE   = 0b010; // 2
const EXECUTE = 0b100; // 4

// Grant permissions by OR-ing flags together:
let userPermissions = READ | WRITE; // 0b011 = 3

// Check a permission with AND:
console.log((userPermissions & READ)    > 0); // true  — has read
console.log((userPermissions & WRITE)   > 0); // true  — has write
console.log((userPermissions & EXECUTE) > 0); // false — no execute

// Fast even/odd check using bitwise AND:
console.log(7 & 1); // 1 — odd   (last bit is 1)
console.log(8 & 1); // 0 — even  (last bit is 0)
```

---

### 3.9 Ternary Operator `? :`

The **ternary operator** is the only operator that takes three operands. It is a compact form of `if...else`.

```
condition ? valueIfTrue : valueIfFalse
```

```javascript
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Equivalent if...else:
let status2;
if (age >= 18) {
  status2 = "adult";
} else {
  status2 = "minor";
}
```

**Real-world use — conditional rendering and messages:**

```javascript
let stockCount = 0;
let availability = stockCount > 0 ? "In Stock" : "Out of Stock";
console.log(availability); // "Out of Stock"

let cartTotal = 15000;
let deliveryFee = cartTotal >= 20000 ? 0 : 1500;
console.log(`Delivery: ₦${deliveryFee}`); // Delivery: ₦1,500

// Nested ternary — use sparingly (readable up to 2 levels)
let score = 72;
let grade = score >= 90 ? "A"
          : score >= 80 ? "B"
          : score >= 70 ? "C"
          : score >= 60 ? "D"
          :               "F";
console.log(grade); // "C"
```

> 💡 **Warning:** Deeply nested ternaries become unreadable fast. If you need more than 2 levels, use `if...else` or a function instead.

---

### 3.10 Optional Chaining `?.`

Optional chaining safely accesses deeply nested properties. If any part of the chain is `null` or `undefined`, the whole expression short-circuits to `undefined` instead of throwing a `TypeError`.

```javascript
let user = {
  profile: {
    address: {
      city: "Lagos"
    }
  }
};

// ❌ Without optional chaining — crashes if any level is missing
console.log(user.profile.address.city);        // "Lagos" ✅
console.log(user.profile.address.postcode);    // undefined ✅
// But what if user.profile doesn't exist?
console.log(user.contact.phone);               // TypeError ❌

// ✅ With optional chaining — returns undefined instead of crashing
console.log(user?.profile?.address?.city);     // "Lagos"
console.log(user?.contact?.phone);             // undefined (no crash)
console.log(user?.profile?.address?.postcode); // undefined

// Works for method calls too:
let cart = null;
console.log(cart?.getTotal()); // undefined (no crash)

// Works for array indexing:
let items = null;
console.log(items?.[0]); // undefined (no crash)
```

---

### 3.11 `delete` Operator

`delete` removes a property from an object. It returns `true` if successful.

```javascript
let product = {
  id: 1,
  name: "Laptop",
  internalCode: "XYZ-99", // Should not be sent to the client
  price: 450000
};

delete product.internalCode;
console.log(product);
// Expected Output: { id: 1, name: "Laptop", price: 450000 }

// delete does NOT work on variables:
let x = 10;
delete x;       // Returns false (or throws in strict mode)
console.log(x); // 10 — still exists
```

---

### 3.12 `in` Operator

`in` checks whether a property exists in an object (or its prototype chain). Returns `true` or `false`.

```javascript
let car = { brand: "Toyota", year: 2022 };

console.log("brand" in car);  // true
console.log("year"  in car);  // true
console.log("colour" in car); // false

// Works with arrays (checks index positions):
let fruits = ["mango", "pear", "guava"];
console.log(0 in fruits); // true  — index 0 exists
console.log(5 in fruits); // false — index 5 doesn't exist

// Useful for checking optional properties safely:
function displayCar(car) {
  if ("colour" in car) {
    console.log("Colour:", car.colour);
  } else {
    console.log("Colour not specified");
  }
}
```

---

### 3.13 `void` Operator

`void` evaluates an expression and then returns `undefined`. Its primary modern use is in arrow functions that should explicitly return nothing, and in `void 0` as a reliable source of `undefined`.

```javascript
console.log(void 0);          // undefined
console.log(void "anything"); // undefined
console.log(void (2 + 2));    // undefined

// Arrow function — avoid returning a value accidentally
button.addEventListener("click", () => void updateCounter());
// Without void, if updateCounter() returned a value, the listener would return it
// void ensures the listener always returns undefined
```

---

### 3.14 Spread Operator `...`

The spread operator `...` expands an iterable (array, string, object) into individual elements.

```javascript
// Spreading into a function call
let numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(Math.max(...numbers)); // 9 — spreads array as individual args

// Spreading to copy and merge arrays
let fruits = ["mango", "pear"];
let veggies = ["carrot", "spinach"];
let allFood = [...fruits, ...veggies];
console.log(allFood); // ["mango", "pear", "carrot", "spinach"]

// Spreading to copy and merge objects
let defaults = { theme: "light", lang: "en",  fontSize: 14 };
let userPrefs = { theme: "dark",  fontSize: 16 };
let settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", lang: "en", fontSize: 16 }
// userPrefs properties override defaults
```

---

### 3.15 Comma Operator `,`

The comma operator evaluates multiple expressions left-to-right and returns the value of the **last** one. Rarely needed in modern code, but seen in `for` loop header.

```javascript
// In for loops — initialise or update multiple variables
for (let i = 0, j = 10; i < 5; i++, j--) {
  console.log(i, j);
}
// Output: 0 10 | 1 9 | 2 8 | 3 7 | 4 6

// Standalone — evaluates all, returns last
let result = (5 + 3, 10 + 2, 7 * 3);
console.log(result); // 21 — only the last expression's value is kept
```

---

### 3.16 Operators Reference Summary

| Category | Operators |
|----------|-----------|
| Arithmetic | `+` `-` `*` `/` `%` `**` `++` `--` |
| Assignment | `=` `+=` `-=` `*=` `/=` `%=` `**=` `&&=` `\|\|=` `??=` |
| Comparison | `==` `===` `!=` `!==` `>` `<` `>=` `<=` |
| Logical | `&&` `\|\|` `!` `??` |
| Bitwise | `&` `\|` `^` `~` `<<` `>>` `>>>` |
| Type | `typeof` `instanceof` |
| Ternary | `? :` |
| Optional chain | `?.` |
| Membership | `in` `delete` |
| Spread | `...` |
| Void | `void` |
| Comma | `,` |

---

## 4. JavaScript Operator Precedence

### 4.1 What Is Operator Precedence?

When an expression contains multiple operators, JavaScript needs rules to decide **which operation to perform first**. These rules are called **operator precedence**.

**Real-world analogy:** In primary school maths, you learned "BODMAS" or "PEMDAS" — Brackets, Orders, Division/Multiplication, Addition/Subtraction. These are exactly precedence rules. JavaScript uses the same concept, but extended to cover all operators.

```javascript
let result = 2 + 3 * 4;
// Is this (2 + 3) * 4 = 20?
// Or 2 + (3 * 4) = 14?

console.log(result); // 14 — multiplication has higher precedence than addition
```

**Precedence number:** Every operator has a **precedence level** (a number from 1 to 21 in JavaScript). Higher number = evaluated first.

---

### 4.2 Associativity

When two operators have the **same precedence**, **associativity** decides the order: left-to-right or right-to-left.

**Left-to-right (most operators):**

```javascript
let a = 10 - 3 - 2;
// Same precedence → left to right: (10 - 3) - 2 = 7 - 2 = 5
console.log(a); // 5
```

**Right-to-left (assignment and exponentiation):**

```javascript
// Assignment is right-to-left:
let x, y, z;
x = y = z = 10;
// Evaluated right-to-left: z = 10 first, then y = z (10), then x = y (10)
console.log(x, y, z); // 10 10 10

// Exponentiation is right-to-left:
let b = 2 ** 3 ** 2;
// Right-to-left: 3 ** 2 = 9 first, then 2 ** 9 = 512
console.log(b); // 512  (not (2**3)**2 = 8**2 = 64)
```

---

### 4.3 Full Precedence Table

From **highest** (evaluated first) to **lowest** (evaluated last):

| Level | Operator(s) | Name | Associativity |
|-------|-------------|------|---------------|
| 21 | `( )` | Grouping | n/a |
| 20 | `.` `?.` `[ ]` `( )` `new` | Member access, call, new | Left |
| 19 | `new` (without args) | New without argument list | Right |
| 18 | `x++` `x--` | Postfix increment/decrement | n/a |
| 17 | `!` `~` `+x` `-x` `++x` `--x` `typeof` `void` `delete` `await` | Prefix unary | Right |
| 16 | `**` | Exponentiation | Right |
| 15 | `*` `/` `%` | Multiplication, division, modulus | Left |
| 14 | `+` `-` | Addition, subtraction | Left |
| 13 | `<<` `>>` `>>>` | Bitwise shift | Left |
| 12 | `<` `<=` `>` `>=` `in` `instanceof` | Relational / type | Left |
| 11 | `==` `!=` `===` `!==` | Equality | Left |
| 10 | `&` | Bitwise AND | Left |
| 9 | `^` | Bitwise XOR | Left |
| 8 | `\|` | Bitwise OR | Left |
| 7 | `&&` | Logical AND | Left |
| 6 | `\|\|` `??` | Logical OR, nullish coalescing | Left |
| 5 | `? :` | Ternary | Right |
| 4 | `=` `+=` `-=` `*=` `/=` etc. | Assignment | Right |
| 3 | `yield` `yield*` | Yield (generators) | Right |
| 2 | `...` | Spread | n/a |
| 1 | `,` | Comma | Left |

---

### 4.4 Worked Examples — Tracing Precedence

**Example 1 — Arithmetic:**

```javascript
let result = 100 - 5 * 2 ** 3 + 10 / 2;

// Step-by-step:
// 1. ** (level 16):    2 ** 3 = 8
//    Expression: 100 - 5 * 8 + 10 / 2
// 2. * and / (level 15, left-to-right):
//    5 * 8  = 40  → 100 - 40 + 10 / 2
//    10 / 2 = 5   → 100 - 40 + 5
// 3. - and + (level 14, left-to-right):
//    100 - 40 = 60 → 60 + 5 = 65

console.log(result); // 65
```

**Example 2 — Comparison and Logical:**

```javascript
let age = 25;
let hasID = true;
let isEmployee = false;

let canEnter = age >= 18 && hasID || isEmployee;

// Step-by-step:
// 1. >= (level 12):     age >= 18 → true
//    Expression: true && hasID || isEmployee
// 2. && (level 7):      true && hasID → true && true → true
//    Expression: true || isEmployee
// 3. || (level 6):      true || false → true

console.log(canEnter); // true
```

**Example 3 — Assignment chain:**

```javascript
let a = 5;
let b = 10;
let c = a += b * 2;

// Step-by-step:
// 1. * (level 15):     b * 2 = 20
// 2. += (level 4, right-to-left): a += 20 → a = 5 + 20 = 25
// 3. = (level 4, right-to-left): c = 25

console.log(a); // 25
console.log(c); // 25
```

**Example 4 — Surprising typeof precedence:**

```javascript
// typeof has higher precedence than + (level 17 vs 14)
let result = typeof "hello" + " world";

// Step-by-step:
// 1. typeof (level 17):  typeof "hello" → "string"
// 2. + (level 14):       "string" + " world" → "string world"

console.log(result); // "string world"
// NOT typeof ("hello" + " world") which would be "string"
```

---

### 4.5 Using Parentheses to Control Order

Parentheses (grouping) have the **highest precedence (level 21)**. They override everything. When in doubt — or when you want to make your intent clear — use parentheses.

```javascript
// Without parentheses — follows default precedence
let a = 2 + 3 * 4;      // 14 (multiplication first)
let b = 2 ** 3 ** 2;     // 512 (right-to-left)
let c = 5 - 3 - 1;       // 1   (left-to-right)

// With parentheses — explicit control
let a2 = (2 + 3) * 4;    // 20
let b2 = (2 ** 3) ** 2;  // 64
let c2 = 5 - (3 - 1);    // 3

// Real-world: tax calculation
let price = 1000;
let taxRate = 0.1;

// ❌ Wrong — tax is applied to only 1, not the full expression
let wrong = price * taxRate + 1;  // 1000 * 0.1 + 1 = 101 (taxRate + 1 was intended)

// ✅ Correct — parentheses make the intent explicit
let correct = price * (1 + taxRate); // 1000 * 1.1 = 1100
```

---

### 4.6 Common Precedence Pitfalls

**Pitfall 1 — Logical AND evaluates before OR:**

```javascript
// Can be misleading without parentheses
let isAdmin   = false;
let isLoggedIn= true;
let isOwner   = true;

let canEdit = isAdmin || isLoggedIn && isOwner;
// && has higher precedence than ||
// Evaluated as: isAdmin || (isLoggedIn && isOwner)
// = false || (true && true) = false || true = true

// Is this what you intended?
// If you wanted (isAdmin || isLoggedIn) && isOwner — use parentheses!
let canEdit2 = (isAdmin || isLoggedIn) && isOwner;
// = (false || true) && true = true && true = true
// Same result here, but logic is different — matters when values change
```

**Pitfall 2 — Typeof + addition:**

```javascript
// Already shown above, but worth repeating
console.log(typeof 10 + 20);   // "number20" — typeof runs first!
console.log(typeof (10 + 20)); // "number"   — parentheses control order
```

**Pitfall 3 — Postfix vs prefix increment:**

```javascript
let n = 5;
let result = n++ * 2; // Postfix: uses 5 THEN increments
// = 5 * 2 = 10
// n is now 6

let m = 5;
let result2 = ++m * 2; // Prefix: increments THEN uses 6
// = 6 * 2 = 12
// m is now 6

console.log(result);  // 10
console.log(result2); // 12
```

**Pitfall 4 — Ternary nesting direction:**

```javascript
// Ternary is right-associative
let x = true ? "a" : false ? "b" : "c";
// Evaluated right-to-left: true ? "a" : (false ? "b" : "c")
// = "a" (because condition is true)

// But if the first condition is false:
let y = false ? "a" : false ? "b" : "c";
// = false ? "a" : (false ? "b" : "c")
// = (false ? "b" : "c") = "c"

console.log(y); // "c"
```

---

### 4.7 Short-Circuit Evaluation and Precedence Together

Short-circuit evaluation means JavaScript may not evaluate the right side of `&&` or `||` if the result is already determined from the left side.

```javascript
// && short-circuits on first falsy value
let user = null;
let name = user && user.name; // user is null (falsy) → short-circuits → name = null
console.log(name); // null — user.name was never accessed (no TypeError!)

// || short-circuits on first truthy value
let cached = null;
let data = cached || fetchFromServer(); // cached is null → fetchFromServer() IS called
// If cached had a value, fetchFromServer() would NEVER run — performance benefit!

// Practical guard with && and precedence
let config = {
  database: {
    host: "localhost"
  }
};

// Without optional chaining — uses && short-circuit
let port = config && config.database && config.database.port;
console.log(port); // undefined — but no crash

// Modern equivalent with optional chaining (cleaner)
let port2 = config?.database?.port;
console.log(port2); // undefined
```

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Statement Control Flow Maze

**Objective:** Trace the exact output of a complex multi-statement program before running it.

**Scenario:** A library system processes a list of books. Trace what gets printed.

```javascript
let books = [
  { title: "Clean Code",         pages: 431, available: true  },
  { title: "You Don't Know JS",  pages: 278, available: false },
  { title: "Eloquent JavaScript",pages: 472, available: true  },
  { title: "JavaScript: TGP",    pages: 176, available: true  },
  { title: "YDKJS: Scope",       pages: 98,  available: false }
];

let longBooks = 0;
let checkedOut = 0;

bookLoop: for (let i = 0; i < books.length; i++) {
  let book = books[i];

  if (!book.available) {
    checkedOut++;
    continue;
  }

  if (book.pages > 400) {
    longBooks++;
    if (longBooks >= 2) {
      console.log("Found enough long books — stopping search.");
      break bookLoop;
    }
  }

  console.log(`Available: "${book.title}" (${book.pages} pages)`);
}

console.log(`Long books found: ${longBooks}`);
console.log(`Checked out: ${checkedOut}`);
```

**Step-by-step instructions:**

1. Trace through each iteration manually (use a table: book title | available? | pages > 400? | action)
2. Write down exactly which `console.log` lines execute and in what order
3. Predict the final output before running
4. Run the code and verify your prediction

**Hints:**
- Track `longBooks` and `checkedOut` as they change
- The labelled `break bookLoop` exits the entire `for` loop

**Self-check expected output:**
```
Available: "JavaScript: TGP" (176 pages)
Available: "Eloquent JavaScript" (472 pages)
Found enough long books — stopping search.
Long books found: 1
Checked out: 1
```
Wait — is that right? Trace carefully. The order the books appear matters.

---

## Exercise 2 — Operator Precedence Prediction

**Objective:** Predict the result of each expression without running it, then explain your reasoning.

```javascript
// Group A — Arithmetic precedence
console.log(3 + 4 * 2);              // ?
console.log(2 ** 2 ** 3);            // ?
console.log(100 / 5 / 2);            // ?
console.log(10 - 3 - 2 - 1);        // ?

// Group B — Mixed arithmetic and comparison
console.log(5 + 3 > 2 * 4);         // ?
console.log(typeof 42 === "number"); // ?
console.log(typeof 42 + 1);          // ?

// Group C — Logical operators
console.log(true || false && false); // ?
console.log(null ?? undefined ?? 0 ?? "default"); // ?
console.log(0 || "" || null || "found"); // ?
console.log(1 && 2 && 0 && 4);          // ?

// Group D — Assignment and ternary
let x = 5;
let y = x++ + ++x; // What is y? What is x after?
console.log(y, x);

let score = 68;
let grade = score >= 90 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : "F";
console.log(grade); // ?
```

**For each expression:**
1. Write the operator with the highest precedence
2. Show the step-by-step evaluation
3. Write the final result

**Self-check answers:**
- `3 + 4 * 2` → 11 (multiplication first)
- `2 ** 2 ** 3` → 256 (right-to-left: `2 ** 8`)
- `100 / 5 / 2` → 10 (left-to-right: `(100/5)/2`)
- `10 - 3 - 2 - 1` → 4 (left-to-right)
- `5 + 3 > 2 * 4` → false (arithmetic before comparison: `8 > 8` is false)
- `typeof 42 === "number"` → true
- `typeof 42 + 1` → `"number1"` (typeof first → "number", then concat)
- `true || false && false` → true (`&&` first: false && false = false; then true || false = true)
- `null ?? undefined ?? 0 ?? "default"` → 0 (first non-null/undefined)
- `0 || "" || null || "found"` → "found" (first truthy)
- `1 && 2 && 0 && 4` → 0 (first falsy)
- `y` → 12, `x` → 7 (x++ uses 5 then makes 6; ++x makes 7 then uses 7; 5 + 7 = 12)
- `grade` → "C"

---

## Exercise 3 — Reserved Words Rescue

**Objective:** Fix a program that uses reserved and dangerous words as identifiers.

```javascript
// This code is full of reserved/dangerous word violations — find and fix all of them

var class = "Premium";           // Error 1
var return = calculateReturn();  // Error 2
var if = checkCondition();       // Error 3

function calculateReturn() {
  var default = 0.05;            // Error 4
  var new = 1000;                // Error 5
  return new * default;
}

function checkCondition() {
  var in = true;                 // Error 6
  return in;
}

// Also dangerous — shadowing built-ins:
var undefined = "I broke undefined";  // Danger 1
var NaN = 42;                          // Danger 2
var Math = { PI: 3 };                 // Danger 3

// Fix all errors and dangers, then verify the program runs correctly
```

**Step-by-step instructions:**

1. Identify each reserved word being misused and suggest a meaningful alternative name
2. Identify each built-in being shadowed
3. Rewrite the entire program with correct identifiers
4. Add `"use strict"` to catch any remaining issues
5. Add `console.log` statements to verify all fixed values

---

## Exercise 4 — Operator Application

**Objective:** Use operators correctly to solve four real-world scenarios.

**Scenario 1 — Safe user profile display:**

Write a function `displayProfile(user)` that:
- Returns `user.displayName` if it exists, otherwise `user.firstName + " " + user.lastName`
- If neither exists, returns `"Anonymous"`
- Uses `??` and `||` appropriately (not just `||` for everything — explain why)

```javascript
// Test cases:
displayProfile({ displayName: "t_codes",   firstName: "Tunde", lastName: "A" }); // "t_codes"
displayProfile({ displayName: null,         firstName: "Tunde", lastName: "A" }); // "Tunde A"
displayProfile({ displayName: undefined,    firstName: "",      lastName: ""  }); // "Anonymous"
displayProfile({});                                                                // "Anonymous"
```

**Scenario 2 — Permission checker:**

Using bitwise flags, create a permission system with `READ = 1`, `WRITE = 2`, `DELETE = 4`, `ADMIN = 8`. Write:
- `grantPermission(current, permission)` — adds a permission
- `revokePermission(current, permission)` — removes a permission
- `hasPermission(current, permission)` — checks if permission exists

```javascript
let perms = 0;
perms = grantPermission(perms, READ);   // perms = 1
perms = grantPermission(perms, WRITE);  // perms = 3
perms = grantPermission(perms, DELETE); // perms = 7
console.log(hasPermission(perms, WRITE));  // true
console.log(hasPermission(perms, ADMIN));  // false
perms = revokePermission(perms, WRITE); // perms = 5
console.log(hasPermission(perms, WRITE));  // false
```

**Scenario 3 — Shopping cart with operator precedence:**

Calculate the cart total correctly. The formula is:
- Subtotal = sum of (item.price × item.qty) for all items
- If subtotal > 50,000: apply 10% discount
- Tax = 7.5% on the discounted subtotal
- Delivery = free if final total (before delivery) > 30,000, else ₦1,500
- Final total = discounted subtotal + tax + delivery

Write this using correct operator precedence — add explicit parentheses everywhere to make the order clear.

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Expression Evaluator and Code Quality Linter

**Overview:** You will build a JavaScript utility module that demonstrates mastery of statements, reserved words, operators, and precedence. The module will include a safe expression evaluator for simple arithmetic (no `eval()`!), a reserved-word checker, and an operator precedence visualiser.

**Real-world connection:** Expression parsers are used in spreadsheet applications (Google Sheets, Excel), financial calculators, rule engines in business software, and game scripting systems. The ability to work with operators mathematically underpins almost all data processing.

---

### Stage 1 — Safe Arithmetic Evaluator

**Micro-example first:**

```javascript
// Simple precedence-respecting calculation chain:
function applyOperator(op, a, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : null; // Guard against division by zero
    case "%": return b !== 0 ? a % b : null;
    case "**": return a ** b;
    default:  return null;
  }
}

console.log(applyOperator("*", 5, 3));  // 15
console.log(applyOperator("/", 10, 0)); // null — safe!
```

**Full Stage 1 — Precedence-aware evaluator:**

```javascript
"use strict";

const MathUtils = {

  // Operator metadata — precedence and associativity
  operators: {
    "+"  : { precedence: 14, assoc: "left",  fn: (a, b) => a + b  },
    "-"  : { precedence: 14, assoc: "left",  fn: (a, b) => a - b  },
    "*"  : { precedence: 15, assoc: "left",  fn: (a, b) => a * b  },
    "/"  : { precedence: 15, assoc: "left",  fn: (a, b) => b !== 0 ? a / b : (() => { throw new RangeError("Division by zero"); })() },
    "%"  : { precedence: 15, assoc: "left",  fn: (a, b) => a % b  },
    "**" : { precedence: 16, assoc: "right", fn: (a, b) => a ** b  }
  },

  // Evaluate a simple two-operand expression
  evaluate(a, operator, b) {
    let op = this.operators[operator];
    if (!op) throw new TypeError(`Unknown operator: "${operator}"`);

    try {
      return op.fn(a, b);
    } catch (error) {
      console.error("Evaluation error:", error.message);
      return null;
    }
  },

  // Compare precedence of two operators
  comparePrecedence(op1, op2) {
    let p1 = this.operators[op1]?.precedence ?? 0;
    let p2 = this.operators[op2]?.precedence ?? 0;

    if (p1 > p2) return `"${op1}" evaluates before "${op2}" (${p1} > ${p2})`;
    if (p1 < p2) return `"${op2}" evaluates before "${op1}" (${p2} > ${p1})`;
    return `"${op1}" and "${op2}" have equal precedence — use associativity rules`;
  },

  // Show step-by-step evaluation of a three-term expression
  explainEvaluation(a, op1, b, op2, c) {
    let prec1 = this.operators[op1]?.precedence ?? 0;
    let prec2 = this.operators[op2]?.precedence ?? 0;

    console.log(`\nExpression: ${a} ${op1} ${b} ${op2} ${c}`);

    if (prec1 >= prec2) {
      let intermediate = this.evaluate(a, op1, b);
      let result       = this.evaluate(intermediate, op2, c);
      console.log(`  Step 1: ${a} ${op1} ${b} = ${intermediate}`);
      console.log(`  Step 2: ${intermediate} ${op2} ${c} = ${result}`);
      console.log(`  Result: ${result}`);
      return result;
    } else {
      let intermediate = this.evaluate(b, op2, c);
      let result       = this.evaluate(a, op1, intermediate);
      console.log(`  Step 1: ${b} ${op2} ${c} = ${intermediate}`);
      console.log(`  Step 2: ${a} ${op1} ${intermediate} = ${result}`);
      console.log(`  Result: ${result}`);
      return result;
    }
  }
};

// Test the evaluator:
console.log(MathUtils.evaluate(10, "*", 5));    // 50
console.log(MathUtils.evaluate(10, "/", 0));    // null (with error message)
console.log(MathUtils.evaluate(2,  "**", 10));  // 1024

console.log(MathUtils.comparePrecedence("*", "+")); // * evaluates before +
console.log(MathUtils.comparePrecedence("+", "-")); // equal precedence

MathUtils.explainEvaluation(2, "+", 3, "*", 4);
// Step 1: 3 * 4 = 12
// Step 2: 2 + 12 = 14
// Result: 14

MathUtils.explainEvaluation(10, "-", 4, "-", 3);
// Step 1: 10 - 4 = 6
// Step 2: 6 - 3 = 3
// Result: 3
```

---

### Stage 2 — Reserved Word and Identifier Checker

```javascript
const CodeAnalyser = {

  // Current JS reserved words
  RESERVED_WORDS: new Set([
    "break","case","catch","class","const","continue","debugger","default",
    "delete","do","else","export","extends","false","finally","for","function",
    "if","import","in","instanceof","let","new","null","return","static",
    "super","switch","this","throw","true","try","typeof","var","void",
    "while","with","yield"
  ]),

  // Strict mode additions
  STRICT_RESERVED: new Set([
    "implements","interface","package","private","protected","public","static","let","yield"
  ]),

  // Dangerous (not reserved but should be avoided)
  DANGEROUS_NAMES: new Set([
    "undefined","NaN","Infinity","eval","arguments","name",
    "Math","JSON","Date","Array","Object","String","Number","Boolean",
    "Error","TypeError","ReferenceError","SyntaxError","RangeError",
    "parseInt","parseFloat","isNaN","isFinite"
  ]),

  checkIdentifier(name) {
    console.log(`\nChecking: "${name}"`);

    if (this.RESERVED_WORDS.has(name)) {
      console.error(`  ❌ RESERVED WORD — "${name}" is a JavaScript keyword. Will cause SyntaxError.`);
      return "reserved";
    }

    if (this.STRICT_RESERVED.has(name)) {
      console.warn(`  ⚠️  STRICT RESERVED — "${name}" cannot be used in strict mode.`);
      return "strict-reserved";
    }

    if (this.DANGEROUS_NAMES.has(name)) {
      console.warn(`  ⚠️  DANGEROUS — "${name}" shadows a global built-in. Avoid this.`);
      return "dangerous";
    }

    // Check naming convention
    if (/^[A-Z_]+$/.test(name)) {
      console.log(`  ✅ Valid — looks like a constant (UPPER_SNAKE_CASE).`);
    } else if (/^[A-Z]/.test(name)) {
      console.log(`  ✅ Valid — looks like a class name (PascalCase).`);
    } else if (/^[a-z]/.test(name)) {
      console.log(`  ✅ Valid — looks like a variable or function (camelCase).`);
    } else {
      console.warn(`  ⚠️  Valid but unconventional name — starts with "_" or digit?`);
    }

    return "valid";
  },

  checkMultiple(names) {
    console.log("=".repeat(40));
    console.log("IDENTIFIER AUDIT REPORT");
    console.log("=".repeat(40));

    let results = { reserved: 0, strictReserved: 0, dangerous: 0, valid: 0 };

    for (let name of names) {
      let result = this.checkIdentifier(name);
      if      (result === "reserved")        results.reserved++;
      else if (result === "strict-reserved") results.strictReserved++;
      else if (result === "dangerous")       results.dangerous++;
      else                                   results.valid++;
    }

    console.log("\n── Summary ──");
    console.log(`  Reserved word errors:  ${results.reserved}`);
    console.log(`  Strict mode warnings:  ${results.strictReserved}`);
    console.log(`  Dangerous shadowing:   ${results.dangerous}`);
    console.log(`  Valid identifiers:     ${results.valid}`);
    return results;
  }
};

// Test the checker:
CodeAnalyser.checkMultiple([
  "userName",      // valid
  "class",         // reserved word
  "static",        // strict reserved
  "NaN",           // dangerous
  "TAX_RATE",      // valid constant
  "BankAccount",   // valid class name
  "return",        // reserved word
  "calculateTotal" // valid function name
]);
```

---

### Stage 3 — Integration and Reflection

**Combine both modules in a demonstration:**

```javascript
// Full demonstration: parse a simple financial formula step by step
console.log("\n" + "=".repeat(50));
console.log("FINANCIAL FORMULA EVALUATOR");
console.log("=".repeat(50));

let price    = 450000;
let qty      = 2;
let taxRate  = 0.075;
let discount = 0.10;

// Formula: totalCost = price * qty * (1 - discount) * (1 + taxRate)
// Let's evaluate and explain each step

console.log(`\nFormula: ${price} * ${qty} * (1 - ${discount}) * (1 + ${taxRate})`);

let subtotal       = MathUtils.evaluate(price, "*", qty);
console.log(`Subtotal: ${price} * ${qty} = ₦${subtotal.toLocaleString()}`);

let discountFactor = 1 - discount; // 0.9
let discounted     = subtotal * discountFactor;
console.log(`After 10% discount: ₦${discounted.toLocaleString()}`);

let taxFactor      = 1 + taxRate; // 1.075
let finalTotal     = discounted * taxFactor;
console.log(`After 7.5% tax: ₦${finalTotal.toLocaleString()}`);

// Verify precedence understanding:
let manual = price * qty * (1 - discount) * (1 + taxRate);
console.assert(
  Math.abs(finalTotal - manual) < 0.01,
  "Step-by-step and direct calculation should match"
);
console.log(`\n✅ Verification passed: ₦${manual.toLocaleString()}`);
// Expected: ₦ 877,050

// Check the identifiers we used:
CodeAnalyser.checkMultiple(["price", "qty", "taxRate", "discount", "subtotal", "finalTotal"]);
```

---

### Reflection Questions

1. **Why does `2 ** 3 ** 2` evaluate to `512` and not `64`? Explain using the concepts of associativity and the precedence table.**

2. **The `&&` operator short-circuits on the first falsy value. Give a real-world example where this behaviour prevents a performance problem (e.g., avoiding an expensive database call).**

3. **`||` and `??` are both used for providing default values. Write a concrete example where using `||` instead of `??` would introduce a bug (Hint: think about a quantity or price of `0`).**

4. **You used `for...of` vs `for...in` in the exercises. Explain in your own words exactly what each iterates over, and why using `for...in` on an array is dangerous.**

5. **In Stage 2 of the project, `RESERVED_WORDS` and `DANGEROUS_NAMES` are stored as `Set` objects instead of arrays. Looking back at the Performance tutorial, explain why `Set.has()` is better than `Array.includes()` for this use case.**

---

### Advanced Challenges (Optional)

1. **Full Expression Parser:** Extend `MathUtils.explainEvaluation()` to handle 4 and 5 term expressions using a proper operator stack algorithm (look up the **Shunting-Yard Algorithm** by Dijkstra).

2. **Destructuring with Operators:** Rewrite the financial evaluator to use destructuring, spread, and rest operators throughout. Notice how the code changes.

3. **Generators and `yield`:** Research JavaScript generators. Write a generator function that `yield`s each step of the precedence-based evaluation — so a consumer can watch each step one at a time.

4. **Nullish Coalescing in Config Systems:** Build a `mergeConfig(defaults, overrides)` function that uses `??=` to fill in only truly missing values (not falsy ones). Compare its behaviour to a version using `||=`.

5. **Bitwise Permission System UI:** Build an HTML page where checkboxes represent READ/WRITE/DELETE/ADMIN permissions. Use bitwise operators to maintain a single integer that represents the full permission state, and display the binary representation in real time.

---

# Completion Checklist

- [x] **Block statement `{}`:** Understood as grouping mechanism and scope boundary for `let`/`const`
- [x] **`break` and `continue`:** Know the difference; understand labelled versions for nested loops
- [x] **`const` vs `let` vs `var`:** Scope rules, hoisting, reassignability — clear on when to use each
- [x] **All loop types:** `for`, `for...in` (object keys), `for...of` (iterable values), `while`, `do...while`
- [x] **`if/else if/else` and `switch`:** Fall-through behaviour, strict equality in switch, always use `default`
- [x] **`try/catch/finally/throw`:** Error handling — function exits on `throw`, `finally` always runs
- [x] **`import`/`export`:** Module syntax for code sharing across files
- [x] **Reserved words — current:** All keywords that cause SyntaxError when used as identifiers
- [x] **Reserved words — strict mode:** Additional words reserved under `"use strict"`
- [x] **Future reserved words:** `enum`, `await`, etc. — reserved but currently unused
- [x] **Dangerous identifiers:** `undefined`, `NaN`, `Infinity`, `eval`, `Math` — legal to override but never should be
- [x] **All arithmetic operators:** Including `%` (modulus) real-world uses and `**` (exponentiation)
- [x] **Prefix vs postfix `++`/`--`:** The "use-then-update vs update-then-use" distinction
- [x] **All assignment operators:** Including `&&=`, `||=`, `??=` — when each is appropriate
- [x] **`==` vs `===`:** Type coercion surprises — always use `===`
- [x] **Logical operators `&&`, `||`, `!`, `??`:** Short-circuit evaluation and non-boolean return values
- [x] **`||` vs `??`:** The critical difference — `||` avoids all falsy; `??` only avoids null/undefined
- [x] **Bitwise operators:** Bit-level operations; real-world use in permission flags
- [x] **Ternary `? :`:** Compact conditional — when to use vs when `if/else` is clearer
- [x] **Optional chaining `?.`:** Safe deep property access without TypeError
- [x] **`typeof` and `instanceof`:** Type checking — know the `typeof null === "object"` quirk
- [x] **`delete`, `in`, `void`, spread `...`:** Membership, property removal, and spreading
- [x] **Operator precedence table:** Know the top levels (grouping, member access, unary, `**`, `*/`, `+-`, comparison, equality, `&&`, `||`/`??`, ternary, assignment, comma)
- [x] **Associativity:** Left-to-right vs right-to-left — know which operators use which
- [x] **Parentheses to override precedence:** Always use them to make complex expressions clear
- [x] **Common precedence pitfalls:** `typeof x + 1`, `&&` before `||`, postfix timing, nested ternary
- [x] **Exercises completed:** Control flow trace, precedence prediction, reserved-word rescue, operator application
- [x] **Full project completed:** Expression evaluator + identifier checker + integration demonstration
- [x] **Reflection questions answered**

---

**One-sentence summary:** JavaScript's statements define the actions and flow of your programs, reserved words are the language's own vocabulary that must never be used as identifiers, operators are the symbols that compute and compare values, and operator precedence is the mathematical rulebook that determines which operation happens first — mastering all four gives you complete, confident control over how JavaScript reads, interprets, and executes every line you write.
