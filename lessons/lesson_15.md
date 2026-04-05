---
render_with_liquid: false
title: "JavaScript Sets: Unique Values · Set Methods · Set Logic (Union/Intersection/Difference) · WeakSet · Full Reference"
nav_order: 15
---

## 📑 Table of Contents
1. [Background: Why Sets Exist](#1-background-why-sets-exist)
2. [Topic 1 — Sets: Basics & Creation](#2-topic-1--sets-basics--creation)
3. [Topic 2 — Set Methods](#3-topic-2--set-methods)
4. [Topic 3 — Set Logic (Union, Intersection, Difference, and more)](#4-topic-3--set-logic)
5. [Topic 4 — WeakSet](#5-topic-4--weakset)
6. [Topic 5 — Complete Set Reference](#6-topic-5--complete-set-reference)
7. [Applied Exercises](#7-applied-exercises)
8. [Mini Project — Attendance & Permission Tracker](#8-mini-project--attendance--permission-tracker)
9. [Completion Checklist](#9-completion-checklist)

---

## 1. Background: Why Sets Exist

Imagine you run a school event. Students scan their ID to enter. Some students try to scan twice. You only want to count each student **once**.

With a regular array this is painful:

```javascript
// ❌ With an array — you must manually check for duplicates
const attended = [];

function recordAttendance(id) {
  if (!attended.includes(id)) {   // ← extra check every time
    attended.push(id);
  }
}

recordAttendance("S001");
recordAttendance("S002");
recordAttendance("S001"); // duplicate — must be blocked manually

console.log(attended); // ["S001", "S002"]
```

With a **Set**, duplicates are blocked automatically:

```javascript
// ✅ With a Set — duplicates ignored automatically
const attended = new Set();

attended.add("S001");
attended.add("S002");
attended.add("S001"); // duplicate — silently ignored!

console.log(attended.size); // 2
console.log(attended);      // Set(2) { "S001", "S002" }
```

A **Set** is a collection that stores **unique values only**. Every value in a Set appears exactly once — adding the same value a second time simply does nothing.

### Key Differences: Set vs Array

| Feature | Array | Set |
|---------|-------|-----|
| Allows duplicates | ✅ Yes | ❌ No (unique only) |
| Keeps insertion order | ✅ Yes | ✅ Yes |
| Index-based access | ✅ `arr[2]` | ❌ No index access |
| Fast `has()` check | ❌ O(n) scan | ✅ O(1) hash lookup |
| Iteration | ✅ `for`, `forEach`, `map`... | ✅ `for...of`, `forEach` |
| `size` / `length` | `.length` | `.size` |
| Built-in maths (union, etc.) | ❌ Manual only | ✅ Native methods |

> 💡 **TIP:** Think of a Set like a guest list at a club — each name appears only once. No matter how many times the same person knocks, they are only counted once.

> 🏢 **REAL WORLD:** Sets are used for: tracking which users have viewed a post, storing unique tags on a blog article, removing duplicates from search results, permission systems (a user either has a permission or doesn't), and implementing mathematical set operations on data.

---
---

## 2. Topic 1 — Sets: Basics & Creation

> **Phase 1 — Conceptual Understanding**

### Creating a Set

Use the `new Set()` constructor. You can pass any **iterable** (array, string, another Set) to initialise it.

```javascript
// Empty Set
const s1 = new Set();
console.log(s1); // Set(0) {}

// From an array — duplicates are removed automatically
const s2 = new Set([1, 2, 3, 2, 1, 4]);
console.log(s2); // Set(4) { 1, 2, 3, 4 }

// From a string — each CHARACTER becomes an element
const s3 = new Set("HELLO");
console.log(s3); // Set(4) { "H", "E", "L", "O" }
// "L" appeared twice but is stored only once!

// From another Set
const s4 = new Set(s2);
console.log(s4); // Set(4) { 1, 2, 3, 4 }
```

**▶ Expected Output:**
```
Set(0) {}
Set(4) { 1, 2, 3, 4 }
Set(4) { "H", "E", "L", "O" }
Set(4) { 1, 2, 3, 4 }
```

> 🤔 **THINK ABOUT IT:** `new Set("HELLO")` gives `{"H", "E", "L", "O"}` — 4 elements, not 5. Why? Because "L" appears at position 2 and 3, but a Set only keeps one copy. Can you predict what `new Set("MISSISSIPPI").size` equals?
> Answer: `new Set("MISSISSIPPI")` → `{ "M", "I", "S", "P" }` → size 4.

---

### The `size` Property

`size` is the Set equivalent of `length` in arrays. It always reflects the count of **unique** values.

```javascript
const fruits = new Set(["Apple", "Banana", "Mango", "Apple", "Banana"]);

console.log(fruits.size); // 3  ← only 3 unique values
```

> ⚠️ **WATCH OUT:** Sets use `.size`, not `.length`. Calling `.length` on a Set returns `undefined`.
> ```javascript
> const s = new Set([1, 2, 3]);
> console.log(s.size);   // 3   ✅
> console.log(s.length); // undefined ❌
> ```

---

### What Types Can a Set Store?

A Set can store **any JavaScript value** — primitives AND objects:

```javascript
const mixed = new Set();

mixed.add(42);
mixed.add("hello");
mixed.add(true);
mixed.add(null);
mixed.add(undefined);
mixed.add({ name: "Amara" }); // objects by reference
mixed.add([1, 2, 3]);         // arrays by reference

console.log(mixed.size); // 7
```

---

### Sets and Object Identity

For **objects and arrays**, Sets use **reference equality** — two objects with the same content are treated as different if they are not the same reference in memory.

```javascript
const s = new Set();

const obj1 = { name: "Alice" };
const obj2 = { name: "Alice" }; // same content, DIFFERENT reference!
const obj3 = obj1;              // SAME reference as obj1

s.add(obj1);
s.add(obj2); // Added! (different reference)
s.add(obj3); // NOT added (same reference as obj1)

console.log(s.size); // 2 — obj1 and obj2 (obj3 is same as obj1)
```

**▶ Expected Output:** `2`

> 🐛 **COMMON MISTAKE:** `new Set([{a:1}, {a:1}]).size` returns `2`, not `1`. Objects are compared by reference (are they the *same object in memory*?), not by content. If you want unique objects by content, you need to compare serialised strings like `JSON.stringify(obj)`.

---

### Iterating a Set

Sets are **iterable** — you can loop through them in several ways. They always iterate in **insertion order**.

#### `for...of`:
```javascript
const fruits = new Set(["Apple", "Banana", "Mango"]);

for (const fruit of fruits) {
  console.log(fruit);
}
```

**▶ Expected Output:**
```
Apple
Banana
Mango
```

#### `forEach(value, value, set)`:
```javascript
fruits.forEach((value) => {
  console.log(value);
});
```

> 💡 **TIP:** Notice the `forEach` callback receives `(value, value, set)` — the first and second arguments are BOTH the value (not index + value like arrays). This is intentional: Sets have no index concept, so the key IS the value to stay consistent with `Map`'s `forEach(value, key, map)` signature.

#### Spread into an Array (very common pattern):
```javascript
const fruitsArray = [...fruits];
console.log(fruitsArray); // ["Apple", "Banana", "Mango"]
```

#### Using `Array.from()`:
```javascript
const fruitsArray2 = Array.from(fruits);
console.log(fruitsArray2); // ["Apple", "Banana", "Mango"]
```

> 🏢 **REAL WORLD:** Converting a Set to an array (`[...mySet]`) is the standard way to use Set as a step in a pipeline — e.g. `[...new Set(arr)]` is the most common one-liner to **deduplicate an array** in modern JavaScript.

---

### The Fastest Way to Deduplicate an Array

```javascript
const raw = [1, 2, 3, 2, 4, 1, 5, 3];

// One-liner deduplication using Set + spread
const unique = [...new Set(raw)];
console.log(unique); // [1, 2, 3, 4, 5]

// Deduplicate an array of strings
const tags = ["js", "web", "js", "html", "css", "web", "js"];
const uniqueTags = [...new Set(tags)];
console.log(uniqueTags); // ["js", "web", "html", "css"]
```

**▶ Expected Output:**
```
[1, 2, 3, 4, 5]
["js", "web", "html", "css"]
```

> 🏢 **REAL WORLD:** `[...new Set(arr)]` is one of the most commonly used JavaScript one-liners in professional code. It appears in React component rendering, API data deduplication, and tag/keyword processing everywhere.

---
---

## 3. Topic 2 — Set Methods

> **Phase 1 — Conceptual Understanding**

Sets have a focused, clean API. Every method has one clear job.

---

### `add(value)` — Add a Value

Adds a value to the Set. If the value already exists, nothing happens. Returns the **Set itself** (allowing chaining).

```javascript
const s = new Set();

s.add(1);
s.add(2);
s.add(3);
s.add(2); // duplicate — silently ignored
s.add(1); // duplicate — silently ignored

console.log(s);      // Set(3) { 1, 2, 3 }
console.log(s.size); // 3
```

**▶ Expected Output:**
```
Set(3) { 1, 2, 3 }
3
```

#### Chaining `add()` calls:

Because `add()` returns the Set itself, you can chain:

```javascript
const s = new Set();
s.add(10).add(20).add(30).add(20); // 20 is a duplicate

console.log(s); // Set(3) { 10, 20, 30 }
```

---

### `has(value)` — Check if a Value Exists

Returns `true` if the value is in the Set, `false` otherwise. This is **very fast** (O(1) hash lookup — doesn't have to scan every element like array `includes()`).

```javascript
const fruits = new Set(["Apple", "Banana", "Mango"]);

console.log(fruits.has("Banana")); // true
console.log(fruits.has("Kiwi"));   // false
```

**▶ Expected Output:**
```
true
false
```

> 💡 **TIP:** For large collections, `Set.has()` is significantly faster than `Array.includes()`. If you're checking membership frequently on a large list, convert it to a Set first.

**Performance comparison:**
```javascript
const bigArray = Array.from({ length: 100000 }, (_, i) => i);
const bigSet   = new Set(bigArray);

// Array.includes() — scans up to 100,000 elements (slow for last item)
console.time("array");
bigArray.includes(99999);
console.timeEnd("array"); // ~1–5ms

// Set.has() — instant hash lookup regardless of size
console.time("set");
bigSet.has(99999);
console.timeEnd("set"); // ~0.01ms
```

---

### `delete(value)` — Remove a Value

Removes a value from the Set. Returns `true` if the value existed and was removed, `false` if it wasn't found.

```javascript
const fruits = new Set(["Apple", "Banana", "Mango"]);

const wasRemoved = fruits.delete("Banana");
console.log(wasRemoved); // true
console.log(fruits);     // Set(2) { "Apple", "Mango" }

const notFound = fruits.delete("Kiwi");
console.log(notFound);   // false (wasn't in the Set)
console.log(fruits.size); // 2 (unchanged)
```

**▶ Expected Output:**
```
true
Set(2) { "Apple", "Mango" }
false
2
```

---

### `clear()` — Remove All Values

Removes **every** element from the Set. The Set still exists but is now empty.

```javascript
const fruits = new Set(["Apple", "Banana", "Mango"]);
console.log(fruits.size); // 3

fruits.clear();

console.log(fruits.size); // 0
console.log(fruits);      // Set(0) {}
```

**▶ Expected Output:**
```
3
0
Set(0) {}
```

---

### `values()` — Iterator of All Values

Returns an iterator object that yields each value in insertion order. You can use this directly in `for...of`.

```javascript
const fruits = new Set(["Apple", "Banana", "Mango"]);

const iterator = fruits.values();
console.log(iterator.next().value); // "Apple"
console.log(iterator.next().value); // "Banana"
console.log(iterator.next().value); // "Mango"
console.log(iterator.next().done);  // true (iterator exhausted)
```

More commonly used in `for...of`:

```javascript
for (const val of fruits.values()) {
  console.log(val);
}
// Apple
// Banana
// Mango
```

---

### `keys()` — Same as `values()` for Sets

For consistency with `Map`, Sets have a `keys()` method — but it behaves identically to `values()` since Sets have no separate keys.

```javascript
const fruits = new Set(["Apple", "Banana"]);

for (const key of fruits.keys()) {
  console.log(key); // "Apple", then "Banana"
}
```

---

### `entries()` — Iterator of [value, value] Pairs

Returns an iterator of `[value, value]` pairs — again for Map consistency. Both entries in each pair are the same value.

```javascript
const fruits = new Set(["Apple", "Banana", "Mango"]);

for (const [key, val] of fruits.entries()) {
  console.log(key, "→", val);
}
```

**▶ Expected Output:**
```
Apple → Apple
Banana → Banana
Mango → Mango
```

> 💡 **TIP:** You'll rarely use `entries()` on a Set directly. It exists so that code written for Maps can work with Sets too without modification.

---

### Summary: All Set Methods

| Method | What it does | Returns |
|--------|-------------|---------|
| `new Set(iterable?)` | Create a Set | Set |
| `.add(value)` | Add a value (no-op if exists) | The Set (chainable) |
| `.has(value)` | Check existence | Boolean |
| `.delete(value)` | Remove a value | Boolean (was it there?) |
| `.clear()` | Remove all values | `undefined` |
| `.values()` | Iterator of values | SetIterator |
| `.keys()` | Same as values() | SetIterator |
| `.entries()` | Iterator of [val, val] pairs | SetIterator |
| `.forEach(fn)` | Run function for each value | `undefined` |
| `.size` | Count of unique elements | Number |

---
---

## 4. Topic 3 — Set Logic

> **Phase 1 — Conceptual Understanding**

One of the most powerful features of the modern JavaScript Set (introduced in ES2025 as native methods, and achievable with custom logic before that) is the ability to perform **mathematical set operations**:

| Operation | Question It Answers | Example |
|-----------|-------------------|---------|
| **Union** | All elements from both sets | A ∪ B |
| **Intersection** | Elements in BOTH sets | A ∩ B |
| **Difference** | Elements in A but NOT in B | A − B |
| **Symmetric Difference** | Elements in ONE set but not both | A △ B |
| **isSubsetOf** | Is every element of A in B? | A ⊆ B |
| **isSupersetOf** | Does A contain all of B? | A ⊇ B |
| **isDisjointFrom** | Do A and B share no elements? | A ∩ B = ∅ |

> 🏢 **REAL WORLD:** These operations appear constantly in real apps: "which users have BOTH permissions A and B?" (intersection), "show all products from either category" (union), "which students enrolled last year but NOT this year?" (difference).

---

### Visual Understanding First

Before any code, let's visualise with two sets:

```
Set A = { 1, 2, 3, 4, 5 }
Set B = { 3, 4, 5, 6, 7 }

              ┌──────────────────────────┐
   ┌──────────┤                          ├──────────┐
   │  1  2    │       3   4   5          │  6   7   │
   │  (A only)│     (both A & B)         │ (B only) │
   └──────────┤                          ├──────────┘
              └──────────────────────────┘

Union A ∪ B        = { 1, 2, 3, 4, 5, 6, 7 }  (everything)
Intersection A ∩ B = { 3, 4, 5 }               (overlap only)
Difference A − B   = { 1, 2 }                   (A only)
Difference B − A   = { 6, 7 }                   (B only)
Symmetric Diff     = { 1, 2, 6, 7 }             (non-overlap)
```

---

### Native Set Methods (ES2025+)

Modern JavaScript now has these as **native Set methods**. Always use these when available:

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);
```

---

### `union(other)` — All Elements from Both Sets (A ∪ B)

Combines every element from both Sets into a new Set (no duplicates).

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);

const unionAB = A.union(B);
console.log(unionAB); // Set(7) { 1, 2, 3, 4, 5, 6, 7 }
```

**▶ Expected Output:** `Set(7) { 1, 2, 3, 4, 5, 6, 7 }`

> 🏢 **REAL WORLD:** A school wants to email all students enrolled in **either** maths **or** science. `mathStudents.union(scienceStudents)` gives the complete list with no duplicates.

---

### `intersection(other)` — Elements in BOTH Sets (A ∩ B)

Returns a new Set of only the elements that appear in **both** sets.

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);

const intersectAB = A.intersection(B);
console.log(intersectAB); // Set(3) { 3, 4, 5 }
```

**▶ Expected Output:** `Set(3) { 3, 4, 5 }`

> 🏢 **REAL WORLD:** Find users who have **both** the "admin" permission and the "editor" permission: `adminUsers.intersection(editorUsers)`.

---

### `difference(other)` — Elements in A but NOT in B (A − B)

Returns a new Set of elements that exist in the first set but are **absent from the second**.

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);

const diffAB = A.difference(B);  // In A but not B
const diffBA = B.difference(A);  // In B but not A

console.log(diffAB); // Set(2) { 1, 2 }
console.log(diffBA); // Set(2) { 6, 7 }
```

**▶ Expected Output:**
```
Set(2) { 1, 2 }
Set(2) { 6, 7 }
```

> ⚠️ **WATCH OUT:** `A.difference(B)` ≠ `B.difference(A)`. The order matters! The first set is the "source", the second is the "exclude" list.

> 🏢 **REAL WORLD:** "Which students attended last year but have NOT enrolled this year?" → `lastYearStudents.difference(thisYearStudents)`.

---

### `symmetricDifference(other)` — Elements in ONE but NOT BOTH (A △ B)

Returns a new Set of elements that are in **either** set but **not in both**. It is the opposite of intersection — everything that is NOT in the overlap.

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);

const symDiff = A.symmetricDifference(B);
console.log(symDiff); // Set(4) { 1, 2, 6, 7 }
```

**▶ Expected Output:** `Set(4) { 1, 2, 6, 7 }`

> 💡 **TIP:** Symmetric Difference is the same as `(A ∪ B) - (A ∩ B)` — the union minus the overlap. It tells you "what is exclusive to each set, excluding the shared parts".

> 🏢 **REAL WORLD:** "Which products changed between two inventory snapshots?" — items that were added OR removed (not the unchanged ones in both).

---

### `isSubsetOf(other)` — Is Every Element of A Found in B?

Returns `true` if **all** elements of the Set are also in the other Set.

```javascript
const A = new Set([3, 4]);
const B = new Set([1, 2, 3, 4, 5]);

console.log(A.isSubsetOf(B)); // true  — 3 and 4 are both in B
console.log(B.isSubsetOf(A)); // false — B has elements not in A
```

**▶ Expected Output:**
```
true
false
```

> 🏢 **REAL WORLD:** "Does this user have all the required permissions?" → `requiredPerms.isSubsetOf(userPerms)`.

---

### `isSupersetOf(other)` — Does A Contain ALL Elements of B?

The reverse of `isSubsetOf`. Returns `true` if A contains every element of B.

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4]);

console.log(A.isSupersetOf(B)); // true  — A contains all of B
console.log(B.isSupersetOf(A)); // false — B doesn't contain all of A
```

**▶ Expected Output:**
```
true
false
```

> 💡 **TIP:** `A.isSubsetOf(B)` is always the mirror of `B.isSupersetOf(A)`. They answer the same question from opposite sides.

---

### `isDisjointFrom(other)` — Do the Sets Share NO Common Elements?

Returns `true` if the two Sets have **zero elements in common** (empty intersection).

```javascript
const A = new Set([1, 2, 3]);
const B = new Set([4, 5, 6]);
const C = new Set([3, 4, 5]);

console.log(A.isDisjointFrom(B)); // true  — no shared elements
console.log(A.isDisjointFrom(C)); // false — 3 is in both
```

**▶ Expected Output:**
```
true
false
```

> 🏢 **REAL WORLD:** "Are these two product categories completely separate?" → `categoryA.isDisjointFrom(categoryB)`. If `true`, they share no products.

---

### Manual Implementations (for older environments without native methods)

If the native Set methods aren't available yet in your environment, here are the manual equivalents using spread and filter:

```javascript
const A = new Set([1, 2, 3, 4, 5]);
const B = new Set([3, 4, 5, 6, 7]);

// Union: spread both into a new Set
const union = new Set([...A, ...B]);
console.log([...union]); // [1, 2, 3, 4, 5, 6, 7]

// Intersection: keep elements of A that B also has
const intersection = new Set([...A].filter(x => B.has(x)));
console.log([...intersection]); // [3, 4, 5]

// Difference A - B: keep elements of A that B does NOT have
const difference = new Set([...A].filter(x => !B.has(x)));
console.log([...difference]); // [1, 2]

// Symmetric difference: elements in one but not both
const symDiff = new Set([
  ...[...A].filter(x => !B.has(x)),
  ...[...B].filter(x => !A.has(x))
]);
console.log([...symDiff]); // [1, 2, 6, 7]

// isSubset: every element of A is in B
const isSubset = [...A].every(x => B.has(x));
console.log(isSubset); // false

// isDisjoint: no element of A is in B
const isDisjoint = [...A].every(x => !B.has(x));
console.log(isDisjoint); // false
```

---

### All Set Logic Methods at a Glance

```javascript
const A = new Set(["Alice", "Bob", "Carol"]);
const B = new Set(["Bob", "Carol", "David"]);

console.log([...A.union(B)]);                // ["Alice","Bob","Carol","David"]
console.log([...A.intersection(B)]);         // ["Bob","Carol"]
console.log([...A.difference(B)]);           // ["Alice"]
console.log([...B.difference(A)]);           // ["David"]
console.log([...A.symmetricDifference(B)]); // ["Alice","David"]
console.log(A.isSubsetOf(B));               // false
console.log(A.isSupersetOf(new Set(["Bob","Carol"]))); // true
console.log(A.isDisjointFrom(new Set(["X","Y"])));     // true
```

---
---

## 5. Topic 4 — WeakSet

> **Phase 1 — Conceptual Understanding**

A `WeakSet` is a special variant of Set with two important differences:

1. It can **only store objects** (not primitives like numbers or strings)
2. It holds its objects **weakly** — meaning the garbage collector can remove them from the WeakSet automatically if nothing else in the program holds a reference to that object

### What Does "Weakly Held" Mean?

Think of a regular Set like a strong grip — it holds onto objects and prevents them from being cleaned up. Think of a WeakSet like a sticky note — if the object it points to no longer exists anywhere else, the WeakSet's reference is automatically discarded. This prevents **memory leaks**.

```
Regular Set:
  Object ←──── strong reference ──── Set
  (Object CANNOT be garbage collected while Set exists)

WeakSet:
  Object ←──── weak reference ──── WeakSet
  (Object CAN be garbage collected even if WeakSet exists)
```

---

### Creating a WeakSet

```javascript
const ws = new WeakSet();

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

ws.add(obj1);
ws.add(obj2);
ws.add(obj1); // duplicate — ignored

console.log(ws.has(obj1)); // true
console.log(ws.has(obj2)); // true
```

**▶ Expected Output:**
```
true
true
```

---

### WeakSet Can ONLY Store Objects

```javascript
const ws = new WeakSet();

// ❌ Primitives are NOT allowed
try {
  ws.add(42);        // TypeError!
} catch (e) {
  console.log(e.message); // "Invalid value used in weak set"
}

try {
  ws.add("hello");   // TypeError!
} catch (e) {
  console.log(e.message);
}

// ✅ Only objects and arrays (which are objects)
ws.add({ id: 1 });
ws.add([1, 2, 3]);
ws.add(function() {}); // functions are objects too
```

---

### WeakSet Methods — Only Three!

WeakSet intentionally has a very limited API:

| Method | What it does | Returns |
|--------|-------------|---------|
| `.add(object)` | Add an object | The WeakSet |
| `.has(object)` | Check if object is in the set | Boolean |
| `.delete(object)` | Remove an object | Boolean |

> ⚠️ **WATCH OUT:** WeakSet has **NO** `size`, `clear()`, `forEach()`, or iteration methods. You cannot loop over a WeakSet or check how many items it contains. This is intentional — because the garbage collector may remove items at any time, the count would be unreliable.

```javascript
const ws = new WeakSet();
const obj = { name: "Test" };

ws.add(obj);
console.log(ws.has(obj));  // true

ws.delete(obj);
console.log(ws.has(obj));  // false

// ❌ These do NOT exist on WeakSet:
// ws.size       → undefined
// ws.clear()    → TypeError
// for...of ws   → TypeError (not iterable)
```

---

### Automatic Memory Cleanup — The Key Benefit

```javascript
let obj = { name: "Temporary" };
const ws = new WeakSet([obj]);

console.log(ws.has(obj)); // true

// When we clear the last reference to the object...
obj = null; // ← nothing else references the object now

// ...the garbage collector will eventually remove it from ws automatically
// ws.has(obj) → false (once GC runs)
```

> 💡 **TIP:** You cannot directly observe garbage collection in JavaScript — it happens automatically. The point is that WeakSet does NOT prevent it from happening, unlike regular Set.

---

### When to Use WeakSet — Practical Example

The most common real-world use of WeakSet is **tracking objects without preventing their cleanup**.

#### Example: Mark DOM elements that have been processed

```javascript
const processedElements = new WeakSet();

function processElement(el) {
  if (processedElements.has(el)) {
    console.log("Already processed, skipping");
    return;
  }
  // ... do processing ...
  processedElements.add(el);
  console.log("Processed:", el.id || "element");
}

// When a DOM element is removed from the page,
// processedElements automatically releases it — no memory leak!
```

#### Example: Track which objects have been validated

```javascript
const validated = new WeakSet();

function validate(user) {
  // Run expensive validation once, cache the result
  if (validated.has(user)) return true;

  const isValid = user.name && user.email; // simplified
  if (isValid) validated.add(user);
  return isValid;
}

const alice = { name: "Alice", email: "alice@example.com" };
console.log(validate(alice)); // true — runs full validation
console.log(validate(alice)); // true — returns cached result
```

> 🏢 **REAL WORLD:** WeakSet is used in JavaScript frameworks and libraries to track which components or DOM nodes have been "seen" or "processed" — without creating memory leaks when those components are destroyed.

---

### Set vs WeakSet — Full Comparison

| Feature | `Set` | `WeakSet` |
|---------|-------|-----------|
| Value types | Any (primitives + objects) | Objects ONLY |
| Holds references | Strongly (prevents GC) | Weakly (allows GC) |
| `size` property | ✅ Yes | ❌ No |
| Iterable (`for...of`) | ✅ Yes | ❌ No |
| `forEach()` | ✅ Yes | ❌ No |
| `clear()` | ✅ Yes | ❌ No |
| `add()` | ✅ Yes | ✅ Yes |
| `has()` | ✅ Yes | ✅ Yes |
| `delete()` | ✅ Yes | ✅ Yes |
| Use case | General unique value storage | Track objects without memory leaks |

---
---

## 6. Topic 5 — Complete Set Reference

> Quick reference for every Set and WeakSet feature.

---

### Set — Constructor

```javascript
new Set()                 // empty set
new Set(iterable)         // from array, string, another set, etc.
```

---

### Set — Properties

| Property | Type | Description |
|----------|------|-------------|
| `set.size` | Number | Count of unique elements |
| `set[Symbol.iterator]` | Function | Makes Set iterable in `for...of` |

---

### Set — Instance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `set.add(value)` | Set | Add value; no-op if exists |
| `set.has(value)` | Boolean | `true` if value is in set |
| `set.delete(value)` | Boolean | Remove value; `true` if found |
| `set.clear()` | `undefined` | Remove all values |
| `set.values()` | SetIterator | Iterate values |
| `set.keys()` | SetIterator | Same as `values()` |
| `set.entries()` | SetIterator | Iterate `[value, value]` pairs |
| `set.forEach(fn)` | `undefined` | Run `fn(value, value, set)` for each |

---

### Set — Logic Methods (ES2025 Native)

| Method | Returns | Description |
|--------|---------|-------------|
| `set.union(other)` | New Set | A ∪ B — all elements from both |
| `set.intersection(other)` | New Set | A ∩ B — only elements in both |
| `set.difference(other)` | New Set | A − B — in A but not B |
| `set.symmetricDifference(other)` | New Set | A △ B — in one but not both |
| `set.isSubsetOf(other)` | Boolean | Is every element of A in B? |
| `set.isSupersetOf(other)` | Boolean | Does A contain all of B? |
| `set.isDisjointFrom(other)` | Boolean | Do A and B share no elements? |

---

### Set — Common Conversion Patterns

```javascript
const s = new Set([1, 2, 3]);

// Set → Array
const arr1 = [...s];           // [1, 2, 3]
const arr2 = Array.from(s);    // [1, 2, 3]

// Array → Set (deduplicate)
const unique = new Set([1, 2, 2, 3, 3]); // Set { 1, 2, 3 }

// String → Set of unique characters
const chars = new Set("hello"); // Set { "h", "e", "l", "o" }
```

---

### WeakSet — Constructor

```javascript
new WeakSet()             // empty
new WeakSet(iterable)     // from iterable of objects
```

---

### WeakSet — Instance Methods (Only Three)

| Method | Returns | Description |
|--------|---------|-------------|
| `ws.add(object)` | WeakSet | Add an object (must be object) |
| `ws.has(object)` | Boolean | Check if object is in WeakSet |
| `ws.delete(object)` | Boolean | Remove object |

---

### Set Operation Quick Reference — Visual Summary

```
A = { 1, 2, 3, 4 }     B = { 3, 4, 5, 6 }

A.union(B)                     → { 1, 2, 3, 4, 5, 6 }
A.intersection(B)               → { 3, 4 }
A.difference(B)                 → { 1, 2 }
B.difference(A)                 → { 5, 6 }
A.symmetricDifference(B)       → { 1, 2, 5, 6 }
A.isSubsetOf(B)                 → false
new Set([3,4]).isSubsetOf(A)    → true
A.isSupersetOf(new Set([1,2]))  → true
A.isDisjointFrom(new Set([7]))  → true
A.isDisjointFrom(B)             → false  (3 and 4 are shared)
```

---
---

## 7. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Unique Value Enforcer 🔒

**Objective:** Practice creating Sets, using `add`, `has`, `delete`, and converting between Sets and arrays.

**Scenario:** You're building a **tag management system** for a blog platform. Tags must be unique, case-insensitive, and stored efficiently.

#### Warm-up Micro-Demo:

```javascript
const tags = new Set(["javascript", "web", "javascript", "css"]);
console.log("Tags:", [...tags]);  // ["javascript", "web", "css"]
console.log("Count:", tags.size); // 3
```

**▶ Expected Output:**
```
Tags: ["javascript", "web", "css"]
Count: 3
```

#### Task A — Build the Tag System

```javascript
// Normalise tag: lowercase and trimmed
function normaliseTag(tag) {
  return tag.trim().toLowerCase();
}

class TagManager {
  constructor() {
    this.tags = new Set();
  }

  addTag(tag) {
    const normalised = normaliseTag(tag);
    if (this.tags.has(normalised)) {
      console.log(`"${normalised}" already exists`);
      return false;
    }
    this.tags.add(normalised);
    console.log(`Added: "${normalised}"`);
    return true;
  }

  removeTag(tag) {
    const normalised = normaliseTag(tag);
    const removed = this.tags.delete(normalised);
    console.log(removed ? `Removed: "${normalised}"` : `"${normalised}" not found`);
    return removed;
  }

  hasTag(tag) {
    return this.tags.has(normaliseTag(tag));
  }

  getAll() {
    return [...this.tags].sort();
  }
}

const manager = new TagManager();
manager.addTag("JavaScript");
manager.addTag("  CSS  ");      // spaces trimmed
manager.addTag("javascript");   // duplicate (normalised)
manager.addTag("React");
manager.addTag("css");          // duplicate after normalise

console.log("\nAll tags:", manager.getAll());
console.log("Has 'react':", manager.hasTag("React"));

manager.removeTag("CSS");
console.log("After removal:", manager.getAll());
```

**Expected Output:**
```
Added: "javascript"
Added: "css"
"javascript" already exists
Added: "react"
"css" already exists

All tags: ["css", "javascript", "react"]
Has 'react': true
Removed: "css"
After removal: ["javascript", "react"]
```

**Self-check questions:**
- Why is `Set.has()` preferred over `Array.includes()` for this use case?
- What would happen if we used an array instead of a Set for `this.tags`?
- Why do we normalise tags before adding them?

---

### Exercise 2 — Set Logic Challenge 🔢

**Objective:** Practice all six set logic operations on real-world data.

**Scenario:** You work at a **university**. Three subject sets exist: students enrolled in Maths, Computer Science, and Physics.

#### Warm-up Micro-Demo:

```javascript
const mathsClass = new Set(["Alice", "Bob", "Carol"]);
const scienceClass = new Set(["Bob", "Carol", "David"]);

const both = mathsClass.intersection(scienceClass);
console.log("In both:", [...both]); // ["Bob", "Carol"]
```

#### Task A — Enrolment Analysis

```javascript
const maths = new Set(["Alice", "Bob",   "Carol", "David", "Eve"  ]);
const cs    = new Set(["Bob",   "Carol", "Frank", "Grace", "Henry"]);
const phys  = new Set(["Carol", "David", "Grace", "Ivan",  "Alice"]);

// 1. All students across all subjects
const allStudents = maths.union(cs).union(phys);
console.log("All students :", allStudents.size, "→", [...allStudents].sort());

// 2. Students in BOTH Maths AND CS
const mathsAndCS = maths.intersection(cs);
console.log("Maths & CS   :", [...mathsAndCS]);

// 3. Students in ALL THREE subjects
const allThree = maths.intersection(cs).intersection(phys);
console.log("All three    :", [...allThree]);

// 4. Students ONLY in Maths (not CS, not Physics)
const mathsOnly = maths.difference(cs).difference(phys);
console.log("Maths only   :", [...mathsOnly]);

// 5. Students in Maths OR CS but NOT both
const mathsOrCSExclusive = maths.symmetricDifference(cs);
console.log("Maths XOR CS :", [...mathsOrCSExclusive].sort());

// 6. Is {Bob, Carol} a subset of maths?
const checkSubset = new Set(["Bob", "Carol"]);
console.log("Bob+Carol ⊆ Maths:", checkSubset.isSubsetOf(maths)); // true

// 7. Are Maths and Physics disjoint?
console.log("Maths ∩ Phys = ∅:", maths.isDisjointFrom(phys)); // false (Alice, David, Carol overlap)
```

**Expected Output:**
```
All students : 10 → ["Alice","Bob","Carol","David","Eve","Frank","Grace","Henry","Ivan"]
Maths & CS   : ["Bob", "Carol"]
All three    : ["Carol"]
Maths only   : ["Eve"]
Maths XOR CS : ["Alice","David","Eve","Frank","Grace","Henry"]
Bob+Carol ⊆ Maths: true
Maths ∩ Phys = ∅: false
```

**Self-check questions:**
- What is the difference between `difference()` and `symmetricDifference()`?
- Why is `A.isSubsetOf(B)` the mirror of `B.isSupersetOf(A)`?
- What does it mean for two sets to be "disjoint"?

---

### Exercise 3 — WeakSet Validator ♻️

**Objective:** Practice creating and using a WeakSet to track object state without memory leaks.

**Scenario:** You're building a **form validation system**. Each form section is an object. You want to track which sections have been validated without keeping references that prevent cleanup.

#### Warm-up Micro-Demo:

```javascript
const validatedSections = new WeakSet();
const section = { id: "personal", filled: true };

validatedSections.add(section);
console.log(validatedSections.has(section)); // true
```

#### Task A — Section Validation Tracker

```javascript
const validatedSections = new WeakSet();
const validationErrors  = new WeakSet();

function validateSection(section) {
  if (validatedSections.has(section)) {
    return { cached: true, valid: !validationErrors.has(section) };
  }

  // Simulate validation: all required fields must be non-empty
  const isValid = section.fields.every(f => f.value.trim() !== "");

  validatedSections.add(section);
  if (!isValid) validationErrors.add(section);

  return { cached: false, valid: isValid };
}

const nameSection = {
  id: "name",
  fields: [{ name: "firstName", value: "Alice" }, { name: "lastName", value: "Smith" }]
};
const emailSection = {
  id: "email",
  fields: [{ name: "email", value: "" }] // empty!
};
const addressSection = {
  id: "address",
  fields: [{ name: "street", value: "123 Main St" }, { name: "city", value: "Lagos" }]
};

let result;

result = validateSection(nameSection);
console.log(`Name    : valid=${result.valid}, cached=${result.cached}`);

result = validateSection(emailSection);
console.log(`Email   : valid=${result.valid}, cached=${result.cached}`);

result = validateSection(nameSection); // second call — should be cached
console.log(`Name(2) : valid=${result.valid}, cached=${result.cached}`);

result = validateSection(addressSection);
console.log(`Address : valid=${result.valid}, cached=${result.cached}`);

// Check if all three sections passed
const sections = [nameSection, emailSection, addressSection];
const allValid = sections.every(s => !validationErrors.has(s));
console.log("\nForm ready to submit:", allValid);

// WeakSet characteristics
console.log("\nWeakSet has no size:", typeof validatedSections.size); // undefined
```

**Expected Output:**
```
Name    : valid=true, cached=false
Email   : valid=false, cached=false
Name(2) : valid=true, cached=true
Address : valid=true, cached=false

Form ready to submit: false

WeakSet has no size: undefined
```

**Self-check questions:**
- Why can't WeakSet store primitive values like `42` or `"hello"`?
- What would happen if we used a regular Set instead of WeakSet here?
- Why does WeakSet have no `size` or `forEach`?

---
---

## 8. Mini Project — Attendance & Permission Tracker

> **Phase 3 — Project Simulation**

**Real-world scenario:** You are a developer at a school. Build an **Attendance & Permission Tracker** that:
- Uses `Set` to record daily student attendance (no duplicates)
- Computes attendance statistics using Set operations
- Uses Set logic to find students who are absent, early leavers, or have full attendance
- Uses `WeakSet` to track which student objects have been flagged for a follow-up call
- Generates a full attendance report

---

### 🔵 Stage 1 — Record Attendance

**Goal:** Use Sets to record morning and afternoon attendance rolls and compute who attended, who was absent, and who only attended half the day.

#### Simple stage preview:
```javascript
const morningRoll = new Set(["S001", "S002", "S003"]);
const afternoonRoll = new Set(["S002", "S003", "S004"]);

const fullDay = morningRoll.intersection(afternoonRoll);
console.log("Full day:", [...fullDay]); // ["S002", "S003"]
```

#### Stage 1 Full Code:

```javascript
"use strict";

// All registered students (IDs)
const allStudents = new Set([
  "S001","S002","S003","S004","S005",
  "S006","S007","S008","S009","S010"
]);

// Student info lookup (ID → name)
const studentInfo = {
  S001: "Amara Diallo",    S002: "Kwame Asante",
  S003: "Fatima Al-Rashid",S004: "Emeka Obi",
  S005: "Priya Sharma",    S006: "Omar Hassan",
  S007: "Sofia Martini",   S008: "Yuki Tanaka",
  S009: "Carlos Ruiz",     S010: "Aisha Nkosi",
};

// Morning and afternoon scans
const morningRoll   = new Set(["S001","S002","S003","S005","S006","S007","S008","S009"]);
const afternoonRoll = new Set(["S001","S002","S003","S005","S007","S009","S010"]);

// Compute attendance sets
const fullDayPresent   = morningRoll.intersection(afternoonRoll);
const morningOnlyLeft  = morningRoll.difference(afternoonRoll);   // left early
const afternoonOnly    = afternoonRoll.difference(morningRoll);   // arrived late
const fullyAbsent      = allStudents.difference(morningRoll.union(afternoonRoll));
const anyAttendance    = morningRoll.union(afternoonRoll);

console.log("=".repeat(50));
console.log("       STAGE 1 — ATTENDANCE SUMMARY");
console.log("=".repeat(50));
console.log(`Total registered  : ${allStudents.size}`);
console.log(`Full day          : ${fullDayPresent.size}`);
console.log(`Morning only      : ${morningOnlyLeft.size}`);
console.log(`Afternoon only    : ${afternoonOnly.size}`);
console.log(`Fully absent      : ${fullyAbsent.size}`);
console.log(`Any attendance    : ${anyAttendance.size}`);

console.log("\nFull day students:");
[...fullDayPresent].forEach(id => console.log("  ✅ " + studentInfo[id]));

console.log("\nAbsent students:");
[...fullyAbsent].forEach(id => console.log("  ❌ " + studentInfo[id]));
```

**▶ Expected Output:**
```
==================================================
       STAGE 1 — ATTENDANCE SUMMARY
==================================================
Total registered  : 10
Full day          : 7
Morning only      : 1
Afternoon only    : 1
Fully absent      : 2

Full day students:
  ✅ Amara Diallo
  ✅ Kwame Asante
  ✅ Fatima Al-Rashid
  ✅ Priya Sharma
  ✅ Sofia Martini
  ✅ Carlos Ruiz
  (... etc)

Absent students:
  ❌ (those fully absent)
```

---

### 🟢 Stage 2 — Permission Levels & Set Logic

**Goal:** Model permission groups for students (library access, lab access, sports team) and use Set logic to answer access questions.

#### Simple stage preview:
```javascript
const libAccess = new Set(["S001", "S002", "S003"]);
const labAccess = new Set(["S002", "S003", "S004"]);

// Who has both?
const bothAccess = libAccess.intersection(labAccess);
console.log("Both:", [...bothAccess]); // ["S002", "S003"]
```

#### Stage 2 Full Code:

```javascript
const libraryAccess = new Set(["S001","S002","S003","S005","S007","S009"]);
const labAccess     = new Set(["S002","S003","S004","S006","S008","S010"]);
const sportsTeam    = new Set(["S001","S003","S005","S007","S009"]);

const fullAccess   = libraryAccess.intersection(labAccess);           // both lib + lab
const anyAccess    = libraryAccess.union(labAccess);                   // either
const libOnlyAccess = libraryAccess.difference(labAccess);            // lib but not lab
const noAccess     = allStudents.difference(anyAccess);               // neither
const sportsLib    = sportsTeam.intersection(libraryAccess);          // sports + library
const sportsBothLab = sportsTeam.intersection(labAccess);            // sports + lab

console.log("\n" + "=".repeat(50));
console.log("       STAGE 2 — PERMISSION GROUPS");
console.log("=".repeat(50));

function printGroup(label, ids) {
  const names = [...ids].map(id => studentInfo[id]).sort();
  console.log(`\n${label} (${ids.size}):`);
  names.forEach(n => console.log("  → " + n));
}

printGroup("Library + Lab (full access)", fullAccess);
printGroup("Library only", libOnlyAccess);
printGroup("No permissions", noAccess);
printGroup("Sports team with Library", sportsLib);

// Subset / disjoint checks
console.log("\nPermission checks:");
console.log("Sports ⊆ Library  :", sportsTeam.isSubsetOf(libraryAccess));
console.log("Library ⊇ {S001,S002}:", libraryAccess.isSupersetOf(new Set(["S001","S002"])));
console.log("No-access ∩ Lab = ∅:", noAccess.isDisjointFrom(labAccess));
```

---

### 🟠 Stage 3 — Full Report with WeakSet Follow-Up Flags

**Goal:** Flag certain student objects for follow-up calls using `WeakSet`, then generate a full combined report.

#### Stage 3 Full Code:

```javascript
// Build student objects for WeakSet use
const studentObjects = {};
for (const id of allStudents) {
  studentObjects[id] = { id, name: studentInfo[id] };
}

// Use WeakSet to flag students for follow-up (absent students + no-access)
const flaggedForCall = new WeakSet();

// Flag fully absent students
for (const id of fullyAbsent) {
  flaggedForCall.add(studentObjects[id]);
  console.log(`📞 Flagged for call: ${studentInfo[id]} (absent)`);
}

// Flag students with no permissions at all
for (const id of noAccess) {
  if (!flaggedForCall.has(studentObjects[id])) {
    flaggedForCall.add(studentObjects[id]);
    console.log(`📞 Flagged for call: ${studentInfo[id]} (no permissions)`);
  }
}

// Full report
console.log("\n" + "=".repeat(55));
console.log("         FULL STUDENT REPORT — TODAY");
console.log("=".repeat(55));
console.log(`${"Name".padEnd(22)} ${"AM".padEnd(4)} ${"PM".padEnd(4)} ${"Lib".padEnd(4)} ${"Lab".padEnd(4)} Flag`);
console.log("-".repeat(55));

for (const id of [...allStudents].sort()) {
  const name      = studentInfo[id].padEnd(22);
  const am        = morningRoll.has(id)   ? "✅" : "❌";
  const pm        = afternoonRoll.has(id) ? "✅" : "❌";
  const lib       = libraryAccess.has(id) ? "✅" : "❌";
  const lab       = labAccess.has(id)     ? "✅" : "❌";
  const callFlag  = flaggedForCall.has(studentObjects[id]) ? "📞" : "  ";
  console.log(`${name} ${am}   ${pm}   ${lib}   ${lab}   ${callFlag}`);
}

console.log("=".repeat(55));
console.log(`\nAttendance rate: ${((anyAttendance.size / allStudents.size) * 100).toFixed(0)}%`);
console.log(`Full permissions: ${fullAccess.size} students`);
console.log(`Students needing follow-up: flagged in WeakSet`);
console.log("\nWeakSet note: no .size, no iteration — by design.");
```

**▶ Expected Output (sample):**
```
📞 Flagged for call: Aisha Nkosi (absent)
...

=======================================================
         FULL STUDENT REPORT — TODAY
=======================================================
Name                   AM   PM   Lib  Lab  Flag
-------------------------------------------------------
Aisha Nkosi            ❌   ✅   ❌   ✅    📞
Amara Diallo           ✅   ✅   ✅   ❌
Carlos Ruiz            ✅   ✅   ✅   ❌
Emeka Obi              ❌   ❌   ❌   ✅    📞
...
=======================================================

Attendance rate: 90%
Full permissions: 4 students
Students needing follow-up: flagged in WeakSet
WeakSet note: no .size, no iteration — by design.
```

**Reflection questions:**
- Why is using `Set` for attendance better than using an array?
- Why is `WeakSet` appropriate for `flaggedForCall` but not for `morningRoll`? What's the difference in use case?
- How would you extend this to store attendance over a whole week using a `Map` of Sets (one Set per day)?
- If a student object is deleted from `studentObjects`, what happens to their entry in `flaggedForCall`?
- Why does Set logic (`intersection`, `difference`) make attendance reporting easier than manually looping arrays?

**Optional advanced features:**
- Store a full week's attendance as `Map<dayName, Set<studentId>>` and compute weekly attendance percentage per student
- Build a `findConsistentAbsentees(week)` function: students absent more than 3 days using `reduce` on the week Map
- Use `symmetricDifference` to detect students whose permissions changed between two dates
- Add a `permissions` Set to each student object and use `isSubsetOf` to check access rights per door/resource

---
---

## 9. Completion Checklist

- ✅ I understand what a Set is — a collection of **unique values** with automatic duplicate prevention.
- ✅ I know the key differences between a Set and an Array — no duplicates, no index access, `.size` not `.length`, and O(1) `has()` lookups.
- ✅ I can create a Set using `new Set()`, from an array, from a string, and from another Set.
- ✅ I know the famous one-liner: `[...new Set(arr)]` to deduplicate an array.
- ✅ I understand Set uses **reference equality** for objects — two objects with identical content are different unless they are the same reference.
- ✅ I can use all four core Set methods: `add()`, `has()`, `delete()`, and `clear()`.
- ✅ I know that `add()` is **chainable** because it returns the Set itself.
- ✅ I can iterate a Set using `for...of`, `forEach()`, and converting to an array with spread `[...set]`.
- ✅ I understand `values()`, `keys()` (same as `values()`), and `entries()` (gives `[val, val]` pairs).
- ✅ I can perform all six Set logic operations: `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, `isDisjointFrom`.
- ✅ I know the manual (pre-ES2025) equivalents using spread + filter for Set operations.
- ✅ I understand what a WeakSet is — stores **objects only**, holds them **weakly** (allows garbage collection).
- ✅ I know WeakSet's three methods: `add()`, `has()`, `delete()` — and that it has NO `size`, no `forEach`, no iteration.
- ✅ I know WHEN to use a WeakSet — tracking objects without preventing their cleanup (e.g. processed DOM nodes, validated form sections).
- ✅ I completed all three exercises and the three-stage mini project.
- ✅ I can explain the real-world use cases for Sets: deduplication, permission systems, event attendance, tag management, and set mathematics on data.

---

### 📌 One-Sentence Summary of Each Topic

**Sets:** A Set is an ordered collection of unique values where duplicates are silently ignored — use it whenever you need to enforce uniqueness, check membership fast, or perform mathematical set operations.

**Set Methods:** Sets have four mutation methods (`add`, `delete`, `clear`) plus three iteration methods (`values`, `keys`, `entries`) — `add` is chainable, `has` is O(1), and there are no index-based methods.

**Set Logic:** Modern JavaScript Sets support seven native operations — `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`, and `isDisjointFrom` — which can also be built manually using spread and filter for older environments.

**WeakSet:** A WeakSet only stores objects, holds them weakly so the garbage collector can reclaim them, and intentionally has no size, no clear, and no iteration — making it ideal for tracking objects without causing memory leaks.

**Reference:** The complete Set API has 4 mutating methods, 3 iterators, 7 set-logic methods, and the `.size` property — while WeakSet has only 3 methods and no properties, by design.

---

> 📘 *Built from W3Schools.com — `js_sets` | `js_set_methods` | `js_set_logic` | `js_sets_weak` | `js_set_reference`*
> *Framework: Understand → Practice → Create*
