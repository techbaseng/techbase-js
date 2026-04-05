---
render_with_liquid: false
title: "JavaScript Objects: Definitions · `this` · Iterations · Accessors · Management · Protection · Prototypes · Reference"
nav_order: 32
---

> **How to use this tutorial**
> Objects are JavaScript's most fundamental data structure. Almost everything in JavaScript — arrays, functions, dates, even regular expressions — is an object. This tutorial builds your understanding from the ground up, chapter by chapter.
>
> - **Phase 1 – Comprehension:** Full explanations, line-by-line walkthroughs, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project combining all concepts

---

# TABLE OF CONTENTS
1. [Chapter 1 — Object Definitions](#chapter-1--object-definitions)
2. [Chapter 2 — Advanced Object Patterns](#chapter-2--advanced-object-patterns)
3. [Chapter 3 — `this` in Objects](#chapter-3--this-in-objects)
4. [Chapter 4 — Object Iterations](#chapter-4--object-iterations)
5. [Chapter 5 — Object Accessors (Getters & Setters)](#chapter-5--object-accessors-getters--setters)
6. [Chapter 6 — Object Management](#chapter-6--object-management)
7. [Chapter 7 — Object Protection](#chapter-7--object-protection)
8. [Chapter 8 — Prototypes & Inheritance](#chapter-8--prototypes--inheritance)
9. [Chapter 9 — Object Reference (Built-In Methods)](#chapter-9--object-reference-built-in-methods)
10. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
11. [Phase 3 — Project Simulation](#phase-3--project-simulation)
12. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — OBJECT DEFINITIONS

## What Is an Object?

An **object** is a collection of related data and behaviour, stored together under one name. Instead of tracking a dozen separate variables for one thing, you group them into a single object.

**Real-world analogy:** Think of a car. A car has properties (colour, brand, year, fuel level) and it can do things (start, accelerate, brake). A JavaScript object works the same way — it stores both **data** (properties) and **actions** (methods) in one place.

**Without objects — messy and unmanageable:**

```js
let car1Brand = "Toyota";
let car1Model = "Corolla";
let car1Year  = 2022;
let car1Speed = 0;

let car2Brand = "Honda";
let car2Model = "Civic";
let car2Year  = 2021;
let car2Speed = 0;
// This approach breaks down the moment you have 3 cars, let alone 300.
```

**With objects — clean and scalable:**

```js
const car1 = { brand: "Toyota", model: "Corolla", year: 2022, speed: 0 };
const car2 = { brand: "Honda",  model: "Civic",   year: 2021, speed: 0 };
```

Everything belonging to one car lives in one place.

---

## 1.1 — Object Literals

The most direct way to create an object. You define the object and its contents at the same time, using curly braces `{ }`.

```js
const person = {
  firstName: "Tunde",
  lastName:  "Adeyemi",
  age:       32,
  isStudent: false,
  greet: function() {
    return "Hello, I'm " + this.firstName;
  }
};
```

**Anatomy:**

```
{
  key   :  value  ,
  │         │
  property  can be any data type
  name      (string, number, boolean, array,
             another object, or a function)
}
```

| Term | Meaning |
|---|---|
| **Property** | A key-value pair stored in the object |
| **Key** | The name (always a string, even without quotes) |
| **Value** | Any JavaScript value: primitive, array, object, or function |
| **Method** | A property whose value is a function |

**Accessing properties — two syntaxes:**

```js
// Dot notation (preferred for known property names)
console.log(person.firstName);    // Output: Tunde
console.log(person.age);          // Output: 32

// Bracket notation (required for dynamic or unusual property names)
console.log(person["lastName"]);  // Output: Adeyemi

const key = "age";
console.log(person[key]);         // Output: 32  ← key is a variable
```

> 💡 **When to use bracket notation:**
> - The property name is stored in a variable
> - The property name contains spaces or special characters: `obj["my-property"]`
> - The property name is a number: `obj[0]`
> Dot notation is cleaner and preferred for all other situations.

**Calling a method:**

```js
console.log(person.greet());   // Output: Hello, I'm Tunde
```

---

## 1.2 — Adding, Modifying, and Deleting Properties

Objects in JavaScript are **dynamic** — you can add, change, or remove properties at any time after creation.

```js
const book = { title: "1984", author: "Orwell" };

// Adding a new property
book.year = 1949;
console.log(book.year);   // Output: 1949

// Modifying an existing property
book.author = "George Orwell";
console.log(book.author);   // Output: George Orwell

// Deleting a property
delete book.year;
console.log(book.year);   // Output: undefined
console.log("year" in book);   // Output: false
```

> ⚠️ **`delete` vs setting to `null` or `undefined`**
> - `delete book.year` fully removes the property. `"year" in book` returns `false`.
> - `book.year = null` keeps the property but sets its value to `null`. `"year" in book` still returns `true`.
> Use `delete` when the property should not exist at all. Use `null` when the property should exist but currently has no meaningful value.

---

## 1.3 — Constructor Functions

A **constructor function** is a regular function used as a template to create multiple similar objects. By convention, constructor function names start with a capital letter.

```js
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName  = lastName;
  this.age       = age;
  this.greet     = function() {
    return "Hi, I'm " + this.firstName + " " + this.lastName;
  };
}
```

**Creating instances with `new`:**

```js
const alice = new Person("Alice", "Johnson", 30);
const bob   = new Person("Bob",   "Smith",   25);

console.log(alice.greet());   // Output: Hi, I'm Alice Johnson
console.log(bob.age);         // Output: 25
```

**What `new` does — step by step:**

```
1. Creates a new empty object:  {}
2. Sets 'this' inside the function to point to that new object
3. Runs the function body — attaching properties to 'this'
4. Returns the new object automatically
```

**Micro-demo — verifying instances:**

```js
console.log(alice instanceof Person);   // Output: true
console.log(bob instanceof Person);     // Output: true
console.log(typeof alice);             // Output: object
```

> ⚠️ **What happens if you forget `new`?**
> ```js
> const bad = Person("Alice", "Johnson", 30);  // Missing 'new'!
> console.log(bad);         // Output: undefined  (no return value)
> console.log(firstName);   // "Alice" got attached to the GLOBAL object — a serious bug
> ```
> Always use `new` with constructor functions, or use ES6 Classes (which enforce `new` automatically).

---

## 1.4 — `Object.create()`

`Object.create(proto)` creates a new object and sets its prototype to `proto`. This gives you direct, explicit control over inheritance without using `new`.

```js
const animalBase = {
  type: "Animal",
  describe: function() {
    return this.name + " is a " + this.type;
  }
};

const dog = Object.create(animalBase);
dog.name = "Rex";
dog.type = "Dog";

console.log(dog.describe());        // Output: Rex is a Dog
console.log(Object.getPrototypeOf(dog) === animalBase);  // Output: true
```

---

## 1.5 — ES6 Classes

ES6 **Classes** are a cleaner, more readable syntax for constructor functions. Under the hood, they still use prototypes — they're "syntactic sugar," not a genuinely new mechanism.

```js
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year  = year;
    this.speed = 0;
  }

  accelerate(amount) {
    this.speed += amount;
    return this.brand + " is now going " + this.speed + " km/h";
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    return this.brand + " slowed to " + this.speed + " km/h";
  }

  describe() {
    return this.year + " " + this.brand + " " + this.model;
  }
}

const myCar = new Car("Toyota", "Corolla", 2022);
console.log(myCar.describe());         // Output: 2022 Toyota Corolla
console.log(myCar.accelerate(50));     // Output: Toyota is now going 50 km/h
console.log(myCar.brake(20));          // Output: Toyota slowed to 30 km/h
```

**Class inheritance with `extends`:**

```js
class ElectricCar extends Car {
  constructor(brand, model, year, batteryKwh) {
    super(brand, model, year);   // Call parent constructor
    this.batteryKwh = batteryKwh;
    this.charge = 100;
  }

  describe() {
    return super.describe() + " (Electric, " + this.batteryKwh + " kWh)";
  }

  charge(percent) {
    this.charge = Math.min(100, this.charge + percent);
    return "Battery at " + this.charge + "%";
  }
}

const tesla = new ElectricCar("Tesla", "Model 3", 2023, 75);
console.log(tesla.describe());        // Output: 2023 Tesla Model 3 (Electric, 75 kWh)
console.log(tesla.accelerate(100));   // Inherited from Car: Tesla is now going 100 km/h
```

---

## 1.6 — Nested Objects and Arrays in Objects

Object values can themselves be objects or arrays, creating rich, hierarchical data structures.

```js
const employee = {
  id: 101,
  name: {
    first: "Sara",
    last:  "Williams"
  },
  skills: ["JavaScript", "React", "Node.js"],
  address: {
    city:    "Lagos",
    country: "Nigeria"
  },
  getFullName: function() {
    return this.name.first + " " + this.name.last;
  }
};

console.log(employee.name.first);      // Output: Sara
console.log(employee.skills[1]);       // Output: React
console.log(employee.address.city);    // Output: Lagos
console.log(employee.getFullName());   // Output: Sara Williams
```

> 🤔 **Thinking question:** What would `employee.name` return on its own? What type is it? How would you confirm this with `typeof`?

---

---

# CHAPTER 2 — ADVANCED OBJECT PATTERNS

---

## 2.1 — Shorthand Property and Method Syntax (ES6)

When a property name matches the variable name you're assigning from, you can write it once:

```js
const name = "Alice";
const age  = 30;

// Old syntax:
const person = { name: name, age: age };

// ES6 shorthand (identical result):
const person = { name, age };

console.log(person);   // Output: { name: 'Alice', age: 30 }
```

**Method shorthand:**

```js
// Old syntax:
const obj = {
  greet: function() { return "Hello"; }
};

// ES6 shorthand:
const obj = {
  greet() { return "Hello"; }
};
```

---

## 2.2 — Computed Property Names (ES6)

Property names can be computed dynamically using bracket notation inside the object literal:

```js
const field = "score";
const round = 1;

const gameResult = {
  player: "Alice",
  [field]: 95,                    // Equivalent to score: 95
  ["round_" + round]: "Win",      // Equivalent to round_1: "Win"
};

console.log(gameResult.score);    // Output: 95
console.log(gameResult.round_1);  // Output: Win
```

**Real-world use — building objects from dynamic data:**

```js
function createConfig(keys, values) {
  const config = {};
  keys.forEach((key, i) => { config[key] = values[i]; });
  return config;
}

const cfg = createConfig(["host", "port", "db"], ["localhost", 5432, "mydb"]);
console.log(cfg.host);   // Output: localhost
console.log(cfg.port);   // Output: 5432
```

---

## 2.3 — Object Spread and Rest (ES2018)

**Spread (`...`) — copying and merging objects:**

```js
const defaults = { theme: "light", lang: "en", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 16 };

// Merge — userPrefs properties override defaults where they overlap
const config = { ...defaults, ...userPrefs };
console.log(config);
// Output: { theme: 'dark', lang: 'en', fontSize: 16 }
```

**Important:** Spread creates a **shallow copy** — nested objects are still references:

```js
const original = { name: "Alice", address: { city: "London" } };
const copy = { ...original };

copy.name = "Bob";               // Only affects 'copy'
copy.address.city = "Paris";     // ⚠️ Affects BOTH — address is shared!

console.log(original.name);          // Output: Alice  ✅
console.log(original.address.city);  // Output: Paris  ❌ — shared reference
```

**Deep copy solution:**

```js
const deepCopy = JSON.parse(JSON.stringify(original));
// Works for plain data objects. Doesn't copy functions, Date objects, or undefined values.
```

**Rest in destructuring — collecting remaining properties:**

```js
const { name, age, ...rest } = { name: "Alice", age: 30, city: "London", job: "Dev" };
console.log(name);   // Output: Alice
console.log(age);    // Output: 30
console.log(rest);   // Output: { city: 'London', job: 'Dev' }
```

---

## 2.4 — Optional Chaining (`?.`)

Safely access deeply nested properties without crashing if an intermediate value is `null` or `undefined`:

```js
const user = {
  profile: {
    address: {
      city: "Lagos"
    }
  }
};

// ❌ Without optional chaining — crashes if profile is missing:
console.log(user.profile.address.city);    // Output: Lagos (works here)
console.log(user.account.balance);          // ❌ TypeError: Cannot read properties of undefined

// ✅ With optional chaining — returns undefined instead of crashing:
console.log(user?.profile?.address?.city); // Output: Lagos
console.log(user?.account?.balance);        // Output: undefined  (no crash!)
```

**With methods:**

```js
const result = user.profile?.getAvatar?.();
// If getAvatar doesn't exist, returns undefined instead of throwing
```

---

## 2.5 — Nullish Coalescing (`??`)

Provides a fallback value when a property is `null` or `undefined` (but not `0`, `false`, or `""`):

```js
const settings = { volume: 0, username: null };

// ❌ Using || (broken for falsy values like 0):
const volume   = settings.volume   || 50;    // Output: 50 — WRONG! 0 is valid
const username = settings.username || "Guest"; // Output: Guest — correct

// ✅ Using ?? (only triggers for null/undefined):
const volume2   = settings.volume   ?? 50;    // Output: 0   — correct!
const username2 = settings.username ?? "Guest"; // Output: Guest — correct
```

> 💡 **Rule of thumb:** Use `??` when `0`, `false`, and `""` are valid values. Use `||` only when all falsy values should fall back.

---

---

# CHAPTER 3 — `this` IN OBJECTS

---

## What Is `this` Inside an Object?

`this` inside an object method refers to the **object that owns the method** — the object before the dot when the method is called. This lets methods access and operate on the object's own data without needing to know the object's variable name.

> This chapter focuses specifically on `this` in the context of objects. For the complete `this` picture (constructors, event listeners, arrow functions), refer back to the Functions tutorial Chapter 4.

---

## 3.1 — `this` in Object Methods

```js
const bankAccount = {
  owner:   "Tunde",
  balance: 1000,

  deposit(amount) {
    this.balance += amount;
    return this.owner + "'s balance: £" + this.balance;
  },

  withdraw(amount) {
    if (amount > this.balance) {
      return "Insufficient funds";
    }
    this.balance -= amount;
    return this.owner + "'s balance: £" + this.balance;
  }
};

console.log(bankAccount.deposit(500));    // Output: Tunde's balance: £1500
console.log(bankAccount.withdraw(200));   // Output: Tunde's balance: £1300
console.log(bankAccount.withdraw(2000));  // Output: Insufficient funds
```

`this.balance` always refers to the `balance` property of the object the method is called on.

---

## 3.2 — Implicit vs Explicit Binding

**Implicit binding** — `this` is set by which object is before the dot:

```js
const obj1 = { name: "First",  showName() { console.log(this.name); } };
const obj2 = { name: "Second", showName() { console.log(this.name); } };

obj1.showName();   // Output: First   ← 'this' is obj1
obj2.showName();   // Output: Second  ← 'this' is obj2
```

**Method sharing between objects:**

```js
function describe() {
  return this.brand + " costs £" + this.price;
}

const phone  = { brand: "Samsung", price: 699,  describe };
const laptop = { brand: "Dell",    price: 1099, describe };

console.log(phone.describe());    // Output: Samsung costs £699
console.log(laptop.describe());   // Output: Dell costs £1099
```

The same function (`describe`) uses `this` differently because `this` is determined by the calling object, not by the function itself.

---

## 3.3 — `this` in Nested Functions (The Classic Trap)

When a regular function is defined *inside* a method, it loses the object's `this`:

```js
const order = {
  items: ["Coffee", "Cake", "Juice"],
  taxRate: 0.1,

  printItems: function() {
    // 'this' here is 'order' — correct
    this.items.forEach(function(item) {
      // ❌ 'this' inside this callback is NOT 'order'
      console.log(item + " (tax: " + this.taxRate + ")");
    });
  }
};

order.printItems();
// Output:
// Coffee (tax: undefined)    ← taxRate is undefined!
// Cake (tax: undefined)
// Juice (tax: undefined)
```

**Three fixes:**

**Fix 1 — Arrow function (inherits outer `this`):**

```js
printItems: function() {
  this.items.forEach((item) => {
    console.log(item + " (tax: " + this.taxRate + ")");  // Arrow function inherits 'this'
  });
}
// Output: Coffee (tax: 0.1) ✅
```

**Fix 2 — Store `this` in a variable before entering the callback:**

```js
printItems: function() {
  const self = this;   // Capture 'this' before it changes
  this.items.forEach(function(item) {
    console.log(item + " (tax: " + self.taxRate + ")");
  });
}
```

**Fix 3 — Use `.bind(this)`:**

```js
printItems: function() {
  this.items.forEach(function(item) {
    console.log(item + " (tax: " + this.taxRate + ")");
  }.bind(this));
}
```

> ✅ **Best practice today:** Use arrow functions (Fix 1). They were invented specifically to solve this problem.

---

## 3.4 — `this` with Standalone Functions vs Methods

```js
const calculator = {
  value: 0,
  add(n) { this.value += n; return this; },   // Return 'this' for chaining
  subtract(n) { this.value -= n; return this; },
  multiply(n) { this.value *= n; return this; },
  result() { return this.value; }
};

// Method chaining works because each method returns 'this'
const answer = calculator.add(10).multiply(3).subtract(5).result();
console.log(answer);   // Output: 25  (10×3=30, 30−5=25)
```

**Method chaining** is a popular pattern — you'll see it in jQuery, Mongoose, and many popular libraries. It works by returning `this` from each method.

> 🤔 **Thinking question:** What would `calculator.add(10).multiply(3)` return if `add` and `multiply` returned `this.value` instead of `this`?

---

---

# CHAPTER 4 — OBJECT ITERATIONS

---

## Why Iterate Over Objects?

Arrays have a natural order and index. Objects are collections of named properties. To work with all of an object's data — list it, transform it, search it — you need ways to loop over its keys and values.

---

## 4.1 — `for...in` Loop

Loops over all **enumerable properties** of an object, including inherited ones.

```js
const laptop = {
  brand:  "Dell",
  ram:    "16GB",
  storage: "512GB SSD",
  price:  899
};

for (const key in laptop) {
  console.log(key + ": " + laptop[key]);
}
// Output:
// brand: Dell
// ram: 16GB
// storage: 512GB SSD
// price: 899
```

> ⚠️ **`for...in` includes inherited properties** from the prototype chain. To be safe, check that the property belongs directly to the object:

```js
for (const key in laptop) {
  if (Object.hasOwn(laptop, key)) {    // Only own properties
    console.log(key + ": " + laptop[key]);
  }
}
```

> 💡 **`Object.hasOwn(obj, key)`** is the modern replacement for the older `obj.hasOwnProperty(key)` — both check whether a property belongs directly to the object rather than being inherited.

---

## 4.2 — `Object.keys()` — Array of Property Names

Returns an array of the object's own enumerable **property names (keys)**:

```js
const scores = { Alice: 92, Bob: 85, Carol: 78 };

const names = Object.keys(scores);
console.log(names);   // Output: ['Alice', 'Bob', 'Carol']

// Now you can use all array methods:
names.forEach(name => console.log(name + ": " + scores[name]));
// Output:
// Alice: 92
// Bob: 85
// Carol: 78
```

---

## 4.3 — `Object.values()` — Array of Property Values

Returns an array of the object's own enumerable **values**:

```js
const prices = { coffee: 3.50, tea: 2.75, juice: 4.00 };

const amounts = Object.values(prices);
console.log(amounts);   // Output: [3.5, 2.75, 4]

const total = amounts.reduce((sum, price) => sum + price, 0);
console.log("Total: £" + total.toFixed(2));   // Output: Total: £10.25
```

---

## 4.4 — `Object.entries()` — Array of [Key, Value] Pairs

Returns an array of `[key, value]` pairs — the most versatile iteration method:

```js
const product = { name: "Headphones", price: 59.99, inStock: true };

const pairs = Object.entries(product);
console.log(pairs);
// Output: [['name', 'Headphones'], ['price', 59.99], ['inStock', true]]

// With destructuring (very clean):
for (const [key, value] of Object.entries(product)) {
  console.log(key + " → " + value);
}
// Output:
// name → Headphones
// price → 59.99
// inStock → true
```

**Transforming an object using `Object.entries()` + `.map()`:**

```js
const original = { a: 1, b: 2, c: 3 };

const doubled = Object.fromEntries(
  Object.entries(original).map(([key, val]) => [key, val * 2])
);

console.log(doubled);   // Output: { a: 2, b: 4, c: 6 }
```

`Object.fromEntries()` is the inverse of `Object.entries()` — it rebuilds an object from an array of `[key, value]` pairs.

---

## 4.5 — `Object.keys()` vs `Object.values()` vs `Object.entries()` — Summary

| Method | Returns | Use When You Need |
|---|---|---|
| `Object.keys(obj)` | Array of keys | Property names only |
| `Object.values(obj)` | Array of values | Values only (e.g., summing, averaging) |
| `Object.entries(obj)` | Array of `[key, val]` pairs | Both key and value together |
| `for...in` | Keys (incl. inherited) | Legacy code; use `hasOwn` guard |
| `Object.fromEntries(arr)` | A new object | Rebuilding an object from pairs |

---

## 4.6 — Iterating Arrays of Objects

The most common real-world pattern — working with a collection of records:

```js
const employees = [
  { name: "Alice", dept: "Engineering", salary: 75000 },
  { name: "Bob",   dept: "Design",      salary: 68000 },
  { name: "Carol", dept: "Engineering", salary: 82000 },
  { name: "David", dept: "Marketing",   salary: 61000 },
];

// Find all engineers:
const engineers = employees.filter(e => e.dept === "Engineering");
console.log(engineers.map(e => e.name));   // Output: ['Alice', 'Carol']

// Total salary bill:
const total = employees.reduce((sum, e) => sum + e.salary, 0);
console.log("Total: $" + total);   // Output: Total: $286000

// Sort by salary descending:
const sorted = [...employees].sort((a, b) => b.salary - a.salary);
sorted.forEach(e => console.log(e.name + ": $" + e.salary));
// Output:
// Carol: $82000
// Alice: $75000
// Bob: $68000
// David: $61000
```

> 🤔 **Thinking question:** Why does the sort use `[...employees]` (a copy) instead of `employees` directly?

---

---

# CHAPTER 5 — OBJECT ACCESSORS (GETTERS & SETTERS)

---

## What Are Getters and Setters?

**Getters** and **setters** are special methods that let you control how a property is read and written. From the outside, they look and feel exactly like regular properties — no parentheses needed — but behind the scenes, code runs when you access or change them.

**Why use them?**

| Problem | Accessor Solution |
|---|---|
| Computed property (e.g., full name from first + last) | Getter calculates it on demand |
| Validation before saving | Setter checks the value first |
| Logging / side effects on change | Setter runs extra code automatically |
| Read-only properties | Getter without setter = read-only |
| Hiding implementation details | Internal storage can differ from exposed interface |

---

## 5.1 — Defining Getters with `get`

```js
const person = {
  firstName: "Tunde",
  lastName:  "Adeyemi",

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
};

// Accessed like a property — no parentheses:
console.log(person.fullName);   // Output: Tunde Adeyemi

// Updates automatically when source properties change:
person.firstName = "Kwame";
console.log(person.fullName);   // Output: Kwame Adeyemi
```

`fullName` is not stored anywhere. Every time you read `person.fullName`, the getter recalculates it fresh. This means it's always in sync with `firstName` and `lastName`.

**Micro-demo — temperature converter:**

```js
const thermometer = {
  _celsius: 0,   // Underscore convention: "private" internal storage

  get celsius()    { return this._celsius; },
  get fahrenheit() { return this._celsius * 9/5 + 32; },
  get kelvin()     { return this._celsius + 273.15; }
};

thermometer._celsius = 100;
console.log(thermometer.celsius);    // Output: 100
console.log(thermometer.fahrenheit); // Output: 212
console.log(thermometer.kelvin);     // Output: 373.15
```

---

## 5.2 — Defining Setters with `set`

A setter intercepts assignment to a property, letting you validate or transform the incoming value.

```js
const user = {
  _age: 0,

  get age() {
    return this._age;
  },

  set age(value) {
    if (typeof value !== "number") {
      console.log("Age must be a number.");
      return;
    }
    if (value < 0 || value > 150) {
      console.log("Age must be between 0 and 150.");
      return;
    }
    this._age = value;
  }
};

user.age = 25;       // ✅ Accepted
console.log(user.age);   // Output: 25

user.age = -5;       // Output: Age must be between 0 and 150.
user.age = "old";    // Output: Age must be a number.
console.log(user.age);   // Output: 25  (unchanged — bad values were rejected)
```

**How the setter syntax works:**

```js
set propertyName(parameterName) {
  // parameterName receives whatever is assigned
  // e.g., user.age = 25 → value = 25
}
```

The setter is called like: `user.age = 25`. It looks like a simple assignment, but behind the scenes, the setter function runs with `value = 25`.

---

## 5.3 — Getters and Setters Together — Full Pattern

```js
class BankAccount {
  constructor(owner, initialBalance) {
    this._owner   = owner;
    this._balance = initialBalance;
    this._transactions = [];
  }

  get balance() {
    return this._balance;
  }

  get owner() {
    return this._owner;
  }

  get transactionCount() {
    return this._transactions.length;
  }

  set deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit must be positive.");
      return;
    }
    this._balance += amount;
    this._transactions.push({ type: "deposit", amount });
    console.log("Deposited £" + amount + ". New balance: £" + this._balance);
  }

  set withdraw(amount) {
    if (amount > this._balance) {
      console.log("Insufficient funds.");
      return;
    }
    this._balance -= amount;
    this._transactions.push({ type: "withdrawal", amount });
    console.log("Withdrew £" + amount + ". New balance: £" + this._balance);
  }
}

const acc = new BankAccount("Alice", 500);
acc.deposit  = 200;         // Output: Deposited £200. New balance: £700
acc.withdraw = 100;         // Output: Withdrew £100. New balance: £600
acc.withdraw = 1000;        // Output: Insufficient funds.
console.log(acc.balance);   // Output: 600
console.log(acc.transactionCount);  // Output: 2
```

---

## 5.4 — `Object.defineProperty()` for Getters/Setters

You can also define getters and setters on existing objects using `Object.defineProperty()`:

```js
const product = { _price: 100 };

Object.defineProperty(product, "price", {
  get() {
    return "£" + this._price.toFixed(2);
  },
  set(value) {
    if (value >= 0) this._price = value;
  },
  enumerable: true,    // Shows up in Object.keys() and for...in
  configurable: true   // Can be redefined later
});

product.price = 149.99;
console.log(product.price);   // Output: £149.99
```

This is the lower-level API for defining properties with fine-grained control — see Chapter 6 for more on property descriptors.

> 🤔 **Thinking question:** In `set age(value)`, why do we store the value in `this._age` instead of `this.age`? What would happen if we wrote `this.age = value` inside the setter?

---

---

# CHAPTER 6 — OBJECT MANAGEMENT

---

## What Is Object Management?

JavaScript provides a suite of `Object` methods for creating, inspecting, copying, and merging objects. These are the tools professionals use to work with objects at a deeper level than simple property access.

---

## 6.1 — `Object.assign()` — Merging and Copying

`Object.assign(target, ...sources)` copies all enumerable own properties from one or more source objects into a target object. Returns the modified target.

```js
const target  = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };   // 'b' will override target's 'b'
const source2 = { d: 5 };

const result = Object.assign(target, source1, source2);

console.log(result);   // Output: { a: 1, b: 3, c: 4, d: 5 }
console.log(target === result);   // Output: true  ← target was modified in place!
```

**Shallow copy pattern (don't modify the original):**

```js
const original = { name: "Alice", score: 95 };
const copy = Object.assign({}, original);   // Empty object as target

copy.name = "Bob";
console.log(original.name);   // Output: Alice  ← unchanged
console.log(copy.name);       // Output: Bob
```

> ⚠️ **`Object.assign` is shallow** — nested objects are still copied by reference, not deeply cloned. Use `structuredClone()` (modern) or `JSON.parse(JSON.stringify())` for deep cloning.

**`structuredClone()` — modern deep copy:**

```js
const original = { name: "Alice", address: { city: "London" } };
const deepCopy  = structuredClone(original);

deepCopy.address.city = "Paris";
console.log(original.address.city);  // Output: London  ✅ truly independent
```

---

## 6.2 — `Object.defineProperty()` — Fine-Grained Property Control

Every property in JavaScript has not just a value but also **property descriptor attributes** that control its behaviour:

| Attribute | Type | Default | Meaning |
|---|---|---|---|
| `value` | any | `undefined` | The property's value |
| `writable` | boolean | `false` | Can the value be changed? |
| `enumerable` | boolean | `false` | Does it appear in loops / `Object.keys()`? |
| `configurable` | boolean | `false` | Can the descriptor itself be changed or the property deleted? |

> ⚠️ **Defaults when using `defineProperty`:** When you define a property with `Object.defineProperty`, all descriptor attributes default to `false`. When you add a property the normal way (`obj.x = 5`), all descriptor attributes default to `true`. This is a critical difference.

```js
const config = {};

Object.defineProperty(config, "version", {
  value:        "3.1.4",
  writable:     false,    // Cannot be changed
  enumerable:   true,     // Appears in Object.keys()
  configurable: false     // Cannot be redefined or deleted
});

console.log(config.version);   // Output: 3.1.4

config.version = "4.0.0";      // Silently fails (throws in strict mode)
console.log(config.version);   // Output: 3.1.4  ← unchanged

delete config.version;          // Silently fails
console.log(config.version);   // Output: 3.1.4  ← still there
```

**Defining multiple properties at once — `Object.defineProperties()`:**

```js
const circle = {};

Object.defineProperties(circle, {
  _radius: { value: 5, writable: true, enumerable: false, configurable: false },
  radius: {
    get() { return this._radius; },
    set(r) { if (r > 0) this._radius = r; },
    enumerable: true, configurable: false
  },
  area: {
    get() { return Math.PI * this._radius ** 2; },
    enumerable: true, configurable: false
  }
});

console.log(circle.radius);         // Output: 5
console.log(circle.area.toFixed(2)); // Output: 78.54
circle.radius = 10;
console.log(circle.area.toFixed(2)); // Output: 314.16
```

---

## 6.3 — `Object.getOwnPropertyDescriptor()`

Inspect the descriptor of any property:

```js
const person = { name: "Alice" };

const desc = Object.getOwnPropertyDescriptor(person, "name");
console.log(desc);
// Output: { value: 'Alice', writable: true, enumerable: true, configurable: true }
```

All four attributes are `true` for properties added normally — confirming the "normal property" defaults.

---

## 6.4 — `Object.getOwnPropertyNames()`

Returns ALL own property names — including non-enumerable ones (which `Object.keys()` would miss):

```js
const obj = {};
Object.defineProperty(obj, "hidden", { value: 42, enumerable: false });
obj.visible = "yes";

console.log(Object.keys(obj));                  // Output: ['visible']
console.log(Object.getOwnPropertyNames(obj));   // Output: ['hidden', 'visible']
```

---

---

# CHAPTER 7 — OBJECT PROTECTION

---

## Why Protect Objects?

In production applications, objects often represent critical state — user sessions, configuration, financial data. Without protection, any code anywhere could accidentally (or maliciously) modify your data. JavaScript provides three levels of object protection.

---

## 7.1 — `Object.preventExtensions()` — No New Properties

Prevents new properties from being added to an object. Existing properties can still be modified or deleted.

```js
const settings = { theme: "dark", lang: "en" };

Object.preventExtensions(settings);

settings.theme = "light";   // ✅ Modifying existing — allowed
delete settings.lang;       // ✅ Deleting existing — allowed
settings.debug = true;      // ❌ Adding new — silently fails (throws in strict mode)

console.log(settings);            // Output: { theme: 'light' }
console.log(Object.isExtensible(settings));   // Output: false
```

---

## 7.2 — `Object.seal()` — No Add or Delete

Sealing an object prevents adding new properties **and** deleting existing ones. Values of existing properties can still be changed.

```js
const user = { name: "Alice", role: "admin" };

Object.seal(user);

user.name = "Bob";     // ✅ Changing existing value — allowed
user.age = 30;         // ❌ Adding new property — silently fails
delete user.role;      // ❌ Deleting — silently fails

console.log(user);            // Output: { name: 'Bob', role: 'admin' }
console.log(Object.isSealed(user));   // Output: true
```

---

## 7.3 — `Object.freeze()` — Completely Immutable

Freezing is the strictest level. No properties can be added, deleted, or modified.

```js
const PI_VALUES = {
  pi:  3.14159265,
  tau: 6.28318530,
  e:   2.71828182
};

Object.freeze(PI_VALUES);

PI_VALUES.pi  = 3;            // ❌ Silently fails
PI_VALUES.phi = 1.618;        // ❌ Silently fails
delete PI_VALUES.e;           // ❌ Silently fails

console.log(PI_VALUES.pi);            // Output: 3.14159265  ← unchanged
console.log(Object.isFrozen(PI_VALUES));  // Output: true
```

**Protection level comparison:**

| Method | Add Properties | Delete Properties | Change Values |
|---|---|---|---|
| Normal object | ✅ | ✅ | ✅ |
| `preventExtensions` | ❌ | ✅ | ✅ |
| `seal` | ❌ | ❌ | ✅ |
| `freeze` | ❌ | ❌ | ❌ |

---

## 7.4 — Shallow Freeze Warning

`Object.freeze()` is **shallow** — it only freezes the top-level properties. Nested objects are still mutable:

```js
const config = Object.freeze({
  server: { host: "localhost", port: 3000 },
  debug: false
});

config.debug = true;           // ❌ Fails — top-level is frozen
config.server.port = 8080;     // ✅ Works! — nested object is NOT frozen

console.log(config.debug);          // Output: false
console.log(config.server.port);    // Output: 8080  ← was changed!
```

**Deep freeze (recursive):**

```js
function deepFreeze(obj) {
  // Freeze all nested objects first
  Object.getOwnPropertyNames(obj).forEach(name => {
    const value = obj[name];
    if (value && typeof value === "object") {
      deepFreeze(value);   // Recursively freeze nested objects
    }
  });
  return Object.freeze(obj);
}

const safeConfig = deepFreeze({
  server: { host: "localhost", port: 3000 },
  debug: false
});

safeConfig.server.port = 8080;  // ❌ Now fails — nested object is also frozen
console.log(safeConfig.server.port);  // Output: 3000
```

---

## 7.5 — `const` vs `Object.freeze()` — Key Distinction

> **`const`** prevents reassigning the variable. The object it points to can still be mutated.
> **`Object.freeze()`** prevents mutating the object. The variable can still be reassigned (unless it's also `const`).

```js
const obj = { name: "Alice" };

obj = { name: "Bob" };     // ❌ TypeError — const prevents reassignment
obj.name = "Bob";          // ✅ Works — const does NOT protect the object's contents

// Full protection requires BOTH:
const frozen = Object.freeze({ name: "Alice" });
frozen.name = "Bob";   // ❌ freeze prevents mutation
frozen = {};           // ❌ const prevents reassignment
```

---

## 7.6 — Private Class Fields (ES2022)

Modern JavaScript classes support genuinely private fields using the `#` prefix. These cannot be accessed from outside the class at all — not even by subclasses.

```js
class BankAccount {
  #balance;         // Private field declaration
  #owner;

  constructor(owner, balance) {
    this.#owner   = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
    return this;
  }

  get balance() {
    return this.#balance;
  }

  get summary() {
    return this.#owner + ": £" + this.#balance;
  }
}

const acc = new BankAccount("Alice", 1000);
acc.deposit(500);
console.log(acc.balance);    // Output: 1500
console.log(acc.summary);    // Output: Alice: £1500
console.log(acc.#balance);   // ❌ SyntaxError — truly inaccessible
```

Unlike the `_convention` (which is just a naming hint), `#privateFields` are enforced by the language itself.

---

---

# CHAPTER 8 — PROTOTYPES & INHERITANCE

---

## What Is a Prototype?

Every JavaScript object has an internal link to another object called its **prototype**. When you try to access a property on an object, JavaScript first checks the object itself. If the property isn't found there, it checks the prototype. If it's not there either, it checks the prototype's prototype, and so on — up the **prototype chain** — until it either finds the property or reaches `null` (the end of the chain).

**Real-world analogy:** Imagine a new employee. They don't personally know every company policy, but they can look it up in the employee handbook. If the handbook doesn't cover it, they escalate to HR, then to company bylaws. This chain of fallback lookup is exactly how prototypal inheritance works.

---

## 8.1 — The Prototype Chain

```js
const animal = {
  type: "Animal",
  describe() {
    return this.name + " is a " + this.type;
  }
};

const dog = Object.create(animal);  // dog's prototype is 'animal'
dog.name = "Rex";
dog.type = "Dog";

console.log(dog.describe());        // Output: Rex is a Dog
// dog doesn't have 'describe' — JavaScript finds it on 'animal'

console.log(Object.getPrototypeOf(dog) === animal);  // Output: true
```

**Visualising the lookup:**

```
dog.describe()
  → Look in dog itself for 'describe' → Not found
  → Look in dog's prototype (animal) for 'describe' → Found! Run it.
```

---

## 8.2 — `prototype` on Constructor Functions

Every function in JavaScript has a `prototype` property — an object. When you use `new`, the created instance's prototype chain links to `Constructor.prototype`.

```js
function Person(name, age) {
  this.name = name;
  this.age  = age;
}

// Add a method to the prototype — shared by ALL Person instances
Person.prototype.greet = function() {
  return "Hi, I'm " + this.name;
};

Person.prototype.isAdult = function() {
  return this.age >= 18;
};

const alice = new Person("Alice", 30);
const bob   = new Person("Bob",   15);

console.log(alice.greet());     // Output: Hi, I'm Alice
console.log(bob.greet());       // Output: Hi, I'm Bob
console.log(alice.isAdult());   // Output: true
console.log(bob.isAdult());     // Output: false
```

> 💡 **Why use prototype instead of putting methods in the constructor?**
> If you define `greet` inside the constructor with `this.greet = function() {...}`, a new copy of the function is created for every instance. With prototype methods, all instances **share one copy**. For 1,000 instances, that's 1,000 functions vs 1 — a significant memory difference.

---

## 8.3 — Prototype Inheritance Between Constructor Functions

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.describe = function() {
  return "I am " + this.name;
};

function Dog(name, breed) {
  Animal.call(this, name);   // Inherit instance properties
  this.breed = breed;
}

// Set up prototype chain: Dog → Animal → Object
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;   // Restore constructor reference (important!)

Dog.prototype.bark = function() {
  return this.name + " says: Woof!";
};

const rex = new Dog("Rex", "Labrador");
console.log(rex.describe());   // Output: I am Rex  (inherited from Animal)
console.log(rex.bark());       // Output: Rex says: Woof! (own Dog method)
console.log(rex instanceof Dog);    // Output: true
console.log(rex instanceof Animal); // Output: true  ← prototype chain confirmed
```

---

## 8.4 — ES6 Class Inheritance (Same Mechanism, Cleaner Syntax)

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a noise.";
  }

  toString() {
    return "Animal: " + this.name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);       // Must call super() before using 'this'
    this.breed = breed;
  }

  speak() {
    return this.name + " barks: Woof!";  // Override parent method
  }

  describe() {
    return super.toString() + " (Breed: " + this.breed + ")";
    // super.toString() calls Animal's toString()
  }
}

const rex = new Dog("Rex", "Labrador");
console.log(rex.speak());     // Output: Rex barks: Woof!  (overridden)
console.log(rex.describe());  // Output: Animal: Rex (Breed: Labrador)
console.log(rex instanceof Dog);    // Output: true
console.log(rex instanceof Animal); // Output: true
```

---

## 8.5 — `hasOwnProperty` vs Prototype Properties

It's important to distinguish between a property that belongs to an object itself and one it inherits:

```js
const alice = new Person("Alice", 30);

console.log(Object.hasOwn(alice, "name"));    // Output: true  ← own property
console.log(Object.hasOwn(alice, "greet"));   // Output: false ← inherited from prototype
console.log("greet" in alice);                 // Output: true  ← 'in' includes prototype chain
```

---

## 8.6 — Adding to Built-In Prototypes (with Caution)

You can extend built-in objects, but this is generally discouraged in production code:

```js
// Adding a method to all arrays:
Array.prototype.last = function() {
  return this[this.length - 1];
};

const nums = [10, 20, 30];
console.log(nums.last());   // Output: 30

// ⚠️ Risks:
// 1. Conflicts with future JavaScript standards (e.g., if 'last' is added natively)
// 2. Affects ALL arrays everywhere in your codebase and in third-party libraries
// 3. Can break libraries that use 'for...in' on arrays
```

> ✅ **Best practice:** Only extend built-in prototypes in tightly controlled environments or polyfills. Prefer utility functions or subclassing instead.

---

## 8.7 — `Object.getPrototypeOf()` and `Object.setPrototypeOf()`

```js
const base = { type: "base" };
const child = { name: "child" };

// Check prototype:
console.log(Object.getPrototypeOf(child));   // Object.prototype (default)

// Change prototype:
Object.setPrototypeOf(child, base);
console.log(child.type);   // Output: base  ← inherited from 'base'
console.log(Object.getPrototypeOf(child) === base);   // Output: true
```

> ⚠️ **`Object.setPrototypeOf()` is slow.** Changing an object's prototype after creation forces JavaScript engines to re-optimise internal structures. Use `Object.create()` at object creation time instead.

---

---

# CHAPTER 9 — OBJECT REFERENCE (BUILT-IN METHODS)

---

## 9.1 — Complete `Object` Static Method Reference

| Method | Purpose | Returns |
|---|---|---|
| `Object.create(proto)` | Create object with specified prototype | New object |
| `Object.assign(target, ...src)` | Copy properties from sources into target | Target object |
| `Object.keys(obj)` | Own enumerable property names | Array of strings |
| `Object.values(obj)` | Own enumerable property values | Array of values |
| `Object.entries(obj)` | Own enumerable [key, value] pairs | Array of arrays |
| `Object.fromEntries(iterable)` | Build object from key-value pairs | New object |
| `Object.freeze(obj)` | Make object immutable | Frozen object |
| `Object.isFrozen(obj)` | Check if frozen | Boolean |
| `Object.seal(obj)` | Prevent add/delete, allow modify | Sealed object |
| `Object.isSealed(obj)` | Check if sealed | Boolean |
| `Object.preventExtensions(obj)` | Prevent adding new properties | Object |
| `Object.isExtensible(obj)` | Check if extensible | Boolean |
| `Object.defineProperty(obj, key, desc)` | Define property with descriptor | Object |
| `Object.defineProperties(obj, descs)` | Define multiple properties | Object |
| `Object.getOwnPropertyDescriptor(obj, key)` | Get descriptor for one property | Descriptor object |
| `Object.getOwnPropertyDescriptors(obj)` | Get all descriptors | Object of descriptors |
| `Object.getOwnPropertyNames(obj)` | All own property names (incl. non-enumerable) | Array of strings |
| `Object.getPrototypeOf(obj)` | Get prototype | Prototype object |
| `Object.setPrototypeOf(obj, proto)` | Set prototype | Object |
| `Object.hasOwn(obj, key)` | Check own property exists | Boolean |
| `Object.is(val1, val2)` | Strict equality (handles NaN and -0) | Boolean |

---

## 9.2 — `Object.is()` — Better Equality

`Object.is()` is like `===` but correctly handles two edge cases:

```js
// Edge case 1: NaN
console.log(NaN === NaN);         // Output: false  (the notorious NaN issue)
console.log(Object.is(NaN, NaN)); // Output: true   ✅

// Edge case 2: -0 and +0
console.log(-0 === +0);           // Output: true
console.log(Object.is(-0, +0));   // Output: false  ✅ (they are different values)

// Normal comparisons — same as ===:
console.log(Object.is(1, 1));     // Output: true
console.log(Object.is("a", "a")); // Output: true
console.log(Object.is(null, null)); // Output: true
```

---

## 9.3 — `Object.fromEntries()` — Real-World Pattern

Convert a `Map` to a plain object:

```js
const map = new Map([
  ["name", "Alice"],
  ["role", "admin"],
  ["score", 95]
]);

const obj = Object.fromEntries(map);
console.log(obj);   // Output: { name: 'Alice', role: 'admin', score: 95 }
```

Transform object values with a pipeline:

```js
const prices = { apple: 1.2, banana: 0.5, cherry: 3.0 };

// Apply 10% discount to all prices:
const discounted = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, +(price * 0.9).toFixed(2)])
);

console.log(discounted);
// Output: { apple: 1.08, banana: 0.45, cherry: 2.7 }
```

---

## 9.4 — `Object.getOwnPropertyDescriptors()` — Cloning With Full Fidelity

Regular `Object.assign()` does not copy getters/setters — it evaluates them and copies the values. To truly clone an object including accessor definitions:

```js
const source = {
  _x: 10,
  get x() { return this._x; },
  set x(v) { if (v >= 0) this._x = v; }
};

// ❌ Object.assign — copies the VALUE of x, not the getter/setter:
const badCopy = Object.assign({}, source);
console.log(Object.getOwnPropertyDescriptor(badCopy, "x"));
// Output: { value: 10, ... }  ← getter is gone!

// ✅ defineProperties + getOwnPropertyDescriptors — copies accessor definitions:
const goodCopy = Object.defineProperties({}, Object.getOwnPropertyDescriptors(source));
goodCopy.x = 20;
console.log(goodCopy.x);   // Output: 20  ← setter works!
goodCopy.x = -5;
console.log(goodCopy.x);   // Output: 20  ← validation works too!
```

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Object Definition Practice

**Objective:** Model a real-world entity as a JavaScript object using multiple definition techniques.

**Scenario:** You're building a university course registration system. Create a `Course` that tracks student enrolments.

**Warm-up mini-example:**

```js
// A simple Student object:
const student = {
  id: 1001,
  name: "Sara",
  enrolled: [],
  enrol(courseName) {
    this.enrolled.push(courseName);
    return this.name + " enrolled in " + courseName;
  }
};
console.log(student.enrol("Mathematics"));   // Output: Sara enrolled in Mathematics
```

**Step-by-step instructions:**

1. Write a `Course` constructor function that accepts `title`, `code`, `maxStudents`, and initialises an empty `students` array and `isOpen = true`.
2. Add these methods directly in the constructor:
   - `enrol(studentName)` — adds to `students` if not full and `isOpen`; returns a confirmation message
   - `close()` — sets `isOpen = false`
   - `isFull()` — returns `true` if `students.length >= maxStudents`
   - `getRoster()` — returns the students array joined with ", "
3. Create three `Course` instances. Enrol multiple students. Test the full/closed guards.
4. Rewrite the same `Course` using an **ES6 class** syntax. Confirm behaviour is identical.

**Self-check questions:**
1. What is `typeof myCourse`? Is it `"object"` or `"function"`?
2. If you define `enrol` on `Course.prototype` instead of inside the constructor, how does the behaviour change? (Hint: memory)

---

## Exercise 2 — Object Iteration and Transformation

**Objective:** Process a collection of product records using `Object.keys()`, `Object.values()`, `Object.entries()`, and `Object.fromEntries()`.

**Scenario:** An e-commerce inventory system with the following data:

```js
const inventory = {
  laptop:    { price: 899, stock: 14, category: "electronics" },
  headphones:{ price: 59,  stock: 3,  category: "electronics" },
  notebook:  { price: 4.5, stock: 200, category: "stationery" },
  pen:       { price: 1.2, stock: 500, category: "stationery" },
  webcam:    { price: 79,  stock: 0,   category: "electronics" },
};
```

**Step-by-step instructions:**

1. Use `Object.keys()` to list all product names.
2. Use `Object.values()` to calculate the total stock across all products.
3. Use `Object.entries()` to find all out-of-stock products (stock === 0).
4. Use `Object.fromEntries()` to create a new object containing only electronics.
5. Create a `getStockReport()` function that uses `Object.entries()` and returns a formatted string:
   ```
   laptop: 14 units @ £899 each
   headphones: 3 units @ £59 each
   ...
   ```

**Self-check questions:**
1. Would `for...in` work here? What extra guard would you need?
2. Could you use `Object.entries()` + `.reduce()` to calculate the total inventory value (price × stock for all products)?

---

## Exercise 3 — Getters and Setters

**Objective:** Build a `UserProfile` class with validated setters and computed getters.

**Scenario:** A user profile system for a social network.

**Warm-up mini-example:**

```js
// A getter that returns a formatted value:
const user = {
  _birthYear: 1995,
  get age() {
    return new Date().getFullYear() - this._birthYear;
  }
};
console.log(user.age);   // Output: current year minus 1995
```

**Step-by-step instructions:**

1. Create a `UserProfile` class with private-convention properties: `_username`, `_email`, `_age`, `_bio`.
2. Add getters for: `username`, `email`, `age`, `bio`, and a computed `displayName` (returns `@username`).
3. Add setters with validation:
   - `username`: must be 3–20 characters, alphanumeric and underscores only
   - `email`: must contain `@` and a `.` after it
   - `age`: must be between 13 and 120
   - `bio`: max 160 characters
4. Add a getter `profile` that returns a formatted summary string.
5. Test all validations with valid and invalid inputs.

**Self-check questions:**
1. What happens when you try to `console.log(user.email)` before setting it?
2. Write a `get isComplete()` getter that returns `true` only if all four fields are set.

---

## Exercise 4 — Object Protection Levels

**Objective:** Understand and test the three levels of object protection.

**Scenario:** A configuration module for a deployment pipeline.

**Step-by-step instructions:**

1. Create a `devConfig` object and apply `Object.preventExtensions()`. Test all three operations (add, delete, modify).
2. Create a `stagingConfig` object and apply `Object.seal()`. Test all three operations.
3. Create a `productionConfig` object and apply `Object.freeze()`. Test all three operations.
4. For each, write the expected result as a comment before running each test.

**Warm-up mini-example:**

```js
const obj = Object.freeze({ level: "strict" });
console.log(Object.isFrozen(obj));    // true
obj.level = "loose";                  // Silent fail
console.log(obj.level);              // "strict"
```

**Self-check questions:**
1. What protection level is appropriate for a user's settings object (should be editable but not have new unexpected keys added)?
2. Write a `deepFreeze(obj)` function using recursion.

---

## Exercise 5 — Prototype Chain

**Objective:** Build a three-level inheritance hierarchy using both constructor functions and ES6 classes.

**Scenario:** A vehicle management system.

**Hierarchy:**
```
Vehicle (name, speed, describe())
  └── MotorVehicle extends Vehicle (engineType, start())
        └── Truck extends MotorVehicle (payload, load())
```

**Step-by-step instructions:**

1. Implement the hierarchy twice:
   - First using constructor functions and `prototype` assignment
   - Then using ES6 `class` / `extends` / `super`
2. Create a `Truck` instance and verify:
   - `truck instanceof Truck` → true
   - `truck instanceof MotorVehicle` → true
   - `truck instanceof Vehicle` → true
3. Verify prototype chain: `Object.getPrototypeOf(truck)` → `Truck.prototype` → `MotorVehicle.prototype` → `Vehicle.prototype`

**Self-check questions:**
1. In the constructor function version, why must you reset `Dog.prototype.constructor = Dog` after `Dog.prototype = Object.create(Animal.prototype)`?
2. Why is calling `super()` in a derived class constructor required before accessing `this`?

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Employee Records Management System

**Scenario:** You are building a lightweight in-memory employee management module for a small company's internal HR tool. The system must handle employee creation, profile management with validation, protected configuration, prototype-based role inheritance, and reporting via object iteration.

This project combines all nine chapters: definitions (Ch.1), advanced patterns (Ch.2), `this` (Ch.3), iteration (Ch.4), getters/setters (Ch.5), object management (Ch.6), protection (Ch.7), prototypes (Ch.8), and built-in methods (Ch.9).

---

### Stage 1 — Employee Class with Validated Getters and Setters

```js
class Employee {
  #id;
  #name;
  #email;
  #department;
  #salary;
  #startDate;

  constructor(id, name, email, department, salary) {
    this.#id         = id;
    this.#name       = name;
    this.#email      = email;
    this.#department = department;
    this.#salary     = salary;
    this.#startDate  = new Date();
  }

  // --- Getters ---
  get id()         { return this.#id; }
  get name()       { return this.#name; }
  get email()      { return this.#email; }
  get department() { return this.#department; }
  get salary()     { return this.#salary; }
  get startDate()  { return this.#startDate.toLocaleDateString(); }

  get yearsOfService() {
    const ms    = Date.now() - this.#startDate.getTime();
    const years = ms / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
  }

  get summary() {
    return `[${this.#id}] ${this.#name} | ${this.#department} | £${this.#salary.toLocaleString()}`;
  }

  // --- Setters ---
  set name(value) {
    if (typeof value !== "string" || value.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }
    this.#name = value.trim();
  }

  set email(value) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) throw new Error("Invalid email address.");
    this.#email = value;
  }

  set salary(value) {
    if (typeof value !== "number" || value < 0) {
      throw new Error("Salary must be a non-negative number.");
    }
    this.#salary = value;
  }

  set department(value) {
    const valid = ["Engineering", "Design", "Marketing", "HR", "Finance"];
    if (!valid.includes(value)) {
      throw new Error("Invalid department: " + value);
    }
    this.#department = value;
  }

  // Serialise to plain object for export/display:
  toJSON() {
    return {
      id:         this.#id,
      name:       this.#name,
      email:      this.#email,
      department: this.#department,
      salary:     this.#salary,
      startDate:  this.startDate,
    };
  }
}
```

**Test Stage 1:**

```js
const emp = new Employee(1, "Alice Johnson", "alice@company.com", "Engineering", 75000);
console.log(emp.summary);
// Output: [1] Alice Johnson | Engineering | £75,000

emp.salary = 80000;
console.log(emp.salary);    // Output: 80000

try {
  emp.email = "not-an-email";
} catch (e) {
  console.log(e.message);   // Output: Invalid email address.
}
```

---

### Stage 2 — Role Inheritance Using Prototypes/Classes

```js
class Manager extends Employee {
  #reports;
  #budget;

  constructor(id, name, email, department, salary, budget) {
    super(id, name, email, department, salary);
    this.#reports = [];
    this.#budget  = budget;
  }

  get budget()      { return this.#budget; }
  get teamSize()    { return this.#reports.length; }
  get reportNames() { return this.#reports.map(e => e.name); }

  addReport(employee) {
    if (!(employee instanceof Employee)) {
      throw new Error("Can only manage Employee instances.");
    }
    this.#reports.push(employee);
    return this;   // Allow chaining
  }

  get summary() {
    return super.summary + ` | Manages ${this.teamSize} reports | Budget: £${this.#budget.toLocaleString()}`;
  }

  getTeamReport() {
    const total = this.#reports.reduce((sum, e) => sum + e.salary, 0);
    return {
      manager:     this.name,
      teamSize:    this.teamSize,
      members:     this.reportNames,
      totalSalary: total,
      avgSalary:   Math.round(total / (this.teamSize || 1))
    };
  }
}

class Director extends Manager {
  #division;

  constructor(id, name, email, department, salary, budget, division) {
    super(id, name, email, department, salary, budget);
    this.#division = division;
  }

  get division() { return this.#division; }

  get summary() {
    return super.summary + ` | Division: ${this.#division}`;
  }
}
```

**Test Stage 2:**

```js
const mgr = new Manager(2, "Bob Smith", "bob@company.com", "Engineering", 95000, 500000);
const dev1 = new Employee(3, "Carol Lee",  "carol@company.com",  "Engineering", 72000);
const dev2 = new Employee(4, "David Kim",  "david@company.com",  "Engineering", 68000);

mgr.addReport(dev1).addReport(dev2);   // Method chaining using 'return this'

console.log(mgr.summary);
// Output: [2] Bob Smith | Engineering | £95,000 | Manages 2 reports | Budget: £500,000

const report = mgr.getTeamReport();
console.log(report);
// Output: { manager: 'Bob Smith', teamSize: 2, members: ['Carol Lee','David Kim'], totalSalary: 140000, avgSalary: 70000 }

console.log(mgr instanceof Manager);   // Output: true
console.log(mgr instanceof Employee);  // Output: true
```

---

### Stage 3 — The Protected HR Module (IIFE + Object Management)

```js
const HRSystem = (function() {
  // Private state
  let _employees = new Map();    // id → Employee instance
  let _nextId = 1000;
  const _auditLog = [];

  // Frozen configuration — cannot be changed after initialisation
  const CONFIG = Object.freeze({
    maxEmployeesPerDept: 50,
    departments:         Object.freeze(["Engineering", "Design", "Marketing", "HR", "Finance"]),
    salaryBands:         Object.freeze({ min: 20000, max: 250000 })
  });

  function _audit(action, employeeId, detail = "") {
    _auditLog.push({
      timestamp:  new Date().toISOString(),
      action,
      employeeId,
      detail
    });
  }

  function _validateSalary(salary) {
    return salary >= CONFIG.salaryBands.min && salary <= CONFIG.salaryBands.max;
  }

  // --- Public API ---
  return {
    hire(name, email, department, salary, isManager = false, budget = 0) {
      if (!CONFIG.departments.includes(department)) {
        throw new Error("Unknown department: " + department);
      }
      if (!_validateSalary(salary)) {
        throw new Error(`Salary must be between £${CONFIG.salaryBands.min} and £${CONFIG.salaryBands.max}`);
      }

      const id  = ++_nextId;
      const emp = isManager
        ? new Manager(id, name, email, department, salary, budget)
        : new Employee(id, name, email, department, salary);

      _employees.set(id, emp);
      _audit("HIRE", id, name + " joined " + department);
      return emp;
    },

    terminate(id) {
      const emp = _employees.get(id);
      if (!emp) throw new Error("Employee not found: " + id);
      _employees.delete(id);
      _audit("TERMINATE", id, emp.name);
      return true;
    },

    promote(id, newSalary, newDepartment) {
      const emp = _employees.get(id);
      if (!emp) throw new Error("Employee not found: " + id);
      if (!_validateSalary(newSalary)) throw new Error("Salary out of band.");
      const oldSalary = emp.salary;
      emp.salary = newSalary;
      if (newDepartment) emp.department = newDepartment;
      _audit("PROMOTE", id, `£${oldSalary} → £${newSalary}`);
      return emp;
    },

    getEmployee(id) {
      return _employees.get(id) || null;
    },

    // --- Reporting using Object iteration ---
    getDepartmentReport() {
      const report = {};

      for (const emp of _employees.values()) {
        const dept = emp.department;
        if (!report[dept]) {
          report[dept] = { count: 0, totalSalary: 0, employees: [] };
        }
        report[dept].count++;
        report[dept].totalSalary += emp.salary;
        report[dept].employees.push(emp.name);
      }

      // Add computed averages using Object.entries + Object.fromEntries:
      return Object.fromEntries(
        Object.entries(report).map(([dept, data]) => [
          dept,
          { ...data, avgSalary: Math.round(data.totalSalary / data.count) }
        ])
      );
    },

    getHeadcount() {
      return _employees.size;
    },

    getAuditLog() {
      return [..._auditLog];   // Return a copy
    },

    getConfig() {
      return Object.assign({}, CONFIG);   // Return a shallow copy
    },

    getAllEmployees() {
      // Return plain objects (not class instances) for safe external use
      return Array.from(_employees.values()).map(e => e.toJSON());
    }
  };
})();
```

---

### Stage 4 — Running the Full System

```js
// Hire employees
const alice = HRSystem.hire("Alice Johnson", "alice@co.com", "Engineering", 75000);
const bob   = HRSystem.hire("Bob Smith",     "bob@co.com",   "Engineering", 95000, true, 400000);
const carol = HRSystem.hire("Carol Lee",     "carol@co.com", "Design",      68000);
const david = HRSystem.hire("David Kim",     "david@co.com", "Engineering", 72000);
const eve   = HRSystem.hire("Eve Brown",     "eve@co.com",   "Marketing",   61000);

// Assign reports to manager
bob.addReport(alice).addReport(david);

// Promote Alice
HRSystem.promote(alice.id, 82000);

// Department report
const deptReport = HRSystem.getDepartmentReport();
console.log("\n--- Department Report ---");
for (const [dept, data] of Object.entries(deptReport)) {
  console.log(`\n${dept}:`);
  console.log(`  Headcount:  ${data.count}`);
  console.log(`  Total Pay:  £${data.totalSalary.toLocaleString()}`);
  console.log(`  Avg Salary: £${data.avgSalary.toLocaleString()}`);
  console.log(`  Team:       ${data.employees.join(", ")}`);
}

// Terminate an employee
HRSystem.terminate(eve.id);

// Audit log
console.log("\n--- Audit Log ---");
HRSystem.getAuditLog().forEach(entry => {
  console.log(`[${entry.action}] ${entry.detail}`);
});
```

**Expected output (approximate):**

```
--- Department Report ---

Engineering:
  Headcount:  3
  Total Pay:  £249,000
  Avg Salary: £83,000
  Team:       Alice Johnson, Bob Smith, David Kim

Design:
  Headcount:  1
  Total Pay:  £68,000
  Avg Salary: £68,000
  Team:       Carol Lee

Marketing:
  Headcount:  1
  Total Pay:  £61,000
  Avg Salary: £61,000
  Team:       Eve Brown

--- Audit Log ---
[HIRE] Alice Johnson joined Engineering
[HIRE] Bob Smith joined Engineering
[HIRE] Carol Lee joined Design
[HIRE] David Kim joined Engineering
[HIRE] Eve Brown joined Marketing
[PROMOTE] £75000 → £82000
[TERMINATE] Eve Brown
```

---

### Stage 5 — Advanced Challenge: Prototype Inspection Utility

Write a `describeObject(obj)` utility function that:
1. Lists all **own** properties (using `Object.getOwnPropertyNames()`)
2. Lists each property's descriptor (`writable`, `enumerable`, `configurable`)
3. Walks the entire prototype chain, listing each level's name and own methods
4. Identifies which methods are getters vs regular functions

```js
function describeObject(obj) {
  console.log("=== Own Properties ===");
  Object.getOwnPropertyNames(obj).forEach(name => {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    const type = desc.get ? "getter" : desc.set ? "setter" : typeof desc.value;
    console.log(`  ${name}: [${type}]`, {
      writable:     desc.writable     ?? "N/A",
      enumerable:   desc.enumerable,
      configurable: desc.configurable
    });
  });

  console.log("\n=== Prototype Chain ===");
  let proto = Object.getPrototypeOf(obj);
  let level = 1;
  while (proto && proto !== Object.prototype) {
    const ctorName = proto.constructor?.name ?? "Anonymous";
    const methods  = Object.getOwnPropertyNames(proto).filter(n => n !== "constructor");
    console.log(`  Level ${level}: ${ctorName} (${methods.join(", ")})`);
    proto = Object.getPrototypeOf(proto);
    level++;
  }
}

describeObject(alice);
```

---

**Reflection Questions:**

1. The `CONFIG` object inside `HRSystem` uses `Object.freeze()`. But `CONFIG.departments` is an array — why is it frozen separately with another `Object.freeze()`?
2. Why does `getAuditLog()` return `[...auditLog]` instead of `_auditLog` directly?
3. The `getEmployee()` method returns the actual class instance, while `getAllEmployees()` returns plain objects via `.toJSON()`. When would each approach be appropriate in a real API?
4. `_employees` is a `Map` (not a plain object). What are the advantages of using a `Map` here instead of a plain object for the employee store?
5. Private class fields (`#balance`) are enforced by the language. The underscore convention (`_balance`) is just a naming agreement. In what situations would you still choose the underscore convention over private fields?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What is the difference between dot notation (`obj.key`) and bracket notation (`obj["key"]`)? When must you use bracket notation?

**Q2:** What are the four property descriptor attributes, and what are their default values when a property is added with `defineProperty`?

**Q3:** Write a getter called `fullAddress` for this object:
```js
const location = {
  street: "123 Main St",
  city:   "Lagos",
  country: "Nigeria",
  // add fullAddress getter here
};
// location.fullAddress → "123 Main St, Lagos, Nigeria"
```

**Q4:** What is the difference between `Object.seal()` and `Object.freeze()`?

**Q5:** Why is `Object.freeze()` described as "shallow"? How would you fix it?

**Q6:** What does `for...in` iterate over that `Object.keys()` does not?

**Q7:** What does `Object.entries(obj)` return for `{ a: 1, b: 2 }`?

**Q8:** What is the prototype chain and what happens when JavaScript cannot find a property anywhere in the chain?

**Q9:** Why is it more memory-efficient to add methods to `Constructor.prototype` rather than inside the constructor function body?

**Q10:** What is the difference between `const obj = { x: 1 }` and `const obj = Object.freeze({ x: 1 })`?

---

## Answer Key

**A1:** Dot notation is cleaner and preferred for known, static property names (`obj.name`). Bracket notation is required when: the property name is stored in a variable (`obj[key]`), the name contains special characters (`obj["my-prop"]`), or the name is a number.

**A2:** `value`, `writable`, `enumerable`, `configurable`. All four default to `false` when using `Object.defineProperty()`. When adding a property normally (`obj.x = 5`), all four default to `true`.

**A3:**
```js
get fullAddress() {
  return this.street + ", " + this.city + ", " + this.country;
}
```

**A4:** `seal` prevents adding and deleting properties but allows modifying existing ones. `freeze` prevents all three — add, delete, and modify. A sealed object's values can change; a frozen object's cannot.

**A5:** `Object.freeze()` only freezes the top-level object. Nested objects remain mutable because they are separate objects referenced by the frozen object. Fix: recursively apply `Object.freeze()` to all nested objects (`deepFreeze`).

**A6:** `for...in` also iterates over **inherited** (prototype chain) properties. `Object.keys()` only returns the object's own enumerable properties.

**A7:** `[["a", 1], ["b", 2]]` — an array of `[key, value]` arrays.

**A8:** The prototype chain is a series of linked objects. When a property isn't found on an object, JavaScript checks its prototype, then that object's prototype, up to `Object.prototype`. If not found there, it returns `undefined`.

**A9:** Methods defined inside a constructor create a new function copy for every instance. Prototype methods are defined once and shared by all instances, saving memory proportional to the number of instances.

**A10:** `const obj = { x: 1 }` — the variable `obj` cannot be reassigned, but `obj.x` can be changed. `const obj = Object.freeze({ x: 1 })` — the variable cannot be reassigned AND `obj.x` cannot be changed. `const` protects the binding; `freeze` protects the object's contents.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can create objects using literals, constructors, `Object.create()`, and ES6 classes | ✓ |
| 2 | Understand dynamic property addition, modification, and deletion | ✓ |
| 3 | Can explain `this` in methods and fix the nested-function `this` trap | ✓ |
| 4 | Can iterate objects using `for...in`, `Object.keys()`, `Object.values()`, `Object.entries()` | ✓ |
| 5 | Can define and use getters and setters for validation and computed properties | ✓ |
| 6 | Can use `Object.assign()`, `Object.defineProperty()`, and `structuredClone()` correctly | ✓ |
| 7 | Understand the three protection levels: `preventExtensions`, `seal`, `freeze` | ✓ |
| 8 | Can distinguish `const` protection from `Object.freeze()` protection | ✓ |
| 9 | Can explain the prototype chain and implement inheritance via both constructors and classes | ✓ |
| 10 | Know and can use all major `Object` static methods from the reference table | ✓ |
| 11 | Can identify when to use private class fields (`#`) vs underscore convention | ✓ |
| 12 | Built the full Employee Records project combining all concepts | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Forgetting `new` with constructor functions | Function runs normally; `this` is global | Always use `new`, or switch to classes |
| `this` lost in nested callbacks | Regular function call has no object context | Use arrow function or `.bind(this)` |
| `for...in` picks up prototype properties | Iterates whole chain | Add `Object.hasOwn()` guard |
| `Object.freeze` doesn't protect nested objects | Freeze is shallow | Use a recursive `deepFreeze()` function |
| Spread creates a shallow copy | Nested objects are references | Use `structuredClone()` for deep copies |
| Setting property inside its own setter | Infinite recursion / stack overflow | Use an internal `_property` name |
| Forgetting `Dog.prototype.constructor = Dog` | `instanceof` checks break | Always restore after prototype reassignment |
| `const` ≠ immutable | `const` prevents rebinding, not mutation | Use `Object.freeze()` to lock contents |
| Extending built-in prototypes | Conflicts with future JS standards; pollutes | Use utility functions or subclassing instead |
| Passing `null` to `Object.is` incorrectly | Confusing `==`, `===`, and `Object.is` | Remember: `Object.is` only differs for `NaN` and `-0` |

---

## One-Sentence Summary

> JavaScript objects are the language's core building block — combining properties and behaviour in one place, controlled through getters and setters, protected with freeze and seal, organised through prototype-based inheritance, and managed with a comprehensive suite of static `Object` methods.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Objects (9 pages)*
