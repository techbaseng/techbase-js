---
render_with_liquid: false
title: "JavaScript Strings: JS Strings · Template Strings · String Methods · String Search · String Reference"
nav_order: 7
---

## 📋 Table of Contents
1. [What Is a String?](#1-what-is-a-string)
2. [Creating Strings — Quotes & Backticks](#2-creating-strings)
3. [String Length](#3-string-length)
4. [Escape Characters](#4-escape-characters)
5. [Breaking Long Lines](#5-breaking-long-lines)
6. [Strings as Objects — Why You Should Avoid It](#6-strings-as-objects)
7. [Template Strings (Template Literals)](#7-template-strings)
8. [String Methods — Extracting Text](#8-string-methods-extracting)
9. [String Methods — Changing Case](#9-string-methods-case)
10. [String Methods — Padding & Trimming](#10-padding-and-trimming)
11. [String Methods — Replacing Content](#11-replacing-content)
12. [String Methods — Concatenation & Splitting](#12-concatenation-and-splitting)
13. [String Search Methods](#13-string-search-methods)
14. [String Reference — Quick Lookup Table](#14-string-reference)
15. [Applied Exercises](#15-applied-exercises)
16. [Mini-Project: Student Report Card Generator](#16-mini-project)
17. [Completion Checklist](#17-completion-checklist)

---

## 1. What Is a String?

### What Is It?

A **string** in JavaScript is simply a piece of text. The word "string" comes from the idea of characters (letters, numbers, symbols, spaces) strung together in a sequence — just like beads on a necklace.

Strings are everywhere in programming:
- A user's name: `"Maria"`
- An email address: `"maria@example.com"`
- A message: `"Your order has been shipped!"`
- A product title: `"iPhone 15 Pro Max"`

In real jobs — whether you're a web developer, data analyst, or mobile app builder — you will work with strings every single day.

### Why Do Strings Exist?

Computers fundamentally understand only numbers. Strings are the bridge between human-readable language and what the computer processes. Without strings, we couldn't display messages to users, store names in a database, send emails, or show product descriptions on a website.

### Key Mental Model

Think of a string like a row of individual boxes, each containing one character:

```
  "Hello"
  ┌───┬───┬───┬───┬───┐
  │ H │ e │ l │ l │ o │
  └───┴───┴───┴───┴───┘
    0   1   2   3   4    ← position numbers (called "indexes")
```

Each character sits at a numbered position, starting from **0** (not 1). This matters a lot when we learn string methods later.

---

## 2. Creating Strings

### Using Quotes

A JavaScript string is written inside quotes. You can use **double quotes**, **single quotes**, or **backticks** (we'll cover backticks in Template Strings).

```javascript
let text = "John Doe";        // Double quotes
let carName1 = "Volvo XC60";  // Double quotes
let carName2 = 'Volvo XC60';  // Single quotes — same result
```

> **Output:** Both `carName1` and `carName2` store exactly the same text: `Volvo XC60`

### Important Note — No Difference Between Single and Double Quotes

Single quotes and double quotes work exactly the same way in JavaScript. The only time it matters which one you pick is when your string *contains* a quote character.

### Quotes Inside Quotes

What happens if your string contains a quote? You mix them:

```javascript
let answer1 = "It's alright";           // single quote inside double quotes ✅
let answer2 = "He is called 'Johnny'";  // single quotes inside double quotes ✅
let answer3 = 'He is called "Johnny"';  // double quotes inside single quotes ✅
```

**Expected Output:**
```
It's alright
He is called 'Johnny'
He is called "Johnny"
```

> 🤔 **Thinking question:** What would happen if you tried: `let x = 'It's alright';`?
> Answer: JavaScript would get confused and stop reading the string at the second apostrophe. You'd get an error!

### Real-World Example

```javascript
let productName = "Nike Air Max";
let tagline = 'Just Do It';
let review = "The shoes are 'amazing' and very comfortable.";

console.log(productName);  // Nike Air Max
console.log(tagline);      // Just Do It
console.log(review);       // The shoes are 'amazing' and very comfortable.
```

---

## 3. String Length

### What Is Length?

Every string has a **length** — the total number of characters in it, including spaces and punctuation.

JavaScript gives us a built-in **property** called `.length` to find this number instantly.

> **Property vs Method:** A property is like a label on a box — you just read it. A method is like pressing a button on a machine — it does an action. `.length` is a property (no parentheses needed).

### Syntax

```javascript
let myString = "Hello";
let size = myString.length;
console.log(size);  // 5
```

### Step-by-Step Breakdown

```javascript
let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let length = text.length;
console.log(length);  // 26
```

- `let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"` — we create a string with 26 letters
- `text.length` — JavaScript counts each character
- `length` now holds the number `26`
- `console.log(length)` — prints `26` to the screen

### More Examples

```javascript
let name = "Alice";
console.log(name.length);        // 5

let sentence = "Hello World";
console.log(sentence.length);    // 11  (space counts!)

let empty = "";
console.log(empty.length);       // 0
```

### Real-World Use

In real jobs, you use `.length` to:
- **Validate forms:** "Password must be at least 8 characters" → `if (password.length < 8)`
- **Limit tweet/message length:** "You have 280 characters remaining" → `280 - text.length`
- **Check if a field is empty:** `if (username.length === 0) { alert("Please enter a name"); }`

---

## 4. Escape Characters

### The Problem

What happens when your string *must* contain the same quote character that wraps it?

```javascript
// ❌ This causes an ERROR:
let text = "We are the so-called "Vikings" from the north.";
// JavaScript sees the string end at the second " before Vikings
```

JavaScript reads: string starts at `"`, then ends at `"` right before `Vikings`. Everything after is broken code.

### The Solution — Backslash `\`

The **backslash** (`\`) is an **escape character**. It tells JavaScript: "the next character is NOT special — treat it as plain text."

Think of it like a shield: `\"` means "this double quote is just text, not the end of the string."

### The Three Most Important Escape Sequences

| Code | Result | Description |
|------|--------|-------------|
| `\"` | `"` | Insert a double quote inside a double-quoted string |
| `\'` | `'` | Insert a single quote inside a single-quoted string |
| `\\` | `\` | Insert an actual backslash character |

### Examples

```javascript
// Insert double quotes inside a string:
let text1 = "We are the so-called \"Vikings\" from the north.";
console.log(text1);
// Output: We are the so-called "Vikings" from the north.

// Insert single quote inside a string:
let text2 = 'It\'s alright.';
console.log(text2);
// Output: It's alright.

// Insert a backslash:
let text3 = "The character \\ is called backslash.";
console.log(text3);
// Output: The character \ is called backslash.
```

### Other Escape Sequences

JavaScript also supports these escape codes (originally designed for printers and typewriters, but useful in some environments):

| Code | Result |
|------|--------|
| `\n` | New Line (move to the next line) |
| `\t` | Tab (horizontal space) |
| `\r` | Carriage Return |
| `\b` | Backspace |
| `\f` | Form Feed |
| `\v` | Vertical Tab |

```javascript
let message = "Line 1\nLine 2\nLine 3";
console.log(message);
// Output:
// Line 1
// Line 2
// Line 3

let formatted = "Name:\tAlice\nAge:\t25";
console.log(formatted);
// Output:
// Name:   Alice
// Age:    25
```

> ⚠️ **Common Beginner Mistake:** Forgetting the backslash when a string contains a quote. Always use `\"` or `\'` when needed — or switch your quote style.

---

## 5. Breaking Long Lines

### Why Break Lines?

Programmers aim to keep code lines short (typically under 80–100 characters) for readability. Long lines are hard to read and maintain.

### Method 1 — Break After an Operator

You can safely break a **statement** after any operator (`=`, `+`, etc.):

```javascript
document.getElementById("demo").innerHTML =
"Hello Dolly!";
// Output on screen: Hello Dolly!
```

### Method 2 — String Concatenation (Joining with `+`)

Use the `+` operator to join two string pieces together across lines:

```javascript
document.getElementById("demo").innerHTML = "Hello " +
"Dolly!";
// Output: Hello Dolly!
```

> **What does `+` do with strings?** It **joins** (concatenates) them. `"Hello " + "World"` becomes `"Hello World"`.

```javascript
// Simple concatenation example:
let firstName = "Ada";
let lastName = "Lovelace";
let fullName = firstName + " " + lastName;
console.log(fullName);  // Ada Lovelace
```

---

## 6. Strings as Objects

### The Normal Way (Recommended)

Normally, strings are **primitive values** — simple and fast:

```javascript
let x = "John";  // primitive string ✅
```

### The Object Way (Avoid This!)

You can also create strings using the `new String()` keyword, which turns the string into an **object**:

```javascript
let y = new String("John");  // string object ❌ (avoid)
```

### Why Avoid String Objects?

1. **Slower:** Objects take more memory and are slower to process.
2. **Unexpected comparisons:** This is the biggest trap:

```javascript
let x = "John";
let y = new String("John");

console.log(x == y);   // true  (values are equal)
console.log(x === y);  // false (different types! one is string, one is object)
```

**Why?** The `==` operator compares just the *value*. The `===` operator compares both the *value AND the type*. Since `x` is a primitive string and `y` is an object, `===` says they're NOT equal.

```javascript
// Two String objects compared:
let a = new String("John");
let b = new String("John");

console.log(a == b);   // false
console.log(a === b);  // false
```

> **Why does comparing two objects return false?** Because in JavaScript, two different objects are never equal to each other, even if they contain the same content. They are two separate boxes in memory.

> ✅ **Rule:** Always create strings as primitive values (with quotes). Never use `new String()`.

---

## 7. Template Strings (Template Literals)

### What Are Template Strings?

Template strings (also called **template literals**) are a modern, powerful way to write strings. They were introduced in **ES6 (2016)**.

Instead of regular quotes, you wrap them in **backticks** (the key above Tab on your keyboard):

```
` This is a template string `
```

### Feature 1 — Quotes Inside Freely

With backticks, you can use single AND double quotes inside without any escaping:

```javascript
let text = `He's often called "Johnny"`;
console.log(text);
// Output: He's often called "Johnny"
```

### Feature 2 — Multi-line Strings

With regular strings, you can't just press Enter inside quotes. With template strings, you can:

```javascript
// ❌ Regular string — can't span lines like this:
// let poem = "Roses are red,
// Violets are blue";  // ERROR

// ✅ Template string — works perfectly:
let poem = `Roses are red,
Violets are blue,
JavaScript is great,
And so are you!`;

console.log(poem);
// Output:
// Roses are red,
// Violets are blue,
// JavaScript is great,
// And so are you!
```

### Feature 3 — String Interpolation (Embedding Variables)

This is the most powerful feature. Instead of joining strings with `+`, you embed variables directly inside the string using `${ }`:

**Syntax:** `` `Hello ${variableName}!` ``

```javascript
// The OLD way with + (concatenation):
let name = "Alice";
let age = 30;
let message = "Hello, " + name + "! You are " + age + " years old.";

// The MODERN way with template strings:
let messageNew = `Hello, ${name}! You are ${age} years old.`;

console.log(messageNew);
// Output: Hello, Alice! You are 30 years old.
```

> Inside `${ }`, you can put any valid JavaScript expression — variables, calculations, function calls, etc.

### Feature 4 — Expressions Inside `${ }`

You're not limited to just variable names:

```javascript
let price = 49.99;
let quantity = 3;
let tax = 0.08;

let receipt = `
Item Price: $${price}
Quantity:   ${quantity}
Subtotal:   $${price * quantity}
Tax (8%):   $${(price * quantity * tax).toFixed(2)}
Total:      $${(price * quantity * (1 + tax)).toFixed(2)}
`;

console.log(receipt);
// Output:
// Item Price: $49.99
// Quantity:   3
// Subtotal:   $149.97
// Tax (8%):   $12.00
// Total:      $161.97
```

### Real-World Use

Template strings are used constantly in web development for building HTML dynamically:

```javascript
let user = "Maria";
let score = 95;

// Building an HTML card with a template string:
let card = `
  <div class="student-card">
    <h2>${user}</h2>
    <p>Score: ${score}/100</p>
    <p>Grade: ${score >= 90 ? "A" : "B"}</p>
  </div>
`;

console.log(card);
// Output: A complete HTML block ready to insert into a webpage
```

---

## 8. String Methods — Extracting Text

String **methods** are built-in tools that perform actions on strings. Think of them like commands: "Hey string, do THIS."

### Method 1 — `charAt(index)`

Returns the character at a specific position (index). Remember: counting starts at **0**.

```javascript
let text = "Hello";
console.log(text.charAt(0));  // H
console.log(text.charAt(1));  // e
console.log(text.charAt(4));  // o
```

```javascript
// Real-world: Get the first letter of a name to create initials
let name = "Johnson";
let initial = name.charAt(0);
console.log(initial);  // J
```

### Method 2 — `charCodeAt(index)`

Returns the **Unicode number** (a standard numeric code) of the character at a given position. Useful for comparing characters or doing character-based validation.

```javascript
let text = "ABC";
console.log(text.charCodeAt(0));  // 65  (code for 'A')
console.log(text.charCodeAt(1));  // 66  (code for 'B')
console.log(text.charCodeAt(2));  // 67  (code for 'C')
```

> Lowercase `a` = 97, uppercase `A` = 65. This is why JavaScript is case-sensitive.

### Method 3 — `at(index)` (Modern)

Similar to `charAt()` but also accepts **negative indexes** to count from the end:

```javascript
let text = "Hello World";
console.log(text.at(0));   // H  (first character)
console.log(text.at(-1));  // d  (last character)
console.log(text.at(-5));  // W  (5th from end)
```

> ✅ Use `at(-1)` instead of `text[text.length - 1]` — much cleaner!

### Method 4 — Bracket Notation `[index]`

You can access characters like array items using square brackets:

```javascript
let text = "Hello";
console.log(text[0]);  // H
console.log(text[4]);  // o
```

> ⚠️ **Note:** If the index doesn't exist, `charAt()` returns `""` (empty string), but `text[index]` returns `undefined`.

### Method 5 — `slice(start, end)`

Cuts out a portion of a string from `start` to (but NOT including) `end`. This is the most commonly used extraction method.

```javascript
let text = "Apple, Banana, Cherry";
//          0123456789...

console.log(text.slice(7, 13));   // Banana
console.log(text.slice(0, 5));    // Apple
console.log(text.slice(15));      // Cherry  (no end = go to end of string)
console.log(text.slice(-6));      // Cherry  (negative = count from end)
```

**Step-by-step for `text.slice(7, 13)`:**
- Start at index 7 (letter `B`)
- Stop before index 13 (space after `a`)
- Result: `Banana`

```javascript
// Real-world: Extract domain from email
let email = "alice@gmail.com";
let domain = email.slice(email.indexOf("@") + 1);
console.log(domain);  // gmail.com
```

### Method 6 — `substring(start, end)`

Very similar to `slice()`, but does NOT accept negative indexes (negatives are treated as 0):

```javascript
let text = "Hello World";
console.log(text.substring(0, 5));   // Hello
console.log(text.substring(6, 11));  // World
console.log(text.substring(6));      // World
```

> **When to use which?** Use `slice()` when you might need negative indexes. Use `substring()` when you know only non-negative positions.

---

## 9. String Methods — Changing Case

### `toUpperCase()`

Converts all characters to uppercase:

```javascript
let text = "hello world";
let upper = text.toUpperCase();
console.log(upper);  // HELLO WORLD
```

### `toLowerCase()`

Converts all characters to lowercase:

```javascript
let text = "HELLO WORLD";
let lower = text.toLowerCase();
console.log(lower);  // hello world
```

### Real-World Use

```javascript
// Case-insensitive comparison (very common in login systems):
let userInput = "ALICE";
let storedName = "alice";

if (userInput.toLowerCase() === storedName.toLowerCase()) {
  console.log("Names match!");  // Names match!
}
```

```javascript
// Standardize product names before saving to database:
let rawInput = "   NIKE AIR MAX   ";
let cleaned = rawInput.trim().toLowerCase();
console.log(cleaned);  // "nike air max"
```

---

## 10. Padding and Trimming

### `trim()`

Removes **whitespace** (spaces, tabs, newlines) from **both ends** of a string. Does NOT remove spaces in the middle.

```javascript
let text = "   Hello World   ";
let trimmed = text.trim();
console.log(trimmed);          // "Hello World"
console.log(trimmed.length);   // 11  (vs 17 before trimming)
```

### `trimStart()` and `trimEnd()`

Remove whitespace from only one side:

```javascript
let text = "   Hello   ";
console.log(text.trimStart());  // "Hello   "
console.log(text.trimEnd());    // "   Hello"
```

### Real-World Use

```javascript
// Users often accidentally type spaces in forms:
let emailInput = "  user@example.com  ";
let cleanEmail = emailInput.trim().toLowerCase();
console.log(cleanEmail);  // "user@example.com"
```

### `padStart(length, padChar)` and `padEnd(length, padChar)`

Pad (fill) a string on the left or right with a character until it reaches a desired length:

```javascript
let num = "5";
console.log(num.padStart(3, "0"));  // "005"
console.log(num.padEnd(3, "0"));    // "500"
```

**Step-by-step for `"5".padStart(3, "0")`:**
- Target length: 3
- Current length: 1
- Need 2 more characters → add `"0"` twice on the LEFT
- Result: `"005"`

```javascript
// Real-world: Format order numbers
let orderId = "47";
let formatted = orderId.padStart(6, "0");
console.log(formatted);  // "000047"

// Format time display (3 → 03 minutes):
let minutes = "3";
console.log(minutes.padStart(2, "0"));  // "03"
```

---

## 11. Replacing Content

### `replace(searchValue, newValue)`

Finds the **first** occurrence of a value and replaces it:

```javascript
let text = "Please visit Microsoft!";
let newText = text.replace("Microsoft", "W3Schools");
console.log(newText);  // Please visit W3Schools!
console.log(text);     // Please visit Microsoft!  (original unchanged!)
```

> ⚠️ **Important:** String methods do NOT modify the original string. They always return a **new** string. Strings in JavaScript are **immutable** (cannot be changed in place).

```javascript
// Only replaces the FIRST match:
let text = "cat cat cat";
let result = text.replace("cat", "dog");
console.log(result);  // "dog cat cat"
```

### `replaceAll(searchValue, newValue)`

Replaces **all** occurrences:

```javascript
let text = "cat cat cat";
let result = text.replaceAll("cat", "dog");
console.log(result);  // "dog dog dog"
```

### Case-Insensitive Replace with Regular Expression

By default, `replace()` is case-sensitive. Use `/pattern/i` (a **regular expression** with the `i` flag meaning "ignore case") for case-insensitive replacement:

```javascript
let text = "Please visit Microsoft!";
let newText = text.replace(/microsoft/i, "W3Schools");
console.log(newText);  // Please visit W3Schools!
```

> **Regular Expression:** A special pattern for searching text. We'll explore these more in the search section. For now, just know that `/word/i` means "find `word` ignoring case."

```javascript
// Real-world: Sanitize user input
let comment = "This is really GREAT great Great!";
let sanitized = comment.replaceAll(/great/gi, "good");
console.log(sanitized);  // "This is really good good good!"
// (g = global/all occurrences, i = case-insensitive)
```

---

## 12. Concatenation and Splitting

### `concat(string1, string2, ...)`

Joins two or more strings together (an alternative to `+`):

```javascript
let first = "Hello";
let second = "World";
let result = first.concat(" ", second);
console.log(result);  // Hello World
```

> Modern JavaScript prefers template strings or `+` over `.concat()`, but you may see it in older code.

### `split(separator)`

Splits a string into an **array** (a list) of smaller strings, based on a separator character:

```javascript
let text = "apple,banana,cherry";
let fruits = text.split(",");
console.log(fruits);         // ["apple", "banana", "cherry"]
console.log(fruits[0]);      // "apple"
console.log(fruits.length);  // 3
```

**Step-by-step:**
- `text.split(",")` → finds every comma
- Cuts the string at each comma
- Returns an array of the pieces

```javascript
// Split by space to get individual words:
let sentence = "The quick brown fox";
let words = sentence.split(" ");
console.log(words);   // ["The", "quick", "brown", "fox"]
console.log(words.length);  // 4

// Split every character:
let word = "Hello";
let letters = word.split("");
console.log(letters);  // ["H", "e", "l", "l", "o"]
```

### Real-World Use

```javascript
// Parse a CSV (comma-separated values) line from a spreadsheet:
let csvLine = "Alice,28,Engineer,Lagos";
let fields = csvLine.split(",");
let name = fields[0];    // "Alice"
let age = fields[1];     // "28"
let job = fields[2];     // "Engineer"
let city = fields[3];    // "Lagos"

console.log(`${name} is a ${age}-year-old ${job} from ${city}.`);
// Output: Alice is a 28-year-old Engineer from Lagos.
```

---

## 13. String Search Methods

### Method 1 — `indexOf(searchValue, startFrom)`

Finds the **position** (index) of the **first** occurrence of a value inside a string. Returns `-1` if not found.

```javascript
let text = "Please locate where 'locate' occurs!";
console.log(text.indexOf("locate"));   // 7
console.log(text.indexOf("locate", 8)); // 21  (start searching from position 8)
console.log(text.indexOf("xyz"));       // -1  (not found)
```

**Checking if something exists:**

```javascript
let email = "alice@gmail.com";
if (email.indexOf("@") !== -1) {
  console.log("Valid email format!");
} else {
  console.log("Missing @");
}
// Output: Valid email format!
```

### Method 2 — `lastIndexOf(searchValue)`

Like `indexOf()` but finds the **last** occurrence:

```javascript
let text = "Please locate where 'locate' occurs!";
console.log(text.lastIndexOf("locate"));  // 21
```

### Method 3 — `includes(searchValue, startFrom)`

Returns `true` if the string contains the value, `false` otherwise. Cleaner than checking `indexOf() !== -1`:

```javascript
let text = "Hello World JavaScript";
console.log(text.includes("World"));       // true
console.log(text.includes("Python"));      // false
console.log(text.includes("world"));       // false (case-sensitive!)
```

```javascript
// Real-world: Check if a product is in a category list
let categories = "electronics,phones,tablets,laptops";
if (categories.includes("phones")) {
  console.log("This is a phone!");
}
// Output: This is a phone!
```

### Method 4 — `startsWith(searchValue, startFrom)`

Checks if a string **starts with** a specific value:

```javascript
let text = "Hello World";
console.log(text.startsWith("Hello"));   // true
console.log(text.startsWith("World"));   // false
console.log(text.startsWith("World", 6)); // true (start checking from index 6)
```

```javascript
// Real-world: Check if a URL is secure
let url = "https://mybank.com";
if (url.startsWith("https")) {
  console.log("Secure connection!");
} else {
  console.log("Warning: Not secure!");
}
// Output: Secure connection!
```

### Method 5 — `endsWith(searchValue, length)`

Checks if a string **ends with** a specific value:

```javascript
let text = "Hello World";
console.log(text.endsWith("World"));   // true
console.log(text.endsWith("Hello"));   // false
console.log(text.endsWith("Hello", 5)); // true (only check first 5 chars)
```

```javascript
// Real-world: Validate file extensions
let fileName = "report2024.pdf";
if (fileName.endsWith(".pdf")) {
  console.log("This is a PDF file.");
}
// Output: This is a PDF file.
```

### Method 6 — `search(regexp)`

Searches for a **pattern** (regular expression or string) and returns the position of the first match, or `-1`:

```javascript
let text = "Please locate where 'locate' occurs!";
console.log(text.search("locate"));    // 7
console.log(text.search(/locate/));    // 7
console.log(text.search(/LOCATE/i));   // 7 (case-insensitive with /i flag)
```

> **Difference from `indexOf()`:** `search()` supports regular expressions (patterns), while `indexOf()` only works with plain strings.

### Method 7 — `match(regexp)`

Returns an **array** of all matches found:

```javascript
let text = "The rain in Spain stays mainly in the plain";
let result = text.match(/ain/g);  // /g = global (find all)
console.log(result);
// Output: ["ain", "ain", "ain", "ain"]
// Found in: r-ain, Sp-ain, m-ain-ly, pl-ain
```

```javascript
// Case-insensitive global search:
let text2 = "Hello HELLO hello";
let matches = text2.match(/hello/gi);
console.log(matches);  // ["Hello", "HELLO", "hello"]
console.log(matches.length);  // 3
```

### Method 8 — `matchAll(regexp)`

Returns an **iterator** with all matches including detailed information. Must use the `g` flag:

```javascript
let text = "cat bat sat";
let iterator = text.matchAll(/[a-z]at/g);  // matches any letter + "at"

for (let match of iterator) {
  console.log(match[0], "at position", match.index);
}
// Output:
// cat at position 0
// bat at position 4
// sat at position 8
```

---

## 14. String Reference — Quick Lookup Table

Here is a complete reference of all JavaScript String methods:

| Method | Description | Example Output |
|--------|-------------|----------------|
| `charAt(n)` | Character at position n | `"Hello".charAt(1)` → `"e"` |
| `charCodeAt(n)` | Unicode of char at n | `"A".charCodeAt(0)` → `65` |
| `at(n)` | Char at n (allows negatives) | `"Hello".at(-1)` → `"o"` |
| `concat(str)` | Join strings | `"Hi".concat(" There")` → `"Hi There"` |
| `endsWith(str)` | Ends with? | `"file.pdf".endsWith(".pdf")` → `true` |
| `includes(str)` | Contains? | `"Hello".includes("ell")` → `true` |
| `indexOf(str)` | First position of str | `"Hello".indexOf("l")` → `2` |
| `lastIndexOf(str)` | Last position of str | `"Hello".lastIndexOf("l")` → `3` |
| `length` | Character count | `"Hello".length` → `5` |
| `match(regexp)` | Array of matches | `"aabaa".match(/a/g)` → `["a","a","a","a"]` |
| `matchAll(regexp)` | Iterator of all matches | (see example above) |
| `padEnd(n, ch)` | Pad end to length n | `"5".padEnd(3,"0")` → `"500"` |
| `padStart(n, ch)` | Pad start to length n | `"5".padStart(3,"0")` → `"005"` |
| `repeat(n)` | Repeat n times | `"ab".repeat(3)` → `"ababab"` |
| `replace(a, b)` | Replace first a with b | `"cat".replace("c","b")` → `"bat"` |
| `replaceAll(a, b)` | Replace all a with b | `"aa".replaceAll("a","b")` → `"bb"` |
| `search(regexp)` | Position of first match | `"Hello".search(/l/)` → `2` |
| `slice(s, e)` | Extract from s to e | `"Hello".slice(1,4)` → `"ell"` |
| `split(sep)` | Split into array | `"a,b".split(",")` → `["a","b"]` |
| `startsWith(str)` | Starts with? | `"Hello".startsWith("He")` → `true` |
| `substring(s, e)` | Extract from s to e | `"Hello".substring(1,4)` → `"ell"` |
| `toLowerCase()` | All lowercase | `"HI".toLowerCase()` → `"hi"` |
| `toUpperCase()` | All uppercase | `"hi".toUpperCase()` → `"HI"` |
| `trim()` | Remove surrounding spaces | `" hi ".trim()` → `"hi"` |
| `trimEnd()` | Remove trailing spaces | `" hi ".trimEnd()` → `" hi"` |
| `trimStart()` | Remove leading spaces | `" hi ".trimStart()` → `"hi "` |
| `valueOf()` | Primitive value of string | `"Hello".valueOf()` → `"Hello"` |
| `fromCharCode(code)` | Char from Unicode code | `String.fromCharCode(65)` → `"A"` |

---

## 15. Applied Exercises

---

### 🏋️ Exercise 1 — User Profile Formatter

**Objective:** Practice basic string creation, `.length`, and template literals.

**Real-world Scenario:** You're building a social media app. When a user registers, their profile data must be cleaned up and formatted.

**Warm-up Mini-Example First:**
```javascript
let city = "  Lagos  ";
let cleanCity = city.trim();
console.log(`City: ${cleanCity}`);  // City: Lagos
```

**Your Exercise:**

Given this raw input data from a form:
```javascript
let rawFirstName = "  alice  ";
let rawLastName = "  WONDER  ";
let rawEmail = "  ALICE@EMAIL.COM  ";
let rawAge = "25";
```

**Step-by-step Instructions:**
1. Clean each field using `.trim()` to remove surrounding spaces
2. Format the name: first letter uppercase, rest lowercase (Hint: use `toUpperCase()`, `toLowerCase()`, `charAt()`, and `slice()`)
3. Make the email all lowercase
4. Build a profile string using a template literal

**Hints:**
- To capitalize: `name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()`
- Template strings let you embed expressions directly

**Expected Output:**
```
=== User Profile ===
Name: Alice Wonder
Email: alice@email.com
Age: 25
Username length: 5
```

**Self-Check Questions:**
- What does `.trim()` return if the string has no spaces?
- What happens if you call `.charAt(0)` on an empty string?
- Why do we use `.toLowerCase()` on emails?

---

### 🏋️ Exercise 2 — Password Strength Checker

**Objective:** Practice `.length`, `.includes()`, and conditional logic.

**Real-world Scenario:** A banking app needs to check if a user's password is strong enough before accepting it.

**Warm-up Mini-Example:**
```javascript
let pass = "hello123";
console.log(pass.length >= 8);         // true
console.log(pass.includes("@"));       // false
```

**Your Exercise:**

Write a password checker that evaluates the following:
```javascript
let password = "MyPass@2024";
```

**Step-by-step Instructions:**
1. Check length: must be at least 8 characters
2. Check for uppercase: does it contain any uppercase letter? (Hint: `password !== password.toLowerCase()`)
3. Check for number: does it contain a digit? (Hint: `password.match(/[0-9]/)`)
4. Check for special character: does it include `@`, `#`, `$`, or `!`?
5. Display a strength rating: Weak, Medium, or Strong

**Expected Output for `"MyPass@2024"`:**
```
Password Analysis for: MyPass@2024
Length (11): ✅ Long enough
Has uppercase: ✅ Yes
Has number: ✅ Yes
Has special char (@): ✅ Yes
Strength: STRONG
```

**What-If Challenge:** What if the password was `"hello"`? Predict the output before running.

---

### 🏋️ Exercise 3 — Receipt Builder with Template Strings

**Objective:** Practice template strings, expressions in `${ }`, and string formatting.

**Real-world Scenario:** A restaurant POS (point-of-sale) system needs to print receipts.

**Warm-up Mini-Example:**
```javascript
let item = "Coffee";
let price = 3.5;
console.log(`${item.padEnd(15, ".")} $${price.toFixed(2)}`);
// Output: Coffee......... $3.50
```

**Your Exercise:**

```javascript
let restaurantName = "The Golden Spoon";
let items = [
  { name: "Jollof Rice", price: 2500, qty: 2 },
  { name: "Grilled Chicken", price: 3500, qty: 1 },
  { name: "Fruit Juice", price: 800, qty: 3 }
];
let vatRate = 0.075;
```

**Step-by-step Instructions:**
1. Calculate each item's subtotal (price × qty)
2. Sum all subtotals for total before tax
3. Calculate VAT (7.5%)
4. Calculate grand total
5. Format a complete receipt using template strings and `.toFixed(2)`

**Expected Output:**
```
=============================
      THE GOLDEN SPOON
=============================
Jollof Rice x2      ₦5,000.00
Grilled Chicken x1  ₦3,500.00
Fruit Juice x3      ₦2,400.00
-----------------------------
Subtotal:           ₦10,900.00
VAT (7.5%):           ₦817.50
-----------------------------
GRAND TOTAL:        ₦11,717.50
=============================
```

---

## 16. Mini-Project: Student Report Card Generator

### 🎓 Project Overview

You will build a **Student Report Card Generator** — a realistic program that takes student data, processes it using string methods, and produces a formatted report card.

**What you'll practice:** All string concepts from this tutorial — creation, template literals, `.toUpperCase()`, `.padStart()`, `.padEnd()`, `.repeat()`, `.includes()`, `.slice()`, and more.

---

### Stage 1 — Setup & Core Data

**Illustrative Preview:**
```javascript
let name = "Adeola";
console.log(`Student: ${name.toUpperCase()}`);
// Output: Student: ADEOLA
```

**Your Setup:**

```javascript
// Student data
let studentName = "  chukwuemeka obi  ";  // needs cleaning
let studentId = "24";                       // needs padding
let subjects = [
  { name: "Mathematics", score: 88 },
  { name: "English Language", score: 72 },
  { name: "Physics", score: 91 },
  { name: "Chemistry", score: 65 },
  { name: "Computer Science", score: 95 }
];
let school = "federal science college";     // needs proper casing
```

**Tasks for Stage 1:**
1. Clean the student name using `.trim()`
2. Capitalize properly (first letter of each word uppercase)
3. Pad the student ID: `"24"` → `"STU-000024"`
4. Format the school name with `.toUpperCase()`

**Expected Output for Stage 1:**
```
Student Name: Chukwuemeka Obi
Student ID:   STU-000024
School:       FEDERAL SCIENCE COLLEGE
```

---

### Stage 2 — Processing Scores & Grades

**Illustrative Preview:**
```javascript
let score = 85;
let grade = score >= 80 ? "A" : score >= 70 ? "B" : "C";
console.log(`Grade: ${grade}`);  // Grade: A
```

**Tasks for Stage 2:**
1. For each subject, assign a letter grade:
   - 90–100 → A (Excellent)
   - 75–89  → B (Very Good)
   - 60–74  → C (Good)
   - 45–59  → D (Pass)
   - Below 45 → F (Fail)
2. Calculate the average score
3. Assign an overall grade
4. Format each line using `.padEnd()` for alignment

**Expected Output for Stage 2:**
```
Subject              Score   Grade
-----------------------------------
Mathematics           88      B
English Language      72      C
Physics               91      A
Chemistry             65      C
Computer Science      95      A
-----------------------------------
Average Score:        82.2    B
```

---

### Stage 3 — Full Report Card Display

**Tasks for Stage 3:**
1. Combine all data into a full formatted report card
2. Add a remarks section based on average
3. Use `.repeat()` for decorative borders
4. Check if student passed all subjects using `.includes()` on a results summary

**Expected Final Output:**
```
╔══════════════════════════════════════════╗
║         FEDERAL SCIENCE COLLEGE          ║
║              REPORT CARD                 ║
╚══════════════════════════════════════════╝

Student Name: Chukwuemeka Obi
Student ID:   STU-000024
Term:         Second Term, 2024/2025

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUBJECT           SCORE    GRADE    REMARK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Mathematics        88       B      Very Good
English Language   72       C      Good
Physics            91       A      Excellent
Chemistry          65       C      Good
Computer Science   95       A      Excellent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Average Score:     82.2     B
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLASS TEACHER'S REMARK:
Chukwuemeka Obi shows strong performance in Science and
Mathematics. Continued effort in English is encouraged.

PROMOTED TO: SS2
══════════════════════════════════════════

Generated: 2025-07-01
```

---

### Reflection Questions

1. How would this project change if you had 200 students? (Hint: think about loops and arrays)
2. In a real school, this data would come from a database. What string methods would you use to sanitize data typed by school administrators?
3. How would you modify the grade boundaries if the school used a different grading system?
4. What would you add to make this report card suitable for email delivery?

---

### Optional Advanced Features

- Add a rank calculation: sort students by average and show position (1st, 2nd, 3rd)
- Generate a subject performance summary: "Student excelled in: Physics, Computer Science"
- Add a pass/fail check: if any subject score is below 40, the student must repeat
- Format the output as HTML instead of plain text, so it can be displayed in a browser

---

## 17. Completion Checklist

| # | Concept | Status |
|---|---------|--------|
| ✅ | Strings explained — what they are and why they exist | Done |
| ✅ | Creating strings with single quotes, double quotes, backticks | Done |
| ✅ | String length with `.length` | Done |
| ✅ | Escape characters (`\"`, `\'`, `\\`, `\n`, `\t`) | Done |
| ✅ | Breaking long lines safely | Done |
| ✅ | Why to avoid `new String()` objects | Done |
| ✅ | Template literals — backticks, multi-line, `${ }` interpolation | Done |
| ✅ | Extraction: `charAt()`, `at()`, `slice()`, `substring()` | Done |
| ✅ | Case: `toUpperCase()`, `toLowerCase()` | Done |
| ✅ | Padding and trimming: `padStart()`, `padEnd()`, `trim()` | Done |
| ✅ | Replacing: `replace()`, `replaceAll()` | Done |
| ✅ | Concatenation and splitting: `concat()`, `split()` | Done |
| ✅ | Search: `indexOf()`, `lastIndexOf()`, `includes()`, `startsWith()`, `endsWith()`, `search()`, `match()`, `matchAll()` | Done |
| ✅ | Complete reference table of all string methods | Done |
| ✅ | 3 Applied Exercises with real-world scenarios | Done |
| ✅ | Full mini-project: Student Report Card Generator | Done |
| ✅ | Common beginner errors highlighted throughout | Done |
| ✅ | Reflection questions answered | Done |

---

**One-sentence summary:** JavaScript strings are sequences of text wrapped in quotes or backticks, and they come with a powerful set of built-in methods for creating, searching, extracting, transforming, and formatting text — skills that are essential in every web development, data processing, and application-building job.
