---
render_with_liquid: false
title: "JavaScript & jQuery: jQuery Selectors · Getting & Setting HTML Elements · CSS Manipulation · DOM Manipulation"
nav_order: 43
---

## Table of Contents
1. [Chapter 1 — What Is jQuery and Why Does It Exist?](#chapter-1)
2. [Chapter 2 — jQuery Selectors](#chapter-2)
3. [Chapter 3 — Getting and Setting HTML Elements](#chapter-3)
4. [Chapter 4 — jQuery CSS Manipulation](#chapter-4)
5. [Chapter 5 — jQuery DOM Manipulation](#chapter-5)
6. [Phase 2 — Applied Exercises](#phase-2)
7. [Phase 3 — Project: Lagos Events Board](#phase-3)
8. [Completion Checklist](#checklist)

---

<a name="chapter-1"></a>
## Chapter 1 — What Is jQuery and Why Does It Exist?

### 1.1 The Problem jQuery Was Born to Solve

Cast your mind back to 2006. Web browsers — Internet Explorer, Firefox, early Safari — each implemented the JavaScript DOM API slightly differently. Code that worked perfectly in Firefox would silently break in Internet Explorer. Every developer wrote the same defensive code over and over again just to handle basic tasks.

John Resig, a JavaScript developer, solved this by creating **jQuery** — a library that wraps all those browser differences behind a single, consistent, elegant interface.

The jQuery motto says it all:

> **"Write less, do more."**

Compare the same task in plain JavaScript vs jQuery:

```javascript
// Plain JavaScript (verbose)
const paragraphs = document.getElementsByTagName("p");
for (let i = 0; i < paragraphs.length; i++) {
  paragraphs[i].style.display = "none";
}

// jQuery — the same task in one line
$("p").hide();
// Output: All <p> elements on the page are hidden
```

---

### 1.2 Is jQuery Still Relevant?

| Reason | Detail |
|--------|--------|
| **Legacy codebases** | Websites built 2008–2018 widely use jQuery. You will maintain these. |
| **WordPress** | Powers over 40% of the web. jQuery is bundled in every WordPress install. |
| **Bootstrap 4 and below** | Required jQuery for interactive components. |
| **Quick prototyping** | Still faster to write for simple DOM tasks. |
| **Learning bridge** | Makes DOM concepts clearer — transparent layer over the DOM you already know. |

---

### 1.3 Adding jQuery to a Page

**CDN (fastest):**
```html
<!-- Load jQuery BEFORE your own script -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script>
  $("h1").css("color", "green");
  // Output: "Hello Lagos!" heading turns green
</script>
```

**Local download:**
```html
<script src="js/jquery.min.js"></script>
```

---

### 1.4 The `$` Symbol

`$` is simply a shortcut for the word `jQuery`. These are identical:

```javascript
$("p").hide();
jQuery("p").hide();
```

---

### 1.5 The Document Ready Event

**Never** run jQuery code before the HTML has loaded. Use `$(document).ready()`:

```javascript
// Long form
$(document).ready(function() {
  $("h1").text("Page is ready!");
});

// Short form — most common
$(function() {
  $("h1").text("Page is ready!");
});

// ❌ WRONG — runs before DOM is loaded
$("h1").text("Too early!"); // Finds nothing

// ✅ CORRECT
$(function() {
  $("h1").text("Just right!");
});
```

Think of it as the "doors open" signal at a Lagos concert — your code does not go on stage until the venue (the DOM) is confirmed ready.

---

<a name="chapter-2"></a>
## Chapter 2 — jQuery Selectors

### 2.1 What Is a Selector?

A selector is the expression inside `$( )` that tells jQuery **which elements** to work with. jQuery uses CSS selector syntax — so if you know CSS, you already know jQuery selectors.

```
$(selector).action()
   ↑           ↑
   Find        Do something
```

---

### 2.2 Element, ID, and Class Selectors

```javascript
// Element — selects all elements of that tag
$("p").hide();                          // All <p> elements disappear
$("h2").css("color", "#e63946");        // All h2s turn red
$("input").val("");                     // All inputs cleared

// ID — selects one specific element
$("#bankBalance").text("₦750,000");     // Element with id="bankBalance"
$("#loginForm").show();
$("#submitBtn").prop("disabled", true);

// Class — selects all with that class
$(".product-card").css("border", "2px solid #2563eb");
$("div.product-card").css("padding", "16px"); // Only div.product-card (not span.product-card)
```

---

### 2.3 CSS Selectors

The full CSS selector spec works inside `$()`:

```javascript
// Descendant
$("ul li").css("color", "blue");
$("form input").val("");

// Child (direct only)
$("ul > li").css("font-weight", "bold");

// Attribute
$("input[type='text']").css("border", "2px solid blue");
$("a[href^='https']").css("color", "green");   // href starts with https
$("a[href$='.pdf']").css("color", "orange");   // href ends with .pdf

// Multiple
$("h1, h2, h3").css("font-family", "Georgia, serif");
$(".error, .warning").show();
```

---

### 2.4 jQuery Filter Selectors

```javascript
// Position
$("li:first").css("font-weight", "bold");
$("li:last").css("color", "gray");
$("li:eq(2)").css("background", "#fef3c7"); // Third item (0-indexed)
$("tr:even").css("background", "#f8fafc");  // Rows 0, 2, 4...
$("tr:odd").css("background", "#ffffff");   // Rows 1, 3, 5...

// Content
$("p:contains('Lagos')").css("color", "green");
$("td:empty").css("background", "#fee2e2");
$("div:has(p)").css("border", "1px solid #ccc");

// Visibility & Form
$("p:hidden").show();
$(":checked").parent().css("background", "#dcfce7");
$(":disabled").css("opacity", "0.5");
$(":text").css("width", "100%");
```

---

### 2.5 Traversal Methods

```javascript
// HTML:
// <ul id="bankList">
//   <li class="tier-1">GTBank</li>
//   <li class="tier-1">Zenith Bank</li>
//   <li class="tier-2">Wema Bank</li>
// </ul>

$("#bankList").find("li")            // All <li> descendants
$("#bankList").children()            // Direct children only
$("#bankList").children(".tier-1")   // Direct children with class tier-1
$("li.tier-1").siblings()            // All siblings
$("li:first").next()                 // Next sibling
$("li:last").prev()                  // Previous sibling
$("li").parent()                     // The <ul>
$("li").closest("ul")                // Nearest ancestor matching "ul"

// Filtering a selection
$("li").filter(".tier-1")   // Keep only .tier-1
$("li").not(".tier-2")      // Exclude .tier-2
$("li").eq(1)               // Only the second item
```

---

### 2.6 Chaining

Because most jQuery methods return the jQuery object, you can chain:

```javascript
// Without chaining (repetitive):
$("#alert").show();
$("#alert").css("background", "red");
$("#alert").text("Error! Please try again.");

// With chaining:
$("#alert")
  .show()
  .css("background", "red")
  .text("Error! Please try again.");

// Complex chain with traversal:
$("form")
  .find("input")
  .not("[type='submit']")
  .val("")
  .css("border-color", "#ccc");
// Form → inputs → exclude submit → clear values → reset border
```

---

### 2.7 jQuery Object vs DOM Element

```javascript
// jQuery object — has jQuery methods (.css, .hide, .text)
const $heading = $("h1");
$heading.css("color", "red");   // ✅ Works
$heading.style.color = "red";   // ❌ Error — no .style on jQuery object

// DOM element — has DOM methods (.style, .textContent)
const heading = document.querySelector("h1");
heading.style.color = "red";    // ✅ Works
heading.css("color", "red");    // ❌ Error — no .css on DOM element

// Converting:
const domEl  = $("h1")[0];    // jQuery → DOM (via [0])
const $el    = $(heading);    // DOM → jQuery (wrap in $())
```

> **Convention:** Prefix jQuery variables with `$` (e.g., `$button`, `$card`) to distinguish them from DOM elements.

---

<a name="chapter-3"></a>
## Chapter 3 — Getting and Setting HTML Elements

### 3.1 The Three Core Content Methods

| Method | Equivalent | Gets/Sets |
|--------|-----------|-----------|
| `.text()` | `element.textContent` | Plain text — HTML tags are escaped |
| `.html()` | `element.innerHTML` | HTML content — tags are rendered |
| `.val()` | `element.value` | Value of form inputs |

---

### 3.2 `.text()` — Plain Text

```javascript
// Getting:
// HTML: <p id="greeting">Welcome to <strong>Lagos</strong>!</p>
const content = $("#greeting").text();
console.log(content); // Output: "Welcome to Lagos!" — <strong> stripped

// Setting:
$("#balance").text("₦500,000");

// Setting with function (index + current text):
$("li").text(function(index, currentText) {
  return (index + 1) + ". " + currentText;
});
// "Lagos" → "1. Lagos", "Abuja" → "2. Abuja"

// SECURITY:
const userInput = '<script>alert("hacked")</script>';
$("#output").text(userInput);  // ✅ SAFE — renders as visible text, not code
$("#output").html(userInput);  // ❌ DANGEROUS — executes the script
```

---

### 3.3 `.html()` — HTML Content

```javascript
// Getting:
// HTML: <div id="card"><h3>GTBank</h3><p>Code: 058</p></div>
const inner = $("#card").html();
console.log(inner); // Output: "<h3>GTBank</h3><p>Code: 058</p>"

// Setting:
$("#productCard").html(`
  <h3>Samsung Galaxy A55</h3>
  <p class="price">₦450,000</p>
  <button class="btn-buy">Add to Cart</button>
`);

// Build list from array:
const banks = ["GTBank", "Access Bank", "Zenith Bank"];
let html = "<ul>";
banks.forEach(b => { html += "<li>" + b + "</li>"; });
html += "</ul>";
$("#bankList").html(html);
```

---

### 3.4 `.val()` — Form Input Values

```javascript
// Getting:
const amount = $("#amount").val();
console.log(amount);        // Output: "50000" (always a string)
const numAmount = Number($("#amount").val()); // Convert to number if needed

const selected = $("#bankSelect").val(); // Selected dropdown option
const notes    = $("#notes").val();      // Textarea content

// Setting:
$("#senderName").val("Babatunde Adewale");
$("input, textarea, select").val(""); // Clear all inputs

// Getting checked checkboxes:
const checked = [];
$(".service:checked").each(function() {
  checked.push($(this).val());
});
console.log(checked); // e.g. ["savings", "loan"]
```

---

### 3.5 `.attr()` — HTML Attributes

```javascript
// Getting:
const href = $("#payLink").attr("href");
console.log(href); // Output: "https://paystack.com"

// Setting:
$("#payLink").attr("href", "https://flutterwave.com");

// Setting multiple at once (object):
$("img#logo").attr({
  "src":   "images/new-logo.png",
  "alt":   "KongaMart Logo",
  "width": "200"
});

// Removing:
$("#submitBtn").removeAttr("disabled"); // Button becomes clickable
```

---

### 3.6 `.prop()` — Live DOM Properties

`.attr()` reads HTML attributes (initial state in source code).
`.prop()` reads DOM properties (live, current JavaScript state).

For boolean properties (`checked`, `disabled`, `selected`) — **always use `.prop()`**:

```javascript
// HTML: <input type="checkbox" id="agree" checked>

// ❌ .attr() — reads initial HTML, never updates after user interaction
console.log($("#agree").attr("checked")); // "checked" — even after user unchecks!

// ✅ .prop() — reads the LIVE current state
console.log($("#agree").prop("checked")); // true or false — always accurate

// Common uses:
$("input[type='checkbox']").prop("checked", true);         // Check all
$("#bankSelect option[value='058']").prop("selected", true); // Pre-select GTBank
$("#submitBtn").prop("disabled", true);                     // Disable button

if ($("#termsCheckbox").prop("checked")) {
  console.log("User agreed to terms");
}
```

---

### 3.7 `.data()` — Custom Data Attributes

```javascript
// HTML:
// <div class="product"
//      data-id="42"
//      data-price="450000"
//      data-category="electronics"
//      data-in-stock="true">

$(".product").on("click", function() {
  const id       = $(this).data("id");       // 42 (number — auto-converted!)
  const price    = $(this).data("price");    // 450000 (number)
  const category = $(this).data("category");// "electronics"
  const inStock  = $(this).data("inStock"); // true (boolean) — camelCase!

  console.log(`ID: ${id}, Price: ₦${price.toLocaleString()}`);
  // Output: ID: 42, Price: ₦450,000
});

// Set data (memory only — does not modify HTML):
$(".product").data("wishlist", true);
console.log($(".product").data("wishlist")); // true
```

---

<a name="chapter-4"></a>
## Chapter 4 — jQuery CSS Manipulation

### 4.1 The `.css()` Method

Reads and writes CSS styles directly. Think of it as jQuery's direct line to an element's appearance.

---

### 4.2 Getting CSS Values

```javascript
const bgColor  = $("#header").css("background-color");
const fontSize = $("#header").css("font-size");
console.log(bgColor);  // Output: "rgb(30, 58, 95)" — browser converts hex to rgb
console.log(fontSize); // Output: "24px"

// Reads computed styles too (not just inline styles):
const bodyFont = $("body").css("font-family");
console.log(bodyFont); // Output: "'Segoe UI', sans-serif"
```

---

### 4.3 Setting CSS — Single Property

```javascript
$("h1").css("color", "red");
$("h1").css("font-size", "32px");
$(".card").css("border-radius", "12px");
$("body").css("background-color", "#f0f2f5");
```

---

### 4.4 Setting CSS — Multiple Properties

Pass a JavaScript object:

```javascript
// ❌ Verbose:
$(".alert").css("background", "#fee2e2");
$(".alert").css("color", "#dc2626");
$(".alert").css("border-radius", "8px");

// ✅ Clean object form:
$(".alert").css({
  "background"    : "#fee2e2",
  "color"         : "#dc2626",
  "border-radius" : "8px",
  "padding"       : "12px 16px"
});

// camelCase keys (no quotes needed):
$(".alert").css({
  background   : "#fee2e2",
  color        : "#dc2626",
  borderRadius : "8px",    // camelCase = no quotes on key
  padding      : "12px 16px"
});
```

---

### 4.5 `.css()` with a Function

```javascript
// Zebra striping rows dynamically:
$(".row").css("background", function(index) {
  return index % 2 === 0 ? "#f8fafc" : "#ffffff";
});

// Progressive opacity:
$("p").css("opacity", function(index) {
  return 1 - (index * 0.15); // 1.0, 0.85, 0.70...
});
```

---

### 4.6 CSS Classes — The Preferred Approach

Best practice: define styles in CSS classes, toggle them with jQuery. Keeps style in CSS and behaviour in JavaScript.

#### `.addClass()`

```javascript
// CSS: .btn-success { background: green; color: white; }
$("#saveBtn").addClass("btn-success");
// Result: button gets green style from CSS class

$(".notification").addClass("visible");
$("#card").addClass("highlighted featured"); // Multiple at once
```

#### `.removeClass()`

```javascript
$("#menu").removeClass("expanded");
$(".card").removeClass("loading error"); // Multiple at once
$("p").removeClass();                    // Remove ALL classes
```

#### `.toggleClass()` — Most Commonly Used

```javascript
// CSS: .dark-mode { background: #1a1a2e; color: white; }

$("#darkModeBtn").on("click", function() {
  $("body").toggleClass("dark-mode");
  // Click 1: adds dark-mode → dark theme
  // Click 2: removes dark-mode → light theme
  // Alternates every click
});

// Toggle with condition (true = add, false = remove):
const isError = true;
$("input#amount").toggleClass("input-error", isError);
```

#### `.hasClass()`

```javascript
// HTML: <div id="account" class="account premium active">

console.log($("#account").hasClass("premium")); // true
console.log($("#account").hasClass("frozen"));  // false

if ($("#submitBtn").hasClass("loading")) {
  console.log("Already submitting...");
} else {
  $("#submitBtn").addClass("loading").text("Processing...");
}
```

---

### 4.7 Dimensions and Position

```javascript
// Width and Height:
const w = $(".card").width();     // Content width (no padding/border)
const h = $(".card").height();    // Content height
$(".card").width(300);            // Set to 300px
$(".card").innerWidth();          // Includes padding
$(".card").outerWidth();          // Includes padding + border
$(".card").outerWidth(true);      // Also includes margin

// Position:
const pos = $(".card").position();    // Relative to parent
console.log(pos.left, pos.top);

const offset = $(".card").offset();   // Relative to document
console.log(offset.left, offset.top);

// Scroll:
$(window).scrollTop(0);   // Scroll page back to top
```

---

<a name="chapter-5"></a>
## Chapter 5 — jQuery DOM Manipulation

### 5.1 The Four Insertion Methods

```
Inside the element:
  .prepend()  → Insert BEFORE existing content, INSIDE element
  .append()   → Insert AFTER  existing content, INSIDE element

Outside the element:
  .before()   → Insert BEFORE the element (as sibling)
  .after()    → Insert AFTER  the element (as sibling)
```

Visual layout:
```
.before()    ← Goes here
<div id="target">
  .prepend() ← Goes here
  [existing content]
  .append()  ← Goes here
</div>
.after()     ← Goes here
```

---

### 5.2 `.append()` — Add Inside, at the End

```javascript
// HTML: <ul id="bankList"><li>GTBank</li></ul>
$("#bankList").append("<li>Access Bank</li>");
// Result: GTBank, Access Bank

// Multiple items:
$("#bankList").append("<li>Zenith Bank</li>", "<li>First Bank</li>");

// Real-world: add transaction row to live table
function addTransaction(tx) {
  const row = `
    <tr>
      <td>${tx.date}</td>
      <td>${tx.desc}</td>
      <td class="${tx.type}">${tx.type === "credit" ? "+" : "-"}₦${tx.amount.toLocaleString()}</td>
    </tr>
  `;
  $("#transactionTable tbody").append(row);
}
```

---

### 5.3 `.prepend()` — Add Inside, at the Start

```javascript
// New notification at the TOP of the feed:
function showNotification(message, type) {
  const time = new Date().toLocaleTimeString("en-NG");
  const html = `<div class="notification ${type}"><span>${time}</span> ${message}</div>`;
  $("#notificationFeed").prepend(html);
  // Most recent notification always appears at the top
}

showNotification("₦50,000 received from Chioma", "success");
showNotification("Login from new device", "warning");
```

---

### 5.4 `.before()` and `.after()`

```javascript
// Insert label BEFORE input:
$("#amount").before('<label for="amount">Transfer Amount (₦):</label>');

// Insert hint AFTER input:
$("#amount").after('<small class="hint">Min: ₦100 | Max: ₦5,000,000</small>');

// Add dividers after every section:
$("section").after('<hr class="divider">');

// Reverse forms (same result, different reading order):
$("<li>Fidelity Bank</li>").appendTo("#bankList");
$("<span class='new'>NEW</span>").insertBefore(".price");
```

---

### 5.5 Removing Elements

#### `.remove()` — Delete Element and Children

```javascript
$("#adBanner").remove();           // Gone completely

$("li").remove(".inactive");       // Only <li class="inactive"> elements

$(".toast-notification").remove(); // Clear all toast messages
```

#### `.empty()` — Clear Children, Keep Element

```javascript
// HTML: <div id="results"><p>10 results</p><ul>...</ul></div>

$("#results").empty();
// Result: <div id="results"></div>
// Wrapper stays; all children deleted

// Real-world: clear before loading new results
function searchProducts(query) {
  $("#productGrid").empty();         // Clear old results
  $("#productGrid").append(spinner); // Show loading spinner
  // ...fetch and render new results
}
```

---

### 5.6 Replacing Elements

```javascript
// .replaceWith() — replace the element itself:
$("#statusText").replaceWith('<span class="badge completed">✅ Completed</span>');

// Replace every <b> with a styled <strong>:
$("b").replaceWith(function() {
  return $("<strong>").addClass("highlight").text($(this).text());
});

// .replaceAll() — reverse form:
$('<span class="new-badge">NEW</span>').replaceAll(".old-badge");
// Every .old-badge element is replaced with the <span>
```

---

### 5.7 Cloning — `.clone()`

```javascript
// Clone without events:
const $copy = $("#templateCard").clone();
$copy.attr("id", "card-" + Date.now());
$("#cardGrid").append($copy);

// Clone WITH event handlers (pass true):
const $copyWithEvents = $(".card:first").clone(true);

// Template pattern:
function addProductCard(product) {
  const $card = $("#cardTemplate").clone(true);
  $card
    .removeAttr("id")
    .find(".card-title").text(product.name).end()
    .find(".card-price").text("₦" + product.price.toLocaleString()).end()
    .find(".btn-buy").data("productId", product.id).end()
    .show();
  $("#productGrid").append($card);
}
```

---

### 5.8 Wrapping Elements

```javascript
// HTML: <p>GTBank</p><p>Zenith Bank</p>

// Wrap each individually:
$("p").wrap('<div class="bank-item"></div>');
// Each <p> gets its own wrapper div

// Wrap all together:
$("p").wrapAll('<div class="banks-container"></div>');
// All <p> elements go inside one container

// Wrap content inside:
$("p").wrapInner('<strong></strong>');
// <p><strong>GTBank</strong></p>

// Remove wrapper:
$("p").unwrap();
// Removes parent, leaving <p> in place
```

---

### 5.9 Creating New Elements

```javascript
// Build with jQuery constructor:
const $card = $("<div>", {
  id: "product-42", class: "product-card", "data-price": 450000
});
const $title = $("<h3>").text("Samsung Galaxy A55");
const $price = $("<p>").addClass("price").text("₦450,000");
const $btn   = $("<button>").addClass("btn btn-primary").text("Add to Cart")
                 .on("click", function() { console.log("Added!"); });

$card.append($title, $price, $btn);
$("#productGrid").append($card);

// Template literal approach (clean for larger structures):
function createCard(product) {
  return $(`
    <div class="product-card" data-id="${product.id}">
      <h3>${product.name}</h3>
      <div class="price">₦${product.price.toLocaleString()}</div>
      <button class="btn-cart">🛒 Add to Cart</button>
    </div>
  `);
}
$("#grid").append(createCard({ id: 1, name: "Laptop", price: 850000 }));
```

---

### 5.10 jQuery Events

```javascript
// Click:
$("#payBtn").on("click", function() {
  $(this).text("Processing...").prop("disabled", true);
});

// Input (fires on every keystroke):
$("#searchBox").on("input", function() {
  filterProducts($(this).val());
});

// Hover:
$(".card")
  .on("mouseenter", function() { $(this).addClass("hovered"); })
  .on("mouseleave", function() { $(this).removeClass("hovered"); });

// Form submit:
$("#transferForm").on("submit", function(event) {
  event.preventDefault(); // Stop page reload!
  console.log("Transfer: ₦" + Number($("#amount").val()).toLocaleString());
});

// ─── Event Delegation — for dynamically added elements ────────────────
// ❌ WRONG — won't fire on cards added after this line runs:
$(".btn-cart").on("click", function() { ... });

// ✅ CORRECT — delegate to a static parent:
$(document).on("click", ".btn-cart", function() {
  const productId = $(this).closest(".product-card").data("id");
  console.log("Added product", productId);
});
```

---

### 5.11 Animations and Effects

```javascript
// Show/Hide:
$(".modal").show();          // Instant
$(".modal").hide("slow");    // "slow"=600ms, "fast"=200ms
$(".modal").toggle();        // Toggle between show and hide

// Fade:
$(".notification").fadeIn(300);
$(".notification").fadeOut(300);
$(".notification").fadeTo(300, 0.5); // Fade to 50% opacity

// Slide:
$(".dropdown-menu").slideDown(200);
$(".dropdown-menu").slideUp(200);
$(".accordion").slideToggle();

// Callback after animation completes:
$("#successMessage")
  .fadeIn(300)
  .delay(2000)
  .fadeOut(300, function() {
    $(this).remove(); // Remove from DOM after fade-out
  });

// Custom animate:
$(".sidebar").animate({ width: "300px", opacity: 1 }, 400);

// Counting animation (value counter):
$({ value: 0 }).animate({ value: 500000 }, {
  duration: 1500,
  step: function(now) {
    $("#balanceDisplay").text("₦" + Math.round(now).toLocaleString());
  }
});
// Counts from ₦0 to ₦500,000 over 1.5 seconds
```

---

<a name="phase-2"></a>
## Phase 2 — Applied Exercises

### Exercise 1 — Warm-Up: Selectors and CSS

**Objective:** Target elements precisely and apply dynamic CSS using jQuery.

**Scenario:** Style a Nigerian bank branches table entirely using jQuery after the page loads.

**Warm-up:**
```javascript
$(function() {
  $(".btn-primary").css({ background: "#2563eb", color: "white", borderRadius: "6px" });
});
```

**Instructions:**
1. Create an HTML page with a table of 5 bank branches (Bank Name, State, ATM Count, Status: Active/Inactive)
2. Inside `$(function() { ... })`:
   - Header row: background `#1e3a5f`, text white
   - Zebra striping: even rows light gray, odd rows white
   - "Inactive" cells: red text, light red background
   - "Active" cells: green text, light green background
   - Table itself: `border-radius: 8px`
3. Use at least three different selector types

**Hints:**
- `$("tr:even")` for alternating rows
- `$("td:contains('Inactive')")` targets cells with specific text
- Chain `.css()` or use the object form

**Self-check questions:**
- What is the difference between `$("tr:first")` and `$("tr").first()`?
- Why is `.css()` less ideal than `.addClass()` for styling?
- What does `$(this)` refer to inside a jQuery event callback?

---

### Exercise 2 — Intermediate: Dynamic To-Do List

**Objective:** Build a task manager using `.append()`, `.remove()`, `.val()`, and event delegation.

**Scenario:** A Lagos productivity startup needs a simple internal task manager.

**Warm-up:**
```javascript
$("#addBtn").on("click", function() {
  const task = $("#taskInput").val().trim();
  if (task) {
    $("#taskList").append("<li>" + task + " <button class='delete'>✕</button></li>");
    $("#taskInput").val("");
  }
});
```

**Instructions:**
1. Build HTML: text input + "Add Task" button + empty `<ul id="taskList">`
2. On "Add Task": validate, append `<li>` with task + ✕ button, clear input
3. Use event delegation for delete buttons (dynamic elements!)
4. Delete: fade out then `.remove()`
5. Click task text: toggle `completed` class (strike-through in CSS)
6. Show count of remaining tasks — updates on add and delete

**What-if challenges:**
- "Clear All" button calling `.empty()`
- Save/restore tasks with `localStorage` + `JSON.stringify/parse`
- Press Enter to add task: `.on("keypress")`

**Self-check questions:**
- Why must you use event delegation for delete buttons?
- What is the difference between `.remove()` and `.empty()`?
- Why is `.trim()` important on the input value?

---

### Exercise 3 — Advanced: Product Catalogue with Filter and Cart

**Scenario:** Build a mini product page for **TechMart Lagos**.

```javascript
const products = [
  { id:1, name:"Samsung Galaxy A55",    price:450000, category:"phones",      inStock:true  },
  { id:2, name:"Tecno Camon 20",        price:185000, category:"phones",      inStock:true  },
  { id:3, name:"Dell Laptop 15\"",      price:850000, category:"laptops",     inStock:true  },
  { id:4, name:"HP Pavilion 14",        price:680000, category:"laptops",     inStock:false },
  { id:5, name:"JBL Bluetooth Speaker", price:65000,  category:"audio",       inStock:true  },
  { id:6, name:"USB-C Hub 7-in-1",      price:28000,  category:"accessories", inStock:true  }
];
```

**Instructions:**
1. Render all products as cards with `$.each()` and `.append()`
2. Live search: filter cards by name using `.toggle()`
3. Category filter buttons hide non-matching cards
4. Out-of-stock cards: `.addClass("out-of-stock")`, button disabled with `.prop("disabled", true)`
5. Cart counter increments on add; button text changes to "Added ✅" then reverts
6. "Sort by Price" button toggles ascending/descending

**Self-check questions:**
- How do you hide/show cards without removing them from the DOM?
- What jQuery method updates button text? How do you revert it after a delay?
- What is the role of `.data()` in your "Add to Cart" implementation?

---

<a name="phase-3"></a>
## Phase 3 — Project: Lagos Events Board

### Project Overview

Build a dynamic community events listing page. Data comes from a JavaScript array (simulating a JSON API). jQuery handles all rendering, filtering, CSS changes, animations, and interactions.

**Features:** Event cards rendered from data · Category filter · Live search · Favourite toggle · RSVP counter · Modal popup · Staggered animations

---

### Stage 1 — Full Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lagos Events Board</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; color: #1a1a2e; }

    header {
      background: linear-gradient(135deg, #e63946 0%, #c1121f 100%);
      color: white; padding: 28px 32px; text-align: center;
    }
    header h1 { font-size: 32px; margin-bottom: 6px; }
    header p { opacity: .85; }

    .controls {
      background: white; padding: 16px 32px;
      display: flex; gap: 12px; flex-wrap: wrap; align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,.07);
      position: sticky; top: 0; z-index: 100;
    }
    #searchBox {
      flex: 1; min-width: 200px; padding: 9px 14px;
      border: 2px solid #e2e8f0; border-radius: 8px; font-size: 15px; outline: none;
      transition: border-color .2s;
    }
    #searchBox:focus { border-color: #e63946; }
    .filter-btn {
      padding: 8px 16px; border: 2px solid #e2e8f0; border-radius: 20px;
      background: white; cursor: pointer; font-size: 13px; font-weight: 600;
      transition: all .2s;
    }
    .filter-btn.active, .filter-btn:hover {
      background: #e63946; color: white; border-color: #e63946;
    }
    #resultCount { font-size: 13px; color: #64748b; margin-left: auto; }

    #eventsGrid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px; padding: 28px 32px;
    }
    .event-card {
      background: white; border-radius: 12px; overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,.07);
      transition: transform .25s, box-shadow .25s; position: relative;
    }
    .event-card:hover { transform: translateY(-5px); box-shadow: 0 8px 24px rgba(0,0,0,.13); }

    .card-header { padding: 20px 20px 12px; border-bottom: 1px solid #f1f5f9; }
    .card-category {
      display: inline-block; padding: 3px 10px; border-radius: 12px;
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .5px; margin-bottom: 10px;
    }
    .cat-music  { background: #fce7f3; color: #be185d; }
    .cat-tech   { background: #dbeafe; color: #1d4ed8; }
    .cat-food   { background: #dcfce7; color: #15803d; }
    .cat-sports { background: #fef3c7; color: #b45309; }
    .card-title { font-size: 17px; font-weight: 700; margin-bottom: 6px; }
    .card-meta  { font-size: 13px; color: #64748b; }
    .card-meta span { margin-right: 10px; }
    .card-body  { padding: 14px 20px; }
    .card-desc  { font-size: 14px; color: #475569; line-height: 1.6; }
    .card-footer {
      padding: 12px 20px; border-top: 1px solid #f1f5f9;
      display: flex; align-items: center; justify-content: space-between; gap: 8px;
    }
    .btn {
      padding: 8px 16px; border: none; border-radius: 6px;
      cursor: pointer; font-size: 13px; font-weight: 600; transition: all .2s;
    }
    .btn-rsvp { background: #e63946; color: white; }
    .btn-rsvp:hover { background: #c1121f; }
    .btn-details { background: #f1f5f9; color: #475569; }
    .btn-details:hover { background: #e2e8f0; }
    .rsvp-count { font-size: 12px; color: #94a3b8; }

    .fav-btn {
      position: absolute; top: 14px; right: 14px;
      background: none; border: none; font-size: 20px; cursor: pointer;
      transition: transform .2s; line-height: 1;
    }
    .fav-btn:hover { transform: scale(1.3); }
    .fav-btn.active { color: #e63946; }

    #emptyState {
      display: none; text-align: center; padding: 60px 20px;
      color: #94a3b8; font-size: 18px; grid-column: 1 / -1;
    }

    #modalOverlay {
      display: none; position: fixed; inset: 0;
      background: rgba(0,0,0,.5); z-index: 500;
      align-items: center; justify-content: center;
    }
    #modalOverlay.open { display: flex; }
    #modal {
      background: white; border-radius: 16px; padding: 32px;
      max-width: 500px; width: 90%; position: relative;
      animation: modalIn .25s ease-out;
    }
    @keyframes modalIn {
      from { transform: translateY(20px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    #modalClose {
      position: absolute; top: 14px; right: 18px;
      background: none; border: none; font-size: 22px; cursor: pointer; color: #94a3b8;
    }
    #modalClose:hover { color: #e63946; }
    #modal h2  { font-size: 22px; margin-bottom: 10px; }
    #modal .meta { font-size: 14px; color: #475569; margin-bottom: 16px; line-height: 1.8; }
    #modal p   { color: #64748b; line-height: 1.7; }
  </style>
</head>
<body>

<header>
  <h1>🎉 Lagos Events Board</h1>
  <p>Discover the best events happening across Lagos</p>
</header>

<div class="controls">
  <input type="text" id="searchBox" placeholder="🔍 Search events...">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="tech">💻 Tech</button>
  <button class="filter-btn" data-filter="music">🎵 Music</button>
  <button class="filter-btn" data-filter="food">🍜 Food</button>
  <button class="filter-btn" data-filter="sports">⚽ Sports</button>
  <span id="resultCount"></span>
</div>

<div id="eventsGrid">
  <div id="emptyState">😕 No events found. Try a different search.</div>
</div>

<div id="modalOverlay">
  <div id="modal">
    <button id="modalClose">✕</button>
    <div id="modalContent"></div>
  </div>
</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script>

const events = [
  { id:1, category:"tech",
    title:"Lagos Developer Summit 2024",
    date:"Sat, 22 June 2024", time:"9:00 AM",
    venue:"Eko Hotel & Suites, Victoria Island",
    price:"Free", rsvp:312,
    desc:"Nigeria's largest gathering of software developers, covering AI, cloud computing, and the growing Lagos tech ecosystem. Speakers from Google, Microsoft, and leading Nigerian startups." },
  { id:2, category:"music",
    title:"Afrobeats Live: Lagos Edition",
    date:"Fri, 28 June 2024", time:"7:00 PM",
    venue:"Muri Okunola Park, Victoria Island",
    price:"₦15,000", rsvp:847,
    desc:"An open-air concert featuring top Afrobeats artists including live performances, DJs, and a celebration of Nigerian music culture. Food vendors and artisan markets on-site." },
  { id:3, category:"food",
    title:"Lagos Food Festival",
    date:"Sun, 30 June 2024", time:"12:00 PM",
    venue:"Lekki Conservation Centre",
    price:"₦5,000", rsvp:523,
    desc:"A celebration of Nigerian cuisine featuring chefs from all 36 states. Cook-offs, tasting sessions, street food, palm wine bars, and cooking masterclasses by award-winning chefs." },
  { id:4, category:"tech",
    title:"Women in Tech Nigeria",
    date:"Sat, 6 July 2024", time:"10:00 AM",
    venue:"Co-Creation Hub (CcHUB), Yaba",
    price:"Free", rsvp:218,
    desc:"Empowering women in Nigerian technology through mentorship sessions, panel discussions, and networking. Featuring founders, engineers, and product leaders from across the industry." },
  { id:5, category:"sports",
    title:"Lagos Marathon Street Run",
    date:"Sun, 7 July 2024", time:"6:00 AM",
    venue:"National Stadium, Surulere",
    price:"₦3,000", rsvp:1204,
    desc:"The annual Lagos street marathon — 5km, 10km, and full 42km categories. Open to all fitness levels. Medals for all finishers, prize money for top 3 in each category." },
  { id:6, category:"music",
    title:"Jazz & Blues at Terra Kulture",
    date:"Fri, 12 July 2024", time:"6:30 PM",
    venue:"Terra Kulture Arena, Victoria Island",
    price:"₦20,000", rsvp:175,
    desc:"An intimate evening of jazz and blues with some of Nigeria's most talented musicians. Cocktail reception, art exhibition, and live improvisation sessions." }
];

function createEventCard(ev) {
  return $(`
    <div class="event-card" data-id="${ev.id}" data-category="${ev.category}">
      <button class="fav-btn" data-id="${ev.id}" title="Favourite">🤍</button>
      <div class="card-header">
        <div class="card-category cat-${ev.category}">${ev.category}</div>
        <div class="card-title">${ev.title}</div>
        <div class="card-meta">
          <span>📅 ${ev.date}</span><span>🕐 ${ev.time}</span>
        </div>
        <div class="card-meta"><span>📍 ${ev.venue}</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc">${ev.desc.substring(0, 110)}...</p>
      </div>
      <div class="card-footer">
        <div>
          <button class="btn btn-rsvp" data-id="${ev.id}">RSVP — ${ev.price}</button>
          <div class="rsvp-count" id="rsvp-${ev.id}">${ev.rsvp} attending</div>
        </div>
        <button class="btn btn-details" data-id="${ev.id}">Details</button>
      </div>
    </div>
  `);
}

function renderCards(list) {
  $("#eventsGrid").children(".event-card").remove();
  if (list.length === 0) {
    $("#emptyState").show();
  } else {
    $("#emptyState").hide();
    $.each(list, function(i, ev) {
      const $card = createEventCard(ev).hide();
      $("#eventsGrid").append($card);
      $card.delay(i * 70).fadeIn(250); // Staggered fade-in
    });
  }
  $("#resultCount").text(list.length + " event" + (list.length !== 1 ? "s" : "") + " found");
}

let activeFilter = "all";

function applyFilters() {
  const q = $("#searchBox").val().toLowerCase().trim();
  const filtered = events.filter(function(ev) {
    const matchCat    = activeFilter === "all" || ev.category === activeFilter;
    const matchSearch = ev.title.toLowerCase().includes(q) ||
                        ev.venue.toLowerCase().includes(q) ||
                        ev.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
  renderCards(filtered);
}

$(function() {

  renderCards(events);

  // Search
  $("#searchBox").on("input", applyFilters);

  // Category filter
  $(".filter-btn").on("click", function() {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    activeFilter = $(this).data("filter");
    applyFilters();
  });

  // RSVP — delegated (cards are dynamic)
  $(document).on("click", ".btn-rsvp", function() {
    const id = $(this).data("id");
    const ev = events.find(e => e.id === id);
    if (!ev) return;
    ev.rsvp++;
    $("#rsvp-" + id).text(ev.rsvp + " attending");
    $(this).text("✅ RSVP'd!").prop("disabled", true).css("background", "#16a34a");

    const $toast = $("<div>").text("✅ RSVP confirmed!").css({
      position:"fixed", bottom:"20px", right:"20px",
      background:"#1e3a5f", color:"white",
      padding:"12px 20px", borderRadius:"8px", fontSize:"14px", zIndex:999
    });
    $("body").append($toast);
    $toast.hide().fadeIn(200).delay(2000).fadeOut(300, function() { $(this).remove(); });
  });

  // Favourite
  $(document).on("click", ".fav-btn", function() {
    $(this).toggleClass("active")
      .text($(this).hasClass("active") ? "❤️" : "🤍")
      .css("transform", "scale(1.4)");
    setTimeout(() => $(this).css("transform", ""), 200);
  });

  // Details modal
  $(document).on("click", ".btn-details", function() {
    const id = $(this).data("id");
    const ev = events.find(e => e.id === id);
    if (!ev) return;
    $("#modalContent").html(`
      <span class="card-category cat-${ev.category}"
        style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:700;text-transform:uppercase;margin-bottom:10px;">
        ${ev.category}
      </span>
      <h2>${ev.title}</h2>
      <div class="meta">
        📅 ${ev.date} &nbsp;|&nbsp; 🕐 ${ev.time}<br>
        📍 ${ev.venue}<br>
        💰 ${ev.price} &nbsp;|&nbsp; 👥 ${ev.rsvp} attending
      </div>
      <p>${ev.desc}</p>
    `);
    $("#modalOverlay").addClass("open");
  });

  // Close modal
  $("#modalClose, #modalOverlay").on("click", function(e) {
    if ($(e.target).is("#modalOverlay") || $(e.target).is("#modalClose")) {
      $("#modalOverlay").removeClass("open");
    }
  });

  $(document).on("keydown", function(e) {
    if (e.key === "Escape") $("#modalOverlay").removeClass("open");
  });

});
</script>
</body>
</html>
```

---

### Stage 2 — Extending the Board

```javascript
// Sort by RSVP count:
$("#sortBtn").on("click", function() {
  const sorted = [...events].sort((a, b) => b.rsvp - a.rsvp);
  renderCards(sorted);
});

// Animated RSVP counter:
function animateCounter(selector, end) {
  $({ n: 0 }).animate({ n: end }, {
    duration: 1000,
    step: function() { $(selector).text(Math.round(this.n).toLocaleString()); }
  });
}

// Persist favourites:
$(document).on("click", ".fav-btn", function() {
  const ids = $(".fav-btn.active").map(function() { return $(this).data("id"); }).get();
  localStorage.setItem("lagos_favs", JSON.stringify(ids));
});

function restoreFavourites() {
  const saved = JSON.parse(localStorage.getItem("lagos_favs") || "[]");
  saved.forEach(id => {
    $(`.fav-btn[data-id="${id}"]`).addClass("active").text("❤️");
  });
}
```

---

### Stage 3 — Reflection

**Reflection Questions:**
1. 🤔 In `renderCards()`, why do we call `$("#eventsGrid").children(".event-card").remove()` rather than `$("#eventsGrid").empty()`? What would `.empty()` destroy that we want to keep?
2. 🤔 RSVP, favourite, and details buttons all use `$(document).on(...)` event delegation. Why? What would break if you attached events directly after calling `renderCards()`?
3. 🤔 The staggered animation uses `.delay(i * 70)`. With 50 events the last card takes 3.5 seconds. How would you improve this?
4. 🤔 How would you modify `applyFilters()` to support multi-select categories — showing both Tech AND Music simultaneously?
5. 🤔 What are the first three changes needed to load `events` from a real AJAX call instead of a hardcoded array?

**Optional Advanced Features:**
- Sort by date and RSVP count (toggle buttons)
- "My Favourites" sidebar using `.clone()` to duplicate favourited cards
- Smooth scroll-to-top on filter change: `$("html, body").animate({ scrollTop: 0 }, 400)`
- Share button copying event details to clipboard via `navigator.clipboard.writeText(...)`
- Persist RSVP state per event so refreshing the page remembers your RSVPs

---

<a name="checklist"></a>
## Completion Checklist

| # | Topic | Understood | Practised |
|---|-------|-----------|----------|
| 1 | What jQuery is, why it exists, where it is still used | ☐ | ☐ |
| 2 | Loading jQuery via CDN; `$(document).ready()` pattern | ☐ | ☐ |
| 3 | Element, ID, and class selectors | ☐ | ☐ |
| 4 | CSS selectors inside `$()` (descendant, child, attribute) | ☐ | ☐ |
| 5 | jQuery filter selectors (`:first`, `:eq()`, `:contains()`, `:checked`) | ☐ | ☐ |
| 6 | Traversal methods (`.find()`, `.parent()`, `.siblings()`, `.closest()`) | ☐ | ☐ |
| 7 | Method chaining and `.end()` | ☐ | ☐ |
| 8 | jQuery object vs DOM element — conversion between them | ☐ | ☐ |
| 9 | `.text()`, `.html()`, `.val()` — get and set | ☐ | ☐ |
| 10 | `.attr()` vs `.prop()` — when to use each | ☐ | ☐ |
| 11 | `.data()` with auto type-conversion | ☐ | ☐ |
| 12 | `.css()` — get/set single and multiple properties | ☐ | ☐ |
| 13 | `.addClass()`, `.removeClass()`, `.toggleClass()`, `.hasClass()` | ☐ | ☐ |
| 14 | Dimension methods (`.width()`, `.height()`, `.offset()`) | ☐ | ☐ |
| 15 | `.append()`, `.prepend()`, `.before()`, `.after()` | ☐ | ☐ |
| 16 | `.remove()` vs `.empty()` | ☐ | ☐ |
| 17 | `.clone()`, `.wrap()`, `.replaceWith()` | ☐ | ☐ |
| 18 | Creating new elements with `$("<tag>")` | ☐ | ☐ |
| 19 | Event delegation for dynamic elements | ☐ | ☐ |
| 20 | Animations — `.fadeIn/Out()`, `.slideDown/Up()`, `.animate()` | ☐ | ☐ |
| 21 | Built Lagos Events Board and tested all interactions | ☐ | ☐ |

---

## 10-Question Self-Assessment Quiz

**1.** What does `$(document).ready()` do?
- a) Loads the jQuery library
- b) Runs code only after the full HTML DOM has loaded ✅
- c) Waits for all images to fully load
- d) Connects to the jQuery CDN

**2.** What is the difference between `$("p")` and `$("#p")`?
- a) There is no difference
- b) `$("p")` selects all `<p>` tags; `$("#p")` selects the element with `id="p"` ✅
- c) `$("p")` selects by class; `$("#p")` selects by tag
- d) `$("#p")` selects all `<p>` tags

**3.** Which method reads text content of `<h1 id="title">Hello</h1>`?
- a) `$("#title").html()`
- b) `$("#title").val()`
- c) `$("#title").text()` ✅
- d) `$("#title").content()`

**4.** Key difference between `.attr("checked")` and `.prop("checked")`?
- a) They are identical
- b) `.attr()` reads the initial HTML state; `.prop()` reads the live current state ✅
- c) `.prop()` reads HTML; `.attr()` reads live state
- d) Neither works for checkboxes

**5.** What does `$(".card").toggleClass("active")` do?
- a) Removes "active" from all .card elements
- b) Adds "active" to all .card elements
- c) Adds "active" if absent, removes it if present — for each element independently ✅
- d) Throws an error

**6.** Difference between `.remove()` and `.empty()`?
- a) They are identical
- b) `.remove()` deletes the element; `.empty()` clears children but keeps the element ✅
- c) `.empty()` deletes the element; `.remove()` clears children
- d) `.remove()` only works on `<div>` elements

**7.** Why use event delegation for dynamically added elements?
- a) It is faster for all elements
- b) Direct binding only attaches to elements present at bind time; delegation works for future elements ✅
- c) jQuery requires delegation for all events
- d) Direct binding does not work in jQuery

**8.** What does `$(".card").css({ borderRadius: "8px", padding: "16px" })` do?
- a) Reads both CSS properties
- b) Sets both properties — camelCase keys are valid ✅
- c) Causes an error because camelCase is invalid
- d) Only sets the first property

**9.** What does `$("tr:odd").css("background", "#f8fafc")` style?
- a) Rows with an `odd` CSS class
- b) Table rows at odd indices (1, 3, 5...) ✅
- c) Only the first table row
- d) Causes a selector error

**10.** What does `.clone(true)` do differently from `.clone()`?
- a) Creates a deep copy including all nested children
- b) Copies the element AND all attached jQuery event handlers ✅
- c) Copies only the outer HTML tag
- d) There is no `true` parameter for `.clone()`

**Answer Key:** 1b · 2b · 3c · 4b · 5c · 6b · 7b · 8b · 9b · 10b

---

## Key Gotchas Summary

| ❌ Common Mistake | ✅ Fix |
|-----------------|-------|
| Running jQuery before DOM loads | Wrap in `$(function() { ... })` |
| Using `.attr("checked")` to test live checkbox state | Use `.prop("checked")` — reads live state |
| Attaching events directly to dynamically added elements | Event delegation: `$(parent).on("event", ".child", fn)` |
| Using `.html()` with user-supplied data | Use `.text()` for user data — prevents XSS |
| `$(this)` referring to the wrong thing | `$(this)` only works correctly inside jQuery event/method callbacks |
| Using DOM methods on a jQuery object (e.g., `.style`) | Wrap with `$()` or access DOM element via `[0]` |
| Losing original set after traversal | Use `.end()` to return to the previous jQuery set in a chain |
| Calling `.val()` on a non-form element | `.val()` only works on `<input>`, `<textarea>`, `<select>` |
| Comparing CSS colour against hex (`.css()` returns rgb()) | Compare with rgb format or use class toggling instead |
| Forgetting `event.preventDefault()` on form submit | Always call it to stop the page reloading on form submission |

---

## Chapter Summary

> **jQuery** is a JavaScript library built on the motto "Write less, do more." It provides a unified, concise API for selecting DOM elements with CSS-style syntax using `$()`, reading and writing their content (`.text()`, `.html()`, `.val()`), manipulating styles (`.css()`, `.addClass()`, `.toggleClass()`), restructuring the page (`.append()`, `.remove()`, `.clone()`), and responding to user interactions (`.on()`). Though modern frameworks handle complex applications, jQuery remains deeply embedded in the web ecosystem — powering WordPress, Bootstrap, and millions of production sites — making it an essential skill for any JavaScript developer working in real-world environments.

---

*Tutorial authored using the AI Tutorial Generator framework — Phase 1: Comprehension → Phase 2: Practice → Phase 3: Creation.*
