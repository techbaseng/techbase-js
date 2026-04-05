---
title: "JavaScript Classes: Class Syntax · Inheritance · Static Methods & Properties"
nav_order: 33
---

> **How to use this tutorial**
> Classes are JavaScript's modern, clean syntax for creating objects from blueprints. They build directly on everything you've learned about constructor functions, prototypes, and `this`. Work through all three chapters in order — each one builds on the previous.
>
> - **Phase 1 – Comprehension:** Full explanations, line-by-line walkthroughs, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project bringing all three chapters together

---

# TABLE OF CONTENTS
1. [Chapter 1 — JavaScript Classes](#chapter-1--javascript-classes)
2. [Chapter 2 — Class Inheritance](#chapter-2--class-inheritance)
3. [Chapter 3 — Static Methods and Properties](#chapter-3--static-methods-and-properties)
4. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
5. [Phase 3 — Project Simulation](#phase-3--project-simulation)
6. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — JAVASCRIPT CLASSES

## What Is a Class?

A **class** is a **blueprint** for creating objects. Just as an architect's floor plan describes how every house in a development should be built — same layout, same rooms, same structure — a class describes how every object of a particular type should be built.

Before classes arrived in ES6 (2015), JavaScript developers used constructor functions and prototype chains to achieve the same result. Classes are not a new mechanism — they are a cleaner, more readable syntax layered on top of the same prototype system. The JavaScript community calls this **syntactic sugar**.

**Real-world analogy — a cookie cutter:**
The class is the cookie cutter. Each object you create from it is a cookie. Every cookie has the same shape (structure), but each one can have different decorations (property values). The cutter itself is not a cookie — it just defines what cookies look like.

---

## 1.1 — Defining a Class

```js
class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year  = year;
    this.speed = 0;
  }
}
```

**Anatomy — every part explained:**

```
class   Car   {
  │      │
keyword  name (UpperCamelCase by convention)

  constructor  (brand, model, year)  {
      │              │
  special method  parameters — values passed when creating an instance
  runs once on creation

    this.brand = brand;
      │           │
  attaches        the parameter value
  property to
  the new object
  }
}
```

| Part | What It Is | What It Does |
|---|---|---|
| `class` | Keyword | Declares that a class is being defined |
| `Car` | Class name | UpperCamelCase by convention; used when calling `new Car()` |
| `constructor()` | Special method | Runs automatically once when `new Car()` is called |
| `this` | Keyword | Refers to the specific object being created right now |
| `this.brand = brand` | Property assignment | Attaches the argument value to the new object permanently |

> 💡 **A class without a constructor is valid.** If you don't write one, JavaScript provides an empty constructor automatically: `constructor() {}`. This is fine for classes that don't need to set up initial data.

---

## 1.2 — Creating Instances with `new`

```js
const myCar    = new Car("Toyota", "Corolla", 2022);
const theirCar = new Car("BMW",    "M3",      2023);

console.log(myCar.brand);      // Output: Toyota
console.log(theirCar.model);   // Output: M3
console.log(myCar.speed);      // Output: 0
```

**What `new` does — step by step:**

```
1. Creates a fresh, empty object {}
2. Sets 'this' inside the constructor to point to that new object
3. Runs the constructor body, attaching properties to 'this'
4. Returns the finished object automatically
```

> ⚠️ **Always use `new` with a class.**
> Calling a class without `new` throws a `TypeError` immediately — unlike old constructor functions, which would silently attach properties to the global object.
> ```js
> const bad = Car("Toyota", "Corolla", 2022);
> // ❌ TypeError: Class constructor Car cannot be invoked without 'new'
> ```
> This is one of the improvements classes make over constructor functions.

---

## 1.3 — Adding Methods to a Class

Methods defined inside a class body (outside the constructor) are automatically placed on the **prototype** — shared by all instances, not copied per object.

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
    console.log(this.brand + " accelerates to " + this.speed + " km/h");
  }

  brake(amount) {
    this.speed = Math.max(0, this.speed - amount);
    console.log(this.brand + " slows to " + this.speed + " km/h");
  }

  describe() {
    return this.year + " " + this.brand + " " + this.model;
  }
}

const car = new Car("Toyota", "Corolla", 2022);
console.log(car.describe());   // Output: 2022 Toyota Corolla
car.accelerate(60);            // Output: Toyota accelerates to 60 km/h
car.brake(20);                 // Output: Toyota slows to 40 km/h
```

**Why methods go on the prototype — memory explained:**

```js
const car1 = new Car("Toyota", "Corolla", 2022);
const car2 = new Car("Honda",  "Civic",   2021);

// Both cars share ONE copy of 'describe' — not two separate copies:
console.log(car1.describe === car2.describe);   // Output: true ✅

// But their data is separate:
console.log(car1.brand === car2.brand);   // Output: false ✅
```

If you had 10,000 `Car` objects, there would still be only one `accelerate` function in memory — not 10,000 copies. This is the primary reason to use classes (or prototype methods).

---

## 1.4 — Getters and Setters in Classes

Getters and setters let you control property access with logic. They look like properties from the outside — no parentheses — but run code internally.

```js
class Temperature {
  constructor(celsius) {
    this._celsius = celsius;   // Underscore signals internal storage
  }

  // Getter — read as a property: temp.celsius
  get celsius() {
    return this._celsius;
  }

  // Setter — assigned as a property: temp.celsius = 100
  set celsius(value) {
    if (typeof value !== "number") {
      throw new TypeError("Temperature must be a number.");
    }
    if (value < -273.15) {
      throw new RangeError("Temperature cannot be below absolute zero.");
    }
    this._celsius = value;
  }

  // Computed getter — derived from celsius, no separate storage
  get fahrenheit() {
    return this._celsius * 9/5 + 32;
  }

  get kelvin() {
    return this._celsius + 273.15;
  }
}

const temp = new Temperature(100);
console.log(temp.celsius);      // Output: 100
console.log(temp.fahrenheit);   // Output: 212
console.log(temp.kelvin);       // Output: 373.15

temp.celsius = 0;
console.log(temp.fahrenheit);   // Output: 32

temp.celsius = -300;
// ❌ RangeError: Temperature cannot be below absolute zero.
```

> ⚠️ **The infinite recursion trap.**
> Inside a setter for `celsius`, never write `this.celsius = value`. That calls the setter again, which calls it again — forever — causing a stack overflow crash.
> Always use a different internal name: `this._celsius = value`.

> 🤔 **Thinking question:** `fahrenheit` has a getter but no setter. What happens if you try to assign `temp.fahrenheit = 212`? Try it and observe the behaviour.

---

## 1.5 — Private Class Fields (`#`)

Private fields (ES2022) are properties that are **completely inaccessible** from outside the class. Not just conventionally private (like `_underscore`) — genuinely enforced by the language.

```js
class BankAccount {
  #balance;      // Must be declared at the top of the class body
  #owner;

  constructor(owner, initialBalance) {
    this.#owner   = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive.");
    this.#balance += amount;
    return this;   // Enable method chaining
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds.");
    this.#balance -= amount;
    return this;
  }

  get balance()  { return this.#balance; }
  get owner()    { return this.#owner; }
  get summary()  { return `${this.#owner}: £${this.#balance.toLocaleString()}`; }
}

const acc = new BankAccount("Alice", 1000);
acc.deposit(500).withdraw(200);            // Chaining works
console.log(acc.summary);                  // Output: Alice: £1300
console.log(acc.balance);                  // Output: 1300

console.log(acc.#balance);
// ❌ SyntaxError: Private field '#balance' must be declared in an enclosing class
```

**`#private` vs `_convention` — key differences:**

| Feature | `_underscore` convention | `#privateField` |
|---|---|---|
| Enforced by language? | ❌ No — just a naming hint | ✅ Yes — syntax error if accessed outside |
| Accessible by subclasses? | ✅ Yes (just a name) | ❌ No — even subclasses cannot access |
| Accessible by external code? | ✅ Yes (nothing stops it) | ❌ No |
| Requires declaration? | ❌ No | ✅ Yes — declare at class top |
| ES version | Always available | ES2022+ |

---

## 1.6 — Class Expressions

Just like functions, classes can be defined as expressions and assigned to variables. The class name (if given) is only visible inside the class itself.

```js
// Anonymous class expression:
const Rectangle = class {
  constructor(width, height) {
    this.width  = width;
    this.height = height;
  }
  area() { return this.width * this.height; }
};

const rect = new Rectangle(4, 5);
console.log(rect.area());   // Output: 20

// Named class expression — name only visible inside:
const Shape = class ShapeInternal {
  getType() { return ShapeInternal.name; }
};

const s = new Shape();
console.log(s.getType());    // Output: ShapeInternal
console.log(typeof ShapeInternal);   // Output: undefined  ← not visible outside
```

---

## 1.7 — Class Declarations Are NOT Hoisted Like Functions

Unlike function declarations, class declarations are **not hoisted** in a usable way. Accessing a class before its declaration throws a `ReferenceError`.

```js
const p = new Person("Alice");   // ❌ ReferenceError: Cannot access 'Person' before initialization

class Person {
  constructor(name) { this.name = name; }
}
```

Always define your class before using it.

---

## 1.8 — Classes Are Functions Under the Hood

```js
class Dog {
  constructor(name) { this.name = name; }
  bark() { return this.name + " says: Woof!"; }
}

console.log(typeof Dog);           // Output: function  ← classes ARE functions
console.log(typeof Dog.prototype); // Output: object
console.log(Dog.prototype.bark);   // Output: [Function: bark]  ← on the prototype
```

This confirms that classes don't introduce a new object system — they use the same prototype machinery in a cleaner way.

---

## 1.9 — `instanceof` — Checking Object Type

`instanceof` tests whether an object was created from a particular class (or constructor):

```js
class Animal { }
class Dog extends Animal { }

const rex = new Dog();

console.log(rex instanceof Dog);     // Output: true
console.log(rex instanceof Animal);  // Output: true  ← inherited
console.log(rex instanceof Object);  // Output: true  ← everything is an Object
console.log(rex instanceof Array);   // Output: false
```

---

---

# CHAPTER 2 — CLASS INHERITANCE

---

## What Is Inheritance?

**Inheritance** means one class (the **child** or **subclass**) is built on top of another class (the **parent** or **superclass**). The child automatically gets all the parent's properties and methods, and can add its own or modify (override) ones it needs to change.

**Real-world analogy — job roles:**
A `Manager` is a type of `Employee`. Every employee has a name, salary, and a `clockIn()` action. A manager also has a team and a `conductReview()` action that regular employees don't have. The manager inherits everything an employee has, then adds more on top.

---

## 2.1 — `extends` — Creating a Subclass

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return this.name + " makes a sound.";
  }

  describe() {
    return "I am " + this.name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);       // ← MUST come first — explained below
    this.breed = breed;
  }

  // Override the parent's speak():
  speak() {
    return this.name + " barks: Woof!";
  }

  // New method only Dogs have:
  fetch(item) {
    return this.name + " fetches the " + item + "!";
  }
}

const rex = new Dog("Rex", "Labrador");

console.log(rex.speak());         // Output: Rex barks: Woof!  (overridden)
console.log(rex.describe());      // Output: I am Rex  (inherited from Animal)
console.log(rex.fetch("ball"));   // Output: Rex fetches the ball! (Dog-only)
```

**What `extends` does:**
`class Dog extends Animal` sets up the prototype chain so that `Dog.prototype`'s prototype is `Animal.prototype`. This means Dog instances can access Animal's methods through the chain.

---

## 2.2 — `super()` — Calling the Parent Constructor

`super()` inside a subclass constructor calls the **parent class's constructor**. This is how the parent's `this.name = name` line (and any other parent setup) runs for the child instance.

```js
class Vehicle {
  constructor(make, speed) {
    this.make  = make;
    this.speed = speed;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    return this.make + " started.";
  }

  stop() {
    this.isRunning = false;
    return this.make + " stopped.";
  }
}

class ElectricCar extends Vehicle {
  constructor(make, speed, batteryKwh) {
    super(make, speed);         // Runs Vehicle's constructor: sets make, speed, isRunning
    this.batteryKwh = batteryKwh;  // Then adds ElectricCar's own property
    this.chargeLevel = 100;
  }

  charge(percent) {
    this.chargeLevel = Math.min(100, this.chargeLevel + percent);
    return "Battery at " + this.chargeLevel + "%";
  }
}

const tesla = new ElectricCar("Tesla", 250, 75);

console.log(tesla.make);          // Output: Tesla   (set by super())
console.log(tesla.batteryKwh);    // Output: 75      (set by ElectricCar)
console.log(tesla.start());       // Output: Tesla started.  (inherited)
console.log(tesla.charge(0));     // Output: Battery at 100%  (own method)
```

**The `super()` rules — critical:**

| Rule | Explanation |
|---|---|
| `super()` must be called before `this` | If you try to use `this` before `super()`, you get a `ReferenceError` |
| Only required if subclass has a constructor | If no constructor is written, the parent's constructor runs automatically |
| Must be called in the constructor, not elsewhere | `super()` is only valid inside a subclass constructor |

**What happens without a constructor in the child:**

```js
class Cat extends Animal {
  // No constructor defined — JavaScript inserts this automatically:
  // constructor(...args) { super(...args); }
}

const kitty = new Cat("Whiskers");
console.log(kitty.speak());   // Output: Whiskers makes a sound.
// Works perfectly — parent constructor ran via the auto-inserted one
```

---

## 2.3 — Method Overriding

When a subclass defines a method with the **same name** as a parent method, the subclass version takes over. This is called **overriding**.

```js
class Shape {
  constructor(colour) {
    this.colour = colour;
  }

  area() {
    return 0;   // Default — no specific shape yet
  }

  describe() {
    return "A " + this.colour + " shape with area " + this.area().toFixed(2);
  }
}

class Circle extends Shape {
  constructor(colour, radius) {
    super(colour);
    this.radius = radius;
  }

  area() {   // Override Shape's area()
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(colour, width, height) {
    super(colour);
    this.width  = width;
    this.height = height;
  }

  area() {   // Override Shape's area()
    return this.width * this.height;
  }
}

const c = new Circle("red", 5);
const r = new Rectangle("blue", 4, 6);

console.log(c.describe());   // Output: A red shape with area 78.54
console.log(r.describe());   // Output: A blue shape with area 24.00
```

Notice that `describe()` is defined only once in `Shape`. It calls `this.area()` — and because `this` refers to the actual object (a `Circle` or `Rectangle`), the overridden version of `area()` runs. This powerful behaviour is called **polymorphism**: the same method call produces different results depending on the actual type of the object.

---

## 2.4 — `super` for Calling Parent Methods

`super.methodName()` calls the **parent class's version** of an overridden method. This lets you extend, not just replace, the parent's behaviour.

```js
class Animal {
  constructor(name, sound) {
    this.name  = name;
    this.sound = sound;
  }

  toString() {
    return this.name + " (" + this.sound + ")";
  }
}

class PetAnimal extends Animal {
  constructor(name, sound, owner) {
    super(name, sound);
    this.owner = owner;
  }

  toString() {
    return super.toString() + " — owned by " + this.owner;
    //     ↑ calls Animal's toString(), then appends more information
  }
}

class TrainedPet extends PetAnimal {
  constructor(name, sound, owner, tricks) {
    super(name, sound, owner);
    this.tricks = tricks;
  }

  toString() {
    return super.toString() + " | Tricks: " + this.tricks.join(", ");
    //     ↑ calls PetAnimal's toString() (which itself calls Animal's)
  }
}

const buddy = new TrainedPet("Buddy", "Woof", "Sara", ["sit", "stay", "roll over"]);
console.log(buddy.toString());
// Output: Buddy (Woof) — owned by Sara | Tricks: sit, stay, roll over
```

**`super.method()` vs `super()` — the distinction:**

| Syntax | Where used | What it does |
|---|---|---|
| `super(args)` | Inside constructor only | Calls the parent's constructor |
| `super.method(args)` | Inside any method | Calls the parent's version of that method |

---

## 2.5 — Multi-Level Inheritance

You can chain multiple levels of inheritance. Each level inherits from the one above it.

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age  = age;
  }
  greet() { return "Hi, I'm " + this.name; }
}

class Employee extends Person {
  constructor(name, age, company, salary) {
    super(name, age);
    this.company = company;
    this.salary  = salary;
  }
  introduce() {
    return super.greet() + ", I work at " + this.company;
  }
}

class Manager extends Employee {
  constructor(name, age, company, salary, teamSize) {
    super(name, age, company, salary);
    this.teamSize = teamSize;
  }
  introduce() {
    return super.introduce() + " and manage a team of " + this.teamSize;
  }
}

const mgr = new Manager("Alice", 35, "Anthropic", 120000, 8);
console.log(mgr.introduce());
// Output: Hi, I'm Alice, I work at Anthropic and manage a team of 8

// instanceof checks the full chain:
console.log(mgr instanceof Manager);   // Output: true
console.log(mgr instanceof Employee);  // Output: true
console.log(mgr instanceof Person);    // Output: true
```

**Visualising the prototype chain:**

```
mgr  →  Manager.prototype  →  Employee.prototype  →  Person.prototype  →  Object.prototype  →  null

Property lookup for mgr.greet():
  mgr itself?           → no
  Manager.prototype?    → no
  Employee.prototype?   → no
  Person.prototype?     → YES — found greet()
```

---

## 2.6 — Mixins — Multiple Behaviour Sources

JavaScript only supports **single inheritance** (a class can only `extend` one other class). When you need to compose behaviour from multiple sources, use **mixins** — plain objects or functions that add methods to a class.

```js
// Mixin 1: Adds serialisation behaviour
const Serialisable = (Base) => class extends Base {
  toJSON() {
    return JSON.stringify(this);
  }
  toObject() {
    return Object.assign({}, this);
  }
};

// Mixin 2: Adds timestamp tracking
const Timestamped = (Base) => class extends Base {
  constructor(...args) {
    super(...args);
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
  touch() {
    this.updatedAt = new Date().toISOString();
    return this;
  }
};

// Base class:
class User {
  constructor(name, email) {
    this.name  = name;
    this.email = email;
  }
}

// Compose User + both mixins:
class TrackedUser extends Serialisable(Timestamped(User)) {}

const u = new TrackedUser("Alice", "alice@example.com");
console.log(u.name);        // Output: Alice
console.log(u.createdAt);   // Output: current ISO timestamp
console.log(u.toJSON());    // Output: JSON string of all properties
u.touch();
console.log(u.updatedAt);   // Output: updated timestamp
```

> 💡 **Mixins in the real world:** Libraries like React used mixins heavily before class syntax. Vue.js still uses a mixin pattern for shared component logic. Understanding mixins is essential for reading professional JavaScript codebases.

---

## 2.7 — Inheritance vs Composition — When to Use Each

**Inheritance** (`extends`) models an "is-a" relationship:
- A `Dog` *is a* `Animal` ✅
- An `ElectricCar` *is a* `Vehicle` ✅
- A `Manager` *is an* `Employee` ✅

**Composition** (passing objects as properties) models a "has-a" relationship:
- A `Car` *has an* `Engine` ✅
- A `User` *has an* `Address` ✅
- A `Team` *has* `Member`s ✅

```js
// Inheritance — correct: Dog IS-A Animal
class Dog extends Animal { }

// Composition — correct: Car HAS-AN Engine (not: Car extends Engine)
class Engine {
  constructor(horsepower) { this.horsepower = horsepower; }
  start() { return "Engine running at " + this.horsepower + "hp"; }
}

class Car {
  constructor(brand, engineHp) {
    this.brand  = brand;
    this.engine = new Engine(engineHp);   // Composition — Engine is a property
  }
  start() { return this.brand + ": " + this.engine.start(); }
}

const car = new Car("Toyota", 150);
console.log(car.start());   // Output: Toyota: Engine running at 150hp
```

> 💡 **Professional rule of thumb:** "Prefer composition over inheritance." Only use `extends` when the relationship is genuinely "is-a" and will remain so throughout the codebase. Deep inheritance chains (5+ levels) become very hard to maintain.

---

---

# CHAPTER 3 — STATIC METHODS AND PROPERTIES

---

## What Is "Static"?

Everything you've learned so far — constructor properties, methods, getters — belongs to **instances**: individual objects created with `new`. You must have an object to use them.

**Static** members are the opposite: they belong to the **class itself**, not to any instance. You call them directly on the class name.

**Real-world analogy:**
A hospital has many patients (instances). Each patient has their own blood type, name, and treatment plan (instance properties). But the hospital also has a central statistic: "Total patients seen this year." That number belongs to the hospital as a whole — not to any individual patient. That is a static property.

---

## 3.1 — Static Methods

A `static` method is defined on the class and called on the class — never on an instance.

```js
class MathUtils {
  static add(a, b)      { return a + b; }
  static subtract(a, b) { return a - b; }
  static multiply(a, b) { return a * b; }
  static divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero.");
    return a / b;
  }
  static square(n) { return n * n; }
  static clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}

// Called on the CLASS — no 'new', no instance:
console.log(MathUtils.add(10, 5));         // Output: 15
console.log(MathUtils.square(7));          // Output: 49
console.log(MathUtils.clamp(150, 0, 100)); // Output: 100

// ❌ Cannot call on an instance:
const utils = new MathUtils();
utils.add(1, 2);   // TypeError: utils.add is not a function
```

**Why use static methods?**
`MathUtils` has no state — no properties that differ between "instances." Creating an instance (`new MathUtils()`) would be pointless. Static methods group related utility functions under a class name without requiring instantiation.

---

## 3.2 — Static Properties

Static properties store data that belongs to the class — shared across all instances, or not needing an instance at all.

```js
class Counter {
  static count = 0;   // Shared across all instances

  constructor(name) {
    this.name = name;
    Counter.count++;   // Increment the class-level counter
    this.id = Counter.count;
  }

  static getCount() {
    return "Total instances created: " + Counter.count;
  }

  static reset() {
    Counter.count = 0;
  }
}

const a = new Counter("Alpha");
const b = new Counter("Beta");
const c = new Counter("Gamma");

console.log(Counter.count);        // Output: 3
console.log(Counter.getCount());   // Output: Total instances created: 3
console.log(a.id);                 // Output: 1
console.log(b.id);                 // Output: 2
console.log(c.id);                 // Output: 3

Counter.reset();
console.log(Counter.count);        // Output: 0
```

> 💡 **`Counter.count` vs `this.count` inside the constructor**
> Inside the constructor, `this` is the new instance. Writing `this.count++` would create a separate `count` property on each instance — completely independent. Writing `Counter.count++` updates the single class-level property shared by all instances. Never confuse the two.

---

## 3.3 — Static vs Instance — Side-by-Side Comparison

```js
class Product {
  static taxRate    = 0.2;   // Same for all products — belongs to the class
  static catalogue  = [];    // Shared list — belongs to the class

  constructor(name, price) {
    this.name  = name;       // Unique per product — belongs to the instance
    this.price = price;      // Unique per product — belongs to the instance
    Product.catalogue.push(this);   // Register this instance in the class catalogue
  }

  // Instance method — uses 'this' (the specific product):
  getPriceWithTax() {
    return this.price * (1 + Product.taxRate);
  }

  // Static method — works on the whole catalogue:
  static findByName(name) {
    return Product.catalogue.find(p => p.name.toLowerCase() === name.toLowerCase());
  }

  static getTotalValue() {
    return Product.catalogue.reduce((sum, p) => sum + p.price, 0);
  }

  static clearCatalogue() {
    Product.catalogue = [];
  }
}

const p1 = new Product("Laptop",     899);
const p2 = new Product("Headphones", 59);
const p3 = new Product("Webcam",     79);

// Instance methods — call on a specific product:
console.log(p1.getPriceWithTax());    // Output: 1078.8  (899 × 1.2)

// Static methods — call on the class:
console.log(Product.getTotalValue()); // Output: 1037
const found = Product.findByName("webcam");
console.log(found.price);             // Output: 79

// Static property — accessed on the class:
console.log(Product.taxRate);         // Output: 0.2
console.log(Product.catalogue.length); // Output: 3
```

**Full comparison table:**

| Feature | Instance Member | Static Member |
|---|---|---|
| Belongs to | Each individual object | The class itself |
| Accessed via | `instance.property` | `ClassName.property` |
| Available via `this` inside? | Instance methods: ✅ | Static methods: ❌ (no `this.name` etc.) |
| Created when? | Each time `new` is called | When the class is defined |
| Shared between instances? | ❌ Each instance has its own | ✅ One copy for all |
| Can access other static members? | ❌ Not directly | ✅ Via `ClassName.member` or `this` (in a static context) |

---

## 3.4 — `this` Inside Static Methods

Inside a static method, `this` refers to the **class itself** — not an instance.

```js
class Config {
  static defaultTheme = "light";
  static defaultLang  = "en";

  static getDefaults() {
    // 'this' here is 'Config' the class — same as writing 'Config.defaultTheme'
    return {
      theme: this.defaultTheme,
      lang:  this.defaultLang
    };
  }
}

console.log(Config.getDefaults());   // Output: { theme: 'light', lang: 'en' }
```

This is especially useful when subclasses inherit static members (see Section 3.6).

---

## 3.5 — Static Methods Are Not Inherited by Instances

```js
class StringUtils {
  static capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// On the class: ✅
console.log(StringUtils.capitalise("hello"));   // Output: Hello

// On an instance: ❌
const utils = new StringUtils();
console.log(utils.capitalise);   // Output: undefined
```

If you find yourself wanting to call a static method on an instance, it's usually a sign the method should be an instance method instead.

---

## 3.6 — Inherited Static Members

Static members **are** inherited by subclasses. The subclass can call the parent's static methods and override them.

```js
class Animal {
  static kingdom = "Animalia";

  static classify() {
    return "Kingdom: " + this.kingdom;
    // 'this' here is the class the method is called on
  }
}

class Dog extends Animal {
  static species = "Canis lupus familiaris";
}

class Cat extends Animal {
  static species = "Felis catus";

  // Override the static method:
  static classify() {
    return super.classify() + " | Species: " + this.species;
  }
}

console.log(Animal.classify()); // Output: Kingdom: Animalia
console.log(Dog.kingdom);       // Output: Animalia  ← inherited static property
console.log(Cat.classify());    // Output: Kingdom: Animalia | Species: Felis catus
```

> 💡 **`super` in static methods** works the same as in instance methods — it calls the parent class's version. Inside a static method, `super.method()` calls the parent's static method.

---

## 3.7 — Static Factories — Creating Instances from Different Input Formats

One of the most powerful uses of static methods is creating **factory methods** — alternative constructors that handle different input formats.

```js
class Colour {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  // Named static factories — alternative ways to create a Colour:
  static fromHex(hex) {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return new Colour(r, g, b);
  }

  static fromCSS(cssString) {
    // Parses "rgb(255, 128, 0)"
    const [r, g, b] = cssString.match(/\d+/g).map(Number);
    return new Colour(r, g, b);
  }

  static black()  { return new Colour(0,   0,   0); }
  static white()  { return new Colour(255, 255, 255); }
  static red()    { return new Colour(255, 0,   0); }

  toHex() {
    const hex = (n) => n.toString(16).padStart(2, "0");
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

const c1 = new Colour(255, 128, 0);          // Direct
const c2 = Colour.fromHex("#ff8000");         // From hex string
const c3 = Colour.fromCSS("rgb(255, 128, 0)"); // From CSS
const c4 = Colour.red();                       // Named constant

console.log(c1.toString());   // Output: rgb(255, 128, 0)
console.log(c2.toString());   // Output: rgb(255, 128, 0)
console.log(c3.toHex());      // Output: #ff8000
console.log(c4.toString());   // Output: rgb(255, 0, 0)
```

> 💡 **Factory methods in the real world:** JavaScript's built-in `Date` class uses this pattern: `Date.now()`, `Date.parse()`, and `Date.UTC()` are all static factory/utility methods. You'll also see this in testing libraries, ORMs (database tools), and configuration builders.

---

## 3.8 — Static Initialisation Blocks (ES2022)

For complex static setup that requires more than a single expression, ES2022 introduces static initialisation blocks:

```js
class AppConfig {
  static apiUrl;
  static debug;
  static version;

  static {
    // This block runs once when the class is first loaded
    const env = "production";   // In real code: process.env.NODE_ENV

    if (env === "production") {
      AppConfig.apiUrl = "https://api.myapp.com";
      AppConfig.debug  = false;
    } else {
      AppConfig.apiUrl = "http://localhost:3000";
      AppConfig.debug  = true;
    }

    AppConfig.version = "2.1.0";
    console.log("AppConfig initialised for: " + env);
  }
}

// By the time you use AppConfig, the static block has already run:
console.log(AppConfig.apiUrl);   // Output: https://api.myapp.com
console.log(AppConfig.debug);    // Output: false
```

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Class Basics: Library Book System

**Objective:** Build a `Book` class with proper properties, methods, getters, and setters.

**Scenario:** A library management system needs to track books.

**Warm-up mini-example:**

```js
class Item {
  constructor(name, quantity) {
    this.name     = name;
    this._quantity = quantity;
  }
  get quantity() { return this._quantity; }
  set quantity(val) {
    if (val >= 0) this._quantity = val;
  }
}
const item = new Item("Pen", 5);
item.quantity = 3;
console.log(item.quantity);   // Output: 3
item.quantity = -1;
console.log(item.quantity);   // Output: 3  ← rejected
```

**Step-by-step instructions:**

1. Create a `Book` class with these private fields: `#title`, `#author`, `#isbn`, `#available` (boolean, starts `true`), `#borrowedBy` (starts `null`).
2. Add a constructor accepting `title`, `author`, `isbn`.
3. Add getters for all five fields, plus a computed getter `status` returning either `"Available"` or `"Borrowed by [name]"`.
4. Add these methods:
   - `borrow(borrowerName)` — sets `#available = false`, `#borrowedBy = name`. Throws an error if already borrowed.
   - `returnBook()` — resets both fields. Throws an error if not currently borrowed.
5. Add a `toString()` method returning `"[title] by [author] (ISBN: [isbn]) — [status]"`.
6. Test the full flow: create a book, borrow it, try to borrow it again, return it, borrow it again.

**Self-check questions:**
1. Why use private fields (`#isbn`) instead of regular properties for `isbn`?
2. What would happen if `borrow()` didn't throw an error and just silently failed when the book was already borrowed? What problems could this cause for users of the library?

---

## Exercise 2 — Inheritance: Shapes Hierarchy

**Objective:** Build a three-level shape hierarchy demonstrating override, `super`, and polymorphism.

**Hierarchy:**

```
Shape (colour, area(), perimeter(), describe())
  ├── Circle (radius)
  ├── Rectangle (width, height)
  │     └── Square (side)       ← Square IS-A Rectangle
  └── Triangle (a, b, c)        ← three sides
```

**Warm-up mini-example:**

```js
class Shape {
  constructor(colour) { this.colour = colour; }
  area() { return 0; }
}
class Circle extends Shape {
  constructor(colour, r) { super(colour); this.radius = r; }
  area() { return Math.PI * this.radius ** 2; }
}
const c = new Circle("red", 5);
console.log(c.area().toFixed(2));   // Output: 78.54
```

**Step-by-step instructions:**

1. Build all five classes above.
2. `describe()` should be defined once in `Shape` and call `this.area()` and `this.perimeter()` — using polymorphism to work correctly for all shapes.
3. `Square` should call `super(colour, side, side)` — reusing `Rectangle`'s constructor. Its `describe()` should prepend "Square: " before `super.describe()`.
4. For `Triangle`, area = Heron's formula: `s = (a+b+c)/2; area = √(s(s-a)(s-b)(s-c))`.
5. Create one instance of each shape and call `describe()` on all of them.

**Expected output example (Circle, radius 5):**
```
A red circle — Area: 78.54 | Perimeter: 31.42
```

**Self-check questions:**
1. How many copies of `describe()` exist in memory if you create 100 circles? Why?
2. Why is `Square extends Rectangle` correct? What would be wrong with `Rectangle extends Square`?
3. Try calling `area()` directly on `new Shape("grey")`. What do you get and why?

---

## Exercise 3 — Static Factory and Registry

**Objective:** Use static methods and properties to build a self-tracking object registry.

**Scenario:** A fleet management system for delivery vehicles.

**Step-by-step instructions:**

1. Create a `Vehicle` class with:
   - Static property `fleet = []` (all registered vehicles)
   - Static property `nextId = 1` (auto-incrementing ID)
   - Static method `register(type, plate, capacity)` — factory that creates and registers a vehicle
   - Static method `findByPlate(plate)` — searches `fleet` by plate number
   - Static method `getFleetSummary()` — returns total count, total capacity, and a list of plates
   - Instance properties: `id`, `type`, `plate`, `capacity`, `status` (starts `"idle"`)
   - Instance methods: `dispatch(destination)`, `complete()`, `toString()`
2. `dispatch()` changes status to `"en route to [destination]"`. Throws if already dispatched.
3. `complete()` resets status to `"idle"`.
4. Register 5 vehicles using the static factory. Dispatch 3 of them. Print the fleet summary.

**Expected fleet summary output:**

```
Fleet Summary:
  Total Vehicles: 5
  Total Capacity: [sum]
  Plates: [list]
  En Route: 3 | Idle: 2
```

**Self-check questions:**
1. Why is `fleet` a static property rather than a parameter passed to the constructor?
2. What would happen to the fleet registry if you created a new vehicle using `new Vehicle(...)` directly instead of `Vehicle.register(...)`?

---

## Exercise 4 — Combining Inheritance and Static

**Objective:** Build a notification system where each notification type tracks its own count separately.

**Scenario:** An app logging system with different notification types.

**Step-by-step instructions:**

1. Create a base `Notification` class:
   - Static `allNotifications = []` (shared across all types)
   - Instance properties: `message`, `timestamp`, `id`
   - Static `getAll()`, static `clearAll()`, static `getCount()`
   - Instance method `display()` returning a formatted string

2. Create three subclasses: `InfoNotification`, `WarningNotification`, `ErrorNotification`
   - Each has its own static `typeCount = 0` tracking notifications of that type only
   - Each overrides `display()` to prepend the appropriate prefix: `[INFO]`, `[WARNING]`, `[ERROR]`
   - Each constructor increments both `Notification.allNotifications` (push to array) and its own `typeCount`

3. Create 2 info, 3 warning, and 1 error notification. Print all, then print counts by type.

**Hint:** Each subclass needs its own static property or the subclasses will share the same counter:

```js
class WarningNotification extends Notification {
  static typeCount = 0;   // ← Own counter, separate from Info and Error
  ...
}
```

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Online Learning Platform — Course & Student Management

**Scenario:** You are building the core data layer for an online learning platform. The system tracks courses, students, and enrolments. It uses class inheritance to model different course types (video, live, self-paced), static methods for platform-level operations, private fields for data integrity, and getters/setters for validated access.

This project combines all three chapters:
- Chapter 1: Class syntax, private fields, getters/setters, method chaining
- Chapter 2: Inheritance, `super`, method overriding, polymorphism
- Chapter 3: Static properties (registries), static factories, static analytics

---

### Stage 1 — Base `User` Class and `Student` Subclass

```js
class User {
  static #nextId   = 1;
  static #registry = new Map();   // id → User

  #id;
  #email;
  #name;
  #createdAt;

  constructor(name, email) {
    this.#id        = User.#nextId++;
    this.#name      = name;
    this.#email     = email;
    this.#createdAt = new Date();
    User.#registry.set(this.#id, this);
  }

  get id()        { return this.#id; }
  get name()      { return this.#name; }
  get email()     { return this.#email; }
  get memberSince() {
    return this.#createdAt.toLocaleDateString("en-GB", { year: "numeric", month: "long" });
  }

  set name(value) {
    if (typeof value !== "string" || value.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }
    this.#name = value.trim();
  }

  set email(value) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Invalid email address.");
    }
    this.#email = value;
  }

  toString() {
    return `[User #${this.#id}] ${this.#name} (${this.#email})`;
  }

  // Static registry access:
  static findById(id)        { return User.#registry.get(id) ?? null; }
  static getTotalUsers()     { return User.#registry.size; }
  static getAllUsers()        { return Array.from(User.#registry.values()); }
}

class Student extends User {
  #enrolments;   // Map: courseId → { course, enrolledAt, progress }
  #completedCourses;

  constructor(name, email) {
    super(name, email);
    this.#enrolments       = new Map();
    this.#completedCourses = [];
  }

  get enrolmentCount()     { return this.#enrolments.size; }
  get completedCount()     { return this.#completedCourses.length; }

  enrol(course) {
    if (this.#enrolments.has(course.id)) {
      throw new Error(this.name + " is already enrolled in " + course.title);
    }
    this.#enrolments.set(course.id, {
      course,
      enrolledAt: new Date(),
      progress: 0
    });
    course._registerStudent(this);
    return this;   // Enable chaining
  }

  updateProgress(courseId, percent) {
    const record = this.#enrolments.get(courseId);
    if (!record) throw new Error("Not enrolled in this course.");
    record.progress = Math.min(100, Math.max(0, percent));
    if (record.progress === 100) {
      this.#completedCourses.push({ course: record.course, completedAt: new Date() });
    }
    return this;
  }

  getTranscript() {
    const lines = [`Transcript for ${this.name}:`];
    for (const { course, progress, enrolledAt } of this.#enrolments.values()) {
      const status = progress === 100 ? "✅ Complete" : `${progress}% complete`;
      lines.push(`  ${course.title} — ${status}`);
    }
    return lines.join("\n");
  }

  toString() {
    return super.toString() + ` | Student | ${this.enrolmentCount} courses`;
  }
}
```

---

### Stage 2 — Base `Course` Class and Specialised Subclasses

```js
class Course {
  static #nextId   = 100;
  static #catalogue = new Map();   // id → Course

  #id;
  #title;
  #instructor;
  #maxStudents;
  #students;    // Set of Student instances
  #isOpen;

  constructor(title, instructor, maxStudents = 50) {
    this.#id          = Course.#nextId++;
    this.#title       = title;
    this.#instructor  = instructor;
    this.#maxStudents = maxStudents;
    this.#students    = new Set();
    this.#isOpen      = true;
    Course.#catalogue.set(this.#id, this);
  }

  get id()          { return this.#id; }
  get title()       { return this.#title; }
  get instructor()  { return this.#instructor; }
  get studentCount(){ return this.#students.size; }
  get isFull()      { return this.#students.size >= this.#maxStudents; }
  get isOpen()      { return this.#isOpen; }

  get availableSpots() {
    return this.#maxStudents - this.#students.size;
  }

  // Called by Student.enrol() — underscore indicates "internal use":
  _registerStudent(student) {
    if (!this.#isOpen)  throw new Error(this.#title + " is closed for enrolment.");
    if (this.isFull)    throw new Error(this.#title + " is full.");
    this.#students.add(student);
  }

  close()  { this.#isOpen = false; return this; }
  reopen() { this.#isOpen = true;  return this; }

  // Polymorphic method — each subclass overrides this:
  getFormat() {
    return "Course";
  }

  // Uses polymorphism — calls this.getFormat() which subclass can override:
  describe() {
    return `[${this.getFormat()}] "${this.#title}" by ${this.#instructor} ` +
           `(${this.studentCount}/${this.#maxStudents} students)`;
  }

  // Static catalogue methods:
  static findById(id)      { return Course.#catalogue.get(id) ?? null; }
  static getTotalCourses() { return Course.#catalogue.size; }
  static findByInstructor(name) {
    return Array.from(Course.#catalogue.values())
      .filter(c => c.instructor.toLowerCase().includes(name.toLowerCase()));
  }
  static getOpenCourses() {
    return Array.from(Course.#catalogue.values()).filter(c => c.isOpen);
  }
}

// --- Specialised Course Types ---

class VideoCourse extends Course {
  #videoCount;
  #totalMinutes;

  constructor(title, instructor, videoCount, totalMinutes, maxStudents) {
    super(title, instructor, maxStudents);
    this.#videoCount   = videoCount;
    this.#totalMinutes = totalMinutes;
  }

  get videoCount()    { return this.#videoCount; }
  get totalHours()    { return (this.#totalMinutes / 60).toFixed(1); }

  getFormat() { return "Video Course"; }

  describe() {
    return super.describe() + ` | ${this.#videoCount} videos, ${this.totalHours}h total`;
  }
}

class LiveCourse extends Course {
  #schedule;    // Array of session date strings
  #platform;    // e.g. "Zoom", "Google Meet"

  constructor(title, instructor, schedule, platform, maxStudents = 20) {
    super(title, instructor, maxStudents);
    this.#schedule = schedule;
    this.#platform = platform;
  }

  get sessionCount() { return this.#schedule.length; }
  get nextSession()  { return this.#schedule[0] ?? "No sessions scheduled"; }

  getFormat() { return "Live Course"; }

  describe() {
    return super.describe() +
      ` | ${this.sessionCount} sessions on ${this.#platform} | Next: ${this.nextSession}`;
  }
}

class SelfPacedCourse extends Course {
  #difficulty;  // "beginner", "intermediate", "advanced"
  #prerequisites;

  constructor(title, instructor, difficulty, prerequisites = [], maxStudents = 200) {
    super(title, instructor, maxStudents);
    this.#difficulty    = difficulty;
    this.#prerequisites = prerequisites;
  }

  get difficulty()     { return this.#difficulty; }
  get prerequisites()  { return [...this.#prerequisites]; }
  get hasPrereqs()     { return this.#prerequisites.length > 0; }

  getFormat() { return "Self-Paced"; }

  describe() {
    const prereqStr = this.hasPrereqs
      ? ` | Prereqs: ${this.#prerequisites.join(", ")}`
      : "";
    return super.describe() + ` | Level: ${this.#difficulty}` + prereqStr;
  }
}
```

---

### Stage 3 — Platform Analytics (Static Class)

```js
class PlatformAnalytics {
  // This class is never instantiated — all methods are static.
  // It acts as a namespace for reporting functions.
  constructor() {
    throw new Error("PlatformAnalytics cannot be instantiated. Use static methods only.");
  }

  static getOverview() {
    return {
      totalUsers:    User.getTotalUsers(),
      totalCourses:  Course.getTotalCourses(),
      openCourses:   Course.getOpenCourses().length,
    };
  }

  static getTopCourses(limit = 3) {
    return Course.getOpenCourses()
      .sort((a, b) => b.studentCount - a.studentCount)
      .slice(0, limit)
      .map(c => ({ title: c.title, students: c.studentCount, format: c.getFormat() }));
  }

  static printReport() {
    const overview = PlatformAnalytics.getOverview();
    console.log("\n======= PLATFORM REPORT =======");
    console.log(`Total users:    ${overview.totalUsers}`);
    console.log(`Total courses:  ${overview.totalCourses}`);
    console.log(`Open for enrol: ${overview.openCourses}`);

    console.log("\n--- Top Courses by Enrolment ---");
    PlatformAnalytics.getTopCourses().forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.title} [${c.format}] — ${c.students} students`);
    });

    console.log("\n--- Open Courses ---");
    Course.getOpenCourses().forEach(c => console.log("  " + c.describe()));
    console.log("================================\n");
  }
}
```

---

### Stage 4 — Running the Full Platform

```js
// --- Create Courses ---
const jsCourse = new VideoCourse(
  "JavaScript Fundamentals", "Dr. Obi", 24, 360, 100
);
const reactCourse = new LiveCourse(
  "React Masterclass", "Dr. Obi",
  ["2026-04-01", "2026-04-08", "2026-04-15", "2026-04-22"],
  "Zoom", 15
);
const pythonCourse = new SelfPacedCourse(
  "Python for Data Science", "Prof. Eze", "intermediate",
  ["Python Basics"], 500
);
const cssWorkshop = new LiveCourse(
  "Advanced CSS Workshop", "Sara Adeyemi",
  ["2026-05-10", "2026-05-17"],
  "Google Meet", 25
);

// --- Create Students ---
const alice = new Student("Alice Johnson", "alice@example.com");
const bob   = new Student("Bob Williams",  "bob@example.com");
const carol = new Student("Carol Smith",   "carol@example.com");

// --- Enrolments ---
alice.enrol(jsCourse).enrol(reactCourse);        // Method chaining
bob.enrol(jsCourse).enrol(pythonCourse).enrol(cssWorkshop);
carol.enrol(reactCourse).enrol(pythonCourse);

// --- Update Progress ---
alice.updateProgress(jsCourse.id, 75);
alice.updateProgress(reactCourse.id, 100);       // Course complete!
bob.updateProgress(jsCourse.id, 40);
bob.updateProgress(pythonCourse.id, 20);

// --- Print Transcripts ---
console.log(alice.getTranscript());
// Output:
// Transcript for Alice Johnson:
//   JavaScript Fundamentals — 75% complete
//   React Masterclass — ✅ Complete

console.log(bob.getTranscript());
// Output:
// Transcript for Bob Williams:
//   JavaScript Fundamentals — 40% complete
//   Python for Data Science — 20% complete
//   Advanced CSS Workshop — 0% complete

// --- Platform Report ---
PlatformAnalytics.printReport();
// Output:
// ======= PLATFORM REPORT =======
// Total users:    3
// Total courses:  4
// Open for enrol: 4
//
// --- Top Courses by Enrolment ---
//   1. JavaScript Fundamentals [Video Course] — 2 students
//   2. React Masterclass [Live Course] — 2 students
//   3. Python for Data Science [Self-Paced] — 2 students
//
// --- Open Courses ---
//   [Video Course] "JavaScript Fundamentals" by Dr. Obi (2/100 students) | 24 videos, 6.0h total
//   [Live Course] "React Masterclass" by Dr. Obi (2/15 students) | 4 sessions on Zoom | Next: 2026-04-01
//   [Self-Paced] "Python for Data Science" by Prof. Eze (2/500 students) | Level: intermediate | Prereqs: Python Basics
//   [Live Course] "Advanced CSS Workshop" by Sara Adeyemi (1/25 students) | 2 sessions on Google Meet | Next: 2026-05-10
// ================================
```

---

### Stage 5 — Advanced Challenge: Course Recommendation Engine

Add a static method `recommend(student, limit)` to `PlatformAnalytics` that suggests courses the student hasn't taken yet, prioritised by enrolment count:

```js
static recommend(student, limit = 3) {
  const enrolled = new Set(
    // You'll need to access the student's enrolments here.
    // Hint: add a getter to Student that exposes enrolled course IDs
  );

  return Course.getOpenCourses()
    .filter(course => !enrolled.has(course.id))
    .sort((a, b) => b.studentCount - a.studentCount)
    .slice(0, limit);
}
```

**Steps:**
1. Add a `get enrolledCourseIds()` getter to `Student` that returns a Set of course IDs.
2. Complete the `recommend` static method.
3. Test: `PlatformAnalytics.recommend(alice)` should not suggest JavaScript or React (she's already in both).

**Reflection questions:**

1. `PlatformAnalytics` throws in its constructor to prevent instantiation. What does this enforce architecturally? Could you achieve the same effect with a different class design approach?
2. The `Course` class uses `Set` for students (not `Array`). What is the benefit? (Hint: what happens if `_registerStudent` is called twice for the same student?)
3. `_registerStudent` is prefixed with `_` instead of being a private field `#`. Why might a public (but conventionally private) method be preferable here over a truly private one, considering how `Student.enrol()` needs to call it?
4. Static registries (`User.#registry`, `Course.#catalogue`) accumulate entries indefinitely. In a real server application running continuously, how would this become a problem, and how would you solve it?
5. The `getFormat()` method in `Course` returns `"Course"` and is overridden by each subclass. What alternative design would completely prevent forgetting to override it in new subclasses? (Hint: think "abstract method" pattern.)

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What is the difference between a class and an instance?

**Q2:** A class has a property that should be validated before being set. Write a setter for an `age` property that rejects values below 0 or above 120.

**Q3:** Write a subclass `ElectricVehicle` that extends `Vehicle(make, range)` and adds a `batteryLevel` property (starts at 100). Add a `drive(km)` method that reduces battery by 1% per 5km (and throws an error if battery is too low).

**Q4:** What does `super()` do, and where must it appear in a subclass constructor?

**Q5:** What is method overriding? How do you call the parent's version of an overridden method?

**Q6:** What is the difference between an instance method and a static method?

**Q7:** Given this code, what is logged and why?

```js
class Counter {
  static count = 0;
  constructor() { Counter.count++; }
}
const a = new Counter();
const b = new Counter();
console.log(a.count);      // ?
console.log(Counter.count); // ?
```

**Q8:** What is a static factory method? Give a real-world example of when you'd use one.

**Q9:** What does `this` refer to inside a static method?

**Q10:** What is the difference between `const obj = new MyClass()` where the class has `Object.freeze` called on it, vs using private fields (`#`) to protect data?

---

## Answer Key

**A1:** A **class** is the blueprint — it defines what properties and methods objects of that type will have. An **instance** is a specific object created from that blueprint using `new`. You can have many instances from one class, each with their own property values.

**A2:**
```js
set age(value) {
  if (typeof value !== "number" || value < 0 || value > 120) {
    throw new RangeError("Age must be between 0 and 120.");
  }
  this._age = value;
}
```

**A3:**
```js
class ElectricVehicle extends Vehicle {
  constructor(make, range) {
    super(make, range);
    this.batteryLevel = 100;
  }
  drive(km) {
    const drain = km / 5;
    if (drain > this.batteryLevel) throw new Error("Not enough battery.");
    this.batteryLevel -= drain;
    return this.make + " drove " + km + "km. Battery: " + this.batteryLevel + "%";
  }
}
```

**A4:** `super()` calls the parent class's constructor, running its setup code on the child's new object. It must appear **before any use of `this`** in a subclass constructor — accessing `this` before `super()` throws a `ReferenceError`.

**A5:** **Overriding** is when a subclass defines a method with the same name as one in the parent, replacing its behaviour. Call the parent's version using `super.methodName()`.

**A6:** An **instance method** is called on an object created with `new` and has access to that object via `this`. A **static method** is called on the class itself (not on an instance), uses the class as `this`, and cannot access instance properties.

**A7:**
- `a.count` → `undefined`. Static properties don't exist on instances.
- `Counter.count` → `2`. The static property is incremented by both constructor calls.

**A8:** A static factory method is an alternative constructor that creates and returns an instance. Used when you want to create objects from different input formats (e.g., `Colour.fromHex("#ff8000")` vs `new Colour(255, 128, 0)`), or when the creation might fail and you want to return `null` instead of throwing.

**A9:** Inside a static method, `this` refers to the **class itself** — so `this.staticProperty` works, but `this.instanceProperty` does not.

**A10:** `Object.freeze()` makes an existing object's properties unmodifiable after the fact. Private fields (`#`) are enforced at the language level during class definition — they are structurally inaccessible from outside the class, regardless of any runtime freeze. Private fields also offer validation via setters. `Object.freeze` is shallow; private fields are genuinely encapsulated.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can define a class with constructor, methods, getters, and setters | ✓ |
| 2 | Understand what `new` does step-by-step | ✓ |
| 3 | Can use private class fields (`#`) and explain how they differ from `_underscore` | ✓ |
| 4 | Understand why class methods go on the prototype (memory efficiency) | ✓ |
| 5 | Can use `extends` and `super()` to create a subclass | ✓ |
| 6 | Can override parent methods and call the parent version with `super.method()` | ✓ |
| 7 | Understand multi-level inheritance and can trace the prototype chain | ✓ |
| 8 | Can explain and demonstrate polymorphism | ✓ |
| 9 | Know when to use inheritance ("is-a") vs composition ("has-a") | ✓ |
| 10 | Can define static properties and methods and explain what they're for | ✓ |
| 11 | Understand what `this` refers to inside a static method | ✓ |
| 12 | Can build static factory methods and explain their advantage | ✓ |
| 13 | Built the full Learning Platform project combining all three chapters | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Calling a class without `new` | Forgetting `new` — looks like a function call | Always use `new ClassName()` |
| `this` before `super()` | `this` doesn't exist until parent sets it up | Always call `super()` first |
| Not calling `super()` at all | Subclass constructor exists but forgot `super` | Every subclass constructor must call `super()` |
| `this.prop` inside a setter for `prop` | Calls the setter again → infinite recursion → crash | Use `this._prop` or `this.#prop` as internal storage |
| Accessing `ClassName.count` as `instance.count` | Static properties don't exist on instances | Access static members via `ClassName.member` |
| Deep inheritance chains (5+ levels) | Each level adds complexity and coupling | Prefer composition; keep inheritance shallow |
| Forgetting `static` count is shared | Assuming each instance has its own count | Static = one copy for all; instance = one per object |
| Using `#` without declaring at class top | Private fields must be declared before use | Add `#fieldName;` declaration at the class body start |
| `instanceof` check after `Object.create` | `instanceof` checks the prototype chain | Always use `extends` for proper instanceof support |
| Classes are not hoisted | Accessing a class before its definition | Always define classes before using them |

---

## One-Sentence Summary

> JavaScript classes provide a clean, readable blueprint syntax for creating objects — supporting private fields, getters/setters, and method definitions on the prototype — which can be extended through inheritance using `extends` and `super`, and enriched with static members that belong to the class itself rather than to any individual instance.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Classes (3 pages)*
