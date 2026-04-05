---
render_with_liquid: false
title: "JavaScript Complete Reference Manual: Every Built-in Object · Every Method · Every Property — Fully Explained with Examples"
nav_order: 46
---

> **What this document is:**
> This is the definitive companion to the W3Schools JavaScript Reference (`jsref`). Every JavaScript built-in object is broken down from scratch — what it is, why it exists, every property and method it owns, how each one works, and how each is used in real-world Nigerian software development contexts. Nothing is skipped. Every method has working code with expected output.

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING: JAVASCRIPT BUILT-IN OBJECTS

**What are built-in objects?**
JavaScript comes with a set of pre-made tools that are always available — you never need to install them, import them, or build them yourself. Think of them as the appliances that come standard with a furnished flat: a fridge, a cooker, a washing machine. They are always there, ready to use.

These built-in objects include `Array`, `String`, `Number`, `Math`, `Date`, `JSON`, `Object`, `Function`, `Boolean`, `RegExp`, `Error`, and the global functions. Understanding them deeply means you never have to re-invent the wheel — you just reach for the right tool.

**How this reference is organised:**
Each section covers one built-in object and is structured as:
1. What is it and why does it exist?
2. Every property with explanation + example
3. Every method with explanation + example (simple → real-world)
4. Common mistakes and gotchas

---

## SECTION 1: THE ARRAY OBJECT

### What is an Array?
An Array is an ordered, indexed collection of values. Think of it as a class attendance register — students are listed in order (position 0, 1, 2...), each has a name (value), and the register has a fixed count (length) at any moment.

**Creating arrays:**
```javascript
// Literal syntax (always preferred)
let fruits = ["Mango", "Pawpaw", "Banana", "Orange", "Pineapple"];

// Array constructor (rarely used)
let empty = new Array(5);       // Creates [undefined × 5]
let filled = new Array(1,2,3);  // Creates [1, 2, 3]

// Array.of() — always creates elements, not holes
let nums = Array.of(5);         // [5] — one element
let more = Array.of(1, 2, 3);  // [1, 2, 3]

// Array.from() — from any iterable or array-like object
let chars = Array.from("Lagos");            // ["L","a","g","o","s"]
let squares = Array.from({length:5}, (_,i) => (i+1)**2); // [1,4,9,16,25]
let fromSet = Array.from(new Set([1,2,2,3,3])); // [1,2,3] (deduped)
```

---

### Array Properties

#### `length` — Number of elements in the array

```javascript
let products = ["Rice", "Beans", "Garri", "Yam", "Semovita"];
console.log(products.length); // 5

// length is writable — you can shrink an array with it!
products.length = 3;
console.log(products); // ["Rice", "Beans", "Garri"] — last 2 cut off

// Extending with length adds empty slots
products.length = 6;
console.log(products);        // ["Rice", "Beans", "Garri", <3 empty items>]
console.log(products[5]);     // undefined
console.log(products.length); // 6

// Most common use: get the last element
let last = products[products.length - 1];
console.log(last); // undefined (empty slot) — or use .at(-1)
```

---

### Array Static Methods (called on `Array` itself, not on an array instance)

#### `Array.isArray()` — Check if a value is a real array

```javascript
// Why does this exist? Because typeof [] returns "object" — not helpful!
console.log(typeof []);        // "object" — ambiguous
console.log(Array.isArray([])); // true — precise

console.log(Array.isArray([1, 2, 3]));   // true
console.log(Array.isArray("hello"));     // false — string
console.log(Array.isArray({length: 3})); // false — array-like object, not array
console.log(Array.isArray(new Array())); // true

// Real-world use: API responses sometimes give a single object or an array
function processItems(data) {
  let items = Array.isArray(data) ? data : [data];  // normalise to array
  items.forEach(item => console.log(item.name));
}

processItems({ name: "Indomie" });          // "Indomie"
processItems([{ name: "Rice" }, { name: "Beans" }]); // "Rice", "Beans"
```

#### `Array.from()` — Create an array from any iterable or array-like

```javascript
// From a string
console.log(Array.from("Abuja"));          // ["A","b","u","j","a"]

// From a Set (removes duplicates)
let unique = Array.from(new Set([10, 20, 10, 30, 20]));
console.log(unique); // [10, 20, 30]

// From a Map
let map = new Map([["name","Tunde"], ["city","Lagos"]]);
console.log(Array.from(map)); // [["name","Tunde"],["city","Lagos"]]

// From DOM NodeList (very common in web dev)
// let divs = Array.from(document.querySelectorAll("div"));
// divs.forEach(div => div.classList.add("styled")); // now has .forEach!

// With a mapping function — second argument
let tripled = Array.from([1,2,3,4,5], n => n * 3);
console.log(tripled); // [3, 6, 9, 12, 15]

// Create a range of numbers
let range = Array.from({length: 10}, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Create a range of dates
let dates = Array.from({length: 7}, (_, i) => {
  let d = new Date();
  d.setDate(d.getDate() + i);
  return d.toLocaleDateString("en-NG");
});
console.log(dates); // Next 7 days starting today
```

#### `Array.of()` — Create an array from arguments

```javascript
// Why use Array.of() instead of Array()?
console.log(Array(3));       // [ <3 empty items> ] — hole array!
console.log(Array.of(3));    // [3] — actual array with 3 as element

console.log(Array.of(1, 2, 3));    // [1, 2, 3]
console.log(Array.of("a", "b"));   // ["a", "b"]
console.log(Array.of(7));          // [7]
```

---

### Array Instance Methods — Mutating (change the original array)

#### `push()` — Add one or more elements to the END

```javascript
let cart = ["Rice", "Beans"];
cart.push("Garri");                 // Add one
cart.push("Yam", "Semovita");      // Add multiple
console.log(cart);   // ["Rice", "Beans", "Garri", "Yam", "Semovita"]
console.log(cart.push("Eba"));     // Returns NEW length: 6

// Real-world: collecting form inputs
let selectedItems = [];
document.querySelectorAll("input:checked").forEach(checkbox => {
  selectedItems.push(checkbox.value);
});
```

#### `pop()` — Remove and return the LAST element

```javascript
let stack = [10, 20, 30, 40, 50];
let last = stack.pop();
console.log(last);   // 50 — returns the removed element
console.log(stack);  // [10, 20, 30, 40]

// pop() on empty array returns undefined (no error)
let empty = [];
console.log(empty.pop()); // undefined

// Real-world: browser history back button simulation
let history = ["home", "products", "cart", "checkout"];
let currentPage = history.pop();  // "checkout"
let previousPage = history.pop(); // "cart"
console.log("Going back to:", previousPage); // Going back to: cart
```

#### `unshift()` — Add one or more elements to the BEGINNING

```javascript
let queue = ["Chidi", "Ngozi", "Emeka"];
queue.unshift("Babatunde");            // Add one to front
queue.unshift("Amaka", "Tunde");      // Add multiple — they go in as a unit
console.log(queue);
// ["Amaka", "Tunde", "Babatunde", "Chidi", "Ngozi", "Emeka"]
console.log(queue.unshift("Kemi")); // Returns new length: 7

// ⚠️ unshift() is SLOW for large arrays — it has to re-index all elements
// For performance-critical code, consider push() + reverse()
```

#### `shift()` — Remove and return the FIRST element

```javascript
let queue = ["First Customer", "Second Customer", "Third Customer"];
let served = queue.shift();
console.log(served);  // "First Customer"
console.log(queue);   // ["Second Customer", "Third Customer"]

// Real-world: job queue processing
let jobQueue = [
  { id: 1, task: "Send email" },
  { id: 2, task: "Generate report" },
  { id: 3, task: "Update database" }
];

while (jobQueue.length > 0) {
  let job = jobQueue.shift(); // Take from front (FIFO)
  console.log("Processing:", job.task);
  // Processing: Send email
  // Processing: Generate report
  // Processing: Update database
}
```

#### `splice()` — Remove, replace, or insert elements at any position

```javascript
// splice(start, deleteCount, ...itemsToInsert)
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

// Remove 2 elements starting at index 2
let removed = months.splice(2, 2);
console.log(removed); // ["Mar", "Apr"]
console.log(months);  // ["Jan", "Feb", "May", "Jun"]

// Insert without removing (deleteCount = 0)
months.splice(2, 0, "Mar", "Apr");   // Re-insert at position 2
console.log(months); // ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

// Replace elements (remove 1, insert new ones)
months.splice(1, 1, "February");     // Replace "Feb" with "February"
console.log(months); // ["Jan", "February", "Mar", "Apr", "May", "Jun"]

// Remove from end (negative start)
months.splice(-2);                    // Remove last 2
console.log(months); // ["Jan", "February", "Mar", "Apr"]

// Real-world: remove a specific item from a cart
let cartItems = [
  { id: 1, name: "Rice" },
  { id: 2, name: "Beans" },
  { id: 3, name: "Garri" }
];

function removeFromCart(id) {
  let index = cartItems.findIndex(item => item.id === id);
  if (index !== -1) cartItems.splice(index, 1);
}

removeFromCart(2);
console.log(cartItems); // [{ id:1, name:"Rice" }, { id:3, name:"Garri" }]
```

#### `sort()` — Sort the array IN PLACE

```javascript
// Default: sorts as strings (lexicographic)
let fruits = ["Mango", "Apple", "Banana", "Orange", "Avocado"];
fruits.sort();
console.log(fruits); // ["Apple", "Avocado", "Banana", "Mango", "Orange"]

// ⚠️ Default sort BREAKS for numbers!
let numbers = [10, 9, 2, 1, 100, 21];
numbers.sort();
console.log(numbers); // [1, 10, 100, 2, 21, 9] — WRONG for numbers!

// ✅ Correct: provide a comparator function
numbers.sort((a, b) => a - b);       // Ascending
console.log(numbers); // [1, 2, 9, 10, 21, 100]

numbers.sort((a, b) => b - a);       // Descending
console.log(numbers); // [100, 21, 10, 9, 2, 1]

// Sort objects by property
let employees = [
  { name: "Tunde",  salary: 250000 },
  { name: "Amaka",  salary: 450000 },
  { name: "Chidi",  salary: 180000 },
  { name: "Ngozi",  salary: 320000 }
];

// By salary ascending
employees.sort((a, b) => a.salary - b.salary);
console.log(employees.map(e => e.name));
// ["Chidi", "Tunde", "Ngozi", "Amaka"]

// By name alphabetically
employees.sort((a, b) => a.name.localeCompare(b.name));
console.log(employees.map(e => e.name));
// ["Amaka", "Chidi", "Ngozi", "Tunde"]

// ⚠️ sort() mutates the original! To preserve original:
let original = [3, 1, 4, 1, 5, 9];
let sorted = [...original].sort((a,b) => a-b); // Spread to copy first
console.log(original); // [3, 1, 4, 1, 5, 9] — unchanged
console.log(sorted);   // [1, 1, 3, 4, 5, 9]
```

#### `reverse()` — Reverse the array IN PLACE

```javascript
let arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]

// Reverse a string using array:
let word = "Babatunde";
let reversed = word.split("").reverse().join("");
console.log(reversed); // "ednuatabaB"

// ⚠️ reverse() also mutates! Copy first if you need the original:
let original = [1, 2, 3];
let rev = [...original].reverse();
console.log(original); // [1, 2, 3] — unchanged
```

#### `fill()` — Fill elements with a static value

```javascript
let arr = [1, 2, 3, 4, 5];

arr.fill(0);          // Fill entire array with 0
console.log(arr);     // [0, 0, 0, 0, 0]

arr.fill(7, 2);       // Fill from index 2 to end with 7
console.log(arr);     // [0, 0, 7, 7, 7]

arr.fill(9, 1, 3);    // Fill from index 1 to 3 (exclusive) with 9
console.log(arr);     // [0, 9, 9, 7, 7]

// Practical: create a pre-filled board for a game
let board = new Array(9).fill(null); // Tic-tac-toe: 9 empty cells
console.log(board); // [null, null, null, null, null, null, null, null, null]

// Create a 2D grid
let grid = Array.from({length:3}, () => new Array(3).fill(0));
console.log(grid);
// [[0,0,0],[0,0,0],[0,0,0]]
```

#### `copyWithin()` — Copy part of an array within itself

```javascript
let arr = [1, 2, 3, 4, 5];

// copyWithin(target, start, end)
arr.copyWithin(0, 3);      // Copy from index 3 to end, paste at index 0
console.log(arr);           // [4, 5, 3, 4, 5]

let arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(1, 3, 5);   // Copy indices 3-4, paste at index 1
console.log(arr2);           // [1, 4, 5, 4, 5]

// Mostly used in performance-critical typed array operations
```

---

### Array Instance Methods — Non-Mutating (return new array/value, original unchanged)

#### `slice()` — Extract a portion of an array

```javascript
let cities = ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin", "Enugu"];

// slice(start, end) — end is exclusive
console.log(cities.slice(1, 4));  // ["Abuja", "Kano", "Ibadan"]
console.log(cities.slice(2));     // ["Kano", "Ibadan", "Port Harcourt", "Benin", "Enugu"]
console.log(cities.slice(-3));    // Last 3: ["Port Harcourt", "Benin", "Enugu"]
console.log(cities.slice(-3, -1)); // ["Port Harcourt", "Benin"]
console.log(cities.slice());      // Full copy of array (shallow)

console.log(cities); // UNCHANGED

// Real-world: pagination
function paginate(array, page, itemsPerPage) {
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  return array.slice(start, end);
}

let products = Array.from({length: 25}, (_, i) => `Product ${i+1}`);
console.log(paginate(products, 1, 5)); // ["Product 1"..."Product 5"]
console.log(paginate(products, 3, 5)); // ["Product 11"..."Product 15"]
```

#### `concat()` — Merge arrays together

```javascript
let northernCities = ["Kano", "Kaduna", "Maiduguri"];
let southernCities = ["Lagos", "Ibadan", "Benin"];
let easternCities  = ["Enugu", "Aba", "Port Harcourt"];

let allCities = northernCities.concat(southernCities, easternCities);
console.log(allCities);
// ["Kano","Kaduna","Maiduguri","Lagos","Ibadan","Benin","Enugu","Aba","Port Harcourt"]

// concat doesn't mutate originals:
console.log(northernCities); // ["Kano", "Kaduna", "Maiduguri"] — unchanged

// Modern alternative: spread operator (preferred)
let merged = [...northernCities, ...southernCities, ...easternCities];
```

#### `join()` — Join all elements into a string

```javascript
let parts = ["Babatunde", "Adekunle", "Adeyemi"];

console.log(parts.join(" "));       // "Babatunde Adekunle Adeyemi" (space)
console.log(parts.join(", "));      // "Babatunde Adekunle Adeyemi" (comma-space)
console.log(parts.join("-"));       // "Babatunde-Adekunle-Adeyemi" (hyphen)
console.log(parts.join(""));        // "BabatundeAdekunleAdeyemi" (no separator)
console.log(parts.join(" | "));     // "Babatunde | Adekunle | Adeyemi"

// Real-world: building CSV rows
let row = ["Tunde", "32", "Lagos", "Engineer", "450000"];
let csvLine = row.join(",");
console.log(csvLine); // "Tunde,32,Lagos,Engineer,450000"

// Building SQL IN clause
let ids = [1, 5, 12, 34, 99];
let sql = `SELECT * FROM orders WHERE id IN (${ids.join(",")})`;
console.log(sql); // SELECT * FROM orders WHERE id IN (1,5,12,34,99)

// Building URL path
let pathParts = ["api", "v1", "users", "123", "orders"];
let url = "/" + pathParts.join("/");
console.log(url); // /api/v1/users/123/orders
```

#### `indexOf()` and `lastIndexOf()` — Find element position

```javascript
let items = ["Rice", "Beans", "Garri", "Rice", "Yam", "Rice"];

console.log(items.indexOf("Rice"));       // 0 — first occurrence
console.log(items.indexOf("Beans"));      // 1
console.log(items.indexOf("Pepper"));     // -1 — not found
console.log(items.indexOf("Rice", 1));    // 3 — start searching from index 1

console.log(items.lastIndexOf("Rice"));   // 5 — last occurrence
console.log(items.lastIndexOf("Rice", 4)); // 3 — search backwards from index 4

// Check if an element exists:
if (items.indexOf("Garri") !== -1) {
  console.log("Garri is in stock");
}
// Modern: use includes() instead
if (items.includes("Garri")) {
  console.log("Garri is in stock");
}
```

#### `includes()` — Check if element exists (returns boolean)

```javascript
let permissions = ["read", "write", "delete", "admin"];

console.log(permissions.includes("write"));  // true
console.log(permissions.includes("print"));  // false
console.log(permissions.includes("read", 2)); // false — start from index 2

// Works with NaN (unlike indexOf)!
let arr = [1, 2, NaN, 4];
console.log(arr.indexOf(NaN));   // -1 — can't find NaN with indexOf
console.log(arr.includes(NaN));  // true — includes() works!

// Real-world: permission checking
function hasPermission(user, action) {
  return user.permissions.includes(action);
}

let user = { name: "Tunde", permissions: ["read", "write"] };
console.log(hasPermission(user, "delete")); // false
console.log(hasPermission(user, "read"));   // true
```

#### `flat()` — Flatten nested arrays

```javascript
let nested = [1, [2, 3], [4, [5, 6]], [7, [8, [9]]]];

console.log(nested.flat());     // [1,2,3,4,[5,6],7,[8,[9]]] — 1 level deep
console.log(nested.flat(2));    // [1,2,3,4,5,6,7,[9]] — 2 levels deep
console.log(nested.flat(Infinity)); // [1,2,3,4,5,6,7,8,9] — all levels

// Real-world: combining multiple arrays returned from API calls
let regionOrders = [
  [{ id: 1 }, { id: 2 }],  // Lagos orders
  [{ id: 3 }],              // Abuja orders
  [{ id: 4 }, { id: 5 }]   // Kano orders
];

let allOrders = regionOrders.flat();
console.log(allOrders.length); // 5
```

#### `flatMap()` — Map + Flat in one step (1 level only)

```javascript
let sentences = ["Tunde loves JavaScript", "Amaka codes daily", "Chidi reads books"];

// Get every word across all sentences
let words = sentences.flatMap(s => s.split(" "));
console.log(words);
// ["Tunde","loves","JavaScript","Amaka","codes","daily","Chidi","reads","books"]

// Practical: expand items
let orders = [
  { customer: "Tunde", items: ["Rice", "Oil"] },
  { customer: "Amaka", items: ["Beans"] },
  { customer: "Chidi", items: ["Garri", "Salt", "Pepper"] }
];

let allItems = orders.flatMap(order => order.items);
console.log(allItems); // ["Rice","Oil","Beans","Garri","Salt","Pepper"]
```

---

### Array Iteration Methods — Higher-Order Functions

#### `forEach()` — Run a function for each element

```javascript
let prices = [5000, 12000, 3500, 8000, 15000];

// Basic usage
prices.forEach((price, index, array) => {
  // price  = current element value
  // index  = current element index
  // array  = the original array
  console.log(`Item ${index + 1}: ₦${price.toLocaleString()}`);
});
// Item 1: ₦5,000
// Item 2: ₦12,000 ... etc.

// ⚠️ forEach always returns undefined — you can't chain it!
// ⚠️ You cannot break out of forEach (use for...of or some() instead)

// Real-world: update DOM elements
let products = ["Rice", "Beans", "Garri"];
products.forEach(product => {
  let li = document.createElement("li");
  li.textContent = product;
  document.getElementById("product-list").appendChild(li);
});
```

#### `map()` — Transform every element (returns new array)

```javascript
let salaries = [250000, 450000, 180000, 320000, 500000];

// Apply 7.5% tax to all
let afterTax = salaries.map(salary => salary * 0.925);
console.log(afterTax); // [231250, 416250, 166500, 296000, 462500]

// Format as currency strings
let formatted = salaries.map(s => `₦${s.toLocaleString()}`);
console.log(formatted);
// ["₦250,000", "₦450,000", "₦180,000", "₦320,000", "₦500,000"]

// Transform array of objects
let users = [
  { firstName: "Babatunde", lastName: "Adeyemi", age: 32 },
  { firstName: "Amaka",     lastName: "Okonkwo", age: 28 },
  { firstName: "Chidi",     lastName: "Nwosu",   age: 35 }
];

let displayNames = users.map(u => `${u.firstName} ${u.lastName}`);
console.log(displayNames);
// ["Babatunde Adeyemi", "Amaka Okonkwo", "Chidi Nwosu"]

// Add a computed property
let withBonus = users.map(u => ({
  ...u,
  bonus: u.age > 30 ? 50000 : 25000,
  fullName: `${u.firstName} ${u.lastName}`
}));
console.log(withBonus[0]);
// { firstName:"Babatunde", ..., bonus: 50000, fullName: "Babatunde Adeyemi" }
```

#### `filter()` — Keep only elements that pass a test

```javascript
let transactions = [
  { id: 1, type: "credit", amount: 50000,  category: "salary" },
  { id: 2, type: "debit",  amount: 12000,  category: "food" },
  { id: 3, type: "debit",  amount: 45000,  category: "rent" },
  { id: 4, type: "credit", amount: 15000,  category: "freelance" },
  { id: 5, type: "debit",  amount: 3500,   category: "transport" },
  { id: 6, type: "debit",  amount: 250000, category: "investment" }
];

// Get only credits
let income = transactions.filter(t => t.type === "credit");
console.log(income.length); // 2

// Get large transactions (over ₦40,000)
let large = transactions.filter(t => t.amount > 40000);
console.log(large.map(t => t.category)); // ["rent", "investment"]

// Combine multiple conditions
let smallDebits = transactions.filter(t => t.type === "debit" && t.amount < 20000);
console.log(smallDebits.map(t => `${t.category}: ₦${t.amount}`));
// ["food: ₦12000", "transport: ₦3500"]

// Filter out null/undefined values
let mixed = [1, null, 2, undefined, 3, false, 0, "", 4, 5];
let truthy = mixed.filter(Boolean); // Boolean(x) is true for truthy values
console.log(truthy); // [1, 2, 3, 4, 5]

// Filter unique values (see also Set)
let nums = [1, 2, 2, 3, 3, 3, 4];
let unique = nums.filter((val, idx, arr) => arr.indexOf(val) === idx);
console.log(unique); // [1, 2, 3, 4]
```

#### `reduce()` — Reduce array to a single value

```javascript
// reduce(callback(accumulator, currentValue, index, array), initialValue)

// Sum all numbers
let prices = [5000, 12000, 3500, 8000, 15000];
let total = prices.reduce((sum, price) => sum + price, 0);
console.log(total); // 43500

// Find maximum value
let max = prices.reduce((highest, price) => Math.max(highest, price), -Infinity);
console.log(max); // 15000

// Count occurrences
let items = ["Rice", "Beans", "Rice", "Garri", "Beans", "Rice"];
let count = items.reduce((freq, item) => {
  freq[item] = (freq[item] || 0) + 1;
  return freq;
}, {});
console.log(count); // { Rice: 3, Beans: 2, Garri: 1 }

// Group by category
let transactions = [
  { category: "food",      amount: 5000 },
  { category: "transport", amount: 2000 },
  { category: "food",      amount: 3500 },
  { category: "rent",      amount: 45000 },
  { category: "transport", amount: 1500 },
  { category: "food",      amount: 7000 }
];

let grouped = transactions.reduce((groups, t) => {
  let cat = t.category;
  groups[cat] = groups[cat] || [];
  groups[cat].push(t.amount);
  return groups;
}, {});
console.log(grouped);
// { food: [5000,3500,7000], transport: [2000,1500], rent: [45000] }

// Total spending per category
let categoryTotals = Object.entries(grouped).reduce((result, [cat, amounts]) => {
  result[cat] = amounts.reduce((s, a) => s + a, 0);
  return result;
}, {});
console.log(categoryTotals);
// { food: 15500, transport: 3500, rent: 45000 }

// Flatten nested arrays (alternative to flat())
let nested = [[1,2],[3,4],[5,6]];
let flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat); // [1,2,3,4,5,6]

// Build an object from array
let kvPairs = [["name","Tunde"], ["city","Lagos"], ["age",32]];
let obj = kvPairs.reduce((acc, [key, val]) => {
  acc[key] = val;
  return acc;
}, {});
console.log(obj); // { name:"Tunde", city:"Lagos", age:32 }
```

#### `reduceRight()` — Like reduce() but processes RIGHT to LEFT

```javascript
let nested = [[1,2],[3,4],[5,6]];
let reversed = nested.reduceRight((acc, arr) => acc.concat(arr), []);
console.log(reversed); // [5,6,3,4,1,2] — processes from right to left

// Right-to-left function composition
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const double = x => x * 2;
const addTen = x => x + 10;
const square = x => x * x;

const transform = compose(square, addTen, double);
// Applies: double(5)=10 → addTen(10)=20 → square(20)=400
console.log(transform(5)); // 400
```

#### `find()` — Return first matching element

```javascript
let employees = [
  { id: 1, name: "Tunde",  dept: "Engineering", salary: 450000 },
  { id: 2, name: "Amaka",  dept: "Marketing",   salary: 320000 },
  { id: 3, name: "Chidi",  dept: "Engineering", salary: 280000 },
  { id: 4, name: "Ngozi",  dept: "Finance",      salary: 380000 }
];

// Find one employee by id
let emp = employees.find(e => e.id === 3);
console.log(emp); // { id:3, name:"Chidi", dept:"Engineering", salary:280000 }

// If not found, returns undefined (not -1, not null)
let notFound = employees.find(e => e.id === 99);
console.log(notFound); // undefined

// Find first engineer
let firstEngineer = employees.find(e => e.dept === "Engineering");
console.log(firstEngineer.name); // "Tunde"

// Real-world: find a product in a cart
function getCartItem(cart, productId) {
  return cart.find(item => item.productId === productId);
}
```

#### `findIndex()` — Return index of first matching element

```javascript
let scores = [72, 85, 91, 64, 78, 95, 88];

// Find index of first score above 90
let firstHighIndex = scores.findIndex(s => s > 90);
console.log(firstHighIndex); // 2 (score = 91)

// Not found returns -1
let noneAbove100 = scores.findIndex(s => s > 100);
console.log(noneAbove100); // -1

// Real-world: update a specific item in array
let products = [
  { id: 1, name: "Rice", price: 32000 },
  { id: 2, name: "Beans", price: 18000 },
  { id: 3, name: "Garri", price: 5000 }
];

function updatePrice(id, newPrice) {
  let index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], price: newPrice };
  }
}

updatePrice(2, 19500);
console.log(products[1]); // { id:2, name:"Beans", price:19500 }
```

#### `findLast()` and `findLastIndex()` — Search from the END (ES2023)

```javascript
let readings = [23, 45, 12, 67, 34, 89, 45, 12];

// Find LAST value below 20
let lastLow = readings.findLast(r => r < 20);
console.log(lastLow); // 12 (the second 12, not the first)

// Find LAST index below 20
let lastLowIdx = readings.findLastIndex(r => r < 20);
console.log(lastLowIdx); // 7

// Practical: find the last failed transaction
let transactions = [
  { id: 1, status: "success" },
  { id: 2, status: "failed" },
  { id: 3, status: "success" },
  { id: 4, status: "failed" },
  { id: 5, status: "success" }
];

let lastFailed = transactions.findLast(t => t.status === "failed");
console.log(lastFailed); // { id:4, status:"failed" }
```

#### `every()` — Do ALL elements pass the test?

```javascript
let scores = [78, 85, 92, 71, 88, 79];

console.log(scores.every(s => s >= 70)); // true  — all pass
console.log(scores.every(s => s >= 80)); // false — not all pass

// Short-circuits: stops as soon as one fails
let bankBalances = [15000, 8000, 52000, 3000, 22000];
let allPositive = bankBalances.every(b => b > 0);
console.log(allPositive); // true

// Real-world: validate all form fields before submission
let fields = [
  { name: "username", value: "tunde", valid: true },
  { name: "email",    value: "tunde@mail.com", valid: true },
  { name: "phone",    value: "08012345678", valid: true }
];

let formReady = fields.every(field => field.valid);
console.log("Can submit:", formReady); // Can submit: true
```

#### `some()` — Does AT LEAST ONE element pass?

```javascript
let ages = [17, 22, 15, 28, 19];

console.log(ages.some(a => a >= 18)); // true — at least one adult
console.log(ages.some(a => a > 30));  // false — none above 30

// Short-circuits: stops as soon as one passes

// Real-world: check if cart has any out-of-stock items
let cart = [
  { name: "Rice", inStock: true },
  { name: "Beans", inStock: false },
  { name: "Garri", inStock: true }
];

let hasOutOfStock = cart.some(item => !item.inStock);
if (hasOutOfStock) {
  console.log("⚠️ Some items in your cart are out of stock!");
}
// ⚠️ Some items in your cart are out of stock!
```

#### `at()` — Access element by index (supports negative indexes) (ES2022)

```javascript
let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

console.log(months.at(0));   // "Jan"  — first element
console.log(months.at(5));   // "Jun"  — sixth element
console.log(months.at(-1));  // "Dec"  — LAST element
console.log(months.at(-3));  // "Oct"  — third from last

// Compare with bracket notation:
// months[months.length - 1] ← old way to get last
// months.at(-1)             ← modern, clean way

let prices = [100, 200, 300, 400, 500];
console.log(prices.at(-2)); // 400 — second to last
```

#### `entries()`, `keys()`, `values()` — Iterate with more info

```javascript
let fruits = ["Mango", "Banana", "Orange"];

// entries() — gives [index, value] pairs
for (let [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}
// 0: Mango
// 1: Banana
// 2: Orange

// keys() — gives just the indexes
for (let i of fruits.keys()) {
  console.log(i); // 0, 1, 2
}

// values() — gives just the values (same as for...of)
for (let fruit of fruits.values()) {
  console.log(fruit); // "Mango", "Banana", "Orange"
}

// Use Array.from() to convert to a real array:
let entriesArray = Array.from(fruits.entries());
console.log(entriesArray);
// [[0,"Mango"],[1,"Banana"],[2,"Orange"]]
```

#### `toSorted()`, `toReversed()`, `toSpliced()`, `with()` — Immutable versions (ES2023)

```javascript
// These return NEW arrays, never mutating the original!
let arr = [3, 1, 4, 1, 5, 9, 2, 6];

let sorted = arr.toSorted((a,b) => a - b);
console.log(sorted); // [1, 1, 2, 3, 4, 5, 6, 9]
console.log(arr);    // [3, 1, 4, 1, 5, 9, 2, 6] — unchanged!

let reversed = arr.toReversed();
console.log(reversed); // [6, 2, 9, 5, 1, 4, 1, 3]
console.log(arr);      // unchanged!

let spliced = arr.toSpliced(2, 2, 99, 100); // Remove 2 at index 2, insert 99,100
console.log(spliced); // [3, 1, 99, 100, 5, 9, 2, 6]
console.log(arr);     // unchanged!

let updated = arr.with(2, 999); // Replace index 2 with 999
console.log(updated); // [3, 1, 999, 1, 5, 9, 2, 6]
console.log(arr);     // unchanged!
```

---

## SECTION 2: THE STRING OBJECT

### What is a String?
A string is a sequence of characters used to represent text. Strings are **immutable** — once created, you cannot change individual characters; every string method returns a NEW string.

```javascript
// Creating strings — three ways
let single = 'Hello, Lagos!';
let double = "Hello, Abuja!";
let template = `Hello, ${["Kano", "Enugu"][0]}!`; // Template literal

// Strings are objects (primitively) — you can access methods on them
let name = "Babatunde";
console.log(name.length);    // 9 — property
console.log(name.toUpperCase()); // "BABATUNDE" — method
```

### String Properties

#### `length` — Number of characters

```javascript
let message = "Welcome to Nigeria!";
console.log(message.length); // 19

console.log("".length);       // 0 — empty string
console.log("  ".length);     // 2 — spaces count!
console.log("\n".length);     // 1 — newline is one character
console.log("😀".length);     // 2 — emoji = 2 UTF-16 code units!

// Checking for empty input (common in form validation)
let input = "   ";
if (input.trim().length === 0) {
  console.log("Input is empty or whitespace only");
}
```

### String Methods — Searching

#### `charAt()` — Get character at index

```javascript
let str = "Babatunde";
console.log(str.charAt(0));   // "B"
console.log(str.charAt(4));   // "t"
console.log(str.charAt(100)); // "" — out of range returns empty string

// Bracket notation (same result for valid indexes):
console.log(str[0]);   // "B"
console.log(str[100]); // undefined — out of range returns undefined
```

#### `charCodeAt()` and `codePointAt()` — Get numeric character code

```javascript
let str = "ABC";
console.log(str.charCodeAt(0)); // 65 — ASCII for 'A'
console.log(str.charCodeAt(1)); // 66 — ASCII for 'B'
console.log(str.charCodeAt(2)); // 67 — ASCII for 'C'

// codePointAt() handles emoji/unicode better:
let emoji = "😀";
console.log(emoji.charCodeAt(0));  // 55357 — first code unit (surrogate)
console.log(emoji.codePointAt(0)); // 128512 — actual Unicode code point

// Practical use: validate that only letters are typed
function isLetter(char) {
  let code = char.charCodeAt(0);
  return (code >= 65 && code <= 90) ||  // A-Z
         (code >= 97 && code <= 122);   // a-z
}
console.log(isLetter("A")); // true
console.log(isLetter("5")); // false
console.log(isLetter("!")); // false
```

#### `String.fromCharCode()` — Create character from code

```javascript
console.log(String.fromCharCode(65));         // "A"
console.log(String.fromCharCode(72,101,108,108,111)); // "Hello"

// Generate alphabet
let alphabet = Array.from({length:26}, (_, i) => String.fromCharCode(65 + i));
console.log(alphabet.join(""));
// "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
```

#### `indexOf()` and `lastIndexOf()` — Find substring position

```javascript
let text = "The quick brown fox jumps over the lazy dog";

console.log(text.indexOf("fox"));        // 16 — first occurrence
console.log(text.indexOf("cat"));        // -1 — not found
console.log(text.indexOf("the"));        // 31 — (case-sensitive! "The" at 0 won't match)
console.log(text.indexOf("o"));          // 12 — first 'o'
console.log(text.indexOf("o", 13));      // 17 — first 'o' starting from index 13

console.log(text.lastIndexOf("o"));      // 41 — last 'o'
console.log(text.lastIndexOf("the"));    // 31

// Check if substring exists
if (text.indexOf("fox") !== -1) {
  console.log("Contains 'fox'");
}
// Modern: use includes()
if (text.includes("fox")) {
  console.log("Contains 'fox'");
}
```

#### `includes()` — Check if substring exists

```javascript
let email = "babatunde@gmail.com";

console.log(email.includes("@"));         // true
console.log(email.includes("yahoo"));     // false
console.log(email.includes("gmail"));     // true
console.log(email.includes("gmail", 15)); // false — start search from position 15

// Case-sensitive!
console.log("Hello World".includes("world")); // false
console.log("Hello World".toLowerCase().includes("world")); // true

// Real-world: search filter
let products = ["Basmati Rice", "Brown Rice", "Jollof Rice Mix", "Beans Flour", "Garri"];
let searchTerm = "rice";

let results = products.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
console.log(results); // ["Basmati Rice", "Brown Rice", "Jollof Rice Mix"]
```

#### `startsWith()` and `endsWith()` — Check string boundaries

```javascript
let filename = "report_march_2026.pdf";

console.log(filename.startsWith("report")); // true
console.log(filename.startsWith("sales"));  // false
console.log(filename.endsWith(".pdf"));      // true
console.log(filename.endsWith(".docx"));     // false

// With position argument:
console.log(filename.startsWith("march", 7)); // true — check from position 7
console.log(filename.endsWith("2026", 18));   // true — treat as if string ends at 18

// Real-world: file type validation
function validateFileType(filename, allowedTypes) {
  return allowedTypes.some(ext => filename.endsWith(ext));
}

console.log(validateFileType("photo.jpg", [".jpg", ".png", ".gif"])); // true
console.log(validateFileType("script.js", [".jpg", ".png", ".gif"]));  // false

// Check URL protocol
function isSecure(url) {
  return url.startsWith("https://");
}
console.log(isSecure("https://api.myshop.com")); // true
console.log(isSecure("http://insecure.com"));     // false
```

#### `search()` — Search using regex, returns index

```javascript
let text = "My phone number is 08012345678 and email is tunde@gmail.com";

// Search for first digit sequence
let digitPos = text.search(/\d+/);
console.log(digitPos); // 19 — position where digits start

// Returns -1 if not found
console.log(text.search(/xyz/)); // -1

// Unlike indexOf(), search() supports regex patterns
console.log(text.search(/\d{11}/));  // 19 — 11-digit number
```

#### `match()` — Find matches using regex

```javascript
let text = "Order #1001 placed on 15/03/2026. Order #1002 on 22/03/2026.";

// Without 'g' flag — first match only (returns detailed object)
let firstMatch = text.match(/Order #\d+/);
console.log(firstMatch[0]); // "Order #1001"
console.log(firstMatch.index); // 0 — position in string

// With 'g' flag — all matches (returns array of strings)
let allMatches = text.match(/Order #\d+/g);
console.log(allMatches); // ["Order #1001", "Order #1002"]

// Extract all dates
let dates = text.match(/\d{2}\/\d{2}\/\d{4}/g);
console.log(dates); // ["15/03/2026", "22/03/2026"]

// Returns null if no match
let noMatch = text.match(/xyz/);
console.log(noMatch); // null

// Always check for null before using result!
if (dates) {
  console.log("Found", dates.length, "date(s)");
}
```

#### `matchAll()` — Find ALL matches with capture groups (ES2020)

```javascript
let log = "ERROR 404: Not Found | ERROR 500: Internal Server | ERROR 403: Forbidden";

// Use named groups for clarity
let pattern = /ERROR (?<code>\d+): (?<message>[^|]+)/g;
let matches = [...log.matchAll(pattern)];

matches.forEach(match => {
  console.log(`Code: ${match.groups.code}, Message: ${match.groups.message.trim()}`);
});
// Code: 404, Message: Not Found
// Code: 500, Message: Internal Server
// Code: 403, Message: Forbidden
```

### String Methods — Extracting

#### `slice()` — Extract substring by position

```javascript
let str = "Babatunde Adeyemi";
//          0123456789...

console.log(str.slice(0, 9));   // "Babatunde"
console.log(str.slice(10));     // "Adeyemi"
console.log(str.slice(-7));     // "Adeyemi" — 7 chars from end
console.log(str.slice(-7, -3)); // "Adey"

// Practical: get file extension
let filename = "invoice_march_2026.pdf";
let ext = filename.slice(filename.lastIndexOf("."));
console.log(ext); // ".pdf"

// Get first N characters
let preview = str.slice(0, 5) + "...";
console.log(preview); // "Babat..."
```

#### `substring()` — Extract substring (similar to slice, no negatives)

```javascript
let str = "JavaScript Reference Manual";

console.log(str.substring(0, 10));  // "JavaScript"
console.log(str.substring(11));     // "Reference Manual"
console.log(str.substring(11, 20)); // "Reference"

// Unlike slice(), substring() treats negative as 0:
console.log(str.substring(-5));     // Same as substring(0) — full string
console.log(str.slice(-5));         // "anual" — last 5 chars (different!)

// If start > end, substring() swaps them:
console.log(str.substring(20, 11)); // "Reference" — swapped to (11, 20)
console.log(str.slice(20, 11));     // "" — slice gives empty for this
```

#### `substr()` — Extract by start + length (DEPRECATED — avoid)

```javascript
// ⚠️ substr() is deprecated! Use slice() instead
let str = "Babatunde";
// substr(start, length)
console.log(str.substr(0, 4)); // "Baba" — 4 chars from index 0
// Prefer: str.slice(0, 4) → same result
```

#### `at()` — Character at index (supports negative) (ES2022)

```javascript
let str = "Nigeria";
console.log(str.at(0));   // "N"
console.log(str.at(-1));  // "a" — last character (cleaner than str[str.length-1])
console.log(str.at(-3));  // "e" — third from last
```

### String Methods — Modifying (returns new string)

#### `toUpperCase()` and `toLowerCase()`

```javascript
let name = "babatunde adeyemi";
console.log(name.toUpperCase()); // "BABATUNDE ADEYEMI"

let title = "CHIEF EXECUTIVE OFFICER";
console.log(title.toLowerCase()); // "chief executive officer"

// Title case:
function toTitleCase(str) {
  return str.toLowerCase().split(" ").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
}
console.log(toTitleCase("chief executive officer")); // "Chief Executive Officer"

// Case-insensitive comparison:
let input = "LAGOS";
let expected = "lagos";
console.log(input.toLowerCase() === expected); // true
```

#### `replace()` — Replace first occurrence

```javascript
let str = "I love JavaScript and JavaScript loves me";

// Replace string (first match only)
console.log(str.replace("JavaScript", "Python"));
// "I love Python and JavaScript loves me"

// Replace with regex (first match)
console.log(str.replace(/JavaScript/, "TypeScript"));
// "I love TypeScript and JavaScript loves me"

// Replace with regex + 'g' flag (ALL matches)
console.log(str.replace(/JavaScript/g, "TypeScript"));
// "I love TypeScript and TypeScript loves me"

// Case-insensitive replacement with 'i' flag
console.log(str.replace(/javascript/gi, "Node.js"));
// "I love Node.js and Node.js loves me"

// Replace with a function (dynamic replacement)
let prices = "Rice: 32000, Beans: 18000, Garri: 5000";
let formatted = prices.replace(/\d+/g, n => `₦${parseInt(n).toLocaleString()}`);
console.log(formatted);
// "Rice: ₦32,000, Beans: ₦18,000, Garri: ₦5,000"

// Using captured groups in replacement
let date = "2026-03-22";
let readable = date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
console.log(readable); // "22/03/2026"
```

#### `replaceAll()` — Replace ALL occurrences (ES2021)

```javascript
let text = "The cat sat on the mat. The cat ate a rat.";

// ✅ replaceAll() is clearer than replace() with /g flag
console.log(text.replaceAll("cat", "dog"));
// "The dog sat on the mat. The dog ate a rat."

// Sanitize user input
function sanitizeInput(str) {
  return str
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
console.log(sanitizeInput('<script>alert("hack")</script>'));
// &lt;script&gt;alert(&quot;hack&quot;)&lt;/script&gt;
```

#### `trim()`, `trimStart()`, `trimEnd()` — Remove whitespace

```javascript
let input = "   babatunde@gmail.com   ";

console.log(input.trim());      // "babatunde@gmail.com"
console.log(input.trimStart()); // "babatunde@gmail.com   "
console.log(input.trimEnd());   // "   babatunde@gmail.com"

// Essential for form validation
function cleanEmail(email) {
  return email.trim().toLowerCase();
}
console.log(cleanEmail("  TUNDE@Gmail.COM  ")); // "tunde@gmail.com"
```

#### `padStart()` and `padEnd()` — Pad string to target length

```javascript
// padStart(targetLength, padString)
let accountNum = "7890";
console.log(accountNum.padStart(10, "0")); // "0000007890"
console.log(accountNum.padStart(10, "*")); // "******7890"
console.log(accountNum.padStart(3, "0"));  // "7890" — shorter than original, unchanged

// padEnd(targetLength, padString)
let product = "Rice";
console.log(product.padEnd(15, " "));     // "Rice           " (for table formatting)
console.log(product.padEnd(15, "."));     // "Rice..........."

// Format report columns
function formatRow(label, value) {
  return label.padEnd(20, " ") + String(value).padStart(15, " ");
}
console.log(formatRow("Product", "Price (₦)"));
console.log(formatRow("Basmati Rice 50kg", "32,000"));
console.log(formatRow("Palm Oil 5L", "4,500"));
// Product                   Price (₦)
// Basmati Rice 50kg            32,000
// Palm Oil 5L                   4,500

// Format time: 9:5 → 09:05
function formatTime(h, m) {
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
}
console.log(formatTime(9, 5));  // "09:05"
console.log(formatTime(14, 30)); // "14:30"
```

#### `repeat()` — Repeat string N times

```javascript
console.log("Ha".repeat(3));    // "HaHaHa"
console.log("-".repeat(40));    // "----------------------------------------"
console.log("★".repeat(5));    // "★★★★★"
console.log("Na".repeat(0));   // "" (empty)

// Create a divider
function divider(char = "-", length = 50) {
  return char.repeat(length);
}
console.log(divider("═", 40)); // ════════════════════════════════════════

// Indent code
function indent(code, level) {
  return "  ".repeat(level) + code;
}
console.log(indent("if (true) {", 0));
console.log(indent("console.log('hello');", 1));
console.log(indent("}", 0));
// if (true) {
//   console.log('hello');
// }
```

#### `split()` — Split string into an array

```javascript
let csv = "Lagos,Abuja,Kano,Ibadan,Port Harcourt";

console.log(csv.split(","));          // ["Lagos","Abuja","Kano","Ibadan","Port Harcourt"]
console.log(csv.split(",", 3));       // ["Lagos","Abuja","Kano"] — limit to 3

let words = "Hello World JavaScript".split(" ");
console.log(words); // ["Hello", "World", "JavaScript"]

let chars = "Tunde".split("");
console.log(chars); // ["T","u","n","d","e"]

// Split on multiple delimiters using regex
let messy = "Kano;Kaduna, Maiduguri | Sokoto";
let cities = messy.split(/[;,\s|]+/);
console.log(cities); // ["Kano","Kaduna","Maiduguri","Sokoto"]

// Split on newlines (parsing text data)
let report = "Line 1\nLine 2\nLine 3";
console.log(report.split("\n")); // ["Line 1","Line 2","Line 3"]

// Parse key=value pairs
let config = "host=localhost\nport=3000\ndebug=true";
let settings = Object.fromEntries(
  config.split("\n").map(line => line.split("="))
);
console.log(settings); // { host:"localhost", port:"3000", debug:"true" }
```

#### `concat()` — Join strings together

```javascript
// concat() is rarely used — template literals and + are preferred
let hello = "Hello";
let world = "World";
console.log(hello.concat(", ", world, "!")); // "Hello, World!"

// Prefer:
console.log(`${hello}, ${world}!`); // "Hello, World!"
```

#### `normalize()` — Unicode normalisation

```javascript
// For dealing with special characters from different languages
let str1 = "\u00e9"; // é (precomposed)
let str2 = "e\u0301"; // e + combining accent (decomposed)

console.log(str1 === str2); // false — look same, different bytes
console.log(str1.normalize() === str2.normalize("NFC")); // true
```

### String Methods — Template Literals

```javascript
// Template literals (backtick strings) support:

// 1. Multi-line strings
let invoice = `
INVOICE
=======
Customer: Babatunde Adeyemi
Date: 22/03/2026
Items: 3
`;

// 2. Embedded expressions
let name = "Tunde";
let amount = 45000;
console.log(`Dear ${name}, your payment of ₦${amount.toLocaleString()} has been received.`);

// 3. Expressions in templates
console.log(`${2 + 2}`);                   // "4"
console.log(`${Math.round(Math.PI * 100) / 100}`); // "3.14"
console.log(`${true ? "Yes" : "No"}`);    // "Yes"

// 4. Nested templates
let items = ["Rice", "Beans"];
console.log(`Cart: ${items.map(i => `- ${i}`).join("\n")}`);
// Cart: - Rice
//       - Beans

// 5. Tagged template literals (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    let val = values[i - 1];
    return result + (val ? `**${val}**` : "") + str;
  });
}

let product = "Garri";
let price = 5000;
console.log(highlight`Buy ${product} for only ₦${price}!`);
// "Buy **Garri** for only ₦**5000**!"
```

---

## SECTION 3: THE NUMBER OBJECT

### What is Number in JavaScript?
JavaScript uses a 64-bit floating-point format (IEEE 754) for ALL numbers — there is no separate integer type (except BigInt). This means numbers like `0.1 + 0.2` are not perfectly precise.

```javascript
// Number creation
let integer = 42;
let decimal = 3.14;
let negative = -7;
let scientific = 2.5e6;   // 2,500,000
let hex = 0xFF;           // 255
let octal = 0o17;         // 15
let binary = 0b1010;      // 10
let bigSep = 1_000_000;   // 1000000 — underscore separator for readability (ES2021)
```

### Number Properties (Static — called on `Number`)

```javascript
console.log(Number.MAX_VALUE);          // 1.7976931348623157e+308 — largest possible number
console.log(Number.MIN_VALUE);          // 5e-324 — smallest positive number (near zero)
console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991 (2^53 - 1) — max safe integer
console.log(Number.MIN_SAFE_INTEGER);   // -9007199254740991 — min safe integer
console.log(Number.POSITIVE_INFINITY);  // Infinity
console.log(Number.NEGATIVE_INFINITY);  // -Infinity
console.log(Number.NaN);               // NaN — Not a Number
console.log(Number.EPSILON);           // 2.220446049250313e-16 — smallest representable difference

// MAX_SAFE_INTEGER: why does it matter?
let safe = Number.MAX_SAFE_INTEGER;
console.log(safe);         // 9007199254740991
console.log(safe + 1);     // 9007199254740992 — OK
console.log(safe + 2);     // 9007199254740992 — WRONG! Loses precision
// Use BigInt for larger integers:
let bigSafe = 9007199254740991n + 2n;
console.log(bigSafe);      // 9007199254740993n — correct!
```

### Number Static Methods

#### `Number.isInteger()` — Check if value is an integer

```javascript
console.log(Number.isInteger(42));       // true
console.log(Number.isInteger(42.0));     // true — 42.0 === 42 in JS
console.log(Number.isInteger(42.5));     // false
console.log(Number.isInteger("42"));     // false — it's a string!
console.log(Number.isInteger(Infinity)); // false

// Validate whole number input
function requireWholeNumber(value) {
  if (!Number.isInteger(value)) throw new Error(`${value} is not a whole number`);
  return value;
}
```

#### `Number.isFinite()` — Check if value is finite

```javascript
console.log(Number.isFinite(42));         // true
console.log(Number.isFinite(Infinity));   // false
console.log(Number.isFinite(-Infinity));  // false
console.log(Number.isFinite(NaN));        // false
console.log(Number.isFinite("42"));       // false — no type coercion (unlike global isFinite)

// Validate calculation result
function safeDivide(a, b) {
  let result = a / b;
  if (!Number.isFinite(result)) throw new Error("Division resulted in invalid number");
  return result;
}
```

#### `Number.isNaN()` — Check if value is NaN

```javascript
console.log(Number.isNaN(NaN));         // true
console.log(Number.isNaN(42));          // false
console.log(Number.isNaN("NaN"));       // false — it's a string (global isNaN() would say true!)
console.log(Number.isNaN(undefined));   // false

// ⚠️ Global isNaN() coerces types first — unreliable:
console.log(isNaN("hello"));        // true — "hello" converts to NaN
console.log(Number.isNaN("hello")); // false — "hello" is not the NaN value

// Safe number check pattern:
function isValidNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}
console.log(isValidNumber(42));       // true
console.log(isValidNumber("42"));     // false
console.log(isValidNumber(Infinity)); // false
console.log(isValidNumber(NaN));      // false
```

#### `Number.isSafeInteger()` — Check if in safe integer range

```javascript
console.log(Number.isSafeInteger(9007199254740991));  // true
console.log(Number.isSafeInteger(9007199254740992));  // false — too large!
console.log(Number.isSafeInteger(42));                // true
console.log(Number.isSafeInteger(42.5));              // false — not integer
```

#### `Number.parseInt()` and `Number.parseFloat()`

```javascript
// These are the same as the global parseInt() and parseFloat()
console.log(Number.parseInt("42px"));     // 42 — stops at non-numeric
console.log(Number.parseInt("3.14em"));   // 3 — integer part only
console.log(Number.parseFloat("3.14em")); // 3.14 — float part
console.log(Number.parseInt("abc"));      // NaN — no numeric start

// Always provide radix for parseInt!
console.log(parseInt("10", 2));   // 2 — binary "10"
console.log(parseInt("FF", 16));  // 255 — hex "FF"
console.log(parseInt("10", 10));  // 10 — decimal (explicit, safe)
console.log(parseInt("010", 8));  // 8 — octal (old code)
```

### Number Instance Methods

#### `toFixed()` — Format with decimal places (returns string)

```javascript
let pi = 3.141592653589793;

console.log(pi.toFixed(0));  // "3"
console.log(pi.toFixed(2));  // "3.14"
console.log(pi.toFixed(5));  // "3.14159"
console.log(pi.toFixed(10)); // "3.1415926536"

// ⚠️ toFixed() returns a STRING, not a number!
let result = pi.toFixed(2);
console.log(typeof result); // "string"
// Convert back: parseFloat(pi.toFixed(2)) or +(pi.toFixed(2))

// Real-world: money calculations
let price = 32499.999;
let formatted = price.toFixed(2);
console.log(`₦${formatted}`); // ₦32500.00

// Rounding: be aware of floating-point issues
console.log((1.005).toFixed(2)); // "1.00" — not "1.01"! (floating point issue)
// Solution: use a proper rounding function
function roundTo(num, places) {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}
console.log(roundTo(1.005, 2)); // 1.01 (sometimes — still floating point dependent)
```

#### `toPrecision()` — Format with total significant digits

```javascript
let num = 123456.789;

console.log(num.toPrecision(4));  // "1.235e+5" (scientific notation)
console.log(num.toPrecision(6));  // "123457"
console.log(num.toPrecision(9));  // "123456.789"
console.log(num.toPrecision(12)); // "123456.789000"

let small = 0.0001234;
console.log(small.toPrecision(3)); // "0.000123"
console.log(small.toPrecision(1)); // "0.0001"
```

#### `toExponential()` — Format in scientific notation

```javascript
let num = 123456789;

console.log(num.toExponential());    // "1.23456789e+8"
console.log(num.toExponential(2));   // "1.23e+8"
console.log(num.toExponential(5));   // "1.23457e+8"

let small = 0.000000042;
console.log(small.toExponential()); // "4.2e-8"
```

#### `toString()` — Convert to string (with optional base)

```javascript
let num = 255;
console.log(num.toString());    // "255" — base 10 (default)
console.log(num.toString(2));   // "11111111" — binary
console.log(num.toString(8));   // "377" — octal
console.log(num.toString(16));  // "ff" — hexadecimal

let n = 42;
console.log(n.toString(16).toUpperCase()); // "2A"
```

#### `toLocaleString()` — Format for a specific locale

```javascript
let amount = 1234567.89;

// Nigerian English
console.log(amount.toLocaleString("en-NG"));
// "1,234,567.89"

// As Nigerian Naira currency
console.log(amount.toLocaleString("en-NG", {
  style: "currency",
  currency: "NGN"
}));
// "₦1,234,567.89"

// As percentage
let rate = 0.075;
console.log(rate.toLocaleString("en-NG", {
  style: "percent",
  minimumFractionDigits: 1
}));
// "7.5%"

// Different locales
console.log(amount.toLocaleString("de-DE")); // "1.234.567,89" — German
console.log(amount.toLocaleString("fr-FR")); // "1 234 567,89" — French
console.log(amount.toLocaleString("ja-JP", { style:"currency", currency:"JPY" }));
// "¥1,234,568"
```

---

## SECTION 4: THE MATH OBJECT

### What is Math?
`Math` is a built-in object (not a class — you cannot create instances with `new Math()`) containing mathematical constants and functions. Think of it as a scientific calculator that's always in your pocket.

```javascript
// Math is NOT a constructor:
// new Math(); // ❌ TypeError: Math is not a constructor
// Just use Math directly:
console.log(Math.PI); // 3.141592653589793
```

### Math Properties (Constants)

```javascript
console.log(Math.PI);      // 3.141592653589793 — π (pi)
console.log(Math.E);       // 2.718281828459045 — Euler's number
console.log(Math.LN2);     // 0.6931471805599453 — natural log of 2
console.log(Math.LN10);    // 2.302585092994046 — natural log of 10
console.log(Math.LOG2E);   // 1.4426950408889634 — log base 2 of e
console.log(Math.LOG10E);  // 0.4342944819032518 — log base 10 of e
console.log(Math.SQRT2);   // 1.4142135623730951 — square root of 2
console.log(Math.SQRT1_2); // 0.7071067811865476 — square root of 1/2
```

### Math Methods — Rounding

```javascript
// round() — standard rounding (0.5 rounds up)
console.log(Math.round(4.4));  // 4
console.log(Math.round(4.5));  // 5
console.log(Math.round(-4.5)); // -4 (rounds toward +Infinity)

// floor() — always rounds DOWN toward -Infinity
console.log(Math.floor(4.9));  // 4
console.log(Math.floor(-4.1)); // -5 — goes DOWN toward more negative

// ceil() — always rounds UP toward +Infinity
console.log(Math.ceil(4.1));   // 5
console.log(Math.ceil(-4.9));  // -4 — goes UP toward less negative

// trunc() — removes decimal part (toward 0)
console.log(Math.trunc(4.9));  // 4
console.log(Math.trunc(-4.9)); // -4 (different from floor for negatives!)

// sign() — returns -1, 0, or 1
console.log(Math.sign(42));    // 1
console.log(Math.sign(-7));    // -1
console.log(Math.sign(0));     // 0

// fround() — nearest 32-bit float (for typed arrays/WebGL)
console.log(Math.fround(5.5));  // 5.5
console.log(Math.fround(5.05)); // 5.050000190734863 — not exact in 32-bit

// Real-world: round to N decimal places
function roundTo(num, decimals) {
  return Math.round(num * 10**decimals) / 10**decimals;
}
console.log(roundTo(3.14159, 2)); // 3.14
console.log(roundTo(1234.5678, 2)); // 1234.57

// Price rounding: always round UP for seller
let priceCalc = 1234.001;
console.log(Math.ceil(priceCalc * 100) / 100); // 1234.01 — fair for seller
```

### Math Methods — Arithmetic

```javascript
// abs() — absolute value
console.log(Math.abs(-42));   // 42
console.log(Math.abs(42));    // 42
console.log(Math.abs(-3.14)); // 3.14

// Practical: distance between two numbers
function distance(a, b) { return Math.abs(a - b); }
console.log(distance(100, 75));  // 25
console.log(distance(75, 100));  // 25

// pow() — exponentiation (same as **)
console.log(Math.pow(2, 10)); // 1024
console.log(Math.pow(3, 3));  // 27
console.log(2 ** 10);         // 1024 — modern shorthand

// sqrt() — square root
console.log(Math.sqrt(144)); // 12
console.log(Math.sqrt(2));   // 1.4142135623730951

// cbrt() — cube root
console.log(Math.cbrt(27));  // 3
console.log(Math.cbrt(8));   // 2
console.log(Math.cbrt(-27)); // -3

// hypot() — Euclidean distance (square root of sum of squares)
console.log(Math.hypot(3, 4));     // 5 — Pythagorean theorem
console.log(Math.hypot(5, 12));    // 13
console.log(Math.hypot(1, 1, 1));  // 1.7320508... — 3D distance

// Practical: distance between two GPS coordinates (simplified)
function approxDistance(lat1, lon1, lat2, lon2) {
  let dLat = lat2 - lat1;
  let dLon = lon2 - lon1;
  return Math.hypot(dLat, dLon) * 111; // Roughly 111km per degree
}

// max() and min()
console.log(Math.max(3, 1, 4, 1, 5, 9, 2, 6)); // 9
console.log(Math.min(3, 1, 4, 1, 5, 9, 2, 6)); // 1

// With arrays — use spread operator!
let prices = [5000, 12000, 3500, 8000, 15000];
console.log(Math.max(...prices)); // 15000
console.log(Math.min(...prices)); // 3500

// Note: Math.max() with no args returns -Infinity
console.log(Math.max()); // -Infinity
// This is correct for the accumulator pattern:
let max = [1,2,3].reduce((m,n) => Math.max(m,n), -Infinity);
```

### Math Methods — Logarithms and Trigonometry

```javascript
// log() — natural logarithm (base e)
console.log(Math.log(1));       // 0
console.log(Math.log(Math.E));  // 1
console.log(Math.log(100));     // 4.605170185988092

// log2() — logarithm base 2
console.log(Math.log2(8));   // 3 (2^3 = 8)
console.log(Math.log2(16));  // 4 (2^4 = 16)
console.log(Math.log2(1024)); // 10

// log10() — logarithm base 10
console.log(Math.log10(100));  // 2
console.log(Math.log10(1000)); // 3

// Trigonometry (angles in RADIANS, not degrees!)
function toRadians(deg) { return deg * Math.PI / 180; }
function toDegrees(rad) { return rad * 180 / Math.PI; }

console.log(Math.sin(toRadians(90)));   // 1 — sin(90°)
console.log(Math.cos(toRadians(0)));    // 1 — cos(0°)
console.log(Math.tan(toRadians(45)));   // 0.9999... ≈ 1 — tan(45°)

console.log(toDegrees(Math.asin(1)));   // 90 — arcsine
console.log(toDegrees(Math.acos(1)));   // 0 — arccosine
console.log(toDegrees(Math.atan(1)));   // 45 — arctangent
console.log(toDegrees(Math.atan2(1,1))); // 45 — atan with quadrant awareness

// sinh, cosh, tanh — hyperbolic functions (advanced/ML)
console.log(Math.sinh(1)); // 1.1752011936438014
console.log(Math.cosh(1)); // 1.5430806348152437
console.log(Math.tanh(1)); // 0.7615941559557649
```

### `Math.random()` — Generate Random Numbers

```javascript
// Returns float: 0 (inclusive) to 1 (exclusive)
console.log(Math.random()); // e.g., 0.7362...

// Random integer between 0 and max-1
function randomUpTo(max) {
  return Math.floor(Math.random() * max);
}
console.log(randomUpTo(6)); // Dice: 0-5 (not ideal for dice, use below)

// Random integer between min and max INCLUSIVE
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(randomInt(1, 6));    // Dice roll: 1-6
console.log(randomInt(18, 65));  // Random working age
console.log(randomInt(0, 100));  // Random percentage

// Random float between min and max
function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
console.log(randomFloat(3.5, 4.5).toFixed(2)); // e.g., "3.87"

// Shuffle an array (Fisher-Yates algorithm)
function shuffle(arr) {
  let copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    let j = randomInt(0, i);
    [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap
  }
  return copy;
}

let cards = ["♠A","♥K","♦Q","♣J","♠10"];
console.log(shuffle(cards)); // e.g., ["♦Q","♠A","♣J","♥K","♠10"]

// Random item from array
function randomChoice(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

let greetings = ["Hello!", "Welcome!", "Good day!", "Sannu!"];
console.log(randomChoice(greetings)); // One of the greetings randomly

// Generate random color (hex)
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
}
console.log(randomColor()); // e.g., "#a3f4c2"

// Generate random OTP
function generateOTP(digits = 6) {
  return String(randomInt(0, 10**digits - 1)).padStart(digits, "0");
}
console.log(generateOTP());   // e.g., "483729"
console.log(generateOTP(4));  // e.g., "2891"
```

---

## SECTION 5: THE DATE OBJECT

### What is Date?
The `Date` object represents a single moment in time. Internally, it stores the number of milliseconds since January 1, 1970, 00:00:00 UTC (the "Unix epoch"). Think of it as a very precise timestamp.

```javascript
// Creating Date objects
let now = new Date();                          // Current date and time
let specific = new Date(2026, 2, 22);          // Mar 22, 2026 (month is 0-indexed!)
let fromString = new Date("2026-03-22");       // ISO format
let fromString2 = new Date("March 22, 2026");  // Long format
let fromMs = new Date(1742601600000);          // From milliseconds since epoch
let withTime = new Date(2026, 2, 22, 14, 30, 0); // Mar 22, 2026, 14:30:00
```

### Date Static Methods

#### `Date.now()` — Current timestamp in milliseconds

```javascript
let timestamp = Date.now();
console.log(timestamp); // e.g., 1742601600000

// Measure execution time
let start = Date.now();
for (let i = 0; i < 1000000; i++) {} // Do something
let elapsed = Date.now() - start;
console.log(`Took ${elapsed}ms`); // e.g., "Took 3ms"

// ⚡ Performance.now() is more precise for benchmarking:
let t0 = performance.now();
// ... code ...
let t1 = performance.now();
console.log(`${(t1 - t0).toFixed(3)}ms`);
```

#### `Date.parse()` — Parse string to timestamp

```javascript
console.log(Date.parse("2026-03-22"));            // 1742601600000
console.log(Date.parse("March 22, 2026"));         // 1742601600000
console.log(Date.parse("invalid date"));           // NaN

// Use with caution — parsing can vary by environment
// Stick to ISO 8601 format: "YYYY-MM-DDTHH:mm:ssZ"
```

### Date Get Methods

```javascript
let d = new Date("2026-03-22T14:30:45.500Z");

// Local time get methods
console.log(d.getFullYear());     // 2026
console.log(d.getMonth());        // 2 (March — months are 0-indexed: Jan=0, Dec=11!)
console.log(d.getDate());         // 22 (day of month, 1-31)
console.log(d.getDay());          // 0 (day of week: 0=Sun, 1=Mon, ..., 6=Sat)
console.log(d.getHours());        // local hour (varies by timezone)
console.log(d.getMinutes());      // local minutes
console.log(d.getSeconds());      // local seconds
console.log(d.getMilliseconds()); // local milliseconds
console.log(d.getTime());         // ms since epoch: 1742654245500
console.log(d.getTimezoneOffset()); // minutes behind UTC (e.g., 0 for UTC, -60 for UTC+1)

// UTC get methods (timezone-independent)
console.log(d.getUTCFullYear());     // 2026
console.log(d.getUTCMonth());        // 2
console.log(d.getUTCDate());         // 22
console.log(d.getUTCDay());          // 0 (Sunday)
console.log(d.getUTCHours());        // 14
console.log(d.getUTCMinutes());      // 30
console.log(d.getUTCSeconds());      // 45

// Month names helper (since getMonth() returns 0-11)
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let today = new Date();
console.log(MONTHS[today.getMonth()]);  // e.g., "March"
console.log(DAYS[today.getDay()]);      // e.g., "Sunday"
```

### Date Set Methods

```javascript
let d = new Date();

// Set individual components
d.setFullYear(2030);
d.setMonth(11);           // December (0-indexed)
d.setDate(25);            // 25th
d.setHours(0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(0);

console.log(d.toDateString()); // "Thu Dec 25 2030"

// setMonth() with overflow — handles year rollover automatically!
let date = new Date(2026, 11, 31); // Dec 31, 2026
date.setMonth(date.getMonth() + 1); // Add one month
console.log(date.toDateString()); // "Sun Jan 31 2027" — automatically adjusted year!

// setDate() with overflow/underflow
let d2 = new Date(2026, 2, 1); // March 1, 2026
d2.setDate(0); // Day 0 = last day of previous month
console.log(d2.toDateString()); // "Sat Feb 28 2026"

// setTime() — set exact milliseconds since epoch
let d3 = new Date();
d3.setTime(0); // Reset to epoch
console.log(d3.toUTCString()); // "Thu, 01 Jan 1970 00:00:00 GMT"

// UTC set methods also exist:
// d.setUTCFullYear(), d.setUTCMonth(), d.setUTCDate(), etc.
```

### Date Formatting Methods

```javascript
let d = new Date("2026-03-22T09:30:00");

// Built-in format methods
console.log(d.toString());         // "Sun Mar 22 2026 09:30:00 GMT+0100 (WAT)"
console.log(d.toDateString());     // "Sun Mar 22 2026"
console.log(d.toTimeString());     // "09:30:00 GMT+0100 (West Africa Time)"
console.log(d.toISOString());      // "2026-03-22T08:30:00.000Z" — UTC ISO format
console.log(d.toJSON());           // same as toISOString()
console.log(d.toUTCString());      // "Sun, 22 Mar 2026 08:30:00 GMT"
console.log(d.toLocaleDateString()); // "3/22/2026" (varies by locale)
console.log(d.toLocaleTimeString()); // "9:30:00 AM" (varies by locale)
console.log(d.toLocaleString());     // "3/22/2026, 9:30:00 AM"

// Powerful: Intl.DateTimeFormat for consistent formatting
let formatter = new Intl.DateTimeFormat("en-NG", {
  weekday: "long",
  year:    "numeric",
  month:   "long",
  day:     "numeric",
  hour:    "2-digit",
  minute:  "2-digit",
  timeZone: "Africa/Lagos"
});
console.log(formatter.format(d));
// "Sunday, 22 March 2026 at 09:30 AM"

// Common formats
let toNigerianDate = d => d.toLocaleDateString("en-NG", {
  day: "2-digit", month: "2-digit", year: "numeric"
});
console.log(toNigerianDate(d)); // "22/03/2026"

let toShortDate = d => d.toLocaleDateString("en-NG", {
  day: "numeric", month: "short", year: "numeric"
});
console.log(toShortDate(d)); // "22 Mar 2026"
```

### Date Arithmetic

```javascript
// Dates are compared as numbers (milliseconds)
let date1 = new Date("2026-01-01");
let date2 = new Date("2026-12-31");

console.log(date1 < date2);   // true
console.log(date2 > date1);   // true
console.log(date1 === date2); // false (different objects — use .getTime() for equality)
console.log(date1.getTime() === new Date("2026-01-01").getTime()); // true

// Difference between dates
let diffMs = date2 - date1;                    // Milliseconds difference
let diffDays = diffMs / (1000 * 60 * 60 * 24); // Convert to days
console.log(`Days: ${Math.round(diffDays)}`);  // Days: 364

// Add days to a date
function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

let orderDate = new Date("2026-03-22");
let deliveryDate = addDays(orderDate, 5);
console.log(deliveryDate.toLocaleDateString("en-NG")); // "27/03/2026"

// Add months
function addMonths(date, months) {
  let result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

let subscriptionStart = new Date("2026-03-22");
let subscriptionEnd = addMonths(subscriptionStart, 12);
console.log(subscriptionEnd.toLocaleDateString("en-NG")); // "22/03/2027"

// Days remaining until a deadline
function daysUntil(targetDate) {
  let today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day
  let target = new Date(targetDate);
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

console.log(`Days until year-end: ${daysUntil("2026-12-31")}`);

// Age calculation
function calculateAge(birthDate) {
  let today = new Date();
  let birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  let m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

console.log(calculateAge("1994-03-22")); // 32 (as of March 2026)

// Is a date in the past?
function isPast(date) {
  return new Date(date) < new Date();
}
console.log(isPast("2025-01-01")); // true
console.log(isPast("2030-01-01")); // false

// Week number
function getWeekNumber(date) {
  let d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  let week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
console.log(getWeekNumber(new Date())); // Current week number
```

---

## SECTION 6: THE JSON OBJECT

### What is JSON?
JSON (JavaScript Object Notation) is a text format for representing structured data. It is the universal language of web APIs — almost every API sends and receives JSON. Think of it as a standardised packing format: your JavaScript objects get packed into JSON strings to travel over the internet, then unpacked at the destination.

**JSON rules (stricter than JavaScript objects):**
- Keys MUST be in double quotes
- No functions allowed
- No `undefined` values
- No comments
- No trailing commas
- Supports: strings, numbers, booleans, null, objects, arrays

### `JSON.stringify()` — JavaScript → JSON string

```javascript
// Basic conversion
let product = {
  name: "Basmati Rice",
  price: 32000,
  inStock: true,
  tags: ["grain", "premium", "imported"],
  supplier: { name: "Agro Ltd", city: "Kano" }
};

let json = JSON.stringify(product);
console.log(json);
{% raw %}// '{"name":"Basmati Rice","price":32000,"inStock":true,"tags":["grain","premium","imported"],"supplier":{"name":"Agro Ltd","city":"Kano"}}'{% endraw %}

// Pretty printing: JSON.stringify(value, replacer, spaces)
let pretty = JSON.stringify(product, null, 2);
console.log(pretty);
// {
//   "name": "Basmati Rice",
//   "price": 32000,
//   "inStock": true,
//   "tags": [
//     "grain",
//     "premium",
//     "imported"
//   ],
//   "supplier": {
//     "name": "Agro Ltd",
//     "city": "Kano"
//   }
// }

// Replacer array — include only certain keys
let filtered = JSON.stringify(product, ["name", "price"], 2);
console.log(filtered);
// {
//   "name": "Basmati Rice",
//   "price": 32000
// }

// Replacer function — transform during stringification
let transformed = JSON.stringify(product, (key, value) => {
  if (typeof value === "number") return `₦${value.toLocaleString()}`;
  return value;
}, 2);
// Note: price becomes "₦32,000" (now a string, not number)

// What gets EXCLUDED from JSON.stringify:
let obj = {
  name: "Tunde",
  greet: function() { return "Hello!"; }, // ❌ functions excluded
  age: undefined,                         // ❌ undefined excluded
  city: null,                             // ✅ null is included
  score: NaN,                             // ❌ NaN becomes null
  created: new Date()                     // ✅ Date becomes ISO string
};

console.log(JSON.stringify(obj));
// '{"name":"Tunde","city":null,"score":null,"created":"2026-03-22T..."}'

// toJSON() — control how an object gets stringified
class Product {
  constructor(name, price, costPrice) {
    this.name = name;
    this.price = price;
    this.costPrice = costPrice; // Private — don't expose!
  }

  toJSON() {
    return { name: this.name, price: this.price }; // Exclude costPrice
  }
}

let item = new Product("Rice", 32000, 18000);
console.log(JSON.stringify(item)); // '{"name":"Rice","price":32000}'
```

### `JSON.parse()` — JSON string → JavaScript

```javascript
// Basic parsing
let json = '{"name":"Babatunde","age":32,"city":"Lagos","active":true}';
let obj = JSON.parse(json);

console.log(obj.name);   // "Babatunde"
console.log(obj.age);    // 32 (number, not string)
console.log(obj.active); // true (boolean)
console.log(typeof obj); // "object"

// Parse an array
let arr = JSON.parse('[1, 2, 3, "four", true, null]');
console.log(arr); // [1, 2, 3, "four", true, null]

// Reviver function — transform during parsing
let dateJson = '{"name":"Tunde","created":"2026-03-22T09:30:00.000Z","price":"32000"}';
let parsed = JSON.parse(dateJson, (key, value) => {
  if (key === "created") return new Date(value); // Convert ISO string to Date
  if (key === "price") return parseInt(value);   // Convert string to number
  return value;
});

console.log(parsed.created instanceof Date); // true
console.log(parsed.price === 32000);         // true (number, not string)

// Always use try-catch when parsing external JSON!
function safeParseJSON(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Invalid JSON:", e.message);
    return fallback;
  }
}

console.log(safeParseJSON('{"valid": true}')); // { valid: true }
console.log(safeParseJSON("not valid json"));   // null (fallback)
console.log(safeParseJSON("{broken: json}"));   // null (missing quotes on key)

// Deep clone using JSON (simple objects only):
let original = { a: 1, b: { c: 2, d: [3, 4] } };
let clone = JSON.parse(JSON.stringify(original));
clone.b.c = 99;
console.log(original.b.c); // 2 — original unchanged!
// ⚠️ This loses: functions, Dates (become strings), undefined, NaN→null
// For proper deep cloning: use structuredClone()
let betterClone = structuredClone(original); // Handles more types
```

---

## SECTION 7: THE OBJECT CLASS

### What is Object?
`Object` is the base from which all JavaScript objects inherit. Every object in JavaScript is ultimately an instance of `Object`. It provides utility static methods for working with objects.

```javascript
// Object creation
let obj1 = {};                          // Literal — preferred
let obj2 = new Object();               // Constructor — avoid
let obj3 = Object.create(null);        // No prototype — pure data map
let obj4 = Object.create({ greet() { return "Hello"; } }); // Custom prototype
```

### Object Static Methods

#### `Object.keys()`, `Object.values()`, `Object.entries()` — Inspect properties

```javascript
let product = {
  name: "Garri",
  price: 5000,
  stock: 150,
  category: "Staple",
  inStock: true
};

// keys() — array of property names (strings)
console.log(Object.keys(product));
// ["name", "price", "stock", "category", "inStock"]

// values() — array of property values
console.log(Object.values(product));
// ["Garri", 5000, 150, "Staple", true]

// entries() — array of [key, value] pairs
console.log(Object.entries(product));
// [["name","Garri"],["price",5000],["stock",150],["category","Staple"],["inStock",true]]

// Real-world uses:
// Count properties
console.log(Object.keys(product).length); // 5

// Sum all numeric values
let numericSum = Object.values(product)
  .filter(v => typeof v === "number")
  .reduce((s, v) => s + v, 0);
console.log(numericSum); // 5155

// Filter object by value
let pricy = Object.fromEntries(
  Object.entries(product).filter(([k, v]) => typeof v === "number" && v > 100)
);
console.log(pricy); // { price: 5000, stock: 150 }

// Iterate object
for (let [key, value] of Object.entries(product)) {
  console.log(`${key}: ${value}`);
}
```

#### `Object.assign()` — Merge/copy objects

```javascript
let defaults = { theme: "light", language: "en", notifications: true };
let userSettings = { theme: "dark", fontSize: 16 };

// Merge userSettings INTO defaults (mutates target!)
let merged = Object.assign({}, defaults, userSettings);
console.log(merged);
// { theme: "dark", language: "en", notifications: true, fontSize: 16 }

// ⚠️ SHALLOW copy only — nested objects still share reference
let source = { name: "Tunde", address: { city: "Lagos" } };
let copy = Object.assign({}, source);
copy.address.city = "Abuja"; // Modifies BOTH!
console.log(source.address.city); // "Abuja" — shared reference!

// ✅ Use spread operator — cleaner, same result for shallow copy
let settings = { ...defaults, ...userSettings };

// Copy to existing object (mutates target)
let target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
console.log(target); // { a: 1, b: 2, c: 3 }
```

#### `Object.freeze()` and `Object.isFrozen()` — Prevent modifications

```javascript
const CONFIG = Object.freeze({
  API_URL: "https://api.myshop.com",
  VERSION: "2.1.0",
  MAX_RETRIES: 3,
  TIMEOUT: 30000
});

// Any attempt to modify fails silently (or throws in strict mode)
CONFIG.API_URL = "https://malicious.com"; // Silently ignored!
CONFIG.NEW_PROP = "value";                // Silently ignored!
delete CONFIG.VERSION;                    // Silently ignored!

console.log(CONFIG.API_URL); // "https://api.myshop.com" — unchanged
console.log(Object.isFrozen(CONFIG)); // true

// ⚠️ freeze() is SHALLOW — nested objects can still be modified!
const data = Object.freeze({
  name: "Tunde",
  address: { city: "Lagos" } // This object is NOT frozen!
});
data.address.city = "Abuja"; // Works! (nested object not protected)
console.log(data.address.city); // "Abuja"

// Deep freeze:
function deepFreeze(obj) {
  Object.values(obj).forEach(value => {
    if (typeof value === "object" && value !== null) deepFreeze(value);
  });
  return Object.freeze(obj);
}

const frozenData = deepFreeze({ a: 1, b: { c: 2 } });
frozenData.b.c = 99; // Silently ignored
console.log(frozenData.b.c); // 2 — protected!
```

#### `Object.seal()` and `Object.isSealed()` — Prevent add/delete but allow edit

```javascript
let user = { name: "Tunde", age: 32 };
Object.seal(user);

user.name = "Amaka";  // ✅ Can MODIFY existing properties
user.email = "...";   // ❌ Cannot ADD new properties (silently ignored)
delete user.age;      // ❌ Cannot DELETE properties (silently ignored)

console.log(user); // { name: "Amaka", age: 32 }
console.log(Object.isSealed(user)); // true
```

#### `Object.create()` — Create with specific prototype

```javascript
// Create an object that inherits from a prototype object
let animal = {
  breathe() { return `${this.name} breathes`; },
  eat(food) { return `${this.name} eats ${food}`; }
};

let dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() { return "Woof!"; };

console.log(dog.breathe()); // "Rex breathes" — inherited!
console.log(dog.eat("bone")); // "Rex eats bone" — inherited!
console.log(dog.bark());      // "Woof!" — own method

console.log(Object.getPrototypeOf(dog) === animal); // true

// Create with no prototype (pure data dictionary — faster key lookup)
let pureData = Object.create(null);
pureData.key = "value"; // No inherited toString, hasOwnProperty, etc.
```

#### `Object.fromEntries()` — Convert entries array to object (ES2019)

```javascript
// Inverse of Object.entries()
let entries = [["name","Tunde"], ["age",32], ["city","Lagos"]];
let obj = Object.fromEntries(entries);
console.log(obj); // { name:"Tunde", age:32, city:"Lagos" }

// From a Map
let map = new Map([["x", 10], ["y", 20], ["z", 30]]);
let fromMap = Object.fromEntries(map);
console.log(fromMap); // { x:10, y:20, z:30 }

// Transform object values (classic pattern: entries → map → fromEntries)
let prices = { rice: 32000, beans: 18000, garri: 5000 };

// Apply 10% discount
let discounted = Object.fromEntries(
  Object.entries(prices).map(([item, price]) => [item, price * 0.9])
);
console.log(discounted); // { rice: 28800, beans: 16200, garri: 4500 }

// Filter object keys
let expensive = Object.fromEntries(
  Object.entries(prices).filter(([item, price]) => price >= 10000)
);
console.log(expensive); // { rice: 32000, beans: 18000 }
```

#### `Object.defineProperty()` — Define property with descriptors

```javascript
let person = {};

// Define a property with full control
Object.defineProperty(person, "name", {
  value: "Babatunde",
  writable: false,       // Cannot change value
  enumerable: true,      // Shows up in for...in and Object.keys()
  configurable: false    // Cannot delete or redefine
});

// Define a computed property (getter/setter)
Object.defineProperty(person, "info", {
  get() {
    return `${this.name} (${this.age})`;
  },
  enumerable: true,
  configurable: true
});

person.age = 32;
console.log(person.info); // "Babatunde (32)"

// Real-world: create a non-enumerable internal flag
let obj = { data: "public" };
Object.defineProperty(obj, "_version", {
  value: 1,
  writable: true,
  enumerable: false,    // Won't show in Object.keys(), for...in, or JSON.stringify()
  configurable: false
});

console.log(obj._version);          // 1 — accessible directly
console.log(Object.keys(obj));     // ["data"] — _version hidden!
console.log(JSON.stringify(obj));  // '{"data":"public"}' — _version hidden!
```

#### `Object.getOwnPropertyNames()` and `Object.getOwnPropertyDescriptor()`

```javascript
let product = { name: "Rice", price: 32000 };

// All own property names (including non-enumerable)
console.log(Object.getOwnPropertyNames(product)); // ["name", "price"]

// Check a property's descriptor
let desc = Object.getOwnPropertyDescriptor(product, "name");
console.log(desc);
// { value: "Rice", writable: true, enumerable: true, configurable: true }

// All descriptors at once
let allDesc = Object.getOwnPropertyDescriptors(product);
console.log(allDesc);
// { name: { value:"Rice", ... }, price: { value:32000, ... } }
```

#### `Object.hasOwn()` — Check own property (ES2022)

```javascript
let user = { name: "Tunde", city: "Lagos" };

console.log(Object.hasOwn(user, "name"));     // true
console.log(Object.hasOwn(user, "toString")); // false — inherited, not own

// Modern alternative to obj.hasOwnProperty("key")
// Safer: hasOwnProperty can be overwritten, Object.hasOwn() cannot
```

#### `Object.getPrototypeOf()` and `Object.setPrototypeOf()`

```javascript
class Animal { breathe() { return "breathing"; } }
class Dog extends Animal { bark() { return "woof"; } }

let rex = new Dog();
console.log(Object.getPrototypeOf(rex) === Dog.prototype);    // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true

// instanceof checks the prototype chain:
console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true
console.log(rex instanceof Object); // true — everything is an Object!
```

---

## SECTION 8: THE FUNCTION OBJECT

### Function Properties

```javascript
function calculateLoan(principal, rate, years) {
  return principal * (1 + rate * years);
}

// name — function's name
console.log(calculateLoan.name); // "calculateLoan"

// length — number of declared parameters
console.log(calculateLoan.length); // 3

// Arrow functions also have name and length:
const greet = (name, greeting = "Hello") => `${greeting}, ${name}!`;
console.log(greet.name);   // "greet"
console.log(greet.length); // 1 — default params don't count!

// prototype — only on regular functions (not arrows)
function Foo() {}
console.log(Foo.prototype); // Foo {} — has prototype
const Bar = () => {};
console.log(Bar.prototype); // undefined — arrows have no prototype
```

### Function Methods

#### `call()` — Call with explicit `this` and individual arguments

```javascript
function formatBalance(currency, label) {
  return `${label}: ${currency}${this.balance.toLocaleString()}`;
}

let savings = { balance: 75000 };
let checking = { balance: 12500 };

console.log(formatBalance.call(savings, "₦", "Savings"));    // "Savings: ₦75,000"
console.log(formatBalance.call(checking, "₦", "Checking"));  // "Checking: ₦12,500"

// call() with class context
class Person {
  constructor(name) { this.name = name; }
  introduce() { return `I am ${this.name}`; }
}

class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }
  describe() {
    return `${Person.prototype.introduce.call(this)} — ${this.role}`;
  }
}

let emp = new Employee("Tunde", "Engineer");
console.log(emp.describe()); // "I am Tunde — Engineer"
```

#### `apply()` — Like call(), but arguments as array

```javascript
function sum(a, b, c) {
  return a + b + c;
}

let args = [10, 20, 30];
console.log(sum.apply(null, args)); // 60

// Great for spreading arrays into functions that don't accept arrays:
let numbers = [5, 2, 9, 1, 7, 3];
console.log(Math.max.apply(null, numbers)); // 9
// Modern: same result with spread: Math.max(...numbers)

// apply() with this:
function logSalary(bonus, tax) {
  return `${this.name}: Base=₦${this.salary}, Bonus=₦${bonus}, Tax=₦${tax}`;
}

let employee = { name: "Amaka", salary: 320000 };
console.log(logSalary.apply(employee, [50000, 24000]));
// "Amaka: Base=₦320000, Bonus=₦50000, Tax=₦24000"
```

#### `bind()` — Create a new function with fixed `this`

```javascript
let timer = {
  seconds: 0,
  start() {
    // Without bind, this in the callback would be window
    setInterval(this.tick.bind(this), 1000);
  },
  tick() {
    this.seconds++;
    console.log(`${this.seconds}s`);
  }
};

// Partial application with bind
function multiply(a, b) { return a * b; }

let double = multiply.bind(null, 2);  // Fix first arg as 2
let triple = multiply.bind(null, 3);  // Fix first arg as 3

console.log(double(5));   // 10
console.log(triple(5));   // 15
console.log(double(100)); // 200

// Event handlers
class Button {
  constructor(label) { this.label = label; }

  handleClick() {
    console.log(`${this.label} was clicked`);
  }

  render() {
    let btn = document.createElement("button");
    btn.textContent = this.label;
    // Without bind, handleClick loses 'this' context:
    btn.addEventListener("click", this.handleClick.bind(this));
    return btn;
  }
}
```

#### `toString()` — Get function source code

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet.toString());
// "function greet(name) {\n  return `Hello, ${name}!`;\n}"
// Useful for debugging, or checking if a function was wrapped/proxied
```

---

## SECTION 9: THE BOOLEAN OBJECT

### What is Boolean?
`Boolean` represents a logical value: `true` or `false`. It is the simplest data type in JavaScript.

```javascript
// Primitive booleans (always use these)
let isActive = true;
let hasDiscount = false;

// Boolean object (AVOID — confusing)
let boolObj = new Boolean(false);
// ⚠️ Boolean OBJECTS are always truthy — even when wrapping false!
if (boolObj) {
  console.log("This runs! Even though boolObj wraps false");
}
// This is why you should always use primitive booleans!

// Boolean() as a function (not constructor) — converts to boolean
console.log(Boolean(0));          // false
console.log(Boolean(""));         // false
console.log(Boolean(null));       // false
console.log(Boolean(undefined));  // false
console.log(Boolean(NaN));        // false
// Everything else is true:
console.log(Boolean(1));          // true
console.log(Boolean("hello"));    // true
console.log(Boolean([]));         // true — empty array is truthy!
console.log(Boolean({}));         // true — empty object is truthy!

// Faster shorthand: !! (double NOT)
console.log(!!0);       // false
console.log(!!"");      // false
console.log(!!null);    // false
console.log(!!42);      // true
console.log(!!"hello"); // true
console.log(!![]);      // true

// Falsy values in JavaScript:
let falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];
falsyValues.forEach(v => console.log(v, "→", Boolean(v)));
// false → false, 0 → false, ... (all false)

// Everything else is truthy — including:
let truthyValues = [true, 1, "0", "false", [], {}, function(){}];
truthyValues.forEach(v => console.log(v, "→", Boolean(v)));
// All → true
```

---

## SECTION 10: THE REGEXP OBJECT

### What is RegExp?
A Regular Expression (RegExp) is a pattern used to match character combinations in strings. Think of it as an extremely powerful search tool — not just for exact matches, but for patterns (e.g., "any 11-digit number starting with 0").

```javascript
// Creating RegExp — two ways
let pattern1 = /hello/;           // Literal (preferred)
let pattern2 = new RegExp("hello"); // Constructor (use when pattern is dynamic)
let pattern3 = new RegExp("hello", "i"); // Constructor with flags

// Dynamic pattern (only way to use variables in regex)
let searchTerm = "Lagos";
let dynamic = new RegExp(searchTerm, "gi"); // Can't do /searchTerm/ — searches literally
```

### RegExp Flags

| Flag | Meaning |
|------|---------|
| `g` | Global — find ALL matches (not just first) |
| `i` | Case-insensitive |
| `m` | Multiline — `^` and `$` match line start/end |
| `s` | Dotall — `.` matches newlines too |
| `u` | Unicode — enables full Unicode matching |
| `y` | Sticky — match from lastIndex position only |
| `d` | Indices — include start/end positions in match |

```javascript
let text = "Hello hello HELLO";
console.log(text.match(/hello/));   // ["hello"] — only one match
console.log(text.match(/hello/g));  // ["hello", "HELLO"] — wait, case sensitive!
console.log(text.match(/hello/gi)); // ["Hello","hello","HELLO"] — all 3, case insensitive
```

### RegExp Properties

```javascript
let pattern = /\d{4}-\d{2}-\d{2}/gim;

console.log(pattern.source);     // "\d{4}-\d{2}-\d{2}" — pattern text
console.log(pattern.flags);      // "gim" — all active flags
console.log(pattern.global);     // true
console.log(pattern.ignoreCase); // true
console.log(pattern.multiline);  // true
console.log(pattern.sticky);     // false
console.log(pattern.unicode);    // false
console.log(pattern.lastIndex);  // 0 — where next search begins (for global/sticky)
```

### RegExp Methods

#### `test()` — Returns true/false if pattern matches

```javascript
// Basic test
console.log(/\d+/.test("abc123"));    // true — contains digits
console.log(/\d+/.test("abcdef"));    // false — no digits
console.log(/^\d+$/.test("12345"));   // true — ONLY digits
console.log(/^\d+$/.test("123abc"));  // false

// Practical validators
const validators = {
  email:    (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
  phone:    (s) => /^(\+234|0)[7-9][01]\d{8}$/.test(s),
  password: (s) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,}$/.test(s),
  url:      (s) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(s),
  nin:      (s) => /^\d{11}$/.test(s), // Nigerian NIN
  bvn:      (s) => /^\d{11}$/.test(s), // Nigerian BVN
  plate:    (s) => /^[A-Z]{3}-\d{3}[A-Z]{2}$/.test(s) // Nigerian plate
};

console.log(validators.email("tunde@gmail.com"));      // true
console.log(validators.email("not-an-email"));         // false
console.log(validators.phone("08012345678"));          // true
console.log(validators.phone("+2348012345678"));       // true
console.log(validators.phone("1234567890"));           // false
console.log(validators.password("MyPass@123"));        // true
console.log(validators.password("weak"));              // false
```

#### `exec()` — Execute and return detailed match info

```javascript
let pattern = /(\d{4})-(\d{2})-(\d{2})/;
let text = "Invoice date: 2026-03-22, Due date: 2026-04-22";

let match = pattern.exec(text);
console.log(match[0]);  // "2026-03-22" — full match
console.log(match[1]);  // "2026" — first capture group
console.log(match[2]);  // "03"   — second capture group
console.log(match[3]);  // "22"   — third capture group
console.log(match.index); // 14   — position in string

// With 'g' flag — exec() advances through all matches
let globalPattern = /Order #(\d+)/g;
let log = "Order #1001 shipped. Order #1002 pending. Order #1003 delivered.";

let m;
while ((m = globalPattern.exec(log)) !== null) {
  console.log(`Found Order #${m[1]} at position ${m.index}`);
}
// Found Order #1001 at position 0
// Found Order #1002 at position 21
// Found Order #1003 at position 42

// Named capture groups (better readability)
let datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
let result = datePattern.exec("2026-03-22");
console.log(result.groups.year);  // "2026"
console.log(result.groups.month); // "03"
console.log(result.groups.day);   // "22"
```

### Common RegExp Patterns Reference

```javascript
// Character classes
let examples = {
  digit:       /\d/,      // [0-9]
  nonDigit:    /\D/,      // [^0-9]
  word:        /\w/,      // [a-zA-Z0-9_]
  nonWord:     /\W/,      // [^a-zA-Z0-9_]
  whitespace:  /\s/,      // [ \t\r\n\f\v]
  nonSpace:    /\S/,      // [^ \t\r\n\f\v]
  anyChar:     /./,       // any char except \n
  anyInclude:  /[\s\S]/,  // truly any char (with s flag: /./s works too)
};

// Anchors
// ^ — start of string/line
// $ — end of string/line
// \b — word boundary
// \B — not a word boundary

// Quantifiers
// * — 0 or more
// + — 1 or more
// ? — 0 or 1 (optional)
// {n} — exactly n
// {n,} — n or more
// {n,m} — between n and m
// Adding ? after: non-greedy (match as few as possible)

// Lookahead and lookbehind (zero-width assertions)
let price = "Price: ₦45000 for rice";

// Positive lookahead (?=...) — match if followed by
let number = price.match(/\d+(?=\s+for)/);
console.log(number?.[0]); // "45000"

// Negative lookahead (?!...) — match if NOT followed by
let notPreceded = "100px 200em 300px".match(/\d+(?!px)/g);
console.log(notPreceded); // ["200"] (approximately — regex complex here)

// Positive lookbehind (?<=...) — match if preceded by
let afterNaira = price.match(/(?<=₦)\d+/);
console.log(afterNaira?.[0]); // "45000"

// Practical regex collection for Nigerian developers:
const REGEX = {
  // Nigerian phone: 080/081/070/071/090/091 + 8 digits, or +234 prefix
  ngPhone: /^(\+234|0)(70|71|80|81|90|91)\d{8}$/,

  // Nigerian plate: ABC-123DE or similar
  ngPlate: /^[A-Z]{2,3}-\d{3}[A-Z]{2}$/,

  // BVN / NIN: exactly 11 digits
  ngBvn: /^\d{11}$/,

  // Nigerian postal code: 6 digits
  ngPostal: /^\d{6}$/,

  // Strong password
  strongPwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,

  // Email
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

  // URL
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,

  // Date (YYYY-MM-DD)
  isoDate: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,

  // Time (HH:MM or HH:MM:SS)
  time: /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,

  // Hex color
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // Credit card (basic — 16 digits with optional spaces/dashes)
  creditCard: /^[\d\s-]{13,19}$/,

  // IPv4 address
  ipv4: /^(\d{1,3}\.){3}\d{1,3}$/,

  // Whitespace only
  whitespaceOnly: /^\s*$/,

  // No special characters (alphanumeric + underscore)
  alphanumeric: /^[a-zA-Z0-9_]+$/,

  // Naira amount with optional commas
  nairaAmount: /^₦?[\d,]+(\.\d{1,2})?$/,
};

// Test suite
console.log(REGEX.ngPhone.test("08012345678"));  // true
console.log(REGEX.ngPhone.test("+2348012345678")); // true
console.log(REGEX.strongPwd.test("MyPass@123")); // true
console.log(REGEX.isoDate.test("2026-03-22"));   // true
console.log(REGEX.hexColor.test("#1a7c4f"));     // true
```

---

## SECTION 11: THE ERROR OBJECT

### What is Error?
The `Error` object represents an error that occurred during execution. JavaScript has several built-in error types, and you can create custom ones.

### Error Types

```javascript
// ReferenceError — using undeclared variable
try {
  console.log(undeclaredVariable);
} catch (e) {
  console.log(e instanceof ReferenceError); // true
  console.log(e.name);    // "ReferenceError"
  console.log(e.message); // "undeclaredVariable is not defined"
}

// TypeError — wrong type operation
try {
  null.property; // Cannot read property of null
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.name);    // "TypeError"
  console.log(e.message); // "Cannot read properties of null (reading 'property')"
}

// SyntaxError — invalid JavaScript syntax
{% raw %}// try { eval("{{"); } catch (e) { console.log(e instanceof SyntaxError); } // true{% endraw %}

// RangeError — value out of range
try {
  new Array(-1); // Negative array length
} catch (e) {
  console.log(e instanceof RangeError); // true
  console.log(e.message); // "Invalid array length"
}

// URIError — bad URI encoding/decoding
try {
  decodeURIComponent("%");
} catch (e) {
  console.log(e instanceof URIError); // true
}

// EvalError — eval() error (rare in modern JS)

// AggregateError — multiple errors (used by Promise.any())
try {
  await Promise.any([
    Promise.reject("Error 1"),
    Promise.reject("Error 2")
  ]);
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.errors); // ["Error 1", "Error 2"]
}
```

### Error Properties

```javascript
try {
  null.toString();
} catch (e) {
  console.log(e.name);    // "TypeError"
  console.log(e.message); // "Cannot read properties of null (reading 'toString')"
  console.log(e.stack);   // Full stack trace — file:line:column chain
  // TypeError: Cannot read properties of null (reading 'toString')
  //   at <anonymous>:2:8
  //   at ...
}
```

### Creating Custom Errors

```javascript
// Basic custom error
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode, url) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
    this.url = url;
  }

  isClientError() { return this.statusCode >= 400 && this.statusCode < 500; }
  isServerError() { return this.statusCode >= 500; }
}

class InsufficientFundsError extends Error {
  constructor(requested, available, accountId) {
    super(`Cannot withdraw ₦${requested.toLocaleString()}. Available: ₦${available.toLocaleString()}`);
    this.name = "InsufficientFundsError";
    this.requested = requested;
    this.available = available;
    this.accountId = accountId;
    this.shortfall = requested - available;
  }
}

// Using custom errors
function processWithdrawal(account, amount) {
  if (!amount || amount <= 0) {
    throw new ValidationError("Amount must be positive", "amount");
  }
  if (amount > account.balance) {
    throw new InsufficientFundsError(amount, account.balance, account.id);
  }
  account.balance -= amount;
  return account.balance;
}

try {
  processWithdrawal({ id: "001", balance: 5000 }, 8000);
} catch (e) {
  if (e instanceof InsufficientFundsError) {
    console.error(`${e.name}: ${e.message}`);
    console.log(`Shortfall: ₦${e.shortfall.toLocaleString()}`);
    // InsufficientFundsError: Cannot withdraw ₦8,000. Available: ₦5,000
    // Shortfall: ₦3,000
  } else if (e instanceof ValidationError) {
    console.error(`${e.name} on field "${e.field}": ${e.message}`);
  } else {
    throw e; // Re-throw unexpected errors!
  }
}
```

### Error Handling Best Practices

```javascript
// 1. Always use try-catch for async operations
async function fetchUserData(userId) {
  try {
    let response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new NetworkError(
        `Failed to fetch user: ${response.statusText}`,
        response.status,
        response.url
      );
    }

    let data = await response.json();
    return data;

  } catch (e) {
    if (e instanceof NetworkError && e.statusCode === 404) {
      console.warn(`User ${userId} not found`);
      return null;
    }
    // Log and re-throw anything unexpected
    console.error("Unexpected error in fetchUserData:", e);
    throw e;
  }
}

// 2. Always re-throw unrecognised errors
function handleError(error) {
  if (error instanceof ValidationError) {
    showUserFriendlyMessage(error.message);
  } else if (error instanceof NetworkError) {
    showRetryDialog();
  } else {
    // IMPORTANT: don't swallow unknown errors!
    throw error;
  }
}

// 3. Use finally for cleanup
async function readFileData(filepath) {
  let fileHandle;
  try {
    fileHandle = await openFile(filepath);
    return await fileHandle.read();
  } catch (e) {
    console.error("Failed to read file:", e.message);
    return null;
  } finally {
    if (fileHandle) await fileHandle.close(); // Always close the file!
  }
}
```

---

## SECTION 12: GLOBAL FUNCTIONS AND PROPERTIES

### What are Global Functions?
These are functions and properties available everywhere in JavaScript without any object prefix. They are part of the **Global Object** (which is `window` in browsers, `global` in Node.js, and `globalThis` in either).

```javascript
// globalThis — works in both browser and Node.js
console.log(globalThis === window); // true in browser
// console.log(globalThis === global); // true in Node.js
```

### Global Functions

#### `eval()` — Execute JavaScript from a string

```javascript
// ⚠️ DANGEROUS AND DEPRECATED — only for context
// eval() executes arbitrary code — huge security risk!
let code = "2 + 2";
console.log(eval(code)); // 4 — DO NOT use in production!

// Problems with eval():
// 1. Security: eval() can execute malicious user input
// 2. Performance: cannot be optimised by JavaScript engine
// 3. Debugging: errors are hard to trace
// ✅ Always use safer alternatives (JSON.parse, Function, etc.)
```

#### `isFinite()` and `isNaN()` — Global type checkers

```javascript
// isFinite() — checks if value is a finite number (with type coercion)
console.log(isFinite(42));         // true
console.log(isFinite(Infinity));   // false
console.log(isFinite("42"));       // true — coerces "42" to 42 first
console.log(isFinite("hello"));    // false — "hello" → NaN → not finite

// Prefer Number.isFinite() for predictability:
console.log(Number.isFinite("42")); // false — no coercion

// isNaN() — checks if value is NaN (with type coercion)
console.log(isNaN(NaN));       // true
console.log(isNaN("hello"));   // true — "hello" coerces to NaN
console.log(isNaN("42"));      // false — "42" coerces to 42 (not NaN)
console.log(isNaN(undefined)); // true — undefined coerces to NaN

// Prefer Number.isNaN() — no coercion:
console.log(Number.isNaN("hello")); // false — it's a string, not NaN
console.log(Number.isNaN(NaN));     // true — only true NaN
```

#### `parseInt()` — Parse string to integer

```javascript
// parseInt(string, radix)
console.log(parseInt("42"));      // 42
console.log(parseInt("42.9"));    // 42 — ignores decimal
console.log(parseInt("42px"));    // 42 — stops at non-numeric
console.log(parseInt("3.14em"));  // 3
console.log(parseInt("abc"));     // NaN — no numeric start
console.log(parseInt(""));        // NaN
console.log(parseInt("  42  "));  // 42 — trims whitespace

// ALWAYS provide radix!
console.log(parseInt("10", 2));   // 2 — binary
console.log(parseInt("10", 8));   // 8 — octal
console.log(parseInt("10", 10));  // 10 — decimal (explicit, safe!)
console.log(parseInt("FF", 16));  // 255 — hexadecimal
console.log(parseInt("0xFF", 16));// 255 — hex with 0x prefix

// Real-world: extracting numbers from CSS values
let width = "250px";
let height = "3.5rem";
console.log(parseInt(width, 10));    // 250
console.log(parseFloat(height));     // 3.5
```

#### `parseFloat()` — Parse string to float

```javascript
console.log(parseFloat("3.14"));      // 3.14
console.log(parseFloat("3.14abc"));   // 3.14 — stops at non-numeric
console.log(parseFloat(".5"));        // 0.5
console.log(parseFloat("1.2e3"));     // 1200 — scientific notation
console.log(parseFloat("abc"));       // NaN
console.log(parseFloat("  42.5  ")); // 42.5 — trims whitespace

// Real-world: processing form input
let priceInput = "32,000.50"; // Naira formatted
let cleanPrice = parseFloat(priceInput.replace(/,/g, ""));
console.log(cleanPrice); // 32000.5
```

#### `encodeURIComponent()` and `decodeURIComponent()` — URL encoding

```javascript
// Encode for safe inclusion in a URL
let query = "Babatunde Adeyemi & Associates";
let encoded = encodeURIComponent(query);
console.log(encoded);
// "Babatunde%20Adeyemi%20%26%20Associates"

let url = `https://api.myshop.com/search?q=${encodeURIComponent("garri 50kg")}`;
console.log(url);
// "https://api.myshop.com/search?q=garri%2050kg"

// Decode back
console.log(decodeURIComponent("garri%2050kg")); // "garri 50kg"

// encodeURI() — encodes the whole URL (preserves ://?=&)
let fullUrl = "https://myshop.com/search?q=garri&city=lagos&price=5,000";
console.log(encodeURI(fullUrl));
// "https://myshop.com/search?q=garri&city=lagos&price=5,000"
// (only spaces and special chars encoded, not ?, &, =)

// encodeURIComponent() — encodes EVERYTHING (use for query parameter values)
// encodeURI() — use for complete URLs

// Real-world: build query string
function buildQueryString(params) {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

let searchParams = { q: "basmati rice", city: "Lagos", maxPrice: "35000", inStock: true };
console.log(buildQueryString(searchParams));
// "q=basmati%20rice&city=Lagos&maxPrice=35000&inStock=true"
```

#### `setTimeout()` and `clearTimeout()`

```javascript
// setTimeout(callback, delayMs, ...args)
let timer = setTimeout((name, amount) => {
  console.log(`${name}, your transfer of ₦${amount} is complete!`);
}, 3000, "Babatunde", 45000);

// Output after 3 seconds:
// "Babatunde, your transfer of ₦45000 is complete!"

clearTimeout(timer); // Cancel it (runs before 3 seconds)

// Practical: debounce
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);

// Only triggers 300ms after typing stops
```

#### `setInterval()` and `clearInterval()`

```javascript
// setInterval(callback, intervalMs, ...args)
let count = 0;
let intervalId = setInterval(() => {
  count++;
  console.log(`Tick ${count}`);

  if (count >= 5) {
    clearInterval(intervalId); // Stop after 5 ticks
  }
}, 1000);

// Real-world: real-time clock
function startClock(elementId) {
  function updateTime() {
    let now = new Date();
    let timeStr = now.toLocaleTimeString("en-NG", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    document.getElementById(elementId).textContent = timeStr;
  }

  updateTime(); // Run immediately
  return setInterval(updateTime, 1000); // Then every second
}

// let clockTimer = startClock("clock-display");
// clearInterval(clockTimer); // Stop the clock
```

#### `queueMicrotask()` — Schedule a microtask

```javascript
// Runs before setTimeout but after the current synchronous task
console.log("1. Start");

queueMicrotask(() => {
  console.log("3. Microtask");
});

setTimeout(() => {
  console.log("4. setTimeout");
}, 0);

console.log("2. End");

// Output:
// 1. Start
// 2. End
// 3. Microtask
// 4. setTimeout
```

#### `structuredClone()` — Deep clone any value (ES2022)

```javascript
// The proper way to deep clone objects (replaces JSON hack)
let original = {
  name: "Tunde",
  dob: new Date("1994-03-22"),
  scores: [90, 85, 78],
  address: { city: "Lagos", zip: "100001" }
};

let clone = structuredClone(original);

// Truly independent copy
clone.address.city = "Abuja";
clone.scores.push(95);
clone.dob.setFullYear(2000);

console.log(original.address.city); // "Lagos" — unchanged!
console.log(original.scores.length); // 3 — unchanged!
console.log(original.dob.getFullYear()); // 1994 — unchanged!

// structuredClone() handles:
// ✅ Dates (stays as Date, not string like JSON)
// ✅ Arrays (deep copy)
// ✅ Maps and Sets
// ✅ ArrayBuffers, TypedArrays
// ✅ Circular references!

// Cannot handle:
// ❌ Functions
// ❌ DOM elements
// ❌ class instances (loses prototype chain)
```

---

# PHASE 2 — APPLIED EXERCISES: THE REFERENCE IN PRACTICE

## Exercise Set — Method Mastery Challenges

### Exercise 1: Array Method Chaining Olympics

**Objective:** Combine multiple array methods to process employee data.

```javascript
let employees = [
  { id: 1,  name: "Babatunde Adeyemi", dept: "Engineering",  salary: 450000, years: 5, active: true },
  { id: 2,  name: "Amaka Okonkwo",     dept: "Marketing",    salary: 320000, years: 3, active: true },
  { id: 3,  name: "Chidi Nwosu",       dept: "Engineering",  salary: 280000, years: 2, active: false },
  { id: 4,  name: "Ngozi Eze",         dept: "Finance",      salary: 380000, years: 4, active: true },
  { id: 5,  name: "Emeka Obi",         dept: "Engineering",  salary: 500000, years: 7, active: true },
  { id: 6,  name: "Kemi Afolabi",      dept: "HR",           salary: 260000, years: 1, active: true },
  { id: 7,  name: "Tunde Bakare",      dept: "Finance",      salary: 420000, years: 6, active: true },
  { id: 8,  name: "Ada Igwe",          dept: "Marketing",    salary: 295000, years: 2, active: false },
  { id: 9,  name: "Seun Adesanya",     dept: "Engineering",  salary: 370000, years: 3, active: true },
  { id: 10, name: "Bola Ogundimu",     dept: "HR",           salary: 240000, years: 1, active: true }
];

// Task 1: Get names of active engineers sorted by salary (highest first)
let topEngineers = employees
  .filter(e => e.dept === "Engineering" && e.active)
  .sort((a, b) => b.salary - a.salary)
  .map(e => `${e.name}: ₦${e.salary.toLocaleString()}`);

console.log("Top Engineers:");
topEngineers.forEach(e => console.log(" ", e));
// Emeka Obi: ₦500,000
// Babatunde Adeyemi: ₦450,000
// Seun Adesanya: ₦370,000

// Task 2: Department salary summary
let deptSummary = employees
  .filter(e => e.active)
  .reduce((summary, e) => {
    let dept = e.dept;
    if (!summary[dept]) {
      summary[dept] = { total: 0, count: 0, employees: [] };
    }
    summary[dept].total += e.salary;
    summary[dept].count++;
    summary[dept].employees.push(e.name);
    return summary;
  }, {});

Object.entries(deptSummary).forEach(([dept, data]) => {
  let avg = (data.total / data.count).toFixed(0);
  console.log(`${dept}: ${data.count} staff, Avg ₦${parseInt(avg).toLocaleString()}`);
});
// Engineering: 3 staff, Avg ₦440,000
// Marketing: 1 staff, Avg ₦320,000
// Finance: 2 staff, Avg ₦400,000
// HR: 2 staff, Avg ₦250,000

// Task 3: Loyalty bonus (5% for each year over 2)
let withBonuses = employees
  .filter(e => e.active && e.years > 2)
  .map(e => ({
    name: e.name,
    salary: e.salary,
    bonus: Math.round(e.salary * 0.05 * (e.years - 2)),
    takeHome: Math.round(e.salary + e.salary * 0.05 * (e.years - 2))
  }))
  .sort((a, b) => b.bonus - a.bonus);

console.log("\nLoyalty Bonus Report:");
withBonuses.forEach(e => {
  console.log(`${e.name}: Salary=₦${e.salary.toLocaleString()}, Bonus=₦${e.bonus.toLocaleString()}, Total=₦${e.takeHome.toLocaleString()}`);
});
```

---

### Exercise 2: String Manipulation — Data Cleaner

**Objective:** Clean and standardise messy user input data.

```javascript
let rawData = [
  "  babatunde.adeyemi@GMAIL.COM  ",
  "AMAKA OKONKWO",
  "  08012345678",
  "2026/03/22",
  "  ₦32,000.50  ",
  "LAGOS STATE, NIGERIA",
  "  ref: INV-2026-001  "
];

// Email normaliser
function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

// Name formatter (Title Case)
function formatName(name) {
  return name.trim().toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Phone formatter (Nigerian format)
function formatPhone(phone) {
  let cleaned = phone.trim().replace(/\D/g, "");
  if (cleaned.startsWith("234")) cleaned = "0" + cleaned.slice(3);
  if (cleaned.length !== 11) return null;
  return `${cleaned.slice(0,4)}-${cleaned.slice(4,7)}-${cleaned.slice(7)}`;
}

// Date normaliser (any → YYYY-MM-DD)
function normaliseDate(dateStr) {
  let cleaned = dateStr.trim();
  // Replace / or . separators with -
  let normalised = cleaned.replace(/[/.]/g, "-");
  // If in DD-MM-YYYY format, convert to YYYY-MM-DD
  if (/^\d{2}-\d{2}-\d{4}$/.test(normalised)) {
    let [d, m, y] = normalised.split("-");
    return `${y}-${m}-${d}`;
  }
  return normalised;
}

// Currency extractor
function parseCurrency(str) {
  let cleaned = str.trim().replace(/[₦,\s]/g, "");
  return parseFloat(cleaned);
}

console.log(normaliseEmail(rawData[0]));   // "babatunde.adeyemi@gmail.com"
console.log(formatName(rawData[1]));       // "Amaka Okonkwo"
console.log(formatPhone(rawData[2]));      // "0801-234-5678"
console.log(normaliseDate(rawData[3]));    // "2026-03-22"
console.log(parseCurrency(rawData[4]));    // 32000.5
console.log(formatName(rawData[5]));       // "Lagos State, Nigeria"
console.log(rawData[6].trim());            // "ref: INV-2026-001"
```

---

### Exercise 3: Date Utilities Library

**Objective:** Build a comprehensive date utility module.

```javascript
const DateUtils = {
  // Format date to Nigerian format
  toNGFormat(date) {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit", month: "2-digit", year: "numeric"
    });
  },

  // Format as "22 March 2026"
  toLongFormat(date) {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric", month: "long", year: "numeric"
    });
  },

  // Difference in days between two dates
  daysBetween(date1, date2) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
  },

  // Add days
  addDays(date, days) {
    let d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  },

  // Add months (handles month-end correctly)
  addMonths(date, months) {
    let d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  },

  // Is business day (Mon-Fri)
  isBusinessDay(date) {
    let day = new Date(date).getDay();
    return day !== 0 && day !== 6;
  },

  // Next business day
  nextBusinessDay(date) {
    let d = new Date(date);
    do {
      d.setDate(d.getDate() + 1);
    } while (!this.isBusinessDay(d));
    return d;
  },

  // Quarter of the year (Q1-Q4)
  getQuarter(date) {
    let month = new Date(date).getMonth();
    return Math.floor(month / 3) + 1;
  },

  // Days in a month
  daysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // Day 0 of next month = last day of this month
  },

  // Is leap year
  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  // Time ago (relative time)
  timeAgo(date) {
    let seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60)  return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
    return `${Math.floor(seconds / 31536000)} years ago`;
  }
};

// Test the utility
let today = new Date("2026-03-22");
console.log(DateUtils.toNGFormat(today));           // "22/03/2026"
console.log(DateUtils.toLongFormat(today));         // "22 March 2026"
console.log(DateUtils.daysBetween("2026-01-01", "2026-03-22")); // 80
console.log(DateUtils.toNGFormat(DateUtils.addDays(today, 30))); // "21/04/2026"
console.log(DateUtils.isBusinessDay(today));        // true (Sunday... actually false!)
console.log(DateUtils.getQuarter(today));           // 1
console.log(DateUtils.daysInMonth(2026, 2));        // 28
console.log(DateUtils.isLeapYear(2024));            // true
console.log(DateUtils.isLeapYear(2026));            // false
console.log(DateUtils.timeAgo("2026-03-21"));       // "1 days ago"
```

---

# PHASE 3 — CREATION: THE COMPLETE REFERENCE PROJECT

## Capstone Project: JavaScript Methods Playground — Interactive Reference App

**Project description:** Build an interactive browser application that demonstrates all JavaScript built-in methods. Users can select a method, see its signature, description, and run live examples with custom inputs.

**Stage 1: Core Data Structure and Lookup System**

```javascript
// The method reference database
const METHODS_DB = {
  Array: {
    push: {
      signature: "array.push(element1, element2, ...)",
      description: "Adds one or more elements to the END of an array. Returns the new length.",
      mutates: true,
      example: (arr) => {
        let copy = [...arr];
        let newLength = copy.push("newItem");
        return { result: copy, returned: newLength };
      },
      quickExample: `let a = [1,2,3]; a.push(4,5); // [1,2,3,4,5]`
    },
    map: {
      signature: "array.map(callback(element, index, array))",
      description: "Creates a new array by applying callback to every element. Does not mutate original.",
      mutates: false,
      example: (arr) => {
        let result = arr.map((x, i) => `${i}:${x}`);
        return { result, returned: result };
      },
      quickExample: `[1,2,3].map(x => x * 2) // [2,4,6]`
    },
    filter: {
      signature: "array.filter(callback(element, index, array))",
      description: "Creates a new array with elements that pass the callback test.",
      mutates: false,
      example: (arr) => {
        let result = arr.filter(x => typeof x === "number" && x > 2);
        return { result, returned: result };
      },
      quickExample: `[1,2,3,4,5].filter(x => x > 3) // [4,5]`
    },
    reduce: {
      signature: "array.reduce(callback(accumulator, currentValue, index, array), initialValue)",
      description: "Reduces array to a single value by running callback on each element.",
      mutates: false,
      example: (arr) => {
        let nums = arr.filter(x => typeof x === "number");
        let sum = nums.reduce((acc, x) => acc + x, 0);
        return { result: sum, returned: sum };
      },
      quickExample: `[1,2,3,4,5].reduce((sum,x) => sum+x, 0) // 15`
    }
    // ... more methods
  },
  String: {
    split: {
      signature: "string.split(separator, limit)",
      description: "Splits a string into an array by separator.",
      mutates: false,
      example: (str) => {
        let result = String(str).split(",");
        return { result, returned: result };
      },
      quickExample: `"a,b,c".split(",") // ["a","b","c"]`
    }
    // ... more methods
  },
  Math: {
    random: {
      signature: "Math.random()",
      description: "Returns a pseudo-random float between 0 (inclusive) and 1 (exclusive).",
      mutates: false,
      example: () => {
        let r = Math.random();
        return { result: r, returned: r };
      },
      quickExample: `Math.random() // e.g., 0.7362...`
    }
    // ... more methods
  }
};

// Method lookup engine
function lookupMethod(objectName, methodName) {
  return METHODS_DB[objectName]?.[methodName] ?? null;
}

// Generate method summary report
function generateMethodReport(objectName) {
  let methods = METHODS_DB[objectName];
  if (!methods) return "Object not found";

  let mutating = Object.entries(methods).filter(([,m]) => m.mutates).map(([name]) => name);
  let nonMutating = Object.entries(methods).filter(([,m]) => !m.mutates).map(([name]) => name);

  return {
    total: Object.keys(methods).length,
    mutating,
    nonMutating,
    signatures: Object.entries(methods).map(([name, m]) => `${name}(): ${m.description}`)
  };
}

let arrayReport = generateMethodReport("Array");
console.log("Array methods in DB:", arrayReport.total);
console.log("Mutating:", arrayReport.mutating);
console.log("Non-mutating:", arrayReport.nonMutating);
```

---

## 10-Question Self-Assessment Quiz — Reference Edition

**Q1:** What does `Array.isArray("hello")` return?
> **Answer: `false`** — `"hello"` is a string, not an array. `Array.isArray` specifically checks for arrays; `typeof` would return `"object"` for both arrays and plain objects, which is why `Array.isArray` was created.

**Q2:** What is the difference between `slice()` and `splice()` on arrays?
> **Answer:** `slice(start, end)` extracts a portion of the array and returns it WITHOUT modifying the original. `splice(start, deleteCount, ...items)` modifies the original array by removing/inserting elements and returns the removed elements. *Memory trick: spl**i**ce mod**i**fies — both have an 'i' in the middle.*

**Q3:** What does `.reduce()` return if the array is empty and no `initialValue` is provided?
> **Answer:** It throws a `TypeError: Reduce of empty array with no initial value`. Always provide an initial value: `.reduce((acc, val) => ..., 0)`.

**Q4:** What is the output of `"hello".at(-2)`?
> **Answer: `"l"`** — `.at(-1)` is the last character (`"o"`), `.at(-2)` is the second-to-last (`"l"`).

**Q5:** Why does `(0.1 + 0.2 === 0.3)` return `false`?
> **Answer:** Because JavaScript uses IEEE 754 floating-point arithmetic, and `0.1 + 0.2` = `0.30000000000000004` — not exactly `0.3`. To compare: `Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON` returns `true`.

**Q6:** What does `JSON.stringify({ fn: function(){}, x: undefined, n: NaN })` produce?
> **Answer: `"{}"`** — Functions and `undefined` values are completely excluded. `NaN` becomes `null`. So all three properties are either excluded or transformed to null. Actually: `'{"n":null}'` — `fn` and `x` are excluded, `NaN` becomes `null`.

**Q7:** What is the difference between `Object.freeze()` and `Object.seal()`?
> **Answer:** `freeze()` makes the object completely immutable — no add, delete, or modify. `seal()` prevents add and delete but ALLOWS modifying existing property values. `Object.isFrozen()` implies `Object.isSealed()`, but not vice versa.

**Q8:** What does `Math.max()` (with no arguments) return?
> **Answer: `-Infinity`** — This is by mathematical convention: the identity element for maximisation. This makes it the perfect initial value for a reduce: `arr.reduce((max,n) => Math.max(max,n), -Infinity)`.

**Q9:** What is the difference between `String.prototype.match()` and `RegExp.prototype.exec()`?
> **Answer:** Both find matches, but `exec()` is called on the RegExp and provides more detailed info (groups, lastIndex). With the `g` flag, `exec()` can be called repeatedly to iterate all matches (it advances `lastIndex`). `match()` with `g` flag returns all matches as a flat array but without capture group details. `matchAll()` is now the preferred way to get all matches with groups.

**Q10:** What is `structuredClone()` and why is it better than the `JSON.parse(JSON.stringify())` trick?
> **Answer:** `structuredClone()` is a native browser/Node.js function for deep cloning. It's better because it: (1) preserves `Date` objects as `Date` (not strings), (2) handles `Map`, `Set`, `ArrayBuffer`, `TypedArray`, (3) handles circular references without throwing, (4) is more performant. The JSON trick converts `Date` to strings, loses functions, converts `NaN` to `null`, and crashes on circular references.

---

# COMPLETION CHECKLIST — JAVASCRIPT REFERENCE MASTERY

```
ARRAY OBJECT
[ ] I know the difference between mutating and non-mutating methods
[ ] I can use push/pop/shift/unshift for stack and queue operations
[ ] I can use splice() for inserting, removing, and replacing
[ ] I can use map/filter/reduce confidently for data transformation
[ ] I can use find/findIndex for searching objects in arrays
[ ] I can use every/some for validation checks
[ ] I can use flat/flatMap for nested data
[ ] I understand sort() requires a comparator for numbers
[ ] I know the new immutable methods: toSorted, toReversed, toSpliced, with

STRING OBJECT
[ ] I can extract substrings with slice/substring
[ ] I can search strings with indexOf/includes/startsWith/endsWith
[ ] I can manipulate strings with replace/replaceAll/trim/padStart/padEnd
[ ] I can split strings into arrays and join arrays into strings
[ ] I can use template literals for all string building tasks
[ ] I understand strings are immutable — every method returns a new string

NUMBER OBJECT
[ ] I know all Number static methods (isInteger, isFinite, isNaN, isSafeInteger)
[ ] I can format numbers with toFixed, toPrecision, toLocaleString
[ ] I understand the floating-point precision issue
[ ] I can parse strings to numbers with parseInt and parseFloat

MATH OBJECT
[ ] I know all rounding methods (round, floor, ceil, trunc)
[ ] I can generate random numbers in any range
[ ] I know Math.max/min and how to use them with arrays (spread)
[ ] I understand Math is not a constructor — just a namespace

DATE OBJECT
[ ] I know months are 0-indexed (Jan=0, Dec=11)
[ ] I can get and set all date components
[ ] I can calculate date differences
[ ] I can format dates with toLocaleDateString and Intl.DateTimeFormat
[ ] I can add days/months to a date

JSON OBJECT
[ ] I can stringify any object to JSON with and without pretty-printing
[ ] I can parse JSON strings safely with try-catch
[ ] I know what JSON.stringify excludes (functions, undefined, NaN)
[ ] I can use replacer and reviver functions

OBJECT OBJECT
[ ] I can use Object.keys/values/entries for iteration
[ ] I can merge objects with Object.assign and spread
[ ] I can freeze/seal objects
[ ] I can use Object.fromEntries to build objects from entries
[ ] I understand Object.create and prototype chains

REGEXP
[ ] I can write regex patterns for common validation (email, phone, date)
[ ] I know all flags (g, i, m, s, u, y, d) and when to use them
[ ] I can use test(), exec(), match(), matchAll(), replace() with regex
[ ] I understand capture groups and named groups

ERROR HANDLING
[ ] I know all built-in error types (TypeError, ReferenceError, etc.)
[ ] I can create custom Error classes
[ ] I always re-throw unexpected errors in catch blocks
[ ] I use finally for cleanup operations

GLOBAL FUNCTIONS
[ ] I always provide radix to parseInt()
[ ] I use encodeURIComponent for URL query parameters
[ ] I prefer Number.isNaN() over global isNaN()
[ ] I use structuredClone() for deep copying
```

---

# KEY GOTCHAS — REFERENCE EDITION

1. **Array `sort()` without comparator sorts alphabetically** — always provide `(a,b) => a-b` for numbers.
2. **`splice()` mutates; `slice()` does not** — know which one you want before using it.
3. **`Date` months are 0-indexed** — January is `0`, not `1`. December is `11`.
4. **`typeof null === "object"`** — use `value === null` to check for null.
5. **`NaN !== NaN`** — use `Number.isNaN()` to check for NaN.
6. **Floating-point math** — `0.1 + 0.2 !== 0.3`. Use `toFixed()` for display, or multiply by 100 for integer arithmetic.
7. **`parseInt()` without radix** — can misinterpret strings. Always pass `10` as second argument.
8. **`JSON.stringify()` excludes functions and undefined** — these silently disappear from serialised output.
9. **`Object.freeze()` is shallow** — nested objects still mutate.
10. **`Array.from()` with `new Array(n)` makes a sparse array** — use `Array.from({length:n}, () => value)` to fill properly.
11. **`forEach()` always returns `undefined`** — don't chain it; use `map()` if you need a return value.
12. **`reduce()` on an empty array without initial value throws** — always provide an initial value.
13. **`match()` with `g` flag loses capture group details** — use `matchAll()` instead.
14. **`String.replace()` replaces only the FIRST match** — use `/pattern/g` or `replaceAll()` for all.
15. **`Math.round(-4.5)` rounds to `-4` (toward +∞)** — use `Math.floor(-4.5)` → `-5` for floor-rounding negatives.

---

# ONE-SENTENCE SUMMARY

The JavaScript built-in reference is your permanent toolkit: once you deeply understand how `Array`, `String`, `Number`, `Math`, `Date`, `JSON`, `Object`, `RegExp`, `Error`, and the global functions each work — including every property, every method, every gotcha — you stop writing repetitive code and start composing elegant, professional solutions from the same building blocks that power every JavaScript application in the world.

---

*End of JavaScript Complete Reference Manual*
*Source: W3Schools JavaScript Reference (jsref/default.asp)*
*Covers: Array · String · Number · Math · Date · JSON · Object · Function · Boolean · RegExp · Error · Global Functions*
