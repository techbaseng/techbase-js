---
render_with_liquid: false
title: "JavaScript History, Versions & The Foundation: ES3 · ES5 · ES6 · Browser Compatibility"
nav_order: 27
---

## Table of Contents
1. [The Complete JavaScript Version History](#1-the-complete-javascript-version-history)
2. [The Story of JavaScript — From Birth to Dominance](#2-the-story-of-javascript)
3. [ES3 (1999) — The Foundation That Ran for a Decade](#3-es3-1999)
4. [ES5 (2009) — The Reliability Revolution](#4-es5-2009)
5. [ES6 / ES2015 — The Modern Language Transformation](#5-es6--es2015)
6. [IE and Edge — The Browser Compatibility Story](#6-ie-and-edge)
7. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
8. [Phase 3 — Project Simulation](#phase-3--project-simulation)
9. [Completion Checklist](#completion-checklist)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. The Complete JavaScript Version History

### 1.1 Why Version History Matters

When you write JavaScript today, you are writing inside a language that is 30 years old. Every line you type uses concepts introduced at specific points in time by specific people solving specific problems. Understanding the history:

- Explains *why* JavaScript has odd behaviours (like `typeof null === "object"`)
- Helps you read older codebases that use `var`, `arguments`, and `prototype` patterns
- Makes you a better debugger — you know what was possible when each piece of code was written
- Prepares you for technical interviews where history and compatibility questions are common

**Real-world analogy:** Understanding the history of roads helps a traffic engineer understand why some city layouts are efficient and others are not. The constraints and decisions of the past shaped what exists today.

---

### 1.2 The Complete Version Timeline

| Year | Version | Official Name | Significance |
|------|---------|---------------|-------------|
| 1995 | ES1 pre-release | "Mocha" / "LiveScript" / "JavaScript" | Created in 10 days by Brendan Eich at Netscape |
| 1997 | ES1 | ECMAScript 1 | First official standard published by ECMA |
| 1998 | ES2 | ECMAScript 2 | Minor editorial update to align with ISO standard |
| 1999 | ES3 | ECMAScript 3 | First major feature release — still the baseline for 10 years |
| 2009 | ES5 | ECMAScript 5 | Reliability overhaul — strict mode, JSON, property descriptors |
| 2011 | ES5.1 | ECMAScript 5.1 | Minor editorial revision |
| 2015 | ES6 | ECMAScript 2015 | The biggest leap — classes, arrow functions, Promises, modules |
| 2016 | ES7 | ECMAScript 2016 | Start of annual releases — `includes()`, `**` |
| 2017 | ES8 | ECMAScript 2017 | `async`/`await`, `Object.entries()` |
| 2018 | ES9 | ECMAScript 2018 | Object spread, `Promise.finally()` |
| 2019 | ES10 | ECMAScript 2019 | `flat()`, `fromEntries()` |
| 2020 | ES11 | ECMAScript 2020 | `BigInt`, `??`, `?.`, dynamic import |
| 2021 | ES12 | ECMAScript 2021 | `replaceAll()`, `Promise.any()` |
| 2022 | ES13 | ECMAScript 2022 | `at()`, private fields, top-level await |
| 2023 | ES14 | ECMAScript 2023 | Non-mutating array methods |
| 2024 | ES15 | ECMAScript 2024 | `groupBy()`, `Promise.withResolvers()` |
| 2025 | ES16 | ECMAScript 2025 | Set methods, iterator helpers |
| 2026 | ES17 | ECMAScript 2026 | `Float16Array`, `Error.isError()`, `Math.sumPrecise()` |

> 💡 **Notice:** There is no ES4. ES4 was a proposed major overhaul — so ambitious and controversial (classes, packages, types, interfaces, generics) that the TC39 committee could not reach agreement. After years of conflict, ES4 was abandoned in 2003. Some of its ideas resurfaced in ES6 (2015), twelve years later. This gap — and then the ten-year period from ES3 to ES5 — is why the JavaScript community was so eager for ES6 when it finally arrived.

---

### 1.3 The Three Eras of JavaScript

It helps to think of JavaScript's history in three distinct eras:

```
ERA 1 — THE WILD WEST (1995–2009)
────────────────────────────────
ES1, ES2, ES3 — language is born
No standard way to handle errors, no JSON, no strict mode
Developers work around the language's inconsistencies
Cross-browser hell — IE6 vs Firefox vs Safari all behave differently

ERA 2 — STABILISATION (2009–2015)
───────────────────────────────────
ES5 brings strict mode, real JSON support, better arrays
jQuery and other libraries paper over browser differences
Node.js (2009) brings JavaScript to the server
Developers start taking JS seriously for large applications

ERA 3 — MODERN JAVASCRIPT (2015–present)
─────────────────────────────────────────
ES6/ES2015 transforms the language fundamentally
Annual releases add features steadily
TypeScript, React, Vue, Angular — all built on modern ES6+ foundations
JavaScript becomes the world's most-used programming language
```

---

## 2. The Story of JavaScript

### 2.1 Birth: Ten Days in May 1995

In May 1995, a programmer named **Brendan Eich** at **Netscape Communications** was given a task: create a scripting language for the Netscape Navigator browser. The deadline: **ten days**.

The result was a language originally called **Mocha**, then renamed **LiveScript**, and finally **JavaScript** — a marketing decision capitalising on the popularity of the Java programming language, despite the two languages being fundamentally different.

**The critical design decisions made in those ten days:**
- Interpreted (not compiled) — ran directly in the browser
- Loosely typed — variables could hold any type of value
- Prototype-based — objects inherit from other objects, not classes
- Functions as first-class values — functions can be stored, passed, and returned like any other value
- Event-driven — designed to respond to user actions (clicks, keypresses)

These decisions — made under extreme time pressure — shaped JavaScript forever. Some led to great expressiveness. Others led to the famous quirks (`typeof null === "object"`, `==` coercion, `NaN !== NaN`) that developers still encounter today.

> 💡 **Thinking Question:** Brendan Eich later said he borrowed ideas from three languages: **Self** (prototype-based objects), **Scheme** (functional programming, closures), and **Java** (syntax). Can you identify which modern JavaScript features came from each?

---

### 2.2 The Browser Wars and Chaos (1995–1999)

JavaScript's early years were marked by **fierce competition** between Netscape and Microsoft:

- **1995:** Netscape releases JavaScript 1.0 in Navigator 2.0
- **1996:** Microsoft creates their own version called **JScript** for Internet Explorer 3
- **1996:** Both companies submit the language to **ECMA International** for standardisation (to avoid a proprietary war)
- **1997:** **ECMAScript 1** is published — the first official standard
- **1998:** **ECMAScript 2** — minor cleanup to match an ISO standard
- **1999:** **ECMAScript 3** — the first real feature release

The problem: even with a standard, browsers **implemented it differently**. JScript (IE) and JavaScript (Netscape) had subtle differences in DOM manipulation, event handling, and object behaviour. Writing code that worked in both required constant workarounds — a problem that would persist for 15+ years.

---

### 2.3 The Dark Ages: The Missing ES4 (2000–2008)

After ES3 in 1999, TC39 attempted to create ES4 — a massive overhaul. The proposal included:
- Static typing (`int`, `string` types)
- Classes with real inheritance
- Packages and namespaces
- Interfaces and generics
- Many other features

**The problem:** The committee split. Some members (including Brendan Eich and Mozilla) wanted ES4. Others (notably Microsoft and Yahoo) felt it was too radical and would break the web. After years of arguing, the ES4 proposal was formally abandoned in 2008.

A smaller, consensus proposal called **"Harmony"** was agreed upon instead — which eventually became ES5 and, later, ES6.

**What this meant for developers:** From 1999 to 2009 — **a full decade** — JavaScript had no new standard features. Developers improvised, created libraries, and worked around the language's limitations with patterns like:
- **IIFE** (Immediately Invoked Function Expressions) to simulate block scope
- **Prototype chains** for inheritance
- **jQuery** (2006) to paper over browser inconsistencies
- **AJAX** patterns for server communication without page reload

---

### 2.4 The Node.js Revolution (2009)

In 2009, **Ryan Dahl** released **Node.js** — a JavaScript runtime built on Chrome's V8 engine that ran JavaScript *on the server*, outside the browser.

This was transformative:
- JavaScript developers could now write both client (browser) and server code in the same language
- The **npm** (Node Package Manager) ecosystem exploded — by 2024 it hosts over 2 million packages
- Companies started hiring "full-stack JavaScript" developers
- JavaScript began its march to become the most widely used programming language on Earth

---

### 2.5 ES5 Arrives (2009) — The Reliability Overhaul

The same year as Node.js, **ES5** was published — the first new standard in a decade. It did not add flashy features. Instead, it fixed reliability:

- **Strict mode** — opt-in to safer JavaScript
- **`JSON.parse()` and `JSON.stringify()`** — official JSON support
- **Array methods** — `forEach`, `map`, `filter`, `reduce`, `indexOf`
- **`Object.create()`** — better prototype-based inheritance
- **Property descriptors** — fine-grained object property control

---

### 2.6 ES6 / ES2015 — The Modern Era Begins

After six more years of development (much of it reconciling the abandoned ES4 proposals), **ES6** (officially ECMAScript 2015) was published in June 2015. It was the largest single update to JavaScript in its history:

- `let` and `const` — proper block-scoped variables
- Arrow functions `() =>`
- Classes `class` syntax
- Template literals `` ` ` ``
- Destructuring `{ a, b } = obj`
- Default parameters `function(x = 0)`
- Rest `...args` and Spread `...arr`
- Promises
- Modules `import`/`export`
- `Map` and `Set`
- Symbols
- Iterators and generators
- `for...of` loop
- `WeakMap` and `WeakSet`

This was not just new syntax — it was a fundamentally different way of writing JavaScript. It enabled the modern frameworks (React, Vue, Angular) and changed how the language was taught.

---

### 2.7 The Annual Release Model and the Present

After ES6, TC39 adopted the annual release model (covered in the ES2016–ES2026 tutorial). JavaScript has been growing steadily and safely ever since.

Today, JavaScript:
- Runs in every web browser on earth
- Powers servers via Node.js and Deno
- Builds mobile apps via React Native
- Controls desktop apps via Electron (VS Code, Discord, Slack are all built on it)
- Powers IoT devices
- Runs machine learning models in the browser via TensorFlow.js

---

## 3. ES3 (1999) — The Foundation That Ran for a Decade

### 3.1 Why Study ES3?

ES3 is the version of JavaScript that shipped in **Internet Explorer 6** in 2001 and formed the baseline for web development through the mid-2000s. You will encounter ES3 patterns in:

- Legacy corporate codebases
- Old WordPress themes and plugins
- jQuery source code (written to support IE)
- Any codebase that targeted IE8 or earlier

Understanding ES3 also illuminates *why* ES5 and ES6 made the choices they did — each feature was a direct response to an ES3 limitation.

---

### 3.2 What ES3 Introduced

ES3 (December 1999) added the core features that made JavaScript a real programming language:

**Regular Expressions:**

```javascript
// ES3 — first official support for regex
var email = "tunde@example.com";
var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(pattern.test(email)); // true

var text = "The price is 1500 naira and 2500 naira";
var amounts = text.match(/\d+/g);
console.log(amounts); // ["1500", "2500"]
```

**`try`/`catch`/`finally` — Error Handling:**

```javascript
// ES3 — first proper error handling
try {
  var result = riskyOperation();
} catch (e) {
  // e is always required in ES3 (optional catch binding came in ES2019)
  alert("Error: " + e.message);
} finally {
  cleanup();
}
```

**`do...while` loop:**

```javascript
var attempts = 0;
do {
  attempts++;
  var result = tryConnect();
} while (!result && attempts < 3);
```

**`switch` statement:**

```javascript
switch (day) {
  case 0: console.log("Sunday");  break;
  case 1: console.log("Monday");  break;
  default: console.log("Weekday");
}
```

**String methods — `split()`, `replace()`, `search()`:**

```javascript
var csv = "alice,bob,carol,david";
var names = csv.split(",");      // ["alice","bob","carol","david"]

var text = "Hello World";
var result = text.replace("World", "JavaScript"); // "Hello JavaScript"
```

---

### 3.3 ES3's Biggest Limitations (Which ES5+ Fixed)

**1. No `let` or `const` — only `var`:**

```javascript
// ES3 — var is function-scoped, not block-scoped
var x = 10;
if (true) {
  var x = 20; // This OVERWRITES the outer x!
}
console.log(x); // 20 — surprising!

// ES3 workaround for block scope — IIFE (Immediately Invoked Function Expression)
var x = 10;
(function() {
  var x = 20; // This x is scoped to the IIFE function
})();
console.log(x); // 10 — outer x is protected
```

**2. No JSON support — required third-party libraries:**

```javascript
// ES3 — no JSON.parse() or JSON.stringify() built in!
// Developers loaded json2.js (Douglas Crockford's library)

// Dangerous workaround that was widely used (but terrible for security):
var jsonString = '{"name": "Tunde", "age": 28}';
var obj = eval("(" + jsonString + ")"); // eval! Huge security risk
```

**3. No `forEach`, `map`, `filter`, `reduce` — only manual loops:**

```javascript
// ES3 — no array iteration methods
var numbers = [1, 2, 3, 4, 5];

// Had to write all processing manually with for loops
var doubled = [];
for (var i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// Later added manually to Array.prototype by developers or via libraries
Array.prototype.forEach = function(callback) {
  for (var i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};
```

**4. No strict mode — silent failures everywhere:**

```javascript
// ES3 — this silently creates a global variable
function broken() {
  x = 10; // No var, no let, no const — ES3 creates a global
}
broken();
console.log(x); // 10 — surprise global!
```

**5. No `Object.create()`, `Object.keys()`, property descriptors:**

```javascript
// ES3 — simulating classical inheritance was complex and fragile
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + " makes a sound.";
};

function Dog(name) {
  Animal.call(this, name); // Manual parent constructor call
}
Dog.prototype = new Animal(); // Fragile prototype chain setup
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
  return this.name + " barks.";
};
```

---

### 3.4 The IIFE Pattern — ES3's Block Scope Workaround

Because `var` leaks out of blocks, ES3 developers used **IIFEs** (Immediately Invoked Function Expressions) to create scope boundaries.

```javascript
// IIFE syntax — a function that defines and calls itself immediately
(function() {
  var privateVar = "I'm hidden from the outside world";
  var counter = 0;

  // Everything inside here is private
  function increment() {
    counter++;
    return counter;
  }

  // Expose only what needs to be public
  window.myModule = {
    count: increment
  };
})();

console.log(typeof privateVar); // "undefined" — not accessible outside
console.log(window.myModule.count()); // 1
console.log(window.myModule.count()); // 2
```

This IIFE + module pattern was the backbone of JavaScript libraries in the ES3/ES5 era — including jQuery, Underscore, and Backbone. ES6 modules made it largely obsolete, but you will still encounter it in legacy code.

---

### 3.5 The `arguments` Object — ES3's Rest Parameters

Before ES6 rest parameters (`...args`), ES3 functions had access to a special `arguments` object containing all the values passed in.

```javascript
// ES3 — arguments object
function sum() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(sum(1, 2, 3));         // 6
console.log(sum(10, 20, 30, 40)); // 100

// The problem: arguments is array-LIKE, not a real array
// Array methods don't work on it directly:
arguments.forEach(…); // TypeError in ES3!

// ES3 workaround — convert arguments to a real array:
var args = Array.prototype.slice.call(arguments);
args.forEach(function(arg) { console.log(arg); }); // Now works
```

```javascript
// ES6 — rest parameters replaced this pattern cleanly
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
// numbers is a real Array — all Array methods available
```

---

## 4. ES5 (2009) — The Reliability Revolution

### 4.1 The Context: Why ES5 Was Needed

By 2009, JavaScript was being used for applications far more complex than its original design intended. Google Maps, Gmail, and early social networks were running thousands of lines of JavaScript. The problems were becoming critical:

- Accidental global variables caused mysterious bugs
- No native JSON parsing was a security and performance nightmare
- Working with object properties was primitive
- No standard way to protect object properties from modification
- Arrays lacked the functional methods that made code clean

ES5 addressed all of these without breaking existing code — everything in ES5 is backward-compatible with ES3.

---

### 4.2 `"use strict"` — Opt-In to Safer JavaScript

Strict mode is applied by adding the string `"use strict"` at the top of a file or function. It activates a stricter interpretation of the code and converts many silent errors into thrown exceptions.

```javascript
"use strict"; // File-level strict mode

// Now these cause errors instead of silent failures:
x = 10;           // ReferenceError: x is not defined (no var/let/const)
delete x;         // SyntaxError: can't delete a variable
var obj = {};
Object.freeze(obj);
obj.newProp = "test"; // TypeError: cannot add to frozen object

// Function-level strict mode:
function strictFunction() {
  "use strict";
  y = 5; // ReferenceError — only affects this function
}

function normalFunction() {
  z = 5; // Still creates a global in non-strict mode
}
```

**What strict mode prevents:**

| Bad Code | ES3 Behaviour | Strict Mode Behaviour |
|----------|---------------|----------------------|
| `x = 5` (no declaration) | Creates global variable | `ReferenceError` |
| `delete varName` | Silently fails | `SyntaxError` |
| Duplicate param names | Allowed | `SyntaxError` |
| `with` statement | Works (confusingly) | `SyntaxError` |
| `this` in functions | Is `window` | Is `undefined` |
| Writing to read-only property | Silently fails | `TypeError` |
| Octal literals `0777` | Allowed | `SyntaxError` |

> 💡 **Important context:** ES6 modules are automatically in strict mode. Class bodies are also automatically in strict mode. So in modern JavaScript, you rarely need to write `"use strict"` explicitly — but understanding it is essential for reading older code and understanding why the language behaves the way it does.

---

### 4.3 `JSON.parse()` and `JSON.stringify()` — Native JSON Support

Before ES5, JSON (JavaScript Object Notation) had no native browser support. Developers either used `eval()` (dangerous) or loaded Crockford's `json2.js` library.

ES5 built JSON handling directly into the language.

**`JSON.stringify()` — JavaScript value → JSON string:**

```javascript
// Simple object
let user = { name: "Tunde", age: 28, city: "Lagos" };
let json = JSON.stringify(user);
console.log(json);
// '{"name":"Tunde","age":28,"city":"Lagos"}'
console.log(typeof json); // "string"

// Pretty-print with indentation (third argument)
let pretty = JSON.stringify(user, null, 2);
console.log(pretty);
// {
//   "name": "Tunde",
//   "age": 28,
//   "city": "Lagos"
// }

// Array
let scores = [85, 92, 78];
console.log(JSON.stringify(scores)); // "[85,92,78]"

// Nested object
let order = {
  id: 101,
  customer: { name: "Tunde", email: "t@example.com" },
  items: ["Laptop", "Mouse"],
  total: 462000
};
console.log(JSON.stringify(order, null, 2));
```

**What `JSON.stringify()` cannot handle:**

```javascript
let obj = {
  name:     "Tunde",
  fn:       function() {},        // Functions → omitted
  undef:    undefined,            // undefined → omitted
  sym:      Symbol("id"),         // Symbols → omitted
  circular: null                  // Circular references → TypeError
};

console.log(JSON.stringify(obj));
// '{"name":"Tunde"}' ← only serialisable properties remain
```

**`JSON.parse()` — JSON string → JavaScript value:**

```javascript
let jsonString = '{"name":"Tunde","age":28,"scores":[85,92,78]}';
let parsed = JSON.parse(jsonString);

console.log(parsed.name);       // "Tunde"
console.log(parsed.scores[1]); // 92
console.log(typeof parsed);    // "object"

// With a reviver function — transform values during parsing
let withDates = '{"name":"Tunde","joined":"2024-01-15"}';
let result = JSON.parse(withDates, (key, value) => {
  if (key === "joined") return new Date(value); // Convert string to Date
  return value;
});
console.log(result.joined instanceof Date); // true
console.log(result.joined.getFullYear());   // 2024
```

**Real-world use — API communication:**

```javascript
// Every API call uses these methods
async function saveUser(user) {
  let response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user) // ← ES5 JSON.stringify
  });
  return JSON.parse(await response.text()); // ← ES5 JSON.parse
  // (or response.json() which calls JSON.parse internally)
}
```

---

### 4.4 ES5 Array Methods — The Functional Revolution

Before ES5, processing arrays required manual `for` loops. ES5 added ten methods that made array processing declarative and expressive.

**`Array.forEach()` — Iterate with a callback:**

```javascript
// ES3 — manual loop
var names = ["Alice", "Bob", "Carol"];
for (var i = 0; i < names.length; i++) {
  console.log(names[i]);
}

// ES5 — forEach
names.forEach(function(name, index) {
  console.log(index + ": " + name);
});
// 0: Alice  1: Bob  2: Carol
```

**`Array.map()` — Transform each element:**

```javascript
var prices = [100, 250, 80, 310];

// Increase all prices by 10%
var increased = prices.map(function(price) {
  return price * 1.1;
});
console.log(increased); // [110, 275, 88, 341]

// Note: map() does NOT modify the original array
console.log(prices); // [100, 250, 80, 310] — unchanged
```

**`Array.filter()` — Keep matching elements:**

```javascript
var products = [
  { name: "Laptop",   price: 450000, inStock: true  },
  { name: "Mouse",    price: 8000,   inStock: true  },
  { name: "Monitor",  price: 180000, inStock: false },
  { name: "Keyboard", price: 12000,  inStock: true  }
];

var affordable = products.filter(function(p) {
  return p.price <= 15000 && p.inStock;
});
console.log(affordable.map(function(p) { return p.name; }));
// ["Mouse", "Keyboard"]
```

**`Array.reduce()` — Accumulate to a single value:**

```javascript
var cart = [
  { name: "Laptop",   price: 450000, qty: 1 },
  { name: "Mouse",    price: 8000,   qty: 2 },
  { name: "Keyboard", price: 12000,  qty: 1 }
];

var total = cart.reduce(function(accumulator, item) {
  return accumulator + (item.price * item.qty);
}, 0); // 0 is the initial value of accumulator

console.log("Total: ₦" + total.toLocaleString()); // Total: ₦478,000
```

**`Array.indexOf()` — Find element position:**

```javascript
var fruits = ["mango", "pear", "pineapple", "mango"];

console.log(fruits.indexOf("pear"));      // 1
console.log(fruits.indexOf("mango"));     // 0 — first occurrence
console.log(fruits.indexOf("guava"));     // -1 — not found
console.log(fruits.lastIndexOf("mango")); // 3 — last occurrence
```

**`Array.every()` and `Array.some()`:**

```javascript
var scores = [75, 82, 90, 68, 88];

// every() — true only if ALL elements pass
var allPassed = scores.every(function(score) { return score >= 60; });
console.log(allPassed); // true — all scores are 60 or above

// some() — true if AT LEAST ONE element passes
var anyExcellent = scores.some(function(score) { return score >= 90; });
console.log(anyExcellent); // true — 90 exists in the array
```

**`Array.isArray()` — Reliably check for arrays:**

```javascript
// Before ES5 — typeof [] returns "object", making it hard to check
console.log(typeof []);         // "object" — not helpful!
console.log(typeof {});         // "object" — same as array!

// ES5 — Array.isArray() is definitive
console.log(Array.isArray([]));   // true
console.log(Array.isArray({}));   // false
console.log(Array.isArray("hi")); // false
```

**`Array.indexOf()` for strings:**

```javascript
var text = "Hello, JavaScript World!";
console.log(text.indexOf("JavaScript")); // 7  — position of first char
console.log(text.indexOf("Python"));     // -1 — not found
```

---

### 4.5 `Object.create()` — Cleaner Prototype-Based Inheritance

`Object.create(proto)` creates a new object whose prototype is the specified object. This enables clean prototypal inheritance without `new` constructors.

```javascript
// ES3 prototype inheritance — clunky
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return this.name + " makes a sound.";
};

// ES5 Object.create — cleaner prototypal inheritance
var animalPrototype = {
  speak: function() {
    return this.name + " makes a sound.";
  },
  eat: function() {
    return this.name + " is eating.";
  }
};

var dog = Object.create(animalPrototype);
dog.name = "Rex";
console.log(dog.speak());                          // "Rex makes a sound."
console.log(Object.getPrototypeOf(dog) === animalPrototype); // true

// Create with null prototype — no inherited properties
var pureObj = Object.create(null);
pureObj.key = "value";
// pureObj has NO toString, hasOwnProperty, etc. — truly bare
```

---

### 4.6 Property Descriptors — Fine-Grained Object Control

ES5 introduced the ability to define objects with controlled properties — making some read-only, non-enumerable, or non-configurable.

**`Object.defineProperty()` — Define or modify a single property:**

```javascript
var user = {};

Object.defineProperty(user, "id", {
  value: 42,
  writable:     false,  // Cannot be changed after set
  enumerable:   false,  // Does not appear in for...in or Object.keys()
  configurable: false   // Cannot be redefined or deleted
});

console.log(user.id);  // 42
user.id = 99;          // Silently fails (or TypeError in strict mode)
console.log(user.id);  // 42 — unchanged
console.log(Object.keys(user)); // [] — id is non-enumerable

// Getters and setters with defineProperty
var temperature = {};
var _celsius = 0;

Object.defineProperty(temperature, "celsius", {
  get: function() { return _celsius; },
  set: function(value) {
    if (value < -273.15) throw new RangeError("Temperature below absolute zero!");
    _celsius = value;
  },
  enumerable: true,
  configurable: true
});

temperature.celsius = 25;
console.log(temperature.celsius); // 25
temperature.celsius = -300;       // RangeError: Temperature below absolute zero!
```

**`Object.freeze()` — Make an object immutable:**

```javascript
var config = Object.freeze({
  apiUrl:  "https://api.example.com",
  timeout: 3000,
  retries: 3
});

config.apiUrl = "https://attacker.com"; // Silently fails (TypeError in strict mode)
config.newProp = "hacked";              // Also fails
console.log(config.apiUrl); // "https://api.example.com" — unchanged
console.log(Object.isFrozen(config));   // true
```

> 💡 **Note:** `Object.freeze()` is **shallow** — only the top level is frozen. Nested objects can still be modified. For deep freezing, you need a recursive function.

**`Object.keys()` — Get an array of enumerable own property names:**

```javascript
var car = {
  brand: "Toyota",
  model: "Camry",
  year:  2023
};

console.log(Object.keys(car));  // ["brand", "model", "year"]

// Iterate over an object's properties (ES5 style)
Object.keys(car).forEach(function(key) {
  console.log(key + ": " + car[key]);
});
// brand: Toyota  model: Camry  year: 2023
```

**`Object.seal()` — Allow updates, prevent structure changes:**

```javascript
// Object.seal() prevents adding or deleting properties,
// but existing properties can still be changed

var settings = Object.seal({
  theme: "light",
  lang:  "en"
});

settings.theme = "dark";   // ✅ Allowed — modifying existing property
settings.font = "Arial";   // ❌ Silently fails — adding new property
delete settings.lang;      // ❌ Silently fails — deleting property

console.log(settings); // { theme: "dark", lang: "en" }
```

---

### 4.7 ES5 `Function.bind()` — Fix the `this` Problem

One of JavaScript's most confusing behaviours was the unpredictable value of `this` inside functions. `bind()` permanently attaches a `this` context to a function.

```javascript
var user = {
  name: "Tunde",
  greet: function() {
    return "Hello, I am " + this.name;
  }
};

// The this problem:
var greetFn = user.greet;
console.log(greetFn()); // "Hello, I am undefined" — this is window/global, not user

// ES5 bind() — fix this permanently
var boundGreet = user.greet.bind(user);
console.log(boundGreet()); // "Hello, I am Tunde" ✅

// bind() with pre-set arguments (partial application)
function multiply(a, b) {
  return a * b;
}
var double = multiply.bind(null, 2); // Pre-set first argument to 2
console.log(double(5));  // 10
console.log(double(8));  // 16
console.log(double(15)); // 30
```

**Real-world use — event handlers in ES5 OOP:**

```javascript
function Counter() {
  this.count = 0;
  this.increment = this.increment.bind(this); // Fix `this` for event use
}

Counter.prototype.increment = function() {
  this.count++;
  console.log("Count:", this.count);
};

var counter = new Counter();
document.getElementById("btn").addEventListener("click", counter.increment);
// Without .bind(this), `this` inside increment would be the button element!
```

---

### 4.8 ES5 `String` and `Date` Improvements

**`String.trim()`:**

```javascript
var input = "   Hello World   ";
console.log(input.trim()); // "Hello World"

// Essential for processing form input
function processFormInput(raw) {
  return raw.trim();
}
```

**`Date.now()`:**

```javascript
// ES5 — simpler way to get current timestamp in milliseconds
var timestamp = Date.now();
console.log(timestamp); // e.g., 1700000000000

// Before ES5:
var old = new Date().getTime(); // Same result, more verbose
```

---

### 4.9 ES5 Feature Summary

| Feature | What It Does |
|---------|-------------|
| `"use strict"` | Strict mode — catches silent errors as exceptions |
| `JSON.parse()` | JSON string → JavaScript value |
| `JSON.stringify()` | JavaScript value → JSON string |
| `Array.forEach()` | Execute callback for each element |
| `Array.map()` | Transform array elements |
| `Array.filter()` | Keep matching elements |
| `Array.reduce()` | Accumulate to a single value |
| `Array.indexOf()` | Find element position |
| `Array.every()` | True if all elements match |
| `Array.some()` | True if any element matches |
| `Array.isArray()` | Reliably detect arrays |
| `Object.create()` | Create object with specified prototype |
| `Object.keys()` | Array of own enumerable property names |
| `Object.defineProperty()` | Fine-grained property control |
| `Object.freeze()` | Make object immutable |
| `Object.seal()` | Allow updates, prevent structural changes |
| `Function.bind()` | Fix `this` context permanently |
| `String.trim()` | Remove surrounding whitespace |
| `Date.now()` | Current timestamp in milliseconds |

---

## 5. ES6 / ES2015 — The Modern Language Transformation

### 5.1 Why ES6 Was the Biggest Release Ever

ES6 (June 2015) was the result of six years of work reconciling the failed ES4 proposal with what the web actually needed. It contained more new features than all previous versions combined. It didn't just add to JavaScript — it fundamentally changed how JavaScript is written and taught.

Every modern JavaScript tutorial, every React component, every Node.js server uses ES6+ syntax. If ES5 was JavaScript "growing up," ES6 was JavaScript becoming a modern, professional-grade language.

---

### 5.2 `let` and `const` — Fixing Variable Scope

`let` and `const` provide **block-level scoping** — the behaviour developers expected from day one but didn't get with `var`.

```javascript
// var — function scoped, hoisted, re-declarable (the source of many bugs)
function varDemo() {
  console.log(x); // undefined — hoisted!
  var x = 10;
  if (true) {
    var x = 20; // Re-declares and overwrites the outer x
    console.log(x); // 20
  }
  console.log(x); // 20 — the if-block's x leaked out!
}

// let — block scoped, not hoisted to usable state, not re-declarable
function letDemo() {
  // console.log(y); // ReferenceError — Temporal Dead Zone
  let y = 10;
  if (true) {
    let y = 20; // New y, scoped to this block only
    console.log(y); // 20
  }
  console.log(y); // 10 — outer y unchanged ✅
}

// const — block scoped, binding cannot be reassigned
const PI = 3.14159;
PI = 3; // TypeError: Assignment to constant variable

const config = { theme: "dark" };
config.theme = "light"; // ✅ Object contents can change
config = {};            // ❌ TypeError — the binding cannot change
```

**Rule of thumb (modern JS):**
1. Use `const` by default
2. Upgrade to `let` only when you need to reassign
3. Never use `var` in new code

---

### 5.3 Arrow Functions `=>` — Concise and Lexically Scoped `this`

Arrow functions provide a shorter syntax and — critically — inherit `this` from their enclosing scope rather than having their own `this` context.

```javascript
// ES5 function
var double = function(x) { return x * 2; };

// ES6 arrow function
const double2 = x => x * 2;

// Multiple parameters require parentheses
const add = (a, b) => a + b;

// Multi-line body requires braces and explicit return
const processUser = (user) => {
  const name = user.name.toUpperCase();
  const email = user.email.toLowerCase();
  return { name, email };
};

// No parameters — empty parentheses
const getTimestamp = () => Date.now();
```

**The critical `this` difference:**

```javascript
// ES5 — `this` problem in callbacks
function Timer() {
  this.seconds = 0;
  var self = this; // Classic ES5 workaround — save `this` reference

  setInterval(function() {
    self.seconds++; // Must use `self` because `this` here is window
    console.log(self.seconds);
  }, 1000);
}

// ES6 — arrow function inherits `this` from Timer
function Timer2() {
  this.seconds = 0;

  setInterval(() => {
    this.seconds++; // `this` is the Timer2 instance ✅
    console.log(this.seconds);
  }, 1000);
}
```

**Arrow functions in array methods:**

```javascript
const products = [
  { name: "Laptop",   price: 450000 },
  { name: "Mouse",    price: 8000   },
  { name: "Keyboard", price: 12000  }
];

// ES5
var names = products.map(function(p) { return p.name; });
var cheap = products.filter(function(p) { return p.price < 15000; });

// ES6
const names2 = products.map(p => p.name);
const cheap2  = products.filter(p => p.price < 15000);
const total   = products.reduce((sum, p) => sum + p.price, 0);

console.log(names2); // ["Laptop", "Mouse", "Keyboard"]
console.log(cheap2.map(p => p.name)); // ["Mouse", "Keyboard"]
console.log(total);  // 470000
```

---

### 5.4 Template Literals — String Interpolation

Template literals (backtick strings) allow embedded expressions and multi-line strings.

```javascript
const name    = "Tunde";
const balance = 50000;
const date    = "2024-01-15";

// ES5 concatenation — error-prone and hard to read
var msg1 = "Dear " + name + ",\nYour balance as of " + date + " is ₦" + balance.toLocaleString() + ".";

// ES6 template literal — clean, readable, multi-line
const msg2 = `Dear ${name},
Your balance as of ${date} is ₦${balance.toLocaleString()}.`;

console.log(msg2);
// Dear Tunde,
// Your balance as of 2024-01-15 is ₦50,000.

// Expressions inside ${}
const a = 10, b = 3;
console.log(`${a} + ${b} = ${a + b}`);   // 10 + 3 = 13
console.log(`${a} > ${b}: ${a > b}`);    // 10 > 3: true
console.log(`${name.toUpperCase()}`);    // TUNDE
```

**Tagged template literals — advanced:**

```javascript
// A tag function receives the template parts and values separately
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? `<b>${values[i]}</b>` : "");
  }, "");
}

const product = "Laptop";
const price   = 450000;
const html = highlight`Item: ${product}, Price: ₦${price.toLocaleString()}`;
console.log(html);
// Item: <b>Laptop</b>, Price: ₦<b>450,000</b>
```

---

### 5.5 Destructuring — Extract Values Cleanly

**Array destructuring:**

```javascript
// ES5
var arr = [10, 20, 30];
var first  = arr[0];
var second = arr[1];
var third  = arr[2];

// ES6 — array destructuring
const [first2, second2, third2] = [10, 20, 30];
console.log(first2, second2, third2); // 10 20 30

// Skip elements
const [,, thirdOnly] = [10, 20, 30];
console.log(thirdOnly); // 30

// Default values
const [a = 0, b = 0, c = 0, d = 0] = [10, 20];
console.log(a, b, c, d); // 10 20 0 0

// Swap variables without temp
let x = 5, y = 10;
[x, y] = [y, x];
console.log(x, y); // 10 5

// From function return
function getCoordinates() { return [51.5074, -0.1278]; }
const [latitude, longitude] = getCoordinates();
```

**Object destructuring:**

```javascript
const user = {
  id:    1,
  name:  "Tunde",
  email: "tunde@example.com",
  role:  "admin",
  address: { city: "Lagos", country: "Nigeria" }
};

// ES5
var userName = user.name;
var userRole = user.role;

// ES6 — object destructuring
const { name, role } = user;
console.log(name, role); // "Tunde" "admin"

// Rename while destructuring
const { name: displayName, email: contactEmail } = user;
console.log(displayName);  // "Tunde"
console.log(contactEmail); // "tunde@example.com"

// Default values
const { name: n, department = "Engineering" } = user;
console.log(department); // "Engineering" — default because user has no department

// Nested destructuring
const { address: { city, country } } = user;
console.log(city, country); // "Lagos" "Nigeria"

// In function parameters
function displayUser({ name, role, address: { city } = {} }) {
  console.log(`${name} (${role}) — ${city}`);
}
displayUser(user); // "Tunde (admin) — Lagos"
```

---

### 5.6 Default Parameters

```javascript
// ES5 — manual default handling
function greet(name, greeting) {
  name     = name     || "Guest";
  greeting = greeting || "Hello";
  return greeting + ", " + name + "!";
}

// ES6 — default parameters
function greet2(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greet2());                     // "Hello, Guest!"
console.log(greet2("Tunde"));              // "Hello, Tunde!"
console.log(greet2("Tunde", "Welcome"));   // "Welcome, Tunde!"

// Default can reference earlier parameters
function createRange(start = 0, end = start + 10) {
  return { start, end };
}
console.log(createRange());        // { start: 0, end: 10 }
console.log(createRange(5));       // { start: 5, end: 15 }
console.log(createRange(5, 100));  // { start: 5, end: 100 }
```

---

### 5.7 Rest and Spread Operators

**Rest `...` — collect remaining arguments/elements:**

```javascript
// Rest in function parameters
function sum(first, second, ...rest) {
  console.log("First:", first);
  console.log("Second:", second);
  console.log("Rest:", rest); // Real array — can use all Array methods!
  return first + second + rest.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // First:1 Second:2 Rest:[3,4,5] → 15

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

const { name, ...details } = { name: "Tunde", age: 28, city: "Lagos" };
console.log(name);    // "Tunde"
console.log(details); // { age: 28, city: "Lagos" }
```

**Spread `...` — expand iterable into individual elements:**

```javascript
// Spread in function calls
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(Math.max(...numbers)); // 9 — spread as individual arguments

// Copy and merge arrays
const a = [1, 2, 3];
const b = [4, 5, 6];
const merged = [...a, ...b]; // [1, 2, 3, 4, 5, 6]
const copy = [...a];          // [1, 2, 3] — independent copy

// Copy and merge objects
const defaults = { theme: "light", lang: "en" };
const overrides = { theme: "dark" };
const config = { ...defaults, ...overrides }; // { theme: "dark", lang: "en" }
```

---

### 5.8 Classes — Cleaner OOP Syntax

ES6 classes provide clean syntax over JavaScript's prototype system. They are syntactic sugar — under the hood, prototypes still do the work.

```javascript
// ES5 — prototype-based OOP (verbose and fragile)
function Animal(name, sound) {
  this.name  = name;
  this.sound = sound;
}
Animal.prototype.speak = function() {
  return this.name + " says " + this.sound;
};

// ES6 — class syntax (clean and familiar)
class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} says ${this.sound}`;
  }

  static kingdom() {
    return "Animalia"; // Static method — called on class, not instance
  }
}

// Inheritance with extends
class Dog extends Animal {
  constructor(name) {
    super(name, "woof"); // Call parent constructor
  }

  fetch(item) {
    return `${this.name} fetches the ${item}!`;
  }
}

const rex = new Dog("Rex");
console.log(rex.speak());         // "Rex says woof"
console.log(rex.fetch("ball"));   // "Rex fetches the ball!"
console.log(Animal.kingdom());    // "Animalia"
console.log(rex instanceof Dog);  // true
console.log(rex instanceof Animal); // true — inheritance chain works
```

---

### 5.9 Promises — Structured Asynchronous Code

Promises represent a value that may be available now, later, or never. They replaced callback hell with a chainable pattern.

```javascript
// A Promise has three states: pending → fulfilled OR rejected
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.startsWith("https")) {
        resolve({ data: "Success!", url });
      } else {
        reject(new Error("Only HTTPS URLs supported"));
      }
    }, 200);
  });
}

// Using a Promise
fetchData("https://api.example.com")
  .then(result  => {
    console.log("Data:", result.data);
    return result.url; // Return passes value to next .then()
  })
  .then(url     => console.log("URL:", url))
  .catch(error  => console.error("Error:", error.message))
  .finally(()   => console.log("Request complete"));

// Chaining avoids callback pyramid:
fetchUser(1)
  .then(user   => fetchOrders(user.id))
  .then(orders => fetchShipping(orders[0].id))
  .then(ship   => console.log("Status:", ship.status))
  .catch(err   => console.error(err));
```

---

### 5.10 Modules — Official Import/Export

ES6 modules allow splitting code across files with a clear interface contract.

```javascript
// math.js — named exports
export const PI = 3.14159;
export function area(r) { return PI * r * r; }
export function circumference(r) { return 2 * PI * r; }

// utils.js — default export
export default function formatCurrency(amount, currency = "NGN") {
  return `${currency} ${amount.toLocaleString()}`;
}

// app.js — importing
import formatCurrency from "./utils.js";         // Default import
import { PI, area } from "./math.js";            // Named imports
import { area as circleArea } from "./math.js";  // Rename on import
import * as MathUtils from "./math.js";          // Import everything as namespace

console.log(PI);                          // 3.14159
console.log(area(5));                     // 78.53975
console.log(MathUtils.circumference(5));  // 31.4159
console.log(formatCurrency(50000));       // "NGN 50,000"
```

---

### 5.11 `Map` and `Set` — Purpose-Built Data Structures

```javascript
// Map — key-value pairs with ANY key type
const userSessions = new Map();
const user1 = { id: 1, name: "Tunde" };
const user2 = { id: 2, name: "Alice" };

userSessions.set(user1, { loginTime: Date.now(), page: "/dashboard" });
userSessions.set(user2, { loginTime: Date.now(), page: "/settings"  });

console.log(userSessions.get(user1).page); // "/dashboard"
console.log(userSessions.size);            // 2

// Map iteration
for (const [user, session] of userSessions) {
  console.log(`${user.name}: ${session.page}`);
}

// Set — unique values only
const tags = new Set(["javascript", "react", "javascript", "nodejs", "react"]);
console.log(tags);       // Set(3) {"javascript", "react", "nodejs"} — duplicates removed
console.log(tags.size);  // 3

tags.add("typescript");
tags.delete("react");

// Convert to array
const tagArray = [...tags];
console.log(tagArray); // ["javascript", "nodejs", "typescript"]

// Classic use: remove duplicates from an array
const ids = [1, 2, 3, 2, 1, 4, 3, 5];
const uniqueIds = [...new Set(ids)];
console.log(uniqueIds); // [1, 2, 3, 4, 5]
```

---

### 5.12 Symbols — Unique Identifiers

`Symbol` creates a guaranteed-unique value. No two symbols are ever equal, even if they have the same description.

```javascript
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);           // false — always unique
console.log(typeof id1);            // "symbol"
console.log(id1.toString());        // "Symbol(id)"
console.log(id1.description);       // "id"

// Primary use: unique object keys that don't conflict
const USER_ID = Symbol("userId");
const user = {
  name: "Tunde",
  [USER_ID]: 42  // Symbol as computed key
};

console.log(user[USER_ID]); // 42
console.log(user.name);     // "Tunde"

// Symbols don't appear in for...in or JSON.stringify
for (let key in user) {
  console.log(key); // Only "name" — USER_ID is hidden
}
console.log(JSON.stringify(user)); // '{"name":"Tunde"}' — Symbol omitted

// Well-known Symbols — used to customise object behaviour
class Range {
  constructor(start, end) {
    this.start = start;
    this.end   = end;
  }
  [Symbol.iterator]() { // Make Range iterable with for...of
    let current = this.start;
    const end   = this.end;
    return {
      next() {
        return current <= end
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }
}

for (let n of new Range(1, 5)) {
  console.log(n); // 1 2 3 4 5
}
```

---

### 5.13 Generators — Pausable Functions

Generator functions (`function*`) can be paused mid-execution and resumed, yielding values one at a time.

```javascript
function* countUp(start = 0) {
  while (true) {
    yield start++;
  }
}

const counter = countUp(1);
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
console.log(counter.next().value); // 3

// Finite generator
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
const first10 = Array.from({ length: 10 }, () => fib.next().value);
console.log(first10);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

### 5.14 ES6 Feature Summary

| Feature | Replaces / Improves |
|---------|---------------------|
| `let` / `const` | `var` — block scoping |
| Arrow functions `=>` | `function` — concise + lexical `this` |
| Template literals `` ` `` | String concatenation |
| Destructuring | Manual property/index access |
| Default parameters | `param = param || default` patterns |
| Rest `...args` | `arguments` object |
| Spread `...arr` | `apply()` and `concat()` patterns |
| `class` syntax | Constructor functions + prototype chains |
| Promises | Callback-based async patterns |
| `import`/`export` | IIFE module patterns, script loading order |
| `Map`/`Set` | Plain objects used as maps; manual deduplication |
| `Symbol` | String-keyed properties that might collide |
| Generators | Manual iterator implementations |
| `for...of` | Manual loops over iterables |
| `WeakMap`/`WeakSet` | Memory-leaking associations |

---

## 6. IE and Edge — The Browser Compatibility Story

### 6.1 Internet Explorer: The Villain of Web Development

**Internet Explorer (IE)** was Microsoft's web browser from 1995 to 2022. At its peak in 2003, IE had over **95% market share**. For years, "write JavaScript" and "make IE work" were inseparable challenges.

**Why IE was so difficult:**
- Microsoft had their own implementation called **JScript** that diverged from the standard
- IE was notoriously slow to adopt new ECMAScript standards
- Each version of IE had its own bugs, inconsistencies, and proprietary features
- The browser was bundled with Windows, so users didn't update even when better options existed
- Corporate environments locked to IE6 or IE8 persisted for over a decade after those versions were obsolete

---

### 6.2 The IE Version Timeline and JavaScript Support

| IE Version | Released | Key JS Limitations |
|-----------|----------|-------------------|
| IE 6 | 2001 | ES3 only. Rampant bugs. ActiveX. |
| IE 7 | 2006 | Still ES3. Minor fixes. No canvas. |
| IE 8 | 2009 | ES3 only. Partial ES5. No JSON natively. No canvas. |
| IE 9 | 2011 | First canvas support. Still limited ES5. |
| IE 10 | 2012 | Better ES5 support. WebSockets. |
| IE 11 | 2013 | Full ES5. Partial ES6 (no arrow functions, no let/const). |

**IE 11's ES6 support gaps (the developer nightmare):**

IE 11 was the last version of IE and the one developers had to support the longest. Even though ES6 was published in 2015, IE 11 did not support:
- `let` and `const` (partially, with bugs)
- Arrow functions `=>`
- Template literals
- Destructuring
- Default parameters
- Rest/spread operators
- `class` syntax
- Promises
- `Map`/`Set` (partially)
- `import`/`export` modules
- Generator functions

This is exactly why tools like **Babel** and **webpack** became essential — they transpile modern ES6+ code into IE-compatible ES5.

---

### 6.3 Microsoft Edge — The Replacement

In 2015, Microsoft released **Microsoft Edge** as a replacement for IE. The original Edge used Microsoft's own rendering engine ("EdgeHTML"). In 2019, Microsoft made a major decision: **rebuild Edge on the Chromium engine** (the same open-source engine that powers Chrome).

| Edge Version | Engine | ES6 Support |
|-------------|--------|------------|
| Edge (Legacy, 2015–2019) | EdgeHTML | Partial ES6 |
| Edge (Chromium, 2020+) | Blink/V8 | Full modern JS |

**The retirement of IE:**
- **June 15, 2022:** Microsoft officially ended support for IE 11 on Windows 10
- IE was removed from Windows 11 entirely
- Enterprise users were migrated to Edge with IE Mode for legacy apps

---

### 6.4 Browser Feature Detection vs Browser Detection

The old way to handle browser differences was **browser detection** — checking which browser the user had and writing different code paths:

```javascript
// ❌ Browser detection — fragile and bad practice
if (navigator.userAgent.indexOf("MSIE") !== -1) {
  // IE-specific code
  var xhr = new ActiveXObject("Microsoft.XMLHTTP");
} else {
  // Modern browser code
  var xhr = new XMLHttpRequest();
}
```

**Problems with this approach:**
- User agent strings can be faked
- New browser versions break the detection logic
- You're assuming what features a browser has based on its name — wrong

The modern approach is **feature detection** — checking whether the specific feature you need actually exists:

```javascript
// ✅ Feature detection — checks for capability, not identity
if (typeof window.fetch === "function") {
  // fetch API is available — use it
  fetch("/api/data").then(r => r.json()).then(console.log);
} else {
  // fetch not available — use XMLHttpRequest fallback
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/data");
  xhr.onload = function() { console.log(JSON.parse(xhr.responseText)); };
  xhr.send();
}

// Feature detect ES6 features
if (typeof Symbol === "function") {
  console.log("ES6 Symbols supported");
}

if (typeof Promise === "function") {
  console.log("Promises supported");
}
```

---

### 6.5 Polyfills — Backfilling Missing Features

A **polyfill** is code that implements a modern feature for older browsers that don't have it natively. The name comes from "Polyfilla" — a British wall-filler product that smooths over cracks and holes.

```javascript
// Polyfill for Array.from() — not in IE
if (!Array.from) {
  Array.from = function(arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  };
}

// Polyfill for String.prototype.includes()
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    return this.indexOf(search, start) !== -1;
  };
}

// Polyfill for Promise (simplified — real polyfills are much more complex)
// Libraries like `promise-polyfill` provide full implementations
if (typeof Promise === "undefined") {
  // Load a Promise polyfill
}
```

**Popular polyfill libraries:**
- **core-js** — the most comprehensive JavaScript polyfill library
- **Babel polyfill** — uses core-js under the hood
- **es6-promise** — Promise-only polyfill

---

### 6.6 Transpilation with Babel — Write Modern, Deploy Everywhere

**Babel** is a JavaScript **compiler** (transpiler) that converts modern JavaScript (ES6+) into older JavaScript (ES5) that runs in older browsers.

```javascript
// ES6 code you write:
const greet = (name = "Guest") => `Hello, ${name}!`;

// What Babel transpiles it to (ES5 output):
"use strict";
var greet = function greet() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Guest";
  return "Hello, " + name + "!";
};
```

```javascript
// ES6 class
class Animal {
  constructor(name) { this.name = name; }
  speak() { return `${this.name} speaks`; }
}

// Babel output (ES5):
"use strict";
function _classCallCheck(instance, Constructor) { /* ... */ }
var Animal = function() {
  function Animal(name) {
    _classCallCheck(this, Animal);
    this.name = name;
  }
  Animal.prototype.speak = function speak() {
    return this.name + " speaks";
  };
  return Animal;
}();
```

**How Babel fits in a modern project:**

```
Your Code (ES6+)
      ↓
  Babel (transpiler)
      ↓
 Bundler (webpack/Vite)
      ↓
Polyfills (core-js)
      ↓
 Minifier (terser)
      ↓
 Output: bundle.js
(ES5 compatible, minified)
      ↓
   Browser
```

---

### 6.7 Can I Use? — Checking Browser Support

The website **caniuse.com** shows which browsers support which features. Use it whenever you're unsure if a feature is safe to use.

**Example queries:**
- "CSS Grid" → shows which IE versions don't support it
- "Optional chaining" → shows it arrived in Chrome 80, Firefox 74, Safari 13.1, Edge 80
- "fetch API" → shows it's not in IE at all

**JavaScript-specific support tables:**
- **MDN Web Docs** → every feature page has a "Browser compatibility" table at the bottom
- **node.green** → shows which Node.js versions support which ES features
- **kangax.github.io/compat-table** → detailed ES5/ES6/ES2016+ support tables

---

### 6.8 The Modern Browser Landscape

As of 2024–2025, IE is gone. The modern browser landscape:

| Browser | Engine | ES Version Support |
|---------|--------|-------------------|
| Chrome 120+ | V8 | ES2024+ |
| Edge 120+ | V8 (Chromium-based) | ES2024+ |
| Firefox 120+ | SpiderMonkey | ES2024+ |
| Safari 17+ | JavaScriptCore | ES2023+ |
| Node.js 22+ | V8 | ES2024+ |
| Deno 1.40+ | V8 | ES2024+ |

**Practical implication for new projects:** If you are building for modern browsers (and most new projects should be), you can use ES2020+ features without any transpilation. Babel and polyfills are now primarily needed only for:
1. Supporting older Safari versions
2. Using very bleeding-edge features (Stage 3 proposals)
3. Building libraries that need maximum compatibility

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — The ES3 → ES5 → ES6 Rewrite

**Objective:** Rewrite the same function three times — once in ES3 style, once in ES5, once in ES6 — observing how the language improved.

**The task:** A function that takes an array of order objects, filters to orders over ₦10,000, calculates a 5% tax on each, and returns the items sorted by total (including tax) ascending.

**ES3 Version (write this first):**

```javascript
// Write using: var, for loops, manual array building, no JSON
// Expected output: [{name:"Mouse",total:12600}, {name:"Keyboard",total:15750}]
// (using sample data below)

var orders = [
  { name: "Pen",      price: 500  },
  { name: "Notebook", price: 1200 },
  { name: "Mouse",    price: 12000},
  { name: "Keyboard", price: 15000}
];

// Your ES3 code here — use only: var, for, if, push, sort, manual math
```

**ES5 Version:**

```javascript
// Rewrite using: var/function, forEach/filter/map/reduce/sort, JSON.stringify
// No arrow functions, no template literals
```

**ES6 Version:**

```javascript
// Rewrite using: const/let, arrow functions, destructuring,
// template literals, method chaining
```

**Step-by-step instructions:**
1. Write the ES3 version first — no shortcuts allowed
2. Refactor to ES5 using array methods (no manual for loops)
3. Refactor to ES6 (full modern syntax)
4. Compare the three versions side-by-side — count the lines and note readability
5. Identify which ES3 version features needed the most rewriting

---

## Exercise 2 — Version Detective

**Objective:** Look at the following code snippets and identify which ES version (ES3, ES5, or ES6+) they were written for, based on the features used.

```javascript
// Snippet A
var total = 0;
for (var i = 0; i < items.length; i++) {
  total += items[i].price;
}
var discount = total > 50000 ? total * 0.1 : 0;
```

```javascript
// Snippet B
"use strict";
var filtered = products.filter(function(p) {
  return p.inStock && p.price >= 1000;
});
var names = filtered.map(function(p) { return p.name; });
console.log(JSON.stringify(names));
```

```javascript
// Snippet C
const { name, price, category = "General" } = product;
const tax = price * 0.075;
const summary = `${name} (${category}): ₦${(price + tax).toLocaleString()}`;
```

```javascript
// Snippet D
(function() {
  var privateData = {};
  window.DataStore = {
    set: function(key, val) { privateData[key] = val; },
    get: function(key) { return privateData[key]; }
  };
})();
```

```javascript
// Snippet E
const processOrders = async (userId) => {
  const { orders, ...meta } = await fetchUserData(userId);
  return orders
    .filter(o => o.status !== "cancelled")
    .flatMap(o => o.items)
    .toSorted((a, b) => b.price - a.price);
};
```

**For each snippet:**
1. Identify the ES version(s) it targets
2. List the specific features that make you certain
3. Identify any features that could NOT run in ES3
4. Write the oldest-compatible rewrite for snippet C (make it ES3 compatible)

---

## Exercise 3 — Polyfill Writing

**Objective:** Implement ES5 methods from scratch to understand how they work internally.

**Task — implement these three methods:**

```javascript
// 1. Array.prototype.myMap — behaves exactly like Array.map()
Array.prototype.myMap = function(callback) {
  // Your implementation here — no built-in map() allowed
};

// Test:
console.log([1, 2, 3].myMap(x => x * 2)); // [2, 4, 6]
console.log([1, 2, 3].myMap((x, i) => x + i)); // [1, 3, 5]

// 2. Array.prototype.myFilter — behaves exactly like Array.filter()
Array.prototype.myFilter = function(callback) {
  // Your implementation
};

// Test:
console.log([1,2,3,4,5].myFilter(x => x % 2 === 0)); // [2, 4]

// 3. Array.prototype.myReduce — behaves exactly like Array.reduce()
Array.prototype.myReduce = function(callback, initialValue) {
  // Your implementation — handle the case where initialValue is omitted
};

// Test:
console.log([1,2,3,4,5].myReduce((acc, x) => acc + x, 0)); // 15
console.log([1,2,3,4,5].myReduce((acc, x) => acc + x));    // 15 (no initial value)
```

**Hints:**
- Each method takes a `callback(element, index, array)` signature
- `map` always returns an array of the same length
- `filter` returns a new array with only elements where callback returns truthy
- `reduce` without an initial value uses the first element as the accumulator and starts from index 1

---

## Exercise 4 — Babel Mental Transpiler

**Objective:** Manually "transpile" ES6+ code to ES5, as Babel would do.

**Transpile these ES6 snippets to ES5:**

```javascript
// ES6 Input 1 — Arrow function
const greet = name => `Hello, ${name}!`;

// ES5 Output: ???

// ES6 Input 2 — Destructuring with defaults
const { brand = "Unknown", model, year: productionYear } = car;

// ES5 Output: ???

// ES6 Input 3 — Class
class Rectangle {
  constructor(width, height) {
    this.width  = width;
    this.height = height;
  }
  get area() { return this.width * this.height; }
  toString() { return `${this.width} × ${this.height}`; }
}

// ES5 Output: ???

// ES6 Input 4 — Rest and spread
function logAll(first, ...rest) {
  console.log(first, ...rest);
}

// ES5 Output: ???
```

**Self-check:** After writing your ES5 versions, run both the ES6 and ES5 versions in a browser console and verify they produce identical output for the same inputs.

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: JavaScript Time Machine — Era-Aware Code Library

**Overview:** You will build a single utility library three times — once per major era (ES3, ES5, ES6+). The library handles a product catalogue with search, filtering, and display. By the end, you will have three files that do the same thing in completely different styles, demonstrating how the language evolved.

**Real-world connection:** Legacy code migration is one of the most common tasks in professional development. Every company with more than five years of JavaScript history has code spanning multiple eras. Being able to read, understand, and modernise old code is one of the most valuable skills a developer can have — and commands premium salaries.

---

### Stage 1 — The ES3 Version (The Original)

```javascript
// catalogue-es3.js — Written as if it's 2005
// No strict mode, no JSON, no array methods, no AJAX

var CATALOGUE = (function() {
  // Private data in IIFE scope
  var products = [
    { id: 1, name: "Laptop Pro",     price: 450000, category: "electronics", stock: 15 },
    { id: 2, name: "Office Chair",   price: 85000,  category: "furniture",   stock: 8  },
    { id: 3, name: "Wireless Mouse", price: 12000,  category: "electronics", stock: 42 },
    { id: 4, name: "Standing Desk",  price: 125000, category: "furniture",   stock: 5  },
    { id: 5, name: "Notebook A5",    price: 1200,   category: "stationery",  stock: 200}
  ];

  // Private helper — manual string padding (padStart doesn't exist in ES3)
  function padLeft(str, length, char) {
    str = String(str);
    char = char || " ";
    while (str.length < length) {
      str = char + str;
    }
    return str;
  }

  // Private helper — manual array filter
  function filterProducts(criteria) {
    var result = [];
    for (var i = 0; i < products.length; i++) {
      var p = products[i];
      var matches = true;

      if (criteria.category && p.category !== criteria.category) {
        matches = false;
      }
      if (criteria.maxPrice && p.price > criteria.maxPrice) {
        matches = false;
      }
      if (criteria.inStock && p.stock <= 0) {
        matches = false;
      }

      if (matches) {
        result.push(p);
      }
    }
    return result;
  }

  // Private helper — manual sort
  function sortByPrice(arr, ascending) {
    var sorted = arr.slice(0); // Copy the array
    sorted.sort(function(a, b) {
      return ascending ? a.price - b.price : b.price - a.price;
    });
    return sorted;
  }

  // Public API
  return {
    search: function(criteria) {
      return filterProducts(criteria || {});
    },

    sortedByPrice: function(ascending) {
      return sortByPrice(products, ascending !== false);
    },

    formatProduct: function(p) {
      var priceStr = padLeft("N" + p.price, 12);
      var nameStr  = p.name;
      while (nameStr.length < 20) { nameStr = nameStr + " "; }
      return nameStr + priceStr + " [" + p.stock + " in stock]";
    },

    printAll: function() {
      var all = this.search();
      for (var i = 0; i < all.length; i++) {
        // In a real ES3 app, this might write to the document
        // document.write(this.formatProduct(all[i]) + "<br>");
        // For our purposes, we use console.log
        var s = "";
        s += all[i].name;
        while (s.length < 20) s += " ";
        s += " - N" + all[i].price;
        var output = s;
        if (typeof console !== "undefined") {
          console.log(output);
        }
      }
    }
  };
})();

// Usage:
CATALOGUE.printAll();
var electronics = CATALOGUE.search({ category: "electronics", inStock: true });
```

---

### Stage 2 — The ES5 Refactor

```javascript
// catalogue-es5.js — Written as if it's 2012
// Uses: strict mode, JSON, array methods, Object.create, bind

"use strict";

var Catalogue = (function() {

  var PRODUCTS = Object.freeze([
    { id: 1, name: "Laptop Pro",     price: 450000, category: "electronics", stock: 15 },
    { id: 2, name: "Office Chair",   price: 85000,  category: "furniture",   stock: 8  },
    { id: 3, name: "Wireless Mouse", price: 12000,  category: "electronics", stock: 42 },
    { id: 4, name: "Standing Desk",  price: 125000, category: "furniture",   stock: 5  },
    { id: 5, name: "Notebook A5",    price: 1200,   category: "stationery",  stock: 200}
  ]);

  function CatalogueInstance(products) {
    this._products = products;
  }

  CatalogueInstance.prototype = {
    constructor: CatalogueInstance,

    search: function(criteria) {
      criteria = criteria || {};
      return this._products.filter(function(p) {
        if (criteria.category && p.category !== criteria.category) return false;
        if (criteria.maxPrice && p.price > criteria.maxPrice)      return false;
        if (criteria.inStock  && p.stock <= 0)                     return false;
        return true;
      });
    },

    getNames: function() {
      return this._products.map(function(p) { return p.name; });
    },

    getTotalValue: function() {
      return this._products.reduce(function(total, p) {
        return total + p.price;
      }, 0);
    },

    sortByPrice: function(ascending) {
      return this._products.slice(0).sort(function(a, b) {
        return ascending !== false ? a.price - b.price : b.price - a.price;
      });
    },

    formatProduct: function(p) {
      return JSON.stringify({
        name:     p.name,
        price:    "N" + p.price.toLocaleString(),
        category: p.category,
        inStock:  p.stock > 0
      }, null, 2);
    },

    printSummary: function() {
      var self = this;
      this._products.forEach(function(p) {
        var stockStatus = p.stock > 0 ? "(" + p.stock + " in stock)" : "(OUT OF STOCK)";
        console.log(p.name + " - N" + p.price.toLocaleString() + " " + stockStatus);
      });
      console.log("Total inventory value: N" + this.getTotalValue().toLocaleString());
    }
  };

  return new CatalogueInstance(PRODUCTS);
})();

// Usage:
Catalogue.printSummary();
var furniture = Catalogue.search({ category: "furniture" });
console.log("Furniture items:", furniture.map(function(p) { return p.name; }));
```

---

### Stage 3 — The ES6+ Modern Version

```javascript
// catalogue-es6.js — Written in 2024
// Full modern JavaScript

const PRODUCTS = Object.freeze([
  { id: 1, name: "Laptop Pro",     price: 450000, category: "electronics", stock: 15 },
  { id: 2, name: "Office Chair",   price: 85000,  category: "furniture",   stock: 8  },
  { id: 3, name: "Wireless Mouse", price: 12000,  category: "electronics", stock: 42 },
  { id: 4, name: "Standing Desk",  price: 125000, category: "furniture",   stock: 5  },
  { id: 5, name: "Notebook A5",    price: 1200,   category: "stationery",  stock: 200}
]);

class Catalogue {
  #products;

  constructor(products = PRODUCTS) {
    this.#products = [...products];
  }

  // ES2024: Object.groupBy
  get byCategory() {
    return Object.groupBy(this.#products, p => p.category);
  }

  // ES2023: toSorted (non-mutating)
  sortedByPrice(ascending = true) {
    return this.#products.toSorted((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
  }

  search({ category = null, maxPrice = Infinity, inStock = false } = {}) {
    return this.#products.filter(p =>
      (!category   || p.category === category) &&
      (p.price <= maxPrice) &&
      (!inStock    || p.stock > 0)
    );
  }

  get totalValue() {
    return this.#products.reduce((sum, p) => sum + p.price, 0);
  }

  // ES2022: at() for last element access
  get mostExpensive() { return this.sortedByPrice(false).at(0);  }
  get leastExpensive() { return this.sortedByPrice(true).at(0);  }

  formatProduct({ name, price, category, stock }) {
    const status = stock > 0 ? `${stock} in stock` : "OUT OF STOCK";
    return `${name.padEnd(20)} ₦${price.toLocaleString().padStart(10)}  [${status}]`;
  }

  printSummary() {
    console.log("=".repeat(55));
    console.log("PRODUCT CATALOGUE");
    console.log("=".repeat(55));

    this.#products.forEach(p => console.log(this.formatProduct(p)));

    console.log("─".repeat(55));
    console.log(`Total inventory value: ₦${this.totalValue.toLocaleString()}`);
    console.log(`Most expensive: ${this.mostExpensive.name}`);
    console.log(`Least expensive: ${this.leastExpensive.name}`);
  }

  // ES2025: Set methods for tag/category operations
  compareCategoryAvailability(cat1, cat2) {
    const names1 = new Set(this.search({ category: cat1 }).map(p => p.name));
    const names2 = new Set(this.search({ category: cat2 }).map(p => p.name));
    return {
      onlyInFirst:  [...names1.difference(names2)],
      onlyInSecond: [...names2.difference(names1)],
      inBoth:       [...names1.intersection(names2)]
    };
  }

  toJSON() {
    return {
      count:      this.#products.length,
      totalValue: this.totalValue,
      categories: Object.keys(this.byCategory),
      products:   this.#products
    };
  }
}

const catalogue = new Catalogue();
catalogue.printSummary();

const electronics = catalogue.search({ category: "electronics", inStock: true });
console.log("\nIn-stock electronics:");
electronics.forEach(p => console.log(`  ${p.name}`));

console.log("\nJSON export:");
console.log(JSON.stringify(catalogue.toJSON(), null, 2));
```

---

### Reflection Questions

1. **Looking at the three versions side-by-side, which specific ES3 limitation caused the most code complexity? Would that problem have been solved by ES5 alone, or did it require ES6?**

2. **The IIFE pattern in the ES3 and ES5 versions was the standard way to create modules for many years. ES6 modules replaced it. What are the advantages of `import`/`export` over the IIFE pattern for large codebases?**

3. **The ES5 version uses `"use strict"` but the ES3 version does not. What would break in the ES3 version if you added `"use strict"` to it?**

4. **Why did Microsoft's dominance with Internet Explorer actually *slow down* JavaScript's evolution? What economic and technical factors caused the ten-year gap between ES3 (1999) and ES5 (2009)?**

5. **Babel transforms ES6 classes back into ES5 prototype code. If the output is functionally identical, why do developers still prefer writing ES6 class syntax? What does this tell us about the purpose of syntactic sugar?**

6. **The `arguments` object in ES3/ES5 and the `...rest` parameter in ES6 both collect extra function arguments. Write a concrete example where `arguments` would fail and `...rest` would succeed — and explain why.**

---

### Advanced Challenges (Optional)

1. **Build a Babel-Lite:** Write a JavaScript function that takes a simple arrow function string like `"x => x * 2"` and returns the ES5 equivalent `"function(x) { return x * 2; }"`. Use regex and string manipulation — no `eval`.

2. **Feature Detection Library:** Build a `supports` object that detects whether the current environment supports ES5, ES6, and ES2020 features. Use feature detection (not user agent sniffing). Example: `supports.es6.classes`, `supports.es2020.optionalChaining`.

3. **Version Timeline Visualiser:** Build an HTML page that displays a visual timeline of ECMAScript versions, showing which features each version introduced. Clicking a feature should show a code example. Use only the JavaScript features available in that version to implement the UI (i.e., the ES3 timeline must be built with ES3 code).

4. **Cross-Version Compatibility Checker:** Write a function that takes JavaScript code as a string and identifies the minimum ES version required to run it (by detecting which features are used). For example, if the code contains `?.`, report "Requires ES2020+".

5. **Node.js Version Matrix:** Research how Node.js version numbers map to V8 engine versions and ES support. Build a table showing: Node 12, 14, 16, 18, 20, 22 and which ES features each supports natively without Babel.

---

# Completion Checklist

- [x] **Version timeline:** Know all versions from ES1 (1997) through ES2026 — why ES4 was cancelled
- [x] **Three eras:** Wild West (1995–2009), Stabilisation (2009–2015), Modern (2015–present)
- [x] **JavaScript origin story:** Brendan Eich, 10 days, Mocha → LiveScript → JavaScript
- [x] **Browser wars:** Netscape vs Microsoft JScript, ECMA standardisation
- [x] **ES4 failure:** Why it was abandoned, how ideas resurfaced in ES6
- [x] **Node.js (2009):** Why server-side JS was transformative
- [x] **ES3 (1999):** `try/catch`, `switch`, regex, `do...while`, `split/replace`
- [x] **ES3 limitations:** No `let`/`const`, no JSON, no array methods, no strict mode
- [x] **IIFE pattern:** Why it existed, how it simulated block scope and modules
- [x] **`arguments` object:** How it works; why rest parameters replaced it
- [x] **ES5 (2009) — `"use strict"`:** What it catches; list of prevented behaviours
- [x] **ES5 — `JSON.parse()`/`JSON.stringify()`:** Complete options — reviver, replacer, space
- [x] **ES5 — Array methods:** `forEach`, `map`, `filter`, `reduce`, `indexOf`, `every`, `some`, `isArray`
- [x] **ES5 — `Object.create()`:** Prototype-based inheritance without `new`
- [x] **ES5 — Property descriptors:** `defineProperty`, `freeze`, `seal`, `keys`
- [x] **ES5 — `Function.bind()`:** Solving the `this` problem
- [x] **ES6 — `let`/`const`:** Block scope, TDZ, const with objects
- [x] **ES6 — Arrow functions:** Concise syntax; lexical `this` binding
- [x] **ES6 — Template literals:** Interpolation, multi-line, tagged templates
- [x] **ES6 — Destructuring:** Array, object, nested, defaults, rename, parameter
- [x] **ES6 — Default parameters:** Prevent undefined bugs; can reference earlier params
- [x] **ES6 — Rest/Spread:** Collecting and expanding — arrays and objects
- [x] **ES6 — Classes:** Syntax sugar over prototypes; `extends`/`super`; static methods
- [x] **ES6 — Promises:** Three states; `.then().catch().finally()`; chaining
- [x] **ES6 — Modules:** `import`/`export`; default vs named; `* as` namespace
- [x] **ES6 — `Map`/`Set`:** Use cases vs plain objects/arrays; iteration
- [x] **ES6 — Symbols:** Guaranteed uniqueness; well-known symbols; hidden keys
- [x] **ES6 — Generators:** `function*`, `yield`, creating iterables
- [x] **IE history:** IE6 through IE11; the compatibility nightmare; JScript divergence
- [x] **Edge:** Legacy EdgeHTML vs Chromium Edge; IE retirement (June 2022)
- [x] **Feature detection vs browser detection:** Why feature detection is correct
- [x] **Polyfills:** What they are; `Array.from`, `String.includes` examples
- [x] **Babel transpilation:** What it does; reading transpiled output
- [x] **Can I Use / MDN:** How to check browser support for any feature
- [x] **Exercises completed:** ES3/ES5/ES6 rewrite, version detective, polyfill writing, mental transpiler
- [x] **Full project completed:** Three-era catalogue library with complete side-by-side comparison
- [x] **Reflection questions answered**

---

**One-sentence summary:** JavaScript was born in ten days in 1995, spent a decade locked at ES3 while browser wars raged and ES4 was abandoned, found stability in ES5's strict mode and native JSON, then transformed into a modern professional language with ES6's classes, modules, Promises and arrow functions — a thirty-year journey from a Netscape scripting toy to the most widely deployed programming language on Earth.
