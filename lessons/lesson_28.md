---
render_with_liquid: false
title: "JavaScript HTML DOM: Introduction to the DOM · DOM Methods · Finding Elements · Changing HTML · Changing CSS · Form Validation · Animations · The Document Object · Element Reference"
nav_order: 28
---

## Table of Contents
1. [What is the HTML DOM?](#1-what-is-the-html-dom)
2. [DOM Methods — Your First Tools](#2-dom-methods--your-first-tools)
3. [Finding HTML Elements](#3-finding-html-elements)
4. [Changing HTML Content](#4-changing-html-content)
5. [Changing CSS Styles](#5-changing-css-styles)
6. [Form Validation with the DOM](#6-form-validation-with-the-dom)
7. [DOM Animations](#7-dom-animations)
8. [The Document Object in Depth](#8-the-document-object-in-depth)
9. [HTML Element Reference](#9-html-element-reference)
10. [Applied Exercises](#10-applied-exercises)
11. [Project Simulation: Interactive Student Dashboard](#11-project-simulation-interactive-student-dashboard)
12. [Completion Checklist & Summary](#12-completion-checklist--summary)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. What is the HTML DOM?

### The Big Picture

When a browser loads an HTML page, it does not just display it — it **reads every tag, builds a structured map of the entire page in memory, and hands that map to JavaScript**. That map is called the **DOM**: the **Document Object Model**.

Think of a webpage like a family tree:

```
document
└── <html>
    ├── <head>
    │   └── <title>My Page</title>
    └── <body>
        ├── <h1>Hello World</h1>
        └── <p id="intro">Welcome!</p>
```

Every tag becomes a **node** in that tree. JavaScript can walk up and down the tree, read any node, change it, add new ones, or delete them — all without reloading the page.

> **Real-world analogy:** A DOM is like a company org chart. The CEO is `<html>`, departments are `<head>` and `<body>`, and individual employees are your tags like `<p>`, `<h1>`, `<button>`. JavaScript is like a manager who can rename employees, add new ones, or fire them — instantly, without rebuilding the company.

---

### Why Does the DOM Exist?

Before the DOM, if you wanted to update a webpage you had to reload the entire page from the server. The DOM was invented so that:

- Pages could **react to users** (clicks, typing, hovering)
- Content could **update in real time** (live scores, chat messages)
- Forms could **validate input** before submitting
- Elements could **animate** without Flash or plugins

Today, every interactive website you use — from Google Docs to YouTube — is built on DOM manipulation.

---

### The DOM is a Standard

The DOM is not invented by a browser. It is a **W3C standard** — a set of rules every browser must follow. This means the same JavaScript DOM code works in Chrome, Firefox, Safari, and Edge.

The standard defines:

| Standard | What it covers |
|---|---|
| Core DOM | All document types (XML, HTML) |
| XML DOM | XML-specific features |
| **HTML DOM** | HTML-specific features — this is what we learn |

---

### The DOM Standard Defines:

- **HTML elements as objects** — each tag in your HTML becomes a JavaScript object
- **Properties** — the data inside that object (e.g., `innerHTML`, `id`, `style`)
- **Methods** — the actions you can call on it (e.g., `getElementById()`, `appendChild()`)
- **Events** — triggers that fire when something happens (e.g., `onclick`, `onchange`)

---

### Micro-Demo 1 — The DOM in One Line

```html
<p id="demo">I am original text.</p>

<script>
  document.getElementById("demo").innerHTML = "DOM changed me!";
</script>
```

**What happens:**
1. Browser builds the DOM from the HTML
2. `document` is the entry point to the entire tree
3. `.getElementById("demo")` finds the `<p>` node with `id="demo"`
4. `.innerHTML = "DOM changed me!"` replaces the text inside it

**Expected output in browser:** The paragraph now reads: `DOM changed me!`

---

> 💡 **Thinking question:** What would happen if you used an `id` that doesn't exist in the page? Try `document.getElementById("ghost")` — what would JavaScript return?  
> **Answer:** It returns `null`. Trying to set `.innerHTML` on `null` will throw an error. Always check that your element exists!

---

## 2. DOM Methods — Your First Tools

### What is a Method?

A **method** is an action you can perform. Just like a TV remote has buttons (change channel, adjust volume), DOM objects have methods (find element, change content, add child).

The two most foundational DOM methods are:

| Method | What it does |
|---|---|
| `document.getElementById(id)` | Finds one element by its `id` attribute |
| `document.createElement(tag)` | Creates a brand new HTML element |

---

### `getElementById` — Your Most-Used Tool

```html
<!DOCTYPE html>
<html>
<body>

  <p id="greet">Good morning!</p>
  <button onclick="changeGreeting()">Change Greeting</button>

  <script>
    function changeGreeting() {
      // Step 1: Find the element
      var element = document.getElementById("greet");

      // Step 2: Change its content
      element.innerHTML = "Good evening!";
    }
  </script>

</body>
</html>
```

**Line-by-line breakdown:**

| Line | Meaning |
|---|---|
| `document.getElementById("greet")` | Searches the entire DOM for a tag with `id="greet"` and returns it as a JavaScript object |
| `element.innerHTML` | A **property** of the element object — it holds the HTML content inside the tags |
| `= "Good evening!"` | Assigns a new value, replacing the old content |

**Expected output:** After clicking the button, the paragraph changes from "Good morning!" to "Good evening!" without any page reload.

---

### `innerHTML` vs `innerText` — An Important Difference

These two properties look similar but behave differently:

```html
<div id="box">Hello</div>

<script>
  var el = document.getElementById("box");

  // innerHTML treats the value as HTML markup
  el.innerHTML = "<strong>Bold text</strong>";
  // → Displays bold text in the browser

  // innerText treats the value as plain text
  el.innerText = "<strong>Bold text</strong>";
  // → Displays the literal string: <strong>Bold text</strong>
</script>
```

> ⚠️ **Common beginner mistake:** Using `innerHTML` to insert user-typed content directly. If a user types `<script>alert("hacked")</script>`, it will execute! For user input, always use `innerText` or sanitize the input first.

---

### The `document` Object — Your Gateway

`document` is a special built-in JavaScript object that represents the entire loaded page. Every DOM method starts from `document` because it is the **root of the tree**.

```
window
  └── document        ← your starting point
        ├── head
        └── body
              ├── h1
              └── p
```

You do not create `document` — the browser creates it automatically when the page loads.

---

### Defining HTML Elements — The id Attribute

`getElementById` works because HTML allows every tag to carry a unique identifier:

```html
<p id="score">0</p>
<p id="status">Not started</p>
```

The `id` must be **unique per page** — just like a national ID number. If two elements share the same `id`, `getElementById` will only find the first one, and your code will behave unpredictably.

---

## 3. Finding HTML Elements

### Six Ways to Find Elements

Once you have the `document`, you need to locate the specific elements you want to work with. JavaScript gives you six main strategies:

| Method | Returns | Use when... |
|---|---|---|
| `getElementById(id)` | Single element | You know the exact `id` |
| `getElementsByTagName(tag)` | HTMLCollection | You want all `<p>`, all `<li>`, etc. |
| `getElementsByClassName(cls)` | HTMLCollection | You want all elements sharing a CSS class |
| `querySelector(selector)` | Single element | You want the first match using CSS selector syntax |
| `querySelectorAll(selector)` | NodeList | You want all matches using CSS selector syntax |
| `getElementsByName(name)` | NodeList | Used with form inputs sharing a `name` attribute |

---

### Method 1: `getElementById`

```html
<h2 id="title">JavaScript DOM</h2>

<script>
  var title = document.getElementById("title");
  console.log(title.innerHTML); // Output: JavaScript DOM
</script>
```

- Returns **one element** (or `null` if not found)
- Fastest method — browser optimises id lookups

---

### Method 2: `getElementsByTagName`

Returns an **HTMLCollection** — like an array of all matching elements.

```html
<p>First paragraph</p>
<p>Second paragraph</p>
<p>Third paragraph</p>

<script>
  var paragraphs = document.getElementsByTagName("p");

  console.log(paragraphs.length);     // Output: 3
  console.log(paragraphs[0].innerHTML); // Output: First paragraph
  console.log(paragraphs[2].innerHTML); // Output: Third paragraph
</script>
```

> 🔍 **What is an HTMLCollection?** It is a live list of DOM elements. "Live" means: if you add a new `<p>` to the page later, `paragraphs` automatically includes it — you don't need to call the method again.

---

### Looping Through a Collection

```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>

<script>
  var items = document.getElementsByTagName("li");

  for (var i = 0; i < items.length; i++) {
    items[i].style.color = "green";  // Makes each item text green
  }
</script>
```

**Expected output:** All three list items turn green in the browser.

---

### Method 3: `getElementsByClassName`

```html
<p class="highlight">This is highlighted.</p>
<p>This is not.</p>
<p class="highlight">This is also highlighted.</p>

<script>
  var highlighted = document.getElementsByClassName("highlight");
  console.log(highlighted.length); // Output: 2
</script>
```

> 💡 Multiple classes: `document.getElementsByClassName("box active")` finds elements that have **both** classes.

---

### Method 4: `querySelector` — CSS Selector Power

`querySelector` accepts any CSS selector string — giving you tremendous flexibility:

```html
<div class="card">
  <p id="first">Hello</p>
  <p>World</p>
</div>

<script>
  // By id (like getElementById)
  var el1 = document.querySelector("#first");
  console.log(el1.innerHTML); // Output: Hello

  // By class
  var el2 = document.querySelector(".card");

  // By tag
  var el3 = document.querySelector("p");

  // By attribute
  var el4 = document.querySelector("input[type='text']");

  // By nesting — the first <p> inside .card
  var el5 = document.querySelector(".card p");
  console.log(el5.innerHTML); // Output: Hello
</script>
```

---

### Method 5: `querySelectorAll`

Like `querySelector` but returns **all** matches as a NodeList.

```html
<p class="item">One</p>
<p class="item">Two</p>
<p class="item">Three</p>

<script>
  var items = document.querySelectorAll(".item");

  items.forEach(function(item) {
    item.style.fontWeight = "bold";
  });
</script>
```

**Expected output:** All three paragraphs become bold.

> 🔑 **Difference from HTMLCollection:** NodeList returned by `querySelectorAll` is **static** — it does not update if you add new matching elements later.

---

### Searching Within an Element (Not Just the Document)

You can call these methods on **any element**, not just `document`. This lets you narrow your search:

```html
<div id="section-a">
  <p>Paragraph in A</p>
</div>
<div id="section-b">
  <p>Paragraph in B</p>
</div>

<script>
  var sectionA = document.getElementById("section-a");
  var pInA = sectionA.getElementsByTagName("p");
  console.log(pInA[0].innerHTML); // Output: Paragraph in A
  // Does NOT find the paragraph in section-b
</script>
```

---

### Navigating the DOM Tree with Relationships

Every element knows about its relatives:

| Property | What it returns |
|---|---|
| `element.parentNode` | The direct parent element |
| `element.childNodes` | All child nodes (including text nodes) |
| `element.children` | Only child **elements** (no text nodes) |
| `element.firstChild` | First child node |
| `element.lastChild` | Last child node |
| `element.nextSibling` | Next node at the same level |
| `element.previousSibling` | Previous node at the same level |
| `element.firstElementChild` | First child that is an element |
| `element.lastElementChild` | Last child that is an element |

```html
<ul id="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>

<script>
  var menu = document.getElementById("menu");
  var first = menu.firstElementChild;
  var last = menu.lastElementChild;

  console.log(first.innerHTML); // Output: Home
  console.log(last.innerHTML);  // Output: Contact
  console.log(menu.children.length); // Output: 3
</script>
```

---

## 4. Changing HTML Content

### What Can You Change?

Once you have found an element, you can change almost anything about it:

| What to change | Property / Method |
|---|---|
| Text/HTML inside a tag | `.innerHTML` or `.innerText` |
| An attribute value (src, href, alt…) | `.setAttribute()` or direct property |
| The entire element | `.outerHTML` |
| Append new child elements | `.appendChild()`, `.insertBefore()` |
| Remove elements | `.removeChild()`, `.remove()` |
| Write directly to the page (during load) | `document.write()` |

---

### Changing innerHTML

```html
<h1 id="heading">Old Title</h1>

<script>
  document.getElementById("heading").innerHTML = "New Title";
</script>
```

**Expected output:** The page displays "New Title".

---

### Changing an Attribute

HTML attributes (like `src`, `href`, `value`, `alt`) can be changed by:

**Method A — Direct property access:**

```html
<img id="photo" src="cat.jpg" alt="A cat">

<script>
  var img = document.getElementById("photo");
  img.src = "dog.jpg";   // Changes the image source
  img.alt = "A dog";     // Changes the alt text
</script>
```

**Method B — Using `setAttribute`:**

```html
<a id="link" href="https://google.com">Visit</a>

<script>
  document.getElementById("link").setAttribute("href", "https://bing.com");
</script>
```

**Read an attribute with `getAttribute`:**

```html
<script>
  var href = document.getElementById("link").getAttribute("href");
  console.log(href); // Output: https://bing.com
</script>
```

---

### `document.write()` — Use With Caution

`document.write()` adds content directly into the HTML stream as the page loads:

```html
<script>
  document.write("<p>Written during page load</p>");
</script>
```

> ⚠️ **Critical warning:** If you call `document.write()` **after** the page has finished loading, it **overwrites the entire page**. This is almost never what you want. Use `innerHTML` instead for post-load changes.

---

### Creating and Inserting New Elements

This is one of the most powerful DOM skills: building elements from scratch and inserting them into the page.

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<button onclick="addItem()">Add Item</button>

<script>
  function addItem() {
    // Step 1: Create the new element
    var newItem = document.createElement("li");

    // Step 2: Give it content
    newItem.innerHTML = "Item 3";

    // Step 3: Find where to put it
    var list = document.getElementById("list");

    // Step 4: Append it as the last child
    list.appendChild(newItem);
  }
</script>
```

**Expected output:** Each button click adds a new `<li>Item 3</li>` to the list.

---

### Inserting Before a Specific Element

```html
<ul id="list">
  <li id="second">Second</li>
</ul>

<script>
  var newItem = document.createElement("li");
  newItem.innerHTML = "First (inserted)";

  var list = document.getElementById("list");
  var secondItem = document.getElementById("second");

  // insertBefore(newNode, referenceNode)
  list.insertBefore(newItem, secondItem);
</script>
```

**Expected output:** The list now shows "First (inserted)" above "Second".

---

### Removing Elements

**Modern approach (on the element itself):**

```html
<p id="remove-me">Delete me!</p>

<script>
  document.getElementById("remove-me").remove();
</script>
```

**Classic approach (via parent):**

```html
<script>
  var child = document.getElementById("remove-me");
  child.parentNode.removeChild(child);
</script>
```

Both achieve the same result. The `.remove()` approach is shorter but slightly less supported in very old browsers.

---

### Replacing an Element

```html
<p id="old">Old paragraph</p>

<script>
  var newPara = document.createElement("p");
  newPara.innerHTML = "New paragraph";

  var old = document.getElementById("old");
  old.parentNode.replaceChild(newPara, old);
</script>
```

---

### `outerHTML` — Replace Including the Tag Itself

```html
<p id="box">Hello</p>

<script>
  // innerHTML changes only the CONTENT inside the tag
  // outerHTML changes the ENTIRE element including the tag itself

  document.getElementById("box").outerHTML = "<h2>I replaced the paragraph!</h2>";
</script>
```

**Expected output:** The `<p>` tag is completely replaced by an `<h2>`.

---

> 💡 **Thinking question:** After the code above runs, `document.getElementById("box")` will return `null`. Why?  
> **Answer:** The element with `id="box"` no longer exists — it was replaced. The new `<h2>` doesn't have that id.

---

## 5. Changing CSS Styles

### The `style` Property

Every DOM element has a `.style` property that maps directly to its inline CSS. You can read and write any CSS property through it.

```html
<p id="message">Style me!</p>

<script>
  var el = document.getElementById("message");

  el.style.color = "red";
  el.style.fontSize = "24px";
  el.style.fontWeight = "bold";
  el.style.backgroundColor = "yellow";
  el.style.padding = "10px";
</script>
```

**Expected output:** The paragraph appears large, bold, red text on a yellow background with padding.

---

### CSS Property Name Conversion Rule

CSS uses **hyphens**: `background-color`, `font-size`, `border-radius`.  
JavaScript uses **camelCase**: `backgroundColor`, `fontSize`, `borderRadius`.

The rule: **remove the hyphen and capitalise the next letter**.

| CSS Property | JavaScript Property |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-top-width` | `borderTopWidth` |
| `z-index` | `zIndex` |
| `flex-direction` | `flexDirection` |
| `text-decoration` | `textDecoration` |

---

### Toggle Visibility

A classic pattern: show or hide an element based on its current state.

```html
<div id="panel" style="display:block;">
  <p>I am visible!</p>
</div>

<button onclick="togglePanel()">Toggle</button>

<script>
  function togglePanel() {
    var panel = document.getElementById("panel");

    if (panel.style.display === "none") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  }
</script>
```

**Expected output:** Each button click hides/shows the div.

---

### Using CSS Classes Instead of Inline Styles

Inline styles are powerful but mix logic with presentation. A cleaner approach is to **add and remove CSS classes** using JavaScript.

```html
<style>
  .highlighted {
    background-color: yellow;
    font-weight: bold;
    border: 2px solid orange;
  }
</style>

<p id="note">Click a button to style me.</p>

<button onclick="addStyle()">Add Style</button>
<button onclick="removeStyle()">Remove Style</button>
<button onclick="toggleStyle()">Toggle Style</button>

<script>
  var note = document.getElementById("note");

  function addStyle() {
    note.classList.add("highlighted");
  }

  function removeStyle() {
    note.classList.remove("highlighted");
  }

  function toggleStyle() {
    note.classList.toggle("highlighted");
  }
</script>
```

---

### The `classList` API — Full Reference

| Method / Property | What it does |
|---|---|
| `classList.add("cls")` | Adds a class |
| `classList.remove("cls")` | Removes a class |
| `classList.toggle("cls")` | Adds if missing, removes if present |
| `classList.contains("cls")` | Returns `true` if the class is present |
| `classList.replace("old", "new")` | Swaps one class for another |
| `classList.length` | Number of classes on the element |

```html
<div id="box" class="card active large"></div>

<script>
  var box = document.getElementById("box");

  console.log(box.classList.contains("active")); // true
  console.log(box.classList.length);             // 3

  box.classList.remove("large");
  console.log(box.classList.length);             // 2

  box.classList.replace("active", "disabled");
  // Now: class="card disabled"
</script>
```

---

### Reading Computed Styles

`.style` only reads **inline** styles. If a style comes from a CSS file or `<style>` tag, you need `getComputedStyle`:

```html
<style>
  #text { color: blue; font-size: 18px; }
</style>

<p id="text">Blue text</p>

<script>
  var el = document.getElementById("text");

  // This reads the COMPUTED (final applied) style
  var computed = window.getComputedStyle(el);
  console.log(computed.color);    // Output: rgb(0, 0, 255)
  console.log(computed.fontSize); // Output: 18px
</script>
```

---

## 6. Form Validation with the DOM

### Why Validate on the Client Side?

When a user fills out a form and clicks Submit, the data travels to a server. Sending invalid data (empty fields, wrong email format) wastes bandwidth and frustrates users with slow error feedback. **Client-side validation** catches errors instantly, before the data ever leaves the browser.

> ⚠️ **Important:** Client-side validation is for **user experience**. Always also validate on the **server side**, because users can bypass JavaScript.

---

### A Basic Required-Field Check

```html
<form name="myForm" onsubmit="return validateForm()">
  <label>Name:</label>
  <input type="text" id="name" placeholder="Enter your name">
  <br>
  <button type="submit">Submit</button>
</form>

<script>
  function validateForm() {
    var nameInput = document.getElementById("name").value;

    // .trim() removes leading/trailing spaces
    if (nameInput.trim() === "") {
      alert("Name is required!");
      return false; // Stops form submission
    }

    return true; // Allows form submission
  }
</script>
```

**Key concept:** `return false` from an `onsubmit` handler **prevents the form from submitting**. `return true` allows it.

---

### Validating an Email Address

```html
<input type="text" id="email" placeholder="Enter email">
<span id="emailError" style="color:red;"></span>

<script>
  function validateEmail() {
    var email = document.getElementById("email").value;
    var errorSpan = document.getElementById("emailError");

    // A simple email pattern check
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
      errorSpan.innerText = "Please enter a valid email.";
      return false;
    } else {
      errorSpan.innerText = "";
      return true;
    }
  }
</script>
```

---

### Numeric Range Validation

```html
<label>Age (18–65):</label>
<input type="number" id="age">
<p id="ageError" style="color:red;"></p>

<script>
  function validateAge() {
    var age = Number(document.getElementById("age").value);
    var error = document.getElementById("ageError");

    if (isNaN(age) || age < 18 || age > 65) {
      error.innerText = "Age must be between 18 and 65.";
      return false;
    }
    error.innerText = "";
    return true;
  }
</script>
```

---

### Automatic HTML5 Validation vs JavaScript Validation

Modern HTML5 includes built-in validation attributes:

| Attribute | Behaviour |
|---|---|
| `required` | Field must not be empty |
| `type="email"` | Must match email format |
| `type="number"` | Must be a number |
| `min` / `max` | Number must be in range |
| `minlength` / `maxlength` | Text length limits |
| `pattern` | Must match a regex pattern |

```html
<input type="email" required placeholder="your@email.com">
<input type="number" min="18" max="65" required>
```

HTML5 validation fires automatically on submit. JavaScript validation gives you **more control** over the error messages and timing.

---

### Real-Time Validation with Events

Instead of waiting for form submission, validate as the user types:

```html
<input type="text" id="username" oninput="checkUsername(this.value)">
<small id="usernameMsg"></small>

<script>
  function checkUsername(value) {
    var msg = document.getElementById("usernameMsg");

    if (value.length < 3) {
      msg.style.color = "red";
      msg.innerText = "Too short (minimum 3 characters)";
    } else if (value.length > 20) {
      msg.style.color = "red";
      msg.innerText = "Too long (maximum 20 characters)";
    } else {
      msg.style.color = "green";
      msg.innerText = "✓ Username looks good!";
    }
  }
</script>
```

**Expected output:** As the user types, the message updates instantly with colour-coded feedback.

---

### Password Confirmation Check

```html
<input type="password" id="pass1" placeholder="Password">
<input type="password" id="pass2" placeholder="Confirm Password">
<p id="matchMsg"></p>

<script>
  function checkPasswords() {
    var p1 = document.getElementById("pass1").value;
    var p2 = document.getElementById("pass2").value;
    var msg = document.getElementById("matchMsg");

    if (p2 === "") {
      msg.innerText = "";
    } else if (p1 === p2) {
      msg.style.color = "green";
      msg.innerText = "✓ Passwords match";
    } else {
      msg.style.color = "red";
      msg.innerText = "✗ Passwords do not match";
    }
  }

  document.getElementById("pass2").addEventListener("input", checkPasswords);
</script>
```

---

## 7. DOM Animations

### How DOM Animations Work (The Concept)

CSS transitions and animations are great for simple effects. But JavaScript DOM animations give you **precise control** using:

- **`setInterval(fn, ms)`** — runs a function repeatedly every `ms` milliseconds
- **`clearInterval(id)`** — stops a running interval
- **`requestAnimationFrame(fn)`** — the modern, performance-friendly alternative

The core idea: **change a CSS property by a small amount, many times per second, to create the illusion of smooth movement**.

---

### The Timer Functions Explained

| Function | What it does |
|---|---|
| `setTimeout(fn, ms)` | Calls `fn` once after `ms` milliseconds |
| `setInterval(fn, ms)` | Calls `fn` repeatedly every `ms` milliseconds |
| `clearInterval(id)` | Stops an interval using its returned id |
| `requestAnimationFrame(fn)` | Calls `fn` before the next screen repaint (~60fps) |

---

### Micro-Demo: Blinking Text

```html
<p id="blink">Notice me!</p>

<script>
  var visible = true;

  setInterval(function() {
    var el = document.getElementById("blink");
    el.style.visibility = visible ? "hidden" : "visible";
    visible = !visible;
  }, 500); // Every 500ms (half a second)
</script>
```

**Expected output:** The text alternates between visible and hidden twice per second.

---

### Building a Slide Animation Step by Step

This is the classic W3Schools sliding box animation — let's build it together and understand every line.

**HTML structure:**

```html
<div id="container" style="
  width: 400px;
  height: 400px;
  position: relative;
  background: #ddd;
">
  <div id="box" style="
    width: 50px;
    height: 50px;
    background: red;
    position: absolute;
    top: 0px;
    left: 0px;
  "></div>
</div>

<button onclick="startMove()">Start</button>
<button onclick="stopMove()">Stop</button>
```

**Why `position: relative` on the container?**  
The box uses `position: absolute` which positions it relative to its nearest positioned ancestor. By setting `relative` on the container, the box moves within the container, not the entire page.

**JavaScript:**

```javascript
var timer = null;   // Stores the interval ID so we can stop it later

function startMove() {
  // Prevent starting multiple intervals at once
  clearInterval(timer);

  timer = setInterval(function() {
    var box = document.getElementById("box");

    // Read current left position (removing "px" to get a number)
    var currentLeft = parseInt(box.style.left);

    // If box has reached the right edge of the container, stop
    if (currentLeft >= 350) {  // 400px container - 50px box = 350px max
      clearInterval(timer);
    } else {
      // Move box 1px to the right
      box.style.left = (currentLeft + 1) + "px";
    }
  }, 5); // Every 5ms ≈ 200 frames per second
}

function stopMove() {
  clearInterval(timer);
}
```

**Line-by-line breakdown:**

| Code | Meaning |
|---|---|
| `var timer = null` | Declares a variable outside the function so it persists between calls |
| `clearInterval(timer)` | Ensures no duplicate intervals run at the same time |
| `parseInt(box.style.left)` | Converts `"0px"` (a string) into `0` (a number) for arithmetic |
| `(currentLeft + 1) + "px"` | Increases by 1, then converts back to `"1px"` string |
| `clearInterval(timer)` at the boundary | Stops the animation when the box reaches the edge |

---

### Using `requestAnimationFrame` — The Modern Way

`setInterval` has a problem: it fires on its own schedule, not in sync with the browser's painting cycle. This can cause **jank** (stuttering). `requestAnimationFrame` is smarter:

```javascript
var pos = 0;
var animating = false;
var animId;

function animate() {
  if (!animating) return;

  var box = document.getElementById("box");
  pos++;

  if (pos >= 350) {
    pos = 350;
    animating = false;
  }

  box.style.left = pos + "px";

  // Request the NEXT frame
  animId = requestAnimationFrame(animate);
}

function startMove() {
  if (!animating) {
    animating = true;
    animate();
  }
}

function stopMove() {
  animating = false;
  cancelAnimationFrame(animId);
}
```

**Why is this better?**
- Syncs with the display refresh rate (usually 60fps)
- Pauses automatically when the tab is not visible (saves CPU/battery)
- Smoother than `setInterval`

---

### Animating Multiple Properties

```html
<div id="bubble" style="
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: blue;
  position: absolute;
  top: 200px;
  left: 0px;
  opacity: 1;
"></div>

<script>
  var x = 0;
  var opacity = 1;

  function animate() {
    var el = document.getElementById("bubble");

    x += 2;
    opacity -= 0.005;

    el.style.left = x + "px";
    el.style.opacity = opacity;

    if (x < 400 && opacity > 0) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
</script>
```

**Expected output:** A blue circle slides to the right while gradually fading out.

---

## 8. The Document Object in Depth

### What Is the `document` Object?

The `document` object is the **root of the HTML DOM** — it represents the loaded HTML page and provides access to every element, attribute, and text node in it.

You never create `document` — it's automatically available in any JavaScript running in a browser.

---

### Key `document` Properties

| Property | What it returns |
|---|---|
| `document.title` | The page title (from `<title>` tag) |
| `document.URL` | Full URL of the current page |
| `document.domain` | Domain name (e.g., `"example.com"`) |
| `document.referrer` | URL of the page that linked here |
| `document.lastModified` | Date/time the page was last modified |
| `document.readyState` | Loading state: `"loading"`, `"interactive"`, `"complete"` |
| `document.characterSet` | Character encoding (usually `"UTF-8"`) |
| `document.doctype` | The DOCTYPE declaration |
| `document.head` | The `<head>` element |
| `document.body` | The `<body>` element |
| `document.documentElement` | The `<html>` element |
| `document.forms` | HTMLCollection of all `<form>` elements |
| `document.images` | HTMLCollection of all `<img>` elements |
| `document.links` | HTMLCollection of all `<a>` elements with href |
| `document.scripts` | HTMLCollection of all `<script>` elements |
| `document.styleSheets` | List of all linked/embedded stylesheets |
| `document.cookie` | Get or set cookies |

---

### Practical Examples

**Reading page information:**

```javascript
console.log(document.title);        // "My Page Title"
console.log(document.URL);          // "https://example.com/page.html"
console.log(document.domain);       // "example.com"
console.log(document.lastModified); // "03/17/2026 10:30:00"
console.log(document.readyState);   // "complete"
```

**Accessing the `<body>` directly:**

```javascript
document.body.style.backgroundColor = "lightblue";
document.body.style.fontFamily = "Arial, sans-serif";
```

**Working with forms:**

```javascript
console.log(document.forms.length);         // Number of forms on the page
console.log(document.forms[0].id);          // id of first form
console.log(document.forms["loginForm"]);   // Access by name attribute
```

**Working with images:**

```javascript
var images = document.images;
for (var i = 0; i < images.length; i++) {
  console.log(images[i].src); // Prints URL of each image
}
```

**Working with links:**

```javascript
var links = document.links;
for (var i = 0; i < links.length; i++) {
  links[i].style.color = "purple"; // Changes all link colours
}
```

---

### Creating Elements — Full Node API

The document object is responsible for creating all new nodes:

| Method | Creates |
|---|---|
| `document.createElement(tag)` | A new HTML element |
| `document.createTextNode(text)` | A raw text node |
| `document.createAttribute(name)` | A new attribute node |
| `document.createComment(text)` | An HTML comment node |
| `document.createDocumentFragment()` | A lightweight container for building DOM structures off-screen |

**Text node example:**

```javascript
var para = document.createElement("p");
var text = document.createTextNode("Hello from a text node!");
para.appendChild(text);
document.body.appendChild(para);
// Result: <p>Hello from a text node!</p> added to the page
```

---

### DocumentFragment — Performance Trick

When adding many elements, inserting them one by one causes the browser to **repaint the screen repeatedly**. A `DocumentFragment` lets you build the structure in memory first, then insert everything at once:

```javascript
var fragment = document.createDocumentFragment();

for (var i = 1; i <= 100; i++) {
  var li = document.createElement("li");
  li.innerText = "Item " + i;
  fragment.appendChild(li); // No repaint yet
}

// ONE repaint only
document.getElementById("myList").appendChild(fragment);
```

This is significantly faster than 100 individual `appendChild` calls on the live DOM.

---

### Cookies with `document.cookie`

```javascript
// Set a cookie
document.cookie = "username=Alice; expires=Thu, 31 Dec 2026 12:00:00 UTC; path=/";

// Read all cookies (returns one big string)
console.log(document.cookie);
// Output: "username=Alice; theme=dark"

// To read a specific cookie, you need to parse the string manually
function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("=");
    if (parts[0] === name) return parts[1];
  }
  return null;
}

console.log(getCookie("username")); // Output: Alice
```

> 💡 For modern projects, use `localStorage` or `sessionStorage` for client-side data storage. Cookies are mainly for data that needs to be sent to the server.

---

### `document.open()`, `document.write()`, `document.close()`

These three work together to write an entirely new document:

```javascript
document.open();
document.write("<html><body><h1>New document written by JS!</h1></body></html>");
document.close();
```

> ⚠️ This **completely replaces** the existing page. Used mainly in old-style popup windows. Avoid in modern projects.

---

## 9. HTML Element Reference

### The Element as an Object

Every HTML element in the DOM is represented as a JavaScript object. That object has:

- **Properties** — data about the element (its id, class, style, content, etc.)
- **Methods** — actions you can perform (click it, focus it, blur it, etc.)

This section catalogues the most important ones.

---

### Universal Element Properties (Available on Every Element)

| Property | Type | Description |
|---|---|---|
| `id` | String | The element's `id` attribute |
| `tagName` | String | Tag name in UPPERCASE (`"DIV"`, `"P"`, `"INPUT"`) |
| `nodeName` | String | Same as tagName for elements |
| `nodeType` | Number | 1=Element, 3=Text, 8=Comment, 9=Document |
| `innerHTML` | String | HTML content inside the element |
| `innerText` | String | Visible text content (no tags) |
| `textContent` | String | All text content (includes hidden text) |
| `outerHTML` | String | The element including its own opening/closing tags |
| `className` | String | All CSS classes as a space-separated string |
| `classList` | DOMTokenList | Live list of classes (use `.add()`, `.remove()`, `.toggle()`) |
| `style` | CSSStyleDeclaration | Inline styles |
| `attributes` | NamedNodeMap | All attributes of the element |
| `dataset` | DOMStringMap | Custom `data-*` attributes |
| `hidden` | Boolean | Whether the element is hidden |
| `tabIndex` | Number | Keyboard tab order |
| `title` | String | Tooltip text |
| `lang` | String | Language code |
| `dir` | String | Text direction: `"ltr"` or `"rtl"` |
| `accessKey` | String | Keyboard shortcut key |
| `contentEditable` | String | `"true"` if user can edit the element's content |
| `isContentEditable` | Boolean | Read-only. Is the element editable? |
| `draggable` | Boolean | Can the element be dragged? |

---

### Position and Size Properties

| Property | Description |
|---|---|
| `offsetWidth` | Total width including padding and border |
| `offsetHeight` | Total height including padding and border |
| `offsetLeft` | Distance from left edge of offset parent |
| `offsetTop` | Distance from top edge of offset parent |
| `offsetParent` | Nearest positioned ancestor element |
| `clientWidth` | Width including padding, excluding border and scrollbar |
| `clientHeight` | Height including padding, excluding border |
| `scrollWidth` | Full scrollable width |
| `scrollHeight` | Full scrollable height |
| `scrollLeft` | Pixels scrolled horizontally |
| `scrollTop` | Pixels scrolled vertically |
| `getBoundingClientRect()` | Returns size and position relative to viewport |

```javascript
var box = document.getElementById("box");

console.log(box.offsetWidth);   // e.g. 300 (px)
console.log(box.offsetTop);     // e.g. 120 (px from top of offset parent)

var rect = box.getBoundingClientRect();
console.log(rect.top);    // Distance from top of viewport
console.log(rect.left);   // Distance from left of viewport
console.log(rect.width);  // Element width
console.log(rect.height); // Element height
```

---

### Tree Navigation Properties

| Property | Returns |
|---|---|
| `parentNode` | Parent node (may be a text node or document) |
| `parentElement` | Parent element (always an element or null) |
| `childNodes` | NodeList of all child nodes |
| `children` | HTMLCollection of child elements only |
| `firstChild` | First child node |
| `lastChild` | Last child node |
| `firstElementChild` | First child element |
| `lastElementChild` | Last child element |
| `nextSibling` | Next sibling node |
| `previousSibling` | Previous sibling node |
| `nextElementSibling` | Next sibling element |
| `previousElementSibling` | Previous sibling element |
| `childElementCount` | Number of child elements |

---

### Universal Element Methods

| Method | Description |
|---|---|
| `getAttribute(name)` | Get the value of an attribute |
| `setAttribute(name, value)` | Set an attribute value |
| `removeAttribute(name)` | Remove an attribute |
| `hasAttribute(name)` | Returns boolean: does the attribute exist? |
| `appendChild(node)` | Add a child node at the end |
| `insertBefore(new, ref)` | Insert before a reference child |
| `removeChild(child)` | Remove a child node |
| `replaceChild(new, old)` | Replace a child node |
| `cloneNode(deep)` | Clone the element; `deep=true` clones children too |
| `contains(node)` | Returns boolean: is the node a descendant? |
| `matches(selector)` | Returns boolean: does the element match a CSS selector? |
| `closest(selector)` | Walks up the tree, returns first ancestor matching selector |
| `querySelector(sel)` | Finds first matching descendant |
| `querySelectorAll(sel)` | Finds all matching descendants |
| `insertAdjacentHTML(pos, html)` | Inserts HTML at a specific position |
| `insertAdjacentElement(pos, el)` | Inserts an element at a specific position |
| `scrollIntoView()` | Scrolls the element into the visible viewport |
| `focus()` | Gives focus to the element |
| `blur()` | Removes focus |
| `click()` | Programmatically clicks the element |
| `remove()` | Removes the element from the DOM |

---

### `insertAdjacentHTML` Positions

```html
<div id="target">TARGET</div>

<script>
  var el = document.getElementById("target");

  el.insertAdjacentHTML("beforebegin", "<p>Before the div</p>");
  // <p>Before the div</p>
  // <div id="target">TARGET</div>

  el.insertAdjacentHTML("afterbegin", "<p>First inside div</p>");
  // <div id="target"><p>First inside div</p>TARGET</div>

  el.insertAdjacentHTML("beforeend", "<p>Last inside div</p>");
  // <div id="target">TARGET<p>Last inside div</p></div>

  el.insertAdjacentHTML("afterend", "<p>After the div</p>");
  // <div id="target">TARGET</div>
  // <p>After the div</p>
</script>
```

---

### `cloneNode` — Copying Elements

```html
<div id="original">
  <p>Hello</p>
  <span>World</span>
</div>

<script>
  var original = document.getElementById("original");

  // Shallow clone — copies only the div, NOT its children
  var shallow = original.cloneNode(false);

  // Deep clone — copies the div AND all its children
  var deep = original.cloneNode(true);

  document.body.appendChild(deep);
  // Adds an identical copy of the div (with <p> and <span>) to the body
</script>
```

---

### `matches` and `closest`

```html
<nav>
  <ul class="menu">
    <li class="item active"><a href="#">Home</a></li>
    <li class="item"><a href="#">About</a></li>
  </ul>
</nav>

<script>
  var link = document.querySelector("a");

  // Does this element match a CSS selector?
  console.log(link.matches("a"));          // true
  console.log(link.matches(".item a"));    // true
  console.log(link.matches(".active a"));  // true

  // Walk UP the tree to find the nearest ancestor matching a selector
  var closestMenu = link.closest(".menu");
  console.log(closestMenu.tagName); // Output: UL

  var closestNav = link.closest("nav");
  console.log(closestNav.tagName); // Output: NAV
</script>
```

---

### `data-*` Attributes and the `dataset` API

Custom data attributes let you embed extra information in HTML without affecting layout:

```html
<div id="product"
  data-id="42"
  data-name="Blue Shirt"
  data-price="29.99"
  data-in-stock="true">
  Blue Shirt
</div>

<script>
  var el = document.getElementById("product");

  console.log(el.dataset.id);       // "42"
  console.log(el.dataset.name);     // "Blue Shirt"
  console.log(el.dataset.price);    // "29.99"
  console.log(el.dataset.inStock);  // "true" (note: camelCase conversion)

  // Modify a data attribute
  el.dataset.price = "24.99";

  // Add a new data attribute
  el.dataset.discount = "10";
  // Now the HTML has data-discount="10"
</script>
```

> 💡 The naming conversion: `data-in-stock` → `dataset.inStock` (hyphen removed, next letter capitalised — same rule as CSS properties).

---

### Input-Specific Properties

`<input>`, `<textarea>`, and `<select>` have special properties:

| Property | Type | Description |
|---|---|---|
| `value` | String | Current value of the input |
| `defaultValue` | String | Original value (before user changes) |
| `checked` | Boolean | Whether a checkbox/radio is checked |
| `defaultChecked` | Boolean | Original checked state |
| `disabled` | Boolean | Whether the input is disabled |
| `readOnly` | Boolean | Whether the input is read-only |
| `required` | Boolean | Whether the input is required |
| `placeholder` | String | Placeholder text |
| `type` | String | Input type (`"text"`, `"number"`, etc.) |
| `name` | String | Name attribute (used in form submission) |
| `form` | HTMLFormElement | The form this input belongs to |
| `validity` | ValidityState | Validation state object |
| `validationMessage` | String | Browser's validation error message |

```javascript
var input = document.getElementById("myInput");

input.value = "Hello";          // Set value
console.log(input.value);       // Read value
input.disabled = true;          // Disable it
input.readOnly = false;         // Make it editable
input.focus();                  // Move cursor to this field
input.select();                 // Select all text in it
```

---

# PHASE 2 — APPLIED EXERCISES

---

## 10. Applied Exercises

---

### Exercise 1: Live Word Counter

**Objective:** Use DOM manipulation to count characters and words in a textarea in real time.

**Real-world scenario:** You are building a Twitter-like post composer. Users must stay under 280 characters. You need to show them their remaining character count as they type.

**Warm-up mini-example:**

```html
<input type="text" oninput="showLength(this)">
<p id="len">0 characters</p>

<script>
  function showLength(input) {
    document.getElementById("len").innerText = input.value.length + " characters";
  }
</script>
```

**Your exercise:**

Build a textarea with:
- A **character counter** (e.g., "245/280 characters used")
- A **word counter** (e.g., "32 words")
- A **colour indicator**: green when under 240, orange from 240–279, red at 280+
- A **submit button** that is disabled until at least 10 characters are entered

**Step-by-step instructions:**

1. Create a `<textarea id="post">` with `maxlength="280"`
2. Add `<p id="charCount">` and `<p id="wordCount">` display elements
3. Add a `<button id="submitBtn" disabled>Post</button>`
4. Write an `oninput` handler that:
   - Reads `textarea.value.length`
   - Updates the character counter text
   - Splits by whitespace to count words: `text.trim().split(/\s+/).filter(Boolean).length`
   - Changes the counter colour using `style.color` based on length
   - Sets `button.disabled = (length < 10)`

**Hints:**

- `"".trim().split(/\s+/).filter(Boolean).length` returns `0`, not `1`. The `.filter(Boolean)` removes empty strings from split on an empty input.
- Access the textarea's value: `document.getElementById("post").value`

**Self-check questions:**
1. What does `filter(Boolean)` do when the textarea is empty?
2. Why use `trim()` before splitting?
3. What happens to `disabled` when the user clears the textarea?

**Optional what-if:** Change the colour of the textarea border (not just the counter) based on length. Also display "X characters remaining" instead of "X used".

---

### Exercise 2: Dynamic Student Grade Table

**Objective:** Let the user add rows to a table using the DOM.

**Real-world scenario:** A school administrator app where teachers can add student grades without a page reload.

**Warm-up mini-example:**

```html
<table id="t"><tr><th>Name</th><th>Grade</th></tr></table>
<button onclick="addRow()">Add Row</button>

<script>
  function addRow() {
    var row = document.createElement("tr");
    row.innerHTML = "<td>Student</td><td>A</td>";
    document.getElementById("t").appendChild(row);
  }
</script>
```

**Your exercise:**

Build a grade entry system with:
- Input fields: student name, subject, grade (number 0–100)
- An "Add Student" button
- A `<table>` that shows each added student
- A **colour-coded grade**: green (≥70), orange (50–69), red (<50)
- A **running class average** displayed below the table
- A **Delete** button on each row

**Step-by-step instructions:**

1. Create three `<input>` fields with ids `"name"`, `"subject"`, `"grade"`
2. Create an empty `<table id="gradeTable">` with headers
3. Create `<p id="average">Class Average: —</p>`
4. In `addStudent()`:
   - Read input values
   - Validate: name not empty, grade is 0–100
   - Create a `<tr>` with `<td>` cells, setting the grade `td`'s background colour
   - Add a Delete button: set its `onclick` to `this.parentElement.parentElement.remove()`
   - After removing, recalculate the average

**Grade colour logic:**

```javascript
var gradeNum = parseInt(grade);
var gradeCell = document.createElement("td");
gradeCell.innerText = gradeNum;
if (gradeNum >= 70) gradeCell.style.backgroundColor = "#c8f7c5";
else if (gradeNum >= 50) gradeCell.style.backgroundColor = "#fde8a0";
else gradeCell.style.backgroundColor = "#fdc5c5";
```

**Self-check questions:**
1. Why do you need `parseInt()` when reading a number input's `.value`?
2. After clicking Delete, how does the average recalculate without knowing which row was removed?
3. Why use `this.parentElement.parentElement.remove()` instead of an `id` in the Delete button?

---

### Exercise 3: CSS Theme Switcher

**Objective:** Toggle between light and dark themes using `classList`.

**Real-world scenario:** Most modern web apps (GitHub, VS Code, Twitter) offer a dark mode. This is typically done by toggling a class on the `<body>`.

**Step-by-step instructions:**

1. In `<style>`, define two themes:
```css
body.light {
  background-color: white;
  color: black;
}
body.dark {
  background-color: #1a1a2e;
  color: #eee;
}
.card {
  padding: 20px;
  border: 1px solid currentColor;
  margin: 10px;
}
```

2. Set `<body class="light">`
3. Create a toggle button
4. In the toggle handler:
   - Use `document.body.classList.toggle("dark")`
   - Use `document.body.classList.toggle("light")`
   - Update the button text: "Switch to Dark" / "Switch to Light"
5. **Remember theme with localStorage:** `localStorage.setItem("theme", "dark")` and read it on page load

**Self-check questions:**
1. Why toggle both classes instead of just adding/removing "dark"?
2. What happens if a user opens the page in a new tab — will their theme preference persist?
3. How would you detect the user's operating system dark mode preference using `window.matchMedia`?

---

### Exercise 4: Animated Progress Bar

**Objective:** Build an animated progress bar using DOM animations.

**Real-world scenario:** File upload progress indicators, quiz result reveals, loading screens.

**Step-by-step instructions:**

1. HTML:
```html
<div style="width:400px; background:#ddd; height:30px; border-radius:15px;">
  <div id="bar" style="
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, #4CAF50, #8BC34A);
    border-radius: 15px;
    transition: width 0.1s;
  "></div>
</div>
<p id="percent">0%</p>
<button onclick="startProgress()">Start</button>
<button onclick="resetProgress()">Reset</button>
```

2. JavaScript:
   - Create a variable `progress = 0`
   - Use `setInterval` every 50ms to increase `progress` by 1
   - Update `bar.style.width = progress + "%"`
   - Update `percent.innerText = progress + "%"`
   - When progress reaches 100, call `clearInterval`

3. **Enhancement:** Change the bar colour as it fills:
   - 0–40%: red
   - 41–70%: orange
   - 71–100%: green

**Self-check questions:**
1. Why is `clearInterval` essential — what happens without it?
2. How do you prevent the user from clicking "Start" multiple times and creating multiple intervals?
3. What does `transition: width 0.1s` in CSS do? How does this interact with the JS animation?

---

### Exercise 5: Form Validation Suite

**Objective:** Build a complete registration form with comprehensive validation.

**Fields to validate:**

| Field | Rules |
|---|---|
| Full Name | Required, letters and spaces only, 2–50 chars |
| Email | Required, valid email format |
| Phone | Required, exactly 10 digits |
| Password | Required, min 8 chars, at least 1 uppercase, 1 digit |
| Confirm Password | Must match password |
| Age | Required, number 16–120 |
| Terms checkbox | Must be checked |

**Step-by-step instructions:**

1. Create the form HTML with one `<span class="error">` next to each field
2. Write a validation function for each field
3. Call all validators on form submit
4. Show error messages next to each invalid field (not alert boxes)
5. Highlight invalid inputs with a red border using `classList.add("invalid")` and a CSS rule `.invalid { border: 2px solid red; }`
6. Clear error messages and borders for valid fields

**Hint for password strength check:**

```javascript
function validatePassword(pass) {
  var hasUpper = /[A-Z]/.test(pass);
  var hasDigit = /[0-9]/.test(pass);
  var hasMinLength = pass.length >= 8;
  return hasUpper && hasDigit && hasMinLength;
}
```

---

# PHASE 3 — PROJECT SIMULATION

---

## 11. Project Simulation: Interactive Student Dashboard

### Project Overview

You are a junior front-end developer at **EduTrack**, a school management software company. Your task is to build a client-side **Student Performance Dashboard** — a single HTML page that teachers can use to:

- Add students and their test scores
- View a dynamically-built grade table
- Filter students by performance category
- Animate a summary panel when scores are entered
- Validate all inputs before accepting them

**No frameworks. No libraries. Pure HTML + CSS + JavaScript DOM.**

---

### Stage 1: Setup & Core Logic

**Goal:** Build the data entry form and display students in a table.

**Preview micro-example:**

```javascript
var students = []; // Our in-memory data store

function addStudent(name, score) {
  students.push({ name: name, score: Number(score) });
  renderTable();
}

function renderTable() {
  var tbody = document.getElementById("studentBody");
  tbody.innerHTML = ""; // Clear existing rows

  students.forEach(function(student, index) {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.score}</td>
      <td>${getGrade(student.score)}</td>
    `;
    tbody.appendChild(row);
  });
}

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
```

**Expected output after Stage 1:** A functional table that grows as students are added.

**Milestones:**

- [ ] HTML form: name input, score input (0–100), subject dropdown, Add button
- [ ] Input validation: name required, score is 0–100, duplicate names warned
- [ ] Data array stores all entries
- [ ] Table renders from array (re-rendered on every change)
- [ ] Each row has a colour-coded grade cell
- [ ] Delete button on each row removes from array and re-renders

---

### Stage 2: Adding Features

**Goal:** Add filtering, sorting, and a statistics panel.

**Preview micro-example — filtering:**

```javascript
function filterStudents(category) {
  var filtered;

  if (category === "all") {
    filtered = students;
  } else if (category === "passing") {
    filtered = students.filter(function(s) { return s.score >= 60; });
  } else if (category === "failing") {
    filtered = students.filter(function(s) { return s.score < 60; });
  } else if (category === "excellent") {
    filtered = students.filter(function(s) { return s.score >= 90; });
  }

  renderTable(filtered); // Pass the filtered list to the renderer
}
```

**Expected output after Stage 2:** Buttons that instantly filter the table. A stats panel showing count, average, highest, and lowest scores.

**Milestones:**

- [ ] Filter buttons: All / Passing (≥60) / Failing (<60) / Excellent (≥90)
- [ ] Sort by name (A–Z) or score (high–low, low–high)
- [ ] Statistics panel showing:
  - Total students
  - Class average (to 1 decimal place)
  - Highest scorer + name
  - Lowest scorer + name
  - Count per grade letter (A, B, C, D, F)
- [ ] Statistics panel **animates in** (fade from opacity 0 to 1) when first student is added
- [ ] Export button that generates a summary `<pre>` block with all data formatted as text

---

### Stage 3: Displaying Results

**Goal:** Add a visual grade distribution bar chart using DOM animation.

**Preview micro-example — drawing bars:**

```javascript
function drawChart() {
  var grades = { A: 0, B: 0, C: 0, D: 0, F: 0 };

  students.forEach(function(s) {
    grades[getGrade(s.score)]++;
  });

  var total = students.length;

  Object.keys(grades).forEach(function(letter) {
    var barEl = document.getElementById("bar-" + letter);
    var percent = total > 0 ? (grades[letter] / total) * 100 : 0;
    barEl.style.width = "0%"; // Reset

    // Animate to actual width
    setTimeout(function() {
      barEl.style.transition = "width 0.8s ease";
      barEl.style.width = percent + "%";
    }, 50);

    document.getElementById("label-" + letter).innerText =
      letter + ": " + grades[letter] + " students";
  });
}
```

**Each bar structure:**

```html
<div style="margin-bottom: 8px;">
  <span id="label-A" style="display:inline-block; width:100px;">A: 0 students</span>
  <div style="display:inline-block; background:#ddd; width:300px; height:20px;">
    <div id="bar-A" style="background:#4CAF50; height:100%; width:0%;"></div>
  </div>
</div>
```

**Expected output after Stage 3:** When students are added or removed, the bar chart animates to reflect the new grade distribution.

---

### Full Project Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EduTrack — Student Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 900px; margin: 20px auto; padding: 0 20px; }
    h1 { color: #2c3e50; }
    .form-group { margin-bottom: 10px; }
    .form-group label { display: inline-block; width: 100px; }
    input, select { padding: 6px; margin: 4px; border: 1px solid #ccc; border-radius: 4px; }
    input.invalid { border-color: red; }
    .error { color: red; font-size: 0.85em; }
    button { padding: 8px 16px; cursor: pointer; border: none; border-radius: 4px; }
    .btn-primary { background: #3498db; color: white; }
    .btn-danger { background: #e74c3c; color: white; font-size: 0.8em; padding: 4px 8px; }
    .btn-filter { background: #ecf0f1; color: #2c3e50; margin: 2px; }
    .btn-filter.active { background: #3498db; color: white; }

    table { border-collapse: collapse; width: 100%; margin-top: 10px; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #2c3e50; color: white; }
    tr:nth-child(even) { background: #f9f9f9; }

    .grade-A { background: #c8f7c5 !important; }
    .grade-B { background: #d5f5e3 !important; }
    .grade-C { background: #fef9e7 !important; }
    .grade-D { background: #fde8a0 !important; }
    .grade-F { background: #fdc5c5 !important; }

    #statsPanel { opacity: 0; transition: opacity 1s; margin-top: 20px; padding: 15px; background: #ecf0f1; border-radius: 8px; }
    #statsPanel.visible { opacity: 1; }

    .chart-bar-bg { display: inline-block; background: #ddd; width: 250px; height: 18px; vertical-align: middle; }
    .chart-bar { height: 100%; width: 0%; transition: width 0.8s ease; }
    .chart-label { display: inline-block; width: 120px; font-size: 0.9em; }
  </style>
</head>
<body>

  <h1>📊 EduTrack — Student Performance Dashboard</h1>

  <!-- SECTION 1: Entry Form -->
  <section>
    <h2>Add Student</h2>
    <div class="form-group">
      <label>Name:</label>
      <input type="text" id="studentName" placeholder="Full name">
      <span class="error" id="nameError"></span>
    </div>
    <div class="form-group">
      <label>Subject:</label>
      <select id="subject">
        <option value="Math">Math</option>
        <option value="English">English</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>
    </div>
    <div class="form-group">
      <label>Score (0–100):</label>
      <input type="number" id="score" min="0" max="100" placeholder="0–100">
      <span class="error" id="scoreError"></span>
    </div>
    <button class="btn-primary" onclick="handleAdd()">+ Add Student</button>
  </section>

  <!-- SECTION 2: Filter Controls -->
  <section style="margin-top: 20px;">
    <strong>Filter:</strong>
    <button class="btn-filter active" onclick="setFilter('all', this)">All</button>
    <button class="btn-filter" onclick="setFilter('passing', this)">Passing (≥60)</button>
    <button class="btn-filter" onclick="setFilter('excellent', this)">Excellent (≥90)</button>
    <button class="btn-filter" onclick="setFilter('failing', this)">Failing (&lt;60)</button>

    <strong style="margin-left: 20px;">Sort:</strong>
    <button class="btn-filter" onclick="setSort('name')">Name A–Z</button>
    <button class="btn-filter" onclick="setSort('score-high')">Score ↓</button>
    <button class="btn-filter" onclick="setSort('score-low')">Score ↑</button>
  </section>

  <!-- SECTION 3: Grade Table -->
  <table id="gradeTable">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Subject</th>
        <th>Score</th>
        <th>Grade</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="studentBody">
      <tr><td colspan="6" style="text-align:center; color:#aaa;">No students yet.</td></tr>
    </tbody>
  </table>

  <!-- SECTION 4: Statistics Panel (animates in) -->
  <div id="statsPanel">
    <h3>📈 Class Statistics</h3>
    <div id="statsContent"></div>
    <h4>Grade Distribution</h4>
    <div id="gradeChart"></div>
  </div>

  <script>
    var students = [];
    var currentFilter = "all";
    var currentSort = "none";
    var statsShown = false;

    // ─── Validation ───────────────────────────────────────
    function validateInputs(name, score) {
      var valid = true;

      document.getElementById("nameError").innerText = "";
      document.getElementById("scoreError").innerText = "";
      document.getElementById("studentName").classList.remove("invalid");
      document.getElementById("score").classList.remove("invalid");

      if (name.trim() === "") {
        document.getElementById("nameError").innerText = "Name is required.";
        document.getElementById("studentName").classList.add("invalid");
        valid = false;
      }

      var scoreNum = Number(score);
      if (score === "" || isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
        document.getElementById("scoreError").innerText = "Enter a score between 0 and 100.";
        document.getElementById("score").classList.add("invalid");
        valid = false;
      }

      return valid;
    }

    // ─── Add Student ──────────────────────────────────────
    function handleAdd() {
      var name = document.getElementById("studentName").value;
      var subject = document.getElementById("subject").value;
      var score = document.getElementById("score").value;

      if (!validateInputs(name, score)) return;

      students.push({
        id: Date.now(),
        name: name.trim(),
        subject: subject,
        score: Number(score)
      });

      // Clear inputs
      document.getElementById("studentName").value = "";
      document.getElementById("score").value = "";

      render();

      // Animate stats panel in on first student
      if (!statsShown) {
        statsShown = true;
        setTimeout(function() {
          document.getElementById("statsPanel").classList.add("visible");
        }, 100);
      }
    }

    // ─── Delete Student ───────────────────────────────────
    function deleteStudent(id) {
      students = students.filter(function(s) { return s.id !== id; });
      render();
    }

    // ─── Grading ──────────────────────────────────────────
    function getGrade(score) {
      if (score >= 90) return "A";
      if (score >= 80) return "B";
      if (score >= 70) return "C";
      if (score >= 60) return "D";
      return "F";
    }

    // ─── Filter & Sort ────────────────────────────────────
    function setFilter(filter, btn) {
      currentFilter = filter;
      document.querySelectorAll(".btn-filter").forEach(function(b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      render();
    }

    function setSort(sort) {
      currentSort = sort;
      render();
    }

    function applyFilterSort(list) {
      // Filter
      var filtered = list.filter(function(s) {
        if (currentFilter === "passing") return s.score >= 60;
        if (currentFilter === "failing") return s.score < 60;
        if (currentFilter === "excellent") return s.score >= 90;
        return true;
      });

      // Sort
      if (currentSort === "name") {
        filtered.sort(function(a, b) { return a.name.localeCompare(b.name); });
      } else if (currentSort === "score-high") {
        filtered.sort(function(a, b) { return b.score - a.score; });
      } else if (currentSort === "score-low") {
        filtered.sort(function(a, b) { return a.score - b.score; });
      }

      return filtered;
    }

    // ─── Render Table ─────────────────────────────────────
    function renderTable(list) {
      var tbody = document.getElementById("studentBody");
      tbody.innerHTML = "";

      if (list.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center; color:#aaa;'>No students match the filter.</td></tr>";
        return;
      }

      list.forEach(function(student, index) {
        var grade = getGrade(student.score);
        var row = document.createElement("tr");
        row.className = "grade-" + grade;

        row.innerHTML =
          "<td>" + (index + 1) + "</td>" +
          "<td>" + student.name + "</td>" +
          "<td>" + student.subject + "</td>" +
          "<td>" + student.score + "</td>" +
          "<td><strong>" + grade + "</strong></td>" +
          "<td><button class='btn-danger' data-id='" + student.id + "'>Delete</button></td>";

        row.querySelector(".btn-danger").addEventListener("click", function() {
          deleteStudent(Number(this.getAttribute("data-id")));
        });

        tbody.appendChild(row);
      });
    }

    // ─── Render Stats ─────────────────────────────────────
    function renderStats() {
      if (students.length === 0) {
        document.getElementById("statsContent").innerHTML = "<p>Add students to see statistics.</p>";
        document.getElementById("gradeChart").innerHTML = "";
        return;
      }

      var scores = students.map(function(s) { return s.score; });
      var avg = (scores.reduce(function(a, b) { return a + b; }, 0) / scores.length).toFixed(1);
      var highest = Math.max.apply(null, scores);
      var lowest = Math.min.apply(null, scores);
      var topStudent = students.find(function(s) { return s.score === highest; });
      var bottomStudent = students.find(function(s) { return s.score === lowest; });

      var gradeCounts = { A: 0, B: 0, C: 0, D: 0, F: 0 };
      students.forEach(function(s) { gradeCounts[getGrade(s.score)]++; });

      document.getElementById("statsContent").innerHTML =
        "<p>👥 <strong>Total Students:</strong> " + students.length + "</p>" +
        "<p>📊 <strong>Class Average:</strong> " + avg + "</p>" +
        "<p>🏆 <strong>Top Scorer:</strong> " + topStudent.name + " (" + highest + ")</p>" +
        "<p>📉 <strong>Lowest Scorer:</strong> " + bottomStudent.name + " (" + lowest + ")</p>";

      // Build animated grade chart
      var chartHTML = "";
      var colors = { A: "#4CAF50", B: "#8BC34A", C: "#FFC107", D: "#FF9800", F: "#F44336" };

      Object.keys(gradeCounts).forEach(function(letter) {
        var pct = students.length > 0 ? (gradeCounts[letter] / students.length * 100) : 0;
        chartHTML +=
          "<div style='margin-bottom:8px;'>" +
          "<span class='chart-label'>" + letter + ": " + gradeCounts[letter] + " student(s)</span>" +
          "<div class='chart-bar-bg'><div id='bar-" + letter + "' class='chart-bar' style='background:" + colors[letter] + ";'></div></div>" +
          "</div>";
      });

      document.getElementById("gradeChart").innerHTML = chartHTML;

      // Animate bars
      Object.keys(gradeCounts).forEach(function(letter) {
        var pct = students.length > 0 ? (gradeCounts[letter] / students.length * 100) : 0;
        setTimeout(function() {
          var bar = document.getElementById("bar-" + letter);
          if (bar) bar.style.width = pct + "%";
        }, 50);
      });
    }

    // ─── Master Render ────────────────────────────────────
    function render() {
      var displayList = applyFilterSort(students);
      renderTable(displayList);
      renderStats();
    }
  </script>

</body>
</html>
```

---

### Reflection Questions

1. **Why do we re-render the entire table on every change** instead of just modifying one row? What are the pros and cons of this "full re-render" approach vs a "targeted update" approach?

2. **The statistics panel fades in on the first student added.** How would you make it fade back out if all students are deleted?

3. **The filter buttons only filter the displayed table, not the underlying data array.** Why is this the right approach? What would go wrong if you filtered the array itself?

4. **How would this project work in a real company?** What would need to change if student data had to be saved to a database and persist across page reloads?

5. **The Delete button uses `data-id`** instead of the student's array index. Why is this safer than using the index directly?

---

### Optional Advanced Features

- [ ] **Edit in place:** Clicking a student's name makes it editable inline using `contenteditable`
- [ ] **Export to CSV:** A button that builds a CSV string and triggers a download using `URL.createObjectURL`
- [ ] **LocalStorage persistence:** Save the `students` array to `localStorage` on every change, restore it on page load
- [ ] **Search filter:** A text input that filters students by name in real time using `querySelectorAll` and `classList`
- [ ] **Drag-to-reorder:** Implement drag-and-drop row reordering using `draggable` and the drag events

---

# 12. Completion Checklist & Summary

---

## Completion Checklist

| # | Item | Covered? |
|---|---|---|
| 1 | The DOM concept — what it is and why it exists | ✅ |
| 2 | `document` as the root object | ✅ |
| 3 | `getElementById`, `getElementsByTagName`, `getElementsByClassName` | ✅ |
| 4 | `querySelector` and `querySelectorAll` | ✅ |
| 5 | Tree navigation: parent, children, siblings | ✅ |
| 6 | `innerHTML`, `innerText`, `textContent` differences | ✅ |
| 7 | `getAttribute`, `setAttribute`, `removeAttribute` | ✅ |
| 8 | `createElement`, `appendChild`, `insertBefore`, `removeChild`, `replaceChild` | ✅ |
| 9 | `outerHTML`, `cloneNode`, `remove` | ✅ |
| 10 | `insertAdjacentHTML` and its four positions | ✅ |
| 11 | `element.style` and camelCase CSS property names | ✅ |
| 12 | `classList` — add, remove, toggle, contains, replace | ✅ |
| 13 | `getComputedStyle` vs inline styles | ✅ |
| 14 | Form validation: required fields, email, numbers, real-time | ✅ |
| 15 | `setInterval`, `clearInterval`, `requestAnimationFrame` | ✅ |
| 16 | Building a sliding animation with boundary detection | ✅ |
| 17 | `document` properties: title, URL, forms, images, links, cookie | ✅ |
| 18 | `DocumentFragment` performance pattern | ✅ |
| 19 | Element position/size: offsetWidth, getBoundingClientRect | ✅ |
| 20 | `dataset` and `data-*` attributes | ✅ |
| 21 | `matches` and `closest` | ✅ |
| 22 | Input-specific properties: value, checked, disabled | ✅ |
| 23 | Applied exercises with real-world scenarios | ✅ |
| 24 | Full mini-project with validation, animation, and DOM construction | ✅ |
| 25 | Common beginner errors highlighted throughout | ✅ |

---

## Common Beginner Errors — Quick Reference

| Mistake | Why it happens | Fix |
|---|---|---|
| `getElementById` returns `null` | Script runs before the element exists in the DOM | Place `<script>` at the end of `<body>`, or use `DOMContentLoaded` |
| `style.left` returns `""` not `"0px"` | Initial style is not set inline | Set `style.left = "0px"` in HTML, or check for `""` and default to 0 |
| `parseInt` returns `NaN` | Style value is empty string | Always provide a fallback: `parseInt(el.style.left) \|\| 0` |
| Multiple intervals stacking | `startMove()` called multiple times | Always call `clearInterval(timer)` before `setInterval` |
| `innerHTML` XSS risk | User input inserted as HTML | Use `innerText` or sanitise HTML |
| `getElementsByTagName` not updating | Expected live, got stale index | HTMLCollections are live, but indices can shift; loop in reverse when removing |
| `querySelectorAll` result has no `.forEach` in IE | NodeList in old browsers | Use `Array.from(list).forEach(...)` for compatibility |
| `document.write` destroying the page | Called after load | Use `innerHTML` instead for post-load content insertion |
| Forgetting `return false` in onsubmit | Form submits even on validation failure | Always `return false` (or `event.preventDefault()`) when validation fails |
| Using `id` that contains spaces | Browsers allow it but JS selectors break | Never put spaces in id values |

---

## One-Sentence Summary

> **The HTML DOM is JavaScript's live map of your webpage — master its methods for finding, changing, creating, and animating elements, and you gain complete programmatic control over everything users see and interact with.**

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source: W3Schools JavaScript HTML DOM series (9 pages) · Format: Markdown*
