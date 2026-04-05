---
render_with_liquid: false
title: "JavaScript Data Types, Primitives, Objects, typeof, toString & Type Conversion"
nav_order: 21
---

## Table of Contents

1. [Section 1 — Conceptual Understanding](#section-1--conceptual-understanding)
   - [1.1 What Are Data Types?](#11-what-are-data-types)
   - [1.2 The Eight JavaScript Data Types](#12-the-eight-javascript-data-types)
   - [1.3 Dynamic Typing — JavaScript's Superpower (and Gotcha)](#13-dynamic-typing--javascripts-superpower-and-gotcha)
   - [1.4 Primitive Data Types (Deep Dive)](#14-primitive-data-types-deep-dive)
   - [1.5 Object Data Types (Deep Dive)](#15-object-data-types-deep-dive)
   - [1.6 The `typeof` Operator](#16-the-typeof-operator)
   - [1.7 Converting Values to Strings — `toString()` and Friends](#17-converting-values-to-strings--tostring-and-friends)
   - [1.8 Type Conversion — Explicit and Implicit](#18-type-conversion--explicit-and-implicit)
2. [Section 2 — Applied Exercises](#section-2--applied-exercises)
3. [Section 3 — Project Simulation](#section-3--project-simulation)
4. [Completion Checklist](#completion-checklist)

---

# Section 1 — Conceptual Understanding

## 1.1 What Are Data Types?

### The Real-World Analogy

Imagine you work in a school's administrative office. You store different kinds of information every day:

- A student's **name** → text, e.g. `"Amara Osei"`
- Their **age** → a whole number, e.g. `17`
- Their **GPA** → a decimal, e.g. `3.85`
- Whether they are **enrolled** → yes or no, e.g. `true`
- Their **emergency contact** → a collection of details (name, phone, relationship)

Each of these pieces of information has a **type** — a category that tells you what kind of value it is and what you can do with it. You cannot add a name to a number in a meaningful way; you cannot sort "yes/no" values alphabetically.

Computers face the same challenge. JavaScript needs to know the *type* of every value so it knows:

- How much **memory** to reserve for it
- What **operations** are valid (can you divide it? compare it? loop over it?)
- How to **display** it to the user

> **Definition:** A data type is a classification that tells JavaScript what kind of value a variable holds and what operations can be performed on it.

---

## 1.2 The Eight JavaScript Data Types

JavaScript has exactly **8 built-in data types**. They split into two families:

| Family | Types |
|---|---|
| **Primitive** (simple, single values) | `String`, `Number`, `BigInt`, `Boolean`, `Undefined`, `Null`, `Symbol` |
| **Object** (complex, multi-value structures) | `Object` (includes Arrays, Functions, Dates, etc.) |

Here is your first look at each type in code:

```javascript
// 1. String — text
let studentName = "Amara Osei";

// 2. Number — integers and decimals
let age = 17;
let gpa  = 3.85;

// 3. BigInt — very large integers
let schoolID = 9007199254740991n;

// 4. Boolean — true or false
let isEnrolled = true;

// 5. Undefined — declared but not yet assigned
let graduationDate;

// 6. Null — intentionally empty
let middleName = null;

// 7. Symbol — unique hidden identifier (advanced)
let studentToken = Symbol("token");

// 8. Object — a collection of named values
let student = {
  name: "Amara",
  age: 17,
  enrolled: true
};
```

We will explore each of these carefully, one at a time.

---

## 1.3 Dynamic Typing — JavaScript's Superpower (and Gotcha)

Most programming languages (like Java or C++) require you to *declare* the type of a variable upfront and never change it. JavaScript works differently — it is **dynamically typed**, which means:

- You do **not** state the type when creating a variable.
- JavaScript **figures it out** from the value you assign.
- The type of a variable **can change** during the program.

### Micro-Demo: A variable that changes type

```javascript
let info = "Hello";    // info is a String
console.log(typeof info); // "string"

info = 42;             // info is now a Number
console.log(typeof info); // "number"

info = true;           // info is now a Boolean
console.log(typeof info); // "boolean"
```

**Expected Output:**
```
string
number
boolean
```

> 💡 **Why this matters:** Dynamic typing makes JavaScript fast to write but can cause tricky bugs. A function expecting a number might silently receive a string and produce wrong results. This is why checking types with `typeof` (covered later) is an important habit.

> 🤔 **Thinking Question:** What do you think happens if you add a number to a string in JavaScript? For example `5 + "5"`? Write your prediction before reading on. (We answer this in Section 1.8.)

---

## 1.4 Primitive Data Types (Deep Dive)

> **What is a primitive?**  
> A primitive is a data type that holds **one single, simple value**. It is not a collection, not a function, and not a structure. It is just a bare value.
>
> Primitives are **immutable** — once the value exists in memory, you cannot alter that specific value. You can re-assign the variable to a *new* value, but the old value itself does not change.

There are **7 primitive types** in JavaScript.

---

### Primitive 1: String

A **string** is a sequence of characters — letters, digits, spaces, punctuation, or emoji — surrounded by quotes.

#### Three ways to write strings

```javascript
let a = "Hello";      // double quotes
let b = 'World';      // single quotes
let c = `Hello World`; // backtick (template literal)
```

All three create strings. The backtick version is special — it allows **embedded expressions**:

```javascript
let name = "Amara";
let greeting = `Welcome, ${name}! Your GPA is ${3.85}.`;
console.log(greeting);
// Expected Output: Welcome, Amara! Your GPA is 3.85.
```

#### Strings contain individual characters

Think of a string as a row of labelled boxes. Each character sits in a numbered box starting from box 0:

```
"Amara"
  A  m  a  r  a
  0  1  2  3  4
```

```javascript
let name = "Amara";
console.log(name[0]);    // "A"
console.log(name.length); // 5
```

**Expected Output:**
```
A
5
```

#### ⚠️ Common Beginner Mistake — Mixing quotes

```javascript
let msg = "She said 'hello'";  // ✅ fine — outer double, inner single
let msg2 = 'She said "hello"'; // ✅ fine — outer single, inner double
let msg3 = "She said "hello""; // ❌ ERROR — JavaScript gets confused
```

Fix mixed quotes by using template literals or escaping with `\`:

```javascript
let msg3 = "She said \"hello\""; // ✅ escaped quotes
```

---

### Primitive 2: Number

JavaScript uses **one single number type** for both whole numbers (integers) and decimals (floats). This is different from many other languages that have separate types.

```javascript
let students    = 35;       // integer
let temperature = 36.6;     // decimal
let bankBalance = -1500.99; // negative decimal
let taxRate     = 0.075;    // small decimal
```

#### Special numeric values

JavaScript's Number type also includes three special values:

```javascript
let result1 = 1 / 0;
console.log(result1);  // Infinity

let result2 = -1 / 0;
console.log(result2);  // -Infinity

let result3 = "hello" / 2;
console.log(result3);  // NaN (Not a Number)
```

**Expected Output:**
```
Infinity
-Infinity
NaN
```

> 💡 `NaN` stands for **Not a Number**. It appears when a mathematical operation fails — like trying to divide a word by 2. Interestingly, `typeof NaN` returns `"number"` — because NaN *is* a member of the Number type, just a broken one.

#### Number size limits

JavaScript numbers are stored using 64-bit floating point (IEEE 754). This means:

- Maximum safe integer: **9,007,199,254,740,991** (about 9 quadrillion)
- Minimum safe integer: **-9,007,199,254,740,991**

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

> 🤔 **Thinking Question:** What could go wrong if a banking system uses regular JavaScript Numbers to store a balance of $10 quadrillion? Think about this before moving to BigInt.

---

### Primitive 3: BigInt

**BigInt** was introduced to solve the limitation above — it handles integers larger than the safe integer limit.

You create a BigInt by appending `n` to the number:

```javascript
let bigNumber = 9007199254740991n;   // BigInt
let bigger    = bigNumber + 1000n;   // works correctly!
console.log(bigger);
// Expected Output: 9007199254741991n
```

#### ⚠️ You cannot mix BigInt and regular Number

```javascript
let x = 10n + 5;    // ❌ TypeError
let x = 10n + 5n;   // ✅ both BigInt
let x = Number(10n) + 5; // ✅ convert first
```

> 💡 **Real-World Use:** Financial systems, cryptography, and database IDs that exceed standard number limits use BigInt.

---

### Primitive 4: Boolean

A **Boolean** holds exactly one of two values: `true` or `false`. It represents a yes/no, on/off, correct/incorrect decision.

```javascript
let isLoggedIn   = true;
let hasPermission = false;
let isAdult      = (age >= 18);  // evaluates to true or false
```

#### Booleans power your decisions

```javascript
let score = 72;
let passed = score >= 60;

if (passed) {
  console.log("You passed!");
} else {
  console.log("You need to retake the exam.");
}
// Expected Output: You passed!
```

#### Truthy and Falsy — JavaScript's boolean system

In JavaScript, every value has an implied "truth". When JavaScript evaluates a condition, it silently converts the value to a boolean:

| Value | Treated as |
|---|---|
| `false` | `false` |
| `0` | `false` |
| `""` (empty string) | `false` |
| `null` | `false` |
| `undefined` | `false` |
| `NaN` | `false` |
| Everything else | `true` |

```javascript
if ("") {
  console.log("empty string is truthy");
} else {
  console.log("empty string is falsy"); // ← this runs
}

if ("hello") {
  console.log("non-empty string is truthy"); // ← this runs
}
```

**Expected Output:**
```
empty string is falsy
non-empty string is truthy
```

---

### Primitive 5: Undefined

`undefined` means a variable has been **declared but not yet given a value**.

```javascript
let graduationDate;
console.log(graduationDate); // undefined
console.log(typeof graduationDate); // "undefined"
```

JavaScript itself assigns `undefined` to newly declared variables automatically. You do not need to write it yourself most of the time.

```javascript
function greet(name) {
  console.log("Hello, " + name);
}

greet(); // No argument passed
// Expected Output: Hello, undefined
```

> 💡 The `name` parameter receives no value, so it is `undefined`. The string `"Hello, "` + `undefined` produces `"Hello, undefined"`.

#### ⚠️ Common Beginner Mistake

```javascript
let x = undefined; // ✅ valid but unusual — prefer null for intentional emptiness
```

---

### Primitive 6: Null

`null` means **intentionally empty**. You assign it when you want to say: *"This variable exists, but it holds nothing on purpose."*

```javascript
let middleName = null;    // person has no middle name — intentional
let profilePicture = null; // user hasn't uploaded one yet
```

#### The typeof null — JavaScript's famous bug

```javascript
console.log(typeof null); // "object"  ← !! This is WRONG but kept for legacy reasons
```

> ⚠️ **Famous Bug:** `typeof null` returns `"object"` — but `null` is **NOT** an object. This is a historical mistake in JavaScript from 1995 that was never fixed because fixing it would break the web. Always remember: `null` is a primitive, not an object.

#### null vs undefined — side by side

| | `null` | `undefined` |
|---|---|---|
| **Meaning** | Intentionally empty | Not yet assigned |
| **Who sets it** | The programmer | JavaScript (or programmer) |
| **typeof** | `"object"` (bug!) | `"undefined"` |
| **Equality** | `null == undefined` → `true` | (loose comparison) |
| **Strict equality** | `null === undefined` → `false` | (they are different types) |

```javascript
console.log(null == undefined);  // true  (loose — type ignored)
console.log(null === undefined); // false (strict — type matters)
```

---

### Primitive 7: Symbol

A **Symbol** is a unique, hidden identifier. Every Symbol you create is guaranteed to be different from every other Symbol — even if they have the same description.

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false — they are always unique
```

> 💡 **Real-World Use:** Symbols are used to add private, non-clashing property keys to objects in large libraries and frameworks. You will encounter them more in advanced JavaScript. For now, just know they exist.

---

### How Primitives Are Stored — Pass by Value

Primitives are stored and copied **by value** — when you assign a primitive to a new variable, a fresh independent copy is made.

```javascript
let a = 10;
let b = a;   // b gets a COPY of 10

b = 99;      // changing b does NOT affect a

console.log(a); // 10  ← unchanged
console.log(b); // 99
```

**Expected Output:**
```
10
99
```

> 💡 **Analogy:** Think of primitives like a photocopy machine. `b = a` makes a photocopy. Writing on the copy does not alter the original.

---

## 1.5 Object Data Types (Deep Dive)

> **What is an object type?**  
> An object is a **complex data structure** that can hold multiple values — organised as named key-value pairs, ordered sequences, callable functions, and more.
>
> Almost everything in JavaScript that is *not* a primitive is an object.

---

### The Plain Object

A plain object groups related data together under named keys:

```javascript
let student = {
  name: "Amara",
  age: 17,
  enrolled: true,
  subjects: ["Math", "Biology", "History"]
};

console.log(student.name);       // "Amara"
console.log(student.subjects[0]); // "Math"
```

**Expected Output:**
```
Amara
Math
```

Think of a plain object as a **form with labelled fields**. Each field (key) holds a value of any type.

---

### Arrays

An array is an ordered list of values. Items are accessed by their position (index), starting at 0.

```javascript
let fruits = ["apple", "mango", "orange"];

console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "mango"
console.log(fruits.length); // 3
```

> 💡 **Important:** In JavaScript, arrays are actually a special type of object. Their indices (`0`, `1`, `2`, etc.) are just string keys under the hood. This is why `typeof []` returns `"object"`.

```javascript
console.log(typeof fruits); // "object"
```

---

### Functions

Functions are objects too — they are callable objects. You can store them in variables, pass them as arguments, and return them.

```javascript
let greet = function(name) {
  return "Hello, " + name;
};

console.log(greet("Amara")); // "Hello, Amara"
console.log(typeof greet);   // "function"
```

> 💡 `typeof` returns `"function"` for function objects — making them easy to identify despite technically being objects.

---

### Dates

The built-in `Date` object represents a point in time:

```javascript
let today = new Date();
console.log(today);         // current date and time
console.log(typeof today);  // "object"
```

---

### How Objects Are Stored — Pass by Reference

Unlike primitives, objects are stored and copied **by reference**. When you assign an object to a new variable, both variables point to the **same object in memory**.

```javascript
let studentA = { name: "Amara", grade: "A" };
let studentB = studentA;  // studentB points to the SAME object

studentB.grade = "B";     // changing via studentB...

console.log(studentA.grade); // "B" ← studentA is ALSO changed!
console.log(studentB.grade); // "B"
```

**Expected Output:**
```
B
B
```

> ⚠️ **Gotcha:** This surprises many beginners. Both variables reference the same object. Changing one changes both.

> 💡 **Analogy:** Think of objects as a shared Google Doc. `studentB = studentA` gives someone else the link. Edits made by either person show up for both.

#### How to make a true copy of an object

```javascript
// Shallow copy using spread syntax
let studentC = { ...studentA };

studentC.grade = "C";

console.log(studentA.grade); // "B" ← unchanged
console.log(studentC.grade); // "C"
```

---

## 1.6 The `typeof` Operator

### What is `typeof`?

`typeof` is a built-in JavaScript operator that inspects a value and returns a **string** describing its type. It is your go-to tool for checking what kind of data you are working with.

```
typeof <value>  →  returns a string
```

### The full `typeof` table

| Expression | Result |
|---|---|
| `typeof "hello"` | `"string"` |
| `typeof 42` | `"number"` |
| `typeof 42n` | `"bigint"` |
| `typeof true` | `"boolean"` |
| `typeof undefined` | `"undefined"` |
| `typeof null` | `"object"` ← (bug!) |
| `typeof Symbol()` | `"symbol"` |
| `typeof {}` | `"object"` |
| `typeof []` | `"object"` |
| `typeof function(){}` | `"function"` |

### Micro-Demo

```javascript
console.log(typeof "Amara");        // "string"
console.log(typeof 3.85);           // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object"   ← remember: this is the bug
console.log(typeof {});             // "object"
console.log(typeof []);             // "object"
console.log(typeof function(){});   // "function"
```

**Expected Output:**
```
string
number
boolean
undefined
object
object
object
function
```

### Using `typeof` in practice

```javascript
function processScore(score) {
  if (typeof score !== "number") {
    console.log("Error: score must be a number. Got: " + typeof score);
    return;
  }
  console.log("Processing score: " + score);
}

processScore(85);       // Processing score: 85
processScore("eighty"); // Error: score must be a number. Got: string
```

**Expected Output:**
```
Processing score: 85
Error: score must be a number. Got: string
```

### Detecting null correctly

Since `typeof null` returns `"object"`, you need a separate check for null:

```javascript
let value = null;

if (value === null) {
  console.log("Value is null");
} else if (typeof value === "object") {
  console.log("Value is a real object");
}
// Expected Output: Value is null
```

### Detecting arrays correctly

Since `typeof []` returns `"object"`, use `Array.isArray()` for arrays:

```javascript
let fruits = ["apple", "mango"];

console.log(typeof fruits);          // "object"
console.log(Array.isArray(fruits));  // true
```

### `typeof` can be used before a variable is declared

Uniquely, `typeof` does not throw an error if used on an undeclared variable:

```javascript
console.log(typeof undeclaredVariable); // "undefined" — no error thrown
```

This makes it safe for checking whether optional features exist in a browser environment.

---

## 1.7 Converting Values to Strings — `toString()` and Friends

### Why convert to a string?

Many real-world tasks require turning a value into text:

- Displaying a number in a `<p>` tag on a webpage
- Concatenating a number into a message: `"Your score is " + 95`
- Sending data to an API as a JSON string
- Formatting output for a report

JavaScript provides several methods to convert values to strings.

---

### Method 1: The Global `String()` Function

`String()` is the most reliable and universal method. It works on **any value**.

```javascript
String(123)       // "123"
String(3.14)      // "3.14"
String(true)      // "true"
String(false)     // "false"
String(null)      // "null"
String(undefined) // "undefined"
String(NaN)       // "NaN"
String(Infinity)  // "Infinity"
```

```javascript
let score = 95;
let message = "Your score is " + String(score) + " out of 100.";
console.log(message);
// Expected Output: Your score is 95 out of 100.
```

---

### Method 2: `.toString()` — The Method on Values

Most JavaScript values (except `null` and `undefined`) have a `.toString()` method you can call directly:

```javascript
let num = 255;
console.log(num.toString());    // "255"

let flag = true;
console.log(flag.toString());   // "true"

let arr = [1, 2, 3];
console.log(arr.toString());    // "1,2,3"
```

**Expected Output:**
```
255
true
1,2,3
```

#### ⚠️ `.toString()` fails on null and undefined

```javascript
let x = null;
x.toString(); // ❌ TypeError: Cannot read properties of null

// Use String() instead:
String(null); // ✅ "null"
```

#### `.toString()` with a radix (number base)

The `.toString()` method on numbers accepts an optional **radix** argument — the base of the number system to convert to:

```javascript
let num = 255;
console.log(num.toString(10));  // "255"    — base 10 (decimal, default)
console.log(num.toString(16));  // "ff"     — base 16 (hexadecimal)
console.log(num.toString(2));   // "11111111" — base 2 (binary)
console.log(num.toString(8));   // "377"    — base 8 (octal)
```

**Expected Output:**
```
255
ff
11111111
377
```

> 💡 **Real-World Use:** Web developers use `toString(16)` to convert colour values (like `255, 128, 0` → `"ff8000"` for `#ff8000` orange). Systems programmers use `toString(2)` to inspect binary representations.

---

### Method 3: String Concatenation (Implicit Conversion)

Adding a string to another value with `+` silently converts the other value to a string:

```javascript
let score = 95;
let output = "Score: " + score;
console.log(output); // "Score: 95"
console.log(typeof output); // "string"
```

> ⚠️ This is *implicit* type conversion — covered fully in Section 1.8.

---

### Method 4: Template Literals

Template literals automatically convert values to strings inside `${}`:

```javascript
let score = 95;
let grade = "A";
let report = `Student scored ${score} and received grade ${grade}.`;
console.log(report);
// Expected Output: Student scored 95 and received grade A.
```

---

### Method 5: Number-specific formatting methods

These return strings with specific formatting:

#### `.toFixed(n)` — Round to n decimal places

```javascript
let price = 19.99999;
console.log(price.toFixed(2)); // "20.00"

let gpa = 3.8567;
console.log(gpa.toFixed(2));   // "3.86"
```

#### `.toPrecision(n)` — n significant digits

```javascript
let value = 123.456;
console.log(value.toPrecision(5)); // "123.46"
console.log(value.toPrecision(2)); // "1.2e+2"
```

#### `.toExponential(n)` — Scientific notation

```javascript
let distance = 149600000;
console.log(distance.toExponential(2)); // "1.50e+8"
```

> 💡 **Real-World Use:** `.toFixed(2)` is used in every e-commerce system to format prices like `"$19.99"`. `.toExponential()` is used in scientific applications.

---

## 1.8 Type Conversion — Explicit and Implicit

### The Two Kinds of Type Conversion

| Kind | Also Called | Who Does It | Example |
|---|---|---|---|
| **Explicit** | Type casting | You (the programmer) | `Number("42")` |
| **Implicit** | Type coercion | JavaScript automatically | `"5" + 3` → `"53"` |

---

### Explicit Conversion

You intentionally call a function to convert a type.

#### Converting TO Number

```javascript
Number("42")      // 42
Number("3.14")    // 3.14
Number("")        // 0
Number(" ")       // 0
Number("hello")   // NaN
Number(true)      // 1
Number(false)     // 0
Number(null)      // 0
Number(undefined) // NaN
```

```javascript
// Real-world: reading a form input (always comes in as string)
let inputAge = "25";
let numericAge = Number(inputAge);
console.log(numericAge + 1); // 26  ← correct arithmetic
```

**Expected Output:**
```
26
```

#### Converting TO Number with `parseInt()` and `parseFloat()`

```javascript
parseInt("42px")     // 42    ← reads digits until a non-digit
parseInt("3.99")     // 3     ← truncates decimal
parseFloat("3.99em") // 3.99  ← includes decimal
parseInt("abc")      // NaN   ← starts with non-digit
```

```javascript
// Real-world: extracting font size from a CSS string
let fontSize = "16px";
let size = parseInt(fontSize);
console.log(size + 2); // 18
```

> 💡 **Why `parseInt`/`parseFloat` over `Number()`?**  
> `Number("16px")` returns `NaN`. But `parseInt("16px")` returns `16`. Use `parseInt`/`parseFloat` when your string contains units or extra characters.

#### Converting TO Boolean

```javascript
Boolean(1)         // true
Boolean(0)         // false
Boolean("hello")   // true
Boolean("")        // false
Boolean(null)      // false
Boolean(undefined) // false
Boolean({})        // true  ← even an empty object is truthy
Boolean([])        // true  ← even an empty array is truthy
```

```javascript
// Real-world: check if user typed anything in a search box
let searchQuery = "";
if (!Boolean(searchQuery)) {
  console.log("Please enter a search term.");
}
// Expected Output: Please enter a search term.
```

---

### Implicit Conversion (Type Coercion)

JavaScript sometimes silently converts types on your behalf. This can be surprising.

#### The `+` operator — addition OR concatenation?

The `+` operator has a dual personality:

- If **both** operands are numbers → **addition**
- If **either** operand is a string → **string concatenation**

```javascript
console.log(5 + 5);       // 10    — number + number
console.log("5" + 5);     // "55"  — string + number → concatenation
console.log(5 + "5");     // "55"  — number + string → concatenation
console.log("5" + "5");   // "55"  — string + string → concatenation
```

**Expected Output:**
```
10
55
55
55
```

> ⚠️ This answers the thinking question from Section 1.3. `5 + "5"` gives `"55"`, not `10`. This is a very common source of bugs in JavaScript.

#### `-`, `*`, `/` — these always try to convert to Number

Unlike `+`, the subtraction, multiplication, and division operators have **no string behaviour** — they always attempt numeric conversion:

```javascript
console.log("10" - 5);    // 5     ← "10" converted to 10
console.log("10" * 2);    // 20    ← "10" converted to 10
console.log("10" / 2);    // 5     ← "10" converted to 10
console.log("hello" - 5); // NaN   ← "hello" can't become a number
```

**Expected Output:**
```
5
20
5
NaN
```

#### Comparison operators and coercion

Loose equality `==` converts types before comparing. Strict equality `===` does **not** convert.

```javascript
console.log(0 == false);   // true  ← 0 and false both falsy
console.log(0 === false);  // false ← different types (Number vs Boolean)

console.log("" == false);  // true  ← both falsy
console.log("" === false); // false ← different types

console.log(1 == "1");     // true  ← string "1" converted to number 1
console.log(1 === "1");    // false ← different types
```

> 💡 **Best Practice:** Always use `===` (strict equality) in your code. It avoids surprising coercion bugs and makes your intent clear.

---

### Complete Conversion Reference Table

#### String to Number

| String | `Number()` | `parseInt()` | `parseFloat()` |
|---|---|---|---|
| `"42"` | `42` | `42` | `42` |
| `"3.14"` | `3.14` | `3` | `3.14` |
| `"42px"` | `NaN` | `42` | `42` |
| `""` | `0` | `NaN` | `NaN` |
| `" "` | `0` | `NaN` | `NaN` |
| `"hello"` | `NaN` | `NaN` | `NaN` |

#### To Boolean

| Value | `Boolean()` |
|---|---|
| `0`, `""`, `null`, `undefined`, `NaN`, `false` | `false` |
| Everything else | `true` |

#### To String

| Value | `String()` | `.toString()` |
|---|---|---|
| `123` | `"123"` | `"123"` |
| `true` | `"true"` | `"true"` |
| `null` | `"null"` | ❌ Error |
| `undefined` | `"undefined"` | ❌ Error |
| `[1,2,3]` | `"1,2,3"` | `"1,2,3"` |

---

# Section 2 — Applied Exercises

---

## Exercise 1 — Student Record Validator

### Warm-Up Mini-Example

Before the full exercise, practise this small check:

```javascript
function checkType(value) {
  console.log(value + " is of type: " + typeof value);
}

checkType("Amara");  // Amara is of type: string
checkType(17);       // 17 is of type: number
checkType(true);     // true is of type: boolean
```

---

### Objective

Build a function that validates a student record object by checking that each field is the expected data type.

### Scenario

You work at a school that receives student data from an online admission form. All values arrive as strings (because HTML forms always return strings), but your database needs proper types. You must check and convert each field.

### Step-by-Step Instructions

**Step 1:** Write a function `validateStudent(student)` that accepts an object with these fields:
- `name` — should be a non-empty string
- `age` — should be a number between 5 and 25
- `gpa` — should be a decimal number between 0.0 and 4.0
- `enrolled` — should be a boolean

**Step 2:** Use `typeof` to check each field. Report what type each field actually is.

**Step 3:** Attempt to convert string values to their correct types using `Number()` and `Boolean()`.

**Step 4:** After conversion, re-validate and report whether the student record is valid.

### Starter Code

```javascript
function validateStudent(student) {
  let errors = [];

  // Check name
  if (typeof student.name !== "string" || student.name.trim() === "") {
    errors.push("name must be a non-empty string. Got: " + typeof student.name);
  }

  // Check age — convert if string
  let age = typeof student.age === "string" ? Number(student.age) : student.age;
  if (isNaN(age) || age < 5 || age > 25) {
    errors.push("age must be a number between 5 and 25. Got: " + student.age);
  }

  // Check GPA — convert if string
  let gpa = typeof student.gpa === "string" ? parseFloat(student.gpa) : student.gpa;
  if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
    errors.push("gpa must be between 0.0 and 4.0. Got: " + student.gpa);
  }

  // Check enrolled
  if (typeof student.enrolled !== "boolean") {
    errors.push("enrolled must be a boolean. Got: " + typeof student.enrolled);
  }

  if (errors.length === 0) {
    console.log("✅ Student record is VALID.");
  } else {
    console.log("❌ Student record has errors:");
    errors.forEach(err => console.log("  - " + err));
  }
}
```

### Test Cases

```javascript
// Test 1: Good data
validateStudent({
  name: "Amara Osei",
  age: 17,
  gpa: 3.85,
  enrolled: true
});
// Expected: ✅ Student record is VALID.

// Test 2: Bad data from a form (all strings)
validateStudent({
  name: "Kofi Adu",
  age: "seventeen",   // non-numeric string
  gpa: "5.0",         // GPA out of range
  enrolled: "yes"     // not a boolean
});
// Expected: ❌ errors listed for age, gpa, enrolled

// Test 3: Edge case — empty name
validateStudent({
  name: "",
  age: 20,
  gpa: 2.5,
  enrolled: false
});
// Expected: ❌ name error
```

### Hints

- Use `isNaN()` to check if a number conversion failed.
- Remember: `Number("seventeen")` returns `NaN`.
- `parseFloat("5.0")` returns `5`, which is out of the 0–4.0 range.

### Self-Check Questions

1. Why do we use `parseFloat` for GPA instead of `parseInt`?
2. What does `isNaN(NaN)` return?
3. Why does `Boolean("false")` return `true` (and why is this a problem when processing a form's "false" checkbox value)?
4. What is the difference between `Number("") ` and `Number(" ")`? (Both return `0` — is that what you'd expect?)

### What-If Challenge

> What if a student record might have `null` as its enrolled field? (Perhaps the user skipped the question.) How would you update the check to allow `null` as a special "not answered" state rather than treating it as an error?

---

## Exercise 2 — Price Formatter

### Warm-Up Mini-Example

```javascript
let rawPrice = "19.9";
let numPrice  = parseFloat(rawPrice);
let formatted = "$" + numPrice.toFixed(2);
console.log(formatted); // "$19.90"
```

---

### Objective

Build a function that converts raw product prices (which may be strings, numbers, or missing values) into a consistently formatted currency string.

### Scenario

You work for an online store that gets product data from multiple suppliers. Some suppliers send prices as numbers, some as strings, some with currency symbols already, and some fields are missing. You need one reliable formatter.

### Requirements

Write a function `formatPrice(raw)` that:

1. Accepts any value (string, number, null, undefined)
2. Converts it to a proper number
3. Returns a formatted string like `"$19.99"` with exactly 2 decimal places
4. Returns `"Price unavailable"` if the value cannot be converted to a valid number

```javascript
function formatPrice(raw) {
  // Strip currency symbols if present (e.g. "$19.99" → "19.99")
  let cleaned = String(raw).replace(/[^0-9.]/g, "");

  let price = parseFloat(cleaned);

  if (isNaN(price)) {
    return "Price unavailable";
  }

  return "$" + price.toFixed(2);
}

// Test cases
console.log(formatPrice(19.9));       // "$19.90"
console.log(formatPrice("$29.50"));   // "$29.50"
console.log(formatPrice("14"));       // "$14.00"
console.log(formatPrice(null));       // "Price unavailable"
console.log(formatPrice("free"));     // "Price unavailable"
console.log(formatPrice(undefined));  // "Price unavailable"
```

**Expected Output:**
```
$19.90
$29.50
$14.00
Price unavailable
Price unavailable
Price unavailable
```

### Self-Check Questions

1. Why do we use `String(raw)` before calling `.replace()`?
2. `String(null)` returns `"null"` — what does `parseFloat("null")` return?
3. Why is `.toFixed(2)` important for prices? What would `0.1 + 0.2` return in JavaScript?

---

## Exercise 3 — Data Type Inspector

### Objective

Write a function that receives an array of unknown values and returns a detailed type report — similar to what a data profiling tool would produce.

### Scenario

You are building a data import tool. Users upload CSV files and your tool must analyse each column, detect what types of data are present, and flag potential issues.

### Starter Code

```javascript
function inspectValues(values) {
  let report = {
    total: values.length,
    strings: 0,
    numbers: 0,
    booleans: 0,
    nulls: 0,
    undefineds: 0,
    objects: 0,
    arrays: 0,
    unknowns: []
  };

  values.forEach(function(val, index) {
    if (val === null) {
      report.nulls++;
    } else if (val === undefined) {
      report.undefineds++;
    } else if (Array.isArray(val)) {
      report.arrays++;
    } else if (typeof val === "string") {
      report.strings++;
    } else if (typeof val === "number") {
      report.numbers++;
    } else if (typeof val === "boolean") {
      report.booleans++;
    } else if (typeof val === "object") {
      report.objects++;
    } else {
      report.unknowns.push({ index: index, value: val, type: typeof val });
    }
  });

  return report;
}

// Test
let dataset = [
  "Amara", 17, true, null, undefined,
  [1, 2, 3], { city: "Accra" }, "3.85", NaN, 0
];

console.log(inspectValues(dataset));
```

**Expected Output:**
```
{
  total: 10,
  strings: 2,      // "Amara" and "3.85"
  numbers: 3,      // 17, NaN, 0   ← NaN is typeof "number"!
  booleans: 1,     // true
  nulls: 1,        // null
  undefineds: 1,   // undefined
  objects: 1,      // { city: "Accra" }
  arrays: 1,       // [1, 2, 3]
  unknowns: []
}
```

> 🤔 Notice that `NaN` is counted as a `number`. Explain why.

### What-If Challenge

> Add a `nanCount` field to the report that specifically counts how many of the number values are `NaN`. Use `isNaN()` and `typeof`.

---

# Section 3 — Project Simulation

## Mini-Project: Student Report Card Generator

### Project Overview

You will build a **Student Report Card Generator** — a JavaScript program that:

1. Accepts raw student input (names, scores as strings, booleans as strings)
2. Validates and converts all data to the correct types
3. Calculates grades and averages
4. Generates a formatted text report

### Real-World Context

Schools, HR systems, and data entry applications constantly deal with raw user input that arrives as strings. This project simulates how a real developer sanitises, converts, and processes data before using it.

---

### Stage 1 — Setup and Core Data Conversion

**Illustrative Example First:**

```javascript
// Before Stage 1, understand what we're solving:
let rawInput = { name: "Kofi", score: "78", passed: "true" };
let converted = {
  name: rawInput.name,
  score: Number(rawInput.score),            // 78
  passed: rawInput.passed === "true"        // true (boolean)
};
console.log(converted);
// { name: "Kofi", score: 78, passed: true }
```

**Stage 1 Code:**

```javascript
// Raw data — simulating form input where everything is a string
let rawStudents = [
  { name: "Amara Osei",    math: "85", english: "90", science: "78", enrolled: "true" },
  { name: "Kofi Mensah",   math: "62", english: "70", science: "55", enrolled: "true" },
  { name: "Ama Darko",     math: "91", english: "88", science: "95", enrolled: "false" },
  { name: "Kweku Boateng", math: "45", english: "50", science: "NaN", enrolled: "true" }
];

// Convert raw data to proper types
function convertStudent(raw) {
  return {
    name:     raw.name,                     // stays a string
    math:     Number(raw.math),             // string → number
    english:  Number(raw.english),          // string → number
    science:  Number(raw.science),          // "NaN" → NaN
    enrolled: raw.enrolled === "true"       // string → boolean
  };
}

let students = rawStudents.map(convertStudent);

console.log(students[0]);
// { name: 'Amara Osei', math: 85, english: 90, science: 78, enrolled: true }
console.log(students[3].science); // NaN
```

**Expected Stage 1 Output (student 0):**
```
{ name: 'Amara Osei', math: 85, english: 90, science: 78, enrolled: true }
```

---

### Stage 2 — Adding Features: Calculation and Grading

**Illustrative Example First:**

```javascript
// Understand averages before applying to the project
let scores = [85, 90, 78];
let validScores = scores.filter(s => !isNaN(s));
let average = validScores.reduce((sum, s) => sum + s, 0) / validScores.length;
console.log(average.toFixed(1)); // "84.3"
```

**Stage 2 Code:**

```javascript
function getLetterGrade(average) {
  if (isNaN(average)) return "INC"; // Incomplete — missing scores
  if (average >= 90)  return "A";
  if (average >= 80)  return "B";
  if (average >= 70)  return "C";
  if (average >= 60)  return "D";
  return "F";
}

function processStudent(student) {
  let scores = [student.math, student.english, student.science];
  let validScores = scores.filter(s => !isNaN(s));

  let average = validScores.length > 0
    ? validScores.reduce((sum, s) => sum + s, 0) / validScores.length
    : NaN;

  let hasMissingScore = validScores.length < scores.length;

  return {
    ...student,
    average: isNaN(average) ? null : parseFloat(average.toFixed(1)),
    grade:   getLetterGrade(average),
    hasMissingScore: hasMissingScore,
    status:  student.enrolled ? "Active" : "Inactive"
  };
}

let processedStudents = students.map(processStudent);

console.log(processedStudents[0]);
// { name: 'Amara Osei', ..., average: 84.3, grade: 'B', hasMissingScore: false, status: 'Active' }

console.log(processedStudents[3]);
// { name: 'Kweku Boateng', ..., average: null, grade: 'INC', hasMissingScore: true, status: 'Active' }
```

---

### Stage 3 — Displaying the Report

**Stage 3 Code:**

```javascript
function generateReport(processedStudents) {
  let divider = "=".repeat(55);
  let report   = divider + "\n";
  report += "          STUDENT REPORT CARD\n";
  report += divider + "\n\n";

  processedStudents.forEach(function(student) {
    report += "Name:    " + student.name + "\n";
    report += "Status:  " + student.status + "\n";
    report += "Math:    " + (isNaN(student.math)    ? "Missing" : student.math)    + "\n";
    report += "English: " + (isNaN(student.english) ? "Missing" : student.english) + "\n";
    report += "Science: " + (isNaN(student.science) ? "Missing" : student.science) + "\n";
    report += "Average: " + (student.average !== null ? student.average : "N/A")   + "\n";
    report += "Grade:   " + student.grade + "\n";
    if (student.hasMissingScore) {
      report += "⚠️  Warning: One or more scores are missing.\n";
    }
    report += "\n" + "-".repeat(55) + "\n";
  });

  // Class summary
  let activeStudents = processedStudents.filter(s => s.status === "Active");
  let validAverages  = activeStudents
    .map(s => s.average)
    .filter(a => a !== null);

  let classAverage = validAverages.length > 0
    ? (validAverages.reduce((sum, a) => sum + a, 0) / validAverages.length).toFixed(1)
    : "N/A";

  report += "\nCLASS SUMMARY\n";
  report += "Total Students:  " + processedStudents.length + "\n";
  report += "Active Students: " + activeStudents.length + "\n";
  report += "Class Average:   " + classAverage + "\n";
  report += divider + "\n";

  return report;
}

console.log(generateReport(processedStudents));
```

**Expected Output:**
```
=======================================================
          STUDENT REPORT CARD
=======================================================

Name:    Amara Osei
Status:  Active
Math:    85
English: 90
Science: 78
Average: 84.3
Grade:   B

-------------------------------------------------------
Name:    Kofi Mensah
Status:  Active
Math:    62
English: 70
Science: 55
Average: 62.3
Grade:   D

-------------------------------------------------------
Name:    Ama Darko
Status:  Inactive
Math:    91
English: 88
Science: 95
Average: 91.3
Grade:   A

-------------------------------------------------------
Name:    Kweku Boateng
Status:  Active
Math:    45
English: 50
Science: Missing
Average: N/A
Grade:   INC
⚠️  Warning: One or more scores are missing.

-------------------------------------------------------

CLASS SUMMARY
Total Students:  4
Active Students: 3
Class Average:   73.3
=======================================================
```

---

### Reflection Questions

1. Why did we need to convert `"true"` and `"false"` strings using `=== "true"` instead of `Boolean()`? What would `Boolean("false")` return and why is that a problem?

2. We used `Number(raw.science)` which converts `"NaN"` to `NaN`. How could you detect and flag this *before* processing instead of after?

3. The class average excluded the inactive student (Ama Darko). How would you change the logic to include all students regardless of enrollment status?

4. How would this program change if scores could also be `null` (representing a legitimately skipped exam) vs. `NaN` (representing a data entry error)? Why does the distinction matter?

5. A real school system might store this data in a database. What SQL or NoSQL data types would you use for each field, and how do they map to JavaScript types?

### Optional Advanced Features

- Add a `rank` field — assign each student a class rank (1st, 2nd, etc.) based on their average, skipping students with grade "INC".
- Add a `passRate` to the class summary — the percentage of active students who passed (grade C or above).
- Add input sanitisation — strip extra whitespace from names using `.trim()`, and handle scores like `"85 "` (with a trailing space).

---

# Completion Checklist

| Item | Status |
|---|---|
| All 8 data types explained with examples | ✅ |
| Primitive types individually demonstrated | ✅ |
| Object types individually demonstrated | ✅ |
| Pass-by-value vs pass-by-reference explained | ✅ |
| `typeof` operator fully covered with table | ✅ |
| `typeof null` bug documented | ✅ |
| Array detection with `Array.isArray()` explained | ✅ |
| `toString()` method with all variants covered | ✅ |
| `.toFixed()`, `.toPrecision()`, `.toExponential()` covered | ✅ |
| Explicit conversion: `Number()`, `parseInt()`, `parseFloat()`, `Boolean()`, `String()` | ✅ |
| Implicit conversion / type coercion documented | ✅ |
| `+` operator dual behaviour (add vs concatenate) explained | ✅ |
| `==` vs `===` and coercion difference explained | ✅ |
| Common beginner mistakes highlighted | ✅ |
| Three applied exercises with real-world scenarios | ✅ |
| Full mini-project with three stages and reflection questions | ✅ |

---

**Summary:** JavaScript's type system centres on 7 primitives (simple, immutable, copied by value) and the Object type (complex, mutable, copied by reference). The `typeof` operator is your runtime type inspector — memorise its quirks, especially `typeof null === "object"`. Use `String()`, `Number()`, and `Boolean()` for safe explicit conversion; be alert to implicit coercion, particularly the `+` operator's string-favouring behaviour. Mastering these fundamentals is the foundation of every JavaScript program you will ever write.
