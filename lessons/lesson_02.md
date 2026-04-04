---
title: "JavaScript Syntax, Statements & Comments"
nav_order: 2
---

## 📌 What This Lesson Covers
By the end of this lesson you will understand:
- What JavaScript **syntax** is and why rules matter
- The building blocks of syntax: **values, literals, variables, keywords, operators, expressions, and identifiers**
- What **case sensitivity** means and how **camelCase** naming works
- What JavaScript **statements** are and how they are structured
- How **semicolons**, **whitespace**, **line breaks**, and **code blocks** work
- What all the major **keywords** do
- How to write **single-line** and **multi-line comments**
- How to use comments to **prevent code from running** during testing

This lesson follows three phases: **Understand → Practice → Build.**

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

---

## TOPIC 1: JavaScript Syntax

---

### 1.1 What Is Syntax?

Think of syntax like the grammar rules of a language.

In English, the sentence *"I going to store the"* is made of valid words — but it is wrong because it breaks grammar rules. Similarly, even if you type real JavaScript words, if they are arranged incorrectly the browser won't understand you.

**Syntax** = the set of rules that defines how JavaScript programs must be written.

Just like every language has its own grammar, every programming language has its own syntax. JavaScript's syntax tells you:
- How to create and name containers for data
- How to perform calculations
- How to give the computer instructions

---

### 1.2 The Two Types of Values in JavaScript

JavaScript syntax is built around two types of values: **Literals** (fixed values) and **Variables** (values that can change).

---

#### Type 1 — Literals (Fixed Values)

A **literal** is a value you type directly into code. It is fixed — it doesn't change.

There are two kinds:

**Numbers** — written with or without decimal points. No quotes needed:

```javascript
10.50    // a decimal number — like a price
1001     // a whole number — like a year
```

**Strings** — written in single or double quotes. These are pieces of text:

```javascript
"John Doe"    // using double quotes
'John Doe'    // using single quotes — both work the same way
```

> 💡 The quotes tell JavaScript: *this is text, not a command.* Without them, JavaScript would think `John` is a variable name it doesn't recognise.

**Micro-Demo — Spotting Literals:**
```javascript
"Hello"          // String literal
42               // Number literal
3.14             // Number literal (decimal)
'Lagos, Nigeria' // String literal
```

> 🤔 **Thinking question:** Is `100` a literal or a variable? What about `"100"`? Are they the same? (Hint: one is a number you can do maths with; the other is treated as text.)

---

#### Type 2 — Variables (Values That Change)

A **variable** is a labelled container that stores a value. Unlike a literal, the value inside it can change over the life of the program.

Analogy: Imagine a labelled box. The label (`price`) stays the same, but what is inside the box can be swapped at any time.

```javascript
let price = 50;    // the box is labelled "price" and holds the number 50
price = 75;        // we changed what's inside the box — now it holds 75
```

We will go much deeper into variables in the next lesson. For now, just understand that variables store values that can be looked up or changed later.

---

### 1.3 JavaScript Keywords

**Keywords** are special reserved words that JavaScript already knows. They tell the browser to perform specific actions. You cannot use them as your own variable names because they already have a specific meaning.

Two of the most important keywords for creating variables are `let` and `const`:

```javascript
let x = 5;              // "let" tells JavaScript: create a changeable variable called x
const fname = "John";   // "const" tells JavaScript: create a permanent variable called fname
```

**`let`** = short for "let there be a variable." The value can change later.
**`const`** = short for "constant." The value is set once and never changes.

> ⚠️ **Critical Note — Case Sensitivity:** JavaScript keywords are **case-sensitive.** The browser only recognises them in lowercase. Writing `LET` or `Let` instead of `let` will cause an error. Always write keywords in all lowercase.

---

### 1.4 JavaScript Variables and Identifiers

A **variable** must have a unique name so JavaScript can find it. That name is called an **identifier**.

Think of identifiers as labels you create yourself, just like naming your folders on a computer.

**Rules for naming identifiers:**

| Rule | Example of Following It | Example of Breaking It |
|---|---|---|
| Must start with a letter, `_`, or `$` | `score`, `_total`, `$price` | `1score` ❌ |
| Can contain digits after the first character | `score1`, `player2` | Cannot start with a digit |
| Cannot be a reserved keyword | `myLet`, `constValue` | `let`, `const`, `if` ❌ |
| Are case-sensitive | `Score` and `score` are different | — |

**Micro-Demo:**

```javascript
let studentName = "Alice";  // Valid — starts with a letter
let _count = 0;             // Valid — starts with underscore
let $price = 9.99;          // Valid — starts with $
// let 1stPlace = "Gold";   // INVALID — starts with a number (this would crash)
```

---

### 1.5 JavaScript Operators

**Operators** are symbols that tell JavaScript to perform an action on values.

There are two main types you need to know right now:

**Assignment Operator (`=`)** — stores a value into a variable:
```javascript
let x = 5;    // The = sign puts the value 5 into x
let y = 6;    // The = sign puts the value 6 into y
```

> ⚠️ **Beginner Mistake:** `=` in JavaScript does **not** mean "equal to" like in maths. It means "assign this value to this container." To check if two things are equal, you use `==` or `===` (you will learn these later).

**Arithmetic Operators** — perform maths: `+` (add), `-` (subtract), `*` (multiply), `/` (divide):

```javascript
5 * 10      // multiply: result is 50
10 + 3      // add: result is 13
10 - 4      // subtract: result is 6
20 / 4      // divide: result is 5
```

**Micro-Demo:**
```javascript
let price = 100;
let discount = 20;
let finalPrice = price - discount;   // finalPrice holds 80
```

---

### 1.6 JavaScript Expressions

An **expression** is any piece of code that produces a value when evaluated. Think of it like a maths problem that the browser solves — it always produces an answer.

```javascript
(5 + 6) * 10    // evaluates to 110
```

How the browser reads this: First, it solves the brackets: 5 + 6 = 11. Then it multiplies: 11 * 10 = 110. The result is 110.

**Expressions can use variables:**
```javascript
let x = 10;
x * 10    // evaluates to 100 (because x holds 10)
```

**Expressions can work with strings (text):**
```javascript
"John" + " " + "Doe"    // evaluates to "John Doe"
```

When you use `+` with strings, it joins (concatenates) them instead of adding numbers. The browser is smart enough to know the difference based on context.

> 🤔 **Thinking question:** What do you think `"5" + 5` would produce? A number (10) or text ("55")? Try to reason it out before the next lesson reveals the answer.

---

### 1.7 JavaScript Is Case Sensitive

This is one of the most common causes of beginner errors, and it is important enough to highlight on its own.

In JavaScript, **every letter matters.** An uppercase and a lowercase letter are completely different characters to the browser.

```javascript
let lastName = "Doe";
let lastname = "Peterson";
```

These are **two entirely different variables.** One has a capital `N` and one doesn't. The browser treats them as completely separate boxes with no relationship to each other.

**Common case-sensitive mistakes:**
```javascript
// Correct
document.getElementById("demo").innerHTML = "Hello";

// Wrong — JavaScript doesn't know "getElementbyid"
document.getElementbyid("demo").innerHTML = "Hello";  // ❌ Error!
```

The letter `B` in `getElementById` is capitalised — writing it lowercase will crash your code.

---

### 1.8 CamelCase — The JavaScript Naming Convention

Over time, programmers have used different styles to combine multiple words into a single variable name (because spaces are not allowed in variable names).

Here are the four main styles:

| Style | Example | Used In |
|---|---|---|
| **Hyphens** | `first-name` | NOT allowed in JavaScript (means subtraction) |
| **Underscore** | `first_name` | Used in Python, databases |
| **Upper CamelCase / PascalCase** | `FirstName` | Used for classes in JavaScript |
| **Lower camelCase** | `firstName` | **Standard for JavaScript variables** |

**Lower camelCase** means:
- The first word is all lowercase
- Every following word starts with an uppercase letter
- No spaces or symbols between words

```javascript
let firstName = "James";
let totalSaleAmount = 5000;
let numberOfStudentsEnrolled = 42;
```

> 💡 Why camelCase? Because the uppercase letters in the middle of the word look like the humps of a camel. Professional JavaScript developers use this style consistently — it makes code look clean and readable across teams.

---
---

## TOPIC 2: JavaScript Statements

---

### 2.1 What Is a Statement?

If syntax is the grammar, then a **statement** is a complete sentence — one full instruction you give the computer.

A **statement** tells the browser to perform one specific action. It is composed of values, operators, expressions, keywords, and comments.

Real-world analogy: Imagine giving instructions to a robot kitchen assistant:
- "Take the bowl." — one statement
- "Add flour." — another statement
- "Mix for 2 minutes." — another statement

JavaScript works the same way. Each instruction is a separate statement, and they are executed one by one, in the order they are written, from top to bottom.

---

### 2.2 What Makes Up a Statement?

A statement is composed of one or more of these ingredients:

```javascript
let x, y, z;    // Statement 1 — declares three variables
x = 5;          // Statement 2 — assigns value 5 to x
y = 6;          // Statement 3 — assigns value 6 to y
z = x + y;      // Statement 4 — adds x and y and stores result in z
```

Let's read statement 4 in detail:

| Part | What It Is |
|---|---|
| `z` | A variable (identifier) |
| `=` | Assignment operator |
| `x` | A variable holding 5 |
| `+` | Arithmetic operator |
| `y` | A variable holding 6 |
| Result | z becomes 11 |

**Expected output of z:** `11`

The browser processes these statements one by one. By the time it reaches statement 4, it already knows `x = 5` and `y = 6`, so it can calculate `z = 11`.

---

### 2.3 A Statement That Talks to the Page

A statement can also interact with HTML on the page:

```javascript
document.getElementById("demo").innerHTML = "Hello Dolly.";
```

This single statement:
1. Searches the page for an element with `id="demo"`
2. Takes everything inside it
3. Replaces it with the text `"Hello Dolly."`

This is one complete instruction — one statement.

---

### 2.4 Semicolons — The Full Stop of JavaScript

A **semicolon (`;`)** in JavaScript works like a full stop (period) in English. It marks the end of one complete statement.

```javascript
let a, b, c;    // Statement ends here
a = 5;          // Statement ends here
b = 6;          // Statement ends here
c = a + b;      // Statement ends here — c now holds 11
```

You can even write multiple statements on a single line, separated by semicolons:

```javascript
a = 5; b = 6; c = a + b;
```

**Expected output:** Same result — c holds 11. Both ways are valid.

> ⚠️ **Important note from W3Schools:** Ending statements with a semicolon is not strictly required in JavaScript — the browser will often guess where statements end. However, it is **highly recommended** to always add them. Leaving them out can cause subtle, hard-to-find bugs. Professional developers always use semicolons.

---

### 2.5 Whitespace — JavaScript Ignores Extra Spaces

JavaScript ignores extra spaces between code elements. This means you can add spacing to make your code more readable without affecting how it runs.

These two lines do exactly the same thing:

```javascript
let person = "Hege";    // with spaces around =
let person="Hege";      // without spaces
```

**Best practice:** Always put spaces around operators. It makes your code far easier to read:

```javascript
let x = y + z;      // Readable ✅
let x=y+z;          // Harder to read ❌
```

In a professional workplace, readable code is just as important as working code — your teammates have to read and understand your code too.

---

### 2.6 Line Length and Line Breaks

For readability, it is recommended to keep code lines under **80 characters** wide. If a statement is too long, break it after an operator:

```javascript
document.getElementById("demo").innerHTML =
"Hello Dolly!";
```

JavaScript treats both lines as one statement because the browser knows a line ending after an operator (`=`) means the statement isn't finished yet.

> ⚠️ **Beginner Mistake:** Breaking a line at the wrong place can split the statement unexpectedly. The safest breakpoint is always after an operator (`=`, `+`, etc.) or a comma.

---

### 2.7 Code Blocks — Grouping Statements Together

Sometimes you need multiple statements to work together as a group. JavaScript lets you wrap them inside **curly brackets `{}`** to create a **code block**.

```javascript
function myFunction() {
  document.getElementById("demo1").innerHTML = "Hello Dolly!";
  document.getElementById("demo2").innerHTML = "How are you?";
}
```

Think of a code block like a folder. The folder name is `myFunction`. Inside the folder you put instructions that all belong together. When you call the folder by name, all the instructions inside run together.

**What you see here:**
- `function` is a keyword that creates a named group of statements
- `myFunction` is the name we gave the group (an identifier)
- `{` opens the block
- The two statements inside are indented with 2 spaces — this is standard practice for readability
- `}` closes the block

You will learn functions in detail in a later lesson. For now, understand that curly braces group statements.

---

### 2.8 JavaScript Keywords Reference

JavaScript statements often begin with a **keyword** that identifies what action is being performed. The keyword is the verb — the action word — of the statement.

Here are the most important keywords you will use throughout this course:

| Keyword | What It Does | Simple Example |
|---|---|---|
| `var` | Declares a variable (older style) | `var age = 25;` |
| `let` | Declares a changeable variable | `let score = 0;` |
| `const` | Declares a permanent variable | `const PI = 3.14;` |
| `if` | Runs code only if a condition is true | `if (score > 50) { ... }` |
| `switch` | Runs different code for different cases | `switch (day) { ... }` |
| `for` | Runs a block of code repeatedly | `for (let i = 0; i < 5; i++) { ... }` |
| `function` | Creates a named group of statements | `function greet() { ... }` |
| `return` | Exits a function and sends back a value | `return total;` |
| `try` | Wraps code that might fail safely | `try { riskyCode(); }` |

> ⚠️ **Important Rule:** Keywords are **reserved words.** You cannot use them as variable names. `let let = 5;` would cause an error — JavaScript already uses the word `let` for its own purpose.

---
---

## TOPIC 3: JavaScript Comments

---

### 3.1 What Is a Comment?

A **comment** is text inside your code that JavaScript completely ignores when running the program. It is only there for humans to read.

Why would you want to write something the computer ignores? Several very important reasons:

1. **Explain your code** — so that you (or a teammate) can understand it months later
2. **Remind yourself why you made a decision** — e.g., "using 30 here because the client's policy requires 30-day cycles"
3. **Temporarily disable code** — you can "comment out" a line so it doesn't run, without deleting it

In professional teams, writing clear comments is considered a sign of a skilled, considerate developer. Code without comments can become confusing even to the person who wrote it.

---

### 3.2 Single Line Comments (`//`)

A **single line comment** starts with two forward slashes `//`. Everything from `//` to the end of that line is ignored by JavaScript.

**Style 1 — Comment above the code:**
```javascript
// Change the heading:
document.getElementById("myH").innerHTML = "My First Page";

// Change the paragraph:
document.getElementById("myP").innerHTML = "My first paragraph.";
```

**Style 2 — Comment at the end of the same line:**
```javascript
let x = 5;      // Declare x, give it the value of 5
let y = x + 2;  // Declare y, give it the value of x + 2
```

Both styles are correct. Style 2 is useful for short, quick notes. Style 1 is better for longer explanations.

**Expected output:** The comments have no effect on what the page shows. Only the JavaScript code runs.

> 💡 The `//` style is by far the most commonly used type of comment. Most developers prefer it because it's quick to type and easy to read.

---

### 3.3 Multi-line Comments (`/* ... */`)

A **multi-line comment** starts with `/*` and ends with `*/`. Everything between those symbols — even if it spans many lines — is ignored.

```javascript
/*
The code below will change
the heading with id = "myH"
and the paragraph with id = "myP"
in my web page:
*/
document.getElementById("myH").innerHTML = "My First Page";
document.getElementById("myP").innerHTML = "My first paragraph.";
```

**Expected output:** Only the two JavaScript statements run. The four-line explanation block is completely invisible to the browser.

Multi-line comments are often used for:
- Describing a function or file at the top (called **documentation comments**)
- Writing longer explanations that don't fit on one line
- Temporarily disabling large blocks of code during testing

---

### 3.4 Using Comments to Prevent Code from Running

This is one of the most powerful practical uses of comments for beginners. Imagine you have two versions of a line of code and you want to test one without deleting the other. You simply comment out the one you don't want to run:

**Single line — commenting out one line:**
```javascript
// document.getElementById("myH").innerHTML = "My First Page";
document.getElementById("myP").innerHTML = "My first paragraph.";
```

**Expected output:** Only the paragraph changes. The heading line is disabled because `//` is in front of it. The heading line still exists — you can re-enable it anytime by removing the `//`.

**Multi-line — commenting out multiple lines:**
```javascript
/*
document.getElementById("myH").innerHTML = "My First Page";
document.getElementById("myP").innerHTML = "My first paragraph.";
*/
```

**Expected output:** Nothing changes on the page. Both lines are disabled. Neither runs.

> 💡 **Real-world use:** Professional developers use this constantly during debugging. Instead of deleting code they're not sure about, they comment it out. If the old version turns out to be better, they just remove the `//` or `/* */` and it runs again.

---

### 3.5 Summary — Comment Styles Side by Side

```javascript
// I am a single-line comment. I explain the next line of code.

let total = price + tax;  // I can also appear after code on the same line.

/*
  I am a multi-line comment.
  I can span as many lines as needed.
  Use me for longer explanations or documentation.
*/

/*
  I can also be used to temporarily disable multiple lines during testing:
  let x = 5;
  let y = 10;
*/
```

---
---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Reading and Writing Syntax

**Objective:** Identify and write correct JavaScript syntax elements.

**Scenario:** You are a junior developer reviewing some code before it goes live. Your job is to read through it, understand each part, and add comments explaining what each line does.

---

**Warm-Up Mini-Example:**

```javascript
let productName = "Laptop";   // string variable
let productPrice = 1200;      // number variable
let discount = 100;           // number variable
let finalPrice = productPrice - discount;  // expression: 1200 - 100 = 1100
```
Expected: `finalPrice` holds `1100`

---

**Your Exercise:**

**Step 1** — Look at this code carefully:

```javascript
let firstName = "Amara";
let lastName = "Okonkwo";
let age = 28;
let city = "Abuja";
let fullName = firstName + " " + lastName;
let greeting = "Hello, " + fullName + "! You are " + age + " years old.";

document.getElementById("output").innerHTML = greeting;
```

**Step 2** — In your notebook or code editor, add a `//` comment at the end of every single line, explaining what that line does.

**Step 3** — Add a multi-line comment at the very top of the code block describing what the entire program does.

**Step 4** — Create the matching HTML:
```html
<!DOCTYPE html>
<html>
  <body>
    <p id="output"></p>
    <script src="exercise1.js"></script>
  </body>
</html>
```

**Expected page output:**
```
Hello, Amara Okonkwo! You are 28 years old.
```

**Self-Check Questions:**
1. How many statements does this code contain?
2. Which word is the keyword in `let firstName = "Amara"`?
3. Is `"Amara"` a literal or a variable?
4. What would happen if you wrote `Let firstName` instead of `let firstName`?
5. Why is `fullName` written in camelCase rather than `full_name` or `FullName`?

**Optional What-If Challenge:** Comment out the `greeting` line and instead build the greeting directly inside `innerHTML`. Does it still work?

---

## Exercise 2 — Statements, Semicolons, and Blocks

**Objective:** Write and arrange statements correctly, use semicolons, and understand code blocks.

**Scenario:** You are building a small score calculator for a student quiz system. Each student gets marks for three subjects and the program calculates a total.

---

**Warm-Up Mini-Example:**

```javascript
let mathScore = 85;
let englishScore = 72;
let totalScore = mathScore + englishScore;
document.getElementById("result").innerHTML = "Total: " + totalScore;
```
Expected: *"Total: 157"*

---

**Your Exercise:**

**Step 1** — Build `quiz.html`:
```html
<!DOCTYPE html>
<html>
  <body>
    <h2>Student Score Card</h2>
    <p id="studentName"></p>
    <p id="scores"></p>
    <p id="total"></p>
    <p id="average"></p>
    <script src="quiz.js"></script>
  </body>
</html>
```

**Step 2** — Build `quiz.js` with these instructions:

```javascript
// Student information
let name = "Fatima Bello";
let mathScore = 88;
let scienceScore = 76;
let englishScore = 91;

// Calculations
let totalScore = mathScore + scienceScore + englishScore;
let averageScore = totalScore / 3;

// Display on the page
document.getElementById("studentName").innerHTML = "Student: " + name;
document.getElementById("scores").innerHTML = "Math: " + mathScore + " | Science: " + scienceScore + " | English: " + englishScore;
document.getElementById("total").innerHTML = "Total: " + totalScore;
document.getElementById("average").innerHTML = "Average: " + averageScore;
```

**Expected page output:**
```
Student: Fatima Bello
Math: 88 | Science: 76 | English: 91
Total: 255
Average: 85
```

**Step 3** — Experiment: Try writing two statements on the same line with a semicolon between them. Observe that it still works.

**Self-Check Questions:**
1. How many statements are in `quiz.js`?
2. Which lines are expressions?
3. If you removed all the semicolons, would the code still work? Try it and observe.
4. What would you change to calculate the score for a different student?

**Optional What-If Challenge:** Add a fourth subject — art — and update the total and average calculations. Also add a comment above the calculations block explaining what it does.

---

## Exercise 3 — Comments in Action

**Objective:** Use both types of comments purposefully, and practice disabling code with comments.

**Scenario:** You are testing two different welcome messages for a website. You want to switch between them without deleting either.

---

**Warm-Up Mini-Example:**

```javascript
// Version 1 — currently active
document.getElementById("msg").innerHTML = "Welcome back!";

// Version 2 — currently disabled
// document.getElementById("msg").innerHTML = "Good to see you again!";
```
Expected: Only "Welcome back!" appears.

---

**Your Exercise:**

**Step 1** — Build the HTML:
```html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="headline"></h1>
    <p id="message"></p>
    <p id="footer"></p>
    <script src="comments.js"></script>
  </body>
</html>
```

**Step 2** — Build `comments.js`:

```javascript
/*
  File: comments.js
  Purpose: Display a welcome message on the homepage.
  Author: [Your Name]
  Date: [Today's Date]
*/

// Set the headline — Version 1
document.getElementById("headline").innerHTML = "Welcome to LearnJS!";

// Set the headline — Version 2 (disabled for now)
// document.getElementById("headline").innerHTML = "Start Your JavaScript Journey!";

// Display the main message
document.getElementById("message").innerHTML = "This website helps beginners learn JavaScript step by step.";

/*
  The footer below was removed from the design.
  Keeping it here in case the client changes their mind.
  document.getElementById("footer").innerHTML = "© 2025 LearnJS Academy";
*/
```

**Expected page output:**
```
Welcome to LearnJS!
This website helps beginners learn JavaScript step by step.
[footer is blank — that code is commented out]
```

**Step 3** — Switch the active headline: comment out Version 1 and un-comment Version 2. Observe the change.

**Self-Check Questions:**
1. What is the difference between `//` and `/* */` in practical terms?
2. Why is it better to comment code out rather than delete it during testing?
3. What did the multi-line comment at the top of the file accomplish?
4. In a real company, who else might read the comments at the top of a file?

---
---

# PHASE 3 — PROJECT SIMULATION

---

## Mini-Project: Student Report Generator

**Project Overview:** You will build a simple student report card page that uses correct JavaScript syntax, clean statements, meaningful variable names, and well-placed comments. This simulates the kind of small data-display task a junior front-end developer might receive in their first week on the job.

---

### Stage 1 — Setup & Core Logic

**Goal:** Declare all data variables using correct syntax and display them on the page.

**Illustrative Preview:**
```javascript
let subject = "Mathematics";
let score = 87;
document.getElementById("sub1").innerHTML = subject + ": " + score;
```
Expected: *Mathematics: 87*

---

**Build `report.html`:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Student Report Card</title>
  </head>
  <body>
    <h1>Student Report Card</h1>
    <hr>
    <p id="studentInfo"></p>
    <p id="subject1"></p>
    <p id="subject2"></p>
    <p id="subject3"></p>
    <p id="totalScore"></p>
    <p id="grade"></p>
    <p id="remarks"></p>
    <script src="report.js"></script>
  </body>
</html>
```

**Build `report.js` — Stage 1:**
```javascript
/*
  File: report.js
  Purpose: Display a student's term report card on the page.
  Project: Student Report Generator — Phase 1
*/

// Student personal data
let studentName = "Emmanuel Adeyemi";
let studentClass = "Grade 10B";
let term = "Second Term";

// Subject scores (out of 100)
let mathScore = 82;
let scienceScore = 74;
let englishScore = 90;

// Display student identity
document.getElementById("studentInfo").innerHTML =
  "Name: " + studentName + " | Class: " + studentClass + " | Term: " + term;

// Display individual subject scores
document.getElementById("subject1").innerHTML = "Mathematics: " + mathScore;
document.getElementById("subject2").innerHTML = "Science: " + scienceScore;
document.getElementById("subject3").innerHTML = "English: " + englishScore;
```

**Expected page output:**
```
Student Report Card
---
Name: Emmanuel Adeyemi | Class: Grade 10B | Term: Second Term
Mathematics: 82
Science: 74
English: 90
```

---

### Stage 2 — Adding Calculations

**Goal:** Compute the total and average scores, and assign a grade.

**Illustrative Preview:**
```javascript
let total = 82 + 74;            // = 156
let average = total / 2;        // = 78
```

**Add to `report.js`:**
```javascript
// Calculate total and average
let totalScore = mathScore + scienceScore + englishScore;
let averageScore = totalScore / 3;

// Assign a grade based on average (simple version)
let grade;
if (averageScore >= 80) {
  grade = "A — Excellent";
} else if (averageScore >= 60) {
  grade = "B — Good";
} else {
  grade = "C — Needs Improvement";
}

// Display total, average, and grade
document.getElementById("totalScore").innerHTML =
  "Total: " + totalScore + "/300 | Average: " + averageScore.toFixed(1);

document.getElementById("grade").innerHTML = "Grade: " + grade;
```

**Expected page output (added lines):**
```
Total: 246/300 | Average: 82.0
Grade: A — Excellent
```

---

### Stage 3 — Final Touches and Remarks

**Goal:** Add a personalised remarks statement and a final console log for developer confirmation.

**Illustrative Preview:**
```javascript
let remarks = "Keep up the great work, Emmanuel!";
document.getElementById("remarks").innerHTML = remarks;
console.log("Report generated for:", studentName);
```

**Add to `report.js`:**
```javascript
// Generate personalised remarks
let remarks;

/*
  Remarks are based on the same grade range as above.
  In a real school system, these would be written by a teacher.
  For this project, we auto-generate them.
*/
if (averageScore >= 80) {
  remarks = "Excellent performance this term! Keep up the outstanding work.";
} else if (averageScore >= 60) {
  remarks = "Good effort this term. Focus on consistency to reach the top tier.";
} else {
  remarks = "There is room for improvement. We encourage more practice.";
}

document.getElementById("remarks").innerHTML = "Remarks: " + remarks;

// Developer confirmation in the console
console.log("Report successfully generated for:", studentName);
console.log("Average score:", averageScore);
```

**Expected console output:**
```
Report successfully generated for: Emmanuel Adeyemi
Average score: 82
```

**Full expected page output:**
```
Student Report Card
---
Name: Emmanuel Adeyemi | Class: Grade 10B | Term: Second Term
Mathematics: 82
Science: 74
English: 90
Total: 246/300 | Average: 82.0
Grade: A — Excellent
Remarks: Excellent performance this term! Keep up the outstanding work.
```

---

**Reflection Questions:**

1. Why did you put the student's name in a variable (`studentName`) rather than typing it every time directly into `innerHTML`?

2. Look at the comment block at the top of `report.js`. In a real school system with a team of five developers, what value does that block provide?

3. If a new student with different scores joined — say, Chidi with 55 in Math, 61 in Science, and 49 in English — what would you change in the code? How many lines would you need to edit?

4. How would using comments to disable the `if (averageScore >= 80)` block help you test whether the "Needs Improvement" branch works correctly?

5. How would this kind of system work in a real school? Where would the scores actually come from? (Hint: think about forms, databases, and teachers entering data.)

---

**Optional Advanced Features:**
- Add a fourth subject (Physical Education) and update all calculations
- Display the current date automatically using `new Date()` to show when the report was generated
- Add a pass/fail status: pass if average is 50 or above, fail otherwise
- Change the text colour of the grade using JavaScript and CSS based on whether it's an A, B, or C

---
---

# ✅ COMPLETION CHECKLIST

| Item | Status |
|---|---|
| JavaScript syntax explained as the grammar of the language | ✅ |
| Literals (numbers and strings) explained with examples | ✅ |
| Variables and identifiers explained with naming rules | ✅ |
| Keywords (`let`, `const`, etc.) explained with examples | ✅ |
| Operators (assignment and arithmetic) explained | ✅ |
| Expressions explained with numeric and string examples | ✅ |
| Case sensitivity explained and illustrated with common mistakes | ✅ |
| camelCase convention explained with comparisons to other styles | ✅ |
| JavaScript statements explained as complete instructions | ✅ |
| Semicolons explained and demonstrated | ✅ |
| Whitespace and line length best practices covered | ✅ |
| Code blocks explained with `{}` example | ✅ |
| Keyword reference table included | ✅ |
| Single-line comments (`//`) explained with both placement styles | ✅ |
| Multi-line comments (`/* */`) explained with examples | ✅ |
| Using comments to disable code demonstrated with examples | ✅ |
| Three applied exercises with warm-ups, hints, and self-checks | ✅ |
| Real-world mini-project built across three stages | ✅ |
| Reflection questions included for deeper thinking | ✅ |
| Every concept includes at least one example with expected output | ✅ |

---

**One-sentence summary:** JavaScript syntax is the set of rules that governs how statements — the individual instructions your program follows — must be written, and comments let you annotate, explain, and temporarily disable those instructions without affecting how the program runs.