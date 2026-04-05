---
render_with_liquid: false
title: "JavaScript Operators: JS Operators · JS Arithmetic · JS Assignment · JS Comparisons"
nav_order: 4
---

# 🗺️ What You Will Learn
Before we write a single line of code, let's understand what this lesson is about. By the end, you will know:

1. What operators are and why they exist
2. How to do math in JavaScript (Arithmetic Operators)
3. How to store and update values in variables (Assignment Operators)
4. How to compare two values and get a yes/no answer (Comparison Operators)

Each concept gets its own explanation, its own simple example, and a real-world connection. Nothing is skipped.

---

# 📘 SECTION 1 — CONCEPTUAL UNDERSTANDING

---

## Chapter 1: What Is an Operator?

### What Is It?

An **operator** is a special symbol that tells JavaScript to perform a specific action on one or more values.

Think of operators as **verbs in a sentence**. In English, "Add the apples" — *add* is the verb. In JavaScript, `+` is the operator.

**Relatable Comparison:** A calculator has buttons like `+`, `-`, `×`, `÷`. Each button is an operator — it tells the calculator what to do with the numbers you type. JavaScript operators work exactly the same way, but inside your code.

### Why Do Operators Exist?

Without operators, JavaScript would just be a list of stored values with no way to interact with them. Operators are what give code its **power** — they let us compute totals, update quantities, compare values, and make decisions.

In a real job (e.g., software developer, data analyst, web designer), you use operators every single day — to calculate prices, check if a user is old enough to sign up, update a shopping cart total, etc.

### The Two Key Words: Operand and Operator

In an arithmetic expression like `100 + 50`:

- `100` and `50` are called **operands** — the numbers being worked on.
- `+` is the **operator** — the instruction that says what to do.

```
Operand   Operator   Operand
  100         +        50
```

The result of `100 + 50` is `150`. JavaScript computes that for you automatically.

### Types of JavaScript Operators (Overview)

JavaScript has several families of operators. This lesson covers the three most essential for beginners:

1. **Arithmetic Operators** — do math (`+`, `-`, `*`, `/`, `%`, `**`, `++`, `--`)
2. **Assignment Operators** — store or update a value in a variable (`=`, `+=`, `-=`, etc.)
3. **Comparison Operators** — compare two values and return `true` or `false` (`==`, `===`, `!=`, `>`, `<`, etc.)

There are also Logical Operators (`&&`, `||`, `!`) which are covered in a later lesson.

---

## Chapter 2: JavaScript Arithmetic Operators

### What Are Arithmetic Operators?

Arithmetic operators perform **math operations** on numbers. They work just like the math you learned in school.

There are **8 arithmetic operators** in JavaScript:

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition | `5 + 2` | `7` |
| `-` | Subtraction | `5 - 2` | `3` |
| `*` | Multiplication | `5 * 2` | `10` |
| `/` | Division | `5 / 2` | `2.5` |
| `%` | Modulus (Remainder) | `5 % 2` | `1` |
| `**` | Exponentiation | `5 ** 2` | `25` |
| `++` | Increment (add 1) | `x++` | x becomes x + 1 |
| `--` | Decrement (subtract 1) | `x--` | x becomes x - 1 |

Let's learn each one carefully.

---

### 2.1 — Addition (`+`)

**What it does:** Adds two numbers together.

**Real-life use:** Adding items in a shopping cart, calculating a total score, combining numbers from a form.

**Simple Example:**
```javascript
let x = 5;
let y = 2;
let z = x + y;
// Expected output: z = 7
```

Step by step:
- `let x = 5` → stores the number 5 in a box called `x`
- `let y = 2` → stores the number 2 in a box called `y`
- `let z = x + y` → adds them together and stores the result in `z`
- Result: `z` holds the value `7`

**Another form — using plain numbers (literals):**
```javascript
let z = 100 + 50;
// Expected output: z = 150
```

**Thinking Question:** What happens if `x = 0` and `y = 0`? What would `z` be?

---

### 2.2 — Subtraction (`-`)

**What it does:** Subtracts the second number from the first.

**Real-life use:** Calculating change from a purchase, finding the difference between two scores, deducting a penalty.

```javascript
let x = 5;
let y = 2;
let z = x - y;
// Expected output: z = 3
```

---

### 2.3 — Multiplication (`*`)

**What it does:** Multiplies two numbers.

**Real-life use:** Calculating the total price of multiple items (price × quantity), finding area (width × height).

```javascript
let x = 5;
let y = 2;
let z = x * y;
// Expected output: z = 10
```

---

### 2.4 — Division (`/`)

**What it does:** Divides the first number by the second.

**Real-life use:** Splitting a restaurant bill equally, finding the average of values, calculating speed (distance ÷ time).

```javascript
let x = 5;
let y = 2;
let z = x / y;
// Expected output: z = 2.5
```

Notice that JavaScript gives you the decimal answer `2.5` — it doesn't round down like some languages.

---

### 2.5 — Modulus / Remainder (`%`)

**What it does:** Returns the **remainder** after division — what's left over.

Think of it like dividing oranges into boxes: if you have 5 oranges and each box holds 2, you fill 2 boxes and have **1 orange left over**. That leftover is the modulus.

**Real-life use:** Checking if a number is even or odd, determining if a year is a leap year, distributing items evenly.

```javascript
let x = 5;
let y = 2;
let z = x % y;
// 5 ÷ 2 = 2 remainder 1
// Expected output: z = 1
```

**Thinking Question:** What would `10 % 5` give? What about `10 % 3`?
- `10 % 5` = 0 (10 divides evenly by 5, no remainder)
- `10 % 3` = 1 (3 goes into 10 three times = 9, with 1 left)

**Common Beginner Mistake:** Confusing `%` with "percentage". In JavaScript, `%` is NOT percentage. It gives the leftover after division.

---

### 2.6 — Exponentiation (`**`)

**What it does:** Raises a number to the power of another number. `x ** y` means "x to the power of y".

**Reminder:** `5 ** 2` means 5 × 5 = 25. `5 ** 3` means 5 × 5 × 5 = 125.

**Real-life use:** Scientific calculations, compound interest formulas, calculating areas of squares, computing pixel grids.

```javascript
let x = 5;
let z = x ** 2;
// Expected output: z = 25
```

This is the same as using JavaScript's built-in math method:
```javascript
let z = Math.pow(5, 2);
// Expected output: z = 25
```

Both give the same result! The `**` operator (introduced in ES2016) is just a shorter, cleaner way to write it.

---

### 2.7 — Increment (`++`)

**What it does:** Adds 1 to a number. It's a shortcut for `x = x + 1`.

**Real-life use:** Counting visitors to a page, moving to the next step, tracking loop repetitions.

```javascript
let x = 5;
x++;          // Same as: x = x + 1
let z = x;
// Expected output: z = 6
```

---

### 2.8 — Decrement (`--`)

**What it does:** Subtracts 1 from a number. It's a shortcut for `x = x - 1`.

**Real-life use:** Counting down a timer, reducing stock quantity, going backward through steps.

```javascript
let x = 5;
x--;          // Same as: x = x - 1
let z = x;
// Expected output: z = 4
```

---

### 2.9 — IMPORTANT: The `+` Operator with Strings (Concatenation)

The `+` operator has a **special second job**: when used with text (called **strings** in JavaScript), it joins (concatenates) them together.

**Real-life use:** Building a full name from first and last name, creating a personalized greeting, combining address parts.

**Simple example:**
```javascript
let text1 = "John";
let text2 = "Doe";
let text3 = text1 + " " + text2;
// Expected output: "John Doe"
```

Notice `" "` is a space — we added it between the names so they don't stick together as `"JohnDoe"`.

**Using `+=` with strings:**
```javascript
let text1 = "What a very ";
text1 += "nice day";
// Expected output: "What a very nice day"
```

`+=` here means "add `"nice day"` to the end of `text1`".

---

### ⚠️ CRITICAL BEGINNER MISTAKE — Adding a Number and a String

This is one of the most common surprises for beginners. What happens when you add a **number** and a **string** using `+`?

```javascript
let x = 5 + 5;       // Both numbers → addition
let y = "5" + 5;     // String + number → string joining!
let z = "Hello" + 5; // String + number → string joining!

// x = 10      (number)
// y = "55"    (string, not 55 the number!)
// z = "Hello5" (string)
```

**Why?** JavaScript sees a string and says: "I'll treat this whole thing as text." So instead of adding 5 + 5 mathematically, it pastes them together as characters.

**Rule to remember:** If even ONE side of the `+` is a string, the result will be a **string**, not a number.

**Thinking Question:** What would `"10" + "5"` produce? What about `"10" - "5"`?
- `"10" + "5"` = `"105"` (string joining)
- `"10" - "5"` = `5` (number! The `-` operator always tries to do math, so it converts the strings to numbers)

---

### 2.10 — Operator Precedence (Order of Operations)

**What is it?** When you write an expression with multiple operators, JavaScript needs to decide which one to calculate first. This order is called **operator precedence**.

This is exactly like the math rule BODMAS / PEMDAS you learned in school: multiplication and division happen before addition and subtraction.

**Example:**
```javascript
let x = 100 + 50 * 3;
// Expected output: x = 250 (NOT 450)
```

Why 250 and not 450?
- `*` has higher precedence than `+`
- So JavaScript first does `50 * 3 = 150`
- Then `100 + 150 = 250`

**Using parentheses to change the order:**
```javascript
let x = (100 + 50) * 3;
// Expected output: x = 450
```

Now JavaScript calculates `(100 + 50)` first because parentheses have the **highest precedence**.

**Same precedence — left to right:**
```javascript
let x = 100 + 50 - 3;
// = 150 - 3 = 147 (left to right)

let x = 100 / 50 * 3;
// = 2 * 3 = 6 (left to right)
```

---

## Chapter 3: JavaScript Assignment Operators

### What Are Assignment Operators?

An **assignment operator** puts a value **into** a variable. It's like writing a label on a jar and filling it.

The most basic one is `=`. But there are many shortcut versions that let you update a variable more quickly.

**Important:** The `=` in programming is NOT the same as `=` in math. In math, `x = 5` means "x equals 5." In JavaScript, `x = 5` means "**store** the value 5 inside the variable x."

---

### 3.1 — The Simple Assignment Operator (`=`)

**What it does:** Assigns (stores) a value in a variable.

```javascript
let x = 10;
// x now holds the value 10

let x = 10 + y;
// x now holds whatever 10 + y evaluates to
```

**For strings:**
```javascript
let text = "Hello";
// text now holds the string "Hello"
```

---

### 3.2 — The Full List of Assignment Operators

Given that `x = 10` and `y = 5`, here's what each operator does:

| Operator | Example | What It Means | Result |
|----------|---------|---------------|--------|
| `=` | `x = y` | store y's value in x | `x = 5` |
| `+=` | `x += y` | same as `x = x + y` | `x = 15` |
| `-=` | `x -= y` | same as `x = x - y` | `x = 5` |
| `*=` | `x *= y` | same as `x = x * y` | `x = 50` |
| `**=` | `x **= y` | same as `x = x ** y` | `x = 100000` |
| `/=` | `x /= y` | same as `x = x / y` | `x = 2` |
| `%=` | `x %= y` | same as `x = x % y` | `x = 0` |

Let's look at each one individually.

---

### 3.3 — Addition Assignment (`+=`)

**What it does:** Adds a value TO an existing variable. Updates the variable in place.

**Real-life use:** Adding points to a game score, adding an item's price to a running cart total.

```javascript
let x = 10;
x += 5;
// Same as: x = x + 5 = 10 + 5
// Expected output: x = 15
```

**With strings:**
```javascript
let text = "Hello";
text += " World";
// Expected output: "Hello World"
```

---

### 3.4 — Subtraction Assignment (`-=`)

**What it does:** Subtracts a value FROM an existing variable.

**Real-life use:** Deducting points, reducing inventory count.

```javascript
let x = 10;
x -= 5;
// Same as: x = x - 5
// Expected output: x = 5
```

---

### 3.5 — Multiplication Assignment (`*=`)

**What it does:** Multiplies a variable by a value.

**Real-life use:** Applying a 2x bonus multiplier to a score, doubling quantities.

```javascript
let x = 10;
x *= 5;
// Same as: x = x * 5
// Expected output: x = 50
```

---

### 3.6 — Exponentiation Assignment (`**=`)

**What it does:** Raises a variable to the power of a value.

```javascript
let x = 10;
x **= 5;
// Same as: x = x ** 5 = 10 * 10 * 10 * 10 * 10
// Expected output: x = 100000
```

---

### 3.7 — Division Assignment (`/=`)

**What it does:** Divides a variable by a value.

**Real-life use:** Splitting a group evenly, halving a quantity.

```javascript
let x = 10;
x /= 5;
// Same as: x = x / 5
// Expected output: x = 2
```

---

### 3.8 — Remainder Assignment (`%=`)

**What it does:** Replaces the variable with the remainder of dividing by a value.

```javascript
let x = 10;
x %= 5;
// Same as: x = x % 5 = 10 % 5
// 10 ÷ 5 = 2 with remainder 0
// Expected output: x = 0
```

---

### 3.9 — Logical Assignment Operators (ES2020)

These are newer, more advanced assignment operators. They combine logical conditions with assignment.

**The `&&=` (Logical AND Assignment):**
If the first value is **truthy** (true, a non-zero number, a non-empty string), assign the second value.

```javascript
let x = true;
let y = x &&= 10;
// x is true (truthy), so 10 gets assigned
// Expected output: x = 10, y = 10

let x = false;
let y = x &&= 10;
// x is false (falsy), so nothing happens
// Expected output: x = false, y = false

let x = 1;
let y = x &&= 10;
// 1 is truthy, so 10 gets assigned
// Expected output: x = 10, y = 10

let x = 0;
let y = x &&= 10;
// 0 is falsy, so nothing happens
// Expected output: x = 0, y = 0
```

**The `||=` (Logical OR Assignment):**
If the first value is **falsy** (false, 0, null, undefined), assign the second value.

```javascript
let x = false;
let y = x ||= 10;
// x is false (falsy), so 10 gets assigned
// Expected output: x = 10, y = 10

let x = true;
let y = x ||= 10;
// x is true (truthy), so nothing happens
// Expected output: x = true, y = true

let x = null;
let y = x ||= 10;
// null is falsy, so 10 gets assigned
// Expected output: x = 10, y = 10
```

**The `??=` (Nullish Coalescing Assignment):**
Only assigns if the variable is **`undefined`** or **`null`** specifically.

```javascript
let x;           // x is undefined
x ??= 10;
// Expected output: x = 10

let x = 0;
x ??= 10;
// 0 is NOT null or undefined, so nothing changes
// Expected output: x = 0   ← Notice: this is different from ||=!

let x = null;
x ??= 10;
// Expected output: x = 10
```

**Key difference between `||=` and `??=`:**
`||=` treats `0`, `""`, `false` as "assign the new value." `??=` does NOT — it only triggers on `null`/`undefined`. This matters when `0` or `""` (empty string) are valid values you want to keep.

---

### 3.10 — The Spread Operator (`...`)

The spread operator (`...`) takes something that contains multiple items (like a string of characters or an array) and **splits it into individual elements**.

```javascript
let text = "12345";
let min = Math.min(...text);
let max = Math.max(...text);
// ...text spreads "12345" into 1, 2, 3, 4, 5
// Expected output: min = 1, max = 5
```

This is an ES6 feature used widely in modern JavaScript for working with arrays, objects, and function arguments.

---

## Chapter 4: JavaScript Comparison Operators

### What Are Comparison Operators?

Comparison operators **compare two values** and always return either `true` or `false`. There is no in-between — it's a yes/no answer.

**Real-life analogy:** Imagine a bouncer at a club checking IDs. They ask: "Is this person 18 or older?" The answer is either yes (`true`) or no (`false`). Comparison operators work exactly like that.

**Real-life use:** Deciding whether a user is logged in, checking if a product is in stock, validating form inputs, determining game outcomes (who won?).

---

### 4.1 — The Full Comparison Operators Table

Given `x = 5`:

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `==` | Equal to (value only) | `x == 5` | `true` |
| | | `x == "5"` | `true` (converts type!) |
| | | `x == 8` | `false` |
| `===` | Strictly equal (value AND type) | `x === 5` | `true` |
| | | `x === "5"` | `false` (different type) |
| `!=` | Not equal (value only) | `x != 8` | `true` |
| `!==` | Strictly not equal | `x !== "5"` | `true` |
| | | `x !== 5` | `false` |
| `>` | Greater than | `x > 8` | `false` |
| `<` | Less than | `x < 8` | `true` |
| `>=` | Greater than or equal to | `x >= 5` | `true` |
| `<=` | Less than or equal to | `x <= 8` | `true` |

---

### 4.2 — Equal To (`==`) vs Strictly Equal To (`===`)

This is the **most important distinction** in comparison operators. Many beginners get burned by this one.

**`==` (Loose Equality — compares values, ignores type):**
JavaScript will try to convert the types before comparing.

```javascript
let x = 5;

console.log(x == 5);    // true  (5 equals 5)
console.log(x == "5");  // true  (JavaScript converts "5" to 5 first)
console.log(x == 8);    // false (5 does not equal 8)
```

**`===` (Strict Equality — compares BOTH value AND data type):**

```javascript
let x = 5;

console.log(x === 5);    // true  (5 is a number, 5 is a number — match!)
console.log(x === "5");  // false (5 is a number, "5" is a string — NO match!)
```

**Real-life analogy:** `==` is like asking "Do these two boxes weigh the same?" It doesn't care what's inside. `===` is like asking "Are these two boxes exactly identical — same weight AND same contents?"

**Best Practice for beginners:** Always prefer `===` (strict equality) to avoid unexpected type-conversion surprises. Most professional developers use `===` by default.

---

### 4.3 — Not Equal (`!=`) and Strictly Not Equal (`!==`)

These work the same way but in reverse — they check if things are **different**.

```javascript
let x = 5;

console.log(x != 8);    // true  (5 is NOT equal to 8)
console.log(x !== 5);   // false (5 IS equal to 5, so NOT-not-equal is false)
console.log(x !== "5"); // true  (5 the number is NOT the same type as "5" the string)
console.log(x !== 8);   // true  (5 is not equal to 8)
```

---

### 4.4 — Greater Than and Less Than

```javascript
let x = 5;

console.log(x > 8);   // false (5 is not greater than 8)
console.log(x < 8);   // true  (5 IS less than 8)
console.log(x >= 5);  // true  (5 is equal to 5, so "greater than OR equal to" is true)
console.log(x >= 8);  // false (5 is neither greater than nor equal to 8)
console.log(x <= 8);  // true  (5 is less than 8)
```

**Thinking Question:** Is `x >= 5` the same as `x > 4` when x is a whole number? Yes — for integers, these produce the same result. But they behave differently for decimals!

---

### 4.5 — Using Comparison Operators in Real Code

Comparison operators are almost always used with **if-statements** to make decisions:

```javascript
let age = 16;
if (age < 18) {
    text = "Too young to buy alcohol";
}
// Since 16 < 18 is true, text becomes "Too young to buy alcohol"
```

---

### 4.6 — String Comparisons

All comparison operators work on strings too! JavaScript compares them **alphabetically** (by their position in the alphabet).

```javascript
let text1 = "A";
let text2 = "B";
let result = text1 < text2;
// Expected output: true ("A" comes before "B" alphabetically)
```

**Tricky example:**
```javascript
let text1 = "20";
let text2 = "5";
let result = text1 < text2;
// Expected output: true (NOT false!)
```

Why? Because "20" and "5" are being compared as **strings**, not as numbers. JavaScript looks at the first character: `"2"` vs `"5"`. The character `"2"` comes before `"5"` in alphabetical order, so "20" is considered "less than" "5" as strings!

---

### 4.7 — Comparing Different Types (Number vs String)

When you compare a **string** with a **number** using `<`, `>`, `>=`, `<=`, JavaScript **converts the string to a number** first:

```javascript
console.log(2 < 12);      // true  (normal number comparison)
console.log(2 < "12");    // true  ("12" is converted to 12, then 2 < 12)
console.log(2 < "John");  // false ("John" can't be a number → NaN, always false)
console.log(2 > "John");  // false (same reason)
console.log(2 == "John"); // false
```

**But when two STRINGS are compared with `<`, `>`, they stay as strings:**
```javascript
console.log("2" < "12");  // false (string comparison! "2" > "1" alphabetically)
console.log("2" > "12");  // true  (the first character "2" > "1")
console.log("2" == "12"); // false
```

This is a common source of bugs. To avoid it, always convert your values to the right type before comparing:

```javascript
// Safe comparison after converting to number:
let age = Number(age);
if (isNaN(age)) {
    voteable = "Input is not a number";
} else {
    voteable = (age < 18) ? "Too young" : "Old enough";
}
```

`Number()` converts a string to a number. `isNaN()` checks if something is "Not a Number" (catches cases where conversion fails, like `Number("John")` which gives `NaN`).

---
---

# 🛠️ SECTION 2 — APPLIED EXERCISES

---

## Exercise 1: Arithmetic Operators — The Coffee Shop Calculator

### Warm-Up Mini-Example

Before we start, here's a small preview of what we're building:
```javascript
let price = 4.50;
let quantity = 3;
let total = price * quantity;
// Expected output: total = 13.5
```

### Objective

Practice all arithmetic operators in a realistic setting: running totals, discounts, and change at a coffee shop counter.

### Scenario

You work at "JavaBean Café." Every morning you calculate orders, apply discounts, and figure out change. Use JavaScript to help.

### Step-by-Step Instructions

**Step 1:** A customer orders 3 coffees at $4.50 each. Calculate the total.
```javascript
let coffeePrice = 4.50;
let quantity = 3;
let total = coffeePrice * quantity;
// Expected output: 13.5
```

**Step 2:** They also want 2 muffins at $2.25 each. Add that to the total.
```javascript
let muffinPrice = 2.25;
let muffinQty = 2;
total += muffinPrice * muffinQty;
// total was 13.5, now total = 13.5 + 4.5 = 18
```

**Step 3:** They have a $2 discount coupon. Subtract it.
```javascript
total -= 2;
// Expected output: total = 16
```

**Step 4:** They pay with a $20 bill. How much change do they get?
```javascript
let paid = 20;
let change = paid - total;
// Expected output: change = 4
```

**Step 5:** The shop has 100 muffins. They just sold 2. Update the stock.
```javascript
let muffinStock = 100;
muffinStock -= 2;
// Expected output: muffinStock = 98
```

**Step 6 (Bonus — Modulus):** The café packs muffins into boxes of 6. How many full boxes can they make from 98 muffins? How many are left over?
```javascript
let fullBoxes = Math.floor(98 / 6);  // Math.floor rounds down to nearest whole number
let leftover = 98 % 6;
// Expected output: fullBoxes = 16, leftover = 2
```

### Hints
- Remember `*=` is a shortcut for updating multiplication
- `%` gives the remainder — think of it as "what's left over after dividing"
- `+=` is the shortcut for adding onto an existing variable

### Self-Check Questions
1. What is `7 % 2`? What does this tell you about whether 7 is even or odd?
2. If `total = 50` and you write `total -= 10`, what does total become?
3. What does `2 ** 10` evaluate to?

**What-If Challenge:** What if the coffee price increases by 15%? How would you use the multiplication assignment operator to update `coffeePrice` directly?

---

## Exercise 2: Assignment Operators — Student Grade Tracker

### Warm-Up Mini-Example

```javascript
let score = 60;
score += 10;   // Student got bonus marks
// Expected output: score = 70
```

### Objective

Use assignment operators to track and update a student's score throughout the semester.

### Scenario

You're building a simple grade tracker for a class of students. A student named "Alex" earns scores in different subjects, and you use JavaScript to update their running total.

### Step-by-Step Instructions

**Step 1:** Start Alex with a base score of 0.
```javascript
let alexScore = 0;
```

**Step 2:** Alex scores 85 on the first test. Assign it.
```javascript
alexScore = 85;
// Expected output: alexScore = 85
```

**Step 3:** Alex gets 10 bonus points for perfect attendance. Use `+=`.
```javascript
alexScore += 10;
// Expected output: alexScore = 95
```

**Step 4:** A late penalty of 5 points is applied. Use `-=`.
```javascript
alexScore -= 5;
// Expected output: alexScore = 90
```

**Step 5:** The teacher doubles all scores for a special event. Use `*=`.
```javascript
alexScore *= 2;
// Expected output: alexScore = 180
```

**Step 6:** The maximum possible score is 200. Check what percentage Alex has:
```javascript
let percentage = (alexScore / 200) * 100;
// Expected output: percentage = 90
```

**Step 7 — Logical Assignment:** If a student has no score recorded (`null`), assign a default of 50. Use `??=`.
```javascript
let newStudent = null;
newStudent ??= 50;
// Expected output: newStudent = 50
```

### Self-Check Questions
1. What's the difference between `x = 5` and `x += 5`?
2. If `score = 80` and you write `score **= 2`, what does score become?
3. Why would you use `??=` instead of `||=` when 0 is a valid score?

**Professional Application:** In a real grade-management system built with JavaScript, you'd use these operators constantly — adding new quiz scores, applying penalties, computing averages, and validating whether a field has been filled in.

---

## Exercise 3: Comparison Operators — Login Validation System

### Warm-Up Mini-Example

```javascript
let enteredAge = 17;
let isAdult = enteredAge >= 18;
// Expected output: isAdult = false
```

### Objective

Use comparison operators to simulate a simple user login and validation system.

### Scenario

You're building a basic webpage that checks if a user meets certain criteria before letting them proceed.

### Step-by-Step Instructions

**Step 1:** Check if the entered username matches the stored one (value AND type).
```javascript
let storedUser = "admin";
let enteredUser = "admin";
let isMatch = enteredUser === storedUser;
// Expected output: isMatch = true
```

**Step 2:** Check if the entered password is WRONG.
```javascript
let storedPassword = 1234;
let enteredPassword = "1234";     // User typed it as text
let isWrongPassword = storedPassword !== enteredPassword;
// Expected output: isWrongPassword = true
// (1234 number !== "1234" string because of different types)
```

Why `true`? Because `1234` (number) and `"1234"` (string) are different types. `!==` catches that difference. This is why using `===` and `!==` is so important — it prevents bugs where "1234" the text is accepted as 1234 the number.

**Step 3:** Check if a user's age allows them to vote.
```javascript
let userAge = 17;
let canVote = userAge >= 18;
// Expected output: canVote = false
```

**Step 4:** String comparison — check if a username comes before another alphabetically.
```javascript
let user1 = "Alice";
let user2 = "Bob";
let result = user1 < user2;
// Expected output: true ("A" comes before "B")
```

**Step 5:** Type-safe number comparison — user entered their age as a string from a form.
```javascript
let enteredAge = "25";   // Came from a text input field
let safeAge = Number(enteredAge);   // Convert to number first!
let canDrink = safeAge >= 21;
// Expected output: canDrink = true
```

### Self-Check Questions
1. Why does `5 == "5"` return `true` but `5 === "5"` return `false`?
2. What does `"Banana" > "Apple"` return? Why?
3. In a real login system, should you use `==` or `===` to compare passwords? Why?

**Professional Application:** Front-end developers use comparison operators constantly when validating forms, checking login status, filtering data, and controlling what a user sees on the screen.

---
---

# 🏗️ SECTION 3 — PROJECT SIMULATION

---

## Mini-Project: Smart Shopping Cart Calculator

### Project Overview

You will build a **shopping cart calculator** that applies all four operator families together. This is a real-world tool used in every e-commerce website on the internet.

**Expected Final Output:**
- Calculate subtotal from item prices and quantities
- Apply a discount
- Apply tax
- Check if the user qualifies for free shipping
- Display a clear summary

---

### Stage 1 — Setup & Core Logic

**Preview example:**
```javascript
let item1 = 25.00;  // T-Shirt
let qty1 = 2;
let subtotal = item1 * qty1;
// Expected output: subtotal = 50
```

**Your task:** Set up all items and calculate the subtotal.

```javascript
// Item prices
let tshirtPrice = 25.00;
let jeansPrice = 60.00;
let sneakersPrice = 90.00;

// Quantities
let tshirtQty = 2;
let jeansQty = 1;
let sneakersQty = 1;

// Calculate cost per item type
let tshirtTotal = tshirtPrice * tshirtQty;    // 50
let jeansTotal = jeansPrice * jeansQty;        // 60
let sneakersTotal = sneakersPrice * sneakersQty; // 90

// Subtotal
let subtotal = tshirtTotal + jeansTotal + sneakersTotal;
// Expected output: subtotal = 200
```

**Expected output for Stage 1:** `subtotal = 200`

---

### Stage 2 — Adding Features (Discount + Tax)

**Preview example:**
```javascript
let price = 100;
let discountPercent = 10;
let afterDiscount = price - (price * discountPercent / 100);
// Expected output: 90
```

**Your task:** Apply a 15% discount, then add 8% tax.

```javascript
// Apply 15% discount
let discountPercent = 15;
let discountAmount = subtotal * discountPercent / 100;
subtotal -= discountAmount;
// subtotal was 200, discount = 30, now subtotal = 170

// Apply 8% sales tax
let taxRate = 8;
let taxAmount = subtotal * taxRate / 100;
let totalWithTax = subtotal + taxAmount;
// taxAmount = 13.6, totalWithTax = 183.6

// Expected output: totalWithTax = 183.6
```

---

### Stage 3 — Displaying Results and Decisions

**Preview example:**
```javascript
let cartTotal = 183.6;
let freeShippingThreshold = 150;
let qualifiesForFreeShipping = cartTotal >= freeShippingThreshold;
// Expected output: true
```

**Your task:** Check shipping eligibility and show a summary.

```javascript
// Shipping check
let freeShippingMin = 150;
let qualifiesFreeShipping = totalWithTax >= freeShippingMin;
// Expected output: qualifiesFreeShipping = true

// Shipping cost (free if qualifies, else $9.99)
let shippingCost = qualifiesFreeShipping ? 0 : 9.99;
// Expected output: shippingCost = 0

// Final total
let finalTotal = totalWithTax + shippingCost;
// Expected output: finalTotal = 183.6

// Check if user paid enough (they paid $200)
let amountPaid = 200;
let changeOwed = amountPaid - finalTotal;
// Expected output: changeOwed = 16.4

// Summary
console.log("Subtotal after discount: $" + subtotal);     // $170
console.log("Tax: $" + taxAmount);                          // $13.6
console.log("Total with tax: $" + totalWithTax);           // $183.6
console.log("Free shipping: " + qualifiesFreeShipping);    // true
console.log("Final total: $" + finalTotal);                // $183.6
console.log("Change: $" + changeOwed);                     // $16.4
```

---

### Reflection Questions

1. **Where was `%=` useful?** Could you use it to check if the customer's loyalty points (say, 1,730) are divisible by 100 to see if they earned a free reward?
2. **Why use `===` instead of `==` in the shipping check?** Think about what would happen if `freeShippingMin` were stored as a string `"150"`.
3. **How would this work in a real company?** In a real e-commerce site like Amazon, this entire logic runs server-side in JavaScript (Node.js) every time a cart is updated. Tax rates change by region, discounts change by season — these operators are the engine under the hood.
4. **Optional advanced challenge:** What if the store runs a "buy 3 get 1 free" offer on T-shirts? How would you use the `%` operator to figure out how many free T-shirts the customer gets?

---
---

# ✅ COMPLETION CHECKLIST

| Item | Status |
|------|--------|
| All 8 arithmetic operators explained with examples | ✓ |
| String concatenation with `+` explained | ✓ |
| Number + string `+` trap explained | ✓ |
| Operator precedence explained | ✓ |
| All 7 standard assignment operators covered | ✓ |
| Logical assignment operators (`&&=`, `||=`, `??=`) covered | ✓ |
| Spread operator (`...`) introduced | ✓ |
| All 8 comparison operators covered | ✓ |
| `==` vs `===` distinction fully explained | ✓ |
| String comparisons explained | ✓ |
| Type comparison traps explained | ✓ |
| Common beginner mistakes highlighted | ✓ |
| Real-world context provided throughout | ✓ |
| At least one example per concept with expected output | ✓ |
| Three applied exercises completed | ✓ |
| One full project built across 3 stages | ✓ |
| Reflection questions answered | ✓ |

---

**One-Sentence Summary:** JavaScript operators are the action symbols that let you compute, store, and compare values — mastering arithmetic, assignment, and comparison operators gives you the core engine behind nearly every real-world program you will ever build.