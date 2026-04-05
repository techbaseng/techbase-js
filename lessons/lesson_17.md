---
render_with_liquid: false
title: "JavaScript Looping, Iterables, Iterators & Generators: Every Loop · The Iterable Protocol · Custom Iterators · Generator Functions"
nav_order: 17
---

## 📑 Table of Contents
1. [Background: What Is Looping and Why Does It Matter?](#1-background-what-is-looping-and-why-does-it-matter)
2. [Topic 1 — JavaScript Looping (All Loop Types)](#2-topic-1--javascript-looping-all-loop-types)
3. [Topic 2 — Iterables](#3-topic-2--iterables)
4. [Topic 3 — Iterators](#4-topic-3--iterators)
5. [Topic 4 — Generator Functions](#5-topic-4--generator-functions)
6. [Applied Exercises](#6-applied-exercises)
7. [Mini Project — Lazy Data Pipeline](#7-mini-project--lazy-data-pipeline)
8. [Completion Checklist](#8-completion-checklist)

---

## 1. Background: What Is Looping and Why Does It Matter?

Imagine you are a teacher who needs to print a report card for every student in a class of 500. Without loops you would write the same print instruction 500 times. With a loop, you write it **once** and the computer repeats it automatically.

```javascript
// ❌ Without a loop — impossible to scale
console.log("Report: Alice  — Score: 88");
console.log("Report: Bob    — Score: 92");
// ... 498 more lines!

// ✅ With a loop — one instruction, any number of repetitions
const students = [{ name: "Alice", score: 88 }, { name: "Bob", score: 92 }];
for (const s of students) {
  console.log(`Report: ${s.name.padEnd(6)} — Score: ${s.score}`);
}
```

A **loop** is a block of code that repeats until a condition is met. JavaScript has many loop types — each designed for a specific situation.

Beyond simple loops, JavaScript has a deeper concept — the **iteration protocol**. This is a set of rules that defines what it means for anything (not just arrays) to be "loop-able". Understanding this protocol unlocks:
- **Iterables** — objects that can be looped with `for...of`
- **Iterators** — objects that control exactly how values are produced one at a time
- **Generators** — special functions that can pause and resume, producing values lazily on demand

> 🏢 **REAL WORLD:** Iteration is everywhere in professional JavaScript — reading lines from a file, paginating API results, streaming data, building custom data structures, and implementing pipelines that process millions of records without loading them all into memory at once.

---
---

## 2. Topic 1 — JavaScript Looping (All Loop Types)

> **Phase 1 — Conceptual Understanding**

JavaScript has **seven** loop constructs. Each has a specific job. Understanding when to use each is a core professional skill.

---

### 2A — `for` Loop — Classic Counter Loop

The `for` loop is the most fundamental loop. Use it when you know **exactly how many times** you want to loop, or when you need precise control over the counter.

**Structure:**
```javascript
for (initialise; condition; update) {
  // body runs while condition is true
}
```

- **Initialise** — runs once before the loop starts (set up counter)
- **Condition** — checked before each iteration; loop stops when `false`
- **Update** — runs after each iteration (advance counter)

```javascript
// Count from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

**▶ Expected Output:**
```
1
2
3
4
5
```

#### Step-by-step trace:
```
Start:   i = 1 → condition 1 <= 5 → true  → body runs → i becomes 2
         i = 2 → condition 2 <= 5 → true  → body runs → i becomes 3
         i = 3 → condition 3 <= 5 → true  → body runs → i becomes 4
         i = 4 → condition 4 <= 5 → true  → body runs → i becomes 5
         i = 5 → condition 5 <= 5 → true  → body runs → i becomes 6
         i = 6 → condition 6 <= 5 → false → STOP
```

#### Loop through an array by index:
```javascript
const fruits = ["Apple", "Banana", "Mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i + ": " + fruits[i]);
}
```

**▶ Expected Output:**
```
0: Apple
1: Banana
2: Mango
```

#### Count backwards:
```javascript
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// 5, 4, 3, 2, 1
```

#### Count in steps:
```javascript
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}
```

> 💡 **TIP:** Use `let` for the loop variable — never `var`. With `var`, the variable "leaks" out of the loop block. With `let`, it is properly block-scoped.

> 🐛 **COMMON MISTAKE — Off-by-one error:**
> ```javascript
> // ❌ Wrong — misses last element (< vs <=)
> for (let i = 0; i < 5; i++) { ... }  // runs 5 times: 0,1,2,3,4
>
> // To loop array by index, always use i < arr.length (not <=)
> for (let i = 0; i < arr.length; i++) { ... }  // correct!
> // arr.length - 1 is the last valid index
> ```

---

### 2B — `while` Loop — Condition-First Loop

The `while` loop repeats as long as a condition is `true`. Use it when you do **not know in advance** how many iterations you need.

```javascript
while (condition) {
  // body
}
```

```javascript
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}
```

**▶ Expected Output:**
```
1
2
3
4
5
```

#### Real example — keep asking for input until valid:
```javascript
// Simulated user input
const inputs = ["", "abc", "", "42"]; // first valid input is "42"
let idx = 0;

let input = "";
while (input.trim() === "" || isNaN(Number(input))) {
  input = inputs[idx++]; // simulate reading next input
}
console.log("Valid input received:", input); // "42"
```

**▶ Expected Output:** `Valid input received: 42`

> ⚠️ **WATCH OUT — Infinite Loop!**
> If the condition never becomes `false`, the loop runs forever and crashes the program.
> ```javascript
> // ❌ DANGER — infinite loop!
> let i = 1;
> while (i > 0) {   // i always > 0 since we never change it
>   console.log(i);
>   // forgot to add: i++
> }
> // Always make sure the loop variable changes toward the exit condition!
> ```

---

### 2C — `do...while` Loop — Body-First Loop

Like `while`, but the body runs **at least once** before the condition is checked.

```javascript
do {
  // body runs first, THEN condition is checked
} while (condition);
```

```javascript
let count = 1;

do {
  console.log(count);
  count++;
} while (count <= 5);
```

**▶ Expected Output:**
```
1
2
3
4
5
```

#### The key difference — runs at least once even if condition starts false:
```javascript
let i = 10; // condition (i <= 5) is already false

// while — body NEVER runs
while (i <= 5) {
  console.log("while:", i); // skipped entirely
}

// do...while — body runs ONCE before condition is checked
do {
  console.log("do...while:", i); // prints "do...while: 10"
} while (i <= 5);
```

**▶ Expected Output:** `do...while: 10`

> 🏢 **REAL WORLD:** `do...while` is perfect for menu systems and prompts — show the menu at least once, then keep showing it until the user picks "Exit".

---

### 2D — `for...in` Loop — Iterate Object Properties

`for...in` loops over the **enumerable property keys** of an object (including inherited ones from the prototype chain). It is designed for plain objects.

```javascript
for (const key in object) {
  // key is each property name (string)
}
```

```javascript
const student = {
  name:  "Amara",
  score: 85,
  grade: "A",
  city:  "Lagos"
};

for (const key in student) {
  console.log(key + ": " + student[key]);
}
```

**▶ Expected Output:**
```
name: Amara
score: 85
grade: A
city: Lagos
```

#### `hasOwnProperty` — Skip Inherited Keys:
```javascript
for (const key in student) {
  if (student.hasOwnProperty(key)) {
    // Only own properties, not inherited prototype properties
    console.log(key + ":", student[key]);
  }
}
```

> ⚠️ **WATCH OUT — Do NOT use `for...in` on arrays!**
> ```javascript
> const arr = ["Apple", "Banana", "Mango"];
>
> // ❌ for...in on arrays — gives STRING indices, may include extra properties
> for (const i in arr) {
>   console.log(i, typeof i); // "0" string, "1" string, "2" string ← strings not numbers!
> }
>
> // ✅ Use for...of or a regular for loop for arrays instead
> ```
>
> `for...in` is for **objects**. `for...of` is for **iterables** (arrays, strings, Sets, Maps).

---

### 2E — `for...of` Loop — Iterate Iterable Values (Modern, Preferred)

`for...of` loops over the **values** of any iterable — arrays, strings, Sets, Maps, generators, and any object implementing the iterable protocol.

```javascript
for (const value of iterable) {
  // value is each element
}
```

#### Arrays:
```javascript
const fruits = ["Apple", "Banana", "Mango"];

for (const fruit of fruits) {
  console.log(fruit);
}
// Apple
// Banana
// Mango
```

#### Strings — character by character:
```javascript
for (const char of "Hello") {
  console.log(char);
}
// H
// e
// l
// l
// o
```

#### Sets:
```javascript
const tags = new Set(["js", "web", "css"]);

for (const tag of tags) {
  console.log(tag);
}
// js
// web
// css
```

#### Maps — destructuring key and value:
```javascript
const scores = new Map([["Alice", 88], ["Bob", 92]]);

for (const [name, score] of scores) {
  console.log(name + ": " + score);
}
// Alice: 88
// Bob: 92
```

> 💡 **TIP:** When you need the index while using `for...of`, use `entries()`:
> ```javascript
> const fruits = ["Apple", "Banana", "Mango"];
>
> for (const [index, fruit] of fruits.entries()) {
>   console.log(index + ": " + fruit);
> }
> // 0: Apple
> // 1: Banana
> // 2: Mango
> ```

---

### 2F — `break` and `continue` — Loop Control

#### `break` — Exit the loop immediately:

```javascript
const nums = [3, 7, 2, 9, 1, 5];

// Find first number greater than 6
for (const n of nums) {
  if (n > 6) {
    console.log("Found:", n);
    break; // stop immediately
  }
}
// Found: 7
```

#### `continue` — Skip to next iteration:

```javascript
const nums = [1, 2, 3, 4, 5, 6];

// Print only odd numbers
for (const n of nums) {
  if (n % 2 === 0) continue; // skip even numbers
  console.log(n);
}
// 1
// 3
// 5
```

#### Labelled `break` — Break out of nested loops:

```javascript
// Without label — only breaks the inner loop
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outer; // exits BOTH loops immediately
    }
    console.log(i, j);
  }
}
// 0 0
// 0 1
// 0 2
// 1 0
// (stops here — break outer exits both loops)
```

**▶ Expected Output:**
```
0 0
0 1
0 2
1 0
```

---

### 2G — Loop Comparison Table

| Loop | Use When | Needs index? | Works on objects? | Works on iterables? |
|------|----------|-------------|------------------|---------------------|
| `for` | Known count / index control | ✅ Yes | ❌ (manually) | ✅ (manually) |
| `while` | Unknown count, condition-driven | ⚙️ Manual | ⚙️ Manual | ⚙️ Manual |
| `do...while` | Run at least once | ⚙️ Manual | ⚙️ Manual | ⚙️ Manual |
| `for...in` | Object property keys | ❌ No (gives key) | ✅ Yes | ⚠️ Not recommended |
| `for...of` | Any iterable values | ✅ via `.entries()` | ❌ (plain objects) | ✅ Yes |

---
---

## 3. Topic 2 — Iterables

> **Phase 1 — Conceptual Understanding**

You have used `for...of` to loop over arrays, strings, Sets, and Maps. But how does `for...of` *know* how to loop over them? They are all different types of objects! The answer is the **iterable protocol**.

### What Is an Iterable?

An **iterable** is any object that has a special method named `[Symbol.iterator]`. This method, when called, returns an **iterator** — an object that produces values one at a time.

Think of it like a vending machine:
- The **vending machine** is the iterable (has a mechanism to deliver items)
- The **dispenser button** is `[Symbol.iterator]()` — calling it starts the dispensing process
- Each **press of the button** is like calling `.next()` — one item comes out
- When the machine is **empty**, it signals done

```
Iterable                →   has [Symbol.iterator]() method
[Symbol.iterator]()     →   returns an Iterator
Iterator                →   has .next() method
.next()                 →   returns { value: ..., done: false/true }
```

### Built-in Iterables in JavaScript

These types are all iterable out of the box:

| Type | Example |
|------|---------|
| `Array` | `[1, 2, 3]` |
| `String` | `"hello"` |
| `Set` | `new Set([1, 2, 3])` |
| `Map` | `new Map([["a", 1]])` |
| `arguments` object | Inside functions |
| `NodeList` | `document.querySelectorAll("p")` |
| Generator objects | Result of calling a generator function |
| `TypedArray` | `Int8Array`, `Float64Array`, etc. |

**Plain objects `{}` are NOT iterable by default.**

---

### How `for...of` Uses the Iterable Protocol Internally

When JavaScript sees `for (const x of something)`, it does this behind the scenes:

```javascript
const arr = [10, 20, 30];

// What for...of does internally:
const iterator = arr[Symbol.iterator](); // Step 1: get the iterator

let result = iterator.next();            // Step 2: ask for first value
while (!result.done) {                   // Step 3: loop while not done
  const x = result.value;
  console.log(x);                        // Step 4: use the value
  result = iterator.next();             // Step 5: ask for next value
}
```

**▶ Expected Output:**
```
10
20
30
```

This is exactly what `for...of` does automatically:
```javascript
for (const x of [10, 20, 30]) {
  console.log(x); // 10, 20, 30
}
```

---

### Verifying That Something Is Iterable

```javascript
function isIterable(obj) {
  return obj != null && typeof obj[Symbol.iterator] === "function";
}

console.log(isIterable([1, 2, 3]));          // true
console.log(isIterable("hello"));            // true
console.log(isIterable(new Set([1, 2])));    // true
console.log(isIterable(new Map()));          // true
console.log(isIterable({ a: 1 }));          // false ← plain object!
console.log(isIterable(42));                // false
console.log(isIterable(null));              // false
```

**▶ Expected Output:**
```
true
true
true
true
false
false
false
```

---

### Using Spread `...` and Destructuring — They Use the Iterable Protocol Too!

Any iterable works with spread and destructuring — not just arrays:

```javascript
// Spread Set into array
const set = new Set([1, 2, 3]);
const arr = [...set];
console.log(arr); // [1, 2, 3]

// Spread Map
const map = new Map([["a", 1], ["b", 2]]);
console.log([...map]); // [["a",1],["b",2]]

// Spread String
console.log([..."hello"]); // ["h","e","l","l","o"]

// Destructure a Set
const [first, second] = new Set([10, 20, 30]);
console.log(first, second); // 10 20

// Spread into function arguments
function sum(a, b, c) { return a + b + c; }
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6
```

**▶ Expected Output:**
```
[1, 2, 3]
[["a",1],["b",2]]
["h","e","l","l","o"]
10 20
6
```

> 🏢 **REAL WORLD:** The iterable protocol is the foundation of modern JavaScript patterns like `Array.from()`, `Promise.all([...])`, `for...of` in React's render loops, and REST/spread patterns throughout every modern codebase.

---

### Making a Plain Object Iterable

A plain object `{}` is not iterable — `for...of` will throw a TypeError. To make it iterable, you add a `[Symbol.iterator]` method.

```javascript
const range = {
  from: 1,
  to:   5,

  [Symbol.iterator]() {
    let current = this.from;
    const last  = this.to;

    // Return an iterator object
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// Now range is iterable!
for (const n of range) {
  console.log(n);
}
// 1, 2, 3, 4, 5

// Spread also works!
console.log([...range]); // [1, 2, 3, 4, 5]
```

**▶ Expected Output:**
```
1
2
3
4
5
[1, 2, 3, 4, 5]
```

> 🤔 **THINK ABOUT IT:** What would happen if `current` never reached `last`? The `done: true` would never be returned, and `for...of` would loop forever. Always make sure your iterator eventually returns `{ done: true }`!

---
---

## 4. Topic 3 — Iterators

> **Phase 1 — Conceptual Understanding**

An **iterator** is an object that implements the **iterator protocol**:
- It must have a `.next()` method
- `.next()` must return an object with exactly two properties:
  - `value` — the current value (any type)
  - `done` — a boolean: `false` if more values remain, `true` when finished

When `done` is `true`, any `value` provided is ignored by `for...of`.

---

### Creating an Iterator from Scratch

Let's build a counter iterator step by step:

```javascript
function makeCounter(start, end) {
  let current = start;

  return {
    next() {
      if (current <= end) {
        return { value: current++, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

const counter = makeCounter(1, 4);

console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 3, done: false }
console.log(counter.next()); // { value: 4, done: false }
console.log(counter.next()); // { value: undefined, done: true }
console.log(counter.next()); // { value: undefined, done: true } ← stays done
```

**▶ Expected Output:**
```
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: undefined, done: true }
{ value: undefined, done: true }
```

> 💡 **TIP:** Notice that once an iterator returns `{ done: true }`, it should continue to return `{ done: true }` for any further `.next()` calls. This is the convention.

---

### Iterator vs Iterable — What Is the Difference?

This is a very common point of confusion:

| Term | Definition | Has |
|------|-----------|-----|
| **Iterable** | An object that CAN be iterated | `[Symbol.iterator]()` method → returns an iterator |
| **Iterator** | An object that DOES the iterating | `.next()` method → returns `{value, done}` |

An iterable **produces** iterators. An iterator **produces** values.

Arrays are **iterable** — calling `arr[Symbol.iterator]()` gives you an **iterator**:

```javascript
const arr      = [10, 20, 30];       // Array is ITERABLE
const iterator = arr[Symbol.iterator](); // iterator is the ITERATOR

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

---

### Self-Iterating Objects — Combining Both Protocols

The cleanest design makes an object both iterable **and** its own iterator by returning `this` from `[Symbol.iterator]()`:

```javascript
function makeRange(from, to) {
  return {
    current: from,
    last:    to,

    // Makes it ITERABLE
    [Symbol.iterator]() {
      return this; // ← returns itself as the iterator
    },

    // Makes it an ITERATOR
    next() {
      if (this.current <= this.last) {
        return { value: this.current++, done: false };
      }
      return { value: undefined, done: true };
    }
  };
}

const range = makeRange(1, 5);

// Works with for...of (uses [Symbol.iterator])
for (const n of range) {
  console.log(n);
}
// 1 2 3 4 5

// Also works with spread (uses [Symbol.iterator])
// Note: range is now exhausted — a new range is needed to spread
const range2 = makeRange(1, 3);
console.log([...range2]); // [1, 2, 3]
```

**▶ Expected Output:**
```
1
2
3
4
5
[1, 2, 3]
```

> ⚠️ **WATCH OUT:** When an object is its own iterator (returns `this`), it is **consumed** — once iterated, it cannot be iterated again. A fresh iterable (like an array) returns a new iterator each time `[Symbol.iterator]()` is called, so you can loop it many times.

---

### Practical Example — A Fibonacci Iterator

```javascript
function fibIterator(limit) {
  let prev = 0, curr = 1;

  return {
    [Symbol.iterator]() { return this; },

    next() {
      if (prev > limit) return { value: undefined, done: true };
      const value = prev;
      [prev, curr] = [curr, prev + curr]; // advance sequence
      return { value, done: false };
    }
  };
}

// Print Fibonacci numbers up to 100
for (const n of fibIterator(100)) {
  process.stdout.write(n + " ");
}
console.log();
// 0 1 1 2 3 5 8 13 21 34 55 89

// Collect into array
console.log([...fibIterator(50)]); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

**▶ Expected Output:**
```
0 1 1 2 3 5 8 13 21 34 55 89
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

> 🏢 **REAL WORLD:** Iterators are used to represent sequences that are computed on demand — paginated API results, rows from a database cursor, tokens from a parser, or any data where you want the next item only when you need it (lazy evaluation).

---

### Iterator Return Method (Optional Cleanup)

Iterators can optionally implement a `return(value)` method, which is called when a loop exits early (via `break` or `return` inside `for...of`). Use it to release resources.

```javascript
function makeCleanupIterator(items) {
  let index = 0;
  return {
    [Symbol.iterator]() { return this; },

    next() {
      if (index < items.length) {
        return { value: items[index++], done: false };
      }
      return { value: undefined, done: true };
    },

    return(value) {
      console.log("Iterator closed early — releasing resources");
      return { value, done: true };
    }
  };
}

for (const item of makeCleanupIterator([1, 2, 3, 4, 5])) {
  console.log(item);
  if (item === 3) break; // triggers return()
}
```

**▶ Expected Output:**
```
1
2
3
Iterator closed early — releasing resources
```

---
---

## 5. Topic 4 — Generator Functions

> **Phase 1 — Conceptual Understanding**

Writing iterators manually (as shown above) works — but it is verbose and requires careful state management. **Generator functions** are a much easier way to create iterators. They let you write iterating logic in a natural, top-to-bottom style using the special `yield` keyword.

### The Magic of `yield` — Pause and Resume

A generator function can **pause** its execution in the middle and **resume** later from exactly where it left off. Normal functions cannot do this — they run start to finish without stopping.

Think of it like a book with bookmarks:
- **Normal function** — reads the whole chapter at once, then closes the book
- **Generator function** — reads one page, puts a bookmark in, hands you the page, waits. When you ask for the next page, it opens the book at the bookmark and continues.

---

### Declaring a Generator Function

The `function*` syntax (note the asterisk `*`) marks a function as a generator:

```javascript
function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}
```

Calling a generator function does **not run the body**. It returns a **generator object** — which is both an iterator AND an iterable.

```javascript
function* myGenerator() {
  console.log("Start");
  yield 1;
  console.log("After first yield");
  yield 2;
  console.log("After second yield");
  yield 3;
  console.log("Done");
}

const gen = myGenerator(); // ← body does NOT run yet!

console.log(gen.next()); // "Start" then { value: 1, done: false }
console.log(gen.next()); // "After first yield" then { value: 2, done: false }
console.log(gen.next()); // "After second yield" then { value: 3, done: false }
console.log(gen.next()); // "Done" then { value: undefined, done: true }
```

**▶ Expected Output:**
```
Start
{ value: 1, done: false }
After first yield
{ value: 2, done: false }
After second yield
{ value: 3, done: false }
Done
{ value: undefined, done: true }
```

> 🤔 **THINK ABOUT IT:** The `console.log("Start")` only runs when we call `.next()` the first time — not when we call `myGenerator()`. This is the pausing behaviour. The function runs until it hits a `yield`, pauses there, and waits for the next `.next()` call.

---

### Generators Are Both Iterators and Iterables

Generator objects implement both protocols automatically. This means you can use them directly in `for...of`, spread, and destructuring:

```javascript
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

// for...of (uses iterable protocol)
for (const n of count()) {
  console.log(n);
}
// 1, 2, 3

// Spread (uses iterable protocol)
console.log([...count()]); // [1, 2, 3]

// Destructuring
const [a, b, c] = count();
console.log(a, b, c); // 1 2 3
```

**▶ Expected Output:**
```
1
2
3
[1, 2, 3]
1 2 3
```

---

### Generators with Loops — Infinite Sequences

Generators are perfect for producing sequences — especially **infinite** ones. Because values are produced lazily (one at a time on demand), you can define an endless sequence without running out of memory.

```javascript
// An INFINITE counter — never runs out!
function* counter(start = 0) {
  let n = start;
  while (true) {   // ← infinite loop is OK in a generator!
    yield n++;
  }
}

const gen = counter(1);

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
// ... you can call .next() as many times as you want

// Take first 5 values using a helper
function take(gen, n) {
  const result = [];
  for (const val of gen) {
    result.push(val);
    if (result.length === n) break;
  }
  return result;
}

console.log(take(counter(10), 5)); // [10, 11, 12, 13, 14]
```

**▶ Expected Output:**
```
1
2
3
[10, 11, 12, 13, 14]
```

> ⚠️ **WATCH OUT:** Never do `[...counter()]` — spreading an infinite generator will try to collect all values until memory is exhausted. Always use `break`, `.next()`, or `take()` to limit how many values you consume from an infinite generator.

---

### `return` in a Generator

If a generator hits a `return` statement (or the function body ends), it signals `done: true`:

```javascript
function* gen() {
  yield 1;
  yield 2;
  return "finished"; // ← done: true, value: "finished"
  yield 3;           // ← NEVER reached
}

const g = gen();
console.log(g.next()); // { value: 1,          done: false }
console.log(g.next()); // { value: 2,          done: false }
console.log(g.next()); // { value: "finished", done: true  }
console.log(g.next()); // { value: undefined,  done: true  }
```

> 💡 **TIP:** The `return` value in a generator IS available in `.next()` but is **skipped by `for...of`**. `for...of` stops as soon as it sees `done: true` without using the value.

---

### Passing Values INTO a Generator with `.next(value)`

You can pass a value into a generator through `.next(value)`. This value becomes the **result of the `yield` expression** inside the generator.

```javascript
function* dialogue() {
  const name    = yield "What is your name?";
  const age     = yield `Hello ${name}! How old are you?`;
  yield `So ${name} is ${age} years old. Got it!`;
}

const chat = dialogue();

console.log(chat.next().value);          // "What is your name?"
console.log(chat.next("Alice").value);   // "Hello Alice! How old are you?"
console.log(chat.next(30).value);        // "So Alice is 30 years old. Got it!"
```

**▶ Expected Output:**
```
What is your name?
Hello Alice! How old are you?
So Alice is 30 years old. Got it!
```

> 💡 **TIP:** The first `.next()` call cannot pass a value in (there is no `yield` to receive it yet). Values passed in through `.next(val)` only apply from the second call onward.

---

### `yield*` — Delegate to Another Generator or Iterable

`yield*` inside a generator delegates iteration to another iterable or generator, yielding all of its values in sequence.

```javascript
function* inner() {
  yield "B";
  yield "C";
}

function* outer() {
  yield "A";
  yield* inner();  // ← delegates to inner generator
  yield "D";
}

console.log([...outer()]); // ["A", "B", "C", "D"]
```

**▶ Expected Output:** `["A", "B", "C", "D"]`

`yield*` works with any iterable — arrays, strings, Sets, other generators:

```javascript
function* combined() {
  yield* [1, 2, 3];         // yields from array
  yield* "AB";              // yields characters of string
  yield* new Set([4, 5]);   // yields from Set
}

console.log([...combined()]); // [1, 2, 3, "A", "B", 4, 5]
```

**▶ Expected Output:** `[1, 2, 3, "A", "B", 4, 5]`

> 🏢 **REAL WORLD:** `yield*` is used to build tree-traversal generators — e.g., yielding all nodes in a nested file system or DOM tree structure depth-first without recursion complexity.

---

### Generator as an Iterable Object Method

You can use generator functions as methods inside objects or classes, making them directly iterable:

```javascript
class NumberRange {
  constructor(from, to, step = 1) {
    this.from = from;
    this.to   = to;
    this.step = step;
  }

  // Generator method — makes instances of NumberRange iterable
  *[Symbol.iterator]() {
    for (let n = this.from; n <= this.to; n += this.step) {
      yield n;
    }
  }
}

const evens = new NumberRange(2, 10, 2);

for (const n of evens) {
  process.stdout.write(n + " ");
}
console.log();
// 2 4 6 8 10

console.log([...new NumberRange(1, 5)]); // [1, 2, 3, 4, 5]
```

**▶ Expected Output:**
```
2 4 6 8 10
[1, 2, 3, 4, 5]
```

---

### Generator vs Manual Iterator — Side by Side

Here is the same Fibonacci iterator from Topic 3, now written as a generator:

```javascript
// Manual iterator (Topic 3 version) — verbose!
function fibIterator(limit) {
  let prev = 0, curr = 1;
  return {
    [Symbol.iterator]() { return this; },
    next() {
      if (prev > limit) return { value: undefined, done: true };
      const value = prev;
      [prev, curr] = [curr, prev + curr];
      return { value, done: false };
    }
  };
}

// Generator version — clean and simple!
function* fibGenerator(limit) {
  let prev = 0, curr = 1;
  while (prev <= limit) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}

// Both produce the same output:
console.log([...fibGenerator(100)]); // [0,1,1,2,3,5,8,13,21,34,55,89]
```

**▶ Expected Output:** `[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]`

> 🏢 **REAL WORLD:** Generators are used in: Redux Saga (managing async side effects in React apps), data streaming (process file lines one at a time), custom pagination (fetch next page only when needed), and any "lazy" sequence where values should be produced on demand.

---

### Summary: Iterator vs Generator vs Iterable

| Concept | Definition | Key Syntax |
|---------|-----------|------------|
| **Iterable** | Object that CAN produce an iterator | Has `[Symbol.iterator]()` method |
| **Iterator** | Object that produces values one at a time | Has `.next()` → `{value, done}` |
| **Generator function** | Function that produces a generator object | `function*` with `yield` |
| **Generator object** | Both an iterator AND an iterable | Returned by calling `function*` |

---
---

## 6. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Loop Master 🔁

**Objective:** Practice choosing the right loop for each situation.

**Scenario:** You are building a **student results portal**. Each task below requires a different loop type.

#### Warm-up Micro-Demo:

```javascript
const scores = [72, 45, 88, 56, 93];
let total = 0;

for (const score of scores) {
  total += score;
}
console.log("Average:", (total / scores.length).toFixed(1)); // 70.8
```

#### Task A — Use the Right Loop

```javascript
const students = [
  { name: "Amara",  score: 85, grade: "B" },
  { name: "Kwame",  score: 92, grade: "A" },
  { name: "Fatima", score: 58, grade: "F" },
  { name: "Emeka",  score: 74, grade: "C" },
  { name: "Priya",  score: 95, grade: "A" },
];

// 1. FOR loop — print each student with rank
console.log("--- Rankings (for loop) ---");
for (let i = 0; i < students.length; i++) {
  console.log(`${i + 1}. ${students[i].name} — ${students[i].score}`);
}

// 2. FOR...OF — sum all scores
let total = 0;
for (const s of students) { total += s.score; }
console.log("\nClass average:", (total / students.length).toFixed(1));

// 3. FOR...IN — list properties of first student object
console.log("\nStudent record fields (for...in):");
for (const key in students[0]) {
  console.log(`  ${key}: ${students[0][key]}`);
}

// 4. WHILE — find first student scoring above 90
let idx = 0;
while (idx < students.length && students[idx].score <= 90) idx++;
const topStudent = idx < students.length ? students[idx] : null;
console.log("\nFirst student above 90:", topStudent?.name ?? "none");

// 5. DO...WHILE — show menu until valid selection
const validChoices = ["A", "B", "C"];
const inputs = ["X", "Q", "B"]; // simulated; "B" is the first valid one
let choice, inputIdx = 0;
do {
  choice = inputs[inputIdx++];
  console.log("Input received:", choice);
} while (!validChoices.includes(choice));
console.log("Valid choice selected:", choice);
```

**Expected Output:**
```
--- Rankings (for loop) ---
1. Amara — 85
2. Kwame — 92
3. Fatima — 58
4. Emeka — 74
5. Priya — 95

Class average: 80.8

Student record fields (for...in):
  name: Amara
  score: 85
  grade: B

First student above 90: Kwame

Input received: X
Input received: Q
Input received: B
Valid choice selected: B
```

**Self-check questions:**
- Why should you NOT use `for...in` to loop over the `students` array?
- When would `do...while` be more appropriate than `while`?
- What is the difference between `break` and `continue`?

---

### Exercise 2 — Custom Iterable Builder 🔧

**Objective:** Practice creating a custom iterable object using `[Symbol.iterator]`.

**Scenario:** Build a **paginated data reader** that iterates records in pages of a given size.

#### Warm-up Micro-Demo:

```javascript
const simpleRange = {
  [Symbol.iterator]() {
    let n = 1;
    return { next() { return n <= 3 ? { value: n++, done: false } : { value: undefined, done: true }; } };
  }
};

for (const n of simpleRange) process.stdout.write(n + " ");
console.log(); // 1 2 3
```

#### Task A — Paginator Object

```javascript
function createPaginator(records, pageSize) {
  return {
    records,
    pageSize,

    [Symbol.iterator]() {
      let pageNum = 0;
      const { records, pageSize } = this;

      return {
        next() {
          const start = pageNum * pageSize;
          if (start >= records.length) return { value: undefined, done: true };

          const page = {
            pageNumber: pageNum + 1,
            items: records.slice(start, start + pageSize),
            totalPages: Math.ceil(records.length / pageSize)
          };
          pageNum++;
          return { value: page, done: false };
        }
      };
    }
  };
}

const allRecords = [
  "Record A", "Record B", "Record C", "Record D",
  "Record E", "Record F", "Record G"
];

const paginator = createPaginator(allRecords, 3);

for (const page of paginator) {
  console.log(`\n── Page ${page.pageNumber}/${page.totalPages} ──`);
  page.items.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
}

// Can be spread into an array of page objects
const pages = [...createPaginator(allRecords, 3)];
console.log("\nTotal pages:", pages.length);
```

**Expected Output:**
```
── Page 1/3 ──
  1. Record A
  2. Record B
  3. Record C

── Page 2/3 ──
  1. Record D
  2. Record E
  3. Record F

── Page 3/3 ──
  1. Record G

Total pages: 3
```

**Self-check questions:**
- Why is `[Symbol.iterator]` the key that makes an object iterable?
- What is the difference between the iterable (paginator) and the iterator (object returned from `[Symbol.iterator]()`)?
- How would you rewrite this using a generator function?

---

### Exercise 3 — Generator Workshop ⚡

**Objective:** Practice writing generator functions for real data tasks.

**Scenario:** Build generators for a **data processing pipeline** at an analytics company.

#### Warm-up Micro-Demo:

```javascript
function* squares(n) {
  for (let i = 1; i <= n; i++) yield i * i;
}
console.log([...squares(5)]); // [1, 4, 9, 16, 25]
```

#### Task A — Utility Generators

```javascript
// 1. Unique ID generator
function* idGenerator(prefix = "ID") {
  let n = 1;
  while (true) {
    yield `${prefix}-${String(n++).padStart(4, "0")}`;
  }
}

const userId = idGenerator("USR");
console.log(userId.next().value); // USR-0001
console.log(userId.next().value); // USR-0002
console.log(userId.next().value); // USR-0003

// 2. Chunker — split array into fixed-size chunks lazily
function* chunk(array, size) {
  for (let i = 0; i < array.length; i += size) {
    yield array.slice(i, i + size);
  }
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (const batch of chunk(data, 3)) {
  console.log("Batch:", batch);
}
// Batch: [1, 2, 3]
// Batch: [4, 5, 6]
// Batch: [7, 8, 9]
// Batch: [10]

// 3. Filter + map pipeline using generators
function* filterGen(iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
}

function* mapGen(iterable, transform) {
  for (const item of iterable) {
    yield transform(item);
  }
}

const scores  = [45, 72, 88, 56, 93, 61, 78, 34, 90];
const passing = filterGen(scores, s => s >= 60);
const graded  = mapGen(passing, s => ({
  score: s,
  grade: s >= 90 ? "A" : s >= 75 ? "B" : "C"
}));

console.log("\nPassing grades:");
for (const g of graded) {
  console.log(`  Score: ${g.score} → Grade: ${g.grade}`);
}
```

**Expected Output:**
```
USR-0001
USR-0002
USR-0003
Batch: [1, 2, 3]
Batch: [4, 5, 6]
Batch: [7, 8, 9]
Batch: [10]

Passing grades:
  Score: 72  → Grade: C
  Score: 88  → Grade: B
  Score: 93  → Grade: A
  Score: 61  → Grade: C
  Score: 78  → Grade: B
  Score: 90  → Grade: A
```

**Self-check questions:**
- Why is an infinite generator (`while (true) { yield ... }`) safe to use as long as you break or use `.next()` selectively?
- How does `yield*` differ from calling `yield` inside a loop?
- What is "lazy evaluation" and why do generators enable it?

---
---

## 7. Mini Project — Lazy Data Pipeline

> **Phase 3 — Project Simulation**

**Real-world scenario:** You work at a data analytics company. You receive large batches of raw transaction records. Build a **lazy data pipeline** using generators and iterators that:
- Reads records lazily (one at a time) without loading the entire dataset
- Filters, transforms, and enriches data through a composable pipeline
- Paginates output into batches for display or further processing
- Tracks pipeline statistics using a custom iterable

---

### 🔵 Stage 1 — Data Source Generator

**Goal:** Create a generator that simulates streaming raw records lazily, one at a time.

#### Simple stage preview:
```javascript
function* range(n) { for (let i = 1; i <= n; i++) yield i; }
console.log([...range(4)]); // [1, 2, 3, 4]
```

#### Stage 1 Full Code:

```javascript
"use strict";

// Simulate a large dataset of transactions (would normally stream from DB/file)
function* rawTransactions() {
  const data = [
    { id: "T001", user: "alice",  amount: 250.00, type: "purchase", category: "electronics", region: "north" },
    { id: "T002", user: "bob",    amount: 45.50,  type: "purchase", category: "food",        region: "south" },
    { id: "T003", user: "carol",  amount: -80.00, type: "refund",   category: "clothing",    region: "north" },
    { id: "T004", user: "alice",  amount: 1200.00,type: "purchase", category: "electronics", region: "north" },
    { id: "T005", user: "david",  amount: 15.99,  type: "purchase", category: "food",        region: "east"  },
    { id: "T006", user: "eve",    amount: -25.00, type: "refund",   category: "food",        region: "south" },
    { id: "T007", user: "bob",    amount: 890.00, type: "purchase", category: "clothing",    region: "south" },
    { id: "T008", user: "carol",  amount: 320.00, type: "purchase", category: "electronics", region: "east"  },
    { id: "T009", user: "frank",  amount: 55.75,  type: "purchase", category: "food",        region: "north" },
    { id: "T010", user: "alice",  amount: 670.00, type: "purchase", category: "clothing",    region: "north" },
    { id: "T011", user: "grace",  amount: -150.00,type: "refund",   category: "electronics", region: "east"  },
    { id: "T012", user: "henry",  amount: 99.99,  type: "purchase", category: "food",        region: "south" },
  ];

  console.log("[Source] Stream opened — yielding records lazily...");
  for (const record of data) {
    yield record; // ← yields ONE record at a time, on demand
  }
  console.log("[Source] Stream exhausted");
}

// Test Stage 1 — read first 3 records lazily
console.log("=".repeat(55));
console.log("     STAGE 1 — LAZY DATA SOURCE");
console.log("=".repeat(55));

const source = rawTransactions();
for (let i = 0; i < 3; i++) {
  const { value } = source.next();
  console.log(`Read: ${value.id} — ${value.user} — $${value.amount}`);
}
console.log("(Paused — 9 records still waiting in stream)");
```

**▶ Expected Output:**
```
=======================================================
     STAGE 1 — LAZY DATA SOURCE
=======================================================
[Source] Stream opened — yielding records lazily...
Read: T001 — alice — $250
Read: T002 — bob — $45.5
Read: T003 — carol — $-80
(Paused — 9 records still waiting in stream)
```

---

### 🟢 Stage 2 — Composable Generator Pipeline

**Goal:** Build `filter`, `map`, and `enrich` generators that compose into a pipeline, each receiving an iterable and yielding a transformed iterable.

#### Simple stage preview:
```javascript
function* double(iter) { for (const n of iter) yield n * 2; }
function* add10(iter)  { for (const n of iter) yield n + 10; }

const nums    = [1, 2, 3];
const pipeline = add10(double(nums)); // composable!
console.log([...pipeline]); // [12, 14, 16]
```

#### Stage 2 Full Code:

```javascript
// Pipeline stage 1: filter by type
function* filterType(source, type) {
  for (const tx of source) {
    if (tx.type === type) yield tx;
  }
}

// Pipeline stage 2: filter by minimum amount
function* filterMinAmount(source, min) {
  for (const tx of source) {
    if (tx.amount >= min) yield tx;
  }
}

// Pipeline stage 3: enrich record with tax and category label
function* enrichRecords(source) {
  const categoryLabels = {
    electronics: "🖥️  Electronics",
    food:        "🍎 Food",
    clothing:    "👕 Clothing"
  };

  for (const tx of source) {
    yield {
      ...tx,
      tax:           +(tx.amount * 0.075).toFixed(2),
      total:         +(tx.amount * 1.075).toFixed(2),
      categoryLabel: categoryLabels[tx.category] || tx.category,
      flagged:       tx.amount >= 1000
    };
  }
}

// Pipeline stage 4: transform to display format
function* formatRecords(source) {
  for (const tx of source) {
    yield {
      id:       tx.id,
      user:     tx.user.padEnd(8),
      category: tx.categoryLabel,
      amount:   `$${tx.amount.toFixed(2).padStart(10)}`,
      tax:      `$${tx.tax.toFixed(2).padStart(8)}`,
      total:    `$${tx.total.toFixed(2).padStart(10)}`,
      flag:     tx.flagged ? "⚠️  HIGH" : "      "
    };
  }
}

// Compose the pipeline (right to left — innermost first)
function buildPipeline(minAmount = 50) {
  const stream    = rawTransactions();
  const purchases = filterType(stream, "purchase");
  const aboveMin  = filterMinAmount(purchases, minAmount);
  const enriched  = enrichRecords(aboveMin);
  const formatted = formatRecords(enriched);
  return formatted;
}

console.log("\n" + "=".repeat(65));
console.log("     STAGE 2 — PIPELINE (purchases ≥ $50, enriched)");
console.log("=".repeat(65));
console.log(`${"ID".padEnd(6)} ${"User".padEnd(9)} ${"Category".padEnd(20)} ${"Amount".padStart(11)} ${"Tax".padStart(9)} ${"Total".padStart(11)} Flag`);
console.log("-".repeat(75));

for (const row of buildPipeline(50)) {
  console.log(`${row.id}   ${row.user} ${row.category.padEnd(20)} ${row.amount} ${row.tax} ${row.total} ${row.flag}`);
}
```

**▶ Expected Output (sample):**
```
=================================================================
     STAGE 2 — PIPELINE (purchases ≥ $50, enriched)
=================================================================
ID     User      Category             Amount        Tax       Total    Flag
-------------------------------------------------------------------------
T001   alice    🖥️  Electronics      $    250.00  $  18.75  $    268.75
T004   alice    🖥️  Electronics      $   1200.00  $  90.00  $   1290.00 ⚠️  HIGH
T007   bob      👕 Clothing          $    890.00  $  66.75  $    956.75
T008   carol    🖥️  Electronics      $    320.00  $  24.00  $    344.00
T010   alice    👕 Clothing          $    670.00  $  50.25  $    720.25
...
```

---

### 🟠 Stage 3 — Custom Iterable Stats Collector and Batch Report

**Goal:** Wrap the pipeline in a custom iterable that collects statistics during iteration, then paginate the results using a generator.

#### Stage 3 Full Code:

```javascript
// Custom iterable wrapper — collects stats as records flow through
function createStatsCollector(source) {
  const stats = {
    count: 0, totalAmount: 0, totalTax: 0,
    flaggedCount: 0, byCategory: new Map(), byRegion: new Map()
  };

  function* statTracking(src) {
    for (const tx of src) {
      // Update stats lazily as each record is yielded
      stats.count++;
      stats.totalAmount += tx.amount;
      stats.totalTax    += tx.tax;
      if (tx.flagged) stats.flaggedCount++;

      const cat = tx.category;
      const reg = tx.region;
      stats.byCategory.set(cat, (stats.byCategory.get(cat) || 0) + tx.amount);
      stats.byRegion.set(reg,   (stats.byRegion.get(reg)   || 0) + tx.amount);

      yield tx;
    }
  }

  // Return iterable wrapper and stats reference
  return { iterable: statTracking(source), stats };
}

// Batch output generator — yields arrays of pageSize records
function* paginate(source, pageSize) {
  let batch = [];
  for (const item of source) {
    batch.push(item);
    if (batch.length === pageSize) {
      yield batch;
      batch = [];
    }
  }
  if (batch.length > 0) yield batch; // last partial batch
}

// --- Run full pipeline with stats and pagination ---
console.log("\n" + "=".repeat(65));
console.log("     STAGE 3 — BATCHED REPORT WITH LIVE STATISTICS");
console.log("=".repeat(65));

// Re-build enriched pipeline (not formatted — raw enriched for stats)
const enrichedStream = enrichRecords(
  filterMinAmount(
    filterType(rawTransactions(), "purchase"),
    0  // no min for stats collection — include all
  )
);

const { iterable: tracked, stats } = createStatsCollector(enrichedStream);
const batched = paginate(tracked, 3);

let batchNum = 0;
for (const batch of batched) {
  batchNum++;
  console.log(`\n  ── Batch ${batchNum} ──`);
  batch.forEach(tx => {
    const flag = tx.flagged ? " ⚠️" : "";
    console.log(`    ${tx.id}  ${tx.user.padEnd(7)}  ${tx.categoryLabel.padEnd(20)}  $${tx.amount.toFixed(2)}${flag}`);
  });
}

// Stats are now fully populated (collected lazily as records flowed through)
console.log("\n" + "=".repeat(55));
console.log("             PIPELINE STATISTICS");
console.log("=".repeat(55));
console.log(`Records processed  : ${stats.count}`);
console.log(`Total amount       : $${stats.totalAmount.toFixed(2)}`);
console.log(`Total tax (7.5%)   : $${stats.totalTax.toFixed(2)}`);
console.log(`Flagged (>=$1000)  : ${stats.flaggedCount}`);

console.log("\nBy Category:");
for (const [cat, total] of [...stats.byCategory.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${cat.padEnd(14)} : $${total.toFixed(2)}`);
}

console.log("\nBy Region:");
for (const [reg, total] of [...stats.byRegion.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${reg.padEnd(8)} : $${total.toFixed(2)}`);
}
console.log("=".repeat(55));
```

**▶ Expected Output (sample):**
```
=================================================================
     STAGE 3 — BATCHED REPORT WITH LIVE STATISTICS
=================================================================

  ── Batch 1 ──
    T001  alice    🖥️  Electronics      $250.00
    T002  bob      🍎 Food              $45.50
    T004  alice    🖥️  Electronics      $1200.00 ⚠️

  ── Batch 2 ──
    T005  david    🍎 Food              $15.99
    T007  bob      👕 Clothing          $890.00
    T008  carol    🖥️  Electronics      $320.00
...

=======================================================
             PIPELINE STATISTICS
=======================================================
Records processed  : 9
Total amount       : $3547.23
Total tax (7.5%)   : $266.04
Flagged (>=$1000)  : 1

By Category:
  electronics    : $2440.00
  clothing       : $960.00
  food           : $147.23

By Region:
  north     : $2175.00
  south     : $1035.49
  east      : $335.74
=======================================================
```

**Reflection questions:**
- Why is a generator-based pipeline more memory-efficient than using `Array.filter().map()`?
- What does "lazy evaluation" mean? When does `rawTransactions()` actually read its data?
- Why can you compose generators (`filterType(filterMinAmount(source))`) and get a lazy pipeline, while composing `.filter().map()` on arrays is eager?
- What happens to the remaining records in `rawTransactions()` when you stop iterating mid-stream? (Nothing — they are simply never yielded.)
- How would you add an `async` generator (`async function*`) to read records from a real network API one page at a time?

**Optional advanced features:**
- Add a `take(n)` generator that limits output to the first `n` records — stops the stream early
- Add a `merge(...sources)` generator using `yield*` to combine multiple transaction streams
- Create a `window(iterable, size)` generator that yields sliding windows (overlapping batches of size `n`)
- Use `generator.return()` to cancel the pipeline mid-stream and measure how many records were processed

---
---

## 8. Completion Checklist

- ✅ I can use **all five loop types**: `for` (counter), `while` (condition), `do...while` (at least once), `for...in` (object keys), `for...of` (iterable values).
- ✅ I know when to use each loop — especially that `for...in` is for objects and `for...of` is for iterables.
- ✅ I understand `break` (exit immediately), `continue` (skip to next iteration), and labelled `break` (exit nested loops).
- ✅ I know the off-by-one danger in `for` loops: `i < arr.length` not `i <= arr.length`.
- ✅ I understand what an **iterable** is — any object with a `[Symbol.iterator]()` method.
- ✅ I know which built-in types are iterable: Arrays, Strings, Sets, Maps, generator objects, NodeLists.
- ✅ I know that plain objects `{}` are NOT iterable by default.
- ✅ I understand how `for...of`, spread `...`, destructuring, and `Array.from()` all use the iterable protocol internally.
- ✅ I can make a plain object iterable by adding a `[Symbol.iterator]()` method that returns an iterator.
- ✅ I understand what an **iterator** is — an object with `.next()` that returns `{ value, done }`.
- ✅ I know the difference between an iterable (produces iterators) and an iterator (produces values).
- ✅ I can build a manual iterator from scratch using a factory function.
- ✅ I understand self-iterating objects (return `this` from `[Symbol.iterator]`) and their one-time-use limitation.
- ✅ I know the optional `iterator.return()` method for cleanup when a loop exits early.
- ✅ I can declare a **generator function** using `function*` and pause it with `yield`.
- ✅ I understand that calling a generator function returns a generator object immediately without running the body.
- ✅ I can pass values INTO a generator using `.next(value)` (received as the result of `yield`).
- ✅ I can use `yield*` to delegate from one generator to another iterable.
- ✅ I can define generator methods inside classes using `*[Symbol.iterator]()`.
- ✅ I understand infinite generators (`while (true) { yield ... }`) and how to consume them safely with `break` or `take()`.
- ✅ I understand lazy evaluation — generators produce values only when asked, enabling memory-efficient pipelines.
- ✅ I completed all three exercises and the full three-stage mini project.

---

### 📌 One-Sentence Summary of Each Topic

**Looping:** JavaScript has five loop types — `for` for counted iteration, `while` for condition-driven loops, `do...while` for guaranteed first execution, `for...in` for object property keys, and `for...of` for iterating any iterable's values.

**Iterables:** An iterable is any object with a `[Symbol.iterator]()` method that returns an iterator — arrays, strings, Sets, and Maps are built-in iterables, and any custom object can be made iterable by implementing this protocol.

**Iterators:** An iterator is an object with a `.next()` method that returns `{ value, done }` on each call, driving the iteration step by step and optionally implementing `.return()` for early-exit cleanup.

**Generators:** A generator function (`function*`) uses `yield` to pause execution and produce values lazily one at a time, automatically creating objects that are both iterators and iterables — enabling infinite sequences, composable pipelines, and memory-efficient data processing.

---

> 📘 *Built from W3Schools.com — `js_looping` | `js_iterables` | `js_iterators` | `js_generators`*
> *Framework: Understand → Practice → Create*
