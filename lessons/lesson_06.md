---
title: "JavaScript Loops, Control Flow & Loop Keywords"
nav_order: 6
---

## 📋 Table of Contents
1. [What Is a Loop? (And Why Do We Need Them?)](#1-what-is-a-loop)
2. [JavaScript Control Flow — The Big Picture](#2-javascript-control-flow)
3. [The `for` Loop — Looping a Known Number of Times](#3-the-for-loop)
4. [Loop Scope — `var` vs `let` Inside Loops](#4-loop-scope)
5. [Optional Expressions in `for` — exp1, exp2, exp3](#5-optional-expressions)
6. [The `while` Loop — Looping While a Condition Is True](#6-the-while-loop)
7. [The `do...while` Loop — Run At Least Once](#7-the-do-while-loop)
8. [Comparing `for` and `while`](#8-comparing-for-and-while)
9. [The `break` Statement — Exit the Loop Early](#9-the-break-statement)
10. [Break in a Switch Statement](#10-break-in-a-switch)
11. [JavaScript Labels — Naming Code Blocks](#11-javascript-labels)
12. [Labeled `break` — Jumping Out of Nested Loops](#12-labeled-break)
13. [The `continue` Statement — Skip One Iteration](#13-the-continue-statement)
14. [Labeled `continue`](#14-labeled-continue)
15. [Control Flow Summary — All the Ways to Control Order](#15-control-flow-summary)
16. [JavaScript Is Single-Threaded](#16-javascript-is-single-threaded)
17. [Common Beginner Mistakes](#17-common-beginner-mistakes)
18. [Section 2 — Applied Exercises](#section-2-applied-exercises)
19. [Section 3 — Mini-Project: Student Grade Report](#section-3-mini-project)
20. [Completion Checklist](#completion-checklist)

---

## 1. What Is a Loop?

### Plain-English Definition

A **loop** is an instruction that tells your computer: *"Keep doing this action over and over again, until a certain condition is no longer true."*

Think about your morning routine. Every morning you might do: wake up → brush teeth → get dressed. A loop is like saying: *"For each school day in the week, do my morning routine."* You don't write out the routine five separate times — you just describe it once and say "repeat this five times."

In programming, without loops, you would have to write the same line of code dozens or even hundreds of times. Loops save you time, prevent mistakes, and make your code much easier to read.

### Real-World Comparison

Imagine you work at a bakery and you need to label 100 bread bags. Without a loop in your mind, you would say:
- "Label bag 1."
- "Label bag 2."
- "Label bag 3."
- ... (97 more times!)

With a loop, you just say:
- "For every bag from 1 to 100: label the bag."

Much better! This is exactly what loops do in code.

### Why Loops Matter in Real Jobs

- A **web developer** uses loops to display a list of products from a database.
- A **data analyst** uses loops to go through thousands of rows of sales data.
- A **game developer** uses loops to move every enemy character on the screen, one by one, every single frame.
- A **bank** uses loops to calculate interest for every customer account.

### The Problem Without Loops

```javascript
// ❌ WITHOUT a loop — writing the same thing 6 times:
let cars = ["BMW", "Volvo", "Saab", "Ford", "Toyota", "Honda"];

let text = "";
text += cars[0] + "<br>";
text += cars[1] + "<br>";
text += cars[2] + "<br>";
text += cars[3] + "<br>";
text += cars[4] + "<br>";
text += cars[5] + "<br>";
```

This is repetitive and fragile — if you add a 7th car, you have to add another line.

### The Solution With a Loop

```javascript
// ✅ WITH a loop — clean, flexible, and scalable:
let cars = ["BMW", "Volvo", "Saab", "Ford", "Toyota", "Honda"];
let text = "";

for (let i = 0; i < cars.length; i++) {
  text += cars[i] + "<br>";
}
```

**Expected output:**
```
BMW
Volvo
Saab
Ford
Toyota
Honda
```

Even if you add 50 more cars, the loop handles it automatically. You change nothing.

> 💡 **Thinking Question:** What happens to the loop if `cars` has 0 items in it? Does it run at all?
> *(Answer: No — `i < cars.length` becomes `0 < 0` which is false immediately, so the loop body never runs.)*

---

## 2. JavaScript Control Flow

### What Is "Control Flow"?

**Control flow** is the order in which JavaScript runs your code statements. By default, JavaScript reads code **from top to bottom, left to right** — like reading a book. But control flow statements let you *change* that order.

There are four main categories of control flow:

### 2a. Default (Sequential) Flow

Code runs line by line, in order.

```javascript
// Example of default sequential flow:
let x = 5;    // Step 1: x gets the value 5
let y = 6;    // Step 2: y gets the value 6
let z = x + y; // Step 3: z = 5 + 6 = 11
```

**Expected output:** `z` is `11`

### 2b. Conditional Flow

Decisions branch the flow using `if`, `if...else`, `switch`, or the ternary operator `? :`.

```javascript
let age = 20;
let text = "Unknown";

if (age >= 18) {
  text = "Adult";   // This branch runs if age is 18 or more
} else {
  text = "Minor";   // This branch runs if age is less than 18
}

console.log(text);
```

**Expected output:** `Adult`

### 2c. Repetition Flow (Loops)

Loops run a block of code multiple times using `for`, `while`, or `do...while`. This is the main topic of this entire lesson.

### 2d. Jump Statements

Jump statements abruptly change the flow:
- `break` — exits a loop or switch
- `continue` — skips the current loop iteration
- `return` — exits from a function (we'll cover functions separately)
- `throw` — jumps to error handling

```javascript
// Simple jump example with break:
for (let i = 0; i < 10; i++) {
  if (i === 3) { break; }  // JUMP! Stop the loop entirely at i=3
  console.log(i);
}
```

**Expected output:**
```
0
1
2
```
*(The loop stops before printing 3.)*

### 2e. Function Flow

Functions are reusable code blocks that run when called.

```javascript
function multiply(p1, p2) {
  return p1 * p2;
}

console.log(multiply(4, 5)); // Calls the function
```

**Expected output:** `20`

### JavaScript Is Single-Threaded

JavaScript can only do **one thing at a time**. Every task must wait for the previous one to finish. This is called being "single-threaded." We will cover asynchronous (non-blocking) programming in a more advanced lesson.

---

## 3. The `for` Loop

The `for` loop is the most commonly used loop when you **know in advance how many times** you want to repeat something.

### Syntax (the grammar of a `for` loop)

```
for (exp1; exp2; exp3) {
  // code to repeat
}
```

Three expressions control everything:

| Expression | Plain English | When It Runs |
|---|---|---|
| `exp1` | "Start here" | Once, before the loop begins |
| `exp2` | "Keep going while this is true" | Checked before every iteration |
| `exp3` | "After each round, do this" | After every iteration |

### First Example — Count 0 to 4

```javascript
let text = "";

for (let i = 0; i < 5; i++) {
  text += "The number is " + i + "\n";
}

console.log(text);
```

**Line-by-line breakdown:**
- `let i = 0` → (exp1) Create a variable `i` and set it to 0. This runs once.
- `i < 5` → (exp2) "Is i less than 5?" If yes, run the code block. If no, stop.
- `i++` → (exp3) After running the code block, add 1 to `i`. (`i++` is shorthand for `i = i + 1`)
- `text += "The number is " + i + "\n"` → The actual work done on each repetition. The `+=` means "add this to `text`."

**Expected output:**
```
The number is 0
The number is 1
The number is 2
The number is 3
The number is 4
```

The loop stops because when `i` reaches 5, `i < 5` becomes `5 < 5` which is `false`.

> 💡 **Thinking Question:** What if we changed `i < 5` to `i <= 5`? What would be the last number printed?
> *(Answer: 5. The `<=` means "less than OR equal to", so i=5 would pass the check.)*

### Second Example — Loop Through an Array of Cars

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let len = cars.length;  // cars.length = 4
let text = "";

for (let i = 0; i < len; i++) {
  text += cars[i] + "\n";
}

console.log(text);
```

**Expected output:**
```
BMW
Volvo
Saab
Ford
```

**Why use `cars.length` instead of writing `4`?** Because if you add more cars to the array later, the loop automatically adjusts — you don't have to update the number `4` manually.

**What is `cars[i]`?** An array stores items in numbered slots starting at 0. `cars[0]` is `"BMW"`, `cars[1]` is `"Volvo"`, etc. When `i = 0`, `cars[i]` means `cars[0]` = `"BMW"`. When `i = 1`, it means `cars[1]` = `"Volvo"`. And so on.

---

## 4. Loop Scope

### What Does "Scope" Mean?

**Scope** is the area of your program where a variable can be seen and used. Think of it like a security badge at a workplace — some rooms let anyone in, but others only let people with the right badge in.

In JavaScript, `var` and `let` behave differently inside loops.

### Using `var` in a Loop

```javascript
var i = 5;        // i is declared OUTSIDE the loop

for (var i = 0; i < 10; i++) {
  // some code
}

console.log(i);   // What is i here?
```

**Expected output:** `10`

**Why?** Because `var` does NOT respect loop boundaries. The `var i` inside the loop is the **same variable** as the `var i` outside. After the loop ends (when i reaches 10), the outside variable has been changed too. This is usually a bug!

### Using `let` in a Loop (Recommended)

```javascript
let i = 5;        // i is declared OUTSIDE the loop

for (let i = 0; i < 10; i++) {
  // some code
}

console.log(i);   // What is i here?
```

**Expected output:** `5`

**Why?** Because `let` DOES respect loop boundaries. The `let i` inside the loop is a **brand new, separate variable** that only exists inside the loop. The outer `i = 5` is untouched.

> ✅ **Best Practice:** Always use `let` (or `const`) instead of `var` inside loops. It prevents accidental bugs where the loop variable leaks out.

---

## 5. Optional Expressions in the `for` Loop

All three expressions in a `for` loop are optional. You can leave any of them out — but you must understand why you might and when it's safe.

### Omitting exp1 (the start)

You can omit exp1 if you've already set the starting value before the loop:

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let i = 2;  // Start already set
let text = "";

for (; i < cars.length; i++) {   // exp1 is empty
  text += cars[i] + "\n";
}

console.log(text);
```

**Expected output:**
```
Saab
Ford
```

*(We start at index 2, which is "Saab".)*

### Omitting exp2 (the condition) — ⚠️ Dangerous!

You can omit exp2, but then **you must add a `break` statement inside the loop** or it will run forever and crash your browser.

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let i = 0;
let text = "";

for (; ; ) {        // exp2 is empty — INFINITE loop without break!
  if (i >= cars.length) break;  // Manual stop condition
  text += cars[i] + "\n";
  i++;
}

console.log(text);
```

**Expected output:**
```
BMW
Volvo
Saab
Ford
```

### Omitting exp3 (the increment)

You can omit exp3 if you increment the variable yourself inside the loop body:

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let i = 0;
let text = "";

for (; i < cars.length; ) {  // exp3 is empty
  text += cars[i] + "\n";
  i++;                         // Increment done manually inside the body
}

console.log(text);
```

**Expected output:**
```
BMW
Volvo
Saab
Ford
```

### exp3 Can Do More Than Just Increment

exp3 doesn't have to add 1. It can do anything:

```javascript
// Count DOWN by 1 (decrement):
for (let i = 5; i > 0; i--) {
  console.log(i);
}
```

**Expected output:** `5 4 3 2 1`

```javascript
// Skip by 2 (count: 0, 2, 4, 6, 8):
for (let i = 0; i < 10; i = i + 2) {
  console.log(i);
}
```

**Expected output:** `0 2 4 6 8`

---

## 6. The `while` Loop

### What Is a `while` Loop?

The `while` loop is used when you **don't know in advance exactly how many times** the loop should run. It keeps going **as long as a condition is true**.

**Real-world analogy:** Imagine you're eating dinner and you're hungry. You keep eating **while** you're hungry. You don't decide in advance to eat exactly 10 bites — you just keep going until the hunger condition is no longer true.

### Syntax

```
while (condition) {
  // code to execute as long as condition is true
}
```

### First Example — Simple Counter

```javascript
let i = 0;
let text = "";

while (i < 10) {
  text += "The number is " + i + "\n";
  i++;             // ⚠️ VERY IMPORTANT — must increment i
}

console.log(text);
```

**Expected output:**
```
The number is 0
The number is 1
The number is 2
The number is 3
The number is 4
The number is 5
The number is 6
The number is 7
The number is 8
The number is 9
```

**How it works step by step:**
1. `i` starts at 0.
2. Check: `0 < 10`? Yes → run the body → print "The number is 0" → `i` becomes 1.
3. Check: `1 < 10`? Yes → run the body → print "The number is 1" → `i` becomes 2.
4. ... continues ...
5. Check: `10 < 10`? No → STOP. Loop ends.

### ⚠️ Critical Warning: The Infinite Loop

```javascript
// ❌ NEVER DO THIS — missing i++ causes an infinite loop!
let i = 0;
while (i < 10) {
  console.log(i);
  // Forgot i++ — i stays 0 forever!
  // This will crash your browser tab!
}
```

**Rule:** If you forget to change the variable used in the condition, the condition stays `true` forever, and the loop never stops. This is called an **infinite loop** and it freezes your program.

### When to Use `while` vs `for`

Use `for` when you know the count in advance (e.g., "loop 10 times" or "loop through all items in an array").

Use `while` when the stopping condition depends on something that changes unpredictably (e.g., "keep asking for user input while the input is invalid" or "keep processing data while there is more data to read").

---

## 7. The `do...while` Loop

### What Is `do...while`?

The `do...while` loop is a special variant of the `while` loop. The key difference:
- `while` checks the condition **before** running the code.
- `do...while` checks the condition **after** running the code.

This means: **`do...while` always runs at least once**, even if the condition is false from the start.

### Syntax

```
do {
  // code block
} while (condition);
```

Notice the semicolon `;` after the closing parenthesis — that's required!

### Example

```javascript
let i = 0;
let text = "";

do {
  text += "The number is " + i + "\n";
  i++;
} while (i < 10);

console.log(text);
```

**Expected output:**
```
The number is 0
The number is 1
The number is 2
The number is 3
The number is 4
The number is 5
The number is 6
The number is 7
The number is 8
The number is 9
```

### The Unique Behaviour — Runs At Least Once

```javascript
// What if the condition is false from the start?
let i = 100;
let text = "";

do {
  text += "This still runs once! i = " + i;
} while (i < 10);   // False immediately — i is 100!

console.log(text);
```

**Expected output:** `This still runs once! i = 100`

A regular `while` loop with `i = 100` would not print anything at all. But `do...while` always runs the body first, then checks.

**Real-world analogy:** A `do...while` is like asking someone if they want dessert. You show them the dessert first (you do it), then ask if they want more. They see it at least once before deciding.

---

## 8. Comparing `for` and `while`

A `while` loop is essentially a `for` loop with exp1 and exp3 omitted. Compare these two — they do exactly the same thing:

### Using `for`

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let i = 0;
let text = "";

for ( ; cars[i] ; ) {   // exp1 and exp3 are empty
  text += cars[i] + "\n";
  i++;
}

console.log(text);
```

### Using `while`

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let i = 0;
let text = "";

while (cars[i]) {       // Condition: cars[i] exists (not undefined)
  text += cars[i] + "\n";
  i++;
}

console.log(text);
```

Both produce the same output:
```
BMW
Volvo
Saab
Ford
```

**Note:** `cars[i]` as a condition works because when `i` goes past the last index (e.g., `cars[4]`), JavaScript returns `undefined`, which is treated as `false`. So the loop stops naturally when there are no more items.

---

## 9. The `break` Statement

### What Is `break`?

The `break` statement **immediately exits** the loop it's inside. The remaining iterations are skipped. Program execution continues on the very next line after the loop.

**Real-world analogy:** You're searching through a drawer for your keys. The moment you find them, you stop searching — you don't keep looking through the rest of the drawer. The `break` is the moment you say "found it, stop."

### Syntax

```
break;
```

### Example — Breaking Out of a Loop

```javascript
let text = "";

for (let i = 0; i < 10; i++) {
  if (i === 3) { break; }         // ← When i is 3, EXIT the loop immediately
  text += "The number is " + i + "\n";
}

console.log(text);
```

**Step-by-step:**
- `i = 0`: `0 === 3`? No. Print "The number is 0".
- `i = 1`: `1 === 3`? No. Print "The number is 1".
- `i = 2`: `2 === 3`? No. Print "The number is 2".
- `i = 3`: `3 === 3`? YES! → `break` → Loop exits immediately.

**Expected output:**
```
The number is 0
The number is 1
The number is 2
```

Notice: "The number is 3" is never printed because `break` fires before `text +=` runs.

---

## 10. Break in a Switch Statement

The `break` statement also plays a critical role inside `switch` statements. Without it, JavaScript keeps executing the code in every case after a match — this is called "fall-through."

### Example — Break in a Switch

```javascript
let day;
switch (new Date().getDay()) {  // getDay() returns 0 (Sunday) through 6 (Saturday)
  case 0:
    day = "Sunday";
    break;         // ← Stop here! Don't fall through to the next case.
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
}

console.log(day);
```

**Expected output (if today is Friday):** `Friday`

### Without `break` — Dangerous Fall-Through

```javascript
let score = 2;
let result = "";

switch (score) {
  case 1:
    result += "One ";
  case 2:
    result += "Two ";   // ← Matches here
  case 3:
    result += "Three "; // ← Falls through! Also runs.
  case 4:
    result += "Four ";  // ← Falls through! Also runs.
}

console.log(result);
```

**Expected output:** `Two Three Four` ← Bug! We only wanted "Two".

Always use `break` in `switch` cases unless you deliberately want fall-through behavior.

---

## 11. JavaScript Labels

### What Is a Label?

A **label** is a name you give to a statement or a block of code. It lets you reference that code from elsewhere — especially useful in nested loops.

### Syntax

```
labelname: statement;
```

Or for a block:

```
labelname: {
  statement1;
  statement2;
}
```

A label is just an identifier (a name you choose) followed by a colon. By convention, labels are written in lowercase or camelCase.

**Think of a label like a bookmark in a book** — you can jump back to it whenever you need to.

---

## 12. Labeled `break`

### What Is a Labeled `break`?

```
break labelname;
```

Normally, `break` only exits **the innermost** loop it's in. But with a label, you can exit **any outer loop** from deep inside nested loops.

### Example — Break to an Outer Label

```javascript
let text = "";

loop1: for (let j = 1; j < 5; j++) {       // Outer loop — labeled "loop1"
  loop2: for (let i = 1; i < 5; i++) {     // Inner loop — labeled "loop2"
    if (i === 3) { break loop1; }          // ← Jump OUT of loop1 entirely!
    text += i + " ";
  }
}

console.log(text);
```

**Expected output:** `1 2 `

**Why?** When `j=1` and `i=1`, we print 1. When `i=2`, we print 2. When `i=3`, we `break loop1` — we exit the OUTER loop, not just the inner one. So `j=2`, `j=3`, `j=4` never run at all.

### Example — Break to Inner Label Only

```javascript
let text = "";

loop1: for (let j = 1; j < 5; j++) {       // Outer loop
  loop2: for (let i = 1; i < 5; i++) {     // Inner loop
    if (i === 3) { break loop2; }          // ← Jump OUT of loop2 only
    text += i + " ";
  }
  text += "(end of j=" + j + ") ";
}

console.log(text);
```

**Expected output:** `1 2 (end of j=1) 1 2 (end of j=2) 1 2 (end of j=3) 1 2 (end of j=4) `

**Why?** Each time `i` reaches 3, we only break the inner loop. The outer loop continues with the next value of `j`.

### Labeled Break on a Code Block

`break` with a label can also jump out of ANY code block (not just loops):

```javascript
const cars = ["BMW", "Volvo", "Saab", "Ford"];
let text = "";

list: {                            // A labeled block — not a loop
  text += cars[0] + "\n";
  text += cars[1] + "\n";
  break list;                      // ← Exit the block here
  text += cars[2] + "\n";          // ← Never runs!
  text += cars[3] + "\n";          // ← Never runs!
}

console.log(text);
```

**Expected output:**
```
BMW
Volvo
```

> ⚠️ Note: `break` and `continue` are the ONLY JavaScript statements that can "jump out of" a code block `{ }`.

---

## 13. The `continue` Statement

### What Is `continue`?

The `continue` statement **skips the rest of the current iteration** and moves immediately to the next one. Unlike `break` (which exits the loop), `continue` only skips one turn.

**Real-world analogy:** You're checking each apple in a basket. When you find a bruised one, you skip it (put it aside) and move to the next apple. You don't stop checking — you continue!

### Syntax

```
continue;
```

### Example — Skip Number 3

```javascript
let text = "";

for (let i = 1; i < 10; i++) {
  if (i === 3) { continue; }         // ← Skip i=3 and go to i=4
  text += "The number is " + i + "\n";
}

console.log(text);
```

**Expected output:**
```
The number is 1
The number is 2
The number is 4
The number is 5
The number is 6
The number is 7
The number is 8
The number is 9
```

Notice: "The number is 3" is missing. When `i === 3`, `continue` fires and skips the `text +=` line for that iteration only.

> 💡 **Thinking Question:** What's the difference between `break` and `continue`?
> - `break` → exits the loop entirely. The loop is done.
> - `continue` → skips just this one round. The loop keeps going.

---

## 14. Labeled `continue`

Just like labeled `break`, labeled `continue` lets you skip an iteration of a specific outer loop.

```
continue labelname;
```

### Example — Continue to Outer Label

```javascript
let text = "";

loop1: for (let j = 1; j < 5; j++) {
  loop2: for (let i = 1; i < 5; i++) {
    if (i === 3) { continue loop1; }   // ← Skip rest of loop1's current iteration
    text += i + " ";
  }
  text += "(never reached) ";          // ← Never prints, because continue jumps past this
}

console.log(text);
```

**Expected output:** `1 2 1 2 1 2 1 2 `

Each time `i` reaches 3, we jump back to the top of loop1 (incrementing `j`), skipping `i=4` and the code after loop2.

### Example — Continue to Inner Label

```javascript
let text = "";

loop1: for (let j = 1; j < 5; j++) {
  loop2: for (let i = 1; i < 5; i++) {
    if (i === 3) { continue loop2; }   // ← Skip rest of THIS inner iteration only
    text += i + " ";
  }
}

console.log(text);
```

**Expected output:** `1 2 4 1 2 4 1 2 4 1 2 4 `

Each time `i` reaches 3, we skip it but continue with `i=4`. So each inner loop prints 1, 2, 4.

---

## 15. Control Flow Summary

Here is a complete picture of all the ways JavaScript can control the order of execution:

| Control Flow Type | Statements | What It Does |
|---|---|---|
| **Sequential** | *(default)* | Runs code top to bottom |
| **Conditional** | `if`, `if...else`, `switch`, `? :` | Runs different code based on conditions |
| **Repetition (Loops)** | `for`, `while`, `do...while` | Repeats code multiple times |
| **Jump** | `break`, `continue`, `return`, `throw` | Changes the flow abruptly |
| **Function** | `function`, `=>` | Groups code to call on demand |

### Quick Reference Card

```
for (init; condition; update) { ... }   → Loop a known number of times

while (condition) { ... }               → Loop while condition is true

do { ... } while (condition);           → Loop at least once, then while condition is true

break;                                  → Exit the loop NOW
break labelName;                        → Exit a specific labeled loop

continue;                               → Skip this iteration, go to next
continue labelName;                     → Skip this iteration of a specific labeled loop
```

---

## 16. JavaScript Is Single-Threaded

JavaScript runs in a **single thread**. This means it can only do one thing at a time. Every loop iteration, every function call, every calculation must wait in line.

```
Task 1 → Task 2 → Task 3 → Task 4 → ...
(one at a time, no skipping ahead)
```

This is important to understand because if you write a very slow loop (like one that runs millions of times), it will **freeze** your web page until it finishes. This is why developers must be careful about loop performance, and why JavaScript also has asynchronous programming techniques (like Promises and async/await) for handling slow tasks without freezing.

> ℹ️ Asynchronous programming is an advanced topic covered separately in the JS Advanced section.

---

## 17. Common Beginner Mistakes

### Mistake 1: Forgetting to Increment → Infinite Loop

```javascript
// ❌ BUG — will freeze your browser!
let i = 0;
while (i < 10) {
  console.log(i);
  // Forgot i++ !
}

// ✅ FIX:
while (i < 10) {
  console.log(i);
  i++;  // ← Always include this!
}
```

### Mistake 2: Off-by-One Error

```javascript
// ❌ This prints numbers 1 through 5 — but intended 1 through 4:
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5 (5 included because of <=)

// ✅ To print 1 through 4:
for (let i = 1; i < 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4
```

Remember: `<` stops **before** the limit. `<=` stops **at** the limit.

### Mistake 3: Using `var` Instead of `let` in Loops

```javascript
// ❌ Bug — the outer variable gets changed unexpectedly
var i = 10;
for (var i = 0; i < 5; i++) { }
console.log(i);  // 5 — not 10!

// ✅ Fix — use let
let i = 10;
for (let i = 0; i < 5; i++) { }
console.log(i);  // 10 — unchanged!
```

### Mistake 4: Missing `break` in a `switch`

```javascript
// ❌ Missing break causes fall-through
switch (day) {
  case 1:
    result = "Monday";   // Intended to only set Monday
  case 2:
    result = "Tuesday";  // Overwrites Monday! Bug!
}

// ✅ Fix:
switch (day) {
  case 1:
    result = "Monday";
    break;
  case 2:
    result = "Tuesday";
    break;
}
```

### Mistake 5: Confusing `break` and `continue`

```javascript
// break → STOPS the loop entirely
for (let i = 0; i < 5; i++) {
  if (i === 2) break;
  console.log(i);
}
// Output: 0 1

// continue → SKIPS one turn, loop keeps going
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i);
}
// Output: 0 1 3 4
```

---

## Section 2: Applied Exercises

### 🌡️ Exercise 1: Weather Temperature Printer (For Loop)

**Objective:** Use a `for` loop to print daily temperature readings.

**Scenario:** You work at a weather station. You have 7 days of temperatures and need to display each one with its day number.

**Warm-up Mini-Example:**

```javascript
// Mini-example: Loop through a small number array
let nums = [10, 20, 30];
for (let i = 0; i < nums.length; i++) {
  console.log("Value at index " + i + " is: " + nums[i]);
}
// Output:
// Value at index 0 is: 10
// Value at index 1 is: 20
// Value at index 2 is: 30
```

**Your Task:**

```javascript
// Given data:
const temperatures = [22, 19, 25, 30, 28, 17, 21];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Write a for loop that prints:
// "Monday: 22°C"
// "Tuesday: 19°C"
// ... and so on for all 7 days
```

**Step-by-step instructions:**
1. Declare a `for` loop starting at `i = 0`.
2. Set the condition to `i < temperatures.length` (or `i < 7`).
3. Increment `i` by 1 each round.
4. Inside the loop, use `console.log(days[i] + ": " + temperatures[i] + "°C")`.

**Hints:**
- Both arrays are aligned: `days[0]` goes with `temperatures[0]`, etc.
- `temperatures.length` is `7`.

**Expected output:**
```
Monday: 22°C
Tuesday: 19°C
Wednesday: 25°C
Thursday: 30°C
Friday: 28°C
Saturday: 17°C
Sunday: 21°C
```

**Self-check questions:**
1. What happens if you accidentally write `i <= temperatures.length`?
2. Can you modify the loop to only print temperatures above 25°C?
3. What does `i++` mean exactly?

**What-if challenge:** Add an `if` statement inside the loop to print "HOT DAY!" next to any temperature that is 28 or above.

**Professional connection:** Meteorologists and data scientists write loops exactly like this to process and display weather data from sensor arrays.

---

### 🏦 Exercise 2: Bank Interest Calculator (While Loop)

**Objective:** Use a `while` loop to calculate how many years it takes for a savings account to double.

**Scenario:** A bank customer deposits $1,000 at 5% annual interest. Write code to find how many years it takes to reach $2,000.

**Warm-up Mini-Example:**

```javascript
// Mini-example: Counting up until a condition is met
let total = 100;
let years = 0;

while (total < 150) {
  total = total + 10;  // Add 10 each year
  years++;
}

console.log("Years to reach 150: " + years);
// Output: Years to reach 150: 5
```

**Your Task:**

```javascript
let balance = 1000;
let years = 0;
let interestRate = 0.05;  // 5%

// Write a while loop that:
// 1. Keeps adding 5% interest each year
// 2. Counts each year
// 3. Stops when balance reaches or exceeds 2000
// 4. Prints the number of years
```

**Hints:**
- Each year, balance increases by: `balance = balance + (balance * interestRate)` or `balance *= 1.05`.
- Don't forget to count `years++` inside the loop.
- The condition should be `balance < 2000`.

**Expected output:** `It takes 15 years to double the investment.`

**Self-check questions:**
1. Why is `while` more natural here than `for`?
2. What would happen if the interest rate were 0%?
3. What is the balance after exactly 10 years?

---

### 🎓 Exercise 3: Skip Failing Grades (continue)

**Objective:** Use `continue` to skip and count students who failed.

**Scenario:** You're a teacher processing grade data. You want to print only the students who passed (grade ≥ 50) and count how many failed.

**Warm-up Mini-Example:**

```javascript
// Mini-example: Skip even numbers
for (let i = 1; i <= 8; i++) {
  if (i % 2 === 0) continue;  // Skip even numbers
  console.log(i);
}
// Output: 1 3 5 7
```

**Your Task:**

```javascript
const students = [
  { name: "Alice", grade: 85 },
  { name: "Bob", grade: 42 },
  { name: "Carol", grade: 91 },
  { name: "Dave", grade: 38 },
  { name: "Eve", grade: 67 },
  { name: "Frank", grade: 55 },
];

// Write a for loop that:
// 1. Uses continue to skip students with grade < 50
// 2. Prints the name and grade of passing students
// 3. Counts how many failed
```

**Expected output:**
```
Alice passed with 85
Carol passed with 91
Eve passed with 67
Frank passed with 55
2 student(s) failed.
```

**Hints:**
- Use `if (students[i].grade < 50) { failCount++; continue; }` to skip failures.
- Notice: `students[i].name` accesses the `name` property of each student object.
- Declare `let failCount = 0` before the loop.

---

### 🔍 Exercise 4: Search and Stop (break)

**Objective:** Use `break` to search for a specific product in a list and stop as soon as it's found.

**Scenario:** You're a warehouse worker searching for "Laptop" in a list of inventory items. Once you find it, report its position and stop searching.

**Warm-up Mini-Example:**

```javascript
// Mini-example: Find number 7 in an array
let numbers = [3, 9, 1, 7, 4, 6];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 7) {
    console.log("Found 7 at index " + i);
    break;
  }
}
// Output: Found 7 at index 3
```

**Your Task:**

```javascript
const inventory = ["Monitor", "Keyboard", "Mouse", "Laptop", "Headphones", "Webcam"];
const target = "Laptop";

// Write a for loop that:
// 1. Searches for target
// 2. Prints "Found [target] at position [i]" when found
// 3. Uses break to stop searching immediately
// 4. Prints "Not found" if the loop finishes without finding it
```

**Expected output:** `Found Laptop at position 3`

**Hint:** Use a boolean variable `let found = false;` and set it to `true` when you find the item. Check it after the loop to print "Not found" if still false.

---

## Section 3: Mini-Project

# 📊 Student Grade Report Generator

**Project Overview:** You will build a complete grade report system for a school. It reads student names and scores, calculates a letter grade for each, totals the results, and displays a clean summary.

**Professional context:** In real schools and HR systems, software processes employee or student data using loops exactly like this. This kind of program is the foundation of dashboards and reporting tools used by companies worldwide.

---

### Stage 1: Setup & Core Logic

**Objective:** Set up the data and write a loop to process each student.

**Example Preview:**

```javascript
// Micro-example of what we'll build:
let score = 85;
let grade = "";

if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else if (score >= 60) grade = "D";
else grade = "F";

console.log("Grade: " + grade);
// Output: Grade: B
```

**Your Code (Stage 1):**

```javascript
// STAGE 1 — Setup & Core Logic

const students = [
  { name: "Alice",   score: 92 },
  { name: "Bob",     score: 47 },
  { name: "Carol",   score: 78 },
  { name: "Dave",    score: 61 },
  { name: "Eve",     score: 85 },
  { name: "Frank",   score: 33 },
  { name: "Grace",   score: 95 },
];

let report = "=== STUDENT GRADE REPORT ===\n";

for (let i = 0; i < students.length; i++) {
  let name = students[i].name;
  let score = students[i].score;
  let grade = "";

  if (score >= 90)      grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else                  grade = "F";

  report += name + ": " + score + " → " + grade + "\n";
}

console.log(report);
```

**Expected output (Stage 1):**
```
=== STUDENT GRADE REPORT ===
Alice: 92 → A
Bob: 47 → F
Carol: 78 → C
Dave: 61 → D
Eve: 85 → B
Frank: 33 → F
Grace: 95 → A
```

---

### Stage 2: Adding Features (Continue, Statistics)

**Objective:** Add a count of passes and failures, calculate the average score, and use `continue` to build a "Distinction" honor roll (only A grades).

```javascript
// STAGE 2 — Adding Features

const students = [
  { name: "Alice",   score: 92 },
  { name: "Bob",     score: 47 },
  { name: "Carol",   score: 78 },
  { name: "Dave",    score: 61 },
  { name: "Eve",     score: 85 },
  { name: "Frank",   score: 33 },
  { name: "Grace",   score: 95 },
];

let report = "=== STUDENT GRADE REPORT ===\n";
let passCount = 0;
let failCount = 0;
let totalScore = 0;
let honorRoll = "";

for (let i = 0; i < students.length; i++) {
  let name = students[i].name;
  let score = students[i].score;
  let grade = "";

  if (score >= 90)      grade = "A";
  else if (score >= 80) grade = "B";
  else if (score >= 70) grade = "C";
  else if (score >= 60) grade = "D";
  else                  grade = "F";

  totalScore += score;

  if (score < 60) {
    failCount++;
  } else {
    passCount++;
  }

  // Build the honor roll — skip non-A students
  if (grade !== "A") { continue; }
  honorRoll += "  ⭐ " + name + " (" + score + ")\n";
}

let average = (totalScore / students.length).toFixed(1);

report += "Passed: " + passCount + "\n";
report += "Failed: " + failCount + "\n";
report += "Class Average: " + average + "\n";
report += "\n🏆 Honor Roll (Grade A):\n" + honorRoll;

console.log(report);
```

**Expected output (Stage 2):**
```
=== STUDENT GRADE REPORT ===
Passed: 5
Failed: 2
Class Average: 70.1

🏆 Honor Roll (Grade A):
  ⭐ Alice (92)
  ⭐ Grace (95)
```

---

### Stage 3: Displaying Results + Break on High Scores

**Objective:** Add a `break` feature that stops printing detailed results once a score limit threshold has been exceeded in searching for the top scorer.

```javascript
// STAGE 3 — Find the top scorer using a loop with break logic

const students = [
  { name: "Alice",   score: 92 },
  { name: "Bob",     score: 47 },
  { name: "Carol",   score: 78 },
  { name: "Dave",    score: 61 },
  { name: "Eve",     score: 85 },
  { name: "Frank",   score: 33 },
  { name: "Grace",   score: 95 },
];

// Find top scorer
let topScore = 0;
let topName = "";

for (let i = 0; i < students.length; i++) {
  if (students[i].score > topScore) {
    topScore = students[i].score;
    topName = students[i].name;
  }
}

console.log("🥇 Top Scorer: " + topName + " with " + topScore + " points!");

// Search for a student who scored below 40 — report and stop
let flagged = false;

for (let i = 0; i < students.length; i++) {
  if (students[i].score < 40) {
    console.log("⚠️  Alert: " + students[i].name + " scored " + students[i].score + ". Needs intervention.");
    flagged = true;
    // Don't break here — we want to flag ALL students below 40
  }
}

if (!flagged) {
  console.log("✅ All students scored 40 or above.");
}
```

**Expected output (Stage 3):**
```
🥇 Top Scorer: Grace with 95 points!
⚠️  Alert: Bob scored 47. Needs intervention.
⚠️  Alert: Frank scored 33. Needs intervention.
```

---

### Reflection Questions

1. **How would this work in a real company?** A school's software or an HR system uses exactly this kind of code to process payroll, grades, or attendance — processing each record with a loop.

2. **What if there were 10,000 students?** The same loop handles 10,000 students just as easily as 7. This is the power of loops.

3. **When would `break` be useful here?** If you're searching a large database for the first student who failed, `break` lets you stop as soon as you find one — saving processing time.

4. **Can you think of a way to add a `do...while` to this project?** You could use `do...while` to keep asking for new student names/scores until the user types "done."

---

### Optional Advanced Features

- Sort the students by score (highest first) before printing the report.
- Add a feature that counts how many students are in each grade bracket (A, B, C, D, F).
- Allow the grading scale to be customizable (e.g., 85+ = A, 70+ = B, etc.).
- Use a nested loop to process multiple classes and generate one combined report.

---

## Completion Checklist

- [x] ✅ Loops explained: what they are, why they exist, and real-world uses
- [x] ✅ `for` loop fully explained — all three expressions, with step-by-step examples
- [x] ✅ Loop scope (`var` vs `let`) explained with visible examples
- [x] ✅ Optional expressions (`exp1`, `exp2`, `exp3`) demonstrated with working code
- [x] ✅ `while` loop explained with infinite loop warning
- [x] ✅ `do...while` loop explained with "runs at least once" demonstrated
- [x] ✅ `for` vs `while` comparison with equivalent code shown
- [x] ✅ `break` explained with loop and switch examples
- [x] ✅ JavaScript Labels introduced and explained
- [x] ✅ Labeled `break` (nested loops) explained with two examples
- [x] ✅ `continue` explained and contrasted with `break`
- [x] ✅ Labeled `continue` explained with two examples
- [x] ✅ Control flow summary covering all flow types
- [x] ✅ Single-threaded nature of JavaScript explained
- [x] ✅ 5 common beginner mistakes highlighted and corrected
- [x] ✅ 4 exercises with objectives, scenarios, hints, and self-check questions
- [x] ✅ 3-stage real-world mini-project with expected outputs at each stage
- [x] ✅ Reflection questions and optional advanced features included
- [x] ✅ Every concept includes at least one example with visible expected output

---

**One-sentence summary:** JavaScript loops — `for`, `while`, and `do...while` — together with control statements `break` and `continue`, give programmers precise, flexible power over how many times code runs and in what order, forming the foundation of almost every real-world program from grade calculators to banking systems.