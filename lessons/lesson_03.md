---
title: "JavaScript Variables, `let`, `const` & Data Types"
nav_order: 3
---

## 📌 What This Lesson Covers
By the end of this lesson you will understand:
- What a **variable** is and why programs need them
- The **four ways** to declare variables in JavaScript and which ones to use
- The rules for **naming** variables (identifiers)
- The difference between `let` and `const` — and when to use each
- What **block scope** means and why it matters
- What **`var`** is and why it is no longer recommended
- JavaScript's **8 data types** and how to work with each one
- How **`typeof`** lets you check what kind of data a variable holds
- The **tricky behaviour** of mixing strings and numbers (type coercion)

This lesson follows three phases: **Understand → Practice → Build.**

---
---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

---

## TOPIC 1: JavaScript Variables — Containers for Data

---

### 1.1 What Is a Variable?

Imagine you are filling in a job application form. The form has labelled boxes: **Name**, **Age**, **City**. Each box holds one piece of information — and the label (the box name) tells you what kind of information lives there.

A **variable** in JavaScript works exactly the same way. It is a labelled container that holds a piece of data your program needs to use.

```javascript
let name = "Amara";    // A labelled box called "name" holds the text "Amara"
let age = 25;          // A labelled box called "age" holds the number 25
let city = "Lagos";    // A labelled box called "city" holds the text "Lagos"
```

Once you put data into a variable, you can:
- **Read** it (display it on the page)
- **Use** it in calculations
- **Change** it (update the value later)
- **Pass** it to other parts of your program

Without variables, you would have to type the same value everywhere — and if it changed, you would have to find and update every single occurrence. Variables give you **one central place** to store a value and **one place to update** it.

---

### 1.2 The Four Ways to Declare Variables in JavaScript

JavaScript gives you four ways to create a variable. Two are modern and recommended; two are older and should be avoided.

| Method | Recommended? | When Added | Notes |
|---|---|---|---|
| `let` | ✅ Yes — modern standard | 2015 (ES6) | For values that can change |
| `const` | ✅ Yes — modern standard | 2015 (ES6) | For values that should not change |
| `var` | ❌ Not recommended | Original JS | Older, has confusing behaviour |
| Automatic (no keyword) | ❌ Never | Always existed | Creates global variable — dangerous |

**Micro-Demo — All four styles:**

```javascript
let score = 100;          // Modern — changeable
const PI = 3.14159;       // Modern — fixed
var oldStyle = "avoid";   // Old style — not recommended
autoVar = "dangerous";    // No keyword — never do this
```

> 💡 For the rest of this course, you will use `let` and `const` exclusively. You will encounter `var` in old code online, so you need to understand it — but never use it in your own code.

---

### 1.3 Declaring and Assigning Variables

**Declaring** a variable means creating it — giving it a name and reserving a space in memory for it.

**Assigning** a value means putting something into that space.

You can do both at once:
```javascript
let carName = "Toyota";   // Declare AND assign in one step
```

Or separately:
```javascript
let carName;              // Declare — the box exists but is empty
carName = "Toyota";       // Assign — put "Toyota" into the box
```

After declaring with no value, the variable holds the special value `undefined` — meaning "this box exists but nothing is in it yet."

```javascript
let carName;
console.log(carName);    // Output: undefined
carName = "Toyota";
console.log(carName);    // Output: Toyota
```

---

### 1.4 Variable Naming Rules (Identifiers — Recap + Deeper Look)

Variables must be **identified** with unique names. We covered the basic rules earlier; now let's go deeper.

**Core rules:**
- Names can contain letters, digits, underscores (`_`), and dollar signs (`$`)
- Names must **begin** with a letter, `$`, or `_` — **never a number**
- Names are case-sensitive (`Score` ≠ `score`)
- Reserved keywords cannot be used (`let`, `const`, `if`, etc.)

**Special: Underscore (`_`) in variable names:**

The underscore is treated as a letter. A common convention among professional developers is to start a name with `_` to indicate a "private" or "internal" variable — one that is meant to be used only within a specific section of code and not from the outside.

```javascript
let _lastName = "Johnson";  // conventionally "private"
let _x = 2;
let _100 = 5;               // valid — underscore first, then digits
```

**Special: Dollar Sign (`$`) in variable names:**

The `$` sign is also treated as a letter. Professional developers often use it as an alias for the main function in JavaScript libraries (for example, jQuery uses `$` as its main function name):

```javascript
let $ = "Hello World";
let $$$ = 2;
let $myMoney = 5;
```

> 💡 While `_` and `$` are valid, stick to **readable camelCase names** for your own variables. Use `_` and `$` only when following a specific convention in the project you're working on.

---

### 1.5 Declaring Multiple Variables at Once

You can create several variables in a single statement by separating them with commas:

```javascript
let person = "John Doe", carName = "Volvo", price = 200;
```

Or spread across multiple lines for better readability:

```javascript
let person = "John Doe",
    carName = "Volvo",
    price = 200;
```

Both are valid. The multi-line style is easier to read and easier to add comments to.

---

### 1.6 The Assignment Operator — An Important Distinction

In maths, `=` means "is equal to." In JavaScript, `=` means **"assign this value to this container."** They are completely different.

This maths statement makes no sense:
```
x = x + 5   ← In maths, nothing can equal itself plus 5
```

But in JavaScript it makes perfect sense:
```javascript
let x = 10;
x = x + 5;   // Read: take the current value of x (10), add 5, store the result (15) back into x
console.log(x);  // Output: 15
```

The right side is calculated first, then the result is placed into `x`. The value of `x` has been updated from 10 to 15.

> 💡 The actual "is equal to" check in JavaScript is written as `==` (loose equality) or `===` (strict equality). You will learn these operators in a later lesson.

---

### 1.7 JavaScript Arithmetic with Variables

You can perform arithmetic on number variables exactly like maths:

```javascript
let x = 5 + 2 + 3;    // x = 10
```

You can also join text strings using `+`:

```javascript
let x = "John" + " " + "Doe";    // x = "John Doe"
```

> ⚠️ **Critical warning — Mixing strings and numbers:**
>
> If you put a **number inside quotes**, JavaScript treats it as text. When a text string is mixed with numbers using `+`, JavaScript **concatenates** (joins) instead of adding:

```javascript
let x = "5" + 2 + 3;    // Result: "523" — NOT 10!
```

Why? Because JavaScript reads left to right. It sees `"5"` (a string) and `2` (a number). Since one is text, it joins them: `"52"`. Then it joins `3`: `"523"`. The entire result becomes text.

```javascript
let x = 2 + 3 + "5";    // Result: "55"
```

Here, JavaScript reads left to right: `2 + 3 = 5` (number + number = number). Then `5 + "5"` (number + string = string): `"55"`.

> 🤔 **Thinking question:** What do you think `"10" - 5` produces? Is it `"105"` or `5`? (Hint: `-` is only a maths operator — it can't join strings. Try it in your console.)

---

### 1.8 Automatic Variables — Never Do This

JavaScript allows you to create a variable without any keyword:

```javascript
x = 5;   // No let, no const, no var
```

This works, but it creates a **global variable** — one that is accessible from anywhere in your entire program, which can cause unpredictable bugs in larger applications. It is considered terrible practice and should never be done.

**Always declare your variables explicitly.** Good practice is to declare all variables at the top of their section of code.

---
---

## TOPIC 2: `let` — The Modern Variable Keyword

---

### 2.1 What `let` Does and Why It Exists

`let` was introduced in 2015 as part of the major JavaScript update known as ES6. It was designed to fix several confusing problems that existed with the older `var` keyword. `let` is now the standard way to declare a variable whose value can change.

```javascript
let score = 0;
score = 50;      // Perfectly fine — let allows updates
score = 100;     // Still fine — updated again
```

---

### 2.2 `let` Cannot Be Redeclared in the Same Scope

This is one of the most important differences from `var`. Once you have declared a variable with `let`, you cannot declare it again with `let` in the same area of code:

```javascript
let userName = "Alice";
let userName = "Bob";   // ❌ Error! Cannot redeclare 'userName'
```

This is actually a feature, not a bug. It prevents you from accidentally creating a second variable with the same name — a common and hard-to-find mistake in large programs.

With `var`, this error would not show up:
```javascript
var userName = "Alice";
var userName = "Bob";   // No error — but "Alice" is now silently lost!
```

`let` protects you from this.

You **can** reassign (change the value) — you just cannot redeclare:
```javascript
let userName = "Alice";
userName = "Bob";    // ✅ Fine — just changing the value, not redeclaring
```

---

### 2.3 Block Scope — The Most Important Difference Between `let` and `var`

**This is one of the most important concepts in modern JavaScript.**

Before understanding this, you need to know what a **block** is. A block is any code wrapped inside curly braces `{ }`. Examples: the body of an `if` statement, the body of a `for` loop, the body of a function.

**`let` has BLOCK SCOPE** — a variable declared with `let` inside a block exists **only inside that block.** The moment the block ends, the variable disappears.

```javascript
{
  let blockVar = "I exist only inside these braces";
  console.log(blockVar);   // Output: I exist only inside these braces
}
console.log(blockVar);     // ❌ Error! blockVar is not defined here
```

**`var` has FUNCTION SCOPE (or global scope)** — a variable declared with `var` inside a block is still accessible **outside** that block, as long as you are in the same function:

```javascript
{
  var functionVar = "I leak outside the braces";
}
console.log(functionVar);  // Output: I leak outside the braces (no error!)
```

**Why does block scope matter? A real-world example with loops:**

```javascript
// Using let in a for loop:
for (let i = 0; i < 3; i++) {
  console.log(i);    // i is available here: 0, 1, 2
}
console.log(i);      // ❌ Error! i doesn't exist outside the loop

// Using var in a for loop:
for (var i = 0; i < 3; i++) {
  console.log(i);    // 0, 1, 2
}
console.log(i);      // Output: 3 — the loop variable leaked out!
```

With `let`, your loop variable stays safely contained within the loop. With `var`, it leaks into the surrounding scope and can accidentally interfere with other parts of your code.

---

### 2.4 `let` Variables Must Be Declared Before Use (No Hoisting Surprise)

With `var`, there is a strange behaviour called **hoisting** — the browser automatically moves `var` declarations to the top of their scope, which means you can technically use a `var` variable before the line where you declared it (it will just be `undefined`).

`let` does not behave this way. If you try to use a `let` variable before declaring it, you get a clear error:

```javascript
console.log(myVar);   // Output: undefined (confusing but no error with var)
var myVar = 5;

console.log(myLet);   // ❌ ReferenceError: Cannot access 'myLet' before initialization
let myLet = 5;
```

The `let` behaviour is better because it forces you to write code that reads clearly from top to bottom — the way code should be read and understood.

> 💡 Always declare your variables before you use them. This is good practice regardless of whether you use `let` or `const`.

---

### 2.5 When to Use `let`

Use `let` when the value of the variable **needs to change** after its first assignment. Common examples:
- A score that increases as the player earns points
- A counter that increments inside a loop
- A running total that accumulates as items are added
- A status that changes based on user input

```javascript
let score = 0;       // starts at zero
score = score + 10;  // player earned 10 points
score = score + 5;   // earned 5 more

let count = 0;
count++;             // shorthand for count = count + 1
```

---
---

## TOPIC 3: `const` — For Values That Should Not Change

---

### 3.1 What `const` Means

`const` stands for **constant** — a value that is set once and stays the same forever.

When you declare with `const`, two things happen:
1. The variable is created and assigned a value
2. JavaScript **locks** that assignment — it can never be changed or redeclared

```javascript
const PI = 3.14159;
const COUNTRY = "Nigeria";
const TAX_RATE = 0.075;
```

These values will never change — PI is always PI, and the tax rate doesn't change mid-calculation.

---

### 3.2 `const` Must Be Assigned When Declared

Unlike `let`, you cannot declare a `const` variable and assign it later. It must receive a value at the moment of creation:

```javascript
const PI;           // ❌ Error! Missing initializer in const declaration
PI = 3.14159;       // This line is never reached

const PI = 3.14159; // ✅ Correct — declared and assigned together
```

This makes sense — if the value can never change, it must be set immediately.

---

### 3.3 `const` Cannot Be Reassigned

Any attempt to change a `const` value after it is set causes an error:

```javascript
const siteName = "LearnJS";
siteName = "TechAcademy";   // ❌ TypeError: Assignment to constant variable
```

**Expected result:** An error is thrown. The assignment fails.

---

### 3.4 `const` Cannot Be Redeclared

Just like `let`, you cannot declare a `const` variable twice in the same scope:

```javascript
const country = "Nigeria";
const country = "Ghana";   // ❌ Error: 'country' has already been declared
```

---

### 3.5 `const` Has Block Scope

`const` behaves exactly like `let` in terms of scope — it is contained within the block where it is declared:

```javascript
{
  const greeting = "Hello";
  console.log(greeting);   // Output: Hello
}
console.log(greeting);     // ❌ Error! greeting is not defined outside the block
```

---

### 3.6 The Most Important Nuance — `const` with Arrays and Objects

This is one of the most commonly misunderstood concepts for beginners, and it is critical to get right.

`const` does **NOT** make the value itself unchangeable. What it makes unchangeable is the **reference** — the connection between the variable name and what it points to. For simple values like numbers and strings, this means the value cannot change. But for arrays and objects, the *contents* can still be modified.

**With a `const` array — you CAN modify the contents:**

```javascript
const fruits = ["Apple", "Banana", "Mango"];

fruits.push("Orange");     // ✅ Adding an item — works fine!
fruits[0] = "Pineapple";  // ✅ Changing an item — works fine!

console.log(fruits);
// Output: ["Pineapple", "Banana", "Mango", "Orange"]
```

**What you CANNOT do is replace the entire array:**

```javascript
const fruits = ["Apple", "Banana", "Mango"];
fruits = ["Kiwi", "Grape"];    // ❌ Error! Cannot reassign a const
```

Think of `const` as nailing the label to a bucket. The label cannot be moved to a different bucket. But you can still add or remove things from inside the bucket.

**With a `const` object — same rules apply:**

```javascript
const car = { make: "Toyota", model: "Corolla" };

car.model = "Camry";       // ✅ Changing a property — works fine!
car.year = 2024;           // ✅ Adding a new property — works fine!

car = { make: "Honda" };   // ❌ Error! Cannot reassign the entire object
```

---

### 3.7 When to Use `const` vs `let` — The Decision Rule

Here is the simple professional rule:

1. **Default to `const`** — always start with `const`
2. **Change to `let`** only if you later need to reassign the variable's value
3. **Never use `var`** if you can use `let` or `const`
4. **Never use automatic variables** — always use a keyword

```javascript
// Good pattern:
const userName = "Alice";          // Will never change — use const
const taxRate = 0.075;             // Will never change — use const
let currentScore = 0;              // Will change as game progresses — use let
let itemCount = 0;                 // Will change as items are added — use let
```

---

### 3.8 Why `var` Is No Longer Recommended

Now that you understand `let` and `const`, here is why `var` causes problems:

| Problem | `var` behaviour | `let` / `const` behaviour |
|---|---|---|
| **Redeclaration** | Allows redeclaring same name silently | Throws an error — protects you |
| **Scope** | Function scope — leaks out of blocks | Block scope — stays contained |
| **Hoisting** | Hoisted and initialised to `undefined` | Hoisted but NOT initialised — throws clear error |
| **Loops** | Loop variable leaks outside the loop | Loop variable stays inside the loop |

The `var` keyword still exists in JavaScript for backward compatibility, but in new code, it should never be used. You will see it in old tutorials and legacy code — recognise it, but don't copy it.

---
---

## TOPIC 4: JavaScript Data Types

---

### 4.1 Why Data Types Exist

In the real world, different kinds of information behave differently:
- You can add numbers together: `5 + 3 = 8`
- You can join text together: `"Hello" + " World" = "Hello World"`
- You cannot meaningfully add text to a number: `"Five" + 3 = ???`

JavaScript needs to know what *kind* of data it is working with so it knows what operations make sense. That is what **data types** are for.

JavaScript has **8 data types** in total. For now, you will learn the 7 most important ones in depth. The eighth (`Symbol`) is advanced and used in specialised scenarios.

---

### 4.2 JavaScript Is Dynamically Typed

In some languages (like Java or C), you must declare what type of data a variable will hold, and it cannot change:

```java
int score = 100;      // Java — this variable can ONLY ever hold integers
```

JavaScript works differently. The same variable can hold any type of data, and the type can even change:

```javascript
let x = 10;         // x holds a number
x = "Hello";        // x now holds a string — JavaScript allows this
x = true;           // x now holds a boolean — still allowed
```

This is called **dynamic typing**. It makes JavaScript flexible, but it also means you need to be careful about what type of data you expect a variable to hold.

---

### 4.3 Data Type 1 — String

A **string** is any piece of text. It is written inside single quotes, double quotes, or backticks (template literals, which you will learn later).

```javascript
let name = "Alice";               // double quotes
let city = 'Lagos';               // single quotes
let message = `Hello, World!`;    // backticks (template literal)
```

All three produce a string. The choice of quote style is yours — just be consistent and match the opening and closing type.

**Important:** If you put a number inside quotes, it becomes a string — not a number:
```javascript
let price = "100";   // This is the STRING "100", not the NUMBER 100
```

You cannot do maths with it — it will concatenate instead.

---

### 4.4 Data Type 2 — Number

JavaScript has only **one number type** for all numeric values — whether whole numbers or decimals. Unlike most programming languages that distinguish between integers and floating-point numbers, JavaScript uses a single flexible number type:

```javascript
let age = 28;           // whole number (integer)
let price = 19.99;      // decimal number (float)
let temperature = -5;   // negative number
let big = 1e6;          // scientific notation: 1,000,000
```

**Special number values:**
```javascript
let infinity = Infinity;       // represents mathematical infinity
let negInfinity = -Infinity;
let notANumber = NaN;          // "Not a Number" — result of invalid maths
```

`NaN` appears when you try to do maths with something that isn't a valid number:
```javascript
let result = 100 / "apple";    // Can't divide by text
console.log(result);           // Output: NaN
```

---

### 4.5 Data Type 3 — BigInt

A standard JavaScript number can safely represent integers up to about 9 quadrillion (9,007,199,254,740,991). Beyond that, precision is lost.

**BigInt** was introduced to handle numbers larger than this limit. You create a BigInt by adding the letter `n` to the end of a number:

```javascript
let hugeNumber = 9007199254740991n;    // BigInt
let result = hugeNumber + 1n;          // Must use n on both sides
console.log(result);                   // Output: 9007199254740992n
```

**Real-world use:** BigInt is used in cryptography, financial systems handling very large transaction IDs, and scientific computing. For everyday JavaScript programming, regular numbers are sufficient.

---

### 4.6 Data Type 4 — Boolean

A **boolean** is the simplest data type — it can only ever be one of two values: `true` or `false`.

Think of it like a light switch: it is either ON or OFF. There is no in-between.

```javascript
let isLoggedIn = true;
let hasPermission = false;
let isOver18 = true;
```

Booleans are used constantly in programming to make decisions:
- Is the user logged in? (`true` / `false`)
- Has the form been filled correctly? (`true` / `false`)
- Is the item in stock? (`true` / `false`)

```javascript
let temperature = 35;
let isHot = temperature > 30;    // Evaluates to: true
console.log(isHot);              // Output: true
```

> ⚠️ **Beginner Mistake:** `true` and `false` are written in lowercase with no quotes. `"true"` (with quotes) is a string — a completely different thing!

---

### 4.7 Data Type 5 — Undefined

`undefined` is the value a variable holds when it has been **declared but not yet assigned** a value. JavaScript automatically gives this value to empty variables.

```javascript
let score;
console.log(score);      // Output: undefined
console.log(typeof score); // Output: "undefined"
```

After assigning:
```javascript
score = 100;
console.log(score);      // Output: 100
```

**Real-world analogy:** Think of a form field that exists on the page (the variable is declared) but the user hasn't filled it in yet (no value assigned). It is a valid field — it just doesn't have a value yet.

---

### 4.8 Data Type 6 — Null

**`null`** means "intentionally empty" — the variable exists, but you have deliberately set it to have no value. It is not `undefined` (which means "not yet assigned"); it means "I am choosing to leave this empty."

```javascript
let selectedUser = null;      // No user selected yet — by choice
```

Later, when a user is selected:
```javascript
selectedUser = { name: "Alice", id: 42 };
```

**The difference between `null` and `undefined`:**
- `undefined`: the variable exists but was never given a value
- `null`: the developer explicitly chose to make the variable empty

```javascript
let a;           // undefined — not yet assigned
let b = null;    // null — deliberately set to empty
```

> 💡 `typeof null` returns `"object"` — this is a well-known quirk in JavaScript that has existed since the language was first created. It is considered a bug in the language, but it cannot be fixed now without breaking millions of existing websites.

---

### 4.9 Data Type 7 — Object

An **object** is a complex data type that groups related information together. Where a simple variable holds one value, an object can hold many values — each one given a name (called a **property**).

Think of an object like a profile card: it describes one thing from multiple angles.

```javascript
const student = {
  name: "James",
  age: 20,
  course: "Computer Science",
  isEnrolled: true
};

console.log(student.name);    // Output: James
console.log(student.age);     // Output: 20
```

The object data type in JavaScript also includes **arrays** and **dates**:

```javascript
// Array — a list of values
const colours = ["red", "green", "blue"];

// Date — a date/time object
const today = new Date();
```

You will study objects, arrays, and dates in dedicated lessons later. For now, understand that the object type is JavaScript's way of storing structured, multi-property data.

---

### 4.10 The `typeof` Operator — Checking a Variable's Data Type

`typeof` is a built-in operator that tells you what data type a value or variable currently holds. It returns a string describing the type.

```javascript
typeof "Alice"       // Returns: "string"
typeof 42            // Returns: "number"
typeof 3.14          // Returns: "number"
typeof true          // Returns: "boolean"
typeof undefined     // Returns: "undefined"
typeof null          // Returns: "object"  ← famous quirk!
typeof { name: "Alice" }  // Returns: "object"
typeof [1, 2, 3]    // Returns: "object"  ← arrays are objects in JS
typeof function(){}  // Returns: "function"
```

**Practical use — checking a variable's type before using it:**

```javascript
let userInput = "25";    // came from a form — might be a string

console.log(typeof userInput);    // Output: "string"

// If we need a number for calculations, we need to convert it
```

---

### 4.11 Summary Table — All 8 Data Types

| Data Type | What It Holds | Example |
|---|---|---|
| **String** | Text | `"Hello"`, `'World'` |
| **Number** | Any numeric value | `42`, `3.14`, `-7` |
| **BigInt** | Very large integers | `9007199254740991n` |
| **Boolean** | True or false only | `true`, `false` |
| **Undefined** | Declared but not assigned | `let x;` |
| **Null** | Intentionally empty | `let y = null;` |
| **Symbol** | Unique identifier (advanced) | `Symbol("id")` |
| **Object** | Structured data / collections | `{name: "Alice"}`, `[1,2,3]` |

---
---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Variables in the Real World

**Objective:** Declare variables correctly using `let` and `const`, and understand the difference through a practical scenario.

**Scenario:** You are building a simple product page for an online shop. Some information about the product never changes (name, price, category). Other information changes during the shopping session (quantity selected, total cost).

---

**Warm-Up Mini-Example:**
```javascript
const itemName = "Notebook";    // Fixed — const
let quantityInCart = 0;         // Changes — let
quantityInCart = quantityInCart + 2;
console.log(quantityInCart);    // Output: 2
```

---

**Your Exercise:**

**Step 1 — Create `shop.html`:**
```html
<!DOCTYPE html>
<html>
  <body>
    <h2>Product Page</h2>
    <p id="productInfo"></p>
    <p id="cartInfo"></p>
    <p id="totalInfo"></p>
    <script src="shop.js"></script>
  </body>
</html>
```

**Step 2 — Create `shop.js`:**

```javascript
// Product details — fixed values, use const
const productName = "Wireless Headphones";
const productPrice = 12500;       // price in Naira
const productCategory = "Electronics";
const productBrand = "SoundWave";

// Shopping session — values that change, use let
let quantitySelected = 0;
let totalCost = 0;

// Simulate a customer adding 3 items to cart
quantitySelected = 3;
totalCost = productPrice * quantitySelected;

// Display product information
document.getElementById("productInfo").innerHTML =
  productBrand + " " + productName + " | Category: " + productCategory + " | Price: ₦" + productPrice;

// Display cart information
document.getElementById("cartInfo").innerHTML =
  "Quantity in cart: " + quantitySelected;

// Display total
document.getElementById("totalInfo").innerHTML =
  "Total: ₦" + totalCost;

// Developer check
console.log("Product:", productName);
console.log("Quantity:", quantitySelected);
console.log("Total cost:", totalCost);
```

**Expected page output:**
```
SoundWave Wireless Headphones | Category: Electronics | Price: ₦12500
Quantity in cart: 3
Total: ₦37500
```

**Expected console output:**
```
Product: Wireless Headphones
Quantity: 3
Total cost: 37500
```

**Step 3 — Test `const` protection:** Try adding this line to your code:
```javascript
productPrice = 10000;   // Try to change the price
```

Observe: An error appears in the console because `const` prevents reassignment.

**Self-Check Questions:**
1. Why did you use `const` for `productName` and `productPrice`?
2. Why did you use `let` for `quantitySelected` and `totalCost`?
3. What value did `quantitySelected` hold immediately after `let quantitySelected = 0;` before you set it to 3?
4. What would happen if you tried to declare `const productName = "Earbuds";` again in the same script?

**Optional What-If Challenge:** Add a discount of 500 Naira per item if the customer buys 3 or more. Update the total calculation.

---

## Exercise 2 — Block Scope in Action

**Objective:** See the difference between `let` (block-scoped) and `var` (function-scoped) through hands-on experimentation.

**Scenario:** You are writing a temperature converter that needs a temporary variable inside a calculation block.

---

**Warm-Up Mini-Example:**
```javascript
{
  let insideBlock = "I only exist in here";
  console.log(insideBlock);    // Works: "I only exist in here"
}
// console.log(insideBlock);   // Would crash — try uncommenting to see the error
```

---

**Your Exercise:**

**Step 1** — Create this file and run it, reading each `console.log` carefully:

```javascript
// Scenario: temperature conversion inside a block

let outsideTemp = 100;   // Celsius, declared outside

{
  // Conversion block — Celsius to Fahrenheit
  let fahrenheit = (outsideTemp * 9 / 5) + 32;   // block-scoped variable
  console.log("Inside block — fahrenheit:", fahrenheit);    // Works
  console.log("Inside block — outsideTemp:", outsideTemp);  // Works (can reach outside)
}

console.log("Outside block — outsideTemp:", outsideTemp);   // Works
// console.log("Outside block — fahrenheit:", fahrenheit);  // Would crash!
```

**Expected console output:**
```
Inside block — fahrenheit: 212
Inside block — outsideTemp: 100
Outside block — outsideTemp: 100
```

**Step 2** — Now repeat the experiment replacing `let fahrenheit` with `var fahrenheit`. Uncomment the last `console.log`. Observe the difference.

**Self-Check Questions:**
1. Why could the block access `outsideTemp`? (Hint: scope looks outward, not inward)
2. Why did `fahrenheit` cause an error outside the block when declared with `let`?
3. What was different when you used `var`? Is that better or worse? Why?
4. Can you think of a real situation where a variable should only exist temporarily inside a calculation block?

---

## Exercise 3 — Data Types Explorer

**Objective:** Work with all the main data types and use `typeof` to verify what type each variable holds.

**Scenario:** You are building the backend of a user registration system. Each piece of information has a specific type, and the system must verify what type it is dealing with before processing it.

---

**Warm-Up Mini-Example:**
```javascript
let userName = "Alice";
console.log(typeof userName);    // Output: "string"

let userAge = 30;
console.log(typeof userAge);     // Output: "number"
```

---

**Your Exercise:**

```javascript
// User registration data — different types
const firstName = "Chukwudi";          // String
const lastName = "Okonkwo";            // String
const age = 22;                        // Number
const gpa = 3.75;                      // Number (decimal)
const isEnrolled = true;               // Boolean
let graduationYear;                    // Undefined — not assigned yet
const profilePicture = null;           // Null — no picture uploaded yet

// Display each value and its type in the console
console.log("First Name:", firstName, "| Type:", typeof firstName);
console.log("Last Name:", lastName, "| Type:", typeof lastName);
console.log("Age:", age, "| Type:", typeof age);
console.log("GPA:", gpa, "| Type:", typeof gpa);
console.log("Is Enrolled:", isEnrolled, "| Type:", typeof isEnrolled);
console.log("Graduation Year:", graduationYear, "| Type:", typeof graduationYear);
console.log("Profile Picture:", profilePicture, "| Type:", typeof profilePicture);
```

**Expected console output:**
```
First Name: Chukwudi | Type: string
Last Name: Okonkwo | Type: string
Age: 22 | Type: number
GPA: 3.75 | Type: number
Is Enrolled: true | Type: boolean
Graduation Year: undefined | Type: undefined
Profile Picture: null | Type: object
```

> 🤔 **Thinking question:** The last line shows `typeof null` returns `"object"`. Does that mean `null` is actually an object? No — this is a historical bug in JavaScript. `null` means "intentionally empty," not "an object." This is why you should use `null === null` to check for null, not `typeof x === "object"`.

**Step 2** — Add this to test the string + number mixing behaviour:

```javascript
// Type coercion experiments
let result1 = "5" + 2 + 3;
let result2 = 2 + 3 + "5";
let result3 = "10" - 5;      // Subtraction can't concatenate!

console.log("'5' + 2 + 3 =", result1, "| Type:", typeof result1);
console.log("2 + 3 + '5' =", result2, "| Type:", typeof result2);
console.log("'10' - 5 =", result3, "| Type:", typeof result3);
```

**Expected output:**
```
'5' + 2 + 3 = 523 | Type: string
2 + 3 + '5' = 55 | Type: string
'10' - 5 = 5 | Type: number
```

**Self-Check Questions:**
1. Why does `typeof null` return `"object"` even though `null` is not an object?
2. What is the difference between `undefined` and `null` in practical terms?
3. Why did `"10" - 5` produce the number `5`, while `"5" + 2` produced the string `"52"`?
4. If a form sends you a user's age as `"25"` (a string from a text field), how would that cause problems in an age verification calculation?

---
---

# PHASE 3 — PROJECT SIMULATION

---

## Mini-Project: Smart Student Tracker

**Project Overview:** You will build a student information tracker that correctly uses `const` and `let`, works with multiple data types, and displays meaningful information on a webpage. This is the kind of data management task common in school administration systems, HR dashboards, and CRM tools.

---

### Stage 1 — Declaring and Displaying Student Data

**Goal:** Set up all variables with the correct keywords and display the student profile.

**Illustrative Preview:**
```javascript
const studentId = "STU-001";
let totalMarks = 0;
console.log(typeof studentId);    // "string"
console.log(typeof totalMarks);   // "number"
```

---

**Build `tracker.html`:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Student Tracker</title>
  </head>
  <body>
    <h1>🎓 Student Tracker</h1>
    <hr>
    <p id="profile"></p>
    <p id="status"></p>
    <p id="academics"></p>
    <p id="types"></p>
    <p id="summary"></p>
    <script src="tracker.js"></script>
  </body>
</html>
```

**Build `tracker.js` — Stage 1:**
```javascript
/*
  File: tracker.js
  Project: Smart Student Tracker — Stage 1
  Purpose: Declare and display student data with correct variable types
*/

// Fixed student identity — use const
const studentId = "STU-2025-007";
const fullName = "Ngozi Adeleke";
const programme = "Business Administration";
const enrollmentYear = 2023;

// Dynamic student data — use let
let currentLevel = 200;           // can change each year
let isCurrentlyEnrolled = true;   // can change if student defers
let outstandingFees = null;       // null = no fees outstanding yet

// Academic scores — use let (will be updated)
let mathScore = 0;
let englishScore = 0;
let economicsScore = 0;

// Display profile
document.getElementById("profile").innerHTML =
  "ID: " + studentId +
  " | Name: " + fullName +
  " | Programme: " + programme +
  " | Enrolled: " + enrollmentYear;

// Display status
document.getElementById("status").innerHTML =
  "Current Level: " + currentLevel +
  "L | Enrolled: " + isCurrentlyEnrolled +
  " | Outstanding Fees: " + outstandingFees;

// Show data types
document.getElementById("types").innerHTML =
  "Types → studentId: " + typeof studentId +
  " | currentLevel: " + typeof currentLevel +
  " | isCurrentlyEnrolled: " + typeof isCurrentlyEnrolled +
  " | outstandingFees: " + typeof outstandingFees;

console.log("Tracker loaded for:", fullName);
```

**Expected page output:**
```
ID: STU-2025-007 | Name: Ngozi Adeleke | Programme: Business Administration | Enrolled: 2023
Current Level: 200L | Enrolled: true | Outstanding Fees: null
Types → studentId: string | currentLevel: number | isCurrentlyEnrolled: boolean | outstandingFees: object
```

---

### Stage 2 — Updating Values and Performing Calculations

**Goal:** Update `let` variables as the student's situation changes, and perform academic calculations.

**Illustrative Preview:**
```javascript
let score = 0;
score = 78;                           // update
let grade = score >= 70 ? "A" : "B"; // expression
console.log(grade);                   // Output: A
```

---

**Add to `tracker.js`:**
```javascript
// Assign actual scores for this semester
mathScore = 78;
englishScore = 85;
economicsScore = 69;

// Calculations
let totalScore = mathScore + englishScore + economicsScore;
let averageScore = totalScore / 3;
let maxPossible = 300;
let percentage = (totalScore / maxPossible) * 100;

// Determine class of degree based on average
let classification;
if (averageScore >= 70) {
  classification = "First Class";
} else if (averageScore >= 60) {
  classification = "Second Class Upper";
} else if (averageScore >= 50) {
  classification = "Second Class Lower";
} else {
  classification = "Third Class";
}

// Simulate level change — student moved to 300 level
currentLevel = 300;

// Simulate fees update
outstandingFees = 45000;   // fees outstanding — null changed to a number

// Display academic results
document.getElementById("academics").innerHTML =
  "Math: " + mathScore + " | English: " + englishScore + " | Economics: " + economicsScore +
  " | Total: " + totalScore + "/300 | Average: " + averageScore.toFixed(1) + "%" +
  " | Classification: " + classification;

// Update status display
document.getElementById("status").innerHTML =
  "Current Level: " + currentLevel +
  "L | Enrolled: " + isCurrentlyEnrolled +
  " | Outstanding Fees: ₦" + outstandingFees;

console.log("Updated level:", currentLevel);
console.log("Classification:", classification);
console.log("typeof outstandingFees after update:", typeof outstandingFees);
```

**Expected updated page output (academics line):**
```
Math: 78 | English: 85 | Economics: 69 | Total: 232/300 | Average: 77.3% | Classification: First Class
```

**Expected console output:**
```
Updated level: 300
Classification: First Class
typeof outstandingFees after update: number
```

---

### Stage 3 — Final Summary and Type Safety Check

**Goal:** Display a complete summary and add a type-safety demonstration that mirrors what real applications do before processing data.

**Add to `tracker.js`:**
```javascript
// Type safety check — simulating data validation
let incomingScoreFromForm = "92";    // Score came from a form — it's a string!

console.log("Incoming score type:", typeof incomingScoreFromForm);   // "string"
console.log("Incorrect sum:", mathScore + incomingScoreFromForm);    // "7892" — wrong!

// Convert to number for correct calculation
let correctedScore = Number(incomingScoreFromForm);
console.log("Corrected score type:", typeof correctedScore);         // "number"
console.log("Correct sum:", mathScore + correctedScore);             // 170 — correct!

// Final summary display
document.getElementById("summary").innerHTML =
  "SEMESTER SUMMARY — " + fullName +
  " | ID: " + studentId +
  " | Level: " + currentLevel + "L" +
  " | Classification: " + classification +
  " | Outstanding: ₦" + outstandingFees;

console.log("=== FINAL REPORT ===");
console.log("Student:", fullName);
console.log("ID:", studentId);
console.log("Average:", averageScore.toFixed(1) + "%");
console.log("Classification:", classification);
```

**Expected console output (new lines):**
```
Incoming score type: string
Incorrect sum: 7892
Corrected score type: number
Correct sum: 170
=== FINAL REPORT ===
Student: Ngozi Adeleke
ID: STU-2025-007
Average: 77.3%
Classification: First Class
```

---

**Reflection Questions:**

1. You used `const` for `studentId`, `fullName`, and `programme`. Why would it be dangerous if these values could be accidentally changed mid-program?

2. `outstandingFees` started as `null` and was later updated to `45000`. What did `typeof outstandingFees` return when it was `null`? Did the type change when it became `45000`? What does this tell you about dynamic typing?

3. The incoming score from the form was `"92"` (a string). Adding it to `mathScore` gave `"7892"` instead of `170`. In a real school system, what kind of mistakes could this cause?

4. Look at the `const` variables in your code. Could any of them logically benefit from being `let`? Could any of the `let` variables safely be `const`?

5. If this tracker were a real system used by a university, what other data types would you expect to store? What would be `const`, what would be `let`, and why?

---

**Optional Advanced Features:**
- Add a `const` array called `subjects` that holds the subject names, and display them on the page
- Add a second student and compare their averages — display who has the higher score
- Use `typeof` to build a simple "data validator" that checks each variable's type before displaying it
- Add a boolean `hasScholarship` and calculate a discounted fee if `true`

---
---

# ✅ COMPLETION CHECKLIST

| Item | Status |
|---|---|
| Variables explained as labelled data containers | ✅ |
| All four declaration methods covered (`let`, `const`, `var`, automatic) | ✅ |
| Identifier naming rules explained with `_` and `$` covered | ✅ |
| Multiple variable declaration in one statement shown | ✅ |
| Assignment operator (`=`) vs equality (`==`) distinction explained | ✅ |
| String + number mixing and type coercion explained | ✅ |
| `let` — redeclaration protection explained with examples | ✅ |
| `let` — block scope vs `var` function scope explained with loops | ✅ |
| `let` — hoisting behaviour explained and compared to `var` | ✅ |
| `const` — must be assigned at declaration | ✅ |
| `const` — cannot be reassigned or redeclared | ✅ |
| `const` — arrays and objects: contents can change, reference cannot | ✅ |
| Decision rule for `const` vs `let` clearly stated | ✅ |
| Why `var` is no longer recommended — full comparison table | ✅ |
| All 8 data types explained with examples | ✅ |
| Dynamic typing explained and illustrated | ✅ |
| `typeof` operator explained and demonstrated | ✅ |
| `null` vs `undefined` distinction explained | ✅ |
| `typeof null` quirk explained | ✅ |
| Three applied exercises with warm-ups, hints, and self-checks | ✅ |
| Real-world mini-project built across three stages | ✅ |
| Reflection questions included | ✅ |
| Every concept includes at least one example with expected output | ✅ |

---

**One-sentence summary:** Variables are named data containers declared with `const` (for fixed values) or `let` (for changeable values), and understanding JavaScript's eight data types — along with how `typeof` reveals them — is the foundation for writing safe, predictable programs.