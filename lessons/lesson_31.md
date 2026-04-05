---
render_with_liquid: false
title: "JavaScript Functions: Function Definitions · Advanced Patterns · Callbacks · `this` · call · apply · bind · IIFE · Closures · Reference"
nav_order: 31
---

> **How to use this tutorial**
> This tutorial covers every function concept in JavaScript from the ground up. Each chapter builds on the previous. Work through in order — concepts from Chapter 1 are used in Chapter 9.
>
> - **Phase 1 – Comprehension:** What it is, how every line works, why it matters
> - **Phase 2 – Practice:** Real-world exercises with hints and self-checks
> - **Phase 3 – Creation:** A full project bringing all concepts together

---

# TABLE OF CONTENTS
1. [Chapter 1 — Function Definitions](#chapter-1--function-definitions)
2. [Chapter 2 — Advanced Function Patterns](#chapter-2--advanced-function-patterns)
3. [Chapter 3 — Callbacks](#chapter-3--callbacks)
4. [Chapter 4 — The `this` Keyword](#chapter-4--the-this-keyword)
5. [Chapter 5 — Function.call()](#chapter-5--functioncall)
6. [Chapter 6 — Function.apply()](#chapter-6--functionapply)
7. [Chapter 7 — Function.bind()](#chapter-7--functionbind)
8. [Chapter 8 — IIFE — Immediately Invoked Function Expressions](#chapter-8--iife--immediately-invoked-function-expressions)
9. [Chapter 9 — Closures](#chapter-9--closures)
10. [Chapter 10 — Function Reference (Built-In Methods)](#chapter-10--function-reference-built-in-methods)
11. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
12. [Phase 3 — Project Simulation](#phase-3--project-simulation)
13. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — FUNCTION DEFINITIONS

## What Is a Function?

A **function** is a named, reusable block of code that performs a specific task. Instead of writing the same instructions over and over, you write them once inside a function and call the function whenever you need it.

**Real-world analogy:** A function is like a recipe card. The recipe is written once. You can follow it as many times as you want, using different ingredients (arguments) each time, and it always produces the same kind of result.

Functions solve three fundamental problems in programming:

| Problem | How Functions Help |
|---|---|
| **Repetition** | Write once, call many times |
| **Organisation** | Group related code under a meaningful name |
| **Abstraction** | Use complex logic without needing to understand the internals every time |

---

## 1.1 — Function Declaration (Named Function Statement)

This is the most traditional way to define a function.

```js
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Tunde"));   // Output: Hello, Tunde!
console.log(greet("Sara"));    // Output: Hello, Sara!
```

**Anatomy of a function declaration:**

```
function   greet        (name)          {
│          │             │               │
keyword    name      parameter(s)    body begins
```

| Part | Description |
|---|---|
| `function` | Keyword that tells JavaScript a function is being defined |
| `greet` | The name of the function — used to call it later |
| `(name)` | **Parameters** — placeholder variables for values passed in |
| `{ ... }` | The **body** — the instructions that run when the function is called |
| `return` | Sends a value back to whoever called the function |

> 💡 **Parameters vs Arguments — what's the difference?**
> - **Parameters** are the placeholder names listed in the function definition: `function greet(name)` — `name` is a parameter.
> - **Arguments** are the actual values passed in when you call the function: `greet("Tunde")` — `"Tunde"` is an argument.
> Think of a parameter as a blank form field, and an argument as the value you write in it.

**Key feature — hoisting:**

Function declarations are **hoisted**, which means JavaScript moves them to the top of the current scope before running any code. You can call a declared function before it appears in the file:

```js
console.log(add(3, 4));   // Output: 7 ✅ — works even though the function is below

function add(a, b) {
  return a + b;
}
```

---

## 1.2 — Function Expression

A **function expression** defines a function and assigns it to a variable.

```js
const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(4, 5));   // Output: 20
```

The function on the right side of `=` has no name — it is an **anonymous function**. The variable `multiply` holds a reference to it.

> ⚠️ **Function expressions are NOT hoisted:**

```js
console.log(multiply(4, 5));   // ❌ ReferenceError: Cannot access 'multiply' before initialization

const multiply = function(a, b) {
  return a * b;
};
```

The variable `multiply` exists, but its value (the function) hasn't been assigned yet at the point of the call.

**Named function expression:**

You can give the function inside an expression a name, which is only visible inside the function itself (useful for recursion):

```js
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);   // 'fact' is accessible here
};

console.log(factorial(5));   // Output: 120
// console.log(fact(5));     // ❌ ReferenceError — 'fact' not visible outside
```

---

## 1.3 — Arrow Functions (ES6)

**Arrow functions** are a shorter syntax introduced in ES2015 (ES6). They are especially popular in modern JavaScript.

**Basic syntax:**

```js
const square = (n) => {
  return n * n;
};

console.log(square(6));   // Output: 36
```

**Shorthand rules:**

| Situation | Shorthand |
|---|---|
| Single parameter | Parentheses optional: `n => n * n` |
| Single-line body with a return | Curly braces and `return` optional (implicit return) |
| No parameters | Empty parentheses required: `() => "Hello"` |

```js
// Full syntax:
const square = (n) => { return n * n; };

// Concise syntax (equivalent):
const square = n => n * n;

console.log(square(7));   // Output: 49
```

**Multi-parameter arrow function:**

```js
const add = (a, b) => a + b;
console.log(add(10, 3));   // Output: 13
```

> ⚠️ **Critical difference: Arrow functions and `this`**
> Arrow functions do NOT have their own `this` binding — they inherit `this` from the surrounding context. This is explored in depth in Chapter 4. For now, just know that arrow functions and regular functions behave differently when used inside objects or event handlers.

---

## 1.4 — Default Parameter Values (ES6)

If a caller doesn't pass a value for a parameter, you can provide a fallback:

```js
function greet(name = "Guest") {
  return "Welcome, " + name + "!";
}

console.log(greet("Amara"));   // Output: Welcome, Amara!
console.log(greet());          // Output: Welcome, Guest!
```

**How defaults work:**

Default values are used when the argument is `undefined` — either because it was not passed at all, or was explicitly passed as `undefined`. Passing `null` does NOT trigger the default:

```js
function show(value = "default") {
  console.log(value);
}

show();              // Output: default   ← argument is missing (undefined)
show(undefined);     // Output: default   ← explicitly undefined
show(null);          // Output: null      ← null is a real value, not undefined
show("hello");       // Output: hello
```

---

## 1.5 — Rest Parameters (ES6)

**Rest parameters** allow a function to accept any number of arguments, collected into an array.

```js
function sum(...numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

console.log(sum(1, 2));           // Output: 3
console.log(sum(1, 2, 3, 4, 5)); // Output: 15
console.log(sum());               // Output: 0
```

The `...` before `numbers` says "collect all remaining arguments into an array named `numbers`."

> ⚠️ **Rules for rest parameters:**
> - The rest parameter must be the **last** parameter: `function f(a, b, ...rest)` ✅
> - There can only be **one** rest parameter per function
> - `function f(...rest, a)` ❌ SyntaxError

**Combining regular and rest parameters:**

```js
function introduce(greeting, ...names) {
  names.forEach(name => console.log(greeting + ", " + name + "!"));
}

introduce("Hello", "Alice", "Bob", "Charlie");
// Output:
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!
```

---

## 1.6 — The `arguments` Object (Classic Functions Only)

Before rest parameters existed, all regular functions had access to an `arguments` object — an array-like object containing all passed arguments.

```js
function logAll() {
  console.log(arguments.length);   // How many arguments were passed
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

logAll("a", "b", "c");
// Output:
// 3
// a
// b
// c
```

> ⚠️ **`arguments` is NOT available in arrow functions.** Arrow functions have no `arguments` object — use rest parameters instead.

| Feature | `arguments` object | Rest parameters (`...args`) |
|---|---|---|
| Type | Array-like object | Real array |
| Arrow function support | ❌ No | ✅ Yes |
| Array methods (`.map`, `.filter`) | ❌ Not directly | ✅ Yes |
| Modern best practice | Avoid | Preferred |

---

## 1.7 — Functions Are First-Class Citizens

In JavaScript, functions are **first-class citizens** — they are treated like any other value. This means you can:

```js
// 1. Assign a function to a variable
const sayHi = function() { return "Hi!"; };

// 2. Pass a function as an argument to another function
function callIt(fn) {
  return fn();
}
console.log(callIt(sayHi));   // Output: Hi!

// 3. Return a function from another function
function makeMultiplier(x) {
  return function(y) {
    return x * y;
  };
}
const triple = makeMultiplier(3);
console.log(triple(5));   // Output: 15
console.log(triple(10));  // Output: 30

// 4. Store functions in arrays and objects
const operations = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
];
console.log(operations[0](10, 4));   // Output: 14
console.log(operations[2](10, 4));   // Output: 40
```

This is the foundation of **functional programming** and makes concepts like callbacks and closures possible.

---

## 1.8 — Return Values and `undefined`

Every function returns a value. If you don't write a `return` statement, the function returns `undefined` automatically.

```js
function noReturn() {
  let x = 5;   // Does something but returns nothing
}

const result = noReturn();
console.log(result);   // Output: undefined
```

`return` also **stops the function immediately**:

```js
function checkAge(age) {
  if (age < 0) {
    return "Invalid age";   // Exits here — nothing below runs
  }
  if (age < 18) {
    return "Minor";
  }
  return "Adult";
}

console.log(checkAge(-1));   // Output: Invalid age
console.log(checkAge(15));   // Output: Minor
console.log(checkAge(25));   // Output: Adult
```

> 🤔 **Thinking question:** What is the return value of `console.log("Hello")`? Try `const x = console.log("Hello"); console.log(x);` — what do you get?

---

---

# CHAPTER 2 — ADVANCED FUNCTION PATTERNS

---

## What Are Advanced Function Patterns?

Once you understand the basics of defining and calling functions, JavaScript opens up more sophisticated techniques. These patterns appear constantly in professional code, frameworks like React, and libraries like Lodash.

---

## 2.1 — Higher-Order Functions

A **higher-order function** is a function that either:
- Takes one or more functions as arguments, OR
- Returns a function as its result (or both)

You already know `addEventListener` — it's a higher-order function. It accepts a function (the callback) as its second argument.

**Micro-demo — accepting a function:**

```js
function applyTwice(fn, value) {
  return fn(fn(value));   // Call fn on value, then call fn on the result
}

const double = n => n * 2;

console.log(applyTwice(double, 3));   // Output: 12  (3×2=6, 6×2=12)
console.log(applyTwice(double, 5));   // Output: 20  (5×2=10, 10×2=20)
```

**Micro-demo — returning a function (function factory):**

```js
function makeGreeter(greeting) {
  return function(name) {
    return greeting + ", " + name + "!";
  };
}

const sayGoodMorning = makeGreeter("Good morning");
const sayGoodNight   = makeGreeter("Good night");

console.log(sayGoodMorning("Tunde"));   // Output: Good morning, Tunde!
console.log(sayGoodNight("Sara"));      // Output: Good night, Sara!
```

`makeGreeter` is a **function factory** — a function that produces customised functions.

---

## 2.2 — Pure Functions

A **pure function** is a function that:
1. Given the same input, always returns the same output
2. Has no **side effects** (does not change anything outside itself)

```js
// Pure function — predictable, no external impact
function add(a, b) {
  return a + b;
}

// Impure function — depends on external variable; changes it
let total = 0;
function addToTotal(n) {
  total += n;   // Side effect: changes a variable outside the function
  return total;
}

console.log(add(2, 3));   // Always: 5
console.log(add(2, 3));   // Always: 5

addToTotal(5);             // total is now 5
addToTotal(5);             // total is now 10 — same call, different result!
```

> 💡 **Why care about pure functions?**
> - They are **easier to test** (no hidden state)
> - They are **predictable** (same input = same output always)
> - They are **safe to reuse** without worrying about side effects
> Professional JavaScript uses pure functions wherever possible.

---

## 2.3 — Recursive Functions

A **recursive function** is one that calls itself. It must have a **base case** that stops the recursion; otherwise, it runs forever and causes a stack overflow.

```js
function countdown(n) {
  if (n <= 0) {           // Base case: stop here
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);       // Recursive call: same function with a smaller problem
}

countdown(5);
// Output:
// 5
// 4
// 3
// 2
// 1
// Done!
```

**Classic example — factorial:**

```js
function factorial(n) {
  if (n <= 1) return 1;         // Base case
  return n * factorial(n - 1);  // Recursive case
}

console.log(factorial(5));   // Output: 120  (5×4×3×2×1)
```

**Recursive breakdown for `factorial(4)`:**

```
factorial(4)
  → 4 * factorial(3)
         → 3 * factorial(2)
                → 2 * factorial(1)
                       → 1   (base case)
                → 2 * 1 = 2
         → 3 * 2 = 6
  → 4 * 6 = 24
```

---

## 2.4 — Function Composition

**Function composition** means combining two or more functions so the output of one becomes the input of the next — like a pipeline.

```js
const double    = n => n * 2;
const addTen    = n => n + 10;
const stringify = n => "Result: " + n;

// Manual composition:
const result = stringify(addTen(double(5)));
console.log(result);   // Output: Result: 20   (5→10→20→"Result: 20")

// Reusable compose function:
function compose(...fns) {
  return function(value) {
    return fns.reduceRight((acc, fn) => fn(acc), value);
    // Applies functions right to left: stringify(addTen(double(value)))
  };
}

const transform = compose(stringify, addTen, double);
console.log(transform(5));    // Output: Result: 20
console.log(transform(10));   // Output: Result: 30
```

> 💡 **Real-world analogy:** Function composition is like an assembly line. Each station (function) does one job and passes the result to the next. This produces clean, modular code where each function has a single responsibility.

---

## 2.5 — Memoisation (Caching Results)

**Memoisation** is an optimisation technique where a function caches its results so repeated calls with the same arguments return instantly from the cache instead of recomputing.

```js
function memoize(fn) {
  const cache = {};

  return function(n) {
    if (cache[n] !== undefined) {
      console.log("From cache: " + n);
      return cache[n];              // Return cached result
    }
    const result = fn(n);
    cache[n] = result;              // Store in cache
    return result;
  };
}

function slowSquare(n) {
  // Simulate slow computation
  return n * n;
}

const fastSquare = memoize(slowSquare);

console.log(fastSquare(5));   // Computed: 25
console.log(fastSquare(5));   // From cache: 25 (instant)
console.log(fastSquare(6));   // Computed: 36
console.log(fastSquare(6));   // From cache: 36 (instant)
```

> 🤔 **Thinking question:** In the `memoize` function, why does `cache` persist between calls even though `memoize` has finished running? (Hint: this is a closure — Chapter 9 explains exactly why.)

---

---

# CHAPTER 3 — CALLBACKS

---

## What Is a Callback Function?

A **callback** is a function passed as an argument to another function, to be called (executed) later — either immediately or after an asynchronous operation completes.

**Real-world analogy:** You call a restaurant to order food. Instead of waiting silently on the phone until the food is ready (blocking), you give the restaurant your phone number (the callback). They call you back when the food is ready. You can do other things in the meantime.

```js
function processOrder(item, callback) {
  console.log("Processing order for: " + item);
  callback(item);   // Call the function that was passed in
}

function deliver(item) {
  console.log(item + " has been delivered!");
}

processOrder("Pizza", deliver);
// Output:
// Processing order for: Pizza
// Pizza has been delivered!
```

---

## 3.1 — Synchronous Callbacks

A **synchronous callback** is called immediately — the outer function doesn't move to the next line until the callback has finished.

```js
function greetUser(name, formatter) {
  const formatted = formatter(name);   // Call the callback right now
  console.log("Hello, " + formatted);
}

greetUser("tunde", name => name.toUpperCase());
// Output: Hello, TUNDE

greetUser("sara", name => name[0].toUpperCase() + name.slice(1));
// Output: Hello, Sara
```

Built-in array methods like `.forEach()`, `.map()`, `.filter()`, and `.sort()` all use synchronous callbacks:

```js
const numbers = [1, 2, 3, 4, 5];

// forEach: calls the callback for each element
numbers.forEach(function(n) {
  console.log(n * 10);
});
// Output: 10, 20, 30, 40, 50

// map: calls the callback for each element, collects results into a new array
const doubled = numbers.map(n => n * 2);
console.log(doubled);   // Output: [2, 4, 6, 8, 10]

// filter: keeps elements for which the callback returns true
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);   // Output: [2, 4]
```

---

## 3.2 — Asynchronous Callbacks

An **asynchronous callback** is called later — after some time has passed or after an operation completes. The rest of the code continues running in the meantime.

```js
console.log("Start");

setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// Output:
// Start
// End
// (2 seconds later) This runs after 2 seconds
```

`setTimeout` is a built-in function that calls a callback after a delay. Notice that "End" prints before the callback — JavaScript did not wait.

**`setInterval` — repeated callbacks:**

```js
let count = 0;
const interval = setInterval(function() {
  count++;
  console.log("Tick " + count);
  if (count === 3) {
    clearInterval(interval);   // Stop after 3 ticks
    console.log("Done");
  }
}, 1000);

// Output (one per second):
// Tick 1
// Tick 2
// Tick 3
// Done
```

---

## 3.3 — Callback Hell and How to Avoid It

When multiple asynchronous operations depend on each other, callbacks can nest deeply — this is called **callback hell** or the **pyramid of doom**:

```js
// ❌ Callback hell — hard to read and maintain
getUser(userId, function(user) {
  getOrders(user.id, function(orders) {
    getProductDetails(orders[0].productId, function(product) {
      getReviews(product.id, function(reviews) {
        console.log(reviews);
        // Nested 4 levels deep — and it can get worse
      });
    });
  });
});
```

**Solutions:**

1. **Named functions** — pull callbacks out of the nesting:

```js
function handleReviews(reviews) {
  console.log(reviews);
}
function handleProduct(product) {
  getReviews(product.id, handleReviews);
}
function handleOrders(orders) {
  getProductDetails(orders[0].productId, handleProduct);
}
function handleUser(user) {
  getOrders(user.id, handleOrders);
}

getUser(userId, handleUser);
// Same logic, but flat and readable
```

2. **Promises** (modern approach — each step returns a promise instead of accepting a callback)
3. **async/await** (the cleanest modern syntax — built on top of promises)

> 💡 **Real-world relevance:** Callback hell is why Promises and async/await were invented. Every modern JavaScript developer encounters this pattern. Understanding the problem is essential for understanding why the solutions exist.

---

## 3.4 — Error-First Callbacks (Node.js Convention)

In Node.js and many libraries, callbacks follow a convention: the first argument is always an error (or `null` if no error occurred), and subsequent arguments are the results.

```js
function readFile(filename, callback) {
  // Simulate reading a file
  const error = filename === "missing.txt" ? new Error("File not found") : null;
  const data  = error ? null : "File contents here";
  callback(error, data);
}

readFile("hello.txt", function(err, data) {
  if (err) {
    console.log("Error:", err.message);
    return;   // Stop processing
  }
  console.log("Data:", data);
});
// Output: Data: File contents here

readFile("missing.txt", function(err, data) {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});
// Output: Error: File not found
```

Always check for errors first before using the data — this prevents crashes when operations fail.

---

---

# CHAPTER 4 — THE `this` KEYWORD

---

## What Is `this`?

`this` is a special keyword in JavaScript that refers to the **object that is currently executing the code**. Its value is not fixed — it changes depending on how and where the function is called.

This makes `this` one of the most confusing concepts for beginners, but also one of the most powerful tools in JavaScript.

**Core rule:** `this` is not determined by where a function is written. It is determined by **how** the function is called.

---

## 4.1 — `this` in a Regular Function (Non-Strict Mode)

In a regular function called without any object context, `this` refers to the **global object**:

- In a browser: `this` is the `window` object
- In Node.js: `this` is the `global` object

```js
function showThis() {
  console.log(this);
}

showThis();   // Output: Window {...}  (in a browser)
```

---

## 4.2 — `this` in an Object Method

When a function is called as a method of an object, `this` refers to **that object**:

```js
const person = {
  name: "Tunde",
  greet: function() {
    console.log("Hello, my name is " + this.name);
  }
};

person.greet();   // Output: Hello, my name is Tunde
```

`this.name` inside `greet` refers to `person.name` because `greet` is being called as a method of `person`.

**Micro-demo — `this` changes with how you call the function:**

```js
const person = {
  name: "Tunde",
  greet: function() {
    console.log(this.name);
  }
};

person.greet();          // Output: Tunde   ← called as a method
const fn = person.greet;
fn();                    // Output: undefined  ← called as a plain function
```

In the second call, the function is extracted from the object and called on its own. It's no longer a method call, so `this` is no longer `person`.

---

## 4.3 — `this` in a Constructor Function

When a function is used as a **constructor** (called with `new`), `this` refers to the newly created object:

```js
function Car(make, model) {
  this.make  = make;     // Attach 'make' to the new object
  this.model = model;    // Attach 'model' to the new object
  this.describe = function() {
    return this.make + " " + this.model;
  };
}

const myCar = new Car("Toyota", "Corolla");
console.log(myCar.describe());   // Output: Toyota Corolla
console.log(myCar.make);         // Output: Toyota
```

When `new Car("Toyota", "Corolla")` runs:
1. A blank object is created
2. `this` inside `Car` points to that new object
3. Properties are attached to it
4. The new object is returned automatically

---

## 4.4 — `this` in Event Listeners

In a DOM event listener using a regular function, `this` refers to the **element that fired the event**:

```js
const btn = document.getElementById("my-button");

btn.addEventListener("click", function() {
  console.log(this);           // Output: <button id="my-button">...</button>
  this.style.background = "red";  // Changes the clicked button's colour
});
```

This is very useful for writing one handler that can work on multiple elements.

---

## 4.5 — `this` in Arrow Functions

Arrow functions do **not** have their own `this`. They inherit `this` from the **enclosing lexical scope** — the `this` value from the context where the arrow function was defined.

```js
const team = {
  name: "Dev Team",
  members: ["Alice", "Bob", "Charlie"],

  listMembers: function() {
    // 'this' here is 'team' (regular function as a method)
    this.members.forEach(member => {
      // Arrow function inherits 'this' from listMembers → 'this' is still 'team'
      console.log(member + " is on " + this.name);
    });
  }
};

team.listMembers();
// Output:
// Alice is on Dev Team
// Bob is on Dev Team
// Charlie is on Dev Team
```

**What would go wrong with a regular function inside `forEach`:**

```js
listMembers: function() {
  this.members.forEach(function(member) {
    // Regular function — 'this' is now the global object, NOT 'team'
    console.log(member + " is on " + this.name);  // this.name is undefined!
  });
}
```

This was a very common bug before arrow functions. Arrow functions were specifically designed to fix this problem.

---

## 4.6 — `this` Summary Table

| Context | What `this` refers to |
|---|---|
| Global scope (non-strict) | `window` (browser) or `global` (Node.js) |
| Regular function, called directly | `window` / `global` (or `undefined` in strict mode) |
| Method of an object | The object before the dot |
| Constructor (called with `new`) | The newly created object |
| Event listener (regular function) | The element that fired the event |
| Arrow function | Inherits from the surrounding lexical context |
| `.call()` / `.apply()` | Explicitly set (see Chapter 5 & 6) |
| `.bind()` | Permanently set (see Chapter 7) |

---

---

# CHAPTER 5 — FUNCTION.CALL()

---

## What Is `.call()`?

`.call()` is a method available on every function. It lets you call the function while **explicitly setting what `this` should be** inside it.

```js
function.call(thisArg, arg1, arg2, ...)
```

| Part | Meaning |
|---|---|
| `thisArg` | The value to use as `this` inside the function |
| `arg1, arg2, ...` | Arguments to pass to the function, listed individually |

---

## 5.1 — Basic `.call()` Usage

```js
function introduce() {
  console.log("Hi, I'm " + this.name + " and I'm " + this.age);
}

const alice = { name: "Alice", age: 30 };
const bob   = { name: "Bob",   age: 25 };

introduce.call(alice);   // Output: Hi, I'm Alice and I'm 30
introduce.call(bob);     // Output: Hi, I'm Bob and I'm 25
```

The `introduce` function uses `this.name` and `this.age`. By using `.call()`, we tell it "when you say `this`, mean `alice`" (or `bob`).

**Passing arguments with `.call()`:**

```js
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Tunde" };

greet.call(person, "Hello", "!");    // Output: Hello, Tunde!
greet.call(person, "Good day", "."); // Output: Good day, Tunde.
```

Arguments come after the `thisArg`, separated by commas.

---

## 5.2 — Method Borrowing with `.call()`

One of the most useful applications of `.call()` is **method borrowing** — using a method from one object on a different object, without copying it.

```js
const dog = {
  name: "Rex",
  speak: function(sound) {
    console.log(this.name + " says " + sound);
  }
};

const cat = { name: "Whiskers" };

// Borrow dog's speak method for cat:
dog.speak.call(cat, "Meow");   // Output: Whiskers says Meow
```

`cat` doesn't have its own `speak` method, but by using `.call()` we can temporarily use `dog.speak` with `cat` as the context.

---

## 5.3 — Using `.call()` with `arguments`

A classic use of `.call()` is converting the `arguments` object to a real array:

```js
function toArray() {
  return Array.prototype.slice.call(arguments);
  // Borrow Array's slice method and call it on the arguments object
}

console.log(toArray(1, 2, 3));   // Output: [1, 2, 3]
```

> 💡 **Note:** In modern code, you'd just use `[...arguments]` or rest parameters `...args`. But you'll see this pattern in older codebases.

---

## 5.4 — Constructor Chaining with `.call()`

`.call()` is used to run parent constructor logic inside a child constructor:

```js
function Animal(name, sound) {
  this.name  = name;
  this.sound = sound;
}

function Dog(name) {
  Animal.call(this, name, "Woof");  // Run Animal's constructor with Dog's 'this'
  this.type = "Dog";
}

const d = new Dog("Rex");
console.log(d.name);    // Output: Rex
console.log(d.sound);   // Output: Woof
console.log(d.type);    // Output: Dog
```

`Animal.call(this, ...)` says: "Run the `Animal` constructor, but use the `Dog` instance as `this`." This copies all of `Animal`'s initialisation into `Dog`.

---

---

# CHAPTER 6 — FUNCTION.APPLY()

---

## What Is `.apply()`?

`.apply()` works exactly like `.call()`, with one key difference: instead of passing arguments individually, you pass them as an **array**.

```js
function.apply(thisArg, [arg1, arg2, ...])
```

| | `.call()` | `.apply()` |
|---|---|---|
| Arguments | Listed individually | Passed as an array |
| Syntax | `fn.call(obj, a, b, c)` | `fn.apply(obj, [a, b, c])` |
| When to use | When you know the arguments upfront | When arguments are already in an array |

---

## 6.1 — Basic `.apply()` Usage

```js
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const person = { name: "Tunde" };
const args = ["Hello", "!"];

greet.apply(person, args);   // Output: Hello, Tunde!
```

The array `args` is "spread out" as individual arguments when `apply` calls the function.

---

## 6.2 — Finding Max/Min in an Array Using `.apply()`

`Math.max()` normally takes individual numbers: `Math.max(1, 2, 3)`. It doesn't accept an array. `.apply()` solves this by spreading an array as individual arguments:

```js
const scores = [85, 92, 78, 96, 88];

const highest = Math.max.apply(null, scores);
const lowest  = Math.min.apply(null, scores);

console.log(highest);   // Output: 96
console.log(lowest);    // Output: 78
```

`null` is used as the first argument because `Math.max` doesn't use `this` — we don't care what `this` is.

> 💡 **Modern equivalent:** The spread operator `...` does the same thing more cleanly:
> ```js
> Math.max(...scores)   // Output: 96
> ```
> But knowing `.apply()` is essential for reading older code.

---

## 6.3 — Merging Arrays with `.apply()`

```js
const arrayA = [1, 2, 3];
const arrayB = [4, 5, 6];

Array.prototype.push.apply(arrayA, arrayB);
// Equivalent to: arrayA.push(4, 5, 6)

console.log(arrayA);   // Output: [1, 2, 3, 4, 5, 6]
```

`Array.prototype.push` doesn't accept an array directly, but `.apply()` spreads `arrayB` into individual push arguments.

> 💡 **Modern equivalent:** `arrayA.push(...arrayB)` achieves the same thing using the spread operator.

---

## 6.4 — `.call()` vs `.apply()` — Memory Trick

> **C** for **C**omma (`.call()` takes comma-separated arguments)
> **A** for **A**rray (`.apply()` takes an array)

```js
fn.call(ctx, a, b, c);      // C = Comma
fn.apply(ctx, [a, b, c]);   // A = Array
```

---

---

# CHAPTER 7 — FUNCTION.BIND()

---

## What Is `.bind()`?

`.bind()` creates a **new function** with `this` permanently locked to the object you specify. Unlike `.call()` and `.apply()` which call the function immediately, `.bind()` returns a new function that you can call later.

```js
const boundFunction = fn.bind(thisArg, arg1, arg2, ...);
```

| | `.call()` | `.apply()` | `.bind()` |
|---|---|---|---|
| Calls the function? | Immediately | Immediately | No — returns a new function |
| Sets `this`? | Yes | Yes | Yes, permanently |
| Arguments | Individually | As array | Can pre-set (partial application) |

---

## 7.1 — Basic `.bind()` Usage

```js
const person = {
  name: "Tunde",
  greet: function() {
    console.log("Hello, I'm " + this.name);
  }
};

const greetTunde = person.greet.bind(person);

// Call it later:
greetTunde();    // Output: Hello, I'm Tunde
greetTunde();    // Output: Hello, I'm Tunde
```

`greetTunde` is a new function. No matter how or when you call it, `this` will always be `person`.

---

## 7.2 — Solving the Lost `this` Problem

The most common use of `.bind()` is fixing the "lost `this`" problem when passing a method as a callback:

```js
const timer = {
  seconds: 0,
  start: function() {
    // ❌ Without bind: 'this' would be undefined or global inside setInterval
    setInterval(function() {
      this.seconds++;   // 'this' is NOT timer here!
      console.log(this.seconds);
    }, 1000);
  }
};
```

**Fix with `.bind()`:**

```js
const timer = {
  seconds: 0,
  start: function() {
    setInterval(function() {
      this.seconds++;
      console.log(this.seconds);
    }.bind(this), 1000);   // Bind 'this' (which is 'timer' at the point of call)
  }
};

timer.start();
// Output (each second): 1, 2, 3, 4, ...
```

`.bind(this)` is called while we're still inside `timer.start`, where `this` is `timer`. The bound function always refers back to `timer`.

> 💡 **Alternative:** Arrow functions also fix this problem without `.bind()`. This is why arrow functions are preferred for callbacks inside object methods.

---

## 7.3 — Partial Application with `.bind()`

`.bind()` can also pre-fill some of a function's arguments. This is called **partial application**:

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);   // Pre-fill 'a' with 2
const triple = multiply.bind(null, 3);   // Pre-fill 'a' with 3

console.log(double(5));    // Output: 10  (2 × 5)
console.log(double(10));   // Output: 20  (2 × 10)
console.log(triple(4));    // Output: 12  (3 × 4)
```

`null` is the `thisArg` (we don't need `this` here). The `2` pre-fills the first argument `a`. When we call `double(5)`, it calls `multiply(2, 5)`.

**Real-world use — specialising a general function:**

```js
function formatCurrency(currencySymbol, amount) {
  return currencySymbol + amount.toFixed(2);
}

const formatUSD   = formatCurrency.bind(null, "$");
const formatEuros = formatCurrency.bind(null, "€");
const formatGBP   = formatCurrency.bind(null, "£");

console.log(formatUSD(19.99));    // Output: $19.99
console.log(formatEuros(24.5));   // Output: €24.50
console.log(formatGBP(9.95));     // Output: £9.95
```

---

## 7.4 — `.bind()` in Event Listeners with Context

```js
function Button(label) {
  this.label = label;
  this.clickCount = 0;
}

Button.prototype.handleClick = function() {
  this.clickCount++;
  console.log(this.label + " clicked " + this.clickCount + " times");
};

const saveBtn = new Button("Save");
const deleteBtn = new Button("Delete");

document.getElementById("save-btn")
  .addEventListener("click", saveBtn.handleClick.bind(saveBtn));

document.getElementById("delete-btn")
  .addEventListener("click", deleteBtn.handleClick.bind(deleteBtn));
```

Without `.bind()`, `this` inside `handleClick` would be the DOM button element (not the `Button` instance), and `this.clickCount` would be `undefined`.

---

---

# CHAPTER 8 — IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSIONS

---

## What Is an IIFE?

An **IIFE** (pronounced "iffy") is a function that is **defined and immediately called** in one expression. It runs once and disappears.

```js
(function() {
  console.log("I run immediately!");
})();
// Output: I run immediately!
```

**Anatomy of an IIFE:**

```
(  function() {        }  )  ()
│  │                   │  │  │
│  └── function body ──┘  │  └── call it now
│                          │
└─────── wrapping parens ──┘
   (turn the declaration into an expression)
```

The outer parentheses `( )` wrap the function, converting it from a *declaration* to an *expression*. The trailing `()` then immediately calls it.

---

## 8.1 — Why IIFEs Exist: The Scope Problem

JavaScript (before ES6) only had **function scope** — `var` variables declared inside a function are invisible outside it. But `var` outside a function was global.

**The problem:**

```js
var counter = 0;   // Global — any script on the page can access and corrupt this

function increment() {
  counter++;
}
```

If two scripts on the same page both define `var counter`, they overwrite each other. This was a major source of bugs in large applications.

**The IIFE solution:**

```js
(function() {
  var counter = 0;   // Trapped inside the IIFE — completely private

  function increment() {
    counter++;
    console.log(counter);
  }

  increment();   // Output: 1
  increment();   // Output: 2
})();

// console.log(counter);   // ❌ ReferenceError — counter doesn't exist out here
```

The IIFE creates a **private scope**. Variables inside cannot be accessed from outside.

---

## 8.2 — IIFEs with Parameters

You can pass arguments to an IIFE:

```js
(function(name, version) {
  console.log("Loading " + name + " v" + version);
})("MyApp", "1.0.0");
// Output: Loading MyApp v1.0.0
```

A very common pattern is passing `window` or `document` as arguments, giving them a local alias for performance and minification:

```js
(function(win, doc) {
  // Inside here, 'win' refers to the global window object
  // 'doc' refers to the document object
  win.myApp = {};                         // Attach app to global scope
  doc.getElementById("app").innerHTML = "Ready";
})(window, document);
```

---

## 8.3 — Arrow Function IIFE

```js
(() => {
  console.log("Arrow IIFE!");
})();
// Output: Arrow IIFE!
```

---

## 8.4 — IIFEs Returning Values

An IIFE can return a value, which is immediately captured:

```js
const result = (function() {
  const a = 10;
  const b = 20;
  return a + b;
})();

console.log(result);   // Output: 30
```

---

## 8.5 — The Module Pattern (IIFE's Most Powerful Use)

The **module pattern** uses an IIFE to create private state and exposes only selected public methods:

```js
const bankAccount = (function() {
  // Private — not accessible from outside
  let balance = 0;

  // Public interface — returned as an object
  return {
    deposit: function(amount) {
      if (amount > 0) balance += amount;
      console.log("Deposited £" + amount + ". Balance: £" + balance);
    },
    withdraw: function(amount) {
      if (amount > balance) {
        console.log("Insufficient funds.");
        return;
      }
      balance -= amount;
      console.log("Withdrew £" + amount + ". Balance: £" + balance);
    },
    getBalance: function() {
      return balance;
    }
  };
})();

bankAccount.deposit(100);    // Output: Deposited £100. Balance: £100
bankAccount.withdraw(30);    // Output: Withdrew £30. Balance: £70
console.log(bankAccount.getBalance());   // Output: 70
// console.log(bankAccount.balance);     // Output: undefined — 'balance' is private!
```

`balance` can never be read or changed directly from outside — only through the methods the module chooses to expose. This is **encapsulation**, one of the core principles of good software design.

> 💡 **Today's alternative:** ES6 modules (`import` / `export`) handle scope isolation natively. But IIFEs are still used in scripts that run in browsers without a module system, and understanding them is essential for reading legacy code.

> 🤔 **Thinking question:** In the bank account example, why can `deposit` and `withdraw` access `balance` even though the IIFE has already returned? (Hint: this is a closure — Chapter 9 explains the mechanism.)

---

---

# CHAPTER 9 — CLOSURES

---

## What Is a Closure?

A **closure** is a function that "remembers" the variables from the scope where it was created, even after that scope has finished executing.

This is the concept that makes callbacks, the module pattern, memoisation, and many other patterns work. It is arguably the most important concept in JavaScript.

**Simple definition:** A closure = a function + the variables it captured from its birth environment.

---

## 9.1 — Understanding Scope First

Before closures make sense, you need to understand **lexical scoping**: in JavaScript, functions can access variables from their outer (enclosing) scopes.

```js
const outerVariable = "I'm outside";

function innerFunction() {
  console.log(outerVariable);   // Can access the outer variable
}

innerFunction();   // Output: I'm outside
```

This works because `innerFunction` was *defined* inside the same scope as `outerVariable`. The function has access to its birth environment.

---

## 9.2 — The Closure: When the Outer Scope Has Ended

The magic of closures is that the inner function keeps access to the outer variables **even after the outer function has finished running** and its variables would normally be garbage collected.

```js
function makeCounter() {
  let count = 0;      // This variable belongs to makeCounter

  return function() { // This inner function is returned — it's a closure
    count++;
    return count;
  };
}

const counter = makeCounter();  // makeCounter finishes running here

console.log(counter());   // Output: 1
console.log(counter());   // Output: 2
console.log(counter());   // Output: 3
```

**What is happening:**

1. `makeCounter()` runs and creates a local variable `count = 0`.
2. `makeCounter()` returns the inner function.
3. `makeCounter()` finishes — its execution context ends.
4. BUT: `count` is NOT destroyed because the returned function holds a reference to it.
5. Every time `counter()` is called, it accesses and modifies that same `count`.

`count` is enclosed inside the returned function — hence "closure."

---

## 9.3 — Each Closure Is Independent

If you call `makeCounter()` twice, you get two completely separate closures with their own separate `count` variables:

```js
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1());   // Output: 1
console.log(counter1());   // Output: 2
console.log(counter2());   // Output: 1   ← counter2 has its OWN count, starting at 0
console.log(counter1());   // Output: 3   ← counter1 is still going
```

`counter1` and `counter2` are completely independent. They each have their own enclosed `count`.

---

## 9.4 — Closures with Parameters

The enclosed value can come from the outer function's parameters:

```js
function makeAdder(x) {
  return function(y) {
    return x + y;   // x is captured from makeAdder's scope
  };
}

const add5  = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));     // Output: 8   (5 + 3)
console.log(add5(7));     // Output: 12  (5 + 7)
console.log(add10(3));    // Output: 13  (10 + 3)
```

`add5` permanently remembers `x = 5`. `add10` permanently remembers `x = 10`. This is partial application through closures.

---

## 9.5 — Closures for Private State (Data Encapsulation)

Closures are the mechanism that makes the IIFE module pattern work. They also allow you to create private variables without using an IIFE:

```js
function createPerson(name) {
  // 'name' is private — accessible only through the returned methods
  let _name = name;
  let _callCount = 0;

  return {
    getName: function() {
      _callCount++;
      return _name;
    },
    setName: function(newName) {
      if (typeof newName === "string" && newName.trim() !== "") {
        _name = newName;
      }
    },
    getCallCount: function() {
      return _callCount;
    }
  };
}

const person = createPerson("Alice");

console.log(person.getName());          // Output: Alice
console.log(person.getName());          // Output: Alice
console.log(person.getCallCount());     // Output: 2
person.setName("Bob");
console.log(person.getName());          // Output: Bob
// console.log(person._name);           // Output: undefined — truly private
```

`_name` and `_callCount` can never be accessed or modified directly from outside. They are private to the closure.

---

## 9.6 — The Classic Closure Loop Bug

This is one of the most famous JavaScript gotchas:

```js
// ❌ Bug: All buttons alert "3"
for (var i = 0; i < 3; i++) {
  const btn = document.createElement("button");
  btn.innerText = "Button " + i;
  btn.addEventListener("click", function() {
    alert("I am button " + i);   // By the time this runs, i is 3 (the loop ended)
  });
  document.body.appendChild(btn);
}
// Clicking any button → Alert: "I am button 3"
```

**Why:** `var` is function-scoped, so all three callbacks share the same `i` variable. By the time any button is clicked, the loop has finished and `i` is 3.

**Fix 1 — Use `let` (block-scoped, creates a new `i` for each iteration):**

```js
for (let i = 0; i < 3; i++) {   // 'let' creates a new i per iteration
  const btn = document.createElement("button");
  btn.innerText = "Button " + i;
  btn.addEventListener("click", function() {
    alert("I am button " + i);   // Each closure now has its own 'i'
  });
  document.body.appendChild(btn);
}
// Clicking Button 0 → Alert: "I am button 0"
// Clicking Button 1 → Alert: "I am button 1"
// Clicking Button 2 → Alert: "I am button 2"
```

**Fix 2 — Use an IIFE to create a new scope per iteration (pre-ES6 approach):**

```js
for (var i = 0; i < 3; i++) {
  (function(j) {   // j is a new variable per iteration, capturing current i
    const btn = document.createElement("button");
    btn.innerText = "Button " + j;
    btn.addEventListener("click", function() {
      alert("I am button " + j);
    });
    document.body.appendChild(btn);
  })(i);
}
```

> ⚠️ **This bug is extremely common in interviews.** Make sure you understand both why it happens and how to fix it.

---

## 9.7 — Closures in Real-World Code

**React hooks** are closures:

```js
// useState in React returns a pair where the setter closes over the state
const [count, setCount] = useState(0);
// Every time setCount is called, it updates the closed-over 'count'
```

**Event handlers with context:**

```js
function setupHandler(userId) {
  document.getElementById("profile-btn").addEventListener("click", function() {
    fetchUserProfile(userId);   // userId is captured — no need to pass it explicitly
  });
}

setupHandler(42);   // The handler will always fetch user 42
```

**setTimeout inside loops:**

```js
// Send a message after 1, 2, and 3 seconds
[1, 2, 3].forEach(function(seconds) {
  setTimeout(function() {
    console.log("Message after " + seconds + " seconds");
    // 'seconds' is captured correctly because forEach callback creates a new scope
  }, seconds * 1000);
});
```

---

---

# CHAPTER 10 — FUNCTION REFERENCE (BUILT-IN METHODS)

---

## Overview

JavaScript provides several built-in methods on every function object. Understanding these turns you from a passive function user into someone who can control exactly how functions are called.

---

## 10.1 — `Function.prototype.toString()`

Returns the source code of the function as a string:

```js
function add(a, b) {
  return a + b;
}

console.log(add.toString());
// Output:
// function add(a, b) {
//   return a + b;
// }
```

Used for debugging, code analysis tools, and documentation generators.

---

## 10.2 — `Function.prototype.length`

The `length` property returns the number of **expected parameters** (not counting rest parameters or parameters with defaults):

```js
function f1(a, b, c) {}
function f2(a, b = 0, c) {}
function f3(a, ...rest) {}

console.log(f1.length);   // Output: 3
console.log(f2.length);   // Output: 1  (only 'a' counts — 'b' has a default)
console.log(f3.length);   // Output: 1  (only 'a' counts — rest doesn't count)
```

This is used by libraries to check how many arguments a function expects and dispatch accordingly.

---

## 10.3 — `Function.prototype.name`

Returns the name of the function:

```js
function greet() {}
const sayHi = function hello() {};
const arrow = () => {};
const obj = { method() {} };

console.log(greet.name);       // Output: greet
console.log(sayHi.name);       // Output: hello
console.log(arrow.name);       // Output: arrow
console.log(obj.method.name);  // Output: method
```

Useful in debugging — error stack traces use the function name to show where a problem occurred. Anonymous functions appear as `""` or `"anonymous"` in stack traces, making debugging harder.

---

## 10.4 — `Function.prototype.call()` — Recap

Already covered in Chapter 5. Quick reference:

```js
fn.call(thisArg, arg1, arg2, ...);
// Calls fn immediately, setting 'this' to thisArg
```

---

## 10.5 — `Function.prototype.apply()` — Recap

Already covered in Chapter 6. Quick reference:

```js
fn.apply(thisArg, [arg1, arg2, ...]);
// Calls fn immediately, passing args as an array
```

---

## 10.6 — `Function.prototype.bind()` — Recap

Already covered in Chapter 7. Quick reference:

```js
const boundFn = fn.bind(thisArg, arg1, arg2, ...);
// Returns a new function with 'this' and optional args pre-set
```

---

## 10.7 — Quick Reference Table

| Method / Property | Type | Purpose |
|---|---|---|
| `.call(thisArg, ...args)` | Method | Call immediately with explicit `this`, individual args |
| `.apply(thisArg, [args])` | Method | Call immediately with explicit `this`, array of args |
| `.bind(thisArg, ...args)` | Method | Return new function with `this` and args pre-set |
| `.toString()` | Method | Return function source code as a string |
| `.length` | Property | Number of declared parameters (excluding defaults and rest) |
| `.name` | Property | Name of the function |

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Function Definition Mastery

**Objective:** Practice writing the same logic using four different function definition styles.

**Scenario:** A temperature conversion utility for a weather app.

**Warm-up mini-example:**

```js
// Celsius to Fahrenheit: F = (C × 9/5) + 32
const toF = c => (c * 9/5) + 32;
console.log(toF(0));    // Output: 32
console.log(toF(100));  // Output: 212
```

**Step-by-step instructions:**

Write a `celsiusToFahrenheit` function using:
1. A **function declaration**
2. A **function expression** (anonymous)
3. A **named function expression**
4. An **arrow function** (concise single-line)

Then write a `convertTemperatures(temps, converterFn)` function that accepts an array of temperatures and a converter function, returning a new array of converted values. Call it with all four converter styles.

**Expected output:**

```js
convertTemperatures([0, 20, 37, 100], celsiusToFahrenheit);
// Output: [32, 68, 98.6, 212]
```

**Self-check questions:**
1. Which of the four styles is hoisted? Test it by calling the function before its definition.
2. In `convertTemperatures`, is the converter parameter a callback? How do you know?

---

## Exercise 2 — Higher-Order Function Practice

**Objective:** Build a mini utility library of higher-order functions.

**Scenario:** You're building a data processing utility for a school's grade tracking system.

**Step-by-step instructions:**

Start with this data:

```js
const students = [
  { name: "Alice", grade: 92 },
  { name: "Bob",   grade: 55 },
  { name: "Carol", grade: 78 },
  { name: "David", grade: 61 },
  { name: "Eve",   grade: 88 },
];
```

Write the following functions using `.map()`, `.filter()`, and `.reduce()` (all higher-order functions):

1. `getNames(students)` → Returns `["Alice", "Bob", "Carol", "David", "Eve"]`
2. `getPassingStudents(students)` → Returns students with grade ≥ 65
3. `getAverageGrade(students)` → Returns the average grade (use `.reduce()`)
4. `getLetterGrade(score)` → Returns "A" (≥90), "B" (≥80), "C" (≥70), "D" (≥60), "F" (<60)
5. `gradeReport(students)` → Returns a string array: `["Alice: A", "Bob: F", ...]`

**Warm-up mini-example for reduce:**

```js
const total = [10, 20, 30].reduce((accumulator, current) => accumulator + current, 0);
console.log(total);   // Output: 60
```

**Self-check questions:**
1. Is `.map()` a higher-order function? Why?
2. In `gradeReport`, you'll compose `getLetterGrade` inside a `.map()` — what does that make the outer function?

---

## Exercise 3 — Callback Chain

**Objective:** Simulate an asynchronous login flow using callbacks.

**Scenario:** A login system with three steps: validate credentials, fetch user profile, load user settings. Each step takes a simulated delay using `setTimeout`.

**Step-by-step instructions:**

```js
function validateCredentials(username, password, callback) {
  setTimeout(function() {
    const isValid = username === "admin" && password === "1234";
    if (isValid) {
      callback(null, { userId: 42, username });
    } else {
      callback(new Error("Invalid credentials"));
    }
  }, 500);
}
```

Write similar functions for `fetchUserProfile(userId, callback)` and `loadUserSettings(userId, callback)`. Chain them together using error-first callbacks. If any step fails, stop and log the error.

**Hints:**
- Check `if (err) { ... return; }` at the start of each callback
- The chain should look like: validate → if OK → fetch profile → if OK → load settings → display welcome message

**Self-check questions:**
1. What is the maximum nesting depth if you chain 5 callbacks?
2. How would you refactor this using named functions to flatten the nesting?

---

## Exercise 4 — Understanding `this`

**Objective:** Predict the value of `this` in different contexts before running the code.

**Step-by-step instructions:**

For each snippet below, write your prediction of what will be logged before you run it:

```js
// Snippet A
const obj = {
  value: 42,
  getValue: function() {
    return this.value;
  }
};
const fn = obj.getValue;
console.log(fn());       // Prediction: ___?
console.log(obj.getValue());  // Prediction: ___?
```

```js
// Snippet B
function Timer() {
  this.ticks = 0;
  setTimeout(function() {
    this.ticks++;
    console.log(this.ticks);  // Prediction: ___?
  }, 100);
}
new Timer();
```

```js
// Snippet C
function Timer() {
  this.ticks = 0;
  setTimeout(() => {
    this.ticks++;
    console.log(this.ticks);  // Prediction: ___?
  }, 100);
}
new Timer();
```

After predicting, run each snippet and compare. If wrong, write an explanation of why.

---

## Exercise 5 — call, apply, bind in Action

**Objective:** Solve three real-world problems using the correct method.

**Problem 1 (use `.call()`):**
You have a `fullName` function and two objects. Call it for each without modifying the objects.

```js
function fullName(separator) {
  return this.first + separator + this.last;
}

const person1 = { first: "Ada",   last: "Lovelace" };
const person2 = { first: "Grace", last: "Hopper" };

// Expected:
// Ada Lovelace
// Grace-Hopper
```

**Problem 2 (use `.apply()`):**
Find the maximum and minimum values from this array using `Math.max` and `Math.min` with `.apply()`:

```js
const temperatures = [23, 17, 31, 8, 27, 15, 29];
// Expected: Max: 31, Min: 8
```

**Problem 3 (use `.bind()`):**
Fix the broken countdown so it logs correctly:

```js
function Counter(start) {
  this.count = start;
  this.tick = function() {
    if (this.count > 0) {
      console.log(this.count--);
      setTimeout(this.tick, 500);   // ❌ 'this' will be lost here
    }
  };
  this.tick();
}
new Counter(5);
```

---

## Exercise 6 — IIFE for Private Configuration

**Objective:** Use an IIFE to create a private configuration module.

**Scenario:** You're building a web app that needs configuration settings (API base URL, default page size, app version) that should be read-only — nothing outside should be able to change them after initialisation.

**Step-by-step instructions:**

```js
const config = (function() {
  const _settings = {
    apiBase: "https://api.myapp.com/v1",
    pageSize: 20,
    version: "2.3.1",
    debug: false
  };

  return {
    get: function(key) { /* return the value for key */ },
    getAll: function() { /* return a copy, not the original */ },
    isDebug: function() { /* return the debug flag */ }
  };
})();
```

Fill in the three method bodies. `getAll` must return a copy of `_settings` so external code can't modify the original. Hint: use `Object.assign({}, _settings)` or the spread operator `{..._settings}`.

**Expected:**

```js
console.log(config.get("version"));   // Output: 2.3.1
console.log(config.isDebug());        // Output: false
const copy = config.getAll();
copy.version = "hack";                // Modifying the copy
console.log(config.get("version"));   // Output: 2.3.1  ← original unchanged
```

---

## Exercise 7 — Closure Mastery

**Objective:** Build a reusable rate limiter using closures.

**Scenario:** A button on a web page that should only be clickable once every 3 seconds (to prevent spam clicks). Use a closure to remember the last time the button was clicked.

**Step-by-step instructions:**

```js
function createRateLimiter(fn, cooldownMs) {
  let lastCalled = 0;

  return function() {
    const now = Date.now();

    if (now - lastCalled < cooldownMs) {
      console.log("Too soon! Please wait.");
      return;
    }

    lastCalled = now;
    fn();
  };
}

function saveData() {
  console.log("Data saved at " + new Date().toLocaleTimeString());
}

const limitedSave = createRateLimiter(saveData, 3000);

// Simulating rapid clicks:
limitedSave();   // Output: Data saved at ...
limitedSave();   // Output: Too soon! Please wait.
limitedSave();   // Output: Too soon! Please wait.
// (3 seconds later)
limitedSave();   // Output: Data saved at ...
```

**Self-check questions:**
1. Which variable in `createRateLimiter` is closed over by the returned function?
2. What would happen if `lastCalled` were declared with `var` inside the returned function instead of in the outer function?
3. How does this differ from just using a global `lastCalled` variable?

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Functional Task Pipeline with Private State

**Scenario:** You are a junior developer at a project management startup. Your task is to build a lightweight JavaScript pipeline that processes tasks through several stages — filtering, transforming, prioritising — using functional programming concepts. All internal state must be private (no global variables), and the system must be extensible.

This project deliberately combines all ten chapters:
- Function definitions (Chapter 1)
- Higher-order functions and composition (Chapter 2)
- Callbacks (Chapter 3)
- Closures for private state (Chapter 9)
- IIFE for module encapsulation (Chapter 8)
- `.call()` / `.apply()` / `.bind()` where appropriate (Chapters 5–7)

---

### Stage 1 — Data and Core Utilities

**Setup: The task data and basic utility functions**

```js
// Raw task data — simulating a real project's task list
const rawTasks = [
  { id: 1, title: "Write unit tests",       category: "dev",     hours: 3, done: false },
  { id: 2, title: "Design login screen",    category: "design",  hours: 5, done: false },
  { id: 3, title: "Fix payment bug",        category: "dev",     hours: 1, done: true  },
  { id: 4, title: "Update documentation",  category: "writing", hours: 2, done: false },
  { id: 5, title: "Code review",            category: "dev",     hours: 2, done: false },
  { id: 6, title: "Client presentation",   category: "meeting", hours: 4, done: true  },
  { id: 7, title: "Database optimisation", category: "dev",     hours: 6, done: false },
  { id: 8, title: "Write blog post",        category: "writing", hours: 3, done: false },
];
```

**Core utility functions (pure functions only):**

```js
// Filter tasks by a predicate function
function filterTasks(tasks, predicate) {
  return tasks.filter(predicate);
}

// Transform tasks (map)
function transformTasks(tasks, transformer) {
  return tasks.map(transformer);
}

// Reduce tasks to a single value
function reduceTasks(tasks, reducer, initialValue) {
  return tasks.reduce(reducer, initialValue);
}

// Sort tasks by a key
function sortTasks(tasks, keyFn, ascending = true) {
  return [...tasks].sort((a, b) => {
    const valA = keyFn(a);
    const valB = keyFn(b);
    return ascending ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });
}
```

**Expected output — test Stage 1:**

```js
const pendingTasks = filterTasks(rawTasks, task => !task.done);
console.log(pendingTasks.length);   // Output: 6

const totalHours = reduceTasks(rawTasks, (sum, t) => sum + t.hours, 0);
console.log(totalHours);   // Output: 26
```

---

### Stage 2 — The Pipeline Builder (Higher-Order Functions + Closures)

**Build a reusable pipeline function that chains operations together:**

```js
function createPipeline(...steps) {
  // Each 'step' is a function that takes tasks and returns modified tasks
  return function(tasks) {
    return steps.reduce(function(currentTasks, step) {
      return step(currentTasks);
    }, tasks);
  };
}
```

**Create specialised step functions using partial application via `.bind()`:**

```js
// Step factories — each returns a function for use in the pipeline
const onlyPending   = tasks => filterTasks(tasks, t => !t.done);
const onlyDev       = tasks => filterTasks(tasks, t => t.category === "dev");
const byHoursAsc    = tasks => sortTasks(tasks, t => t.hours, true);
const byHoursDesc   = tasks => sortTasks(tasks, t => t.hours, false);

// Generalised filter step factory using closure:
function byCategoryStep(category) {
  return function(tasks) {
    return filterTasks(tasks, t => t.category === category);
  };
}

const addPriorityLabel = tasks => transformTasks(tasks, function(task) {
  const priority = task.hours >= 5 ? "HIGH"
                 : task.hours >= 3 ? "MEDIUM"
                 : "LOW";
  return { ...task, priority };
});
```

**Compose pipelines:**

```js
const devBacklogPipeline = createPipeline(
  onlyPending,
  onlyDev,
  addPriorityLabel,
  byHoursDesc
);

const results = devBacklogPipeline(rawTasks);
results.forEach(t => {
  console.log(`[${t.priority}] ${t.title} (${t.hours}h)`);
});
// Expected output:
// [HIGH] Database optimisation (6h)
// [MEDIUM] Write unit tests (3h)
// [LOW] Fix payment bug (1h)   ← wait, this is 'done:true' — it should be filtered out
// Actually: only pending dev tasks:
// [HIGH] Database optimisation (6h)
// [MEDIUM] Write unit tests (3h)
// [LOW] Code review (2h)
```

---

### Stage 3 — The Private Task Manager Module (IIFE + Closures)

**Encapsulate everything in a module with private state and a public API:**

```js
const TaskManager = (function() {
  // Private state
  let _tasks = [];
  let _history = [];
  let _nextId = 1;

  // Private helpers
  function _log(action, taskId) {
    _history.push({
      action,
      taskId,
      timestamp: new Date().toISOString()
    });
  }

  // Public API
  return {
    loadTasks: function(tasks) {
      _tasks = tasks.map(t => ({ ...t }));  // Store a copy, not the original
      _nextId = Math.max(..._tasks.map(t => t.id)) + 1;
      _log("LOAD", null);
    },

    addTask: function(title, category, hours) {
      const task = { id: _nextId++, title, category, hours, done: false };
      _tasks.push(task);
      _log("ADD", task.id);
      return task;
    },

    completeTask: function(id) {
      const task = _tasks.find(t => t.id === id);
      if (task) {
        task.done = true;
        _log("COMPLETE", id);
        return true;
      }
      return false;
    },

    runPipeline: function(pipeline) {
      return pipeline([..._tasks]);   // Pass a copy to the pipeline
    },

    getStats: function() {
      const total    = _tasks.length;
      const done     = _tasks.filter(t => t.done).length;
      const pending  = total - done;
      const totalHrs = reduceTasks(_tasks, (s, t) => s + t.hours, 0);
      const doneHrs  = reduceTasks(_tasks.filter(t => t.done), (s, t) => s + t.hours, 0);

      return { total, done, pending, totalHrs, doneHrs };
    },

    getHistory: function() {
      return [..._history];   // Return a copy
    }
  };
})();
```

**Using the module:**

```js
TaskManager.loadTasks(rawTasks);

// Add a new task
TaskManager.addTask("Performance audit", "dev", 4);

// Complete a task
TaskManager.completeTask(4);

// Run a pipeline through the manager
const devPipeline = createPipeline(onlyPending, onlyDev, addPriorityLabel, byHoursDesc);
const devResults  = TaskManager.runPipeline(devPipeline);

console.log("Dev backlog:");
devResults.forEach(t => console.log(`  [${t.priority}] ${t.title}`));

// Stats
const stats = TaskManager.getStats();
console.log("\nProject Stats:");
console.log("  Total tasks:  " + stats.total);
console.log("  Done:         " + stats.done);
console.log("  Pending:      " + stats.pending);
console.log("  Total hours:  " + stats.totalHrs);

// History
console.log("\nAudit Trail:");
TaskManager.getHistory().forEach(entry => {
  console.log("  " + entry.action + (entry.taskId ? " #" + entry.taskId : "") + " at " + entry.timestamp);
});
```

**Expected output:**

```
Dev backlog:
  [HIGH] Database optimisation
  [HIGH] Performance audit
  [MEDIUM] Write unit tests
  [LOW] Code review

Project Stats:
  Total tasks:  9
  Done:         3
  Pending:      6
  Total hours:  30

Audit Trail:
  LOAD at 2024-...
  ADD #9 at 2024-...
  COMPLETE #4 at 2024-...
```

---

### Stage 4 — Advanced Challenge: Debounce Utility (Closures + Timers)

**The debounce function** is used everywhere in real applications — search boxes, resize handlers, form auto-saves. It ensures a function doesn't fire more than once within a set time window, no matter how many times it's triggered.

```js
function debounce(fn, delayMs) {
  let timeoutId = null;   // Closed-over variable — persists between calls

  return function(...args) {
    // If the timer is already running, cancel it and restart
    clearTimeout(timeoutId);

    // Start a new timer
    timeoutId = setTimeout(() => {
      fn.apply(this, args);   // Use .apply() to preserve 'this' and pass args
      timeoutId = null;
    }, delayMs);
  };
}
```

**Usage — search box that only queries after typing stops:**

```js
function searchTasks(query) {
  const results = TaskManager.runPipeline(
    createPipeline(tasks => tasks.filter(t => t.title.toLowerCase().includes(query)))
  );
  console.log("Search '" + query + "':", results.map(t => t.title));
}

const debouncedSearch = debounce(searchTasks, 300);

// Simulate fast keystrokes:
debouncedSearch("w");
debouncedSearch("wr");
debouncedSearch("wri");
debouncedSearch("writ");
// Only "writ" search will actually run (the others were cancelled)
// Output: Search 'writ': ["Write unit tests", "Write blog post"]
```

**Why this uses closures:** `timeoutId` is captured by the returned function. Every call to `debouncedSearch` reads and updates the same `timeoutId`. Without a closure, this would require a global variable.

---

**Reflection Questions:**

1. In `TaskManager`, why does `runPipeline` pass `[..._tasks]` (a copy) to the pipeline instead of `_tasks` directly?
2. In `debounce`, the function uses `fn.apply(this, args)`. What would happen if you just used `fn(...args)` instead? When would they differ?
3. The `_history` array in `TaskManager` can grow indefinitely. In a real application, how would you handle this? (Think: max length, persisting to `localStorage`, sending to a server.)
4. How would you modify `createPipeline` to support **async** pipeline steps (steps that return a Promise)?
5. The `devBacklogPipeline` is created outside `TaskManager`. What would be the advantages and disadvantages of moving pipeline creation inside the module?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

Test your understanding. Write your answers before checking.

**Q1:** What is the difference between a function declaration and a function expression in terms of hoisting?

**Q2:** Write a concise arrow function that takes a number `n` and returns its cube (`n³`).

**Q3:** What does a rest parameter (`...args`) return — an array or an object?

**Q4:** In the following code, what is logged and why?

```js
const obj = { n: 5 };
function double() { return this.n * 2; }
console.log(double.call(obj));   // ?
```

**Q5:** What is the key difference between `.call()` and `.apply()`?

**Q6:** What does `.bind()` return — a value or a function?

**Q7:** What does `event.preventDefault()` do and why is it needed in form validation?

**Q8:** What is an IIFE and give one reason to use it?

**Q9:** Given the following code, what are the two outputs and why are they different?

```js
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const a = makeCounter();
const b = makeCounter();
a(); a();
console.log(a());   // ?
console.log(b());   // ?
```

**Q10:** In the loop closure bug, why does using `let` instead of `var` fix the problem?

---

## Answer Key

**A1:** Function declarations are hoisted — you can call them before they appear. Function expressions are not — accessing them before assignment throws a ReferenceError (for `let`/`const`) or returns `undefined` then throws (for `var`).

**A2:** `const cube = n => n ** 3;` (or `n * n * n`)

**A3:** A real array, with all standard array methods available.

**A4:** `10`. `.call(obj)` sets `this` to `obj`, so `this.n` is `5`. `5 * 2 = 10`.

**A5:** `.call()` takes arguments individually: `fn.call(ctx, a, b, c)`. `.apply()` takes them as an array: `fn.apply(ctx, [a, b, c])`.

**A6:** A new function — with `this` and any pre-filled arguments permanently set.

**A7:** It stops the browser's default form submission behaviour (page reload), allowing JavaScript to handle validation and submission instead.

**A8:** A function defined and immediately executed: `(function() { ... })()`. Use cases: creating a private scope to avoid polluting global variables, or running initialisation code that shouldn't be repeatable.

**A9:** `a()` logs `3` (called three times: 1, 2, 3). `b()` logs `1` (independent closure, count starts fresh at 0). Each call to `makeCounter()` creates a separate `count` variable.

**A10:** `var` is function-scoped — all loop iterations share one `var i` variable. By the time callbacks run, the loop has ended and `i` is the final value. `let` is block-scoped — each iteration creates a brand-new `i` binding. Each callback closes over its own separate `i`.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can write functions using all four definition styles | ✓ |
| 2 | Understand hoisting and how it affects declarations vs expressions | ✓ |
| 3 | Can use default parameters, rest parameters, and the arguments object | ✓ |
| 4 | Understand higher-order functions, callbacks, and function composition | ✓ |
| 5 | Can explain what `this` refers to in six different contexts | ✓ |
| 6 | Can use `.call()`, `.apply()`, and `.bind()` for their correct use cases | ✓ |
| 7 | Can write and explain the purpose of an IIFE | ✓ |
| 8 | Can explain what a closure is and why it works | ✓ |
| 9 | Can identify and fix the classic closure loop bug | ✓ |
| 10 | Know the built-in function properties: `.length`, `.name`, `.toString()` | ✓ |
| 11 | Built the complete Task Pipeline project combining all concepts | ✓ |
| 12 | All beginner gotchas highlighted and explained | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Calling a function expression before assignment | Not hoisted | Move the expression up, or use a declaration |
| `addEventListener("click", fn())` | Calls `fn` immediately; passes its return value | Use `fn` without parentheses |
| `this` is wrong inside a callback | Plain function call loses object context | Use `.bind()` or an arrow function |
| `const` for a counter variable | `const` can't be reassigned | Use `let` |
| Loop closures all share one `var` | `var` is function-scoped, not block-scoped | Use `let` |
| Can't remove an anonymous listener | No reference to pass to `removeEventListener` | Use a named function |
| Default values trigger for `null` | They only trigger for `undefined`, not `null` | Check explicitly if needed |
| Arrow functions in object methods | No own `this` — inherits from outer scope | Use regular function for methods |

---

## One-Sentence Summary

> JavaScript functions are first-class citizens that can be defined in multiple ways, passed as callbacks, composed into pipelines, scoped with IIFEs, bound to specific contexts with `call`/`apply`/`bind`, and made to "remember" private variables through closures — making them the single most powerful tool in the entire language.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Functions (11 pages)*
