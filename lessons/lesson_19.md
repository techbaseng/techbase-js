---
render_with_liquid: false
title: "JavaScript Regular Expressions: Patterns · Flags · Characters · Meta Characters · Assertions · Quantifiers · Groups · RegExp Object · Methods"
nav_order: 19
---

## 📑 Table of Contents
1.  [Background: What Are Regular Expressions?](#1-background-what-are-regular-expressions)
2.  [Topic 1 — Creating Regular Expressions](#2-topic-1--creating-regular-expressions)
3.  [Topic 2 — Flags (Modifiers)](#3-topic-2--flags-modifiers)
4.  [Topic 3 — Character Classes & Ranges](#4-topic-3--character-classes--ranges)
5.  [Topic 4 — Meta Characters](#5-topic-4--meta-characters)
6.  [Topic 5 — Assertions (Anchors & Lookarounds)](#6-topic-5--assertions-anchors--lookarounds)
7.  [Topic 6 — Quantifiers](#7-topic-6--quantifiers)
8.  [Topic 7 — Groups & Patterns](#8-topic-7--groups--patterns)
9.  [Topic 8 — The RegExp Object](#9-topic-8--the-regexp-object)
10. [Topic 9 — RegExp & String Methods](#10-topic-9--regexp--string-methods)
11. [Applied Exercises](#11-applied-exercises)
12. [Mini Project — Form Validator & Text Processor](#12-mini-project--form-validator--text-processor)
13. [Completion Checklist](#13-completion-checklist)

---

## 1. Background: What Are Regular Expressions?

Imagine you receive a form submission with thousands of email addresses and need to check which ones are valid. Or you have a document full of phone numbers in inconsistent formats — `(080) 123-4567`, `080-123-4567`, `08012345678` — and need to extract and standardise them all.

Doing this with normal string methods (`indexOf`, `includes`, `slice`) would require dozens of lines of complex logic. A **regular expression** (RegExp or regex) solves it in a single pattern.

```javascript
// ❌ Without regex — checking one simple email condition takes many lines
function roughEmailCheck(email) {
  const hasAt    = email.includes("@");
  const hasDot   = email.includes(".");
  const atIndex  = email.indexOf("@");
  const dotAfter = email.lastIndexOf(".") > atIndex;
  return hasAt && hasDot && dotAfter;
}

// ✅ With regex — a full email pattern in one expression
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailPattern.test("alice@example.com")); // true
console.log(emailPattern.test("not-an-email"));       // false
```

A **regular expression** is a sequence of characters that defines a **search pattern**. It describes what to look for in a string — not by spelling out exact text, but by specifying a *pattern* of characters.

### What Can You Do with Regular Expressions?

| Task | Example |
|------|---------|
| **Test** if a string matches a pattern | Is this a valid email? |
| **Find** all matches in a string | Find every phone number in a document |
| **Extract** specific parts of a match | Get the area code from each phone number |
| **Replace** matched text | Censor words, reformat dates |
| **Split** a string on a pattern | Split CSV respecting quoted commas |
| **Validate** user input | Forms, APIs, data pipelines |

> 🏢 **REAL WORLD:** Regex is used by every major programming language and tool. In professional JavaScript, it appears in form validation, search engines, URL routers, log parsers, code editors (search & replace), data cleaning pipelines, and security filters (blocking SQL injection patterns).

---

### Anatomy of a Regular Expression

```
/pattern/flags
```

```
  /  \d{3}-\d{4}  /  g
  ↑   ↑           ↑  ↑
  |   pattern     |  flag(s)
  delimiter       delimiter
```

- The **delimiters** (`/`) mark the start and end — like quotes for strings
- The **pattern** is what to search for
- The **flags** (optional) modify how the search works (e.g. case-insensitive, global)

---
---

## 2. Topic 1 — Creating Regular Expressions

> **Phase 1 — Conceptual Understanding**

There are two ways to create a regex in JavaScript. Understanding the difference is important for choosing the right one.

---

### Method 1 — Literal Syntax (Preferred)

Use forward slashes to wrap the pattern. The pattern is compiled at **load time** — faster and cleaner for fixed patterns.

```javascript
const pattern = /hello/;

console.log(pattern.test("say hello world")); // true
console.log(pattern.test("say goodbye"));     // false
```

> 💡 **TIP:** Always prefer literal syntax unless the pattern is built dynamically at runtime. Literals are faster, cleaner, and checked for syntax errors when the script loads.

---

### Method 2 — `new RegExp()` Constructor

Passes the pattern as a **string**. The pattern is compiled at **runtime** — required when the pattern is built from variables.

```javascript
// Static pattern — same as /hello/
const pattern1 = new RegExp("hello");

// Dynamic pattern — built from a variable
const word    = "world";
const pattern2 = new RegExp(word);

console.log(pattern1.test("say hello")); // true
console.log(pattern2.test("hello world")); // true
```

> ⚠️ **WATCH OUT — Escaping in Constructor Strings:** In a regex literal, `\d` means "a digit". In a constructor string, the backslash must be **doubled** because `\d` in a JavaScript string is just `d` (unrecognised escape).
>
> ```javascript
> // These are EQUIVALENT:
> const a = /\d+/;             // literal — \d is the regex metachar
> const b = new RegExp("\\d+"); // string — \\ is needed to produce \d
>
> console.log(a.test("abc123")); // true
> console.log(b.test("abc123")); // true
> ```

---

### Adding Flags at Creation

```javascript
// Literal — flags after the closing slash
const lit = /hello/gi;

// Constructor — flags as second argument
const con = new RegExp("hello", "gi");

// Both are identical — case-insensitive, global match
console.log("Hello World, hello!".match(lit)); // ["Hello", "hello"]
console.log("Hello World, hello!".match(con)); // ["Hello", "hello"]
```

---
---

## 3. Topic 2 — Flags (Modifiers)

> **Phase 1 — Conceptual Understanding**

Flags change how the entire regex engine behaves. They are placed after the closing `/` in a literal, or as the second argument to `new RegExp()`.

---

### `i` — Case-Insensitive

Makes the entire match ignore uppercase vs lowercase.

```javascript
const pattern = /hello/i;

console.log(pattern.test("Hello"));    // true
console.log(pattern.test("HELLO"));    // true
console.log(pattern.test("hElLo"));    // true
console.log(pattern.test("goodbye")); // false
```

#### Without vs with `i`:
```javascript
console.log(/Cat/.test("I have a cat")); // false — uppercase C doesn't match lowercase c
console.log(/Cat/i.test("I have a cat")); // true  — i flag ignores case
```

---

### `g` — Global (Find ALL Matches)

Without `g`, methods like `match()` return only the **first** match. With `g`, they return **all** matches.

```javascript
const text = "cat and Cat and CAT";

// Without g — only first match
console.log(text.match(/cat/i));  // ["cat"]  (just first)

// With gi — ALL matches
console.log(text.match(/cat/gi)); // ["cat", "Cat", "CAT"]
```

> ⚠️ **WATCH OUT — `g` flag and `test()`:** When you use `g` with a regex stored in a variable and call `.test()` repeatedly, the regex remembers its last position (`lastIndex`). This causes alternating true/false results in a loop!
>
> ```javascript
> const re = /cat/g;
> console.log(re.test("cat"));   // true  (lastIndex → 3)
> console.log(re.test("cat"));   // false (search starts at 3, past end!)
> console.log(re.test("cat"));   // true  (lastIndex reset to 0)
>
> // Fix: use .test() without g, or reset lastIndex manually
> re.lastIndex = 0; // reset before reuse
> ```

---

### `m` — Multiline

Changes the meaning of `^` (start) and `$` (end) anchors. Without `m`, `^` and `$` match the start/end of the entire string. With `m`, they match the start/end of **each line**.

```javascript
const text = "first line\nsecond line\nthird line";

// Without m — ^ only matches start of entire string
console.log(text.match(/^\w+/));  // ["first"]

// With m — ^ matches start of EACH line
console.log(text.match(/^\w+/gm)); // ["first", "second", "third"]
```

---

### `s` — Dot-All (Single-Line)

By default, the `.` metacharacter matches any character **except newlines**. The `s` flag makes `.` match newlines too.

```javascript
const text = "Hello\nWorld";

console.log(/Hello.World/.test(text));  // false — . doesn't match \n
console.log(/Hello.World/s.test(text)); // true  — s flag makes . match \n
```

---

### `d` — Generate Indices

Makes `exec()` and `match()` include `indices` — the start/end positions of each match and capture group.

```javascript
const match = /(\w+)/.exec("hello world");
console.log(match.indices); // undefined — no d flag

const matchD = /(\w+)/d.exec("hello world");
console.log(matchD.indices); // [[0,5],[0,5]] — [full match range, group 1 range]
```

---

### `u` — Unicode Mode

Enables full Unicode support, including matching Unicode code points above U+FFFF and making `\p{...}` Unicode property escapes available.

```javascript
// Without u — \uD83D\uDC4D is a surrogate pair (emoji 👍)
console.log(/^.$/.test("👍"));    // false — emoji is 2 "characters" without u
console.log(/^.$/u.test("👍"));   // true  — u mode treats it as 1 code point

// Unicode property escapes (requires u flag)
console.log(/\p{Letter}/u.test("A"));  // true
console.log(/\p{Emoji}/u.test("👍"));  // true
```

---

### `v` — Unicode Sets Mode (ES2024)

An upgrade to `u` mode — enables set operations inside character classes (`[A--B]`, `[A&&B]`), Unicode property strings, and improved Unicode handling.

```javascript
// Intersection — match characters that are both letters AND ASCII
const asciiLetter = /[\p{Letter}&&\p{ASCII}]/v;
console.log(asciiLetter.test("A")); // true
console.log(asciiLetter.test("é")); // false — not ASCII
```

---

### `y` — Sticky

The match must start at exactly `lastIndex` — it does not search forward. Used for incremental parsing.

```javascript
const re = /\d+/y;
re.lastIndex = 4;

console.log(re.exec("abc 123 456")); // ["123"] — found at exactly index 4
re.lastIndex = 0;
console.log(re.exec("abc 123 456")); // null — position 0 is 'a', not a digit
```

---

### Flags Summary Table

| Flag | Name | Effect |
|------|------|--------|
| `i` | Case-insensitive | Ignore uppercase/lowercase |
| `g` | Global | Find ALL matches (not just first) |
| `m` | Multiline | `^` and `$` match each line |
| `s` | Dot-all | `.` matches newlines too |
| `d` | Indices | Include start/end positions of matches |
| `u` | Unicode | Full Unicode support + `\p{}` escapes |
| `v` | Unicode sets | Set operations in `[]`, Unicode strings |
| `y` | Sticky | Match only at exact `lastIndex` position |

---

### Combining Multiple Flags

Flags can be combined in any order:

```javascript
// Case-insensitive AND global AND multiline
const pattern = /^hello/gim;

const text = "Hello World\nhello there\nHELLO!";
console.log(text.match(pattern)); // ["Hello", "hello", "HELLO"]
```

---
---

## 4. Topic 3 — Character Classes & Ranges

> **Phase 1 — Conceptual Understanding**

A **character class** (also called a character set) lets you match any one character from a defined group. They are written inside square brackets `[...]`.

---

### `[abc]` — Match Any Listed Character

Matches ONE character that is `a`, `b`, or `c` — any single character in the list.

```javascript
// [aeiou] matches any single vowel
const vowel = /[aeiou]/;

console.log(vowel.test("apple")); // true  (contains 'a')
console.log(vowel.test("sky"));   // false (no vowels)
console.log(vowel.test("gym"));   // false ('y' not in class)
```

#### Find ALL vowels with `g`:
```javascript
const text = "Hello World";
console.log(text.match(/[aeiou]/gi)); // ["e", "o", "o"]
```

**▶ Expected Output:** `["e", "o", "o"]`

---

### `[^abc]` — Negated Character Class — Match Anything EXCEPT Listed

The `^` inside `[...]` **negates** the class — matches any character NOT in the list.

```javascript
// [^aeiou] matches any NON-vowel character
console.log("Hello".match(/[^aeiou]/gi)); // ["H", "l", "l"]

// [^0-9] matches any non-digit character
console.log("a1b2c3".match(/[^0-9]/g));  // ["a", "b", "c"]
```

> ⚠️ **WATCH OUT:** `^` inside `[...]` means negation. `^` outside `[...]` means start-of-string anchor. Two completely different meanings!
>
> ```javascript
> /^[abc]/  // Starts with a, b, or c
> /[^abc]/  // Any character EXCEPT a, b, c
> ```

---

### `[a-z]` — Character Range

A hyphen `-` inside `[...]` defines a range. Matches any character between the two endpoints (inclusive), based on Unicode code points.

```javascript
// Lowercase letters
console.log(/[a-z]/.test("hello"));  // true
console.log(/[a-z]/.test("HELLO"));  // false — uppercase

// Uppercase letters
console.log(/[A-Z]/.test("Hello"));  // true

// Digits
console.log(/[0-9]/.test("abc5"));   // true
console.log(/[0-9]/.test("abcde"));  // false

// Letters AND digits combined
console.log(/[a-zA-Z0-9]/.test("a1")); // true
```

#### Practical ranges:

```javascript
// Extract only letters from a messy string
const messy = "H3ll0 W0rld!";
console.log(messy.match(/[a-zA-Z]/g)); // ["H", "l", "l", "W", "r", "l", "d"]

// Remove non-digit characters from phone number
const phone = "(080) 123-4567";
console.log(phone.replace(/[^0-9]/g, "")); // "08012345678"
```

**▶ Expected Output:**
```
["H", "l", "l", "W", "r", "l", "d"]
08012345678
```

---

### Combining Ranges and Characters

You can mix ranges and individual characters inside one class:

```javascript
// Alphanumeric + underscore + hyphen
const slug = /^[a-zA-Z0-9_-]+$/;

console.log(slug.test("my-blog-post"));    // true
console.log(slug.test("my blog post"));    // false (space not allowed)
console.log(slug.test("my_blog_2024"));    // true
console.log(slug.test("my@blog!post"));    // false (@ and ! not allowed)
```

> 💡 **TIP:** The hyphen `-` is special inside `[...]`. To include a literal hyphen, place it at the **start** or **end** of the class, or escape it with `\-`:
> ```javascript
> /[a-z-]/   // letters a-z OR a literal hyphen (hyphen at end = literal)
> /[-a-z]/   // same — hyphen at start = literal
> /[a\-z]/   // escaped — also literal hyphen
> ```

---

### Common Character Class Patterns

```javascript
// Hex digit (0-9 and a-f and A-F)
const hex = /[0-9a-fA-F]/;
console.log(hex.test("F")); // true
console.log(hex.test("G")); // false

// Filename character (no slashes, colons)
const filename = /^[^/\\:*?"<>|]+$/;
console.log(filename.test("report_2024.pdf")); // true
console.log(filename.test("file/path"));        // false

// Valid username: letters, digits, underscore, 3-20 chars
const username = /^[a-zA-Z0-9_]{3,20}$/;
console.log(username.test("alice_99"));   // true
console.log(username.test("a"));          // false (too short)
console.log(username.test("alice-99"));   // false (hyphen not allowed)
```

---
---

## 5. Topic 4 — Meta Characters

> **Phase 1 — Conceptual Understanding**

**Meta characters** are special characters in regex that have a meaning beyond their literal value. They are the core building blocks of every pattern.

---

### Shorthand Character Classes

These are the most frequently used meta characters — each represents a common character class:

#### `\d` — Any Digit `[0-9]`

```javascript
console.log(/\d/.test("abc5def")); // true  — contains a digit
console.log(/\d/.test("abcdef"));  // false — no digits

// Find all digits in a string
console.log("a1b22c333".match(/\d+/g)); // ["1", "22", "333"]
```

#### `\D` — Any NON-Digit `[^0-9]`

```javascript
console.log("a1b22c333".match(/\D+/g)); // ["a", "b", "c"]
```

#### `\w` — Word Character `[a-zA-Z0-9_]`

Matches letters, digits, and underscore — the characters valid in most identifiers.

```javascript
console.log(/\w/.test("hello")); // true
console.log(/\w/.test("!@#$")); // false — no word characters

// Extract words
console.log("Hello, World! 2024".match(/\w+/g)); // ["Hello", "World", "2024"]
```

#### `\W` — Any NON-Word Character `[^a-zA-Z0-9_]`

```javascript
// Find all punctuation/spaces
console.log("Hello, World!".match(/\W+/g)); // [",", " ", "!"]
```

#### `\s` — Any Whitespace `[ \t\n\r\f\v]`

Matches space, tab, newline, carriage return, form feed, vertical tab.

```javascript
console.log(/\s/.test("hello world")); // true  — has a space
console.log(/\s/.test("helloworld")); // false — no whitespace

// Normalise multiple spaces to one
console.log("too   many    spaces".replace(/\s+/g, " ")); // "too many spaces"
```

#### `\S` — Any NON-Whitespace

```javascript
// Extract non-space "tokens"
console.log("  hello   world  ".match(/\S+/g)); // ["hello", "world"]
```

---

### The Dot `.` — Any Character (Except Newline)

`.` matches **any single character** except a newline `\n` (unless `s` flag is used).

```javascript
console.log(/./.test("a"));   // true
console.log(/./.test("5"));   // true
console.log(/./.test("!"));   // true
console.log(/./.test("\n"));  // false — newline excluded
console.log(/./s.test("\n")); // true  — s flag includes newline

// Pattern: exactly 3 characters starting with 'c'
console.log(/^c..$/. test("cat")); // true
console.log(/^c..$/. test("cart")); // false (4 chars)
```

> 🐛 **COMMON MISTAKE:** Using `.` when you mean "any character" often creates **overly broad patterns** that match too much. Prefer `[^\n]` or specific character classes when you know what you expect. Also, to match a **literal dot** (e.g., in `example.com`), you must escape it: `\.`

```javascript
// ❌ Wrong — dot matches ANY character including commas, slashes, etc.
/www.example.com/  // also matches "wwwXexampleYcom"!

// ✅ Correct — escape the dots to match literal periods
/www\.example\.com/
```

---

### Escape Character `\`

Backslash `\` turns a special character into a literal one.

```javascript
// Match a literal dot
console.log(/3\.14/.test("3.14")); // true
console.log(/3\.14/.test("3X14")); // false

// Match a literal dollar sign
console.log(/\$100/.test("$100")); // true
console.log(/\$100/.test("100"));  // false

// Match a literal backslash (needs \\)
console.log(/C:\\Users/.test("C:\\Users")); // true
```

#### Characters that MUST be escaped to match literally:

```
. * + ? ^ $ { } [ ] | ( ) \
```

```javascript
// Match a literal question mark
console.log(/Are you sure\?/.test("Are you sure?")); // true

// Match a literal parenthesis
console.log(/\(555\)/.test("(555)")); // true
```

---

### Alternation `|` — OR

The pipe `|` matches either the pattern on the left OR the pattern on the right. It is like an "or" for entire sub-expressions.

```javascript
// Match "cat" OR "dog"
const petPattern = /cat|dog/;
console.log(petPattern.test("I have a cat")); // true
console.log(petPattern.test("I have a dog")); // true
console.log(petPattern.test("I have a bird")); // false

// Find all occurrences
const text = "cat and dog and cat";
console.log(text.match(/cat|dog/g)); // ["cat", "dog", "cat"]
```

> 💡 **TIP:** Alternation has the **lowest precedence** in regex. Use groups `(...)` to limit its scope:
> ```javascript
> /gray|grey/    // "gray" OR "grey" ← correct
> /gr(a|e)y/     // "gr" then ("a" OR "e") then "y" ← also correct, different structure
> /I love cat|dog/ // "I love cat" OR "dog" ← probably not what you wanted!
> /I love (cat|dog)/ // "I love cat" OR "I love dog" ← correct
> ```

---

### Meta Characters Reference Table

| Meta Char | Meaning | Example | Matches |
|-----------|---------|---------|---------|
| `.` | Any char (not newline) | `a.b` | "aXb", "a1b" |
| `\d` | Digit `[0-9]` | `\d\d` | "42", "09" |
| `\D` | Non-digit | `\D+` | "abc", "!!" |
| `\w` | Word char `[a-zA-Z0-9_]` | `\w+` | "hello_2" |
| `\W` | Non-word char | `\W+` | "!@#", ", " |
| `\s` | Whitespace | `\s+` | " ", "\t\n" |
| `\S` | Non-whitespace | `\S+` | "hello", "42" |
| `\b` | Word boundary | `\bcat\b` | "cat" not "cats" |
| `\B` | Non-word boundary | `\Bcat\B` | "tomcat" |
| `\n` | Newline literal | `\n` | newline char |
| `\t` | Tab literal | `\t` | tab char |
| `\r` | Carriage return | `\r` | CR char |
| `\0` | Null character | `\0` | null |
| `\uXXXX` | Unicode code point | `\u0041` | "A" |
| `\xHH` | Hex character | `\x41` | "A" |
| `\\` | Literal backslash | `C:\\` | "C:\" |
| `\|` | Literal pipe | `a\|b` | "a|b" |

---
---

## 6. Topic 5 — Assertions (Anchors & Lookarounds)

> **Phase 1 — Conceptual Understanding**

**Assertions** are zero-width matches — they describe a **position** in the string rather than consuming characters. They are like "conditions" that must be true at a point in the string for the overall match to succeed.

---

### `^` — Start of String (or Line with `m`)

The pattern must match at the very beginning of the string.

```javascript
// String must START with "Hello"
console.log(/^Hello/.test("Hello World")); // true
console.log(/^Hello/.test("Say Hello"));   // false — "Hello" not at start

// With m flag — start of each LINE
const text = "apple\nbanana\napricot";
console.log(text.match(/^a\w+/gm)); // ["apple", "apricot"]
```

---

### `$` — End of String (or Line with `m`)

The pattern must match at the very end of the string.

```javascript
// String must END with ".com"
console.log(/\.com$/.test("example.com"));       // true
console.log(/\.com$/.test("example.com/path")); // false

// Validate format: digits only
console.log(/^\d+$/.test("12345")); // true  — all digits
console.log(/^\d+$/.test("123a5")); // false — 'a' breaks the pattern
```

> 💡 **TIP:** `^pattern$` (anchoring both ends) is the cornerstone of validation patterns — it ensures the **entire** string matches, with nothing extra before or after.

---

### `\b` — Word Boundary

Matches a **position** between a word character (`\w`) and a non-word character (`\W`) — the invisible boundary at the edge of a word.

```javascript
// Match the word "cat" but not "catch", "cats", "tomcat"
const pattern = /\bcat\b/;

console.log(pattern.test("my cat sat"));  // true  — "cat" as a whole word
console.log(pattern.test("my cats"));     // false — "cat" followed by "s"
console.log(pattern.test("tomcat"));      // false — "cat" preceded by "tom"
console.log(pattern.test("the cat."));    // true  — dot is non-word boundary
```

> 🏢 **REAL WORLD:** `\b` is essential for **whole-word search** — find the word "apple" but not "pineapple" or "apples". Every modern text editor's "Find Whole Word Only" feature uses `\b` internally.

#### Extract whole words only:
```javascript
const text = "category: cats and catfish and a cat";
console.log(text.match(/\bcat\b/g)); // ["cat"] — only the standalone word
```

---

### `\B` — Non-Word Boundary

Matches a position that is NOT a word boundary — inside a word.

```javascript
// Match "cat" only when it's INSIDE a larger word
const pattern = /\Bcat\B/;

console.log(pattern.test("tomcats"));  // true  — "cat" inside "tomcats"
console.log(pattern.test("my cat"));   // false — "cat" is a whole word here
```

---

### Lookahead `(?=...)` — "Followed By"

A **positive lookahead** asserts that what follows the current position matches the given pattern — without consuming those characters.

```javascript
// Match "100" only if followed by " dollars"
const pattern = /\d+(?= dollars)/;

console.log(pattern.exec("I have 100 dollars")); // ["100"]
console.log(pattern.exec("I have 100 euros"));   // null — not followed by " dollars"

// The match is just "100" — " dollars" is NOT included in the match
const result = /\d+(?= dollars)/.exec("I have 100 dollars");
console.log(result[0]); // "100"   ← only the digits, not " dollars"
```

**▶ Expected Output:**
```
["100"]
null
100
```

> 💡 **TIP:** Lookahead is "peek ahead" — it checks what comes next but doesn't eat it. Think of it as "match X only when it is followed by Y, but don't include Y in the match."

---

### Negative Lookahead `(?!...)` — "NOT Followed By"

Asserts that what follows does **not** match the pattern.

```javascript
// Match "100" only if NOT followed by " euros"
const pattern = /\d+(?! euros)/g;

const text = "100 dollars and 200 euros and 50 pounds";
console.log(text.match(pattern)); // ["100", "50"] — "200" is followed by " euros"
```

**▶ Expected Output:** `["100", "50"]`

---

### Lookbehind `(?<=...)` — "Preceded By"

A **positive lookbehind** asserts that what precedes the current position matches the pattern — without consuming those characters.

```javascript
// Match digits only if preceded by "$"
const pattern = /(?<=\$)\d+/g;

const text = "Price: $100 and €200 and $350";
console.log(text.match(pattern)); // ["100", "350"] — only dollar amounts
```

**▶ Expected Output:** `["100", "350"]`

---

### Negative Lookbehind `(?<!...)` — "NOT Preceded By"

Asserts that what precedes does **not** match.

```javascript
// Match digits NOT preceded by "$"
const pattern = /(?<!\$)\d+/g;

const text = "I paid $100 and owed 200 more";
// Careful — this matches parts of numbers. Often combine with \b
const text2 = "I paid $100 and owed 200 more";
console.log(text2.match(/(?<!\$)\b\d+\b/g)); // ["200"]
```

---

### Lookaround Summary

| Assertion | Syntax | Meaning |
|-----------|--------|---------|
| Positive lookahead | `X(?=Y)` | Match X followed by Y |
| Negative lookahead | `X(?!Y)` | Match X NOT followed by Y |
| Positive lookbehind | `(?<=Y)X` | Match X preceded by Y |
| Negative lookbehind | `(?<!Y)X` | Match X NOT preceded by Y |
| Start of string | `^` | Match at string start |
| End of string | `$` | Match at string end |
| Word boundary | `\b` | Between word and non-word char |
| Non-word boundary | `\B` | Not between word and non-word char |

---
---

## 7. Topic 6 — Quantifiers

> **Phase 1 — Conceptual Understanding**

**Quantifiers** specify how many times the preceding element must occur. Without quantifiers, every character or group matches exactly once.

---

### `*` — Zero or More

Matches **zero or more** repetitions of the preceding element. Even zero — the element can be completely absent.

```javascript
// "ab*c" — 'a', then zero or more 'b', then 'c'
console.log(/ab*c/.test("ac"));     // true  — zero b's
console.log(/ab*c/.test("abc"));    // true  — one b
console.log(/ab*c/.test("abbbbc")); // true  — four b's
console.log(/ab*c/.test("aXc"));    // false — X is not b
```

> ⚠️ **WATCH OUT:** `*` can match nothing. `/a*/` matches any string — even an empty one — because "zero or more a's" allows empty. This can make patterns match unexpected things.

---

### `+` — One or More

Matches **one or more** repetitions. The element must appear at least once.

```javascript
// "ab+c" — 'a', then ONE or more 'b', then 'c'
console.log(/ab+c/.test("ac"));      // false — no b's (at least 1 required)
console.log(/ab+c/.test("abc"));     // true  — one b
console.log(/ab+c/.test("abbbbc")); // true  — four b's
```

#### `\d+` — One or more digits — the most common use:
```javascript
// Find all numbers in text
const text = "Order 1 has 250 items and order 12 has 3 items";
console.log(text.match(/\d+/g)); // ["1", "250", "12", "3"]
```

---

### `?` — Zero or One (Optional)

Makes the preceding element **optional** — it can appear once or not at all.

```javascript
// "colou?r" — optional 'u' (matches British and American English)
console.log(/colou?r/.test("color"));   // true — no u
console.log(/colou?r/.test("colour"));  // true — with u
console.log(/colou?r/.test("colouur")); // false — two u's

// Optional extension
console.log(/https?:\/\//.test("http://"));  // true
console.log(/https?:\/\//.test("https://")); // true
```

---

### `{n}` — Exactly n Times

```javascript
// Exactly 4 digits
console.log(/^\d{4}$/.test("2024")); // true
console.log(/^\d{4}$/.test("202"));  // false (3 digits)
console.log(/^\d{4}$/.test("20245")); // false (5 digits)

// Exactly 3 letters
console.log(/^[A-Z]{3}$/.test("ABC")); // true
console.log(/^[A-Z]{3}$/.test("AB"));  // false
```

---

### `{n,}` — n or More Times

```javascript
// 3 or more digits
console.log(/\d{3,}/.test("12"));    // false
console.log(/\d{3,}/.test("123"));   // true
console.log(/\d{3,}/.test("12345")); // true
```

---

### `{n,m}` — Between n and m Times (Inclusive)

```javascript
// Between 2 and 5 digits
console.log(/^\d{2,5}$/.test("1"));      // false (too few)
console.log(/^\d{2,5}$/.test("12"));     // true
console.log(/^\d{2,5}$/.test("12345")); // true
console.log(/^\d{2,5}$/.test("123456")); // false (too many)
```

> 🏢 **REAL WORLD:** `{n,m}` is the backbone of all validation patterns — password length, username length, phone number formats, postal codes, credit card numbers.

---

### Greedy vs Lazy Quantifiers

By default, quantifiers are **greedy** — they match as much as possible while still allowing the overall pattern to succeed.

Adding `?` after a quantifier makes it **lazy** — it matches as little as possible.

```javascript
const html = "<div>Hello</div><div>World</div>";

// Greedy — matches from first < to LAST >
console.log(html.match(/<.+>/));
// ["<div>Hello</div><div>World</div>"] ← too much!

// Lazy — matches from first < to FIRST >
console.log(html.match(/<.+?>/));
// ["<div>"] ← just the first tag
```

**▶ Expected Output:**
```
["<div>Hello</div><div>World</div>"]
["<div>"]
```

#### Full lazy quantifier table:

| Greedy | Lazy | Difference |
|--------|------|------------|
| `*` | `*?` | Zero or more — as few as possible |
| `+` | `+?` | One or more — as few as possible |
| `?` | `??` | Zero or one — prefers zero |
| `{n,m}` | `{n,m}?` | n to m — as few as possible |

```javascript
// Extract content between tags lazily
const text = "<b>Bold</b> and <i>italic</i>";
console.log(text.match(/<[^>]+>[^<]*<\/[^>]+>/g));
// ["<b>Bold</b>", "<i>italic</i>"]

// Or with lazy quantifier
console.log(text.match(/<.+?>.+?<\/.+?>/g));
// ["<b>Bold</b>", "<i>italic</i>"]
```

---

### Possessive Quantifiers (Atomic Matching)

Adding `+` after a quantifier (`*+`, `++`, `?+`, `{n}+`) prevents backtracking — once consumed, the engine won't give characters back. Used for performance and avoiding catastrophic backtracking.

> ⚠️ **NOTE:** Possessive quantifiers require JavaScript ES2018+ and are not universally supported in all environments. Check compatibility before use.

---

### Quantifiers Summary

| Quantifier | Meaning |
|-----------|---------|
| `*` | 0 or more (greedy) |
| `+` | 1 or more (greedy) |
| `?` | 0 or 1 (optional) |
| `{n}` | Exactly n |
| `{n,}` | n or more |
| `{n,m}` | Between n and m |
| `*?` | 0 or more (lazy) |
| `+?` | 1 or more (lazy) |
| `??` | 0 or 1 (lazy, prefers 0) |
| `{n,m}?` | n to m (lazy) |

---
---

## 8. Topic 7 — Groups & Patterns

> **Phase 1 — Conceptual Understanding**

**Groups** let you treat multiple characters as a single unit — applying quantifiers to them, capturing their matched text, or creating non-capturing groupings for alternation.

---

### `(...)` — Capturing Group

Wraps part of a pattern to:
1. Treat multiple characters as one unit (for quantifiers, alternation)
2. **Capture** the matched text so you can extract it

```javascript
// Without group — + applies only to 'b'
console.log(/ab+/.test("abb")); // true (a then 2 b's)

// With group — + applies to the whole "(ab)"
console.log(/(ab)+/.test("ababab")); // true (ab repeated 3 times)
console.log(/(ab)+/.test("abb"));    // false — "abb" doesn't have repeating "ab"
```

#### Capturing — extracting matched substrings:

```javascript
// Capture year, month, day from a date string
const datePattern = /(\d{4})-(\d{2})-(\d{2})/;
const match = datePattern.exec("Today is 2024-03-15");

console.log(match[0]); // "2024-03-15" — full match
console.log(match[1]); // "2024"       — group 1 (year)
console.log(match[2]); // "03"         — group 2 (month)
console.log(match[3]); // "15"         — group 3 (day)
```

**▶ Expected Output:**
```
2024-03-15
2024
03
15
```

---

### Named Capturing Groups `(?<name>...)`

Instead of accessing captures by index (`match[1]`), name them for clarity using `(?<name>...)`.

```javascript
const datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = datePattern.exec("Today is 2024-03-15");

console.log(match.groups.year);  // "2024"
console.log(match.groups.month); // "03"
console.log(match.groups.day);   // "15"

// Also usable in replace with $<name>
const reformatted = "2024-03-15".replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  "$<day>/$<month>/$<year>"
);
console.log(reformatted); // "15/03/2024"
```

**▶ Expected Output:**
```
2024
03
15
15/03/2024
```

> 🏢 **REAL WORLD:** Named groups make complex patterns self-documenting. A date regex with `.groups.year` is far clearer than one with `[1]` — especially when patterns have many groups.

---

### `(?:...)` — Non-Capturing Group

Groups characters for quantifiers or alternation WITHOUT capturing the match. More efficient when you don't need the captured text.

```javascript
// Capturing group — creates a capture (slower, uses memory)
const a = /(\d{3})-(\d{4})/.exec("555-1234");
console.log(a[1], a[2]); // "555" "1234"

// Non-capturing — groups for structure, no capture
const b = /(?:\d{3})-(?:\d{4})/.exec("555-1234");
console.log(b[1]); // undefined — no captures!

// Non-capturing for alternation
const color = /gr(?:a|e)y/; // matches "gray" or "grey"
console.log(color.test("gray")); // true
console.log(color.test("grey")); // true
```

> 💡 **TIP:** Use `(?:...)` whenever you need grouping but don't need to extract the captured text. It is faster and keeps your capture group numbering clean.

---

### Backreferences `\1`, `\2` — Refer Back to a Captured Group

A backreference matches the **same text** that was captured by an earlier group. Use `\1` for group 1, `\2` for group 2, and so on.

```javascript
// \1 must match the same word as group 1 captured
const doubled = /(\b\w+\b) \1/;

console.log(doubled.test("the the"));    // true  — "the" repeated
console.log(doubled.test("cat cat"));    // true  — "cat" repeated
console.log(doubled.test("the cat"));    // false — different words

// Find repeated words in text
const text = "I think that that is a problem problem.";
const matches = text.match(/\b(\w+)\b \1\b/g);
console.log(matches); // ["that that", "problem problem"]
```

**▶ Expected Output:**
```
true
true
false
["that that", "problem problem"]
```

#### Named backreference `\k<name>`:

```javascript
// Match opening and closing HTML tag pairs
const tagPattern = /<(?<tag>\w+)>[^<]*<\/\k<tag>>/;

console.log(tagPattern.test("<div>Hello</div>"));    // true
console.log(tagPattern.test("<b>Bold</b>"));         // true
console.log(tagPattern.test("<div>Hello</span>"));   // false — mismatched tags
```

---

### Common Validation Patterns

These patterns combine everything covered so far:

```javascript
// Email (simplified — RFC 5322 is much more complex)
const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(email.test("alice@example.com"));  // true
console.log(email.test("alice@.com"));          // false
console.log(email.test("aliceexample.com"));   // false

// International phone (E.164 format)
const phone = /^\+?[1-9]\d{7,14}$/;
console.log(phone.test("+2348012345678")); // true
console.log(phone.test("08012345678"));    // true (no + ok)
console.log(phone.test("123"));            // false (too short)

// URL (simplified)
const url = /^https?:\/\/[a-zA-Z0-9.-]+(?:\.[a-zA-Z]{2,})(?:\/[^\s]*)?$/;
console.log(url.test("https://example.com"));          // true
console.log(url.test("http://example.com/path?q=1")); // true
console.log(url.test("ftp://example.com"));            // false

// Strong password — 8+ chars, uppercase, lowercase, digit, special
const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
console.log(password.test("Hello123!"));   // true
console.log(password.test("hello123!"));   // false (no uppercase)
console.log(password.test("Hello!"));      // false (no digit, too short)

// Nigerian BVN (Bank Verification Number) — 11 digits
const bvn = /^\d{11}$/;
console.log(bvn.test("12345678901")); // true
console.log(bvn.test("1234567890"));  // false (10 digits)

// Postal code — US ZIP (5 digits or ZIP+4)
const zip = /^\d{5}(?:-\d{4})?$/;
console.log(zip.test("90210"));       // true
console.log(zip.test("90210-1234"));  // true
console.log(zip.test("9021"));        // false

// IPv4 address
const ipv4 = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
console.log(ipv4.test("192.168.1.1")); // true
console.log(ipv4.test("256.0.0.1"));   // false
console.log(ipv4.test("10.0.0.1"));    // true
```

---
---

## 9. Topic 8 — The RegExp Object

> **Phase 1 — Conceptual Understanding**

When you create a regex (either with literal syntax or `new RegExp()`), you get a **RegExp object** with properties and methods you can use to inspect and drive the regex engine directly.

---

### RegExp Properties

```javascript
const re = /hello\d+/gim;

console.log(re.source);    // "hello\d+" — the pattern text (no slashes)
console.log(re.flags);     // "gim"      — all flags as a string (sorted)
console.log(re.global);    // true       — g flag set?
console.log(re.ignoreCase);// true       — i flag set?
console.log(re.multiline); // true       — m flag set?
console.log(re.sticky);    // false      — y flag set?
console.log(re.unicode);   // false      — u flag set?
console.log(re.dotAll);    // false      — s flag set?
console.log(re.hasIndices);// false      — d flag set?
console.log(re.lastIndex); // 0          — position for next search (g/y only)
```

**▶ Expected Output:**
```
hello\d+
gim
true
true
true
false
false
false
false
0
```

---

### `re.lastIndex` — Position Tracking

When using the `g` or `y` flag, `lastIndex` tracks where the next search will start. It updates automatically after each match.

```javascript
const re   = /\d+/g;
const text = "12 and 34 and 56";

let match;
while ((match = re.exec(text)) !== null) {
  console.log(`Found "${match[0]}" at index ${match.index}, lastIndex now ${re.lastIndex}`);
}
```

**▶ Expected Output:**
```
Found "12" at index 0, lastIndex now 2
Found "34" at index 7, lastIndex now 9
Found "56" at index 14, lastIndex now 16
```

---

### Inspecting a RegExp Object

```javascript
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

console.log("Source:", emailRe.source);
console.log("Flags:", emailRe.flags);
console.log("Is global:", emailRe.global);
console.log("Is case-insensitive:", emailRe.ignoreCase);

// Build a new regex from an existing one, adding flags
const withG = new RegExp(emailRe.source, emailRe.flags + "g");
console.log("New flags:", withG.flags);
```

---

### Modifying `lastIndex` Manually

```javascript
const re = /\d+/g;
const text = "100 200 300 400";

re.lastIndex = 8; // skip past the first two numbers
const match = re.exec(text);
console.log(match[0]); // "300" — started searching from index 8

// Always reset before reusing a global regex
re.lastIndex = 0;
console.log(re.exec(text)[0]); // "100" — starts fresh
```

---

### `RegExp.prototype[Symbol.match]` — Used Internally by `String.match()`

Regex objects implement `[Symbol.match]`, `[Symbol.replace]`, `[Symbol.search]`, and `[Symbol.split]`. This is how `String.prototype.match(re)` actually calls the regex's own method.

```javascript
// These two are identical:
"hello world".match(/\w+/g);
/\w+/g[Symbol.match]("hello world");
// Both: ["hello", "world"]
```

---
---

## 10. Topic 9 — RegExp & String Methods

> **Phase 1 — Conceptual Understanding**

There are **six** primary methods for working with regular expressions in JavaScript — four on strings, two on the RegExp object itself.

---

### `RegExp.prototype.test(string)` — Quick True/False Check

The simplest regex method. Returns `true` if the pattern matches anywhere in the string, `false` otherwise. Use it when you just need to know *if* something matches.

```javascript
const hasDigit  = /\d/;
const isEmail   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(hasDigit.test("hello5world")); // true
console.log(hasDigit.test("helloworld"));  // false

console.log(isEmail.test("alice@example.com")); // true
console.log(isEmail.test("not-an-email"));       // false
```

> 💡 **TIP:** `.test()` is the fastest method for pure yes/no checks — use it for form validation, filtering, and conditional logic.

---

### `RegExp.prototype.exec(string)` — Detailed Match Info

Returns a **match array** with detailed information, or `null` if no match. More powerful than `test()` — gives you the matched text, index, and capture groups.

```javascript
const pattern = /(\d{4})-(\d{2})-(\d{2})/;
const result  = pattern.exec("Event date: 2024-03-15");

if (result) {
  console.log(result[0]);     // "2024-03-15" — full match
  console.log(result[1]);     // "2024"        — group 1
  console.log(result[2]);     // "03"           — group 2
  console.log(result[3]);     // "15"           — group 3
  console.log(result.index);  // 12             — position in string
  console.log(result.input);  // "Event date: 2024-03-15"
}
```

**▶ Expected Output:**
```
2024-03-15
2024
03
15
12
Event date: 2024-03-15
```

#### Iterate ALL matches with `exec()` in a loop:

```javascript
const re   = /\b\w{5}\b/g; // all 5-letter words
const text = "hello world today is a great Monday";
let match;

while ((match = re.exec(text)) !== null) {
  console.log(`"${match[0]}" at index ${match.index}`);
}
```

**▶ Expected Output:**
```
"hello" at index 0
"world" at index 6
"today" at index 12
"great" at index 22
```

---

### `String.prototype.match(regexp)` — Get All Matches

Without `g` flag: behaves like `exec()` — returns first match with groups.
With `g` flag: returns an array of all matched strings (no group info).

```javascript
const text = "Call 080-1234-5678 or 081-9876-5432 for details";

// Without g — first match + groups
const first = text.match(/(\d{3})-(\d{4})-(\d{4})/);
console.log(first[0]); // "080-1234-5678"
console.log(first[1]); // "080"
console.log(first[2]); // "1234"

// With g — ALL matches (no group info)
const all = text.match(/\d{3}-\d{4}-\d{4}/g);
console.log(all); // ["080-1234-5678", "081-9876-5432"]
```

**▶ Expected Output:**
```
080-1234-5678
080
1234
["080-1234-5678", "081-9876-5432"]
```

> ⚠️ **WATCH OUT:** With the `g` flag, `match()` returns an array of strings only — capture groups are ignored. Use `matchAll()` if you need groups from all matches.

---

### `String.prototype.matchAll(regexp)` — All Matches WITH Groups

Returns an **iterator** of all match results — each with full group information. The regex MUST have the `g` flag.

```javascript
const text = "2024-01-15 and 2024-03-22 and 2023-12-01";
const re   = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g;

for (const match of text.matchAll(re)) {
  const { year, month, day } = match.groups;
  console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
}
```

**▶ Expected Output:**
```
Year: 2024, Month: 01, Day: 15
Year: 2024, Month: 03, Day: 22
Year: 2023, Month: 12, Day: 01
```

> 💡 **TIP:** `matchAll()` is the modern replacement for `exec()` loops. It is cleaner, works with named groups, and returns an iterator you can spread into an array:
> ```javascript
> const matches = [...text.matchAll(re)];
> console.log(matches.length); // 3
> console.log(matches[0].groups.year); // "2024"
> ```

---

### `String.prototype.search(regexp)` — Find Position of First Match

Returns the **index** of the first match, or `-1` if not found. Like `indexOf` but for regex patterns.

```javascript
const text = "Hello World 2024";

console.log(text.search(/\d+/));    // 12 — position of "2024"
console.log(text.search(/xyz/));    // -1  — not found
console.log(text.search(/world/i)); // 6   — case-insensitive
```

> ⚠️ **WATCH OUT:** `search()` always searches from the beginning — it ignores the `g` flag and `lastIndex`. For finding a position with a literal string, `indexOf` is faster. `search()` shines when you need a pattern-based position.

---

### `String.prototype.replace(regexp, replacement)` — Find and Replace

The most powerful string method. Replaces match(es) with a replacement string or the result of a function.

#### Simple replacement:
```javascript
// Replace first match only (no g flag)
console.log("hello hello".replace(/hello/, "goodbye")); // "goodbye hello"

// Replace ALL matches (g flag)
console.log("hello hello".replace(/hello/g, "goodbye")); // "goodbye goodbye"

// Case-insensitive + global
console.log("Hello HELLO hello".replace(/hello/gi, "hi")); // "hi hi hi"
```

#### Replacement with capture group references `$1`, `$2`, `$<name>`:

```javascript
// Reformat date: YYYY-MM-DD → DD/MM/YYYY
const date = "2024-03-15";
const reformatted = date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
console.log(reformatted); // "15/03/2024"

// Using named groups
const reformatted2 = date.replace(
  /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/,
  "$<d>/$<m>/$<y>"
);
console.log(reformatted2); // "15/03/2024"
```

**▶ Expected Output:**
```
15/03/2024
15/03/2024
```

#### Special replacement tokens:

| Token | Meaning |
|-------|---------|
| `$$` | Literal `$` |
| `$&` | Entire matched string |
| `` $` `` | Text before match |
| `$'` | Text after match |
| `$n` | n-th capture group |
| `$<name>` | Named capture group |

```javascript
// Wrap every number in brackets using $&
console.log("I have 5 cats and 3 dogs".replace(/\d+/g, "[$&]"));
// "I have [5] cats and [3] dogs"
```

#### Replacement with a function (most powerful):

```javascript
// Replace numbers with their doubled values
const result = "Price: 50 and discount: 10".replace(/\d+/g, n => n * 2);
console.log(result); // "Price: 100 and discount: 20"

// Capitalise first letter of each word
const title = "the quick brown fox".replace(/\b\w/g, c => c.toUpperCase());
console.log(title); // "The Quick Brown Fox"

// Censor profanity (replace with asterisks)
const censor = (text, words) => {
  const re = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
  return text.replace(re, w => "*".repeat(w.length));
};
console.log(censor("What the heck is going on", ["heck"]));
// "What the **** is going on"
```

**▶ Expected Output:**
```
Price: 100 and discount: 20
The Quick Brown Fox
What the **** is going on
```

---

### `String.prototype.replaceAll(string|regexp, replacement)` — Replace All

Like `replace()` with `g`, but can also accept a plain string as the first argument (not just regex). When used with a regex, the `g` flag is **required**.

```javascript
// With plain string
console.log("a.b.c.d".replaceAll(".", "/")); // "a/b/c/d"

// With regex (g flag required)
console.log("hello world".replaceAll(/\w+/g, w => w.toUpperCase()));
// "HELLO WORLD"
```

---

### `String.prototype.split(regexp)` — Split on a Pattern

Splits a string into an array, using the regex as the delimiter. More flexible than splitting on a fixed string.

```javascript
// Split on any whitespace (including multiple spaces/tabs)
console.log("  hello   world  ".split(/\s+/).filter(Boolean));
// ["hello", "world"]

// Split on comma or semicolon or pipe
console.log("a,b;c|d".split(/[,;|]/));
// ["a", "b", "c", "d"]

// Split on digit runs
console.log("abc123def456ghi".split(/\d+/));
// ["abc", "def", "ghi"]

// Split but KEEP the delimiters (using a capturing group)
console.log("one, two; three".split(/(,|;)\s*/));
// ["one", ",", "two", ";", "three"]
```

**▶ Expected Output:**
```
["hello", "world"]
["a", "b", "c", "d"]
["abc", "def", "ghi"]
["one", ",", "two", ";", "three"]
```

---

### Methods Summary Table

| Method | Returns | Use When |
|--------|---------|----------|
| `re.test(str)` | Boolean | Quick check: does it match? |
| `re.exec(str)` | Array or null | Need match position + groups, one at a time |
| `str.match(re)` | Array or null | Get all matched strings (with `g`) |
| `str.matchAll(re)` | Iterator | All matches WITH group info (needs `g`) |
| `str.search(re)` | Number (-1 = no match) | Find position of first match |
| `str.replace(re, rep)` | String | Substitute match(es) with string/function |
| `str.replaceAll(re, rep)` | String | Replace all (regex needs `g`) |
| `str.split(re)` | Array | Split string on pattern delimiter |

---
---

## 11. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Pattern Detective 🔍

**Objective:** Read patterns and predict what they match before running them. Build "regex reading" skills.

**Scenario:** You are reviewing a codebase's input validation regexes. For each, explain what it validates and give a passing and failing example.

#### Warm-up Micro-Demo:

```javascript
const re = /^\d{3}-\d{2}-\d{4}$/;
// Read it: ^ start, 3 digits, literal -, 2 digits, literal -, 4 digits, $ end
// Matches: US Social Security Number format (123-45-6789)

console.log(re.test("123-45-6789")); // true
console.log(re.test("12-345-6789")); // false
```

#### Task A — Analyse These Patterns

```javascript
// Pattern set to analyse:
const patterns = {
  p1: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
  p2: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,}$/,
  p3: /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
  p4: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  p5: /^([01]?\d|2[0-3]):[0-5]\d$/,
};

// Test and explain each pattern:

// p1 — Username rules
console.log("=== p1: Username ===");
console.log(patterns.p1.test("alice99"));      // true
console.log(patterns.p1.test("9alice"));       // false — must start with letter
console.log(patterns.p1.test("al"));           // false — too short (min 3 total)
console.log(patterns.p1.test("alice!"));       // false — ! not allowed

// p2 — Strong password
console.log("\n=== p2: Password ===");
console.log(patterns.p2.test("Secure1!pass")); // true
console.log(patterns.p2.test("secure1!pass")); // false — no uppercase
console.log(patterns.p2.test("Securepass!"));  // false — no digit
console.log(patterns.p2.test("Se1!"));         // false — too short

// p3 — Flexible phone number
console.log("\n=== p3: Phone ===");
console.log(patterns.p3.test("(080) 123-4567")); // true
console.log(patterns.p3.test("080.123.4567"));    // true
console.log(patterns.p3.test("+1 800 555 1234")); // true
console.log(patterns.p3.test("123"));              // false

// p4 — CSS hex color
console.log("\n=== p4: Hex Color ===");
console.log(patterns.p4.test("#FF5733"));  // true — 6-digit hex
console.log(patterns.p4.test("#F57"));     // true — 3-digit shorthand
console.log(patterns.p4.test("FF5733"));   // false — no #
console.log(patterns.p4.test("#GGGGGG"));  // false — G not hex

// p5 — 24-hour time
console.log("\n=== p5: 24-hour Time ===");
console.log(patterns.p5.test("00:00")); // true — midnight
console.log(patterns.p5.test("23:59")); // true — last minute
console.log(patterns.p5.test("24:00")); // false — 24 invalid
console.log(patterns.p5.test("9:30"));  // true — single digit hour ok
```

**Self-check questions:**
- In `p2`, why do lookaheads `(?=...)` not conflict with each other even though they all start at the same position?
- In `p4`, why does `|` inside the group give two alternatives of different lengths?
- In `p5`, why does `[01]?\d` match `09` but `2[0-3]` is needed for hours 20–23?

---

### Exercise 2 — Text Extractor 📤

**Objective:** Use `match()`, `matchAll()`, and `exec()` to extract structured data from unstructured text.

**Scenario:** You receive a raw log file. Extract all relevant data fields using regex.

#### Warm-up Micro-Demo:

```javascript
const log = "[2024-01-15 09:23:11] ERROR: Connection timeout";
const ts  = log.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
console.log("Timestamp:", ts[0]); // "2024-01-15 09:23:11"
```

#### Task A — Log Parser

```javascript
const logData = `
[2024-03-15 08:00:01] INFO:  Server started on port 3000
[2024-03-15 08:01:22] INFO:  User alice@example.com logged in from 192.168.1.10
[2024-03-15 08:05:44] WARN:  High memory usage: 87%
[2024-03-15 08:10:03] ERROR: Database connection failed (attempt 1 of 3)
[2024-03-15 08:10:15] ERROR: Database connection failed (attempt 2 of 3)
[2024-03-15 08:12:00] INFO:  User bob@test.org logged in from 10.0.0.5
[2024-03-15 08:15:33] ERROR: Disk space critical: 95% used
[2024-03-15 08:20:11] INFO:  Cache cleared — 1250 items removed
`.trim();

// 1. Extract all timestamps
const timestamps = logData.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g);
console.log("Timestamps:", timestamps.length, "entries");

// 2. Count log levels
const levels = { INFO: 0, WARN: 0, ERROR: 0 };
for (const [, level] of logData.matchAll(/\] (INFO|WARN|ERROR):/g)) {
  levels[level]++;
}
console.log("\nLog level counts:", levels);

// 3. Extract all email addresses
const emails = logData.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
console.log("\nEmails found:", emails);

// 4. Extract all IP addresses
const ips = logData.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g);
console.log("IPs found:", ips);

// 5. Extract ERROR entries with full details using named groups
const errorRe = /\[(?<ts>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] ERROR: (?<msg>.+)/g;
console.log("\nERROR entries:");
for (const match of logData.matchAll(errorRe)) {
  console.log(`  [${match.groups.ts}] ${match.groups.msg}`);
}

// 6. Extract percentage values
const percentages = logData.match(/\d+(?=%)/g);
console.log("\nPercentages mentioned:", percentages);
```

**Expected Output:**
```
Timestamps: 8 entries

Log level counts: { INFO: 4, WARN: 1, ERROR: 3 }

Emails found: ["alice@example.com", "bob@test.org"]
IPs found: ["192.168.1.10", "10.0.0.5"]

ERROR entries:
  [2024-03-15 08:10:03] Database connection failed (attempt 1 of 3)
  [2024-03-15 08:10:15] Database connection failed (attempt 2 of 3)
  [2024-03-15 08:15:33] Disk space critical: 95% used

Percentages mentioned: ["87", "95"]
```

**Self-check questions:**
- Why is `matchAll()` better than `exec()` in a loop for extracting multiple groups?
- Why does `/\d+(?=%)/g` use a lookahead for `%` instead of `/\d+%/g`?
- What would happen if you forgot the `g` flag when using `matchAll()`?

---

### Exercise 3 — Text Transformer ✏️

**Objective:** Use `replace()` with functions to transform text programmatically.

**Scenario:** You're building a **markdown-to-HTML converter** for a blogging platform.

#### Warm-up Micro-Demo:

```javascript
// Bold: **text** → <strong>text</strong>
const bold = "This is **important** text".replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
console.log(bold); // "This is <strong>important</strong> text"
```

#### Task A — Markdown Converter

```javascript
function markdownToHtml(md) {
  return md
    // Headings: ### → h3, ## → h2, # → h1
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm,  "<h2>$1</h2>")
    .replace(/^# (.+)$/gm,   "<h1>$1</h1>")

    // Bold: **text** → <strong>text</strong>
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

    // Italic: *text* → <em>text</em>
    .replace(/\*(.+?)\*/g, "<em>$1</em>")

    // Inline code: `code` → <code>code</code>
    .replace(/`([^`]+)`/g, "<code>$1</code>")

    // Links: [text](url) → <a href="url">text</a>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

    // Unordered list items: - item → <li>item</li>
    .replace(/^- (.+)$/gm, "<li>$1</li>")

    // Auto-link URLs not already in anchor tags
    .replace(/(?<!href=")https?:\/\/[\w.-]+(?:\/[\w./?=&%-]*)*/g, '<a href="$&">$&</a>')

    // Blank lines → paragraph breaks
    .replace(/\n{2,}/g, "\n\n<hr>\n\n");
}

const markdown = `
# My Blog Post

This is a **bold statement** and this is *italic*.

## Features

- Fast and reliable
- Supports \`inline code\`
- Links like [Google](https://google.com)

### Note

Visit https://example.com for more info.
`.trim();

console.log(markdownToHtml(markdown));
```

**Expected Output (sample):**
```html
<h1>My Blog Post</h1>
...
<strong>bold statement</strong> ... <em>italic</em>
...
<h2>Features</h2>
<li>Fast and reliable</li>
<li>Supports <code>inline code</code></li>
<li>Links like <a href="https://google.com">Google</a></li>
...
<a href="https://example.com">https://example.com</a>
```

**Self-check questions:**
- Why must `###` be replaced before `##` and `##` before `#`?
- Why does the link pattern use `[^\]]+` inside `[...]` instead of `.+`?
- Why does the URL auto-linker use a negative lookbehind `(?<!href=")`?

---
---

## 12. Mini Project — Form Validator & Text Processor

> **Phase 3 — Project Simulation**

**Real-world scenario:** You're building a **registration form validator and data sanitiser** for a multi-country web application. The system must:
- Validate fields in real time (email, phone, password, username, URL)
- Extract and structure data from a pasted contact list
- Sanitise and redact sensitive information from text
- Generate a validation report

---

### 🔵 Stage 1 — Validation Engine

**Goal:** Build a reusable validation system using regex patterns.

#### Simple stage preview:
```javascript
const isEmail = str => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
console.log(isEmail("a@b.com")); // true
console.log(isEmail("bad"));     // false
```

#### Stage 1 Full Code:

```javascript
"use strict";

// ─── Validation Patterns ───────────────────────────────────────
const PATTERNS = {
  // Username: 3-20 chars, starts with letter, letters/digits/underscores
  username: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,

  // Email: local@domain.tld
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Strong password: 8+ chars, uppercase, lowercase, digit, special char
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/,

  // Phone: flexible international — E.164 or local formats
  phone: /^\+?(?:\d[\s.-]?){7,14}\d$/,

  // URL: http/https with optional path
  url: /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/,

  // Date: YYYY-MM-DD with basic range checking
  date: /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/,

  // Hex color: #RGB or #RRGGBB
  hexColor: /^#(?:[0-9a-fA-F]{3}){1,2}$/,

  // Postal code: flexible — US (12345 / 12345-6789), UK (SW1A 1AA), generic
  postalCode: /^(?:\d{5}(?:-\d{4})?|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|\d{4,6})$/i,
};

// ─── Validation Messages ───────────────────────────────────────
const MESSAGES = {
  username: "3–20 chars, must start with a letter, letters/digits/underscore only",
  email:    "Must be a valid email (user@domain.tld)",
  password: "8+ chars with uppercase, lowercase, digit, and special character",
  phone:    "Valid international or local phone number",
  url:      "Must be a valid http/https URL",
  date:     "Must be YYYY-MM-DD format (year 1900–2099)",
  hexColor: "Must be a valid CSS hex colour (#RGB or #RRGGBB)",
  postalCode:"Must be a valid postal/zip code",
};

// ─── Core Validator ────────────────────────────────────────────
function validate(fieldName, value) {
  const pattern = PATTERNS[fieldName];
  if (!pattern) return { valid: false, error: `Unknown field: ${fieldName}` };

  const trimmed = value.trim();
  const valid   = pattern.test(trimmed);
  return {
    field:   fieldName,
    value:   trimmed,
    valid,
    error:   valid ? null : MESSAGES[fieldName],
    pattern: pattern.toString(),
  };
}

// ─── Validate a full form object ───────────────────────────────
function validateForm(formData) {
  const results = {};
  let allValid  = true;

  for (const [field, value] of Object.entries(formData)) {
    const result = validate(field, String(value));
    results[field] = result;
    if (!result.valid) allValid = false;
  }

  return { results, allValid };
}

// ─── Stage 1 Demo ─────────────────────────────────────────────
console.log("=".repeat(60));
console.log("   STAGE 1 — FORM VALIDATION ENGINE");
console.log("=".repeat(60));

const formSubmission = {
  username:   "alice_2024",
  email:      "alice@example.com",
  password:   "Secure1!Pass",
  phone:      "+44 7911 123456",
  url:        "https://alice-blog.com/about",
  date:       "2024-13-01",           // ← invalid month!
  hexColor:   "#FF5733",
  postalCode: "SW1A 1AA",
};

const { results, allValid } = validateForm(formSubmission);

for (const [field, r] of Object.entries(results)) {
  const icon = r.valid ? "✅" : "❌";
  console.log(`\n  ${icon} ${field.padEnd(12)}: ${r.value}`);
  if (!r.valid) console.log(`       Error: ${r.error}`);
}

console.log(`\n${"─".repeat(60)}`);
console.log(`  Form status: ${allValid ? "✅ All fields valid" : "❌ Fix the errors above"}`);
```

**▶ Expected Output:**
```
============================================================
   STAGE 1 — FORM VALIDATION ENGINE
============================================================

  ✅ username    : alice_2024
  ✅ email       : alice@example.com
  ✅ password    : Secure1!Pass
  ✅ phone       : +44 7911 123456
  ✅ url         : https://alice-blog.com/about
  ❌ date        : 2024-13-01
       Error: Must be YYYY-MM-DD format (year 1900–2099)
  ✅ hexColor    : #FF5733
  ✅ postalCode  : SW1A 1AA

────────────────────────────────────────────────────────────
  Form status: ❌ Fix the errors above
```

---

### 🟢 Stage 2 — Contact List Parser & Extractor

**Goal:** Parse a pasted block of messy contact text, extract structured data, and normalise it.

#### Simple stage preview:
```javascript
const line   = "John Doe | john@doe.com | +1-800-555-0199";
const [name, email, phone] = line.split(/\s*\|\s*/);
console.log({ name, email, phone });
```

#### Stage 2 Full Code:

```javascript
function parseContactList(rawText) {
  const contacts = [];

  // Split into non-empty lines
  const lines = rawText.split("\n").map(l => l.trim()).filter(Boolean);

  // Patterns for extraction
  const emailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRe = /\+?(?:\d[\s.()\-]?){7,14}\d/;
  const urlRe   = /https?:\/\/[^\s,]+/;

  for (const line of lines) {
    // Try different delimiters: |, comma, semicolon, tabs
    const parts = line.split(/\s*[|,;]\s*|\t+/).map(p => p.trim());

    const email = (line.match(emailRe) || [])[0] || null;
    const phone = (line.match(phoneRe) || [])[0] || null;
    const url   = (line.match(urlRe)   || [])[0] || null;

    // Guess the name — first part that is not email/phone/URL
    const name = parts.find(p =>
      p.length > 1 &&
      !emailRe.test(p) &&
      !phoneRe.test(p) &&
      !urlRe.test(p) &&
      !/^\d/.test(p)  // doesn't start with digit
    ) || "Unknown";

    // Normalise phone — strip non-digits except leading +
    const normPhone = phone
      ? (phone.startsWith("+") ? "+" : "") + phone.replace(/[^\d]/g, "")
      : null;

    contacts.push({ name, email, phone: normPhone, url });
  }

  return contacts;
}

const rawContacts = `
Alice Nkosi | alice@example.com | +234 80 1234 5678 | https://alice.dev
Bob Asante, bob.asante@company.org, 0501234567
carol@test.com; Carol Martini; +44-7700-900123
David Obi <david.obi@firm.io> 08023456789 https://davidobi.co
Fatima Rashid — fatima_r@uni.edu — +49 151 23456789
`.trim();

console.log("\n" + "=".repeat(60));
console.log("   STAGE 2 — CONTACT LIST PARSER");
console.log("=".repeat(60));

const contacts = parseContactList(rawContacts);

contacts.forEach((c, i) => {
  console.log(`\n  Contact ${i + 1}: ${c.name}`);
  console.log(`    Email : ${c.email || "—"}`);
  console.log(`    Phone : ${c.phone || "—"}`);
  console.log(`    URL   : ${c.url   || "—"}`);
});

console.log(`\nTotal contacts parsed: ${contacts.length}`);

// Stats
const withEmail = contacts.filter(c => c.email).length;
const withPhone = contacts.filter(c => c.phone).length;
console.log(`With email: ${withEmail}/${contacts.length}`);
console.log(`With phone: ${withPhone}/${contacts.length}`);
```

**▶ Expected Output:**
```
============================================================
   STAGE 2 — CONTACT LIST PARSER
============================================================

  Contact 1: Alice Nkosi
    Email : alice@example.com
    Phone : +2348012345678
    URL   : https://alice.dev

  Contact 2: Bob Asante
    Email : bob.asante@company.org
    Phone : 0501234567

  Contact 3: Carol Martini
    Email : carol@test.com
    Phone : +447700900123

  Contact 4: David Obi
    Email : david.obi@firm.io
    Phone : 08023456789
    URL   : https://davidobi.co

  Contact 5: Fatima Rashid
    Email : fatima_r@uni.edu
    Phone : +4915123456789

Total contacts parsed: 5
With email: 5/5
With phone: 5/5
```

---

### 🟠 Stage 3 — Text Sanitiser & Redaction Report

**Goal:** Redact sensitive data (emails, phones, credit cards, SSNs) from a text block. Generate a full report of what was found and replaced.

#### Stage 3 Full Code:

```javascript
function sanitiseText(text) {
  const report = { redacted: [], counts: {} };

  const rules = [
    {
      name:        "Credit Card",
      pattern:     /\b(?:\d{4}[\s-]?){3}\d{4}\b/g,
      replacement: match => "[CC:" + "*".repeat(match.replace(/\D/g,"").length - 4) +
                             match.replace(/\D/g,"").slice(-4) + "]",
    },
    {
      name:        "SSN",
      pattern:     /\b\d{3}-\d{2}-\d{4}\b/g,
      replacement: () => "[SSN:***-**-****]",
    },
    {
      name:        "Email",
      pattern:     /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      replacement: match => {
        const [local, domain] = match.split("@");
        return local.slice(0, 2) + "***@" + domain;
      },
    },
    {
      name:        "Phone",
      pattern:     /\b\+?(?:\d[\s.-]?){6,14}\d\b/g,
      replacement: match => {
        const digits = match.replace(/\D/g, "");
        return "[PHONE:****" + digits.slice(-4) + "]";
      },
    },
    {
      name:        "IP Address",
      pattern:     /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
      replacement: ip => ip.replace(/\.\d+$/, ".***"),
    },
  ];

  let sanitised = text;

  for (const rule of rules) {
    let count = 0;
    sanitised = sanitised.replace(rule.pattern, match => {
      count++;
      report.redacted.push({ type: rule.name, original: match });
      return rule.replacement(match);
    });
    if (count > 0) report.counts[rule.name] = count;
  }

  return { sanitised, report };
}

const sensitiveText = `
Customer Support Transcript — Case #4821

Agent Notes:
  The customer (alice.johnson@example.com) called at 14:23 from +1-555-867-5309.
  Account linked to: bob_smith@corp.org and carol@test.io
  Credit card on file: 4532 1234 5678 9010 (Visa) and 5555-4444-3333-2222 (MC)
  Social Security Number provided: 123-45-6789
  Remote IP logged: 192.168.10.254 and 10.0.0.1
  Secondary phone: 0800 123 4567

Resolution: Refund of $150 approved. Case closed.
`.trim();

console.log("\n" + "=".repeat(60));
console.log("   STAGE 3 — TEXT SANITISER & REDACTION");
console.log("=".repeat(60));

const { sanitised, report } = sanitiseText(sensitiveText);

console.log("\n📄 SANITISED OUTPUT:\n");
console.log(sanitised);

console.log("\n📊 REDACTION REPORT:");
console.log("─".repeat(60));
for (const [type, count] of Object.entries(report.counts)) {
  console.log(`  ${type.padEnd(15)}: ${count} instance(s) redacted`);
}
console.log(`\n  Total redactions: ${report.redacted.length}`);
console.log("\n  Redacted items:");
report.redacted.forEach((r, i) => {
  console.log(`    ${i + 1}. [${r.type}] "${r.original}"`);
});
console.log("=".repeat(60));
```

**▶ Expected Output:**
```
============================================================
   STAGE 3 — TEXT SANITISER & REDACTION
============================================================

📄 SANITISED OUTPUT:

Customer Support Transcript — Case #4821

Agent Notes:
  The customer (al***@example.com) called at 14:23 from [PHONE:****5309].
  Account linked to: bo***@corp.org and ca***@test.io
  Credit card on file: [CC:********9010] (Visa) and [CC:********2222] (MC)
  Social Security Number provided: [SSN:***-**-****]
  Remote IP logged: 192.168.10.*** and 10.0.0.***
  Secondary phone: [PHONE:****4567]

Resolution: Refund of $150 approved. Case closed.

📊 REDACTION REPORT:
────────────────────────────────────────────────────────────
  Credit Card    : 2 instance(s) redacted
  SSN            : 1 instance(s) redacted
  Email          : 3 instance(s) redacted
  Phone          : 2 instance(s) redacted
  IP Address     : 2 instance(s) redacted

  Total redactions: 10

  Redacted items:
    1. [Credit Card] "4532 1234 5678 9010"
    2. [Credit Card] "5555-4444-3333-2222"
    3. [SSN] "123-45-6789"
    4. [Email] "alice.johnson@example.com"
    ...
============================================================
```

**Reflection questions:**
- Why is the Credit Card pattern applied before the Phone pattern in the rules array? What could go wrong if the order were reversed?
- Why does the email redaction function split on `@` and keep the domain visible? What privacy principle does partial redaction serve?
- Why does the `replace()` method receive a function instead of a string for most rules? What would a plain string replacement lose?
- How would you extend the sanitiser to handle IBAN numbers (`GB82 WEST 1234 5698 7654 32`) or passport numbers?
- How would you use the `d` flag (indices) to highlight exactly where in the original text each sensitive item appeared, for an audit trail?

**Optional advanced features:**
- Add a rule for detecting credit card numbers using the **Luhn algorithm** inside the replacement function
- Build a **regex tester** function that takes a pattern string and test cases, and returns a pass/fail table
- Extend the contact parser (Stage 2) to handle multi-line entries where name and contact info span two lines
- Add a `whitelistDomains` option to the email redactor that does NOT redact emails from approved company domains

---
---

## 13. Completion Checklist

- ✅ I know two ways to create a regex: literal `/pattern/flags` and `new RegExp("pattern", "flags")` — and when to use each.
- ✅ I know to double backslashes in `new RegExp()` strings: `"\\d"` = `/\d/`.
- ✅ I understand all 8 flags: `i` (case-insensitive), `g` (global), `m` (multiline), `s` (dotAll), `d` (indices), `u` (unicode), `v` (unicode sets), `y` (sticky).
- ✅ I know the `g` flag causes `lastIndex` to advance — and that reusing a global regex without resetting causes bugs.
- ✅ I can write character classes: `[abc]` (any of), `[^abc]` (none of), `[a-z]` (range).
- ✅ I know `^` inside `[...]` means negation, but outside means start-of-string.
- ✅ I know the hyphen `-` must be at the start or end of `[...]` to be treated as a literal character.
- ✅ I understand all shorthand classes: `\d`, `\D`, `\w`, `\W`, `\s`, `\S`.
- ✅ I know `.` matches any character except newline — and that literal dots must be escaped as `\.`.
- ✅ I can list the 12 special characters that need escaping: `. * + ? ^ $ { } [ ] | ( ) \`.
- ✅ I understand alternation `|` and know to use groups `(...)` to control its scope.
- ✅ I know all four assertion types: `^/$` (anchors), `\b/\B` (word boundary), `(?=...)` (lookahead), `(?!...)` (negative lookahead), `(?<=...)` (lookbehind), `(?<!...)` (negative lookbehind).
- ✅ I understand that lookarounds are **zero-width** — they check position without consuming characters.
- ✅ I can use all quantifiers: `*`, `+`, `?`, `{n}`, `{n,}`, `{n,m}` — and their lazy versions with `?`.
- ✅ I understand greedy vs lazy: greedy takes as much as possible, lazy takes as little as possible.
- ✅ I can create capturing groups `(...)`, non-capturing groups `(?:...)`, and named groups `(?<name>...)`.
- ✅ I can use backreferences `\1` and `\k<name>` to match repeated patterns.
- ✅ I know the RegExp object properties: `source`, `flags`, `global`, `ignoreCase`, `multiline`, `lastIndex`.
- ✅ I can use all six regex-related methods: `test`, `exec`, `match`, `matchAll`, `search`, `replace`, `split`.
- ✅ I know when to use each method: `test` for yes/no, `exec`/`matchAll` for groups, `match` for all strings, `replace` for substitution, `split` for splitting, `search` for finding position.
- ✅ I can use `replace()` with a function for dynamic replacements.
- ✅ I can use named groups in `replace()` with `$<name>`.
- ✅ I completed all three exercises and the three-stage mini project.
- ✅ I can build practical validation patterns for email, password, phone, URL, date, and hex color.
- ✅ I know that `Math.random()` is not regex, and that real security filtering (like SQL injection prevention) needs parameterised queries — regex alone is not a security solution.

---

### 📌 One-Sentence Summary of Each Topic

**Creating Regex:** Regular expressions are created with literal `/pattern/flags` syntax (preferred — compiled at load time) or `new RegExp("pattern", "flags")` (required for dynamic patterns — remember to double backslashes in the string).

**Flags:** The eight flags modify regex behaviour globally — `i` ignores case, `g` finds all matches, `m` makes anchors match each line, `s` makes `.` include newlines, `d` adds match indices, `u` enables Unicode, `v` enables Unicode set operations, and `y` enables sticky matching.

**Character Classes:** Square-bracket character classes `[...]` match any single character from a set or range, with `^` inside for negation, `-` for ranges, and shorthand classes `\d`, `\w`, `\s` (and their uppercase negations) covering the most common cases.

**Meta Characters:** Meta characters give regex its power — `.` matches anything but a newline, `\b` marks word boundaries, `|` creates alternatives, backslash `\` escapes special characters, and shorthand classes `\d\w\s` match entire categories of characters.

**Assertions:** Assertions are zero-width checks — `^` and `$` anchor to string/line boundaries, `\b` marks word edges, and lookaheads `(?=...)` / `(?!...)` and lookbehinds `(?<=...)` / `(?<!...)` impose conditions on surrounding text without consuming it.

**Quantifiers:** Quantifiers control repetition — `*` (zero or more), `+` (one or more), `?` (optional), `{n,m}` (exact range) — and appending `?` to any quantifier switches it from greedy (match as much as possible) to lazy (match as little as possible).

**Groups & Patterns:** Capturing groups `(...)` extract matched substrings (numbered by `match[n]` or named via `(?<name>...)`), non-capturing groups `(?:...)` group without overhead, backreferences `\1` / `\k<name>` re-match previously captured text, and combining these with anchors and quantifiers builds complete validation patterns.

**RegExp Object:** The RegExp object exposes `source`, `flags`, and per-flag boolean properties, while `lastIndex` tracks the current search position for global/sticky regexes — resetting it prevents the alternating true/false bug when reusing global patterns.

**Methods:** Six methods bridge regex and strings — `test` for boolean checks, `exec`/`matchAll` for full match details with groups, `match` for all matched strings, `search` for the match position, `replace`/`replaceAll` for substitution (with function callbacks for dynamic replacements), and `split` for pattern-based string splitting.

---

> 📘 *Built from W3Schools.com — `js_regexp` · `js_regexp_flags` · `js_regexp_characters` · `js_regexp_meta_characters` · `js_regexp_assertions` · `js_regexp_quantifiers` · `js_regexp_patterns` · `js_regexp_objects` · `js_regexp_methods`*
> *Framework: Understand → Practice → Create*
