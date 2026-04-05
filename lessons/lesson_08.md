---
render_with_liquid: false
title: "JavaScript Numbers: JS Numbers · Number Methods · Number Properties · Number Reference · Bitwise · BigInt"
nav_order: 8
---

## 📋 Table of Contents
1. [What Is a Number in JavaScript?](#1-what-is-a-number-in-javascript)
2. [Writing Numbers — Integers, Decimals & Scientific Notation](#2-writing-numbers)
3. [How JavaScript Stores Numbers — The 64-bit Float Format](#3-how-javascript-stores-numbers)
4. [Integer Precision — The 15-Digit Limit](#4-integer-precision)
5. [Floating-Point Precision Problems (and How to Fix Them)](#5-floating-point-precision)
6. [Special Number Values: NaN, Infinity, and -Infinity](#6-special-number-values)
7. [Number Bases: Hexadecimal, Octal, Binary](#7-number-bases)
8. [Numbers and Strings Together — Type Coercion Traps](#8-numbers-and-strings)
9. [Number Methods — Converting & Formatting](#9-number-methods)
10. [Number Methods — Parsing Strings into Numbers](#10-parsing-methods)
11. [Number Methods — Checking Numbers](#11-checking-methods)
12. [Number Properties — Built-in Constants](#12-number-properties)
13. [Complete Number Reference Table](#13-number-reference-table)
14. [JavaScript Bitwise Operators — Binary Math](#14-bitwise-operators)
15. [Bitwise Shift Operators](#15-bitwise-shift-operators)
16. [Converting Between Binary and Decimal](#16-binary-decimal-conversion)
17. [JavaScript BigInt — Working with Huge Numbers](#17-bigint)
18. [Applied Exercises](#18-applied-exercises)
19. [Mini-Project: Financial Calculator](#19-mini-project)
20. [Completion Checklist](#20-completion-checklist)

---

## 1. What Is a Number in JavaScript?

### What Is It?

A **number** in JavaScript is any numeric value — whole numbers, decimals, positive, negative — all treated as the same data type: `Number`.

This is different from many other programming languages. In Java or C++, for example, you have separate types: `int` (whole numbers), `float` (decimals), `double` (larger decimals), `long` (very big integers). JavaScript simplifies all of this into a **single type**: `Number`.

Think of JavaScript's Number like a single universal box that can hold any kind of numeric value.

### Why Does This Matter?

Because there is only ONE number type in JavaScript, you don't have to decide what "kind" of number to use. But it also means JavaScript has some specific limitations and quirks you must understand to avoid bugs.

### Real-World Relevance

Numbers are everywhere in programming:
- Price of a product: `29.99`
- A user's age: `25`
- Website visitor count: `1500000`
- A GPS coordinate: `6.5244` (latitude of Lagos)
- A bank account balance: `250000.75`
- A pixel color value: `255`

Every shopping cart, calculator, grade system, or financial dashboard depends on numbers.

---

## 2. Writing Numbers

### Integers and Decimals

JavaScript numbers can be written with or without decimal points — both are valid:

```javascript
let price = 29.99;    // A number WITH decimals (called a "float")
let age = 25;         // A number WITHOUT decimals (called an "integer")
let temperature = -5; // Negative numbers work too

console.log(price);       // 29.99
console.log(age);         // 25
console.log(temperature); // -5
```

### Extra Large Numbers — Scientific (Exponential) Notation

When working with very large or very small numbers, JavaScript lets you use **exponential notation** (like scientific notation in math):

```javascript
// e+N means "multiply by 10 to the power of N"
let bigNum = 123e5;   // 123 × 10^5 = 12,300,000
let smallNum = 123e-5; // 123 × 10^-5 = 0.00123

console.log(bigNum);   // 12300000
console.log(smallNum); // 0.00123
```

**Step-by-step for `123e5`:**
- `e5` means "move the decimal point 5 places to the right"
- `123` → `12300000`

**Step-by-step for `123e-5`:**
- `e-5` means "move the decimal point 5 places to the LEFT"
- `123` → `0.00123`

### Real-world use:

```javascript
let earthMassKg = 5.972e24;    // 5,972,000,000,000,000,000,000,000 kg
let electronCharge = 1.6e-19;  // 0.00000000000000000016 coulombs
console.log(earthMassKg);      // 5.972e+24
```

---

## 3. How JavaScript Stores Numbers — The 64-bit Float Format

### The IEEE 754 Standard

JavaScript stores ALL numbers — integers and decimals alike — using the **64-bit floating-point format**, defined by the international standard called **IEEE 754**.

Think of it like this: JavaScript uses a fixed-size container (64 bits) to store every number. These 64 bits are divided into three parts:

| Part | Bits Used | Purpose |
|------|-----------|---------|
| Sign | 1 bit | Positive or negative |
| Exponent | 11 bits | Where the decimal point is |
| Mantissa (Fraction) | 52 bits | The actual digits |

You don't need to memorize this, but understanding the concept explains why JavaScript has precision limits — there are only 64 bits of space, so very large or very precise numbers can't be stored perfectly.

### What does this mean in practice?

```javascript
// JavaScript can represent integers exactly up to 15 significant digits
let safe = 999999999999999;     // 15 nines → accurate
let unsafe = 9999999999999999;  // 16 nines → loses accuracy!

console.log(safe);    // 999999999999999   ✅ exact
console.log(unsafe);  // 10000000000000000 ❌ rounded!
```

> 🤔 **Thinking question:** What could go wrong if a bank used JavaScript numbers to store account balances in the trillions without considering this limit?

---

## 4. Integer Precision — The 15-Digit Limit

### The Safe Rule

JavaScript integers are **accurate up to 15 digits**. Beyond that, numbers get rounded:

```javascript
let x = 999999999999999;    // 15 digits — safe ✅
let y = 9999999999999999;   // 16 digits — NOT safe ❌

console.log(x);  // 999999999999999
console.log(y);  // 10000000000000000  (rounded!)
```

### Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER

JavaScript has built-in constants that tell you the exact safe limits:

```javascript
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991
```

These numbers are `2^53 - 1` and `-(2^53 - 1)`. Any integer within this range is guaranteed to be represented exactly.

```javascript
// Safe:
console.log(Number.isSafeInteger(9007199254740991));   // true
// Not safe:
console.log(Number.isSafeInteger(9007199254740992));   // false
```

> **For numbers bigger than this safe range, use BigInt** (covered in Section 17).

---

## 5. Floating-Point Precision Problems (and How to Fix Them)

### The Classic Surprise

This is one of the most famous "gotcha" moments in JavaScript — and in many other languages that use IEEE 754:

```javascript
let x = 0.1 + 0.2;
console.log(x);           // 0.30000000000000004  ❌ (not 0.3!)
console.log(x === 0.3);   // false  ❌
```

**Why does this happen?**

Just like `1/3 = 0.333...` cannot be written exactly as a decimal, `0.1` and `0.2` cannot be represented EXACTLY in binary (base-2) floating-point. When you add them, the tiny imprecisions combine into a visible error.

This is NOT a JavaScript bug — it is how binary floating-point math works everywhere.

### How to Fix It — Method 1: Multiply, Calculate, Divide

```javascript
let x = (0.1 * 10 + 0.2 * 10) / 10;
console.log(x);  // 0.3  ✅
```

**Why this works:** We convert to integers first (integers are exact), do the math, then convert back.

### How to Fix It — Method 2: `toFixed()`

```javascript
let x = (0.1 + 0.2).toFixed(2);
console.log(x);          // "0.30"  ✅ (note: returns a STRING)
console.log(Number(x));  // 0.3    ✅ (convert back to number)
```

> ⚠️ **Common Beginner Mistake:** Comparing floating-point numbers directly with `===`. Always round or use a tolerance check for decimal comparisons.

```javascript
// ❌ Wrong way:
if (0.1 + 0.2 === 0.3) { ... }  // Never true!

// ✅ Right way (check if difference is tiny enough):
let result = 0.1 + 0.2;
if (Math.abs(result - 0.3) < 0.0001) {
  console.log("Close enough to 0.3!");
}
```

---

## 6. Special Number Values: NaN, Infinity, and -Infinity

### NaN — Not a Number

`NaN` stands for **Not a Number**. It is returned when a mathematical operation produces an undefined or invalid result.

```javascript
let result = 100 / "Apple";  // Can't divide a number by text
console.log(result);          // NaN
console.log(typeof result);   // "number"  (NaN IS of type number — a quirky fact!)
```

**How NaN spreads:**

```javascript
let x = NaN;
console.log(x + 5);    // NaN  (NaN is "infectious")
console.log(x + "5");  // "NaN5"  (NaN becomes text when added to string)
```

**Checking for NaN:**

Use `isNaN()` to test whether a value is NaN — you cannot use `=== NaN` because NaN is the only value in JavaScript that is NOT equal to itself:

```javascript
let x = NaN;
console.log(x === NaN);       // false  ← NaN ≠ NaN (by definition!)
console.log(isNaN(x));        // true   ✅
console.log(Number.isNaN(x)); // true   ✅ (more strict — preferred)
```

**Difference between `isNaN()` and `Number.isNaN()`:**

```javascript
isNaN("hello");         // true  (converts "hello" to NaN first, then checks)
Number.isNaN("hello");  // false (does NOT convert — "hello" is a string, not NaN)
Number.isNaN(NaN);      // true  (strictly checks for NaN)
```

> ✅ **Best practice:** Use `Number.isNaN()` for strict NaN checking.

**Real-world use:**
```javascript
let userInput = "abc";
let num = Number(userInput);

if (Number.isNaN(num)) {
  console.log("Please enter a valid number!");
} else {
  console.log(`You entered: ${num}`);
}
// Output: Please enter a valid number!
```

### Infinity and -Infinity

`Infinity` is a special value that represents a number too large for JavaScript to hold, or the result of dividing by zero:

```javascript
let x = 2 / 0;
console.log(x);           // Infinity

let y = -2 / 0;
console.log(y);           // -Infinity

let z = Infinity + 1;
console.log(z);           // Infinity (infinity + anything = infinity)
```

**Checking for Infinity:**

```javascript
console.log(isFinite(Infinity));   // false
console.log(isFinite(100));        // true
console.log(isFinite(NaN));        // false
console.log(Number.isFinite(100)); // true  (stricter version)
```

**Real-world use:**
```javascript
// Guard against division by zero in a speed calculator:
function calculateSpeed(distance, time) {
  if (time === 0) return "Time cannot be zero!";
  let speed = distance / time;
  return isFinite(speed) ? speed : "Invalid result";
}
console.log(calculateSpeed(100, 2));  // 50
console.log(calculateSpeed(100, 0));  // "Time cannot be zero!"
```

---

## 7. Number Bases: Hexadecimal, Octal, Binary

### What Are Number Bases?

We normally count in **base 10** (decimal): digits 0–9. But computers and programmers often use other bases:

| Base | Name | Digits Used | JS Prefix |
|------|------|-------------|-----------|
| 10 | Decimal | 0–9 | (none) |
| 16 | Hexadecimal | 0–9, A–F | `0x` |
| 8 | Octal | 0–7 | `0o` |
| 2 | Binary | 0, 1 | `0b` |

### Hexadecimal (Base 16)

Hexadecimal is used extensively in web development for colors, memory addresses, and encoding:

```javascript
let hex1 = 0xFF;    // = 255 in decimal
let hex2 = 0x1A;    // = 26 in decimal
let colorRed = 0xFF0000; // red color in hex

console.log(hex1);    // 255
console.log(hex2);    // 26
console.log(colorRed); // 16711680
```

**In CSS and HTML, colors are written as hex:**
- `#FF0000` = red (255 red, 0 green, 0 blue)
- `#00FF00` = green
- `#0000FF` = blue

### Octal (Base 8)

```javascript
let oct = 0o17;  // = 15 in decimal
console.log(oct); // 15
```

### Binary (Base 2)

```javascript
let bin = 0b1010;  // = 10 in decimal (1×8 + 0×4 + 1×2 + 0×1)
console.log(bin);  // 10
```

### Converting Between Bases Using `toString(base)`

You can convert any number to a different base using `.toString(radix)`:

```javascript
let num = 255;
console.log(num.toString(16));  // "ff"   (hexadecimal)
console.log(num.toString(8));   // "377"  (octal)
console.log(num.toString(2));   // "11111111" (binary)
console.log(num.toString(10));  // "255"  (decimal — default)
```

**Real-world use:**
```javascript
// Convert a decimal color value to hex (for CSS):
let r = 255, g = 128, b = 0;
let hexColor = `#${r.toString(16).padStart(2,"0")}${g.toString(16).padStart(2,"0")}${b.toString(16).padStart(2,"0")}`;
console.log(hexColor);  // "#ff8000"  (an orange color)
```

---

## 8. Numbers and Strings Together — Type Coercion Traps

### What Is Type Coercion?

JavaScript automatically converts (coerces) data between types in certain situations. With numbers and strings, this can produce surprising results.

### The `+` Operator — Addition OR Concatenation?

The `+` operator BOTH adds numbers AND joins (concatenates) strings. JavaScript decides which to do based on the types:

```javascript
// Number + Number = addition:
console.log(10 + 20);          // 30

// String + String = concatenation:
console.log("10" + "20");      // "1020"

// Number + String = concatenation (number gets converted to string first!):
console.log(10 + "20");        // "1020"  ← TRAP!
console.log("10" + 20);        // "1020"  ← TRAP!
```

> ⚠️ **Common Beginner Mistake:** Forgetting that `+` with a string always concatenates. This is the #1 JavaScript bug for beginners.

```javascript
// The cascade trap:
let a = 10;
let b = 20;
let c = 30;
console.log(a + b + c);          // 60    (all numbers, adds normally)
console.log(a + b + "30");       // "3030" (adds 10+20=30 first, then "30"+"30"="3030")
console.log("10" + b + c);       // "1020 30" — actually "102030"
```

**Step-by-step for `10 + 20 + "30"`:**
1. `10 + 20` → `30` (both numbers, normal addition)
2. `30 + "30"` → `"3030"` (number + string = concatenation)

### Other Operators — Subtraction, Multiplication, Division

All other math operators (`-`, `*`, `/`, `**`, `%`) automatically convert strings to numbers:

```javascript
console.log("10" - 5);   // 5   ✅ (string "10" becomes number 10)
console.log("10" * 2);   // 20  ✅
console.log("10" / 2);   // 5   ✅
console.log("abc" - 5);  // NaN  (can't convert "abc" to a number)
```

> 🤔 **Thinking question:** If a user types `"5"` in a form input, what does `"5" + 3` give? What about `"5" - 3`?
> Answer: `"53"` (concatenation) vs `2` (subtraction converts string to number).

---

## 9. Number Methods — Converting and Formatting

### `toString()` — Number to String

Converts a number into a string. Can optionally take a **base** (2, 8, 10, 16):

```javascript
let x = 255;
console.log(x.toString());    // "255"
console.log(x.toString(16));  // "ff"  (hexadecimal)
console.log(x.toString(2));   // "11111111" (binary)

// Works on literals too:
console.log((123).toString()); // "123"
console.log((100 + 23).toString()); // "123"
```

### `toFixed(digits)` — Fixed Decimal Places

Rounds a number to a specified number of decimal places and returns it as a **string**:

```javascript
let price = 9.656;
console.log(price.toFixed(0));  // "10"   (rounds to nearest integer)
console.log(price.toFixed(2));  // "9.66" (2 decimal places)
console.log(price.toFixed(4));  // "9.6560" (pads with zeros)

let small = 1.5;
console.log(small.toFixed(2));  // "1.50"
```

**Real-world use — Financial formatting:**
```javascript
let cartTotal = 1234.5678;
let formatted = `₦${Number(cartTotal.toFixed(2)).toLocaleString()}`;
console.log(formatted);  // "₦1,234.57"
```

> ⚠️ **Remember:** `toFixed()` returns a STRING, not a number. Wrap with `Number()` or `parseFloat()` if you need to do more math with it.

### `toPrecision(digits)` — Significant Figures

Formats a number to a specified number of **significant digits** total (not just after the decimal):

```javascript
let x = 9.656;
console.log(x.toPrecision());   // "9.656"  (no change)
console.log(x.toPrecision(2));  // "9.7"    (2 significant digits total)
console.log(x.toPrecision(4));  // "9.656"  (4 significant digits total)
console.log(x.toPrecision(6));  // "9.65600" (pads to 6 sig figs)

let big = 123.456;
console.log(big.toPrecision(4)); // "123.5"  (4 sig figs total)
```

**Difference between `toFixed` and `toPrecision`:**
- `toFixed(2)` → always 2 digits AFTER the decimal
- `toPrecision(4)` → exactly 4 TOTAL significant digits

### `toExponential(digits)` — Scientific Notation

Converts a number to exponential (scientific) notation:

```javascript
let x = 9.656;
console.log(x.toExponential(2));  // "9.66e+0"
console.log(x.toExponential(4));  // "9.6560e+0"

let big = 123456;
console.log(big.toExponential(2)); // "1.23e+5"
console.log(big.toExponential(4)); // "1.2346e+5"
```

### `valueOf()` — Primitive Value

Returns the primitive number value. Rarely needed directly, but used internally by JavaScript:

```javascript
let x = 123;
console.log(x.valueOf());  // 123
console.log((123).valueOf()); // 123
console.log((100 + 23).valueOf()); // 123
```

> **Note:** All number methods return a NEW value. They do NOT change the original number.

---

## 10. Parsing Methods — Converting Strings to Numbers

These are **global methods** (and also available on `Number`) that convert string values to numbers.

### `Number()` — Convert Anything to a Number

Tries to convert a value of any type to a number:

```javascript
// Strings:
console.log(Number("3.14"));    // 3.14   ✅
console.log(Number("10"));      // 10     ✅
console.log(Number("  42  "));  // 42     ✅ (trims whitespace)
console.log(Number(""));        // 0      ✅
console.log(Number("12 34"));   // NaN    ❌ (space in middle)
console.log(Number("John"));    // NaN    ❌

// Booleans:
console.log(Number(true));      // 1
console.log(Number(false));     // 0

// Special:
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN
console.log(Number([]));        // 0
console.log(Number([10]));      // 10
```

> **Why does `Number(true)` return 1?** Because `true` is essentially "yes" (1) and `false` is "no" (0) in mathematics. This is useful in programming logic.

### `parseInt()` — Parse an Integer from a String

Reads a string from left to right and extracts an **integer**, stopping at the first non-numeric character:

```javascript
console.log(parseInt("10"));      // 10
console.log(parseInt("10.5"));    // 10     (drops the decimal!)
console.log(parseInt("10 dogs")); // 10     (stops at space)
console.log(parseInt("dogs 10")); // NaN    (starts with non-number)
console.log(parseInt("10.9abc")); // 10     (reads up to decimal)

// With a radix (base):
console.log(parseInt("FF", 16));  // 255    (hex → decimal)
console.log(parseInt("11", 2));   // 3      (binary → decimal)
console.log(parseInt("17", 8));   // 15     (octal → decimal)
```

**Step-by-step for `parseInt("10 dogs")`:**
- Reads `1` → valid digit
- Reads `0` → valid digit
- Reads ` ` (space) → stop!
- Returns `10`

### `parseFloat()` — Parse a Decimal Number from a String

Like `parseInt()` but keeps the decimal portion:

```javascript
console.log(parseFloat("10.5"));      // 10.5
console.log(parseFloat("10.5abc"));   // 10.5
console.log(parseFloat("10.5 20.5")); // 10.5   (only reads first number)
console.log(parseFloat("abc"));       // NaN
console.log(parseFloat("3.14xyz"));   // 3.14
```

### When to use which?

| Function | Use when... | Example |
|----------|-------------|---------|
| `Number(x)` | Converting a whole value (no junk after digits) | Form input "42" → `Number("42")` = 42 |
| `parseInt(x)` | You need a whole number from mixed string | `"10px"` → `parseInt("10px")` = 10 |
| `parseFloat(x)` | You need decimal from mixed string | `"3.14em"` → `parseFloat("3.14em")` = 3.14 |

**Real-world use — Extracting numbers from CSS values:**
```javascript
let fontSize = "16px";
let lineHeight = "1.5em";
let padding = "12.5px";

console.log(parseInt(fontSize));     // 16
console.log(parseFloat(lineHeight)); // 1.5
console.log(parseFloat(padding));    // 12.5
```

---

## 11. Checking Methods

### `Number.isInteger(value)` — Is It a Whole Number?

Returns `true` if the value is an integer (no decimal part):

```javascript
console.log(Number.isInteger(10));    // true
console.log(Number.isInteger(10.0));  // true  (10.0 is the same as 10)
console.log(Number.isInteger(10.5));  // false
console.log(Number.isInteger("10"));  // false (string, not a number)
console.log(Number.isInteger(NaN));   // false
console.log(Number.isInteger(Infinity)); // false
```

**Real-world use:**
```javascript
// Validate that a quantity entered is a whole number:
function validateQuantity(qty) {
  if (!Number.isInteger(qty) || qty <= 0) {
    return "Quantity must be a positive whole number!";
  }
  return `Order quantity: ${qty}`;
}
console.log(validateQuantity(5));    // "Order quantity: 5"
console.log(validateQuantity(5.5));  // "Quantity must be a positive whole number!"
```

### `Number.isFinite(value)` — Is It a Real, Usable Number?

Returns `true` if the value is a finite number (not Infinity, not NaN):

```javascript
console.log(Number.isFinite(100));       // true
console.log(Number.isFinite(Infinity));  // false
console.log(Number.isFinite(-Infinity)); // false
console.log(Number.isFinite(NaN));       // false
console.log(Number.isFinite("100"));     // false (it's a string)
```

### `Number.isNaN(value)` — Is It Specifically NaN?

Returns `true` ONLY if the value is the actual `NaN` value:

```javascript
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN("NaN"));     // false (it's a string, not NaN)
console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN(100));       // false
```

### `Number.isSafeInteger(value)` — Is It Within Safe Range?

Returns `true` if the integer is within the safe range `-(2^53 - 1)` to `(2^53 - 1)`:

```javascript
console.log(Number.isSafeInteger(9007199254740991));  // true  (max safe)
console.log(Number.isSafeInteger(9007199254740992));  // false (one over the limit)
console.log(Number.isSafeInteger(10.5));              // false (not an integer)
```

---

## 12. Number Properties — Built-in Constants

Number **properties** are constants stored directly on the `Number` object. They tell you the boundaries and special values of JavaScript numbers.

> **Important:** These must be accessed via `Number.PROPERTY_NAME` — NOT via a number variable (e.g., `x.MAX_VALUE` will return `undefined`).

### `Number.MAX_VALUE`

The largest positive number JavaScript can represent:

```javascript
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
```

Numbers larger than this become `Infinity`.

### `Number.MIN_VALUE`

The smallest positive number (closest to zero, NOT the most negative):

```javascript
console.log(Number.MIN_VALUE);  // 5e-324
```

This is an incredibly small positive fraction — essentially the tiniest non-zero number possible.

### `Number.MAX_SAFE_INTEGER`

The largest integer that can be represented exactly without precision loss:

```javascript
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991
// This equals 2^53 - 1
```

### `Number.MIN_SAFE_INTEGER`

The most negative safe integer:

```javascript
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991
// This equals -(2^53 - 1)
```

### `Number.POSITIVE_INFINITY`

Represents infinity (same as the global `Infinity`):

```javascript
console.log(Number.POSITIVE_INFINITY);  // Infinity
let overflow = Number.MAX_VALUE * 2;
console.log(overflow);                  // Infinity
```

### `Number.NEGATIVE_INFINITY`

Represents negative infinity:

```javascript
console.log(Number.NEGATIVE_INFINITY);  // -Infinity
```

### `Number.NaN`

The NaN value (same as the global `NaN`):

```javascript
console.log(Number.NaN);          // NaN
console.log(Number.NaN === NaN);  // false (NaN ≠ NaN always)
```

### `Number.EPSILON`

The smallest difference between two representable floating-point numbers:

```javascript
console.log(Number.EPSILON);  // 2.220446049250313e-16
```

Used to safely compare floating-point numbers:

```javascript
// Safe float comparison using EPSILON:
function areEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
console.log(areEqual(0.1 + 0.2, 0.3));  // true ✅
```

---

## 13. Complete Number Reference Table

### Number Instance Methods

| Method | What It Does | Example → Output |
|--------|-------------|-----------------|
| `toFixed(n)` | Format to n decimal places (returns string) | `(9.656).toFixed(2)` → `"9.66"` |
| `toPrecision(n)` | Format to n total significant digits | `(9.656).toPrecision(4)` → `"9.656"` |
| `toExponential(n)` | Convert to exponential notation | `(123456).toExponential(2)` → `"1.23e+5"` |
| `toString(base)` | Convert number to string (optional base) | `(255).toString(16)` → `"ff"` |
| `valueOf()` | Return the primitive number value | `(123).valueOf()` → `123` |

### Number Static Methods

| Method | What It Does | Example → Output |
|--------|-------------|-----------------|
| `Number(x)` | Convert value to number | `Number("3.14")` → `3.14` |
| `Number.isInteger(x)` | Is it a whole number? | `Number.isInteger(10.5)` → `false` |
| `Number.isFinite(x)` | Is it a finite number? | `Number.isFinite(Infinity)` → `false` |
| `Number.isNaN(x)` | Is it NaN specifically? | `Number.isNaN(NaN)` → `true` |
| `Number.isSafeInteger(x)` | Is it in the safe range? | `Number.isSafeInteger(9007199254740992)` → `false` |
| `Number.parseFloat(x)` | Parse string to float | `Number.parseFloat("3.14em")` → `3.14` |
| `Number.parseInt(x)` | Parse string to integer | `Number.parseInt("10px")` → `10` |

### Number Properties

| Property | Value | Meaning |
|----------|-------|---------|
| `Number.MAX_VALUE` | ~1.8e+308 | Largest representable number |
| `Number.MIN_VALUE` | ~5e-324 | Smallest positive number |
| `Number.MAX_SAFE_INTEGER` | 9007199254740991 | Largest exact integer |
| `Number.MIN_SAFE_INTEGER` | -9007199254740991 | Smallest exact integer |
| `Number.POSITIVE_INFINITY` | Infinity | Overflow value |
| `Number.NEGATIVE_INFINITY` | -Infinity | Negative overflow |
| `Number.NaN` | NaN | Not a Number |
| `Number.EPSILON` | 2.22e-16 | Smallest float difference |

### Global Functions

| Function | What It Does | Example → Output |
|----------|-------------|-----------------|
| `isNaN(x)` | Checks if x is NaN (with type coercion) | `isNaN("hello")` → `true` |
| `isFinite(x)` | Checks if x is finite (with type coercion) | `isFinite(Infinity)` → `false` |
| `parseInt(x, base)` | Parse integer from string | `parseInt("FF", 16)` → `255` |
| `parseFloat(x)` | Parse float from string | `parseFloat("3.14abc")` → `3.14` |

---

## 14. JavaScript Bitwise Operators — Binary Math

### What Are Bitwise Operators?

**Bitwise operators** work directly on the **binary (base-2) representation** of numbers — operating on individual bits (0s and 1s), one at a time.

Think of it this way: when you add `5 + 3`, you work on the full decimal numbers. But when you do `5 & 3` (bitwise AND), JavaScript first converts both numbers to their binary form, performs the operation bit-by-bit, then converts the result back to decimal.

### How JavaScript Handles Bitwise Operations

JavaScript stores numbers as 64-bit floats, but **all bitwise operations work on 32-bit signed integers**. This means:
1. The number is converted to a 32-bit binary integer
2. The bitwise operation is performed
3. The result is converted back to a 64-bit JavaScript number

```
Number 5 in binary (32-bit): 00000000000000000000000000000101
Number 3 in binary (32-bit): 00000000000000000000000000000011
```

### Why Learn Bitwise?

Bitwise operators are used in:
- **Permissions systems** (e.g., read = 4, write = 2, execute = 1 — like Linux file permissions)
- **Image processing** (pixel color manipulation)
- **Cryptography** and hashing algorithms
- **Performance-critical code** (bitwise ops are extremely fast)
- **Checking even/odd numbers quickly**
- **Network programming** (IP address masking)

### Bitwise AND — `&`

Returns `1` in each bit position where BOTH corresponding bits are `1`, otherwise `0`.

**Truth table for AND:**

| Bit A | Bit B | A AND B |
|-------|-------|---------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | **1** |

```javascript
// 5 in binary:  0101
// 3 in binary:  0011
//              -----
// 5 & 3:        0001  = 1

console.log(5 & 3);   // 1

// How each bit was decided:
// bit 3: 0 AND 0 = 0
// bit 2: 1 AND 0 = 0
// bit 1: 0 AND 1 = 0
// bit 0: 1 AND 1 = 1  ← only this bit is 1 in BOTH
```

**Real-world trick — Check if a number is even or odd:**
```javascript
// The last bit of any number is 1 if odd, 0 if even
console.log(7 & 1);   // 1 → odd   (7 = 0111, last bit = 1)
console.log(8 & 1);   // 0 → even  (8 = 1000, last bit = 0)
console.log(100 & 1); // 0 → even
console.log(99 & 1);  // 1 → odd

// Much faster than using modulo:
function isEven(n) { return (n & 1) === 0; }
console.log(isEven(10));  // true
console.log(isEven(11));  // false
```

### Bitwise OR — `|`

Returns `1` in each bit position where AT LEAST ONE of the corresponding bits is `1`.

**Truth table for OR:**

| Bit A | Bit B | A OR B |
|-------|-------|--------|
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | **1** |

```javascript
// 5 = 0101
// 3 = 0011
// |  = 0111  = 7

console.log(5 | 3);   // 7
```

**Real-world use — Permissions (like Linux):**
```javascript
const READ    = 4;  // 100 in binary
const WRITE   = 2;  // 010 in binary
const EXECUTE = 1;  // 001 in binary

// Give read + write permission using OR:
let userPermissions = READ | WRITE;
console.log(userPermissions);  // 6  (110 in binary)

// Check if user has write permission using AND:
console.log(userPermissions & WRITE);   // 2 → truthy → has write!
console.log(userPermissions & EXECUTE); // 0 → falsy → no execute
```

### Bitwise XOR — `^`

Returns `1` where bits are **DIFFERENT**, `0` where they are the SAME. ("Exclusive OR")

**Truth table for XOR:**

| Bit A | Bit B | A XOR B |
|-------|-------|---------|
| 0 | 0 | 0 |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | 0 |

```javascript
// 5 = 0101
// 3 = 0011
// ^  = 0110  = 6

console.log(5 ^ 3);   // 6

// XOR trick — toggle a bit:
let flag = 0;
flag ^= 1; console.log(flag);  // 1  (toggled on)
flag ^= 1; console.log(flag);  // 0  (toggled off)
flag ^= 1; console.log(flag);  // 1  (toggled on again)
```

### Bitwise NOT — `~`

Flips ALL bits (0 becomes 1, 1 becomes 0). Because of how JavaScript handles 32-bit signed integers, `~n` always equals `-(n + 1)`:

```javascript
console.log(~5);   // -6   (-(5+1) = -6)
console.log(~0);   // -1
console.log(~-1);  // 0

// Binary:
// 5 in 32-bit: 00000000000000000000000000000101
// ~5:          11111111111111111111111111111010  = -6 (two's complement)
```

**Why -(n+1)?** JavaScript uses "two's complement" for negative numbers. Flipping all bits of n gives the two's complement value of -(n+1).

**Common use — `~` as a quick indexOf check:**
```javascript
let arr = [10, 20, 30];
// Old way:
if (arr.indexOf(20) !== -1) { console.log("found"); }
// Shortcut with ~ (if index is -1, ~(-1) = 0 which is falsy):
if (~arr.indexOf(20)) { console.log("found"); }  // "found"
if (~arr.indexOf(99)) { console.log("found"); }  // (nothing printed — 0 is falsy)
```

---

## 15. Bitwise Shift Operators

### Left Shift — `<<` (Zero Fill)

Shifts bits to the LEFT by the specified number of positions. Zeros fill in from the right. Left bits fall off.

**Effect:** Multiplies the number by 2 for each shift position.

```javascript
// 5 in binary: 0101
// 5 << 1:     1010  = 10  (shifted 1 left = multiplied by 2^1 = ×2)
// 5 << 2:    10100  = 20  (shifted 2 left = multiplied by 2^2 = ×4)

console.log(5 << 1);  // 10
console.log(5 << 2);  // 20
console.log(5 << 3);  // 40
console.log(1 << 4);  // 16  (very fast way to compute 2^4)
```

**Step-by-step for `5 << 1`:**
```
5 in binary:   0 0 0 0 0 1 0 1
Shift left 1:  0 0 0 0 1 0 1 0   ← zero pushed in from right
Result:        10 in decimal
```

### Signed Right Shift — `>>` (Sign-Preserving)

Shifts bits to the RIGHT. The leftmost bit (sign bit) is copied to fill from the left. Right bits fall off.

**Effect:** Divides the number by 2 for each shift position (rounds toward negative infinity).

```javascript
console.log(20 >> 1);  // 10  (20 / 2 = 10)
console.log(20 >> 2);  // 5   (20 / 4 = 5)
console.log(-20 >> 1); // -10 (sign is preserved: -20 / 2 = -10)
```

### Unsigned Right Shift — `>>>` (Zero Fill)

Like `>>` but always fills with zeros from the left (ignores sign). For negative numbers, this gives a large positive number:

```javascript
console.log(20 >>> 1);  // 10    (same as >> for positive numbers)
console.log(-1 >>> 0);  // 4294967295  (all 32 bits become 1 = max 32-bit unsigned int)
```

**Practical use of `>>> 0` — Convert to 32-bit unsigned integer:**
```javascript
// Useful for converting any number to a safe 32-bit integer:
function to32bit(n) { return n >>> 0; }
console.log(to32bit(-1));  // 4294967295
console.log(to32bit(5));   // 5
```

### Bitwise Assignment Operators

All bitwise operators have assignment shorthand versions:

```javascript
let x = 5;
x &= 3;  console.log(x);  // 1   (same as x = x & 3)
x = 5;
x |= 3;  console.log(x);  // 7   (same as x = x | 3)
x = 5;
x ^= 3;  console.log(x);  // 6   (same as x = x ^ 3)
x = 5;
x <<= 1; console.log(x);  // 10  (same as x = x << 1)
x = 5;
x >>= 1; console.log(x);  // 2   (same as x = x >> 1)
```

### Full Bitwise Operator Reference

| Operator | Name | Usage | Example |
|----------|------|-------|---------|
| `&` | AND | 1 only if both bits are 1 | `5 & 3` → `1` |
| `\|` | OR | 1 if at least one bit is 1 | `5 \| 3` → `7` |
| `^` | XOR | 1 if bits are different | `5 ^ 3` → `6` |
| `~` | NOT | Flip all bits | `~5` → `-6` |
| `<<` | Left shift | Shift left (pad with 0) | `5 << 1` → `10` |
| `>>` | Right shift | Shift right (preserve sign) | `20 >> 1` → `10` |
| `>>>` | Unsigned right shift | Shift right (pad with 0) | `20 >>> 1` → `10` |

---

## 16. Converting Between Binary and Decimal

### Decimal to Binary

```javascript
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

console.log(dec2bin(5));    // "101"
console.log(dec2bin(255));  // "11111111"
console.log(dec2bin(10));   // "1010"
```

**How it works:**
- `>>> 0` converts the number to an unsigned 32-bit integer (handles negatives)
- `.toString(2)` converts to base-2 (binary) string

### Binary to Decimal

```javascript
function bin2dec(bin) {
  return parseInt(bin, 2).toString(10);
}

console.log(bin2dec("101"));       // "5"
console.log(bin2dec("11111111"));  // "255"
console.log(bin2dec("1010"));      // "10"
```

**How it works:**
- `parseInt(bin, 2)` parses the string as base-2 (binary)
- `.toString(10)` converts back to decimal string (base 10)

### Two's Complement — How Negative Numbers Are Stored

JavaScript binary numbers are stored in **two's complement** format. This means:
- Positive numbers: stored normally
- Negative numbers: the bitwise NOT of the number, plus 1

```javascript
// 5 in binary:    00000000000000000000000000000101
// NOT 5 (~5):     11111111111111111111111111111010
// ~5 + 1 = -5:   11111111111111111111111111111011

// Verify:
console.log(~5 + 1);  // -5  ← this is two's complement of 5
```

---

## 17. JavaScript BigInt — Working with Huge Numbers

### What Is BigInt?

**BigInt** is JavaScript's second numeric data type (introduced in ES2020), designed specifically to handle integers that are **too large** for the regular `Number` type to represent accurately.

Remember: regular numbers lose precision beyond 15-16 digits. BigInt has NO upper limit — it can handle numbers of arbitrary size.

### When Do You Need BigInt?

- Bank account systems with very high balances
- Cryptography (RSA keys are thousands of bits long)
- Scientific computing (galaxy-sized numbers)
- Unique ID generators for large databases
- Handling timestamps in nanoseconds

### Creating a BigInt

Two ways to create a BigInt:

**Method 1 — Append `n` to any integer:**
```javascript
let big1 = 9999999999999999n;       // note the 'n' at the end
let big2 = 1234567890123456789012345n;

console.log(big1);  // 9999999999999999n  ✅ (exact! no rounding)
```

**Compare to regular Number:**
```javascript
let regular = 9999999999999999;    // number (no n)
let bigint  = 9999999999999999n;   // BigInt (with n)

console.log(regular);  // 10000000000000000  ❌ rounded!
console.log(bigint);   // 9999999999999999n  ✅ exact!
```

**Method 2 — Use `BigInt()` constructor:**
```javascript
let big3 = BigInt(1234567890123456789);
let big4 = BigInt("1234567890123456789012345");  // use string for very large!

console.log(big3);  // 1234567890123456768n  (not exact — limit of JS number literal)
console.log(big4);  // 1234567890123456789012345n  ✅ (string bypasses number limit)
```

> ⚠️ **Important:** When creating VERY large BigInts with the `BigInt()` constructor, always pass a **string** to avoid the number precision issue being baked in before BigInt even sees it.

### BigInt Arithmetic

BigInt supports all standard math operators, but ONLY with other BigInts:

```javascript
let a = 1000000000000000000n;
let b = 2000000000000000000n;

console.log(a + b);   // 3000000000000000000n  ✅
console.log(b - a);   // 1000000000000000000n  ✅
console.log(a * 3n);  // 3000000000000000000n  ✅
console.log(b / a);   // 2n  ✅
console.log(b % 3n);  // 2n  ✅ (remainder)
console.log(2n ** 100n); // 1267650600228229401496703205376n  ✅ (2^100)
```

> ⚠️ **You CANNOT mix BigInt and Number in operations:**
```javascript
let big = 10n;
let num = 5;

// ❌ This throws a TypeError:
// console.log(big + num);  // TypeError: Cannot mix BigInt and other types

// ✅ Convert explicitly:
console.log(big + BigInt(num));  // 15n
console.log(Number(big) + num);  // 15  (converts BigInt to Number first)
```

### BigInt Division — Always Integer Result

BigInt division truncates (cuts off) the decimal, never rounds:

```javascript
console.log(10n / 3n);   // 3n  (NOT 3.333...n — decimals not allowed!)
console.log(-10n / 3n);  // -3n  (truncates toward zero)
```

> BigInt cannot represent decimals at all. For decimal math, use regular `Number`.

### BigInt Comparisons

```javascript
// Comparing two BigInts:
console.log(10n > 5n);    // true
console.log(10n < 5n);    // false
console.log(10n === 10n); // true

// Comparing BigInt to Number:
console.log(10n == 10);   // true   (loose equality — converts types)
console.log(10n === 10);  // false  (strict equality — different types!)
console.log(10n > 9);     // true   (comparison operators work across types)
console.log(10n < 20);    // true
```

> **Rule:** `==` works between BigInt and Number. `===` always returns `false` because they are different types.

### BigInt as Boolean

BigInt behaves like a number in boolean context: `0n` is falsy, everything else is truthy:

```javascript
console.log(Boolean(0n));  // false
console.log(Boolean(1n));  // true
console.log(Boolean(-5n)); // true

if (0n) { console.log("never"); }
if (5n) { console.log("yes!");  }  // "yes!"
```

### BigInt Number Bases

BigInt supports hex, octal, and binary notation just like regular numbers:

```javascript
let hexBig = 0x1FFFFFFFFFFFFFn;   // hex BigInt
let octBig = 0o777777777777777n;  // octal BigInt
let binBig = 0b111111111111111111111111111111111111111111111111111n;  // binary BigInt

console.log(hexBig);  // 9007199254740991n
```

### BigInt Methods

```javascript
let big = 12345678901234567890n;

console.log(big.toString());     // "12345678901234567890"
console.log(big.toString(16));   // hex string
console.log(big.toString(2));    // binary string
console.log(typeof big);         // "bigint"
```

### BigInt Bitwise Operations

BigInt supports bitwise operators, but ONLY with other BigInts:

```javascript
let a = 5n;   // binary: 0101
let b = 3n;   // binary: 0011

console.log(a & b);   // 1n   (0001)  AND
console.log(a | b);   // 7n   (0111)  OR
console.log(a ^ b);   // 6n   (0110)  XOR
console.log(~a);      // -6n          NOT

// Shifts:
let big = 10n;   // binary: 1010
console.log(big << 2n);  // 40n   (101000) — left shift by 2
console.log(big >> 1n);  // 5n    (0101)   — right shift by 1

// Note: Unsigned right shift (>>>) is NOT allowed with BigInt
```

### BigInt Limitations

Things BigInt CANNOT do:
- Use `Math` methods: `Math.max(1n, 2n)` → TypeError
- Mix with regular Number in math operations
- Represent decimal/fractional values
- Use unsigned right shift `>>>`

```javascript
// ❌ These will throw errors:
// Math.max(1n, 2n);     // TypeError
// 10n + 5;              // TypeError
// 10n / 3n === 3.33n;   // BigInt can't be decimal

// ✅ Workarounds:
console.log(10n > 9n ? 10n : 9n);  // 10n  (manual comparison instead of Math.max)
console.log(Number(10n) + 5);       // 15   (convert to number first)
```

### BigInt is the Second Numeric Type

```javascript
console.log(typeof 42);    // "number"
console.log(typeof 42n);   // "bigint"  ← a completely different type
```

---

## 18. Applied Exercises

---

### 🏋️ Exercise 1 — Smart Price Calculator

**Objective:** Practice `toFixed()`, floating-point precision fixes, `Number()`, `parseFloat()`, and `isNaN()`.

**Real-world Scenario:** You're building an e-commerce checkout system that must handle user input, calculate totals accurately, and display formatted prices.

**Warm-up Mini-Example:**
```javascript
let price = "24.99";  // user input is a string from form
let qty = 3;
let total = parseFloat(price) * qty;
console.log(`Total: $${total.toFixed(2)}`);  // Total: $74.97
```

**Your Exercise:**

Given this data from a web form:
```javascript
let rawPrice = "1499.99";   // price entered as string
let rawQty = "3";           // quantity entered as string
let discountRate = "0.15";  // 15% discount
let taxRate = 0.075;        // 7.5% tax
```

**Step-by-step Instructions:**
1. Convert all string inputs to numbers using `parseFloat()` or `Number()`
2. Validate: if any value is `NaN`, display an error message
3. Calculate: subtotal = price × quantity
4. Apply discount: discounted = subtotal × (1 - discountRate)
5. Apply tax: total = discounted × (1 + taxRate)
6. Display each value formatted to 2 decimal places

**Expected Output:**
```
=== Order Summary ===
Unit Price:    ₦1,499.99
Quantity:      3
Subtotal:      ₦4,499.97
Discount (15%): -₦675.00
After Discount: ₦3,824.97
Tax (7.5%):    ₦286.87
TOTAL:         ₦4,111.84
```

**Self-Check Questions:**
- What does `parseFloat("1499.99abc")` return?
- What happens if the user types `"free"` as the price?
- Why not just use `Number()` instead of `parseFloat()` for currency?

**What-if challenge:** What if qty is `0` or negative? Add a validation check.

---

### 🏋️ Exercise 2 — Binary Permissions Manager

**Objective:** Practice bitwise operators in a real-world permissions system.

**Real-world Scenario:** A content management system (CMS) needs to manage user permissions. Each permission is a power of 2 (bit flag), allowing combinations to be stored as a single number.

**Warm-up Mini-Example:**
```javascript
const READ = 1;  // 001
const WRITE = 2; // 010
let perm = READ | WRITE;  // 011 = 3
console.log("Can read:", !!(perm & READ));   // true
console.log("Can write:", !!(perm & WRITE)); // true
```

**Your Exercise:**

```javascript
const PERMISSIONS = {
  VIEW:    1,   // 0001
  COMMENT: 2,   // 0010
  EDIT:    4,   // 0100
  DELETE:  8,   // 1000
  ADMIN:   16   // 10000
};
```

**Step-by-step Instructions:**
1. Create three users with different permission levels:
   - `guest`: VIEW only
   - `editor`: VIEW, COMMENT, EDIT
   - `admin`: all permissions
2. Write a function `hasPermission(userPerms, perm)` that returns `true`/`false`
3. Write a function `grantPermission(userPerms, perm)` that adds a permission
4. Write a function `revokePermission(userPerms, perm)` that removes a permission
5. Test all functions and display the results

**Hints:**
- Grant permission: `userPerms | newPerm` (OR adds it)
- Revoke permission: `userPerms & ~removedPerm` (AND NOT removes it)
- Check permission: `(userPerms & perm) !== 0`

**Expected Output:**
```
=== Permission Manager ===
Guest permissions (binary): 00001
Editor permissions (binary): 00111
Admin permissions (binary): 11111

Guest can VIEW: true
Guest can EDIT: false
Editor can EDIT: true
Editor can DELETE: false
Admin can DELETE: true

Granting COMMENT to guest...
New guest permissions: 00011
Guest can now COMMENT: true

Revoking EDIT from editor...
New editor permissions: 00011
Editor can EDIT: false
```

---

### 🏋️ Exercise 3 — BigInt Factorial Calculator

**Objective:** Practice BigInt for large number computation.

**Real-world Scenario:** In cryptography and statistics, you often need to calculate factorials of large numbers. These numbers become enormous very quickly — far beyond what regular Number can handle.

**Warm-up Mini-Example:**
```javascript
// 5! = 5 × 4 × 3 × 2 × 1 = 120
function factorial(n) {
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
console.log(factorial(5));   // 120n
console.log(factorial(10));  // 3628800n
```

**Your Exercise:**

1. Write a `factorial(n)` function using BigInt
2. Calculate `factorial(50)` and `factorial(100)`
3. Show the number of digits in the result using `.toString().length`
4. Show why regular Number fails for `factorial(20)` (compare results)
5. Display results formatted with digit grouping

**Expected Output:**
```
=== Factorial Calculator ===

factorial(10)  = 3,628,800
Digits: 7

factorial(20) using Number: 2432902008176640000  ❌ (imprecise)
factorial(20) using BigInt: 2432902008176640000n ✅ (exact)

factorial(50) = 30,414,093,201,713,378,043,612,608,166,979,...
Digits: 65

factorial(100):
Digits: 158
(Too large to display fully!)
```

---

## 19. Mini-Project: Financial Calculator

### 💰 Project Overview

You will build a **Personal Finance Dashboard** — a realistic program that calculates loan repayments, investment growth, currency conversion, and savings goals, using all the number concepts from this tutorial.

**Skills practiced:** `toFixed()`, `toPrecision()`, `parseFloat()`, `isNaN()`, `Number.isFinite()`, floating-point precision handling, BigInt for large sums.

---

### Stage 1 — Loan Repayment Calculator

**Illustrative Preview:**
```javascript
// Monthly interest rate
let monthlyRate = 0.12 / 12;  // 12% annual → 1% monthly
console.log(monthlyRate.toPrecision(4));  // "0.01000"
```

**The Formula:**

Monthly Payment = `P × r × (1+r)^n / ((1+r)^n - 1)`

Where:
- `P` = Principal (loan amount)
- `r` = Monthly interest rate (annual rate / 12)
- `n` = Total number of months (years × 12)

```javascript
let principal = 5000000;       // ₦5,000,000 loan
let annualRate = 0.18;         // 18% per year
let years = 3;                 // 3-year loan

let r = annualRate / 12;       // monthly rate
let n = years * 12;            // total months

let payment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
let totalPaid = payment * n;
let totalInterest = totalPaid - principal;
```

**Expected Output for Stage 1:**
```
╔══════════════════════════════════════╗
║      LOAN REPAYMENT CALCULATOR       ║
╚══════════════════════════════════════╝
Principal:        ₦5,000,000.00
Annual Rate:      18.00%
Duration:         3 years (36 months)
Monthly Rate:     1.50%

Monthly Payment:  ₦180,757.07
Total Paid:       ₦6,507,254.52
Total Interest:   ₦1,507,254.52
Interest %:       30.14%
```

---

### Stage 2 — Compound Interest Investment Growth

**The Formula:** `A = P × (1 + r/n)^(n×t)`

Where:
- `A` = Final amount
- `P` = Initial investment
- `r` = Annual interest rate
- `n` = Compounding frequency per year
- `t` = Time in years

```javascript
let investment = 100000;       // ₦100,000 initial
let annualReturn = 0.15;       // 15% annual return
let compoundFreq = 12;         // monthly compounding
let investmentYears = 10;      // 10 years
```

**Expected Output for Stage 2:**
```
╔══════════════════════════════════════╗
║     INVESTMENT GROWTH CALCULATOR     ║
╚══════════════════════════════════════╝
Initial Investment:  ₦100,000.00
Annual Return:       15.00%
Compounding:         Monthly
Duration:            10 years

Year 1:    ₦116,075.45
Year 3:    ₦156,394.14
Year 5:    ₦210,718.17
Year 10:   ₦444,020.25

Total Growth:        ₦344,020.25
Growth Multiple:     4.44x
```

---

### Stage 3 — Full Dashboard + BigInt for National Budget

Combine both calculators and add a BigInt section showing national-scale numbers:

```javascript
// National debt calculation using BigInt:
let nationalDebtNaira = 87000000000000n;  // ₦87 trillion
let populationNigeria = 220000000n;        // 220 million people
let debtPerCitizen = nationalDebtNaira / populationNigeria;
```

**Expected Final Output:**
```
╔══════════════════════════════════════════════╗
║         PERSONAL FINANCE DASHBOARD           ║
╚══════════════════════════════════════════════╝

📋 LOAN SUMMARY
  Monthly Payment:  ₦180,757.07
  Total Interest:   ₦1,507,254.52

📈 INVESTMENT SUMMARY
  Value after 10yr: ₦444,020.25
  Total Growth:     4.44×

🏛️ NATIONAL SCALE (BigInt)
  National Debt:          ₦87,000,000,000,000
  Population:             220,000,000
  Debt Per Citizen:       ₦395,454

🔢 NUMBER FACTS
  MAX_SAFE_INTEGER: 9,007,199,254,740,991
  Loan fits in safe range: true
  National debt needs BigInt: true
```

---

### Reflection Questions

1. Why does the loan calculator need `toFixed(2)` at the end?
2. What would happen if you passed `0` as the interest rate to the loan formula?
3. Why is BigInt necessary for national financial figures?
4. If a user enters `"5million"` in a form field, what does `parseFloat("5million")` return? Is this useful or dangerous?
5. How would you modify the investment calculator to add monthly contributions?

### Optional Advanced Features

- Add a loan amortization table (show each monthly payment broken into principal + interest)
- Build a currency converter using live exchange rates
- Create a savings goal calculator: "How many months to save ₦1,000,000 at ₦50,000/month with 10% annual interest?"
- Use BigInt to calculate how many atoms are in your body (~7 × 10^27)

---

## 20. Completion Checklist

| # | Concept | Status |
|---|---------|--------|
| ✅ | JavaScript has one Number type — what it is and why | Done |
| ✅ | Writing integers, decimals, and scientific notation | Done |
| ✅ | IEEE 754 64-bit float format and what it means | Done |
| ✅ | Integer precision — the 15-digit safe limit | Done |
| ✅ | Floating-point precision problems and fixes | Done |
| ✅ | NaN — what it is, how to check it, `Number.isNaN()` vs `isNaN()` | Done |
| ✅ | Infinity and -Infinity — when they appear and how to check | Done |
| ✅ | Hex, octal, binary — number bases and base conversion | Done |
| ✅ | Type coercion — the `+` string trap and other surprises | Done |
| ✅ | `toFixed()`, `toPrecision()`, `toExponential()`, `toString()` | Done |
| ✅ | `Number()`, `parseInt()`, `parseFloat()` — parsing methods | Done |
| ✅ | `Number.isInteger()`, `Number.isFinite()`, `Number.isNaN()`, `Number.isSafeInteger()` | Done |
| ✅ | All Number properties: MAX_VALUE, MIN_VALUE, MAX_SAFE_INTEGER, EPSILON, etc. | Done |
| ✅ | Complete Number reference table | Done |
| ✅ | Bitwise operators — AND, OR, XOR, NOT with examples | Done |
| ✅ | Shift operators — `<<`, `>>`, `>>>` | Done |
| ✅ | Binary/decimal conversion functions | Done |
| ✅ | Two's complement explained | Done |
| ✅ | BigInt — when to use it, how to create it | Done |
| ✅ | BigInt arithmetic, comparisons, type rules | Done |
| ✅ | BigInt bitwise operations | Done |
| ✅ | BigInt limitations and workarounds | Done |
| ✅ | 3 Applied Exercises with real-world scenarios | Done |
| ✅ | Full mini-project: Financial Dashboard | Done |
| ✅ | Common beginner mistakes highlighted throughout | Done |
| ✅ | Reflection questions answered | Done |

---

**One-sentence summary:** JavaScript numbers are all stored as 64-bit floating-point values with one universal Number type plus a BigInt type for unlimited-size integers, and they come with powerful methods for formatting, parsing, validating, and performing bitwise binary operations — skills essential for building calculators, financial apps, data processors, and permission systems.
