---
title: "JavaScript Asynchronous Programming: Async Concepts · Timeouts · Callbacks · Promises · Async/Await · Fetch API · Debugging · Reference"
nav_order: 34
---

> **How to use this tutorial**
> Asynchronous programming is the single most important skill gap between beginner and professional JavaScript developers. Everything on the modern web — API calls, file uploads, real-time updates, timers — depends on it. Work through every chapter in order; each one builds directly on the previous.
>
> - **Phase 1 – Comprehension:** Full explanations, line-by-line walkthroughs, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project combining all chapters

---

# TABLE OF CONTENTS
1. [Chapter 1 — How Asynchronous JavaScript Works](#chapter-1--how-asynchronous-javascript-works)
2. [Chapter 2 — Async Foundations](#chapter-2--async-foundations)
3. [Chapter 3 — Timeouts and Intervals](#chapter-3--timeouts-and-intervals)
4. [Chapter 4 — Callbacks In Depth](#chapter-4--callbacks-in-depth)
5. [Chapter 5 — Promises](#chapter-5--promises)
6. [Chapter 6 — Async / Await](#chapter-6--async--await)
7. [Chapter 7 — The Fetch API](#chapter-7--the-fetch-api)
8. [Chapter 8 — Debugging Async Code](#chapter-8--debugging-async-code)
9. [Chapter 9 — Promise Reference](#chapter-9--promise-reference)
10. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
11. [Phase 3 — Project Simulation](#phase-3--project-simulation)
12. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — HOW ASYNCHRONOUS JAVASCRIPT WORKS

## The Core Problem: JavaScript Is Single-Threaded

JavaScript can only do **one thing at a time**. It has a single **call stack** — a list of functions waiting to run. Functions are added to the top of the stack when called and removed when they return.

This means: if one operation takes a long time (loading a file, waiting for a server response, counting to a billion), **the entire page freezes** until it finishes.

**Real-world analogy — the coffee shop:**
Imagine a coffee shop where one barista handles every single step for every customer, one customer at a time. While the espresso machine brews (which takes 30 seconds), the barista stands there doing nothing. Nobody else gets served. The queue grows. This is **synchronous** (blocking) code.

A real coffee shop is asynchronous: the barista starts the machine, writes the next order on a cup, starts another drink, and comes back to pick up the finished espresso. Multiple things are "in progress" simultaneously. When something finishes, the barista is notified and picks it up.

---

## 1.1 — Synchronous vs Asynchronous — Side by Side

**Synchronous — blocking:**

```js
console.log("Order taken");

// This blocks for 3 seconds — nothing else runs:
function waitThreeSeconds() {
  const start = Date.now();
  while (Date.now() - start < 3000) { }   // Busy-waiting loop
}
waitThreeSeconds();

console.log("Coffee ready");   // Only prints after 3 full seconds

// Output:
// Order taken
// (3 second freeze — UI unresponsive)
// Coffee ready
```

**Asynchronous — non-blocking:**

```js
console.log("Order taken");

setTimeout(function() {
  console.log("Coffee ready");   // Runs after 3 seconds — without blocking
}, 3000);

console.log("Serving next customer");  // Runs IMMEDIATELY — doesn't wait

// Output:
// Order taken
// Serving next customer
// (3 seconds pass...)
// Coffee ready
```

The critical difference: the asynchronous version lets the rest of the program continue immediately. The delay happens "in the background."

---

## 1.2 — The JavaScript Engine: Call Stack, Web APIs, and the Event Loop

To understand *how* async code works, you need to understand the three pieces that cooperate:

```
┌─────────────────────────────────────────────┐
│            JavaScript Engine                │
│                                             │
│  ┌─────────────┐      ┌──────────────────┐  │
│  │  Call Stack  │      │   Memory Heap    │  │
│  │  (runs code) │      │  (stores data)   │  │
│  └──────┬──────┘      └──────────────────┘  │
└─────────┼───────────────────────────────────┘
          │
          │ offloads async tasks
          ▼
┌─────────────────────┐
│     Web APIs        │  ← setTimeout, fetch, DOM events
│  (browser handles)  │    The browser runs these outside JS
└──────────┬──────────┘
           │ when done, puts callback here:
           ▼
┌─────────────────────┐
│   Callback Queue    │  ← "Coffee is ready — please collect"
└──────────┬──────────┘
           │ Event Loop checks: "Is call stack empty?"
           ▼                   "Yes? → Move callback to stack"
┌─────────────────────┐
│    Event Loop       │  ← The traffic controller
└─────────────────────┘
```

**Step-by-step walkthrough for `setTimeout(fn, 2000)`:**

| Step | What Happens |
|---|---|
| 1 | `setTimeout(fn, 2000)` is called — placed on the call stack |
| 2 | The call stack passes it to the **Web API** (browser's timer system) |
| 3 | `setTimeout` is removed from the call stack — JS engine moves on immediately |
| 4 | Browser's timer counts 2000ms in the background |
| 5 | After 2000ms, the callback `fn` is placed in the **Callback Queue** |
| 6 | The **Event Loop** sees the call stack is empty |
| 7 | Event Loop moves `fn` from the queue onto the call stack |
| 8 | `fn` runs |

> 💡 **Key insight:** JavaScript never truly runs two things simultaneously. Asynchronous code appears concurrent because the browser handles waiting (timers, network requests) outside the JS engine. JavaScript only runs the callback once the stack is empty and its turn arrives.

---

## 1.3 — The Microtask Queue vs the Callback Queue

There are actually **two queues** — and their priority order matters:

| Queue | What Goes In | Priority |
|---|---|---|
| **Microtask Queue** | Promise `.then()` / `.catch()` / `.finally()` callbacks, `queueMicrotask()` | **Higher** — drains completely before any macrotask runs |
| **Callback Queue** (Macrotask Queue) | `setTimeout`, `setInterval`, DOM events, I/O callbacks | **Lower** — one task per event loop turn |

```js
console.log("1 — synchronous");

setTimeout(() => console.log("2 — macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3 — microtask (Promise)"));

console.log("4 — synchronous");

// Output ORDER:
// 1 — synchronous
// 4 — synchronous
// 3 — microtask (Promise)    ← microtask runs BEFORE setTimeout even though both are "0 delay"
// 2 — macrotask (setTimeout)
```

This order surprises most beginners. Even a `setTimeout` with 0ms delay runs *after* all pending Promise callbacks.

> 🤔 **Thinking question:** If you have five `Promise.resolve().then(...)` chains and one `setTimeout(..., 0)`, in what order do they run? Why?

---

## 1.4 — Three Eras of Async JavaScript

JavaScript's approach to async has evolved through three generations:

| Era | Mechanism | Problem Solved | New Problem Introduced |
|---|---|---|---|
| 1 | **Callbacks** | Basic async; works | Callback hell (deeply nested, hard to read) |
| 2 | **Promises** | Flat chaining; better errors | Still somewhat verbose |
| 3 | **async/await** | Reads like synchronous code | Must understand Promises to debug |

All three are still used in real codebases. You need to understand all of them.

---

---

# CHAPTER 2 — ASYNC FOUNDATIONS

---

## 2.1 — What "Asynchronous" Means for a Program

When a JavaScript function starts an async operation, it:
1. **Starts** the operation (sends the request, starts the timer)
2. **Registers a callback** (what to do when it finishes)
3. **Returns immediately** — without the result
4. Later, when the operation completes, the callback runs with the result

```js
// Synchronous: result available immediately
const result = JSON.parse('{"name":"Alice"}');
console.log(result.name);   // Output: Alice — available right now

// Asynchronous: result available later
fetch("https://api.example.com/user")
  .then(response => response.json())
  .then(data => console.log(data.name));  // Available sometime later
// Nothing is logged right here — we have to wait
```

---

## 2.2 — Why Not Just Make Everything Synchronous?

Consider what happens if network requests were synchronous:

```
User clicks "Load Profile"
  → JavaScript calls a blocking network request
  → Page is completely frozen (can't scroll, click, type, animate)
  → Request takes 2 seconds
  → Page unfreezes
  → Profile loads

If the server is slow or offline: page freezes indefinitely
```

This is why the browser provides async network, file, and timer APIs — to keep the UI responsive.

---

## 2.3 — Recognising Async Operations

These JavaScript operations are always asynchronous:

| Operation | How It's Handled |
|---|---|
| `setTimeout` / `setInterval` | Web API timer |
| `fetch()` / XMLHttpRequest | Web API network |
| DOM events (click, keydown) | Web API events |
| File reading (Node.js: `fs.readFile`) | OS I/O |
| Database queries (Node.js) | OS I/O |
| `IndexedDB` (browser) | Browser API |
| `requestAnimationFrame` | Browser rendering cycle |
| Geolocation, camera, microphone | Browser API |

Any time you see a **callback parameter**, a `.then()` chain, or `await`, you are working with async code.

---

---

# CHAPTER 3 — TIMEOUTS AND INTERVALS

---

## What Are Timeouts and Intervals?

`setTimeout` and `setInterval` are the simplest async tools in JavaScript. They schedule functions to run in the future without blocking the current execution.

- **`setTimeout`** — run a function **once** after a delay
- **`setInterval`** — run a function **repeatedly** at a fixed interval

---

## 3.1 — `setTimeout(callback, delay, ...args)`

```js
setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("This runs immediately");

// Output:
// This runs immediately
// (2 seconds later)
// This runs after 2 seconds
```

**Passing arguments to the callback:**

```js
function greet(name, greeting) {
  console.log(greeting + ", " + name + "!");
}

setTimeout(greet, 1000, "Alice", "Good morning");
// After 1 second → Output: Good morning, Alice!
```

Arguments after the delay are passed to the callback when it fires.

---

## 3.2 — `clearTimeout()` — Cancelling a Timeout

`setTimeout` returns a **timer ID** — a number that identifies the scheduled timeout. Pass this to `clearTimeout()` to cancel it before it fires.

```js
const timerId = setTimeout(function() {
  console.log("This will never print");
}, 5000);

console.log("Timer ID:", timerId);   // Output: Timer ID: 1 (or some number)

clearTimeout(timerId);   // Cancel — the callback will NOT run
```

**Real-world use — debounce (cancel previous timer on each keystroke):**

```js
let searchTimer = null;

function onSearchInput(event) {
  clearTimeout(searchTimer);   // Cancel any previous pending search

  searchTimer = setTimeout(function() {
    performSearch(event.target.value);   // Only runs 500ms after typing stops
  }, 500);
}
```

Without `clearTimeout`, every keystroke would trigger a search. With it, the search only fires 500ms after the user stops typing.

---

## 3.3 — `setInterval(callback, delay, ...args)`

Calls the callback repeatedly, every `delay` milliseconds, until cleared.

```js
let count = 0;

const intervalId = setInterval(function() {
  count++;
  console.log("Tick: " + count);

  if (count === 5) {
    clearInterval(intervalId);   // Stop after 5 ticks
    console.log("Interval stopped.");
  }
}, 1000);

// Output (one per second):
// Tick: 1
// Tick: 2
// Tick: 3
// Tick: 4
// Tick: 5
// Interval stopped.
```

> ⚠️ **Always store the interval ID.** If you lose the reference to the ID, you cannot stop the interval — it runs forever (or until the page is closed), wasting memory and CPU.

---

## 3.4 — `clearInterval()` — Stopping an Interval

```js
const id = setInterval(callback, 1000);
clearInterval(id);   // Stops the interval
```

---

## 3.5 — `setTimeout` Delay Is a Minimum, Not a Guarantee

The delay you specify is the **minimum** time before the callback runs — not an exact time. If the call stack is busy when the timer fires, the callback waits in the queue.

```js
setTimeout(() => console.log("After 0ms"), 0);

// Busy-waiting for 1 second (blocks the call stack):
const start = Date.now();
while (Date.now() - start < 1000) {}

console.log("Synchronous work done");

// Output:
// Synchronous work done       ← runs first (call stack was busy)
// After 0ms                   ← runs after stack empties, even though delay was 0
```

> 💡 **Practical implication:** `setTimeout(fn, 0)` does not mean "run immediately." It means "run as soon as the call stack is empty." Use it when you want code to run after the current execution context finishes.

---

## 3.6 — Recursive `setTimeout` vs `setInterval`

`setInterval` can drift — if the callback takes longer than the interval, calls pile up. **Recursive `setTimeout`** is a safer pattern: the next call is only scheduled after the current one completes.

```js
// setInterval — fires every 1000ms regardless of callback duration:
setInterval(doWork, 1000);

// Recursive setTimeout — waits 1000ms AFTER doWork finishes:
function scheduleNext() {
  setTimeout(function() {
    doWork();
    scheduleNext();   // Schedule the next call only after this one finishes
  }, 1000);
}
scheduleNext();
```

---

---

# CHAPTER 4 — CALLBACKS IN DEPTH

---

## 4.1 — Callbacks as the Foundation of All Async

A **callback** is a function passed as an argument to another function, to be called later. Every async mechanism in JavaScript — Promises, async/await, event listeners — is built on callbacks at the engine level.

```js
function loadData(url, onSuccess, onError) {
  // Simulate a network request with setTimeout
  setTimeout(function() {
    if (url.startsWith("https")) {
      onSuccess({ data: "Loaded from " + url });
    } else {
      onError(new Error("Insecure URL: " + url));
    }
  }, 1000);
}

loadData(
  "https://api.example.com/users",
  function(result) { console.log("Success:", result.data); },
  function(err)    { console.log("Error:",   err.message); }
);
// After 1 second → Output: Success: Loaded from https://api.example.com/users
```

---

## 4.2 — The Error-First Callback Convention

In Node.js and many libraries, async callbacks follow a consistent signature: the **first parameter is always an error** (or `null` if there was none), and subsequent parameters carry the result.

```js
function readConfig(filename, callback) {
  setTimeout(function() {
    if (filename === "config.json") {
      callback(null, { theme: "dark", lang: "en" });   // null = no error
    } else {
      callback(new Error("File not found: " + filename));
    }
  }, 500);
}

readConfig("config.json", function(err, config) {
  if (err) {
    console.error("Failed to load config:", err.message);
    return;   // Stop here — don't try to use config
  }
  console.log("Theme:", config.theme);   // Output: Theme: dark
});

readConfig("missing.json", function(err, config) {
  if (err) {
    console.error("Failed:", err.message);   // Output: Failed: File not found: missing.json
    return;
  }
  console.log(config);
});
```

**Always check the error first.** Proceeding to use `config` when `err` is present is a common source of crashes.

---

## 4.3 — Callback Hell — The Pyramid of Doom

When async operations depend on each other, callbacks nest — and quickly become unreadable:

```js
// ❌ Callback hell — each step requires the result of the previous:
getUser(userId, function(err, user) {
  if (err) { handleError(err); return; }

  getOrders(user.id, function(err, orders) {
    if (err) { handleError(err); return; }

    getOrderDetails(orders[0].id, function(err, details) {
      if (err) { handleError(err); return; }

      getProductInfo(details.productId, function(err, product) {
        if (err) { handleError(err); return; }

        console.log("Product:", product.name);
        // Nested 4 levels deep — and it keeps growing
      });
    });
  });
});
```

**Problems with callback hell:**
- Hard to read (the actual logic is buried in nesting)
- Hard to handle errors consistently
- Hard to debug (stack traces are unclear)
- Hard to add features (every change affects the whole pyramid)

**Fix 1 — Named functions (flatten the pyramid):**

```js
// ✅ Same logic, flat structure:
function handleProduct(err, product) {
  if (err) { handleError(err); return; }
  console.log("Product:", product.name);
}

function handleDetails(err, details) {
  if (err) { handleError(err); return; }
  getProductInfo(details.productId, handleProduct);
}

function handleOrders(err, orders) {
  if (err) { handleError(err); return; }
  getOrderDetails(orders[0].id, handleDetails);
}

function handleUser(err, user) {
  if (err) { handleError(err); return; }
  getOrders(user.id, handleOrders);
}

getUser(userId, handleUser);   // Flat — no pyramid
```

**Fix 2 — Promises (Chapter 5)**
**Fix 3 — async/await (Chapter 6)**

---

## 4.4 — Inversion of Control — Why Callbacks Are Risky

When you pass a callback to a third-party library, you are trusting that library to:
- Call your callback (not forget it)
- Call it exactly once (not zero or three times)
- Call it with the right arguments
- Call it at an appropriate time
- Handle errors correctly

This "giving up control" is called **inversion of control** — and it is a fundamental reason why Promises were invented. A Promise gives control back to the caller.

---

---

# CHAPTER 5 — PROMISES

---

## What Is a Promise?

A **Promise** is an object that represents the eventual result of an asynchronous operation. It is a placeholder for a value that doesn't exist yet but will exist in the future (or the operation will fail trying).

**Real-world analogy — a restaurant pager:**
When you arrive at a busy restaurant, they hand you a vibrating pager. The pager is a **promise** that your table will be ready. You don't wait at the host stand blocking others — you go sit at the bar. When the table is ready (the promise resolves), the pager vibrates and you respond. If the restaurant closes before your table is ready (the promise rejects), you leave.

---

## 5.1 — The Three States of a Promise

A Promise is always in exactly one of three states:

| State | Meaning | Can transition to |
|---|---|---|
| **Pending** | Operation in progress — no result yet | Fulfilled or Rejected |
| **Fulfilled** | Operation succeeded — result is available | (terminal — no further changes) |
| **Rejected** | Operation failed — error is available | (terminal — no further changes) |

```
Promise lifecycle:

  pending ──── resolve(value) ────► fulfilled
     │
     └────── reject(reason) ────► rejected
```

Once a Promise is fulfilled or rejected, its state never changes.

---

## 5.2 — Creating a Promise with `new Promise()`

```js
const myPromise = new Promise(function(resolve, reject) {
  // This function runs immediately — called the "executor"

  const success = true;   // Simulate success or failure

  if (success) {
    resolve("Operation succeeded!");   // Fulfil the promise with a value
  } else {
    reject(new Error("Operation failed."));   // Reject with an error
  }
});
```

**Anatomy of the executor:**

| Part | Description |
|---|---|
| `resolve(value)` | Call this when the operation succeeds. The promise becomes **fulfilled** with `value`. |
| `reject(reason)` | Call this when the operation fails. The promise becomes **rejected** with `reason`. |
| Executor runs immediately | The code inside runs synchronously when `new Promise()` is called |
| Only first call counts | If you call both `resolve` and `reject`, only the first one has any effect |

**A realistic async Promise:**

```js
function delay(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);   // Resolve (with no value) after ms milliseconds
  });
}

delay(1000).then(function() {
  console.log("1 second has passed");
});
```

---

## 5.3 — Consuming Promises: `.then()`, `.catch()`, `.finally()`

You never receive the resolved value directly from a Promise variable. You register callbacks using these methods:

**`.then(onFulfilled, onRejected)`** — handles success (and optionally failure):

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Data loaded!"), 1000);
});

promise.then(function(value) {
  console.log("Success:", value);   // Output: Success: Data loaded!
});
```

**`.catch(onRejected)`** — handles failure:

```js
const failingPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Network error")), 1000);
});

failingPromise
  .then(value => console.log("Success:", value))
  .catch(error => console.log("Error:", error.message));
// Output: Error: Network error
```

> 💡 **`.catch(fn)` is shorthand for `.then(undefined, fn)`.** Always use `.catch()` — it is cleaner and prevents confusion.

**`.finally(callback)`** — runs regardless of success or failure:

```js
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => displayData(data))
  .catch(error => showError(error))
  .finally(() => hideLoadingSpinner());   // Always runs — success OR failure
```

`.finally()` is perfect for cleanup code: hiding spinners, re-enabling buttons, releasing resources.

---

## 5.4 — Promise Chaining

`.then()` always returns a **new Promise**. This means you can chain `.then()` calls — each receives the return value of the previous:

```js
function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice", orderId: 42 }), 500);
  });
}

function getOrder(orderId) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: orderId, product: "Laptop", price: 899 }), 500);
  });
}

// Clean chain — no nesting:
getUser(1)
  .then(user => {
    console.log("User:", user.name);
    return getOrder(user.orderId);   // Return a new Promise — chain continues
  })
  .then(order => {
    console.log("Order:", order.product, "£" + order.price);
  })
  .catch(err => {
    console.error("Something failed:", err.message);
    // One .catch() handles errors from ANY step in the chain
  });

// Output (after ~1 second each):
// User: Alice
// Order: Laptop £899
```

**How the chain works:**

```
getUser(1)                   → Promise<user>
  .then(user => getOrder())  → Promise<order>  ← returning a new Promise continues the chain
  .then(order => log())      → Promise<undefined>
  .catch(err => handleErr()) ← catches any rejection anywhere above
```

> ⚠️ **Always return inside `.then()`.** If you forget to return the next Promise, the chain doesn't wait for it:
> ```js
> .then(user => {
>   getOrder(user.orderId);   // ❌ Missing 'return' — next .then fires immediately with undefined
> })
> .then(order => console.log(order))   // order is undefined!
> ```

---

## 5.5 — `Promise.resolve()` and `Promise.reject()`

Quick ways to create already-settled Promises:

```js
// Already fulfilled:
Promise.resolve(42).then(val => console.log(val));   // Output: 42

// Already rejected:
Promise.reject(new Error("Immediate failure"))
  .catch(err => console.log(err.message));   // Output: Immediate failure
```

Useful for:
- Testing and mock data
- Wrapping synchronous values so they're compatible with async code
- Early returns in async functions

---

## 5.6 — Handling Multiple Promises in Parallel

**`Promise.all(array)` — wait for ALL to succeed:**

```js
const p1 = fetch("https://api.example.com/users");
const p2 = fetch("https://api.example.com/products");
const p3 = fetch("https://api.example.com/orders");

Promise.all([p1, p2, p3])
  .then(([usersRes, productsRes, ordersRes]) => {
    // All three responses available here simultaneously
    console.log("All data loaded");
  })
  .catch(err => {
    // If ANY single promise rejects, this catch runs immediately
    console.error("One request failed:", err.message);
  });
```

`Promise.all` runs all three requests **in parallel** — not one after another. Total time ≈ the longest single request, not the sum of all three.

> ⚠️ **`Promise.all` fails fast.** If any one promise rejects, the entire `Promise.all` rejects immediately, ignoring the other promises (even if they succeed).

**`Promise.allSettled(array)` — wait for ALL, regardless of outcome:**

```js
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("✅ Success:", result.value);
    } else {
      console.log("❌ Failed:", result.reason.message);
    }
  });
});
// Reports EVERY result — both successes and failures
```

**`Promise.race(array)` — resolve or reject with the FIRST settled promise:**

```js
const fast = new Promise(resolve => setTimeout(() => resolve("fast"), 100));
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 500));

Promise.race([fast, slow])
  .then(winner => console.log("Winner:", winner));
// Output: Winner: fast
```

**`Promise.any(array)` — resolve with the FIRST fulfilled promise:**

```js
// Like race, but ignores rejections — only rejects if ALL fail:
Promise.any([failingPromise, successPromise])
  .then(value => console.log("First success:", value))
  .catch(() => console.log("All failed."));
```

---

## 5.7 — Error Propagation in Promise Chains

Errors propagate down the chain until a `.catch()` handles them:

```js
Promise.resolve("start")
  .then(val => {
    throw new Error("Something went wrong in step 1");
  })
  .then(val => {
    console.log("This is skipped");   // ← Skipped — error is propagating
  })
  .then(val => {
    console.log("This is also skipped");   // ← Skipped
  })
  .catch(err => {
    console.log("Caught:", err.message);   // ← Finally caught here
    return "recovered";   // Return a value to resume the chain
  })
  .then(val => {
    console.log("After recovery:", val);   // ← Runs: "recovered"
  });

// Output:
// Caught: Something went wrong in step 1
// After recovery: recovered
```

---

---

# CHAPTER 6 — ASYNC / AWAIT

---

## What Is async/await?

`async` / `await` is syntax that lets you write asynchronous Promise-based code that **looks and reads like synchronous code** — no `.then()` chains, no callbacks. It is the most readable way to work with async operations.

> ⚠️ **async/await does not replace Promises — it is built on them.** An `async` function always returns a Promise. `await` is just a cleaner way to work with `.then()`. You must understand Promises to understand async/await errors.

---

## 6.1 — The `async` Keyword

`async` before a function declaration makes two guarantees:
1. The function always returns a **Promise**, even if you return a plain value
2. You can use `await` inside it

```js
async function greet(name) {
  return "Hello, " + name;   // Plain string
}

const result = greet("Alice");
console.log(result);           // Output: Promise { 'Hello, Alice' }  ← It's a Promise!
result.then(msg => console.log(msg));  // Output: Hello, Alice
```

The returned `"Hello, Alice"` string is automatically wrapped in `Promise.resolve("Hello, Alice")`.

---

## 6.2 — The `await` Keyword

`await` pauses execution **inside** the async function until the Promise settles, then returns the resolved value. The rest of the program continues running while waiting.

```js
function loadUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Alice", age: 30 }), 1000);
  });
}

async function showUser(id) {
  console.log("Loading user...");

  const user = await loadUser(id);   // Pause here until loadUser resolves
  // Execution resumes here after 1 second, with user = { id: 1, name: "Alice", age: 30 }

  console.log("User:", user.name);
  console.log("Age:", user.age);
}

showUser(1);
console.log("This prints while showUser is waiting");

// Output:
// Loading user...
// This prints while showUser is waiting
// (1 second later)
// User: Alice
// Age: 30
```

> 💡 **`await` pauses the function, not the entire program.** The line `console.log("This prints while showUser is waiting")` runs immediately because it's outside the `async` function. Only `showUser`'s internal execution pauses.

---

## 6.3 — Error Handling with try/catch

Replace `.catch()` with standard `try`/`catch` blocks for clean error handling:

```js
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch user:", error.message);
    return null;   // Return a safe fallback
  }
}

async function run() {
  const user = await fetchUserData(1);
  if (user) {
    console.log("Loaded:", user.name);
  } else {
    console.log("Could not load user.");
  }
}

run();
```

**The try/catch block catches:**
- Network failures (device offline)
- HTTP error status codes (if you throw manually on `!response.ok`)
- JSON parsing errors (`response.json()` throws on malformed JSON)
- Any error thrown inside the `try` block

---

## 6.4 — Awaiting Multiple Promises

**Sequential (one after another — total time = sum of all delays):**

```js
async function loadSequentially() {
  const users    = await fetchUsers();     // Wait for this...
  const products = await fetchProducts();  // ...then this...
  const orders   = await fetchOrders();    // ...then this
  // Total time: ~3 seconds (if each takes 1 second)
}
```

**Parallel with `Promise.all` (total time ≈ longest single request):**

```js
async function loadInParallel() {
  const [users, products, orders] = await Promise.all([
    fetchUsers(),      // All three start at the same time
    fetchProducts(),
    fetchOrders()
  ]);
  // Total time: ~1 second (they run simultaneously)
}
```

> 💡 **When to use sequential vs parallel:**
> - **Sequential:** When each call depends on the result of the previous (`getUser` → `getOrdersForUser`)
> - **Parallel:** When calls are independent of each other (loading sidebar data, header data, and main content)

---

## 6.5 — async/await with Loops

`await` inside a `for` loop runs each iteration sequentially:

```js
const userIds = [1, 2, 3, 4, 5];

async function loadAllUsers() {
  const users = [];

  for (const id of userIds) {
    const user = await fetchUser(id);   // Waits for each one before moving on
    users.push(user);
  }

  return users;   // Total time: sum of all fetches
}
```

**Parallel version using `Promise.all` + `.map()`:**

```js
async function loadAllUsersParallel() {
  const promises = userIds.map(id => fetchUser(id));   // Start all fetches
  const users = await Promise.all(promises);            // Wait for all at once
  return users;   // Total time: longest single fetch
}
```

> ⚠️ **`forEach` with `await` doesn't work as expected:**
> ```js
> userIds.forEach(async (id) => {
>   const user = await fetchUser(id);
>   console.log(user);   // This seems right but...
> });
> console.log("Done");   // ← This prints BEFORE any user is logged!
> ```
> `forEach` does not wait for async callbacks. Use a regular `for...of` loop or `Promise.all` + `.map()` instead.

---

## 6.6 — Async/Await vs Promises — When to Use Each

| Situation | Prefer |
|---|---|
| Single async operation | Either — async/await is simpler |
| Sequential chain of dependent operations | `async/await` — reads linearly |
| Multiple parallel operations | `Promise.all()` with `await` |
| Complex error recovery and branching | `async/await` with try/catch |
| Event-driven / streaming | Callbacks or Promise streams |
| Library code compatible with both | Return Promises; callers can use `await` or `.then()` |

---

---

# CHAPTER 7 — THE FETCH API

---

## What Is the Fetch API?

`fetch()` is the modern, built-in JavaScript API for making HTTP requests (loading data from servers, sending data to APIs). It replaced the older, more verbose `XMLHttpRequest` (XHR).

`fetch()` always returns a **Promise** — making it the perfect candidate for `async/await`.

---

## 7.1 — Basic GET Request

```js
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error("Fetch failed:", err));
```

**Two-step process — always:**

| Step | Code | What It Does |
|---|---|---|
| 1 | `fetch(url)` | Sends the request; returns a Promise that resolves to a **Response object** |
| 2 | `response.json()` | Reads the response body and parses it as JSON; returns another Promise |

The Response object contains metadata (status code, headers). The body must be read separately.

---

## 7.2 — The Response Object

```js
async function getUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  console.log(response.status);     // Output: 200
  console.log(response.ok);         // Output: true  (true for 200-299)
  console.log(response.statusText); // Output: OK
  console.log(response.headers.get("content-type"));  // Output: application/json; charset=utf-8

  const data = await response.json();
  return data;
}
```

**Response body methods:**

| Method | Returns | Use For |
|---|---|---|
| `response.json()` | Promise → parsed object | JSON APIs (most common) |
| `response.text()` | Promise → string | HTML, plain text, CSV |
| `response.blob()` | Promise → Blob | Images, files (binary) |
| `response.arrayBuffer()` | Promise → ArrayBuffer | Raw binary data |
| `response.formData()` | Promise → FormData | Form submissions |

> ⚠️ **You can only read the response body once.** Once you call `response.json()`, the body stream is consumed. Calling `response.text()` after would fail or return empty. If you need the raw text AND the parsed JSON, read as text first, then parse manually: `const text = await response.text(); const data = JSON.parse(text);`

---

## 7.3 — Checking for HTTP Errors

**Critical gotcha: `fetch()` only rejects on network failures, NOT on HTTP error status codes.**

```js
async function safeFetch(url) {
  const response = await fetch(url);

  // response.ok is true for status 200–299
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// A 404 or 500 response does NOT automatically cause rejection!
// You must check response.ok yourself.

try {
  const data = await safeFetch("https://api.example.com/missing-resource");
} catch (err) {
  console.error(err.message);   // Output: HTTP error: 404 Not Found
}
```

> ⚠️ **This is the single most common `fetch` mistake for beginners.** Always check `response.ok` before reading the body.

---

## 7.4 — POST Request — Sending Data

```js
async function createUser(userData) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",   // Tell the server what format we're sending
      "Authorization": "Bearer my-token"     // Common for authenticated APIs
    },
    body: JSON.stringify(userData)           // Convert object to JSON string
  });

  if (!response.ok) throw new Error("Failed to create user: " + response.status);

  const created = await response.json();
  console.log("Created user with ID:", created.id);
  return created;
}

createUser({ name: "Alice", email: "alice@example.com", role: "admin" });
```

**The fetch options object:**

| Option | Description | Example |
|---|---|---|
| `method` | HTTP method | `"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, `"PATCH"` |
| `headers` | Request headers | `{ "Content-Type": "application/json" }` |
| `body` | Request body | `JSON.stringify(data)` — only for POST, PUT, PATCH |
| `credentials` | Send cookies? | `"include"`, `"same-origin"`, `"omit"` |
| `signal` | AbortController | For cancelling requests |
| `mode` | CORS mode | `"cors"`, `"no-cors"`, `"same-origin"` |

---

## 7.5 — PUT and DELETE Requests

```js
// PUT — update an existing resource:
async function updateUser(id, updates) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error("Update failed");
  return response.json();
}

// DELETE — remove a resource:
async function deleteUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) throw new Error("Delete failed");
  return true;
}

// PATCH — partial update:
async function patchUser(id, field, value) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value })
  });
  return response.json();
}
```

---

## 7.6 — Aborting a Fetch Request

Use `AbortController` to cancel an in-flight request — useful for search boxes (cancel previous when user types again) or timeouts:

```js
let abortController = null;

async function searchUsers(query) {
  // Cancel the previous request if still in flight:
  if (abortController) abortController.abort();

  abortController = new AbortController();

  try {
    const response = await fetch(
      `https://api.example.com/users?search=${query}`,
      { signal: abortController.signal }   // Pass the abort signal
    );
    const data = await response.json();
    displayResults(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Request cancelled — newer search started");
    } else {
      console.error("Search failed:", err.message);
    }
  }
}
```

**Request timeout using AbortController:**

```js
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);   // Cancel the timeout if request succeeds in time
    return response.json();
  } catch (err) {
    if (err.name === "AbortError") throw new Error("Request timed out after " + timeoutMs + "ms");
    throw err;
  }
}
```

---

## 7.7 — A Reusable API Client

In production code, instead of calling `fetch` directly everywhere, wrap it in a reusable client:

```js
class ApiClient {
  #baseUrl;
  #defaultHeaders;

  constructor(baseUrl, defaultHeaders = {}) {
    this.#baseUrl = baseUrl;
    this.#defaultHeaders = {
      "Content-Type": "application/json",
      ...defaultHeaders
    };
  }

  async #request(path, options = {}) {
    const url = this.#baseUrl + path;
    const config = {
      ...options,
      headers: { ...this.#defaultHeaders, ...options.headers }
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`${response.status} ${response.statusText}: ${errorText}`);
    }

    // Return null for 204 No Content (e.g., DELETE responses):
    if (response.status === 204) return null;

    return response.json();
  }

  get(path)               { return this.#request(path); }
  post(path, data)        { return this.#request(path, { method: "POST",   body: JSON.stringify(data) }); }
  put(path, data)         { return this.#request(path, { method: "PUT",    body: JSON.stringify(data) }); }
  patch(path, data)       { return this.#request(path, { method: "PATCH",  body: JSON.stringify(data) }); }
  delete(path)            { return this.#request(path, { method: "DELETE" }); }
}

// Usage:
const api = new ApiClient("https://api.example.com", {
  "Authorization": "Bearer my-token"
});

async function run() {
  const users  = await api.get("/users");
  const newUser = await api.post("/users", { name: "Alice", email: "alice@example.com" });
  await api.delete("/users/42");
}
```

---

---

# CHAPTER 8 — DEBUGGING ASYNC CODE

---

## Why Async Code Is Harder to Debug

Synchronous bugs are easy to trace: the call stack shows exactly what called what and in what order. Async bugs are harder because:
- Errors happen in callbacks that run much later than the code that set them up
- Stack traces are often truncated or unclear
- Race conditions (two async operations interacting unexpectedly) are nearly invisible
- Unhandled rejections fail silently in older environments

---

## 8.1 — Common Async Bugs and How to Fix Them

**Bug 1 — Missing `await` (forgetting to wait for the Promise):**

```js
async function getUsername(id) {
  const user = fetchUser(id);    // ❌ Missing await!
  console.log(user.name);        // Output: undefined — user is a Promise, not an object
}

// Fix:
async function getUsername(id) {
  const user = await fetchUser(id);   // ✅ Wait for the Promise
  console.log(user.name);             // Output: Alice
}
```

**How to spot it:** If you see `Promise { <pending> }` instead of your data, you forgot `await`.

---

**Bug 2 — Unhandled Promise rejection:**

```js
// ❌ No .catch() and no try/catch — rejection is unhandled:
async function loadData() {
  const data = await fetch("https://bad-url.example.com/data");
  return data.json();
}
loadData();   // Rejection is silently dropped (or creates a warning)

// Fix 1 — try/catch inside:
async function loadData() {
  try {
    const response = await fetch("https://bad-url.example.com/data");
    return response.json();
  } catch (err) {
    console.error("Load failed:", err.message);
    return null;
  }
}

// Fix 2 — catch at the call site:
loadData().catch(err => console.error("Load failed:", err.message));
```

---

**Bug 3 — Not checking `response.ok` in fetch:**

```js
// ❌ A 404 response doesn't throw — .json() tries to parse an error HTML page:
async function getUser(id) {
  const res  = await fetch(`/api/users/${id}`);
  const data = await res.json();   // May throw "unexpected token" if body is HTML error page
  return data;
}

// Fix:
async function getUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error("User not found: " + res.status);
  return res.json();
}
```

---

**Bug 4 — Race condition (two async operations writing the same state):**

```js
let userData = null;

// If called twice quickly, the slower call might overwrite the faster one's result:
async function loadUser(id) {
  const user = await fetchUser(id);
  userData = user;   // Which call wins? Unpredictable!
}

loadUser(1);   // Starts fetching user 1
loadUser(2);   // Starts fetching user 2 immediately after
// userData might end up as user 1 or user 2 depending on network timing

// Fix — use AbortController to cancel the previous request:
// (see Chapter 7 AbortController section)
```

---

**Bug 5 — `await` in `forEach` (operations don't wait):**

```js
// ❌ forEach ignores returned Promises:
[1, 2, 3].forEach(async (id) => {
  const user = await fetchUser(id);
  console.log(user.name);
});
console.log("Done");   // Prints BEFORE any user name!

// Fix — use for...of:
for (const id of [1, 2, 3]) {
  const user = await fetchUser(id);
  console.log(user.name);
}
console.log("Done");   // Prints after all users

// Fix — parallel with Promise.all:
await Promise.all([1, 2, 3].map(async id => {
  const user = await fetchUser(id);
  console.log(user.name);
}));
console.log("Done");   // Prints after all users (in parallel)
```

---

## 8.2 — Async Stack Traces and Browser DevTools

Modern browsers show **async stack traces** in the Console panel:

```
Error: Failed to fetch
  at fetchUser (app.js:24)       ← where the error was thrown
  at async loadProfile (app.js:12)  ← async function that called fetchUser
  at async init (app.js:5)          ← async function that called loadProfile
```

**Tips for cleaner async debugging:**
- Name your async functions (avoid anonymous arrows where possible) — names appear in stack traces
- Use `console.group()` / `console.groupEnd()` to group async operation logs
- In Chrome DevTools → Sources panel → check "Async" in the Call Stack to see the full async trace
- In DevTools → Network panel → filter by Fetch/XHR to see all outgoing requests and their responses

---

## 8.3 — Global Unhandled Rejection Handler

Catch any unhandled Promise rejections anywhere in your app:

```js
// Browser:
window.addEventListener("unhandledrejection", function(event) {
  console.error("Unhandled Promise rejection:", event.reason);
  event.preventDefault();   // Suppress the default console warning
});

// Node.js:
process.on("unhandledRejection", function(reason, promise) {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);   // Exit — unhandled rejections indicate a bug
});
```

---

## 8.4 — Async Debugging Checklist

Use this checklist when an async operation isn't working as expected:

```
□ Is the function marked async?
□ Did I await every Promise?
□ Did I check response.ok after fetch()?
□ Is there a try/catch or .catch() for every async path?
□ Am I using for...of (not forEach) for sequential async loops?
□ Is state being mutated by two concurrent async operations?
□ Am I using Promise.all for parallel operations that should run together?
□ Am I accidentally returning void from a .then() callback?
□ Are there any unhandled rejection warnings in the console?
```

---

---

# CHAPTER 9 — PROMISE REFERENCE

---

## 9.1 — Promise Constructor

```js
const p = new Promise((resolve, reject) => {
  // executor runs synchronously
  // call resolve(value) to fulfil
  // call reject(reason) to reject
});
```

---

## 9.2 — Instance Methods

| Method | Signature | Purpose |
|---|---|---|
| `.then()` | `.then(onFulfilled?, onRejected?)` | Handle fulfilment (and optionally rejection). Returns a new Promise. |
| `.catch()` | `.catch(onRejected)` | Handle rejection. Shorthand for `.then(undefined, onRejected)`. Returns a new Promise. |
| `.finally()` | `.finally(onFinally)` | Runs on both fulfilment and rejection. Receives no value. Returns a new Promise. |

**`.then()` return value rules:**

| What `.then()` callback returns | Resulting Promise |
|---|---|
| A non-Promise value `x` | Fulfilled with `x` |
| A Promise | Follows that Promise (same state and value) |
| Throws an error | Rejected with that error |
| Returns nothing (`undefined`) | Fulfilled with `undefined` |

---

## 9.3 — Static Methods (Full Reference)

| Method | Signature | Resolves When | Rejects When |
|---|---|---|---|
| `Promise.resolve()` | `(value)` | Immediately with `value` | Never (unless value is a rejecting Promise) |
| `Promise.reject()` | `(reason)` | Never | Immediately with `reason` |
| `Promise.all()` | `(iterable)` | ALL promises fulfil | ANY one rejects (fast fail) |
| `Promise.allSettled()` | `(iterable)` | ALL promises settle (any outcome) | Never rejects |
| `Promise.race()` | `(iterable)` | FIRST promise settles | FIRST promise settles (with rejection) |
| `Promise.any()` | `(iterable)` | FIRST promise fulfils | ALL promises reject (`AggregateError`) |

---

## 9.4 — `Promise.all()` vs `Promise.allSettled()` vs `Promise.race()` vs `Promise.any()`

```js
const fast    = new Promise(resolve => setTimeout(() => resolve("fast"),    100));
const slow    = new Promise(resolve => setTimeout(() => resolve("slow"),    500));
const failing = new Promise((_, reject) => setTimeout(() => reject(new Error("oops")), 200));

// Promise.all — fails if any one fails:
Promise.all([fast, slow, failing])
  .then(results => console.log("all:", results))
  .catch(err    => console.log("all failed:", err.message));
// Output: all failed: oops

// Promise.allSettled — reports everything:
Promise.allSettled([fast, slow, failing]).then(results => {
  results.forEach(r => console.log(r.status, r.value ?? r.reason?.message));
});
// Output:
// fulfilled fast
// fulfilled slow
// rejected  oops

// Promise.race — first to settle wins:
Promise.race([fast, slow, failing])
  .then(v   => console.log("race winner:", v))
  .catch(err => console.log("race lost:", err.message));
// Output: race winner: fast  (fast resolves at 100ms, before failing at 200ms)

// Promise.any — first to FULFIL wins (ignores rejections):
Promise.any([failing, slow])
  .then(v => console.log("any:", v));
// Output: any: slow  (failing is ignored; slow eventually fulfils)
```

---

## 9.5 — `Promise.allSettled()` Result Shape

Each element in the result array is an object with this shape:

```js
// On success:
{ status: "fulfilled", value: <the resolved value> }

// On failure:
{ status: "rejected", reason: <the rejection reason> }
```

---

## 9.6 — Error Types in Async Code

| Error | When it occurs | How to handle |
|---|---|---|
| `TypeError: Failed to fetch` | Network is offline, CORS error, bad URL | `.catch()` or try/catch |
| `SyntaxError: Unexpected token` | `response.json()` on non-JSON body (e.g., HTML error page) | Check `response.ok` first |
| `AbortError` | `AbortController.abort()` was called | Check `err.name === "AbortError"` |
| `AggregateError` | `Promise.any()` when all promises reject | Contains `.errors` array |
| Unhandled rejection | Promise rejected with no `.catch()` | Add `.catch()` or global handler |

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Timeout and Interval Mechanics

**Objective:** Build a countdown timer that displays on a web page and stops automatically.

**Scenario:** A quiz app where each question has a 30-second time limit. A visual bar shrinks as time runs out. When it reaches 0, the question auto-submits.

**Warm-up mini-example:**

```js
let remaining = 5;
const id = setInterval(() => {
  console.log(remaining + " seconds left");
  remaining--;
  if (remaining < 0) {
    clearInterval(id);
    console.log("Time's up!");
  }
}, 1000);
```

**Step-by-step instructions:**

1. Create an HTML page with a `<div id="timer">30</div>`, a `<div id="bar">` (full width), and a `<button id="start">Start</button>`.
2. On "Start" click, begin a `setInterval` that counts down from 30.
3. Each tick: update the `#timer` text and shrink `#bar` width proportionally.
4. When it hits 0: clear the interval, show "Time's up!", disable the start button.
5. Add a "Reset" button that clears any running interval and resets the display.

**Self-check questions:**
1. Why must you store the interval ID in a variable outside the interval callback?
2. What happens if the user clicks "Start" twice without resetting? How would you fix it?

---

## Exercise 2 — Callbacks to Promises Refactor

**Objective:** Take callback-based code and rewrite it as Promise-based code.

**Scenario:** A simple user authentication flow.

**Starting code (callback-based):**

```js
function validateCredentials(username, password, callback) {
  setTimeout(() => {
    if (username === "admin" && password === "secret") {
      callback(null, { userId: 1, role: "admin" });
    } else {
      callback(new Error("Invalid credentials"));
    }
  }, 500);
}

function loadUserPermissions(userId, callback) {
  setTimeout(() => {
    callback(null, ["read", "write", "delete"]);
  }, 300);
}

function logAuditEvent(userId, action, callback) {
  setTimeout(() => {
    callback(null, { logged: true, timestamp: Date.now() });
  }, 200);
}
```

**Step-by-step instructions:**

1. Wrap each function to return a Promise instead (keep the originals working too).
2. Write `loginFlow(username, password)` that chains all three steps:
   - Validate → load permissions → log the event → return the final user object
3. Handle errors at the end with a single `.catch()`.
4. Rewrite `loginFlow` using `async/await` and `try/catch`.
5. Compare the two versions — count the lines.

**Self-check questions:**
1. In the Promise version, what happens if `validateCredentials` rejects? Does `loadUserPermissions` still run?
2. In the async/await version, what does `return` from an `async` function produce?

---

## Exercise 3 — Fetch API CRUD Operations

**Objective:** Build a complete CRUD interface using `fetch` and the JSONPlaceholder test API.

**API base:** `https://jsonplaceholder.typicode.com`

**Endpoints:**
- `GET /posts` — list all posts
- `GET /posts/1` — get one post
- `POST /posts` — create (returns fake created object)
- `PUT /posts/1` — update
- `DELETE /posts/1` — delete

**Step-by-step instructions:**

1. Write a reusable `request(method, path, body)` async function that:
   - Builds the full URL
   - Sets headers appropriately
   - Checks `response.ok`
   - Returns parsed JSON (or `null` for DELETE)
2. Write `getPosts()`, `getPost(id)`, `createPost(data)`, `updatePost(id, data)`, `deletePost(id)` using your `request()` function.
3. Chain: get all posts, pick the first one, update its title, then delete it. Log each step.
4. Add error handling for non-existent resources (try getting post ID 9999).

**Self-check questions:**
1. Why does `fetch()` not reject on a 404 response?
2. What does `response.json()` throw if the server returns an empty body?

---

## Exercise 4 — Promise.all for Dashboard Loading

**Objective:** Load multiple independent data sources simultaneously and render a dashboard.

**Scenario:** A user dashboard that needs to load user profile, recent orders, notification count, and weather — all at the same time.

**Step-by-step instructions:**

```js
// Mock async data sources — simulate different response times:
const fetchProfile       = () => delay(300).then(() => ({ name: "Alice", avatar: "👩" }));
const fetchRecentOrders  = () => delay(500).then(() => [{ id: 1, item: "Laptop" }, { id: 2, item: "Mouse" }]);
const fetchNotifications = () => delay(200).then(() => ({ count: 5, unread: 2 }));
const fetchWeather       = () => delay(400).then(() => ({ city: "Lagos", temp: 32, condition: "Sunny" }));
```

1. Load all four sources in parallel using `Promise.all`.
2. Measure total load time using `Date.now()`.
3. Render a simple `console.log` dashboard with all the data.
4. Introduce a failure in one source (reject after 300ms) and switch to `Promise.allSettled`. Show partial dashboard even when one source fails.

**Expected output:**
```
Dashboard loaded in 500ms (longest single request):
  👩 Welcome, Alice
  📦 Recent orders: Laptop, Mouse
  🔔 Notifications: 2 unread
  ☀️ Lagos: 32°C, Sunny
```

---

## Exercise 5 — Async Error Handling Scenarios

**Objective:** Write robust async error handling for a realistic API flow.

**Scenario:** An order processing pipeline with multiple failure points.

**Step-by-step instructions:**

Write an `async` function `processOrder(customerId, productId, quantity)` that:
1. Fetches customer data — throws if customer not found
2. Fetches product data — throws if product not found
3. Checks stock level — throws if `quantity > product.stock`
4. Calculates total price with tax
5. Creates an order record — throws if the API call fails
6. Sends a confirmation email — if this fails, log the error but DON'T fail the whole order (non-critical)
7. Returns the order object

Handle each failure type with a meaningful error message. The email step should be wrapped separately so its failure doesn't roll back the whole order.

**Hint:**

```js
// Non-critical step — catch and log but continue:
try {
  await sendConfirmationEmail(order);
} catch (emailErr) {
  console.warn("Email failed (non-critical):", emailErr.message);
  // Don't re-throw — the order is still valid
}
```

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Weather Dashboard with Live API Data

**Scenario:** You are building a production-ready weather dashboard that fetches live data from the Open-Meteo API (free, no API key required). The dashboard loads current weather and a 7-day forecast, handles errors gracefully, shows loading states, and lets the user search for any city.

This project combines all nine chapters:
- Async foundations (Ch.1–2): understanding the event loop, async patterns
- Timeouts (Ch.3): auto-refresh, debounced search
- Callbacks (Ch.4): event listeners, error-first pattern awareness
- Promises (Ch.5): `Promise.all` for parallel requests
- async/await (Ch.6): all API calls
- Fetch API (Ch.7): full HTTP usage with headers, error checking, abort
- Debugging (Ch.8): defensive error handling throughout
- Reference (Ch.9): using the right Promise combinator for each situation

---

### Stage 1 — API Layer (Fetch + async/await)

```js
// --- Geocoding: city name → coordinates ---
async function geocodeCity(cityName, signal) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`City not found: "${cityName}"`);
  }

  const { name, latitude, longitude, country } = data.results[0];
  return { name, latitude, longitude, country };
}

// --- Current weather + 7-day forecast in parallel ---
async function fetchWeatherData(latitude, longitude, signal) {
  const base = "https://api.open-meteo.com/v1/forecast";

  const currentUrl = `${base}?latitude=${latitude}&longitude=${longitude}` +
    `&current_weather=true&windspeed_unit=kmh`;

  const forecastUrl = `${base}?latitude=${latitude}&longitude=${longitude}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode` +
    `&timezone=auto&forecast_days=7`;

  // Fetch current and forecast in parallel:
  const [currentRes, forecastRes] = await Promise.all([
    fetch(currentUrl,  { signal }),
    fetch(forecastUrl, { signal })
  ]);

  // Check both responses:
  if (!currentRes.ok)  throw new Error("Failed to fetch current weather");
  if (!forecastRes.ok) throw new Error("Failed to fetch forecast");

  const [current, forecast] = await Promise.all([
    currentRes.json(),
    forecastRes.json()
  ]);

  return { current, forecast };
}

// --- Weather code → human-readable description ---
function describeWeatherCode(code) {
  const descriptions = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Foggy", 48: "Icy fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
    80: "Slight showers", 81: "Moderate showers", 82: "Violent showers",
    95: "Thunderstorm", 96: "Thunderstorm with hail"
  };
  return descriptions[code] ?? "Unknown conditions";
}
```

---

### Stage 2 — Loading State Manager and Search with Debounce

```js
// --- Loading/Error state manager ---
class UIState {
  static setLoading(message = "Loading...") {
    document.getElementById("status").textContent = message;
    document.getElementById("status").className = "status loading";
    document.getElementById("weather-display").style.opacity = "0.4";
  }

  static setError(message) {
    document.getElementById("status").textContent = "⚠️ " + message;
    document.getElementById("status").className = "status error";
    document.getElementById("weather-display").style.opacity = "1";
  }

  static setReady() {
    document.getElementById("status").textContent = "";
    document.getElementById("status").className = "status";
    document.getElementById("weather-display").style.opacity = "1";
  }
}

// --- Debounced search (Chapter 3 + Chapter 4 + Chapter 7) ---
let searchAbortController = null;
let searchDebounceTimer   = null;

function onCityInput(event) {
  clearTimeout(searchDebounceTimer);   // Cancel pending search

  const city = event.target.value.trim();
  if (city.length < 2) return;

  searchDebounceTimer = setTimeout(() => {
    loadWeatherForCity(city);
  }, 600);  // Wait 600ms after user stops typing
}

// --- Auto-refresh every 10 minutes ---
let refreshIntervalId = null;
let currentCity = null;

function startAutoRefresh() {
  if (refreshIntervalId) clearInterval(refreshIntervalId);

  refreshIntervalId = setInterval(() => {
    if (currentCity) {
      console.log("Auto-refreshing weather data...");
      loadWeatherForCity(currentCity, true);
    }
  }, 10 * 60 * 1000);  // 10 minutes
}
```

---

### Stage 3 — Main Load Function and Display

```js
async function loadWeatherForCity(cityName, silent = false) {
  // Cancel any in-flight request:
  if (searchAbortController) searchAbortController.abort();
  searchAbortController = new AbortController();
  const signal = searchAbortController.signal;

  if (!silent) UIState.setLoading(`Searching for "${cityName}"...`);

  try {
    // Step 1: Geocode
    const location = await geocodeCity(cityName, signal);
    if (!silent) UIState.setLoading(`Loading weather for ${location.name}...`);

    // Step 2: Fetch weather + forecast in parallel
    const { current, forecast } = await fetchWeatherData(
      location.latitude,
      location.longitude,
      signal
    );

    // Step 3: Render
    currentCity = cityName;
    renderCurrentWeather(location, current);
    renderForecast(forecast);
    UIState.setReady();

  } catch (err) {
    if (err.name === "AbortError") {
      return;   // Request was cancelled — silently ignore
    }
    UIState.setError(err.message);
    console.error("Weather load failed:", err);
  }
}

function renderCurrentWeather(location, current) {
  const w    = current.current_weather;
  const desc = describeWeatherCode(w.weathercode);

  document.getElementById("city-name").textContent =
    `${location.name}, ${location.country}`;
  document.getElementById("temperature").textContent =
    `${w.temperature}°C`;
  document.getElementById("condition").textContent = desc;
  document.getElementById("wind-speed").textContent =
    `💨 Wind: ${w.windspeed} km/h`;
  document.getElementById("last-updated").textContent =
    `Updated: ${new Date().toLocaleTimeString()}`;
}

function renderForecast(forecastData) {
  const days = forecastData.daily;
  const container = document.getElementById("forecast-list");
  container.innerHTML = "";

  days.time.forEach((date, i) => {
    const max  = days.temperature_2m_max[i];
    const min  = days.temperature_2m_min[i];
    const rain = days.precipitation_sum[i];
    const desc = describeWeatherCode(days.weathercode[i]);

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <strong>${new Date(date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</strong>
      <p>${desc}</p>
      <p>🌡️ ${max}° / ${min}°</p>
      <p>🌧️ ${rain}mm</p>
    `;
    container.appendChild(card);
  });
}
```

---

### Stage 4 — Wiring Everything Together

```js
// --- HTML structure needed: ---
/*
<input id="city-input" placeholder="Enter city name..." />
<button id="search-btn">Search</button>
<p id="status"></p>

<div id="weather-display">
  <h2 id="city-name"></h2>
  <p id="temperature"></p>
  <p id="condition"></p>
  <p id="wind-speed"></p>
  <small id="last-updated"></small>
  <div id="forecast-list"></div>
</div>
*/

// --- Event wiring ---
document.getElementById("city-input")
  .addEventListener("input", onCityInput);

document.getElementById("search-btn")
  .addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) loadWeatherForCity(city);
  });

document.getElementById("city-input")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const city = e.target.value.trim();
      if (city) loadWeatherForCity(city);
    }
  });

// --- Load a default city and start auto-refresh ---
loadWeatherForCity("London");
startAutoRefresh();
```

---

### Stage 5 — Advanced Challenge: Multi-City Comparison

Add a `compareWeather(cityNames)` function that:
1. Loads weather for all cities **in parallel** using `Promise.allSettled`
2. Shows results for cities that loaded successfully
3. Shows error messages for cities that failed — without blocking the successful ones
4. Sorts cities by temperature (highest first)

```js
async function compareWeather(cityNames) {
  UIState.setLoading(`Comparing weather for ${cityNames.length} cities...`);

  const results = await Promise.allSettled(
    cityNames.map(async name => {
      const location = await geocodeCity(name);
      const { current } = await fetchWeatherData(location.latitude, location.longitude);
      return {
        name:        location.name,
        country:     location.country,
        temperature: current.current_weather.temperature,
        condition:   describeWeatherCode(current.current_weather.weathercode)
      };
    })
  );

  const successes = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value)
    .sort((a, b) => b.temperature - a.temperature);

  const failures = results
    .filter(r => r.status === "rejected")
    .map((r, i) => ({ city: cityNames[i], error: r.reason.message }));

  console.log("\n=== City Comparison (by temperature) ===");
  successes.forEach(city => {
    console.log(`${city.name}, ${city.country}: ${city.temperature}°C — ${city.condition}`);
  });

  if (failures.length > 0) {
    console.log("\n=== Failed Cities ===");
    failures.forEach(f => console.log(`${f.city}: ${f.error}`));
  }

  UIState.setReady();
  return { successes, failures };
}

// Test:
compareWeather(["London", "Lagos", "NotARealCity", "Tokyo", "Sydney"]);
```

---

**Reflection Questions:**

1. In `fetchWeatherData`, the two fetches run in parallel with `Promise.all`. What would happen to total load time if they ran sequentially? What's the trade-off of running in parallel?
2. The `onCityInput` debounce clears a timeout and the abort controller on every keystroke. Why are both of these cancellation mechanisms needed?
3. `Promise.allSettled` is used in `compareWeather` instead of `Promise.all`. What would happen if `Promise.all` were used and one city failed to geocode?
4. The auto-refresh uses `setInterval` but stores the ID in `refreshIntervalId`. Why is clearing the old interval before starting a new one (in `startAutoRefresh`) important?
5. The `geocodeCity` and `fetchWeatherData` functions accept a `signal` parameter for cancellation. What would happen in the UI if cancellation were not implemented and the user typed quickly through 10 city names?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What is the JavaScript event loop, and why does it exist?

**Q2:** In what order do these log?

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

**Q3:** What is the difference between `setTimeout` and `setInterval`? How do you stop each?

**Q4:** What is callback hell, and what are two ways to avoid it?

**Q5:** What are the three states of a Promise, and can a Promise go back to pending once fulfilled?

**Q6:** Write a Promise that resolves with "done" after 2 seconds.

**Q7:** What is wrong with this code?

```js
async function getUser() {
  const user = fetchUser(1);
  console.log(user.name);
}
```

**Q8:** What does `fetch()` throw on a 404 response? What should you check instead?

**Q9:** What is the difference between `Promise.all` and `Promise.allSettled`?

**Q10:** What is `AbortController` and when would you use it with `fetch`?

---

## Answer Key

**A1:** The event loop is the mechanism that coordinates the call stack, Web APIs, and callback queues. It exists because JavaScript is single-threaded but needs to handle async operations (network, timers, I/O) without blocking the UI. It checks when the call stack is empty and moves waiting callbacks onto the stack to run.

**A2:** A → D → C → B. Synchronous code runs first (A, D). Microtasks (Promises) drain before macrotasks. setTimeout is a macrotask — runs last even with 0ms delay.

**A3:** `setTimeout` runs a callback once after a delay. `setInterval` runs it repeatedly. Stop with `clearTimeout(id)` and `clearInterval(id)` respectively — always store the returned ID.

**A4:** Callback hell is deeply nested callbacks caused by dependent async operations. Fix with: (1) named functions to flatten the nesting; (2) Promises for linear chaining; (3) async/await for synchronous-looking code.

**A5:** Pending (in progress), Fulfilled (succeeded), Rejected (failed). No — once fulfilled or rejected, a Promise is permanently settled.

**A6:**
```js
const p = new Promise(resolve => setTimeout(() => resolve("done"), 2000));
```

**A7:** Missing `await` before `fetchUser(1)`. `user` is a Promise, not the user object. `user.name` is `undefined`. Fix: `const user = await fetchUser(1);`

**A8:** `fetch()` does NOT throw on a 404. The Promise resolves with a Response object. You must check `response.ok` (true for 200–299) and throw manually if it's false.

**A9:** `Promise.all` rejects immediately if ANY promise rejects, discarding all others. `Promise.allSettled` waits for every promise to settle and returns an array of `{ status, value/reason }` objects — never rejects itself.

**A10:** `AbortController` creates a `signal` you can pass to `fetch({ signal })`. Calling `controller.abort()` cancels the in-flight request, causing it to reject with an `AbortError`. Used for: cancelling searches when user types again, implementing request timeouts, component unmounting (React).

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can explain the event loop, call stack, and callback/microtask queues | ✓ |
| 2 | Can predict execution order of sync code, Promise callbacks, and setTimeout | ✓ |
| 3 | Can use `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` correctly | ✓ |
| 4 | Understand the error-first callback convention and can write/consume callbacks | ✓ |
| 5 | Can identify and flatten callback hell using named functions or Promises | ✓ |
| 6 | Can create Promises with `new Promise()`, resolve, and reject | ✓ |
| 7 | Can chain `.then()`, `.catch()`, `.finally()` and explain what each returns | ✓ |
| 8 | Can use `Promise.all`, `allSettled`, `race`, and `any` for the right scenario | ✓ |
| 9 | Can write `async` functions and use `await` correctly | ✓ |
| 10 | Can use `try/catch` for async error handling | ✓ |
| 11 | Can perform GET, POST, PUT, DELETE with the Fetch API | ✓ |
| 12 | Always check `response.ok` and never assume fetch rejects on HTTP errors | ✓ |
| 13 | Can implement request cancellation with `AbortController` | ✓ |
| 14 | Can identify and fix the five most common async bugs | ✓ |
| 15 | Built the full Weather Dashboard project combining all chapters | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Forgetting `await` | Looks like regular function call | `const x = await fn()` — check if fn returns a Promise |
| `fetch()` not rejecting on 404 | `fetch` only rejects on network failure | Always check `response.ok` |
| `forEach` + `await` not waiting | `forEach` ignores returned Promises | Use `for...of` or `Promise.all(arr.map(...))` |
| Missing `return` in `.then()` | Chain doesn't wait for next Promise | Always `return` the next Promise in a `.then()` |
| Infinite loop with `setInterval` | Forgot to call `clearInterval` | Store the ID; clear it when done |
| Reading body twice | Body is a readable stream — consumed once | Read once; use `text()` then `JSON.parse` if needed |
| Unhandled Promise rejection | No `.catch()` or try/catch | Add a catch handler to every async chain |
| `this._prop = value` inside setter for `prop` | Calls setter again → stack overflow | Use a different internal name: `this._prop` |
| Race condition from parallel state updates | Two async ops write the same variable | Use `AbortController` to cancel older requests |
| `setTimeout` delay is not exact | If stack is busy, callback waits | Don't rely on precise timing; use it for "at least N ms" |

---

## One-Sentence Summary

> Asynchronous JavaScript — from raw callbacks through Promises to async/await and the Fetch API — is the mechanism that keeps applications responsive while waiting for the real world: timers, network requests, user input, and file operations all rely on the event loop to deliver results back to your code without freezing the page.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Async (9 pages)*
