---
title: "JavaScript Modules: What Modules Are · Exports · Imports · Namespaces · Dynamic Imports"
nav_order: 35
---

> **How to use this tutorial**
> Modules are the foundation of every modern JavaScript application. They turn a single giant script file into an organised codebase of cooperating, reusable pieces — the same system that powers React, Vue, Node.js, and every npm package you will ever use. Work through all five chapters in order.
>
> - **Phase 1 – Comprehension:** Full explanations, line-by-line walkthroughs, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project bringing all concepts together

---

# TABLE OF CONTENTS

1. [Chapter 1 — What Are Modules?](#chapter-1--what-are-modules)
2. [Chapter 2 — Exports](#chapter-2--exports)
3. [Chapter 3 — Imports](#chapter-3--imports)
4. [Chapter 4 — Namespaces](#chapter-4--namespaces)
5. [Chapter 5 — Dynamic Imports](#chapter-5--dynamic-imports)
6. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
7. [Phase 3 — Project Simulation](#phase-3--project-simulation)
8. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — WHAT ARE MODULES?

## The Problem Modules Solve

Imagine you are building a shopping website. Over several months, your `app.js` grows to 4,000 lines. It contains helper functions, class definitions, API calls, UI logic, cart calculations, and user authentication — all tangled together. Every developer must read the entire file to find anything. One wrong edit can break something completely unrelated.

This is **the global scope problem** — one of the biggest sources of bugs in large JavaScript applications.

**Real-world analogy — a kitchen:**
Imagine a professional kitchen where every utensil, ingredient, and piece of equipment is thrown in one giant pile in the middle of the room. Every cook must dig through everything to find anything. Now imagine the same kitchen with labelled drawers, shelves, and stations. Each station has exactly what it needs and nothing more. That organised kitchen is a **modular codebase**.

---

## 1.1 — What Is a Module?

A **module** is a JavaScript file that:

1. **Explicitly declares** what it provides to other files (using `export`)
2. **Explicitly declares** what it needs from other files (using `import`)
3. Has its own **private scope** — variables and functions inside are invisible to the outside world unless exported

```
Before modules — everything global, everything tangled:

app.js
  function calculateTax()     ← visible everywhere, can be overwritten
  function formatCurrency()   ← visible everywhere
  class ShoppingCart          ← visible everywhere
  const API_KEY = "secret"    ← visible everywhere — dangerous!
  ... 3,990 more lines ...

After modules — each file does one job:

utils/math.js       exports: add, subtract, calculateTax
utils/format.js     exports: formatCurrency, formatDate
cart/Cart.js        exports: ShoppingCart class
api/client.js       exports: get, post, delete
main.js             imports only what it needs from each
```

---

## 1.2 — Key Properties of Modules

| Property | Description |
|---|---|
| **Own scope** | Variables inside are private unless exported |
| **Strict mode by default** | Module code always runs in strict mode |
| **Single evaluation** | A module's code runs only once, regardless of how many files import it |
| **Static analysis** | Import/export relationships are declared at top — tools can analyse them without running the code |
| **Deferred by default** | `<script type="module">` executes after HTML is fully parsed |
| **HTTPS or localhost required** | Modules use CORS — they won't load from `file://` |

---

## 1.3 — Enabling Modules in the Browser

```html
<!DOCTYPE html>
<html>
<body>

  <!-- Regular script — shares global scope, no import/export -->
  <script src="app.js"></script>

  <!-- Module script — isolated scope, import/export available -->
  <script type="module" src="main.js"></script>

</body>
</html>
```

**`<script>` vs `<script type="module">`:**

| Feature | `<script>` | `<script type="module">` |
|---|---|---|
| Scope | Global | Module-local (private) |
| Strict mode | Off by default | Always on |
| `import`/`export` | Not available | Available |
| Execution timing | Blocking (unless `defer`) | Always deferred |
| Loads again on re-encounter | Yes | No — cached after first load |
| Requires CORS | No | Yes |

---

## 1.4 — Modules in Node.js

**CommonJS (older — still the default in Node.js):**

```js
// Exporting:
module.exports = { add, subtract };

// Importing:
const { add, subtract } = require("./math");
const fs = require("fs");   // Built-in module
```

**ES Modules (modern — same syntax as browser):**

```js
// In package.json: { "type": "module" }  OR use .mjs file extension

// Exporting:
export function add(a, b) { return a + b; }

// Importing:
import { add } from "./math.js";
import fs from "node:fs";
```

> 💡 This tutorial focuses on **ES Modules (ESM)** — the modern standard that works in both browsers and modern Node.js, and is used by all major frameworks (React, Vue, Svelte) and build tools (Vite, Webpack, Rollup).

---

## 1.5 — The Module Map: Why Modules Execute Only Once

When the browser (or Node.js) encounters an `import`, it checks an internal **module map** — a registry of every path already loaded:

```
First time "import { add } from './math.js'" is seen:
  → Load math.js, parse it, run it, cache result in module map

Second time (a different file also imports math.js):
  → Check module map → already there → return cached exports immediately
  → math.js code does NOT run again
```

**Why this matters — shared live state:**

```js
// counter.js
let count = 0;
export function increment() { count++; }
export function getCount()  { return count; }

// fileA.js
import { increment } from "./counter.js";
increment();   // count becomes 1

// fileB.js
import { getCount } from "./counter.js";
console.log(getCount());   // Output: 1 — same module instance!
```

`fileA` and `fileB` share the **same live** `counter.js` module instance. There is only one `count` variable across the whole application.

> 🤔 **Thinking question:** If modules loaded fresh every time they were imported, what would `getCount()` in `fileB.js` return, and why would that cause problems in a real app?

---

---

# CHAPTER 2 — EXPORTS

---

## What Is an Export?

An **export** is how a module declares what it is willing to share with the rest of the application. Everything not exported is **private** — completely invisible to importing files, as if it does not exist.

Think of a module as a company. Inside the company there are internal processes, private data, and trade secrets. What the company offers to the public — its products and services — is its **public API**. That public API is the export.

---

## 2.1 — Named Exports

**Named exports** let you export multiple things from one module, each with its own name. Importing files must use those exact names (or rename them — see Chapter 3).

**Syntax 1 — `export` keyword inline:**

```js
// math.js

export const PI = 3.14159265;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
```

**Syntax 2 — export list at the bottom (preferred for readability):**

```js
// math.js — all internal definitions first, public API declared at the bottom

const PI = 3.14159265;

function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero.");
  return a / b;
}

class Vector {
  constructor(x, y) { this.x = x; this.y = y; }
  magnitude() { return Math.sqrt(this.x ** 2 + this.y ** 2); }
}

// One clear "table of contents" — everything the module provides:
export { PI, add, subtract, multiply, divide, Vector };
```

> 💡 **Why list exports at the bottom?**
> Having all exports in one `export { }` block gives you a clean, scannable public API declaration without reading through every line of implementation. Many professional style guides prefer this pattern.

---

## 2.2 — Renaming at Export

You can rename values as they are exported, separating internal names from the public API:

```js
// database.js

function connectToDatabase(connectionString) {
  return { connected: true, url: connectionString };
}

function disconnectFromDatabase() {
  return { connected: false };
}

// Expose shorter, cleaner public names:
export {
  connectToDatabase    as connect,
  disconnectFromDatabase as disconnect
};
```

Consumers will import `connect` and `disconnect`, not the longer internal names.

---

## 2.3 — Default Export

Every module can have **one default export** — the "main thing" the module provides. Typically used when the entire purpose of a file is one function or one class.

```js
// greeting.js
export default function greet(name) {
  return "Hello, " + name + "!";
}
```

**Default export with a class:**

```js
// ShoppingCart.js
export default class ShoppingCart {
  #items = [];

  add(item)      { this.#items.push(item); return this; }
  remove(itemId) { this.#items = this.#items.filter(i => i.id !== itemId); return this; }

  get total()     { return this.#items.reduce((sum, i) => sum + i.price, 0); }
  get itemCount() { return this.#items.length; }
}
```

**Default export with an expression:**

```js
// config.js
export default {
  apiUrl:  "https://api.myapp.com",
  timeout: 5000,
  retries: 3
};
```

---

## 2.4 — Default vs Named Exports — When to Use Each

| Situation | Use |
|---|---|
| Module has ONE primary purpose | Default export |
| Module provides a collection of utilities | Named exports |
| One class/component per file | Default export |
| Utility libraries (`math.js`, `format.js`) | Named exports |
| Configuration objects | Default export |
| Constants and enums used across files | Named exports |

> 💡 **You can mix both in the same file:**
> ```js
> // api.js
> export const BASE_URL = "https://api.myapp.com";   // Named
> export const TIMEOUT  = 5000;                       // Named
>
> export default async function request(path, options) {   // Default
>   const res = await fetch(BASE_URL + path, options);
>   if (!res.ok) throw new Error(res.status);
>   return res.json();
> }
> ```

---

## 2.5 — Re-Exporting: Building Barrel Files

A module can import from one file and immediately re-export — creating a centralised entry point called a **barrel file** or **index file**:

```js
// utils/index.js — barrel file

export { add, subtract, multiply }    from "./math.js";
export { formatCurrency, formatDate } from "./format.js";
export { capitalise, truncate }       from "./string.js";

// Re-export a default as a named export:
export { default as request } from "./api.js";

// Re-export everything from a module:
export * from "./validators.js";
```

Now consumers import from one path:

```js
// ✅ Clean — one import from the barrel:
import { add, formatCurrency, capitalise, request } from "./utils/index.js";

// ❌ Messy without a barrel — separate import for each file:
import { add }            from "./utils/math.js";
import { formatCurrency } from "./utils/format.js";
import { capitalise }     from "./utils/string.js";
import request            from "./utils/api.js";
```

---

## 2.6 — What Cannot Be Exported

```js
// ❌ Cannot export bare literals:
export 42;         // SyntaxError
export "hello";    // SyntaxError

// ✅ Bind to a variable first:
export const ANSWER = 42;

// ❌ Cannot have more than one default:
export default function a() {}
export default function b() {}   // SyntaxError — only one default per module
```

---

---

# CHAPTER 3 — IMPORTS

---

## What Is an Import?

An **import** is how a module declares its **dependencies** — what it needs from other modules to do its work. Static imports are resolved before the code runs, always declared at the top of a file.

---

## 3.1 — Importing Named Exports

Use curly braces `{ }` to import named exports. The names must match exactly what was exported (or use `as` to rename):

```js
// math.js exports: add, subtract, multiply, PI
import { add, multiply, PI } from "./math.js";

console.log(add(3, 4));      // Output: 7
console.log(multiply(3, 4)); // Output: 12
console.log(PI);             // Output: 3.14159265
```

**File path rules:**

| Path | Meaning |
|---|---|
| `"./math.js"` | Same directory as current file |
| `"../utils/math.js"` | Parent directory, into `utils/` |
| `"/src/utils/math.js"` | Absolute path from site root |
| `"lodash"` | npm package — resolved by bundler or Node.js |

> ⚠️ **Always include the `.js` extension in browser ES modules.** Node.js and bundlers often resolve it automatically, but browsers require the full path.

---

## 3.2 — Importing the Default Export

No curly braces. You choose any name you want:

```js
// greeting.js: export default function greet(name) {...}

import greet    from "./greeting.js";
import sayHello from "./greeting.js";   // You can name it anything

console.log(greet("Alice"));    // Output: Hello, Alice!
console.log(sayHello("Bob"));   // Output: Hello, Bob!
```

Both `greet` and `sayHello` are the same exported function — the name is entirely the importer's choice.

---

## 3.3 — Importing Default and Named Together

```js
// api.js: default export is request(), named exports are BASE_URL and TIMEOUT
import request, { BASE_URL, TIMEOUT } from "./api.js";
// Default comes first, named exports follow in braces after the comma
```

---

## 3.4 — Renaming at Import (`as`)

Use `as` to give an import a different local name:

```js
import { add as mathAdd, multiply as mathMultiply } from "./math.js";
import { add as arrayMerge }                          from "./array-utils.js";

console.log(mathAdd(2, 3));          // Output: 5
console.log(arrayMerge([1], [2]));   // Output: [1, 2]
```

---

## 3.5 — Side-Effect-Only Import

Import a module purely to run its setup code — no exports needed:

```js
import "./polyfills.js";   // Adds browser compatibility features
import "./analytics.js";   // Starts analytics tracking
import "./styles.css";     // Load stylesheet (with a bundler)
```

---

## 3.6 — Import All as a Namespace (`* as`)

Import every export from a module into one object:

```js
import * as MathUtils from "./math.js";

console.log(MathUtils.add(3, 4));   // Output: 7
console.log(MathUtils.PI);          // Output: 3.14159265
```

This is covered in depth in Chapter 4.

---

## 3.7 — Imports Are Live Bindings — Not Copies

This is one of the most important and surprising properties of ES modules:

```js
// counter.js
export let count = 0;
export function increment() { count++; }

// main.js
import { count, increment } from "./counter.js";

console.log(count);   // Output: 0
increment();
console.log(count);   // Output: 1  ← count updated! It is NOT a copy.
increment();
console.log(count);   // Output: 2
```

The imported `count` is a **live reference** to the variable in `counter.js` — not a snapshot taken at import time. When the module updates `count`, the importing file sees the new value immediately.

> ⚠️ **You cannot reassign an imported binding from outside the module:**
> ```js
> import { count } from "./counter.js";
> count = 5;   // ❌ TypeError: Assignment to constant variable
> ```
> Only the module that owns the variable can change it. You must call a function the module provides (like `increment()`) to trigger changes.

---

## 3.8 — Top-Level Await in Modules

Inside a module (and only a module), you can use `await` at the top level — outside any `async` function:

```js
// config.js
const response = await fetch("https://api.myapp.com/config");
const config   = await response.json();

export const { apiUrl, theme, locale } = config;
// Any module importing from config.js automatically waits
// for this await to complete before proceeding
```

```js
// main.js
import { apiUrl } from "./config.js";
// By the time this line runs, config.js has already finished fetching
console.log(apiUrl);   // Output: https://api.myapp.com
```

> ⚠️ **Top-level await blocks the importing module.** Don't put slow awaits in widely-shared modules.

---

---

# CHAPTER 4 — NAMESPACES

---

## What Is a Namespace?

A **namespace** is a named container that groups related items under a single identifier. In JavaScript modules, namespace imports (`import * as Name`) collect all of a module's exports into one object, accessed with dot notation.

**Real-world analogy — a toolbox:**
Instead of carrying 20 individual tools in your pockets, you carry one toolbox. You access each tool by opening the box: `toolbox.hammer`, `toolbox.wrench`. The toolbox is the namespace — it organises everything under one handle.

---

## 4.1 — Creating a Namespace Import

```js
// validators.js
export function isEmail(value)        { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
export function isPhone(value)        { return /^[+\d][\d\s\-]{6,14}$/.test(value); }
export function isPostcode(value)     { return /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(value); }
export function isNonEmpty(value)     { return typeof value === "string" && value.trim().length > 0; }
export function isInRange(value, min, max) {
  return typeof value === "number" && value >= min && value <= max;
}
```

```js
// main.js
import * as Validators from "./validators.js";

console.log(Validators.isEmail("alice@example.com"));   // Output: true
console.log(Validators.isPhone("+44 7700 900000"));     // Output: true
console.log(Validators.isNonEmpty("  "));               // Output: false
console.log(Validators.isInRange(7, 1, 10));            // Output: true
```

All five exports are now properties of the `Validators` object.

---

## 4.2 — Why Use Namespaces?

**1 — Avoiding name collisions:**

```js
// Without namespace — names clash:
import { format } from "./date-utils.js";
import { format } from "./number-utils.js";  // ❌ SyntaxError: duplicate local name

// With namespaces — no collision:
import * as DateUtils   from "./date-utils.js";
import * as NumberUtils from "./number-utils.js";

DateUtils.format(new Date());   // ✅ Date formatting
NumberUtils.format(1234567);    // ✅ Number formatting
```

**2 — Documenting the source — always clear where a function comes from:**

```js
// Without namespace — where does validate() come from?
import { validate, sanitise, normalise } from "./string-utils.js";

// With namespace — source is always visible:
import * as StringUtils from "./string-utils.js";
StringUtils.validate("hello");
StringUtils.sanitise("<script>alert('xss')</script>");
```

**3 — Passing a whole module's API as an argument:**

```js
import * as MathUtils from "./math.js";

function applyAll(operations, a, b) {
  return Object.entries(operations)
    .filter(([name, val]) => typeof val === "function")
    .map(([name, fn]) => `${name}(${a}, ${b}) = ${fn(a, b)}`);
}

console.log(applyAll(MathUtils, 10, 3));
// Output:
// add(10, 3) = 13
// subtract(10, 3) = 7
// multiply(10, 3) = 30
// divide(10, 3) = 3.333...
```

---

## 4.3 — Namespace Objects Are Sealed (Read-Only)

The namespace object created by `import * as X` is sealed — you cannot add, remove, or replace properties:

```js
import * as Utils from "./math.js";

Utils.add = function() {};   // ❌ TypeError: Cannot assign to read only property
Utils.newFn = () => {};      // ❌ TypeError: Cannot add property
delete Utils.PI;             // ❌ TypeError: Cannot delete property
```

This is intentional — it prevents accidental corruption of a module's public API.

---

## 4.4 — Namespace Patterns in Professional Code

**Feature layer with one namespace per domain:**

```js
import * as CartAPI    from "../api/cart.js";
import * as ProductAPI from "../api/product.js";
import * as UserAPI    from "../api/user.js";

async function checkout(userId, cartId) {
  const user  = await UserAPI.getById(userId);
  const cart  = await CartAPI.getById(cartId);
  const items = await Promise.all(
    cart.itemIds.map(id => ProductAPI.getById(id))
  );
  return CartAPI.processCheckout(user, cart, items);
}
```

**Namespace facade over a barrel:**

```js
// auth/index.js
export { login, logout, refreshToken }         from "./tokens.js";
export { getCurrentUser, updateProfile }        from "./user.js";
export { hasPermission, requireRole }           from "./permissions.js";

// consumer.js
import * as Auth from "./auth/index.js";

if (!Auth.hasPermission("admin")) Auth.requireRole("editor");
const user = Auth.getCurrentUser();
```

---

## 4.5 — Namespace vs Named Imports — Decision Guide

| Situation | Prefer |
|---|---|
| Using 1–3 specific items | Named imports `{ a, b, c }` |
| Using most/all of a module's exports | Namespace `* as X` |
| Two modules export the same name | Namespace (avoids collision) |
| Repeatedly calling from the same module | Namespace (source always visible) |
| Bundle size / tree shaking is critical | Named imports (unused exports removable) |

> 💡 **Tree shaking and namespaces:** Bundlers like Webpack and Rollup remove unused code ("tree shaking"). With `import { add }`, they know only `add` is used and can remove everything else. With `import * as Math`, they must include all exports. For production apps, prefer named imports where bundle size matters.

---

---

# CHAPTER 5 — DYNAMIC IMPORTS

---

## What Is a Dynamic Import?

Everything so far — `import { x } from "./file.js"` — is **static import**: always at the top of the file, resolved before any code runs, always loaded unconditionally.

**Dynamic import** — `import("./file.js")` — loads a module **on demand at runtime**, exactly when needed. It returns a **Promise** that resolves to the module's namespace object.

**Real-world analogy — a library:**
Static imports are like arriving at work with every book you might ever need. Dynamic imports are like having a library next door — you only go get a book when you actually need it.

---

## 5.1 — The Dynamic Import Syntax

```js
// Static (always loads at startup):
import { greet } from "./greeting.js";

// Dynamic (loads on demand, returns a Promise):
const module = await import("./greeting.js");
module.greet("Alice");
```

**`import()` is a function call, not a statement.** This means:
- It can appear anywhere in your code (inside functions, conditions, loops)
- It returns a Promise that must be `await`-ed or `.then()`-chained
- The path can be a computed string — not just a literal

---

## 5.2 — Accessing Exports from a Dynamic Import

The resolved value is the module's **namespace object** — same as `import * as X`:

```js
// math.js exports: add, multiply, PI, and a default Calculator class

const mathModule = await import("./math.js");

console.log(mathModule.add(3, 4));   // Output: 7  (named export)
console.log(mathModule.PI);          // Output: 3.14159265  (named export)
console.log(mathModule.default);     // Output: [class Calculator]  (default export)
```

**Accessing the default export cleanly:**

```js
// Destructure with rename:
const { default: Calculator } = await import("./math.js");
const calc = new Calculator();
```

---

## 5.3 — Conditional Loading

Load a module only when a specific condition is met:

```js
async function initialise(userRole) {
  if (userRole === "admin") {
    // Only admins load the admin panel — saves bandwidth for everyone else:
    const { AdminPanel } = await import("./admin/AdminPanel.js");
    AdminPanel.initialise();
  } else {
    const { UserDashboard } = await import("./dashboard/UserDashboard.js");
    UserDashboard.initialise();
  }
}
```

Without dynamic imports, both modules would be downloaded for every user.

---

## 5.4 — Event-Triggered Loading (Code Splitting)

Load expensive modules only when the user triggers an action:

```js
const reportBtn = document.getElementById("generate-report");

reportBtn.addEventListener("click", async function() {
  reportBtn.disabled    = true;
  reportBtn.textContent = "Loading...";

  try {
    // pdf-generator.js is large — only download it on demand:
    const { generatePDF } = await import("./pdf-generator.js");
    await generatePDF(getReportData());
    reportBtn.textContent = "Download Ready";
  } catch (err) {
    console.error("PDF generation failed:", err);
    reportBtn.textContent = "Failed — Try Again";
    reportBtn.disabled    = false;
  }
});
```

Users who never click the button never download the PDF library.

---

## 5.5 — Dynamic Paths

The path in `import()` can be a computed string:

```js
// Load a language file based on user's locale:
async function loadTranslations(locale) {
  const supported = ["en", "fr", "de", "es", "yo"];
  const safe      = supported.includes(locale) ? locale : "en";

  const { default: translations } = await import(`./locales/${safe}.js`);
  return translations;
}

const t = await loadTranslations("fr");
console.log(t.greeting);   // Output: Bonjour!
```

> ⚠️ **Dynamic paths and bundlers:** When you use a variable in a path, bundlers (Webpack, Vite) must include all files that could possibly match the pattern. Use a clear, predictable pattern (`./locales/${locale}.js`) so the bundler knows which files to include. Never use fully user-controlled paths — see the security note at the end of this chapter.

---

## 5.6 — Loading Multiple Modules in Parallel

```js
async function loadDashboard() {
  const [
    { default: Chart },
    { DataTable },
    { KPIWidget }
  ] = await Promise.all([
    import("./charts/Chart.js"),
    import("./tables/DataTable.js"),
    import("./widgets/KPIWidget.js")
  ]);

  // All three downloaded in parallel:
  new Chart("#revenue-chart", { type: "bar" });
  new DataTable("#sales-table");
  new KPIWidget("#kpi-panel");
}
```

---

## 5.7 — Lazy Loading in Frameworks

Every major framework uses dynamic imports for performance:

**React — lazy loading a component:**

```js
import { lazy, Suspense } from "react";

// AdminPage.js is NOT in the initial bundle:
const AdminPage = lazy(() => import("./AdminPage.js"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminPage />   {/* Downloads only when this component renders */}
    </Suspense>
  );
}
```

**Vue — async component:**

```js
const AdminPanel = defineAsyncComponent(() => import("./AdminPanel.vue"));
```

**React Router — route-level code splitting:**

```js
const routes = [
  { path: "/",      component: lazy(() => import("./pages/Home.js")) },
  { path: "/shop",  component: lazy(() => import("./pages/Shop.js")) },
  { path: "/admin", component: lazy(() => import("./pages/Admin.js")) },
];
// Each page's code only downloads when the user navigates to it
```

---

## 5.8 — Preloading for Anticipated Interactions

For modules you'll need soon but not immediately:

```js
// User is browsing products — they'll probably click "Add to Cart"
// Start downloading the cart module in the background:
setTimeout(() => {
  import("./cart/CartModal.js");   // Preload silently — no await needed
}, 3000);

// When the user clicks, the module is likely already cached:
addToCartBtn.addEventListener("click", async () => {
  const { CartModal } = await import("./cart/CartModal.js");
  CartModal.open();   // Near-instant — already loaded
});
```

---

## 5.9 — Static vs Dynamic Imports — Decision Guide

| Use Case | Static `import` | Dynamic `import()` |
|---|---|---|
| Core dependencies always needed | ✅ | ❌ |
| Optional or rarely-used features | ❌ | ✅ |
| Conditional loading (if/switch) | ❌ | ✅ |
| Dynamic paths (variable in path) | ❌ | ✅ |
| Must appear at top of file | ✅ (required) | ✅ (works anywhere) |
| Route-based code splitting | ❌ | ✅ |
| Works with tree shaking | ✅ Best | ✅ Also works |

> ⚠️ **Never use user-controlled input directly in a dynamic import path:**
> ```js
> // ❌ Dangerous — user could supply "../../../sensitive-file"
> const module = await import(userInput);
>
> // ✅ Safe — validate against a whitelist:
> const allowed = ["chart", "table", "map"];
> if (!allowed.includes(componentName)) throw new Error("Invalid component");
> const module = await import(`./components/${componentName}.js`);
> ```

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Named and Default Exports

**Objective:** Build a `string-utils.js` module and consume it in two different ways.

**Scenario:** A content management system needs string manipulation tools across multiple files.

**Warm-up mini-example:**

```js
// tiny-utils.js
export const shout   = str => str.toUpperCase() + "!";
export const whisper = str => str.toLowerCase() + "...";
export default        str => str.trim();

// consumer.js
import trim, { shout, whisper } from "./tiny-utils.js";
console.log(shout("hello"));    // Output: HELLO!
console.log(whisper("HELLO"));  // Output: hello...
console.log(trim("  hi  "));    // Output: hi
```

**Step-by-step instructions:**

1. Create `string-utils.js` with these **named** exports:
   - `capitalise(str)` — first letter uppercase, rest lowercase
   - `titleCase(str)` — capitalise every word
   - `truncate(str, maxLength, suffix = "...")` — cut at `maxLength`, append suffix
   - `countWords(str)` — number of words (split on whitespace)
   - `reverseWords(str)` — reverse word order: "hello world" → "world hello"
   - `slugify(str)` — lowercase, spaces to hyphens, remove non-alphanumeric: "Hello World!" → "hello-world"
2. Add a **default export**: `sanitise(str)` — trims whitespace and strips HTML tags (replace `<[^>]*>` with `""`)
3. Create `consumer-named.js` — import only `truncate`, `titleCase`, and `slugify`. Test with sample strings and log the results.
4. Create `consumer-namespace.js` — import the whole module as `* as StringUtils`. Access the default export via `StringUtils.default`.

**Self-check questions:**
1. What is the advantage of the export list at the bottom vs inline `export` keywords on each declaration?
2. Can `consumer-named.js` use `capitalise` if it wasn't imported? Try it and note the error message.
3. In `consumer-namespace.js`, how do you access the default export through the namespace object?

---

## Exercise 2 — Barrel File and Re-Exports

**Objective:** Organise a utility library so consumers only ever import from one path.

**Scenario:** A data processing library split across four modules:
- `math.js` — `sum`, `average`, `median`, `clamp`
- `array.js` — `unique`, `flatten`, `groupBy`, `chunk`
- `date.js` — `formatDate`, `daysBetween`, `isWeekend`
- `validate.js` — `isEmail`, `isUrl`, `isNonEmpty`

**Step-by-step instructions:**

1. Create each of the four files with working stub implementations.
2. Create `utils/index.js` as a barrel that re-exports everything from all four.
3. Create `app.js` that imports everything it needs from `"./utils/index.js"` only — never from the individual files.
4. Test that `app.js` can use `sum`, `unique`, `formatDate`, and `isEmail` through the single import.

**Self-check questions:**
1. If you add a new function to `math.js`, which is the only file you need to update for it to be accessible via the barrel?
2. What happens if `array.js` and `math.js` both export a function named `sum`? How would you resolve the conflict inside the barrel?

---

## Exercise 3 — Namespace Imports

**Objective:** Refactor messy individual imports into clean, collision-free namespaces.

**Before (names clash, hard to track origins):**

```js
import { get, post, put, del }                    from "./http.js";
import { get as storageGet, set, remove }          from "./storage.js";
import { log, warn, error }                        from "./logger.js";
import { format as formatDate, parse, isValid }    from "./date.js";
import { format as formatNum, round, floor }       from "./number.js";
```

**Step-by-step instructions:**

1. Create stub implementations of all five modules.
2. Refactor all five imports using `* as`:
   ```js
   import * as Http    from "./http.js";
   import * as Storage from "./storage.js";
   import * as Logger  from "./logger.js";
   import * as DateFmt from "./date.js";
   import * as NumFmt  from "./number.js";
   ```
3. Update all call sites (e.g., `get(url)` → `Http.get(url)`).
4. Write a `processDataPipeline(url)` function that uses all five namespaces in sequence: fetch data, validate dates, format numbers, log results, cache to storage.

**Self-check questions:**
1. Before refactoring, why did `get` and `format` need `as` aliases?
2. After refactoring with namespaces, are aliases still necessary?
3. Try adding a new property to one of the namespace objects. What error do you get?

---

## Exercise 4 — Dynamic Import for Code Splitting

**Objective:** Build a dashboard that loads feature panels only when the user requests them.

**Scenario:** A three-panel dashboard — Analytics, Settings, Help. Each panel is a separate module that should only download when its tab is clicked.

**Warm-up mini-example:**

```js
document.getElementById("btn").addEventListener("click", async () => {
  const { render } = await import("./heavy-module.js");
  render(document.getElementById("container"));
});
```

**Step-by-step instructions:**

1. Create `analytics.js`, `settings.js`, `help.js`. Each exports a `default` function `render(container)` that writes panel content into the element.
2. In `main.js`, add click listeners to three tab buttons.
3. On click:
   - Show a loading indicator
   - Dynamically import the correct module
   - Call its `render()` function
   - Handle import errors gracefully
4. Add a module cache so a panel loaded once is not re-imported on subsequent clicks:

```js
const moduleCache = new Map();

async function loadPanel(name, container) {
  container.innerHTML = "<p>Loading...</p>";

  if (!moduleCache.has(name)) {
    const mod = await import(`./${name}.js`);
    moduleCache.set(name, mod);
  }

  moduleCache.get(name).default(container);
}
```

**Self-check questions:**
1. What type does `import()` return? How do you access a default export from the result?
2. The browser's module map already caches modules — why does the application-level `Map` still add value?
3. What happens if the user clicks the same tab button multiple times in rapid succession before the first load finishes? How would you prevent a double-load?

---

## Exercise 5 — Full Module Architecture

**Objective:** Design and implement a complete modular application for a student grade tracker.

**Required structure:**
```
grades-app/
  models/
    Student.js       → default: Student class
    Grade.js         → default: Grade class
  services/
    gradeService.js  → named: calculateAverage, getLetterGrade, getTopStudents
    reportService.js → named: generateReport, exportCSV
  utils/
    math.js          → named: average, round, clamp
    format.js        → named: formatPercent, formatName
  index.js           → barrel: re-exports all classes and service functions
  main.js            → entry point: imports everything from barrel, runs the app
```

**Step-by-step instructions:**

1. Build all files with working implementations.
2. `Student` class: `id`, `name`, `grades` array, `addGrade(subject, score)`, `getAverage()`.
3. `gradeService` uses `math.js` utilities. `getLetterGrade` returns A/B/C/D/F.
4. `reportService`: `generateReport(students)` returns a formatted string; `exportCSV(students)` returns CSV text.
5. `index.js` barrel re-exports all classes and service functions.
6. `main.js` creates 5 students, adds grades, prints a report — importing everything from `"./index.js"` only.

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Modular Blog Platform

**Scenario:** You are architecting the JavaScript codebase for a lightweight blogging platform. The system must be modular and optimised — with code splitting so the editor and admin tools only load for users who need them.

This project uses all five chapters: module structure (Ch.1), named/default/barrel exports (Ch.2), named/default/namespace/live-binding imports (Ch.3), namespace patterns for service layers (Ch.4), dynamic imports for features and locale loading (Ch.5).

---

### Stage 1 — Core Data Models

```js
// models/Post.js
export default class Post {
  static #nextId = 1;

  constructor(title, content, authorId, tags = []) {
    this.id        = Post.#nextId++;
    this.title     = title;
    this.content   = content;
    this.authorId  = authorId;
    this.tags      = tags;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.published = false;
    this.slug      = Post.#slugify(title);
  }

  static #slugify(title) {
    return title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  publish() {
    this.published = true;
    this.updatedAt = new Date();
    return this;
  }

  update(fields) {
    Object.assign(this, fields);
    this.updatedAt = new Date();
    if (fields.title) this.slug = Post.#slugify(fields.title);
    return this;
  }

  get summary() {
    const words = this.content.split(/\s+/);
    return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
  }

  toJSON() {
    return {
      id: this.id, title: this.title, slug: this.slug,
      summary: this.summary, authorId: this.authorId, tags: this.tags,
      published: this.published,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    };
  }
}
```

```js
// models/Author.js
export default class Author {
  static #nextId = 100;

  constructor(name, email, bio = "") {
    this.id    = Author.#nextId++;
    this.name  = name;
    this.email = email;
    this.bio   = bio;
    this.posts = [];
  }

  get displayName() { return this.name; }
}
```

---

### Stage 2 — Utility Layer (Named Exports + Barrel)

```js
// utils/string.js
export const slugify = str =>
  str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

export const truncate = (str, max, suffix = "...") =>
  str.length <= max ? str : str.slice(0, max - suffix.length) + suffix;

export const capitalise = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const wordCount = str =>
  str.trim().split(/\s+/).filter(Boolean).length;

export const readingTime = str => {
  const mins = Math.ceil(wordCount(str) / 200);   // Average reading: ~200 wpm
  return mins + " min read";
};
```

```js
// utils/date.js
export const formatDate = (date, locale = "en-GB") =>
  new Date(date).toLocaleDateString(locale, {
    year: "numeric", month: "long", day: "numeric"
  });

export const timeAgo = date => {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60)    return "just now";
  if (secs < 3600)  return Math.floor(secs / 60)   + " minutes ago";
  if (secs < 86400) return Math.floor(secs / 3600)  + " hours ago";
  return Math.floor(secs / 86400) + " days ago";
};
```

```js
// utils/validate.js
export const isEmail    = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isNonEmpty = v => typeof v === "string" && v.trim().length > 0;
export const minLength  = (v, n) => typeof v === "string" && v.trim().length >= n;
```

```js
// utils/index.js — barrel
export * from "./string.js";
export * from "./date.js";
export * from "./validate.js";
```

---

### Stage 3 — Service Layer (Namespace Imports)

```js
// services/PostService.js
import Post           from "../models/Post.js";
import * as StringUtils  from "../utils/string.js";
import * as Validate     from "../utils/validate.js";

const _posts = new Map();   // In-memory store

export function createPost(title, content, authorId, tags = []) {
  if (!Validate.isNonEmpty(title))      throw new Error("Title is required.");
  if (!Validate.minLength(content, 50)) throw new Error("Content must be at least 50 characters.");

  const post = new Post(title, content, authorId, tags);
  _posts.set(post.id, post);
  return post;
}

export function publishPost(postId) {
  const post = _posts.get(postId);
  if (!post) throw new Error("Post not found: " + postId);
  return post.publish();
}

export function getPublished() {
  return Array.from(_posts.values())
    .filter(p => p.published)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getByTag(tag) {
  return getPublished().filter(p => p.tags.includes(tag));
}

export function search(query) {
  const q = query.toLowerCase();
  return getPublished().filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q)
  );
}

export function getStats() {
  const all       = Array.from(_posts.values());
  const published = all.filter(p => p.published);
  const totalWords = published.reduce((sum, p) => sum + StringUtils.wordCount(p.content), 0);

  return {
    total:     all.length,
    published: published.length,
    drafts:    all.length - published.length,
    totalWords,
    avgWords:  published.length ? Math.round(totalWords / published.length) : 0
  };
}
```

```js
// services/index.js — service barrel (exports namespaces, not individual functions)
export * as PostService   from "./PostService.js";
export * as AuthorService from "./AuthorService.js";
```

---

### Stage 4 — Dynamic Features (Dynamic Imports + Caching)

```js
// features/editor.js — only loaded for logged-in authors
import * as PostService  from "../services/PostService.js";
import * as StringUtils  from "../utils/string.js";
import * as Validate     from "../utils/validate.js";

export function initEditor(container) {
  container.innerHTML = `
    <div class="editor">
      <h2>Write New Post</h2>
      <input    id="post-title"   placeholder="Title..." />
      <textarea id="post-content" placeholder="Write your post (min 50 chars)..." rows="10"></textarea>
      <input    id="post-tags"    placeholder="Tags, comma-separated..." />
      <button   id="save-draft">Save Draft</button>
      <button   id="publish-btn">Save & Publish</button>
      <p        id="editor-status"></p>
    </div>
  `;

  const status = container.querySelector("#editor-status");

  function readFormData() {
    return {
      title:   container.querySelector("#post-title").value,
      content: container.querySelector("#post-content").value,
      tags:    container.querySelector("#post-tags").value
        .split(",").map(t => t.trim()).filter(Boolean)
    };
  }

  container.querySelector("#save-draft").addEventListener("click", () => {
    const { title, content, tags } = readFormData();
    try {
      const post = PostService.createPost(title, content, 1, tags);
      status.textContent =
        `Draft saved: "${post.title}" · ${StringUtils.readingTime(post.content)}`;
      status.style.color = "green";
    } catch (err) {
      status.textContent = "Error: " + err.message;
      status.style.color = "red";
    }
  });

  container.querySelector("#publish-btn").addEventListener("click", () => {
    const { title, content, tags } = readFormData();
    try {
      const post = PostService.createPost(title, content, 1, tags);
      PostService.publishPost(post.id);
      status.textContent = `Published: "${post.title}"`;
      status.style.color = "green";
    } catch (err) {
      status.textContent = "Error: " + err.message;
      status.style.color = "red";
    }
  });
}
```

```js
// features/admin.js — only loaded for admin users
import * as PostService from "../services/PostService.js";
import * as DateUtils   from "../utils/date.js";

export function initAdmin(container) {
  const stats = PostService.getStats();
  const posts = PostService.getPublished();

  container.innerHTML = `
    <div class="admin-panel">
      <h2>Admin Dashboard</h2>
      <section class="stats">
        <p>Total posts:  <strong>${stats.total}</strong></p>
        <p>Published:    <strong>${stats.published}</strong></p>
        <p>Drafts:       <strong>${stats.drafts}</strong></p>
        <p>Avg length:   <strong>${stats.avgWords} words</strong></p>
      </section>
      <h3>Published Posts</h3>
      <ul>
        ${posts.map(p =>
          `<li>${p.title} — <em>${DateUtils.timeAgo(p.createdAt)}</em></li>`
        ).join("")}
      </ul>
    </div>
  `;
}
```

---

### Stage 5 — Main Entry Point

```js
// main.js — static imports for always-needed code
import Post           from "./models/Post.js";
import Author         from "./models/Author.js";
import * as PostService from "./services/PostService.js";
import * as Utils       from "./utils/index.js";

// --- Seed data ---
const alice = new Author("Alice Chen",  "alice@blog.com");
const bob   = new Author("Bob Okafor",  "bob@blog.com");

const post1 = PostService.createPost(
  "Getting Started with JavaScript Modules",
  "JavaScript modules are one of the most important features added to the language in recent " +
  "years. They allow developers to split their code into isolated, reusable pieces that are easy " +
  "to test and maintain. In this post we will explore exports, imports, namespaces, and dynamic " +
  "loading with practical examples from a real codebase.",
  alice.id,
  ["javascript", "modules", "tutorial"]
);

const post2 = PostService.createPost(
  "Why Async Await Changed Everything",
  "Before async and await arrived in ES2017 writing asynchronous JavaScript meant navigating " +
  "callback hell or wrestling with Promise chains. Async await made it possible to write async " +
  "code that reads just like synchronous code dramatically improving readability and reducing " +
  "the likelihood of subtle timing bugs in complex asynchronous workflows.",
  bob.id,
  ["javascript", "async", "tutorial"]
);

PostService.publishPost(post1.id);
PostService.publishPost(post2.id);

// --- Render public blog ---
function renderBlog() {
  const posts = PostService.getPublished();
  const app   = document.getElementById("app");

  app.innerHTML = `
    <header><h1>The Dev Blog</h1></header>
    <main>
      ${posts.map(p => `
        <article class="post-card">
          <h2>${p.title}</h2>
          <p class="meta">
            ${Utils.formatDate(p.createdAt)} · ${Utils.readingTime(p.content)}
          </p>
          <p class="summary">${p.summary}</p>
          <p class="tags">${p.tags.map(t => `<span>#${t}</span>`).join(" ")}</p>
        </article>
      `).join("")}
    </main>
    <footer>
      <button id="editor-btn">✏️ Write Post</button>
      <button id="admin-btn">⚙️ Admin</button>
      <div id="feature-panel"></div>
    </footer>
  `;

  // --- Dynamic feature loading with application-level cache ---
  const moduleCache = new Map();

  async function loadFeature(name) {
    const panel = document.getElementById("feature-panel");
    panel.innerHTML = "<p>Loading...</p>";

    try {
      if (!moduleCache.has(name)) {
        const mod = await import(`./features/${name}.js`);
        moduleCache.set(name, mod);
      }

      const mod = moduleCache.get(name);
      if (name === "editor") mod.initEditor(panel);
      if (name === "admin")  mod.initAdmin(panel);

    } catch (err) {
      panel.innerHTML = `<p style="color:red">⚠️ Failed to load ${name}: ${err.message}</p>`;
    }
  }

  document.getElementById("editor-btn")
    .addEventListener("click", () => loadFeature("editor"));
  document.getElementById("admin-btn")
    .addEventListener("click", () => loadFeature("admin"));
}

renderBlog();
```

---

### Stage 6 — Advanced Challenge: Dynamic Locale Loading

```js
// locales/en.js
export default { readMore: "Read more", byAuthor: "By", loading: "Loading..." };

// locales/fr.js
export default { readMore: "Lire la suite", byAuthor: "Par", loading: "Chargement..." };

// locales/yo.js  (Yoruba)
export default { readMore: "Ka siwaju", byAuthor: "Nipa", loading: "Nduro..." };
```

```js
// i18n.js — locale module with dynamic import + caching
const SUPPORTED = ["en", "fr", "de", "es", "yo"];
const _cache    = new Map();
let   _active   = null;

export async function loadLocale(locale) {
  const safe = SUPPORTED.includes(locale) ? locale : "en";
  if (_cache.has(safe)) { _active = _cache.get(safe); return _active; }

  const { default: messages } = await import(`./locales/${safe}.js`);
  _cache.set(safe, messages);
  _active = messages;
  return messages;
}

export const t = key => _active?.[key] ?? key;
export const getSupportedLocales = () => [...SUPPORTED];
```

```js
// In main.js — detect browser language, load the right locale before rendering:
const browserLocale = navigator.language.split("-")[0];
await loadLocale(browserLocale);   // Top-level await — waits before renderBlog()
renderBlog();
```

**Reflection Questions:**

1. `PostService.js` uses `import * as StringUtils` and `import * as Validate` as namespaces. What are the trade-offs vs named imports for a production application with strict bundle-size requirements?
2. The `moduleCache` Map in `main.js` stores loaded feature modules. The browser's module map also caches them. Why does the application-level cache still add value on top of what the browser already does?
3. `utils/index.js` uses `export * from "./string.js"`. What risk does `export *` introduce when two sub-modules export the same name? How would you resolve it in the barrel?
4. In the locale loader, `await import(`./locales/${safe}.js`)` uses a template literal path. What must a bundler (Vite, Webpack) do at build time when it encounters a pattern like this? What happens to bundle size?
5. `services/index.js` re-exports using `export * as PostService from "./PostService.js"`. A consumer then writes `import * as Services from "./services/index.js"` and calls `Services.PostService.createPost(...)`. Trace the full chain — what is `Services`, what is `Services.PostService`, and what is `Services.PostService.createPost`?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What three things do ES modules provide that plain `<script>` tags do not?

**Q2:** What is the difference between a named export and a default export? Can a module have both?

**Q3:** What is wrong with each of these lines?

```js
export 42;
export default function() {}
export default class {}
```

**Q4:** When importing a named export, what are the two requirements about the name you use?

**Q5:** Explain "live bindings" in one sentence, then demonstrate with a two-file code example.

**Q6:** You need `format` from both `./date.js` and `./number.js`. Write two ways to import both without conflict.

**Q7:** What does `import * as Utils from "./utils.js"` produce? Can you add a new property to it?

**Q8:** What is a barrel file and why is it useful?

**Q9:** Write the code to dynamically load `./chart.js` only when a button is clicked, access its default export as `Chart`, and handle load failures.

**Q10:** What is the difference between `import Chart from "./chart.js"` and `const { default: Chart } = await import("./chart.js")`?

---

## Answer Key

**A1:** Any three of: own private scope (no global pollution), strict mode always on, `import`/`export` syntax, deferred execution, single evaluation (module map cache), live bindings, top-level `await`.

**A2:** Named exports are identified by their name — a module can have many. A default export is the "main" export — exactly one per module. Yes, a module can have both simultaneously.

**A3:** (1) `export 42` — you cannot export a bare value; bind it first: `export const ANSWER = 42`. (2 & 3) — two `export default` statements — only one default is allowed per module.

**A4:** (1) The name must exactly match what was exported — or you must use `as` to rename it. (2) It must be wrapped in curly braces `{ }`.

**A5:** A live binding means the import is a real-time reference to the exported variable — if the exporting module changes it, the importing file sees the updated value immediately. Example: export `let count = 0` and `increment()`. Calling `increment()` makes `count` read as `1` in the importing file.

**A6:**
```js
// Option 1 — rename with 'as':
import { format as formatDate } from "./date.js";
import { format as formatNum  } from "./number.js";

// Option 2 — namespaces:
import * as DateFmt from "./date.js";
import * as NumFmt  from "./number.js";
// Use: DateFmt.format(), NumFmt.format()
```

**A7:** A **namespace object** — a sealed object where each property is one of the module's exports. No — namespace objects are frozen; attempting to add, remove, or replace properties throws a `TypeError`.

**A8:** A barrel file (index file) is a module that re-exports items from multiple sub-modules through a single path. It simplifies imports for consumers — one import path instead of many — and lets you reorganise internal files without updating every consumer.

**A9:**
```js
document.getElementById("chart-btn").addEventListener("click", async () => {
  try {
    const { default: Chart } = await import("./chart.js");
    new Chart(document.getElementById("canvas")).render();
  } catch (err) {
    console.error("Failed to load chart:", err.message);
  }
});
```

**A10:** The first is a **static import** — runs at startup, `Chart` is available throughout the file, must be at the top level. The second is a **dynamic import** — returns a Promise, runs only when that line executes, works anywhere in code. Both give you the same `Chart` value.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can explain what a module is and the problem it solves | ✓ |
| 2 | Understand private scope, strict mode, and single-evaluation | ✓ |
| 3 | Can use `<script type="module">` correctly in the browser | ✓ |
| 4 | Can write named exports inline and as a bottom list | ✓ |
| 5 | Can write a default export and choose when to use it | ✓ |
| 6 | Can rename exports using `as` | ✓ |
| 7 | Can build a barrel file using re-exports | ✓ |
| 8 | Can import named exports with `{ }` and default without `{ }` | ✓ |
| 9 | Can import both default and named in one statement | ✓ |
| 10 | Can rename imports using `as` | ✓ |
| 11 | Understand live bindings and why imported names cannot be reassigned | ✓ |
| 12 | Can use top-level `await` inside a module | ✓ |
| 13 | Can create namespace imports with `import * as X` | ✓ |
| 14 | Understand when to prefer namespace vs named imports (tree shaking) | ✓ |
| 15 | Can use `import()` for dynamic on-demand loading | ✓ |
| 16 | Can access both default and named exports from a dynamic import | ✓ |
| 17 | Can implement conditional loading and an application-level module cache | ✓ |
| 18 | Know when to use static vs dynamic imports | ✓ |
| 19 | Built the full Blog Platform project combining all five chapters | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| `export 42` — bare value | Forgetting to bind it to a name | `export const ANSWER = 42` |
| Two `export default` in one file | Only one default allowed per module | Remove one; convert the other to a named export |
| Named import without curly braces | Confusing named and default syntax | Named → `{ name }`, Default → `name` (no braces) |
| Missing `.js` extension in browser | Browsers need the full path | Always include `.js` for browser ES modules |
| `import` inside a function or `if` | Static imports must be at top level | Use dynamic `import()` for conditional loading |
| Reassigning an imported binding | Imports are live read-only references | Call a function the module exports to change the value |
| Forgetting `await` before `import()` | `import()` returns a Promise | `const mod = await import("./file.js")` |
| Accessing `.default` on a static default import | Static default import is already the value | Only namespace objects have a `.default` property |
| Dynamic path from user input | Path traversal security risk | Always validate against a whitelist before using in `import()` |
| Circular imports (A imports B, B imports A) | Modules can't fully initialise each other | Refactor shared code into a third module C |

---

## One-Sentence Summary

> JavaScript modules transform a tangled global codebase into a network of self-contained, explicitly connected files — each declaring what it provides through exports and what it needs through imports — while dynamic imports allow expensive code to load on demand, keeping initial page loads fast.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Modules (5 pages)*
