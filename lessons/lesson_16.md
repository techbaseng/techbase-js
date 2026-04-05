---
title: "JavaScript Maps: Key-Value Pairs · Map Methods · WeakMap · Full Reference"
nav_order: 16
---

## 📑 Table of Contents
1. [Background: Why Maps Exist](#1-background-why-maps-exist)
2. [Topic 1 — Maps: Basics & Creation](#2-topic-1--maps-basics--creation)
3. [Topic 2 — Map Methods](#3-topic-2--map-methods)
4. [Topic 3 — WeakMap](#4-topic-3--weakmap)
5. [Topic 4 — Complete Map Reference](#5-topic-4--complete-map-reference)
6. [Applied Exercises](#6-applied-exercises)
7. [Mini Project — Library Book Tracker](#7-mini-project--library-book-tracker)
8. [Completion Checklist](#8-completion-checklist)

---

## 1. Background: Why Maps Exist

You already know that JavaScript objects store key-value pairs:

```javascript
const scores = {
  Alice: 88,
  Bob:   92,
  Carol: 75
};
console.log(scores["Alice"]); // 88
```

So why does JavaScript need **Map** when objects already do this job?

Because objects have **serious limitations** as key-value stores that become painful in real applications:

### The 5 Problems with Objects as Key-Value Stores

| Problem | Object | Map |
|---------|--------|-----|
| **Key types** | Strings and Symbols only | **Any type** — objects, arrays, numbers, functions |
| **Key order** | Not guaranteed for non-string keys | **Always insertion order** |
| **Size** | No built-in count — must use `Object.keys(obj).length` | `.size` property instantly |
| **Iteration** | Not directly iterable (need `for...in` or `Object.entries`) | Directly iterable with `for...of` |
| **Prototype pollution** | Inherits keys like `toString`, `constructor` from prototype | Clean — no inherited keys |

### A Problem Objects Cannot Solve

Imagine you need to store extra data about DOM elements or objects — using the object itself as the key:

```javascript
// ❌ Objects can only use STRINGS as keys
const visits = {};
const userObj = { name: "Alice" };

visits[userObj] = 5;               // JavaScript converts key to "[object Object]"!
console.log(Object.keys(visits));  // ["[object Object]"]  ← useless!

// ✅ Map uses the ACTUAL object reference as a key
const visitsMap = new Map();
visitsMap.set(userObj, 5);
console.log(visitsMap.get(userObj)); // 5  ← works perfectly!
```

> 🏢 **REAL WORLD:** Maps are used for: caching computation results keyed by their input object, counting word frequencies, storing metadata about DOM elements, building lookup tables where keys are not strings, and anywhere you need a reliable ordered key-value structure.

---
---

## 2. Topic 1 — Maps: Basics & Creation

> **Phase 1 — Conceptual Understanding**

A **Map** is a collection of key-value pairs where:
- Each **key** is unique (like Set values — no duplicates)
- Keys can be **any JavaScript value** (objects, functions, primitives)
- Pairs are stored and iterated in **insertion order**
- Size is always available via `.size`

Think of a Map like a dictionary — each word (key) has exactly one definition (value). But unlike a regular JavaScript object dictionary, your "words" can be anything — not just strings.

---

### Creating a Map

#### Empty Map, then add entries with `set()`:

```javascript
const map = new Map();

map.set("name",  "Alice");
map.set("age",   30);
map.set("city",  "Lagos");

console.log(map);
// Map(3) { "name" => "Alice", "age" => 30, "city" => "Lagos" }

console.log(map.size); // 3
```

**▶ Expected Output:**
```
Map(3) { "name" => "Alice", "age" => 30, "city" => "Lagos" }
3
```

---

#### From an Array of `[key, value]` Pairs (Most Common):

Pass an array of two-element arrays to the `Map` constructor:

```javascript
const fruits = new Map([
  ["apple",  5],
  ["banana", 8],
  ["mango",  3]
]);

console.log(fruits);
// Map(3) { "apple" => 5, "banana" => 8, "mango" => 3 }

console.log(fruits.get("banana")); // 8
console.log(fruits.size);          // 3
```

**▶ Expected Output:**
```
Map(3) { "apple" => 5, "banana" => 8, "mango" => 3 }
8
3
```

> 💡 **TIP:** The `[key, value]` array format is called an **entry**. You will see this pattern constantly when converting between Maps and arrays. `Object.entries(obj)` also produces this same format — making it easy to convert objects to Maps.

---

#### From an Object (via `Object.entries`):

```javascript
const obj = { name: "Bob", score: 92, city: "Accra" };

// Convert object to Map
const map = new Map(Object.entries(obj));

console.log(map);
// Map(3) { "name" => "Bob", "score" => 92, "city" => "Accra" }
```

---

### Keys Can Be ANY Type — The Superpower of Map

This is the single biggest advantage of Map over a plain object:

```javascript
const map = new Map();

// String keys (like objects)
map.set("name", "Alice");

// Number keys
map.set(42, "The answer");

// Boolean keys
map.set(true,  "yes");
map.set(false, "no");

// Object as a key!
const user = { id: 1 };
map.set(user, "User profile data");

// Array as a key!
const coords = [10, 20];
map.set(coords, "Location marker");

// Function as a key!
const fn = () => "hello";
map.set(fn, "This function's metadata");

console.log(map.get("name"));   // "Alice"
console.log(map.get(42));       // "The answer"
console.log(map.get(true));     // "yes"
console.log(map.get(user));     // "User profile data"
console.log(map.get(coords));   // "Location marker"
console.log(map.size);          // 6
```

**▶ Expected Output:**
```
Alice
The answer
yes
User profile data
Location marker
6
```

> ⚠️ **WATCH OUT:** Like Set, Map uses **reference equality** for object and array keys. Two objects with the same content are treated as different keys if they are not the same reference in memory.
>
> ```javascript
> const map = new Map();
> map.set({ id: 1 }, "first");
> map.set({ id: 1 }, "second"); // DIFFERENT key — different object reference!
> console.log(map.size); // 2 (not 1!)
> ```

---

### `size` Property — Instant Count

```javascript
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
console.log(map.size); // 3
```

> 💡 **TIP:** Unlike objects where you need `Object.keys(obj).length`, Maps give you size instantly with `.size`. For large Maps, this is much faster because the count is maintained internally.

---

### Map Preserves Insertion Order

```javascript
const map = new Map();
map.set("z", 26);
map.set("a",  1);
map.set("m", 13);

for (const [key, val] of map) {
  console.log(key, "→", val);
}
```

**▶ Expected Output:**
```
z → 26
a → 1
m → 13
```

Notice the output is in **insertion order** (z, a, m) — NOT alphabetical order. This is guaranteed for Maps.

> 🏢 **REAL WORLD:** This matters when you need to show items in the order a user added them — like a shopping cart, a history log, or a priority queue.

---

### Iterating a Map

Maps are directly iterable. You can loop over them in several ways:

#### `for...of` with destructuring (most common):

```javascript
const scores = new Map([
  ["Alice", 88],
  ["Bob",   92],
  ["Carol", 75]
]);

for (const [name, score] of scores) {
  console.log(name + ": " + score);
}
```

**▶ Expected Output:**
```
Alice: 88
Bob: 92
Carol: 75
```

#### `forEach(value, key, map)`:

```javascript
scores.forEach((score, name) => {
  console.log(name + ": " + score);
});
```

> ⚠️ **WATCH OUT:** In Map's `forEach`, the callback receives `(value, key, map)` — **value first, then key**. This is the opposite of what many beginners expect. It mirrors `Array.forEach(element, index)` where the "important" thing comes first.

---

### Converting Map ↔ Array ↔ Object

These conversions are essential in real-world code:

```javascript
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);

// Map → Array of [key, value] pairs
const entries = [...map];
console.log(entries); // [["a",1], ["b",2], ["c",3]]

// Map → Array of keys only
const keys = [...map.keys()];
console.log(keys); // ["a", "b", "c"]

// Map → Array of values only
const values = [...map.values()];
console.log(values); // [1, 2, 3]

// Map → Plain Object (keys must be strings/symbols)
const obj = Object.fromEntries(map);
console.log(obj); // { a: 1, b: 2, c: 3 }

// Plain Object → Map
const backToMap = new Map(Object.entries(obj));
console.log(backToMap.size); // 3
```

**▶ Expected Output:**
```
[["a",1], ["b",2], ["c",3]]
["a", "b", "c"]
[1, 2, 3]
{ a: 1, b: 2, c: 3 }
3
```

> 🏢 **REAL WORLD:** API responses arrive as plain objects (`JSON.parse`). You convert them to Maps for efficient lookups, process them, then convert back to objects/JSON for sending responses. `Object.entries()` and `Object.fromEntries()` are the bridge.

---

### Map vs Object — When to Use Which?

| Situation | Use |
|-----------|-----|
| Keys are always strings, structure is fixed | **Object** — simpler syntax |
| Keys are non-strings (objects, numbers, etc.) | **Map** |
| Need guaranteed insertion order | **Map** |
| Need to know the count quickly | **Map** (`.size`) |
| Frequently adding and removing entries | **Map** — better performance |
| Need to serialise to JSON directly | **Object** — `JSON.stringify` doesn't support Map |
| Need set operations (union etc.) | **Set**, not Map |
| Passing data to external APIs | **Object** (most APIs expect objects) |

---
---

## 3. Topic 2 — Map Methods

> **Phase 1 — Conceptual Understanding**

Maps have a clean, focused API. Every method has one clear job.

---

### `set(key, value)` — Add or Update an Entry

Adds a new key-value pair. If the key already exists, its value is **updated**. Returns the **Map itself** (enabling chaining).

```javascript
const map = new Map();

// Add new entries
map.set("name", "Alice");
map.set("age",  30);

console.log(map); // Map(2) { "name" => "Alice", "age" => 30 }

// Update existing entry
map.set("age", 31); // "age" key already exists → updates value

console.log(map); // Map(2) { "name" => "Alice", "age" => 31 }
console.log(map.size); // Still 2 — no new entry created
```

**▶ Expected Output:**
```
Map(2) { "name" => "Alice", "age" => 30 }
Map(2) { "name" => "Alice", "age" => 31 }
2
```

#### Chaining `set()` calls:

```javascript
const config = new Map()
  .set("host",    "localhost")
  .set("port",    3000)
  .set("debug",   true)
  .set("timeout", 5000);

console.log(config.size); // 4
```

> 🏢 **REAL WORLD:** Building a configuration Map by chaining `.set()` calls is a common pattern in server-side Node.js code.

---

### `get(key)` — Retrieve a Value

Returns the value for a given key. Returns `undefined` if the key doesn't exist.

```javascript
const map = new Map([
  ["city",    "Nairobi"],
  ["country", "Kenya"],
  ["pop",     5_000_000]
]);

console.log(map.get("city"));      // "Nairobi"
console.log(map.get("country"));   // "Kenya"
console.log(map.get("pop"));       // 5000000
console.log(map.get("language"));  // undefined  ← key doesn't exist
```

**▶ Expected Output:**
```
Nairobi
Kenya
5000000
undefined
```

> 🐛 **COMMON MISTAKE:** Always check with `has()` before using `get()` if the value could legitimately be `undefined` or `0` (falsy values). Do NOT use `if (map.get(key))` — it fails for falsy values!
>
> ```javascript
> // ❌ WRONG — fails when value is 0, false, "", null, undefined
> if (map.get("score")) { ... }
>
> // ✅ CORRECT — checks existence, not truthiness
> if (map.has("score")) { ... }
> ```

---

### `has(key)` — Check if a Key Exists

Returns `true` if the key exists in the Map, `false` otherwise.

```javascript
const map = new Map([
  ["apple", 5],
  ["banana", 0], // ← value is 0, which is falsy!
]);

// ✅ Correct existence check
console.log(map.has("apple"));   // true
console.log(map.has("banana"));  // true  ← correct! (value is 0 but key exists)
console.log(map.has("mango"));   // false

// ❌ Wrong approach — misses falsy values
console.log(!!map.get("banana")); // false ← WRONG! key exists but value is falsy
```

**▶ Expected Output:**
```
true
true
false
false
```

---

### `delete(key)` — Remove an Entry

Removes the key-value pair for the given key. Returns `true` if the key existed and was removed, `false` if not found.

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

const removed = map.delete("b");
console.log(removed);   // true
console.log(map);       // Map(2) { "a" => 1, "c" => 3 }
console.log(map.size);  // 2

const notFound = map.delete("z");
console.log(notFound);  // false
```

**▶ Expected Output:**
```
true
Map(2) { "a" => 1, "c" => 3 }
2
false
```

---

### `clear()` — Remove All Entries

Empties the Map completely. The Map object still exists but is now empty.

```javascript
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
console.log(map.size); // 3

map.clear();

console.log(map.size); // 0
console.log(map);      // Map(0) {}
```

---

### `keys()` — Iterator of All Keys

Returns an iterator yielding each key in insertion order.

```javascript
const map = new Map([
  ["name",  "Alice"],
  ["age",   30],
  ["city",  "Lagos"]
]);

for (const key of map.keys()) {
  console.log(key);
}
// name
// age
// city

// Convert to array
const keysArr = [...map.keys()];
console.log(keysArr); // ["name", "age", "city"]
```

**▶ Expected Output:**
```
name
age
city
["name", "age", "city"]
```

---

### `values()` — Iterator of All Values

Returns an iterator yielding each value in insertion order.

```javascript
const scores = new Map([
  ["Alice", 88],
  ["Bob",   92],
  ["Carol", 75]
]);

for (const score of scores.values()) {
  console.log(score);
}
// 88
// 92
// 75

// Useful: calculate average using spread
const avg = [...scores.values()].reduce((s, v) => s + v, 0) / scores.size;
console.log("Average:", avg.toFixed(1)); // 85.0
```

**▶ Expected Output:**
```
88
92
75
Average: 85.0
```

---

### `entries()` — Iterator of `[key, value]` Pairs

Returns an iterator yielding `[key, value]` arrays. This is the default iteration behaviour of a Map — `for...of map` is the same as `for...of map.entries()`.

```javascript
const map = new Map([
  ["x", 10],
  ["y", 20],
  ["z", 30]
]);

for (const [key, value] of map.entries()) {
  console.log(key + " → " + value);
}
// x → 10
// y → 20
// z → 30

// These are identical:
for (const [k, v] of map)         { /* same */ }
for (const [k, v] of map.entries()) { /* same */ }
```

---

### `forEach(callback)` — Run a Function for Each Entry

Calls `callback(value, key, map)` for each entry in insertion order.

```javascript
const prices = new Map([
  ["apple",  1.20],
  ["banana", 0.50],
  ["mango",  2.00]
]);

let total = 0;
prices.forEach((price, fruit) => {
  console.log(fruit + ": $" + price.toFixed(2));
  total += price;
});
console.log("Total: $" + total.toFixed(2));
```

**▶ Expected Output:**
```
apple: $1.20
banana: $0.50
mango: $2.00
Total: $3.70
```

> 🤔 **THINK ABOUT IT:** In `forEach`, why does value come before key? The Map is designed this way so code reading left-to-right makes intuitive sense: "for each entry, here is its value and here is its key". Also, it is consistent with `Array.forEach(element, index)` where the "primary data" comes first.

---

### `groupBy()` — Group Array Items into a Map (Static Method)

`Map.groupBy(iterable, keyFn)` groups the elements of an iterable into a Map, where each key is the result of calling `keyFn` on each element and the value is an array of elements sharing that key.

```javascript
const students = [
  { name: "Alice",  grade: "A", score: 92 },
  { name: "Bob",    grade: "B", score: 78 },
  { name: "Carol",  grade: "A", score: 95 },
  { name: "David",  grade: "C", score: 65 },
  { name: "Eve",    grade: "B", score: 81 },
];

// Group students by their grade
const byGrade = Map.groupBy(students, s => s.grade);

console.log(byGrade.get("A"));
// [{ name: "Alice", grade: "A", score: 92 },
//  { name: "Carol", grade: "A", score: 95 }]

console.log(byGrade.get("B"));
// [{ name: "Bob", grade: "B", score: 78 },
//  { name: "Eve", grade: "B", score: 81 }]

// Iterate grouped results
for (const [grade, group] of byGrade) {
  const names = group.map(s => s.name).join(", ");
  console.log(`Grade ${grade}: ${names}`);
}
```

**▶ Expected Output:**
```
[{ name: "Alice", ... }, { name: "Carol", ... }]
[{ name: "Bob", ... }, { name: "Eve", ... }]
Grade A: Alice, Carol
Grade B: Bob, Eve
Grade C: David
```

> 🏢 **REAL WORLD:** `Map.groupBy()` replaces the classic `reduce` grouping pattern that every developer had to write manually. Use it to group products by category, transactions by date, users by role — any "bucket" grouping task.

> ⚠️ **WATCH OUT:** `Map.groupBy()` is a relatively new static method (ES2024). For older environments, the manual equivalent with `reduce` is:
>
> ```javascript
> const grouped = students.reduce((map, s) => {
>   const key = s.grade;
>   if (!map.has(key)) map.set(key, []);
>   map.get(key).push(s);
>   return map;
> }, new Map());
> ```

---

### Summary: All Map Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `new Map(entries?)` | Map | Create from `[[k,v],...]` or empty |
| `map.set(key, val)` | Map | Add/update entry (chainable) |
| `map.get(key)` | Value or `undefined` | Retrieve by key |
| `map.has(key)` | Boolean | Check key existence |
| `map.delete(key)` | Boolean | Remove entry |
| `map.clear()` | `undefined` | Remove all entries |
| `map.size` | Number | Count of entries |
| `map.keys()` | MapIterator | Iterate keys |
| `map.values()` | MapIterator | Iterate values |
| `map.entries()` | MapIterator | Iterate `[key, value]` pairs |
| `map.forEach(fn)` | `undefined` | Run `fn(value, key, map)` |
| `Map.groupBy(iter, fn)` | Map | Group iterable by key function |

---
---

## 4. Topic 3 — WeakMap

> **Phase 1 — Conceptual Understanding**

`WeakMap` is to `Map` what `WeakSet` is to `Set` — a special memory-friendly variant with strict rules and intentional limitations.

### The Core Idea — Memory Without Ownership

A regular `Map` holds a **strong reference** to its keys — this prevents the garbage collector from cleaning up the key objects as long as the Map exists. A `WeakMap` holds **weak references** to its keys — meaning if nothing else in the program holds a reference to a key object, the garbage collector can reclaim it and its entry is automatically removed from the WeakMap.

```
Regular Map:
  Object ←──── STRONG key reference ──── Map
  (Object CANNOT be collected while Map exists)

WeakMap:
  Object ←──── WEAK key reference  ──── WeakMap
  (Object CAN be collected — WeakMap doesn't prevent it)
```

---

### WeakMap Rules — Two Critical Constraints

1. **Keys MUST be objects** (not primitives like numbers, strings, booleans)
2. **Not iterable** — no `for...of`, no `keys()`, no `values()`, no `entries()`, no `size`, no `clear()`

These constraints exist by design — because items can disappear at any time (garbage collected), a predictable iteration or count would be meaningless.

---

### Creating a WeakMap

```javascript
const wm = new WeakMap();

const key1 = { id: 1 };
const key2 = { id: 2 };
const key3 = { id: 3 };

wm.set(key1, "Data for object 1");
wm.set(key2, "Data for object 2");
wm.set(key3, "Data for object 3");

console.log(wm.get(key1)); // "Data for object 1"
console.log(wm.has(key2)); // true
```

**▶ Expected Output:**
```
Data for object 1
true
```

---

### WeakMap Keys MUST Be Objects

```javascript
const wm = new WeakMap();

// ❌ Primitives are NOT allowed as keys
try {
  wm.set("hello", "value"); // TypeError!
} catch (e) {
  console.log("Error:", e.message);
  // "Invalid value used as weak map key"
}

try {
  wm.set(42, "value");      // TypeError!
} catch (e) {
  console.log("Error:", e.message);
}

// ✅ Only object keys work
const obj = { name: "test" };
wm.set(obj, "this works");
console.log(wm.get(obj)); // "this works"
```

---

### WeakMap Methods — Only Four

```javascript
const wm  = new WeakMap();
const key = { id: 1 };

wm.set(key, "some value");   // Add/update entry
console.log(wm.get(key));    // "some value"
console.log(wm.has(key));    // true
wm.delete(key);              // Remove entry
console.log(wm.has(key));    // false
```

| Method | Returns | Description |
|--------|---------|-------------|
| `wm.set(objKey, value)` | WeakMap | Add/update entry (key must be object) |
| `wm.get(objKey)` | Value or `undefined` | Retrieve value by object key |
| `wm.has(objKey)` | Boolean | Check if key exists |
| `wm.delete(objKey)` | Boolean | Remove entry |

> ⚠️ **WATCH OUT:** There is **no** `wm.size`, `wm.clear()`, `wm.keys()`, `wm.values()`, `wm.entries()`, or `wm.forEach()`. WeakMap intentionally cannot be iterated — items may vanish at any time due to garbage collection.

---

### Automatic Memory Cleanup — The Key Benefit

```javascript
let user = { name: "Alice", id: 1 };
const cache = new WeakMap();

cache.set(user, { preferences: { theme: "dark" } });

console.log(cache.has(user)); // true

// When we remove our reference to the user object...
user = null;

// JavaScript's garbage collector will eventually:
// 1. See that no strong references to the original { name: "Alice" } object remain
// 2. Clean up that object from memory
// 3. Automatically remove its entry from the WeakMap too
// → No memory leak!
```

---

### Real-World Use Case 1 — Private Object Data

Before JavaScript had private class fields (`#`), WeakMap was the standard way to store private data for class instances:

```javascript
// Private storage — only accessible via the API, not directly on the object
const _private = new WeakMap();

class BankAccount {
  constructor(owner, balance) {
    // Store private data in WeakMap keyed by this instance
    _private.set(this, { owner, balance, transactions: [] });
  }

  deposit(amount) {
    const data = _private.get(this);
    data.balance += amount;
    data.transactions.push({ type: "deposit", amount });
    console.log(`Deposited $${amount}. New balance: $${data.balance}`);
  }

  getBalance() {
    return _private.get(this).balance;
  }

  getOwner() {
    return _private.get(this).owner;
  }
}

const account = new BankAccount("Alice", 1000);
account.deposit(500);
console.log("Balance:", account.getBalance());
console.log("Owner:", account.getOwner());

// ← Cannot access _private directly from outside this module!
// When 'account' goes out of scope, WeakMap cleans up automatically
```

**▶ Expected Output:**
```
Deposited $500. New balance: $1500
Balance: 1500
Owner: Alice
```

---

### Real-World Use Case 2 — Caching Computed Results Per Object

```javascript
const computeCache = new WeakMap();

function getExpensiveData(obj) {
  // Return cached result if already computed for this object
  if (computeCache.has(obj)) {
    console.log("Cache hit!");
    return computeCache.get(obj);
  }

  // Simulate expensive computation
  console.log("Computing...");
  const result = { processed: true, data: obj.value * 2 };

  // Cache it — but without preventing obj from being garbage collected
  computeCache.set(obj, result);
  return result;
}

const record = { value: 21 };

console.log(getExpensiveData(record)); // Computing...  { processed: true, data: 42 }
console.log(getExpensiveData(record)); // Cache hit!    { processed: true, data: 42 }

// When record goes out of scope, cache entry is automatically cleaned up
```

**▶ Expected Output:**
```
Computing...
{ processed: true, data: 42 }
Cache hit!
{ processed: true, data: 42 }
```

---

### Real-World Use Case 3 — DOM Element Metadata

```javascript
const elementData = new WeakMap();

function attachData(element, data) {
  elementData.set(element, data);
}

function getData(element) {
  return elementData.get(element) || null;
}

// In a browser:
// const btn = document.querySelector("#submitBtn");
// attachData(btn, { clicks: 0, lastClicked: null });
//
// When btn is removed from the DOM and no JS holds a reference,
// WeakMap automatically releases its entry — no cleanup code needed!
```

> 🏢 **REAL WORLD:** JavaScript frameworks like Vue.js use WeakMap internally to store reactive metadata about component objects. When a component is destroyed, its metadata is automatically garbage collected — no manual cleanup required.

---

### Map vs WeakMap — Full Comparison

| Feature | `Map` | `WeakMap` |
|---------|-------|-----------|
| Key types | Any value | Objects ONLY |
| Value types | Any value | Any value |
| Key references | Strong | Weak (allows GC) |
| `size` property | ✅ Yes | ❌ No |
| `clear()` | ✅ Yes | ❌ No |
| Iterable | ✅ Yes | ❌ No |
| `keys()` / `values()` / `entries()` | ✅ Yes | ❌ No |
| `forEach()` | ✅ Yes | ❌ No |
| `set()` / `get()` / `has()` / `delete()` | ✅ Yes | ✅ Yes |
| Best use | General key-value storage | Private data, caches, DOM metadata |

---
---

## 5. Topic 4 — Complete Map Reference

> Quick reference for every Map and WeakMap feature.

---

### Map — Constructor

```javascript
new Map()                      // empty Map
new Map([[k1,v1], [k2,v2]])    // from entries array
new Map(Object.entries(obj))   // from plain object
new Map(anotherMap)            // copy of another Map
```

---

### Map — Properties

| Property | Type | Description |
|----------|------|-------------|
| `map.size` | Number | Count of key-value entries |
| `map[Symbol.iterator]` | Function | Makes Map iterable (same as `entries()`) |

---

### Map — Instance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `map.set(key, value)` | Map | Add/update entry; chainable |
| `map.get(key)` | Value or `undefined` | Get value by key |
| `map.has(key)` | Boolean | True if key exists |
| `map.delete(key)` | Boolean | Remove entry; true if found |
| `map.clear()` | `undefined` | Remove all entries |
| `map.keys()` | MapIterator | Iterate keys in insertion order |
| `map.values()` | MapIterator | Iterate values in insertion order |
| `map.entries()` | MapIterator | Iterate `[key, value]` pairs |
| `map.forEach(fn)` | `undefined` | Call `fn(value, key, map)` for each |

---

### Map — Static Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Map.groupBy(iterable, keyFn)` | Map | Group elements by key function result |

---

### Map — Conversion Cheat Sheet

```javascript
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);

// → Array of entries [[k,v], ...]
[...map]                   // [["a",1],["b",2],["c",3]]
[...map.entries()]         // same

// → Array of keys
[...map.keys()]            // ["a","b","c"]

// → Array of values
[...map.values()]          // [1, 2, 3]

// → Plain object
Object.fromEntries(map)    // { a:1, b:2, c:3 }

// ← From plain object
new Map(Object.entries({ a:1, b:2 }))

// ← From array
new Map([["a",1],["b",2]])

// ← From another Map (shallow copy)
new Map(existingMap)
```

---

### WeakMap — Constructor

```javascript
new WeakMap()                         // empty
new WeakMap([[objKey, value], ...])   // from entries (keys must be objects)
```

---

### WeakMap — Instance Methods (Only Four)

| Method | Returns | Description |
|--------|---------|-------------|
| `wm.set(objKey, value)` | WeakMap | Add/update entry (key must be object) |
| `wm.get(objKey)` | Value or `undefined` | Get value by object key |
| `wm.has(objKey)` | Boolean | True if key exists |
| `wm.delete(objKey)` | Boolean | Remove entry |

---

### Choosing the Right Structure — Decision Guide

```
Do you need key-value pairs?
  ├─ YES →
  │     Are keys always strings?
  │       ├─ YES, simple fixed structure → Plain Object {}
  │       └─ NO (objects, numbers, etc. as keys) or need order/size → MAP
  │
  │     Do keys need to be garbage collected?
  │       └─ YES (DOM nodes, class instances) → WEAKMAP
  │
  └─ NO →
        Do you need unique values (not pairs)?
          ├─ YES → SET
          └─ YES + auto GC → WEAKSET
```

---
---

## 6. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Map Builder & Reader 🏗️

**Objective:** Practice creating Maps, using `set`, `get`, `has`, `delete`, and iterating.

**Scenario:** You are building a **student contact directory** for a school. Each student ID maps to a contact record object.

#### Warm-up Micro-Demo:

```javascript
const dir = new Map();
dir.set("S001", { name: "Amara", phone: "080-1234-5678" });
dir.set("S002", { name: "Kwame", phone: "081-9876-5432" });

console.log(dir.get("S001").name); // "Amara"
console.log(dir.size);             // 2
```

**▶ Expected Output:**
```
Amara
2
```

#### Task A — Build the Directory

```javascript
const directory = new Map([
  ["S001", { name: "Amara Diallo",    phone: "080-111-2222", grade: "A" }],
  ["S002", { name: "Kwame Asante",    phone: "081-333-4444", grade: "B" }],
  ["S003", { name: "Fatima Rashid",   phone: "082-555-6666", grade: "A" }],
  ["S004", { name: "Emeka Obi",       phone: "083-777-8888", grade: "C" }],
  ["S005", { name: "Priya Sharma",    phone: "084-999-0000", grade: "B" }],
]);

// 1. Look up a student
const student = directory.get("S003");
console.log("Found:", student.name, "—", student.grade);

// 2. Check existence before updating
const updateId = "S002";
if (directory.has(updateId)) {
  const current = directory.get(updateId);
  directory.set(updateId, { ...current, grade: "A" }); // promote grade
  console.log("Updated:", directory.get(updateId).name, "→ grade A");
}

// 3. Add a new student
directory.set("S006", { name: "Omar Hassan", phone: "085-123-4567", grade: "B" });
console.log("Directory size:", directory.size);

// 4. Remove a student
directory.delete("S004");
console.log("After removal:", directory.size);

// 5. Print all A-grade students
console.log("\nA-grade students:");
for (const [id, info] of directory) {
  if (info.grade === "A") {
    console.log(`  ${id}: ${info.name}`);
  }
}
```

**Expected Output:**
```
Found: Fatima Rashid — A
Updated: Kwame Asante → grade A
Directory size: 6
After removal: 5

A-grade students:
  S001: Amara Diallo
  S002: Kwame Asante
  S003: Fatima Rashid
```

**Self-check questions:**
- Why use a Map instead of a plain object for this directory?
- What does `directory.get("S999")` return and how should you handle it?
- Why is `has()` checked before `get()` when the value could be `undefined`?

---

### Exercise 2 — Word Frequency Counter 📊

**Objective:** Practice using a Map to count occurrences, then sort and display results.

**Scenario:** You're building a **text analysis tool** for a content team. Given a block of text, count word frequencies and find the most common words.

#### Warm-up Micro-Demo:

```javascript
const counts = new Map();
const words  = ["apple", "banana", "apple", "cherry", "banana", "apple"];

words.forEach(word => {
  counts.set(word, (counts.get(word) || 0) + 1);
});

console.log(counts.get("apple"));  // 3
console.log(counts.get("banana")); // 2
```

**▶ Expected Output:**
```
3
2
```

#### Task A — Full Word Counter

```javascript
function analyseText(text) {
  // Normalise: lowercase, remove punctuation, split into words
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 0);

  // Count with Map
  const freq = new Map();
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }

  // Sort by frequency (descending) — convert to array first
  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);

  return { freq, sorted, totalWords: words.length, uniqueWords: freq.size };
}

const text = `JavaScript is a powerful language. JavaScript runs in the browser 
and on the server. The browser renders JavaScript. Learning JavaScript is 
essential for web development. Web development uses JavaScript everywhere.`;

const result = analyseText(text);

console.log("Total words :", result.totalWords);
console.log("Unique words:", result.uniqueWords);
console.log("\nTop 5 words:");
result.sorted.slice(0, 5).forEach(([word, count], i) => {
  const bar = "█".repeat(count);
  console.log(`  ${(i + 1)}. ${word.padEnd(15)} ${bar} (${count})`);
});

console.log("\nFrequency of 'javascript':", result.freq.get("javascript"));
```

**Expected Output:**
```
Total words : 36
Unique words: 20

Top 5 words:
  1. javascript     ████ (5)
  2. is             ███ (3)
  3. the            ███ (3)
  4. web            ███ (3)
  5. development    ██ (2)

Frequency of 'javascript': 5
```

**Self-check questions:**
- Why is a Map better than a plain object for counting words?
- Why does `counts.get(word) || 0` work for initialising missing keys?
- How would you filter out common words like "the", "is", "a" (stop words)?

---

### Exercise 3 — Grouping with Map.groupBy() 🗂️

**Objective:** Practice `Map.groupBy()` and manual grouping with `reduce`.

**Scenario:** You're building a **sales reporting dashboard** that groups transactions by region, month, and status.

#### Warm-up Micro-Demo:

```javascript
const items = [
  { name: "Book",   category: "education" },
  { name: "Pen",    category: "education" },
  { name: "Laptop", category: "tech"      },
];

const grouped = Map.groupBy(items, item => item.category);
console.log(grouped.get("education").length); // 2
console.log(grouped.get("tech").length);      // 1
```

#### Task A — Sales Grouping

```javascript
const transactions = [
  { id: 1,  amount: 4500, region: "North", month: "Jan", status: "paid"    },
  { id: 2,  amount: 3200, region: "South", month: "Jan", status: "pending" },
  { id: 3,  amount: 5800, region: "North", month: "Feb", status: "paid"    },
  { id: 4,  amount: 2900, region: "East",  month: "Jan", status: "paid"    },
  { id: 5,  amount: 6100, region: "South", month: "Feb", status: "paid"    },
  { id: 6,  amount: 3750, region: "East",  month: "Feb", status: "pending" },
  { id: 7,  amount: 4100, region: "North", month: "Mar", status: "paid"    },
  { id: 8,  amount: 1800, region: "South", month: "Mar", status: "failed"  },
];

// 1. Group by region
const byRegion = Map.groupBy(transactions, t => t.region);
console.log("=== Sales by Region ===");
for (const [region, txns] of byRegion) {
  const total = txns.reduce((sum, t) => sum + t.amount, 0);
  console.log(`  ${region.padEnd(6)}: ${txns.length} transactions — $${total.toLocaleString()}`);
}

// 2. Group by status
const byStatus = Map.groupBy(transactions, t => t.status);
console.log("\n=== Sales by Status ===");
for (const [status, txns] of byStatus) {
  const total = txns.reduce((sum, t) => sum + t.amount, 0);
  console.log(`  ${status.padEnd(8)}: ${txns.length} txns — $${total.toLocaleString()}`);
}

// 3. Only paid transactions, grouped by month
const paid = transactions.filter(t => t.status === "paid");
const paidByMonth = Map.groupBy(paid, t => t.month);
console.log("\n=== Paid Transactions by Month ===");
for (const [month, txns] of paidByMonth) {
  const total = txns.reduce((sum, t) => sum + t.amount, 0);
  console.log(`  ${month}: $${total.toLocaleString()}`);
}
```

**Expected Output:**
```
=== Sales by Region ===
  North : 3 transactions — $14,400
  South : 3 transactions — $11,100
  East  : 2 transactions — $6,650

=== Sales by Status ===
  paid    : 6 txns — $26,550
  pending : 2 txns — $6,950
  failed  : 1 txns — $1,800

=== Paid Transactions by Month ===
  Jan: $7,400
  Feb: $11,900
  Mar: $4,100
```

**Self-check questions:**
- What does `Map.groupBy` return and how is it different from `Array.reduce`?
- Why is the result a `Map` and not a plain object?
- How would you find the region with the highest total sales after grouping?

---
---

## 7. Mini Project — Library Book Tracker

> **Phase 3 — Project Simulation**

**Real-world scenario:** You are building a **library book management system**. The system needs to:
- Store books in a Map (ISBN → book details)
- Track borrowing status per book
- Use WeakMap to store private fine/penalty data per borrower object
- Generate statistics by genre using `Map.groupBy()`
- Search, sort, and report on the collection

---

### 🔵 Stage 1 — Book Catalogue

**Goal:** Build a Map-based book catalogue with add, search, and update operations.

#### Simple stage preview:

```javascript
const catalogue = new Map();
catalogue.set("978-0-00-001", { title: "Dune", author: "Frank Herbert", available: true });
console.log(catalogue.get("978-0-00-001").title); // "Dune"
```

#### Stage 1 Full Code:

```javascript
"use strict";

// Book catalogue: ISBN → book object
const catalogue = new Map([
  ["978-0-06-112008-4", { title: "To Kill a Mockingbird", author: "Harper Lee",       genre: "Fiction",  year: 1960, copies: 3, borrowed: 0 }],
  ["978-0-14-028329-7", { title: "1984",                  author: "George Orwell",    genre: "Dystopia", year: 1949, copies: 2, borrowed: 1 }],
  ["978-0-7432-7356-5", { title: "The Alchemist",         author: "Paulo Coelho",     genre: "Fiction",  year: 1988, copies: 4, borrowed: 2 }],
  ["978-0-06-093546-9", { title: "To Kill Again",         author: "Harper Lee",       genre: "Fiction",  year: 1965, copies: 1, borrowed: 0 }],
  ["978-0-316-76948-0", { title: "The Catcher in the Rye",author: "J.D. Salinger",   genre: "Fiction",  year: 1951, copies: 2, borrowed: 2 }],
  ["978-0-385-33348-1", { title: "The Giver",             author: "Lois Lowry",       genre: "Dystopia", year: 1993, copies: 3, borrowed: 1 }],
  ["978-0-06-196436-0", { title: "Sapiens",               author: "Yuval Noah Harari",genre: "History",  year: 2011, copies: 5, borrowed: 3 }],
  ["978-0-525-55360-5", { title: "Atomic Habits",         author: "James Clear",      genre: "Self-Help",year: 2018, copies: 4, borrowed: 4 }],
]);

// Helper: check availability
function isAvailable(isbn) {
  if (!catalogue.has(isbn)) return false;
  const book = catalogue.get(isbn);
  return book.borrowed < book.copies;
}

// Display book
function displayBook(isbn, book) {
  const avail = book.copies - book.borrowed;
  const status = avail > 0 ? `✅ ${avail} available` : "❌ All borrowed";
  console.log(`  [${isbn.slice(-8)}] ${book.title.padEnd(28)} (${book.genre}) — ${status}`);
}

console.log("=".repeat(65));
console.log("           STAGE 1 — LIBRARY CATALOGUE");
console.log("=".repeat(65));
console.log(`Total books in catalogue: ${catalogue.size}\n`);

for (const [isbn, book] of catalogue) {
  displayBook(isbn, book);
}

// Search by author
function findByAuthor(author) {
  return [...catalogue.entries()]
    .filter(([, b]) => b.author.toLowerCase().includes(author.toLowerCase()));
}

console.log("\nBooks by 'Harper Lee':");
findByAuthor("Harper Lee").forEach(([isbn, b]) => displayBook(isbn, b));
```

**▶ Expected Output:**
```
=================================================================
           STAGE 1 — LIBRARY CATALOGUE
=================================================================
Total books in catalogue: 8

  [12008-4] To Kill a Mockingbird      (Fiction)  — ✅ 3 available
  [28329-7] 1984                       (Dystopia) — ✅ 1 available
  ...

Books by 'Harper Lee':
  [12008-4] To Kill a Mockingbird      (Fiction)  — ✅ 3 available
  [36436-0] To Kill Again              (Fiction)  — ✅ 1 available
```

---

### 🟢 Stage 2 — Borrowing System with WeakMap

**Goal:** Handle borrow and return operations. Use a WeakMap to store private borrower fine data.

#### Simple stage preview:

```javascript
const _fines = new WeakMap();
const borrower = { name: "Alice", id: "M001" };
_fines.set(borrower, { outstanding: 0, history: [] });
console.log(_fines.get(borrower).outstanding); // 0
```

#### Stage 2 Full Code:

```javascript
// Private fine data — keyed by borrower object, cleaned up when borrower removed
const _fineData = new WeakMap();

// Active loans: loanId → { borrower, isbn, dueDate }
const activeLoans = new Map();
let loanCounter = 1;

function registerBorrower(name, memberId) {
  const borrower = { name, memberId };
  _fineData.set(borrower, { outstanding: 0, totalLoans: 0, history: [] });
  return borrower;
}

function borrowBook(borrower, isbn) {
  if (!catalogue.has(isbn)) {
    console.log(`❌ ISBN ${isbn} not found`);
    return null;
  }
  if (!isAvailable(isbn)) {
    console.log(`❌ "${catalogue.get(isbn).title}" — all copies borrowed`);
    return null;
  }

  // Update book stock
  const book = catalogue.get(isbn);
  catalogue.set(isbn, { ...book, borrowed: book.borrowed + 1 });

  // Record loan
  const loanId = `L${String(loanCounter++).padStart(3, "0")}`;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14); // 2-week loan

  activeLoans.set(loanId, { borrower, isbn, dueDate });

  // Update borrower stats (via WeakMap)
  const fines = _fineData.get(borrower);
  fines.totalLoans++;
  fines.history.push({ action: "borrowed", isbn, loanId, date: new Date().toDateString() });

  console.log(`✅ "${book.title}" borrowed by ${borrower.name} — Loan ID: ${loanId}`);
  return loanId;
}

function returnBook(loanId) {
  if (!activeLoans.has(loanId)) {
    console.log(`❌ Loan ${loanId} not found`);
    return;
  }

  const { borrower, isbn } = activeLoans.get(loanId);
  const book = catalogue.get(isbn);

  // Restore stock
  catalogue.set(isbn, { ...book, borrowed: book.borrowed - 1 });

  // Update borrower history
  const fines = _fineData.get(borrower);
  fines.history.push({ action: "returned", isbn, loanId, date: new Date().toDateString() });

  // Remove active loan
  activeLoans.delete(loanId);

  console.log(`✅ "${book.title}" returned by ${borrower.name}`);
}

function addFine(borrower, amount, reason) {
  const fines = _fineData.get(borrower);
  fines.outstanding += amount;
  console.log(`💰 Fine added: $${amount} to ${borrower.name} — ${reason}`);
}

function getBorrowerReport(borrower) {
  const fines = _fineData.get(borrower);
  console.log(`\n📋 Borrower: ${borrower.name} (${borrower.memberId})`);
  console.log(`   Total loans: ${fines.totalLoans}`);
  console.log(`   Outstanding fine: $${fines.outstanding.toFixed(2)}`);
  console.log(`   History:`);
  fines.history.forEach(h => {
    const title = catalogue.get(h.isbn)?.title || "Unknown";
    console.log(`     ${h.action.padEnd(9)} — "${title}" on ${h.date}`);
  });
}

// --- Run borrowing system ---
console.log("\n" + "=".repeat(55));
console.log("       STAGE 2 — BORROWING SYSTEM");
console.log("=".repeat(55));

const alice = registerBorrower("Alice Nkosi",   "M001");
const bob   = registerBorrower("Bob Asante",    "M002");
const carol = registerBorrower("Carol Martini", "M003");

const l1 = borrowBook(alice, "978-0-06-112008-4"); // To Kill a Mockingbird
const l2 = borrowBook(alice, "978-0-385-33348-1"); // The Giver
const l3 = borrowBook(bob,   "978-0-525-55360-5"); // Atomic Habits
const l4 = borrowBook(carol, "978-0-06-112008-4"); // To Kill a Mockingbird

// Try to borrow an unavailable book (Catcher in the Rye is fully out)
borrowBook(bob, "978-0-316-76948-0");

returnBook(l1); // Alice returns To Kill a Mockingbird
addFine(bob, 2.50, "Late return — 5 days overdue");

getBorrowerReport(alice);
getBorrowerReport(bob);

console.log(`\nActive loans outstanding: ${activeLoans.size}`);
```

**▶ Expected Output (sample):**
```
=======================================================
       STAGE 2 — BORROWING SYSTEM
=======================================================
✅ "To Kill a Mockingbird" borrowed by Alice Nkosi — Loan ID: L001
✅ "The Giver" borrowed by Alice Nkosi — Loan ID: L002
✅ "Atomic Habits" borrowed by Bob Asante — Loan ID: L003
✅ "To Kill a Mockingbird" borrowed by Carol Martini — Loan ID: L004
❌ "The Catcher in the Rye" — all copies borrowed
✅ "To Kill a Mockingbird" returned by Alice Nkosi
💰 Fine added: $2.50 to Bob Asante — Late return — 5 days overdue

📋 Borrower: Alice Nkosi (M001)
   Total loans: 2
   Outstanding fine: $0.00
   History:
     borrowed  — "To Kill a Mockingbird" on ...
     borrowed  — "The Giver" on ...
     returned  — "To Kill a Mockingbird" on ...

📋 Borrower: Bob Asante (M002)
   Total loans: 1
   Outstanding fine: $2.50
   History:
     borrowed  — "Atomic Habits" on ...

Active loans outstanding: 3
```

---

### 🟠 Stage 3 — Statistics Report with groupBy

**Goal:** Generate full library statistics using `Map.groupBy()`, value iteration, and sorted results.

#### Stage 3 Full Code:

```javascript
function generateReport() {
  console.log("\n" + "=".repeat(65));
  console.log("         STAGE 3 — LIBRARY STATISTICS REPORT");
  console.log("=".repeat(65));

  const books = [...catalogue.values()];

  // 1. Overall stats
  const totalCopies    = books.reduce((s, b) => s + b.copies,  0);
  const totalBorrowed  = books.reduce((s, b) => s + b.borrowed, 0);
  const available      = totalCopies - totalBorrowed;
  const utilizationPct = ((totalBorrowed / totalCopies) * 100).toFixed(1);

  console.log(`\nCollection: ${catalogue.size} titles | ${totalCopies} total copies`);
  console.log(`Borrowed  : ${totalBorrowed} | Available: ${available} | Utilisation: ${utilizationPct}%`);

  // 2. By genre using groupBy
  const byGenre = Map.groupBy([...catalogue.entries()], ([, b]) => b.genre);

  console.log("\n--- By Genre ---");
  for (const [genre, entries] of byGenre) {
    const totalInGenre    = entries.reduce((s, [, b]) => s + b.copies,  0);
    const borrowedInGenre = entries.reduce((s, [, b]) => s + b.borrowed, 0);
    const pct = ((borrowedInGenre / totalInGenre) * 100).toFixed(0);
    console.log(`  ${genre.padEnd(12)}: ${entries.length} titles | ${borrowedInGenre}/${totalInGenre} borrowed (${pct}%)`);
  }

  // 3. Most borrowed books (top 3)
  const ranked = [...catalogue.entries()]
    .toSorted(([, a], [, b]) => b.borrowed - a.borrowed)
    .slice(0, 3);

  console.log("\n--- Top 3 Most Borrowed ---");
  ranked.forEach(([isbn, b], i) => {
    const pct = ((b.borrowed / b.copies) * 100).toFixed(0);
    console.log(`  ${i + 1}. "${b.title}" — ${b.borrowed}/${b.copies} copies out (${pct}%)`);
  });

  // 4. Fully available books
  const fullyFree = [...catalogue.values()].filter(b => b.borrowed === 0);
  console.log(`\n--- Fully Available (${fullyFree.length} titles) ---`);
  fullyFree.forEach(b => console.log(`  📗 ${b.title}`));

  // 5. Fully borrowed books
  const fullyOut = [...catalogue.values()].filter(b => b.borrowed >= b.copies);
  console.log(`\n--- Fully Borrowed Out (${fullyOut.length} titles) ---`);
  fullyOut.forEach(b => console.log(`  📕 ${b.title}`));

  // 6. Keys list (all ISBNs)
  console.log(`\n--- All ISBNs (insertion order, via map.keys()) ---`);
  let i = 1;
  for (const isbn of catalogue.keys()) {
    console.log(`  ${i++}. ${isbn}`);
  }

  console.log("\n" + "=".repeat(65));
}

generateReport();
```

**▶ Expected Output (sample):**
```
=================================================================
         STAGE 3 — LIBRARY STATISTICS REPORT
=================================================================

Collection: 8 titles | 24 total copies
Borrowed  : 13 | Available: 11 | Utilisation: 54.2%

--- By Genre ---
  Fiction     : 4 titles | 5/10 borrowed (50%)
  Dystopia    : 2 titles | 4/5 borrowed (80%)
  History     : 1 titles | 3/5 borrowed (60%)
  Self-Help   : 1 titles | 4/4 borrowed (100%)

--- Top 3 Most Borrowed ---
  1. "Atomic Habits" — 4/4 copies out (100%)
  2. "Sapiens" — 3/5 copies out (60%)
  3. "The Catcher in the Rye" — 2/2 copies out (100%)

--- Fully Available (2 titles) ---
  📗 To Kill a Mockingbird
  📗 To Kill Again

--- Fully Borrowed Out (2 titles) ---
  📕 The Catcher in the Rye
  📕 Atomic Habits

--- All ISBNs (insertion order, via map.keys()) ---
  1. 978-0-06-112008-4
  2. 978-0-14-028329-7
  ...
=================================================================
```

**Reflection questions:**
- Why is Map better than a plain object for the `catalogue`? What would break if you used `{}` instead?
- Why is `WeakMap` used for `_fineData` instead of a regular `Map`? What happens to the fine data when a borrower object is no longer referenced anywhere?
- How does `Map.groupBy()` simplify the genre statistics compared to writing a `reduce()` manually?
- Why does `activeLoans` use a string loanId as a key while `_fineData` uses a borrower object as a key?
- What is the difference between iterating `catalogue.keys()` vs `catalogue.values()` vs `catalogue.entries()`?

**Optional advanced features:**
- Add a `reservations` Map (`isbn → [queue of borrowers]`) so borrowers can join a waitlist for fully-borrowed books
- Add overdue detection — compare `dueDate` from `activeLoans` against today's date and auto-fine overdue borrowers
- Convert the catalogue Map to JSON for "saving" and back to a Map on "loading" using `Object.fromEntries` and `new Map(Object.entries(...))`
- Use `Map.groupBy()` to group active loans by borrower and show each borrower's current loans in one view

---
---

## 8. Completion Checklist

- ✅ I understand what a Map is — an ordered collection of key-value pairs where keys can be **any type**.
- ✅ I know the 5 reasons to use Map over a plain object: any key type, guaranteed order, instant `.size`, direct iteration, and no prototype pollution.
- ✅ I can create a Map three ways: `new Map()`, from a `[[k,v]]` entries array, and from `Object.entries(obj)`.
- ✅ I know Maps use **reference equality** for object keys — two objects with the same content are different keys.
- ✅ I can use all core Map methods: `set()` (chainable), `get()`, `has()`, `delete()`, `clear()`.
- ✅ I know to use `has()` to check existence — NOT `if (map.get(key))` — because values can be falsy (`0`, `false`, `""`).
- ✅ I can iterate a Map using `for...of`, `forEach(value, key)`, `.keys()`, `.values()`, and `.entries()`.
- ✅ I understand `forEach` receives `(value, key)` — **value first, key second**.
- ✅ I can convert Map ↔ Array (`[...map]`), Map ↔ Object (`Object.fromEntries`, `Object.entries`).
- ✅ I can use `Map.groupBy(iterable, keyFn)` to group array data by a computed key.
- ✅ I understand what a WeakMap is — stores **object keys only**, holds them **weakly** (allows garbage collection).
- ✅ I know WeakMap's four methods: `set`, `get`, `has`, `delete` — and that it has NO `size`, `clear`, or iteration.
- ✅ I know the three real-world WeakMap patterns: private class data, computation caching, and DOM element metadata.
- ✅ I can explain the difference between Map and WeakMap, and between Map and plain Object, and choose the right one.
- ✅ I completed all three exercises and the three-stage mini project.
- ✅ I can explain how Maps are used in real-world apps: directories, frequency counters, caches, grouped reports, and configuration stores.

---

### 📌 One-Sentence Summary of Each Topic

**Maps:** A Map is an ordered key-value collection where keys can be any JavaScript value — not just strings — with a guaranteed `.size`, direct iterability, and no prototype pollution from inherited properties.

**Map Methods:** Maps have five core methods (`set`, `get`, `has`, `delete`, `clear`), three iterators (`keys`, `values`, `entries`), `forEach(value, key)`, and the static `Map.groupBy()` for grouping arrays — all operating on any key type in insertion order.

**WeakMap:** A WeakMap only accepts objects as keys, holds them weakly so the garbage collector can reclaim them, and intentionally provides no `size`, `clear`, or iteration — making it ideal for private object data, memoisation caches, and DOM metadata without memory leaks.

**Reference:** The complete Map API covers creation from entries/objects, 9 instance methods, 1 static method, and conversions to/from arrays and objects — while WeakMap provides only 4 methods and no properties, by design.

---

> 📘 *Built from W3Schools.com — `js_maps` | `js_map_methods` | `js_maps_weak` | `js_map_reference`*
> *Framework: Understand → Practice → Create*
