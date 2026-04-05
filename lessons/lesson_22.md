---
render_with_liquid: false
title: "JavaScript Errors — Introduction, Silent Errors, Handling & the Error Object"
nav_order: 22
---

## Table of Contents
1. [Section 1 — Conceptual Understanding](#section-1--conceptual-understanding)
   - [1.1 What Is an Error?](#11-what-is-an-error)
   - [1.2 The Two Worlds of Errors: Loud and Silent](#12-the-two-worlds-of-errors-loud-and-silent)
   - [1.3 Silent Errors — When JavaScript Says Nothing](#13-silent-errors--when-javascript-says-nothing)
   - [1.4 Strict Mode — Making Silent Errors Loud](#14-strict-mode--making-silent-errors-loud)
   - [1.5 Loud Errors — try, catch, finally, and throw](#15-loud-errors--try-catch-finally-and-throw)
   - [1.6 The Error Object](#16-the-error-object)
   - [1.7 The Six Built-In Error Types](#17-the-six-built-in-error-types)
   - [1.8 Creating Custom Errors](#18-creating-custom-errors)
   - [1.9 Error Handling Patterns and Best Practices](#19-error-handling-patterns-and-best-practices)
2. [Section 2 — Applied Exercises](#section-2--applied-exercises)
3. [Section 3 — Project Simulation](#section-3--project-simulation)
4. [Completion Checklist](#completion-checklist)

---

# Section 1 — Conceptual Understanding

## 1.1 What Is an Error?

### The Real-World Analogy

Imagine you are a chef following a recipe. Halfway through, you reach for the salt — but the bottle is empty. You have a choice:

- **Ignore it** and serve unseasoned food (silent failure — the dish is wrong but nobody told the kitchen)
- **Stop and report it** so the kitchen manager can decide: get more salt, use a substitute, or cancel the dish (handled error — a decision is made)
- **Crash the entire kitchen** and serve no food to anyone (unhandled error — the whole program stops)

JavaScript programs face the same situation constantly. Something unexpected happens — a value is missing, a network request fails, a user types text where a number was expected — and the program must decide what to do.

> **Definition:** An error in JavaScript is an unexpected event that disrupts the normal flow of a program. JavaScript represents errors as objects containing information about what went wrong, where, and why.

### Why learning error handling matters

In a real job, bugs do not stop at development. Data arrives in unexpected shapes from APIs. Users behave unpredictably. Networks drop out. A well-written program **anticipates** these situations and handles them gracefully — showing the user a meaningful message instead of a blank screen or a cryptic console dump.

Error handling is the difference between software that fails loudly and helplessly, and software that fails *safely* and *informedly*.

---

## 1.2 The Two Worlds of Errors: Loud and Silent

JavaScript errors divide into two fundamental categories:

| Category | What Happens | JavaScript's Reaction | Example |
|---|---|---|---|
| **Loud Errors** | Something clearly fails | Throws an error; stops execution at that line | Calling a method on `undefined` |
| **Silent Errors** | Something goes wrong but JavaScript keeps running | No error is thrown; wrong result produced | Assigning to a non-existent object property |

This distinction is critical because **silent errors are the most dangerous** — they do not crash your program, so you may not notice them until much later, when wrong data has already been stored in a database or sent to a user.

---

## 1.3 Silent Errors — When JavaScript Says Nothing

### What is a silent error?

A silent error (sometimes called a "silent failure") is a situation where JavaScript *could* tell you something is wrong but chooses not to — it simply continues running, producing incorrect or undefined behaviour without any warning.

### Example 1: Writing to a read-only property

```javascript
let PI = Math.PI;         // PI = 3.141592653589793
PI = 99;                  // Attempt to reassign a read-only value

console.log(PI);
// Expected Output: 3.141592653589793
```

Nothing happened. No error. `PI` is still `3.141592653589793`. The assignment `PI = 99` was silently ignored.

> 💡 JavaScript simply did nothing. In strict mode, this would throw a `TypeError`. In normal mode, it fails silently.

### Example 2: Writing to a non-existent property of a primitive

```javascript
let score = 42;
score.bonus = 10;         // Numbers cannot have properties

console.log(score.bonus);
// Expected Output: undefined
```

No error is thrown. The property assignment is silently discarded. Reading it back returns `undefined` — but no warning was given.

### Example 3: Deleting a non-configurable property

```javascript
delete Math.PI;           // Attempt to delete a core property

console.log(Math.PI);
// Expected Output: 3.141592653589793
```

`Math.PI` cannot be deleted. JavaScript ignores the `delete` and moves on.

### Example 4: Duplicate parameter names

```javascript
function greet(name, name) {   // Two parameters with the same name!
  console.log(name);
}

greet("Amara", "Kofi");
// Expected Output: Kofi   (second value wins — first is silently overwritten)
```

No error. The function runs. The first `name` is silently replaced by the second. This is a common source of confusing bugs.

### Example 5: Using an undeclared variable

```javascript
function saveStudent() {
  studentName = "Amara";    // No let, const, or var!
}

saveStudent();
console.log(studentName);
// Expected Output: Amara
```

JavaScript creates a **global variable** automatically. This is a serious silent error — you did not ask for a global variable, but now one exists, potentially contaminating other parts of your program.

### Why silent errors are so dangerous

Imagine the following scenario at a bank:

```javascript
function applyInterest(account) {
  account.balance = account.Balance * 1.05;  // typo: "Balance" vs "balance"
}

let account = { balance: 1000 };
applyInterest(account);
console.log(account.balance); // 1000   ← unchanged — NaN was silently discarded
```

`account.Balance` (capital B) is `undefined`. `undefined * 1.05` is `NaN`. Assigning `NaN` to `account.balance` fails silently in some configurations, or worse — `account.balance` becomes `NaN` and no interest was applied. Your bank customer just lost their interest payment with zero warning.

---

## 1.4 Strict Mode — Making Silent Errors Loud

### What is strict mode?

**Strict mode** is a setting you activate to make JavaScript *stricter* — it turns many silent errors into loud, thrown errors that you can detect and fix.

### How to enable strict mode

Write `"use strict";` as the very first statement in a script or a function:

```javascript
"use strict";              // Enable for the entire script

// Or inside a function only:
function strictFunction() {
  "use strict";
  // strict mode applies only inside here
}
```

### What strict mode catches

Let's revisit the silent errors from above — now with strict mode:

```javascript
"use strict";

// 1. Undeclared variable → now throws ReferenceError
function saveStudent() {
  studentName = "Amara";   // ❌ ReferenceError: studentName is not defined
}

// 2. Writing to a read-only property → now throws TypeError
let PI = Math.PI;
PI = 99;                   // ❌ TypeError: Assignment to constant variable

// 3. Duplicate parameter names → now throws SyntaxError
function greet(name, name) { // ❌ SyntaxError: Duplicate parameter name
  console.log(name);
}

// 4. Deleting an undeletable property → now throws TypeError
delete Math.PI;            // ❌ TypeError: Cannot delete property 'PI' of #<Object>
```

### Complete list of what strict mode prevents

| Silent Error | Without Strict | With Strict |
|---|---|---|
| Undeclared variable | Creates global | `ReferenceError` |
| Write to read-only property | Silently ignored | `TypeError` |
| Write to non-writable property | Silently ignored | `TypeError` |
| Duplicate parameter names | Second wins silently | `SyntaxError` |
| Delete non-configurable property | Silently ignored | `TypeError` |
| Using `with` statement | Allowed | `SyntaxError` |
| `this` in function (non-method) | Refers to `window` | `undefined` |

> 💡 **Best Practice:** Always use `"use strict";` at the top of your scripts. Modern JavaScript modules (`import`/`export`) have strict mode *on by default*. All major style guides (Airbnb, Google, StandardJS) require strict mode.

---

## 1.5 Loud Errors — try, catch, finally, and throw

### The big idea

When JavaScript encounters a loud error (called an **exception**), it immediately stops running the current block of code and *throws* the error — it looks for a handler. If no handler is found, the program crashes.

The `try...catch` structure lets you *handle* that thrown error gracefully instead of crashing.

---

### `try` — the risky zone

The `try` block contains code that *might* throw an error. JavaScript runs this code normally. If an error occurs anywhere inside, JavaScript immediately jumps to the `catch` block.

```
try {
  // Code that might go wrong
}
```

---

### `catch` — the safety net

The `catch` block runs *only if* an error was thrown in the `try` block. It receives the error object as a parameter.

```
catch (error) {
  // Handle the error here
  // error.message tells you what went wrong
}
```

---

### `finally` — the cleanup crew

The `finally` block runs *always* — whether an error occurred or not. It is used for cleanup: closing files, stopping loading spinners, resetting state.

```
finally {
  // Always runs — error or no error
}
```

---

### Full Structure

```javascript
try {
  // Attempt something risky
} catch (error) {
  // Handle the error if it happens
} finally {
  // Always runs regardless
}
```

---

### Micro-Demo 1: Basic try/catch

```javascript
try {
  let result = null;
  console.log(result.toUpperCase()); // ❌ result is null — can't call method on null
} catch (error) {
  console.log("Something went wrong: " + error.message);
}

// Expected Output: Something went wrong: Cannot read properties of null (reading 'toUpperCase')
```

Without `try/catch`, this would crash the program. With it, we capture the error and continue.

---

### Micro-Demo 2: try/catch/finally

```javascript
function loadData() {
  console.log("Loading started...");

  try {
    let data = JSON.parse("{ invalid json }");  // ❌ bad JSON
    console.log("Data loaded:", data);
  } catch (error) {
    console.log("Failed to parse data: " + error.message);
  } finally {
    console.log("Loading finished.");  // always runs
  }
}

loadData();
```

**Expected Output:**
```
Loading started...
Failed to parse data: Unexpected token i in JSON at position 2
Loading finished.
```

> 💡 `finally` is critical for cleaning up resources. Even if the catch block throws *another* error, `finally` still runs.

---

### Micro-Demo 3: catch is optional, finally is optional (but not both)

```javascript
// try with only finally (no catch) — error still propagates but finally runs
try {
  undeclaredVariable;
} finally {
  console.log("Cleanup ran.");   // runs before the error propagates
}
// Output: Cleanup ran.
// Then: ReferenceError: undeclaredVariable is not defined
```

---

### `throw` — creating your own errors

The `throw` statement lets you deliberately create and throw an error — on your own terms, based on your own business logic.

```
throw expression;
```

You can throw any value, but the best practice is to throw an `Error` object (covered in 1.6):

```javascript
throw new Error("Something went wrong");
throw new TypeError("Expected a number");
throw new RangeError("Value must be between 0 and 100");
```

### Micro-Demo 4: throw with custom validation

```javascript
function setAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number. Got: " + typeof age);
  }
  if (age < 0 || age > 150) {
    throw new RangeError("Age must be between 0 and 150. Got: " + age);
  }
  console.log("Age set to: " + age);
}

try {
  setAge("twenty");
} catch (error) {
  console.log(error.name + ": " + error.message);
}

try {
  setAge(-5);
} catch (error) {
  console.log(error.name + ": " + error.message);
}

try {
  setAge(25);
} catch (error) {
  console.log(error.name + ": " + error.message);
}
```

**Expected Output:**
```
TypeError: Age must be a number. Got: string
RangeError: Age must be between 0 and 150. Got: -5
Age set to: 25
```

---

### Re-throwing errors

Sometimes you catch an error, check if it is the kind you can handle, and if not — rethrow it for a higher-level handler:

```javascript
function processInput(input) {
  try {
    if (typeof input !== "number") {
      throw new TypeError("Input must be a number");
    }
    return input * 2;
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Handled TypeError: " + error.message);
      return 0;  // provide a default
    }
    throw error;  // rethrow anything we didn't expect
  }
}

console.log(processInput("hello")); // Handled TypeError: Input must be a number → 0
console.log(processInput(5));       // 10
```

**Expected Output:**
```
Handled TypeError: Input must be a number
0
10
```

---

### ⚠️ Common Beginner Mistake — Swallowing errors silently

```javascript
// ❌ Bad — this hides the error completely
try {
  riskyOperation();
} catch (error) {
  // empty catch — the error disappears!
}

// ✅ Better — always log or handle meaningfully
try {
  riskyOperation();
} catch (error) {
  console.error("riskyOperation failed:", error.message);
}
```

An empty `catch` block is one of the most dangerous patterns in JavaScript. The error is swallowed, the program continues with wrong state, and you have no idea anything went wrong.

---

## 1.6 The Error Object

### What is the Error object?

When JavaScript throws an error, it creates an **Error object** — a structured package of information about the failure. The `catch` block receives this object.

### The core properties

| Property | Type | What it contains |
|---|---|---|
| `name` | String | The type of error: `"TypeError"`, `"RangeError"`, etc. |
| `message` | String | A human-readable description of what went wrong |
| `stack` | String | A trace of which functions were called before the error |

### Micro-Demo: Inspecting an Error object

```javascript
try {
  null.toString();
} catch (error) {
  console.log("name:    " + error.name);
  console.log("message: " + error.message);
  console.log("stack:\n" + error.stack);
}
```

**Expected Output:**
```
name:    TypeError
message: Cannot read properties of null (reading 'toString')
stack:
TypeError: Cannot read properties of null (reading 'toString')
    at <anonymous>:2:8
    at ...
```

### The `stack` trace — your debugging map

The `stack` property shows the **call stack** — the sequence of function calls that led to the error. Reading it from bottom to top shows you the path JavaScript took to reach the error:

```javascript
function c() { null.toString(); }
function b() { c(); }
function a() { b(); }

try {
  a();
} catch (error) {
  console.log(error.stack);
}
```

**Expected Output (simplified):**
```
TypeError: Cannot read properties of null (reading 'toString')
    at c (<anonymous>:1:14)   ← error happened here
    at b (<anonymous>:2:14)   ← b called c
    at a (<anonymous>:3:14)   ← a called b
    at <anonymous>:6:3        ← top-level called a
```

> 💡 Reading stack traces is one of the most valuable debugging skills. In a real job, when a bug report comes in, the stack trace is your first clue about where to look.

### Creating an Error object manually

You can create Error objects using the `new` keyword without throwing them:

```javascript
let myError = new Error("Something failed");
console.log(myError.name);    // "Error"
console.log(myError.message); // "Something failed"
console.log(typeof myError);  // "object"
```

You can also create specific error types (see Section 1.7):

```javascript
let typeErr  = new TypeError("Expected a string");
let rangeErr = new RangeError("Value out of bounds");
```

---

## 1.7 The Six Built-In Error Types

JavaScript has six specific error types, each representing a different category of failure. They all extend the base `Error` type, so they all have `name`, `message`, and `stack`.

---

### 1. `RangeError`

Thrown when a value is not within the allowed range of values.

```javascript
// Array with negative length
try {
  let arr = new Array(-1);
} catch (e) {
  console.log(e.name + ": " + e.message);
  // RangeError: Invalid array length
}

// toFixed with invalid decimal count
try {
  let num = 3.14;
  num.toFixed(200);   // max allowed is 100
} catch (e) {
  console.log(e.name + ": " + e.message);
  // RangeError: toFixed() digits argument must be between 0 and 100
}
```

> 💡 **Real-World Use:** Validation of ages, percentages, scores — any numeric value with defined boundaries.

---

### 2. `ReferenceError`

Thrown when code refers to a variable that does not exist in the current scope.

```javascript
try {
  console.log(studentName);   // never declared
} catch (e) {
  console.log(e.name + ": " + e.message);
  // ReferenceError: studentName is not defined
}
```

```javascript
"use strict";
try {
  undeclaredVar = 10;         // no let/const/var
} catch (e) {
  console.log(e.name + ": " + e.message);
  // ReferenceError: undeclaredVar is not defined
}
```

> 💡 **Real-World Use:** This is extremely common. Typos in variable names, using a variable before it is declared, or accessing something outside its scope all produce `ReferenceError`.

---

### 3. `SyntaxError`

Thrown when JavaScript cannot parse the code — the grammar rules of the language are broken. This usually happens at **parse time**, before the program even runs.

```javascript
try {
  eval("let x = ;");   // invalid JavaScript syntax
} catch (e) {
  console.log(e.name + ": " + e.message);
  // SyntaxError: Unexpected token ';'
}

try {
  JSON.parse("{ name: Amara }");  // invalid JSON — keys must be quoted
} catch (e) {
  console.log(e.name + ": " + e.message);
  // SyntaxError: Unexpected token n in JSON at position 2
}
```

> 💡 Most `SyntaxError`s in your own code are caught by the browser/Node before execution. But `JSON.parse()` throws `SyntaxError` at runtime, which is very commonly caught in real programs.

---

### 4. `TypeError`

Thrown when an operation is performed on a value of the wrong type.

```javascript
// Calling a non-function
try {
  let x = 42;
  x();             // 42 is not callable
} catch (e) {
  console.log(e.name + ": " + e.message);
  // TypeError: x is not a function
}

// Accessing property of null or undefined
try {
  let user = null;
  console.log(user.name);
} catch (e) {
  console.log(e.name + ": " + e.message);
  // TypeError: Cannot read properties of null (reading 'name')
}

// Wrong argument type
try {
  "use strict";
  Object.defineProperty({}, "x", { value: 1, writable: false });
  // Trying to write to it:
  let obj = {};
  Object.defineProperty(obj, "y", { value: 42, writable: false });
  obj.y = 99;      // TypeError in strict mode
} catch (e) {
  console.log(e.name + ": " + e.message);
}
```

> 💡 **Most common error in production JavaScript.** Accessing `.name`, `.length`, or calling a method on `null` or `undefined` is the #1 cause of TypeError crashes in real apps. Always check that a value exists before accessing its properties.

---

### 5. `URIError`

Thrown when `encodeURI()` or `decodeURI()` are passed malformed URI sequences.

```javascript
try {
  decodeURIComponent("%");   // incomplete percent-encoding
} catch (e) {
  console.log(e.name + ": " + e.message);
  // URIError: URI malformed
}
```

> 💡 **Real-World Use:** When working with URLs from external sources (APIs, user input), always wrap `decodeURIComponent()` in try/catch.

---

### 6. `EvalError`

This was thrown historically for errors in `eval()`. Modern JavaScript engines no longer throw it in practice, but the type still exists for legacy compatibility. You are unlikely to encounter it in real code.

```javascript
let evalErr = new EvalError("eval is disabled here");
console.log(evalErr.name);    // "EvalError"
console.log(evalErr.message); // "eval is disabled here"
```

---

### Quick Reference — Which Error for Which Situation?

| Situation | Error Type |
|---|---|
| Value outside allowed range | `RangeError` |
| Variable not declared / not in scope | `ReferenceError` |
| Invalid code syntax / bad JSON | `SyntaxError` |
| Wrong type used / null property access | `TypeError` |
| Malformed URI string | `URIError` |
| Generic / custom errors | `Error` |

---

## 1.8 Creating Custom Errors

### Why create custom errors?

Built-in error types describe *technical* failures. In real applications, you also need to describe *business logic* failures:

- "User not found" — not a `TypeError`, not a `RangeError` — it is a domain-specific failure
- "Insufficient funds" — meaningful to the application but not to JavaScript
- "Session expired" — needs special handling in the UI

Custom errors let you create named, meaningful error types for your application's domain.

### Method 1: Extending the Error class

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);           // pass message to parent Error
    this.name = "ValidationError";
    this.field = field;       // add extra context
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}
```

### Using custom errors

```javascript
function validateEmail(email) {
  if (typeof email !== "string") {
    throw new ValidationError("Email must be a string", "email");
  }
  if (!email.includes("@")) {
    throw new ValidationError("Email must contain @", "email");
  }
  return true;
}

try {
  validateEmail("amara-at-school.com");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed on field: " + error.field);
    console.log("Reason: " + error.message);
  } else {
    throw error;   // rethrow unexpected errors
  }
}
```

**Expected Output:**
```
Validation failed on field: email
Reason: Email must contain @
```

### Using `instanceof` to identify error types

`instanceof` lets you check what kind of error you caught:

```javascript
try {
  riskyOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Type problem:", error.message);
  } else if (error instanceof RangeError) {
    console.log("Range problem:", error.message);
  } else if (error instanceof ValidationError) {
    console.log("Validation problem:", error.message);
  } else {
    console.log("Unknown error:", error);
    throw error;  // always rethrow what you can't handle
  }
}
```

---

## 1.9 Error Handling Patterns and Best Practices

### Pattern 1: Guard clauses — validate early, throw early

Catch problems at the entrance of a function before doing any work:

```javascript
function processPayment(amount, currency) {
  // Guard clauses — check inputs first
  if (typeof amount !== "number")   throw new TypeError("Amount must be a number");
  if (amount <= 0)                  throw new RangeError("Amount must be positive");
  if (typeof currency !== "string") throw new TypeError("Currency must be a string");
  if (currency.length !== 3)        throw new RangeError("Currency must be a 3-letter code");

  // Main logic — only reached if all guards pass
  console.log(`Processing ${currency} ${amount.toFixed(2)}`);
}

try {
  processPayment(100.50, "GHS");
  processPayment(-50, "USD");
} catch (error) {
  console.log(error.name + ": " + error.message);
}
```

**Expected Output:**
```
Processing GHS 100.50
RangeError: Amount must be positive
```

---

### Pattern 2: Wrapping async operations

In real applications, many operations are asynchronous (network requests, file reads). Errors in async code must be handled with `.catch()` or `try/catch` inside `async/await`:

```javascript
// With async/await (preview — you'll learn this fully in async tutorials)
async function fetchStudent(id) {
  try {
    let response = await fetch("https://api.school.com/students/" + id);
    if (!response.ok) {
      throw new NetworkError("Student not found", response.status);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof NetworkError) {
      console.log("Network issue (" + error.statusCode + "): " + error.message);
    } else {
      console.log("Unexpected error: " + error.message);
    }
    return null;
  }
}
```

---

### Pattern 3: Always log enough context

```javascript
// ❌ Vague — useless in production
catch (error) {
  console.log("Error occurred");
}

// ✅ Informative — helps debugging
catch (error) {
  console.error(`[processPayment] Failed for amount=${amount}: ${error.name}: ${error.message}`);
  console.error(error.stack);
}
```

---

### Pattern 4: Never catch what you cannot handle

```javascript
// ❌ Dangerous — catches everything, even programmer mistakes
try {
  doSomething();
} catch (error) {
  console.log("error happened");
  // doesn't rethrow — error disappears
}

// ✅ Selective — catch known errors, rethrow the rest
try {
  doSomething();
} catch (error) {
  if (error instanceof ValidationError) {
    showUserMessage(error.message);
  } else {
    throw error;  // programmer errors should propagate
  }
}
```

---

### ⚠️ Summary of Common Beginner Mistakes

| Mistake | Problem | Fix |
|---|---|---|
| Empty `catch` block | Error disappears silently | Always log or handle |
| Catching too broadly | Masks real bugs | Use `instanceof` to be specific |
| Not rethrowing | Unknown errors get hidden | Rethrow what you can't handle |
| Ignoring silent errors | Wrong data silently propagates | Use `"use strict"` always |
| Not using `finally` | Resources left open on error | Use `finally` for cleanup |
| Throwing plain strings | No stack trace, no type info | Always `throw new Error(...)` |

---

# Section 2 — Applied Exercises

---

## Exercise 1 — Form Input Validator

### Warm-Up Mini-Example

```javascript
function checkInput(value, fieldName) {
  try {
    if (!value) throw new Error(fieldName + " cannot be empty");
    console.log(fieldName + " is valid: " + value);
  } catch (error) {
    console.log("❌ " + error.message);
  }
}

checkInput("Amara", "Name");  // Name is valid: Amara
checkInput("", "Email");      // ❌ Email cannot be empty
```

---

### Objective

Build a complete form validator that uses custom error types, `try/catch`, and strict mode to validate a user registration form.

### Scenario

You are building a student registration portal. The server receives form data and must validate it before saving to the database. Invalid data must be rejected with clear error messages.

### Requirements

The form has these fields:

- `username` — string, 3–20 characters, letters and numbers only
- `email` — string, must contain `@` and `.`
- `age` — number or numeric string, must be between 16 and 100
- `password` — string, at least 8 characters

### Step-by-Step Instructions

**Step 1:** Enable strict mode at the top.

**Step 2:** Create a `ValidationError` class with `field` and `message` properties.

**Step 3:** Write individual validator functions that throw `ValidationError` when a field is invalid.

**Step 4:** Write a `validateForm(data)` function that calls all validators in a `try/catch` block.

**Step 5:** Test with both valid and invalid data.

```javascript
"use strict";

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateUsername(username) {
  if (typeof username !== "string") {
    throw new ValidationError("Username must be a string", "username");
  }
  if (username.length < 3 || username.length > 20) {
    throw new ValidationError("Username must be 3–20 characters", "username");
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    throw new ValidationError("Username can only contain letters and numbers", "username");
  }
}

function validateEmail(email) {
  if (typeof email !== "string") {
    throw new ValidationError("Email must be a string", "email");
  }
  if (!email.includes("@") || !email.includes(".")) {
    throw new ValidationError("Email must be a valid format (contains @ and .)", "email");
  }
}

function validateAge(age) {
  let numAge = Number(age);
  if (isNaN(numAge)) {
    throw new ValidationError("Age must be a number", "age");
  }
  if (numAge < 16 || numAge > 100) {
    throw new RangeError("Age must be between 16 and 100");
  }
}

function validatePassword(password) {
  if (typeof password !== "string") {
    throw new ValidationError("Password must be a string", "password");
  }
  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters", "password");
  }
}

function validateForm(data) {
  console.log("Validating form for: " + data.username);
  try {
    validateUsername(data.username);
    validateEmail(data.email);
    validateAge(data.age);
    validatePassword(data.password);
    console.log("✅ All fields valid. Registration successful.\n");
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`❌ Validation error on '${error.field}': ${error.message}\n`);
    } else if (error instanceof RangeError) {
      console.log("❌ Range error: " + error.message + "\n");
    } else {
      console.log("❌ Unexpected error: " + error.message + "\n");
      throw error;
    }
  }
}

// Test 1: Valid registration
validateForm({
  username: "amara99",
  email:    "amara@school.com",
  age:      17,
  password: "securePass1"
});

// Test 2: Username too short
validateForm({
  username: "am",
  email:    "amara@school.com",
  age:      17,
  password: "securePass1"
});

// Test 3: Invalid email
validateForm({
  username: "kofi2024",
  email:    "kofi-school",
  age:      20,
  password: "mypassword"
});

// Test 4: Age out of range
validateForm({
  username: "ama2024",
  email:    "ama@school.com",
  age:      12,
  password: "mypassword"
});
```

**Expected Output:**
```
Validating form for: amara99
✅ All fields valid. Registration successful.

Validating form for: am
❌ Validation error on 'username': Username must be 3–20 characters

Validating form for: kofi2024
❌ Validation error on 'email': Email must be a valid format (contains @ and .)

Validating form for: ama2024
❌ Range error: Age must be between 16 and 100
```

### Self-Check Questions

1. Why does `validateForm` stop at the *first* error instead of collecting all errors? How would you modify it to collect *all* validation errors before reporting?
2. `validateAge` can receive a string and convert it — why is this useful in a real form?
3. What would happen if we caught `Error` instead of `ValidationError` and `RangeError` separately? Would we lose any information?
4. Why do we `throw error` at the end of the `else` branch in `validateForm`?

### What-If Challenge

> Modify `validateForm` to collect **all** errors instead of stopping at the first one. Return an array of error messages. (Hint: remove the `try/catch` from inside the function and wrap each validator call in its own `try/catch`.)

---

## Exercise 2 — Safe JSON Parser

### Warm-Up Mini-Example

```javascript
function safeJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

console.log(safeJSON('{"name":"Amara"}')); // { name: 'Amara' }
console.log(safeJSON("not valid json"));   // null
```

---

### Objective

Build a robust data importer that reads JSON strings from multiple sources, handles malformed data gracefully, and reports what was successfully imported vs. what failed.

### Scenario

You work at a school that receives student data exports from three different systems. Each system produces JSON, but some files are occasionally malformed. Your importer must process all files and report results — without crashing on bad data.

```javascript
"use strict";

let dataFiles = [
  { source: "SystemA", data: '{"name":"Amara Osei","age":17,"gpa":3.85}' },
  { source: "SystemB", data: '{"name":"Kofi Mensah","age":20,"gpa":3.1}' },
  { source: "SystemC", data: '{name:"Ama Darko",age:18}' },          // invalid JSON
  { source: "SystemD", data: '{"name":"Kweku","age":"twenty"}' },    // age is a string
  { source: "SystemE", data: "" }                                    // empty
];

let imported = [];
let failed   = [];

dataFiles.forEach(function(file) {
  try {
    if (!file.data || file.data.trim() === "") {
      throw new Error("File is empty");
    }

    let parsed = JSON.parse(file.data);   // SyntaxError if malformed

    // Validate age field
    let age = Number(parsed.age);
    if (isNaN(age)) {
      throw new TypeError("Age is not a valid number: " + parsed.age);
    }

    imported.push({ source: file.source, student: parsed });
    console.log(`✅ ${file.source}: Imported ${parsed.name}`);

  } catch (error) {
    failed.push({ source: file.source, error: error.name + ": " + error.message });
    console.log(`❌ ${file.source}: Failed — ${error.name}: ${error.message}`);
  }
});

console.log("\n--- Import Summary ---");
console.log("Successfully imported: " + imported.length);
console.log("Failed: " + failed.length);
failed.forEach(f => console.log("  " + f.source + ": " + f.error));
```

**Expected Output:**
```
✅ SystemA: Imported Amara Osei
✅ SystemB: Imported Kofi Mensah
❌ SystemC: Failed — SyntaxError: Unexpected token n in JSON at position 1
❌ SystemD: Failed — TypeError: Age is not a valid number: twenty
❌ SystemE: Failed — Error: File is empty

--- Import Summary ---
Successfully imported: 2
Failed: 3
  SystemC: SyntaxError: Unexpected token n in JSON at position 1
  SystemD: TypeError: Age is not a valid number: twenty
  SystemE: Error: File is empty
```

### Self-Check Questions

1. Why is it important to keep the `forEach` loop running even after a `catch`? What would happen if we used a regular `for` loop and did not catch the error?
2. The `SyntaxError` from `JSON.parse()` and the `TypeError` we throw manually are both caught by the same `catch` block. How could you handle them differently?
3. `SystemD` has `age: "twenty"` — what is `Number("twenty")`? Why does `isNaN` catch this?

---

## Exercise 3 — Stack Trace Reader

### Objective

Build a function call chain, deliberately introduce an error deep in the chain, catch it at the top level, and read and interpret the stack trace.

### Scenario

Understanding stack traces is a critical skill for debugging in a real job. This exercise builds that skill deliberately.

```javascript
"use strict";

function calculateFinalGrade(scores) {
  return computeAverage(scores);
}

function computeAverage(scores) {
  return sumScores(scores) / scores.length;
}

function sumScores(scores) {
  if (!Array.isArray(scores)) {
    throw new TypeError("scores must be an array. Got: " + typeof scores);
  }
  return scores.reduce((total, score) => {
    if (typeof score !== "number") {
      throw new TypeError("Each score must be a number. Got: " + typeof score + " (" + score + ")");
    }
    return total + score;
  }, 0);
}

// Test 1: Valid
try {
  let grade = calculateFinalGrade([85, 90, 78]);
  console.log("Final grade: " + grade.toFixed(1));
} catch (e) {
  console.log(e.name + ": " + e.message);
}

// Test 2: Non-array input
try {
  calculateFinalGrade("85, 90, 78");
} catch (e) {
  console.log("\n" + e.name + ": " + e.message);
  console.log("\nStack trace:");
  console.log(e.stack);
}

// Test 3: Array with non-number
try {
  calculateFinalGrade([85, "ninety", 78]);
} catch (e) {
  console.log("\n" + e.name + ": " + e.message);
}
```

**Expected Output:**
```
Final grade: 84.3

TypeError: scores must be an array. Got: string

Stack trace:
TypeError: scores must be an array. Got: string
    at sumScores (<anonymous>:9:11)
    at computeAverage (<anonymous>:5:10)
    at calculateFinalGrade (<anonymous>:1:10)
    at <anonymous>:22:3

TypeError: Each score must be a number. Got: string (ninety)
```

### Self-Check Questions

1. Reading the stack trace for Test 2 from bottom to top — what was the order of function calls?
2. The error was thrown in `sumScores` but caught in the `try` block that called `calculateFinalGrade`. How did the error "travel" up through the call stack?
3. Why is knowing which function threw the error (from the stack trace) more useful than just knowing the error message?

---

# Section 3 — Project Simulation

## Mini-Project: Bank Transaction Processor

### Project Overview

You will build a **Bank Transaction Processor** — a JavaScript program that:

1. Manages a simple bank account with a balance
2. Processes a batch of transactions (deposits and withdrawals)
3. Uses custom errors, strict mode, try/catch/finally, and meaningful error reporting
4. Produces a full transaction log with success/failure status for each transaction

### Real-World Context

Banking systems must never crash silently. Every failed transaction must be logged with a reason. A programmer's error (like passing the wrong type) must be distinguishable from a business-logic error (like insufficient funds). This project simulates that discipline.

---

### Stage 1 — Setup: Account and Custom Errors

**Illustrative Example First:**

```javascript
// Understand the structure before building
let account = { id: "ACC001", owner: "Amara", balance: 500 };

// A transaction attempt
function withdraw(account, amount) {
  if (amount > account.balance) {
    throw new Error("Insufficient funds");
  }
  account.balance -= amount;
}

try {
  withdraw(account, 600);
} catch (e) {
  console.log("Transaction failed: " + e.message);
  // Transaction failed: Insufficient funds
}
```

**Stage 1 Code:**

```javascript
"use strict";

// Custom error types
class InsufficientFundsError extends Error {
  constructor(requested, available) {
    super(`Cannot withdraw ${requested}. Available balance: ${available}`);
    this.name    = "InsufficientFundsError";
    this.requested = requested;
    this.available = available;
  }
}

class InvalidTransactionError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidTransactionError";
  }
}

// Account object
let account = {
  id:      "ACC-2024-001",
  owner:   "Amara Osei",
  balance: 1000.00,
  log:     []
};

console.log("Account created for: " + account.owner);
console.log("Opening balance: $" + account.balance.toFixed(2));
```

**Expected Stage 1 Output:**
```
Account created for: Amara Osei
Opening balance: $1000.00
```

---

### Stage 2 — Adding Features: deposit, withdraw, and processTransactions

**Illustrative Example First:**

```javascript
// Understand finally before the full stage
function attemptWithdrawal(amount) {
  console.log("Attempting withdrawal of $" + amount);
  try {
    if (amount > 500) throw new Error("Too large");
    console.log("Withdrawal successful");
  } catch (e) {
    console.log("Failed: " + e.message);
  } finally {
    console.log("Transaction attempt recorded.\n");
  }
}

attemptWithdrawal(200);  // Withdrawal successful → Transaction attempt recorded.
attemptWithdrawal(900);  // Failed: Too large → Transaction attempt recorded.
```

**Stage 2 Code:**

```javascript
function deposit(account, amount) {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new InvalidTransactionError("Deposit amount must be a valid number. Got: " + amount);
  }
  if (amount <= 0) {
    throw new InvalidTransactionError("Deposit amount must be positive. Got: " + amount);
  }
  account.balance += amount;
  return amount;
}

function withdraw(account, amount) {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new InvalidTransactionError("Withdrawal amount must be a valid number. Got: " + amount);
  }
  if (amount <= 0) {
    throw new InvalidTransactionError("Withdrawal amount must be positive. Got: " + amount);
  }
  if (amount > account.balance) {
    throw new InsufficientFundsError(amount, account.balance);
  }
  account.balance -= amount;
  return amount;
}

function processTransactions(account, transactions) {
  console.log("\n--- Processing Transactions ---\n");

  transactions.forEach(function(tx, index) {
    let txNum   = String(index + 1).padStart(2, "0");
    let success = false;
    let note    = "";

    try {
      if (tx.type === "deposit") {
        let amount = deposit(account, tx.amount);
        note    = `Deposited $${amount.toFixed(2)}`;
        success = true;
      } else if (tx.type === "withdrawal") {
        let amount = withdraw(account, tx.amount);
        note    = `Withdrew $${amount.toFixed(2)}`;
        success = true;
      } else {
        throw new InvalidTransactionError("Unknown transaction type: " + tx.type);
      }
    } catch (error) {
      note = error.name + ": " + error.message;
    } finally {
      // finally always runs — we record the transaction regardless
      account.log.push({
        txNum:   txNum,
        type:    tx.type,
        amount:  tx.amount,
        success: success,
        balance: account.balance,
        note:    note
      });

      let status = success ? "✅" : "❌";
      console.log(`[TX-${txNum}] ${status} ${tx.type.toUpperCase()} $${String(tx.amount).padStart(8)} | Balance: $${account.balance.toFixed(2)} | ${note}`);
    }
  });
}

// Transactions to process
let transactions = [
  { type: "deposit",    amount: 500 },
  { type: "withdrawal", amount: 200 },
  { type: "withdrawal", amount: 1500 },  // insufficient funds
  { type: "deposit",    amount: -100 },  // negative deposit
  { type: "deposit",    amount: "two hundred" },  // wrong type
  { type: "transfer",   amount: 100 },   // unknown type
  { type: "withdrawal", amount: 300 },
  { type: "deposit",    amount: 750 }
];

processTransactions(account, transactions);
```

**Expected Stage 2 Output:**
```
--- Processing Transactions ---

[TX-01] ✅ DEPOSIT    $     500 | Balance: $1500.00 | Deposited $500.00
[TX-02] ✅ WITHDRAWAL $     200 | Balance: $1300.00 | Withdrew $200.00
[TX-03] ❌ WITHDRAWAL $    1500 | Balance: $1300.00 | InsufficientFundsError: Cannot withdraw 1500. Available balance: 1300
[TX-04] ❌ DEPOSIT    $    -100 | Balance: $1300.00 | InvalidTransactionError: Deposit amount must be positive. Got: -100
[TX-05] ❌ DEPOSIT    $ two hundred | Balance: $1300.00 | InvalidTransactionError: Deposit amount must be a valid number. Got: two hundred
[TX-06] ❌ TRANSFER   $     100 | Balance: $1300.00 | InvalidTransactionError: Unknown transaction type: transfer
[TX-07] ✅ WITHDRAWAL $     300 | Balance: $1000.00 | Withdrew $300.00
[TX-08] ✅ DEPOSIT    $     750 | Balance: $1750.00 | Deposited $750.00
```

---

### Stage 3 — Displaying the Full Account Statement

```javascript
function printStatement(account) {
  let divider  = "=".repeat(65);
  let thinLine = "-".repeat(65);

  console.log("\n" + divider);
  console.log("  ACCOUNT STATEMENT");
  console.log("  Account: " + account.id);
  console.log("  Owner:   " + account.owner);
  console.log(divider);
  console.log("  TX  | TYPE       | AMOUNT     | STATUS | BALANCE");
  console.log(thinLine);

  account.log.forEach(function(entry) {
    let type    = entry.type.padEnd(10);
    let amount  = ("$" + String(entry.amount)).padEnd(10);
    let status  = entry.success ? "✅ OK  " : "❌ FAIL";
    let balance = "$" + entry.balance.toFixed(2);
    console.log(`  ${entry.txNum}  | ${type} | ${amount} | ${status} | ${balance}`);
  });

  console.log(divider);

  let successful = account.log.filter(e => e.success);
  let failed     = account.log.filter(e => !e.success);
  let totalIn    = successful
    .filter(e => e.type === "deposit")
    .reduce((sum, e) => sum + e.amount, 0);
  let totalOut   = successful
    .filter(e => e.type === "withdrawal")
    .reduce((sum, e) => sum + e.amount, 0);

  console.log("  Total Transactions: " + account.log.length);
  console.log("  Successful:         " + successful.length);
  console.log("  Failed:             " + failed.length);
  console.log("  Total Deposited:    $" + totalIn.toFixed(2));
  console.log("  Total Withdrawn:    $" + totalOut.toFixed(2));
  console.log("  Closing Balance:    $" + account.balance.toFixed(2));
  console.log(divider);
}

printStatement(account);
```

**Expected Stage 3 Output:**
```
=================================================================
  ACCOUNT STATEMENT
  Account: ACC-2024-001
  Owner:   Amara Osei
=================================================================
  TX  | TYPE       | AMOUNT     | STATUS | BALANCE
-----------------------------------------------------------------
  01  | deposit    | $500       | ✅ OK   | $1500.00
  02  | withdrawal | $200       | ✅ OK   | $1300.00
  03  | withdrawal | $1500      | ❌ FAIL | $1300.00
  04  | deposit    | $-100      | ❌ FAIL | $1300.00
  05  | deposit    | $two hundred | ❌ FAIL | $1300.00
  06  | transfer   | $100       | ❌ FAIL | $1300.00
  07  | withdrawal | $300       | ✅ OK   | $1000.00
  08  | deposit    | $750       | ✅ OK   | $1750.00
=================================================================
  Total Transactions: 8
  Successful:         4
  Failed:             4
  Total Deposited:    $1250.00
  Total Withdrawn:    $500.00
  Closing Balance:    $1750.00
=================================================================
```

---

### Reflection Questions

1. `finally` ran on **every** transaction — successful or failed. Why is this important for the transaction log? What would be missing if we recorded the log entry only in the `try` block?

2. We used two custom error types: `InsufficientFundsError` and `InvalidTransactionError`. What is the benefit of having separate types instead of just `throw new Error("...")`?

3. A programmer who calls `deposit(account, "two hundred")` made a coding mistake. A user who tries to withdraw $1500 from an account with $1300 made a *business logic* error. Should these be handled the same way? How does having different error types help you treat them differently?

4. We used `"use strict"` at the top. Name one specific silent error that could have occurred in this project *without* strict mode, and how it would have affected the results.

5. In a real bank system, failed transactions would need to be logged to a database for compliance and auditing — not just printed to the console. How would you modify `processTransactions` to store a separate `failedLog` array for compliance review?

### Optional Advanced Features

- Add a **daily withdrawal limit** of $1000. If a withdrawal would exceed the day's total, throw a custom `DailyLimitError`.
- Add **transaction rollback**: if a batch of transactions is meant to succeed or fail together (like a transfer between accounts), catch a failure and undo any earlier successful transactions in the batch.
- Add **error frequency reporting**: at the end of `printStatement`, show how many of each error type occurred (e.g., `InsufficientFundsError: 1`, `InvalidTransactionError: 3`).

---

# Completion Checklist

| Item | Status |
|---|---|
| Silent errors explained with real examples | ✅ |
| Each category of silent error demonstrated | ✅ |
| Strict mode coverage — what it prevents and how to enable | ✅ |
| `try`, `catch`, `finally` individually explained | ✅ |
| `throw` statement explained with custom messages | ✅ |
| Re-throwing errors explained | ✅ |
| Error object properties: `name`, `message`, `stack` | ✅ |
| Stack trace reading explained step-by-step | ✅ |
| All six built-in error types with examples | ✅ |
| Custom error classes with `extends Error` | ✅ |
| `instanceof` for error type detection | ✅ |
| Error handling patterns and best practices | ✅ |
| Common beginner mistakes documented | ✅ |
| Three applied exercises with real-world scenarios | ✅ |
| Full mini-project (bank processor) across three stages | ✅ |
| Reflection questions answered | ✅ |

---

**Summary:** JavaScript errors split into two families — silent failures (swallowed by default, exposed by `"use strict"`) and thrown exceptions (caught with `try/catch/finally`). Every thrown error is an object with `name`, `message`, and `stack`. The six built-in types (`RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, `URIError`, `EvalError`) cover technical failures; custom classes that `extend Error` cover business-logic failures. Robust programs always use strict mode, validate early with `throw`, handle errors selectively with `instanceof`, never swallow errors silently, and use `finally` to guarantee cleanup regardless of outcome.
