---
render_with_liquid: false
title: "JavaScript Meta Programming: Meta Programming Concepts · Reflect API · Proxy API · Complete Reference"
nav_order: 36
---

> **How to use this tutorial**
> Meta programming is the art of writing code that controls, inspects, or transforms *other code* — at runtime. It is the foundation of JavaScript frameworks, validation libraries, reactive systems, and developer tools. This is advanced territory, but every concept is taught from first principles.
>
> - **Phase 1 – Comprehension:** Full explanations, every method demonstrated, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project combining all chapters

---

# TABLE OF CONTENTS
1. [Chapter 1 — What Is Meta Programming?](#chapter-1--what-is-meta-programming)
2. [Chapter 2 — The Reflect API](#chapter-2--the-reflect-api)
3. [Chapter 3 — The Proxy API](#chapter-3--the-proxy-api)
4. [Chapter 4 — Meta Programming Reference](#chapter-4--meta-programming-reference)
5. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
6. [Phase 3 — Project Simulation](#phase-3--project-simulation)
7. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — WHAT IS META PROGRAMMING?

## The Core Idea

**Meta programming** means writing code that has knowledge of — or control over — other code at runtime. The prefix "meta" means "about itself": meta programming is **programming about programming**.

In practical terms, meta programming lets you:

| Goal | Example |
|---|---|
| **Intercept** property access | Log every time any property on an object is read |
| **Intercept** property writes | Validate data before it's stored on an object |
| **Intercept** function calls | Measure how long any function takes to run |
| **Reflect** on code structure | Ask: "Does this object have this property?" |
| **Create** new behaviour dynamically | Build objects that respond intelligently to any property name |
| **Protect** objects | Make objects that refuse invalid operations |

---

## 1.1 — Real-World Analogy: The Hotel Concierge

Imagine a hotel with a **concierge** standing between you and all hotel services. Instead of going directly to housekeeping, the restaurant, or the spa, every request goes through the concierge first.

The concierge can:
- **Allow** the request and pass it through unchanged
- **Modify** the request before passing it on ("I'll upgrade your room")
- **Reject** the request ("The spa is closed")
- **Log** the request ("Noting that Room 204 asked for towels at 2pm")
- **Fake** a response entirely ("The restaurant is fully booked — I'll tell you it's open to avoid disappointing you")

This is exactly what a **Proxy** does in JavaScript: it stands between your code and an object, intercepting every interaction.

---

## 1.2 — Before Meta Programming: The Limitations

Without meta programming tools, JavaScript has no built-in way to intercept property access. You can't say "run this code whenever anyone reads or writes any property on this object."

You can fake it:

```js
// ❌ Manual approach — tedious and doesn't scale:
const user = {
  _name: "Alice",
  get name() {
    console.log("name was read");    // Only works for known properties
    return this._name;
  },
  set name(val) {
    console.log("name was written"); // Must write this for EVERY property
    this._name = val;
  }
};
```

This only works if you know every property name in advance and manually write getters/setters for each. If the object has 50 properties — or unknown properties — this falls apart.

**Meta programming solves this.** With `Proxy`, one handler intercepts operations on *any* property, known or unknown.

---

## 1.3 — The Two Pillars: Reflect and Proxy

JavaScript's meta programming is built on two APIs introduced in ES6 (2015):

| API | Role | Analogy |
|---|---|---|
| **`Reflect`** | A clean, functional interface to JavaScript's fundamental operations | A standardised set of tools for directly performing built-in operations |
| **`Proxy`** | A wrapper that intercepts operations on an object | The hotel concierge — intercepts every request |

They are designed to work together: `Proxy` traps intercept operations; `Reflect` methods perform the default version of those same operations. You'll see this combination constantly.

---

## 1.4 — What Can Be Intercepted?

JavaScript defines a set of **fundamental operations** — the basic things that can happen to an object. Both `Reflect` and `Proxy` are organised around this same list:

| Fundamental Operation | When It Happens |
|---|---|
| `get` | Reading a property: `obj.name` |
| `set` | Writing a property: `obj.name = "Alice"` |
| `has` | Checking existence: `"name" in obj` |
| `deleteProperty` | Deleting: `delete obj.name` |
| `apply` | Calling a function: `fn()` |
| `construct` | Creating with new: `new MyClass()` |
| `defineProperty` | `Object.defineProperty(obj, ...)` |
| `getOwnPropertyDescriptor` | `Object.getOwnPropertyDescriptor(obj, ...)` |
| `getPrototypeOf` | `Object.getPrototypeOf(obj)` |
| `setPrototypeOf` | `Object.setPrototypeOf(obj, proto)` |
| `isExtensible` | `Object.isExtensible(obj)` |
| `preventExtensions` | `Object.preventExtensions(obj)` |
| `ownKeys` | `Object.keys(obj)`, `for...in`, `Object.getOwnPropertyNames()` |

Every one of these can be intercepted with a Proxy trap and performed reflectively with `Reflect`.

---

---

# CHAPTER 2 — THE REFLECT API

---

## What Is Reflect?

`Reflect` is a built-in object — not a constructor (you never write `new Reflect()`) — that provides **static methods for interceptable JavaScript operations**. Every method on `Reflect` corresponds directly to a fundamental operation from the list above.

**Why does Reflect exist if these operations already worked without it?**

Three reasons:

1. **Consistency** — Before `Reflect`, these operations were scattered across `Object`, function calls, and operators. `Reflect` puts them all in one place with a uniform API.
2. **Return values** — Old methods either threw errors or returned the object for chaining. `Reflect` methods return meaningful values: `true`/`false` for success/failure.
3. **Proxy companion** — Inside Proxy traps, `Reflect` is the clean, safe way to perform the *default* operation after your custom logic runs.

---

## 2.1 — `Reflect.get()` — Reading a Property

Equivalent to `obj[key]` but as a function call:

```js
const person = { name: "Alice", age: 30 };

// Traditional:
console.log(person.name);           // Output: Alice
console.log(person["age"]);         // Output: 30

// Reflect:
console.log(Reflect.get(person, "name"));   // Output: Alice
console.log(Reflect.get(person, "age"));    // Output: 30
```

**With a custom `this` (the `receiver` argument):**

```js
const obj = {
  _value: 42,
  get value() { return this._value; }
};

const other = { _value: 99 };

// Read obj's 'value' getter, but with 'other' as 'this':
console.log(Reflect.get(obj, "value", other));   // Output: 99
```

The third argument `receiver` overrides what `this` is inside getters. This is used by Proxy to ensure getters on the target receive the proxy as `this`, not the raw target.

---

## 2.2 — `Reflect.set()` — Writing a Property

Equivalent to `obj[key] = value` but returns a boolean:

```js
const car = { brand: "Toyota", speed: 0 };

const success = Reflect.set(car, "speed", 60);
console.log(success);       // Output: true
console.log(car.speed);     // Output: 60

// On a frozen object — returns false instead of throwing:
const frozen = Object.freeze({ x: 1 });
const result = Reflect.set(frozen, "x", 99);
console.log(result);    // Output: false  ← did not succeed
console.log(frozen.x);  // Output: 1     ← unchanged
```

> 💡 **Why `true`/`false` matters:** The old way of setting a property (`obj[key] = value`) silently fails on frozen/sealed objects (or throws in strict mode). `Reflect.set` always returns `false` on failure — no exception needed, no silent ignore. Your code can react to the result.

---

## 2.3 — `Reflect.has()` — Checking Property Existence

Equivalent to the `in` operator:

```js
const book = { title: "1984", author: "Orwell" };

console.log("title"  in book);               // Output: true
console.log(Reflect.has(book, "title"));      // Output: true
console.log(Reflect.has(book, "publisher"));  // Output: false

// Also checks prototype chain, just like 'in':
console.log(Reflect.has(book, "toString"));   // Output: true  ← from Object.prototype
```

---

## 2.4 — `Reflect.deleteProperty()` — Deleting a Property

Equivalent to `delete obj[key]`, but returns a boolean:

```js
const config = { host: "localhost", port: 3000, debug: true };

console.log(Reflect.deleteProperty(config, "debug"));   // Output: true
console.log(config);   // Output: { host: 'localhost', port: 3000 }

// On a non-configurable property — returns false:
const obj = {};
Object.defineProperty(obj, "id", { value: 1, configurable: false });
console.log(Reflect.deleteProperty(obj, "id"));   // Output: false
console.log(obj.id);                               // Output: 1  ← still there
```

---

## 2.5 — `Reflect.apply()` — Calling a Function

Equivalent to `Function.prototype.apply()` but cleaner:

```js
function greet(greeting, punctuation) {
  return greeting + ", " + this.name + punctuation;
}

const person = { name: "Alice" };

// Old way:
const result1 = Function.prototype.apply.call(greet, person, ["Hello", "!"]);

// Reflect way — much cleaner:
const result2 = Reflect.apply(greet, person, ["Hello", "!"]);

console.log(result1);   // Output: Hello, Alice!
console.log(result2);   // Output: Hello, Alice!
```

`Reflect.apply(targetFn, thisArg, argsArray)` — identical semantics to `fn.apply(thisArg, argsArray)` but works even if `fn.apply` has been overridden.

---

## 2.6 — `Reflect.construct()` — Calling a Constructor

Equivalent to `new Constructor(...args)`:

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Traditional:
const p1 = new Point(3, 4);

// Reflect:
const p2 = Reflect.construct(Point, [3, 4]);

console.log(p1);   // Output: Point { x: 3, y: 4 }
console.log(p2);   // Output: Point { x: 3, y: 4 }
```

**Advanced use — constructing an instance of one class using another's constructor:**

```js
class Base {
  constructor(value) { this.value = value; }
}

class Derived extends Base {}

// Create an instance whose prototype chain follows 'Derived',
// but initialised using 'Base's constructor:
const obj = Reflect.construct(Base, [42], Derived);

console.log(obj instanceof Derived);  // Output: true
console.log(obj.value);               // Output: 42
```

This is how transpilers (like Babel) implement `super()` calls.

---

## 2.7 — `Reflect.defineProperty()` — Defining a Property Descriptor

Equivalent to `Object.defineProperty()` but returns a boolean instead of throwing:

```js
const obj = {};

const success = Reflect.defineProperty(obj, "id", {
  value:        1001,
  writable:     false,
  enumerable:   true,
  configurable: false
});

console.log(success);   // Output: true
console.log(obj.id);    // Output: 1001
```

---

## 2.8 — `Reflect.getOwnPropertyDescriptor()` — Reading a Descriptor

Equivalent to `Object.getOwnPropertyDescriptor()`:

```js
const user = { name: "Alice" };

const desc = Reflect.getOwnPropertyDescriptor(user, "name");
console.log(desc);
// Output: { value: 'Alice', writable: true, enumerable: true, configurable: true }
```

---

## 2.9 — `Reflect.getPrototypeOf()` and `Reflect.setPrototypeOf()`

```js
class Animal {}
class Dog extends Animal {}

const rex = new Dog();

// Get:
console.log(Reflect.getPrototypeOf(rex) === Dog.prototype);      // Output: true
console.log(Reflect.getPrototypeOf(Dog.prototype) === Animal.prototype); // Output: true

// Set:
const base = { type: "generic" };
const child = { name: "child" };

Reflect.setPrototypeOf(child, base);
console.log(child.type);   // Output: generic  ← inherited
```

---

## 2.10 — `Reflect.ownKeys()` — All Own Property Keys

Returns all own keys — including non-enumerable ones and Symbol keys:

```js
const sym = Symbol("id");
const obj = {
  name:  "Alice",
  age:   30,
  [sym]: 9999
};

Object.defineProperty(obj, "hidden", { value: "secret", enumerable: false });

console.log(Object.keys(obj));           // Output: ['name', 'age']           ← enumerable only
console.log(Reflect.ownKeys(obj));       // Output: ['name', 'age', 'hidden', Symbol(id)]  ← everything
```

> 💡 **`Reflect.ownKeys` = `Object.getOwnPropertyNames` + `Object.getOwnPropertySymbols`** combined into one call.

---

## 2.11 — `Reflect.isExtensible()` and `Reflect.preventExtensions()`

```js
const obj = { x: 1 };

console.log(Reflect.isExtensible(obj));   // Output: true

Reflect.preventExtensions(obj);

console.log(Reflect.isExtensible(obj));   // Output: false
Reflect.set(obj, "y", 2);                 // Fails silently
console.log(obj.y);                       // Output: undefined
```

---

## 2.12 — Why Use Reflect Instead of Direct Operations?

| Scenario | Direct Operation | Problem | Reflect Solution |
|---|---|---|---|
| Delete a property | `delete obj.key` returns boolean but looks like a statement | Confusing mixed syntax | `Reflect.deleteProperty(obj, key)` → clear boolean |
| Set on frozen object | `obj.key = val` silently fails or throws | Unpredictable | `Reflect.set(obj, key, val)` → always returns `false` |
| Apply with overridden `.apply` | `fn.apply(ctx, args)` — fails if `apply` is overridden | Fragile | `Reflect.apply(fn, ctx, args)` — always works |
| Inside Proxy traps | No default behaviour path | Must re-implement manually | `Reflect.method(target, ...)` — forwards to default |

> 🤔 **Thinking question:** `Reflect.set` returns `false` when setting a property on a frozen object. `Object.assign` doesn't check the return value of each set — it will silently fail on frozen objects. What problem could this cause in real code?

---

---

# CHAPTER 3 — THE PROXY API

---

## What Is a Proxy?

A **Proxy** wraps an object (called the **target**) and intercepts operations performed on it. Every time code tries to read, write, delete, or call anything on the proxy, a **trap** function runs first.

```
Code ──► Proxy (traps run here) ──► Target Object
                │
          You control what
          happens at each step
```

---

## 3.1 — Creating a Proxy

```js
const proxy = new Proxy(target, handler);
```

| Parameter | Description |
|---|---|
| `target` | The original object being wrapped |
| `handler` | An object containing trap functions |

**Minimal example — a transparent proxy (no traps = pure passthrough):**

```js
const target = { name: "Alice", age: 30 };
const proxy  = new Proxy(target, {});   // Empty handler = no interception

console.log(proxy.name);   // Output: Alice  ← just like accessing target directly
proxy.age = 31;
console.log(target.age);   // Output: 31  ← changes flow through to target
```

---

## 3.2 — The `get` Trap — Intercepting Property Reads

```js
const handler = {
  get(target, property, receiver) {
    console.log(`GET: "${property}" was read`);
    return Reflect.get(target, property, receiver);   // Perform the default operation
  }
};

const user = new Proxy({ name: "Alice", role: "admin" }, handler);

console.log(user.name);
// GET: "name" was read
// Output: Alice

console.log(user.role);
// GET: "role" was read
// Output: admin
```

**Trap function signature — every trap follows this pattern:**

| Parameter | Meaning |
|---|---|
| `target` | The original object being proxied |
| `property` | The property name (or Symbol) being accessed |
| `receiver` | The proxy itself (or object inheriting from the proxy) |

**`Reflect.get(target, property, receiver)`** performs the default get — exactly what would happen without the proxy. Always call the Reflect equivalent at the end of your trap (unless you intentionally want to suppress the default behaviour).

---

## 3.3 — Default Values for Missing Properties

A `get` trap lets you return custom values for properties that don't exist:

```js
const withDefaults = new Proxy({}, {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return `[Property "${property}" not found — returning default]`;
  }
});

withDefaults.name = "Alice";
console.log(withDefaults.name);        // Output: Alice
console.log(withDefaults.age);         // Output: [Property "age" not found — returning default]
console.log(withDefaults.anything);    // Output: [Property "anything" not found — returning default]
```

**Real-world use:** Configuration objects that return sensible defaults for any unset key, i18n translation maps that return the key name when a translation is missing.

---

## 3.4 — The `set` Trap — Intercepting Property Writes

```js
const handler = {
  set(target, property, value, receiver) {
    console.log(`SET: "${property}" = ${JSON.stringify(value)}`);

    // Validation example:
    if (property === "age" && (typeof value !== "number" || value < 0 || value > 150)) {
      throw new TypeError(`Invalid age: ${value}`);
    }

    return Reflect.set(target, property, value, receiver);   // Perform the actual set
  }
};

const person = new Proxy({}, handler);

person.name = "Alice";
// SET: "name" = "Alice"

person.age = 30;
// SET: "age" = 30

person.age = -5;
// ❌ TypeError: Invalid age: -5
```

> ⚠️ **The `set` trap must return `true` to indicate success** (or `false` / throw to indicate failure). If you forget the `return` statement, the trap returns `undefined` (falsy), which JavaScript treats as a set failure — and in strict mode throws a `TypeError`. Always `return Reflect.set(...)` or `return true`.

---

## 3.5 — The `has` Trap — Intercepting `in` Operator

```js
const hiddenRange = new Proxy({ min: 1, max: 100 }, {
  has(target, property) {
    // Pretend any number between min and max "exists" in the object:
    const num = Number(property);
    if (!isNaN(num)) {
      return num >= target.min && num <= target.max;
    }
    return Reflect.has(target, property);
  }
});

console.log(50  in hiddenRange);   // Output: true   (50 is between 1 and 100)
console.log(150 in hiddenRange);   // Output: false
console.log("min" in hiddenRange); // Output: true   (actual property)
```

---

## 3.6 — The `deleteProperty` Trap — Intercepting `delete`

```js
const protectedObj = new Proxy(
  { name: "Alice", _secret: "password123" },
  {
    deleteProperty(target, property) {
      if (property.startsWith("_")) {
        throw new Error(`Cannot delete protected property: "${property}"`);
      }
      console.log(`Deleting "${property}"`);
      return Reflect.deleteProperty(target, property);
    }
  }
);

delete protectedObj.name;
// Deleting "name"

delete protectedObj._secret;
// ❌ Error: Cannot delete protected property: "_secret"
```

---

## 3.7 — The `apply` Trap — Intercepting Function Calls

When the proxy wraps a **function**, the `apply` trap fires whenever the function is called:

```js
function multiply(a, b) {
  return a * b;
}

const timedMultiply = new Proxy(multiply, {
  apply(target, thisArg, argumentsList) {
    const start  = performance.now();
    const result = Reflect.apply(target, thisArg, argumentsList);
    const end    = performance.now();
    console.log(`multiply(${argumentsList}) = ${result} [${(end - start).toFixed(3)}ms]`);
    return result;
  }
});

timedMultiply(6, 7);    // multiply(6,7) = 42 [0.012ms]
timedMultiply(100, 50); // multiply(100,50) = 5000 [0.004ms]
```

**Real-world use:** Performance profiling, mocking in tests, access control, argument logging, input sanitisation.

---

## 3.8 — The `construct` Trap — Intercepting `new`

```js
class User {
  constructor(name, email) {
    this.name  = name;
    this.email = email;
  }
}

const TrackedUser = new Proxy(User, {
  construct(target, argumentsList, newTarget) {
    console.log(`New ${target.name} created: ${argumentsList[0]}`);
    const instance = Reflect.construct(target, argumentsList, newTarget);
    instance.createdAt = new Date().toISOString();
    return instance;
  }
});

const u = new TrackedUser("Alice", "alice@example.com");
// New User created: Alice
console.log(u.name);       // Output: Alice
console.log(u.createdAt);  // Output: current ISO timestamp
```

---

## 3.9 — The `ownKeys` Trap — Intercepting Property Enumeration

Controls what `Object.keys()`, `for...in`, and `Object.getOwnPropertyNames()` see:

```js
const obj = { name: "Alice", _private: "secret", id: 1 };

const filtered = new Proxy(obj, {
  ownKeys(target) {
    // Hide properties starting with '_':
    return Reflect.ownKeys(target).filter(key => !String(key).startsWith("_"));
  },
  getOwnPropertyDescriptor(target, prop) {
    // Required: tell the engine all returned keys are "real" properties
    return { value: target[prop], enumerable: true, configurable: true, writable: true };
  }
});

console.log(Object.keys(filtered));   // Output: ['name', 'id']  ← _private is hidden
for (const key in filtered) {
  console.log(key);   // Output: name, id  ← _private not enumerated
}
```

> 💡 **Why the `getOwnPropertyDescriptor` trap is also needed:** When JavaScript checks `ownKeys`, it then verifies each key by calling `getOwnPropertyDescriptor`. If the descriptor doesn't show `enumerable: true, configurable: true`, the engine may throw an error or skip the key. Always pair `ownKeys` with `getOwnPropertyDescriptor` when hiding properties.

---

## 3.10 — The `defineProperty` Trap — Intercepting Property Definition

```js
const strict = new Proxy({}, {
  defineProperty(target, property, descriptor) {
    if (descriptor.value !== undefined && typeof descriptor.value === "function") {
      throw new TypeError(`Functions cannot be stored on this object.`);
    }
    console.log(`Defining "${property}"`);
    return Reflect.defineProperty(target, property, descriptor);
  }
});

strict.name = "Alice";     // Defining "name"
strict.age  = 30;          // Defining "age"

strict.greet = function() { return "Hi"; };
// ❌ TypeError: Functions cannot be stored on this object.
```

---

## 3.11 — The `getPrototypeOf` and `setPrototypeOf` Traps

```js
const obj = {};

const liar = new Proxy(obj, {
  getPrototypeOf(target) {
    return Array.prototype;   // Pretend to be an array
  }
});

console.log(Object.getPrototypeOf(liar) === Array.prototype);  // Output: true
console.log(liar instanceof Array);                             // Output: true  ← it's lying!
```

> ⚠️ **Use this with great caution.** Lying about an object's prototype can cause extremely confusing bugs. This trap is primarily useful for implementing virtual objects and testing environments.

---

## 3.12 — Revocable Proxies

A **revocable proxy** can be disabled after creation. Once revoked, any operation on it throws a `TypeError`.

```js
const { proxy, revoke } = Proxy.revocable(
  { name: "Alice", balance: 1000 },
  {
    get(target, prop) {
      return Reflect.get(target, prop);
    }
  }
);

console.log(proxy.name);     // Output: Alice
console.log(proxy.balance);  // Output: 1000

revoke();   // Disconnect the proxy

console.log(proxy.name);
// ❌ TypeError: Cannot perform 'get' on a proxy that has been revoked
```

**Real-world uses of revocable proxies:**
- Session tokens: revoke access after logout
- Capability-based security: give a module a proxy to a resource, revoke it when done
- Temporary access windows: allow an operation for exactly N milliseconds, then revoke

---

## 3.13 — Nested Proxies and the `receiver` Argument

When a proxied object has getters, the `receiver` argument ensures `this` inside the getter refers to the proxy (not the raw target):

```js
const target = {
  _count: 0,
  get count() { return this._count; }   // 'this' needs to be the proxy to work correctly
};

const handler = {
  get(target, property, receiver) {
    console.log(`Reading: ${property}`);
    return Reflect.get(target, property, receiver);
    //                                    ↑ Pass receiver to Reflect.get
    //                                      so 'this' inside getters is the proxy
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.count);
// Reading: count       ← getter intercepted
// Reading: _count      ← getter's 'this._count' also intercepted!
// Output: 0
```

Without passing `receiver` to `Reflect.get`, the getter's `this._count` would access `target._count` directly, bypassing the proxy's `get` trap.

---

## 3.14 — Complete Handler Trap Reference

| Trap | Triggered By | Parameters | Must Return |
|---|---|---|---|
| `get` | `proxy.prop`, `proxy[key]` | `(target, prop, receiver)` | Any value |
| `set` | `proxy.prop = val` | `(target, prop, value, receiver)` | `true`/`false` |
| `has` | `key in proxy` | `(target, prop)` | Boolean |
| `deleteProperty` | `delete proxy.prop` | `(target, prop)` | Boolean |
| `apply` | `proxy()` | `(target, thisArg, args)` | Any value |
| `construct` | `new proxy()` | `(target, args, newTarget)` | Object |
| `defineProperty` | `Object.defineProperty(proxy, ...)` | `(target, prop, descriptor)` | Boolean |
| `getOwnPropertyDescriptor` | `Object.getOwnPropertyDescriptor(proxy, ...)` | `(target, prop)` | Descriptor or `undefined` |
| `getPrototypeOf` | `Object.getPrototypeOf(proxy)` | `(target)` | Object or `null` |
| `setPrototypeOf` | `Object.setPrototypeOf(proxy, proto)` | `(target, proto)` | Boolean |
| `isExtensible` | `Object.isExtensible(proxy)` | `(target)` | Boolean |
| `preventExtensions` | `Object.preventExtensions(proxy)` | `(target)` | Boolean |
| `ownKeys` | `Object.keys(proxy)`, `for...in` | `(target)` | Array |

---

## 3.15 — Proxy Invariants (Rules You Cannot Break)

Some traps have **invariants** — rules the JavaScript engine enforces, even if your trap tries to break them. Violating an invariant throws a `TypeError`:

| Invariant | Rule |
|---|---|
| `get` | Cannot return a different value for a non-writable, non-configurable property |
| `set` | Must return `false` (not `true`) for non-writable, non-configurable properties |
| `has` | Cannot return `false` for a non-configurable own property |
| `deleteProperty` | Cannot return `true` for a non-configurable property |
| `getPrototypeOf` | Must return the actual prototype if target is non-extensible |
| `construct` | Must return an object, not a primitive |

These invariants exist to maintain JavaScript's fundamental correctness guarantees. They prevent proxies from completely undermining the type system.

---

---

# CHAPTER 4 — META PROGRAMMING REFERENCE

---

## 4.1 — Complete Reflect API Reference

| Method | Equivalent Operation | Returns |
|---|---|---|
| `Reflect.get(target, key, receiver?)` | `target[key]` | Property value |
| `Reflect.set(target, key, value, receiver?)` | `target[key] = value` | Boolean |
| `Reflect.has(target, key)` | `key in target` | Boolean |
| `Reflect.deleteProperty(target, key)` | `delete target[key]` | Boolean |
| `Reflect.apply(fn, thisArg, args)` | `fn.apply(thisArg, args)` | Return value of fn |
| `Reflect.construct(Cls, args, newTarget?)` | `new Cls(...args)` | New instance |
| `Reflect.defineProperty(target, key, desc)` | `Object.defineProperty(...)` | Boolean |
| `Reflect.getOwnPropertyDescriptor(target, key)` | `Object.getOwnPropertyDescriptor(...)` | Descriptor or `undefined` |
| `Reflect.getPrototypeOf(target)` | `Object.getPrototypeOf(...)` | Object or `null` |
| `Reflect.setPrototypeOf(target, proto)` | `Object.setPrototypeOf(...)` | Boolean |
| `Reflect.isExtensible(target)` | `Object.isExtensible(...)` | Boolean |
| `Reflect.preventExtensions(target)` | `Object.preventExtensions(...)` | Boolean |
| `Reflect.ownKeys(target)` | `Object.getOwnPropertyNames + Symbols` | Array of keys |

---

## 4.2 — Complete Proxy Handler Traps Reference

*(See the complete table in Section 3.14)*

---

## 4.3 — Proxy vs Object.defineProperty — When to Use Each

| Need | `Object.defineProperty` | `Proxy` |
|---|---|---|
| Intercept one known property | ✅ Simple and performant | ✅ Also works |
| Intercept all properties, known or unknown | ❌ Must define per-property | ✅ One handler covers all |
| Intercept method calls | ❌ Cannot intercept `()` | ✅ `apply` trap |
| Intercept `in` operator | ❌ Cannot intercept `in` | ✅ `has` trap |
| Intercept `delete` | ❌ Cannot intercept `delete` | ✅ `deleteProperty` trap |
| Intercept `Object.keys()` | ❌ `enumerable: false` is close but limited | ✅ `ownKeys` trap |
| Revocable access | ❌ Cannot un-define | ✅ `Proxy.revocable()` |
| Performance-critical hot path | ✅ Faster (no overhead) | ⚠️ Some overhead per access |

---

## 4.4 — Common Meta Programming Patterns

| Pattern | Mechanism | Chapter |
|---|---|---|
| Property access logging | `get` trap | 3.2 |
| Input validation | `set` trap | 3.4 |
| Default values for missing properties | `get` trap | 3.3 |
| Read-only objects | `set` trap that always returns `false` | 3.4 |
| Hidden properties | `ownKeys` + `has` traps | 3.5, 3.9 |
| Function timing / profiling | `apply` trap | 3.7 |
| Constructor injection | `construct` trap | 3.8 |
| Revocable access | `Proxy.revocable()` | 3.12 |
| Reactive data binding | `set` trap triggers re-render | Phase 3 |
| Negative array indexing (`arr[-1]`) | `get` trap | Exercise 2 |

---

## 4.5 — Symbols and Meta Programming

JavaScript's built-in **Symbol** values are another form of meta programming — they let you define how objects behave with built-in language features.

```js
class Range {
  constructor(from, to) {
    this.from = from;
    this.to   = to;
  }

  // Symbol.iterator — makes Range work in for...of loops:
  [Symbol.iterator]() {
    let current = this.from;
    const last  = this.to;
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true };
      }
    };
  }

  // Symbol.toPrimitive — controls type coercion:
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.to - this.from + 1;  // Length of range
    if (hint === "string") return `Range(${this.from}–${this.to})`;
    return true;
  }

  // Symbol.hasInstance — controls instanceof behaviour:
  static [Symbol.hasInstance](instance) {
    return typeof instance === "number";
  }
}

const r = new Range(1, 5);

for (const n of r) process.stdout.write(n + " ");
// Output: 1 2 3 4 5

console.log(`${r}`);     // Output: Range(1–5)
console.log(+r);         // Output: 5  (number of items)
console.log(3 instanceof Range);  // Output: true  (3 is a number!)
```

**Well-known Symbols:**

| Symbol | Controls |
|---|---|
| `Symbol.iterator` | `for...of`, spread `[...obj]`, destructuring |
| `Symbol.toPrimitive` | Type coercion (number, string, default) |
| `Symbol.hasInstance` | `instanceof` operator |
| `Symbol.toStringTag` | `Object.prototype.toString.call(obj)` display |
| `Symbol.species` | Which constructor derived classes use |
| `Symbol.isConcatSpreadable` | Whether `Array.prototype.concat` spreads the object |
| `Symbol.asyncIterator` | `for await...of` loops |

---

## 4.6 — Performance Considerations

Proxies add overhead to every intercepted operation. For performance-sensitive hot paths:

```js
// Profile proxy overhead:
const plain  = { x: 1 };
const proxied = new Proxy({ x: 1 }, {
  get: (t, k) => Reflect.get(t, k)
});

console.time("plain");
for (let i = 0; i < 1_000_000; i++) plain.x;
console.timeEnd("plain");    // e.g. ~2ms

console.time("proxied");
for (let i = 0; i < 1_000_000; i++) proxied.x;
console.timeEnd("proxied");  // e.g. ~15ms  ← ~7x slower
```

**Guidelines:**
- Use proxies for developer-facing APIs, validation, and tooling — where correctness matters more than microsecond performance
- Avoid proxies on hot code paths called millions of times per second (tight loops, rendering)
- Modern engines (V8, SpiderMonkey) optimise simple proxies aggressively; real-world overhead is often negligible

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Reflect Practice: Safe Object Operations

**Objective:** Use `Reflect` methods to perform safer, more predictable object operations than their traditional counterparts.

**Scenario:** You're building a configuration manager that needs to read, write, and inspect settings safely — even if those settings have been frozen or have custom descriptors.

**Warm-up mini-example:**

```js
// Traditional way — throws on frozen objects in strict mode:
const cfg = Object.freeze({ debug: false });
try {
  cfg.debug = true;   // Throws TypeError in strict mode
} catch (e) {
  console.log(e.message);
}

// Reflect way — returns false, never throws:
const result = Reflect.set(cfg, "debug", true);
console.log(result);   // Output: false  — clean signal without exception
```

**Step-by-step instructions:**

1. Create a `ConfigManager` class that stores settings in a plain object internally.
2. Write a `safeGet(key, defaultValue)` method using `Reflect.has` and `Reflect.get`.
3. Write a `safeSet(key, value)` method using `Reflect.set` that returns `true/false` without throwing.
4. Write a `safeDelete(key)` method using `Reflect.deleteProperty`.
5. Write a `listKeys()` method using `Reflect.ownKeys` that separates string keys from Symbol keys.
6. Test with both normal and frozen objects.

**Self-check questions:**
1. What does `Reflect.ownKeys()` return that `Object.keys()` does not?
2. In what scenario would `Reflect.set` return `false` even on a non-frozen object?

---

## Exercise 2 — Proxy: Negative Array Indexing

**Objective:** Use a `get` trap to support Python-style negative indexing on JavaScript arrays.

**Scenario:** In Python, `arr[-1]` returns the last element, `arr[-2]` the second-to-last, etc. JavaScript does not support this natively. Use a Proxy to add this behaviour.

**Warm-up mini-example:**

```js
const arr  = [10, 20, 30, 40, 50];
const last = arr[arr.length - 1];
console.log(last);   // Output: 50  ← clunky
```

**Step-by-step instructions:**

1. Write a `createNegativeArray(arr)` function that returns a Proxy-wrapped array.
2. In the `get` trap, detect when the property is a numeric string. Convert it to a number.
3. If the number is negative, convert to `arr.length + index` before forwarding.
4. If the number is non-negative or the property is non-numeric (e.g., `"length"`, `"push"`), fall through to `Reflect.get`.
5. Test:

```js
const nums = createNegativeArray([10, 20, 30, 40, 50]);
console.log(nums[-1]);   // Output: 50
console.log(nums[-2]);   // Output: 40
console.log(nums[0]);    // Output: 10
console.log(nums.length); // Output: 5
nums.push(60);
console.log(nums[-1]);   // Output: 60  ← works after mutation
```

**Hint:**

```js
get(target, property, receiver) {
  const index = Number(property);
  if (Number.isInteger(index) && index < 0) {
    return Reflect.get(target, target.length + index, receiver);
  }
  return Reflect.get(target, property, receiver);
}
```

**Self-check questions:**
1. Why must you check `Number.isInteger(index)` rather than just `!isNaN(index)`?
2. What happens to `nums.map()`, `nums.filter()`, and other array methods? Do they still work? Why?

---

## Exercise 3 — Proxy: Type-Enforced Object (Typed Properties)

**Objective:** Create a proxy-based schema validator that enforces type rules on every property write.

**Scenario:** A form data object for a user registration flow where every field has a required type.

**Warm-up mini-example:**

```js
// We want this to throw:
const typedUser = createTyped({ name: "string", age: "number" });
typedUser.name = "Alice";   // ✅
typedUser.age  = "thirty";  // ❌ TypeError: age must be a number
```

**Step-by-step instructions:**

1. Write a `createTyped(schema)` function that accepts an object mapping property names to type strings (e.g., `"string"`, `"number"`, `"boolean"`).
2. Return a Proxy whose `set` trap checks `typeof value === schema[property]` for every write.
3. If the type doesn't match, throw a `TypeError` with a descriptive message.
4. If the property isn't in the schema, throw a `RangeError` (no unknown properties allowed).
5. Add a `get` trap that returns `undefined` for undefined properties (instead of throwing).

**Expected behaviour:**

```js
const user = createTyped({
  name:    "string",
  age:     "number",
  premium: "boolean"
});

user.name    = "Alice";   // ✅
user.age     = 30;        // ✅
user.premium = true;      // ✅

user.age     = "30";      // ❌ TypeError: "age" must be of type "number", got "string"
user.unknown = "value";   // ❌ RangeError: "unknown" is not a valid property
```

**Self-check questions:**
1. How would you extend this to support `"array"` as a type? (`typeof [] === "object"` — tricky!)
2. Where would you add a `"required"` validation check that prevents reading before writing?

---

## Exercise 4 — Proxy: Observable Object (Reactive System Foundations)

**Objective:** Build a mini reactive system where any change to an object automatically notifies registered watchers — the foundation of how Vue.js and MobX work.

**Scenario:** A state object for a UI component. When any property changes, the UI should re-render.

**Step-by-step instructions:**

1. Write a `makeObservable(obj, onChange)` function that returns a Proxy.
2. The `set` trap calls `onChange(property, oldValue, newValue)` whenever a property changes.
3. Only fire the callback if the value actually changed (`oldValue !== newValue`).
4. The `deleteProperty` trap should also notify with `newValue = undefined`.
5. Test with a simulated "renderer":

```js
const state = makeObservable(
  { count: 0, name: "Alice", active: true },
  (prop, oldVal, newVal) => {
    console.log(`[STATE CHANGE] ${prop}: ${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}`);
    // In a real UI framework, this would trigger a re-render
  }
);

state.count  = 1;     // [STATE CHANGE] count: 0 → 1
state.count  = 1;     // No change — callback NOT fired (same value)
state.name   = "Bob"; // [STATE CHANGE] name: "Alice" → "Bob"
delete state.active;  // [STATE CHANGE] active: true → undefined
```

**Self-check questions:**
1. Why check `oldValue !== newValue` before firing the callback? What problem does this prevent?
2. How would you extend this to support watching specific properties rather than all properties?

---

## Exercise 5 — Proxy: Logging and Profiling Wrapper

**Objective:** Build a reusable function profiler using the `apply` trap.

**Scenario:** A development utility that wraps any function and logs its call count, arguments, return value, and execution time.

**Step-by-step instructions:**

1. Write a `profile(fn, label)` function that returns a Proxy wrapping `fn`.
2. Use the `apply` trap to:
   - Increment a call counter
   - Log: `[CALL #N] label(args) → result [Xms]`
   - Return the actual result
3. Add a static `getStats(proxy)` mechanism — either via a Symbol property on the proxy or a separate `WeakMap`.
4. Test with several functions:

```js
const slowAdd = profile((a, b) => {
  // Simulate work:
  let sum = 0;
  for (let i = 0; i < 1_000_000; i++) sum += i;
  return a + b;
}, "slowAdd");

slowAdd(3, 4);
// [CALL #1] slowAdd(3, 4) → 7 [12.3ms]
slowAdd(10, 20);
// [CALL #2] slowAdd(10, 20) → 30 [11.8ms]
```

**Self-check questions:**
1. Can the profiled function still be called without the proxy? Does the proxy modify the original?
2. If you profile a method on an object (`obj.method`), what challenge arises with `this`? How does `thisArg` in the `apply` trap help?

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Reactive State Management Library

**Scenario:** You are building a lightweight reactive state management library — a simplified version of what powers Vue.js's reactivity system, MobX, and Solid.js. The library must:

- Track dependencies automatically (which parts of the UI depend on which state)
- Notify subscribers when state changes
- Support computed values that update when their dependencies change
- Prevent direct mutation of state outside authorised setters
- Provide a read-only view of the state for safe sharing
- Log all state transitions in development mode

This project uses every meta programming concept from all four chapters: `Reflect` methods, all major `Proxy` traps, revocable proxies for read-only views, and Symbols.

---

### Stage 1 — Core Reactive Store

```js
// --- Dependency tracking ---
// Which "effect" (subscriber function) is currently running?
let activeEffect = null;
const dependencyMap = new WeakMap();  // target → Map(key → Set(effects))

function track(target, key) {
  if (!activeEffect) return;   // Nothing is watching right now

  if (!dependencyMap.has(target)) {
    dependencyMap.set(target, new Map());
  }
  const keyMap = dependencyMap.get(target);

  if (!keyMap.has(key)) {
    keyMap.set(key, new Set());
  }
  keyMap.get(key).add(activeEffect);   // Record: this effect depends on target[key]
}

function trigger(target, key, oldValue, newValue) {
  if (!dependencyMap.has(target)) return;
  const keyMap = dependencyMap.get(target);
  if (!keyMap.has(key)) return;

  const effects = keyMap.get(key);
  effects.forEach(effect => {
    if (effect !== activeEffect) {   // Don't trigger the currently-running effect
      effect();
    }
  });
}

// --- Reactive Proxy Handler ---
function createReactiveHandler(options = {}) {
  const { readonly = false, debug = false } = options;

  return {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);

      // Track this access if an effect is watching:
      if (typeof key === "string" || typeof key === "symbol") {
        track(target, key);
      }

      if (debug) {
        console.log(`[REACTIVE GET] ${String(key)} =`, value);
      }

      // If the value is an object, wrap it in a reactive proxy too (deep reactivity):
      if (value !== null && typeof value === "object" && !isProxy(value)) {
        return createReactive(value, options);
      }

      return value;
    },

    set(target, key, value, receiver) {
      if (readonly) {
        console.warn(`[REACTIVE] Attempted to write "${String(key)}" on read-only state.`);
        return false;
      }

      const oldValue = Reflect.get(target, key, receiver);

      if (Object.is(oldValue, value)) return true;   // No actual change

      const success = Reflect.set(target, key, value, receiver);

      if (success) {
        if (debug) {
          console.log(`[REACTIVE SET] ${String(key)}: ${JSON.stringify(oldValue)} → ${JSON.stringify(value)}`);
        }
        trigger(target, key, oldValue, value);   // Notify dependents
      }

      return success;
    },

    deleteProperty(target, key) {
      if (readonly) {
        console.warn(`[REACTIVE] Attempted to delete "${String(key)}" on read-only state.`);
        return false;
      }

      const hadKey    = Reflect.has(target, key);
      const oldValue  = Reflect.get(target, key);
      const success   = Reflect.deleteProperty(target, key);

      if (success && hadKey) {
        trigger(target, key, oldValue, undefined);
      }

      return success;
    },

    has(target, key) {
      track(target, key);
      return Reflect.has(target, key);
    },

    ownKeys(target) {
      track(target, Symbol.for("__ownKeys__"));   // Track enumeration
      return Reflect.ownKeys(target);
    }
  };
}

// Track which objects are already proxied (avoid double-wrapping):
const proxySet = new WeakSet();

function isProxy(obj) {
  return proxySet.has(obj);
}

function createReactive(raw, options = {}) {
  const proxy = new Proxy(raw, createReactiveHandler(options));
  proxySet.add(proxy);
  return proxy;
}
```

---

### Stage 2 — Store Class with Computed Values and Effects

```js
class Store {
  #raw;
  #state;
  #readonlyState;
  #computedCache;
  #debug;

  constructor(initialState, debug = false) {
    this.#raw           = { ...initialState };
    this.#debug         = debug;
    this.#computedCache = new Map();

    // Main reactive state:
    this.#state = createReactive(this.#raw, { debug });

    // Read-only view for safe sharing:
    const { proxy: roProxy, revoke } = Proxy.revocable(
      this.#state,
      createReactiveHandler({ readonly: true, debug })
    );
    this.#readonlyState = roProxy;
    this._revokeReadonly = revoke;   // Store revoke for cleanup
  }

  // Access reactive state:
  get state()   { return this.#state; }

  // Access read-only view:
  get readonly(){ return this.#readonlyState; }

  // Register a side effect that runs whenever its dependencies change:
  effect(fn) {
    const wrappedEffect = () => {
      const prev   = activeEffect;
      activeEffect = wrappedEffect;   // Mark this as the active tracker
      try {
        fn(this.#state);
      } finally {
        activeEffect = prev;          // Restore previous tracker
      }
    };

    wrappedEffect();   // Run once immediately to collect dependencies
    return wrappedEffect;
  }

  // Computed property — cached, recomputes when dependencies change:
  computed(key, computeFn) {
    let cachedValue;
    let dirty = true;   // Flag: needs recomputation

    const recompute = () => { dirty = true; };

    const getter = () => {
      if (dirty) {
        const prev   = activeEffect;
        activeEffect = recompute;   // Track what this computed depends on
        try {
          cachedValue = computeFn(this.#state);
        } finally {
          activeEffect = prev;
        }
        dirty = false;
      }
      return cachedValue;
    };

    this.#computedCache.set(key, getter);
    return getter;
  }

  // Batch multiple mutations — only trigger effects once at the end:
  batch(mutations) {
    const pending = new Set();

    // Temporarily override trigger to collect effects:
    // (Simplified — a production version would queue all triggers)
    mutations(this.#state);
    // Effects fire after the synchronous mutations block completes
  }

  // Snapshot of current state as plain object:
  snapshot() {
    return JSON.parse(JSON.stringify(this.#raw));
  }

  // Clean up — revoke read-only proxy:
  destroy() {
    this._revokeReadonly();
    if (this.#debug) console.log("[STORE] Destroyed — read-only access revoked.");
  }
}
```

---

### Stage 3 — Using the Store

```js
// --- Create a store for a shopping cart ---
const cart = new Store({
  items: [],
  discount: 0,
  user: { name: "Alice", premium: false }
}, true /* debug mode */);

// --- Register an effect: re-render the cart total whenever items or discount change ---
cart.effect(state => {
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total    = subtotal * (1 - state.discount);
  console.log(`[CART] ${state.items.length} items | Subtotal: £${subtotal.toFixed(2)} | Total: £${total.toFixed(2)}`);
});
// Runs immediately:
// [CART] 0 items | Subtotal: £0.00 | Total: £0.00

// --- Register an effect: show welcome message when user changes ---
cart.effect(state => {
  console.log(`[USER] Welcome, ${state.user.name} (${state.user.premium ? "Premium" : "Standard"})`);
});
// Runs immediately:
// [USER] Welcome, Alice (Standard)

// --- Computed: item count ---
const itemCount = cart.computed("itemCount", state =>
  state.items.reduce((sum, item) => sum + item.qty, 0)
);

// --- Mutate state ---
cart.state.items.push({ name: "Laptop", price: 899, qty: 1 });
// Triggers cart effect:
// [CART] 1 items | Subtotal: £899.00 | Total: £899.00

cart.state.discount = 0.1;
// Triggers cart effect:
// [CART] 1 items | Subtotal: £899.00 | Total: £809.10

cart.state.user.name = "Bob";
// Triggers user effect:
// [USER] Welcome, Bob (Standard)

console.log("Item count:", itemCount());  // Output: Item count: 1

// --- Read-only view ---
const safeView = cart.readonly;
console.log(safeView.discount);    // Output: 0.1  ← read works
safeView.discount = 0.5;           // [REACTIVE] Attempted to write "discount" on read-only state.
console.log(safeView.discount);    // Output: 0.1  ← unchanged

// --- Snapshot for serialisation ---
const snap = cart.snapshot();
console.log(snap.discount);   // Output: 0.1  ← plain object, safe to serialise

// --- Cleanup ---
cart.destroy();
// [STORE] Destroyed — read-only access revoked.
safeView.discount;
// ❌ TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

### Stage 4 — Advanced: Schema-Validated Store

Combine the Proxy validator from Exercise 3 with the reactive store for full type safety:

```js
function createValidatedStore(schema, initialState) {
  // First validate the initial state:
  for (const [key, type] of Object.entries(schema)) {
    if (key in initialState && typeof initialState[key] !== type) {
      throw new TypeError(`Initial state: "${key}" must be of type "${type}"`);
    }
  }

  const store = new Store(initialState);

  // Wrap the state proxy in a validation layer:
  const validatedState = new Proxy(store.state, {
    set(target, key, value, receiver) {
      if (key in schema && typeof value !== schema[key]) {
        throw new TypeError(
          `"${String(key)}" must be of type "${schema[key]}", got "${typeof value}"`
        );
      }
      return Reflect.set(target, key, value, receiver);
    }
  });

  return { state: validatedState, store };
}

// Usage:
const { state, store } = createValidatedStore(
  { username: "string", score: "number", active: "boolean" },
  { username: "Alice",  score: 0,       active: true }
);

state.score    = 100;      // ✅
state.username = "Bob";    // ✅
state.score    = "high";   // ❌ TypeError: "score" must be of type "number", got "string"
```

---

**Reflection Questions:**

1. The store uses a `WeakMap` for `dependencyMap` (mapping targets to their effects). Why `WeakMap` instead of a regular `Map`? What memory problem does this prevent?
2. The `ownKeys` trap tracks with `Symbol.for("__ownKeys__")`. Why use a Symbol as the tracking key instead of a string like `"__ownKeys__"`?
3. The read-only view uses a revocable Proxy. When would you call `store.destroy()` in a real application? (Think about component lifecycles in a UI framework.)
4. The `isProxy(obj)` function uses a `WeakSet` to track proxied objects. Why not just add a property like `obj.__isProxy = true` instead?
5. The current `batch()` implementation is a placeholder. In a real reactive system, batching prevents effects from running on every single mutation. How would you implement true batching — collecting all effects during mutations, then running each effect exactly once at the end?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What is meta programming, and what two ES6 APIs are its primary tools in JavaScript?

**Q2:** What is the difference between `Reflect.set(target, key, value)` and `target[key] = value`?

**Q3:** Write a Proxy that logs every property read with the property name and value.

**Q4:** What are "Proxy traps" and "invariants"? Give one example of each.

**Q5:** What is a revocable Proxy, and when would you use one?

**Q6:** What does the `receiver` argument in a `get` trap do, and why does it matter?

**Q7:** What is the difference between `Reflect.ownKeys(obj)` and `Object.keys(obj)`?

**Q8:** Why is `return Reflect.set(target, key, value, receiver)` better than `return true` at the end of a `set` trap?

**Q9:** What does the `apply` trap intercept, and what does it receive as arguments?

**Q10:** In what order are these evaluated: direct property access, Proxy `get` trap, `Object.defineProperty` getter? Where does Proxy fit in this chain?

---

## Answer Key

**A1:** Meta programming is writing code that reads, controls, or transforms other code at runtime. The two primary tools are `Reflect` (a functional interface to fundamental JS operations) and `Proxy` (an interceptor that wraps objects and intercepts operations on them).

**A2:** `target[key] = value` silently fails on frozen/non-writable properties (or throws in strict mode) and returns the value, not a success indicator. `Reflect.set(...)` always returns a boolean (`true` = success, `false` = failure) without throwing — consistent across all contexts.

**A3:**
```js
const logged = new Proxy(obj, {
  get(target, property, receiver) {
    const value = Reflect.get(target, property, receiver);
    console.log(`GET "${String(property)}" = ${JSON.stringify(value)}`);
    return value;
  }
});
```

**A4:** A **trap** is a method on the Proxy handler that intercepts a specific operation (e.g., `get` intercepts property reads). An **invariant** is a rule the engine enforces even if your trap tries to break it — e.g., a `get` trap cannot return a different value for a non-writable, non-configurable property.

**A5:** A revocable Proxy is created with `Proxy.revocable()` and returns both `proxy` and `revoke`. Calling `revoke()` permanently disables the proxy — all further operations throw a `TypeError`. Used for: session expiry, temporary capability grants, component cleanup.

**A6:** `receiver` is the Proxy itself (or an object that inherits from it). Passing `receiver` to `Reflect.get(target, key, receiver)` ensures that when a getter runs on the target, `this` inside that getter refers to the proxy — not the raw target. Without it, getters bypass proxy traps when accessing `this.property`.

**A7:** `Object.keys(obj)` returns only own, enumerable, string-keyed properties. `Reflect.ownKeys(obj)` returns all own properties — including non-enumerable, non-configurable, and Symbol-keyed ones.

**A8:** `return true` unconditionally claims success. `return Reflect.set(target, key, value, receiver)` reports the actual outcome — if the underlying set fails (frozen property, failed setter, etc.), it correctly returns `false`. Lying with `return true` violates the trap's invariant contract.

**A9:** The `apply` trap intercepts function calls: `proxy()`, `proxy.call(ctx, args)`, `proxy.apply(ctx, args)`. It receives `(target, thisArg, argumentsList)` — the original function, the value of `this`, and an array of all arguments.

**A10:** When you access a property on a proxied object: the Proxy `get` trap fires first. Inside the trap, `Reflect.get(target, key, receiver)` is called, which consults the target's actual property — including any `Object.defineProperty` getter defined on it. Proxy traps intercept at the highest level; descriptor getters run when the Reflect operation executes on the underlying target.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can explain what meta programming is and why it matters | ✓ |
| 2 | Can use `Reflect.get`, `set`, `has`, `deleteProperty` with correct return values | ✓ |
| 3 | Can use `Reflect.apply` and `Reflect.construct` correctly | ✓ |
| 4 | Can use `Reflect.ownKeys` and explain what it returns vs `Object.keys` | ✓ |
| 5 | Can create a Proxy with `new Proxy(target, handler)` | ✓ |
| 6 | Can write `get`, `set`, `has`, `deleteProperty` traps | ✓ |
| 7 | Can write `apply` and `construct` traps | ✓ |
| 8 | Can write `ownKeys` and `defineProperty` traps | ✓ |
| 9 | Understand the `receiver` argument and always pass it to `Reflect.get/set` | ✓ |
| 10 | Can create and revoke a `Proxy.revocable()` | ✓ |
| 11 | Know all 13 Proxy handler traps and what each intercepts | ✓ |
| 12 | Understand Proxy invariants and why they cannot be violated | ✓ |
| 13 | Can use well-known Symbols (`Symbol.iterator`, `Symbol.toPrimitive`) | ✓ |
| 14 | Built the full Reactive Store project using Proxy + Reflect throughout | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Forgetting `return` in `set` trap | Returns `undefined` (falsy) → strict mode throws | Always `return Reflect.set(...)` or `return true/false` |
| Not passing `receiver` to `Reflect.get` | Getters on target use raw target as `this`, bypassing proxy | `Reflect.get(target, key, receiver)` — always pass it |
| Double-wrapping objects in `get` trap | Nested object gets wrapped in new proxy on every read | Track already-proxied objects with `WeakSet` |
| Using proxy as `this` in trap | Inside a trap, `this` is the handler, not the proxy or target | Use `target` or `receiver` explicitly |
| Breaking invariants | Returning inconsistent values for non-configurable properties | Test with strict mode; check the invariant table |
| `ownKeys` without `getOwnPropertyDescriptor` | Engine verifies each returned key — missing descriptor causes error | Pair `ownKeys` with `getOwnPropertyDescriptor` trap |
| Losing revoke reference | No way to revoke a revocable proxy | Store both `proxy` and `revoke` from `Proxy.revocable()` |
| Proxy on hot path | Every trap call adds overhead | Profile first; avoid proxy on million-calls-per-second paths |
| Proxying the wrong object | Setting a trap on a copy instead of the original | `new Proxy(originalObject, handler)` — proxy wraps the original |
| `Symbol.for()` vs `Symbol()` | `Symbol()` creates unique symbols — `Symbol.for(key)` returns shared global one | Use `Symbol.for(key)` only for intentionally shared symbols |

---

## One-Sentence Summary

> JavaScript meta programming — built on `Reflect`'s clean functional interface to fundamental operations and `Proxy`'s ability to intercept any interaction with any object — is what powers reactive frameworks, validation libraries, ORM query builders, and developer tools: code that programs the behaviour of other code at runtime.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Meta Programming (4 pages)*
