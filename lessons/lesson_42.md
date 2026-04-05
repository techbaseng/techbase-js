---
title: "JavaScript JSON: JSON Intro · Syntax · JSON vs XML · Data Types · JSON.parse() · JSON.stringify() · JSON Objects · JSON Arrays · JSON & Servers · JSON with PHP · JSON to HTML · JSONP"
nav_order: 42
---

## Table of Contents
1. [Chapter 1 — What Is JSON?](#chapter-1)
2. [Chapter 2 — JSON Syntax Rules](#chapter-2)
3. [Chapter 3 — JSON vs XML](#chapter-3)
4. [Chapter 4 — JSON Data Types](#chapter-4)
5. [Chapter 5 — JSON.parse() — Receiving Data](#chapter-5)
6. [Chapter 6 — JSON.stringify() — Sending Data](#chapter-6)
7. [Chapter 7 — Working with JSON Objects](#chapter-7)
8. [Chapter 8 — Working with JSON Arrays](#chapter-8)
9. [Chapter 9 — JSON and Servers](#chapter-9)
10. [Chapter 10 — JSON with PHP](#chapter-10)
11. [Chapter 11 — JSON to HTML](#chapter-11)
12. [Chapter 12 — JSONP](#chapter-12)
13. [Phase 2 — Applied Exercises](#phase-2)
14. [Phase 3 — Project: Nigerian FinDash — Financial Dashboard](#phase-3)
15. [Completion Checklist](#checklist)

---

<a name="chapter-1"></a>
## Chapter 1 — What Is JSON?

### 1.1 The Real-World Problem JSON Solves

Imagine you work at a bank in Lagos. You need to send customer account information from your server to a mobile app. The server speaks its own language (PHP, Python, Node.js), and the app speaks JavaScript. How do they share information?

They need a **common language** — a format both sides can read and write. That format is **JSON**.

> **JSON** stands for **JavaScript Object Notation**. It is a lightweight, text-based format for storing and exchanging data between a server and a client (or between any two systems).

Think of JSON as a **universal packing list**. When you ship a parcel from Lagos to Abuja, the waybill (packing list) describes exactly what's inside in a format anyone can read — regardless of who packed it or who receives it. JSON is that waybill for data.

---

### 1.2 Where JSON Came From

JSON was created by Douglas Crockford in the early 2000s. It was designed to be:
- **Human-readable** — you can open a JSON file and understand it
- **Machine-parseable** — computers can process it very quickly
- **Language-independent** — usable in Python, Java, PHP, Swift, Kotlin, and virtually every other language

Before JSON, **XML** was the dominant data exchange format. JSON replaced XML for most web APIs because it is shorter, simpler, and directly maps to JavaScript objects.

---

### 1.3 What JSON Looks Like

```json
{
  "name": "Babatunde Adewale",
  "age": 28,
  "city": "Lagos",
  "isVerified": true,
  "balance": 500000.00,
  "accounts": ["savings", "current"],
  "address": {
    "street": "15 Allen Avenue",
    "lga": "Ikeja",
    "state": "Lagos"
  }
}
```

Notice how natural this looks — it is almost like reading an English description of a person's data. That readability is one of JSON's greatest strengths.

---

### 1.4 JSON Is Just Text

This is the most important concept to understand early:

> **JSON is always a plain text string.** It is not a JavaScript object — it just looks like one.

```javascript
// This is a JavaScript OBJECT (in memory, has methods):
const person = { name: "Tunde", age: 28 };

// This is a JSON STRING (just text, no methods):
const jsonText = '{"name":"Tunde","age":28}';

console.log(typeof person);   // Output: "object"
console.log(typeof jsonText); // Output: "string"
```

Because JSON is text, it can be:
- Sent across a network (HTTP request/response)
- Stored in a file (`.json` files)
- Saved in a database
- Copied and pasted between systems

---

### 1.5 JSON in the Real Nigerian Tech Ecosystem

| Platform / Company | How They Use JSON |
|--------------------|-------------------|
| **Paystack** | API responses for payments, transactions, customer data |
| **Flutterwave** | Transfer confirmations, webhook payloads |
| **Cowrywise** | Portfolio data, investment records |
| **Andela** | Developer profiles, job matching data |
| **Konga / Jumia** | Product listings, cart contents, order summaries |
| **NIBSS** | Interbank settlement data exchanges |
| **CBN OpenAPI** | Banking regulatory data |

---

### 1.6 Thinking Question

> 🤔 If JSON is just text, how does JavaScript actually use the data inside it — like accessing `person.name`? (Hint: this is what `JSON.parse()` is for — Chapter 5.)

---

<a name="chapter-2"></a>
## Chapter 2 — JSON Syntax Rules

### 2.1 Why Strict Syntax Matters

Unlike JavaScript, which is fairly forgiving (you can use single or double quotes, trailing commas, etc.), **JSON has strict, unforgiving syntax rules**. One tiny mistake — a missing comma, a single quote instead of double quote — and the entire JSON string is invalid and cannot be parsed.

Think of JSON syntax like the format of a Nigerian bank transfer form. If you write an account number incorrectly, the entire transaction fails — no partial processing.

---

### 2.2 The Six JSON Syntax Rules

#### Rule 1: Data is in name/value pairs

Every piece of data has a **name** (key) and a **value**, separated by a colon:

```json
"name": "Chioma"
```

Multiple pairs are separated by commas:

```json
"name": "Chioma", "city": "Enugu", "age": 25
```

---

#### Rule 2: Data is wrapped in curly braces `{}` (for objects) or square brackets `[]` (for arrays)

```json
{ "bank": "GTBank", "code": "058" }
```

```json
["GTBank", "Access Bank", "Zenith Bank"]
```

---

#### Rule 3: Keys MUST be strings wrapped in double quotes

```json
// ✅ VALID JSON — double quotes on keys
{ "name": "Tunde" }

// ❌ INVALID JSON — single quotes
{ 'name': 'Tunde' }

// ❌ INVALID JSON — no quotes on key
{ name: "Tunde" }
```

This is the **most common beginner mistake** when writing JSON manually. JavaScript objects allow unquoted keys — JSON does not.

---

#### Rule 4: String values MUST use double quotes

```json
// ✅ VALID
{ "city": "Lagos" }

// ❌ INVALID — single quotes on value
{ "city": 'Lagos' }
```

Numbers, booleans, null, arrays, and objects do NOT use quotes:

```json
{
  "name": "Tunde",
  "age": 28,
  "balance": 500000.50,
  "isActive": true,
  "spouse": null,
  "scores": [95, 87, 92],
  "address": { "city": "Lagos" }
}
```

---

#### Rule 5: No trailing commas

```json
// ✅ VALID
{
  "name": "Tunde",
  "age": 28
}

// ❌ INVALID — trailing comma after last property
{
  "name": "Tunde",
  "age": 28,
}
```

JavaScript objects allow trailing commas (ES2017+). JSON does not. This difference trips up many developers.

---

#### Rule 6: No comments

```json
// ❌ INVALID — JSON does not support comments
{
  // This is the user's name
  "name": "Tunde"
}

/* ❌ Also invalid */
{
  "name": "Tunde" /* primary account holder */
}
```

If you need documentation in JSON, store comments as a special key in your data — or use a format like JSONC (JSON with Comments) for config files only.

---

### 2.3 Valid JSON — Complete Example

```json
{
  "transaction": {
    "id": "TXN-2024-001042",
    "type": "transfer",
    "amount": 150000,
    "currency": "NGN",
    "sender": {
      "name": "Babatunde Adewale",
      "accountNumber": "0123456789",
      "bank": "GTBank"
    },
    "recipient": {
      "name": "Chioma Okafor",
      "accountNumber": "9876543210",
      "bank": "Access Bank"
    },
    "timestamp": "2024-06-15T14:32:00Z",
    "status": "completed",
    "fees": [
      { "type": "stamp_duty", "amount": 50 },
      { "type": "vat", "amount": 7.5 }
    ],
    "narration": "School fees payment"
  }
}
```

---

### 2.4 JSON Validator Tools

When you write JSON manually and it fails to parse, use a JSON validator:
- **jsonlint.com** — pastes and validates JSON
- **jsonformatter.curiousconcept.com** — formats and validates
- Browser console: paste `JSON.parse(yourJsonString)` — if it throws, the JSON is invalid

```javascript
// Quick validation in the browser console:
try {
  JSON.parse('{"name":"Tunde","age":28}');
  console.log("Valid JSON ✅");
} catch (e) {
  console.log("Invalid JSON ❌:", e.message);
}
// Output: Valid JSON ✅
```

---

### 2.5 Common Beginner Mistakes — Quick Reference

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| `{'name': 'Tunde'}` | `{"name": "Tunde"}` — use double quotes everywhere |
| `{"name": "Tunde",}` | Remove trailing comma |
| `{name: "Tunde"}` | `{"name": "Tunde"}` — quote the key |
| `{"age": "28"}` | `{"age": 28}` — numbers don't need quotes |
| `{"active": True}` | `{"active": true}` — lowercase booleans |
| `{"spouse": None}` | `{"spouse": null}` — lowercase null |

---

<a name="chapter-3"></a>
## Chapter 3 — JSON vs XML

### 3.1 Why Compare JSON and XML?

Before JSON became dominant (around 2005–2010), **XML (eXtensible Markup Language)** was the standard way to exchange data on the web. Understanding how JSON compares to XML helps you:
- Work with legacy APIs and systems that still use XML
- Understand why JSON is now preferred
- Make informed decisions about which to use in your own projects

---

### 3.2 Side-by-Side Comparison

The same customer data, written in both formats:

**JSON:**
```json
{
  "customer": {
    "id": 1,
    "name": "Babatunde Adewale",
    "email": "tunde@example.com",
    "city": "Lagos",
    "balance": 500000,
    "accounts": ["savings", "current", "domiciliary"]
  }
}
```

**XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer>
  <id>1</id>
  <name>Babatunde Adewale</name>
  <email>tunde@example.com</email>
  <city>Lagos</city>
  <balance>500000</balance>
  <accounts>
    <account>savings</account>
    <account>current</account>
    <account>domiciliary</account>
  </accounts>
</customer>
```

---

### 3.3 Detailed Comparison Table

| Feature | JSON | XML |
|---------|------|-----|
| **Readability** | Cleaner, less verbose | More verbose (open/close tags) |
| **Size** | Smaller — less data to transmit | Larger — tags add overhead |
| **Parsing in JS** | Native: `JSON.parse()` | Requires DOM parsing or libraries |
| **Data types** | Supports numbers, booleans, null natively | Everything is a string by default |
| **Arrays** | Native: `[1, 2, 3]` | Must use repeated tags |
| **Comments** | Not supported | Supported: `<!-- comment -->` |
| **Attributes** | Not supported | Supported: `<tag attribute="value">` |
| **Schema validation** | JSON Schema (optional) | XSD/DTD (mature ecosystem) |
| **Namespaces** | Not supported | Supported (for complex enterprise needs) |
| **Browser support** | Native in all browsers | Requires XMLParser |
| **Used by** | REST APIs, SPAs, mobile apps | SOAP, enterprise systems, RSS |

---

### 3.4 Parsing Comparison in JavaScript

```javascript
// ─── Parsing JSON ──────────────────────────────────────────────────────
const jsonText = '{"name":"Babatunde","city":"Lagos","balance":500000}';
const customer = JSON.parse(jsonText);

console.log(customer.name);    // Output: "Babatunde"
console.log(customer.balance); // Output: 500000
// ✅ One line — native, fast, clean


// ─── Parsing XML ──────────────────────────────────────────────────────
const xmlText = `<customer>
  <name>Babatunde</name>
  <city>Lagos</city>
  <balance>500000</balance>
</customer>`;

const parser  = new DOMParser();
const xmlDoc  = parser.parseFromString(xmlText, "text/xml");

const name    = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
const balance = xmlDoc.getElementsByTagName("balance")[0].childNodes[0].nodeValue;

console.log(name);           // Output: "Babatunde"
console.log(typeof balance); // Output: "string" ← XML returns strings, not numbers!
console.log(Number(balance)); // Must manually convert: 500000
// ⚠️  More code, and values are always strings
```

---

### 3.5 When to Still Use XML

Despite JSON's advantages, XML is still used in specific contexts:

| Scenario | Why XML |
|----------|---------|
| **SOAP web services** | Enterprise standard requiring XML |
| **RSS/Atom feeds** | Blog and news syndication |
| **SVG graphics** | Scalable Vector Graphics are XML-based |
| **Office documents** | `.docx`, `.xlsx` are zipped XML files |
| **Android layouts** | UI layouts defined in XML |
| **Nigerian government systems** | Many older e-government APIs use XML |
| **Configuration files** | Maven (`pom.xml`), Spring, Android |

> **Rule of thumb:** If you are building a new REST API or web app today, use JSON. If you are integrating with a legacy system or enterprise service, you may encounter XML and need to handle it.

---

### 3.6 JSON is Not a Replacement for XML — It's a Different Tool

```
JSON = data exchange between web apps and servers
XML  = document structure, complex configuration, enterprise messaging

Both are still widely used. A good developer understands both.
```

---

<a name="chapter-4"></a>
## Chapter 4 — JSON Data Types

### 4.1 The Six JSON Data Types

JSON supports exactly **six data types**. Understanding them precisely prevents bugs when parsing and using JSON data.

| Type | JSON Example | JavaScript Type After Parsing |
|------|-------------|-------------------------------|
| String | `"Lagos"` | `string` |
| Number | `500000` or `3.14` | `number` |
| Boolean | `true` or `false` | `boolean` |
| Null | `null` | `object` (JavaScript quirk) |
| Object | `{"key": "value"}` | `object` |
| Array | `[1, 2, 3]` | `object` (Array) |

Notice: **JSON does not have a `undefined`, `function`, `Symbol`, or `Date` type.** These JavaScript types are either omitted or converted when you use `JSON.stringify()`.

---

### 4.2 Type 1 — Strings

Strings must be in **double quotes**. They can contain any Unicode characters:

```json
{
  "firstName": "Babatunde",
  "lastName": "Adewale",
  "middleName": "Oluwaseun",
  "nationality": "Nigerian",
  "emoji": "👋",
  "igboGreeting": "Nnọọ"
}
```

**Escape sequences in JSON strings:**

| Escape | Represents |
|--------|-----------|
| `\"` | Double quote (inside string) |
| `\\` | Backslash |
| `\/` | Forward slash |
| `\n` | Newline |
| `\t` | Tab |
| `\r` | Carriage return |
| `\uXXXX` | Unicode character |

```json
{
  "message": "Hello \"Tunde\"!\nWelcome to Lagos.",
  "path": "C:\\Users\\Tunde\\Documents",
  "currency": "\u20A6"
}
```

After parsing:
```javascript
const data = JSON.parse(jsonText);
console.log(data.message);  // Output: Hello "Tunde"!
                             //         Welcome to Lagos.
console.log(data.currency); // Output: ₦
```

---

### 4.3 Type 2 — Numbers

JSON numbers have **no quotes**. They can be integers, decimals, negative, or use scientific notation:

```json
{
  "accountBalance": 500000,
  "interestRate": 0.085,
  "overdraftLimit": -50000,
  "nationalDebt": 9.1e13,
  "transactionFee": 52.50,
  "maxTransferPerDay": 5000000
}
```

**Important:** JSON has only ONE number type (no `int` vs `float` distinction like some languages).

```javascript
const data = JSON.parse(jsonText);
console.log(typeof data.accountBalance); // Output: "number"
console.log(typeof data.interestRate);   // Output: "number"
console.log(data.nationalDebt);          // Output: 91000000000000
```

**Watch out for large numbers:**
```javascript
// JSON numbers have limits — very large integers can lose precision
const bigNumber = JSON.parse('{"id": 9999999999999999}');
console.log(bigNumber.id); // Output: 10000000000000000 ← lost precision!

// Solution: store large IDs as strings
const safeId = JSON.parse('{"id": "9999999999999999"}');
console.log(safeId.id); // Output: "9999999999999999" ← exact
```

---

### 4.4 Type 3 — Booleans

Only two valid values: `true` and `false` (lowercase — always):

```json
{
  "isVerified": true,
  "isBlacklisted": false,
  "hasBVN": true,
  "isFrozen": false,
  "twoFactorEnabled": true
}
```

```javascript
// ❌ INVALID JSON
{ "isActive": True }   // Python-style True — not valid
{ "isActive": TRUE }   // Uppercase — not valid
{ "isActive": "true" } // String "true" — valid JSON, but it's a STRING, not boolean!

// ✅ VALID JSON
{ "isActive": true }

// After parsing:
const data = JSON.parse('{"isActive": true}');
console.log(data.isActive);          // Output: true
console.log(typeof data.isActive);   // Output: "boolean"
console.log(data.isActive === true); // Output: true ← boolean comparison works
```

---

### 4.5 Type 4 — Null

Represents an **intentionally empty or missing value**:

```json
{
  "name": "Babatunde",
  "middleName": null,
  "spouse": null,
  "secondaryEmail": null,
  "deactivatedAt": null
}
```

The difference between `null` and omitting the key entirely:

```javascript
const profile = JSON.parse(`{
  "name": "Tunde",
  "middleName": null
}`);

// null means "we know this field exists, but it has no value"
console.log(profile.middleName);           // Output: null
console.log(profile.middleName === null);  // Output: true

// undefined means "this property doesn't exist at all"
console.log(profile.nickname);             // Output: undefined
console.log(profile.nickname === null);    // Output: false
```

---

### 4.6 Type 5 — Objects (Nested)

Objects can be nested inside other objects:

```json
{
  "customer": {
    "id": 42,
    "name": "Babatunde",
    "kyc": {
      "bvn": "22345678901",
      "nin": "12345678901",
      "documents": {
        "passport": "A12345678",
        "driversLicense": "LAG-2019-1234567"
      }
    }
  }
}
```

```javascript
const data = JSON.parse(jsonText);

// Access nested values with dot notation
console.log(data.customer.name);               // Output: "Babatunde"
console.log(data.customer.kyc.bvn);            // Output: "22345678901"
console.log(data.customer.kyc.documents.passport); // Output: "A12345678"

// Or bracket notation (useful for dynamic access)
const field = "nin";
console.log(data.customer.kyc[field]);         // Output: "12345678901"
```

---

### 4.7 Type 6 — Arrays

Arrays hold ordered lists of values. The values can be of any JSON type — even mixed:

```json
{
  "bankCodes": ["058", "044", "057", "063"],
  "scores": [85, 92, 78, 95, 88],
  "portfolio": [
    { "stock": "DANGOTE", "units": 100, "buyPrice": 350.00 },
    { "stock": "GTCO",    "units": 500, "buyPrice": 32.50 },
    { "stock": "ZENITH",  "units": 200, "buyPrice": 28.00 }
  ],
  "mixed": [1, "two", true, null, { "x": 3 }]
}
```

```javascript
const data = JSON.parse(jsonText);

console.log(data.bankCodes[0]);          // Output: "058"
console.log(data.scores.length);         // Output: 5
console.log(data.portfolio[1].stock);    // Output: "GTCO"
console.log(data.portfolio[1].buyPrice); // Output: 32.5

// Iterate over array
data.portfolio.forEach(function(item) {
  const value = item.units * item.buyPrice;
  console.log(item.stock + ": ₦" + value.toLocaleString());
});
// Output:
// DANGOTE: ₦35,000
// GTCO: ₦16,250
// ZENITH: ₦5,600
```

---

### 4.8 Types JSON Does NOT Support

These JavaScript types are **not valid JSON values**:

```javascript
// ❌ Functions — stripped out during JSON.stringify()
const obj = {
  name: "Tunde",
  greet: function() { return "Hello!"; }
};
console.log(JSON.stringify(obj));
// Output: '{"name":"Tunde"}' ← function is gone!

// ❌ undefined — also stripped out
const obj2 = { name: "Tunde", nickname: undefined };
console.log(JSON.stringify(obj2));
// Output: '{"name":"Tunde"}' ← undefined key is gone!

// ❌ Dates — converted to ISO string
const obj3 = { createdAt: new Date("2024-01-15") };
console.log(JSON.stringify(obj3));
// Output: '{"createdAt":"2024-01-15T00:00:00.000Z"}' ← string, not Date object!

// ❌ NaN and Infinity — converted to null
const obj4 = { ratio: NaN, max: Infinity };
console.log(JSON.stringify(obj4));
// Output: '{"ratio":null,"max":null}'
```

---

<a name="chapter-5"></a>
## Chapter 5 — JSON.parse() — Receiving Data

### 5.1 The Concept: Text Arrives, Objects Are Needed

When data travels across a network — from a server to your browser — it travels as **text**. Even JSON data is just a string during transit. You cannot call `.name` or `.balance` on a plain string. You need to **convert the text into a real JavaScript object** first.

That conversion is called **parsing**, and `JSON.parse()` is the tool that does it.

```
Server sends:    '{"name":"Tunde","balance":500000}'   ← plain text string
JSON.parse():    Converts it ↓
JavaScript gets: { name: "Tunde", balance: 500000 }    ← real object with methods
```

---

### 5.2 Basic `JSON.parse()` Usage

```javascript
JSON.parse(text, reviver?)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | String | ✅ Yes | The JSON string to parse |
| `reviver` | Function | Optional | A function to transform values during parsing |

**Simple example:**
```javascript
const jsonString = '{"name":"Babatunde","age":28,"city":"Lagos"}';
const person = JSON.parse(jsonString);

console.log(person.name);   // Output: "Babatunde"
console.log(person.age);    // Output: 28
console.log(typeof person); // Output: "object"

// Now you can use all object operations:
const keys = Object.keys(person);
console.log(keys); // Output: ["name", "age", "city"]
```

---

### 5.3 Parsing All Data Types

```javascript
// Parsing a string value
const s = JSON.parse('"Lagos"');
console.log(s);          // Output: "Lagos"
console.log(typeof s);   // Output: "string"

// Parsing a number
const n = JSON.parse('500000');
console.log(n);          // Output: 500000
console.log(typeof n);   // Output: "number"

// Parsing a boolean
const b = JSON.parse('true');
console.log(b);          // Output: true
console.log(typeof b);   // Output: "boolean"

// Parsing null
const nothing = JSON.parse('null');
console.log(nothing);    // Output: null

// Parsing an array
const arr = JSON.parse('[10, 20, 30, 40]');
console.log(arr);        // Output: [10, 20, 30, 40]
console.log(arr[2]);     // Output: 30
console.log(Array.isArray(arr)); // Output: true

// Parsing a nested object
const bank = JSON.parse(`{
  "name": "GTBank",
  "code": "058",
  "branches": ["Lagos", "Abuja", "Kano"],
  "onlineBanking": true
}`);
console.log(bank.name);        // Output: "GTBank"
console.log(bank.branches[0]); // Output: "Lagos"
```

---

### 5.4 The `reviver` Function — Transforming Values at Parse Time

The optional second argument to `JSON.parse()` is a **reviver function**. It is called for each key-value pair as the JSON is being parsed, allowing you to transform values:

```javascript
// ─── Use case 1: Convert date strings back to Date objects ─────────────
const transaction = JSON.parse(
  '{"id":"TXN001","amount":50000,"date":"2024-06-15T14:30:00.000Z"}',
  function(key, value) {
    if (key === "date") {
      return new Date(value); // Convert string → Date
    }
    return value; // Return all other values as-is
  }
);

console.log(transaction.date);           // Output: Date object
console.log(transaction.date.getFullYear()); // Output: 2024
console.log(transaction.date instanceof Date); // Output: true


// ─── Use case 2: Convert string numbers to actual numbers ──────────────
const apiResponse = JSON.parse(
  '{"price":"450000","quantity":"5","discount":"0.1"}',
  function(key, value) {
    // If value looks like a number, convert it
    if (typeof value === "string" && !isNaN(value)) {
      return Number(value);
    }
    return value;
  }
);

console.log(apiResponse.price);          // Output: 450000 (number, not string)
console.log(typeof apiResponse.price);   // Output: "number"
console.log(apiResponse.price * apiResponse.quantity); // Output: 2250000


// ─── Use case 3: Censor sensitive fields ──────────────────────────────
const raw = JSON.parse(
  '{"name":"Tunde","bvn":"22345678901","nin":"12345678901","balance":500000}',
  function(key, value) {
    if (key === "bvn" || key === "nin") {
      return "***REDACTED***";
    }
    return value;
  }
);

console.log(raw.name);    // Output: "Tunde"
console.log(raw.bvn);     // Output: "***REDACTED***"
console.log(raw.balance); // Output: 500000
```

---

### 5.5 Error Handling with JSON.parse()

Invalid JSON throws a `SyntaxError`. Always use `try-catch` when parsing untrusted data:

```javascript
function safeParseJSON(text) {
  try {
    return {
      success: true,
      data: JSON.parse(text)
    };
  } catch (error) {
    return {
      success: false,
      error: "Invalid JSON: " + error.message,
      data: null
    };
  }
}

// Test with valid JSON
const result1 = safeParseJSON('{"name":"Tunde"}');
console.log(result1.success); // Output: true
console.log(result1.data.name); // Output: "Tunde"

// Test with invalid JSON
const result2 = safeParseJSON("{name: 'Tunde'}"); // Missing quotes
console.log(result2.success); // Output: false
console.log(result2.error);   // Output: "Invalid JSON: Unexpected token 'n'..."

// Test with empty string
const result3 = safeParseJSON("");
console.log(result3.success); // Output: false
console.log(result3.error);   // Output: "Invalid JSON: Unexpected end of JSON input"
```

---

### 5.6 Common Beginner Mistake — Double Parsing

```javascript
const jsonString = '{"name":"Tunde"}';
const obj = JSON.parse(jsonString);

// ❌ WRONG — parsing an already-parsed object
const obj2 = JSON.parse(obj);
// Output: SyntaxError — obj is already an object, not a string!

// ✅ CORRECT — parse once, use the object
console.log(obj.name); // Output: "Tunde"
```

---

<a name="chapter-6"></a>
## Chapter 6 — JSON.stringify() — Sending Data

### 6.1 The Concept: Objects Must Become Text for Transport

When you want to **send** data from JavaScript to a server (or save it to localStorage, a file, etc.), you need to convert your JavaScript object back into a **text string**. That's what `JSON.stringify()` does — it is the exact reverse of `JSON.parse()`.

```
JavaScript has: { name: "Tunde", balance: 500000 }   ← real object
JSON.stringify(): Converts it ↓
Network sends:  '{"name":"Tunde","balance":500000}'   ← plain text string
```

---

### 6.2 Basic `JSON.stringify()` Usage

```javascript
JSON.stringify(value, replacer?, space?)
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `value` | Any | ✅ Yes | The value to convert to JSON |
| `replacer` | Function or Array | Optional | Filter/transform properties |
| `space` | Number or String | Optional | Add indentation for readability |

**Simple example:**
```javascript
const customer = {
  name: "Babatunde",
  age: 28,
  city: "Lagos",
  balance: 500000
};

const jsonString = JSON.stringify(customer);
console.log(jsonString);
// Output: '{"name":"Babatunde","age":28,"city":"Lagos","balance":500000}'
console.log(typeof jsonString); // Output: "string"
```

---

### 6.3 Stringifying All Data Types

```javascript
// Object
console.log(JSON.stringify({ a: 1, b: "two" }));
// Output: '{"a":1,"b":"two"}'

// Array
console.log(JSON.stringify([10, "Lagos", true, null]));
// Output: '[10,"Lagos",true,null]'

// Number
console.log(JSON.stringify(500000));
// Output: '500000'

// String
console.log(JSON.stringify("Hello Lagos"));
// Output: '"Hello Lagos"'  (note the outer quotes are the string delimiters)

// Boolean
console.log(JSON.stringify(true));
// Output: 'true'

// Null
console.log(JSON.stringify(null));
// Output: 'null'
```

---

### 6.4 What Gets Lost in Stringification

```javascript
const obj = {
  name: "Tunde",
  age: 28,
  greet: function() { return "Hello!"; },  // function
  nickname: undefined,                      // undefined
  symbol: Symbol("id"),                     // Symbol
  createdAt: new Date("2024-06-15"),        // Date
  ratio: NaN,                               // NaN
  limit: Infinity,                          // Infinity
  scores: [85, undefined, 92]               // Array with undefined
};

console.log(JSON.stringify(obj));
// Output: '{"name":"Tunde","age":28,"createdAt":"2024-06-15T00:00:00.000Z","ratio":null,"limit":null,"scores":[85,null,92]}'
// Notice:
// - greet (function) → GONE
// - nickname (undefined) → GONE
// - symbol → GONE
// - createdAt (Date) → "2024-06-15T00:00:00.000Z" (ISO string)
// - NaN → null
// - Infinity → null
// - undefined in array → null (arrays preserve position, so undefined becomes null)
```

---

### 6.5 The `space` Parameter — Pretty Printing

When debugging or reading JSON in a file, use the third argument to add indentation:

```javascript
const transaction = {
  id: "TXN-001",
  sender: "Babatunde",
  recipient: "Chioma",
  amount: 150000,
  fees: { stampDuty: 50, vat: 7.5 }
};

// Compact (for network transmission):
console.log(JSON.stringify(transaction));
// Output: '{"id":"TXN-001","sender":"Babatunde","recipient":"Chioma","amount":150000,"fees":{"stampDuty":50,"vat":7.5}}'

// Pretty (for readability — 2 spaces):
console.log(JSON.stringify(transaction, null, 2));
// Output:
// {
//   "id": "TXN-001",
//   "sender": "Babatunde",
//   "recipient": "Chioma",
//   "amount": 150000,
//   "fees": {
//     "stampDuty": 50,
//     "vat": 7.5
//   }
// }

// Using tab indentation:
console.log(JSON.stringify(transaction, null, "\t"));
// Output: Same structure but with tab indentation
```

---

### 6.6 The `replacer` Parameter — Filtering and Transforming

#### Using an Array (whitelist of keys to include):

```javascript
const user = {
  id: 42,
  name: "Babatunde",
  email: "tunde@example.com",
  bvn: "22345678901",      // sensitive
  nin: "12345678901",      // sensitive
  city: "Lagos",
  balance: 500000           // sensitive
};

// Only include id, name, email, city
const safeJSON = JSON.stringify(user, ["id", "name", "email", "city"], 2);
console.log(safeJSON);
// Output:
// {
//   "id": 42,
//   "name": "Babatunde",
//   "email": "tunde@example.com",
//   "city": "Lagos"
// }
// ✅ Sensitive fields (bvn, nin, balance) are excluded
```

#### Using a Function (transform each key-value pair):

```javascript
const portfolio = {
  owner: "Babatunde",
  totalValue: 5000000,
  returns: 0.1875,    // 18.75%
  lastUpdated: new Date("2024-06-15")
};

const result = JSON.stringify(portfolio, function(key, value) {
  if (key === "returns") {
    return (value * 100).toFixed(2) + "%"; // Convert to percentage string
  }
  if (value instanceof Date) {
    return value.toLocaleDateString("en-NG"); // Format date Nigerian style
  }
  return value; // Return everything else unchanged
}, 2);

console.log(result);
// Output:
// {
//   "owner": "Babatunde",
//   "totalValue": 5000000,
//   "returns": "18.75%",
//   "lastUpdated": "15/06/2024"
// }
```

---

### 6.7 The `toJSON()` Method — Custom Serialization

Any object can define its own `toJSON()` method to control how it is stringified:

```javascript
const account = {
  owner: "Babatunde",
  balance: 500000,
  pin: "1234",        // Never send this!
  createdAt: new Date("2024-01-15"),

  toJSON: function() {
    // Return only what should be serialized
    return {
      owner: this.owner,
      balance: this.balance,
      // pin is excluded
      createdAt: this.createdAt.toISOString().split("T")[0] // "2024-01-15"
    };
  }
};

console.log(JSON.stringify(account, null, 2));
// Output:
// {
//   "owner": "Babatunde",
//   "balance": 500000,
//   "createdAt": "2024-01-15"
// }
// ✅ pin is excluded, date is formatted cleanly
```

---

### 6.8 Deep Copy Trick — Using JSON.parse + JSON.stringify

One popular use of `JSON.stringify` is creating a **deep copy** of an object (a completely independent copy with no shared references):

```javascript
const original = {
  name: "Tunde",
  address: { city: "Lagos", lga: "Ikeja" }
};

// ❌ Shallow copy — address is still shared
const shallow = Object.assign({}, original);
shallow.address.city = "Abuja";
console.log(original.address.city); // Output: "Abuja" ← original changed!

// ✅ Deep copy using JSON
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "Kano";
console.log(original.address.city); // Output: "Lagos" ← original unchanged!

// ⚠️ Limitation: this deep copy trick loses functions, dates, undefined, etc.
// For full deep copy with those types, use structuredClone() or a library like lodash
```

---

<a name="chapter-7"></a>
## Chapter 7 — Working with JSON Objects

### 7.1 Accessing Properties of Parsed JSON Objects

After parsing JSON, you work with the resulting JavaScript object exactly as you would any other object. There are two notations:

```javascript
const json = `{
  "bank": "GTBank",
  "code": "058",
  "type": "commercial",
  "headquarters": {
    "city": "Lagos",
    "address": "Guaranty Trust Bank Building, Plot 635, Akin Adesola Street"
  },
  "services": {
    "onlineBanking": true,
    "mobileMoney": true,
    "foreignExchange": true
  }
}`;

const bank = JSON.parse(json);

// Dot notation (most common):
console.log(bank.bank);                        // Output: "GTBank"
console.log(bank.headquarters.city);           // Output: "Lagos"
console.log(bank.services.foreignExchange);    // Output: true

// Bracket notation (useful when key is in a variable):
const prop = "code";
console.log(bank[prop]);                        // Output: "058"

// Access with bracket notation for special key names:
const data = JSON.parse('{"first-name": "Babatunde"}');
// console.log(data.first-name); // ❌ SyntaxError — hyphen is an operator!
console.log(data["first-name"]);                // ✅ Output: "Babatunde"
```

---

### 7.2 Modifying JSON Object Properties

Once parsed, a JSON-derived object is a regular JavaScript object — you can read and write freely:

```javascript
let customer = JSON.parse(`{
  "name": "Babatunde",
  "city": "Lagos",
  "balance": 500000,
  "isVerified": false
}`);

// Modify existing properties
customer.city = "Abuja";           // Updated: Lagos → Abuja
customer.balance += 100000;        // Updated: 500000 → 600000
customer.isVerified = true;        // Updated: false → true

// Add new properties
customer.lastLogin = new Date().toISOString();
customer.accountType = "Premium";

// Delete properties
delete customer.isVerified;

console.log(JSON.stringify(customer, null, 2));
// Output:
// {
//   "name": "Babatunde",
//   "city": "Abuja",
//   "balance": 600000,
//   "lastLogin": "2024-06-15T12:00:00.000Z",
//   "accountType": "Premium"
// }
```

---

### 7.3 Looping Through JSON Object Properties

```javascript
const product = JSON.parse(`{
  "id": 101,
  "name": "Samsung Galaxy A55",
  "price": 450000,
  "category": "Electronics",
  "inStock": true,
  "rating": 4.5
}`);

// Method 1: for...in loop
for (let key in product) {
  console.log(key + ": " + product[key]);
}
// Output:
// id: 101
// name: Samsung Galaxy A55
// price: 450000
// category: Electronics
// inStock: true
// rating: 4.5

// Method 2: Object.keys()
const keys = Object.keys(product);
console.log(keys);
// Output: ["id", "name", "price", "category", "inStock", "rating"]

// Method 3: Object.entries() — gives [key, value] pairs
Object.entries(product).forEach(function([key, value]) {
  console.log(`${key} → ${value}`);
});
```

---

### 7.4 Nested Objects — Accessing Deep Values Safely

When working with deeply nested JSON from APIs, keys may sometimes be missing (null/undefined). Safely access them:

```javascript
const response = JSON.parse(`{
  "status": "success",
  "data": {
    "user": {
      "name": "Babatunde",
      "kyc": {
        "bvn": "22345678901"
      }
    }
  }
}`);

// Safe access with optional chaining (?.)
console.log(response.data?.user?.name);          // Output: "Babatunde"
console.log(response.data?.user?.kyc?.bvn);      // Output: "22345678901"
console.log(response.data?.user?.nin?.value);    // Output: undefined (no error!)

// With nullish coalescing — default if value is null/undefined
const bvn = response.data?.user?.kyc?.bvn ?? "Not provided";
const nin = response.data?.user?.nin?.value ?? "Not provided";
console.log(bvn); // Output: "22345678901"
console.log(nin); // Output: "Not provided"
```

---

### 7.5 Checking If a Property Exists

```javascript
const account = JSON.parse(`{
  "owner": "Tunde",
  "balance": 500000,
  "overdraft": null
}`);

// Method 1: in operator (checks if key exists, even if null)
console.log("owner" in account);     // Output: true
console.log("overdraft" in account); // Output: true  ← exists (even though null)
console.log("bvn" in account);       // Output: false ← doesn't exist

// Method 2: hasOwnProperty
console.log(account.hasOwnProperty("balance")); // Output: true

// Method 3: Check for truthy value (won't work for null/0/false)
if (account.balance) {
  console.log("Has balance"); // Output: "Has balance"
}
if (account.overdraft) {
  console.log("Has overdraft"); // NOT printed — null is falsy
}
```

---

<a name="chapter-8"></a>
## Chapter 8 — Working with JSON Arrays

### 8.1 JSON Arrays — Recap

A JSON array is an **ordered list of values** enclosed in square brackets. After parsing, it becomes a standard JavaScript array with full access to all array methods.

```javascript
const json = `{
  "bank": "First Bank",
  "branches": [
    { "city": "Lagos",  "address": "35 Marina", "atmCount": 5 },
    { "city": "Abuja",  "address": "15 Wuse II", "atmCount": 3 },
    { "city": "Kano",   "address": "22 Zaria Rd", "atmCount": 2 },
    { "city": "Enugu",  "address": "7 Ogui Rd", "atmCount": 2 },
    { "city": "Rivers", "address": "4 GRA Phase 2", "atmCount": 4 }
  ]
}`;

const data = JSON.parse(json);

console.log(data.branches.length);        // Output: 5
console.log(data.branches[0].city);       // Output: "Lagos"
console.log(data.branches[2].atmCount);   // Output: 2
```

---

### 8.2 All Common Array Operations on Parsed JSON

```javascript
const transactions = JSON.parse(`[
  { "id": 1, "type": "credit", "amount": 150000, "from": "Chioma" },
  { "id": 2, "type": "debit",  "amount": 50000,  "to": "Konga" },
  { "id": 3, "type": "credit", "amount": 200000, "from": "Emeka" },
  { "id": 4, "type": "debit",  "amount": 25000,  "to": "EKEDC" },
  { "id": 5, "type": "credit", "amount": 75000,  "from": "Funmi" }
]`);

// ─── forEach — iterate ────────────────────────────────────────────────
transactions.forEach(function(tx) {
  const sign = tx.type === "credit" ? "+" : "-";
  console.log(`${sign}₦${tx.amount.toLocaleString()}`);
});
// Output: +₦150,000 | -₦50,000 | +₦200,000 | -₦25,000 | +₦75,000

// ─── filter — get only credits ────────────────────────────────────────
const credits = transactions.filter(tx => tx.type === "credit");
console.log(credits.length); // Output: 3

// ─── map — extract amounts ────────────────────────────────────────────
const amounts = transactions.map(tx => tx.amount);
console.log(amounts); // Output: [150000, 50000, 200000, 25000, 75000]

// ─── reduce — calculate total credits ────────────────────────────────
const totalCredit = transactions
  .filter(tx => tx.type === "credit")
  .reduce((sum, tx) => sum + tx.amount, 0);
console.log("Total credit: ₦" + totalCredit.toLocaleString());
// Output: Total credit: ₦425,000

// ─── find — get specific transaction ─────────────────────────────────
const tx3 = transactions.find(tx => tx.id === 3);
console.log(tx3.from); // Output: "Emeka"

// ─── sort — by amount (descending) ───────────────────────────────────
const sorted = [...transactions].sort((a, b) => b.amount - a.amount);
console.log(sorted[0].amount); // Output: 200000

// ─── some / every ─────────────────────────────────────────────────────
console.log(transactions.some(tx => tx.amount > 100000));  // Output: true
console.log(transactions.every(tx => tx.amount > 10000));  // Output: true
```

---

### 8.3 Modifying Arrays from JSON

```javascript
let wishlist = JSON.parse(`[
  {"id": 1, "product": "Laptop",  "price": 850000},
  {"id": 2, "product": "Phone",   "price": 150000},
  {"id": 3, "product": "Headset", "price": 45000}
]`);

// Add an item
wishlist.push({ id: 4, product: "Monitor", price: 200000 });
console.log(wishlist.length); // Output: 4

// Remove an item by id (filter out)
wishlist = wishlist.filter(item => item.id !== 2);
console.log(wishlist.length); // Output: 3 (Phone removed)

// Update an item
const laptop = wishlist.find(item => item.id === 1);
if (laptop) laptop.price = 800000; // Price dropped!

// Total value
const total = wishlist.reduce((sum, item) => sum + item.price, 0);
console.log("Wishlist total: ₦" + total.toLocaleString());
// Output: Wishlist total: ₦1,045,000
```

---

### 8.4 Arrays of Arrays — Matrix-like JSON

```javascript
const examResults = JSON.parse(`{
  "subject": "Web Development",
  "scores": [
    ["Babatunde", 92, "A"],
    ["Chioma",    88, "B+"],
    ["Emeka",     75, "B"],
    ["Funmi",     95, "A+"]
  ]
}`);

examResults.scores.forEach(function(student) {
  const [name, score, grade] = student; // Array destructuring
  console.log(`${name}: ${score} (${grade})`);
});
// Output:
// Babatunde: 92 (A)
// Chioma: 88 (B+)
// Emeka: 75 (B)
// Funmi: 95 (A+)
```

---

<a name="chapter-9"></a>
## Chapter 9 — JSON and Servers

### 9.1 The Request-Response Cycle with JSON

JSON is the language of modern APIs. When a web app needs data from a server, the entire cycle looks like this:

```
1. JavaScript creates a request (AJAX/fetch)
2. Request travels to the server as text
3. Server processes request
4. Server builds a JavaScript/PHP/Python object with the result
5. Server converts it to a JSON string (serialises)
6. JSON string travels back to the browser as text
7. JavaScript receives the JSON string
8. JavaScript parses it back into an object (deserialises)
9. JavaScript uses the object to update the DOM
```

---

### 9.2 Sending and Receiving JSON with XMLHttpRequest

**Receiving JSON from a server (GET):**
```javascript
function getAccountSummary(customerId) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/accounts/" + customerId);
  xhr.setRequestHeader("Accept", "application/json"); // Tell server we want JSON

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Server sends: '{"id":42,"name":"Babatunde","balance":500000,"currency":"NGN"}'
      const account = JSON.parse(xhr.responseText);

      document.getElementById("holderName").innerText = account.name;
      document.getElementById("balance").innerText =
        account.currency + " " + account.balance.toLocaleString();
    }
  };

  xhr.send();
}
```

**Sending JSON to a server (POST):**
```javascript
function createTransfer(senderAccount, recipientAccount, amount, narration) {
  const transferData = {
    sender:    senderAccount,
    recipient: recipientAccount,
    amount:    amount,
    currency:  "NGN",
    narration: narration,
    timestamp: new Date().toISOString()
  };

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/transfers");

  // These two headers together tell the server:
  // "I'm sending JSON text in the body"
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);

      if (xhr.status === 201) { // 201 Created
        console.log("Transfer successful! Reference:", response.reference);
      } else {
        console.log("Transfer failed:", response.error);
      }
    }
  };

  // Convert JavaScript object → JSON string before sending
  xhr.send(JSON.stringify(transferData));
}

// Usage:
createTransfer("0123456789", "9876543210", 50000, "School fees Q3");
```

---

### 9.3 The Modern Way — Using the `fetch()` API with JSON

The `fetch()` API (introduced in ES2015) is the modern alternative to XMLHttpRequest. It is cleaner and works natively with JSON:

```javascript
// ─── GET Request — receiving JSON ─────────────────────────────────────
async function getProducts(category) {
  try {
    const response = await fetch("/api/products?category=" + category, {
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      throw new Error("HTTP error! Status: " + response.status);
    }

    const products = await response.json(); // Automatically JSON.parse()s!
    return products;

  } catch (error) {
    console.error("Fetch error:", error.message);
    return [];
  }
}

// Usage:
getProducts("electronics").then(function(products) {
  products.forEach(p => console.log(p.name + ": ₦" + p.price.toLocaleString()));
});
// Output:
// Samsung Galaxy A55: ₦450,000
// Tecno Camon 20: ₦185,000


// ─── POST Request — sending JSON ──────────────────────────────────────
async function registerUser(userData) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userData) // Convert object → JSON string
    });

    const result = await response.json(); // Parse response JSON
    return result;

  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}

// Usage:
registerUser({
  name: "Babatunde Adewale",
  email: "tunde@example.com",
  phone: "08012345678",
  city: "Lagos"
}).then(result => {
  console.log("New user ID:", result.userId);
  // Output: New user ID: 103
});
```

---

### 9.4 HTTP Status Codes and JSON Errors

Well-designed JSON APIs return **error details in JSON format too**:

```javascript
// Server returns 400 with body:
// {"error": "Validation failed", "details": {"email": "Invalid format", "phone": "Too short"}}

async function createAccount(formData) {
  const response = await fetch("/api/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (response.status === 201) {
    console.log("✅ Account created:", data.accountNumber);
  } else if (response.status === 400) {
    console.log("❌ Validation errors:");
    Object.entries(data.details).forEach(([field, message]) => {
      console.log("  " + field + ": " + message);
    });
  } else if (response.status === 409) {
    console.log("❌ Conflict:", data.error);
  } else {
    console.log("❌ Unexpected error:", data.error);
  }
}
```

---

### 9.5 Storing JSON in localStorage

You can also persist JSON data client-side using `localStorage`:

```javascript
// ─── Save to localStorage ─────────────────────────────────────────────
function saveCartToStorage(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Cart saved!");
}

// ─── Load from localStorage ───────────────────────────────────────────
function loadCartFromStorage() {
  const saved = localStorage.getItem("cart");

  if (saved === null) {
    console.log("No cart found.");
    return [];
  }

  return JSON.parse(saved);
}

// Usage:
const cart = [
  { id: 1, name: "Laptop", price: 850000, qty: 1 },
  { id: 5, name: "Headset", price: 45000, qty: 2 }
];

saveCartToStorage(cart);                // localStorage stores: '[{"id":1,...},...]'
const loaded = loadCartFromStorage();
console.log(loaded[0].name);            // Output: "Laptop"
console.log(loaded[1].qty);             // Output: 2
```

---

<a name="chapter-10"></a>
## Chapter 10 — JSON with PHP

### 10.1 PHP and JSON — The Natural Partnership

PHP is widely used for Nigerian fintech, e-commerce, and government web applications. PHP has two key JSON functions that mirror JavaScript's:

| JavaScript | PHP | Purpose |
|-----------|-----|---------|
| `JSON.stringify(obj)` | `json_encode($array)` | Object/Array → JSON string |
| `JSON.parse(text)` | `json_decode($text, true)` | JSON string → Object/Array |

---

### 10.2 PHP Sending JSON to JavaScript

**PHP (api/products.php):**
```php
<?php
// Always set this header when returning JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow cross-origin requests

// Data (in a real app, from a database query)
$products = [
  [
    "id"       => 1,
    "name"     => "Samsung Galaxy A55",
    "price"    => 450000,
    "category" => "electronics",
    "inStock"  => true,
    "rating"   => 4.5
  ],
  [
    "id"       => 2,
    "name"     => "Dangote Sugar 1kg",
    "price"    => 1800,
    "category" => "food",
    "inStock"  => true,
    "rating"   => 4.8
  ],
  [
    "id"       => 3,
    "name"     => "Ankara Print Dress",
    "price"    => 12000,
    "category" => "fashion",
    "inStock"  => false,
    "rating"   => 4.6
  ]
];

// PHP array → JSON string → sent to browser
echo json_encode($products);
?>
```

**JavaScript receiving from PHP:**
```javascript
fetch("/api/products.php")
  .then(response => response.json()) // PHP's JSON → JS array
  .then(function(products) {
    products.forEach(function(p) {
      const status = p.inStock ? "✅ In Stock" : "❌ Out of Stock";
      console.log(`${p.name}: ₦${p.price.toLocaleString()} — ${status}`);
    });
  });
// Output:
// Samsung Galaxy A55: ₦450,000 — ✅ In Stock
// Dangote Sugar 1kg: ₦1,800 — ✅ In Stock
// Ankara Print Dress: ₦12,000 — ❌ Out of Stock
```

---

### 10.3 PHP Receiving JSON from JavaScript

**JavaScript sending JSON to PHP:**
```javascript
const newOrder = {
  customerId: 42,
  items: [
    { productId: 1, quantity: 2, price: 450000 },
    { productId: 3, quantity: 1, price: 12000 }
  ],
  deliveryAddress: {
    street: "15 Allen Avenue",
    city: "Lagos",
    state: "Lagos"
  },
  paymentMethod: "card"
};

fetch("/api/orders.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(newOrder)
})
.then(r => r.json())
.then(function(result) {
  console.log("Order #" + result.orderId + " placed successfully!");
  console.log("Total: ₦" + result.total.toLocaleString());
});
// Output:
// Order #5042 placed successfully!
// Total: ₦912,000
```

**PHP (api/orders.php) receiving and processing:**
```php
<?php
header("Content-Type: application/json");

// Read the raw JSON body from the request
$rawBody = file_get_contents("php://input");

// Decode JSON string → PHP associative array (second param true = array, false = object)
$order = json_decode($rawBody, true);

// Validate
if (!$order || !isset($order["customerId"]) || !isset($order["items"])) {
  http_response_code(400);
  echo json_encode(["error" => "Invalid order data"]);
  exit;
}

// Calculate total
$total = 0;
foreach ($order["items"] as $item) {
  $total += $item["quantity"] * $item["price"];
}

// In a real app: save to database, trigger payment, send confirmation email
$orderId = rand(5000, 9999); // Simulated

// Return JSON response
echo json_encode([
  "success" => true,
  "orderId" => $orderId,
  "total"   => $total,
  "status"  => "pending_payment",
  "message" => "Order received. Awaiting payment confirmation."
]);
?>
```

---

### 10.4 PHP Database + JSON — Full Flow

```php
<?php
// get_customer.php
header("Content-Type: application/json");

$id = intval($_GET["id"] ?? 0);
if (!$id) {
  http_response_code(400);
  echo json_encode(["error" => "Customer ID required"]);
  exit;
}

$conn = new mysqli("localhost", "user", "pass", "fintech_db");
$stmt = $conn->prepare("
  SELECT c.id, c.name, c.email, c.city,
         a.account_number, a.balance, a.account_type
  FROM customers c
  JOIN accounts a ON c.id = a.customer_id
  WHERE c.id = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();

$result   = $stmt->get_result();
$accounts = [];

while ($row = $result->fetch_assoc()) {
  // Build nested structure for JSON
  if (empty($accounts)) {
    $customer = [
      "id"    => $row["id"],
      "name"  => $row["name"],
      "email" => $row["email"],
      "city"  => $row["city"],
      "accounts" => []
    ];
  }
  $customer["accounts"][] = [
    "accountNumber" => $row["account_number"],
    "balance"       => floatval($row["balance"]),  // Ensure numeric
    "type"          => $row["account_type"]
  ];
}

$stmt->close();
$conn->close();

echo json_encode($customer ?? ["error" => "Customer not found"]);
?>
```

**JavaScript consuming this:**
```javascript
fetch("/api/get_customer.php?id=42")
  .then(r => r.json())
  .then(function(customer) {
    console.log("Customer:", customer.name);
    customer.accounts.forEach(function(acct) {
      console.log(`  ${acct.type}: ₦${acct.balance.toLocaleString()} (${acct.accountNumber})`);
    });
  });
// Output:
// Customer: Babatunde Adewale
//   savings: ₦500,000 (0123456789)
//   current: ₦1,200,000 (0123456790)
```

---

### 10.5 json_encode Options in PHP

```php
<?php
$data = [
  "name"    => "Babatunde",
  "balance" => 500000,
  "active"  => true
];

// Default output (compact):
echo json_encode($data);
// Output: {"name":"Babatunde","balance":500000,"active":true}

// Pretty print (for debugging/files):
echo json_encode($data, JSON_PRETTY_PRINT);
// Output:
// {
//     "name": "Babatunde",
//     "balance": 500000,
//     "active": true
// }

// Preserve unicode (for Nigerian characters, Yoruba accents, etc.):
$text = ["greeting" => "Ẹ káàbọ̀"];
echo json_encode($text, JSON_UNESCAPED_UNICODE);
// Output: {"greeting":"Ẹ káàbọ̀"}  ← readable, not \u-escaped
?>
```

---

<a name="chapter-11"></a>
## Chapter 11 — JSON to HTML

### 11.1 Why "JSON to HTML"?

One of the most common and practical tasks in front-end development is:
1. Fetching JSON data from an API
2. Converting (mapping) that data into HTML elements
3. Inserting those elements into the DOM

This is how every modern website displays dynamic content — from product listings to news feeds to dashboards.

---

### 11.2 Building an HTML Table from JSON

The most basic pattern — a simple table:

```javascript
const employeesJSON = `[
  {"id":1,"name":"Babatunde Adewale","department":"Engineering","salary":550000,"city":"Lagos"},
  {"id":2,"name":"Chioma Okafor",    "department":"Finance",     "salary":480000,"city":"Enugu"},
  {"id":3,"name":"Emeka Eze",        "department":"Marketing",   "salary":420000,"city":"Abuja"},
  {"id":4,"name":"Funmilayo Okeke",  "department":"Engineering","salary":600000,"city":"Lagos"},
  {"id":5,"name":"Gbenga Adeleke",   "department":"HR",          "salary":390000,"city":"Ibadan"}
]`;

function renderEmployeeTable(jsonData) {
  const employees = JSON.parse(jsonData);

  let html = `
    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
  `;

  employees.forEach(function(emp) {
    html += `<tr>
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>₦${emp.salary.toLocaleString()}</td>
      <td>${emp.city}</td>
    </tr>`;
  });

  html += "</tbody></table>";

  document.getElementById("employeeTable").innerHTML = html;
}

renderEmployeeTable(employeesJSON);
// Renders a full HTML table with 5 employee rows in the browser
```

---

### 11.3 Building Cards from JSON

Product or profile cards are another very common pattern:

```javascript
const productsJSON = `[
  {"id":1,"name":"Samsung Galaxy A55","price":450000,"rating":4.5,"category":"Electronics","badge":"Best Seller"},
  {"id":2,"name":"Dangote Sugar 1kg", "price":1800,  "rating":4.8,"category":"Food",        "badge":"Organic"},
  {"id":3,"name":"Ankara Print Dress","price":12000, "rating":4.6,"category":"Fashion",     "badge":"New Arrival"}
]`;

function renderProductCards(jsonData) {
  const products = JSON.parse(jsonData);
  const container = document.getElementById("productGrid");

  container.innerHTML = products.map(function(p) {
    const stars = "★".repeat(Math.floor(p.rating)) + "☆".repeat(5 - Math.floor(p.rating));

    return `
      <div class="product-card">
        <span class="badge">${p.badge}</span>
        <div class="category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="stars">${stars} <small>(${p.rating})</small></div>
        <div class="price">₦${p.price.toLocaleString()}</div>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  }).join(""); // join removes the commas between array items
}

renderProductCards(productsJSON);
```

---

### 11.4 Building a Dropdown from JSON

```javascript
// JSON from server: list of Nigerian banks
const banksJSON = `[
  {"code":"058","name":"GTBank"},
  {"code":"044","name":"Access Bank"},
  {"code":"057","name":"Zenith Bank"},
  {"code":"011","name":"First Bank"},
  {"code":"033","name":"UBA"}
]`;

function populateBankDropdown(jsonData) {
  const banks = JSON.parse(jsonData);
  const select = document.getElementById("bankSelect");

  // Clear existing options (except the placeholder)
  select.innerHTML = '<option value="">-- Select Bank --</option>';

  banks.forEach(function(bank) {
    const option = document.createElement("option");
    option.value = bank.code;
    option.textContent = bank.name;
    select.appendChild(option);
  });
}

populateBankDropdown(banksJSON);
// Dropdown now has: GTBank, Access Bank, Zenith Bank, First Bank, UBA
```

---

### 11.5 Building a Complete Data Dashboard from JSON

A more complete example — a transaction history dashboard:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Transaction History</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    .summary { display: flex; gap: 20px; margin-bottom: 24px; }
    .stat-card { flex: 1; background: #f0f4ff; border-radius: 8px; padding: 16px; text-align: center; }
    .stat-card .value { font-size: 24px; font-weight: bold; color: #2563eb; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #1e40af; color: white; padding: 10px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
    tr:hover { background: #f9fafb; }
    .credit { color: #16a34a; font-weight: bold; }
    .debit  { color: #dc2626; font-weight: bold; }
    .badge  { padding: 2px 8px; border-radius: 12px; font-size: 12px; }
    .completed { background: #dcfce7; color: #16a34a; }
    .pending   { background: #fef3c7; color: #d97706; }
    .failed    { background: #fee2e2; color: #dc2626; }
  </style>
</head>
<body>
  <h2>💳 Transaction History — Babatunde Adewale</h2>
  <div id="summary"></div>
  <table id="txTable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody id="txBody"></tbody>
  </table>

  <script>
    const transactionsJSON = `[
      {"date":"2024-06-15","desc":"Salary — Andela Nigeria","type":"credit","amount":550000,"status":"completed","balance":1050000},
      {"date":"2024-06-14","desc":"Konga Purchase — Laptop","type":"debit","amount":850000,"status":"completed","balance":500000},
      {"date":"2024-06-13","desc":"Transfer from Chioma","type":"credit","amount":150000,"status":"completed","balance":1350000},
      {"date":"2024-06-12","desc":"EKEDC Electricity Bill","type":"debit","amount":25000,"status":"completed","balance":1200000},
      {"date":"2024-06-11","desc":"Cowrywise Investment","type":"debit","amount":100000,"status":"pending","balance":1225000},
      {"date":"2024-06-10","desc":"ATM Withdrawal","type":"debit","amount":50000,"status":"completed","balance":1325000},
      {"date":"2024-06-09","desc":"Airtime TopUp","type":"debit","amount":5000,"status":"failed","balance":1375000}
    ]`;

    function renderDashboard() {
      const transactions = JSON.parse(transactionsJSON);

      // ─── Compute summary stats ───────────────────────────────────────
      const totalCredit  = transactions
        .filter(t => t.type === "credit" && t.status === "completed")
        .reduce((s, t) => s + t.amount, 0);

      const totalDebit   = transactions
        .filter(t => t.type === "debit" && t.status === "completed")
        .reduce((s, t) => s + t.amount, 0);

      const latestBalance = transactions[0].balance;

      // ─── Render summary cards ────────────────────────────────────────
      document.getElementById("summary").innerHTML = `
        <div class="summary">
          <div class="stat-card">
            <div>Current Balance</div>
            <div class="value">₦${latestBalance.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div>Total Credits</div>
            <div class="value" style="color:#16a34a">₦${totalCredit.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div>Total Debits</div>
            <div class="value" style="color:#dc2626">₦${totalDebit.toLocaleString()}</div>
          </div>
          <div class="stat-card">
            <div>Transactions</div>
            <div class="value">${transactions.length}</div>
          </div>
        </div>
      `;

      // ─── Render table rows ───────────────────────────────────────────
      document.getElementById("txBody").innerHTML = transactions.map(function(t) {
        const sign        = t.type === "credit" ? "+" : "-";
        const amountClass = t.type === "credit" ? "credit" : "debit";

        return `
          <tr>
            <td>${t.date}</td>
            <td>${t.desc}</td>
            <td>${t.type.charAt(0).toUpperCase() + t.type.slice(1)}</td>
            <td class="${amountClass}">${sign}₦${t.amount.toLocaleString()}</td>
            <td><span class="badge ${t.status}">${t.status}</span></td>
            <td>₦${t.balance.toLocaleString()}</td>
          </tr>
        `;
      }).join("");
    }

    renderDashboard();
  </script>
</body>
</html>
```

---

### 11.6 Safety Warning — XSS When Rendering JSON to HTML

```javascript
// ❌ DANGEROUS — if JSON data contains HTML/JavaScript
const badJSON = '{"name":"<script>alert(\'Hacked!\')</script>"}';
const user = JSON.parse(badJSON);
document.getElementById("greeting").innerHTML = "Hello, " + user.name;
// This EXECUTES the script tag — Cross-Site Scripting (XSS) attack!

// ✅ SAFE — use innerText instead of innerHTML for user data
document.getElementById("greeting").innerText = "Hello, " + user.name;
// Output: Hello, <script>alert('Hacked!')</script>  ← rendered as text, not code

// ✅ OR sanitize the string
function sanitize(str) {
  const div = document.createElement("div");
  div.innerText = str;
  return div.innerHTML; // Converts < to &lt;, > to &gt;, etc.
}

document.getElementById("greeting").innerHTML = "Hello, " + sanitize(user.name);
// Safe!
```

---

<a name="chapter-12"></a>
## Chapter 12 — JSONP

### 12.1 The Problem: The Same-Origin Policy

Browsers enforce the **Same-Origin Policy** — a security rule that prevents JavaScript from making AJAX requests to a **different domain** than the page it's running on.

```
Your site: https://mykonga.com.ng
API:       https://api.somebank.com/data

→ BLOCKED by browser! Different domain.
```

This is a security feature — it stops malicious scripts on one site from accessing data on another. But it also blocks legitimate use cases, like fetching public data from a third-party API.

The modern solution is **CORS (Cross-Origin Resource Sharing)** — the server adds special headers to allow cross-origin requests. But before CORS was widely supported, developers used **JSONP** as a workaround.

---

### 12.2 How JSONP Works — The Clever Trick

JSONP exploits the fact that `<script>` tags are **not** restricted by the same-origin policy. You can load a script from any domain. JSONP sends data by wrapping it in a function call:

```
Normal JSON response:           {"name":"Tunde","balance":500000}
JSONP response:                 myCallback({"name":"Tunde","balance":500000})

The browser loads this as a <script>, which executes myCallback() automatically!
```

---

### 12.3 How to Use JSONP — Step by Step

**Step 1:** Define your callback function in JavaScript:
```javascript
function handleBankData(data) {
  console.log("Received bank data via JSONP!");
  console.log("Bank name:", data.name);
  console.log("Branch count:", data.branches);
}
```

**Step 2:** Dynamically create a `<script>` tag pointing to the JSONP endpoint:
```javascript
function loadBankDataJSONP(bankCode) {
  const script = document.createElement("script");

  // The '?callback=' parameter tells the server what function name to wrap the data in
  script.src = "https://api.examplebank.com/info?code=" + bankCode + "&callback=handleBankData";

  // Adding the script to the DOM causes the browser to load it
  document.body.appendChild(script);

  // Optional: remove the script after it's loaded (cleanup)
  script.onload = function() {
    document.body.removeChild(script);
  };
}

// Call it:
loadBankDataJSONP("058");
```

**Step 3:** The server at `api.examplebank.com` returns:
```javascript
// Not regular JSON — it's wrapped in the callback function call:
handleBankData({"name":"GTBank","code":"058","branches":230,"headquarters":"Lagos"})
```

When the browser loads this "script", it calls `handleBankData()` with the data. Your function runs and you have the data!

```
// Complete output:
// Received bank data via JSONP!
// Bank name: GTBank
// Branch count: 230
```

---

### 12.4 Full JSONP Implementation Pattern

```javascript
// Generic JSONP loader — works with any JSONP endpoint
function jsonpRequest(url, callbackName, onSuccess, onError) {
  // Create a unique callback name to avoid conflicts
  const uniqueCallback = callbackName + "_" + Date.now();

  // Create the script element
  const script = document.createElement("script");
  script.src   = url + "&callback=" + uniqueCallback;

  // Set a timeout
  const timeout = setTimeout(function() {
    cleanup();
    if (onError) onError("JSONP request timed out");
  }, 8000);

  // Register the callback on the global window object
  window[uniqueCallback] = function(data) {
    clearTimeout(timeout);
    cleanup();
    onSuccess(data);
  };

  function cleanup() {
    delete window[uniqueCallback];   // Remove from global scope
    if (script.parentNode) {
      document.body.removeChild(script);
    }
  }

  script.onerror = function() {
    clearTimeout(timeout);
    cleanup();
    if (onError) onError("JSONP request failed");
  };

  document.body.appendChild(script);
}

// Usage:
jsonpRequest(
  "https://api.example.com/currency?from=USD&to=NGN",
  "handleRate",
  function(data) {
    console.log("Exchange rate:", data.rate);
    document.getElementById("rate").innerText = "1 USD = ₦" + data.rate;
  },
  function(error) {
    console.error("Failed:", error);
  }
);
```

---

### 12.5 JSONP vs CORS — Modern Perspective

| Feature | JSONP | CORS |
|---------|-------|------|
| **Mechanism** | `<script>` tag trick | HTTP headers from server |
| **Methods** | GET only | GET, POST, PUT, DELETE, etc. |
| **Security** | ⚠️ Trust the server completely | ✅ Browser enforces policies |
| **Error handling** | Difficult | Standard HTTP status codes |
| **Modern support** | Legacy/deprecated | ✅ Standard — preferred |
| **Setup required** | None client-side | Server must send CORS headers |

> **Current best practice:** Do **not** use JSONP for new projects. Use CORS instead. If a third-party API you need doesn't support CORS, proxy the request through your own server:

```javascript
// Instead of direct JSONP to third-party:
// fetch("https://thirdparty.com/api/data") // BLOCKED by CORS!

// Proxy through your own server (which can make server-to-server requests freely):
// fetch("/api/proxy?target=thirdparty&endpoint=data") // ✅ WORKS
```

**JSONP is still covered here because:**
1. You will encounter it in legacy codebases
2. Some older APIs still only support JSONP
3. Understanding it deepens your knowledge of browser security and the same-origin policy

---

<a name="phase-2"></a>
## Phase 2 — Applied Exercises

### Exercise 1 — Warm-Up: Parse and Display

**Objective:** Practice `JSON.parse()` and reading all data types from JSON.

**Scenario:** A Lagos fintech startup gives you the following API response. Parse it and display a formatted summary on the page.

```javascript
const apiResponse = `{
  "status": "success",
  "requestId": "REQ-2024-06-15-001",
  "customer": {
    "id": 42,
    "name": "Babatunde Adewale",
    "tier": "Gold",
    "isVerified": true,
    "joinedDate": "2019-03-15",
    "stats": {
      "totalTransactions": 847,
      "totalVolume": 12500000,
      "averageTransaction": 14758.56
    }
  },
  "accounts": [
    { "type": "savings",     "number": "0123456789", "balance": 500000,  "currency": "NGN" },
    { "type": "current",     "number": "0123456790", "balance": 1200000, "currency": "NGN" },
    { "type": "domiciliary", "number": "0123456791", "balance": 5000,    "currency": "USD" }
  ],
  "lastLogin": "2024-06-15T08:32:00Z"
}`;
```

**Instructions:**
1. Parse the JSON using `JSON.parse()`
2. Display the customer name, tier, and verification status
3. Loop through accounts and display each with its balance (format NGN with `toLocaleString()`, USD with 2 decimal places)
4. Calculate and display the total NGN balance across all NGN accounts
5. Show "last login" formatted as a readable date string

**Hints:**
- Use `filter()` to get only NGN accounts
- Use `reduce()` to sum balances
- `new Date("2024-06-15T08:32:00Z").toLocaleString("en-NG")` formats dates

**Self-check questions:**
- What is the type of `customer.isVerified` after parsing?
- What is the type of `customer.stats.totalVolume` after parsing?
- Why can you call `toLocaleString()` on the balance — what type is it?

---

### Exercise 2 — Intermediate: Build and Stringify

**Objective:** Build JavaScript objects from user input and convert them to JSON strings.

**Scenario:** A mobile money agent in Lagos needs a form to create transfer instructions that will be saved as JSON and sent to the bank's API.

**Instructions:**
1. Create an HTML form with: Sender Name, Sender Account, Recipient Name, Recipient Account, Amount, Purpose (dropdown), Narration
2. When form is submitted (button click), collect all values into a JavaScript object
3. Add these fields automatically: `id` (random 8-digit number), `timestamp` (current ISO date), `currency: "NGN"`, `status: "pending"`
4. Convert the entire object to a JSON string using `JSON.stringify()`
5. Display the resulting JSON in a `<pre>` tag (pretty-printed with 2 spaces)
6. Display the total character count of the JSON string

**What-if challenges:**
- What happens to the `timestamp` field after you do `JSON.parse(JSON.stringify(obj))`? Is it still a Date object?
- Add a `replacer` function that masks the account numbers (show only last 4 digits: `"****6789"`)
- Add validation that ensures `amount` is between ₦1 and ₦5,000,000

**Self-check questions:**
- Why does `JSON.stringify()` convert a `Date` object to a string?
- How would you use `toJSON()` to control what the Date looks like in the output?
- What happens if you put `undefined` as the value of a key?

---

### Exercise 3 — Advanced: Full JSON Pipeline

**Objective:** Build a complete JSON → HTML pipeline: receive simulated API response, transform data, and render to DOM.

**Scenario:** Build a "Top Performers" leaderboard for a Lagos microfinance bank, displaying the top 5 loan repayers of the month.

**Sample API response to work with:**
```json
{
  "month": "June 2024",
  "branch": "Lagos Island",
  "currency": "NGN",
  "performers": [
    {"rank":1,"name":"Chidinma Obi",    "loanType":"Business","repaid":850000,"onTime":true, "streak":12},
    {"rank":2,"name":"Gbenga Adeleke",  "loanType":"Personal","repaid":620000,"onTime":true, "streak":8},
    {"rank":3,"name":"Fatima Al-Hassan","loanType":"Business","repaid":580000,"onTime":false,"streak":5},
    {"rank":4,"name":"Tunde Bakare",    "loanType":"SME",     "repaid":510000,"onTime":true, "streak":15},
    {"rank":5,"name":"Ngozi Eze",       "loanType":"Personal","repaid":445000,"onTime":true, "streak":7}
  ]
}
```

**Instructions:**
1. Parse the JSON
2. Render a styled leaderboard table
3. Add a 🏆 trophy icon for rank 1, 🥈 for rank 2, 🥉 for rank 3
4. Show a ✅ or ❌ for the `onTime` field
5. Highlight the row for the performer with the longest streak
6. Show a summary footer: total amount repaid, percentage of on-time repayers
7. Add a "Export JSON" button that calls `JSON.stringify()` on the data and logs it

**Self-check questions:**
- How did you find the performer with the longest streak?
- Why is it important to use `innerText` (not `innerHTML`) for the `name` fields?
- How would you sort the array if the ranks were not already in order?

---

<a name="phase-3"></a>
## Phase 3 — Project: FinDash — Nigerian Financial Dashboard

### Project Overview

Build **FinDash** — a complete client-side financial dashboard for a fictional Nigerian investment and banking app. The dashboard reads all data from JSON, processes it with JavaScript, and renders a fully interactive HTML interface.

**Technology stack:** Pure HTML, CSS, and JavaScript — no frameworks, no build tools. All data from JSON.

---

### Stage 1 — Setup & Core Data Layer

**Simple illustrative example first:**
```javascript
// This is the data pattern you will scale up:
const accountData = JSON.parse(localStorage.getItem("findash_data") || defaultJSON);
renderDashboard(accountData);
```

**Full Stage 1:**

Create a file `findash.html` with this complete foundation:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FinDash — Personal Finance Dashboard</title>
  <style>
    /* ─── Reset & Base ─────────────────────────────── */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; color: #1a1a2e; }

    /* ─── Header ─────────────────────────────────────── */
    header {
      background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
      color: white;
      padding: 20px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header h1 { font-size: 26px; letter-spacing: 1px; }
    .header-right { text-align: right; font-size: 14px; opacity: 0.85; }

    /* ─── Summary Cards ──────────────────────────────── */
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; padding: 24px 32px 0; }
    .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
    .card .label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
    .card .value { font-size: 26px; font-weight: 700; margin-top: 8px; }
    .card .sub   { font-size: 12px; color: #94a3b8; margin-top: 4px; }
    .card.green  .value { color: #16a34a; }
    .card.red    .value { color: #dc2626; }
    .card.blue   .value { color: #2563eb; }
    .card.amber  .value { color: #d97706; }

    /* ─── Sections ──────────────────────────────────── */
    .main { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; padding: 24px 32px; }
    @media (max-width: 768px) { .main { grid-template-columns: 1fr; } }
    section { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.06); }
    section h2 { font-size: 16px; color: #1e3a5f; margin-bottom: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }

    /* ─── Transactions Table ────────────────────────── */
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th    { background: #f8fafc; color: #64748b; font-size: 12px; text-transform: uppercase; padding: 8px 10px; text-align: left; }
    td    { padding: 10px; border-bottom: 1px solid #f1f5f9; }
    tr:hover td { background: #f8fafc; }
    .credit { color: #16a34a; font-weight: 600; }
    .debit  { color: #dc2626; font-weight: 600; }
    .badge  { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; }
    .completed { background: #dcfce7; color: #16a34a; }
    .pending   { background: #fef3c7; color: #d97706; }
    .failed    { background: #fee2e2; color: #dc2626; }

    /* ─── Portfolio List ─────────────────────────────── */
    .portfolio-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .portfolio-item:last-child { border-bottom: none; }
    .stock-name  { font-weight: 600; }
    .stock-meta  { font-size: 12px; color: #94a3b8; }
    .stock-value { text-align: right; }
    .gain  { color: #16a34a; font-size: 12px; }
    .loss  { color: #dc2626; font-size: 12px; }

    /* ─── JSON Export ────────────────────────────────── */
    .toolbar { padding: 0 32px 24px; display: flex; gap: 10px; flex-wrap: wrap; }
    .btn {
      padding: 8px 18px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }
    .btn-primary { background: #2563eb; color: white; }
    .btn-outline { background: white; color: #2563eb; border: 2px solid #2563eb; }
    .btn:hover   { opacity: 0.85; }
    #jsonOutput  { display: none; margin: 0 32px 24px; background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; font-size: 13px; max-height: 300px; overflow-y: auto; white-space: pre; }
  </style>
</head>
<body>

<!-- ─── HEADER ──────────────────────────────────────────────────────── -->
<header>
  <div>
    <h1>💰 FinDash</h1>
    <div style="font-size:14px;opacity:.7;margin-top:4px;">Personal Finance Dashboard</div>
  </div>
  <div class="header-right" id="headerInfo"></div>
</header>

<!-- ─── TOOLBAR ─────────────────────────────────────────────────────── -->
<div class="toolbar">
  <button class="btn btn-primary" onclick="exportJSON()">📥 Export Data as JSON</button>
  <button class="btn btn-outline" onclick="filterTransactions('all')">All</button>
  <button class="btn btn-outline" onclick="filterTransactions('credit')">Credits Only</button>
  <button class="btn btn-outline" onclick="filterTransactions('debit')">Debits Only</button>
  <button class="btn btn-outline" onclick="sortByAmount()">Sort by Amount</button>
</div>

<!-- ─── SUMMARY CARDS ────────────────────────────────────────────────── -->
<div class="cards" id="summaryCards"></div>

<!-- ─── MAIN CONTENT ─────────────────────────────────────────────────── -->
<div class="main">
  <section>
    <h2>📋 Recent Transactions</h2>
    <table>
      <thead>
        <tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th><th>Balance</th></tr>
      </thead>
      <tbody id="txBody"></tbody>
    </table>
  </section>

  <section>
    <h2>📈 Investment Portfolio</h2>
    <div id="portfolioList"></div>
    <div id="portfolioSummary" style="margin-top:16px;padding-top:16px;border-top:2px solid #e2e8f0;"></div>
  </section>
</div>

<!-- ─── JSON OUTPUT ──────────────────────────────────────────────────── -->
<pre id="jsonOutput"></pre>

<!-- ─── SCRIPT ──────────────────────────────────────────────────────── -->
<script>
// ═══════════════════════════════════════════════════════════════════════
// DATA — In a real app this comes from: fetch("/api/dashboard").then(r => r.json())
// ═══════════════════════════════════════════════════════════════════════
const RAW_JSON = `{
  "user": {
    "name": "Babatunde Adewale",
    "accountNumber": "0123456789",
    "bank": "GTBank",
    "tier": "Gold",
    "lastLogin": "2024-06-15T08:32:00Z"
  },
  "accounts": [
    {"type": "Savings",     "balance": 500000,  "currency": "NGN"},
    {"type": "Current",     "balance": 1200000, "currency": "NGN"},
    {"type": "Domiciliary", "balance": 4500,    "currency": "USD"}
  ],
  "transactions": [
    {"date":"2024-06-15","desc":"Salary — Andela Nigeria",     "type":"credit","amount":550000,"status":"completed","balance":1750000},
    {"date":"2024-06-14","desc":"Konga Purchase — Laptop",     "type":"debit", "amount":850000,"status":"completed","balance":1200000},
    {"date":"2024-06-13","desc":"Transfer from Chioma Okafor", "type":"credit","amount":150000,"status":"completed","balance":2050000},
    {"date":"2024-06-12","desc":"EKEDC Electricity Bill",      "type":"debit", "amount":25000, "status":"completed","balance":1900000},
    {"date":"2024-06-11","desc":"Cowrywise Investment",        "type":"debit", "amount":100000,"status":"pending",  "balance":1925000},
    {"date":"2024-06-10","desc":"MTN Airtime TopUp",           "type":"debit", "amount":5000,  "status":"failed",   "balance":2025000},
    {"date":"2024-06-09","desc":"Freelance Payment — Upwork",  "type":"credit","amount":320000,"status":"completed","balance":2030000},
    {"date":"2024-06-08","desc":"Rent Payment Q3",             "type":"debit", "amount":500000,"status":"completed","balance":1710000}
  ],
  "portfolio": [
    {"ticker":"DANGOTE", "name":"Dangote Cement",   "units":100, "buyPrice":280, "currentPrice":350,  "sector":"Industrial"},
    {"ticker":"GTCO",    "name":"GT Holdings",      "units":500, "buyPrice":28,  "currentPrice":32.5, "sector":"Banking"},
    {"ticker":"ZENITH",  "name":"Zenith Bank",      "units":200, "buyPrice":22,  "currentPrice":28,   "sector":"Banking"},
    {"ticker":"SEPLAT",  "name":"Seplat Energy",    "units":50,  "buyPrice":1200,"currentPrice":1100, "sector":"Oil & Gas"},
    {"ticker":"BUACEMENT","name":"BUA Cement",      "units":150, "buyPrice":95,  "currentPrice":115,  "sector":"Industrial"}
  ]
}`;

// ═══════════════════════════════════════════════════════════════════════
// PARSE — Convert JSON string to JavaScript object
// ═══════════════════════════════════════════════════════════════════════
const dashboard = JSON.parse(RAW_JSON);
let currentTransactions = [...dashboard.transactions]; // Working copy
let sortedDesc = false;

// ═══════════════════════════════════════════════════════════════════════
// RENDER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function renderHeader() {
  const user = dashboard.user;
  const loginDate = new Date(user.lastLogin).toLocaleString("en-NG");
  document.getElementById("headerInfo").innerHTML = `
    <div>${user.name}</div>
    <div>${user.bank} | ${user.tier} Member</div>
    <div>Last login: ${loginDate}</div>
  `;
}

function renderCards() {
  // Total NGN balance
  const ngnBalance = dashboard.accounts
    .filter(a => a.currency === "NGN")
    .reduce((sum, a) => sum + a.balance, 0);

  // USD balance
  const usdBalance = dashboard.accounts.find(a => a.currency === "USD")?.balance ?? 0;

  // Total credits this period
  const totalCredits = dashboard.transactions
    .filter(t => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  // Total debits this period
  const totalDebits = dashboard.transactions
    .filter(t => t.type === "debit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  document.getElementById("summaryCards").innerHTML = `
    <div class="card blue">
      <div class="label">Total NGN Balance</div>
      <div class="value">₦${ngnBalance.toLocaleString()}</div>
      <div class="sub">Across ${dashboard.accounts.filter(a => a.currency === "NGN").length} accounts</div>
    </div>
    <div class="card amber">
      <div class="label">USD Balance</div>
      <div class="value">$${usdBalance.toLocaleString()}</div>
      <div class="sub">Domiciliary Account</div>
    </div>
    <div class="card green">
      <div class="label">Total Credits</div>
      <div class="value">₦${totalCredits.toLocaleString()}</div>
      <div class="sub">Completed this period</div>
    </div>
    <div class="card red">
      <div class="label">Total Debits</div>
      <div class="value">₦${totalDebits.toLocaleString()}</div>
      <div class="sub">Completed this period</div>
    </div>
  `;
}

function renderTransactions(txList) {
  document.getElementById("txBody").innerHTML = txList.map(function(t) {
    const sign = t.type === "credit" ? "+" : "−";
    const cls  = t.type === "credit" ? "credit" : "debit";
    return `
      <tr>
        <td>${t.date}</td>
        <td>${t.desc}</td>
        <td class="${cls}">${sign}₦${t.amount.toLocaleString()}</td>
        <td><span class="badge ${t.status}">${t.status}</span></td>
        <td>₦${t.balance.toLocaleString()}</td>
      </tr>
    `;
  }).join("");
}

function renderPortfolio() {
  const portfolio = dashboard.portfolio;
  let totalCost    = 0;
  let totalCurrent = 0;

  const listHTML = portfolio.map(function(stock) {
    const cost    = stock.units * stock.buyPrice;
    const current = stock.units * stock.currentPrice;
    const gain    = current - cost;
    const pct     = ((gain / cost) * 100).toFixed(2);

    totalCost    += cost;
    totalCurrent += current;

    const gainClass = gain >= 0 ? "gain" : "loss";
    const gainSign  = gain >= 0 ? "▲" : "▼";

    return `
      <div class="portfolio-item">
        <div>
          <div class="stock-name">${stock.ticker} — ${stock.name}</div>
          <div class="stock-meta">${stock.units} units @ ₦${stock.buyPrice} | ${stock.sector}</div>
        </div>
        <div class="stock-value">
          <div>₦${current.toLocaleString()}</div>
          <div class="${gainClass}">${gainSign} ₦${Math.abs(gain).toLocaleString()} (${pct}%)</div>
        </div>
      </div>
    `;
  }).join("");

  const totalGain = totalCurrent - totalCost;
  const totalPct  = ((totalGain / totalCost) * 100).toFixed(2);
  const summaryClass = totalGain >= 0 ? "gain" : "loss";

  document.getElementById("portfolioList").innerHTML = listHTML;
  document.getElementById("portfolioSummary").innerHTML = `
    <div style="display:flex;justify-content:space-between;">
      <strong>Portfolio Total</strong>
      <div>
        <div style="font-size:18px;font-weight:700;">₦${totalCurrent.toLocaleString()}</div>
        <div class="${summaryClass}" style="text-align:right;">
          ${totalGain >= 0 ? "▲" : "▼"} ₦${Math.abs(totalGain).toLocaleString()} (${totalPct}%) total return
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════════
// INTERACTIVE FEATURES
// ═══════════════════════════════════════════════════════════════════════

function filterTransactions(type) {
  if (type === "all") {
    currentTransactions = [...dashboard.transactions];
  } else {
    currentTransactions = dashboard.transactions.filter(t => t.type === type);
  }
  renderTransactions(currentTransactions);
}

function sortByAmount() {
  sortedDesc = !sortedDesc;
  const sorted = [...currentTransactions].sort((a, b) =>
    sortedDesc ? b.amount - a.amount : a.amount - b.amount
  );
  renderTransactions(sorted);
}

function exportJSON() {
  const output = document.getElementById("jsonOutput");

  // Use stringify with a replacer to exclude internal fields, and pretty print
  const exportData = {
    exportedAt: new Date().toISOString(),
    exportedBy: dashboard.user.name,
    data: dashboard
  };

  const jsonText = JSON.stringify(exportData, null, 2);
  output.textContent = jsonText;
  output.style.display = output.style.display === "none" ? "block" : "none";

  console.log("Exported JSON character count:", jsonText.length);
}

// ═══════════════════════════════════════════════════════════════════════
// INITIALISE
// ═══════════════════════════════════════════════════════════════════════
renderHeader();
renderCards();
renderTransactions(currentTransactions);
renderPortfolio();
</script>

</body>
</html>
```

---

### Stage 2 — Adding Features

Now extend your FinDash with:

```javascript
// Feature 1: Save dashboard state to localStorage
function saveToStorage() {
  localStorage.setItem("findash_data", JSON.stringify(dashboard));
  console.log("Data saved to localStorage!");
}

// Feature 2: Load from localStorage on startup
function loadFromStorage() {
  const saved = localStorage.getItem("findash_data");
  return saved ? JSON.parse(saved) : JSON.parse(RAW_JSON);
}

// Feature 3: Add a new transaction (simulate real-time update)
function addTransaction(newTx) {
  dashboard.transactions.unshift(newTx);  // Add to front
  currentTransactions = [...dashboard.transactions];
  renderTransactions(currentTransactions);
  renderCards(); // Update summary totals
  saveToStorage();
}

// Test:
addTransaction({
  date: new Date().toISOString().split("T")[0],
  desc: "Paystack Payment",
  type: "credit",
  amount: 75000,
  status: "completed",
  balance: 1825000
});
```

---

### Stage 3 — Reflection & Deployment

**Reflection Questions:**
1. 🤔 How does `JSON.parse()` and `JSON.stringify()` enable the localStorage save/restore feature? Could you do this with a plain JavaScript object?
2. 🤔 The portfolio data includes `buyPrice` and `currentPrice`. How would you update the `currentPrice` values in real-time using AJAX/fetch to poll a stock market API?
3. 🤔 If `dashboard.transactions` had 10,000 entries, what changes would you make to avoid rendering them all at once?
4. 🤔 The `exportJSON` function exposes all user data. In a real production app, what data should you exclude from exports (using the `replacer` parameter)?
5. 🤔 What would you need to change if the API returned dates as Unix timestamps (e.g., `1718451120`) instead of ISO strings? (Hint: `reviver` function in `JSON.parse()`)

**Optional Advanced Features:**
- Add a chart using `<canvas>` that visualises transaction amounts over time (data from JSON array)
- Add a search box that filters transactions in real-time (search through `desc` field)
- Add a "Compare Periods" feature — load two different JSON datasets and compare totals
- Implement a `toJSON()` method on a custom `Transaction` class
- Add server synchronisation: on every addTransaction, POST the new transaction as JSON to a PHP endpoint

---

<a name="checklist"></a>
## Completion Checklist

| # | Topic | Understood | Practised |
|---|-------|-----------|----------|
| 1 | What JSON is and why it exists | ☐ | ☐ |
| 2 | All 6 JSON syntax rules (quotes, commas, types) | ☐ | ☐ |
| 3 | JSON vs XML — when to use each | ☐ | ☐ |
| 4 | All 6 JSON data types with their parsing behaviour | ☐ | ☐ |
| 5 | `JSON.parse()` — basic use and error handling | ☐ | ☐ |
| 6 | `JSON.parse()` reviver function | ☐ | ☐ |
| 7 | `JSON.stringify()` — basic use | ☐ | ☐ |
| 8 | `JSON.stringify()` replacer (array and function) | ☐ | ☐ |
| 9 | `JSON.stringify()` space parameter for pretty printing | ☐ | ☐ |
| 10 | `toJSON()` for custom serialisation | ☐ | ☐ |
| 11 | Accessing and modifying parsed JSON objects | ☐ | ☐ |
| 12 | Array methods on JSON arrays (map, filter, reduce) | ☐ | ☐ |
| 13 | Sending and receiving JSON with fetch/XHR | ☐ | ☐ |
| 14 | PHP json_encode / json_decode patterns | ☐ | ☐ |
| 15 | Building HTML from JSON (tables, cards, dropdowns) | ☐ | ☐ |
| 16 | XSS safety when rendering JSON to innerHTML | ☐ | ☐ |
| 17 | JSONP — what it is and why CORS replaced it | ☐ | ☐ |
| 18 | Saving and loading JSON with localStorage | ☐ | ☐ |
| 19 | Built FinDash and tested all interactive features | ☐ | ☐ |

---

## 10-Question Self-Assessment Quiz

**1.** What does JSON stand for?
- a) JavaScript Object Notation ✅
- b) Java Standard Object Notation
- c) JavaScript Original Naming
- d) JSON Script Object Notation

**2.** Which of these is valid JSON?
- a) `{name: "Tunde"}`
- b) `{'name': 'Tunde'}`
- c) `{"name": "Tunde"}` ✅
- d) `{"name": 'Tunde'}`

**3.** What does `typeof JSON.parse('42')` return?
- a) `"string"`
- b) `"number"` ✅
- c) `"object"`
- d) `"json"`

**4.** What happens to a JavaScript function when you call `JSON.stringify()` on an object containing it?
- a) It throws an error
- b) The function is converted to its source code string
- c) The key-value pair is silently removed ✅
- d) The function is converted to `null`

**5.** What is the correct way to safely read JSON that might be invalid?
- a) `JSON.parse(text) || {}`
- b) `try { JSON.parse(text) } catch(e) { }` ✅
- c) `JSON.tryParse(text)`
- d) `if (JSON.valid(text)) JSON.parse(text)`

**6.** What does `JSON.stringify({a:1, b:undefined})` produce?
- a) `'{"a":1,"b":undefined}'`
- b) `'{"a":1,"b":null}'`
- c) `'{"a":1}'` ✅
- d) Throws an error

**7.** What is the difference between JSON `null` and JavaScript `undefined`?
- a) They are identical
- b) `null` is a valid JSON value; `undefined` is not ✅
- c) `undefined` is a valid JSON value; `null` is not
- d) Neither is valid in JSON

**8.** Which PHP function converts a PHP array into a JSON string?
- a) `json_decode()`
- b) `json_parse()`
- c) `json_encode()` ✅
- d) `json_stringify()`

**9.** Why is JSONP considered a security risk compared to CORS?
- a) JSONP requires SSL certificates
- b) JSONP executes any JavaScript returned by the server without restriction ✅
- c) JSONP only works with GET requests
- d) JSONP exposes your API keys

**10.** What does the `space` parameter in `JSON.stringify(obj, null, 2)` do?
- a) Limits output to 2 keys
- b) Adds 2-space indentation for readable formatting ✅
- c) Rounds numbers to 2 decimal places
- d) Encodes 2 levels of nesting

**Answer Key:** 1a · 2c · 3b · 4c · 5b · 6c · 7b · 8c · 9b · 10b

---

## Key Gotchas Summary

| ❌ Common Mistake | ✅ Correct Approach |
|-----------------|-------------------|
| Single quotes in JSON: `{'key': 'val'}` | Always double quotes: `{"key": "val"}` |
| Trailing commas: `{"a":1,}` | No trailing commas: `{"a":1}` |
| Unquoted keys: `{name: "Tunde"}` | Quoted keys: `{"name": "Tunde"}` |
| Reading `responseText` as object: `xhr.responseText.name` | Parse first: `JSON.parse(xhr.responseText).name` |
| Forgetting `try-catch` around `JSON.parse()` | Always wrap untrusted JSON parsing in `try-catch` |
| Using `innerHTML` with unsanitized JSON values | Use `innerText` or sanitize before using `innerHTML` |
| Double-parsing an already-parsed object | Parse once, reuse the result |
| Expecting `Date` objects after `JSON.parse()` | Dates become strings — convert with `new Date(value)` in a reviver |
| Using `json_decode()` without `true` in PHP | `json_decode($text, true)` gives array; without `true` gives object |
| Using JSONP for new projects | Use CORS (or a server-side proxy) for cross-origin requests |

---

## Chapter Summary

> **JSON (JavaScript Object Notation)** is a lightweight text format for data exchange — readable by humans and parseable by machines. It supports six data types: strings (double-quoted), numbers, booleans, null, objects (curly braces), and arrays (square brackets). JavaScript uses `JSON.parse()` to convert a JSON string into a live object, and `JSON.stringify()` to convert an object back to a JSON string for storage or transmission. JSON is the universal language of REST APIs — used by virtually every web service from Paystack to Flutterwave, Gmail to Twitter. While JSONP was an early cross-origin workaround, modern applications use CORS. Mastering JSON means mastering the data layer of the entire modern web.

---

*Tutorial authored using the AI Tutorial Generator framework — Phase 1: Comprehension → Phase 2: Practice → Phase 3: Creation.*
