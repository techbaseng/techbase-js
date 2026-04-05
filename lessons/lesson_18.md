---
render_with_liquid: false
title: "JavaScript Math & Random: Math Properties · All Math Methods · Random Numbers · Full Reference"
nav_order: 18
---

## 📑 Table of Contents
1. [Background: What Is the Math Object?](#1-background-what-is-the-math-object)
2. [Topic 1 — Math Properties (Constants)](#2-topic-1--math-properties-constants)
3. [Topic 2 — Rounding Methods](#3-topic-2--rounding-methods)
4. [Topic 3 — Arithmetic & Exponent Methods](#4-topic-3--arithmetic--exponent-methods)
5. [Topic 4 — Min, Max & Clamp](#5-topic-4--min-max--clamp)
6. [Topic 5 — Logarithm & Trigonometry Methods](#6-topic-5--logarithm--trigonometry-methods)
7. [Topic 6 — Math.random() — Random Numbers](#7-topic-6--mathrandom--random-numbers)
8. [Topic 7 — Complete Math Reference](#8-topic-7--complete-math-reference)
9. [Applied Exercises](#9-applied-exercises)
10. [Mini Project — Casino Dice & Statistics Simulator](#10-mini-project--casino-dice--statistics-simulator)
11. [Completion Checklist](#11-completion-checklist)

---

## 1. Background: What Is the Math Object?

In everyday life, you regularly need mathematical operations that go beyond simple `+`, `-`, `*`, `/`:

- Rounding a price to 2 decimal places
- Finding the largest value in a list
- Calculating a square root for geometry
- Generating a random number for a game
- Working with angles for animations

JavaScript provides the **`Math` object** — a built-in collection of mathematical constants and functions — ready to use without importing anything.

```javascript
// No import needed — Math is always available
console.log(Math.PI);          // 3.141592653589793
console.log(Math.sqrt(16));    // 4
console.log(Math.round(4.7));  // 5
console.log(Math.random());    // e.g. 0.7362841...
```

### Key Facts About the Math Object

| Fact | Detail |
|------|--------|
| **Type** | Static object — NOT a constructor |
| **Usage** | `Math.methodName()` — never `new Math()` |
| **Properties** | 8 mathematical constants |
| **Methods** | 30+ mathematical functions |
| **Number type** | All values are JavaScript 64-bit floats |

> 🐛 **COMMON MISTAKE:** `new Math()` throws a `TypeError`. Math is not a class — it is a plain object with static properties and methods. You never instantiate it.
> ```javascript
> const m = new Math(); // ❌ TypeError: Math is not a constructor
> const pi = Math.PI;   // ✅ correct
> ```

> 🏢 **REAL WORLD:** Math methods appear in every domain of software: financial apps (rounding money), games (random events, physics), maps (distance calculations using trigonometry), data science (statistics), graphics (transformations), and UI animations (easing curves).

---
---

## 2. Topic 1 — Math Properties (Constants)

> **Phase 1 — Conceptual Understanding**

The Math object has **8 built-in constants** — mathematical values that are used so frequently in real calculations that JavaScript provides them pre-computed to full precision.

```javascript
console.log(Math.E);       // 2.718281828459045  — Euler's number
console.log(Math.PI);      // 3.141592653589793  — Pi
console.log(Math.SQRT2);   // 1.4142135623730951 — Square root of 2
console.log(Math.SQRT1_2); // 0.7071067811865476 — Square root of 1/2
console.log(Math.LN2);     // 0.6931471805599453 — Natural log of 2
console.log(Math.LN10);    // 2.302585092994046  — Natural log of 10
console.log(Math.LOG2E);   // 1.4426950408889634 — Log base 2 of E
console.log(Math.LOG10E);  // 0.4342944819032518 — Log base 10 of E
```

**▶ Expected Output:**
```
2.718281828459045
3.141592653589793
1.4142135623730951
0.7071067811865476
0.6931471805599453
2.302585092994046
1.4426950408889634
0.4342944819032518
```

### The Most Important Constant: `Math.PI`

`Math.PI` (π ≈ 3.14159…) is used in every circular and angular calculation:

```javascript
// Area of a circle: A = π × r²
function circleArea(radius) {
  return Math.PI * radius ** 2;
}
console.log(circleArea(5).toFixed(2));  // 78.54

// Circumference: C = 2 × π × r
function circumference(radius) {
  return 2 * Math.PI * radius;
}
console.log(circumference(5).toFixed(2)); // 31.42
```

**▶ Expected Output:**
```
78.54
31.42
```

### `Math.E` — Euler's Number

`Math.E` (e ≈ 2.71828…) is the base of the natural logarithm. It appears in compound interest, population growth, and probability:

```javascript
// Compound interest: A = P × e^(r × t)
function continuousCompound(principal, rate, years) {
  return principal * Math.E ** (rate * years);
}
// $1000 at 5% for 10 years
console.log(continuousCompound(1000, 0.05, 10).toFixed(2)); // 1648.72
```

**▶ Expected Output:** `1648.72`

---

### All 8 Math Constants at a Glance

| Constant | Value | Common Use |
|----------|-------|------------|
| `Math.E` | 2.718... | Exponential growth, natural log |
| `Math.PI` | 3.141... | Circles, angles, trigonometry |
| `Math.SQRT2` | 1.414... | Diagonal of a unit square |
| `Math.SQRT1_2` | 0.707... | Reciprocal of √2 |
| `Math.LN2` | 0.693... | Converting between log bases |
| `Math.LN10` | 2.302... | Converting natural log to log₁₀ |
| `Math.LOG2E` | 1.442... | Log base 2 of Euler's number |
| `Math.LOG10E` | 0.434... | Log base 10 of Euler's number |

---
---

## 3. Topic 2 — Rounding Methods

> **Phase 1 — Conceptual Understanding**

Rounding is one of the most frequently used mathematical operations in real apps — displaying prices, scores, ratings, and measurements all require rounding. JavaScript provides **four distinct rounding methods**, each with a specific behaviour.

---

### The Four Rounding Methods — Side by Side

Before diving in, see all four on the same number:

```javascript
const n = 4.6;

console.log(Math.round(n));  // 5  — nearest integer (rounds .5 up)
console.log(Math.floor(n));  // 4  — always rounds DOWN (toward -∞)
console.log(Math.ceil(n));   // 5  — always rounds UP  (toward +∞)
console.log(Math.trunc(n));  // 4  — always removes decimal (toward 0)
```

**▶ Expected Output:**
```
5
4
5
4
```

Now watch how they differ for **negative** numbers — this is where beginners are often surprised:

```javascript
const n = -4.6;

console.log(Math.round(n));  // -5  — rounds to nearest (-4.6 → -5)
console.log(Math.floor(n));  // -5  — DOWN means MORE negative
console.log(Math.ceil(n));   // -4  — UP means LESS negative
console.log(Math.trunc(n));  // -4  — just removes the decimal
```

**▶ Expected Output:**
```
-5
-5
-4
-4
```

> 🤔 **THINK ABOUT IT:** For negative numbers, "floor" (down) means more negative, and "ceil" (up) means less negative. Think of a number line — floor always goes left, ceil always goes right, trunc always goes toward zero.

---

### `Math.round(x)` — Round to Nearest Integer

Rounds to the nearest whole number. If the decimal is exactly `.5`, it rounds UP (away from zero for positive numbers).

```javascript
console.log(Math.round(4.1));  // 4
console.log(Math.round(4.5));  // 5  ← .5 rounds up
console.log(Math.round(4.9));  // 5
console.log(Math.round(-4.5)); // -4 ← .5 rounds TOWARD zero for negatives
```

**▶ Expected Output:**
```
4
5
5
-4
```

#### Real use — round to decimal places:

JavaScript's `Math.round` only rounds to whole numbers. To round to a specific number of decimal places, multiply, round, then divide:

```javascript
// Round to 2 decimal places
function roundTo(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

console.log(roundTo(3.14159, 2)); // 3.14
console.log(roundTo(2.5678,  1)); // 2.6
console.log(roundTo(1.005,   2)); // 1.01 (note: floating-point edge case)
```

> 💡 **TIP:** `toFixed(n)` is usually cleaner for displaying rounded numbers as strings:
> ```javascript
> console.log((3.14159).toFixed(2)); // "3.14"  ← returns a STRING
> console.log(+(3.14159).toFixed(2)); // 3.14   ← the + converts back to Number
> ```

---

### `Math.floor(x)` — Always Round Down

Rounds toward **negative infinity** — the largest integer less than or equal to x.

```javascript
console.log(Math.floor(4.1));  // 4
console.log(Math.floor(4.9));  // 4  ← still 4, not 5!
console.log(Math.floor(4.0));  // 4
console.log(Math.floor(-4.1)); // -5 ← goes MORE negative
console.log(Math.floor(-4.9)); // -5
```

**▶ Expected Output:**
```
4
4
4
-5
-5
```

> 🏢 **REAL WORLD:** `Math.floor` is the go-to for random integer generation (covered in Topic 6) and converting a time in seconds to whole minutes: `Math.floor(seconds / 60)`.

---

### `Math.ceil(x)` — Always Round Up

Rounds toward **positive infinity** — the smallest integer greater than or equal to x.

```javascript
console.log(Math.ceil(4.1));  // 5
console.log(Math.ceil(4.9));  // 5
console.log(Math.ceil(4.0));  // 4  ← already an integer, no change
console.log(Math.ceil(-4.1)); // -4 ← goes LESS negative (toward zero)
console.log(Math.ceil(-4.9)); // -4
```

**▶ Expected Output:**
```
5
5
4
-4
-4
```

> 🏢 **REAL WORLD:** `Math.ceil` is used for pagination — "how many pages do I need for 97 items with 10 per page?" → `Math.ceil(97 / 10)` = 10 pages.

---

### `Math.trunc(x)` — Remove Decimal (Truncate Toward Zero)

Simply removes the fractional part — always rounds toward zero regardless of sign.

```javascript
console.log(Math.trunc(4.9));  // 4   ← positive: rounds down
console.log(Math.trunc(4.1));  // 4
console.log(Math.trunc(-4.9)); // -4  ← negative: rounds up (toward zero)
console.log(Math.trunc(-4.1)); // -4
console.log(Math.trunc(0.9));  // 0
```

**▶ Expected Output:**
```
4
4
-4
-4
0
```

> 💡 **TIP:** The difference between `Math.floor` and `Math.trunc` only matters for **negative numbers**:
> - `Math.floor(-4.7)` → `-5` (goes more negative)
> - `Math.trunc(-4.7)` → `-4` (goes toward zero)
> For positive numbers they always give the same result.

---

### Rounding Summary Table

| Method | Positive 4.6 | Positive 4.4 | Negative -4.6 | Negative -4.4 | Rule |
|--------|-------------|-------------|--------------|--------------|------|
| `round` | 5 | 4 | -5 | -4 | Nearest (.5 → up) |
| `floor` | 4 | 4 | -5 | -5 | Always toward -∞ |
| `ceil` | 5 | 5 | -4 | -4 | Always toward +∞ |
| `trunc` | 4 | 4 | -4 | -4 | Always toward 0 |

---
---

## 4. Topic 3 — Arithmetic & Exponent Methods

> **Phase 1 — Conceptual Understanding**

---

### `Math.abs(x)` — Absolute Value

Returns the **positive** (absolute) value of any number — removes the sign.

```javascript
console.log(Math.abs(5));   //  5
console.log(Math.abs(-5));  //  5
console.log(Math.abs(0));   //  0
console.log(Math.abs(-3.7)); // 3.7
```

**▶ Expected Output:**
```
5
5
0
3.7
```

> 🏢 **REAL WORLD:** Calculating distance between two values on a scale: `Math.abs(score - average)` — the difference doesn't depend on which is bigger. Also used in physics (speed is the absolute value of velocity).

---

### `Math.sqrt(x)` — Square Root

Returns the square root of x. Returns `NaN` for negative numbers (complex numbers are not supported).

```javascript
console.log(Math.sqrt(9));    // 3
console.log(Math.sqrt(2));    // 1.4142135623730951
console.log(Math.sqrt(0));    // 0
console.log(Math.sqrt(-1));   // NaN  ← negative: no real square root
console.log(Math.sqrt(144));  // 12
```

**▶ Expected Output:**
```
3
1.4142135623730951
0
NaN
12
```

> 🏢 **REAL WORLD:** Distance between two points: `Math.sqrt((x2-x1)**2 + (y2-y1)**2)` — the Pythagorean theorem in code, used in maps, games, and physics engines.

```javascript
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
console.log(distance(0, 0, 3, 4).toFixed(2)); // 5.00  (3-4-5 triangle)
```

---

### `Math.cbrt(x)` — Cube Root

Returns the cube root of x. Unlike `sqrt`, it works for negative numbers.

```javascript
console.log(Math.cbrt(27));   // 3
console.log(Math.cbrt(-27));  // -3  ← works for negatives!
console.log(Math.cbrt(8));    // 2
console.log(Math.cbrt(0));    // 0
```

**▶ Expected Output:**
```
3
-3
2
0
```

---

### `Math.pow(base, exponent)` — Power / Exponentiation

Raises `base` to the power of `exponent`. The `**` operator is the modern equivalent.

```javascript
console.log(Math.pow(2, 10));  // 1024   (2^10)
console.log(Math.pow(3, 3));   //   27   (3^3)
console.log(Math.pow(9, 0.5)); //    3   (9^0.5 = √9)
console.log(Math.pow(2, -1));  //  0.5   (1/2)

// Modern equivalent using ** operator:
console.log(2 ** 10); // 1024
```

**▶ Expected Output:**
```
1024
27
3
0.5
1024
```

---

### `Math.hypot(...values)` — Hypotenuse / Euclidean Length

Returns the square root of the sum of squares of all arguments. The cleanest way to compute distances and vector lengths.

```javascript
// Hypotenuse of 3-4-5 triangle
console.log(Math.hypot(3, 4));      // 5

// Distance in 3D space
console.log(Math.hypot(2, 4, 4));   // 6  (√(4+16+16) = √36)

// Length of a 2D vector
console.log(Math.hypot(-5, 12));    // 13
```

**▶ Expected Output:**
```
5
6
13
```

> 💡 **TIP:** `Math.hypot(a, b)` is cleaner and avoids overflow issues compared to `Math.sqrt(a**2 + b**2)`.

---

### `Math.sign(x)` — Sign of a Number

Returns `-1` (negative), `0` (zero), or `1` (positive). Useful to determine direction without caring about magnitude.

```javascript
console.log(Math.sign(-7));  // -1
console.log(Math.sign(0));   //  0
console.log(Math.sign(3));   //  1
console.log(Math.sign(-0));  // -0  (signed zero in JavaScript)
```

**▶ Expected Output:**
```
-1
0
1
-0
```

> 🏢 **REAL WORLD:** In animation: `Math.sign(velocity)` tells you which direction an object is moving without needing to know the speed. In finance: `Math.sign(profit)` tells you gain vs loss.

---

### `Math.fround(x)` — Nearest 32-bit Float

Returns the nearest 32-bit (single precision) floating-point representation of x. Useful for WebGL and typed arrays that use 32-bit floats.

```javascript
console.log(Math.fround(1.5));     // 1.5        (representable exactly)
console.log(Math.fround(1.337));   // 1.3370000123977661 (precision loss!)
```

---

### `Math.clz32(x)` — Count Leading Zeros (32-bit)

Returns the number of leading zero bits in the 32-bit integer representation. Used in low-level bit manipulation.

```javascript
console.log(Math.clz32(1));  // 31  (00000000000000000000000000000001)
console.log(Math.clz32(4));  // 29  (00000000000000000000000000000100)
console.log(Math.clz32(0));  // 32  (all zeros)
```

---

### `Math.imul(x, y)` — 32-bit Integer Multiplication

Performs C-style 32-bit integer multiplication. Important for large integer products that would overflow normal JavaScript arithmetic.

```javascript
console.log(Math.imul(3, 4));                    // 12
console.log(Math.imul(0xffffffff, 0xffffffff));  // 1  (wraps around!)
```

---
---

## 5. Topic 4 — Min, Max & Clamp

> **Phase 1 — Conceptual Understanding**

---

### `Math.max(...values)` — Find the Largest Value

Returns the largest of zero or more numbers. Returns `-Infinity` if no arguments given. Returns `NaN` if any argument is not a number.

```javascript
console.log(Math.max(3, 7, 1, 9, 4));   // 9
console.log(Math.max(-3, -7, -1));       // -1
console.log(Math.max());                 // -Infinity (no args)
console.log(Math.max(1, "abc", 3));      // NaN
```

**▶ Expected Output:**
```
9
-1
-Infinity
NaN
```

#### Find max in an array using spread:

```javascript
const scores = [78, 92, 65, 88, 71, 95];
console.log(Math.max(...scores)); // 95
```

> ⚠️ **WATCH OUT:** `Math.max(...arr)` works perfectly for small arrays. For very large arrays (100,000+ elements), the spread can cause a stack overflow. Use `arr.reduce((a, b) => Math.max(a, b))` instead.

---

### `Math.min(...values)` — Find the Smallest Value

Returns the smallest of zero or more numbers. Returns `Infinity` if no arguments given.

```javascript
console.log(Math.min(3, 7, 1, 9, 4));   // 1
console.log(Math.min(-3, -7, -1));       // -7
console.log(Math.min());                 // Infinity (no args)

const scores = [78, 92, 65, 88, 71, 95];
console.log(Math.min(...scores));        // 65
```

**▶ Expected Output:**
```
1
-7
Infinity
65
```

> 🤔 **THINK ABOUT IT:** Why does `Math.max()` (no args) return `-Infinity` and `Math.min()` return `Infinity`? Because when comparing values, any real number is greater than `-Infinity` and less than `Infinity`. This makes the identity values work correctly when looping through values to find max/min.

---

### Clamping a Value — Keep It Within a Range

A **clamp** function restricts a value to a specific range `[min, max]`. This is one of the most used utility functions in game development and UI.

```javascript
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

console.log(clamp(5,  0, 10));  // 5   — within range, unchanged
console.log(clamp(-3, 0, 10));  // 0   — below min, clamped to min
console.log(clamp(15, 0, 10));  // 10  — above max, clamped to max
```

**▶ Expected Output:**
```
5
0
10
```

> 🏢 **REAL WORLD:** Clamping is everywhere in games and UIs — keeping a volume slider between 0 and 100, a health bar between 0 and 100 (cannot go negative or above max), or constraining a draggable element within its container's boundaries.

```javascript
// Game health system
let health = 100;
function takeDamage(amount)  { health = clamp(health - amount, 0, 100); }
function heal(amount)        { health = clamp(health + amount, 0, 100); }

takeDamage(30); console.log(health); // 70
takeDamage(90); console.log(health); // 0   ← clamped — cannot go below 0
heal(50);       console.log(health); // 50
heal(200);      console.log(health); // 100 ← clamped — cannot exceed 100
```

**▶ Expected Output:**
```
70
0
50
100
```

---
---

## 6. Topic 5 — Logarithm & Trigonometry Methods

> **Phase 1 — Conceptual Understanding**

---

### Logarithm Methods

#### `Math.log(x)` — Natural Logarithm (base e)

Returns the natural logarithm (base e) of x. Returns `NaN` for negative x and `-Infinity` for 0.

```javascript
console.log(Math.log(1));         // 0          (e^0 = 1)
console.log(Math.log(Math.E));    // 1          (e^1 = e)
console.log(Math.log(Math.E**2)); // 2          (e^2)
console.log(Math.log(0));         // -Infinity
console.log(Math.log(-1));        // NaN
```

#### `Math.log2(x)` — Logarithm Base 2

```javascript
console.log(Math.log2(1));   // 0   (2^0 = 1)
console.log(Math.log2(2));   // 1   (2^1 = 2)
console.log(Math.log2(8));   // 3   (2^3 = 8)
console.log(Math.log2(1024)); // 10 (2^10 = 1024)
```

> 🏢 **REAL WORLD:** `Math.log2` is used in computer science — calculating how many bits are needed to store n values: `Math.ceil(Math.log2(n))`.

#### `Math.log10(x)` — Logarithm Base 10

```javascript
console.log(Math.log10(1));      // 0   (10^0 = 1)
console.log(Math.log10(10));     // 1   (10^1 = 10)
console.log(Math.log10(100));    // 2   (10^2 = 100)
console.log(Math.log10(1000));   // 3
```

#### `Math.expm1(x)` — e^x minus 1

More accurate than `Math.E**x - 1` for very small x values.

```javascript
console.log(Math.expm1(1));   // 1.718...  (e^1 - 1)
console.log(Math.expm1(0));   // 0         (e^0 - 1 = 0)
```

#### `Math.log1p(x)` — Natural log of (1 + x)

More accurate than `Math.log(1 + x)` for very small x values.

```javascript
console.log(Math.log1p(0));   // 0
console.log(Math.log1p(1));   // 0.693... (= Math.LN2)
```

---

### Trigonometry Methods

All trigonometric functions in JavaScript work in **radians**, not degrees.

```
Degrees to Radians:  radians = degrees × (π / 180)
Radians to Degrees:  degrees = radians × (180 / π)
```

```javascript
function toRad(deg) { return deg * (Math.PI / 180); }
function toDeg(rad) { return rad * (180 / Math.PI); }

console.log(toRad(180)); // 3.14159... (π)
console.log(toRad(90));  // 1.5707... (π/2)
console.log(toDeg(Math.PI)); // 180
```

#### `Math.sin(x)` — Sine

```javascript
console.log(Math.sin(toRad(0)));   // 0
console.log(Math.sin(toRad(30)));  // 0.5
console.log(Math.sin(toRad(90)));  // 1     ← max value
console.log(Math.sin(toRad(180))); // ~0    (floating point: 1.2246e-16)
```

#### `Math.cos(x)` — Cosine

```javascript
console.log(Math.cos(toRad(0)));   // 1     ← max value
console.log(Math.cos(toRad(90)));  // ~0    (floating point near-zero)
console.log(Math.cos(toRad(180))); // -1    ← min value
```

#### `Math.tan(x)` — Tangent

```javascript
console.log(Math.tan(toRad(0)));   //  0
console.log(Math.tan(toRad(45)));  //  1
console.log(Math.tan(toRad(90)));  //  16331239353195370 (very large — approaches ∞)
```

#### Inverse Trigonometry

```javascript
console.log(toDeg(Math.asin(0.5)));  // 30   (angle whose sine is 0.5)
console.log(toDeg(Math.acos(0.5)));  // 60   (angle whose cosine is 0.5)
console.log(toDeg(Math.atan(1)));    // 45   (angle whose tangent is 1)

// atan2(y, x) — angle from origin to point (x,y), handles all quadrants
console.log(toDeg(Math.atan2(1, 1)));  // 45
console.log(toDeg(Math.atan2(1, -1))); // 135
console.log(toDeg(Math.atan2(-1, 0))); // -90
```

> 🏢 **REAL WORLD:** `Math.atan2(y, x)` is used in game development and mapping to find the angle between two points — e.g., "which direction should the enemy face to look at the player?"

#### Hyperbolic Functions

```javascript
console.log(Math.sinh(0));  // 0
console.log(Math.cosh(0));  // 1
console.log(Math.tanh(0));  // 0
console.log(Math.tanh(1));  // 0.7615...

// Inverse hyperbolic
console.log(Math.asinh(1)); // 0.8813...
console.log(Math.acosh(1)); // 0
console.log(Math.atanh(0)); // 0
```

---
---

## 7. Topic 6 — Math.random() — Random Numbers

> **Phase 1 — Conceptual Understanding**

`Math.random()` is one of the most-used Math methods. It returns a **pseudo-random floating-point number** between 0 (inclusive) and 1 (exclusive):

```
0 ≤ Math.random() < 1
```

```javascript
console.log(Math.random()); // e.g. 0.7362841095
console.log(Math.random()); // e.g. 0.1284956023
console.log(Math.random()); // e.g. 0.9813740561
```

> 💡 **TIP:** `Math.random()` always returns a value in `[0, 1)`. It will NEVER return exactly 1. Understanding this boundary is essential for all random number formulas.

> ⚠️ **WATCH OUT — Not Cryptographically Secure:** `Math.random()` is a pseudo-random number generator — good enough for games, simulations, and UI randomness, but NOT suitable for cryptography, password generation, or security tokens. Use `crypto.getRandomValues()` for security-sensitive random values.

---

### Random Float in a Range

```javascript
// Random float between min (inclusive) and max (exclusive)
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

console.log(randomFloat(1, 10).toFixed(2));   // e.g. 7.43
console.log(randomFloat(0, 100).toFixed(2));  // e.g. 62.15
console.log(randomFloat(-5, 5).toFixed(2));   // e.g. -2.87
```

**How the formula works:**
```
Math.random()        → [0, 1)
× (max - min)        → [0, max-min)
+ min                → [min, max)
```

---

### Random Integer — The Most Important Pattern

Generating a random whole number (integer) is the most common random operation.

#### Random integer from 0 to n (exclusive):

```javascript
// Random integer: 0, 1, 2, ..., (n-1)
function randomInt(n) {
  return Math.floor(Math.random() * n);
}

console.log(randomInt(6));  // 0, 1, 2, 3, 4, or 5 (dice: 0-5)
console.log(randomInt(10)); // 0 through 9
```

#### Random integer in a range (inclusive on both ends):

```javascript
// Random integer: min to max (both inclusive)
function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Dice roll (1 to 6)
console.log(randomIntRange(1, 6));   // 1, 2, 3, 4, 5, or 6

// Random score (50 to 100)
console.log(randomIntRange(50, 100));

// Coin flip
console.log(randomIntRange(0, 1) === 0 ? "Heads" : "Tails");
```

**How `(max - min + 1)` works:**
```
For min=1, max=6:
  Math.random()          → [0, 1)
  × (6 - 1 + 1) = × 6   → [0, 6)
  + 1                    → [1, 7)
  Math.floor(...)        → 1, 2, 3, 4, 5, or 6 ✅
```

> 🐛 **COMMON MISTAKE:** Using `Math.round` instead of `Math.floor` for random integers creates an unequal distribution — `Math.round(Math.random() * 5)` gives 0 and 5 only half the probability of 1, 2, 3, 4. Always use `Math.floor` for random integers.

---

### Guaranteed Random Integer Functions — Reference Set

These four functions cover virtually every random integer need:

```javascript
// 1. Integer from 0 to (max - 1)
const randBelow = max => Math.floor(Math.random() * max);

// 2. Integer from min to max (both inclusive)
const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 3. Random index for an array
const randIndex = arr => Math.floor(Math.random() * arr.length);

// 4. Random element from an array
const randElement = arr => arr[Math.floor(Math.random() * arr.length)];

// Usage:
const fruits = ["Apple", "Banana", "Mango", "Kiwi", "Orange"];
console.log(randBelow(10));           // 0–9
console.log(randRange(1, 6));         // 1–6 (dice)
console.log(randIndex(fruits));       // 0–4
console.log(randElement(fruits));     // random fruit
```

**▶ Expected Output (sample):**
```
7
4
2
Mango
```

---

### Random Boolean

```javascript
const randomBool = () => Math.random() < 0.5;

console.log(randomBool()); // true or false with equal probability

// Weighted boolean — 70% chance of true
const weighted = () => Math.random() < 0.7;
```

---

### Shuffle an Array — Fisher-Yates Algorithm

The gold-standard way to randomly shuffle an array, giving every permutation equal probability:

```javascript
function shuffle(array) {
  const arr = [...array]; // copy — don't mutate original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randBelow(i + 1);          // random index 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}

const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(shuffle(deck)); // e.g. [7, 3, 10, 1, 5, 8, 2, 9, 4, 6]
```

> 🏢 **REAL WORLD:** Used in quiz apps (shuffle questions), playlist shuffling, card games, A/B testing (randomly assign users to groups), and generating test data.

---

### Random Item from a Weighted List

Sometimes you need random selection where some items are more likely than others:

```javascript
function weightedRandom(options) {
  // options = [{ value, weight }, ...]
  const totalWeight = options.reduce((sum, o) => sum + o.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const option of options) {
    rand -= option.weight;
    if (rand <= 0) return option.value;
  }
}

const loot = [
  { value: "Common item",    weight: 60 },
  { value: "Uncommon item",  weight: 25 },
  { value: "Rare item",      weight: 10 },
  { value: "Legendary item", weight:  5 },
];

// Run 10 times to show distribution
for (let i = 0; i < 10; i++) {
  console.log(weightedRandom(loot));
}
```

**▶ Expected Output (sample — varies):**
```
Common item
Common item
Uncommon item
Common item
Rare item
Common item
Common item
Uncommon item
Common item
Legendary item
```

> 🏢 **REAL WORLD:** Weighted random selection is used in loot boxes in games, recommendation engines, ad delivery systems, and generating synthetic test data with realistic distributions.

---

### Random Color Generator

```javascript
// Random hex color
function randomHexColor() {
  return "#" + Math.floor(Math.random() * 0xFFFFFF)
    .toString(16)
    .padStart(6, "0");
}

// Random RGB color
function randomRGBColor() {
  const r = randBelow(256);
  const g = randBelow(256);
  const b = randBelow(256);
  return `rgb(${r}, ${g}, ${b})`;
}

console.log(randomHexColor()); // e.g. "#a3f5c2"
console.log(randomRGBColor()); // e.g. "rgb(173, 42, 201)"
```

---

### Seeded Random (Reproducible Results)

`Math.random()` is non-deterministic — you cannot reproduce the same sequence. For reproducible results (testing, games with replay), use a seeded pseudo-random generator:

```javascript
// Simple mulberry32 seeded PRNG
function createSeededRandom(seed) {
  let s = seed;
  return function() {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const rand = createSeededRandom(42);
console.log(rand().toFixed(4)); // always the same for seed 42
console.log(rand().toFixed(4)); // always the same next value
console.log(rand().toFixed(4)); // always the same third value
```

> 🏢 **REAL WORLD:** Game developers use seeded random to generate the same world layout from the same seed — players can share a seed code to play the same map. Minecraft uses this concept extensively.

---
---

## 8. Topic 7 — Complete Math Reference

> Your one-stop reference for every Math property and method.

---

### Math Properties

| Property | Value | Description |
|----------|-------|-------------|
| `Math.E` | 2.718... | Euler's number |
| `Math.PI` | 3.141... | Pi |
| `Math.SQRT2` | 1.414... | Square root of 2 |
| `Math.SQRT1_2` | 0.707... | Square root of 1/2 |
| `Math.LN2` | 0.693... | Natural log of 2 |
| `Math.LN10` | 2.302... | Natural log of 10 |
| `Math.LOG2E` | 1.442... | Log₂(e) |
| `Math.LOG10E` | 0.434... | Log₁₀(e) |

---

### Rounding Methods

| Method | Description | Example → Result |
|--------|-------------|-----------------|
| `Math.round(x)` | Nearest integer (.5 → up) | `Math.round(4.5)` → `5` |
| `Math.floor(x)` | Toward -∞ | `Math.floor(-4.1)` → `-5` |
| `Math.ceil(x)` | Toward +∞ | `Math.ceil(4.1)` → `5` |
| `Math.trunc(x)` | Toward 0 (remove decimal) | `Math.trunc(-4.9)` → `-4` |

---

### Arithmetic Methods

| Method | Description | Example → Result |
|--------|-------------|-----------------|
| `Math.abs(x)` | Absolute value | `Math.abs(-5)` → `5` |
| `Math.sqrt(x)` | Square root | `Math.sqrt(16)` → `4` |
| `Math.cbrt(x)` | Cube root | `Math.cbrt(-8)` → `-2` |
| `Math.pow(x, y)` | x to the power of y | `Math.pow(2, 8)` → `256` |
| `Math.hypot(...v)` | √(sum of squares) | `Math.hypot(3,4)` → `5` |
| `Math.sign(x)` | -1, 0, or 1 | `Math.sign(-9)` → `-1` |
| `Math.fround(x)` | Nearest 32-bit float | `Math.fround(1.337)` → `1.337...` |
| `Math.clz32(x)` | Count leading zeros (32-bit) | `Math.clz32(1)` → `31` |
| `Math.imul(x, y)` | 32-bit integer multiply | `Math.imul(3,4)` → `12` |

---

### Min / Max

| Method | Description | Example → Result |
|--------|-------------|-----------------|
| `Math.max(...v)` | Largest value | `Math.max(3,1,7)` → `7` |
| `Math.min(...v)` | Smallest value | `Math.min(3,1,7)` → `1` |

---

### Logarithm Methods

| Method | Description | Example → Result |
|--------|-------------|-----------------|
| `Math.log(x)` | Natural log (base e) | `Math.log(Math.E)` → `1` |
| `Math.log2(x)` | Log base 2 | `Math.log2(8)` → `3` |
| `Math.log10(x)` | Log base 10 | `Math.log10(1000)` → `3` |
| `Math.exp(x)` | e raised to x | `Math.exp(1)` → `2.718...` |
| `Math.expm1(x)` | e^x - 1 (precise) | `Math.expm1(0)` → `0` |
| `Math.log1p(x)` | ln(1 + x) (precise) | `Math.log1p(0)` → `0` |

---

### Trigonometry Methods (all angles in radians)

| Method | Description |
|--------|-------------|
| `Math.sin(x)` | Sine |
| `Math.cos(x)` | Cosine |
| `Math.tan(x)` | Tangent |
| `Math.asin(x)` | Arc sine (returns radians) |
| `Math.acos(x)` | Arc cosine (returns radians) |
| `Math.atan(x)` | Arc tangent (returns radians) |
| `Math.atan2(y, x)` | Angle from origin to (x,y) |
| `Math.sinh(x)` | Hyperbolic sine |
| `Math.cosh(x)` | Hyperbolic cosine |
| `Math.tanh(x)` | Hyperbolic tangent |
| `Math.asinh(x)` | Inverse hyperbolic sine |
| `Math.acosh(x)` | Inverse hyperbolic cosine |
| `Math.atanh(x)` | Inverse hyperbolic tangent |

---

### Random

| Method | Description |
|--------|-------------|
| `Math.random()` | Float in `[0, 1)` |

---

### Essential Random Recipes

```javascript
const rand    = (n)       => Math.floor(Math.random() * n);
const randInt = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick    = arr       => arr[Math.floor(Math.random() * arr.length)];
const flip    = ()        => Math.random() < 0.5;

// Dice:  randInt(1, 6)
// Card:  pick(deck)
// Coin:  flip()
// Pct:   Math.random() < 0.30  → true ~30% of the time
```

---
---

## 9. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Math Toolkit Builder 🔧

**Objective:** Practice core Math methods in real calculations.

**Scenario:** You're building a **geometry calculator** for an architecture app.

#### Warm-up Micro-Demo:

```javascript
// Area of a circle with radius 7
const area = Math.PI * 7 ** 2;
console.log("Area:", area.toFixed(2)); // 153.94
```

#### Task A — Shape Calculator

```javascript
function shapeCalculator() {
  // 1. Circle — area and circumference
  const r = 8;
  const circleArea  = Math.PI * r ** 2;
  const circlePerim = 2 * Math.PI * r;
  console.log(`Circle (r=${r}):`);
  console.log(`  Area         : ${circleArea.toFixed(4)}`);
  console.log(`  Circumference: ${circlePerim.toFixed(4)}`);

  // 2. Right triangle — hypotenuse
  const a = 5, b = 12;
  const hyp = Math.hypot(a, b);
  console.log(`\nTriangle (a=${a}, b=${b}):`);
  console.log(`  Hypotenuse   : ${hyp.toFixed(4)}`); // 13.0000

  // 3. Sphere — volume V = (4/3)πr³
  const rSphere = 6;
  const sphereVol = (4 / 3) * Math.PI * rSphere ** 3;
  console.log(`\nSphere (r=${rSphere}):`);
  console.log(`  Volume       : ${sphereVol.toFixed(4)}`);

  // 4. Distance between two 2D points
  const p1 = { x: 2, y: 3 }, p2 = { x: 8, y: 11 };
  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  console.log(`\nDistance (2,3)→(8,11): ${dist.toFixed(4)}`); // 10.0000

  // 5. Rounding comparisons on price
  const price = 19.555;
  console.log(`\nRounding $${price}:`);
  console.log(`  round : $${Math.round(price * 100) / 100}`);
  console.log(`  floor : $${Math.floor(price * 100) / 100}`);
  console.log(`  ceil  : $${Math.ceil(price  * 100) / 100}`);
  console.log(`  trunc : $${Math.trunc(price * 100) / 100}`);
}

shapeCalculator();
```

**Expected Output:**
```
Circle (r=8):
  Area         : 201.0619
  Circumference: 50.2655

Triangle (a=5, b=12):
  Hypotenuse   : 13.0000

Sphere (r=6):
  Volume       : 904.7787

Distance (2,3)→(8,11): 10.0000

Rounding $19.555:
  round : $19.56
  floor : $19.55
  ceil  : $19.56
  trunc : $19.55
```

**Self-check questions:**
- Why does `Math.round(19.555 * 100) / 100` sometimes give unexpected results?
- What is the difference between `Math.floor` and `Math.trunc` for negative numbers?
- When would you use `Math.hypot(a, b)` instead of `Math.sqrt(a**2 + b**2)`?

---

### Exercise 2 — Random Generator Suite 🎲

**Objective:** Practice all key random patterns — floats, integers, ranges, arrays, weighted.

**Scenario:** You're building a **test data generator** for a school application. All student records need realistic random values.

#### Warm-up Micro-Demo:

```javascript
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick    = arr => arr[Math.floor(Math.random() * arr.length)];

console.log("Score:", randInt(40, 100)); // e.g. 73
console.log("Grade:", pick(["A","B","C","D","F"])); // e.g. B
```

#### Task A — Generate Realistic Student Records

```javascript
const randInt     = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randFloat   = (min, max) => +(Math.random() * (max - min) + min).toFixed(2);
const pick        = arr        => arr[Math.floor(Math.random() * arr.length)];
const shuffle     = arr        => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function generateStudent(id) {
  const firstNames = ["Amara","Kwame","Fatima","Emeka","Priya","Omar","Sofia","Yuki","Carlos","Aisha"];
  const lastNames  = ["Diallo","Asante","Rashid","Obi","Sharma","Hassan","Martini","Tanaka","Ruiz","Nkosi"];
  const cities     = ["Lagos","Accra","Cairo","Nairobi","Casablanca","Tunis","Dakar"];

  const score      = randInt(40, 100);
  const attendance = randFloat(60, 100);

  const grade = score >= 90 ? "A"
              : score >= 75 ? "B"
              : score >= 60 ? "C"
              : score >= 50 ? "D" : "F";

  return {
    id:          `S${String(id).padStart(3, "0")}`,
    name:        `${pick(firstNames)} ${pick(lastNames)}`,
    age:          randInt(16, 22),
    city:         pick(cities),
    score,
    attendance:  `${attendance}%`,
    grade,
    status:      score >= 60 ? "Pass" : "Fail"
  };
}

console.log("=".repeat(55));
console.log("   GENERATED STUDENT RECORDS (Sample of 5)");
console.log("=".repeat(55));

const students = Array.from({ length: 5 }, (_, i) => generateStudent(i + 1));
students.forEach(s => {
  console.log(`\n  ${s.id} | ${s.name}`);
  console.log(`       Age: ${s.age}  City: ${s.city}`);
  console.log(`       Score: ${s.score}  Grade: ${s.grade}  (${s.status})`);
  console.log(`       Attendance: ${s.attendance}`);
});

// Shuffle and pick 2 for a committee
const committee = shuffle(students).slice(0, 2);
console.log(`\nRandomly selected committee:`);
committee.forEach(s => console.log(`  → ${s.name} (${s.id})`));
```

**Self-check questions:**
- Why does the random integer formula use `Math.floor` and not `Math.round`?
- What is the difference between `randomFloat(0, 100)` and `Math.random() * 100`?
- How would you ensure no two generated students have the same name?

---

### Exercise 3 — Statistics Calculator 📊

**Objective:** Use Math methods to compute real statistics on a dataset.

**Scenario:** You're building a **grade analysis dashboard** for a teacher.

#### Warm-up Micro-Demo:

```javascript
const scores = [78, 92, 65, 88, 71];
const sum    = scores.reduce((a, b) => a + b, 0);
const avg    = sum / scores.length;
console.log("Average:", avg.toFixed(1)); // 78.8
```

#### Task A — Full Statistical Analysis

```javascript
function analyse(scores) {
  const n      = scores.length;
  const sorted = [...scores].sort((a, b) => a - b);
  const sum    = scores.reduce((a, b) => a + b, 0);
  const mean   = sum / n;

  // Median
  const mid    = Math.floor(n / 2);
  const median = n % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;

  // Standard deviation
  const variance = scores.reduce((acc, s) => acc + (s - mean) ** 2, 0) / n;
  const stdDev   = Math.sqrt(variance);

  // Range
  const max   = Math.max(...scores);
  const min   = Math.min(...scores);
  const range = max - min;

  // Percentile rank helper
  const percentile = (p) => {
    const idx = Math.ceil((p / 100) * n) - 1;
    return sorted[Math.max(0, idx)];
  };

  return { n, sum, mean, median, stdDev, max, min, range,
           p25: percentile(25), p75: percentile(75) };
}

const classScores = [88, 45, 72, 95, 61, 78, 53, 90, 84, 67, 73, 58, 92, 86, 49];

const stats = analyse(classScores);
console.log("=".repeat(45));
console.log("     CLASS SCORE STATISTICS");
console.log("=".repeat(45));
console.log(`Students    : ${stats.n}`);
console.log(`Total       : ${stats.sum}`);
console.log(`Mean        : ${stats.mean.toFixed(2)}`);
console.log(`Median      : ${stats.median}`);
console.log(`Std Dev     : ${stats.stdDev.toFixed(2)}`);
console.log(`Min / Max   : ${stats.min} / ${stats.max}`);
console.log(`Range       : ${stats.range}`);
console.log(`25th pctile : ${stats.p25}`);
console.log(`75th pctile : ${stats.p75}`);

// Distribution by rounding to nearest 10
const distribution = new Map();
classScores.forEach(s => {
  const bucket = Math.floor(s / 10) * 10;
  distribution.set(bucket, (distribution.get(bucket) || 0) + 1);
});
console.log("\nScore Distribution:");
[...distribution.entries()].sort((a,b) => a[0]-b[0]).forEach(([bucket, count]) => {
  console.log(`  ${bucket}s: ${"█".repeat(count)} (${count})`);
});
```

**Expected Output:**
```
=============================================
     CLASS SCORE STATISTICS
=============================================
Students    : 15
Total       : 1091
Mean        : 72.73
Median      : 73
Std Dev     : 16.26
Min / Max   : 45 / 95
Range       : 50
25th pctile : 58
75th pctile : 88

Score Distribution:
  40s: ██ (2)
  50s: ██ (2)
  60s: ██ (2)
  70s: ███ (3)
  80s: ███ (3)
  90s: ███ (3)
```

---
---

## 10. Mini Project — Casino Dice & Statistics Simulator

> **Phase 3 — Project Simulation**

**Real-world scenario:** You're building a **browser-based casino simulator** to demonstrate probability and statistics. The system simulates dice rolls, tracks outcomes, verifies statistical laws, and generates visual reports — all using Math methods and `Math.random()`.

---

### 🔵 Stage 1 — Dice Engine

**Goal:** Build a fair dice roller for any number of sides, roll multiple dice simultaneously, and compute combined values.

#### Simple stage preview:
```javascript
const die = sides => Math.floor(Math.random() * sides) + 1;
console.log("d6:", die(6)); // 1–6
console.log("d20:", die(20)); // 1–20
```

#### Stage 1 Full Code:

```javascript
"use strict";

// Core dice function — roll a single die with `sides` faces
function rollDie(sides = 6) {
  return Math.floor(Math.random() * sides) + 1;
}

// Roll multiple dice, return array of results and their sum
function rollDice(count = 2, sides = 6) {
  const rolls = Array.from({ length: count }, () => rollDie(sides));
  const sum   = rolls.reduce((a, b) => a + b, 0);
  return { rolls, sum, min: Math.min(...rolls), max: Math.max(...rolls) };
}

// Roll with advantage — roll twice, take the higher (D&D rule)
function rollAdvantage(sides = 20) {
  const a = rollDie(sides), b = rollDie(sides);
  return { rolls: [a, b], result: Math.max(a, b), type: "advantage" };
}

// Roll with disadvantage — roll twice, take the lower
function rollDisadvantage(sides = 20) {
  const a = rollDie(sides), b = rollDie(sides);
  return { rolls: [a, b], result: Math.min(a, b), type: "disadvantage" };
}

console.log("=".repeat(50));
console.log("     STAGE 1 — DICE ENGINE");
console.log("=".repeat(50));

const single = rollDie(6);
console.log(`Single d6        : ${single}`);

const triple = rollDice(3, 6);
console.log(`Three d6         : [${triple.rolls.join(", ")}] → Sum: ${triple.sum}`);

const adv = rollAdvantage(20);
console.log(`d20 Advantage    : [${adv.rolls.join(", ")}] → Kept: ${adv.result}`);

const dis = rollDisadvantage(20);
console.log(`d20 Disadvantage : [${dis.rolls.join(", ")}] → Kept: ${dis.result}`);

const percentile = rollDice(2, 10); // percentile dice
console.log(`Percentile (2d10): [${percentile.rolls.join(", ")}] → ${percentile.sum - 2 || 100}`);
```

**▶ Expected Output (sample):**
```
==================================================
     STAGE 1 — DICE ENGINE
==================================================
Single d6        : 4
Three d6         : [2, 6, 3] → Sum: 11
d20 Advantage    : [14, 7]   → Kept: 14
d20 Disadvantage : [3, 19]   → Kept: 3
Percentile (2d10): [7, 4]    → 11
```

---

### 🟢 Stage 2 — Probability Simulator

**Goal:** Roll dice thousands of times, collect frequency data using a Map, and verify that observed probabilities converge to theoretical probabilities (the Law of Large Numbers).

#### Simple stage preview:
```javascript
const freq = new Map();
for (let i = 0; i < 6000; i++) {
  const r = rollDie(6);
  freq.set(r, (freq.get(r) || 0) + 1);
}
console.log("Expected ~1000 per face:");
for (const [face, count] of [...freq.entries()].sort()) {
  console.log(`  ${face}: ${count}`);
}
```

#### Stage 2 Full Code:

```javascript
function simulate(trials, sides = 6) {
  const freq = new Map();

  for (let i = 0; i < trials; i++) {
    const roll = rollDie(sides);
    freq.set(roll, (freq.get(roll) || 0) + 1);
  }

  return freq;
}

function printFrequencyReport(freq, trials, sides) {
  const theoretical = trials / sides;
  const pctLabel    = p => (p * 100).toFixed(1) + "%";

  console.log(`\nFace  Count    Observed   Expected   Deviation  Bar`);
  console.log("-".repeat(62));

  let chiSquare = 0;

  for (const face of Array.from({ length: sides }, (_, i) => i + 1)) {
    const count    = freq.get(face) || 0;
    const observed = count / trials;
    const expected = 1 / sides;
    const dev      = Math.abs(observed - expected);
    const bar      = "█".repeat(Math.round(count / trials * 100));

    chiSquare += (count - theoretical) ** 2 / theoretical;

    console.log(
      `  ${String(face).padEnd(4)} ${String(count).padEnd(8)} ` +
      `${pctLabel(observed).padEnd(11)}` +
      `${pctLabel(expected).padEnd(11)}` +
      `${(dev * 100).toFixed(2)}%`.padEnd(11) +
      bar
    );
  }

  console.log("-".repeat(62));
  console.log(`χ² statistic: ${chiSquare.toFixed(2)} (lower = fairer distribution)`);
  console.log(`Std expected : ${((trials / sides) * (1 - 1/sides) / sides * sides).toFixed(2)}`);
}

console.log("\n" + "=".repeat(62));
console.log("     STAGE 2 — PROBABILITY SIMULATION (10,000 rolls)");
console.log("=".repeat(62));

const trials = 10000;
const sides  = 6;
const freq   = simulate(trials, sides);

console.log(`Simulating ${trials.toLocaleString()} d${sides} rolls...`);
printFrequencyReport(freq, trials, sides);

// Verify Law of Large Numbers — more rolls → closer to theoretical
console.log("\nConvergence Test (deviation from 16.67%):");
[100, 1000, 10000, 100000].forEach(n => {
  const f     = simulate(n, 6);
  const pcts  = [...f.values()].map(c => c / n);
  const maxDev = Math.max(...pcts.map(p => Math.abs(p - 1/6)));
  console.log(`  ${String(n).padStart(7)} rolls → max deviation: ${(maxDev * 100).toFixed(2)}%`);
});
```

**▶ Expected Output (sample — varies by randomness):**
```
================================================================
     STAGE 2 — PROBABILITY SIMULATION (10,000 rolls)
================================================================
Simulating 10,000 d6 rolls...

Face  Count    Observed   Expected   Deviation  Bar
--------------------------------------------------------------
  1    1662     16.6%     16.7%      0.04%      ████████████████
  2    1693     16.9%     16.7%      0.23%      ████████████████
  3    1624     16.2%     16.7%      0.43%      ████████████████
  4    1698     17.0%     16.7%      0.31%      █████████████████
  5    1659     16.6%     16.7%      0.09%      ████████████████
  6    1664     16.6%     16.7%      0.03%      ████████████████
--------------------------------------------------------------
χ² statistic: 3.24 (lower = fairer distribution)

Convergence Test (deviation from 16.67%):
      100 rolls → max deviation: 3.67%
     1000 rolls → max deviation: 1.24%
    10000 rolls → max deviation: 0.43%
   100000 rolls → max deviation: 0.18%
```

---

### 🟠 Stage 3 — Full Casino Report

**Goal:** Simulate a full craps-style betting game, compute house edge using Math functions, and generate a complete summary report.

#### Stage 3 Full Code:

```javascript
// Craps simplified: roll 2d6
// "Pass line" bet: win on 7 or 11 first roll, lose on 2/3/12, else roll until point or 7
function playCraps() {
  const firstRoll = rollDice(2, 6).sum;

  // Natural win
  if (firstRoll === 7 || firstRoll === 11) return { result: "win",  rolls: 1, firstRoll };
  // Craps loss
  if ([2, 3, 12].includes(firstRoll)) return { result: "loss", rolls: 1, firstRoll };

  // Establish point
  const point = firstRoll;
  let rollCount = 1;

  while (true) {
    const next = rollDice(2, 6).sum;
    rollCount++;
    if (next === point) return { result: "win",  rolls: rollCount, firstRoll, point };
    if (next === 7)     return { result: "loss", rolls: rollCount, firstRoll, point };
  }
}

function runCasino(sessions) {
  let wins = 0, losses = 0, totalRolls = 0;
  let maxWinStreak = 0, maxLossStreak = 0;
  let curWin = 0, curLoss = 0;
  const rollDist = new Map(); // how many rolls did each game last?

  for (let i = 0; i < sessions; i++) {
    const { result, rolls } = playCraps();
    totalRolls += rolls;

    rollDist.set(rolls, (rollDist.get(rolls) || 0) + 1);

    if (result === "win") {
      wins++; curWin++; curLoss = 0;
      maxWinStreak = Math.max(maxWinStreak, curWin);
    } else {
      losses++; curLoss++; curWin = 0;
      maxLossStreak = Math.max(maxLossStreak, curLoss);
    }
  }

  const winRate   = wins / sessions;
  const houseEdge = 1 - winRate * 2; // simplified edge calculation
  const avgRolls  = totalRolls / sessions;

  return { sessions, wins, losses, winRate, houseEdge, avgRolls,
           maxWinStreak, maxLossStreak, rollDist };
}

console.log("\n" + "=".repeat(55));
console.log("     STAGE 3 — CASINO CRAPS SIMULATOR");
console.log("=".repeat(55));

const results = runCasino(50000);

console.log(`\nSessions played : ${results.sessions.toLocaleString()}`);
console.log(`Wins            : ${results.wins.toLocaleString()} (${(results.winRate*100).toFixed(2)}%)`);
console.log(`Losses          : ${results.losses.toLocaleString()}`);
console.log(`House edge      : ${(Math.abs(results.houseEdge)*100).toFixed(2)}%`);
console.log(`Avg rolls/game  : ${results.avgRolls.toFixed(2)}`);
console.log(`Max win streak  : ${results.maxWinStreak}`);
console.log(`Max loss streak : ${results.maxLossStreak}`);

// Theoretical craps win probability is ~49.29% (house edge ~1.41%)
const theoretical = 0.4929;
const deviation   = Math.abs(results.winRate - theoretical);
console.log(`\nTheoretical win rate : 49.29%`);
console.log(`Observed win rate    : ${(results.winRate * 100).toFixed(2)}%`);
console.log(`Deviation            : ${(deviation * 100).toFixed(3)}%`);
console.log(`Result               : ${deviation < 0.01 ? "✅ Within expected variance" : "⚠️ Unusually high deviation"}`);

// Roll count distribution (first 8 lengths)
console.log("\nGame Length Distribution:");
[...results.rollDist.entries()]
  .sort((a, b) => a[0] - b[0])
  .slice(0, 8)
  .forEach(([rolls, count]) => {
    const pct = (count / results.sessions * 100).toFixed(1);
    const bar = "█".repeat(Math.round(count / results.sessions * 80));
    console.log(`  ${String(rolls).padEnd(3)} rolls: ${pct.padStart(5)}% ${bar}`);
  });

console.log("=".repeat(55));
```

**▶ Expected Output (sample):**
```
=======================================================
     STAGE 3 — CASINO CRAPS SIMULATOR
=======================================================

Sessions played : 50,000
Wins            : 24,638 (49.28%)
Losses          : 25,362
House edge      : 1.45%
Avg rolls/game  : 3.38
Max win streak  : 14
Max loss streak : 16

Theoretical win rate : 49.29%
Observed win rate    : 49.28%
Deviation            : 0.015%
Result               : ✅ Within expected variance

Game Length Distribution:
  1   rolls: 33.3% ██████████████████████████
  2   rolls:  3.8% ███
  3   rolls:  7.5% ██████
  4   rolls:  8.2% ██████
  5   rolls:  8.1% ██████
  6   rolls:  7.5% ██████
  7   rolls:  6.5% █████
  8   rolls:  5.4% ████
```

**Reflection questions:**
- Why does the observed win rate converge to the theoretical 49.29% as the number of sessions increases? (Law of Large Numbers)
- Why is `Math.random()` sufficient for a casino simulator but NOT for a real online casino?
- How would `Math.abs`, `Math.max`, and `Math.min` help you implement a bankroll tracker that shows the peak balance and maximum drawdown?
- How would you use `Math.log` to model the exponential decay of a player's bankroll over many losing sessions?
- How would you implement a "hot streak" mechanic — where the RNG is secretly biased for a short period — using `Math.random()` and a probability threshold?

**Optional advanced features:**
- Add a bet-sizing strategy (flat, Martingale, Fibonacci) and compare ROI across 10,000 sessions
- Use `Math.pow(winRate, streak)` to calculate the theoretical probability of the observed longest win streak
- Build a normal distribution random number generator using the Box-Muller transform: `Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random())`
- Generate a histogram of 2d6 sums (showing the classic bell curve of 7 being most common)

---
---

## 11. Completion Checklist

- ✅ I know that `Math` is a static object — never use `new Math()`.
- ✅ I can recall all 8 Math constants: `E`, `PI`, `SQRT2`, `SQRT1_2`, `LN2`, `LN10`, `LOG2E`, `LOG10E`.
- ✅ I can use `Math.PI` and `Math.E` in real formulas (circle area, compound interest).
- ✅ I know all four rounding methods — `round` (nearest), `floor` (toward -∞), `ceil` (toward +∞), `trunc` (toward 0) — and their behaviour on negative numbers.
- ✅ I know that `Math.round(4.5)` → `5` but `Math.round(-4.5)` → `-4` (rounds toward zero for .5).
- ✅ I can use `Math.abs()` for distance/difference calculations, `Math.sqrt()` for Pythagorean distances, and `Math.hypot()` as the cleaner alternative.
- ✅ I understand `Math.pow(x, y)` and its modern `**` operator equivalent.
- ✅ I can use `Math.sign()` to determine direction (-1/0/1) and `Math.cbrt()` for cube roots.
- ✅ I can find the largest and smallest values in an array using `Math.max(...arr)` and `Math.min(...arr)`.
- ✅ I can implement a `clamp(value, min, max)` function using `Math.min` and `Math.max`.
- ✅ I know the key logarithm methods: `Math.log()` (base e), `Math.log2()`, `Math.log10()`.
- ✅ I understand that trig functions use **radians**, and can convert: `deg × (π/180)` and `rad × (180/π)`.
- ✅ I can use `Math.atan2(y, x)` to find the angle between two points.
- ✅ I know that `Math.random()` returns `[0, 1)` — includes 0, excludes 1.
- ✅ I can generate random integers using the correct formula: `Math.floor(Math.random() * (max - min + 1)) + min`.
- ✅ I know NOT to use `Math.round` for random integers (unequal distribution at boundaries).
- ✅ I can pick a random element from an array: `arr[Math.floor(Math.random() * arr.length)]`.
- ✅ I can implement Fisher-Yates shuffle for uniform random array permutations.
- ✅ I understand weighted random selection for non-uniform probability distributions.
- ✅ I know that `Math.random()` is pseudo-random — NOT suitable for cryptographic uses (`crypto.getRandomValues()` is needed instead).
- ✅ I completed all three exercises and the full three-stage mini project.

---

### 📌 One-Sentence Summary of Each Topic

**Math Object:** The `Math` object is a built-in static namespace (never instantiated with `new`) providing 8 mathematical constants and 30+ methods for rounding, arithmetic, exponentiation, logarithms, and trigonometry.

**Math Properties:** JavaScript's 8 Math constants provide pre-computed precision values for Euler's number (`Math.E`), Pi (`Math.PI`), square roots, and logarithmic bases — eliminating the need to hardcode these values.

**Rounding:** JavaScript provides four rounding methods — `round` (nearest), `floor` (toward -∞), `ceil` (toward +∞), and `trunc` (toward zero) — whose differences matter most for negative numbers and financial precision.

**Arithmetic & Exponents:** Core math functions including `abs`, `sqrt`, `cbrt`, `pow`, `hypot`, `sign`, and bitwise helpers enable everything from geometric distance calculations to 32-bit integer arithmetic.

**Min, Max & Clamp:** `Math.max(...arr)` and `Math.min(...arr)` find extremes in any set of values, and combining them into a `clamp(value, min, max)` utility is one of the most widely used patterns in games, UIs, and data processing.

**Logarithms & Trigonometry:** Logarithm methods (`log`, `log2`, `log10`) power data science and bit calculations, while trigonometry methods work in radians and are essential for animations, maps, and physics simulations — with `Math.atan2` being the key direction-finding tool.

**Math.random():** `Math.random()` returns a pseudo-random float in `[0, 1)` — combine it with `Math.floor` and range arithmetic to generate integers, pick array elements, shuffle lists, and implement weighted probability — but use `crypto.getRandomValues()` for any security-sensitive randomness.

---

> 📘 *Built from W3Schools.com — `js_math` | `js_math_reference` | `js_random`*
> *Framework: Understand → Practice → Create*
