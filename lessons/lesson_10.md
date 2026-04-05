---
title: "JavaScript Objects: JS Objects · Object Intro · Object Properties · Object Methods · Object `this` · Object Display · Object Constructors"
nav_order: 10
---

## 📋 Table of Contents
1. [What Is an Object? The Big Picture](#1-what-is-an-object)
2. [Creating Objects — Object Literals](#2-creating-objects-literals)
3. [Accessing Object Properties](#3-accessing-properties)
4. [Nested Objects and Nested Arrays](#4-nested-objects-and-arrays)
5. [Object Properties — Deep Dive](#5-object-properties-deep-dive)
6. [Adding, Modifying, and Deleting Properties](#6-adding-modifying-deleting)
7. [Object Methods — Functions as Properties](#7-object-methods)
8. [The `this` Keyword — What It Really Means](#8-the-this-keyword)
9. [`this` in Different Contexts — The Full Picture](#9-this-in-different-contexts)
10. [Displaying Objects — All Techniques](#10-displaying-objects)
11. [Looping Through Object Properties](#11-looping-through-properties)
12. [Object Constructors — Blueprints for Objects](#12-object-constructors)
13. [Constructor Best Practices and Conventions](#13-constructor-conventions)
14. [Built-in JavaScript Constructors](#14-built-in-constructors)
15. [Object vs. Primitive — The Fundamental Distinction](#15-object-vs-primitive)
16. [Object Utility Methods — `Object.keys()`, `Object.values()`, `Object.entries()`](#16-object-utility-methods)
17. [Copying and Merging Objects — Spread and `Object.assign()`](#17-copying-and-merging)
18. [Applied Exercises](#18-applied-exercises)
19. [Mini-Project: Library Management System](#19-mini-project)
20. [Completion Checklist](#20-completion-checklist)

---

## 1. What Is an Object? The Big Picture

### The Problem Objects Solve

Imagine you need to store information about a person. Without objects, you'd need separate, disconnected variables:

```javascript
let personName    = "Alice";
let personAge     = 30;
let personCity    = "Lagos";
let personJob     = "Engineer";
let personSalary  = 150000;
```

This is messy. If you have 100 people, you'd have 500 variables — all with no clear connection to each other. What if you need to pass "Alice" to a function? You'd have to pass 5 separate variables every time.

**With an object**, all of Alice's data lives together in one neat container:

```javascript
let person = {
  name:   "Alice",
  age:    30,
  city:   "Lagos",
  job:    "Engineer",
  salary: 150000
};
```

Now everything about Alice travels together, is organized, and is easy to access.

### What Is an Object?

A JavaScript **object** is a collection of **named values** called **properties**. Each property has a **key** (name) and a **value**. Together, a key-value pair is called a **property**.

Think of an object like a **form** or a **profile card**:

```
┌─────────────────────────────┐
│        PROFILE CARD         │
├──────────────┬──────────────┤
│ name         │ "Alice"      │  ← property (key: value)
│ age          │ 30           │  ← property
│ city         │ "Lagos"      │  ← property
│ job          │ "Engineer"   │  ← property
└──────────────┴──────────────┘
```

### Why Objects Are Central to Everything

Objects are the most important concept in JavaScript. Almost everything in JavaScript is either an object or behaves like one:

- **Strings** have properties and methods: `"Hello".length`, `"Hello".toUpperCase()`
- **Arrays** are objects: `[1,2,3].push(4)`
- **Functions** are objects: `myFunc.name`, `myFunc.length`
- **The browser window** is an object: `window.alert()`, `window.location`
- **HTML elements** are objects: `document.getElementById("btn").innerHTML`
- **Dates** are objects: `new Date().getFullYear()`
- **JSON data** from APIs is made of objects

In real jobs — web development, backend APIs, mobile apps, data science — you will work with objects every single day. They are the primary way to model real-world entities in code.

### Real-World Analogies

| Real World | JavaScript Object |
|-----------|-------------------|
| A student's record file | `{ name: "Kemi", grade: "A", score: 95 }` |
| A product on a shelf | `{ name: "Laptop", price: 250000, stock: 15 }` |
| A car | `{ brand: "Toyota", model: "Camry", year: 2022, color: "Black" }` |
| A bank account | `{ owner: "Emeka", balance: 500000, type: "Savings" }` |

---

## 2. Creating Objects — Object Literals

### The Object Literal — The Most Common Way

An **object literal** is the simplest and most direct way to create an object. You write the object directly in your code between curly braces `{ }`, with properties separated by commas:

```javascript
let person = {
  firstName: "John",
  lastName:  "Doe",
  age:       50,
  eyeColor:  "blue"
};
```

**Syntax breakdown:**

```
let person = {
  key1: value1,    ← property (note the colon :)
  key2: value2,    ← another property (separated by comma)
  key3: value3     ← last property (NO comma at the end)
};                 ← closing brace + semicolon
```

| Part | What It Is |
|------|-----------|
| `firstName` | The **key** (also called property name) |
| `"John"` | The **value** (can be any data type) |
| `:` | Separator between key and value |
| `,` | Separator between properties |
| `{ }` | The object container |

### Values Can Be ANY Data Type

Object property values are not limited to strings and numbers. They can hold any JavaScript data type:

```javascript
let student = {
  name:      "Adaeze",                    // string
  age:       20,                          // number
  isActive:  true,                        // boolean
  scores:    [85, 92, 78, 90],            // array
  address:   { city: "Abuja", zip: "900" }, // nested object
  greet:     function() {                 // function (called a "method")
    return "Hello, I am " + this.name;
  },
  birthDate: null                         // null (no value yet)
};
```

### Spaces and Line Breaks Are Ignored

You can write an object on one line or multiple lines — JavaScript doesn't care. Long objects are usually written across multiple lines for readability:

```javascript
// One line (for short objects):
let color = { red: 255, green: 128, blue: 0 };

// Multiple lines (for longer objects — preferred):
let product = {
  name:        "Wireless Headphones",
  brand:       "Sony",
  price:       45000,
  inStock:     true,
  rating:      4.5,
  reviews:     128
};
```

> 🤔 **Thinking question:** You have data about a car: brand is "Toyota", model is "Camry", year is 2023, and it has 4 doors. How would you write this as an object?

---

## 3. Accessing Object Properties

### Two Ways to Access Properties

Once you have an object, you can read its properties in two ways:

**Method 1 — Dot Notation (most common):**
```javascript
objectName.propertyName
```

**Method 2 — Bracket Notation:**
```javascript
objectName["propertyName"]
```

### Dot Notation — Clean and Readable

```javascript
let person = {
  firstName: "John",
  lastName:  "Doe",
  age:       50,
  eyeColor:  "blue"
};

console.log(person.firstName);  // "John"
console.log(person.age);        // 50
console.log(person.eyeColor);   // "blue"
```

**Step-by-step for `person.firstName`:**
1. Start with the object: `person`
2. Use `.` to access a property
3. Write the property name: `firstName`
4. JavaScript looks inside `person`, finds `firstName`, and returns `"John"`

### Bracket Notation — Flexible and Dynamic

```javascript
console.log(person["firstName"]);  // "John"
console.log(person["age"]);        // 50
```

**When to prefer bracket notation:**

1. **Property names with spaces or special characters:**
```javascript
let data = {
  "full name": "Alice Okafor",   // key has a space — only bracket notation works!
  "phone-number": "080-1234567", // key has a hyphen
  "2024score": 95                // key starts with a number
};

console.log(data["full name"]);     // "Alice Okafor"
console.log(data["phone-number"]);  // "080-1234567"
// data.full name   ← ❌ Syntax error
// data.2024score   ← ❌ Syntax error
```

2. **Dynamic property access using variables:**
```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

let key = "age";             // key stored in a variable
console.log(person[key]);   // 30  ← reads the value of 'key' first

// This is powerful when you don't know the property name ahead of time:
function getProperty(obj, propertyName) {
  return obj[propertyName];  // dynamic access
}
console.log(getProperty(person, "name"));  // "Alice"
console.log(getProperty(person, "city"));  // "Lagos"
```

> ⚠️ **Common Beginner Mistake:** Using `person["age"]` vs. `person[age]`. The first reads the string key `"age"`. The second reads whatever value is stored in the VARIABLE named `age`. These are completely different!

```javascript
let age = "name";                 // variable holds "name"
console.log(person["age"]);      // 30    (reads key literally: "age")
console.log(person[age]);        // "Alice" (reads value of variable: "name" → person["name"])
```

---

## 4. Nested Objects and Nested Arrays

### Nested Objects

An object property can itself be another object. You access nested properties by chaining dots or brackets:

```javascript
let person = {
  name: "Alice",
  address: {
    street: "12 Broad Street",
    city:   "Lagos",
    state:  "Lagos State",
    zip:    "100001"
  }
};

// Access nested property:
console.log(person.address.city);          // "Lagos"
console.log(person.address.street);        // "12 Broad Street"
console.log(person["address"]["state"]);   // "Lagos State"  (bracket notation)
```

**Step-by-step for `person.address.city`:**
1. `person` — access the person object
2. `.address` — access the `address` property (which is also an object)
3. `.city` — access the `city` property of that nested object
4. Returns `"Lagos"`

### Objects Inside Arrays Inside Objects

Real-world data structures are often deeply nested:

```javascript
let company = {
  name:      "TechCorp Nigeria",
  founded:   2015,
  employees: [
    { name: "Alice", role: "CEO",     salary: 800000 },
    { name: "Bob",   role: "CTO",     salary: 700000 },
    { name: "Chioma", role: "Engineer", salary: 400000 }
  ]
};

// Access first employee's name:
console.log(company.employees[0].name);   // "Alice"
// Access second employee's role:
console.log(company.employees[1].role);   // "CTO"
// Access third employee's salary:
console.log(company.employees[2].salary); // 400000

// Loop through all employees:
company.employees.forEach(emp => {
  console.log(`${emp.name} — ${emp.role}`);
});
// Output:
// Alice — CEO
// Bob — CTO
// Chioma — Engineer
```

---

## 5. Object Properties — Deep Dive

### What Is a Property?

A **property** is a key-value pair inside an object. The key is always a string (or Symbol), and the value can be anything.

```javascript
let car = {
  brand: "Toyota",    // property: key="brand", value="Toyota"
  model: "Camry",     // property: key="model", value="Camry"
  year:  2022         // property: key="year",  value=2022
};
```

### Property Names (Keys)

Property names can be written with or without quotes:

```javascript
// Without quotes (most common — works for simple names):
let obj = { name: "Alice", age: 30 };

// With quotes (required for special characters or reserved words):
let obj2 = {
  "first name": "Alice",    // space in key — MUST use quotes
  "class":      "A",        // 'class' is a reserved word — safer with quotes
  "2024":       "year"      // starts with a number — must use quotes
};
```

> ✅ **Best practice:** Use simple names without quotes whenever possible. Reserve quotes for keys that have spaces, start with numbers, or use reserved JavaScript words.

### Property Shorthand (ES6)

When the variable name matches the property key, you can use shorthand:

```javascript
let name = "Alice";
let age  = 30;
let city = "Lagos";

// Long way:
let person = { name: name, age: age, city: city };

// Shorthand (ES6) — when variable name === property name:
let person = { name, age, city };

console.log(person);  // { name: "Alice", age: 30, city: "Lagos" }
```

### Computed Property Names (ES6)

You can use expressions as property names by wrapping them in `[ ]`:

```javascript
let prefix = "user";
let id = 42;

let profile = {
  [prefix + "_id"]: id,          // key becomes "user_id"
  [`${prefix}_active`]: true     // key becomes "user_active"
};

console.log(profile);  // { user_id: 42, user_active: true }
```

---

## 6. Adding, Modifying, and Deleting Properties

### Adding New Properties

You can add properties to an existing object at any time — just assign a value to a new key:

```javascript
let person = { name: "Alice", age: 30 };

// Adding new properties:
person.city    = "Lagos";
person.country = "Nigeria";
person["job"]  = "Engineer";

console.log(person);
// { name: "Alice", age: 30, city: "Lagos", country: "Nigeria", job: "Engineer" }
```

### Modifying Existing Properties

Assign a new value to an existing key:

```javascript
let person = { name: "Alice", age: 30, city: "Abuja" };

// Change city:
person.city = "Lagos";
person["age"] = 31;

console.log(person.city);  // "Lagos"   (was "Abuja")
console.log(person.age);   // 31        (was 30)
```

### Deleting Properties — `delete` Operator

The `delete` keyword removes a property from an object completely:

```javascript
let person = {
  name:     "Alice",
  age:      30,
  password: "secret123",  // sensitive data we want to remove
  city:     "Lagos"
};

delete person.password;   // removes the 'password' property

console.log(person);
// { name: "Alice", age: 30, city: "Lagos" }   — password is gone!

console.log(person.password);  // undefined   (property no longer exists)
```

> ⚠️ **Important:** `delete` only works on object properties — NOT on regular variables declared with `let`, `const`, or `var`.

```javascript
let x = 10;
delete x;           // has no effect
console.log(x);     // 10  (still exists)
```

### Checking If a Property Exists — `in` Operator

```javascript
let person = { name: "Alice", age: 30 };

console.log("name" in person);     // true
console.log("salary" in person);   // false
console.log("age" in person);      // true

// Useful in condition checks:
if ("salary" in person) {
  console.log(`Salary: ${person.salary}`);
} else {
  console.log("No salary information available.");
}
// Output: No salary information available.
```

### Optional Chaining `?.` — Safe Property Access

When accessing deeply nested properties, a missing intermediate property causes an error. Optional chaining prevents this:

```javascript
let person = {
  name: "Alice",
  address: {
    city: "Lagos"
  }
};

// ❌ This throws an error if 'address' doesn't exist:
// console.log(person.contact.phone);  // TypeError: Cannot read property 'phone' of undefined

// ✅ Optional chaining — returns undefined instead of crashing:
console.log(person.address?.city);      // "Lagos"
console.log(person.contact?.phone);     // undefined  (no error!)
console.log(person.job?.title);         // undefined  (no error!)
```

---

## 7. Object Methods — Functions as Properties

### What Is a Method?

A **method** is simply a function that belongs to an object. When a function is stored as an object property, it's called a method.

Think of it like this: an object's properties describe WHAT it is, and its methods describe WHAT IT CAN DO.

```
Object Properties (WHAT it is):
  name: "Toyota"
  model: "Camry"
  year: 2022

Object Methods (WHAT IT CAN DO):
  start()     ← starts the engine
  accelerate() ← speeds up
  stop()      ← stops the car
```

### Defining Methods

```javascript
let person = {
  firstName: "John",
  lastName:  "Doe",
  age:       50,
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
};

// Calling a method — like calling a function, but with dot notation:
console.log(person.fullName());   // "John Doe"
```

**Syntax difference:**
- Property access: `person.firstName` — no parentheses
- Method call: `person.fullName()` — WITH parentheses (it's a function call!)

> ⚠️ **Common Beginner Mistake:** Forgetting `()` when calling a method:
```javascript
console.log(person.fullName);   // Returns the function definition itself (not the result!)
console.log(person.fullName()); // Returns "John Doe" ✅
```

### ES6 Method Shorthand

ES6 introduced a cleaner syntax for defining methods — you can omit the `function` keyword:

```javascript
// Old way:
let calculator = {
  add: function(a, b) { return a + b; },
  subtract: function(a, b) { return a - b; }
};

// ES6 shorthand (preferred):
let calculator = {
  add(a, b)      { return a + b; },
  subtract(a, b) { return a - b; },
  multiply(a, b) { return a * b; }
};

console.log(calculator.add(5, 3));       // 8
console.log(calculator.subtract(10, 4)); // 6
console.log(calculator.multiply(3, 7));  // 21
```

### Methods Using `this` to Access Own Properties

Methods use `this` to access other properties of the same object:

```javascript
let bankAccount = {
  owner:    "Emeka",
  balance:  250000,
  currency: "NGN",

  deposit(amount) {
    this.balance += amount;
    return `Deposited ${amount}. New balance: ${this.balance} ${this.currency}`;
  },

  withdraw(amount) {
    if (amount > this.balance) {
      return "Insufficient funds!";
    }
    this.balance -= amount;
    return `Withdrew ${amount}. New balance: ${this.balance} ${this.currency}`;
  },

  getStatement() {
    return `Account Owner: ${this.owner} | Balance: ${this.currency} ${this.balance.toLocaleString()}`;
  }
};

console.log(bankAccount.getStatement());
// Output: Account Owner: Emeka | Balance: NGN 250,000

console.log(bankAccount.deposit(50000));
// Output: Deposited 50000. New balance: 300000 NGN

console.log(bankAccount.withdraw(400000));
// Output: Insufficient funds!

console.log(bankAccount.withdraw(100000));
// Output: Withdrew 100000. New balance: 200000 NGN
```

### Adding Methods After Object Creation

Just like regular properties, methods can be added after an object is created:

```javascript
let person = { name: "Alice", age: 30 };

// Add a method later:
person.greet = function() {
  return `Hello! My name is ${this.name} and I am ${this.age} years old.`;
};

console.log(person.greet());
// Output: Hello! My name is Alice and I am 30 years old.
```

---

## 8. The `this` Keyword — What It Really Means

### What Is `this`?

`this` is a special keyword in JavaScript that refers to **the object that is currently executing the code**. It's like saying "me" or "my own" — it lets an object refer to itself.

Think of it like a name tag at a conference:
- When Alice is speaking, "my presentation" means ALICE's presentation.
- When Bob is speaking, "my presentation" means BOB's presentation.
- `this` works the same way — it refers to whichever object is currently "speaking" (executing the code).

### `this` in an Object Method

In a method, `this` refers to the object the method belongs to:

```javascript
let person = {
  firstName: "John",
  lastName:  "Doe",
  id:        5566,

  fullName() {
    return this.firstName + " " + this.lastName;
    //     ↑ this = the person object
  }
};

console.log(person.fullName());  // "John Doe"
```

**Why use `this` instead of `person`?**

You might think: "Why not just write `person.firstName` inside the method?" The answer is: if you rename the variable or copy the object, `this` still works — but the hard-coded name breaks.

```javascript
// ❌ Hard-coded object name inside method:
let person = {
  name: "Alice",
  greet() { return "Hello, I am " + person.name; }  // tightly coupled to 'person'
};
let copy = person;
person = null;      // original reference destroyed
copy.greet();       // ❌ Error! "person" is now null

// ✅ Using 'this' — safe and flexible:
let person = {
  name: "Alice",
  greet() { return "Hello, I am " + this.name; }  // 'this' always points to the right object
};
let copy = person;
person = null;
copy.greet();       // ✅ "Hello, I am Alice"
```

### `this` Used Alone (Global Context)

When `this` is used outside of any object or function (at the top level of your code), it refers to the **global object**:

```javascript
// In a browser:
console.log(this);         // Window object (the global browser window)
console.log(this === window); // true
```

### `this` in a Regular Function (Not a Method)

Inside a standalone function:
- In **non-strict mode**: `this` is the global object (`window` in browser)
- In **strict mode** (`"use strict"`): `this` is `undefined`

```javascript
function showThis() {
  console.log(this);
}

showThis();             // Window (in browser, non-strict)

"use strict";
function showStrict() {
  console.log(this);
}
showStrict();           // undefined (strict mode)
```

### `this` in Event Handlers (HTML)

When a function is used as a DOM event handler, `this` refers to the HTML element that received the event:

```html
<button onclick="this.style.color = 'red'">Click Me!</button>
<!-- 'this' = the button element -->
```

---

## 9. `this` in Different Contexts — The Full Picture

### Summary Table — `this` Reference by Context

| Context | What `this` Refers To |
|---------|----------------------|
| Alone (top level) | Global object (`window` in browser) |
| Inside regular function | Global object (or `undefined` in strict mode) |
| Inside object method | The object that owns the method |
| Inside constructor (`new`) | The newly created object |
| Inside arrow function | Inherited from enclosing scope (lexical) |
| Inside event handler | The HTML element that triggered the event |
| With `call()` / `apply()` | Explicitly set to whatever you pass |
| With `bind()` | Permanently bound to whatever you pass |

### `this` in Methods — Demonstrated

```javascript
let car = {
  brand: "Toyota",
  model: "Camry",
  year:  2022,

  describe() {
    // 'this' = car object
    return `${this.year} ${this.brand} ${this.model}`;
  },

  age() {
    return 2025 - this.year;
  }
};

console.log(car.describe());  // "2022 Toyota Camry"
console.log(car.age());       // 3
```

### The `this` Trap — Losing Context in Callbacks

One of the trickiest parts of `this` is that it can change when a method is called in a different context:

```javascript
let person = {
  name: "Alice",
  friends: ["Bob", "Charlie"],

  // ❌ Problem — 'this' inside forEach callback is NOT the person object:
  listFriends() {
    this.friends.forEach(function(friend) {
      console.log(this.name + " knows " + friend);  // 'this' is undefined here!
    });
  },

  // ✅ Solution 1 — arrow function (inherits 'this' from listFriends):
  listFriendsFixed() {
    this.friends.forEach(friend => {
      console.log(this.name + " knows " + friend);  // 'this' = person ✅
    });
  }
};

person.listFriendsFixed();
// Output:
// Alice knows Bob
// Alice knows Charlie
```

### Explicit Binding — `call()`, `apply()`, `bind()`

You can manually control what `this` refers to:

```javascript
function introduce() {
  return `Hi! I'm ${this.name} from ${this.city}.`;
}

let person1 = { name: "Alice", city: "Lagos" };
let person2 = { name: "Bob",   city: "Accra" };

// call() — call immediately, pass 'this' explicitly:
console.log(introduce.call(person1));   // "Hi! I'm Alice from Lagos."
console.log(introduce.call(person2));   // "Hi! I'm Bob from Accra."

// apply() — same as call, but args as array:
function greetWith(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}
console.log(greetWith.apply(person1, ["Hello", "!"]));  // "Hello, I'm Alice!"

// bind() — returns a new function with 'this' permanently set:
let aliceIntro = introduce.bind(person1);
console.log(aliceIntro());  // "Hi! I'm Alice from Lagos."
```

---

## 10. Displaying Objects — All Techniques

### Why You Can't Just `console.log()` an Object as Text

Objects cannot be directly displayed as strings using simple concatenation:

```javascript
let person = { name: "Alice", age: 30 };
console.log("The person is: " + person);
// Output: "The person is: [object Object]"  ← NOT useful!
```

JavaScript converts the object to the string `"[object Object]"` — which tells you it's an object, but nothing useful about its contents.

### Technique 1 — `console.log()` (For Debugging)

The best tool for inspecting objects during development:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };
console.log(person);
// Output: { name: "Alice", age: 30, city: "Lagos" }

// Or use console.table() for a clean tabular view:
console.table(person);
// Output: displays as a table with "Key" and "Value" columns
```

### Technique 2 — `JSON.stringify()` (Object to String)

`JSON.stringify()` converts an object to a **JSON string** — the most reliable way to display the full contents of an object as text:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

console.log(JSON.stringify(person));
// Output: '{"name":"Alice","age":30,"city":"Lagos"}'

// With formatting (2-space indentation for readable output):
console.log(JSON.stringify(person, null, 2));
// Output:
// {
//   "name": "Alice",
//   "age": 30,
//   "city": "Lagos"
// }
```

> ⚠️ **Note:** `JSON.stringify()` cannot stringify functions or `undefined` values — these are skipped:
```javascript
let obj = { name: "Alice", greet: function() {} };
console.log(JSON.stringify(obj));
// Output: '{"name":"Alice"}'   ← method is omitted
```

### Technique 3 — Accessing Individual Properties

Display specific properties directly:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

// Specific properties:
document.getElementById("name").innerHTML = person.name;
document.getElementById("age").innerHTML  = person.age;

// In console:
console.log(`Name: ${person.name}, Age: ${person.age}, City: ${person.city}`);
// Output: Name: Alice, Age: 30, City: Lagos
```

### Technique 4 — `for...in` Loop (Display All Properties)

Loop through all properties and display them:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos", job: "Engineer" };

let output = "";
for (let key in person) {
  output += `${key}: ${person[key]}\n`;
}
console.log(output);
// Output:
// name: Alice
// age: 30
// city: Lagos
// job: Engineer
```

### Technique 5 — `Object.keys()`, `Object.values()`, `Object.entries()`

Modern methods for extracting object data as arrays:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

console.log(Object.keys(person));
// ["name", "age", "city"]

console.log(Object.values(person));
// ["Alice", 30, "Lagos"]

console.log(Object.entries(person));
// [["name", "Alice"], ["age", 30], ["city", "Lagos"]]

// Display all entries using Object.entries():
Object.entries(person).forEach(([key, value]) => {
  console.log(`${key} → ${value}`);
});
// Output:
// name → Alice
// age → 30
// city → Lagos
```

---

## 11. Looping Through Object Properties

### `for...in` — The Classic Object Loop

The `for...in` loop iterates over all **enumerable** (regular, non-hidden) properties of an object:

```javascript
let car = {
  brand: "Toyota",
  model: "Camry",
  year:  2022,
  color: "Black"
};

for (let key in car) {
  console.log(key + ": " + car[key]);
}
// Output:
// brand: Toyota
// model: Camry
// year: 2022
// color: Black
```

**Step-by-step for `for (let key in car)`:**
1. `key` takes the value of the first property name: `"brand"`
2. `car[key]` → `car["brand"]` → `"Toyota"`
3. Prints `"brand: Toyota"`
4. `key` moves to `"model"`, prints `"model: Camry"`
5. Continues for each property

> ⚠️ **Warning:** `for...in` also loops through inherited properties. To be safe, use `.hasOwnProperty()` to check if a property belongs directly to the object:

```javascript
for (let key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(key + ": " + car[key]);
  }
}
```

### Looping Through Nested Objects

```javascript
let company = {
  name: "TechCorp",
  address: { city: "Lagos", state: "Lagos State" },
  staff: 150
};

for (let key in company) {
  if (typeof company[key] === "object" && company[key] !== null) {
    console.log(`${key}:`);
    for (let subKey in company[key]) {
      console.log(`  ${subKey}: ${company[key][subKey]}`);
    }
  } else {
    console.log(`${key}: ${company[key]}`);
  }
}
// Output:
// name: TechCorp
// address:
//   city: Lagos
//   state: Lagos State
// staff: 150
```

### Real-World Use — Building HTML from an Object

```javascript
let product = {
  name:    "Wireless Headphones",
  brand:   "Sony",
  price:   45000,
  rating:  4.5,
  inStock: true
};

let html = "<ul>";
for (let key in product) {
  html += `<li><strong>${key}:</strong> ${product[key]}</li>`;
}
html += "</ul>";
// Results in a proper HTML list of all product details
```

---

## 12. Object Constructors — Blueprints for Objects

### The Problem Constructor Functions Solve

What if you need to create 100 similar objects — like 100 student profiles? Creating each one manually with a literal would be tedious and error-prone:

```javascript
// 😩 Tedious — doing this 100 times:
let student1 = { name: "Alice", grade: "A", score: 92, passed: true };
let student2 = { name: "Bob",   grade: "C", score: 68, passed: true };
let student3 = { name: "Chioma", grade: "F", score: 35, passed: false };
// ... × 97 more times
```

**Constructor functions** solve this by providing a **blueprint** (template) for creating objects of the same structure:

### Writing a Constructor Function

A constructor function is a regular function with two special characteristics:
1. Its name starts with a **Capital Letter** (convention)
2. It is called with the **`new`** keyword

```javascript
function Person(firstName, lastName, age, eyeColor) {
  this.firstName = firstName;
  this.lastName  = lastName;
  this.age       = age;
  this.eyeColor  = eyeColor;
}
```

**Syntax breakdown:**

```javascript
function Person(firstName, lastName) {
//       ↑ Capital letter = it's a constructor

  this.firstName = firstName;
  // ↑ 'this' = the new object being created
  // 'this.firstName' = sets a property on the new object
  // '= firstName' = uses the value passed in as argument
}
```

### Using `new` to Create Objects (Instances)

Call the constructor with `new` to create each object (called an **instance**):

```javascript
let person1 = new Person("John", "Doe",    50, "blue");
let person2 = new Person("Sally", "Rally", 48, "green");
let person3 = new Person("Emeka", "Obi",   25, "brown");

console.log(person1.firstName);  // "John"
console.log(person2.age);        // 48
console.log(person3.eyeColor);   // "brown"
```

**What `new` does behind the scenes:**
1. Creates a new empty object `{}`
2. Sets `this` to point to that new object
3. Runs the constructor function (fills in the properties)
4. Returns the new object automatically

**Step-by-step for `new Person("John", "Doe", 50, "blue")`:**
```
1. new creates: {}
2. this = {}
3. this.firstName = "John"  → { firstName: "John" }
4. this.lastName  = "Doe"   → { firstName: "John", lastName: "Doe" }
5. this.age       = 50      → { ..., age: 50 }
6. this.eyeColor  = "blue"  → { ..., eyeColor: "blue" }
7. Returns the filled object → person1
```

### Adding Methods to a Constructor

Methods can be added inside the constructor the same way properties are:

```javascript
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName  = lastName;
  this.age       = age;

  // Method defined inside constructor:
  this.fullName = function() {
    return this.firstName + " " + this.lastName;
  };

  this.isAdult = function() {
    return this.age >= 18;
  };
}

let person1 = new Person("John", "Doe", 50);
let person2 = new Person("Mary", "Smith", 15);

console.log(person1.fullName());  // "John Doe"
console.log(person1.isAdult());   // true
console.log(person2.isAdult());   // false
```

### Adding Properties to a Specific Instance

You can add unique properties to one specific object after creation — this only affects THAT instance, not all objects made by the constructor:

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName  = lastName;
}

let alice = new Person("Alice", "Okafor");
let bob   = new Person("Bob",   "Mensah");

// Add property only to alice:
alice.nationality = "Nigerian";

console.log(alice.nationality);  // "Nigerian"
console.log(bob.nationality);    // undefined  (bob doesn't have this)
```

### A Complete Constructor Example

```javascript
function BankAccount(owner, initialBalance, accountType = "Savings") {
  this.owner       = owner;
  this.balance     = initialBalance;
  this.accountType = accountType;
  this.transactions = [];

  this.deposit = function(amount) {
    if (amount <= 0) return "Amount must be positive";
    this.balance += amount;
    this.transactions.push({ type: "deposit", amount, date: new Date().toLocaleDateString() });
    return `Deposited ₦${amount.toLocaleString()}. Balance: ₦${this.balance.toLocaleString()}`;
  };

  this.withdraw = function(amount) {
    if (amount > this.balance) return "Insufficient funds";
    this.balance -= amount;
    this.transactions.push({ type: "withdrawal", amount, date: new Date().toLocaleDateString() });
    return `Withdrew ₦${amount.toLocaleString()}. Balance: ₦${this.balance.toLocaleString()}`;
  };

  this.getStatement = function() {
    return `${this.owner}'s ${this.accountType} Account | Balance: ₦${this.balance.toLocaleString()}`;
  };
}

let account1 = new BankAccount("Emeka Obi", 100000);
let account2 = new BankAccount("Amara Nwosu", 50000, "Current");

console.log(account1.getStatement());   // Emeka Obi's Savings Account | Balance: ₦100,000
console.log(account1.deposit(25000));   // Deposited ₦25,000. Balance: ₦125,000
console.log(account1.withdraw(200000)); // Insufficient funds
console.log(account2.getStatement());   // Amara Nwosu's Current Account | Balance: ₦50,000
```

---

## 13. Constructor Best Practices and Conventions

### Convention 1 — Capital First Letter

Constructor functions always start with a capital letter to signal: "this is a constructor, use `new` with it."

```javascript
// ✅ Constructor:
function Car(brand, model) { ... }

// ✅ Regular function:
function calculateTax(price) { ... }
```

### Convention 2 — Always Use `new`

Calling a constructor WITHOUT `new` is a silent disaster — `this` becomes the global object:

```javascript
function Person(name) {
  this.name = name;
}

let p1 = new Person("Alice");  // ✅ Correct — creates a Person object
let p2 = Person("Bob");        // ❌ Wrong — no 'new', runs as regular function
                                //    'this' = window, sets window.name = "Bob"!

console.log(p1.name);   // "Alice"
console.log(p2);        // undefined (function returns nothing)
```

### Convention 3 — Use `instanceof` to Check the Type

```javascript
function Car(brand) {
  this.brand = brand;
}

let myCar = new Car("Toyota");
console.log(myCar instanceof Car);     // true
console.log(myCar instanceof Object);  // true (all objects are instances of Object)

let myStr = "Hello";
console.log(myStr instanceof Car);     // false
```

### Convention 4 — Prototype for Shared Methods (Advanced Preview)

When you define methods inside the constructor, every new instance gets its own COPY of that method — this uses extra memory. The more efficient approach is to put shared methods on the **prototype**:

```javascript
function Person(name, age) {
  this.name = name;  // own property (unique per instance)
  this.age  = age;
}

// Method on prototype — shared by ALL instances (memory efficient):
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}!`;
};

let p1 = new Person("Alice", 30);
let p2 = new Person("Bob", 25);

console.log(p1.greet());  // "Hi, I'm Alice!"
console.log(p2.greet());  // "Hi, I'm Bob!"

// Both p1 and p2 SHARE the same greet function in memory:
console.log(p1.greet === p2.greet);  // true (same function reference!)
```

---

## 14. Built-in JavaScript Constructors

JavaScript comes with many built-in constructors that create objects of specific types. You already use them!

```javascript
// These are all constructors:
let str   = new String("Hello");      // String object
let num   = new Number(42);           // Number object
let bool  = new Boolean(true);        // Boolean object
let arr   = new Array(1, 2, 3);       // Array object
let obj   = new Object({ a: 1 });     // Object object
let date  = new Date();               // Date object
let regex = new RegExp("\\d+");       // RegExp object
let func  = new Function("return 1"); // Function object
let map   = new Map();                // Map object
let set   = new Set();                // Set object
```

> ⚠️ **Important:** For primitive types (String, Number, Boolean), you should almost NEVER use the `new` constructor form — use literals instead. The constructors create OBJECTS, not primitives, which causes comparison issues:

```javascript
// ❌ Object form — causes problems:
let s1 = new String("Hello");
let s2 = new String("Hello");
console.log(s1 === s2);   // false  (two different objects!)
console.log(typeof s1);   // "object"

// ✅ Literal form — always preferred:
let s3 = "Hello";
let s4 = "Hello";
console.log(s3 === s4);   // true
console.log(typeof s3);   // "string"
```

**Exceptions — These constructors ARE useful:**

```javascript
// ✅ Date — no literal form, must use constructor:
let today = new Date();
let birthday = new Date("1999-05-15");

// ✅ Map and Set — use constructors:
let myMap = new Map();
let mySet = new Set([1, 2, 3, 3]);  // duplicates removed

// ✅ RegExp — for dynamic patterns:
let pattern = new RegExp("hello", "i");
```

---

## 15. Object vs. Primitive — The Fundamental Distinction

### What Is a Primitive?

A **primitive** is a simple, single value — not an object. JavaScript has 7 primitive types: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`.

**Primitives are immutable** — when you "change" a primitive, you actually create a NEW value:

```javascript
let name = "Alice";
name = "Bob";   // not changing "Alice" — creating a new string "Bob" and reassigning 'name'
```

### Objects Are Mutable References

Objects live in memory at a specific address. When you assign an object to a variable, you're storing the **memory address** (reference), not the object itself:

```javascript
let person1 = { name: "Alice" };
let person2 = person1;   // person2 now holds the SAME reference!

person2.name = "Bob";    // changes the object in memory

console.log(person1.name);  // "Bob"  ← person1 also changed!
console.log(person2.name);  // "Bob"
// Both variables point to the SAME object in memory
```

**Visualizing the difference:**
```
Primitives (pass by value):
  let a = 5;      → [a: 5]
  let b = a;      → [a: 5] [b: 5]  (separate copies)
  b = 10;         → [a: 5] [b: 10] (a is unchanged)

Objects (pass by reference):
  let obj1 = {x: 1};  → [obj1] → {x: 1} in memory
  let obj2 = obj1;    → [obj1] → same {x: 1}
                         [obj2] ↗
  obj2.x = 99;        → [obj1] → {x: 99}
                         [obj2] ↗  (BOTH see the change!)
```

### Comparing Objects

Two objects are NEVER equal just because they look the same — they must be the SAME object in memory:

```javascript
let a = { x: 1 };
let b = { x: 1 };
let c = a;

console.log(a === b);  // false  (different objects in memory, even with same content)
console.log(a === c);  // true   (same reference)
console.log(a == b);   // false  (same result with ==)
```

---

## 16. Object Utility Methods

### `Object.keys(obj)` — Get All Property Names

Returns an array of the object's own property names:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

let keys = Object.keys(person);
console.log(keys);         // ["name", "age", "city"]
console.log(keys.length);  // 3  (number of properties)
```

### `Object.values(obj)` — Get All Property Values

Returns an array of the object's own property values:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

let values = Object.values(person);
console.log(values);  // ["Alice", 30, "Lagos"]

// Use case — sum all values in an object:
let scores = { math: 85, english: 72, science: 90 };
let total = Object.values(scores).reduce((sum, score) => sum + score, 0);
console.log(total);   // 247
```

### `Object.entries(obj)` — Get Key-Value Pairs

Returns an array of `[key, value]` pairs:

```javascript
let person = { name: "Alice", age: 30, city: "Lagos" };

let entries = Object.entries(person);
console.log(entries);
// [["name", "Alice"], ["age", 30], ["city", "Lagos"]]

// Loop with destructuring:
for (let [key, value] of Object.entries(person)) {
  console.log(`${key} = ${value}`);
}
// Output:
// name = Alice
// age = 30
// city = Lagos
```

### `Object.assign(target, source)` — Copy Properties

Copies properties from one or more source objects into a target object:

```javascript
let target = { a: 1, b: 2 };
let source = { b: 4, c: 5 };   // 'b' will overwrite target's 'b'

Object.assign(target, source);
console.log(target);  // { a: 1, b: 4, c: 5 }

// Create a new merged object (common use):
let merged = Object.assign({}, target, source);
```

### `Object.freeze(obj)` — Make Object Immutable

Prevents any modifications to an object:

```javascript
let config = { theme: "dark", lang: "en", debug: false };
Object.freeze(config);

config.theme = "light";    // silently fails (or error in strict mode)
config.newProp = "value";  // silently fails
delete config.lang;        // silently fails

console.log(config.theme);  // "dark"  (unchanged!)
```

### `Object.create(proto)` — Create Object with Specific Prototype

```javascript
let animal = {
  speak() {
    return `${this.name} makes a sound.`;
  }
};

let dog = Object.create(animal);
dog.name = "Rex";
dog.breed = "German Shepherd";

console.log(dog.speak());       // "Rex makes a sound." (method inherited from animal)
console.log(dog.name);          // "Rex"
console.log(dog.hasOwnProperty("name"));   // true (own property)
console.log(dog.hasOwnProperty("speak"));  // false (inherited, not own)
```

---

## 17. Copying and Merging Objects

### Shallow Copy — Spread Operator `{...obj}`

The spread operator copies all own enumerable properties into a new object:

```javascript
let original = { name: "Alice", age: 30, city: "Lagos" };
let copy = { ...original };

copy.name = "Bob";              // modifying the copy
console.log(original.name);    // "Alice"  ← original unchanged ✅
console.log(copy.name);        // "Bob"
```

> ⚠️ **Shallow copy limitation:** Nested objects are still shared by reference:

```javascript
let original = { name: "Alice", address: { city: "Lagos" } };
let copy = { ...original };

copy.address.city = "Abuja";          // changes the NESTED object
console.log(original.address.city);  // "Abuja"  ← original also changed! ⚠️
```

### Deep Copy — `JSON.parse(JSON.stringify(obj))`

For truly independent copies (including nested objects), use JSON conversion (works for most data):

```javascript
let original = { name: "Alice", address: { city: "Lagos" }, scores: [85, 90] };
let deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.address.city = "Abuja";
deepCopy.scores.push(95);

console.log(original.address.city);  // "Lagos"  ← safe! ✅
console.log(original.scores);        // [85, 90]  ← safe! ✅
```

> ⚠️ **Limitation:** `JSON.stringify` skips functions, `undefined`, and `Symbol` properties.

### Merging Objects — Spread Operator

```javascript
let defaults = { theme: "light", lang: "en", fontSize: 14 };
let userPrefs = { theme: "dark", fontSize: 16 };

// Merge — userPrefs values override defaults:
let settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", lang: "en", fontSize: 16 }
//   ↑ overridden    ↑ kept         ↑ overridden

// Add extra properties during merge:
let finalSettings = { ...defaults, ...userPrefs, version: "2.0" };
console.log(finalSettings.version);  // "2.0"
```

---

## 18. Applied Exercises

---

### 🏋️ Exercise 1 — Product Catalog Builder

**Objective:** Practice object creation, property access, methods, and `this`.

**Real-world Scenario:** You are building a product catalog for an online store. Each product needs to store data and compute discounted prices.

**Warm-up Mini-Example:**
```javascript
let item = {
  name:  "Pen",
  price: 200,
  getDiscounted(pct) { return this.price * (1 - pct); }
};
console.log(item.getDiscounted(0.1));  // 180
```

**Your Exercise:**

Build a product object with the following properties and methods:

```javascript
// Create this object:
let laptop = {
  name:        "HP Pavilion",
  brand:       "HP",
  price:       320000,       // in Naira
  category:    "Electronics",
  stock:       15,
  rating:      4.2,
  reviews:     87,

  // Methods to implement:
  // 1. getDiscountedPrice(discountPercent) - returns price after discount
  // 2. isAffordable(budget) - returns true if price <= budget
  // 3. restock(quantity) - adds quantity to stock, returns new stock
  // 4. getSummary() - returns a full formatted summary string
};
```

**Step-by-step Instructions:**
1. Implement all four methods using `this` to access properties
2. Test each method with different inputs
3. Add a new property `lastUpdated` after the object is created
4. Use `JSON.stringify()` to display the full object

**Expected Output:**
```
=== Product: HP Pavilion ===
Price:        ₦320,000.00
After 15% off: ₦272,000.00
Affordable for ₦300k budget: false
Affordable for ₦350k budget: true

Stock before restock: 15
Stock after restock (+20): 35

Summary:
HP Pavilion by HP | ₦320,000 | ★ 4.2 (87 reviews) | In stock: 35 units

Full object (JSON):
{ "name": "HP Pavilion", "brand": "HP", ... }
```

**Self-Check Questions:**
- What does `this.price` refer to inside a method?
- What happens if you call `getDiscountedPrice(1.5)`? Should you validate inputs?
- How would you add a second product and compare them?

---

### 🏋️ Exercise 2 — Student Registry with Constructor

**Objective:** Practice constructor functions, `new`, instance creation, and object arrays.

**Real-world Scenario:** A school registry system needs to create and manage student records consistently. Using a constructor ensures every record has the same structure.

**Warm-up Mini-Example:**
```javascript
function Animal(name, sound) {
  this.name  = name;
  this.sound = sound;
  this.speak = function() { return `${this.name} says ${this.sound}!`; };
}
let dog = new Animal("Rex", "Woof");
console.log(dog.speak());  // "Rex says Woof!"
```

**Your Exercise:**

Build a `Student` constructor function, then create a class registry:

**Step-by-step Instructions:**
1. Write `function Student(id, name, age, subjects)` where `subjects` is an array
2. Add these methods to the constructor:
   - `addScore(subject, score)` — adds `{ subject, score }` to a `scores` array
   - `getAverage()` — returns average of all scores
   - `getGrade()` — returns letter grade based on average
   - `getProfile()` — returns formatted profile string
3. Create at least 4 student instances
4. Store them in an array called `registry`
5. Loop through registry to display all profiles
6. Find the student with the highest average

**Expected Output:**
```
=== School Registry ===

Student #001: Adaeze Okonkwo, Age 20
  Subjects: Mathematics, English, Sciences
  Average Score: 84.7 → Grade: B

Student #002: Babatunde Lawal, Age 22
  Subjects: Physics, Chemistry, Biology
  Average Score: 61.3 → Grade: C

...

🏆 Top Student: Cynthia Asante (Average: 92.4, Grade: A)
```

**What-if Challenge:** What happens if a student has NO scores yet? Handle this edge case in `getAverage()`.

---

### 🏋️ Exercise 3 — Object Inspector Utility

**Objective:** Practice `for...in`, `Object.keys()`, `Object.values()`, `Object.entries()`, `JSON.stringify()`, and `typeof`.

**Real-world Scenario:** A developer tool needs to inspect any JavaScript object and produce a detailed, human-readable report — like a debugging assistant.

**Warm-up Mini-Example:**
```javascript
function countProperties(obj) {
  return Object.keys(obj).length;
}
let car = { brand: "Toyota", model: "Camry", year: 2022 };
console.log(countProperties(car));  // 3
```

**Your Exercise:**

Write a `inspect(obj, label)` function that:
1. Prints the label as a header
2. Shows total property count
3. Lists all keys with their values AND their types
4. Identifies which properties are methods (functions)
5. Shows a JSON representation (excluding methods)

**Expected Output for a `person` object:**
```
=== Inspector: Person Object ===
Total Properties: 6

Property Details:
  firstName  : "Alice"        [string]
  lastName   : "Okafor"       [string]
  age        : 30             [number]
  city       : "Lagos"        [string]
  isActive   : true           [boolean]
  greet      : function       [function] ← method

Data Properties: 5
Methods Found:   1

JSON Snapshot:
{
  "firstName": "Alice",
  "lastName": "Okafor",
  "age": 30,
  "city": "Lagos",
  "isActive": true
}
```

---

## 19. Mini-Project: Library Management System

### 📚 Project Overview

You will build a **Library Management System** using all object concepts from this tutorial. The system manages books, members, and borrowing transactions.

**What you'll practice:** Object literals, constructors, `this`, methods, property access, `for...in`, `Object.keys/values/entries`, spread/copy, `JSON.stringify`, and object arrays.

---

### Stage 1 — Book Constructor and Catalog

**Illustrative Preview:**
```javascript
function Book(title, author, year) {
  this.title  = title;
  this.author = author;
  this.year   = year;
  this.available = true;
}
let book1 = new Book("Things Fall Apart", "Chinua Achebe", 1958);
console.log(book1.title);  // "Things Fall Apart"
```

**Tasks for Stage 1:**

1. Write a `Book(isbn, title, author, year, genre, copies)` constructor
2. Add methods:
   - `getSummary()` — returns a one-line description
   - `isAvailable()` — returns true if `copies > 0`
   - `checkOut()` — reduces copies by 1 (with validation)
   - `returnBook()` — increases copies by 1
3. Create at least 5 book instances
4. Store them in a `catalog` array

**Expected Output for Stage 1:**
```
=== LIBRARY CATALOG ===

[ISBN: 978-0385474542]
  Title:  Things Fall Apart
  Author: Chinua Achebe
  Year:   1958
  Genre:  Fiction
  Copies: 3 available ✅

[ISBN: 978-0374528379]
  Title:  Americanah
  Author: Chimamanda Ngozi Adichie
  Year:   2013
  Genre:  Fiction
  Copies: 2 available ✅

... (5 books total)

Total Books in Catalog: 5
Total Copies Available: 14
```

---

### Stage 2 — Member Constructor and Borrowing System

**Tasks for Stage 2:**

1. Write a `Member(memberId, name, email, memberType)` constructor
2. Add member methods:
   - `borrowBook(book)` — borrows a book (adds to `borrowedBooks` array, calls `book.checkOut()`)
   - `returnBook(isbn)` — returns a book (removes from array, calls `book.returnBook()`)
   - `getBorrowedBooks()` — lists currently borrowed books
   - `getProfile()` — full member profile
3. Create 3 member instances
4. Simulate borrowing and returning transactions

**Expected Output for Stage 2:**
```
=== MEMBER PROFILES ===

Member: Emeka Obi (ID: MBR-001)
  Type: Premium
  Email: emeka@example.com
  Borrowed: 0 books

--- Transactions ---
Emeka borrows "Things Fall Apart"...
  ✅ Checked out. Copies remaining: 2

Emeka borrows "Americanah"...
  ✅ Checked out. Copies remaining: 1

Emeka's borrowed books:
  1. Things Fall Apart — Chinua Achebe
  2. Americanah — Chimamanda Ngozi Adichie

Emeka returns "Things Fall Apart"...
  ✅ Returned. Copies available: 3

Emeka's borrowed books:
  1. Americanah — Chimamanda Ngozi Adichie
```

---

### Stage 3 — Library System Object (Full Dashboard)

**Tasks for Stage 3:**

Create a `Library` object (using an object literal) that orchestrates everything:

```javascript
const Library = {
  name: "Lagos City Library",
  catalog: [],       // array of Book objects
  members: [],       // array of Member objects
  transactions: [],  // log of all borrow/return events

  addBook(book)         { ... },
  registerMember(member) { ... },
  findBook(isbn)        { ... },
  findMember(memberId)  { ... },
  borrow(memberId, isbn) { ... },
  returnBook(memberId, isbn) { ... },
  getDashboard()        { ... }   // displays full system summary
};
```

**Expected Final Output:**
```
╔══════════════════════════════════════════════════════╗
║           LAGOS CITY LIBRARY — DASHBOARD             ║
╚══════════════════════════════════════════════════════╝

📚 CATALOG SUMMARY
  Total Titles:    5
  Total Copies:    14
  Currently Out:   3
  Available:       11

👥 MEMBER SUMMARY
  Total Members:   3
  Active Borrows:  3 books across 2 members

📋 RECENT TRANSACTIONS
  [2025-07-01] Emeka Obi borrowed "Americanah"
  [2025-07-01] Fatima Diallo borrowed "Half of a Yellow Sun"
  [2025-07-01] Emeka Obi returned "Things Fall Apart"

📖 MOST BORROWED:
  1. Americanah (2 borrows)
  2. Things Fall Apart (1 borrow)

🔍 SEARCH: Books by Chimamanda Ngozi Adichie:
  - Americanah (2013) — 1 copy available
  - Half of a Yellow Sun (2006) — 0 copies (all out)
```

---

### Reflection Questions

1. Why was a constructor a better choice than an object literal for `Book` and `Member`?
2. Inside `borrowBook(book)`, why did we use `this.borrowedBooks.push(book)` instead of just `borrowedBooks.push(book)`?
3. What would happen if `checkOut()` didn't validate that `copies > 0`?
4. How would you use `Object.freeze()` on the `Library.catalog` to prevent accidental modifications?
5. The `transactions` array grows every time. How would you limit it to the last 50 transactions?

### Optional Advanced Features

- Add a search function: `findByGenre(genre)`, `findByAuthor(author)`
- Add a due-date system (books borrowed for max 14 days)
- Add overdue detection with a `checkOverdue()` method
- Convert the Library to a constructor function and create multiple library branches
- Use `Object.entries()` to generate a CSV export of the full catalog

---

## 20. Completion Checklist

| # | Concept | Status |
|---|---------|--------|
| ✅ | What an object is — the "profile card" analogy and why objects exist | Done |
| ✅ | Object literals — full syntax breakdown with all value types | Done |
| ✅ | Dot notation vs. bracket notation — when to use each | Done |
| ✅ | Dynamic property access with variables | Done |
| ✅ | Nested objects and arrays of objects — multi-level access | Done |
| ✅ | Property shorthand and computed property names (ES6) | Done |
| ✅ | Adding, modifying, and deleting properties at runtime | Done |
| ✅ | The `in` operator for property existence checks | Done |
| ✅ | Optional chaining `?.` for safe nested access | Done |
| ✅ | Object methods — functions as properties, calling with `()` | Done |
| ✅ | ES6 method shorthand | Done |
| ✅ | `this` in methods — what it refers to and why it matters | Done |
| ✅ | `this` in all 8 contexts — full comparison table | Done |
| ✅ | The `this` trap in callbacks — and the arrow function fix | Done |
| ✅ | `call()`, `apply()`, `bind()` — explicit `this` binding | Done |
| ✅ | Displaying objects — `console.log`, `JSON.stringify`, `for...in`, all techniques | Done |
| ✅ | `for...in` loop — iterating properties, `hasOwnProperty` | Done |
| ✅ | Constructor functions — blueprint pattern, `new` keyword | Done |
| ✅ | What `new` does behind the scenes — step by step | Done |
| ✅ | Adding methods and properties in constructors | Done |
| ✅ | Instance-specific properties (not shared by all instances) | Done |
| ✅ | Prototype preview — shared methods vs. own methods | Done |
| ✅ | Built-in constructors — when to use and when to avoid | Done |
| ✅ | Object vs. Primitive — references, mutability, comparison gotchas | Done |
| ✅ | `Object.keys()`, `Object.values()`, `Object.entries()` | Done |
| ✅ | `Object.assign()`, `Object.freeze()`, `Object.create()` | Done |
| ✅ | Shallow copy with spread `{...obj}` | Done |
| ✅ | Deep copy with `JSON.parse(JSON.stringify())` | Done |
| ✅ | Merging objects with spread | Done |
| ✅ | 3 Applied Exercises with real-world scenarios | Done |
| ✅ | Full mini-project: Library Management System (3 stages) | Done |
| ✅ | Common beginner mistakes highlighted throughout | Done |
| ✅ | Reflection questions and advanced challenges | Done |

---

**One-sentence summary:** JavaScript objects are the most fundamental building block of the language — collections of named key-value properties and methods that model real-world entities, created via literals or constructor blueprints, accessed through dot or bracket notation, with `this` always referring to the object currently executing the code, and manipulated using a rich set of built-in utility methods like `Object.keys()`, `Object.entries()`, spread copying, and `JSON.stringify()` — skills that underpin every web app, API, database interaction, and user interface ever built with JavaScript.
