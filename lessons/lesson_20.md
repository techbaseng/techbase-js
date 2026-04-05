---
render_with_liquid: false
title: "JavaScript Destructuring: Arrays · Objects · Nested · Default Values · Aliases · Rest · Function Parameters · Swapping"
nav_order: 20
---

## 📑 Table of Contents

1.  [Background: What Is Destructuring?](#1-background-what-is-destructuring)
2.  [Topic 1 — Array Destructuring](#2-topic-1--array-destructuring)
3.  [Topic 2 — Skipping Items in Array Destructuring](#3-topic-2--skipping-items-in-array-destructuring)
4.  [Topic 3 — The Rest Element in Arrays](#4-topic-3--the-rest-element-in-arrays)
5.  [Topic 4 — Default Values](#5-topic-4--default-values)
6.  [Topic 5 — Swapping Variables](#6-topic-5--swapping-variables)
7.  [Topic 6 — Object Destructuring](#7-topic-6--object-destructuring)
8.  [Topic 7 — Renaming with Aliases](#8-topic-7--renaming-with-aliases)
9.  [Topic 8 — The Rest Element in Objects](#9-topic-8--the-rest-element-in-objects)
10. [Topic 9 — Nested Destructuring](#10-topic-9--nested-destructuring)
11. [Topic 10 — Destructuring Function Parameters](#11-topic-10--destructuring-function-parameters)
12. [Topic 11 — Destructuring from Maps and Iterables](#12-topic-11--destructuring-from-maps-and-iterables)
13. [Applied Exercises](#13-applied-exercises)
14. [Mini Project — Student Report System](#14-mini-project--student-report-system)
15. [Completion Checklist](#15-completion-checklist)

---
---

## 1. Background: What Is Destructuring?

Imagine you receive a parcel containing multiple items. Instead of opening it and then manually picking each item out one by one and labelling them, you could unpack them all in one step and give each item its name right away.

That is exactly what **destructuring** does in JavaScript — it is a shorthand way to **unpack values from arrays or properties from objects into separate, named variables**, all in a single line.

---

### The Problem Without Destructuring

```javascript
// Without destructuring — verbose and repetitive
const colours = ["red", "green", "blue"];

const first  = colours[0]; // "red"
const second = colours[1]; // "green"
const third  = colours[2]; // "blue"

console.log(first, second, third); // red green blue
```

```javascript
// Without destructuring — accessing object properties
const person = { name: "Alice", age: 30, city: "Lagos" };

const name = person.name; // "Alice"
const age  = person.age;  // 30
const city = person.city; // "Lagos"

console.log(name, age, city); // Alice 30 Lagos
```

Both examples work, but they are long, noisy, and repeat `colours[0]`, `person.name`, etc. for every single value.

---

### The Solution — Destructuring

```javascript
// Array destructuring — unpack array into variables
const colours = ["red", "green", "blue"];
const [first, second, third] = colours;

console.log(first, second, third); // red green blue
```

```javascript
// Object destructuring — unpack object properties into variables
const person = { name: "Alice", age: 30, city: "Lagos" };
const { name, age, city } = person;

console.log(name, age, city); // Alice 30 Lagos
```

**Expected Output (both):**
```
red green blue
Alice 30 Lagos
```

Same result — far less code. Each piece of the shorthand will be explained in detail in the topics below.

---

### Where Is Destructuring Used in Real Life?

> REAL WORLD: Destructuring is one of the most-used features in modern JavaScript. You will see it constantly in:
> - **React components** — `const { name, onClick } = props;`
> - **API responses** — `const { data, status, error } = await fetchUser();`
> - **Function parameters** — `function greet({ name, age }) { ... }`
> - **Array returns** — `const [value, setValue] = useState(0);` (React hooks)
> - **Module imports** — `import { useState, useEffect } from "react";`
> - **Loop bodies** — `for (const [key, value] of map) { ... }`

---
---

## 2. Topic 1 — Array Destructuring

**Array destructuring** uses a `[...]` pattern on the left side of an assignment to unpack values from an array, one by one, based on **position** (index order).

---

### How the Syntax Works

```
const [var1, var2, var3] = someArray;
  pattern (left side)       source array (right side)
```

Each variable in the pattern maps to the array element at the **same position**:

```javascript
const fruits = ["apple", "banana", "cherry"];
//               [0]       [1]       [2]

const [a, b, c] = fruits;
//      0   1   2  positions match

console.log(a); // "apple"
console.log(b); // "banana"
console.log(c); // "cherry"
```

---

### You Don't Have to Destructure Everything

You can stop early — extract only the values you need from the front of the array.

```javascript
const scores = [98, 75, 82, 60, 91];

// Only want the top two
const [first, second] = scores;
console.log(first);  // 98
console.log(second); // 75
// The rest (82, 60, 91) are simply ignored
```

---

### Destructuring from a Function Return Value

One of the most common real-world uses — a function returns an array and you immediately destructure the result.

```javascript
function getMinMax(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  return [sorted[0], sorted[sorted.length - 1]];
}

const [min, max] = getMinMax([4, 7, 1, 9, 3]);
console.log("Min:", min); // Min: 1
console.log("Max:", max); // Max: 9
```

**Expected Output:**
```
Min: 1
Max: 9
```

> TIP: Without destructuring, you'd write:
> ```javascript
> const result = getMinMax([4, 7, 1, 9, 3]);
> const min = result[0];
> const max = result[1];
> ```
> Destructuring replaces 3 lines with 1.

---

### Destructuring with `let` and `var`

You can use `const`, `let`, or `var` for destructuring. Use `const` when values won't be reassigned, `let` when they might change.

```javascript
// const — values fixed after assignment
const [x, y] = [10, 20];

// let — values can be reassigned later
let [count, total] = [0, 100];
count = 5; // fine — it's a let
```

> COMMON MISTAKE — Forgetting `const`/`let`/`var`:
> ```javascript
> // Wrong — missing declaration keyword
> [a, b] = [1, 2];  // In strict mode: ReferenceError. Outside: creates globals!
>
> // Correct
> const [a, b] = [1, 2];
> ```

---

### Micro-Demo — Array Destructuring with Coordinates

```javascript
// A GPS coordinate is returned as [latitude, longitude]
function getLocation() {
  return [6.5244, 3.3792]; // Lagos, Nigeria
}

const [lat, lon] = getLocation();
console.log(`Latitude: ${lat}`);   // Latitude: 6.5244
console.log(`Longitude: ${lon}`);  // Longitude: 3.3792
```

Think: What would happen if you wrote `const [lon, lat] = getLocation()` instead? The values would be swapped — `lon` would be `6.5244` (the latitude!) because destructuring is purely **position-based**.

---
---

## 3. Topic 2 — Skipping Items in Array Destructuring

Sometimes you want values at specific positions but not others. You can **skip** positions by leaving an empty slot — a comma with nothing in it.

---

### Using Commas to Skip

Each comma moves one position forward in the array, whether or not you name a variable at that position.

```javascript
const colours = ["red", "green", "blue", "yellow", "purple"];
//                [0]    [1]      [2]     [3]        [4]

// Skip green (index 1), grab blue (index 2), skip yellow, grab purple
const [red, , blue, , purple] = colours;
//     0   12  2    34  4  — each comma advances position by 1

console.log(red);    // "red"
console.log(blue);   // "blue"
console.log(purple); // "purple"
```

**Expected Output:**
```
red
blue
purple
```

---

### Skipping the First N Items

```javascript
const medals = ["gold", "silver", "bronze"];

// Only want bronze (3rd place, index 2)
const [, , bronze] = medals;
console.log(bronze); // "bronze"

// Only want silver (index 1)
const [, silver] = medals;
console.log(silver); // "silver"
```

---

### Practical Example — API Response

Many APIs return arrays where only certain positions are meaningful to your use case.

```javascript
// CSV row: [id, firstName, lastName, email, phone, address]
function parseCSVRow(row) {
  return row.split(",");
}

const row = "101,Alice,Nkosi,alice@example.com,0801234567,Lagos";
const [id, firstName, , email] = parseCSVRow(row);
// skip lastName at index 2, take email at index 3

console.log(id);        // "101"
console.log(firstName); // "Alice"
console.log(email);     // "alice@example.com"
// (lastName, phone, address are skipped — not needed here)
```

**Expected Output:**
```
101
Alice
alice@example.com
```

> TIP: Empty slots (consecutive commas) look unusual at first. Count the commas carefully — each `,` without a name is one skipped position. Two consecutive commas `,,` skip one position.

---
---

## 4. Topic 3 — The Rest Element in Arrays

The **rest element** (`...varName`) collects all remaining array items — everything not already assigned to a named variable — into a new array.

It uses the same `...` spread syntax you may have seen in function parameters and array spreading — but here it **gathers** rather than spreads.

---

### Basic Rest Element

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5, 6]  — always a new array
```

**Expected Output:**
```
1
2
[3, 4, 5, 6]
```

---

### Rest Collects ZERO or More

If the array has no remaining elements after the named ones, rest becomes an **empty array** — not `undefined`.

```javascript
const [a, b, ...rest] = [1, 2];
console.log(rest); // []  — empty array, not undefined or null
```

---

### Rules for the Rest Element

```javascript
// Rest must be LAST
const [x, ...others, z] = [1, 2, 3]; // SyntaxError!
// Rest element must be last in the pattern

// Correct
const [x, ...others] = [1, 2, 3]; // x=1, others=[2,3]
```

> WATCH OUT: The rest element must always be the **last** item in the destructuring pattern. JavaScript will throw a `SyntaxError` if you try to put anything after it.

---

### Practical — Split Head from Tail

```javascript
// Process the first item differently from the rest
function processQueue(queue) {
  const [current, ...remaining] = queue;
  console.log("Processing:", current);
  console.log("Still waiting:", remaining);
  return remaining;
}

const taskQueue = ["send-email", "resize-image", "update-db", "notify-user"];
const newQueue = processQueue(taskQueue);
```

**Expected Output:**
```
Processing: send-email
Still waiting: ["resize-image", "update-db", "notify-user"]
```

---

### Practical — Separating First and Last

```javascript
function firstAndLast(arr) {
  const [head, ...middle] = arr;
  const tail = middle.pop(); // last item
  return { head, tail, middle };
}

const result = firstAndLast([10, 20, 30, 40, 50]);
console.log(result.head);   // 10
console.log(result.tail);   // 50
console.log(result.middle); // [20, 30, 40]
```

---
---

## 5. Topic 4 — Default Values

What happens when the array has fewer elements than variables in your pattern? By default, the variable is set to `undefined`. **Default values** let you specify a fallback instead.

---

### Without Default Values — `undefined`

```javascript
const [a, b, c] = ["alpha", "beta"];
// 'c' has no corresponding array element

console.log(a); // "alpha"
console.log(b); // "beta"
console.log(c); // undefined  — position 2 doesn't exist in array
```

---

### With Default Values

Add `= defaultValue` after a variable name to provide a fallback.

```javascript
const [a, b, c = "gamma"] = ["alpha", "beta"];

console.log(a); // "alpha"
console.log(b); // "beta"
console.log(c); // "gamma"  — default used because no value at index 2
```

**Expected Output:**
```
alpha
beta
gamma
```

---

### Default Only Activates When Value is `undefined`

If the value at that position exists — even if it is `null`, `0`, `""`, or `false` — the default is **not** used.

```javascript
const [a = "fallback"] = [null];
console.log(a); // null — NOT "fallback" (null is a real value, not undefined)

const [b = "fallback"] = [0];
console.log(b); // 0   — NOT "fallback"

const [c = "fallback"] = [undefined];
console.log(c); // "fallback" — only undefined triggers the default

const [d = "fallback"] = [];
console.log(d); // "fallback" — missing = undefined
```

> WATCH OUT: Only `undefined` triggers a default. `null`, `0`, `false`, and `""` are all real values — they do NOT use the default. This is the same behaviour as default function parameters.

---

### Defaults Work for Both Arrays and Objects

```javascript
// Array — default for missing position
const [x = 10, y = 20, z = 30] = [5, 15];
console.log(x, y, z); // 5 15 30

// Object — default for missing property
const { name = "Anonymous", age = 0 } = { name: "Bob" };
console.log(name, age); // Bob 0
```

---

### Practical — Configuration with Defaults

```javascript
// Function receives optional settings array [width, height, color]
function createBox([width = 100, height = 50, color = "blue"] = []) {
  return { width, height, color };
}

console.log(createBox([200, 80, "red"]));  // { width: 200, height: 80, color: "red" }
console.log(createBox([200]));             // { width: 200, height: 50, color: "blue" }
console.log(createBox());                  // { width: 100, height: 50, color: "blue" }
```

---
---

## 6. Topic 5 — Swapping Variables

One of the most elegant uses of array destructuring is swapping two variables without a temporary variable.

---

### The Old Way — Using a Temporary Variable

```javascript
let a = "hello";
let b = "world";

// Without destructuring — needs a temp variable
let temp = a;
a = b;
b = temp;

console.log(a, b); // world hello
```

---

### The Destructuring Way — One Line

```javascript
let a = "hello";
let b = "world";

// With destructuring — swap in one assignment
[a, b] = [b, a];

console.log(a, b); // world hello
```

**Expected Output:**
```
world hello
```

How it works: JavaScript evaluates the **right side first** — `[b, a]` creates a new temporary array `["world", "hello"]` — then destructures it into `a` and `b`.

---

### No `const` or `let` Here!

Notice there is no `const` or `let` before `[a, b]`. That is intentional — `a` and `b` already exist (declared with `let`). We are **reassigning** them, not declaring new ones.

```javascript
let x = 1;
let y = 2;

[x, y] = [y, x]; // reassign existing variables

console.log(x); // 2
console.log(y); // 1
```

---

### Practical — Swap Three Values

```javascript
let first  = "bronze";
let second = "silver";
let third  = "gold";

// Rotate: first gets second's value, second gets third's, third gets first's
[first, second, third] = [second, third, first];

console.log(first);  // "silver"
console.log(second); // "gold"
console.log(third);  // "bronze"
```

---

### Practical — Ensure Correct Order

```javascript
let min = 80;
let max = 20; // accidentally assigned backwards!

// Correct them if out of order
if (min > max) [min, max] = [max, min];

console.log("min:", min); // min: 20
console.log("max:", max); // max: 80
```

> REAL WORLD: The destructuring swap is used in sorting algorithms, graph traversals, animation keyframe reordering, and anywhere two values need to be exchanged without a helper variable.

---
---

## 7. Topic 6 — Object Destructuring

**Object destructuring** uses a `{...}` pattern to extract properties from an object into variables. Unlike array destructuring (which is position-based), object destructuring is **name-based** — you specify which property names you want.

---

### Basic Object Destructuring

```javascript
const person = {
  name:  "Alice",
  age:   30,
  city:  "Lagos",
  email: "alice@example.com",
};

// Extract specific properties by name
const { name, age, city } = person;

console.log(name); // "Alice"
console.log(age);  // 30
console.log(city); // "Lagos"
// email is not destructured — it is simply ignored
```

The key insight: **the variable name on the left must match the property name on the right**. That is the link JavaScript uses to know which value to extract.

---

### Order Does Not Matter

Because matching is by name, not position, the order in the pattern is irrelevant.

```javascript
const car = { make: "Toyota", model: "Camry", year: 2022 };

// These two are identical — order in pattern doesn't matter
const { year, make, model } = car;

console.log(make, model, year); // Toyota Camry 2022
```

---

### Extracting a Subset of Properties

You don't have to destructure all properties — take only what you need.

```javascript
const product = {
  id:       "P001",
  name:     "Wireless Mouse",
  price:    4500,
  stock:    120,
  category: "Electronics",
  supplier: "TechCo Ltd",
};

// Only need name and price for a product card
const { name, price } = product;
console.log(`${name}: N${price}`); // Wireless Mouse: N4500
```

---

### Destructuring from a Function Return Value

```javascript
function getUserProfile(id) {
  return {
    id,
    username: "alice_99",
    email:    "alice@example.com",
    role:     "admin",
    active:   true,
  };
}

const { username, email, role } = getUserProfile(1);
console.log(`${username} (${role})`); // alice_99 (admin)
console.log(email);                    // alice@example.com
```

---

### Destructuring in a `for...of` Loop

```javascript
const students = [
  { name: "Alice", grade: "A" },
  { name: "Bob",   grade: "B" },
  { name: "Carol", grade: "A" },
];

for (const { name, grade } of students) {
  console.log(`${name}: ${grade}`);
}
```

**Expected Output:**
```
Alice: A
Bob: B
Carol: A
```

> REAL WORLD: This loop pattern is extremely common in React, Node.js data processing, and any code that iterates over a list of records — orders, users, products, log entries, etc.

---
---

## 8. Topic 7 — Renaming with Aliases

Sometimes you want to extract a property but store it in a variable with a **different name**. This is useful when the property name conflicts with an existing variable, is not a valid JavaScript identifier, or you want a more descriptive local name.

Use a colon `:` inside the destructuring pattern to create an **alias**.

---

### Syntax: `{ propertyName: localName }`

```
const { propertyName: localVariableName } = object;
          must match     what you'll use in code
          the object key (the new variable name)
```

```javascript
const config = {
  "api-key":  "abc123",   // hyphen — not a valid identifier!
  max_retry:  5,
  base_url:   "https://api.example.com",
};

// Rename to valid, descriptive local variable names
const {
  "api-key":  apiKey,
  max_retry:  maxRetry,
  base_url:   baseUrl,
} = config;

console.log(apiKey);   // "abc123"
console.log(maxRetry); // 5
console.log(baseUrl);  // "https://api.example.com"
```

**Expected Output:**
```
abc123
5
https://api.example.com
```

---

### Renaming to Avoid Name Conflicts

```javascript
const user    = { name: "Alice" };
const product = { name: "Mouse" };

// Can't use 'name' twice in the same scope!
const { name: userName    } = user;
const { name: productName } = product;

console.log(userName);    // "Alice"
console.log(productName); // "Mouse"
```

---

### Alias + Default Value Combined

You can combine renaming AND default values in one expression:

```javascript
const settings = { theme: "dark" };

const {
  theme:    colorTheme = "light",   // rename + default (default not used, "dark" exists)
  language: lang       = "en",      // rename + default (default used, language missing)
  fontSize: size       = 14,        // rename + default (default used)
} = settings;

console.log(colorTheme); // "dark"   — from object
console.log(lang);       // "en"     — default (language not in object)
console.log(size);       // 14       — default (fontSize not in object)
```

---

> COMMON MISTAKE — Confusing Alias Direction:
> ```javascript
> const { name: userName } = { name: "Alice" };
>
> console.log(userName); // "Alice"  — correct
> console.log(name);     // ReferenceError! — 'name' is the source key, NOT a new variable.
> // The alias 'userName' is the only new variable created.
> ```

---
---

## 9. Topic 8 — The Rest Element in Objects

Just like with arrays, you can use the **rest element** `...varName` in object destructuring to collect all remaining properties (those not explicitly named in the pattern) into a new plain object.

---

### Basic Object Rest

```javascript
const person = {
  name:     "Alice",
  age:      30,
  city:     "Lagos",
  email:    "alice@example.com",
  role:     "admin",
};

// Extract name and age; collect everything else into 'rest'
const { name, age, ...rest } = person;

console.log(name); // "Alice"
console.log(age);  // 30
console.log(rest); // { city: "Lagos", email: "alice@example.com", role: "admin" }
```

**Expected Output:**
```
Alice
30
{ city: "Lagos", email: "alice@example.com", role: "admin" }
```

---

### Rest Creates a Shallow Copy

The rest object is a **new object** with copies of the remaining properties. Modifying rest does NOT affect the original.

```javascript
const original = { a: 1, b: 2, c: 3 };
const { a, ...copy } = original;

copy.b = 999;
console.log(original.b); // 2   — original unchanged
console.log(copy.b);      // 999
```

---

### Practical — Removing a Property Non-Mutatively

A common pattern: create a new object that is like the original but **without** a specific property, without mutating the source.

```javascript
function omitPassword(user) {
  const { password, ...safeUser } = user;
  return safeUser; // never send password to client!
}

const userRecord = {
  id:       1,
  name:     "Alice",
  email:    "alice@example.com",
  password: "hashed_secret_xyz",
  role:     "user",
};

const publicUser = omitPassword(userRecord);
console.log(publicUser);
// { id: 1, name: "Alice", email: "alice@example.com", role: "user" }
```

**Expected Output:**
```
{ id: 1, name: "Alice", email: "alice@example.com", role: "user" }
```

> REAL WORLD: The "omit password" pattern is used in virtually every Node.js/Express API that returns user data. You destructure out sensitive fields and return the rest — cleaner and less error-prone than `delete`.

---
---

## 10. Topic 9 — Nested Destructuring

Real-world data is rarely flat. Objects contain objects. Arrays contain arrays. Arrays contain objects. **Nested destructuring** lets you reach into those inner structures in a single assignment.

---

### Nested Arrays

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Destructure first row and pick specific elements from second row
const [[a, b], [, e], [g]] = matrix;

console.log(a, b); // 1 2
console.log(e);    // 5
console.log(g);    // 7
```

---

### Nested Objects

```javascript
const employee = {
  name: "Bob",
  address: {
    street: "12 Oak Avenue",
    city:   "Abuja",
    zip:    "900001",
  },
  job: {
    title:      "Software Engineer",
    department: "Engineering",
  },
};

// Destructure nested objects
const {
  name,
  address: { city, zip },   // go into 'address', extract city and zip
  job:     { title },       // go into 'job', extract title
} = employee;

console.log(name);  // "Bob"
console.log(city);  // "Abuja"
console.log(zip);   // "900001"
console.log(title); // "Software Engineer"
```

**Expected Output:**
```
Bob
Abuja
900001
Software Engineer
```

> WATCH OUT: When you destructure a nested object like `address: { city, zip }`, the variable `address` is **not** created — only `city` and `zip` are. If you also need the whole `address` object, you can mention it twice:
> ```javascript
> const { address, address: { city } } = employee;
> console.log(address); // { street: "12 Oak Avenue", city: "Abuja", zip: "900001" }
> console.log(city);    // "Abuja"
> ```

---

### Arrays of Objects — Most Common in Real Life

```javascript
const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob",   scores: [78, 88, 70] },
  { name: "Carol", scores: [95, 91, 97] },
];

// Destructure first student + their first two scores
const [{ name: firstName, scores: [s1, s2] }] = students;

console.log(firstName); // "Alice"
console.log(s1, s2);    // 90 85
```

---

### Nested Destructuring in a Loop

```javascript
const orders = [
  { id: "ORD001", customer: { name: "Alice", city: "Lagos"  }, amount: 4500 },
  { id: "ORD002", customer: { name: "Bob",   city: "Abuja"  }, amount: 7200 },
  { id: "ORD003", customer: { name: "Carol", city: "Ibadan" }, amount: 3100 },
];

for (const { id, customer: { name, city }, amount } of orders) {
  console.log(`${id}: ${name} (${city}) — N${amount.toLocaleString()}`);
}
```

**Expected Output:**
```
ORD001: Alice (Lagos) — N4,500
ORD002: Bob (Abuja) — N7,200
ORD003: Carol (Ibadan) — N3,100
```

---

### How Deep Is Too Deep?

Nested destructuring becomes hard to read when it goes 3+ levels deep. A practical rule:

```javascript
// 2 levels — fine
const { a: { b } } = obj;

// 3 levels — getting complex, consider intermediate variables
const { user: { address: { city } } } = data;

// Cleaner alternative:
const { user } = data;
const { address } = user;
const { city } = address;
// Much easier to read and debug!
```

---
---

## 11. Topic 10 — Destructuring Function Parameters

You can destructure **directly inside a function's parameter list**. Instead of receiving a full object and accessing its properties inside the function body, you unpack the properties right at the point of receiving them.

---

### Without Destructuring in Parameters

```javascript
function greet(person) {
  console.log(`Hello, ${person.name}! You are ${person.age} years old.`);
}

greet({ name: "Alice", age: 30 }); // Hello, Alice! You are 30 years old.
```

---

### With Destructuring in Parameters

```javascript
function greet({ name, age }) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet({ name: "Alice", age: 30 }); // Hello, Alice! You are 30 years old.
```

Same output, cleaner function signature — you immediately see which properties the function cares about.

---

### Array Destructuring in Parameters

```javascript
// Function expecting [x, y] coordinate pair
function distance([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

const d = distance([0, 0], [3, 4]);
console.log(d); // 5  (classic 3-4-5 right triangle)
```

---

### Default Values in Parameter Destructuring

You can combine parameter destructuring with default values for robust, self-documenting APIs.

```javascript
function createButton({
  label   = "Click Me",
  color   = "blue",
  size    = "medium",
  onClick = () => {},
} = {}) {
  return { label, color, size, onClick };
}

// Use all defaults
console.log(createButton());
// { label: "Click Me", color: "blue", size: "medium", onClick: [Function] }

// Override some
console.log(createButton({ label: "Submit", color: "green" }));
// { label: "Submit", color: "green", size: "medium", onClick: [Function] }
```

**Expected Output:**
```
{ label: "Click Me", color: "blue", size: "medium", onClick: [Function (anonymous)] }
{ label: "Submit", color: "green", size: "medium", onClick: [Function (anonymous)] }
```

> TIP — The `= {}` Default Parameter: Notice `} = {}` at the end of the parameter. This makes the entire object parameter optional. Without it, calling `createButton()` with no argument would throw `TypeError: Cannot destructure property 'label' of undefined`.

---

### Renaming Inside Parameter Destructuring

```javascript
// API returns { "first-name": "Alice", "last-name": "Nkosi" }
function formatName({ "first-name": firstName, "last-name": lastName }) {
  return `${firstName} ${lastName}`;
}

console.log(formatName({ "first-name": "Alice", "last-name": "Nkosi" }));
// "Alice Nkosi"
```

---

### Nested Destructuring in Parameters

```javascript
function displayOrder({ id, customer: { name, city }, items: [first, ...rest] }) {
  console.log(`Order ${id} — Customer: ${name}, ${city}`);
  console.log(`First item: ${first.name} x ${first.qty}`);
  console.log(`Other items: ${rest.length}`);
}

displayOrder({
  id:       "ORD-042",
  customer: { name: "Bob", city: "Port Harcourt" },
  items: [
    { name: "Keyboard", qty: 1 },
    { name: "Mouse",    qty: 2 },
    { name: "Monitor",  qty: 1 },
  ],
});
```

**Expected Output:**
```
Order ORD-042 — Customer: Bob, Port Harcourt
First item: Keyboard x 1
Other items: 2
```

> REAL WORLD: Destructuring in function parameters is the standard way modern JavaScript frameworks handle component props (React), middleware (Express), and event handlers. It documents the function's expectations directly in its signature.

---
---

## 12. Topic 11 — Destructuring from Maps and Iterables

Array destructuring works with **any iterable** — not just arrays. This includes strings, Sets, Maps, generators, and any object implementing `[Symbol.iterator]`.

---

### Destructuring a String

A string is iterable character-by-character.

```javascript
const [first, second, , fourth] = "Hello";

console.log(first);  // "H"
console.log(second); // "e"
console.log(fourth); // "l"  (skipped "l" at index 2)
```

---

### Destructuring a Set

Sets are iterable in insertion order.

```javascript
const colourSet = new Set(["red", "green", "blue"]);
const [primary, secondary] = colourSet;

console.log(primary);   // "red"
console.log(secondary); // "green"
```

> WATCH OUT: Sets have no index-based access. You can only destructure from the front — you cannot skip to position 3 of a Set like you can with an array.

---

### Destructuring a Map

Maps are iterable as `[key, value]` pairs. Combining `for...of` with destructuring is the clean way to iterate them.

```javascript
const scores = new Map([
  ["Alice", 92],
  ["Bob",   78],
  ["Carol", 95],
]);

// Destructure each [key, value] pair in the loop
for (const [name, score] of scores) {
  console.log(`${name}: ${score}`);
}
```

**Expected Output:**
```
Alice: 92
Bob: 78
Carol: 95
```

---

### Destructuring `Object.entries()`

`Object.entries()` returns `[key, value]` pairs — perfect for destructuring in a loop.

```javascript
const prices = {
  apple:  120,
  banana: 80,
  mango:  200,
};

for (const [fruit, price] of Object.entries(prices)) {
  console.log(`${fruit}: N${price}`);
}
```

**Expected Output:**
```
apple: N120
banana: N80
mango: N200
```

---

### Destructuring a Generator

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

const [one, two, three] = range(1, 10);
console.log(one, two, three); // 1 2 3
// The generator only produces as many values as needed — efficient!
```

---
---

## 13. Applied Exercises

---

### Exercise 1 — Data Unpacker

**Objective:** Practice extracting, renaming, defaulting, and resting across both array and object destructuring.

**Scenario:** You work on a data processing team. Each day you receive records that need unpacking into clean, consistent variables.

#### Warm-up Micro-Demo:

```javascript
const record = { id: "R001", value: 42, active: true };
const { id, value: amount, active: isActive = false } = record;
console.log(id, amount, isActive); // R001 42 true
```

#### Task — Unpack an API Response

```javascript
const apiResponse = {
  status:  200,
  message: "OK",
  data: {
    user: {
      id:       "u-8821",
      fullName: "Amara Okafor",
      email:    "amara@example.com",
      roles:    ["editor", "reviewer", "publisher"],
      stats: {
        posts:      34,
        comments:   120,
        likes:      890,
        joinedYear: 2019,
      },
    },
    token:     "jwt.abc.xyz",
    expiresIn: 3600,
  },
};

// 1. Extract status and message directly
const { status, message } = apiResponse;
console.log(status, message); // 200 OK

// 2. Extract user's fullName and email — rename fullName to name
const { data: { user: { fullName: name, email } } } = apiResponse;
console.log(name, email); // Amara Okafor  amara@example.com

// 3. Extract primary role and remaining roles separately
const { data: { user: { roles: [primaryRole, ...otherRoles] } } } = apiResponse;
console.log("Primary:", primaryRole);  // Primary: editor
console.log("Others:", otherRoles);    // Others: ["reviewer", "publisher"]

// 4. Extract stats with default for missing field
const {
  data: { user: { stats: { posts, comments, likes, joinedYear, followers = 0 } } }
} = apiResponse;
console.log(`Posts: ${posts}, Followers: ${followers}`); // Posts: 34, Followers: 0

// 5. Extract token and expiresIn, rename expiresIn to ttl
const { data: { token, expiresIn: ttl } } = apiResponse;
console.log(`Token valid for ${ttl}s`); // Token valid for 3600s
```

**Expected Output:**
```
200 OK
Amara Okafor  amara@example.com
Primary: editor
Others: ["reviewer", "publisher"]
Posts: 34, Followers: 0
Token valid for 3600s
```

**Self-check questions:**
- In step 3, why does the rest element `...otherRoles` create a new array?
- In step 4, why does `followers = 0` activate its default but `posts` does not?
- In step 5, does accessing `data: { token }` create a variable called `data`? Why not?

---

### Exercise 2 — Function Signature Upgrade

**Objective:** Convert verbose functions that use `options.x` property access into clean parameter-destructuring functions.

**Scenario:** You've inherited old code that passes settings as objects. Your job is to modernise the function signatures.

#### Warm-up Micro-Demo:

```javascript
// Before
function oldGreet(options) {
  return `Hello, ${options.name}! You are ${options.age}.`;
}

// After
function newGreet({ name, age = "unknown" }) {
  return `Hello, ${name}! You are ${age}.`;
}

console.log(newGreet({ name: "Alice", age: 30 })); // Hello, Alice! You are 30.
console.log(newGreet({ name: "Bob" }));             // Hello, Bob! You are unknown.
```

#### Task A — Refactor renderCard

```javascript
// BEFORE (your starting point)
function renderCard_OLD(config) {
  const title    = config.title    || "Untitled";
  const subtitle = config.subtitle || "";
  const image    = config.image    || "/default.jpg";
  const tags     = config.tags     || [];
  const featured = config.featured || false;

  return {
    html: `<div class="${featured ? "featured" : ""}">
      <img src="${image}" />
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
      <ul>${tags.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>`,
    tagCount: tags.length,
  };
}

// AFTER — refactored using destructuring
function renderCard({
  title    = "Untitled",
  subtitle = "",
  image    = "/default.jpg",
  tags     = [],
  featured = false,
} = {}) {
  return {
    html: `<div class="${featured ? "featured" : ""}">
      <img src="${image}" />
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
      <ul>${tags.map(t => `<li>${t}</li>`).join("")}</ul>
    </div>`,
    tagCount: tags.length,
  };
}

// Test both versions produce identical output:
const testConfig = {
  title:    "My Article",
  subtitle: "A brief intro",
  tags:     ["tech", "js", "web"],
  featured: true,
};

const old = renderCard_OLD(testConfig);
const neo = renderCard(testConfig);

console.log("tagCount OLD:", old.tagCount); // 3
console.log("tagCount NEW:", neo.tagCount); // 3
console.log("Match:", old.html === neo.html); // true

// Test defaults
console.log(renderCard().tagCount); // 0
```

#### Task B — Coordinate Processor

```javascript
const points = [
  [1, 2, 3],
  [4, 5],      // z missing
  [7, 8, 9],
];

function describePoint([x, y, z = 0]) {
  const is3D = z !== 0;
  return `(${x}, ${y}, ${z}) — ${is3D ? "3D" : "2D"} point`;
}

for (const point of points) {
  console.log(describePoint(point));
}
```

**Expected Output:**
```
(1, 2, 3) — 3D point
(4, 5, 0) — 2D point
(7, 8, 9) — 3D point
```

**Self-check questions:**
- In `renderCard`, what does the `= {}` at the end of the parameter do? What error occurs without it?
- In `describePoint`, why is `z !== 0` used instead of just `z`? What is the flaw in using just `z` as the condition?

---

### Exercise 3 — Swap and Sort Workshop

**Objective:** Use destructuring swap to sort and rotate values cleanly.

**Scenario:** You're building a leaderboard system that must rank players and rotate positions for display.

#### Warm-up Micro-Demo:

```javascript
let a = 10, b = 20;
if (a > b) [a, b] = [b, a];
console.log(a, b); // 10 20 (already in order, no swap needed)

let x = 30, y = 5;
if (x > y) [x, y] = [y, x];
console.log(x, y); // 5 30 (swapped!)
```

#### Task — Leaderboard Sort and Rotation

```javascript
// Bubble sort using destructuring swap
function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]]; // destructuring swap!
      }
    }
  }
  return a;
}

const scores = [62, 91, 45, 78, 55, 88, 34];
const sorted = bubbleSort(scores);
console.log("Sorted:", sorted);             // [34, 45, 55, 62, 78, 88, 91]
console.log("Original unchanged:", scores); // [62, 91, 45, ...]

// Highest scores first
let [gold, silver, bronze, ...rest] = sorted.reverse();

console.log(`Gold:   ${gold}`);   // 91
console.log(`Silver: ${silver}`); // 88
console.log(`Bronze: ${bronze}`); // 78

// Rotation: silver moves up to gold, bronze to silver, next in rest to bronze
[gold, silver, bronze, ...rest] = [silver, bronze, ...rest];
console.log("\nAfter rotation:");
console.log(`Gold:   ${gold}`);   // 88
console.log(`Silver: ${silver}`); // 78
console.log(`Bronze: ${bronze}`); // 62
```

**Expected Output:**
```
Sorted: [34, 45, 55, 62, 78, 88, 91]
Original unchanged: [62, 91, 45, 78, 55, 88, 34]
Gold:   91
Silver: 88
Bronze: 78

After rotation:
Gold:   88
Silver: 78
Bronze: 62
```

**Self-check questions:**
- Why does `bubbleSort` copy the array first with `[...arr]` before sorting?
- Why does `sorted.reverse()` work for getting the highest score as `gold`?
- What happens to `rest` during the rotation line? Trace through the values.

---
---

## 14. Mini Project — Student Report System

**Real-world scenario:** You are building a **Student Report Processing System** for a school administration platform. The system receives raw student data from multiple sources, normalises it, analyses performance, and generates formatted report cards.

All data transformation relies heavily on destructuring.

---

### Stage 1 — Data Normaliser

**Goal:** Receive raw student records (with inconsistent shapes) and normalise them into a standard format using parameter destructuring with defaults.

#### Simple stage preview:
```javascript
function normalise({ name = "Unknown", grade = "N/A" } = {}) {
  return { name, grade };
}
console.log(normalise({ name: "Alice" })); // { name: "Alice", grade: "N/A" }
```

#### Stage 1 Full Code:

```javascript
"use strict";

const rawStudents = [
  {
    id:         "S001",
    fullName:   "Alice Nkosi",
    scores:     { maths: 88, english: 92, science: 85, history: 78 },
    attendance: 0.96,
    year:       3,
    extra:      { sport: "swimming", club: "debate" },
  },
  {
    id:       "S002",
    fullName: "Bob Asante",
    scores:   { maths: 72, english: 65, science: 80 },
    year:     2,
  },
  {
    id:     "S003",
    scores: { maths: 95, english: 91, science: 97, history: 93 },
  },
  {
    id: "S004",
  },
];

function normaliseStudent({
  id          = "UNKNOWN",
  fullName    = "Anonymous Student",
  scores:  {
    maths   = 0,
    english = 0,
    science = 0,
    history = 0,
  } = {},
  attendance  = 1.0,
  year        = 1,
  extra: {
    sport = null,
    club  = null,
  } = {},
} = {}) {
  const allScores = [maths, english, science, history];
  const average   = allScores.reduce((s, n) => s + n, 0) / allScores.length;

  return {
    id,
    fullName,
    scores:     { maths, english, science, history },
    average:    Math.round(average * 10) / 10,
    attendance: Math.round(attendance * 100),
    year,
    extra:      { sport, club },
  };
}

const students = rawStudents.map(normaliseStudent);

console.log("=".repeat(60));
console.log("   STAGE 1 — NORMALISED STUDENT RECORDS");
console.log("=".repeat(60));

for (const { id, fullName, average, attendance } of students) {
  console.log(`  ${id}: ${fullName.padEnd(20)} avg=${average}  att=${attendance}%`);
}
```

**Expected Output:**
```
============================================================
   STAGE 1 — NORMALISED STUDENT RECORDS
============================================================
  S001: Alice Nkosi           avg=85.8  att=96%
  S002: Bob Asante            avg=54.3  att=100%
  S003: Anonymous Student     avg=94    att=100%
  S004: Anonymous Student     avg=0     att=100%
```

---

### Stage 2 — Performance Analyser

**Goal:** Analyse each student's normalised record to produce a grade, rank, and subject strengths/weaknesses.

```javascript
function classifyAverage(average) {
  if (average >= 90) return { grade: "A", label: "Distinction", pass: true  };
  if (average >= 80) return { grade: "B", label: "Merit",       pass: true  };
  if (average >= 70) return { grade: "C", label: "Credit",      pass: true  };
  if (average >= 60) return { grade: "D", label: "Pass",        pass: true  };
  return               { grade: "F", label: "Fail",         pass: false };
}

function analyseStudent(student) {
  const { id, fullName, scores, average, attendance, year } = student;

  const subjectScores = Object.entries(scores);

  const [bestSubject,  bestScore] = subjectScores.reduce(
    ([bk, bv], [k, v]) => v > bv ? [k, v] : [bk, bv],
    subjectScores[0]
  );
  const [worstSubject, worstScore] = subjectScores.reduce(
    ([wk, wv], [k, v]) => v < wv ? [k, v] : [wk, wv],
    subjectScores[0]
  );

  const { grade, label, pass } = classifyAverage(average);

  const needsAttention = subjectScores
    .filter(([, score]) => score < 70)
    .map(([subject])   => subject);

  return {
    id, fullName, year,
    average, grade, label, pass, attendance,
    best:           { subject: bestSubject,  score: bestScore  },
    worst:          { subject: worstSubject, score: worstScore },
    needsAttention,
  };
}

const analysed = students.map(analyseStudent);

console.log("\n" + "=".repeat(60));
console.log("   STAGE 2 — PERFORMANCE ANALYSIS");
console.log("=".repeat(60));

for (const {
  id, fullName, grade, label, average, pass,
  best:  { subject: bestSub,  score: bestSc  },
  worst: { subject: worstSub, score: worstSc },
  needsAttention,
} of analysed) {
  console.log(`\n  ${id} — ${fullName}`);
  console.log(`    Grade   : ${grade} (${label}) — ${pass ? "PASS" : "FAIL"}`);
  console.log(`    Average : ${average}/100`);
  console.log(`    Best    : ${bestSub} (${bestSc})`);
  console.log(`    Weakest : ${worstSub} (${worstSc})`);
  if (needsAttention.length > 0) {
    console.log(`    Needs support in: ${needsAttention.join(", ")}`);
  }
}
```

**Expected Output:**
```
============================================================
   STAGE 2 — PERFORMANCE ANALYSIS
============================================================

  S001 — Alice Nkosi
    Grade   : B (Merit) — PASS
    Average : 85.8/100
    Best    : english (92)
    Weakest : history (78)

  S002 — Bob Asante
    Grade   : F (Fail) — FAIL
    Average : 54.3/100
    Best    : science (80)
    Weakest : history (0)
    Needs support in: maths, english, history
    ...
```

---

### Stage 3 — Report Card Generator

**Goal:** Combine normalisation and analysis into a formatted, printable report card for each student. Generate a class summary.

```javascript
function generateReportCard(student) {
  const {
    id, fullName, year,
    average, grade, label, pass, attendance,
    best:  { subject: bestSub, score: bestSc },
    needsAttention,
  } = analyseStudent(student);

  const { scores: { maths, english, science, history } } = student;

  const bar = (n) => "#".repeat(Math.floor(n / 10)) + ".".repeat(10 - Math.floor(n / 10));

  const lines = [
    "+--------------------------------------------------+",
    "|  STUDENT REPORT CARD                             |",
    "+--------------------------------------------------+",
    `|  ID       : ${id}`.padEnd(51) + "|",
    `|  Name     : ${fullName}`.padEnd(51) + "|",
    `|  Year     : ${year}`.padEnd(51) + "|",
    `|  Attend.  : ${attendance}%`.padEnd(51) + "|",
    "+--------------------------------------------------+",
    `|  Maths   [${bar(maths)}]  ${String(maths).padStart(3)}`.padEnd(51) + "|",
    `|  English [${bar(english)}]  ${String(english).padStart(3)}`.padEnd(51) + "|",
    `|  Science [${bar(science)}]  ${String(science).padStart(3)}`.padEnd(51) + "|",
    `|  History [${bar(history)}]  ${String(history).padStart(3)}`.padEnd(51) + "|",
    "+--------------------------------------------------+",
    `|  Average  : ${average}/100`.padEnd(51) + "|",
    `|  Grade    : ${grade} — ${label}`.padEnd(51) + "|",
    `|  Result   : ${pass ? "PASS" : "FAIL"}`.padEnd(51) + "|",
    `|  Strength : ${bestSub} (${bestSc})`.padEnd(51) + "|",
    needsAttention.length > 0
      ? `|  Focus on : ${needsAttention.join(", ")}`.padEnd(51) + "|"
      : `|  All subjects above threshold`.padEnd(51) + "|",
    "+--------------------------------------------------+",
  ];

  return lines.join("\n");
}

function generateClassSummary(analysedList) {
  const total    = analysedList.length;
  const passed   = analysedList.filter(s => s.pass).length;
  const averages = analysedList.map(s => s.average);
  const classAvg = (averages.reduce((a, b) => a + b, 0) / total).toFixed(1);

  const [topStudent] = [...analysedList].sort((a, b) => b.average - a.average);
  const { fullName: topName, average: topAvg } = topStudent;

  const gradeCount = {};
  for (const { grade } of analysedList) {
    gradeCount[grade] = (gradeCount[grade] || 0) + 1;
  }

  return `
${"=".repeat(52)}
   CLASS SUMMARY
${"=".repeat(52)}
  Total Students : ${total}
  Passed         : ${passed} (${Math.round(passed/total*100)}%)
  Failed         : ${total - passed} (${Math.round((total-passed)/total*100)}%)
  Class Average  : ${classAvg}/100
  Highest        : ${Math.max(...averages)}   Lowest: ${Math.min(...averages)}
  Top Student    : ${topName} (${topAvg})
  Grade Spread   : ${Object.entries(gradeCount).map(([g,c]) => `${g}:${c}`).join(" | ")}
${"=".repeat(52)}`;
}

console.log("\n" + "=".repeat(52));
console.log("   STAGE 3 — REPORT CARDS");
console.log("=".repeat(52));

for (const student of students.filter(s => s.id !== "S004")) {
  console.log("\n" + generateReportCard(student));
}

console.log(generateClassSummary(analysed));
```

**Expected Output (sample):**
```
+--------------------------------------------------+
|  STUDENT REPORT CARD                             |
+--------------------------------------------------+
|  ID       : S001                                 |
|  Name     : Alice Nkosi                          |
|  Year     : 3                                    |
|  Attend.  : 96%                                  |
+--------------------------------------------------+
|  Maths   [########..]   88                       |
|  English [#########.]   92                       |
|  Science [########..]   85                       |
|  History [#######...]   78                       |
+--------------------------------------------------+
|  Average  : 85.8/100                             |
|  Grade    : B — Merit                            |
|  Result   : PASS                                 |
|  Strength : english (92)                         |
|  All subjects above threshold                    |
+--------------------------------------------------+

====================================================
   CLASS SUMMARY
====================================================
  Total Students : 4
  Passed         : 2 (50%)
  Failed         : 2 (50%)
  Class Average  : 58.5/100
  Highest        : 94   Lowest: 0
  Top Student    : Anonymous Student (94)
  Grade Spread   : B:1 | F:2 | A:1
====================================================
```

**Reflection questions:**
- In `normaliseStudent`, why does `scores: { maths = 0, ... } = {}` need the `= {}` after the nested destructuring — when would that inner default activate?
- In Stage 2, `Object.entries(scores)` returns `[key, value]` pairs. Why is `[[subject, score]]` pattern destructuring used when calling `.reduce()`?
- The `generateReportCard` function uses both nested object destructuring and flat destructuring of the same source `student`. What does this tell you about destructuring being a read-only operation on the source?
- How would the system change if scores were stored as an array `[maths, english, science, history]` instead of an object? Which parts become easier and which become harder?

**Optional advanced features:**
- Add a `subjects` configuration array so subjects are not hard-coded
- Add `previousAverage` to each student and compute a `trend` (improving or declining)
- Use `Map.groupBy` to group students by grade and destructure the map in the output

---
---

## 15. Completion Checklist

- I understand what destructuring is — unpacking arrays or object properties into named variables in a single assignment.
- I can write **array destructuring** using `const [a, b, c] = array` — matching by position.
- I can **skip positions** using consecutive commas: `const [a, , c] = array`.
- I can use the **rest element** in arrays: `const [first, ...rest] = array` — rest is always a new array.
- I know the rest element must be **last** in the pattern — SyntaxError otherwise.
- I can provide **default values** with `= fallback` — and only `undefined` (not `null` or `0`) triggers a default.
- I can **swap variables** with `[a, b] = [b, a]` — no temp variable needed.
- I can write **object destructuring** using `const { name, age } = obj` — matching by property name.
- I understand object destructuring is **name-based**, not position-based — order in the pattern is irrelevant.
- I can **rename** properties using colon syntax: `const { propName: localName } = obj`.
- I know that after aliasing `{ prop: alias }`, only `alias` exists — `prop` is NOT a new variable.
- I can combine alias + default: `const { prop: alias = default } = obj`.
- I can use **rest in objects**: `const { a, b, ...rest } = obj` — rest collects all remaining properties.
- I know the object rest pattern creates a non-mutating "omit" — useful for stripping sensitive fields.
- I can destructure **nested structures** — objects inside objects, arrays inside objects, objects inside arrays.
- I know that destructuring a nested object (`outer: { inner }`) does NOT create the `outer` variable.
- I can destructure **directly in function parameters** for both objects `{ name, age }` and arrays `[x, y]`.
- I know to add `= {}` as a default for the whole object parameter to prevent TypeError when called with no argument.
- I can destructure from **any iterable** — strings, Sets, Maps, generators.
- I know the `for (const [key, value] of map)` pattern for iterating Maps.
- I know the `for (const [key, value] of Object.entries(obj))` pattern for iterating objects.
- I built the full Student Report System project using destructuring throughout all three stages.

---

### One-Sentence Summary

**JavaScript Destructuring** is a concise syntax using `[...]` for arrays (position-based) and `{...}` for objects (name-based) that unpacks values into named variables in a single assignment — supporting skipping, rest collection, default values, renaming, nesting, function parameters, and any iterable — making code shorter, more readable, and self-documenting.

---

> Built from W3Schools.com — `js_destructuring`
> Framework: Understand — Practice — Create
