---
title: "JavaScript Mastery Capstone: The Complete Examples Library · Practice Arsenal · Interview Prep · Exam Readiness"
nav_order: 45
---

> **What This Tutorial Covers**
> This is the final and most important document in your JavaScript learning journey. It consolidates the entire W3Schools JavaScript curriculum into one powerful capstone resource: a living examples library across every JavaScript topic, a structured practice system, an interview preparation guide, a week-by-week study plan, bootcamp-style drills, and full certification/exam readiness. By the end, you will not just know JavaScript — you will be *ready to use it professionally*.

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING: THE COMPLETE JAVASCRIPT EXAMPLES LIBRARY

Think of this phase as your JavaScript reference museum. Every exhibit (example) is explained from scratch, shows you *why* the concept exists, *what problem it solves*, and *how to use it in real life*. No exhibit is skipped.

---

## CHAPTER 1: CORE JAVASCRIPT EXAMPLES

### 1.1 Output Methods — Four Ways JavaScript Talks to You

**What are output methods?**
JavaScript can communicate results in four different ways. Think of them like four different channels a radio station can broadcast on — FM, AM, shortwave, or internet. Each channel is best for a different audience.

**Why do they exist?**
Because different situations call for different kinds of feedback. Sometimes you want to show results to the user (on the page). Sometimes you want to debug silently (console). Sometimes you want a pop-up warning.

---

#### Method 1: `innerHTML` — Writing Inside an HTML Element

**What it does:** Puts content inside any HTML element on the page. This is the most common way to display results to users.

**Real-world analogy:** Like writing on a whiteboard inside a classroom — everyone in the room (on the page) can see it.

```html
<!DOCTYPE html>
<html>
<body>
  <h2>Student Result</h2>
  <p id="result"></p>

  <script>
    let score = 87;
    let grade = score >= 70 ? "Pass" : "Fail";

    // innerHTML writes text INTO the element with id="result"
    document.getElementById("result").innerHTML = "Score: " + score + " — " + grade;
  </script>
</body>
</html>

// Expected output on page:
// Score: 87 — Pass
```

**Line-by-line breakdown:**
- `document` → the entire HTML page
- `.getElementById("result")` → finds the `<p>` tag with `id="result"`
- `.innerHTML` → targets the content inside that tag
- `= "Score: ..."` → replaces whatever was inside with this new text

**🧠 Thinking question:** What happens if no element with `id="result"` exists?
> Answer: You get `null`, and the assignment throws a TypeError. Always make sure the element exists!

---

#### Method 2: `document.write()` — Writing Directly to the Page

**What it does:** Writes directly into the HTML document as it loads.

**⚠️ Important warning:** If you call `document.write()` *after* the page has fully loaded, it will **erase the entire page**. This is a common beginner trap.

```html
<script>
  // Safe: called during page load
  document.write("Welcome to Tunde's JavaScript Lab!");
</script>

// Expected output:
// Welcome to Tunde's JavaScript Lab!
```

```javascript
// ❌ DANGEROUS — called after page loads (e.g., inside a button click)
function clickMe() {
  document.write("Oops — this erased the whole page!");
}

// ✅ SAFER — use innerHTML instead for dynamic updates
function clickMe() {
  document.getElementById("output").innerHTML = "Updated safely!";
}
```

**When to use `document.write()`:** Only for quick testing during development. Never in production code.

---

#### Method 3: `window.alert()` — Pop-Up Dialog Box

**What it does:** Opens a browser pop-up box with a message. Execution of JavaScript *pauses* until the user clicks OK.

**Real-world analogy:** Like a security guard stopping you at the gate — everything pauses until you show your ID.

```javascript
// Simple alert
window.alert("Hello from Lagos!");

// You can omit 'window' — it's implied
alert("Your account balance is ₦45,200");

// Expected output:
// [Browser pop-up dialog]: "Your account balance is ₦45,200"
```

**When to use alerts:** For urgent messages or quick debugging. Overusing alerts is very annoying to users — prefer `innerHTML` or `console.log`.

---

#### Method 4: `console.log()` — The Developer's Notebook

**What it does:** Prints messages to the browser's developer console (press F12 → Console tab). Users never see this — it's only for developers.

**Real-world analogy:** A chef's private notes on a recipe — invisible to diners, crucial for the kitchen.

```javascript
let customerName = "Babatunde";
let orderTotal = 12500;
let discount = 0.1;

console.log("Customer:", customerName);          // Customer: Babatunde
console.log("Order Total: ₦" + orderTotal);     // Order Total: ₦12500
console.log("After discount:", orderTotal * (1 - discount)); // After discount: 11250

// You can also log objects — very useful!
let order = { name: customerName, total: orderTotal };
console.log(order); // { name: 'Babatunde', total: 12500 }

// console.error() — shows in red, for errors
console.error("Payment failed: insufficient funds");

// console.warn() — shows in yellow, for warnings
console.warn("Session expiring in 5 minutes");

// console.table() — displays arrays/objects as a table
let products = [
  { item: "Garri", price: 800 },
  { item: "Rice (50kg)", price: 32000 },
  { item: "Palm oil", price: 4500 }
];
console.table(products);
// Displays a neatly formatted table in the console
```

---

### 1.2 JavaScript Statements and Syntax

**What is a statement?**
A JavaScript statement is one complete instruction. Like a sentence in English ends with a period, a JS statement ends with a semicolon (`;`).

**Real-world analogy:** A recipe is made of individual steps — "Boil water." "Add salt." "Stir for 3 minutes." Each step is a statement.

```javascript
// Each of these is one statement:
let price = 5000;                          // Declare a variable
price = price + 200;                       // Update the variable
console.log("Final price: ₦" + price);    // Output to console

// Expected output:
// Final price: ₦5200
```

**Semicolons — required or optional?**
JavaScript has Automatic Semicolon Insertion (ASI), so semicolons are *technically* optional in most cases. But as a best practice, *always write them*. Relying on ASI can cause subtle, hard-to-find bugs.

```javascript
// ❌ This looks fine but can break in some cases:
let a = 1
let b = 2
let c = a + b
console.log(c)

// ✅ This is safe and clear:
let a = 1;
let b = 2;
let c = a + b;
console.log(c); // 3
```

**Code Blocks — Grouping Statements Together**
Curly braces `{}` group multiple statements into one block. Blocks are used in functions, loops, and conditions.

```javascript
// A block groups related statements
if (true) {
  let message = "This runs!";
  console.log(message);
  console.log("All three lines are one block.");
}
// Expected output:
// This runs!
// All three lines are one block.
```

**JavaScript is case-sensitive!**

```javascript
let myName = "Tunde";
// console.log(MyName); // ❌ ReferenceError — 'MyName' is not defined
console.log(myName);   // ✅ Tunde
```

**Whitespace — JavaScript ignores it (mostly)**

```javascript
// These two lines do exactly the same thing:
let x=5+3;
let x = 5 + 3;  // ← More readable. Always choose readability.
```

---

### 1.3 Variables — `var`, `let`, and `const`

**What is a variable?**
A variable is a named container that holds a value. Think of it like a labelled box in a warehouse — the label is the variable name, the box contents are the value.

**Three ways to declare variables:**

| Keyword | Reassignable? | Block-scoped? | When to use |
|---------|--------------|---------------|-------------|
| `var`   | Yes          | No (function-scoped) | Legacy code only — avoid |
| `let`   | Yes          | Yes           | Values that change |
| `const` | No           | Yes           | Values that don't change |

```javascript
// let — for changing values
let accountBalance = 50000;
console.log(accountBalance); // 50000

accountBalance = accountBalance - 5000; // Withdrawal
console.log(accountBalance); // 45000

// const — for fixed values
const BANK_NAME = "First Bank Nigeria";
const INTEREST_RATE = 0.035;

console.log(BANK_NAME);     // First Bank Nigeria
console.log(INTEREST_RATE); // 0.035

// ❌ Trying to reassign a const:
// BANK_NAME = "GTBank"; // TypeError: Assignment to constant variable
```

**`var` — the old way and its problems:**

```javascript
// var is function-scoped, not block-scoped — this causes bugs
if (true) {
  var leakyVar = "I escape my block!";
  let safeVar = "I stay in my block.";
}

console.log(leakyVar); // "I escape my block!" — BAD!
// console.log(safeVar); // ❌ ReferenceError — safeVar is not defined
```

**🧠 Thinking question:** Why is `var` considered dangerous for modern JavaScript?
> Because it leaks out of if/for blocks (function-scoped instead of block-scoped), and it's hoisted to the top of its function — meaning you can use it before you declare it, which causes confusing bugs.

---

### 1.4 Data Types — The Different Kinds of Values JavaScript Works With

**What are data types?**
Just like in everyday life you have different *kinds* of things (numbers, names, true/false questions, lists), JavaScript has different types of data.

**The 8 JavaScript Data Types:**

```javascript
// 1. String — text, enclosed in quotes
let productName = "Indomie Noodles";
let brand = 'Dufil';
let description = `${brand} makes ${productName}`; // Template literal

// 2. Number — integers and decimals
let quantity = 5;
let unitPrice = 120.50;
let totalCost = quantity * unitPrice; // 602.5

// 3. BigInt — very large integers (beyond Number limit)
let populationNigeria = 220000000n; // n suffix makes it BigInt
let nationalDebt = 9_000_000_000_000n; // underscore for readability

// 4. Boolean — true or false only
let isLoggedIn = true;
let hasDiscount = false;

// 5. Undefined — variable declared but no value assigned
let futureFeature;
console.log(futureFeature); // undefined

// 6. Null — intentionally empty/no value
let selectedProduct = null; // No product selected yet

// 7. Symbol — unique identifier (advanced use)
let userId = Symbol("user_id");
let anotherUserId = Symbol("user_id");
console.log(userId === anotherUserId); // false — symbols are always unique!

// 8. Object — collection of related data
let customer = {
  name: "Babatunde Adeyemi",
  age: 32,
  city: "Lagos",
  premium: true
};

console.log(typeof productName);    // "string"
console.log(typeof quantity);       // "number"
console.log(typeof isLoggedIn);     // "boolean"
console.log(typeof futureFeature);  // "undefined"
console.log(typeof selectedProduct); // "object" ← famous quirk! null shows as "object"
console.log(typeof customer);       // "object"
console.log(typeof userId);         // "symbol"
```

**Dynamic typing — JavaScript changes the type automatically:**

```javascript
let value = 42;          // number
console.log(typeof value); // "number"

value = "forty-two";     // now it's a string
console.log(typeof value); // "string"

value = true;            // now it's a boolean
console.log(typeof value); // "boolean"
```

> This is called **dynamic typing**. JavaScript doesn't lock a variable to one type. This is powerful but requires care — type errors are a very common source of bugs.

---

### 1.5 Operators — JavaScript's Mathematical and Logical Tools

#### Arithmetic Operators

```javascript
let a = 20;
let b = 6;

console.log(a + b);  // 26 — Addition
console.log(a - b);  // 14 — Subtraction
console.log(a * b);  // 120 — Multiplication
console.log(a / b);  // 3.3333... — Division
console.log(a % b);  // 2 — Modulus (remainder)
console.log(a ** b); // 64000000 — Exponentiation (20 to the power 6)

// Increment and Decrement
let count = 10;
count++;           // count is now 11 (post-increment)
++count;           // count is now 12 (pre-increment)
count--;           // count is now 11 (post-decrement)
console.log(count); // 11
```

#### Assignment Operators

```javascript
let price = 5000;

price += 500;   // price = price + 500  → 5500
price -= 200;   // price = price - 200  → 5300
price *= 2;     // price = price * 2    → 10600
price /= 4;     // price = price / 4    → 2650
price %= 1000;  // price = price % 1000 → 650
price **= 2;    // price = price ** 2   → 422500

console.log(price); // 422500
```

#### Comparison Operators

```javascript
let age = 18;

console.log(age == 18);   // true  — equal value (loose)
console.log(age == "18"); // true  — loose: "18" coerced to number
console.log(age === 18);  // true  — equal value AND type (strict) ✅ use this!
console.log(age === "18"); // false — types don't match (number vs string)
console.log(age != 20);   // true  — not equal
console.log(age !== "18"); // true  — not strictly equal
console.log(age > 16);    // true
console.log(age >= 18);   // true
console.log(age < 21);    // true
console.log(age <= 17);   // false
```

**⚠️ Beginner mistake:** Using `==` instead of `===`.

```javascript
// ❌ Loose equality can surprise you:
console.log(0 == false);   // true — both are "falsy"
console.log("" == false);  // true — both are "falsy"
console.log(null == undefined); // true — loose rules

// ✅ Strict equality is predictable:
console.log(0 === false);   // false — number vs boolean
console.log("" === false);  // false — string vs boolean
```

#### Logical Operators

```javascript
let hasID = true;
let isAdult = true;
let hasMembership = false;

// AND (&&) — both must be true
console.log(hasID && isAdult);         // true
console.log(hasID && hasMembership);   // false

// OR (||) — at least one must be true
console.log(isAdult || hasMembership); // true
console.log(false || hasMembership);   // false

// NOT (!) — reverses the boolean
console.log(!hasMembership);  // true
console.log(!isAdult);        // false

// Real-world: Can this person enter a restricted venue?
let canEnter = hasID && isAdult;
console.log("Can enter:", canEnter); // Can enter: true
```

#### Nullish Coalescing (`??`) and Optional Chaining (`?.`)

```javascript
// ?? — use right side only if left is null or undefined
let userName = null;
let displayName = userName ?? "Guest";
console.log(displayName); // "Guest"

let price = 0;
let displayPrice = price ?? "Free"; // 0 is NOT null/undefined
console.log(displayPrice); // 0 (preserves zero — unlike || which would give "Free")

// ?. — safe property access, returns undefined instead of throwing
let user = null;
console.log(user?.name);          // undefined (no error!)
console.log(user?.address?.city); // undefined (no error!)

let activeUser = { name: "Tunde", address: { city: "Lagos" } };
console.log(activeUser?.name);          // "Tunde"
console.log(activeUser?.address?.city); // "Lagos"
```

---

### 1.6 Functions — Reusable Blocks of Code

**What is a function?**
A function is a named block of code you can run multiple times. Think of it like a recipe — you write it once, then follow it every time you need to cook that dish.

```javascript
// Function Declaration
function greetCustomer(name, amount) {
  let message = `Welcome, ${name}! Your balance is ₦${amount.toLocaleString()}.`;
  return message;
}

// Call the function with different values
console.log(greetCustomer("Babatunde", 45000));
// Welcome, Babatunde! Your balance is ₦45,000.

console.log(greetCustomer("Amaka", 12750));
// Welcome, Amaka! Your balance is ₦12,750.
```

**Function Expression:**

```javascript
const calculateTax = function(income) {
  return income * 0.075; // 7.5% VAT
};

console.log(calculateTax(100000)); // 7500
```

**Arrow Function (ES6+):**

```javascript
// Traditional way:
function square(n) { return n * n; }

// Arrow function:
const square = (n) => n * n;

// Even shorter (single param, no parentheses needed):
const square = n => n * n;

console.log(square(7));  // 49
console.log(square(12)); // 144

// Multi-line arrow function needs a body block and return:
const calculateLoan = (principal, rate, years) => {
  let interest = principal * rate * years;
  let total = principal + interest;
  return { interest, total };
};

let loan = calculateLoan(500000, 0.12, 3);
console.log(loan); // { interest: 180000, total: 680000 }
```

**Default Parameters:**

```javascript
function createOrder(product, quantity = 1, discount = 0) {
  let basePrice = 2500;
  let subtotal = basePrice * quantity;
  let finalPrice = subtotal - (subtotal * discount);
  return `${quantity}x ${product}: ₦${finalPrice.toLocaleString()}`;
}

console.log(createOrder("Bag of Rice"));          // 1x Bag of Rice: ₦2,500
console.log(createOrder("Bag of Rice", 5));       // 5x Bag of Rice: ₦12,500
console.log(createOrder("Bag of Rice", 5, 0.1)); // 5x Bag of Rice: ₦11,250
```

**Rest Parameters — accepting unlimited arguments:**

```javascript
function addAllPrices(...prices) {
  return prices.reduce((total, price) => total + price, 0);
}

console.log(addAllPrices(500, 1200, 3000, 750));  // 5450
console.log(addAllPrices(100, 200));               // 300
```

---

### 1.7 Objects — Grouping Related Data Together

**What is an object?**
An object bundles related data and functionality together. Think of a bank account — it has properties (account number, owner, balance) and actions (deposit, withdraw, check balance).

```javascript
// Creating an object
let bankAccount = {
  accountNumber: "0123456789",
  owner: "Babatunde Adeyemi",
  balance: 75000,
  accountType: "Savings",

  // Method — a function inside an object
  deposit: function(amount) {
    this.balance += amount;
    console.log(`Deposited ₦${amount}. New balance: ₦${this.balance}`);
  },

  withdraw: function(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds!");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrew ₦${amount}. New balance: ₦${this.balance}`);
  },

  checkBalance: function() {
    console.log(`${this.owner}'s balance: ₦${this.balance.toLocaleString()}`);
  }
};

// Using the object
bankAccount.checkBalance();   // Babatunde Adeyemi's balance: ₦75,000
bankAccount.deposit(25000);   // Deposited ₦25000. New balance: ₦100000
bankAccount.withdraw(10000);  // Withdrew ₦10000. New balance: ₦90000
bankAccount.withdraw(200000); // Insufficient funds!
```

**Accessing object properties:**

```javascript
let product = { name: "Palm Oil", price: 4500, unit: "5 litres", inStock: true };

// Dot notation (preferred for known property names):
console.log(product.name);  // Palm Oil
console.log(product.price); // 4500

// Bracket notation (useful for dynamic/variable property names):
let field = "unit";
console.log(product[field]); // 5 litres

// Adding new properties:
product.supplier = "Lagos Agro Supplies";
console.log(product.supplier); // Lagos Agro Supplies

// Deleting properties:
delete product.inStock;
console.log(product.inStock); // undefined
```

**Destructuring objects:**

```javascript
let employee = {
  name: "Amaka Okonkwo",
  role: "Software Engineer",
  salary: 450000,
  department: "Technology"
};

// Extract multiple properties at once:
const { name, role, salary } = employee;
console.log(name);   // Amaka Okonkwo
console.log(role);   // Software Engineer
console.log(salary); // 450000

// Rename while destructuring:
const { name: empName, salary: monthlySalary } = employee;
console.log(empName);       // Amaka Okonkwo
console.log(monthlySalary); // 450000
```

---

### 1.8 Arrays — Ordered Lists of Values

**What is an array?**
An array is an ordered list. Think of a class attendance register — student names listed in order, each with a position number (index).

```javascript
// Creating arrays
let students = ["Tunde", "Amaka", "Chidi", "Ngozi", "Emeka"];
let scores   = [87, 92, 78, 95, 63];
let mixed    = ["Tunde", 87, true, null]; // Can hold different types (but avoid mixing)

// Accessing elements (zero-indexed)
console.log(students[0]); // "Tunde"  (first)
console.log(students[2]); // "Chidi"  (third)
console.log(students[4]); // "Emeka"  (last)
console.log(students[students.length - 1]); // "Emeka" — dynamic last element

// Modifying elements
students[1] = "Aisha"; // Replace "Amaka" with "Aisha"
console.log(students); // ["Tunde", "Aisha", "Chidi", "Ngozi", "Emeka"]
```

**Essential Array Methods:**

```javascript
let cart = ["Rice", "Beans", "Garri"];

// Add to end
cart.push("Palm Oil");
console.log(cart); // ["Rice", "Beans", "Garri", "Palm Oil"]

// Remove from end
let removed = cart.pop();
console.log(removed); // "Palm Oil"
console.log(cart);    // ["Rice", "Beans", "Garri"]

// Add to beginning
cart.unshift("Indomie");
console.log(cart); // ["Indomie", "Rice", "Beans", "Garri"]

// Remove from beginning
cart.shift();
console.log(cart); // ["Rice", "Beans", "Garri"]

// Find index
console.log(cart.indexOf("Beans")); // 1

// Check if element exists
console.log(cart.includes("Rice"));  // true
console.log(cart.includes("Yam"));   // false

// Join elements into a string
console.log(cart.join(", ")); // "Rice, Beans, Garri"

// Get a portion of the array (non-destructive)
let subset = cart.slice(0, 2);
console.log(subset); // ["Rice", "Beans"]
console.log(cart);   // ["Rice", "Beans", "Garri"] — unchanged

// Remove and replace elements
cart.splice(1, 1, "Tomatoes"); // At index 1, remove 1 item, insert "Tomatoes"
console.log(cart); // ["Rice", "Tomatoes", "Garri"]
```

**Higher-order Array Methods (very important in real jobs):**

```javascript
let salaries = [250000, 450000, 180000, 320000, 500000, 150000];

// map() — transform every element
let afterTax = salaries.map(salary => salary * 0.925); // 7.5% tax
console.log(afterTax);
// [231250, 416250, 166500, 296000, 462500, 138750]

// filter() — keep only elements that pass a test
let highEarners = salaries.filter(salary => salary >= 300000);
console.log(highEarners); // [450000, 320000, 500000]

// reduce() — boil all elements down to one value
let totalPayroll = salaries.reduce((total, salary) => total + salary, 0);
console.log("Total payroll: ₦" + totalPayroll.toLocaleString()); 
// Total payroll: ₦1,850,000

// find() — get first element that matches
let firstHighSalary = salaries.find(salary => salary > 400000);
console.log(firstHighSalary); // 450000

// every() — do ALL elements pass the test?
let allAboveMinimum = salaries.every(salary => salary >= 150000);
console.log(allAboveMinimum); // true

// some() — does AT LEAST ONE element pass?
let anyMillionaire = salaries.some(salary => salary >= 1000000);
console.log(anyMillionaire); // false

// sort() — sorts alphabetically by default
let names = ["Tunde", "Amaka", "Chidi"];
console.log(names.sort()); // ["Amaka", "Chidi", "Tunde"]

// sort() for numbers needs a comparator function
let nums = [40, 100, 1, 5, 25, 10];
nums.sort((a, b) => a - b); // Ascending
console.log(nums); // [1, 5, 10, 25, 40, 100]

nums.sort((a, b) => b - a); // Descending
console.log(nums); // [100, 40, 25, 10, 5, 1]

// forEach() — run a function for each element (no return value)
salaries.forEach((salary, index) => {
  console.log(`Employee ${index + 1}: ₦${salary.toLocaleString()}`);
});
// Employee 1: ₦250,000
// Employee 2: ₦450,000 ... etc.

// flat() — flatten nested arrays
let nestedScores = [[87, 92], [78, 95], [63, 71]];
console.log(nestedScores.flat()); // [87, 92, 78, 95, 63, 71]

// flatMap() — map + flat in one step
let pairs = [[1, 2], [3, 4], [5, 6]];
let doubled = pairs.flatMap(pair => pair.map(n => n * 2));
console.log(doubled); // [2, 4, 6, 8, 10, 12]
```

---

### 1.9 Strings and String Methods

**What is a string?**
A string is any sequence of characters — letters, numbers, spaces, symbols. In JavaScript, strings are *immutable*, meaning you can never change an existing string; you always create a new one.

```javascript
let message = "Hello, Babatunde!";

// Length
console.log(message.length); // 18

// Access characters (like arrays)
console.log(message[0]); // "H"
console.log(message[7]); // "B"

// at() — supports negative indexes
console.log(message.at(-1));  // "!" — last character
console.log(message.at(-2));  // "e" — second to last

// Case conversion
console.log(message.toUpperCase()); // "HELLO, BABATUNDE!"
console.log(message.toLowerCase()); // "hello, babatunde!"

// Searching
console.log(message.includes("Babatunde"));   // true
console.log(message.indexOf("Babatunde"));    // 7 — position where it starts
console.log(message.startsWith("Hello"));     // true
console.log(message.endsWith("!"));           // true

// Extracting parts
console.log(message.slice(7, 16));     // "Babatunde"
console.log(message.substring(7, 16)); // "Babatunde"
console.log(message.slice(-6));        // "tunde!" — 6 chars from end

// Replacing
let updated = message.replace("Babatunde", "Amaka");
console.log(updated); // "Hello, Amaka!"
console.log(message); // "Hello, Babatunde!" — original unchanged!

// Replace ALL occurrences
let text = "Garri costs more. Garri is nutritious. Garri is Nigerian.";
let newText = text.replaceAll("Garri", "Cassava flakes");
console.log(newText);
// "Cassava flakes costs more. Cassava flakes is nutritious. Cassava flakes is Nigerian."

// Split into array
let csv = "Lagos,Abuja,Kano,Ibadan,Port Harcourt";
let cities = csv.split(",");
console.log(cities); // ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"]

// Trim whitespace
let messyInput = "   Babatunde   ";
console.log(messyInput.trim());       // "Babatunde"
console.log(messyInput.trimStart());  // "Babatunde   "
console.log(messyInput.trimEnd());    // "   Babatunde"

// Padding
let accountNum = "7890";
let formatted = accountNum.padStart(10, "0"); // Pad to 10 chars with zeros
console.log(formatted); // "0000007890"

// Repeat
let separator = "-".repeat(30);
console.log(separator); // "------------------------------"

// Template literals — powerful string building
let name = "Tunde";
let balance = 75000;
let statement = `
Account Holder: ${name}
Balance: ₦${balance.toLocaleString()}
Date: ${new Date().toLocaleDateString("en-NG")}
`;
console.log(statement);
// Account Holder: Tunde
// Balance: ₦75,000
// Date: 22/03/2026
```

---

### 1.10 Numbers and Math

```javascript
// Number properties
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
console.log(Number.NaN);               // NaN

// Checking numbers
console.log(Number.isInteger(42));     // true
console.log(Number.isInteger(42.5));   // false
console.log(Number.isFinite(1/0));     // false (Infinity is not finite)
console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN("hello"));    // false (it's a string, not NaN)

// Converting to string with formatting
let price = 1234567.89;
console.log(price.toFixed(2));         // "1234567.89"
console.log(price.toFixed(0));         // "1234568" (rounded)
console.log(price.toPrecision(6));     // "1234570"
console.log(price.toLocaleString("en-NG", { style: "currency", currency: "NGN" }));
// "₦1,234,567.89"

// Math object
console.log(Math.round(4.7));   // 5
console.log(Math.round(4.4));   // 4
console.log(Math.floor(4.9));   // 4 — always rounds down
console.log(Math.ceil(4.1));    // 5 — always rounds up
console.log(Math.trunc(4.9));   // 4 — removes decimal part
console.log(Math.abs(-42));     // 42 — absolute value
console.log(Math.pow(2, 8));    // 256
console.log(Math.sqrt(144));    // 12
console.log(Math.cbrt(27));     // 3 — cube root
console.log(Math.min(3, 1, 4, 1, 5, 9, 2, 6)); // 1
console.log(Math.max(3, 1, 4, 1, 5, 9, 2, 6)); // 9

// Random numbers — very commonly needed
let random = Math.random(); // 0 (inclusive) to 1 (exclusive)
console.log(random); // e.g., 0.7362...

// Random integer between min and max (inclusive):
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomInt(1, 6));   // Dice roll: 1-6
console.log(randomInt(1, 100)); // Random score: 1-100
console.log(randomInt(100, 999)); // Random 3-digit number
```

---

### 1.11 Dates and Times

```javascript
// Creating dates
let now = new Date();
console.log(now); // Current date and time

let specificDate = new Date(2024, 0, 1); // Jan 1, 2024 (month is 0-indexed!)
let fromString = new Date("2024-03-15");
let fromTimestamp = new Date(1710000000000);

// Getting date components
let today = new Date();
console.log(today.getFullYear()); // 2026
console.log(today.getMonth());    // 2 (March — 0-indexed: Jan=0, Feb=1, Mar=2)
console.log(today.getDate());     // 22 (day of month)
console.log(today.getDay());      // 0 (day of week: 0=Sunday, 1=Monday...)
console.log(today.getHours());    // current hour
console.log(today.getMinutes());  // current minutes
console.log(today.getSeconds());  // current seconds
console.log(today.getTime());     // milliseconds since Jan 1, 1970

// Formatting dates for Nigerian users
let invoice = new Date();
let options = { year: "numeric", month: "long", day: "numeric" };
console.log(invoice.toLocaleDateString("en-NG", options));
// "22 March 2026"

// Date arithmetic — difference between two dates
let startDate = new Date("2026-01-01");
let endDate   = new Date("2026-12-31");
let diffMs = endDate - startDate;           // Difference in milliseconds
let diffDays = diffMs / (1000 * 60 * 60 * 24); // Convert to days
console.log(`Days in 2026: ${Math.round(diffDays)}`); // Days in 2026: 364

// Countdown: days until a deadline
function daysUntil(targetDateStr) {
  let target = new Date(targetDateStr);
  let today  = new Date();
  let diff   = target - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

console.log(`Days until year-end: ${daysUntil("2026-12-31")}`);
// Days until year-end: 284 (varies by when you run it)
```

---

### 1.12 Conditions, Loops, and Control Flow

```javascript
// if / else if / else
let temperature = 38;

if (temperature > 40) {
  console.log("Dangerously hot — stay indoors!");
} else if (temperature >= 35) {
  console.log("Very hot — stay hydrated.");
} else if (temperature >= 25) {
  console.log("Warm and pleasant.");
} else {
  console.log("Cool — might need a jacket.");
}
// Very hot — stay hydrated.

// Ternary operator — shorthand if/else
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// switch — for multiple fixed options
let day = new Date().getDay();
let dayName;

switch (day) {
  case 0: dayName = "Sunday";    break;
  case 1: dayName = "Monday";    break;
  case 2: dayName = "Tuesday";   break;
  case 3: dayName = "Wednesday"; break;
  case 4: dayName = "Thursday";  break;
  case 5: dayName = "Friday";    break;
  case 6: dayName = "Saturday";  break;
  default: dayName = "Unknown";
}
console.log("Today is: " + dayName); // Today is: Sunday

// for loop — when you know the number of iterations
for (let i = 1; i <= 5; i++) {
  console.log(`Week ${i}: Study JavaScript`);
}
// Week 1: Study JavaScript
// Week 2: Study JavaScript
// ... up to Week 5

// for...of — iterate over array VALUES
let markets = ["Balogun", "Alaba", "Computer Village", "Ladipo", "Idumota"];
for (let market of markets) {
  console.log("Market:", market);
}
// Market: Balogun
// Market: Alaba ... etc.

// for...in — iterate over object KEYS
let inventory = { rice: 50, beans: 30, garri: 100, yam: 20 };
for (let item in inventory) {
  console.log(`${item}: ${inventory[item]} bags`);
}
// rice: 50 bags
// beans: 30 bags ... etc.

// while loop — repeat while a condition is true
let balance = 10000;
let withdrawal = 3000;

while (balance >= withdrawal) {
  balance -= withdrawal;
  console.log(`Withdrew ₦${withdrawal}. Balance: ₦${balance}`);
}
console.log("Balance too low to withdraw.");
// Withdrew ₦3000. Balance: ₦7000
// Withdrew ₦3000. Balance: ₦4000
// Withdrew ₦3000. Balance: ₦1000
// Balance too low to withdraw.

// do...while — runs at least once before checking
let attempts = 0;
do {
  attempts++;
  console.log(`Attempt ${attempts}`);
} while (attempts < 3);
// Attempt 1
// Attempt 2
// Attempt 3

// break and continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // Skip 3
  if (i === 7) break;    // Stop at 7
  console.log(i);
}
// 0, 1, 2, 4, 5, 6
```

---

### 1.13 Error Handling

```javascript
// try...catch — gracefully handle errors
function parseUserAge(input) {
  try {
    let age = parseInt(input);
    if (isNaN(age)) throw new Error("Age must be a valid number");
    if (age < 0 || age > 120) throw new RangeError("Age out of realistic range");
    return age;
  } catch (error) {
    console.error(`Error [${error.name}]: ${error.message}`);
    return null;
  } finally {
    console.log("parseUserAge() finished running");
  }
}

console.log(parseUserAge("25"));      // 25 (success)
console.log(parseUserAge("abc"));     // Error: Age must be a valid number, returns null
console.log(parseUserAge("200"));     // RangeError: Age out of realistic range, returns null

// Custom error types
class InsufficientFundsError extends Error {
  constructor(requested, available) {
    super(`Cannot withdraw ₦${requested}. Available: ₦${available}`);
    this.name = "InsufficientFundsError";
    this.requested = requested;
    this.available = available;
  }
}

function withdraw(balance, amount) {
  if (amount > balance) {
    throw new InsufficientFundsError(amount, balance);
  }
  return balance - amount;
}

try {
  let newBalance = withdraw(5000, 8000);
} catch (e) {
  if (e instanceof InsufficientFundsError) {
    console.log("Custom error caught:", e.message);
    // Custom error caught: Cannot withdraw ₦8000. Available: ₦5000
  }
}
```

---

### 1.14 JSON — JavaScript Object Notation

**What is JSON?**
JSON is a text format for storing and transferring data. It's the language that web APIs use to send data — when your app fetches data from a server, it almost always comes back as JSON.

```javascript
// JavaScript object → JSON string
let product = {
  name: "Basmati Rice",
  weight: "50kg",
  price: 32000,
  inStock: true,
  supplier: { name: "Agro Foods Ltd", city: "Kano" }
};

let jsonString = JSON.stringify(product);
console.log(jsonString);
// '{"name":"Basmati Rice","weight":"50kg","price":32000,"inStock":true,"supplier":{"name":"Agro Foods Ltd","city":"Kano"}}'

// Pretty-printed (for readability)
let prettyJson = JSON.stringify(product, null, 2);
console.log(prettyJson);
// {
//   "name": "Basmati Rice",
//   "weight": "50kg",
//   "price": 32000,
//   "inStock": true,
//   "supplier": {
//     "name": "Agro Foods Ltd",
//     "city": "Kano"
//   }
// }

// JSON string → JavaScript object
let received = '{"customer":"Tunde","order":"Rice","total":32000}';
let parsed = JSON.parse(received);
console.log(parsed.customer); // "Tunde"
console.log(parsed.total);    // 32000
console.log(typeof parsed);   // "object"
```

---

## CHAPTER 2: DOM MANIPULATION EXAMPLES

### 2.1 What Is the DOM?

**DOM = Document Object Model**

When a browser loads an HTML page, it creates a live model of that page in memory — a tree of objects. JavaScript can read and modify this tree to change what users see, without reloading the page.

**Real-world analogy:** Think of the DOM as a family tree. The `document` is the great-grandparent. `html` is the grandparent. `head` and `body` are the parents. Every HTML tag is a node (family member) in the tree.

```
document
  └── html
       ├── head
       │    └── title
       └── body
            ├── h1
            ├── p
            └── div
                 ├── p
                 └── button
```

---

### 2.2 Finding HTML Elements

```javascript
// getElementById — find ONE element by its id
let header = document.getElementById("main-title");
// Returns the element, or null if not found

// getElementsByClassName — find ALL elements with a class
let cards = document.getElementsByClassName("product-card");
// Returns an HTMLCollection (live, array-like)

// getElementsByTagName — find ALL elements of a type
let paragraphs = document.getElementsByTagName("p");
// Returns an HTMLCollection

// querySelector — find the FIRST match (CSS selector syntax)
let firstCard = document.querySelector(".product-card");
let submitBtn = document.querySelector("#submit-btn");
let firstLink = document.querySelector("a");
let navLink = document.querySelector("nav > ul > li:first-child a");

// querySelectorAll — find ALL matches
let allCards = document.querySelectorAll(".product-card");
// Returns a NodeList (static snapshot)
// Can use forEach() directly on NodeList:
allCards.forEach(card => {
  console.log(card.textContent);
});
```

**HTMLCollection vs NodeList:**

| Feature | HTMLCollection | NodeList |
|---------|---------------|----------|
| Source | `getElementsBy*` | `querySelectorAll` |
| Live? | Yes — updates when DOM changes | No — static snapshot |
| forEach? | No (must convert first) | Yes |
| Index access | Yes | Yes |

---

### 2.3 Changing HTML Content

```javascript
// innerHTML — set/get HTML content (renders tags)
let container = document.getElementById("product-list");
container.innerHTML = `
  <div class="product">
    <h3>Indomie Noodles</h3>
    <p>Price: ₦120</p>
    <button onclick="addToCart()">Add to Cart</button>
  </div>
`;

// textContent — set/get plain text only (safer, no HTML rendering)
let priceTag = document.getElementById("price");
priceTag.textContent = "₦4,500"; // No HTML interpretation — just displays as text

// ⚠️ Security note: NEVER use innerHTML with user-provided data without sanitizing!
// ❌ DANGEROUS — allows XSS attacks:
let userInput = "<script>alert('hacked!')</script>";
container.innerHTML = userInput; // Never do this!

// ✅ SAFE — textContent doesn't render HTML:
container.textContent = userInput; // Displays as literal text — no script runs

// innerText — similar to textContent but CSS-aware (hidden elements return "")
let el = document.getElementById("some-el");
console.log(el.innerText);    // Only visible text
console.log(el.textContent);  // All text including hidden
```

---

### 2.4 Changing HTML Attributes

```javascript
// setAttribute / getAttribute / removeAttribute
let profileImg = document.getElementById("profile-picture");

// Get current attribute
let currentSrc = profileImg.getAttribute("src");
console.log(currentSrc); // "/images/default.jpg"

// Set attribute
profileImg.setAttribute("src", "/images/tunde-photo.jpg");
profileImg.setAttribute("alt", "Photo of Tunde Adeyemi");
profileImg.setAttribute("width", "200");

// Check if attribute exists
console.log(profileImg.hasAttribute("src"));  // true
console.log(profileImg.hasAttribute("data-id")); // false

// Remove attribute
profileImg.removeAttribute("width");

// Direct property access (faster for standard HTML attributes)
profileImg.src = "/images/new-photo.jpg";
profileImg.alt = "Updated photo";

let link = document.querySelector("a");
link.href = "https://www.example.com";
link.target = "_blank"; // Open in new tab
```

---

### 2.5 Changing CSS Styles

```javascript
let box = document.getElementById("promo-banner");

// Direct style manipulation
box.style.backgroundColor = "#1a7c4f"; // Nigerian green
box.style.color = "white";
box.style.padding = "20px";
box.style.borderRadius = "8px";
box.style.fontSize = "18px";
box.style.display = "block"; // Show hidden element
box.style.display = "none";  // Hide element

// CSS classes — preferred approach in production!
// classList.add() — add a class
box.classList.add("highlighted");
box.classList.add("premium", "featured"); // Add multiple

// classList.remove() — remove a class
box.classList.remove("highlighted");

// classList.toggle() — add if absent, remove if present
box.classList.toggle("dark-mode");

// classList.contains() — check if class exists
if (box.classList.contains("premium")) {
  console.log("This is a premium banner");
}

// classList.replace() — swap one class for another
box.classList.replace("old-theme", "new-theme");
```

---

### 2.6 Creating and Removing DOM Elements

```javascript
// createElement() — creates a new element (not yet in the page)
let newProduct = document.createElement("div");
newProduct.className = "product-card";
newProduct.innerHTML = `
  <h3>Semovita 1kg</h3>
  <p>₦850</p>
  <button>Buy Now</button>
`;

// appendChild() — add the new element to the DOM
let productGrid = document.getElementById("product-grid");
productGrid.appendChild(newProduct); // Appended AFTER existing children

// insertBefore() — add before a specific element
let firstItem = productGrid.firstElementChild;
productGrid.insertBefore(newProduct, firstItem); // Insert at beginning

// insertAdjacentHTML() — flexible insertion
productGrid.insertAdjacentHTML("beforeend", "<div>New at end</div>");
productGrid.insertAdjacentHTML("afterbegin", "<div>New at start</div>");
productGrid.insertAdjacentHTML("beforebegin", "<div>Before the grid</div>");
productGrid.insertAdjacentHTML("afterend", "<div>After the grid</div>");

// removeChild() — remove a child element
let oldItem = document.getElementById("discontinued-item");
oldItem.parentNode.removeChild(oldItem);

// remove() — modern, direct removal
oldItem.remove(); // Much simpler!

// cloneNode() — duplicate an element
let template = document.getElementById("product-template");
let clone = template.cloneNode(true); // true = deep clone (includes children)
clone.id = "product-clone";
productGrid.appendChild(clone);
```

---

### 2.7 DOM Navigation

```javascript
let container = document.getElementById("product-container");

// Parent navigation
console.log(container.parentNode);     // Parent node (including text nodes)
console.log(container.parentElement);  // Parent element (elements only)

// Children navigation
console.log(container.childNodes);           // All child nodes (including text/whitespace)
console.log(container.children);             // Child ELEMENTS only
console.log(container.firstChild);           // First child node (might be text)
console.log(container.firstElementChild);    // First child element
console.log(container.lastChild);            // Last child node
console.log(container.lastElementChild);     // Last child element
console.log(container.childElementCount);    // Number of child elements

// Sibling navigation
let item = document.querySelector(".product-card");
console.log(item.previousSibling);        // Previous node
console.log(item.previousElementSibling); // Previous element
console.log(item.nextSibling);            // Next node
console.log(item.nextElementSibling);     // Next element

// Traversal example: highlight all siblings of a clicked item
function highlightSiblings(clickedEl) {
  let parent = clickedEl.parentElement;
  let siblings = parent.children;

  for (let sibling of siblings) {
    sibling.classList.remove("selected");
  }
  clickedEl.classList.add("selected");
}
```

---

## CHAPTER 3: FORM INPUT EXAMPLES

### 3.1 Reading Form Values

```javascript
// Text input
let nameInput = document.getElementById("customer-name");
let customerName = nameInput.value; // The current text
console.log(customerName);

// Number input
let ageInput = document.getElementById("age");
let age = parseInt(ageInput.value); // value is always a string — convert!
console.log(typeof ageInput.value); // "string"
console.log(typeof age);            // "number"

// Checkbox
let agreeCheckbox = document.getElementById("agree-terms");
let isChecked = agreeCheckbox.checked; // true or false
console.log(isChecked);

// Radio buttons (find which one is selected)
let genderRadios = document.querySelectorAll('input[name="gender"]');
let selectedGender;
genderRadios.forEach(radio => {
  if (radio.checked) selectedGender = radio.value;
});
console.log(selectedGender); // "male" or "female" or "other"

// Select dropdown
let citySelect = document.getElementById("city");
let selectedCity = citySelect.value; // Value of selected option
console.log(selectedCity); // e.g., "Lagos"

// Also get selected text (not just value):
let selectedText = citySelect.options[citySelect.selectedIndex].text;

// Textarea
let messageArea = document.getElementById("message");
let message = messageArea.value;
console.log(message);

// File input
let fileInput = document.getElementById("profile-picture");
let file = fileInput.files[0]; // First selected file
if (file) {
  console.log(file.name);    // "photo.jpg"
  console.log(file.size);    // size in bytes
  console.log(file.type);    // "image/jpeg"
}
```

---

### 3.2 Form Validation

```javascript
// Complete registration form validator
function validateRegistrationForm() {
  let isValid = true;
  let errors = [];

  // Get form values
  let name = document.getElementById("full-name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  let agreed = document.getElementById("terms").checked;

  // Name validation
  if (name.length < 3) {
    errors.push("Full name must be at least 3 characters long.");
    isValid = false;
  }

  // Email validation using regex
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.push("Please enter a valid email address.");
    isValid = false;
  }

  // Nigerian phone number validation
  let phonePattern = /^(\+234|0)[7-9][01]\d{8}$/;
  if (!phonePattern.test(phone)) {
    errors.push("Enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678).");
    isValid = false;
  }

  // Password validation
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
    isValid = false;
  }

  // Confirm password
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
    isValid = false;
  }

  // Terms agreement
  if (!agreed) {
    errors.push("You must agree to the terms and conditions.");
    isValid = false;
  }

  // Display errors or success
  let errorContainer = document.getElementById("error-messages");
  if (!isValid) {
    errorContainer.innerHTML = errors.map(e => `<p style="color:red">❌ ${e}</p>`).join("");
  } else {
    errorContainer.innerHTML = '<p style="color:green">✅ All fields valid! Submitting...</p>';
    // Proceed with form submission
  }

  return isValid;
}

// HTML constraint validation API
let emailField = document.getElementById("email");
console.log(emailField.validity.valid);           // true or false
console.log(emailField.validity.typeMismatch);    // true if wrong format
console.log(emailField.validity.valueMissing);    // true if required but empty
console.log(emailField.validationMessage);        // Browser's error message
```

---

## CHAPTER 4: JAVASCRIPT EVENTS EXAMPLES

### 4.1 Understanding Events

**What is an event?**
An event is something that happens in the browser — a user clicking a button, pressing a key, moving the mouse, scrolling, the page finishing loading, etc. JavaScript can *listen* for these events and run code in response.

**Real-world analogy:** Think of a doorbell. When someone presses it (the event), a bell rings (the event handler). The doorbell doesn't ring by itself — it waits and *listens* for someone to press it (the event listener).

**Three ways to add event handlers:**

```javascript
// Method 1: HTML attribute (quick but not recommended — mixes HTML and JS)
// <button onclick="handleClick()">Click Me</button>

// Method 2: DOM property (better — but only one handler per event)
let btn = document.getElementById("my-button");
btn.onclick = function() {
  console.log("Button clicked!");
};

// Method 3: addEventListener (BEST — allows multiple handlers, flexible)
btn.addEventListener("click", function() {
  console.log("Button clicked via addEventListener!");
});

// You can add multiple listeners to the same event:
btn.addEventListener("click", logClick);
btn.addEventListener("click", updateCounter);
btn.addEventListener("click", sendAnalytics);

// Removing a listener (must use named function, not anonymous):
function logClick() { console.log("Logged!"); }
btn.addEventListener("click", logClick);
btn.removeEventListener("click", logClick); // Works!
// btn.removeEventListener("click", function() {...}); // ❌ Won't work — different function reference
```

---

### 4.2 Mouse Events

```javascript
let interactiveBox = document.getElementById("hover-box");

// click — single left click
interactiveBox.addEventListener("click", (e) => {
  console.log("Clicked at:", e.clientX, e.clientY);
});

// dblclick — double click
interactiveBox.addEventListener("dblclick", () => {
  console.log("Double clicked!");
});

// mousedown / mouseup — when button is pressed/released
interactiveBox.addEventListener("mousedown", (e) => {
  console.log("Mouse button pressed:", e.button); // 0=left, 1=middle, 2=right
});

interactiveBox.addEventListener("mouseup", () => {
  console.log("Mouse button released");
});

// mouseover / mouseout — enters/leaves element (includes children)
interactiveBox.addEventListener("mouseover", (e) => {
  interactiveBox.style.backgroundColor = "#e8f5e9";
  console.log("Mouse entered from:", e.relatedTarget);
});

interactiveBox.addEventListener("mouseout", (e) => {
  interactiveBox.style.backgroundColor = "";
});

// mouseenter / mouseleave — same but does NOT trigger for children
interactiveBox.addEventListener("mouseenter", () => {
  console.log("Mouse entered (no child triggers)");
});

// mousemove — fires every time mouse moves over element
interactiveBox.addEventListener("mousemove", (e) => {
  let x = e.offsetX; // Position relative to element
  let y = e.offsetY;
  document.getElementById("coords").textContent = `X: ${x}, Y: ${y}`;
});

// contextmenu — right click
interactiveBox.addEventListener("contextmenu", (e) => {
  e.preventDefault(); // Prevent default browser right-click menu
  console.log("Custom right-click menu would show here");
});
```

---

### 4.3 Keyboard Events

```javascript
let searchInput = document.getElementById("search-box");

// keydown — fires when key is pressed down (fires repeatedly if held)
searchInput.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);     // "a", "Enter", "Backspace", "ArrowLeft"
  console.log("Key code:", e.code);       // "KeyA", "Enter", "Backspace"
  console.log("Ctrl held:", e.ctrlKey);   // true if Ctrl was also held
  console.log("Shift held:", e.shiftKey); // true if Shift was also held
  console.log("Alt held:", e.altKey);     // true if Alt was also held

  // Handle Enter key to trigger search
  if (e.key === "Enter") {
    performSearch(searchInput.value);
  }

  // Handle Escape to clear input
  if (e.key === "Escape") {
    searchInput.value = "";
  }

  // Keyboard shortcut: Ctrl+S to save
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault(); // Stop browser's default save dialog
    saveDocument();
  }
});

// keyup — fires when key is released
searchInput.addEventListener("keyup", (e) => {
  // Great for live search (search as user types)
  if (searchInput.value.length >= 3) {
    performLiveSearch(searchInput.value);
  }
});

// input — fires for ANY change to the input value (best for live updates)
searchInput.addEventListener("input", (e) => {
  let query = e.target.value;
  updateSearchSuggestions(query);
});
```

---

### 4.4 Load and Page Events

```javascript
// DOMContentLoaded — DOM is ready, but images/CSS may still be loading
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready! Safe to manipulate elements.");
  initializeApp(); // Always initialize your app here, not at top of script
});

// load — page AND all resources (images, CSS, scripts) fully loaded
window.addEventListener("load", () => {
  console.log("Everything loaded!");
  hideLoadingSpinner();
});

// beforeunload — user is about to leave the page
window.addEventListener("beforeunload", (e) => {
  let unsavedWork = checkForUnsavedChanges();
  if (unsavedWork) {
    e.preventDefault();
    e.returnValue = ""; // Triggers browser's default "Leave page?" dialog
  }
});

// resize — window size changes
window.addEventListener("resize", () => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  console.log(`Window: ${width}x${height}`);

  if (width < 768) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
});

// scroll — user scrolls the page
window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;

  // Show "back to top" button after scrolling 300px
  let backToTop = document.getElementById("back-to-top");
  if (scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
```

---

### 4.5 Form Events

```javascript
let registrationForm = document.getElementById("registration-form");

// submit — form is submitted
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // ALWAYS prevent default to handle submission yourself!

  let formData = new FormData(registrationForm);
  let data = Object.fromEntries(formData.entries());
  console.log("Form data:", data);

  // Send to server
  submitToServer(data);
});

// change — input value changed AND user moved to another field
let citySelect = document.getElementById("city-select");
citySelect.addEventListener("change", (e) => {
  let selectedCity = e.target.value;
  loadShippingRates(selectedCity);
});

// input — value changes in real-time (every keystroke)
let priceInput = document.getElementById("price-input");
priceInput.addEventListener("input", (e) => {
  let value = parseFloat(e.target.value);
  let withTax = value * 1.075;
  document.getElementById("price-with-tax").textContent = 
    `₦${withTax.toFixed(2)}`;
});

// focus — element gains focus (user clicks into it)
let nameField = document.getElementById("name-field");
nameField.addEventListener("focus", () => {
  nameField.style.borderColor = "#1a7c4f";
  nameField.style.boxShadow = "0 0 5px rgba(26, 124, 79, 0.3)";
});

// blur — element loses focus (user clicks away)
nameField.addEventListener("blur", () => {
  nameField.style.borderColor = "";
  nameField.style.boxShadow = "";

  // Validate when user leaves the field
  if (nameField.value.length < 3) {
    showError(nameField, "Name must be at least 3 characters");
  } else {
    clearError(nameField);
  }
});
```

---

### 4.6 Event Propagation — Bubbling and Capturing

```javascript
/*
  HTML structure:
  <div id="grandparent">
    <div id="parent">
      <button id="child">Click Me</button>
    </div>
  </div>
*/

let grandparent = document.getElementById("grandparent");
let parent = document.getElementById("parent");
let child = document.getElementById("child");

// By default, events BUBBLE up: child → parent → grandparent
child.addEventListener("click", () => console.log("1. Child clicked"));
parent.addEventListener("click", () => console.log("2. Parent bubbled"));
grandparent.addEventListener("click", () => console.log("3. Grandparent bubbled"));

// When button is clicked, output:
// 1. Child clicked
// 2. Parent bubbled
// 3. Grandparent bubbled

// stopPropagation() — prevent bubbling
child.addEventListener("click", (e) => {
  e.stopPropagation(); // Stop here — parent won't hear it
  console.log("Child clicked — bubble stopped");
});

// Capturing phase (top-down): use third argument = true
grandparent.addEventListener("click", () => {
  console.log("Grandparent CAPTURING");
}, true);

// Order with capturing enabled:
// Grandparent CAPTURING → Child clicked → Parent bubbled → Grandparent bubbled

// Event Delegation — attach ONE listener to parent, handle child clicks
let productList = document.getElementById("product-list");

productList.addEventListener("click", (e) => {
  // Check what was actually clicked
  if (e.target.classList.contains("add-to-cart")) {
    let productId = e.target.dataset.productId;
    addToCart(productId);
  }

  if (e.target.classList.contains("remove-item")) {
    let productId = e.target.dataset.productId;
    removeFromCart(productId);
  }
});

// This works even for items added AFTER the listener was set up!
// Much more efficient than adding listeners to each item individually.
```

---

## CHAPTER 5: BROWSER (BOM) EXAMPLES

### 5.1 The Window Object

```javascript
// Window dimensions
console.log(window.innerWidth);   // Browser viewport width in pixels
console.log(window.innerHeight);  // Browser viewport height in pixels
console.log(window.outerWidth);   // Total browser window width
console.log(window.outerHeight);  // Total browser window height
console.log(window.scrollX);      // Horizontal scroll position
console.log(window.scrollY);      // Vertical scroll position

// Scrolling methods
window.scrollTo(0, 0);            // Scroll to top of page
window.scrollTo({ top: 500, behavior: "smooth" }); // Smooth scroll to Y=500
window.scrollBy(0, 100);          // Scroll down 100px from current position

// Opening new windows
let newWin = window.open("https://www.example.com", "_blank", "width=800,height=600");
newWin.close(); // Close it programmatically

// Screen information
console.log(screen.width);        // Full screen width
console.log(screen.height);       // Full screen height
console.log(screen.availWidth);   // Width minus taskbar
console.log(screen.availHeight);  // Height minus taskbar
console.log(screen.colorDepth);   // Bit depth (usually 24)
console.log(screen.pixelDepth);   // Pixel depth
```

---

### 5.2 Location — URL and Navigation

```javascript
// Reading the current URL
console.log(location.href);       // Full URL: "https://myshop.com/products?id=42&city=Lagos"
console.log(location.protocol);   // "https:"
console.log(location.hostname);   // "myshop.com"
console.log(location.port);       // "443" or "" if default
console.log(location.pathname);   // "/products"
console.log(location.search);     // "?id=42&city=Lagos"
console.log(location.hash);       // "#section" or ""
console.log(location.origin);     // "https://myshop.com"

// Parsing query string parameters
let params = new URLSearchParams(location.search);
console.log(params.get("id"));    // "42"
console.log(params.get("city"));  // "Lagos"

// Building a URL with parameters
let url = new URL("https://api.myshop.com/products");
url.searchParams.set("category", "food");
url.searchParams.set("page", "2");
url.searchParams.set("sort", "price-asc");
console.log(url.toString());
// "https://api.myshop.com/products?category=food&page=2&sort=price-asc"

// Navigation
location.href = "https://www.example.com";      // Navigate (adds to history)
location.assign("https://www.example.com");     // Same as above
location.replace("https://www.example.com");    // Navigate (does NOT add to history)
location.reload();                               // Reload current page
location.reload(true);                           // Hard reload (bypass cache)
```

---

### 5.3 History — Browser Navigation

```javascript
// Navigate back and forward
history.back();       // Like pressing browser's back button
history.forward();    // Like pressing browser's forward button
history.go(-2);       // Go 2 pages back
history.go(1);        // Go 1 page forward
history.go(0);        // Reload current page

console.log(history.length); // Number of pages in history

// pushState — add to history without navigation (for Single Page Apps)
history.pushState({ page: "products", id: 42 }, "", "/products/42");
// URL changes to /products/42 WITHOUT reloading the page!

// replaceState — modify current history entry
history.replaceState({ page: "products", id: 99 }, "", "/products/99");

// popstate — fires when user goes back/forward
window.addEventListener("popstate", (e) => {
  console.log("State:", e.state);
  // Use e.state to know which "page" to render
  renderPage(e.state.page, e.state.id);
});
```

---

### 5.4 Navigator — Browser Information

```javascript
console.log(navigator.userAgent);      // Browser's full identifier string
console.log(navigator.language);       // "en-NG", "en-US", "yo-NG", etc.
console.log(navigator.languages);      // ["en-NG", "en-US", "en"]
console.log(navigator.platform);       // "Win32", "Linux x86_64", "MacIntel"
console.log(navigator.cookieEnabled);  // true/false
console.log(navigator.onLine);         // true if browser is online
console.log(navigator.hardwareConcurrency); // Number of CPU cores

// Detect mobile vs desktop
let isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
console.log("Mobile:", isMobile);

// Geolocation
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
    console.log("Accuracy (meters):", position.coords.accuracy);
  },
  (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied location access");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location unavailable");
        break;
      case error.TIMEOUT:
        console.log("Request timed out");
        break;
    }
  },
  { timeout: 10000, maximumAge: 60000 }
);

// Clipboard API (modern)
navigator.clipboard.writeText("Copied text!")
  .then(() => console.log("Copied to clipboard"))
  .catch(err => console.error("Copy failed:", err));

navigator.clipboard.readText()
  .then(text => console.log("Clipboard contents:", text))
  .catch(err => console.error("Read failed:", err));
```

---

### 5.5 Popup Boxes

```javascript
// alert — simple message (blocks execution)
alert("Your session will expire in 5 minutes. Please save your work.");

// confirm — yes/no question, returns true or false
let confirmed = confirm("Are you sure you want to delete this record?");
if (confirmed) {
  deleteRecord();
} else {
  console.log("Deletion cancelled");
}

// prompt — gets text input from user, returns string or null
let amount = prompt("Enter the amount to withdraw (₦):", "5000");
if (amount !== null) { // null means user pressed Cancel
  let numericAmount = parseFloat(amount);
  if (!isNaN(numericAmount)) {
    processWithdrawal(numericAmount);
  } else {
    alert("Please enter a valid amount");
  }
}
```

---

### 5.6 Timing Functions

```javascript
// setTimeout — run once after a delay
let timer1 = setTimeout(() => {
  console.log("This runs once after 2 seconds");
}, 2000);

// Cancel it before it runs:
clearTimeout(timer1);

// setInterval — run repeatedly at fixed intervals
let counter = 0;
let timer2 = setInterval(() => {
  counter++;
  console.log(`Tick ${counter}: ${new Date().toLocaleTimeString()}`);

  if (counter >= 5) {
    clearInterval(timer2); // Stop after 5 ticks
    console.log("Timer stopped");
  }
}, 1000); // Every 1 second

// Practical: live clock
function updateClock() {
  let now = new Date();
  let timeStr = now.toLocaleTimeString("en-NG");
  document.getElementById("clock").textContent = timeStr;
}

updateClock(); // Run immediately
setInterval(updateClock, 1000); // Then update every second

// Practical: countdown timer
function startCountdown(seconds) {
  let remaining = seconds;

  let countdown = setInterval(() => {
    let minutes = Math.floor(remaining / 60);
    let secs = remaining % 60;
    let display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    document.getElementById("timer").textContent = display;
    remaining--;

    if (remaining < 0) {
      clearInterval(countdown);
      document.getElementById("timer").textContent = "TIME UP!";
      alert("Your exam time has ended!");
    }
  }, 1000);
}

startCountdown(3600); // 1-hour countdown
```

---

### 5.7 Cookies

```javascript
// Cookies are small text files stored in the browser
// Format: name=value; expires=date; path=/; domain=example.com; secure; SameSite=Strict

// Set a cookie (expires in 30 days)
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

// Get a cookie value
function getCookie(name) {
  let nameEQ = name + "=";
  let cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

// Delete a cookie (set it to expire in the past)
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Usage
setCookie("username", "babatunde", 30);
setCookie("city", "Lagos", 7);
setCookie("theme", "dark", 365);

console.log(getCookie("username")); // "babatunde"
console.log(getCookie("city"));     // "Lagos"
console.log(getCookie("notSet"));   // null

deleteCookie("theme");
console.log(getCookie("theme")); // null
```

---

### 5.8 Web Storage — localStorage and sessionStorage

```javascript
// localStorage — persists even after browser is closed
// sessionStorage — cleared when tab is closed

// Storing values
localStorage.setItem("theme", "dark");
localStorage.setItem("language", "en-NG");
localStorage.setItem("fontSize", "16");

// Retrieving values (always returns string or null)
let theme = localStorage.getItem("theme");       // "dark"
let fontSize = localStorage.getItem("fontSize"); // "16" (string!)

// Convert back to number:
let size = parseInt(localStorage.getItem("fontSize")); // 16 (number)

// Storing objects (must serialize to JSON)
let userPrefs = {
  theme: "dark",
  language: "Yoruba",
  currency: "NGN",
  notifications: true
};

localStorage.setItem("preferences", JSON.stringify(userPrefs));

// Retrieving objects
let savedPrefs = JSON.parse(localStorage.getItem("preferences"));
console.log(savedPrefs.theme);    // "dark"
console.log(savedPrefs.language); // "Yoruba"

// Remove a specific item
localStorage.removeItem("theme");

// Clear everything
localStorage.clear();

// Check how many items are stored
console.log(localStorage.length); // Number of stored items

// Iterate all stored items
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}

// sessionStorage — same API, different lifetime
sessionStorage.setItem("currentPage", "products");
sessionStorage.setItem("sessionId", "xyz-" + Date.now());
console.log(sessionStorage.getItem("currentPage")); // "products"
// All sessionStorage data disappears when the tab closes
```


---

# PHASE 2 — APPLIED EXERCISES: THE JAVASCRIPT PRACTICE ARSENAL

## CHAPTER 6: USING THE JAVASCRIPT SANDBOX EDITOR

### 6.1 How to Practice JavaScript Effectively

Every professional JavaScript developer uses a combination of tools to test code quickly. Here is your complete guide to the sandbox approach.

**Your practice toolkit:**

**1. Browser DevTools Console (Always available)**
- Open with: `F12` or `Ctrl+Shift+J` (Windows/Linux) / `Cmd+Option+J` (Mac)
- Perfect for: quick one-liners, testing expressions, exploring the DOM
- How to use: Click in the console, type JavaScript, press Enter

```javascript
// Try these in your browser console right now:
2 + 2                              // 4
"Lagos".toUpperCase()             // "LAGOS"
[1, 2, 3].map(n => n * n)        // [1, 4, 9]
document.title                    // Your current page title
Math.random()                     // A random decimal
new Date().toLocaleDateString()   // Today's date
```

**2. Create Your Own HTML Test File**
Create a file called `test.html` on your computer:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript Practice Lab</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
    #output { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; min-height: 100px; }
    button { background: #1a7c4f; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
    button:hover { background: #145c3a; }
    input { padding: 10px; border: 1px solid #ccc; border-radius: 4px; margin: 5px; width: 200px; }
  </style>
</head>
<body>
  <h1>My JavaScript Lab</h1>
  <div id="controls">
    <input type="text" id="user-input" placeholder="Enter something...">
    <button id="run-btn">Run</button>
    <button id="clear-btn">Clear</button>
  </div>
  <div id="output">Output will appear here...</div>

  <script>
    // Your practice code goes here!
    const output = document.getElementById("output");
    const input = document.getElementById("user-input");

    function log(message) {
      output.innerHTML += `<p>> ${message}</p>`;
    }

    document.getElementById("run-btn").addEventListener("click", () => {
      let userValue = input.value;
      log("You entered: " + userValue);
      log("Uppercase: " + userValue.toUpperCase());
      log("Length: " + userValue.length + " characters");
    });

    document.getElementById("clear-btn").addEventListener("click", () => {
      output.innerHTML = "";
    });

    // Test your concepts here:
    log("Lab ready! Type something and click Run.");
  </script>
</body>
</html>
```

**3. VS Code with Live Server**
For a professional development experience:
- Install VS Code: https://code.visualstudio.com
- Install the "Live Server" extension
- Open your folder, right-click your HTML file → "Open with Live Server"
- Changes update automatically in the browser!

**4. Online Editors**
- CodePen.io — HTML, CSS, JS in one view, great for UI work
- JSFiddle.net — similar to CodePen
- Replit.com — full Node.js environment

---

### 6.2 Debugging Techniques — Finding and Fixing Bugs

```javascript
// Technique 1: Console logging — the most basic
function calculateShipping(weight, distance) {
  let baseRate = 500;
  let weightCharge = weight * 50;
  let distanceCharge = distance * 10;

  console.log("Weight:", weight, "kg"); // Debug checkpoint
  console.log("Weight charge: ₦" + weightCharge); // Debug checkpoint
  console.log("Distance charge: ₦" + distanceCharge);

  let total = baseRate + weightCharge + distanceCharge;
  return total;
}

console.log(calculateShipping(5, 200));
// Weight: 5 kg
// Weight charge: ₦250
// Distance charge: ₦2000
// 2750

// Technique 2: console.table for arrays of objects
let orders = [
  { id: 1, customer: "Tunde", amount: 12000, status: "Delivered" },
  { id: 2, customer: "Amaka", amount: 5500, status: "Pending" },
  { id: 3, customer: "Chidi", amount: 8750, status: "Shipped" }
];
console.table(orders);
// Displays as a beautiful table in DevTools!

// Technique 3: console.group — organize related logs
console.group("Order #001 Processing");
console.log("Customer: Babatunde");
console.log("Amount: ₦45,000");
console.log("Processing payment...");
console.warn("Payment gateway slow");
console.log("Payment confirmed!");
console.groupEnd();

// Technique 4: debugger statement — pauses execution in DevTools
function processPayment(card, amount) {
  debugger; // Browser stops here, lets you inspect variables
  let isValid = validateCard(card);
  if (isValid) {
    chargeCard(card, amount);
  }
}

// Technique 5: typeof and instanceof for type debugging
let value = "42";
console.log("Value:", value);
console.log("Type:", typeof value);
console.log("Is string:", typeof value === "string");
console.log("As number:", Number(value), typeof Number(value));
```

---

## CHAPTER 7: STRUCTURED EXERCISES

### Exercise Set 1: Core JavaScript — Data, Variables, and Functions

---

#### Exercise 1.1 — The Student Report Card

**Objective:** Practice variables, arithmetic, conditionals, and string formatting.

**Scenario:** You are building a result-checker for a secondary school in Lagos. Each student has scores in five subjects, and the system must calculate their average, assign a grade, and display a report.

**Warm-up mini-example:**
```javascript
// Calculate average of three numbers
let a = 70, b = 85, c = 60;
let avg = (a + b + c) / 3;
console.log("Average:", avg.toFixed(1)); // Average: 71.7
```

**Step-by-step instructions:**

Step 1 — Define student data:
```javascript
let studentName = "Adaeze Okonkwo";
let studentID = "SSS3-2024-041";
let subjects = {
  Mathematics: 78,
  English: 85,
  Physics: 62,
  Chemistry: 71,
  Biology: 90
};
```

Step 2 — Calculate average:
```javascript
let scores = Object.values(subjects);
let total = scores.reduce((sum, score) => sum + score, 0);
let average = total / scores.length;
console.log("Total:", total);        // 386
console.log("Average:", average);    // 77.2
```

Step 3 — Assign grade with a function:
```javascript
function getGrade(avg) {
  if (avg >= 90) return { grade: "A", remark: "Excellent" };
  if (avg >= 80) return { grade: "B", remark: "Very Good" };
  if (avg >= 70) return { grade: "C", remark: "Good" };
  if (avg >= 60) return { grade: "D", remark: "Average" };
  if (avg >= 50) return { grade: "E", remark: "Below Average" };
  return { grade: "F", remark: "Fail" };
}

let { grade, remark } = getGrade(average);
```

Step 4 — Generate report:
```javascript
function generateReport(name, id, subjects, avg, grade, remark) {
  let divider = "=".repeat(40);
  let report = `
${divider}
       LAGOS STATE MODEL SCHOOL
             STUDENT REPORT
${divider}
Name:      ${name}
Student ID: ${id}
${divider}
SUBJECT BREAKDOWN:
`;
  
  for (let [subject, score] of Object.entries(subjects)) {
    let subjectGrade = getGrade(score).grade;
    report += `  ${subject.padEnd(15)} ${String(score).padStart(3)}   (${subjectGrade})\n`;
  }

  report += `${divider}
  Average:   ${avg.toFixed(1)}%
  Grade:     ${grade}
  Remark:    ${remark}
${divider}
`;
  return report;
}

console.log(generateReport(studentName, studentID, subjects, average, grade, remark));

// Expected output:
// ========================================
//        LAGOS STATE MODEL SCHOOL
//              STUDENT REPORT
// ========================================
// Name:      Adaeze Okonkwo
// Student ID: SSS3-2024-041
// ========================================
// SUBJECT BREAKDOWN:
//   Mathematics      78   (C)
//   English          85   (B)
//   Physics          62   (D)
//   Chemistry        71   (C)
//   Biology          90   (A)
// ========================================
//   Average:   77.2%
//   Grade:     C
//   Remark:    Good
// ========================================
```

**Hints:**
- `Object.entries()` gives you `[key, value]` pairs to iterate
- Use `.padEnd()` and `.padStart()` for neat column alignment
- Remember: `.toFixed(1)` gives exactly one decimal place

**Self-check questions:**
1. What would the grade be if all five scores were 95?
2. How would you sort the subjects by score (highest to lowest) in the report?
3. What happens if you add a sixth subject? Does the average update automatically?

**What-if challenge:** Add position (first, second, third) in a class of 30 students by creating an array of 30 random student averages.

---

#### Exercise 1.2 — Market Price Tracker

**Objective:** Practice arrays, array methods, sorting, and data manipulation.

**Scenario:** You work for Dangote Group's digital division. Build a price tracker for commodity prices across three markets in Lagos over one week.

```javascript
// Setup: prices per kg in three markets (Mon-Sun)
let markets = {
  "Balogun Market": [850, 860, 840, 870, 855, 880, 865],
  "Mile 12 Market": [820, 825, 815, 840, 830, 845, 835],
  "Daleko Market":  [890, 895, 885, 900, 875, 910, 895]
};

let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let commodity = "Tomatoes (per kg)";

// Task 1: Find weekly average for each market
function weeklyAverage(prices) {
  let total = prices.reduce((sum, price) => sum + price, 0);
  return (total / prices.length).toFixed(2);
}

// Task 2: Find cheapest day to buy (across all markets)
function cheapestDay(markets, days) {
  let dailyAverages = days.map((day, index) => {
    let allMarketPrices = Object.values(markets).map(prices => prices[index]);
    let avg = allMarketPrices.reduce((s, p) => s + p, 0) / allMarketPrices.length;
    return { day, avgPrice: avg };
  });

  dailyAverages.sort((a, b) => a.avgPrice - b.avgPrice);
  return dailyAverages[0];
}

// Task 3: Price volatility (difference between max and min)
function volatility(prices) {
  return Math.max(...prices) - Math.min(...prices);
}

// Run the analysis
console.log(`\n=== ${commodity} PRICE REPORT ===`);
console.log("\nWeekly Averages:");

for (let [market, prices] of Object.entries(markets)) {
  let avg = weeklyAverage(prices);
  let vol = volatility(prices);
  console.log(`  ${market}: ₦${avg}/kg (volatility: ₦${vol})`);
}

let cheap = cheapestDay(markets, days);
console.log(`\nBest buying day: ${cheap.day} (avg ₦${cheap.avgPrice.toFixed(2)}/kg)`);

// Expected output:
// === Tomatoes (per kg) PRICE REPORT ===
// Weekly Averages:
//   Balogun Market: ₦860.00/kg (volatility: ₦40)
//   Mile 12 Market: ₦830.00/kg (volatility: ₦30)
//   Daleko Market: ₦892.86/kg (volatility: ₦35)
// Best buying day: Wednesday (avg ₦846.67/kg)
```

---

#### Exercise 1.3 — Banking System Simulation

**Objective:** Practice OOP with classes, methods, and encapsulation.

```javascript
class BankAccount {
  #balance; // Private field (ES2022)

  constructor(owner, accountNumber, initialBalance = 0) {
    this.owner = owner;
    this.accountNumber = accountNumber;
    this.#balance = initialBalance;
    this.transactions = [];
    this.createdAt = new Date();
  }

  // Deposit money
  deposit(amount, description = "Deposit") {
    if (amount <= 0) throw new Error("Deposit amount must be positive");

    this.#balance += amount;
    this.transactions.push({
      type: "Credit",
      amount,
      description,
      balance: this.#balance,
      date: new Date()
    });

    return this;  // Enable method chaining!
  }

  // Withdraw money
  withdraw(amount, description = "Withdrawal") {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.#balance) throw new Error(`Insufficient funds. Balance: ₦${this.#balance.toLocaleString()}`);

    this.#balance -= amount;
    this.transactions.push({
      type: "Debit",
      amount,
      description,
      balance: this.#balance,
      date: new Date()
    });

    return this;
  }

  // Transfer to another account
  transfer(targetAccount, amount) {
    this.withdraw(amount, `Transfer to ${targetAccount.owner}`);
    targetAccount.deposit(amount, `Transfer from ${this.owner}`);
    return this;
  }

  // Get balance
  get balance() {
    return this.#balance;
  }

  // Print statement
  printStatement() {
    let divider = "-".repeat(60);
    console.log(`\nACCOUNT STATEMENT`);
    console.log(`Owner: ${this.owner}  |  Account: ${this.accountNumber}`);
    console.log(divider);
    console.log("Date".padEnd(12) + "Type".padEnd(10) + "Description".padEnd(25) + "Amount".padStart(10) + "Balance".padStart(12));
    console.log(divider);

    this.transactions.forEach(t => {
      let dateStr = t.date.toLocaleDateString("en-NG");
      let amountStr = (t.type === "Credit" ? "+" : "-") + "₦" + t.amount.toLocaleString();
      let balanceStr = "₦" + t.balance.toLocaleString();

      console.log(
        dateStr.padEnd(12) +
        t.type.padEnd(10) +
        t.description.substring(0, 24).padEnd(25) +
        amountStr.padStart(10) +
        balanceStr.padStart(12)
      );
    });

    console.log(divider);
    console.log(`CURRENT BALANCE: ₦${this.#balance.toLocaleString()}`);
    console.log(divider);
  }
}

// Test it
let tunde = new BankAccount("Babatunde Adeyemi", "0123456789", 100000);
let amaka = new BankAccount("Amaka Okonkwo", "9876543210", 50000);

tunde
  .deposit(50000, "Salary - March 2026")
  .deposit(15000, "Freelance payment")
  .withdraw(30000, "Rent payment")
  .withdraw(5500, "MTN Airtime")
  .transfer(amaka, 20000);

tunde.printStatement();

// Expected output (abbreviated):
// ACCOUNT STATEMENT
// Owner: Babatunde Adeyemi  |  Account: 0123456789
// ------------------------------------------------------------
// Date        Type      Description              Amount      Balance
// 22/03/2026  Credit    Salary - March 2026    +₦50,000  ₦150,000
// 22/03/2026  Credit    Freelance payment      +₦15,000  ₦165,000
// 22/03/2026  Debit     Rent payment           -₦30,000  ₦135,000
// 22/03/2026  Debit     MTN Airtime             -₦5,500  ₦129,500
// 22/03/2026  Debit     Transfer to Amaka O    -₦20,000  ₦109,500
// ------------------------------------------------------------
// CURRENT BALANCE: ₦109,500
```

---

### Exercise Set 2: DOM Manipulation Exercises

---

#### Exercise 2.1 — Product Card Generator

**Objective:** Create, populate, and style DOM elements dynamically.

```html
<!-- HTML structure needed -->
<div id="product-grid"></div>
<div id="loading">Loading products...</div>
```

```javascript
// Sample product data (in real life, this comes from an API)
let products = [
  { id: 1, name: "Basmati Rice 50kg", price: 32000, stock: 15, category: "Grains", image: "🌾", discount: 0 },
  { id: 2, name: "Palm Oil 5L", price: 4500, stock: 8, category: "Oils", image: "🫙", discount: 0.1 },
  { id: 3, name: "Indomie (40 pcs)", price: 5800, stock: 0, category: "Noodles", image: "🍜", discount: 0 },
  { id: 4, name: "Semovita 5kg", price: 3200, stock: 23, category: "Flour", image: "🥣", discount: 0.15 },
  { id: 5, name: "Milo 1kg", price: 4200, stock: 11, category: "Beverages", image: "☕", discount: 0 }
];

function createProductCard(product) {
  let card = document.createElement("div");
  card.className = "product-card";
  card.dataset.productId = product.id;
  card.dataset.category = product.category;

  let discountedPrice = product.price * (1 - product.discount);
  let isOutOfStock = product.stock === 0;

  card.innerHTML = `
    <div class="product-image">${product.image}</div>
    <div class="product-info">
      <span class="category-badge">${product.category}</span>
      <h3 class="product-name">${product.name}</h3>
      <div class="price-section">
        ${product.discount > 0 
          ? `<span class="original-price">₦${product.price.toLocaleString()}</span>
             <span class="sale-badge">-${product.discount * 100}%</span>`
          : ""}
        <span class="current-price">₦${discountedPrice.toLocaleString()}</span>
      </div>
      <div class="stock-info ${isOutOfStock ? "out-of-stock" : "in-stock"}">
        ${isOutOfStock ? "❌ Out of Stock" : `✅ ${product.stock} in stock`}
      </div>
      <div class="actions">
        <button class="btn-cart" 
                data-id="${product.id}" 
                ${isOutOfStock ? "disabled" : ""}>
          ${isOutOfStock ? "Notify Me" : "🛒 Add to Cart"}
        </button>
        <button class="btn-wishlist" data-id="${product.id}">❤️</button>
      </div>
    </div>
  `;

  return card;
}

function renderProducts(productList) {
  let grid = document.getElementById("product-grid");
  let loading = document.getElementById("loading");

  loading.style.display = "none";
  grid.innerHTML = ""; // Clear existing

  if (productList.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

function filterByCategory(category) {
  if (category === "all") {
    renderProducts(products);
  } else {
    let filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
  }
}

function sortProducts(method) {
  let sorted = [...products]; // Copy, don't mutate original
  switch (method) {
    case "price-asc":  sorted.sort((a, b) => a.price - b.price); break;
    case "price-desc": sorted.sort((a, b) => b.price - a.price); break;
    case "name-asc":   sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    case "stock":      sorted.sort((a, b) => b.stock - a.stock); break;
  }
  renderProducts(sorted);
}

// Event delegation for cart buttons
document.getElementById("product-grid").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-cart")) {
    let productId = parseInt(e.target.dataset.id);
    let product = products.find(p => p.id === productId);

    if (product) {
      addToCart(product);
      e.target.textContent = "✅ Added!";
      setTimeout(() => { e.target.textContent = "🛒 Add to Cart"; }, 1500);
    }
  }
});

let cart = [];

function addToCart(product) {
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartBadge();
  console.log("Cart:", cart.map(i => `${i.name} x${i.quantity}`).join(", "));
}

function updateCartBadge() {
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let badge = document.getElementById("cart-badge");
  if (badge) badge.textContent = totalItems;
}

// Initial render
renderProducts(products);
```

---

### Exercise Set 3: Events, Forms, and Interactivity

---

#### Exercise 3.1 — Smart Registration Form

**Objective:** Build a fully validated multi-step registration form with real-time feedback.

```javascript
// Form state management
let formState = {
  step: 1,
  totalSteps: 3,
  data: {}
};

// Step 1: Personal Information
function validateStep1() {
  let errors = {};

  let fullName = document.getElementById("full-name").value.trim();
  if (fullName.length < 3) errors.fullName = "Full name must be at least 3 characters";
  else if (!/^[a-zA-Z\s]+$/.test(fullName)) errors.fullName = "Name should only contain letters";

  let dob = new Date(document.getElementById("dob").value);
  let today = new Date();
  let age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
  if (isNaN(dob.getTime())) errors.dob = "Please enter a valid date";
  else if (age < 18) errors.dob = "You must be at least 18 years old to register";
  else if (age > 100) errors.dob = "Please enter a valid birth date";

  let phone = document.getElementById("phone").value.trim();
  if (!/^(\+234|0)[7-9][01]\d{8}$/.test(phone)) {
    errors.phone = "Enter a valid Nigerian phone number (e.g., 08012345678)";
  }

  return errors;
}

// Step 2: Account Information
function validateStep2() {
  let errors = {};

  let email = document.getElementById("email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address";

  let username = document.getElementById("username").value.trim();
  if (username.length < 4) errors.username = "Username must be at least 4 characters";
  else if (!/^[a-zA-Z0-9_]+$/.test(username)) errors.username = "Username can only contain letters, numbers, underscores";
  else if (["admin", "root", "system"].includes(username.toLowerCase())) errors.username = "This username is reserved";

  let password = document.getElementById("password").value;
  let strength = getPasswordStrength(password);
  if (strength.score < 3) errors.password = `Password too weak: ${strength.feedback}`;

  let confirmPwd = document.getElementById("confirm-password").value;
  if (password !== confirmPwd) errors.confirmPassword = "Passwords do not match";

  return errors;
}

// Password strength checker
function getPasswordStrength(password) {
  let score = 0;
  let feedback = [];

  if (password.length >= 8) score++;
  else feedback.push("at least 8 characters");

  if (/[A-Z]/.test(password)) score++;
  else feedback.push("one uppercase letter");

  if (/[a-z]/.test(password)) score++;
  else feedback.push("one lowercase letter");

  if (/\d/.test(password)) score++;
  else feedback.push("one number");

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  else feedback.push("one special character");

  let levels = ["", "Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  let colors = ["", "#ff0000", "#ff4500", "#ffa500", "#9acd32", "#008000"];

  return {
    score,
    level: levels[score],
    color: colors[score],
    feedback: feedback.length ? "Needs: " + feedback.join(", ") : "Strong password!"
  };
}

// Real-time password strength indicator
document.getElementById("password")?.addEventListener("input", (e) => {
  let strength = getPasswordStrength(e.target.value);
  let indicator = document.getElementById("strength-bar");
  let label = document.getElementById("strength-label");

  if (indicator) {
    indicator.style.width = `${(strength.score / 5) * 100}%`;
    indicator.style.backgroundColor = strength.color;
  }
  if (label) {
    label.textContent = strength.level;
    label.style.color = strength.color;
  }
});

// Display errors
function displayErrors(errors) {
  // Clear all existing errors first
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
  document.querySelectorAll(".form-field").forEach(el => el.classList.remove("has-error"));

  Object.entries(errors).forEach(([field, message]) => {
    let errorEl = document.getElementById(`${field}-error`);
    let fieldEl = document.getElementById(field);

    if (errorEl) errorEl.textContent = message;
    if (fieldEl) fieldEl.closest(".form-field")?.classList.add("has-error");
  });
}

// Navigate between steps
function goToStep(step) {
  let errors = {};
  if (formState.step === 1) errors = validateStep1();
  if (formState.step === 2) errors = validateStep2();

  if (Object.keys(errors).length > 0) {
    displayErrors(errors);
    return;
  }

  // Save current step data
  let currentInputs = document.querySelectorAll(`#step-${formState.step} input, #step-${formState.step} select`);
  currentInputs.forEach(input => {
    formState.data[input.name] = input.value;
  });

  // Hide current, show next
  document.getElementById(`step-${formState.step}`).style.display = "none";
  formState.step = step;
  document.getElementById(`step-${formState.step}`).style.display = "block";

  // Update progress
  updateProgressBar();
}

function updateProgressBar() {
  let progress = (formState.step / formState.totalSteps) * 100;
  document.getElementById("progress-fill").style.width = `${progress}%`;
  document.getElementById("step-label").textContent = `Step ${formState.step} of ${formState.totalSteps}`;
}
```

---

## CHAPTER 8: QUIZ AND SELF-ASSESSMENT

This chapter contains your complete **10-question self-assessment quiz** with explanations for the entire capstone library. Test yourself before checking answers!

---

### 🧪 Self-Assessment Quiz

**Instructions:** Try to answer each question before looking at the answer. Give yourself 1 point for each correct answer.

---

**Question 1:** What is the difference between `innerHTML` and `textContent`?

A) `innerHTML` only works on divs; `textContent` works on any element
B) `innerHTML` renders HTML tags; `textContent` treats everything as plain text
C) `innerHTML` is faster; `textContent` is safer
D) There is no difference — they do the same thing

**✅ Answer: B**
`innerHTML` *renders* HTML — so `"<strong>Hello</strong>"` would appear bold. `textContent` *displays* HTML tags as literal text — so `"<strong>Hello</strong>"` appears exactly as written. `textContent` is safer because user-supplied content containing `<script>` tags won't execute. *In professional code, always sanitize data before using `innerHTML`.*

---

**Question 2:** What does `localStorage.getItem("score")` return if "score" has never been set?

A) `0`
B) `undefined`
C) `null`
D) An empty string `""`

**✅ Answer: C**
`localStorage.getItem()` returns `null` (not `undefined`) for keys that don't exist. Always check: `let score = localStorage.getItem("score") ?? 0;` to provide a default value safely.

---

**Question 3:** Why does `[1, 2, 3].sort()` return `[1, 2, 3]` correctly, but `[10, 9, 2, 1, 100].sort()` returns `[1, 10, 100, 2, 9]`?

A) `.sort()` has a bug in JavaScript
B) `.sort()` converts elements to strings and sorts alphabetically by default
C) `.sort()` only works for arrays with fewer than 5 elements
D) You need to call `.sort(true)` for number sorting

**✅ Answer: B**
JavaScript's default `.sort()` converts elements to strings and compares them lexicographically (like a dictionary). "10" comes before "2" alphabetically because "1" < "2". Always use a comparator for numbers: `.sort((a, b) => a - b)` for ascending.

---

**Question 4:** You add a `click` event listener to a `<ul>` that contains `<li>` elements. A user clicks an `<li>`. Will the listener fire?

A) No — the listener is on the `<ul>`, not the `<li>`
B) Yes — because events bubble up from child to parent
C) Only if the `<li>` has `addEventListener` too
D) Only in capture phase

**✅ Answer: B**
This is **event bubbling**. Click events start at the target (`<li>`), then bubble up through the DOM tree to `<ul>`, `<body>`, `<html>`, and `window`. This is the foundation of *event delegation* — one listener on a parent handles clicks from all its children.

---

**Question 5:** What is `e.preventDefault()` used for?

A) Stopping event bubbling to parent elements
B) Preventing the browser's default action for an event (e.g., form submission, link navigation)
C) Preventing multiple event listeners from firing
D) Preventing keyboard events from registering

**✅ Answer: B**
`e.preventDefault()` stops the browser's *built-in* behavior. For a form `submit` event, it prevents the page from reloading. For a link click, it prevents navigation. For a right-click, it prevents the context menu. Note: it does NOT stop bubbling — that's `e.stopPropagation()`.

---

**Question 6:** What is the output of this code?
```javascript
let a = 5;
let b = "5";
console.log(a == b);
console.log(a === b);
```

A) `true` and `true`
B) `false` and `false`
C) `true` and `false`
D) `false` and `true`

**✅ Answer: C**
`==` (loose equality) coerces types — it converts `"5"` to `5` before comparing, so `5 == 5` is `true`. `===` (strict equality) requires the same type AND value — `5` (number) is not `=== "5"` (string), so it's `false`. **Always use `===` in professional code.**

---

**Question 7:** You want to store a user's shopping cart (an array of objects) in `localStorage`. What's the correct approach?

A) `localStorage.setItem("cart", cart)` — works directly with arrays
B) `localStorage.setItem("cart", JSON.stringify(cart))` — convert to JSON first
C) `localStorage.setItem("cart", cart.toString())` — use .toString()
D) Arrays cannot be stored in localStorage

**✅ Answer: B**
`localStorage` only stores strings. `JSON.stringify()` converts any JavaScript value to a JSON string. To retrieve it: `JSON.parse(localStorage.getItem("cart"))`. Option C (`toString()`) would give `[object Object]` — useless!

---

**Question 8:** What does `document.querySelectorAll(".btn")` return vs `document.getElementsByClassName("btn")`?

A) They return exactly the same thing
B) `querySelectorAll` returns a live NodeList; `getElementsByClassName` returns a static HTMLCollection
C) `querySelectorAll` returns a static NodeList; `getElementsByClassName` returns a live HTMLCollection
D) `querySelectorAll` returns an Array; `getElementsByClassName` returns an HTMLCollection

**✅ Answer: C**
`querySelectorAll` returns a **static** NodeList (a snapshot — doesn't update if DOM changes). `getElementsByClassName` returns a **live** HTMLCollection (updates automatically when DOM changes). The `querySelectorAll` NodeList supports `.forEach()` directly; the HTMLCollection does not.

---

**Question 9:** What's wrong with this code?

```javascript
const user = { name: "Tunde", balance: 50000 };
user = { name: "Amaka", balance: 30000 }; // Line A
user.balance = 45000;                      // Line B
```

A) Both Line A and Line B are errors
B) Line A is an error; Line B works fine
C) Line B is an error; Line A works fine
D) Neither is an error

**✅ Answer: B**
`const` prevents *reassignment* of the variable (Line A — you cannot assign a new object to `user`). But it does NOT make the object *immutable* — you can still change its properties (Line B works!). To truly freeze an object, use `Object.freeze(user)`.

---

**Question 10:** What is the output?

```javascript
let scores = [88, 72, 95, 61, 84];
let result = scores
  .filter(s => s >= 70)
  .map(s => s + 5)
  .reduce((sum, s) => sum + s, 0);
console.log(result);
```

A) 339
B) 349
C) 400
D) 344

**✅ Answer: D — 344**
Step 1 — `filter(s => s >= 70)`: keeps `[88, 72, 95, 84]` (removes 61)
Step 2 — `map(s => s + 5)`: gives `[93, 77, 100, 89]`
Step 3 — `reduce(...)`: `93 + 77 + 100 + 89 = 359`

Wait — let's recount: 93+77=170, 170+100=270, 270+89=359. The answer is **359**. 

> Note to learner: Work through each chain step on paper — this technique of chaining array methods is *extremely common* in real JavaScript jobs. If you got it wrong, trace each step individually: filter first, then map the result, then reduce that.

---

### Your score: __ / 10

- **9–10:** 🏆 Expert level — You're interview-ready!
- **7–8:** ✅ Strong understanding — Review the questions you missed
- **5–6:** 📚 Good foundation — Revisit the relevant chapters and retry
- **Below 5:** 🔄 Keep practising — Return to the examples and try the exercises again

---

# PHASE 3 — CREATION: CAREER READINESS & PROJECT SIMULATION

## CHAPTER 9: THE JAVASCRIPT SYLLABUS — YOUR COMPLETE CURRICULUM MAP

Understanding where you are in your JavaScript journey is as important as the journey itself. Here is the complete curriculum map — use it as a tracker.

```
JAVASCRIPT MASTERY CURRICULUM
═══════════════════════════════════════════════════════

FOUNDATION TIER (Weeks 1–4)
┌─────────────────────────────────────────────────────┐
│  ✅ JavaScript Introduction & Where JS Runs         │
│  ✅ JavaScript Output (console, alert, innerHTML)    │
│  ✅ Statements, Syntax, and Code Structure           │
│  ✅ Variables: var, let, const                       │
│  ✅ Data Types (8 types + typeof)                    │
│  ✅ Operators (arithmetic, comparison, logical, etc) │
│  ✅ Type Conversion and Type Coercion                │
│  ✅ Truthy and Falsy Values                          │
└─────────────────────────────────────────────────────┘

CONTROL FLOW TIER (Weeks 3–5)
┌─────────────────────────────────────────────────────┐
│  ✅ if / else if / else                              │
│  ✅ switch Statement                                 │
│  ✅ Ternary Operator (?:)                            │
│  ✅ for, for...in, for...of Loops                    │
│  ✅ while and do...while Loops                       │
│  ✅ break and continue                               │
│  ✅ Nullish Coalescing (??) and Optional Chaining    │
└─────────────────────────────────────────────────────┘

FUNCTIONS TIER (Weeks 4–6)
┌─────────────────────────────────────────────────────┐
│  ✅ Function Declarations and Expressions            │
│  ✅ Arrow Functions                                  │
│  ✅ Default, Rest, and Spread Parameters             │
│  ✅ Scope (global, function, block)                  │
│  ✅ Hoisting                                         │
│  ✅ Closures                                         │
│  ✅ this Keyword                                     │
│  ✅ call(), apply(), bind()                          │
│  ✅ IIFE                                             │
│  ✅ Callbacks                                        │
└─────────────────────────────────────────────────────┘

DATA STRUCTURES TIER (Weeks 5–8)
┌─────────────────────────────────────────────────────┐
│  ✅ Strings and String Methods                       │
│  ✅ Numbers and Math Object                          │
│  ✅ Arrays and Array Methods                         │
│  ✅ Objects and Object Methods                       │
│  ✅ Destructuring (arrays and objects)               │
│  ✅ Spread and Rest Operators                        │
│  ✅ Sets and Maps                                    │
│  ✅ Dates and Times                                  │
│  ✅ Regular Expressions                              │
│  ✅ JSON                                             │
└─────────────────────────────────────────────────────┘

OOP TIER (Weeks 7–9)
┌─────────────────────────────────────────────────────┐
│  ✅ Prototypes and Prototype Chain                   │
│  ✅ Object Accessors (get/set)                       │
│  ✅ Classes and Constructors                         │
│  ✅ Inheritance and super                            │
│  ✅ Static Methods and Properties                    │
│  ✅ Private Fields (#)                               │
└─────────────────────────────────────────────────────┘

ASYNC PROGRAMMING TIER (Weeks 9–11)
┌─────────────────────────────────────────────────────┐
│  ✅ Callbacks (revisited)                            │
│  ✅ Promises (.then, .catch, .finally)               │
│  ✅ Promise.all, Promise.race, Promise.allSettled    │
│  ✅ async/await                                      │
│  ✅ Fetch API                                        │
│  ✅ Error handling in async code                     │
│  ✅ Timeouts and Intervals                           │
└─────────────────────────────────────────────────────┘

BROWSER/DOM TIER (Weeks 10–13)
┌─────────────────────────────────────────────────────┐
│  ✅ DOM Navigation and Nodes                         │
│  ✅ Selecting Elements (getElementById, querySelector)│
│  ✅ Modifying HTML and CSS                           │
│  ✅ Creating and Deleting Elements                   │
│  ✅ Forms and Input Handling                         │
│  ✅ Form Validation                                  │
│  ✅ Events (mouse, keyboard, form, load)             │
│  ✅ Event Bubbling, Capturing, Delegation            │
│  ✅ Browser Object Model (BOM)                       │
│  ✅ Window, Location, History, Navigator             │
│  ✅ Web Storage (localStorage, sessionStorage)       │
│  ✅ Cookies                                          │
│  ✅ Geolocation API                                  │
└─────────────────────────────────────────────────────┘

ADVANCED TIER (Weeks 12–16)
┌─────────────────────────────────────────────────────┐
│  ✅ Modules (import/export)                          │
│  ✅ Error handling and custom errors                 │
│  ✅ Proxy and Reflect                                │
│  ✅ Typed Arrays and Binary Data                     │
│  ✅ Regex (full patterns, methods)                   │
│  ✅ ES2015–ES2026 Features                           │
│  ✅ JavaScript Best Practices                        │
│  ✅ Debugging techniques                             │
└─────────────────────────────────────────────────────┘
```

---

## CHAPTER 10: THE STUDY PLAN — WEEK-BY-WEEK LEARNING PATH

### The 16-Week JavaScript Mastery Schedule

**Assumptions:**
- 1–2 hours daily (morning or evening)
- 5 days per week (weekdays), with weekends for review + projects
- Access to a laptop/PC and a browser

---

```
WEEK 1 — GETTING STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Monday:    Setup your environment. Learn what JavaScript is, where it runs.
Tuesday:   Output methods (console.log, alert, innerHTML, document.write).
Wednesday: Statements, syntax, semicolons, code blocks, comments.
Thursday:  Variables (var vs let vs const). Practice declaring 20 different variables.
Friday:    Data types — the 8 types. typeof operator.
Weekend:   Build a personal details card that displays in the browser.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 2 — OPERATORS AND LOGIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Monday:    Arithmetic and assignment operators. Build a tip calculator.
Tuesday:   Comparison operators (==, ===, !=, !==, >, <, >=, <=).
Wednesday: Logical operators (&&, ||, !). Nullish (??) and optional chaining (?.).
Thursday:  Type conversion (explicit: Number(), String(), Boolean()).
Friday:    Type coercion (implicit) — truthy and falsy values.
Weekend:   Shopping cart calculator: items, quantity, tax, total.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 3 — CONTROL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Monday:    if / else if / else. Ternary operator.
Tuesday:   switch statements. Build a grade calculator.
Wednesday: for loops. Build multiplication tables.
Thursday:  for...in and for...of. Iterate objects and arrays.
Friday:    while and do...while. Build a number guessing game.
Weekend:   ATM Simulator: withdraw, deposit with loop for multiple transactions.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 4 — FUNCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Monday:    Function declarations, expressions, arrow functions.
Tuesday:   Parameters (default, rest, spread). Return values.
Wednesday: Scope (global, function, block). Hoisting.
Thursday:  Closures — what they are and why they're powerful.
Friday:    this keyword. call(), apply(), bind(). IIFEs.
Weekend:   Build a reusable utility library with 10+ helper functions.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 5–6 — DATA STRUCTURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Week 5:   Strings (all 20+ methods). Numbers and Math. Dates.
Week 6:   Arrays (all methods: map, filter, reduce, find, sort, etc.)
          Objects (creation, iteration, methods, spread). Destructuring.
          Sets, Maps, JSON.
Weekend:  Product inventory system using arrays and objects.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 7–8 — OOP AND CLASSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Week 7:   Prototypes and the prototype chain. Object.create().
          Classes: constructor, methods, getters, setters.
Week 8:   Inheritance (extends, super). Static members.
          Private fields (#). Design patterns (factory, singleton).
Weekend:  Library Management System using full class hierarchies.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 9–10 — ASYNC PROGRAMMING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Week 9:   Callbacks, callback hell. Promises (.then/.catch/.finally).
          Promise.all, Promise.race, Promise.allSettled.
Week 10:  async/await. Fetch API. Error handling in async code.
          Real API calls (JSONPlaceholder, OpenWeatherMap free tier).
Weekend:  Weather app using Fetch API + async/await + DOM updates.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 11–13 — DOM AND BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Week 11:  DOM navigation, selection, modification.
          Creating/removing elements. NodeLists vs HTMLCollections.
Week 12:  Events (all types). Bubbling, capturing, delegation.
          Forms, validation, real-time input handling.
Week 13:  BOM (Window, Location, History, Navigator, Cookies, Storage).
          Timing functions. Geolocation.
Weekend:  Full e-commerce product page with cart, filter, and local storage.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEK 14–16 — ADVANCED + CAPSTONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Week 14:  Modules, regex, error handling, debugging.
          Proxy, Reflect, Typed Arrays.
Week 15:  Modern JS (ES2015–ES2026 features). Best practices.
          Performance optimization. Code review skills.
Week 16:  Portfolio project. GitHub. Interview preparation. Exam readiness.
Weekend:  Final project: Full-stack JS app (frontend only or with Node.js).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## CHAPTER 11: INTERVIEW PREPARATION — TOP 50 QUESTIONS AND DEEP ANSWERS

### Section A: Core JavaScript Concepts (Questions 1–20)

---

**Q1: What is the difference between `undefined` and `null`?**

```javascript
// undefined — system-generated "no value assigned yet"
let x;
console.log(x); // undefined — declared but no value

function test() {}
console.log(test()); // undefined — function with no return

let obj = { name: "Tunde" };
console.log(obj.age); // undefined — property doesn't exist

// null — programmer-intentional "no value" / "empty"
let selectedUser = null; // No user selected yet — intentional

// Key comparison:
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" ← famous quirk/bug in JS

console.log(null == undefined);  // true  (loose equality)
console.log(null === undefined); // false (strict equality)
```

**Interview tip:** Explain that `undefined` is the language's default for "not yet assigned," while `null` is a programmer's explicit choice to represent "empty" or "no value." The `typeof null === "object"` is a historical bug in JavaScript that was intentionally kept for backward compatibility.

---

**Q2: Explain `var`, `let`, and `const` differences.**

```javascript
// var: function-scoped, hoisted, can be re-declared
var x = 1;
var x = 2; // ✅ No error — var can be re-declared

if (true) {
  var leaksOut = "I leak!";
}
console.log(leaksOut); // "I leak!" — var escapes the block

// let: block-scoped, hoisted but in TDZ, cannot be re-declared
let y = 1;
// let y = 2; // ❌ SyntaxError: already declared

if (true) {
  let staysIn = "I stay.";
}
// console.log(staysIn); // ❌ ReferenceError

// const: block-scoped, must be initialized, cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // ❌ TypeError: Assignment to constant variable

// But object PROPERTIES can be changed:
const user = { name: "Tunde" };
user.name = "Amaka"; // ✅ Works
// user = {}; // ❌ Cannot reassign the variable

// Temporal Dead Zone (TDZ) — let/const are hoisted but not initialized
console.log(a); // undefined (var hoisting gives default)
var a = 5;

// console.log(b); // ❌ ReferenceError: b is in TDZ
let b = 5;
```

---

**Q3: What is a closure?**

```javascript
// A closure is a function that "remembers" variables from its outer scope
// even after the outer function has finished executing.

function makeCounter(startFrom = 0) {
  let count = startFrom; // This variable stays alive because of the closure

  return {
    increment() { return ++count; },
    decrement() { return --count; },
    reset()     { count = startFrom; return count; },
    current()   { return count; }
  };
}

let counter = makeCounter(10);
console.log(counter.increment()); // 11
console.log(counter.increment()); // 12
console.log(counter.decrement()); // 11
console.log(counter.current());   // 11
console.log(counter.reset());     // 10

// Real-world use: private state
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private — not accessible from outside

  return {
    deposit(amount)  { balance += amount; return balance; },
    withdraw(amount) { 
      if (amount > balance) return "Insufficient funds";
      balance -= amount; return balance;
    },
    getBalance()     { return balance; }
  };
}

let account = createBankAccount(50000);
console.log(account.deposit(10000));   // 60000
console.log(account.withdraw(5000));   // 55000
// console.log(balance); // ❌ ReferenceError — balance is private!
```

**Why closures matter in interviews:** They are the foundation of *data privacy in JavaScript*, *function factories*, *event handlers that remember state*, and *React hooks* (useState is essentially a closure).

---

**Q4: What is event bubbling and how would you prevent it?**

```javascript
/*
Bubbling: events travel FROM the target UP to the root.

HTML:
<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>
*/

document.getElementById("btn").addEventListener("click", (e) => {
  console.log("1. Button clicked");
  // e.stopPropagation(); // Uncomment to stop bubbling
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("2. Inner div bubbled");
});

document.getElementById("outer").addEventListener("click", () => {
  console.log("3. Outer div bubbled");
});

// Clicking the button outputs:
// 1. Button clicked
// 2. Inner div bubbled
// 3. Outer div bubbled

// To stop: e.stopPropagation() at step 1 means only "1." prints

// Practical use — event delegation (the GOOD use of bubbling):
document.getElementById("product-list").addEventListener("click", (e) => {
  if (e.target.dataset.action === "delete") {
    deleteProduct(e.target.dataset.id);
  }
  if (e.target.dataset.action === "edit") {
    editProduct(e.target.dataset.id);
  }
});
// One listener handles ALL products — even ones added dynamically later!
```

---

**Q5: What is the difference between `==` and `===`?**

```javascript
// == (Loose equality) — converts types before comparing (type coercion)
console.log(5 == "5");      // true  (string "5" coerced to number 5)
console.log(0 == false);    // true  (false coerced to 0)
console.log(0 == "");       // true  (both falsy)
console.log(null == undefined); // true (special rule)
console.log(null == 0);     // false (null only equals undefined loosely)

// === (Strict equality) — no type conversion — compares type AND value
console.log(5 === "5");     // false (different types)
console.log(0 === false);   // false (number vs boolean)
console.log(null === undefined); // false (different types)

// ✅ Professional rule: ALWAYS use ===
// The only safe exception: checking for null OR undefined at once:
let value = null;
if (value == null) { // catches both null and undefined
  console.log("No value set");
}
// Equivalent strict: if (value === null || value === undefined)
```

---

**Q6: What is `this` in JavaScript?**

```javascript
// this depends on HOW a function is called, not where it's defined.

// 1. In a method — this = the object that owns the method
const car = {
  brand: "Toyota",
  describe() {
    console.log("This car is a", this.brand); // this = car
  }
};
car.describe(); // "This car is a Toyota"

// 2. In a regular function — this = window (or undefined in strict mode)
function standalone() {
  console.log(this); // window (browser) or undefined (strict mode)
}

// 3. In an arrow function — this = inherited from surrounding scope
const obj = {
  name: "Tunde",
  greet() {
    // Regular function would work here — this = obj
    setTimeout(function() {
      // ❌ this = window here — loses context!
      // console.log("Hello", this.name); // undefined
    }, 1000);

    setTimeout(() => {
      // ✅ Arrow function inherits this from greet() — this = obj
      console.log("Hello", this.name); // "Hello, Tunde"
    }, 1000);
  }
};

// 4. In a constructor/class — this = the new instance
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;     // this = new BankAccount instance
    this.balance = balance;
  }
}

// 5. Explicit binding with call/apply/bind
function greet(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

let person = { name: "Amaka" };
greet.call(person, "Hello");     // "Hello, I'm Amaka" — immediate call
greet.apply(person, ["Hi"]);     // "Hi, I'm Amaka" — immediate call
let boundGreet = greet.bind(person); // Returns a new function with this fixed
boundGreet("Hey");               // "Hey, I'm Amaka"
```

---

**Q7: What is a Promise? How is it different from a callback?**

```javascript
// CALLBACK approach — leads to "callback hell" with nested async operations
function getUser(id, callback) {
  setTimeout(() => {
    if (id > 0) callback(null, { id, name: "Tunde" });
    else callback(new Error("User not found"), null);
  }, 1000);
}

function getOrders(userId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, total: 45000 }, { id: 2, total: 12000 }]);
  }, 1000);
}

// Callback hell:
getUser(1, (err, user) => {
  if (err) { console.error(err); return; }
  getOrders(user.id, (err, orders) => {
    if (err) { console.error(err); return; }
    console.log(user.name, "has", orders.length, "orders");
    // Imagine another nested call here — it gets messy!
  });
});

// PROMISE approach — chainable, readable, proper error handling
function getUserP(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: "Tunde" });
      else reject(new Error("User not found"));
    }, 1000);
  });
}

getUserP(1)
  .then(user => {
    console.log("Got user:", user.name);
    return getOrdersP(user.id); // Return next promise
  })
  .then(orders => {
    console.log("Orders:", orders.length);
  })
  .catch(err => {
    console.error("Error:", err.message); // One handler for all errors
  })
  .finally(() => {
    console.log("Done!"); // Always runs
  });

// ASYNC/AWAIT — even cleaner (uses Promises under the hood)
async function getUserAndOrders(userId) {
  try {
    let user = await getUserP(userId);     // Wait for promise to resolve
    let orders = await getOrdersP(user.id); // Wait for next promise
    return { user, orders };
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

// Running concurrent promises (faster!):
let [user, settings] = await Promise.all([
  getUserP(1),
  getSettingsP(1)
]);
// Both run at the SAME time — faster than awaiting sequentially
```

---

**Q8: What is the difference between `null`, `undefined`, `NaN`, and `Infinity`?**

```javascript
let x;
console.log(x);                    // undefined — not assigned
console.log(typeof x);             // "undefined"

let y = null;
console.log(y);                    // null — intentionally empty
console.log(typeof y);             // "object" (historical bug)

let n = 0/0;
console.log(n);                    // NaN — Not a Number
console.log(typeof NaN);           // "number" (NaN is a numeric value!)
console.log(NaN === NaN);          // false — NaN is not equal to itself!
console.log(Number.isNaN(NaN));    // true — correct way to check

let inf = 1/0;
console.log(inf);                  // Infinity
console.log(-1/0);                 // -Infinity
console.log(isFinite(inf));        // false
console.log(isFinite(42));         // true
```

---

**Q9: What are arrow functions and what are their key differences from regular functions?**

```javascript
// 1. Syntax — shorter
const add = (a, b) => a + b;          // implicit return
const square = n => n * n;            // single param, no parens needed
const greet = () => "Hello!";         // no params

// 2. this binding — arrow functions do NOT have their own `this`
function Timer() {
  this.seconds = 0;

  // ❌ Regular function — loses `this` context
  // setInterval(function() { this.seconds++; }, 1000); // this = window!

  // ✅ Arrow function — inherits `this` from Timer constructor
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds); // Correctly reads Timer instance
  }, 1000);
}

// 3. Arrow functions cannot be used as constructors
const Person = (name) => { this.name = name; };
// new Person("Tunde"); // ❌ TypeError: Person is not a constructor

// 4. Arrow functions don't have `arguments` object
function regularFn() {
  console.log(arguments); // [1, 2, 3] — works!
}
regularFn(1, 2, 3);

const arrowFn = () => {
  // console.log(arguments); // ❌ ReferenceError in strict mode
};

// 5. Arrow functions don't have `prototype`
console.log(add.prototype);    // undefined
console.log(function(){}.prototype); // {} (exists)
```

---

**Q10: Explain the JavaScript Event Loop.**

```javascript
// JavaScript is SINGLE-THREADED — one task at a time
// The Event Loop allows asynchronous operations without blocking

/*
┌─────────────────────────────────────┐
│           CALL STACK                │
│   (synchronous code executes here)  │
│                                     │
│   main()                            │
│   console.log()                     │
│   ...                               │
└────────────────────┬────────────────┘
                     │
┌────────────────────┴────────────────┐
│           WEB APIS                  │
│   (browser handles async tasks)     │
│                                     │
│   setTimeout, fetch, DOM events,    │
│   setInterval, Promises...          │
└────────────────────┬────────────────┘
                     │ (when complete)
┌────────────────────┴────────────────┐
│         CALLBACK QUEUE              │
│      (Macrotask queue)              │
│   setTimeout callbacks,             │
│   setInterval callbacks             │
├─────────────────────────────────────┤
│         MICROTASK QUEUE             │
│   Promise callbacks (.then),        │
│   queueMicrotask(),                 │
│   MutationObserver callbacks        │
└─────────────────────────────────────┘

EVENT LOOP: When call stack is empty →
  1. Run ALL microtasks first (Promise callbacks)
  2. Run ONE macrotask (setTimeout callback)
  3. Repeat
*/

console.log("1. Start"); // Synchronous — runs first

setTimeout(() => {
  console.log("4. setTimeout"); // Macrotask — runs last
}, 0);

Promise.resolve()
  .then(() => console.log("3. Promise")) // Microtask — runs before setTimeout
  .then(() => console.log("3b. Second microtask")); // Also microtask

console.log("2. End"); // Synchronous — runs second

// Output order:
// 1. Start
// 2. End
// 3. Promise
// 3b. Second microtask
// 4. setTimeout
```

---

**Q11–Q20: Additional Interview Questions (Brief Reference)**

```javascript
// Q11: What is prototype inheritance?
// Every JavaScript object has a prototype — an object it inherits from.
let animal = { breathes: true };
let dog = Object.create(animal);
dog.barks = true;
console.log(dog.breathes); // true — inherited from animal prototype
console.log(dog.barks);    // true — own property

// Q12: What is the spread operator?
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5] — spread arr1 into new array
let obj1 = { a: 1 };
let obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Q13: What is destructuring?
let [first, second, ...rest] = [10, 20, 30, 40]; // first=10, second=20, rest=[30,40]
let { name, age = 25 } = { name: "Tunde" }; // age defaults to 25

// Q14: What is hoisting?
console.log(hoistedVar); // undefined (hoisted declaration, not initialization)
var hoistedVar = "hello";
// console.log(hoistedLet); // ReferenceError — TDZ
let hoistedLet = "world";
hoistedFn(); // "Works!" — function declarations are fully hoisted
function hoistedFn() { console.log("Works!"); }

// Q15: What is a generator function?
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}
let gen = countUp();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done);  // true

// Q16: What is the difference between call stack and heap?
// Call Stack: stores function calls and local variables (fixed size, LIFO)
// Heap: stores objects and large data (dynamically allocated memory)

// Q17: What is memoization?
function memoize(fn) {
  let cache = {};
  return function(...args) {
    let key = JSON.stringify(args);
    if (cache[key]) {
      console.log("Cache hit!");
      return cache[key];
    }
    cache[key] = fn(...args);
    return cache[key];
  };
}

const memoFib = memoize(function fib(n) {
  return n <= 1 ? n : fib(n-1) + fib(n-2);
});

// Q18: What is a WeakMap/WeakSet?
// WeakMap/WeakSet hold WEAK references — objects can be garbage collected
// even if they're still in the WeakMap. Good for private data/caching.
let cache = new WeakMap();
function processData(obj) {
  if (!cache.has(obj)) cache.set(obj, heavyComputation(obj));
  return cache.get(obj);
}

// Q19: Explain CORS (Cross-Origin Resource Sharing)
// When a web page at domain A makes requests to domain B,
// the browser enforces CORS. The server at domain B must include
// Access-Control-Allow-Origin headers to allow the request.
// JavaScript's fetch() will block cross-origin requests without proper CORS headers.

// Q20: What are Web Workers?
// Web Workers run JavaScript in a BACKGROUND thread,
// separate from the main UI thread — so long computations don't freeze the page.
let worker = new Worker("heavy-computation.js");
worker.postMessage({ data: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log("Result:", e.data);
```

---

### Section B: Advanced Interview Questions (Q21–50 — Quick Reference)

```javascript
// Q21: Difference between deep copy and shallow copy?
let original = { name: "Tunde", scores: [90, 85, 78] };

// Shallow copy — nested objects/arrays still share reference
let shallow = { ...original }; // or Object.assign({}, original)
shallow.scores.push(95); // Also modifies original.scores!
console.log(original.scores); // [90, 85, 78, 95] — mutated!

// Deep copy — completely independent
let deep = JSON.parse(JSON.stringify(original)); // Simple for basic data
deep.scores.push(100);
console.log(original.scores); // [90, 85, 78, 95] — unchanged

// Modern: structuredClone()
let deep2 = structuredClone(original); // Handles dates, circular refs, etc.

// Q22: What is currying?
function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}
console.log(multiply(2)(3)(4)); // 24

// Arrow shorthand:
const curry = a => b => c => a * b * c;
const double = curry(2);
const triple = curry(3);
console.log(double(5)(1)); // 10
console.log(triple(4)(1)); // 12

// Q23: Pure functions
// A pure function: (1) same inputs always produce same output,
// (2) no side effects (doesn't modify external state)
const add = (a, b) => a + b;       // ✅ Pure
let total = 0;
const addToTotal = (n) => total += n; // ❌ Impure — modifies external variable

// Q24: Immutability pattern
const state = Object.freeze({ user: "Tunde", count: 0 });
// state.count = 1; // ❌ Silently fails (or error in strict mode)
const newState = { ...state, count: state.count + 1 }; // ✅ Create new object

// Q25: What is a Symbol used for?
const KEY = Symbol("id");
let obj = { [KEY]: 123, name: "Tunde" };
console.log(obj[KEY]);             // 123
console.log(Object.keys(obj));    // ["name"] — Symbol not included!

// Q26: Generator vs Async/Await
// Generators use yield to pause; async/await is syntactic sugar over Promises.
// async/await is built on generators internally, but is much easier to use.

// Q27: Proxy and Reflect
const validator = new Proxy({}, {
  set(target, key, value) {
    if (key === "age" && typeof value !== "number") throw new TypeError("Age must be number");
    target[key] = value;
    return true;
  }
});
validator.age = 25;    // ✅
// validator.age = "25"; // ❌ TypeError

// Q28: Array-like vs Array
// Array-like: has length and indexed items but NOT array methods
// Examples: arguments object, NodeList, HTMLCollection, strings
let args = { 0: "a", 1: "b", length: 2 }; // Array-like
let realArray = Array.from(args);            // Convert to real array
let fromNodeList = Array.from(document.querySelectorAll("div"));

// Q29: Optional chaining (?.) in depth
let config = null;
console.log(config?.database?.host);      // undefined (no error)
console.log(config?.getSettings?.());     // undefined (no error, function may not exist)
console.log(config?.items?.[0]);          // undefined (no error)

// Q30: What is a Set?
let unique = new Set([1, 2, 2, 3, 3, 4]);
console.log(unique);         // Set { 1, 2, 3, 4 } — duplicates removed!
console.log(unique.size);    // 4
unique.add(5);
unique.delete(1);
console.log(unique.has(3));  // true

// Remove duplicates from array:
let arr = [1, 2, 2, 3, 3, 4];
let deduped = [...new Set(arr)]; // [1, 2, 3, 4]

// Q31: What is a Map?
let map = new Map();
map.set("name", "Tunde");
map.set(42, "Number key");
map.set({ id: 1 }, "Object key"); // Keys can be ANY type (unlike objects)
console.log(map.get("name"));     // "Tunde"
console.log(map.size);            // 3
for (let [key, value] of map) { console.log(key, ":", value); }

// Q32: RegEx basics
let email = "tunde@gmail.com";
console.log(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // true
let phone = "08012345678";
console.log(/^0[7-9][01]\d{8}$/.test(phone)); // true

// Q33: Named capture groups in RegEx
let dateStr = "2026-03-22";
let { groups: { year, month, day } } = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/.exec(dateStr);
console.log(year, month, day); // "2026" "03" "22"

// Q34: Tagged template literals
function currency(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let val = values[i - 1];
    return result + (typeof val === "number" ? `₦${val.toLocaleString()}` : val) + str;
  });
}
let price = 45000;
console.log(currency`Total: ${price} for your order`);
// "Total: ₦45,000 for your order"

// Q35: Computed property names
let field = "name";
let value = "Tunde";
let obj2 = { [field]: value, [`${field}Length`]: value.length };
console.log(obj2); // { name: "Tunde", nameLength: 5 }

// Q36: Object.keys, Object.values, Object.entries
let product = { name: "Rice", price: 32000, stock: 50 };
console.log(Object.keys(product));    // ["name", "price", "stock"]
console.log(Object.values(product));  // ["Rice", 32000, 50]
console.log(Object.entries(product)); // [["name","Rice"],["price",32000],["stock",50]]

// Practical use — filter object by value:
let filteredEntries = Object.entries(product).filter(([k, v]) => typeof v === "number");
let numericProps = Object.fromEntries(filteredEntries);
console.log(numericProps); // { price: 32000, stock: 50 }

// Q37: Array.from with mapping
let squares = Array.from({ length: 10 }, (_, i) => (i + 1) ** 2);
console.log(squares); // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// Q38: Async iterator
async function* fetchPages(url, maxPages = 3) {
  for (let page = 1; page <= maxPages; page++) {
    let response = await fetch(`${url}?page=${page}`);
    let data = await response.json();
    yield data;
  }
}

for await (let pageData of fetchPages("https://api.example.com/products")) {
  console.log("Got page:", pageData.length, "items");
}

// Q39: Error types in JavaScript
try {
  null.property;      // TypeError
  undeclaredVar;      // ReferenceError
  eval("}{");         // SyntaxError
  decodeURI("%");     // URIError
} catch (e) {
  console.log(e instanceof TypeError);    // true (for first error)
  console.log(e.name);                    // "TypeError"
  console.log(e.message);                 // specific error message
  console.log(e.stack);                   // full stack trace
}

// Q40–Q50: High-frequency coding challenges

// Q40: Flatten nested array
let nested = [1, [2, [3, [4, [5]]]]];
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5]

// Q41: Remove duplicates
let dupes = [1, 2, 2, 3, 4, 4, 5];
let unique2 = [...new Set(dupes)]; // [1, 2, 3, 4, 5]

// Q42: Check palindrome
const isPalindrome = str => {
  let clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
};
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false

// Q43: Count word frequency
const wordFrequency = str => {
  return str.toLowerCase().split(/\s+/).reduce((freq, word) => {
    freq[word] = (freq[word] || 0) + 1;
    return freq;
  }, {});
};
console.log(wordFrequency("the quick brown fox the fox"));
// { the: 2, quick: 1, brown: 1, fox: 2 }

// Q44: Debounce function
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
const handleSearch = debounce((query) => fetchResults(query), 300);
// Waits 300ms after last keystroke before searching

// Q45: Throttle function
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    let now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}
const handleScroll = throttle(() => updateScrollIndicator(), 100);
// Runs at most once every 100ms no matter how fast you scroll

// Q46: Deep equality check
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object" || a === null) return false;
  let keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => deepEqual(a[key], b[key]));
}
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1 }, { a: 2 })); // false

// Q47: Pipe function
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const processPrice = pipe(
  price => price * 1.075,           // Add 7.5% VAT
  price => Math.round(price),       // Round to whole naira
  price => `₦${price.toLocaleString()}` // Format
);
console.log(processPrice(10000)); // "₦10,750"

// Q48: Group array by property
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    let group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
}
let employees = [
  { name: "Tunde", dept: "Engineering" },
  { name: "Amaka", dept: "Marketing" },
  { name: "Chidi", dept: "Engineering" },
  { name: "Ngozi", dept: "Marketing" },
];
console.log(groupBy(employees, "dept"));
// { Engineering: [...], Marketing: [...] }

// Q49: Implement Promise.all from scratch
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let remaining = promises.length;
    if (remaining === 0) return resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(value => {
        results[index] = value;
        if (--remaining === 0) resolve(results);
      }).catch(reject);
    });
  });
}

// Q50: Memoize with WeakMap (memory-safe)
function memoizeWeak(fn) {
  let cache = new WeakMap();
  return function(obj) {
    if (!cache.has(obj)) cache.set(obj, fn(obj));
    return cache.get(obj);
  };
}
```

---

## CHAPTER 12: BOOTCAMP-STYLE INTENSIVE REVIEW

### The 7-Day Intensive Bootcamp Schedule

This is for learners who need to rapidly refresh their JavaScript skills — perhaps before a job interview, a bootcamp program, or a technical test.

```
DAY 1: FOUNDATIONS BLITZ (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-2: Variables, data types, operators
           Build: Type conversion calculator
Hours 3-4: Control flow (if/switch/loops)
           Build: FizzBuzz, number patterns, grade classifier
Hours 5-6: Functions (all styles), scope, hoisting
           Build: Math utility library (10 functions)
Hours 7-8: Review + 20 coding challenges
           Daily challenge: Bank account simulation (no classes yet)

DAY 2: DATA STRUCTURES (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-3: Arrays — all methods + higher-order functions
           Build: Student gradebook with map/filter/reduce
Hours 4-5: Objects — creation, iteration, methods, spread
           Build: Product inventory CRUD (Create/Read/Update/Delete)
Hours 6-7: Strings, Numbers, Dates, Math
           Build: Invoice generator with formatted output
Hour  8:   Sets, Maps, WeakMap, WeakSet
           Build: Contact list with deduplication

DAY 3: FUNCTIONS DEEP-DIVE (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-2: Closures + practical patterns
           Build: Counter factory, memoizer, rate limiter
Hours 3-4: this, call/apply/bind, arrow functions
           Build: Event system with context binding
Hours 5-6: Callbacks → Promises → async/await
           Build: Simulated API with random delays
Hours 7-8: Error handling (try/catch/finally, custom errors)
           Build: Robust API client with retry logic

DAY 4: OOP AND CLASSES (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-2: Prototypes, prototype chain, Object.create()
Hours 3-5: Classes, constructors, inheritance, super, static
           Build: Animal → Mammal → Dog class hierarchy
Hours 6-7: Design patterns (factory, singleton, observer)
Hours 8:   Build: School management system with polymorphism

DAY 5: DOM AND BROWSER (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-2: DOM selection, modification, creation
           Build: Dynamic table generator
Hours 3-4: Events (all types), bubbling, delegation
           Build: Drag-and-drop todo list
Hours 5-6: Forms, validation, real-time feedback
           Build: Multi-step registration form with progress
Hours 7-8: BOM (Window, Location, History, Storage, Cookies)
           Build: Settings panel with localStorage persistence

DAY 6: ADVANCED JAVASCRIPT (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-2: Modules (import/export, dynamic import)
Hours 3-4: Regex — patterns for validation (email, phone, date, URL)
Hours 5-6: Proxy, Reflect, Symbols, WeakRef
Hours 7-8: Modern ES2020-ES2026 features
           Build: Custom validation framework using Proxy

DAY 7: INTERVIEW PREP AND CAPSTONE (8 hours)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hours 1-2: 30 rapid-fire coding challenges (timed: 10 min each)
Hours 3-4: System design: JavaScript architecture for a real app
Hours 5-6: Live coding practice — explain as you code
Hours 7-8: CAPSTONE PROJECT: Full e-commerce page or quiz app
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Daily Coding Challenges

```javascript
// LEVEL 1: Warm-up (10 minutes each)

// Challenge 1: Reverse a string
const reverseStr = str => str.split("").reverse().join("");
console.log(reverseStr("Babatunde")); // "ednuatabaB"

// Challenge 2: Sum of digits
const digitSum = n => String(Math.abs(n)).split("").reduce((s, d) => s + +d, 0);
console.log(digitSum(12345)); // 15

// Challenge 3: Find the most frequent element
const mostFrequent = arr => {
  let freq = arr.reduce((f, x) => { f[x] = (f[x] || 0) + 1; return f; }, {});
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
};
console.log(mostFrequent([1, 2, 2, 3, 3, 3, 4])); // "3"

// Challenge 4: Check if two strings are anagrams
const isAnagram = (a, b) => {
  let sort = str => str.toLowerCase().split("").sort().join("");
  return sort(a) === sort(b);
};
console.log(isAnagram("listen", "silent")); // true

// Challenge 5: Fibonacci sequence
function fibonacci(n) {
  let fib = [0, 1];
  for (let i = 2; i < n; i++) fib.push(fib[i-1] + fib[i-2]);
  return fib.slice(0, n);
}
console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// LEVEL 2: Intermediate (20–30 minutes)

// Challenge 6: Implement a simple linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; this.size = 0; }

  append(value) {
    let node = new Node(value);
    if (!this.head) { this.head = node; }
    else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = node;
    }
    this.size++;
  }

  toArray() {
    let arr = [], current = this.head;
    while (current) { arr.push(current.value); current = current.next; }
    return arr;
  }
}

let list = new LinkedList();
list.append(1); list.append(2); list.append(3);
console.log(list.toArray()); // [1, 2, 3]

// Challenge 7: Async retry mechanism
async function withRetry(fn, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Challenge 8: Implement event emitter
class EventEmitter {
  constructor() { this.events = {}; }

  on(event, listener) {
    (this.events[event] = this.events[event] || []).push(listener);
    return this;
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
    return this;
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(listener => listener(...args));
    return this;
  }

  once(event, listener) {
    const wrapper = (...args) => { listener(...args); this.off(event, wrapper); };
    return this.on(event, wrapper);
  }
}

let emitter = new EventEmitter();
emitter.on("payment", (amount) => console.log(`Payment received: ₦${amount}`));
emitter.emit("payment", 45000); // Payment received: ₦45000
```

---

## CHAPTER 13: JAVASCRIPT EXAM AND CERTIFICATION READINESS

### What to Expect in JavaScript Technical Tests

**Common JavaScript test formats:**

1. **Multiple Choice** — Knowing exact outputs, typeof results, operator precedence
2. **Code Completion** — Fill in the blank to make code work
3. **Bug Finding** — Spot the error and fix it
4. **Code Writing** — Write a function from scratch
5. **System Design** — Architect a small JavaScript application

---

### Exam-Style Practice Questions

**Section A: What is the output?**

```javascript
// Question A1
let a = 1;
let b = a++;
console.log(a, b);
// Answer: 2 1
// Reason: a++ returns the CURRENT value (1) to b, THEN increments a to 2

// Question A2
console.log(typeof typeof 42);
// Answer: "string"
// Reason: typeof 42 = "number" (string), then typeof "number" = "string"

// Question A3
console.log(1 + "2" + 3);
// Answer: "123"
// Reason: 1 + "2" = "12" (string concat), "12" + 3 = "123"

// Question A4
console.log(+"");
// Answer: 0
// Reason: Unary + converts to number. Number("") = 0

// Question A5
let arr = [1, 2, 3];
arr[10] = 11;
console.log(arr.length);
// Answer: 11
// Reason: Setting index 10 creates "holes" (undefined) at indices 3-9

// Question A6
let obj = { a: 1 };
let copy = obj;
copy.a = 99;
console.log(obj.a);
// Answer: 99
// Reason: Objects are copied by REFERENCE, not by value. obj and copy point to same object.

// Question A7
console.log([] + []);
// Answer: "" (empty string)
// Reason: [].toString() = "" so "" + "" = ""

// Question A8
console.log([] + {});
// Answer: "[object Object]"
// Reason: [] → "" and {} → "[object Object]", so "" + "[object Object]"

// Question A9
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Answer: 3 3 3
// Reason: var is function-scoped. When timeouts run, the loop is done and i=3
// FIX: Use let instead of var (block-scoped)

// Question A10
let x = 5;
let y = x;
x = 10;
console.log(y);
// Answer: 5
// Reason: Primitives are copied BY VALUE. y gets a copy of 5, not a reference to x.
```

**Section B: Find and fix the bug**

```javascript
// Bug 1: Why doesn't this function work correctly?
function average(numbers) {
  let total = 0;
  for (let i = 0; i <= numbers.length; i++) { // ❌ should be < not <=
    total += numbers[i];
  }
  return total / numbers.length;
}

// Fix: change <= to <
function average(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) { // ✅
    total += numbers[i];
  }
  return total / numbers.length;
}

// Bug 2: Why does this async function not wait properly?
async function loadData() {
  let results = [];
  let ids = [1, 2, 3];

  ids.forEach(async (id) => {       // ❌ async in forEach doesn't await
    let data = await fetchItem(id);
    results.push(data);
  });

  return results; // Returns BEFORE any items are fetched!
}

// Fix: use for...of with await or Promise.all
async function loadData() {
  let ids = [1, 2, 3];

  // Option 1: Sequential (slower but simpler)
  let results = [];
  for (let id of ids) {
    let data = await fetchItem(id); // ✅ Actually waits
    results.push(data);
  }
  return results;

  // Option 2: Concurrent (faster)
  // return await Promise.all(ids.map(id => fetchItem(id))); // ✅
}

// Bug 3: Why doesn't the counter increment?
const counter = { count: 0 };
const increment = () => this.count++; // ❌ Arrow function, this = window

// Fix: use regular function or reference counter directly
const increment = function() { this.count++; };
increment.call(counter);
// OR:
const increment = () => counter.count++;
```

**Section C: Write the function**

```javascript
// Task 1: Group an array of transactions by month
// Input: [{ date: "2026-01-15", amount: 5000 }, { date: "2026-01-28", amount: 3000 }, { date: "2026-02-10", amount: 8000 }]
// Output: { "January 2026": [5000, 3000], "February 2026": [8000] }

function groupByMonth(transactions) {
  return transactions.reduce((groups, transaction) => {
    let date = new Date(transaction.date);
    let monthYear = date.toLocaleDateString("en-NG", { month: "long", year: "numeric" });

    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(transaction.amount);

    return groups;
  }, {});
}

// Task 2: Implement a basic pub/sub system
// (This is the EventEmitter class from earlier — a real interview question!)

// Task 3: Build a function that retries a failed promise up to N times
// (withRetry from bootcamp section — another real interview question!)

// Task 4: Write a function to calculate compound interest
function compoundInterest(principal, rate, timesPerYear, years) {
  // Formula: A = P(1 + r/n)^(nt)
  let A = principal * Math.pow(1 + rate / timesPerYear, timesPerYear * years);
  return {
    finalAmount: Math.round(A),
    interest: Math.round(A - principal),
    growth: ((A - principal) / principal * 100).toFixed(2) + "%"
  };
}

let investment = compoundInterest(1000000, 0.15, 12, 5);
console.log(`Starting: ₦1,000,000`);
console.log(`After 5 years at 15% monthly compounding:`);
console.log(`Final: ₦${investment.finalAmount.toLocaleString()}`);
console.log(`Interest earned: ₦${investment.interest.toLocaleString()}`);
console.log(`Growth: ${investment.growth}`);
// After 5 years at 15% monthly compounding:
// Final: ₦2,107,181
// Interest earned: ₦1,107,181
// Growth: 110.72%
```

---

## CHAPTER 14: BUILDING YOUR FIRST COMPLETE WEBSITE WITH JAVASCRIPT

### Project: NairaTrack — A Personal Finance Dashboard

**Project description:**
A single-page personal finance tracker for Nigerian users. Track income, expenses, budgets, and savings goals. All data persists in localStorage.

**Stage 1: Setup and Core Architecture**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NairaTrack — Personal Finance Dashboard</title>
  <style>
    :root {
      --primary: #1a7c4f;
      --primary-light: #e8f5e9;
      --danger: #c0392b;
      --warning: #f39c12;
      --text: #2c3e50;
      --bg: #f8f9fa;
      --card: white;
      --border: #dee2e6;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); }

    header {
      background: var(--primary);
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .dashboard {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: var(--card);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .balance-card {
      grid-column: 1 / -1; /* Full width */
      background: var(--primary);
      color: white;
    }

    .stat-value { font-size: 2rem; font-weight: bold; }
    .stat-label { opacity: 0.8; font-size: 0.9rem; }

    .transaction-form { grid-column: 1 / 2; }
    .recent-transactions { grid-column: 2 / 4; }

    .form-group { margin-bottom: 12px; }
    label { display: block; font-weight: 600; margin-bottom: 4px; font-size: 0.85rem; }
    input, select, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 1rem;
    }

    .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600; }
    .btn-primary { background: var(--primary); color: white; width: 100%; }
    .btn-primary:hover { background: #145c3a; }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid var(--border);
    }

    .income { color: var(--primary); }
    .expense { color: var(--danger); }

    @media (max-width: 768px) {
      .dashboard { grid-template-columns: 1fr; }
      .balance-card, .transaction-form, .recent-transactions { grid-column: 1; }
    }
  </style>
</head>
<body>
  <header>
    <h1>💰 NairaTrack</h1>
    <span id="current-date"></span>
  </header>

  <div class="dashboard">
    <!-- Balance Overview -->
    <div class="card balance-card">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;">
        <div>
          <div class="stat-label">Total Balance</div>
          <div class="stat-value" id="total-balance">₦0</div>
        </div>
        <div>
          <div class="stat-label">Total Income</div>
          <div class="stat-value" id="total-income">₦0</div>
        </div>
        <div>
          <div class="stat-label">Total Expenses</div>
          <div class="stat-value" id="total-expenses">₦0</div>
        </div>
      </div>
    </div>

    <!-- Add Transaction Form -->
    <div class="card transaction-form">
      <h3 style="margin-bottom:16px;">Add Transaction</h3>
      <div class="form-group">
        <label>Description</label>
        <input type="text" id="desc" placeholder="e.g., Salary, Rent, Food...">
      </div>
      <div class="form-group">
        <label>Amount (₦)</label>
        <input type="number" id="amount" placeholder="0" min="0">
      </div>
      <div class="form-group">
        <label>Type</label>
        <select id="type">
          <option value="income">💚 Income</option>
          <option value="expense">❤️ Expense</option>
        </select>
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="category">
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="food">Food & Groceries</option>
          <option value="transport">Transport</option>
          <option value="rent">Rent & Housing</option>
          <option value="utilities">Utilities</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="savings">Savings</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="date" id="date">
      </div>
      <button class="btn btn-primary" id="add-btn">+ Add Transaction</button>
    </div>

    <!-- Recent Transactions -->
    <div class="card recent-transactions">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h3>Recent Transactions</h3>
        <select id="filter-type" style="width:auto;padding:6px;">
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div id="transaction-list">
        <p style="color:#999;text-align:center;padding:20px;">No transactions yet. Add one to get started!</p>
      </div>
    </div>
  </div>

  <script>
    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const STATE_KEY = "nairatrack_data";

    function loadState() {
      try {
        return JSON.parse(localStorage.getItem(STATE_KEY)) || { transactions: [] };
      } catch {
        return { transactions: [] };
      }
    }

    function saveState(state) {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    }

    let state = loadState();

    // ============================================
    // TRANSACTION MANAGEMENT
    // ============================================
    function addTransaction(transaction) {
      transaction.id = Date.now();
      transaction.createdAt = new Date().toISOString();
      state.transactions.unshift(transaction); // Add to beginning
      saveState(state);
      render();
    }

    function deleteTransaction(id) {
      state.transactions = state.transactions.filter(t => t.id !== id);
      saveState(state);
      render();
    }

    // ============================================
    // CALCULATIONS
    // ============================================
    function calculateTotals(transactions) {
      return transactions.reduce((totals, t) => {
        if (t.type === "income") totals.income += t.amount;
        else totals.expense += t.amount;
        return totals;
      }, { income: 0, expense: 0 });
    }

    // ============================================
    // RENDERING
    // ============================================
    function formatCurrency(amount) {
      return "₦" + amount.toLocaleString("en-NG");
    }

    function renderSummary() {
      let { income, expense } = calculateTotals(state.transactions);
      let balance = income - expense;

      document.getElementById("total-balance").textContent = formatCurrency(balance);
      document.getElementById("total-income").textContent = formatCurrency(income);
      document.getElementById("total-expenses").textContent = formatCurrency(expense);
    }

    function renderTransactions() {
      let filter = document.getElementById("filter-type").value;
      let filtered = filter === "all"
        ? state.transactions
        : state.transactions.filter(t => t.type === filter);

      let list = document.getElementById("transaction-list");

      if (filtered.length === 0) {
        list.innerHTML = `<p style="color:#999;text-align:center;padding:20px;">No ${filter === "all" ? "" : filter} transactions found.</p>`;
        return;
      }

      list.innerHTML = filtered.map(t => {
        let sign = t.type === "income" ? "+" : "-";
        let colorClass = t.type === "income" ? "income" : "expense";
        let date = new Date(t.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

        return `
          <div class="transaction-item">
            <div>
              <strong>${t.description}</strong>
              <div style="font-size:0.8rem;color:#999;">${t.category} · ${date}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
              <span class="${colorClass}" style="font-weight:bold;font-size:1.1rem;">
                ${sign}${formatCurrency(t.amount)}
              </span>
              <button onclick="deleteTransaction(${t.id})"
                style="background:none;border:none;cursor:pointer;color:#999;font-size:1.2rem;"
                title="Delete">×</button>
            </div>
          </div>
        `;
      }).join("");
    }

    function render() {
      renderSummary();
      renderTransactions();
    }

    // ============================================
    // FORM HANDLING
    // ============================================
    // Set today's date as default
    document.getElementById("date").valueAsDate = new Date();

    document.getElementById("add-btn").addEventListener("click", () => {
      let desc = document.getElementById("desc").value.trim();
      let amount = parseFloat(document.getElementById("amount").value);
      let type = document.getElementById("type").value;
      let category = document.getElementById("category").value;
      let date = document.getElementById("date").value;

      // Validation
      if (!desc) { alert("Please enter a description."); return; }
      if (!amount || amount <= 0) { alert("Please enter a valid amount."); return; }
      if (!date) { alert("Please select a date."); return; }

      addTransaction({ description: desc, amount, type, category, date });

      // Reset form
      document.getElementById("desc").value = "";
      document.getElementById("amount").value = "";
      document.getElementById("date").valueAsDate = new Date();
    });

    document.getElementById("filter-type").addEventListener("change", renderTransactions);

    // Update date in header
    document.getElementById("current-date").textContent =
      new Date().toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    // Initial render
    render();
  </script>
</body>
</html>
```

**Expected output:** A fully functional personal finance dashboard with:
- Real-time balance, income, and expense totals
- Add income or expense transactions with categories
- Filter transactions by type
- Delete transactions
- All data persists across browser sessions via localStorage
- Responsive layout for mobile and desktop

**Stage 2: Advanced features to add (challenge yourself)**

```javascript
// Feature 1: Monthly budget limits
// Feature 2: Chart.js pie chart for spending categories
// Feature 3: Export transactions as CSV
// Feature 4: Savings goals tracker
// Feature 5: Currency converter (with Fetch API from exchange rate API)
// Feature 6: Recurring transactions
// Feature 7: Search and filter transactions
// Feature 8: Print/PDF report generation
```

**Reflection questions:**
1. How would you refactor this to use ES Modules (`import`/`export`) for better organisation?
2. How would you connect this to a real backend (Node.js + Express + MongoDB)?
3. How would you add authentication so each user sees only their data?
4. If this were a real product used by 100,000 users, what would you do differently?

---

# COMPLETION CHECKLIST

Use this checklist to confirm you have fully mastered the JavaScript curriculum:

```
FOUNDATION
[ ] I understand all 4 output methods and when to use each
[ ] I can explain the difference between var, let, and const
[ ] I understand all 8 data types and can use typeof correctly
[ ] I know all operator types and the difference between == and ===
[ ] I can write and use functions in all 3 syntaxes (declaration/expression/arrow)
[ ] I understand scope, closures, and hoisting

DATA STRUCTURES
[ ] I can use all major array methods (map, filter, reduce, find, sort, etc.)
[ ] I can create, modify, and iterate objects confidently
[ ] I can use destructuring for both arrays and objects
[ ] I understand the difference between Sets and Maps (and when to use them)
[ ] I can work with Dates, Strings (all methods), and Math
[ ] I can serialize/deserialize data with JSON

OOP
[ ] I understand prototypes and the prototype chain
[ ] I can write classes with constructors, methods, getters/setters, and inheritance
[ ] I understand the `this` keyword in all 5 contexts
[ ] I can use call(), apply(), and bind() correctly

ASYNC PROGRAMMING
[ ] I can write code using callbacks, Promises, and async/await
[ ] I can handle errors in async code with try/catch
[ ] I can use fetch() to get data from a real API
[ ] I understand the difference between Promise.all, Promise.race, Promise.allSettled

DOM AND BROWSER
[ ] I can find, create, modify, and delete DOM elements
[ ] I can add event listeners for all common event types
[ ] I understand event bubbling, capturing, and can implement event delegation
[ ] I can build and validate forms
[ ] I can use localStorage, sessionStorage, and cookies
[ ] I understand the Window, Location, History, and Navigator objects

CAREER READINESS
[ ] I can answer the top 50 JavaScript interview questions
[ ] I have built at least 5 real-world mini-projects
[ ] I can debug JavaScript code using DevTools
[ ] I have completed the 10-question self-assessment quiz with 8+/10

CAPSTONE
[ ] I have built a complete, multi-page or single-page JavaScript application
[ ] My project uses localStorage, DOM manipulation, forms, and events
[ ] My code follows best practices (const over let, === over ==, meaningful names)
[ ] I can explain my code to another person line by line
```

---

# KEY GOTCHAS — THE 20 BIGGEST JAVASCRIPT TRAPS

1. **`typeof null === "object"`** — Historical bug. Always use `=== null` to check for null.
2. **`NaN !== NaN`** — The only value not equal to itself. Use `Number.isNaN()`.
3. **Floating point math** — `0.1 + 0.2 !== 0.3`. Use `toFixed()` or integer math for money.
4. **`var` scope leakage** — Always use `let` and `const`.
5. **`==` vs `===`** — Always use `===`. Never rely on type coercion.
6. **`[1,2,3].sort()` sorts alphabetically** — Provide a comparator for numbers.
7. **`array.forEach` with `async/await`** — forEach doesn't await. Use `for...of` or `Promise.all`.
8. **Object references** — `let b = a` copies the reference. Modifying `b` modifies `a`.
9. **`const` doesn't make objects immutable** — Use `Object.freeze()` if needed.
10. **Arrow functions and `this`** — Arrow functions inherit `this`; don't use them as methods when you need `this`.
11. **`innerHTML` with user data** — XSS risk. Use `textContent` or sanitise input.
12. **`document.getElementById` returns `null` if not found** — Always check before using.
13. **Event listener `this` context** — Using regular functions as event listeners: `this` = the element. Arrow functions: `this` = the enclosing scope.
14. **`closure` in for loops with `var`** — Classic bug: `for(var i=0; i<3; i++) setTimeout(()=>console.log(i))` prints `3 3 3`. Use `let`.
15. **`parseInt("08")` in old code** — Always pass radix: `parseInt("08", 10)`.
16. **`localStorage.getItem` returns strings** — Always parse: `parseInt()`, `JSON.parse()`.
17. **Promise catching** — Unhandled promise rejections crash Node.js. Always `.catch()`.
18. **`delete` on array** — `delete arr[2]` leaves `undefined` hole, doesn't reduce length. Use `splice()`.
19. **`Date` months are 0-indexed** — January = 0, December = 11.
20. **Semicolon omission** — `return` on its own line returns `undefined` due to ASI. Keep return values on the same line as `return`.

---

# ONE-SENTENCE SUMMARY

JavaScript is a complete, powerful, and evolving language that runs everywhere — from the browser to the server — and mastering it means understanding not just the syntax, but the *reasoning* behind closures, event loops, asynchronous patterns, and the DOM model, which together form the foundation of every modern web application you use every day.

---

*End of JavaScript Mastery Capstone*
*Compiled from: W3Schools JavaScript Examples, DOM Examples, Input Examples, DOM Exercises, Events Examples, Browser Examples, Editor, Exercises, Quiz, Website Builder, Syllabus, Study Plan, Interview Prep, Bootcamp, and Exam pages.*
