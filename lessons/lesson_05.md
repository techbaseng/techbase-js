---
title: "JavaScript Conditionals: Conditionals · if · if...else · Ternary · Switch · Booleans · Logical Operators"
nav_order: 5
---

## 📌 WHAT YOU WILL LEARN IN THIS LESSON
By the end of this tutorial you will be able to:
- Understand what conditional statements are and why they matter
- Write `if`, `else`, and `else if` statements
- Use the ternary operator as a shortcut
- Use `switch` to handle multiple possible values
- Understand `true` and `false` (Booleans)
- Combine conditions with logical operators (`&&`, `||`, `!`)
- Build a full mini-project: a Student Grade & Feedback System

---

# 🔷 SECTION 1 — CONCEPTUAL UNDERSTANDING

---

## 🧠 LESSON 1: What Are Conditional Statements?

### The Real-World Idea First

Every day, you make decisions based on conditions:

> "**If** it is raining, I will take an umbrella. **Else**, I will wear sunglasses."

Your brain checks a condition ("Is it raining?") and runs a specific action based on the answer.

In JavaScript, **conditional statements** do exactly the same thing. They let your program **check a condition** and **run different code** depending on whether that condition is `true` or `false`.

### Why Do We Need Them?

Without conditional statements, every program would do the same thing every time — no matter what. Conditions allow programs to **react** to different situations:

- An ATM showing "Insufficient funds" when your balance is too low.
- A website showing "Welcome back!" when you're logged in.
- A traffic light switching from green to red.
- A game saying "You Win!" or "Game Over!"

### The Five Types of Conditional Statements in JavaScript

JavaScript gives us five tools for making decisions:

| Statement | When to Use It |
|-----------|---------------|
| `if` | Run code **only if** a condition is true |
| `else` | Run code if the `if` condition is **false** |
| `else if` | Check a **new condition** when the previous one is false |
| `switch` | Choose from **many specific values** |
| `? :` (ternary) | A **shorthand** version of `if...else` |

---

## 🧠 LESSON 2: Booleans — The Foundation of All Conditions

### What is a Boolean?

Before learning about `if`, we must understand **Booleans**, because all conditions in JavaScript are based on them.

A **Boolean** is a data type that has only **two possible values**: `true` or `false`.

Think of it like a light switch — it's either **ON** (`true`) or **OFF** (`false`). There is nothing in between.

```javascript
let lightIsOn = true;
let doorIsLocked = false;

console.log(lightIsOn);   // Output: true
console.log(doorIsLocked); // Output: false
```

### Boolean Values Are the Result of Comparisons

When you compare two values in JavaScript, the result is always a Boolean:

```javascript
console.log(10 > 5);   // Output: true  (10 IS greater than 5)
console.log(10 < 5);   // Output: false (10 is NOT less than 5)
console.log(5 === 5);  // Output: true  (5 IS equal to 5)
console.log(5 === 6);  // Output: false (5 is NOT equal to 6)
```

### Comparison Operators (Refresher)

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Equal to (value only) | `"5" == 5` | `true` |
| `===` | Strictly equal (value AND type) | `"5" === 5` | `false` |
| `!=` | Not equal (value only) | `5 != 6` | `true` |
| `!==` | Strictly not equal | `"5" !== 5` | `true` |
| `>` | Greater than | `10 > 3` | `true` |
| `<` | Less than | `3 < 10` | `true` |
| `>=` | Greater than or equal | `5 >= 5` | `true` |
| `<=` | Less than or equal | `4 <= 3` | `false` |

> 💡 **Important Difference — `==` vs `===`:**
> - `==` only checks the **value**: `"5" == 5` → `true` (JavaScript converts the string "5" to number 5)
> - `===` checks **value AND type**: `"5" === 5` → `false` (one is a string, one is a number)
> - **Always prefer `===`** to avoid unexpected bugs. This is best practice.

### Boolean in Action — Micro Demo

```javascript
let age = 20;
let isAdult = age >= 18;   // This comparison gives true or false
console.log(isAdult);       // Output: true
```

### Thinking Question
> What would `isAdult` be if `age` was 16? What about if `age` was exactly 18?

---

## 🧠 LESSON 3: The `if` Statement

### What Is It?

The `if` statement tells JavaScript: **"Only run this block of code if a certain condition is true."**

If the condition is `false`, JavaScript **completely skips** the code inside the `if` block.

### Syntax (The Structure/Template)

```javascript
if (condition) {
  // code to run if condition is true
}
```

Let's break this down word by word:
- **`if`** — a keyword that starts the decision
- **`(condition)`** — the thing you're checking (must evaluate to `true` or `false`)
- **`{ ... }`** — the "code block" — everything inside the curly braces runs IF the condition is true

### Simple Example 1 — Age Check

```javascript
let age = 20;

if (age >= 18) {
  console.log("You are an adult.");
}

// Output: You are an adult.
```

Line-by-line explanation:
- `let age = 20;` → We create a variable called `age` and store the number 20
- `if (age >= 18)` → We check: is 20 greater than or equal to 18? YES → `true`
- Since the condition is `true`, the code inside `{ }` runs
- `console.log("You are an adult.")` → prints the message to the console

### Simple Example 2 — What Happens When Condition is False?

```javascript
let age = 15;

if (age >= 18) {
  console.log("You are an adult.");
}

// Output: (nothing is printed — the block is skipped)
```

Since `15 >= 18` is `false`, the entire block is skipped.

### Real-World Use in Jobs

In a banking app:
```javascript
let balance = 500;
let withdrawAmount = 200;

if (withdrawAmount <= balance) {
  console.log("Withdrawal approved!");
}
// Output: Withdrawal approved!
```

A developer at a bank might write this kind of check before allowing a transaction.

### ⚠️ Common Beginner Mistake: Using `=` Instead of `===`

```javascript
// WRONG ❌ — this sets x to 10, not a comparison!
if (x = 10) { ... }

// CORRECT ✅ — this checks if x equals 10
if (x === 10) { ... }
```

A single `=` is **assignment** (storing a value). Double `==` or triple `===` is **comparison** (checking if values match).

### Thinking Question
> What would happen if you changed `age = 20` to `age = 18`? Would the condition still be true?

---

## 🧠 LESSON 4: The `else` Statement

### The Problem `else` Solves

With just `if`, you can only do something when a condition is `true`. But what happens when it's `false`? That's where `else` comes in.

`else` means: **"If the condition above was false, do THIS instead."**

### Syntax

```javascript
if (condition) {
  // runs if condition is true
} else {
  // runs if condition is false
}
```

### Example 1 — Greet Based on Time

```javascript
let hour = 14; // 14 = 2 PM in 24-hour time

if (hour < 18) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}

console.log(greeting);
// Output: Good day
```

Why? Because `14 < 18` is `true`, so the `if` block runs and we get "Good day".

### What if We Change the Hour?

```javascript
let hour = 20; // 8 PM

if (hour < 18) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}

console.log(greeting);
// Output: Good evening
```

Now `20 < 18` is `false`, so we skip the `if` block and run the `else` block.

### Real-World Use: Login System

```javascript
let isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back!");
} else {
  console.log("Please log in.");
}

// Output: Please log in.
```

### Thinking Question
> If you change `isLoggedIn` to `true`, what will the output be?

---

## 🧠 LESSON 5: The `else if` Statement

### The Problem `else if` Solves

`if...else` handles two options: true or false. But what if there are **three or more possibilities**?

Imagine you need to check what grade a student got:
- Score 90 and above → Grade A
- Score 70 to 89 → Grade B
- Score below 70 → Grade C

`else if` lets you test **multiple conditions** in a chain.

### Syntax

```javascript
if (condition1) {
  // runs if condition1 is true
} else if (condition2) {
  // runs if condition1 is false AND condition2 is true
} else {
  // runs if all conditions above are false
}
```

### Example 1 — Time-Based Greeting

```javascript
let time = 9; // 9 AM

if (time < 10) {
  greeting = "Good morning";
} else if (time < 20) {
  greeting = "Good day";
} else {
  greeting = "Good evening";
}

console.log(greeting);
// Output: Good morning
```

How JavaScript reads this:
1. Is `time < 10`? → Is `9 < 10`? → YES → Print "Good morning" → STOP, don't check the rest

### Example 2 — Student Grade

```javascript
let score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else if (score >= 50) {
  console.log("Grade: C");
} else {
  console.log("Grade: F — Please study more!");
}

// Output: Grade: B
```

JavaScript checks each condition from top to bottom and stops at the first `true` one.

### ⚠️ Common Beginner Mistake: Order Matters!

```javascript
// WRONG ORDER ❌ — This will give "A" for any score >= 50 if checked first!
if (score >= 50) {
  console.log("Grade: C");
} else if (score >= 70) {
  console.log("Grade: B");
} else if (score >= 90) {
  console.log("Grade: A");
}
// A score of 95 would print "Grade: C" — WRONG!

// CORRECT ORDER ✅ — Start with the highest (most specific) condition
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else if (score >= 50) {
  console.log("Grade: C");
}
```

Always write conditions from **most specific/highest to least specific/lowest**.

---

## 🧠 LESSON 6: The Ternary Operator `? :`

### What Is the Ternary Operator?

The **ternary operator** is a short, compact version of `if...else`. It fits on a single line.

The word "ternary" means "three parts" — and the operator has exactly three parts.

### Syntax

```javascript
condition ? valueIfTrue : valueIfFalse
```

Read it like this:
> "Is the condition true? If yes, give me `valueIfTrue`. If no, give me `valueIfFalse`."

### Side-by-Side Comparison

Regular `if...else`:
```javascript
let age = 20;
let canVote;

if (age >= 18) {
  canVote = "Yes";
} else {
  canVote = "No";
}

console.log(canVote); // Output: Yes
```

Same thing with ternary:
```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";

console.log(canVote); // Output: Yes
```

### Breaking It Down

```
age >= 18  ?  "Yes"  :  "No"
   ↑              ↑         ↑
condition    if true   if false
```

- `age >= 18` → the condition (is 20 >= 18? YES → `true`)
- `?` → means "then"
- `"Yes"` → the value to use when `true`
- `:` → means "else"
- `"No"` → the value to use when `false`

### Example — Ticket Price

```javascript
let age = 10;
let ticketPrice = age < 12 ? "Free" : "$15";

console.log("Your ticket: " + ticketPrice);
// Output: Your ticket: Free
```

### When Should You Use Ternary vs If...Else?

| Situation | Use |
|-----------|-----|
| Simple two-option result | Ternary `? :` |
| Complex logic, multiple lines | `if...else` |
| Three or more conditions | `else if` chain |
| Many specific cases | `switch` |

### ⚠️ Common Beginner Mistake: Nesting Too Deep

```javascript
// HARD TO READ ❌
let result = score >= 90 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : "F";

// EASIER TO READ ✅ — Use if/else if for 3+ conditions
```

Keep ternary simple — use it for **two choices only**.

---

## 🧠 LESSON 7: The `switch` Statement

### What Problem Does `switch` Solve?

Imagine you need to do different things based on what day of the week it is. You could write a long chain of `else if`:

```javascript
if (day === 1) { ... }
else if (day === 2) { ... }
else if (day === 3) { ... }
else if (day === 4) { ... }
// ...and so on
```

This works but gets messy. `switch` makes this much cleaner when you're comparing **one variable to many specific values**.

### Syntax

```javascript
switch (expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
    // code block (runs if no case matches)
}
```

### How It Works — Step by Step

1. JavaScript evaluates the `expression` **once**
2. It compares that value to each `case` label
3. If it finds a match, it runs the code for that case
4. `break` stops further checking and exits the switch
5. If no match is found, `default` runs

### Example 1 — Day of the Week

```javascript
let day;
switch (new Date().getDay()) {
  case 0:
    day = "Sunday";
    break;
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
    break;
}

console.log("Today is: " + day);
// Output depends on the actual day. If today is Saturday: "Today is: Saturday"
```

`new Date().getDay()` is a built-in JavaScript function that returns the current day number (0=Sunday, 1=Monday, etc.).

### The `default` Keyword — Your Safety Net

`default` is like the `else` in `if...else`. It runs when **no case matches**.

```javascript
let fruit = "mango";

switch (fruit) {
  case "apple":
    console.log("Apples are red.");
    break;
  case "banana":
    console.log("Bananas are yellow.");
    break;
  default:
    console.log("Unknown fruit!");
}

// Output: Unknown fruit!
```

### ⚠️ Common Beginner Mistake: Forgetting `break`!

```javascript
let x = 1;

switch (x) {
  case 1:
    console.log("One");   // This runs
  case 2:
    console.log("Two");   // This ALSO runs! (no break above)
  case 3:
    console.log("Three"); // This ALSO runs!
}

// Output:
// One
// Two
// Three
```

Without `break`, JavaScript "falls through" to the next case. Always add `break` after each case (unless you intentionally want fall-through).

### Intentional Fall-Through — Sharing Code Between Cases

Sometimes you want multiple cases to do the same thing:

```javascript
let day = new Date().getDay();
let text;

switch (day) {
  case 4:
  case 5:
    text = "Almost Weekend!";
    break;
  case 0:
  case 6:
    text = "It's the Weekend!";
    break;
  default:
    text = "Looking forward to the Weekend";
}

console.log(text);
// If today is Friday (5): Output: Almost Weekend!
// If today is Saturday (6): Output: It's the Weekend!
```

### `switch` Uses Strict Comparison (`===`)

```javascript
let x = "0"; // This is a STRING

switch (x) {
  case 0:             // This is a NUMBER — not the same type!
    console.log("Zero");
    break;
  default:
    console.log("No match found");
}

// Output: No match found
// Because "0" (string) !== 0 (number)
```

`switch` uses `===` (strict equality), so the **type** must also match.

---

## 🧠 LESSON 8: Logical Operators

### What Are Logical Operators?

Logical operators let you **combine multiple conditions** into one.

Think of them like the words "AND", "OR", and "NOT" in everyday language:
- "I'll go to the party **if** it's not raining **AND** I've finished my work."
- "I'll have tea **OR** coffee."
- "She is **NOT** a student."

### The Three Logical Operators

| Operator | Name | Meaning | Example |
|----------|------|---------|---------|
| `&&` | AND | Both conditions must be true | `age > 18 && hasID` |
| `\|\|` | OR | At least one condition must be true | `isStudent \|\| isSenior` |
| `!` | NOT | Flips true to false, false to true | `!isLoggedIn` |

---

### The `&&` (AND) Operator

**Both sides must be `true` for the result to be `true`.**

Truth table:
| Left | Right | Result |
|------|-------|--------|
| `true` | `true` | `true` ✅ |
| `true` | `false` | `false` ❌ |
| `false` | `true` | `false` ❌ |
| `false` | `false` | `false` ❌ |

```javascript
let age = 20;
let hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("You may enter the concert.");
} else {
  console.log("Sorry, entry not allowed.");
}

// Output: You may enter the concert.
```

Both conditions are `true`: `age >= 18` is true AND `hasTicket` is true → Overall: `true`.

```javascript
let age = 16;
let hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("You may enter the concert.");
} else {
  console.log("Sorry, entry not allowed.");
}

// Output: Sorry, entry not allowed.
// Because age >= 18 is FALSE, the entire condition fails.
```

---

### The `||` (OR) Operator

**At least one side must be `true` for the result to be `true`.**

Truth table:
| Left | Right | Result |
|------|-------|--------|
| `true` | `true` | `true` ✅ |
| `true` | `false` | `true` ✅ |
| `false` | `true` | `true` ✅ |
| `false` | `false` | `false` ❌ |

```javascript
let isStudent = true;
let isSenior = false;

if (isStudent || isSenior) {
  console.log("You get a 20% discount.");
} else {
  console.log("No discount.");
}

// Output: You get a 20% discount.
// Because isStudent is TRUE, the OR is satisfied even though isSenior is false.
```

---

### The `!` (NOT) Operator

**Flips the value**: turns `true` into `false` and vice versa.

```javascript
let isLoggedIn = false;

if (!isLoggedIn) {
  console.log("Please log in to continue.");
}

// Output: Please log in to continue.
// !isLoggedIn → !false → true → condition passes
```

Another example:

```javascript
let isRaining = true;
console.log(!isRaining); // Output: false
console.log(!false);     // Output: true
```

### Combining Logical Operators

You can chain them:

```javascript
let age = 25;
let hasLicense = true;
let isSober = true;

if (age >= 18 && hasLicense && isSober) {
  console.log("You may drive.");
} else {
  console.log("You may not drive.");
}

// Output: You may drive.
```

> 💡 **Real-World Use**: Logical operators are used constantly in web development — checking user permissions, validating form fields, filtering data, controlling access to features.

### ⚠️ Common Beginner Mistake: Using `&&` Instead of `||` or Vice Versa

```javascript
// WRONG ❌ — A number can't be both less than 0 AND greater than 100 at the same time
if (score < 0 && score > 100) { ... }  // This will NEVER be true

// CORRECT ✅ — It should be OR
if (score < 0 || score > 100) {
  console.log("Invalid score!");
}
```

---

---

# 🔶 SECTION 2 — APPLIED EXERCISES

---

## 📝 EXERCISE 1: The Admission Checker

**Objective:** Use `if`, `else if`, and `else` to determine if a student can be admitted to a program.

**Scenario:** A university has these rules:
- Score of 80 or above → Admitted ✅
- Score of 60–79 → Waitlisted ⏳
- Score below 60 → Rejected ❌

**Warm-Up Mini Example First:**
```javascript
let num = 75;

if (num > 100) {
  console.log("Above range");
} else if (num > 50) {
  console.log("In middle range");
} else {
  console.log("Below range");
}

// Output: In middle range
```

**Your Exercise:**
```javascript
// Step 1: Create a variable called 'score' and assign a number (try different values!)
let score = 72;  // Try: 85, 72, 45

// Step 2: Write if / else if / else to print the correct message
if (score >= 80) {
  console.log("Admitted! Welcome to the university.");
} else if (score >= 60) {
  console.log("You are on the waitlist.");
} else {
  console.log("Rejected. Please improve your score and try again.");
}

// Output (with score = 72): You are on the waitlist.
// Output (with score = 85): Admitted! Welcome to the university.
// Output (with score = 45): Rejected. Please improve your score and try again.
```

**Hints:**
- Make sure you start from the highest condition (80) down to the lowest
- The `else` at the end catches everything remaining

**Self-Check Questions:**
1. What does `score >= 80` evaluate to when `score = 80`? (Answer: `true`)
2. What if score is exactly 60? Which block runs?
3. What would happen if you wrote the conditions in reverse order (lowest first)?

**What-If Challenge:**
> What if you wanted to add a "Distinguished" category for scores of 95 or above? How would you modify the code?

---

## 📝 EXERCISE 2: The Traffic Light (Switch Statement)

**Objective:** Use a `switch` statement to describe what a driver should do based on a traffic light color.

**Scenario:** Build a simple traffic light advisor.

**Warm-Up Mini Example:**
```javascript
let season = "winter";

switch (season) {
  case "summer":
    console.log("Wear light clothes.");
    break;
  case "winter":
    console.log("Wear a coat.");
    break;
  default:
    console.log("Dress for the weather.");
}
// Output: Wear a coat.
```

**Your Exercise:**
```javascript
let light = "yellow"; // Try: "red", "yellow", "green", "purple"

switch (light) {
  case "red":
    console.log("STOP. Do not go.");
    break;
  case "yellow":
    console.log("SLOW DOWN. Prepare to stop.");
    break;
  case "green":
    console.log("GO. Proceed safely.");
    break;
  default:
    console.log("Unknown signal. Stop and check.");
}

// Output (with light = "yellow"): SLOW DOWN. Prepare to stop.
// Output (with light = "red"):    STOP. Do not go.
// Output (with light = "green"):  GO. Proceed safely.
// Output (with light = "purple"): Unknown signal. Stop and check.
```

**Self-Check Questions:**
1. What happens if you remove the `break` from case "red"?
2. Why does `switch` use `===`? What would happen if you used `light = 0` (a number) but your case had `case "0":`?

**What-If Challenge:**
> Add cases for "flashing red" (treat like a stop sign) and "flashing yellow" (proceed with caution).

---

## 📝 EXERCISE 3: The Discount Calculator (Logical Operators)

**Objective:** Use `&&` and `||` to determine if a customer qualifies for a discount.

**Scenario:** A supermarket offers these discounts:
- Members AND spend over $50 → 15% off
- Non-members BUT spend over $100 → 10% off
- Everyone else → No discount

**Warm-Up Mini Example:**
```javascript
let hasMembership = true;
let total = 60;

if (hasMembership && total > 50) {
  console.log("You get 15% off!");
}
// Output: You get 15% off!
```

**Your Exercise:**
```javascript
let isMember = false;
let amountSpent = 120;

if (isMember && amountSpent > 50) {
  console.log("Discount: 15% off! (Member bonus)");
} else if (!isMember && amountSpent > 100) {
  console.log("Discount: 10% off! (Big spender bonus)");
} else {
  console.log("No discount this time.");
}

// Output (isMember = false, amountSpent = 120): Discount: 10% off!
// Output (isMember = true,  amountSpent = 60):  Discount: 15% off!
// Output (isMember = false, amountSpent = 40):  No discount this time.
```

**Professional Connection:** E-commerce developers write similar logic every day to apply discount codes, loyalty points, and promotional pricing.

---

## 📝 EXERCISE 4: The Ternary Shortcut

**Objective:** Rewrite `if...else` code using the ternary operator.

**Starter Code (using if...else):**
```javascript
let temperature = 35;
let weather;

if (temperature > 30) {
  weather = "It's hot outside!";
} else {
  weather = "Nice and cool today.";
}

console.log(weather);
// Output: It's hot outside!
```

**Now Rewrite It with Ternary:**
```javascript
let temperature = 35;
let weather = temperature > 30 ? "It's hot outside!" : "Nice and cool today.";

console.log(weather);
// Output: It's hot outside!
```

**Self-Check Questions:**
1. Which version is shorter? Which is easier to read at a glance?
2. When would you prefer the longer `if...else` version?

---

---

# 🔶 SECTION 3 — PROJECT SIMULATION

---

## 🏗️ MINI-PROJECT: Student Grade & Feedback System

### Project Description

You are going to build a simple **Student Grade & Feedback System** that:
1. Takes a student's exam score
2. Determines their letter grade (A, B, C, D, F)
3. Provides personalised feedback
4. Checks if extra tutoring is needed
5. Displays a motivational message based on the grade

This is a real type of tool used in school management software, LMS (Learning Management Systems) like Blackboard or Moodle, and student portals.

---

### 📍 STAGE 1: Setup & Core Logic — Determine the Grade

**Preview of what we're building:**

> Input: `score = 78`
> Output:
> ```
> Student Score: 78
> Letter Grade: B
> ```

**Stage 1 Code:**
```javascript
// ---- Stage 1: Score to Letter Grade ----

let studentName = "Maria";
let score = 78;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log("Student Name: " + studentName);
console.log("Student Score: " + score);
console.log("Letter Grade: " + grade);

// Output:
// Student Name: Maria
// Student Score: 78
// Letter Grade: C
```

**Reflection:** Why does a score of 78 give a "C" here? (Because `78 >= 70` is the first true condition)

---

### 📍 STAGE 2: Adding Features — Feedback & Tutoring Check

**Preview of what we're adding:**

> Now the system also gives feedback and tells us if tutoring is needed.

**Stage 2 Code:**
```javascript
// ---- Stage 2: Feedback + Tutoring ----

let studentName = "Maria";
let score = 78;
let grade;
let feedback;
let needsTutoring;

// Determine Grade
if (score >= 90) {
  grade = "A";
  feedback = "Outstanding! Keep up the excellent work.";
} else if (score >= 80) {
  grade = "B";
  feedback = "Great job! You're doing very well.";
} else if (score >= 70) {
  grade = "C";
  feedback = "Good effort. You're on the right track.";
} else if (score >= 60) {
  grade = "D";
  feedback = "Needs improvement. Review the material.";
} else {
  grade = "F";
  feedback = "Failing. Immediate attention required.";
}

// Does the student need tutoring?
needsTutoring = score < 70 ? "Yes — tutoring recommended." : "No — keep studying on your own!";

// Output Results
console.log("=== STUDENT REPORT ===");
console.log("Name:  " + studentName);
console.log("Score: " + score);
console.log("Grade: " + grade);
console.log("Feedback: " + feedback);
console.log("Needs Tutoring: " + needsTutoring);

// Output:
// === STUDENT REPORT ===
// Name:  Maria
// Score: 78
// Grade: C
// Feedback: Good effort. You're on the right track.
// Needs Tutoring: No — keep studying on your own!
```

---

### 📍 STAGE 3: Full System — Adding Attendance Check with Logical Operators

**Preview:** The system now also checks if the student has sufficient attendance (need >= 80% to pass regardless of score).

```javascript
// ---- Stage 3: Full Student Grade & Feedback System ----

let studentName = "James";
let score = 85;
let attendance = 65; // percentage
let grade;
let feedback;
let status;

// Check attendance FIRST using &&
if (score >= 60 && attendance >= 80) {
  // Student has both passing score AND attendance

  if (score >= 90) {
    grade = "A";
    feedback = "Outstanding! You are among the top students.";
  } else if (score >= 80) {
    grade = "B";
    feedback = "Great job! You're performing above average.";
  } else if (score >= 70) {
    grade = "C";
    feedback = "Good. A bit more focus will push you to B.";
  } else {
    grade = "D";
    feedback = "Passed, but needs improvement.";
  }

  status = "PASS";

} else if (score >= 60 && attendance < 80) {
  // Good score but not enough attendance
  grade = "INC";
  feedback = "Your score is good but attendance is too low!";
  status = "INCOMPLETE";

} else {
  // Failing score
  grade = "F";
  feedback = "Failed. Please retake the course.";
  status = "FAIL";
}

// Motivational message using switch on grade
let motivation;
switch (grade) {
  case "A":
    motivation = "You're a star! 🌟";
    break;
  case "B":
    motivation = "Almost perfect! Keep it up! 💪";
    break;
  case "C":
    motivation = "Good base! Push yourself harder! 🎯";
    break;
  case "D":
    motivation = "You passed! Now aim higher. 📚";
    break;
  case "INC":
    motivation = "Please attend more classes. 📅";
    break;
  default:
    motivation = "Don't give up. Everyone can improve. 🔁";
}

// Display the full report
console.log("==============================");
console.log("     STUDENT REPORT CARD      ");
console.log("==============================");
console.log("Name:       " + studentName);
console.log("Score:      " + score + "%");
console.log("Attendance: " + attendance + "%");
console.log("Grade:      " + grade);
console.log("Status:     " + status);
console.log("Feedback:   " + feedback);
console.log("Message:    " + motivation);
console.log("==============================");

// Output:
// ==============================
//      STUDENT REPORT CARD
// ==============================
// Name:       James
// Score:      85%
// Attendance: 65%
// Grade:      INC
// Status:     INCOMPLETE
// Feedback:   Your score is good but attendance is too low!
// Message:    Please attend more classes. 📅
// ==============================
```

**Reflection Questions:**
1. How would this work in a real school system? What other data might you track (e.g., homework submission, participation)?
2. What would happen if a student had a score of 55 and attendance of 90%? Trace through the logic.
3. How might a developer connect this to a database to store hundreds of students' results?

**Optional Advanced Challenge:**
- Add a weighted grade: 60% exam + 40% coursework
- Add a "scholarship" check: Grade A AND attendance >= 95%
- Format the output as an HTML report card

---

---

# ✅ COMPLETION CHECKLIST

| Item | Status |
|------|--------|
| All main ideas fully explained (if, else, else if, switch, ternary, booleans, logical operators) | ✅ |
| At least one simple example per concept with expected output | ✅ |
| Common beginner errors highlighted and corrected | ✅ |
| Real-world relevance shown for each topic | ✅ |
| Applied exercises with scenarios, hints, and self-check questions | ✅ |
| Full mini-project built in 3 stages with expected outputs | ✅ |
| Reflection questions answered | ✅ |
| Progressive difficulty: simple → moderate → realistic | ✅ |

---

**One-Sentence Summary:** JavaScript conditional statements — `if`, `else`, `else if`, `switch`, the ternary operator, Booleans, and logical operators — give your programs the power to make decisions and respond intelligently to different situations, which is a skill you will use in every real-world JavaScript project you ever build.