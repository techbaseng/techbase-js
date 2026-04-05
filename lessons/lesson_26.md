---
title: "JavaScript Modern Features: ES2016 → ES2026"
nav_order: 26
---

## Table of Contents
1. [What Is ECMAScript?](#1-what-is-ecmascript)
2. [ES2016 (ES7) — Two Powerful Additions](#2-es2016-es7)
3. [ES2017 (ES8) — Async/Await and Object Tools](#3-es2017-es8)
4. [ES2018 (ES9) — Promises and Object Spread](#4-es2018-es9)
5. [ES2019 (ES10) — Array and String Polish](#5-es2019-es10)
6. [ES2020 (ES11) — BigInt, Nullish and Optional Chaining](#6-es2020-es11)
7. [ES2021 (ES12) — replaceAll, Promise.any and Logical Assignment](#7-es2021-es12)
8. [ES2022 (ES13) — at(), Private Fields and Top-Level Await](#8-es2022-es13)
9. [ES2023 (ES14) — Immutable Array Methods](#9-es2023-es14)
10. [ES2024 (ES15) — Grouping, Promise.withResolvers and RegExp v Flag](#10-es2024-es15)
11. [ES2025 (ES16) — Set Methods, Iterator Helpers and Promise.try](#11-es2025-es16)
12. [ES2026 (ES17) — Float16, Error.isError and More](#12-es2026-es17)
13. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
14. [Phase 3 — Project Simulation](#phase-3--project-simulation)
15. [Completion Checklist](#completion-checklist)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. What Is ECMAScript?

### 1.1 JavaScript vs ECMAScript — The Distinction

Many developers use "JavaScript" and "ECMAScript" interchangeably. They are closely related but technically different:

- **ECMAScript (ES)** is the *official language standard* — a specification document published by an organisation called **ECMA International** (Technical Committee 39, or **TC39**). It defines the rules of the language.
- **JavaScript** is the *most famous implementation* of that standard — the version run by browsers (V8 in Chrome, SpiderMonkey in Firefox, JavaScriptCore in Safari) and by Node.js.

**Real-world analogy:** ECMAScript is like a recipe. JavaScript is the dish that Michelin-starred restaurants (browser engines) actually cook from it. The recipe is the standard; the dish is what you actually eat.

---

### 1.2 The Annual Release Cycle

Before 2015, JavaScript had large, infrequent releases (ES3 in 1999, ES5 in 2009, ES6/ES2015 in 2015). Starting with **ES2016**, TC39 adopted an **annual release cycle**: every June, a new version of ECMAScript is published containing whatever proposals were ready in time.

This means:
- Smaller, more predictable updates every year
- Features go through numbered **stages** (0 → 4) before inclusion
- Stage 4 = ready for the annual standard; Stage 3 = nearly ready
- Developers can track proposals at the TC39 GitHub repository

| Year | Version Name | Common Name |
|------|-------------|-------------|
| 2015 | ES2015 | ES6 |
| 2016 | ES2016 | ES7 |
| 2017 | ES2017 | ES8 |
| 2018 | ES2018 | ES9 |
| 2019 | ES2019 | ES10 |
| 2020 | ES2020 | ES11 |
| 2021 | ES2021 | ES12 |
| 2022 | ES2022 | ES13 |
| 2023 | ES2023 | ES14 |
| 2024 | ES2024 | ES15 |
| 2025 | ES2025 | ES16 |
| 2026 | ES2026 | ES17 |

---

### 1.3 Browser Support and Compatibility

New features arrive in browsers at different times. A feature might be in the specification before all browsers implement it.

**How to check compatibility:** The website **caniuse.com** and the **MDN Web Docs** browser compatibility tables show which browsers support each feature.

**Transpilation:** Tools like **Babel** convert modern JavaScript into older syntax, letting you write cutting-edge code that runs in older browsers. This is standard practice in professional JavaScript projects.

> 💡 **Real-world note:** Companies like Google, Meta, and Flutterwave run Babel in their build pipelines so engineers can use the very latest JavaScript features while still supporting users on older browsers.

---

## 2. ES2016 (ES7)

ES2016 was intentionally tiny — just two new features. It proved that the annual release model worked: ship what's ready, don't hold everything back.

---

### 2.1 `Array.prototype.includes()` — Does This Array Contain a Value?

Before `includes()`, checking whether a value existed in an array required `indexOf()`, which returns `-1` if not found. This was unintuitive to read.

```javascript
// Old way — using indexOf
let fruits = ["mango", "pineapple", "pawpaw"];

if (fruits.indexOf("mango") !== -1) {   // Hard to read: "not equal to negative one"
  console.log("Mango is in the list");
}

// ES2016 — using includes()
if (fruits.includes("mango")) {          // Reads like English
  console.log("Mango is in the list");
}
// Expected Output: Mango is in the list
```

**The crucial difference — `NaN` detection:**

`indexOf()` uses strict equality (`===`) internally, and `NaN === NaN` is `false` in JavaScript. This means `indexOf` *cannot* find `NaN` in an array. `includes()` uses a special algorithm (SameValueZero) that *can* detect `NaN`.

```javascript
let data = [1, 2, NaN, 4];

console.log(data.indexOf(NaN));   // -1  ← Cannot find NaN
console.log(data.includes(NaN));  // true ← Can find NaN
```

**Optional second argument — start position:**

```javascript
let numbers = [10, 20, 30, 20, 10];

console.log(numbers.includes(20));     // true — found at index 1
console.log(numbers.includes(20, 2)); // true — searches from index 2 onwards, finds it at index 3
console.log(numbers.includes(20, 4)); // false — searching from index 4, only 10 remains
```

**Real-world use:**

```javascript
const ALLOWED_ROLES = ["admin", "editor", "moderator"];
const BLOCKED_COUNTRIES = ["XX", "YY", "ZZ"];

function canAccess(user) {
  if (BLOCKED_COUNTRIES.includes(user.country)) {
    return false;
  }
  return ALLOWED_ROLES.includes(user.role);
}

console.log(canAccess({ role: "admin",  country: "NG" })); // true
console.log(canAccess({ role: "viewer", country: "NG" })); // false
console.log(canAccess({ role: "admin",  country: "XX" })); // false
```

---

### 2.2 Exponentiation Operator `**`

Before ES2016, raising a number to a power required `Math.pow()`. ES2016 introduced the `**` operator for cleaner syntax.

```javascript
// Old way
let area = Math.pow(5, 2);       // 5 squared = 25
let volume = Math.pow(3, 3);     // 3 cubed = 27
let root = Math.pow(64, 1/3);    // Cube root of 64 = 4

// ES2016 — exponentiation operator
let area2  = 5 ** 2;       // 25
let volume2 = 3 ** 3;      // 27
let root2  = 64 ** (1/3);  // 4

console.log(area2, volume2, root2); // 25 27 4
```

**Right-to-left associativity (important!):**

```javascript
let result = 2 ** 3 ** 2;
// Evaluated right-to-left: 3 ** 2 = 9 first, then 2 ** 9 = 512
console.log(result); // 512

// Use parentheses to force left-to-right:
let result2 = (2 ** 3) ** 2; // 8 ** 2 = 64
console.log(result2); // 64
```

**Compound assignment:**

```javascript
let base = 2;
base **= 10; // base = base ** 10
console.log(base); // 1024
```

**Real-world use — compound interest, pixel area, hash functions:**

```javascript
function compoundInterest(principal, rate, years) {
  return principal * (1 + rate) ** years;
}
console.log(compoundInterest(100000, 0.12, 5).toFixed(2));
// ₦176,234.17 — ₦100k at 12% per year for 5 years
```

---

## 3. ES2017 (ES8)

ES2017 brought one of JavaScript's most transformative features — `async`/`await` — plus a collection of useful object and string utilities.

---

### 3.1 `async` / `await` — Readable Asynchronous Code

`async`/`await` is not new functionality — it is *syntax sugar* over Promises. It makes asynchronous code look and behave like synchronous code, which is dramatically easier to read, write, and debug.

**The problem it solves — "Promise chains" (callback pyramid):**

```javascript
// Before async/await — chained Promises
function loadUserDashboard(userId) {
  fetchUser(userId)
    .then(user => fetchOrders(user.id))
    .then(orders => fetchShipping(orders[0].id))
    .then(shipping => {
      console.log("Delivery:", shipping.status);
    })
    .catch(error => console.error(error));
}
```

**With async/await — linear, readable:**

```javascript
async function loadUserDashboard(userId) {
  try {
    let user     = await fetchUser(userId);
    let orders   = await fetchOrders(user.id);
    let shipping = await fetchShipping(orders[0].id);
    console.log("Delivery:", shipping.status);
  } catch (error) {
    console.error(error);
  }
}
```

Both do exactly the same thing — the second is simply much easier to understand.

**How `async` and `await` work:**

- `async` before a function means: *"this function always returns a Promise"*
- `await` inside an async function means: *"pause here until this Promise resolves, then continue"*

```javascript
// Simulated async operations (using setTimeout to fake real API calls)
function fetchProduct(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Laptop", price: 450000 }), 200);
  });
}

function fetchStock(productId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ productId, qty: 15 }), 100);
  });
}

async function getProductWithStock(productId) {
  console.log("Loading product...");

  let product = await fetchProduct(productId);
  console.log("Product loaded:", product.name);

  let stock = await fetchStock(product.id);
  console.log("Stock:", stock.qty, "units");

  return { ...product, stock: stock.qty };
}

// Calling an async function returns a Promise
getProductWithStock(1).then(result => {
  console.log("Final result:", result);
});

// Expected Output (with delays):
// Loading product...
// Product loaded: Laptop
// Stock: 15 units
// Final result: { id: 1, name: "Laptop", price: 450000, stock: 15 }
```

**An `async` function always returns a Promise:**

```javascript
async function getValue() {
  return 42; // Implicitly wrapped in Promise.resolve(42)
}

let result = getValue(); // result is a Promise, not 42
console.log(result);     // Promise { 42 }

getValue().then(val => console.log(val)); // 42
// Or:
let val = await getValue(); // 42 (inside another async function)
```

---

### 3.2 `Object.entries()` — Get Key-Value Pairs

`Object.entries()` returns an array of `[key, value]` pairs for every own enumerable property of an object. This is essential for iterating over objects with `for...of`.

```javascript
let product = {
  name:     "Laptop",
  brand:    "Dell",
  price:    450000,
  category: "Electronics"
};

// Get all [key, value] pairs
let entries = Object.entries(product);
console.log(entries);
// Expected Output:
// [
//   ["name",     "Laptop"],
//   ["brand",    "Dell"],
//   ["price",    450000],
//   ["category", "Electronics"]
// ]

// Iterate over an object (previously required for...in)
for (let [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}
// Expected Output:
// name: Laptop
// brand: Dell
// price: 450000
// category: Electronics
```

**Real-world use — building a query string from an object:**

```javascript
let filters = { category: "electronics", minPrice: 10000, maxPrice: 500000 };

let queryString = Object.entries(filters)
  .map(([key, value]) => `${key}=${value}`)
  .join("&");

console.log("?" + queryString);
// Expected Output: ?category=electronics&minPrice=10000&maxPrice=500000
```

---

### 3.3 `Object.values()` — Get Just the Values

`Object.values()` returns an array of just the values — the equivalent of `Object.keys()` but for values.

```javascript
let scores = { alice: 92, bob: 87, carol: 95, david: 78 };

let values = Object.values(scores);
console.log(values); // [92, 87, 95, 78]

// Immediately useful for calculations:
let average = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
console.log("Class average:", average); // 88
```

**`Object.keys()` vs `Object.values()` vs `Object.entries()`:**

```javascript
let car = { brand: "Toyota", model: "Camry", year: 2023 };

console.log(Object.keys(car));    // ["brand", "model", "year"]
console.log(Object.values(car));  // ["Toyota", "Camry", 2023]
console.log(Object.entries(car)); // [["brand","Toyota"],["model","Camry"],["year",2023]]
```

---

### 3.4 `String.padStart()` and `String.padEnd()`

These methods pad a string with characters until it reaches a specified length. Extremely useful for formatting output.

```javascript
// padStart(targetLength, padString) — pads from the LEFT
console.log("5".padStart(3, "0"));   // "005"
console.log("42".padStart(5, "0"));  // "00042"
console.log("hello".padStart(10));   // "     hello" (default pad is space)

// padEnd(targetLength, padString) — pads from the RIGHT
console.log("Name".padEnd(20, "."));  // "Name................"
console.log("Price".padEnd(10));      // "Price     "
```

**Real-world use — formatting tables, IDs, timestamps:**

```javascript
// Format a receipt
let items = [
  { name: "Laptop",   price: 450000 },
  { name: "Mouse",    price: 8000   },
  { name: "Keyboard", price: 12000  }
];

console.log("─".repeat(35));
items.forEach(item => {
  let namePart  = item.name.padEnd(20, " ");
  let pricePart = ("₦" + item.price.toLocaleString()).padStart(14, " ");
  console.log(namePart + pricePart);
});
console.log("─".repeat(35));

// Expected Output:
// ───────────────────────────────────
// Laptop                   ₦450,000
// Mouse                      ₦8,000
// Keyboard                  ₦12,000
// ───────────────────────────────────

// Format invoice numbers
for (let i = 1; i <= 5; i++) {
  console.log("INV-" + String(i).padStart(4, "0"));
}
// INV-0001  INV-0002  INV-0003  INV-0004  INV-0005
```

---

### 3.5 `Object.getOwnPropertyDescriptors()`

Returns all property descriptors for an object. A **property descriptor** defines the full metadata of a property: its value, whether it's writable, enumerable, and configurable.

```javascript
let user = { name: "Tunde", age: 28 };
let descriptors = Object.getOwnPropertyDescriptors(user);
console.log(descriptors);
// Expected Output:
// {
//   name: { value: "Tunde", writable: true, enumerable: true, configurable: true },
//   age:  { value: 28,      writable: true, enumerable: true, configurable: true }
// }
```

**Real-world use — deep copying objects including getters:**

`Object.assign()` copies values but *loses getter/setter definitions*. `getOwnPropertyDescriptors()` with `Object.defineProperties()` preserves them.

```javascript
let source = {
  firstName: "Babatunde",
  lastName:  "Adewale",
  get fullName() {            // This is a getter — a computed property
    return `${this.firstName} ${this.lastName}`;
  }
};

// ❌ Object.assign loses the getter — copies the current VALUE only
let copy1 = Object.assign({}, source);
console.log(Object.getOwnPropertyDescriptor(copy1, "fullName"));
// { value: "Babatunde Adewale", writable: true, ... } ← getter is gone!

// ✅ Using getOwnPropertyDescriptors preserves the getter
let copy2 = Object.create(
  Object.getPrototypeOf(source),
  Object.getOwnPropertyDescriptors(source)
);
console.log(copy2.fullName); // "Babatunde Adewale" ← getter still works
copy2.firstName = "Tunde";
console.log(copy2.fullName); // "Tunde Adewale" ← getter is live, not frozen
```

---

### 3.6 Trailing Commas in Function Parameters

ES2017 allows a trailing comma after the last parameter in function definitions and calls. This is a minor syntactic improvement.

```javascript
// ✅ Trailing comma in definition
function createUser(
  name,
  email,
  role,     // ← trailing comma — valid in ES2017+
) {
  return { name, email, role };
}

// ✅ Trailing comma in call
let user = createUser(
  "Tunde",
  "tunde@example.com",
  "admin",  // ← trailing comma — valid
);
```

**Why this matters in practice — cleaner version control diffs:**

Without trailing commas, adding a new parameter to a function requires modifying both the new line and the previous line (to add a comma). Git then shows two changed lines. With trailing commas, only the new line is added — one changed line.

---

## 4. ES2018 (ES9)

---

### 4.1 `Promise.finally()` — Always Run Cleanup Code

`finally()` adds a handler that runs **regardless** of whether a Promise resolved or rejected. It is the async equivalent of the `finally` block in `try/catch/finally`.

```javascript
function fetchUserData(userId) {
  showLoadingSpinner(); // Show spinner before request

  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(data => {
      console.log("User loaded:", data.name);
      return data;
    })
    .catch(error => {
      console.error("Failed to load user:", error.message);
      return null;
    })
    .finally(() => {
      hideLoadingSpinner(); // ALWAYS hide spinner — success or failure
      console.log("Request complete.");
    });
}
```

**Micro-demo showing both paths:**

```javascript
// Resolving path
Promise.resolve("Success!")
  .then(val   => console.log("Resolved:", val))
  .catch(err  => console.error("Rejected:", err))
  .finally(() => console.log("Finally runs — resolved path"));
// Expected Output: Resolved: Success! → Finally runs — resolved path

// Rejecting path
Promise.reject(new Error("Oops"))
  .then(val   => console.log("Resolved:", val))
  .catch(err  => console.error("Rejected:", err.message))
  .finally(() => console.log("Finally runs — rejected path"));
// Expected Output: Rejected: Oops → Finally runs — rejected path
```

---

### 4.2 Object Rest and Spread Properties

ES2018 extended the rest (`...`) and spread (`...`) operators — which existed for arrays since ES2015 — to work with **objects**.

**Object spread — copy and merge objects:**

```javascript
let defaults = { theme: "light", lang: "en", fontSize: 14, notifications: true };
let userPrefs = { theme: "dark", fontSize: 16 };

// Merge: userPrefs properties override defaults
let config = { ...defaults, ...userPrefs };
console.log(config);
// { theme: "dark", lang: "en", fontSize: 16, notifications: true }

// Add a property while copying (non-destructive):
let updatedUser = { ...user, role: "admin", updatedAt: Date.now() };
// Original `user` object is unchanged
```

**Object rest — collect remaining properties:**

```javascript
let { name, age, ...rest } = {
  name:    "Tunde",
  age:     28,
  city:    "Lagos",
  country: "Nigeria",
  role:    "developer"
};

console.log(name); // "Tunde"
console.log(age);  // 28
console.log(rest); // { city: "Lagos", country: "Nigeria", role: "developer" }
```

**Real-world use — sanitising an object before sending to an API:**

```javascript
// Remove sensitive fields before logging or sending
let fullUser = {
  id: 1,
  name: "Tunde",
  email: "tunde@example.com",
  password: "hashed_password_123",  // Should NOT be logged
  apiKey: "secret-key-xyz"          // Should NOT be sent to client
};

let { password, apiKey, ...safeUser } = fullUser;
console.log(safeUser);
// { id: 1, name: "Tunde", email: "tunde@example.com" } — no sensitive fields
```

---

### 4.3 Asynchronous Iteration — `for await...of`

`for await...of` iterates over **asynchronous iterables** — collections where each item is produced asynchronously (e.g., reading from a stream, paginated API responses).

```javascript
// Simulate a paginated API that returns one page at a time
async function* fetchPages(totalPages) {
  for (let page = 1; page <= totalPages; page++) {
    let data = await fetchPage(page); // Awaits each page
    yield data;
  }
}

async function loadAllProducts() {
  let allProducts = [];

  for await (let page of fetchPages(3)) {   // Await each yielded page
    allProducts.push(...page.products);
    console.log(`Loaded page, total so far: ${allProducts.length}`);
  }

  console.log("All products:", allProducts.length);
}
```

---

### 4.4 RegExp Improvements

ES2018 added several important regular expression features:

**Named capture groups `(?<name>...)`:**

```javascript
// Without named groups — fragile, order-dependent
let dateRegex = /(\d{4})-(\d{2})-(\d{2})/;
let match = "2024-03-15".match(dateRegex);
console.log(match[1], match[2], match[3]); // 2024 03 15 — must know group order

// With named groups — self-documenting
let namedDateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let namedMatch = "2024-03-15".match(namedDateRegex);
console.log(namedMatch.groups.year);  // 2024
console.log(namedMatch.groups.month); // 03
console.log(namedMatch.groups.day);   // 15
```

**`dotAll` flag `s` — make `.` match newlines:**

```javascript
// Without dotAll — . does not match newline characters
let text = "Hello\nWorld";
console.log(/Hello.World/.test(text));  // false — . won't match \n

// With dotAll flag s — . matches EVERYTHING including \n
console.log(/Hello.World/s.test(text)); // true
```

**Lookbehind assertions `(?<=...)` and `(?<!...)`:**

```javascript
// Positive lookbehind: match digits preceded by ₦
let prices = "Items: ₦15000 and $200";
let nairaAmounts = prices.match(/(?<=₦)\d+/g);
console.log(nairaAmounts); // ["15000"] — only the naira amount

// Negative lookbehind: match digits NOT preceded by ₦
let nonNairaAmounts = prices.match(/(?<!₦)\d+/g);
console.log(nonNairaAmounts); // ["200"] — only the non-naira amount
```

---

## 5. ES2019 (ES10)

---

### 5.1 `Array.flat()` — Flatten Nested Arrays

`flat()` creates a new array with sub-array elements merged into it, up to a specified depth.

```javascript
let nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());     // [1, 2, 3, 4, [5, 6]]  — default depth 1
console.log(nested.flat(2));    // [1, 2, 3, 4, 5, 6]    — depth 2
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6] — flatten all levels

// Real-world: flatten categories with subcategories
let categories = [
  ["Electronics", ["Phones", "Laptops", "Tablets"]],
  ["Furniture", ["Chairs", "Desks"]],
  ["Stationery"]
];

let allCategories = categories.flat(2);
console.log(allCategories);
// ["Electronics", "Phones", "Laptops", "Tablets", "Furniture", "Chairs", "Desks", "Stationery"]
```

---

### 5.2 `Array.flatMap()` — Map Then Flatten

`flatMap()` is equivalent to calling `.map()` and then `.flat(1)` — but more efficient and readable.

```javascript
let sentences = ["Hello World", "Good Morning", "How Are You"];

// map() returns nested arrays — flatMap() flattens one level automatically
let words = sentences.flatMap(sentence => sentence.split(" "));
console.log(words);
// ["Hello", "World", "Good", "Morning", "How", "Are", "You"]

// Real-world: expand each order into individual line items
let orders = [
  { id: 1, items: ["Laptop", "Mouse"] },
  { id: 2, items: ["Keyboard"] },
  { id: 3, items: ["Monitor", "HDMI Cable", "Power Strip"] }
];

let allItems = orders.flatMap(order => order.items);
console.log(allItems);
// ["Laptop", "Mouse", "Keyboard", "Monitor", "HDMI Cable", "Power Strip"]
```

---

### 5.3 `Object.fromEntries()` — Build an Object From Key-Value Pairs

`Object.fromEntries()` is the *inverse* of `Object.entries()`. It converts an array of `[key, value]` pairs (or a Map) into an object.

```javascript
// Array of entries → Object
let entries = [["name", "Tunde"], ["age", 28], ["city", "Lagos"]];
let obj = Object.fromEntries(entries);
console.log(obj); // { name: "Tunde", age: 28, city: "Lagos" }

// Round-trip: Object → entries → transform → back to Object
let prices = { laptop: 450000, mouse: 8000, keyboard: 12000 };

// Apply 10% discount to all prices
let discounted = Object.fromEntries(
  Object.entries(prices).map(([product, price]) => [product, price * 0.9])
);
console.log(discounted);
// { laptop: 405000, mouse: 7200, keyboard: 10800 }

// Map → Object
let map = new Map([["a", 1], ["b", 2], ["c", 3]]);
let objFromMap = Object.fromEntries(map);
console.log(objFromMap); // { a: 1, b: 2, c: 3 }
```

---

### 5.4 `String.trimStart()` and `String.trimEnd()`

These complement the existing `String.trim()` (which trims both ends) by trimming only one side.

```javascript
let padded = "   Hello World   ";

console.log(padded.trim());       // "Hello World"     — both sides
console.log(padded.trimStart());  // "Hello World   " — left side only
console.log(padded.trimEnd());    // "   Hello World"  — right side only

// Aliases (trimLeft/trimRight) existed before — trimStart/trimEnd are the standard names
```

**Real-world use:**

```javascript
// User input often has leading/trailing spaces from copy-pasting
function cleanInput(value) {
  return value.trimStart().trimEnd(); // Or just: value.trim()
}

// Preserve intentional indentation but remove trailing whitespace
function cleanCodeLine(line) {
  return line.trimEnd(); // Keep leading spaces (indentation), remove trailing
}
```

---

### 5.5 Optional `catch` Binding

Before ES2019, the `catch` clause *required* a parameter even if you didn't need it. ES2019 makes it optional.

```javascript
// Before ES2019 — had to include (error) even if unused
try {
  JSON.parse(invalidJson);
} catch (error) {              // 'error' parameter was mandatory
  console.log("Invalid JSON"); // We don't use 'error' at all
}

// ES2019 — parameter is optional when not needed
try {
  JSON.parse(invalidJson);
} catch {                      // No parameter needed
  console.log("Invalid JSON");
}
```

---

### 5.6 Stable `Array.sort()`

ES2019 mandated that `Array.sort()` must be **stable** — elements with equal sort keys must maintain their original relative order. Previously, this was implementation-defined and varied between browsers.

```javascript
let students = [
  { name: "Alice", grade: "B" },
  { name: "Bob",   grade: "A" },
  { name: "Carol", grade: "B" },  // Same grade as Alice
  { name: "David", grade: "A" },  // Same grade as Bob
  { name: "Eve",   grade: "B" }   // Same grade as Alice and Carol
];

// Sort by grade — Alice, Carol, Eve have equal keys
students.sort((a, b) => a.grade.localeCompare(b.grade));

console.log(students.map(s => s.name));
// Guaranteed stable output: ["Bob", "David", "Alice", "Carol", "Eve"]
// Bob and David keep their relative order (Bob was before David)
// Alice, Carol, Eve keep their relative order
```

---

## 6. ES2020 (ES11)

ES2020 was a landmark release with several major features.

---

### 6.1 `BigInt` — Integers Beyond the Safe Range

JavaScript's regular number type can only represent integers safely up to `2^53 - 1` (approximately 9 quadrillion). Beyond that, precision is lost.

```javascript
console.log(Number.MAX_SAFE_INTEGER);        // 9007199254740991

// Precision loss beyond MAX_SAFE_INTEGER:
console.log(9007199254740991 + 1);           // 9007199254740992 ✅
console.log(9007199254740991 + 2);           // 9007199254740992 ❌ Wrong! Should be ...993

// BigInt — append n to make it a BigInt literal
let bigNum = 9007199254740991n;
console.log(bigNum + 1n);                    // 9007199254740992n ✅
console.log(bigNum + 2n);                    // 9007199254740993n ✅ Correct!

// BigInt constructor from string (useful for very large numbers)
let huge = BigInt("123456789012345678901234567890");
console.log(huge); // 123456789012345678901234567890n
```

**Important limitations:**

```javascript
// Cannot mix BigInt and regular Number in arithmetic
let big = 100n;
let num = 50;
// big + num;    // ← TypeError: Cannot mix BigInt and other types

// Must convert explicitly:
console.log(big + BigInt(num));  // 150n
console.log(Number(big) + num);  // 150 (converts BigInt to Number — loses precision if huge)

// typeof BigInt:
console.log(typeof 42n); // "bigint"
```

**Real-world use:** Blockchain transactions, cryptography, IDs from databases that store 64-bit integers, financial systems with very large amounts.

---

### 6.2 `String.matchAll()` — All Regex Matches With Groups

`matchAll()` returns an **iterator** of all matches of a regex with the `g` flag, including their capture groups. Before this, getting all matches *with group information* required complex workarounds.

```javascript
let text = "Sale: ₦15,000. Discount: ₦3,000. Final: ₦12,000.";
let pattern = /₦([\d,]+)/g; // Matches ₦ followed by digits/commas

// match() — only gives the matched strings, no group info
let simpleMatches = text.match(pattern);
console.log(simpleMatches); // ["₦15,000", "₦3,000", "₦12,000"]

// matchAll() — gives full match object for each, including groups
for (let match of text.matchAll(pattern)) {
  console.log(`Full match: ${match[0]}, Amount: ${match[1]}, Index: ${match.index}`);
}
// Expected Output:
// Full match: ₦15,000, Amount: 15,000, Index: 6
// Full match: ₦3,000,  Amount: 3,000,  Index: 24
// Full match: ₦12,000, Amount: 12,000, Index: 40
```

---

### 6.3 Nullish Coalescing Operator `??`

(Already introduced in the Operators tutorial — detailed here in context of ES2020.)

`??` returns the right-hand side only when the left-hand side is `null` or `undefined`. It is the "only truly missing values" version of `||`.

```javascript
// The problem with || for defaults:
function createItem(name, qty, price) {
  return {
    name:  name  || "Unknown",   // Bug: if name is "" (empty string), gets "Unknown"
    qty:   qty   || 1,           // Bug: if qty is 0, gets 1 (zero is a valid quantity!)
    price: price || 0            // Bug: if price is 0 (free item), gets 0... ok here but unreliable
  };
}

// ✅ ?? only defaults when the value is null or undefined
function createItem2(name, qty, price) {
  return {
    name:  name  ?? "Unknown",   // Only defaults if name is null/undefined
    qty:   qty   ?? 1,           // Only defaults if qty is null/undefined — 0 stays 0
    price: price ?? 0            // Only defaults if price is null/undefined
  };
}

console.log(createItem2("Widget", 0, null)); // { name: "Widget", qty: 0, price: 0 }
//                                qty: 0 preserved ✅, price: 0 from default ✅
```

---

### 6.4 Optional Chaining `?.`

(Already introduced in the Operators tutorial — detailed here in its ES2020 context.)

```javascript
let user = {
  profile: {
    address: { city: "Lagos", postcode: null }
  }
};

// Safe deep access — returns undefined instead of throwing TypeError
console.log(user?.profile?.address?.city);       // "Lagos"
console.log(user?.profile?.address?.postcode);   // null
console.log(user?.profile?.phone?.number);       // undefined (no crash!)

// Optional method calls
let cart = null;
console.log(cart?.getTotal());    // undefined (no crash)
console.log(cart?.items?.[0]);    // undefined (no crash)

// Combined with ?? for clean defaults
let city = user?.profile?.address?.city ?? "Unknown City";
console.log(city); // "Lagos"

let phone = user?.profile?.phone?.number ?? "No phone on file";
console.log(phone); // "No phone on file"
```

---

### 6.5 `Promise.allSettled()` — Wait for All, Regardless of Outcome

`Promise.allSettled()` waits for *all* promises to complete (either resolve or reject) and returns an array of result objects. Unlike `Promise.all()`, it does **not** short-circuit on rejection.

```javascript
let requests = [
  fetch("/api/users").then(r => r.json()),    // Might succeed
  fetch("/api/broken"),                        // Might fail
  fetch("/api/products").then(r => r.json()), // Might succeed
];

// Promise.all() — fails fast if ANY request fails
// Promise.allSettled() — waits for ALL, reports each outcome

let results = await Promise.allSettled(requests);

results.forEach((result, index) => {
  if (result.status === "fulfilled") {
    console.log(`Request ${index} succeeded:`, result.value);
  } else {
    console.error(`Request ${index} failed:`, result.reason.message);
  }
});
```

**`Promise.all` vs `Promise.allSettled` comparison:**

| Feature | `Promise.all()` | `Promise.allSettled()` |
|---------|-----------------|------------------------|
| On first rejection | Rejects immediately | Continues waiting |
| Result | Array of values | Array of `{status, value/reason}` |
| Use when | All must succeed | Independent operations |
| Example | DB transaction | Dashboard widgets |

---

### 6.6 `globalThis` — Universal Global Object Reference

Different JavaScript environments have different global objects:
- Browser: `window`
- Web Worker: `self`
- Node.js: `global`

`globalThis` provides a single, consistent reference that works in all environments.

```javascript
// Before globalThis — brittle cross-environment code
const getGlobal = () => {
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  if (typeof self   !== "undefined") return self;
  throw new Error("Unable to locate global object");
};

// ES2020 — simple and universal
console.log(globalThis); // window (browser) or global (Node.js) or self (Worker)

// Useful for library authors who support multiple environments
globalThis.myLibraryVersion = "1.0.0";
```

---

### 6.7 Dynamic `import()` — Load Modules On Demand

ES2020 introduced **dynamic import** — loading a module asynchronously at runtime, instead of statically at the top of the file.

```javascript
// Static import — always loaded at startup (at the top of the file)
import { formatCurrency } from "./utils.js";

// Dynamic import — loaded on demand, returns a Promise
async function loadCharts() {
  // Only load the heavy charting library when the user actually wants a chart
  let { Chart } = await import("./heavy-chart-library.js");
  let chart = new Chart(document.getElementById("canvas"));
}

// Conditional loading — only load code for specific user roles
async function loadAdminPanel(user) {
  if (user.role === "admin") {
    let { AdminDashboard } = await import("./admin.js");
    new AdminDashboard().render();
  }
}
```

**Real-world benefit:** Dramatically reduces initial page load time by only loading JavaScript code when it is needed.

---

## 7. ES2021 (ES12)

---

### 7.1 `String.replaceAll()` — Replace Every Occurrence

Before `replaceAll()`, replacing all occurrences of a substring required a regex with the `g` flag. `replaceAll()` does it with a plain string.

```javascript
let message = "Hello world! The world is beautiful. World domination is impossible.";

// Old way — needed a regex with /g flag
let old = message.replace(/world/gi, "JavaScript");

// ES2021 — replaceAll with a plain string (case-sensitive)
let updated = message.replaceAll("world", "JavaScript");
console.log(updated);
// "Hello JavaScript! The JavaScript is beautiful. World domination is impossible."
// Note: "World" (capital W) was NOT replaced — replaceAll is case-sensitive

// For case-insensitive replacement, still use regex:
let all = message.replace(/world/gi, "JavaScript");
```

**Real-world use:**

```javascript
// Sanitise user input — remove all dangerous characters
function sanitise(input) {
  return input
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

console.log(sanitise('<script>alert("xss")</script>'));
// Expected Output: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
```

---

### 7.2 `Promise.any()` — First One to Succeed Wins

`Promise.any()` takes multiple promises and resolves as soon as *any one* of them resolves. It only rejects if *all* of them reject.

```javascript
// Try three mirrors/servers — use whichever responds first
let fastestServer = await Promise.any([
  fetch("https://server1.example.com/data"),
  fetch("https://server2.example.com/data"),
  fetch("https://server3.example.com/data")
]);
// Returns the response from whichever server replied first
```

**Promise competition methods compared:**

| Method | Resolves When | Rejects When |
|--------|--------------|-------------|
| `Promise.all()` | ALL resolve | First rejection |
| `Promise.race()` | First settles (either way) | First rejection |
| `Promise.allSettled()` | ALL settle | Never rejects |
| `Promise.any()` | First resolves | ALL reject |

**If all reject — `AggregateError`:**

```javascript
try {
  let result = await Promise.any([
    Promise.reject(new Error("Server 1 down")),
    Promise.reject(new Error("Server 2 down")),
    Promise.reject(new Error("Server 3 down"))
  ]);
} catch (err) {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors.map(e => e.message));
  // ["Server 1 down", "Server 2 down", "Server 3 down"]
}
```

---

### 7.3 Logical Assignment Operators

ES2021 introduced three compact operators that combine a logical operation with assignment. (Already documented in the Operators tutorial — expanded with real-world context here.)

```javascript
// ||= : Assign only if current value is falsy
let username = "";
username ||= "Guest";        // "" is falsy → assigns "Guest"
console.log(username);       // "Guest"

let title = "Admin";
title ||= "User";            // "Admin" is truthy → no change
console.log(title);          // "Admin"

// &&= : Assign only if current value is truthy
let user = { name: "Tunde", notifications: true };
user.notifications &&= false; // true is truthy → assigns false
console.log(user.notifications); // false

// ??= : Assign only if current value is null or undefined
let cache = null;
cache ??= {};                 // null → assigns {}
console.log(cache);           // {}

let data = 0;
data ??= 42;                  // 0 is NOT null/undefined → no change
console.log(data);            // 0  (important: 0 is preserved)
```

---

### 7.4 Numeric Separators `_`

The underscore `_` can be used as a visual separator inside numeric literals to make large numbers more readable. It has no effect on the value.

```javascript
// Hard to read
let population   = 218000000;
let salary       = 12000000;
let distance     = 384400000;  // Moon distance in metres

// ES2021 — numeric separators
let population2  = 218_000_000;   // 218 million
let salary2      = 12_000_000;    // 12 million naira
let distance2    = 384_400_000;   // 384.4 million metres
let byteMask     = 0xFF_EC_D1_12; // Hex with separator
let binary       = 0b1010_0001;   // Binary with separator

console.log(population2 === 218000000); // true — same value
console.log(salary2);                   // 12000000
```

---

### 7.5 `WeakRef` and `FinalizationRegistry`

These are advanced memory-management features for library authors. `WeakRef` holds a weak reference to an object — it does not prevent the garbage collector from removing it.

```javascript
// WeakRef — holds reference without preventing garbage collection
let target = { name: "Heavy Object", data: new Array(1000000).fill(0) };
let weakRef = new WeakRef(target);

// Access the object — might return undefined if GC has collected it
let obj = weakRef.deref();
if (obj) {
  console.log(obj.name);  // "Heavy Object" (if not yet collected)
} else {
  console.log("Object was garbage collected");
}

// FinalizationRegistry — run a callback after an object is garbage collected
let registry = new FinalizationRegistry(heldValue => {
  console.log(`Object with key "${heldValue}" was collected`);
});

let myObj = { data: "important" };
registry.register(myObj, "myObjKey"); // Register for cleanup notification
```

> 💡 **Real-world note:** `WeakRef` is used in caches where you want to keep objects as long as they're in use elsewhere, but automatically release them when they're no longer needed — without manually tracking when to delete them.

---

## 8. ES2022 (ES13)

---

### 8.1 `Array.at()`, `String.at()` — Access by Index (Including Negative)

The `at()` method accesses elements by index, with support for **negative indices** (counting from the end). Bracket notation `[index]` does not support negative indices.

```javascript
let scores = [85, 92, 78, 96, 71];

// Traditional bracket notation — no negative indexing
console.log(scores[0]);  // 85 — first
console.log(scores[4]);  // 71 — last (must know the length)
console.log(scores[-1]); // undefined — bracket notation doesn't support negatives

// ES2022 at() — supports negative indices
console.log(scores.at(0));   // 85  — first element
console.log(scores.at(-1));  // 71  — last element
console.log(scores.at(-2));  // 96  — second to last
console.log(scores.at(1));   // 92  — second element

// Works on strings too
let message = "Hello, World!";
console.log(message.at(0));   // "H"
console.log(message.at(-1));  // "!"
console.log(message.at(-6));  // "W"
```

**Real-world use:**

```javascript
// Get the most recent item in a history array
let history = [
  { page: "home",    timestamp: 1000 },
  { page: "about",   timestamp: 2000 },
  { page: "contact", timestamp: 3000 }
];

let lastVisited = history.at(-1);
console.log(lastVisited.page); // "contact"

// Get the runner-up (second place) from a sorted leaderboard
let leaderboard = ["Alice", "Bob", "Carol", "David"];
console.log(leaderboard.at(-1)); // "David" — last place
console.log(leaderboard.at(1));  // "Bob"   — second place
```

---

### 8.2 `Object.hasOwn()` — Safe Own-Property Check

`Object.hasOwn(obj, key)` checks whether an object has a property directly on itself (not inherited). It is a safer replacement for `obj.hasOwnProperty(key)`.

```javascript
let user = { name: "Tunde", age: 28 };

// Old way — hasOwnProperty can be overridden or fail on null-prototype objects
console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("toString")); // false — inherited

// ES2022 — Object.hasOwn() is safer and more concise
console.log(Object.hasOwn(user, "name"));     // true
console.log(Object.hasOwn(user, "toString")); // false

// Why it's safer — hasOwnProperty can be broken:
let dangerousObj = Object.create(null); // No prototype — no hasOwnProperty!
dangerousObj.key = "value";
// dangerousObj.hasOwnProperty("key"); // ← TypeError: not a function!
Object.hasOwn(dangerousObj, "key"); // ✅ Always works — true
```

---

### 8.3 Error `cause` Property

When rethrowing an error, you can now attach the **original error** as a `cause`, preserving the full error chain for debugging.

```javascript
async function loadConfig() {
  try {
    let response = await fetch("/api/config");
    return await response.json();
  } catch (originalError) {
    throw new Error("Failed to load application config", {
      cause: originalError  // ← Attaches the original error
    });
  }
}

try {
  await loadConfig();
} catch (err) {
  console.error("High-level error:", err.message);
  console.error("Caused by:", err.cause?.message);
}
// Expected Output:
// High-level error: Failed to load application config
// Caused by: Failed to fetch (the original network error)
```

---

### 8.4 Top-Level `await`

Before ES2022, `await` could only be used inside `async` functions. ES2022 allows `await` at the **top level of a module**.

```javascript
// Before — had to wrap everything in an async IIFE
(async () => {
  let data = await fetch("/api/data").then(r => r.json());
  console.log(data);
})();

// ES2022 — top-level await in a module file
let data = await fetch("/api/data").then(r => r.json());
console.log(data); // Works directly at module top level!

// Practical: configure module based on async operation
let config = await loadConfiguration();
export const API_URL = config.apiUrl;
export const MAX_RETRIES = config.maxRetries;
```

> 💡 **Note:** Top-level `await` only works in ES modules (files with `type="module"` or `.mjs` extension). It does not work in regular scripts.

---

### 8.5 Private Class Fields `#`

Class fields prefixed with `#` are truly **private** — they cannot be accessed from outside the class at all (not even with `obj["#fieldName"]`).

```javascript
class BankAccount {
  #balance = 0;          // Private field
  #transactionLog = [];  // Private field
  owner;                 // Public field

  constructor(owner, initialDeposit) {
    this.owner = owner;
    this.#deposit(initialDeposit); // Can call private methods internally
  }

  #deposit(amount) {      // Private method
    if (amount <= 0) throw new RangeError("Deposit must be positive");
    this.#balance += amount;
    this.#transactionLog.push({ type: "deposit", amount, date: new Date() });
  }

  deposit(amount) {       // Public method — validates then calls private
    this.#deposit(amount);
    console.log(`Deposited ₦${amount.toLocaleString()}. New balance: ₦${this.#balance.toLocaleString()}`);
  }

  get balance() {         // Public getter — controlled read access
    return this.#balance;
  }
}

let account = new BankAccount("Tunde", 50000);
account.deposit(10000);
// Expected Output: Deposited ₦10,000. New balance: ₦60,000

console.log(account.balance);         // 60000 ✅ via public getter
console.log(account.#balance);        // SyntaxError ❌ cannot access private field
console.log(account["#balance"]);     // undefined ❌ not accessible
```

---

### 8.6 Static Class Blocks

Static class blocks let you run initialisation code for static fields at class definition time.

```javascript
class DatabaseConfig {
  static host;
  static port;
  static maxConnections;

  static {
    // Complex static initialisation logic
    if (process.env.NODE_ENV === "production") {
      DatabaseConfig.host           = "prod-db.example.com";
      DatabaseConfig.port           = 5432;
      DatabaseConfig.maxConnections = 100;
    } else {
      DatabaseConfig.host           = "localhost";
      DatabaseConfig.port           = 5432;
      DatabaseConfig.maxConnections = 10;
    }
    console.log("Database configured for:", DatabaseConfig.host);
  }
}

console.log(DatabaseConfig.host); // "localhost" (in development)
```

---

## 9. ES2023 (ES14)

ES2023 was largely focused on making array operations safer and more functional by introducing **non-mutating (immutable) versions** of existing array methods.

---

### 9.1 `Array.findLast()` and `Array.findLastIndex()`

These search from the **end** of the array instead of the beginning — the mirror of `find()` and `findIndex()`.

```javascript
let transactions = [
  { id: 1, type: "credit", amount: 50000 },
  { id: 2, type: "debit",  amount: 12000 },
  { id: 3, type: "credit", amount: 25000 },
  { id: 4, type: "debit",  amount: 5000  },
  { id: 5, type: "credit", amount: 8000  }
];

// find()     — finds FIRST match (from beginning)
let firstCredit = transactions.find(t => t.type === "credit");
console.log(firstCredit.id); // 1

// findLast() — finds LAST match (from end)
let lastCredit = transactions.findLast(t => t.type === "credit");
console.log(lastCredit.id);  // 5

// findLastIndex()
let lastCreditIndex = transactions.findLastIndex(t => t.type === "credit");
console.log(lastCreditIndex); // 4

// Real-world: find the most recent failed login attempt
let loginAttempts = [
  { success: true,  time: "09:00" },
  { success: false, time: "09:05" },
  { success: false, time: "09:10" },
  { success: true,  time: "09:15" }
];

let lastFailure = loginAttempts.findLast(a => !a.success);
console.log(lastFailure.time); // "09:10"
```

---

### 9.2 Non-Mutating Array Methods — The ES2023 Immutability Suite

Before ES2023, several array operations **mutated** (permanently changed) the original array. ES2023 introduced non-mutating alternatives that return a **new array**, leaving the original unchanged.

This is critical for React state management, functional programming, and any situation where you need to preserve the original data.

#### `Array.toReversed()` vs `Array.reverse()`

```javascript
let original = [1, 2, 3, 4, 5];

// reverse() — MUTATES the original
let reversed = original.reverse();
console.log(original);  // [5, 4, 3, 2, 1] ← Original is now changed!
console.log(reversed);  // [5, 4, 3, 2, 1]

// toReversed() — NON-MUTATING, returns a new array
let original2 = [1, 2, 3, 4, 5];
let reversed2 = original2.toReversed();
console.log(original2); // [1, 2, 3, 4, 5] ← Original preserved ✅
console.log(reversed2); // [5, 4, 3, 2, 1] ← New array
```

#### `Array.toSorted()` vs `Array.sort()`

```javascript
let prices = [450000, 8000, 12000, 32000, 1200];

// sort() — MUTATES the original
let sorted = prices.sort((a, b) => a - b);
console.log(prices);   // [1200, 8000, 12000, 32000, 450000] ← Original changed!

// toSorted() — NON-MUTATING
let prices2 = [450000, 8000, 12000, 32000, 1200];
let sorted2 = prices2.toSorted((a, b) => a - b);
console.log(prices2);  // [450000, 8000, 12000, 32000, 1200] ← Original preserved ✅
console.log(sorted2);  // [1200, 8000, 12000, 32000, 450000]
```

#### `Array.toSpliced()` vs `Array.splice()`

```javascript
let items = ["apple", "banana", "cherry", "date"];

// splice() — MUTATES and returns removed elements
let removed = items.splice(1, 2, "blueberry"); // Remove 2, insert 1 at index 1
console.log(items);    // ["apple", "blueberry", "date"] ← Original changed!
console.log(removed);  // ["banana", "cherry"]

// toSpliced() — NON-MUTATING, returns new array with changes applied
let items2 = ["apple", "banana", "cherry", "date"];
let spliced = items2.toSpliced(1, 2, "blueberry");
console.log(items2);   // ["apple", "banana", "cherry", "date"] ← Original preserved ✅
console.log(spliced);  // ["apple", "blueberry", "date"]
```

#### `Array.with()` — Non-Mutating Index Update

`with(index, value)` returns a new array with one element replaced at the given index.

```javascript
let scores = [85, 92, 78, 96, 71];

// Before — to update one element without mutation:
let updated = [...scores.slice(0, 2), 99, ...scores.slice(3)]; // Cumbersome!

// ES2023 — with() is clean and expressive
let updated2 = scores.with(2, 99); // Replace index 2 (78) with 99
console.log(scores);   // [85, 92, 78, 96, 71] ← Original preserved ✅
console.log(updated2); // [85, 92, 99, 96, 71]

// Negative indices supported:
let updated3 = scores.with(-1, 100); // Replace last element
console.log(updated3); // [85, 92, 78, 96, 100]
```

---

### 9.3 Hashbang / Shebang Grammar `#!`

ES2023 officially standardised support for the hashbang line at the start of JavaScript files — used in Unix-like systems to specify the interpreter for executable scripts.

```javascript
#!/usr/bin/env node
// This line tells the OS to run this file with Node.js

console.log("Hello from a Node.js script!");
```

This allows JavaScript files to be run directly on Unix/Linux/macOS (`./script.js`) without explicitly typing `node script.js`, as long as the file has execute permissions.

---

## 10. ES2024 (ES15)

---

### 10.1 `Object.groupBy()` and `Map.groupBy()` — Group Elements by Criteria

`Object.groupBy()` groups array elements into an object based on a callback that returns a key for each element.

```javascript
let products = [
  { name: "Laptop",       category: "Electronics", price: 450000 },
  { name: "Office Chair", category: "Furniture",   price: 85000  },
  { name: "Notebook",     category: "Stationery",  price: 1200   },
  { name: "Headphones",   category: "Electronics", price: 32000  },
  { name: "Desk Lamp",    category: "Furniture",   price: 7500   },
  { name: "Pen Set",      category: "Stationery",  price: 800    }
];

// Group by category
let byCategory = Object.groupBy(products, product => product.category);
console.log(byCategory);
// Expected Output:
// {
//   Electronics: [ {name: "Laptop"...}, {name: "Headphones"...} ],
//   Furniture:   [ {name: "Office Chair"...}, {name: "Desk Lamp"...} ],
//   Stationery:  [ {name: "Notebook"...}, {name: "Pen Set"...} ]
// }

// Group by price range
let byRange = Object.groupBy(products, product => {
  if (product.price >= 100000) return "premium";
  if (product.price >= 10000)  return "mid-range";
  return "budget";
});
console.log(Object.keys(byRange)); // ["premium", "mid-range", "budget"]
console.log(byRange.budget.map(p => p.name)); // ["Notebook", "Desk Lamp", "Pen Set"]
```

**`Map.groupBy()` — when keys are objects (not strings):**

```javascript
// Use Map.groupBy when you need non-string keys
let people = [
  { name: "Alice", age: 17 },
  { name: "Bob",   age: 25 },
  { name: "Carol", age: 15 },
  { name: "David", age: 32 }
];

const ADULT   = { label: "Adult" };
const MINOR   = { label: "Minor" };

let grouped = Map.groupBy(people, person => person.age >= 18 ? ADULT : MINOR);

console.log(grouped.get(ADULT));  // [{name:"Bob"...},{name:"David"...}]
console.log(grouped.get(MINOR));  // [{name:"Alice"...},{name:"Carol"...}]
```

---

### 10.2 `Promise.withResolvers()` — Deconstructed Promise Creation

Previously, to expose a Promise's `resolve` and `reject` functions to outer scope required awkward variable juggling. `Promise.withResolvers()` returns all three together.

```javascript
// Old pattern — extracting resolve/reject is awkward
let resolve, reject;
let promise = new Promise((res, rej) => {
  resolve = res; // Leak out of the constructor
  reject  = rej;
});
// Now resolve and reject can be called from outside

// ES2024 — clean and explicit
let { promise: loadPromise, resolve: resolveLoad, reject: rejectLoad } = Promise.withResolvers();

// Resolve or reject from anywhere:
document.getElementById("loadBtn").addEventListener("click", () => {
  resolveLoad("Data loaded!");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  rejectLoad(new Error("User cancelled"));
});

loadPromise
  .then(msg  => console.log(msg))
  .catch(err => console.error(err.message));
```

---

### 10.3 RegExp `v` Flag — Extended Unicode and Set Notation

The `v` flag (unicodeSets) is an upgrade to the existing `u` flag, providing more powerful Unicode matching and **set notation** inside character classes.

```javascript
// Set intersection — match characters in BOTH sets
let emojiLetters = /[\p{Emoji}&&\p{Letter}]/v.test("🅰"); // true — emoji AND letter

// Set difference — characters in first set but NOT in second
let notAsciiDigit = /[\p{Number}--\p{ASCII}]/v; // Non-ASCII number characters

// Nested classes and string literals in character classes
let hexDigit = /[\dA-Fa-f]/v; // Standard hex digit matching — cleaner with v flag
```

---

### 10.4 `ArrayBuffer` Resizing — `resize()` and `transfer()`

ES2024 added the ability to resize `ArrayBuffer` objects in place — important for binary data processing, WebAssembly, and high-performance applications.

```javascript
// Create a resizable ArrayBuffer
let buffer = new ArrayBuffer(16, { maxByteLength: 64 });
console.log(buffer.byteLength);         // 16
console.log(buffer.resizable);          // true

buffer.resize(32); // Resize to 32 bytes
console.log(buffer.byteLength);         // 32

// transfer() — move data to a new ArrayBuffer of a different size
let original = new ArrayBuffer(8);
let transferred = original.transfer(16); // Move to new 16-byte buffer
console.log(transferred.byteLength);     // 16
console.log(original.detached);          // true — original is no longer usable
```

---

## 11. ES2025 (ES16)

---

### 11.1 New `Set` Methods — Mathematical Set Operations

ES2025 added a full suite of mathematical set operations to the `Set` object. These methods work on any set-like object (anything with `has()`, `keys()`, and `size`).

```javascript
let setA = new Set([1, 2, 3, 4, 5]);
let setB = new Set([4, 5, 6, 7, 8]);
```

#### `Set.prototype.union()` — All elements from both sets

```javascript
let union = setA.union(setB);
console.log([...union]); // [1, 2, 3, 4, 5, 6, 7, 8]
```

#### `Set.prototype.intersection()` — Only elements in both sets

```javascript
let intersection = setA.intersection(setB);
console.log([...intersection]); // [4, 5]
```

#### `Set.prototype.difference()` — Elements in A but NOT in B

```javascript
let difference = setA.difference(setB);
console.log([...difference]); // [1, 2, 3]
```

#### `Set.prototype.symmetricDifference()` — Elements in either but NOT both

```javascript
let symDiff = setA.symmetricDifference(setB);
console.log([...symDiff]); // [1, 2, 3, 6, 7, 8]
```

#### `Set.prototype.isSubsetOf()` and `isSupersetOf()`

```javascript
let admins  = new Set(["alice", "bob"]);
let editors = new Set(["alice", "bob", "carol", "david"]);

console.log(admins.isSubsetOf(editors));   // true  — all admins are in editors
console.log(editors.isSupersetOf(admins)); // true  — editors contains all admins
```

#### `Set.prototype.isDisjointFrom()` — No elements in common

```javascript
let cats = new Set(["whiskers", "shadow"]);
let dogs = new Set(["rex", "buddy"]);
console.log(cats.isDisjointFrom(dogs)); // true — no animals in common
```

**Real-world use — permission and role management:**

```javascript
let userPermissions    = new Set(["read", "write", "comment"]);
let requiredPermissions = new Set(["read", "write"]);
let adminPermissions   = new Set(["read", "write", "delete", "admin"]);

console.log(requiredPermissions.isSubsetOf(userPermissions));
// true — user has all required permissions ✅

let missingPermissions = adminPermissions.difference(userPermissions);
console.log([...missingPermissions]); // ["delete", "admin"]
// User needs these permissions to become admin
```

---

### 11.2 Iterator Helper Methods

ES2025 adds chainable methods directly to iterators — similar to array methods but operating lazily (on demand, without creating intermediate arrays).

```javascript
// Array methods require creating intermediate arrays at each step:
let result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  .filter(n => n % 2 === 0)   // Creates new array [2, 4, 6, 8, 10]
  .map(n => n * n)             // Creates new array [4, 16, 36, 64, 100]
  .slice(0, 3);                // Creates new array [4, 16, 36]

// Iterator helpers — lazy, no intermediate arrays:
let lazyResult = [1,2,3,4,5,6,7,8,9,10]
  .values()                    // Get iterator
  .filter(n => n % 2 === 0)   // Lazy filter — no array created yet
  .map(n => n * n)             // Lazy map
  .take(3);                    // Take only first 3 results

console.log([...lazyResult]); // [4, 16, 36]
```

**Available iterator helpers:**

| Method | Description |
|--------|-------------|
| `.map(fn)` | Transform each value |
| `.filter(fn)` | Keep values matching predicate |
| `.take(n)` | Take first n values |
| `.drop(n)` | Skip first n values |
| `.flatMap(fn)` | Map and flatten |
| `.forEach(fn)` | Run side effects |
| `.some(fn)` | Test if any match |
| `.every(fn)` | Test if all match |
| `.find(fn)` | Find first match |
| `.reduce(fn)` | Accumulate to a single value |
| `.toArray()` | Materialise to an array |

---

### 11.3 `Promise.try()` — Wrap Sync or Async Code Uniformly

`Promise.try()` runs a function and always returns a Promise, regardless of whether the function is synchronous or asynchronous, throwing or not. It simplifies error handling when you don't know if code is sync or async.

```javascript
// Before Promise.try() — inconsistent error handling
function process(input) {
  // This might throw synchronously OR return a rejected Promise
  if (!input) throw new Error("No input");
  return fetch(`/api/process/${input}`);
}

// To catch both sync throws AND async rejections:
let result = Promise.resolve()
  .then(() => process(input)) // Wraps sync throw in a Promise rejection
  .catch(handleError);

// ES2025 — Promise.try() does this cleanly
let result2 = Promise.try(() => process(input))
  .catch(handleError); // Catches BOTH sync throws and async rejections
```

---

### 11.4 Import Attributes — `with` Keyword

Import attributes let you specify metadata about what you're importing, most commonly the type of a non-JavaScript module.

```javascript
// Import a JSON file directly as a module
import config from "./config.json" with { type: "json" };
console.log(config.apiUrl); // Access JSON properties directly

// Import a CSS module
import styles from "./component.css" with { type: "css" };

// Dynamic import with attributes
let data = await import("./data.json", { with: { type: "json" } });
```

---

### 11.5 RegExp Duplicate Named Capture Groups

ES2025 allows the same capture group name to appear in different alternatives of a regex (separated by `|`).

```javascript
// Useful for matching different date formats with the same group names
let datePattern = /(?<year>\d{4})-(?<month>\d{2})|(?<month>\d{2})\/(?<year>\d{4})/;
// Before ES2025 — this was a SyntaxError (duplicate group name)
// ES2025 — allowed when groups are in separate alternatives

let match1 = "2024-03".match(datePattern);
let match2 = "03/2024".match(datePattern);

console.log(match1?.groups.year, match1?.groups.month); // 2024 03
console.log(match2?.groups.year, match2?.groups.month); // 2024 03
// Both date formats parse to the same named groups
```

---

## 12. ES2026 (ES17)

ES2026 is the most recent specification. Features are confirmed but browser support is still rolling out.

---

### 12.1 `Float16Array` and `Math.f16round()`

ES2026 introduces 16-bit floating-point support. Float16 (half-precision) uses half the memory of Float32 and is widely used in machine learning, graphics, and sensor data.

```javascript
// New TypedArray for 16-bit floats
let float16 = new Float16Array(4);
float16[0] = 3.14;
float16[1] = 1.5;
float16[2] = 0.1;
console.log(float16[0]); // 3.140625 — closest representable float16 value

// Math.f16round() — rounds a number to nearest float16
console.log(Math.f16round(3.14));   // 3.140625
console.log(Math.f16round(0.1));    // 0.099975586 — float16 approximation
console.log(Math.f16round(65504));  // 65504 — max float16 value
console.log(Math.f16round(100000)); // Infinity — exceeds float16 range
```

**Real-world use:** Machine learning model weights, WebGL shaders, IoT sensor readings, reduced-bandwidth data transmission.

---

### 12.2 `Error.isError()` — Reliably Detect Errors

A reliable, cross-realm way to check if a value is an Error object. `instanceof Error` fails when the Error comes from a different JavaScript context (iframe, VM module, etc.).

```javascript
// instanceof Error — fails across realms
let iframeError = iframe.contentWindow.Error("cross-realm error");
console.log(iframeError instanceof Error); // false ← fails cross-realm!

// Error.isError() — works in all contexts
console.log(Error.isError(iframeError));   // true ✅

// Standard errors
console.log(Error.isError(new Error("test")));         // true
console.log(Error.isError(new TypeError("bad type"))); // true
console.log(Error.isError({ message: "fake error" })); // false — plain object
console.log(Error.isError("a string error"));          // false
console.log(Error.isError(null));                      // false

// Practical use in catch blocks
function handleAny(thrown) {
  if (Error.isError(thrown)) {
    console.error("Error:", thrown.message, "\nStack:", thrown.stack);
  } else {
    console.error("Non-error thrown:", thrown);
  }
}
```

---

### 12.3 `Math.sumPrecise()` — Accurate Floating-Point Summation

`Math.sumPrecise()` sums an iterable of numbers with maximum precision, avoiding the floating-point accumulation errors that affect regular addition.

```javascript
// The floating-point problem with regular summation
let values = [0.1, 0.2, 0.3, 0.4];
let naiveSum = values.reduce((a, b) => a + b, 0);
console.log(naiveSum);            // 0.9999999999999999 ← imprecise!
console.log(naiveSum === 1.0);    // false

// ES2026 — Math.sumPrecise()
let preciseSum = Math.sumPrecise(values);
console.log(preciseSum);          // 1.0 ← exact!
console.log(preciseSum === 1.0);  // true

// Works on any iterable
let set = new Set([0.1, 0.2, 0.3, 0.4]);
console.log(Math.sumPrecise(set));         // 1.0

function* generateValues() {
  yield 0.1; yield 0.2; yield 0.3; yield 0.4;
}
console.log(Math.sumPrecise(generateValues())); // 1.0
```

**Real-world impact:** Financial calculations, scientific computing, statistical analysis — anywhere floating-point accumulation errors cause problems.

---

### 12.4 `Atomics.pause()` — Efficient Spin-Wait in Shared Memory

`Atomics.pause()` is a hint to the CPU to optimise spin-wait loops in shared-memory multithreaded code (SharedArrayBuffer + Web Workers).

```javascript
// In a Web Worker spin-wait loop
while (Atomics.load(sharedInt32, 0) !== 1) {
  Atomics.pause(); // Hint CPU to pause briefly — reduces power, improves performance
}
// Lock acquired — proceed
```

This is primarily for library authors building high-performance concurrent data structures.

---

### 12.5 ES2026 Feature Overview

| Feature | Purpose |
|---------|---------|
| `Float16Array` | 16-bit float typed array |
| `Math.f16round()` | Round to nearest float16 |
| `Error.isError()` | Cross-realm error detection |
| `Math.sumPrecise()` | Precise floating-point sum |
| `Atomics.pause()` | Spin-wait optimisation hint |

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Version Timeline Mapping

**Objective:** Match each feature to the correct ES version without looking at the tutorial.

Match each feature on the left to its year on the right:

| Feature | Year |
|---------|------|
| `Array.includes()` | ES2016 |
| `async`/`await` | ES2017 |
| Object spread `{...obj}` | ES2018 |
| `Array.flat()` | ES2019 |
| `BigInt` | ES2020 |
| `String.replaceAll()` | ES2021 |
| `Array.at()` | ES2022 |
| `Array.toSorted()` | ES2023 |
| `Object.groupBy()` | ES2024 |
| `Set.prototype.union()` | ES2025 |
| `Error.isError()` | ES2026 |

**Step-by-step instructions:**
1. Cover the year column
2. For each feature, write what version you think introduced it
3. Uncover and check your answers
4. For every wrong answer, re-read that feature's section and write one sentence explaining what it does

---

## Exercise 2 — Feature Application Lab

**Objective:** Use the correct modern feature for each scenario.

**Scenario 1 (ES2016–ES2017):** You have an array of product IDs that might include `NaN` entries from a buggy data import. Write a function that checks for `NaN` safely and calculates `2 ** n` where n is the count of valid (non-NaN) entries.

```javascript
let productIds = [101, 202, NaN, 304, NaN, 405];
// Expected: 2 valid NaN entries found, 4 valid IDs, result = 2 ** 4 = 16
```

**Scenario 2 (ES2018–ES2019):** You have a deeply nested API response. Use object rest to extract the top-level fields you need and put the rest in a `meta` object. Then use `Object.fromEntries()` to convert a Map of exchange rates into a plain object.

```javascript
let apiResponse = {
  data: { users: [{ id: 1, name: "Tunde" }] },
  total: 150,
  page: 1,
  perPage: 20,
  currency: "NGN",
  timestamp: 1700000000
};
// Extract: data, total. Put the rest in `pagination`.

let exchangeRates = new Map([["USD", 1500], ["EUR", 1650], ["GBP", 1900]]);
// Convert to a plain object
```

**Scenario 3 (ES2020–ES2021):** Write a `safeGet(obj, ...path)` function that safely accesses a deeply nested property without throwing. Use optional chaining and nullish coalescing.

```javascript
let config = {
  server: { host: "localhost", port: 3000 },
  database: { host: "db.local" }
};

safeGet(config, "server", "port");          // 3000
safeGet(config, "database", "port");        // 8080 (default)
safeGet(config, "cache", "host");           // "127.0.0.1" (default)
```

**Scenario 4 (ES2022–ES2023):** You have a sorted leaderboard array. Use `at()` to get the top 3 and bottom 3. Then use `toSorted()` to get a new array sorted by score descending without affecting the original.

```javascript
let leaderboard = [
  { name: "Alice",  score: 9500 },
  { name: "Bob",    score: 8200 },
  { name: "Carol",  score: 7800 },
  { name: "David",  score: 6100 },
  { name: "Eve",    score: 5400 },
  { name: "Frank",  score: 4200 }
];
```

**Scenario 5 (ES2024–ES2025):** Use `Object.groupBy()` to group a list of employees by department. Then use Set methods to find: employees in both Engineering AND Management, and employees in Engineering but NOT in Management.

```javascript
let employees = [
  { name: "Alice",  dept: "Engineering" },
  { name: "Bob",    dept: "Management" },
  { name: "Carol",  dept: "Engineering" },
  { name: "David",  dept: "Management" },
  { name: "Eve",    dept: "Engineering" },
  { name: "Frank",  dept: "Sales" }
];
```

---

## Exercise 3 — Mutation vs Immutation Comparison

**Objective:** Demonstrate the importance of non-mutating array methods in state management.

**Setup:**

```javascript
// Simulate a React-like state management system
let state = {
  cart: [
    { id: 1, name: "Laptop",   qty: 1, price: 450000 },
    { id: 2, name: "Mouse",    qty: 2, price: 8000   },
    { id: 3, name: "Keyboard", qty: 1, price: 12000  }
  ]
};

// ❌ WRONG: Mutating state directly
function removeItemBad(itemId) {
  state.cart.sort((a, b) => a.price - b.price); // Mutates!
  // Now state.cart is permanently sorted — unexpected!
}

// ✅ CORRECT: Using non-mutating methods
function removeItemGood(itemId) {
  let sortedCart = state.cart.toSorted((a, b) => a.price - b.price);
  // state.cart is unchanged — only sortedCart is sorted
  return sortedCart.filter(item => item.id !== itemId);
}
```

**Step-by-step instructions:**
1. Run `removeItemBad(2)` and log `state.cart` — notice the sort persisted
2. Reset `state.cart` to original
3. Run `removeItemGood(2)` and log both `state.cart` and the return value
4. Confirm `state.cart` is unchanged
5. Write a `updateQty(itemId, newQty)` function using `with()` that returns a new cart array with one item's qty changed, leaving the original array unchanged
6. Write a `sortByPrice()` function using `toSorted()` that returns a sorted copy

---

## Exercise 4 — Async Feature Evolution

**Objective:** Rewrite the same task using callbacks, then Promises, then async/await — observing the evolution.

**Task:** Fetch a user, then fetch their orders, then fetch shipping for the first order. Log a summary.

```javascript
// Step 1: Write it with callbacks (simulated)
function loadSummaryCallbacks(userId, callback) {
  fetchUser(userId, (err, user) => {
    if (err) return callback(err);
    fetchOrders(user.id, (err, orders) => {
      if (err) return callback(err);
      fetchShipping(orders[0].id, (err, shipping) => {
        if (err) return callback(err);
        callback(null, { user, orders, shipping });
      });
    });
  });
}

// Step 2: Rewrite with Promises + .then()
function loadSummaryPromises(userId) {
  // Your code here
}

// Step 3: Rewrite with async/await + try/catch
async function loadSummaryAsync(userId) {
  // Your code here
}

// Step 4: Add Promise.allSettled() to load user AND orders IN PARALLEL
// instead of sequentially
```

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Modern JavaScript Feature Showcase — Smart Product Catalogue

**Overview:** You will build a comprehensive product catalogue module that deliberately uses one feature from each ES version (2016–2026). The module will demonstrate real-world applicability of modern JavaScript.

**Real-world connection:** Product catalogues are the core of every e-commerce platform — Paystack Storefront, Shopify, Amazon. Every feature you build here maps directly to production code at these companies.

---

### Stage 1 — Data Layer (ES2016 – ES2019)

```javascript
"use strict";

// ── ES2016: Exponentiation for price scaling
const PRICE_SCALE_FACTOR = 10 ** 3; // Used for storing prices as integers (kobo)

// ── ES2017: async/await for data loading
class ProductDatabase {
  #products = []; // ES2022: private field

  async load() {
    // Simulate async loading
    this.#products = await this.#fetchProducts();
    console.log(`Loaded ${this.#products.length} products`);
    return this;
  }

  async #fetchProducts() { // ES2022: private async method
    return new Promise(resolve => setTimeout(() => resolve([
      { id: 1, name: "Laptop Pro",    price: 450000, category: "Electronics", tags: ["portable","work"], stock: 15 },
      { id: 2, name: "Office Chair",  price: 85000,  category: "Furniture",   tags: ["ergonomic","work"], stock: 8  },
      { id: 3, name: "Wireless Mouse",price: 12000,  category: "Electronics", tags: ["portable","wireless"], stock: 42 },
      { id: 4, name: "Standing Desk", price: 125000, category: "Furniture",   tags: ["ergonomic","height-adjustable"], stock: 5  },
      { id: 5, name: "Notebook A5",   price: 1200,   category: "Stationery",  tags: ["writing"], stock: 200 },
      { id: 6, name: "Noise Headphones", price: 65000, category: "Electronics", tags: ["portable","audio"], stock: 0  },
      { id: 7, name: "Pen Set",       price: 800,    category: "Stationery",  tags: ["writing","bulk"], stock: 500 },
      { id: 8, name: "Monitor 27\"",  price: 180000, category: "Electronics", tags: ["work","display"], stock: 20  }
    ]), 300));
  }

  // ── ES2016: Array.includes() for stock/availability check
  isAvailable(productId) {
    let inStockIds = this.#products
      .filter(p => p.stock > 0)
      .map(p => p.id);
    return inStockIds.includes(productId);
  }

  // ── ES2017: Object.entries() / Object.values() for analytics
  getPriceStats() {
    let prices = Object.values(
      Object.fromEntries( // ES2019: Object.fromEntries()
        this.#products.map(p => [p.name, p.price])
      )
    );
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
    };
  }

  // ── ES2019: Array.flat() for tag collection
  getAllTags() {
    return [...new Set(this.#products.flatMap(p => p.tags))]; // ES2019: flatMap
  }

  // ── ES2018: Object rest — return product without internal fields
  getPublicProduct(id) {
    let product = this.#products.find(p => p.id === id);
    if (!product) return null;
    let { stock, ...publicData } = product; // ES2018: object rest — remove stock from public view
    return publicData;
  }

  get all() { return [...this.#products]; } // Return a copy, not the original
}

// ── Test Stage 1
let db = await new ProductDatabase().load();
// Expected: Loaded 8 products

console.log("Is Laptop available?", db.isAvailable(1)); // true (stock: 15)
console.log("Are Headphones available?", db.isAvailable(6)); // false (stock: 0)

let stats = db.getPriceStats();
console.log("Price stats:", stats);
// { min: 800, max: 450000, avg: ~64875 }

console.log("All tags:", db.getAllTags());
// ["portable","work","ergonomic","wireless","height-adjustable","writing","audio","bulk","display"]
```

---

### Stage 2 — Query and Search Layer (ES2020 – ES2022)

```javascript
class ProductCatalogue {
  #db;

  constructor(database) {
    this.#db = database;
  }

  // ── ES2020: Optional chaining + nullish coalescing for safe filtering
  search(options = {}) {
    let {
      query      = "",
      category   = null,
      minPrice   = 0,
      maxPrice   = Infinity,
      inStockOnly = false,
      sortBy     = "name"
    } = options;

    let results = this.#db.all
      .filter(p => {
        let matchesQuery    = query === "" || p.name.toLowerCase().includes(query.toLowerCase());
        let matchesCategory = category === null || p.category === category;
        let matchesPrice    = p.price >= minPrice && p.price <= maxPrice;
        let matchesStock    = !inStockOnly || p.stock > 0;
        return matchesQuery && matchesCategory && matchesPrice && matchesStock;
      });

    // ── ES2023: toSorted() — non-mutating sort
    return results.toSorted((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
  }

  // ── ES2024: Object.groupBy() for category breakdown
  groupByCategory() {
    return Object.groupBy(this.#db.all, p => p.category);
  }

  // ── ES2024: Object.groupBy() for price tier segmentation
  groupByPriceTier() {
    return Object.groupBy(this.#db.all, p => {
      if (p.price >= 100000) return "premium";
      if (p.price >= 20000)  return "mid-range";
      return "budget";
    });
  }

  // ── ES2022: Array.at() for top/bottom products
  getTopProduct(category = null) {
    let source = category ? this.search({ category, sortBy: "price-desc" }) : this.#db.all;
    return source.toSorted((a, b) => b.price - a.price).at(0);
  }

  getBudgetPick(category = null) {
    let source = category ? this.search({ category, inStockOnly: true }) : this.#db.all.filter(p => p.stock > 0);
    return source.toSorted((a, b) => a.price - b.price).at(0);
  }

  // ── ES2020: Promise.allSettled() — fetch enriched data for multiple products
  async getEnrichedProducts(ids) {
    let fetches = ids.map(id =>
      // Simulate enrichment API (reviews, related products, etc.)
      new Promise((resolve, reject) => {
        setTimeout(() => {
          let product = this.#db.all.find(p => p.id === id);
          product
            ? resolve({ ...product, rating: (3.5 + Math.random() * 1.5).toFixed(1) })
            : reject(new Error(`Product ${id} not found`));
        }, Math.random() * 200);
      })
    );

    let results = await Promise.allSettled(fetches);

    return {
      enriched: results.filter(r => r.status === "fulfilled").map(r => r.value),
      failed:   results.filter(r => r.status === "rejected").map(r => r.reason.message)
    };
  }
}

// ── Test Stage 2
let catalogue = new ProductCatalogue(db);

let electronicsUnder100k = catalogue.search({
  category: "Electronics",
  maxPrice: 100000,
  inStockOnly: true,
  sortBy: "price-asc"
});
console.log("Electronics under ₦100k:", electronicsUnder100k.map(p => `${p.name} (₦${p.price.toLocaleString()})`));
// ["Wireless Mouse (₦12,000)", "Noise Headphones" (out of stock, filtered), ...]

let byCategory = catalogue.groupByCategory();
console.table(Object.entries(byCategory).map(([cat, items]) => ({
  Category: cat,
  Count: items.length,
  "Total Stock": items.reduce((s, p) => s + p.stock, 0)
})));

let { enriched, failed } = await catalogue.getEnrichedProducts([1, 2, 99]);
console.log("Enriched:", enriched.map(p => `${p.name} ★${p.rating}`));
console.log("Failed:", failed);
// Enriched: ["Laptop Pro ★4.2", "Office Chair ★3.8"]
// Failed: ["Product 99 not found"]
```

---

### Stage 3 — Cart and Permissions Layer (ES2021 – ES2026)

```javascript
class Cart {
  #items = [];
  #promoCode = null;

  // ── ES2021: Logical assignment operators
  applyPromo(code) {
    this.#promoCode ??= code; // Only set if no promo already applied
    console.log("Promo code:", this.#promoCode);
  }

  addItem(product, qty = 1) {
    let existingIndex = this.#items.findLastIndex(i => i.id === product.id); // ES2023
    if (existingIndex !== -1) {
      // ── ES2023: Array.with() — non-mutating update
      this.#items = this.#items.with(existingIndex, {
        ...this.#items[existingIndex],
        qty: this.#items[existingIndex].qty + qty
      });
    } else {
      this.#items = [...this.#items, { ...product, qty }];
    }
  }

  removeItem(productId) {
    this.#items = this.#items.filter(i => i.id !== productId);
  }

  // ── ES2021: String.replaceAll() — format receipt
  formatReceipt() {
    let template = "ITEM_NAME : QTY x UNIT_PRICE = LINE_TOTAL";
    let lines = this.#items.map(item => {
      let lineTotal = item.price * item.qty;
      return template
        .replaceAll("ITEM_NAME",  item.name.padEnd(20))
        .replaceAll("QTY",        String(item.qty).padStart(2))
        .replaceAll("UNIT_PRICE", ("₦" + item.price.toLocaleString()).padStart(10))
        .replaceAll("LINE_TOTAL", ("₦" + lineTotal.toLocaleString()).padStart(12));
    });
    return lines.join("\n");
  }

  // ── ES2026: Math.sumPrecise() — accurate total
  getTotal() {
    let lineTotals = this.#items.map(i => i.price * i.qty);
    let subtotal = Math.sumPrecise(lineTotals); // ES2026 — precise summation
    let discount = this.#promoCode ? subtotal * 0.1 : 0;
    return { subtotal, discount, total: subtotal - discount };
  }

  get items() { return [...this.#items]; }
}

// ── Permission system using ES2025 Set methods
class PermissionManager {
  static ROLE_PERMISSIONS = {
    viewer:    new Set(["view_products"]),
    customer:  new Set(["view_products", "add_to_cart", "checkout"]),
    editor:    new Set(["view_products", "add_to_cart", "edit_products", "manage_inventory"]),
    admin:     new Set(["view_products", "add_to_cart", "checkout", "edit_products", "manage_inventory", "manage_users", "view_reports"])
  };

  static getAccessibleFeatures(role1, role2) {
    let perms1 = this.ROLE_PERMISSIONS[role1] ?? new Set();
    let perms2 = this.ROLE_PERMISSIONS[role2] ?? new Set();

    return {
      both:     [...perms1.intersection(perms2)],     // ES2025
      onlyFirst:[...perms1.difference(perms2)],       // ES2025
      onlySecond:[...perms2.difference(perms1)],      // ES2025
      combined: [...perms1.union(perms2)]             // ES2025
    };
  }

  static canAccess(userRole, requiredPermissions) {
    let userPerms = this.ROLE_PERMISSIONS[userRole] ?? new Set();
    let required  = new Set(requiredPermissions);
    return required.isSubsetOf(userPerms); // ES2025
  }
}

// ── Test Stage 3
let cart = new Cart();
cart.applyPromo("SAVE10");
cart.applyPromo("OTHER");  // Should not replace — ??= only assigns if null/undefined

cart.addItem(db.all.find(p => p.id === 1)); // Laptop
cart.addItem(db.all.find(p => p.id === 3)); // Mouse
cart.addItem(db.all.find(p => p.id === 3)); // Mouse again — should increase qty

console.log("\n=== CART RECEIPT ===");
console.log(cart.formatReceipt());

let { subtotal, discount, total } = cart.getTotal();
console.log(`Subtotal: ₦${subtotal.toLocaleString()}`);
console.log(`Discount: ₦${discount.toLocaleString()}`);
console.log(`Total:    ₦${total.toLocaleString()}`);

// Expected:
// Subtotal: ₦474,000 (450000 + 2×12000)
// Discount: ₦47,400
// Total:    ₦426,600

// Permission checks
console.log("\n=== PERMISSIONS ===");
console.log("Can editor checkout?", PermissionManager.canAccess("editor", ["checkout"]));      // false
console.log("Can admin checkout?",  PermissionManager.canAccess("admin",  ["checkout"]));      // true

let comparison = PermissionManager.getAccessibleFeatures("customer", "editor");
console.log("Shared by customer+editor:", comparison.both);
console.log("Editor-only features:",     comparison.onlySecond);
```

---

### Reflection Questions

1. **Why was `Array.includes()` (ES2016) better than `indexOf()` for finding `NaN` values? What fundamental JavaScript rule makes `indexOf` unable to find `NaN`?**

2. **`async`/`await` (ES2017) doesn't add any new capability to JavaScript — Promises already existed. What specific problem does it solve, and why does that problem matter for large codebases?**

3. **ES2023 introduced `toSorted()`, `toReversed()`, `toSpliced()`, and `with()` — all non-mutating versions of existing methods. Why does React (and functional programming in general) prefer non-mutating operations? What problems do mutating operations cause in state management?**

4. **`Promise.all()` and `Promise.allSettled()` (ES2020) both wait for multiple promises — but they behave differently on rejection. In the `getEnrichedProducts()` method in Stage 2, why is `allSettled` the correct choice over `all()`?**

5. **ES2025's Set methods (`union`, `intersection`, `difference`) existed in mathematics for centuries. Why did it take until 2025 for JavaScript to get them built-in, and what did developers use before?**

6. **`Math.sumPrecise()` (ES2026) produces exact results for floating-point additions. Given the "store money as integer kobo" advice from the Mistakes tutorial, when would you use `Math.sumPrecise()` vs the integer approach?**

---

### Advanced Challenges (Optional)

1. **Iterator Helpers (ES2025):** Rewrite `getCatalogue.search()` to use iterator helpers instead of `.filter().map()`. Measure memory usage difference for 100,000 products using `performance.memory`.

2. **BigInt Pricing (ES2020):** Store all prices as `BigInt` values in kobo (multiply by 100). Rewrite `getTotal()` and `Math.sumPrecise()` to work with BigInt — note: `Math.sumPrecise` does not accept BigInt, so you'll need to handle the conversion.

3. **Private Fields Deep Dive (ES2022):** The `#db` private field in `ProductCatalogue` prevents direct access. Research the `#fieldName in obj` syntax for checking private field existence. Write a static `isProductCatalogue(obj)` method that uses this technique.

4. **Dynamic Import (ES2020):** Split the `PermissionManager` into its own module file. Use dynamic `import()` to load it only when the user is on the admin page — preventing regular customers from even downloading that code.

5. **Error.isError() (ES2026):** The `getEnrichedProducts` method sometimes has rejections. Rewrite the error handling to use `Error.isError()` to distinguish between true Error objects and non-Error rejections (some APIs reject with plain strings).

---

# Completion Checklist

- [x] **ES2016 — `Array.includes()`:** Understands NaN detection advantage over `indexOf()`
- [x] **ES2016 — `**` operator:** Knows right-to-left associativity; compound assignment `**=`
- [x] **ES2017 — `async`/`await`:** Understands it's Promise syntax sugar; always returns a Promise
- [x] **ES2017 — `Object.entries()` / `Object.values()`:** When to use each; building query strings
- [x] **ES2017 — `padStart()` / `padEnd()`:** Formatting receipts, IDs, tables
- [x] **ES2017 — `Object.getOwnPropertyDescriptors()`:** Deep copy preserving getters
- [x] **ES2018 — `Promise.finally()`:** Cleanup code that always runs regardless of outcome
- [x] **ES2018 — Object rest/spread:** Merging objects; sanitising sensitive fields
- [x] **ES2018 — `for await...of`:** Async iteration over streamed/paginated data
- [x] **ES2018 — RegExp named groups, dotAll, lookbehind:** Cleaner regex patterns
- [x] **ES2019 — `Array.flat()` / `flatMap()`:** Flattening nested structures
- [x] **ES2019 — `Object.fromEntries()`:** Inverse of `Object.entries()`; Map→Object conversion
- [x] **ES2019 — `trimStart()` / `trimEnd()`:** One-sided whitespace trimming
- [x] **ES2019 — Optional catch binding:** Omit `(error)` when not needed
- [x] **ES2020 — `BigInt`:** Cannot mix with Number; for values beyond `MAX_SAFE_INTEGER`
- [x] **ES2020 — `String.matchAll()`:** All matches with full group information
- [x] **ES2020 — `??` nullish coalescing:** Only `null`/`undefined` trigger default — not `0` or `""`
- [x] **ES2020 — `?.` optional chaining:** Safe deep property access
- [x] **ES2020 — `Promise.allSettled()`:** All complete, reports each outcome individually
- [x] **ES2020 — `globalThis`:** Universal global object across environments
- [x] **ES2020 — Dynamic `import()`:** Load modules on demand for performance
- [x] **ES2021 — `String.replaceAll()`:** Replace all occurrences without regex
- [x] **ES2021 — `Promise.any()`:** First to resolve wins; `AggregateError` if all reject
- [x] **ES2021 — `&&=` / `||=` / `??=`:** Conditional assignment operators
- [x] **ES2021 — Numeric separators `_`:** Readability for large literals
- [x] **ES2022 — `Array.at()` / `String.at()`:** Negative index support
- [x] **ES2022 — `Object.hasOwn()`:** Safer than `hasOwnProperty` — works on null-prototype objects
- [x] **ES2022 — Error `cause`:** Attach original error when rethrowing
- [x] **ES2022 — Top-level `await`:** Only in ES modules
- [x] **ES2022 — Private class fields `#`:** True encapsulation; SyntaxError if accessed outside
- [x] **ES2023 — `findLast()` / `findLastIndex()`:** Search from array end
- [x] **ES2023 — `toReversed()` / `toSorted()` / `toSpliced()` / `with()`:** Non-mutating array operations
- [x] **ES2024 — `Object.groupBy()` / `Map.groupBy()`:** Group collections by criteria
- [x] **ES2024 — `Promise.withResolvers()`:** Deconstructed Promise creation
- [x] **ES2025 — Set methods:** `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`
- [x] **ES2025 — Iterator helpers:** Lazy `filter`, `map`, `take`, `drop`, etc.
- [x] **ES2025 — `Promise.try()`:** Uniform sync/async error handling
- [x] **ES2026 — `Float16Array` / `Math.f16round()`:** 16-bit float for ML and graphics
- [x] **ES2026 — `Error.isError()`:** Cross-realm error detection
- [x] **ES2026 — `Math.sumPrecise()`:** Exact floating-point summation
- [x] **Exercises completed:** Version mapping, feature application lab, mutation comparison, async evolution
- [x] **Full project completed:** Smart Product Catalogue using features from every ES version
- [x] **Reflection questions answered**

---

**One-sentence summary:** From ES2016's two-feature release proving the annual cycle works, through the transformative async/await of ES2017, the safety features of ES2019–ES2022, the immutability revolution of ES2023, and into the Set mathematics and precise arithmetic of ES2025–ES2026 — each year of ECMAScript builds on the last to make JavaScript more powerful, more readable, and safer to write at any scale.
