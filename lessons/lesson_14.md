---
title: "JavaScript Arrays: Creating · Accessing · Modifying · Searching · Sorting · Iterating Every Array"
nav_order: 14
---

## 📑 Table of Contents
1. [Background: What Is an Array?](#1-background-what-is-an-array)
2. [Topic 1 — Arrays: Basics & Creation](#2-topic-1--arrays-basics--creation)
3. [Topic 2 — Array const](#3-topic-2--array-const)
4. [Topic 3 — Array Methods (Modify & Transform)](#4-topic-3--array-methods-modify--transform)
5. [Topic 4 — Array Search Methods](#5-topic-4--array-search-methods)
6. [Topic 5 — Array Sort & Reverse](#6-topic-5--array-sort--reverse)
7. [Topic 6 — Array Iteration Methods](#7-topic-6--array-iteration-methods)
8. [Topic 7 — Complete Array Reference](#8-topic-7--complete-array-reference)
9. [Applied Exercises](#9-applied-exercises)
10. [Mini Project — Student Grade Analyser](#10-mini-project--student-grade-analyser)
11. [Completion Checklist](#11-completion-checklist)

---

## 1. Background: What Is an Array?

Imagine you're a teacher and you need to store the names of 30 students. Without arrays, you'd need 30 separate variables:

```javascript
// ❌ Without arrays — a nightmare
let student1 = "Amara";
let student2 = "Kwame";
let student3 = "Fatima";
// ... 27 more lines!
```

With an array, you store them all in **one variable**:

```javascript
// ✅ With an array — clean and manageable
const students = ["Amara", "Kwame", "Fatima", "Emeka", "Priya"];
```

An **array** is an ordered collection of values stored in a single variable. Each value (called an **element**) has a numbered position called an **index**, starting from **0**.

```
students = ["Amara", "Kwame", "Fatima", "Emeka", "Priya"]
              ↑         ↑        ↑         ↑        ↑
           index 0   index 1  index 2   index 3  index 4
```

### Why Arrays Are Essential

Arrays are one of the most important tools in programming. Almost every real application uses them:

| Real-World Use | Array Example |
|---------------|--------------|
| Shopping cart | `["Book", "Pen", "Bag"]` |
| Student gradebook | `[85, 92, 78, 95, 88]` |
| Menu items on a website | `["Home", "About", "Contact"]` |
| Search results | `["Result 1", "Result 2", "Result 3"]` |
| Photos in a gallery | Array of image URLs |
| Messages in a chat | Array of message objects |

> 🏢 **REAL WORLD:** Every time you see a list of products on Amazon, a feed of posts on Instagram, or a table of transactions in a bank app — that data is stored and processed as an array on the server.

---
---

## 2. Topic 1 — Arrays: Basics & Creation

> **Phase 1 — Conceptual Understanding**

### Creating an Array: Array Literal (Recommended)

The simplest and most common way to create an array is with square brackets `[]`:

```javascript
// Empty array
const empty = [];

// Array of strings
const fruits = ["Banana", "Apple", "Mango"];

// Array of numbers
const scores = [78, 92, 65, 88, 71];

// Array of mixed types (JavaScript allows this)
const mixed = ["Alice", 25, true, null];

// Multi-line (easier to read for long arrays)
const students = [
  "Amara",
  "Kwame",
  "Fatima",
  "Emeka"
];
```

> 💡 **TIP:** Always use the array literal `[]` to create arrays. Avoid `new Array()` — it behaves unexpectedly when passed a single number (explained below).

---

### Creating an Array: `new Array()` Constructor

```javascript
const fruits = new Array("Banana", "Apple", "Mango");
console.log(fruits); // ["Banana", "Apple", "Mango"]
```

> ⚠️ **WATCH OUT — The Single Number Trap:**
> ```javascript
> const a = new Array(3);    // Creates 3 EMPTY slots, NOT [3]!
> console.log(a);            // [empty × 3]
> console.log(a.length);     // 3
>
> const b = [3];             // Creates array containing the number 3
> console.log(b);            // [3]
> console.log(b.length);     // 1
> ```
> This is why array literal `[]` is always preferred.

---

### Accessing Elements by Index

Use square bracket notation `array[index]` to read any element. **Remember: first element is index 0, not 1!**

```javascript
const fruits = ["Banana", "Apple", "Mango"];

console.log(fruits[0]); // "Banana"  ← first element
console.log(fruits[1]); // "Apple"
console.log(fruits[2]); // "Mango"   ← last element
console.log(fruits[3]); // undefined ← index out of range
```

**▶ Expected Output:**
```
Banana
Apple
Mango
undefined
```

> 🐛 **COMMON MISTAKE:** `fruits[1]` is the SECOND element, not the first. Index 0 is always the first. This trips up every beginner at least once.

---

### Changing an Element

Use the same bracket notation to assign a new value:

```javascript
const fruits = ["Banana", "Apple", "Mango"];
console.log(fruits[0]); // "Banana"

fruits[0] = "Kiwi";    // Replace "Banana" with "Kiwi"
console.log(fruits[0]); // "Kiwi"
console.log(fruits);    // ["Kiwi", "Apple", "Mango"]
```

**▶ Expected Output:**
```
Banana
Kiwi
["Kiwi", "Apple", "Mango"]
```

---

### The `length` Property

`length` tells you how many elements are in the array. It is always **one more than the last index**.

```javascript
const fruits = ["Banana", "Apple", "Mango"];
console.log(fruits.length); // 3

// Access last element using length:
console.log(fruits[fruits.length - 1]); // "Mango"
```

**▶ Expected Output:**
```
3
Mango
```

> 💡 **TIP:** `fruits[fruits.length - 1]` is the classic way to get the last element. In modern JavaScript you can also use `fruits.at(-1)` (covered in Topic 3).

---

### Accessing the Last Element — Three Ways

```javascript
const fruits = ["Banana", "Apple", "Mango"];

// Way 1: length - 1
console.log(fruits[fruits.length - 1]); // "Mango"

// Way 2: at() with negative index (modern)
console.log(fruits.at(-1));             // "Mango"

// Way 3: at() is the same as bracket notation for positive indexes
console.log(fruits.at(0));              // "Banana"
console.log(fruits.at(-2));             // "Apple"
```

---

### Arrays Are Objects

In JavaScript, arrays are a special type of object. Their "keys" are the index numbers.

```javascript
const fruits = ["Banana", "Apple", "Mango"];
console.log(typeof fruits); // "object"

// You can check if something IS an array:
console.log(Array.isArray(fruits)); // true
console.log(Array.isArray("hello")); // false
```

> 🐛 **COMMON MISTAKE:** Don't use `typeof` to check if something is an array — it returns `"object"` for both arrays and regular objects. Always use `Array.isArray()`.

---

### Arrays Can Contain Objects and Other Arrays (Nested Arrays)

```javascript
// Array of objects — very common in real apps
const students = [
  { name: "Amara", score: 85 },
  { name: "Kwame", score: 92 },
  { name: "Fatima", score: 78 }
];

console.log(students[0].name);  // "Amara"
console.log(students[1].score); // 92

// Nested array (array of arrays)
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matrix[1][2]); // 6  (row 1, column 2)
```

**▶ Expected Output:**
```
Amara
92
6
```

> 🏢 **REAL WORLD:** API responses almost always return arrays of objects — e.g. `[{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]`. Knowing how to access `data[0].name` is essential for every web developer.

---

### `toString()` and `join()` — Convert Array to String

```javascript
const fruits = ["Banana", "Apple", "Mango"];

// toString() joins with commas
console.log(fruits.toString()); // "Banana,Apple,Mango"

// join() lets you choose the separator
console.log(fruits.join(", ")); // "Banana, Apple, Mango"
console.log(fruits.join(" | ")); // "Banana | Apple | Mango"
console.log(fruits.join(""));    // "BananaAppleMango"
```

**▶ Expected Output:**
```
Banana,Apple,Mango
Banana, Apple, Mango
Banana | Apple | Mango
BananaAppleMango
```

> 🏢 **REAL WORLD:** `join()` is used to display tags, categories, or lists of items in a UI: `tags.join(", ")` → `"JavaScript, React, Node.js"`.

---

### Identifying an Array

Three ways to check if a variable is an array:

```javascript
const fruits = ["Banana", "Apple"];

// Method 1: Array.isArray() — RECOMMENDED
console.log(Array.isArray(fruits)); // true

// Method 2: instanceof
console.log(fruits instanceof Array); // true

// Method 3: constructor check
console.log(fruits.constructor === Array); // true
```

---

### Looping Through an Array: `for` Loop

```javascript
const fruits = ["Banana", "Apple", "Mango"];

for (let i = 0; i < fruits.length; i++) {
  console.log(i + ": " + fruits[i]);
}
```

**▶ Expected Output:**
```
0: Banana
1: Apple
2: Mango
```

---

### `for...of` Loop (Modern, Clean)

```javascript
const fruits = ["Banana", "Apple", "Mango"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

**▶ Expected Output:**
```
Banana
Apple
Mango
```

> 💡 **TIP:** Use `for...of` when you just need each value. Use a regular `for` loop when you also need the index.

---
---

## 3. Topic 2 — Array `const`

> **Phase 1 — Conceptual Understanding**

Arrays are almost always declared with `const`. Understanding exactly what `const` means for arrays is crucial — it is one of the most misunderstood concepts for beginners.

### `const` Does NOT Make the Array Immutable!

`const` means the **variable binding cannot be reassigned** — you cannot point that variable name to a different array. But the **contents of the array can still be changed** freely.

Think of it like a labelled shelf. `const` means the label is permanently attached to this shelf. You cannot move the label to a different shelf. But you can freely add, remove, or rearrange items ON the shelf.

```javascript
const fruits = ["Banana", "Apple", "Mango"];

// ✅ ALLOWED — changing elements inside the array
fruits[0] = "Kiwi";
fruits.push("Orange");
fruits.pop();
console.log(fruits); // ["Kiwi", "Apple", "Mango"]

// ❌ NOT ALLOWED — reassigning the variable to a different array
// fruits = ["Strawberry"]; // TypeError: Assignment to constant variable
```

**▶ Expected Output:**
```
["Kiwi", "Apple", "Mango"]
```

---

### `const` Requires Initialisation

Unlike `let` and `var`, a `const` array **must be assigned a value when declared**. You cannot declare it empty and assign later.

```javascript
// ❌ WRONG — cannot declare const without value
// const fruits;
// fruits = ["Banana"]; // SyntaxError

// ✅ CORRECT — declare and assign together
const fruits = ["Banana", "Apple"];

// ✅ Also correct — empty array is still a value
const empty = [];
empty.push("Hello"); // This works! const just means no reassignment
```

---

### `const` vs `let` for Arrays

```javascript
// With const: cannot reassign
const a = [1, 2, 3];
a.push(4);    // ✅ fine — modifying contents
// a = [5, 6]; // ❌ TypeError

// With let: can reassign
let b = [1, 2, 3];
b.push(4);    // ✅ fine
b = [5, 6];   // ✅ also fine — let allows reassignment

console.log(a); // [1, 2, 3, 4]
console.log(b); // [5, 6]
```

**▶ Expected Output:**
```
[1, 2, 3, 4]
[5, 6]
```

---

### `const` Has Block Scope

Just like `let`, a `const` array declared inside a block `{}` is not accessible outside that block:

```javascript
{
  const fruits = ["Banana", "Apple"];
  console.log(fruits[0]); // "Banana" ✅
}
// console.log(fruits); // ❌ ReferenceError: fruits is not defined
```

---

### Best Practice: Always Use `const` for Arrays

Unless you specifically need to reassign the variable to a completely different array, always use `const`. It makes your code safer and communicates intent clearly.

```javascript
// ✅ BEST PRACTICE
const students = [];
students.push("Alice");
students.push("Bob");
console.log(students); // ["Alice", "Bob"]
```

> 🏢 **REAL WORLD:** In professional codebases and frameworks like React, `const` is used for virtually all array declarations. Seeing `let arr = []` signals that the variable might be completely replaced later, which is a useful distinction.

---
---

## 4. Topic 3 — Array Methods (Modify & Transform)

> **Phase 1 — Conceptual Understanding**

JavaScript arrays come with a rich set of built-in methods. This topic covers methods that **add, remove, or transform** elements. We split them into groups.

---

### Group A — Adding and Removing Elements

#### `push()` — Add to the End

Adds one or more elements to the **end** of the array. Returns the new length.

```javascript
const fruits = ["Banana", "Apple"];
const newLen = fruits.push("Mango");

console.log(fruits);  // ["Banana", "Apple", "Mango"]
console.log(newLen);  // 3
```

Add multiple at once:
```javascript
const fruits = ["Banana"];
fruits.push("Apple", "Mango", "Kiwi");
console.log(fruits); // ["Banana", "Apple", "Mango", "Kiwi"]
```

**▶ Expected Output:**
```
["Banana", "Apple", "Mango", "Kiwi"]
```

---

#### `pop()` — Remove from the End

Removes the **last** element and returns it.

```javascript
const fruits = ["Banana", "Apple", "Mango"];
const removed = fruits.pop();

console.log(removed); // "Mango"
console.log(fruits);  // ["Banana", "Apple"]
```

**▶ Expected Output:**
```
Mango
["Banana", "Apple"]
```

> 💡 **TIP:** `push()` and `pop()` work on the END of the array. Think of a stack of plates — you add (push) and remove (pop) from the top (end).

---

#### `unshift()` — Add to the Beginning

Adds one or more elements to the **start** of the array. Returns the new length.

```javascript
const fruits = ["Apple", "Mango"];
fruits.unshift("Banana");

console.log(fruits); // ["Banana", "Apple", "Mango"]
```

> ⚠️ **WATCH OUT:** `unshift()` is slower than `push()` for large arrays because every existing element must shift one position to the right.

---

#### `shift()` — Remove from the Beginning

Removes the **first** element and returns it.

```javascript
const fruits = ["Banana", "Apple", "Mango"];
const removed = fruits.shift();

console.log(removed); // "Banana"
console.log(fruits);  // ["Apple", "Mango"]
```

**▶ Expected Output:**
```
Banana
["Apple", "Mango"]
```

---

#### Summary: push/pop/shift/unshift

```
push    → Add to END        pop    → Remove from END
unshift → Add to START      shift  → Remove from START
```

```javascript
const arr = [2, 3, 4];
arr.push(5);     // [2, 3, 4, 5]
arr.pop();       // [2, 3, 4]
arr.unshift(1);  // [1, 2, 3, 4]
arr.shift();     // [2, 3, 4]
console.log(arr); // [2, 3, 4]
```

---

#### `delete` — Remove an Element (Leaves a Hole!)

```javascript
const fruits = ["Banana", "Apple", "Mango"];
delete fruits[1]; // ⚠️ Removes "Apple" but leaves an empty slot!

console.log(fruits);        // ["Banana", empty, "Mango"]
console.log(fruits[1]);     // undefined
console.log(fruits.length); // 3 ← length unchanged!
```

> 🐛 **COMMON MISTAKE:** `delete` leaves an empty hole in the array and does NOT reduce `length`. Always use `splice()` instead to remove elements properly.

---

### Group B — `splice()` — The Swiss Army Knife

`splice()` can **add, remove, or replace** elements at any position. It **modifies the original array** and returns an array of removed elements.

```javascript
// splice(startIndex, deleteCount, item1, item2, ...)
```

#### Remove Elements with `splice()`:

```javascript
const fruits = ["Banana", "Apple", "Mango", "Kiwi"];

// Remove 1 element at index 1
const removed = fruits.splice(1, 1);

console.log(removed); // ["Apple"]
console.log(fruits);  // ["Banana", "Mango", "Kiwi"]
```

**▶ Expected Output:**
```
["Apple"]
["Banana", "Mango", "Kiwi"]
```

#### Remove Multiple Elements:

```javascript
const fruits = ["Banana", "Apple", "Mango", "Kiwi", "Orange"];
const removed = fruits.splice(1, 3); // start at 1, remove 3

console.log(removed); // ["Apple", "Mango", "Kiwi"]
console.log(fruits);  // ["Banana", "Orange"]
```

#### Insert Elements (Remove 0, Add Items):

```javascript
const fruits = ["Banana", "Kiwi"];
fruits.splice(1, 0, "Apple", "Mango"); // at index 1, remove 0, add 2

console.log(fruits); // ["Banana", "Apple", "Mango", "Kiwi"]
```

**▶ Expected Output:**
```
["Banana", "Apple", "Mango", "Kiwi"]
```

#### Replace Elements:

```javascript
const fruits = ["Banana", "Apple", "Mango"];
fruits.splice(1, 1, "Strawberry"); // at index 1, remove 1, add "Strawberry"

console.log(fruits); // ["Banana", "Strawberry", "Mango"]
```

> 🏢 **REAL WORLD:** In a to-do app, when a user deletes task #3 from a list, you use `tasks.splice(2, 1)` (index 2 = 3rd item). When they insert a task at position 2, you use `tasks.splice(2, 0, newTask)`.

---

### Group C — `toSpliced()` — Splice Without Mutating (Modern)

`toSpliced()` is the **immutable version** of `splice()`. It returns a new array and does not change the original.

```javascript
const fruits = ["Banana", "Apple", "Mango", "Kiwi"];

// Remove 1 at index 1, add "Orange"
const newFruits = fruits.toSpliced(1, 1, "Orange");

console.log(fruits);    // ["Banana", "Apple", "Mango", "Kiwi"] ← unchanged!
console.log(newFruits); // ["Banana", "Orange", "Mango", "Kiwi"]
```

---

### Group D — `slice()` — Extract a Portion (Non-Destructive)

`slice(start, end)` extracts a section of the array into a **new array** without modifying the original. `end` is exclusive (not included).

```javascript
const fruits = ["Banana", "Apple", "Mango", "Kiwi", "Orange"];

// From index 1 to 3 (not including 3)
const sliced = fruits.slice(1, 3);

console.log(sliced); // ["Apple", "Mango"]
console.log(fruits); // ["Banana", "Apple", "Mango", "Kiwi", "Orange"] ← unchanged!
```

**▶ Expected Output:**
```
["Apple", "Mango"]
["Banana", "Apple", "Mango", "Kiwi", "Orange"]
```

```javascript
// From index 2 to end
console.log(fruits.slice(2));    // ["Mango", "Kiwi", "Orange"]

// Negative: from 2nd-to-last to end
console.log(fruits.slice(-2));   // ["Kiwi", "Orange"]

// Copy the whole array
const copy = fruits.slice();
console.log(copy); // ["Banana", "Apple", "Mango", "Kiwi", "Orange"]
```

> 💡 **TIP:** `splice()` MODIFIES the original array. `slice()` does NOT. A helpful memory trick: **splic**e = **splic**es up (cuts into) the original. **slic**e = takes a slice (copy) without touching the original.

> 🏢 **REAL WORLD:** Pagination — showing items 11–20 of a 100-item results array uses `results.slice(10, 20)`.

---

### Group E — `concat()` — Merge Arrays

`concat()` merges two or more arrays into a **new array**. It does not change the originals.

```javascript
const arr1 = ["Banana", "Apple"];
const arr2 = ["Mango", "Kiwi"];
const arr3 = ["Orange"];

const merged = arr1.concat(arr2, arr3);
console.log(merged); // ["Banana", "Apple", "Mango", "Kiwi", "Orange"]

// Original arrays unchanged:
console.log(arr1); // ["Banana", "Apple"]
console.log(arr2); // ["Mango", "Kiwi"]
```

**▶ Expected Output:**
```
["Banana", "Apple", "Mango", "Kiwi", "Orange"]
["Banana", "Apple"]
["Mango", "Kiwi"]
```

Can also concat individual values:
```javascript
const result = ["a", "b"].concat("c", "d", ["e", "f"]);
console.log(result); // ["a", "b", "c", "d", "e", "f"]
```

> 💡 **TIP:** Modern JavaScript also uses the **spread operator** `[...arr1, ...arr2]` to merge arrays — even cleaner:
> ```javascript
> const merged = [...arr1, ...arr2];
> ```

---

### Group F — `flat()` and `flatMap()`

#### `flat()` — Flatten Nested Arrays

`flat(depth)` creates a new array with sub-arrays flattened by `depth` levels (default = 1).

```javascript
const nested = [1, 2, [3, 4], [5, [6, 7]]];

console.log(nested.flat());    // [1, 2, 3, 4, 5, [6, 7]]  ← depth 1
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6, 7]    ← depth 2

// Flatten completely regardless of depth:
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7]
```

**▶ Expected Output:**
```
[1, 2, 3, 4, 5, [6, 7]]
[1, 2, 3, 4, 5, 6, 7]
[1, 2, 3, 4, 5, 6, 7]
```

> 🏢 **REAL WORLD:** When an API returns data grouped by category (array of arrays), `flat()` merges all groups into one list for easy searching or rendering.

---

#### `flatMap()` — Map Then Flatten (1 Level)

`flatMap()` is exactly like calling `.map()` followed by `.flat(1)`. It maps each element to a new value and then flattens one level.

```javascript
const sentences = ["Hello World", "Foo Bar"];

// map() gives nested arrays
const words1 = sentences.map(s => s.split(" "));
console.log(words1); // [["Hello", "World"], ["Foo", "Bar"]]

// flatMap() maps AND flattens
const words2 = sentences.flatMap(s => s.split(" "));
console.log(words2); // ["Hello", "World", "Foo", "Bar"]
```

**▶ Expected Output:**
```
[["Hello", "World"], ["Foo", "Bar"]]
["Hello", "World", "Foo", "Bar"]
```

---

### Group G — `fill()` — Fill with a Value

`fill(value, start, end)` fills elements with a static value. Modifies the original array.

```javascript
const arr = [1, 2, 3, 4, 5];

arr.fill(0);           // Fill everything with 0
console.log(arr);      // [0, 0, 0, 0, 0]

const arr2 = [1, 2, 3, 4, 5];
arr2.fill(9, 2, 4);   // Fill indices 2 and 3 with 9
console.log(arr2);     // [1, 2, 9, 9, 5]
```

**▶ Expected Output:**
```
[0, 0, 0, 0, 0]
[1, 2, 9, 9, 5]
```

---

### Group H — `copyWithin()` — Copy Elements Within the Array

`copyWithin(target, start, end)` copies elements from one position to another within the same array. Modifies the original.

```javascript
const arr = [1, 2, 3, 4, 5];

// Copy from index 3 to target index 0
arr.copyWithin(0, 3);
console.log(arr); // [4, 5, 3, 4, 5]
```

```javascript
const arr2 = ["a", "b", "c", "d", "e"];
arr2.copyWithin(1, 3, 5); // copy items at 3-4 to position 1
console.log(arr2); // ["a", "d", "e", "d", "e"]
```

---

### Group I — `at()` — Access by Index (Supports Negatives)

`at(index)` accesses an element by index. Negative values count from the end.

```javascript
const fruits = ["Banana", "Apple", "Mango", "Kiwi"];

console.log(fruits.at(0));   // "Banana"  — first
console.log(fruits.at(2));   // "Mango"
console.log(fruits.at(-1));  // "Kiwi"   — last
console.log(fruits.at(-2));  // "Mango"  — second from last
```

**▶ Expected Output:**
```
Banana
Mango
Kiwi
Mango
```

> 💡 **TIP:** `at(-1)` is cleaner than `arr[arr.length - 1]` for getting the last element.

---

### Group J — `Array.from()` — Create from Anything Iterable

`Array.from()` creates a new array from any iterable (string, Set, Map, NodeList, etc.) or array-like object.

```javascript
// From a string
const chars = Array.from("HELLO");
console.log(chars); // ["H", "E", "L", "L", "O"]

// From a Set
const unique = Array.from(new Set([1, 2, 2, 3, 3, 3]));
console.log(unique); // [1, 2, 3]

// With a mapping function
const numbers = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(numbers); // [1, 2, 3, 4, 5]
```

**▶ Expected Output:**
```
["H", "E", "L", "L", "O"]
[1, 2, 3]
[1, 2, 3, 4, 5]
```

> 🏢 **REAL WORLD:** `Array.from(document.querySelectorAll("p"))` converts a list of HTML elements (not a real array) into a true array so you can use `.map()`, `.filter()`, etc. on it.

---

### Group K — `with()` — Replace One Element Without Mutation (Modern)

`with(index, value)` returns a NEW array with one element replaced. The original is unchanged.

```javascript
const fruits = ["Banana", "Apple", "Mango"];

const updated = fruits.with(1, "Strawberry"); // Replace index 1

console.log(fruits);  // ["Banana", "Apple", "Mango"]  ← unchanged!
console.log(updated); // ["Banana", "Strawberry", "Mango"]
```

---

### Group L — `Array.of()` — Create Array from Arguments

Creates a new array from any number of arguments, regardless of type or count.

```javascript
const a = Array.of(7);           // [7]  ← unlike new Array(7) which creates 7 empty slots!
const b = Array.of(1, 2, 3);     // [1, 2, 3]
const c = Array.of("a", "b");    // ["a", "b"]

console.log(a); // [7]
console.log(b); // [1, 2, 3]
```

---
---

## 5. Topic 4 — Array Search Methods

> **Phase 1 — Conceptual Understanding**

Searching an array — finding whether an element exists, or finding its position — is extremely common. JavaScript provides many specialised search methods.

---

### `indexOf()` — Find First Position of a Value

Returns the **index** of the first occurrence of a value, or `-1` if not found.

```javascript
const fruits = ["Apple", "Banana", "Mango", "Banana", "Kiwi"];

console.log(fruits.indexOf("Banana"));     // 1  ← first occurrence
console.log(fruits.indexOf("Banana", 2));  // 3  ← start searching from index 2
console.log(fruits.indexOf("Orange"));     // -1 ← not found

// Common pattern — check if item exists:
if (fruits.indexOf("Mango") !== -1) {
  console.log("Mango found!");
}
```

**▶ Expected Output:**
```
1
3
-1
Mango found!
```

> ⚠️ **WATCH OUT:** `indexOf()` uses **strict equality** (`===`). It does not work for finding objects by content — use `findIndex()` for that.

---

### `lastIndexOf()` — Find Last Position of a Value

Returns the index of the **last** occurrence of a value.

```javascript
const fruits = ["Apple", "Banana", "Mango", "Banana", "Kiwi"];

console.log(fruits.lastIndexOf("Banana")); // 3  ← last occurrence
console.log(fruits.lastIndexOf("Orange")); // -1 ← not found
```

---

### `includes()` — Check If a Value Exists

Returns `true` or `false`. The simplest existence check.

```javascript
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits.includes("Mango"));   // true
console.log(fruits.includes("Orange"));  // false

// With a start position:
console.log(fruits.includes("Apple", 1)); // false ← Apple is at 0, not after 1
```

**▶ Expected Output:**
```
true
false
false
```

> 💡 **TIP:** Use `includes()` when you only need a yes/no answer. Use `indexOf()` when you also need to know *where* the element is.

---

### `find()` — Find the First Matching Element (By Condition)

`find()` runs a callback function on each element and returns the **first element that passes the test** (returns `true`). Returns `undefined` if none found.

```javascript
const scores = [45, 62, 78, 95, 55];

// Find the first score above 70
const firstHigh = scores.find(score => score > 70);
console.log(firstHigh); // 78

// Find a student object by name
const students = [
  { name: "Amara",  score: 85 },
  { name: "Kwame",  score: 92 },
  { name: "Fatima", score: 78 },
];

const found = students.find(s => s.name === "Kwame");
console.log(found); // { name: "Kwame", score: 92 }
```

**▶ Expected Output:**
```
78
{ name: "Kwame", score: 92 }
```

> 🏢 **REAL WORLD:** In an e-commerce app: `products.find(p => p.id === selectedId)` finds the product a user clicked on from a list.

---

### `findIndex()` — Find the Index of the First Matching Element

Just like `find()` but returns the **index** instead of the value. Returns `-1` if not found.

```javascript
const scores = [45, 62, 78, 95, 55];

const idx = scores.findIndex(score => score > 70);
console.log(idx); // 2  (index of 78)

const students = [
  { name: "Amara",  score: 85 },
  { name: "Kwame",  score: 92 },
  { name: "Fatima", score: 78 },
];

const idx2 = students.findIndex(s => s.name === "Fatima");
console.log(idx2); // 2
```

**▶ Expected Output:**
```
2
2
```

---

### `findLast()` — Find the Last Matching Element

Like `find()` but searches **from the end** backward. Returns the last element matching the condition.

```javascript
const scores = [45, 62, 78, 95, 55, 82];

// Find last score above 70
const lastHigh = scores.findLast(score => score > 70);
console.log(lastHigh); // 82  (the last score > 70)
```

**▶ Expected Output:** `82`

---

### `findLastIndex()` — Index of the Last Matching Element

Like `findIndex()` but searches from the end backward.

```javascript
const scores = [45, 62, 78, 95, 55, 82];

const idx = scores.findLastIndex(score => score > 70);
console.log(idx); // 5  (index of 82)
```

**▶ Expected Output:** `5`

---

### Comparison: Search Methods at a Glance

| Method | What it searches for | Returns |
|--------|---------------------|---------|
| `indexOf(val)` | Exact value (first) | Index or -1 |
| `lastIndexOf(val)` | Exact value (last) | Index or -1 |
| `includes(val)` | Exact value (any) | `true` / `false` |
| `find(fn)` | First element passing test | Element or `undefined` |
| `findIndex(fn)` | Index of first passing element | Index or -1 |
| `findLast(fn)` | Last element passing test | Element or `undefined` |
| `findLastIndex(fn)` | Index of last passing element | Index or -1 |

---
---

## 6. Topic 5 — Array Sort & Reverse

> **Phase 1 — Conceptual Understanding**

Sorting arrays is one of the most common and tricky operations. JavaScript's `sort()` has a famous gotcha with numbers that every developer must know.

---

### `sort()` — Sort an Array (Alphabetically by Default)

`sort()` sorts the array **in place** (modifies the original) and returns the sorted array. By default, it converts elements to strings and sorts them alphabetically.

```javascript
const fruits = ["Banana", "Apple", "Mango", "Kiwi"];
fruits.sort();
console.log(fruits); // ["Apple", "Banana", "Kiwi", "Mango"]
```

**▶ Expected Output:** `["Apple", "Banana", "Kiwi", "Mango"]`

---

### ⚠️ The Numeric Sort Gotcha

The default `sort()` converts numbers to strings, which causes wrong results for numeric arrays:

```javascript
const nums = [10, 2, 100, 25, 5];
nums.sort();
console.log(nums); // [10, 100, 2, 25, 5]  ← WRONG!
// "10" < "100" < "2" < "25" < "5" alphabetically
```

**▶ Expected Output:** `[10, 100, 2, 25, 5]` ← NOT what we wanted!

> 🐛 **COMMON MISTAKE:** This is the #1 most famous JavaScript sorting mistake. Sorting `[10, 2, 100]` with default `sort()` gives `[10, 100, 2]` because `"10" < "100" < "2"` alphabetically.

---

### Sorting Numbers Correctly: Compare Function

Pass a **compare function** `(a, b) => a - b` to sort numerically:

```javascript
const nums = [10, 2, 100, 25, 5];

// Ascending (smallest first)
nums.sort((a, b) => a - b);
console.log(nums); // [2, 5, 10, 25, 100] ✅

// Descending (largest first)
nums.sort((a, b) => b - a);
console.log(nums); // [100, 25, 10, 5, 2] ✅
```

**▶ Expected Output:**
```
[2, 5, 10, 25, 100]
[100, 25, 10, 5, 2]
```

#### How the Compare Function Works

The compare function receives two elements `a` and `b`. The sort behaviour depends on what it returns:

| Return value | Action |
|-------------|--------|
| Negative (a - b < 0) | `a` comes before `b` (ascending) |
| Positive (a - b > 0) | `b` comes before `a` (descending) |
| Zero | Same position |

```javascript
// Visualising: sort([30, 10, 20]):
// Compare 30 and 10: 30 - 10 = 20 (positive) → 10 before 30
// Compare 10 and 20: 10 - 20 = -10 (negative) → 10 before 20
// Result: [10, 20, 30] ✅
```

---

### Sorting Strings (Case-Insensitive)

```javascript
const names = ["banana", "Apple", "mango", "Kiwi"];

// Case-insensitive sort using localeCompare
names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(names); // ["Apple", "banana", "Kiwi", "mango"]
```

---

### Sorting Objects by Property

```javascript
const students = [
  { name: "Amara",  score: 78 },
  { name: "Kwame",  score: 95 },
  { name: "Fatima", score: 62 },
  { name: "Emeka",  score: 88 },
];

// Sort by score ascending
students.sort((a, b) => a.score - b.score);
console.log(students.map(s => s.name + ": " + s.score));
// ["Fatima: 62", "Amara: 78", "Emeka: 88", "Kwame: 95"]

// Sort by name alphabetically
students.sort((a, b) => a.name.localeCompare(b.name));
console.log(students.map(s => s.name));
// ["Amara", "Emeka", "Fatima", "Kwame"]
```

**▶ Expected Output:**
```
["Fatima: 62", "Amara: 78", "Emeka: 88", "Kwame: 95"]
["Amara", "Emeka", "Fatima", "Kwame"]
```

> 🏢 **REAL WORLD:** Every sortable table in a web app (sort by price, name, date, rating) uses exactly this pattern with a compare function.

---

### `toSorted()` — Sort Without Mutation (Modern)

`toSorted()` returns a new sorted array without changing the original.

```javascript
const nums = [10, 2, 100, 25, 5];
const sorted = nums.toSorted((a, b) => a - b);

console.log(nums);   // [10, 2, 100, 25, 5]  ← original unchanged!
console.log(sorted); // [2, 5, 10, 25, 100]
```

---

### `reverse()` — Reverse an Array (In Place)

`reverse()` reverses the order of the array in place and returns it.

```javascript
const fruits = ["Banana", "Apple", "Mango"];
fruits.reverse();
console.log(fruits); // ["Mango", "Apple", "Banana"]
```

#### Reverse-Sort a Number Array:

```javascript
const nums = [2, 5, 10, 25, 100];
nums.sort((a, b) => a - b); // Sort ascending first
nums.reverse();              // Then reverse for descending

console.log(nums); // [100, 25, 10, 5, 2]
```

---

### `toReversed()` — Reverse Without Mutation (Modern)

```javascript
const fruits = ["Banana", "Apple", "Mango"];
const reversed = fruits.toReversed();

console.log(fruits);   // ["Banana", "Apple", "Mango"]  ← unchanged!
console.log(reversed); // ["Mango", "Apple", "Banana"]
```

---

### Fisher-Yates Shuffle — Randomise Array Order

```javascript
function shuffle(arr) {
  const copy = [...arr]; // copy first to avoid mutating original
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
  }
  return copy;
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(shuffle(cards)); // e.g. [7, 3, 10, 1, 5, 8, 2, 9, 4, 6]
```

> 🏢 **REAL WORLD:** Used in quiz apps (shuffle questions), card games, playlist shuffles, and random product recommendations.

---

### Finding Min and Max with `Math.min/max` + Spread

```javascript
const scores = [45, 92, 78, 55, 88, 63];

const min = Math.min(...scores);
const max = Math.max(...scores);

console.log("Min:", min); // 45
console.log("Max:", max); // 92
```

**▶ Expected Output:**
```
Min: 45
Max: 92
```

> 💡 **TIP:** The `...` spread operator unpacks the array elements as individual arguments to `Math.min()` and `Math.max()`.

---
---

## 7. Topic 6 — Array Iteration Methods

> **Phase 1 — Conceptual Understanding**

Iteration methods process each element of an array. They are the most powerful and most-used array methods in modern JavaScript. All of them accept a **callback function** as an argument.

---

### `forEach()` — Do Something for Each Element

`forEach()` calls a function for each element. It does NOT return anything (`undefined`). Use it when you want to perform an action (like printing) but don't need a new array back.

```javascript
const fruits = ["Banana", "Apple", "Mango"];

fruits.forEach(function(fruit, index) {
  console.log(index + ": " + fruit);
});
```

**▶ Expected Output:**
```
0: Banana
1: Apple
2: Mango
```

With arrow function (cleaner):
```javascript
fruits.forEach((fruit, index) => console.log(index + ": " + fruit));
```

> 🏢 **REAL WORLD:** Rendering a list of items in a web page: `products.forEach(p => renderProductCard(p))`.

---

### `map()` — Transform Each Element Into a New Array

`map()` creates a **new array** by applying a function to every element. The original array is unchanged.

```javascript
const nums = [1, 2, 3, 4, 5];

const doubled = nums.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(nums);    // [1, 2, 3, 4, 5]  ← unchanged!
```

**▶ Expected Output:**
```
[2, 4, 6, 8, 10]
[1, 2, 3, 4, 5]
```

Real-world example: extract names from an array of objects:

```javascript
const students = [
  { name: "Amara", score: 85 },
  { name: "Kwame", score: 92 },
  { name: "Fatima", score: 78 },
];

const names = students.map(s => s.name);
console.log(names); // ["Amara", "Kwame", "Fatima"]

const scores = students.map(s => s.score);
console.log(scores); // [85, 92, 78]
```

**▶ Expected Output:**
```
["Amara", "Kwame", "Fatima"]
[85, 92, 78]
```

> 🏢 **REAL WORLD:** `map()` is the cornerstone of React — `products.map(p => <ProductCard key={p.id} {...p} />)` renders a list of UI components.

---

### `filter()` — Keep Only Elements That Pass a Test

`filter()` creates a **new array** containing only elements where the callback returns `true`.

```javascript
const scores = [45, 92, 78, 55, 88, 63, 95];

// Keep only passing scores (>= 60)
const passing = scores.filter(score => score >= 60);
console.log(passing); // [92, 78, 88, 63, 95]

// Keep only failing scores
const failing = scores.filter(score => score < 60);
console.log(failing); // [45, 55]
```

**▶ Expected Output:**
```
[92, 78, 88, 63, 95]
[45, 55]
```

Filter objects:
```javascript
const students = [
  { name: "Amara",  score: 85, grade: "A" },
  { name: "Kwame",  score: 92, grade: "A" },
  { name: "Fatima", score: 58, grade: "F" },
  { name: "Emeka",  score: 74, grade: "C" },
];

const topStudents = students.filter(s => s.score >= 80);
console.log(topStudents.map(s => s.name)); // ["Amara", "Kwame"]
```

**▶ Expected Output:** `["Amara", "Kwame"]`

> 🏢 **REAL WORLD:** Every filter on a shopping site (price range, category, rating) uses `.filter()` on a products array.

---

### `reduce()` — Reduce to a Single Value

`reduce()` executes a function on each element, carrying an **accumulator** value through the iteration, and returns a single final value.

```javascript
// reduce(callback, initialValue)
// callback receives: (accumulator, currentValue, currentIndex, array)
```

#### Sum of all numbers:

```javascript
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15
```

**How it works step by step:**
```
Start: acc = 0
Step 1: acc = 0 + 1 = 1
Step 2: acc = 1 + 2 = 3
Step 3: acc = 3 + 3 = 6
Step 4: acc = 6 + 4 = 10
Step 5: acc = 10 + 5 = 15
Result: 15
```

#### Find maximum value:
```javascript
const scores = [45, 92, 78, 55, 88];
const max = scores.reduce((acc, curr) => curr > acc ? curr : acc, 0);
console.log(max); // 92
```

#### Count occurrences:
```javascript
const grades = ["A", "B", "A", "C", "A", "B", "C", "A"];
const count = grades.reduce((acc, grade) => {
  acc[grade] = (acc[grade] || 0) + 1;
  return acc;
}, {});
console.log(count); // { A: 4, B: 2, C: 2 }
```

**▶ Expected Output:** `{ A: 4, B: 2, C: 2 }`

> 🏢 **REAL WORLD:** `reduce()` is used to calculate shopping cart totals, group data by category, build lookup objects from arrays, and compute statistics.

---

### `reduceRight()` — Like reduce() but Right to Left

Works exactly like `reduce()` but processes elements from the **last** to the **first**.

```javascript
const arr = [[1, 2], [3, 4], [5, 6]];
const flat = arr.reduceRight((acc, curr) => acc.concat(curr), []);
console.log(flat); // [5, 6, 3, 4, 1, 2]
```

---

### `every()` — Do ALL Elements Pass the Test?

Returns `true` if **every** element passes the callback. Returns `false` as soon as one fails.

```javascript
const scores = [78, 85, 92, 88, 76];

const allPassing = scores.every(score => score >= 60);
console.log(allPassing); // true  ← all are ≥ 60

const allAbove80 = scores.every(score => score >= 80);
console.log(allAbove80); // false ← 78 and 76 fail
```

**▶ Expected Output:**
```
true
false
```

> 🏢 **REAL WORLD:** Before processing a form, check if all fields are valid: `fields.every(field => field.value.trim() !== "")`.

---

### `some()` — Does AT LEAST ONE Element Pass the Test?

Returns `true` if **at least one** element passes. Returns `false` only if all fail.

```javascript
const scores = [45, 55, 82, 48, 53];

const anyPassing = scores.some(score => score >= 80);
console.log(anyPassing); // true  ← 82 passes

const anyAbove95 = scores.some(score => score >= 95);
console.log(anyAbove95); // false ← none are ≥ 95
```

**▶ Expected Output:**
```
true
false
```

> 💡 **TIP:** `every()` = "Are ALL of them...?" — like a strict teacher. `some()` = "Is ANY one of them...?" — like a generous marker.

---

### `keys()` — Iterate Index Numbers

Returns an Array Iterator that yields each index.

```javascript
const fruits = ["Banana", "Apple", "Mango"];

for (const key of fruits.keys()) {
  console.log(key); // 0, 1, 2
}
```

---

### `entries()` — Iterate [Index, Value] Pairs

Returns an iterator of `[index, value]` pairs.

```javascript
const fruits = ["Banana", "Apple", "Mango"];

for (const [index, value] of fruits.entries()) {
  console.log(index + ": " + value);
}
```

**▶ Expected Output:**
```
0: Banana
1: Apple
2: Mango
```

> 💡 **TIP:** Use `entries()` when you need both the index AND the value in a `for...of` loop — without a manual counter.

---

### Chaining — Combining Multiple Methods

One of the most powerful patterns in modern JavaScript is **method chaining** — combining multiple array methods in one expression.

```javascript
const students = [
  { name: "Amara",  score: 85 },
  { name: "Kwame",  score: 92 },
  { name: "Fatima", score: 58 },
  { name: "Emeka",  score: 74 },
  { name: "Priya",  score: 95 },
];

// Get names of students scoring above 80, sorted alphabetically
const result = students
  .filter(s => s.score > 80)      // Keep only scores > 80
  .sort((a, b) => a.score - b.score) // Sort by score ascending
  .map(s => s.name);                 // Extract just the names

console.log(result); // ["Amara", "Kwame", "Priya"]
```

**▶ Expected Output:** `["Amara", "Kwame", "Priya"]`

> 🏢 **REAL WORLD:** Chaining is the standard way to process data in professional JavaScript. In a real app: `products.filter(inStock).sort(byPrice).slice(0, 10).map(toCard)` renders the first 10 in-stock products sorted by price.

---
---

## 8. Topic 7 — Complete Array Reference

> Your quick reference for every JavaScript Array method.

---

### Static Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `Array.isArray(val)` | Check if value is an array | Boolean |
| `Array.from(iterable, mapFn?)` | Create array from iterable | New Array |
| `Array.of(...items)` | Create array from arguments | New Array |

---

### Methods That MODIFY the Original Array (Mutating)

| Method | What It Does | Returns |
|--------|-------------|---------|
| `push(...items)` | Add to end | New length |
| `pop()` | Remove from end | Removed element |
| `unshift(...items)` | Add to start | New length |
| `shift()` | Remove from start | Removed element |
| `splice(start, del, ...items)` | Add/remove/replace | Array of removed |
| `sort(compareFn?)` | Sort in place | Sorted array (same ref) |
| `reverse()` | Reverse in place | Reversed array (same ref) |
| `fill(val, start?, end?)` | Fill with value | Modified array |
| `copyWithin(target, start?, end?)` | Copy elements within | Modified array |

---

### Methods That Return a NEW Array (Non-Mutating)

| Method | What It Does | Returns |
|--------|-------------|---------|
| `slice(start?, end?)` | Extract portion | New array |
| `concat(...arrays)` | Merge arrays | New array |
| `flat(depth?)` | Flatten nested | New array |
| `flatMap(fn)` | Map then flatten 1 level | New array |
| `map(fn)` | Transform elements | New array |
| `filter(fn)` | Keep matching elements | New array |
| `toSorted(compareFn?)` | Sort without mutating | New array |
| `toReversed()` | Reverse without mutating | New array |
| `toSpliced(start, del, ...items)` | Splice without mutating | New array |
| `with(index, val)` | Replace element without mutating | New array |

---

### Methods That Return a Value (Not an Array)

| Method | What It Does | Returns |
|--------|-------------|---------|
| `indexOf(val, start?)` | Find first index of value | Index or -1 |
| `lastIndexOf(val, start?)` | Find last index of value | Index or -1 |
| `includes(val, start?)` | Check existence | Boolean |
| `find(fn)` | First element passing test | Element or undefined |
| `findIndex(fn)` | Index of first passing element | Index or -1 |
| `findLast(fn)` | Last element passing test | Element or undefined |
| `findLastIndex(fn)` | Index of last passing element | Index or -1 |
| `every(fn)` | All pass test? | Boolean |
| `some(fn)` | Any pass test? | Boolean |
| `reduce(fn, init?)` | Accumulate to single value | Any value |
| `reduceRight(fn, init?)` | Reduce right-to-left | Any value |
| `join(sep?)` | Join to string | String |
| `toString()` | Join with commas | String |
| `at(index)` | Access element (neg supported) | Element or undefined |

---

### Methods That Return Iterators

| Method | What It Does | Returns |
|--------|-------------|---------|
| `keys()` | Iterate over indexes | Iterator |
| `values()` | Iterate over values | Iterator |
| `entries()` | Iterate over [index, value] pairs | Iterator |
| `[Symbol.iterator]()` | Used by `for...of` | Iterator |

---

### Properties

| Property | Description |
|----------|-------------|
| `length` | Number of elements (read/write) |
| `constructor` | Reference to Array function |

---

### Mutable vs Immutable Quick Reference

| Operation | Mutating Version | Immutable Version (new) |
|-----------|-----------------|------------------------|
| Sort | `sort()` | `toSorted()` |
| Reverse | `reverse()` | `toReversed()` |
| Splice | `splice()` | `toSpliced()` |
| Set element | `arr[i] = val` | `with(i, val)` |

---
---

## 9. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Array Builder & Reader 🏗️

**Objective:** Practice creating arrays, accessing elements, and using basic methods.

**Scenario:** You're building a **library catalogue system**. Books are stored as arrays.

#### Warm-up Micro-Demo:

```javascript
const books = ["The Alchemist", "Atomic Habits", "Dune"];

console.log("First:", books[0]);                    // "The Alchemist"
console.log("Last:", books[books.length - 1]);      // "Dune"
console.log("Count:", books.length);                // 3
```

**▶ Expected Output:**
```
First: The Alchemist
Last: Dune
Count: 3
```

#### Task A — Build the Catalogue

```javascript
// Start with 3 books
const catalogue = ["The Alchemist", "Atomic Habits", "Dune"];

// 1. Add "Sapiens" to the end
catalogue.push("Sapiens");

// 2. Add "1984" to the beginning
catalogue.unshift("1984");

// 3. Remove the last book
const removed = catalogue.pop();
console.log("Removed:", removed); // "Sapiens"

// 4. Display all books with their positions
catalogue.forEach((book, i) => console.log((i + 1) + ". " + book));

// 5. Check if "Dune" is in the catalogue
console.log("Has Dune:", catalogue.includes("Dune"));
```

**Expected output:**
```
Removed: Sapiens
1. 1984
2. The Alchemist
3. Atomic Habits
4. Dune
Has Dune: true
```

#### Task B — Splice Operations

```javascript
const catalogue = ["1984", "The Alchemist", "Atomic Habits", "Dune"];

// 1. Remove "The Alchemist" (use splice)
const taken = catalogue.splice(1, 1);
console.log("Removed:", taken);       // ["The Alchemist"]
console.log("Catalogue:", catalogue); // ["1984", "Atomic Habits", "Dune"]

// 2. Insert "Brave New World" between "1984" and "Atomic Habits"
catalogue.splice(1, 0, "Brave New World");
console.log("After insert:", catalogue);
// ["1984", "Brave New World", "Atomic Habits", "Dune"]

// 3. Replace "Dune" with "Foundation" using splice
catalogue.splice(catalogue.indexOf("Dune"), 1, "Foundation");
console.log("After replace:", catalogue);
// ["1984", "Brave New World", "Atomic Habits", "Foundation"]
```

**Self-check questions:**
- What does `splice(2, 0, "X")` do? (Hint: 0 means delete nothing!)
- What is the difference between `slice()` and `splice()`?
- Why should you use `splice()` instead of `delete` to remove elements?

> 🏢 **REAL WORLD:** Playlist management apps use exactly these operations: add song at position, remove by index, swap songs.

---

### Exercise 2 — Search & Filter Challenge 🔍

**Objective:** Practice `indexOf`, `includes`, `find`, `findIndex`, `filter`, and chaining.

**Scenario:** You are a developer at a **school results portal**. Students' data is stored as an array of objects.

#### Warm-up Micro-Demo:

```javascript
const results = [72, 45, 88, 56, 93, 61];
const firstPass = results.find(r => r >= 60);
console.log("First passing score:", firstPass); // 72
```

#### Task A — Find Students

```javascript
const students = [
  { id: 1,  name: "Amara",  score: 85, grade: "B" },
  { id: 2,  name: "Kwame",  score: 92, grade: "A" },
  { id: 3,  name: "Fatima", score: 58, grade: "F" },
  { id: 4,  name: "Emeka",  score: 74, grade: "C" },
  { id: 5,  name: "Priya",  score: 95, grade: "A" },
  { id: 6,  name: "Omar",   score: 61, grade: "D" },
];

// 1. Find student by ID
const student = students.find(s => s.id === 3);
console.log("Student 3:", student.name, "-", student.score);

// 2. Find index of Priya
const priyaIdx = students.findIndex(s => s.name === "Priya");
console.log("Priya at index:", priyaIdx);

// 3. Filter all A students
const aStudents = students.filter(s => s.grade === "A");
console.log("A students:", aStudents.map(s => s.name));

// 4. Filter students scoring above average
const avg = students.reduce((sum, s) => sum + s.score, 0) / students.length;
const aboveAvg = students.filter(s => s.score > avg);
console.log("Average:", avg.toFixed(1));
console.log("Above average:", aboveAvg.map(s => s.name));

// 5. Are ALL students passing (score >= 50)?
const allPass = students.every(s => s.score >= 50);
console.log("All passing:", allPass);

// 6. Does ANY student have a perfect 100?
const anyPerfect = students.some(s => s.score === 100);
console.log("Any perfect 100:", anyPerfect);
```

**Expected Output:**
```
Student 3: Fatima - 58
Priya at index: 4
A students: ["Kwame", "Priya"]
Average: 77.5
Above average: ["Amara", "Kwame", "Priya"]
All passing: false
Any perfect 100: false
```

**Self-check questions:**
- What is the difference between `find()` and `filter()`?
- When would you use `some()` vs `every()`?
- Why does `findIndex()` return -1 when the item is not found?

---

### Exercise 3 — Sort, Reduce & Chain 📊

**Objective:** Practice `sort()`, `reduce()`, `map()`, and method chaining.

**Scenario:** You're building a **sales dashboard**. Each sale is an object with a salesperson, region, and amount.

#### Warm-up Micro-Demo:

```javascript
const sales = [500, 1200, 340, 890, 2100];
const total = sales.reduce((acc, n) => acc + n, 0);
console.log("Total sales: $" + total); // Total sales: $5030
```

#### Task A — Sales Analysis

```javascript
const salesData = [
  { name: "Alice",  region: "North", amount: 4500 },
  { name: "Bob",    region: "South", amount: 3200 },
  { name: "Carol",  region: "North", amount: 5800 },
  { name: "David",  region: "East",  amount: 2900 },
  { name: "Eve",    region: "South", amount: 6100 },
  { name: "Frank",  region: "East",  amount: 3750 },
];

// 1. Total sales
const total = salesData.reduce((acc, s) => acc + s.amount, 0);
console.log("Total: $" + total);

// 2. Top 3 salespeople by amount
const top3 = salesData
  .toSorted((a, b) => b.amount - a.amount)
  .slice(0, 3)
  .map(s => s.name + ": $" + s.amount);
console.log("Top 3:", top3);

// 3. Sales by region
const byRegion = salesData.reduce((acc, s) => {
  acc[s.region] = (acc[s.region] || 0) + s.amount;
  return acc;
}, {});
console.log("By region:", byRegion);

// 4. Names of everyone who sold over $4000, sorted alphabetically
const highPerformers = salesData
  .filter(s => s.amount > 4000)
  .map(s => s.name)
  .sort();
console.log("High performers:", highPerformers);
```

**Expected Output:**
```
Total: $26250
Top 3: ["Eve: $6100", "Carol: $5800", "Alice: $4500"]
By region: { North: 10300, South: 9300, East: 6650 }
High performers: ["Alice", "Carol", "Eve"]
```

**Self-check questions:**
- Why does `toSorted()` not modify the original `salesData`?
- How does `reduce()` build the `byRegion` object step by step?
- What does chaining `.filter().map().sort()` mean about the order of operations?

**Optional what-if challenge:** Add a `commission` field to each object (10% of amount). Use `map()` to create a new array with commissions included.

---
---

## 10. Mini Project — Student Grade Analyser

> **Phase 3 — Project Simulation**

**Real-world scenario:** You are a developer at an EdTech company. Build a **Student Grade Analyser** that stores student records, computes statistics, ranks students, categorises performance, and generates a printable report — using the full set of array methods.

---

### 🔵 Stage 1 — Setup: Store Data and Compute Basics

**Goal:** Store students as an array of objects, compute class average, highest and lowest score, pass/fail split.

#### Simple stage preview:

```javascript
const scores = [78, 92, 65, 88, 45];
const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
console.log("Average:", avg.toFixed(1)); // 73.6
```

#### Stage 1 Full Code:

```javascript
"use strict";

const classData = [
  { id: 1,  name: "Amara Diallo",    score: 78  },
  { id: 2,  name: "Kwame Asante",    score: 92  },
  { id: 3,  name: "Fatima Al-Rashid",score: 65  },
  { id: 4,  name: "Emeka Obi",       score: 45  },
  { id: 5,  name: "Priya Sharma",    score: 95  },
  { id: 6,  name: "Omar Hassan",     score: 58  },
  { id: 7,  name: "Sofia Martini",   score: 82  },
  { id: 8,  name: "Yuki Tanaka",     score: 71  },
  { id: 9,  name: "Carlos Ruiz",     score: 88  },
  { id: 10, name: "Aisha Nkosi",     score: 53  },
];

const PASS_MARK = 60;

// Core statistics
const scores   = classData.map(s => s.score);
const total    = scores.reduce((sum, s) => sum + s, 0);
const average  = total / scores.length;
const highest  = Math.max(...scores);
const lowest   = Math.min(...scores);
const passing  = classData.filter(s => s.score >= PASS_MARK);
const failing  = classData.filter(s => s.score < PASS_MARK);

console.log("=".repeat(40));
console.log("     STAGE 1 — CLASS STATISTICS");
console.log("=".repeat(40));
console.log("Students  :", classData.length);
console.log("Average   :", average.toFixed(1));
console.log("Highest   :", highest);
console.log("Lowest    :", lowest);
console.log("Passed    :", passing.length, "students");
console.log("Failed    :", failing.length, "students");
console.log("Pass rate :", ((passing.length / classData.length) * 100).toFixed(0) + "%");
```

**▶ Expected Output:**
```
========================================
     STAGE 1 — CLASS STATISTICS
========================================
Students  : 10
Average   : 72.7
Highest   : 95
Lowest    : 45
Passed    : 7 students
Failed    : 3 students
Pass rate : 70%
```

**Reflection:** Why use `.map()` to extract scores before using `Math.max(...scores)`? What would break if you passed `classData` directly?

---

### 🟢 Stage 2 — Grade Assignment and Ranking

**Goal:** Add a grade letter to each student using `map()`, rank the class by score using `toSorted()`, and find the top 3 performers.

#### Simple stage preview:

```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}
console.log(getGrade(92));  // "A"
console.log(getGrade(58));  // "D"
```

#### Stage 2 Full Code:

```javascript
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

// Add grade to each student using map() (non-mutating)
const gradedData = classData.map(student => ({
  ...student,
  grade: getGrade(student.score),
  status: student.score >= PASS_MARK ? "PASS" : "FAIL"
}));

// Rank by score (descending) — toSorted() doesn't mutate original
const ranked = gradedData.toSorted((a, b) => b.score - a.score);

// Top 3
const top3 = ranked.slice(0, 3);
console.log("\n=".repeat(40));
console.log("     STAGE 2 — RANKINGS");
console.log("=".repeat(40));
console.log("Top 3 Students:");
top3.forEach((s, i) => {
  console.log(`  ${i + 1}. ${s.name.padEnd(22)} ${s.score}  (${s.grade})`);
});

// Grade distribution using reduce
const distribution = gradedData.reduce((acc, s) => {
  acc[s.grade] = (acc[s.grade] || 0) + 1;
  return acc;
}, {});

console.log("\nGrade Distribution:");
["A", "B", "C", "D", "F"].forEach(g => {
  const count = distribution[g] || 0;
  const bar   = "█".repeat(count);
  console.log(`  ${g}: ${bar} (${count})`);
});
```

**▶ Expected Output:**
```
========================================
     STAGE 2 — RANKINGS
========================================
Top 3 Students:
  1. Priya Sharma          95  (A)
  2. Kwame Asante          92  (A)
  3. Carlos Ruiz           88  (B)

Grade Distribution:
  A: ██ (2)
  B: ██ (2)
  C: ██ (2)
  D: ██ (2)
  F: ██ (2)
```

**Reflection:** Why is `toSorted()` better than `sort()` here? What would happen to `classData` if we used `sort()` directly?

---

### 🟠 Stage 3 — Full Report Generator

**Goal:** Generate a complete formatted class report using chained methods, `forEach`, `find`, `every`, and `some`.

#### Stage 3 Full Code:

```javascript
function printFullReport(students, average, highest, lowest) {
  const ranked = students.toSorted((a, b) => b.score - a.score);

  console.log("\n" + "=".repeat(58));
  console.log("             STUDENT PERFORMANCE REPORT");
  console.log("=".repeat(58));
  console.log(`${"Name".padEnd(24)} ${"Score".padEnd(7)} ${"Grade".padEnd(7)} Status`);
  console.log("-".repeat(58));

  ranked.forEach(s => {
    const marker = s.score === highest ? " ⭐" : s.score === lowest ? " ⬇️" : "";
    const status = s.status === "PASS" ? "✅" : "❌";
    console.log(
      `${s.name.padEnd(24)} ${String(s.score).padEnd(7)} ${s.grade.padEnd(7)} ${status}${marker}`
    );
  });

  console.log("-".repeat(58));
  console.log(`Class Average : ${average.toFixed(1)}`);

  // Find who scored closest to average
  const closest = students.reduce((prev, curr) =>
    Math.abs(curr.score - average) < Math.abs(prev.score - average) ? curr : prev
  );
  console.log(`Closest to avg: ${closest.name} (${closest.score})`);

  // Checks using every() and some()
  console.log(`All attempted  : ${students.every(s => s.score > 0) ? "Yes" : "No"}`);
  console.log(`Any distinction: ${students.some(s => s.score >= 90) ? "Yes" : "No"}`);
  console.log(`Any failed     : ${students.some(s => s.status === "FAIL") ? "Yes" : "No"}`);

  // Names of students who need support (score < 60)
  const needsSupport = students
    .filter(s => s.status === "FAIL")
    .map(s => s.name);
  console.log(`\nNeeds support  : ${needsSupport.join(", ")}`);
  console.log("=".repeat(58));
}

printFullReport(gradedData, average, highest, lowest);
```

**▶ Expected Output:**
```
==========================================================
             STUDENT PERFORMANCE REPORT
==========================================================
Name                     Score   Grade   Status
----------------------------------------------------------
Priya Sharma             95      A       ✅ ⭐
Kwame Asante             92      A       ✅
Carlos Ruiz              88      B       ✅
Sofia Martini            82      B       ✅
Amara Diallo             78      B       ✅
Yuki Tanaka              71      C       ✅
Fatima Al-Rashid         65      C       ✅
Omar Hassan              58      D       ❌
Aisha Nkosi              53      D       ❌
Emeka Obi                45      F       ❌ ⬇️
----------------------------------------------------------
Class Average : 72.7
Closest to avg: Yuki Tanaka (71)
All attempted  : Yes
Any distinction: Yes
Any failed     : Yes

Needs support  : Omar Hassan, Aisha Nkosi, Emeka Obi
==========================================================
```

**Reflection questions:**
- How would you extend this to handle multiple classes (array of arrays)?
- Why is it safer to use `toSorted()` instead of `sort()` throughout this project?
- How would you add a method to find the median score? (Hint: sort then pick the middle element)
- How would you group students by grade letter using `reduce()`?

**Optional advanced features:**
- Add a `subjectScores` array per student (`[math: 88, english: 92, science: 75]`) and compute per-subject averages using nested `map()` and `reduce()`
- Build a `search(name)` function using `find()` that also uses `findIndex()` to show rank
- Implement a `curve()` function that uses `map()` to add 5 points to every failing student
- Use `entries()` to generate a numbered printout with positions

---
---

## 11. Completion Checklist

- ✅ I understand what an array is — an ordered, indexed collection in a single variable.
- ✅ I can create arrays using the array literal `[]` and know why it is preferred over `new Array()`.
- ✅ I know that array indices start at **0** and the last index is always `length - 1`.
- ✅ I understand what `const` means for arrays — the variable binding is fixed but the contents can still change.
- ✅ I know that `const` arrays must be initialised when declared and cannot be reassigned.
- ✅ I can use `push()`, `pop()`, `unshift()`, and `shift()` to add/remove from ends of an array.
- ✅ I understand `splice()` — the "Swiss Army knife" — and can use it to add, remove, and replace at any position.
- ✅ I know the difference between `splice()` (mutates) and `slice()` (new copy, doesn't mutate).
- ✅ I can use `concat()` and the spread operator `[...]` to merge arrays.
- ✅ I understand `flat()` and `flatMap()` for working with nested arrays.
- ✅ I can search arrays using `indexOf()`, `lastIndexOf()`, `includes()`, `find()`, `findIndex()`, `findLast()`, and `findLastIndex()`.
- ✅ I know the famous numeric sort gotcha — default `sort()` sorts numbers as strings — and how to fix it with a compare function `(a, b) => a - b`.
- ✅ I can sort objects by property and sort strings case-insensitively with `localeCompare()`.
- ✅ I know the difference between mutating sort (`sort()`, `reverse()`) and non-mutating versions (`toSorted()`, `toReversed()`).
- ✅ I can use `forEach()` to iterate, `map()` to transform, `filter()` to select, and `reduce()` to accumulate.
- ✅ I know when to use `every()` (all pass?) vs `some()` (any pass?).
- ✅ I can chain multiple array methods together for clean, readable data processing pipelines.
- ✅ I know the difference between methods that **mutate** the original array vs methods that return a **new array**.
- ✅ I completed all three exercises and the full three-stage mini-project.
- ✅ I can explain how arrays are used in real-world apps: shopping carts, gradebooks, search results, dashboards, and data pipelines.

---

### 📌 One-Sentence Summary of Each Topic

**Arrays:** An array is an ordered, indexed collection of values stored in one variable — accessed by zero-based index, measured by `length`, and identifiable with `Array.isArray()`.

**Array const:** `const` for arrays means the variable cannot be reassigned to a different array, but the array's contents (push, pop, splice, etc.) can still be freely changed.

**Array Methods:** JavaScript arrays have mutating methods (`push/pop/splice/sort/reverse`) that change the original and non-mutating methods (`slice/concat/map/filter/toSorted`) that always return new arrays.

**Array Search:** Use `indexOf/includes` for primitive values, `find/findIndex` for condition-based searches, and the `Last` variants (`findLast/findLastIndex`) to search from the end.

**Array Sort:** The default `sort()` converts elements to strings — always pass a compare function `(a, b) => a - b` for numeric sorting, and use `toSorted()` for the non-mutating version.

**Array Iteration:** `forEach` runs side effects, `map` transforms each element into a new array, `filter` keeps elements passing a test, `reduce` accumulates all values into one result, and `every/some` test all or any elements.

**Array Reference:** JavaScript arrays provide 30+ methods split into three categories: mutating (modify original), returning new arrays (safe copies), and returning values — chain them for powerful, readable data processing pipelines.

---

> 📘 *Built from W3Schools.com — `js_arrays` | `js_array_methods` | `js_array_search` | `js_array_sort` | `js_array_iteration` | `js_array_const` | `js_array_reference`*
> *Framework: Understand → Practice → Create*
