---
render_with_liquid: false
title: "JavaScript DOM — Navigation, Nodes, Collections & NodeLists"
nav_order: 38
---

> **How to use this tutorial**
> The DOM (Document Object Model) is the live map of your web page that JavaScript reads and rewrites. These four chapters cover how to **move through** that map, **add and remove pieces** of it, and **work with groups** of elements efficiently. Every front-end framework — React, Vue, Angular — is built on top of these exact mechanisms.
>
> - **Phase 1 – Comprehension:** Full explanations, every property and method demonstrated, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project combining all four chapters

---

# TABLE OF CONTENTS
1. [Chapter 1 — DOM Navigation](#chapter-1--dom-navigation)
2. [Chapter 2 — DOM Nodes](#chapter-2--dom-nodes)
3. [Chapter 3 — HTML Collections](#chapter-3--html-collections)
4. [Chapter 4 — NodeLists](#chapter-4--nodelists)
5. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
6. [Phase 3 — Project Simulation](#phase-3--project-simulation)
7. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — DOM NAVIGATION

## What Is DOM Navigation?

**DOM navigation** means moving through the tree of nodes that makes up your HTML page — starting from one node and travelling to its parent, children, or siblings — without needing to know their IDs or class names in advance.

**Real-world analogy — a family tree:**
Every HTML element has a family. A `<ul>` list is a *parent* to its `<li>` children. Two adjacent `<li>` elements are *siblings* to each other. The `<body>` is a grandparent to them all. DOM navigation is the ability to say: "Start here. Go to the parent. Now get its first child. Now move to the next sibling." — all without searching the whole tree from scratch each time.

---

## 1.1 — The DOM as a Tree

When a browser loads an HTML document, it builds a **tree structure** from every element, attribute, and text string in it.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

**How the browser sees this:**

```
Document
└── html  (Element)
    ├── head  (Element)
    │   └── title  (Element)
    │       └── "Page Title"  (Text)
    └── body  (Element)
        ├── h1  (Element)
        │   └── "Hello"  (Text)
        └── p  (Element)
            └── "World"  (Text)
```

Every box in this tree is a **Node**. There are different kinds of nodes — element nodes, text nodes, comment nodes — and navigation properties let you travel between them.

---

## 1.2 — The Starting Points

Two built-in entry points give you anchors to start navigation from:

```js
document.documentElement   // The <html> element — root of the page
document.body              // The <body> element
document.head              // The <head> element
```

**Micro-demo:**

```js
console.log(document.documentElement.nodeName);  // Output: HTML
console.log(document.body.nodeName);              // Output: BODY
console.log(document.head.nodeName);              // Output: HEAD
```

---

## 1.3 — Parent Navigation: `parentNode` and `parentElement`

Every node (except the document itself) has a parent. Two properties reach it:

```js
// Given this HTML: <div id="box"><p id="para">Text</p></div>

const para = document.getElementById("para");

console.log(para.parentNode);     // Output: <div id="box">...</div>
console.log(para.parentElement);  // Output: <div id="box">...</div>
```

For almost all cases, `parentNode` and `parentElement` return the same thing. The one edge case:

```js
// The parent of <html> is the document node — not an element:
const html = document.documentElement;
console.log(html.parentNode);     // Output: #document  (the Document node)
console.log(html.parentElement);  // Output: null  (Document is not an Element)
```

> 💡 **Use `parentElement` in general code.** It returns `null` when the parent is not a regular element — which is almost always what you want to check for.

**Chaining upward:**

```js
// Walk up three levels:
const threeUp = element.parentElement.parentElement.parentElement;
```

---

## 1.4 — Child Navigation: `childNodes` and `children`

**`childNodes`** — returns ALL child nodes: elements, text nodes, comment nodes.
**`children`** — returns ONLY child **elements** (no text nodes, no comments).

```html
<ul id="list">
  <li>Apple</li>
  <li>Banana</li>
  <li>Cherry</li>
</ul>
```

```js
const list = document.getElementById("list");

console.log(list.childNodes);
// Output: NodeList(7) [text, li, text, li, text, li, text]
// The 'text' nodes are the whitespace and newlines between tags!

console.log(list.children);
// Output: HTMLCollection(3) [li, li, li]
// Only the <li> elements — clean and predictable
```

> ⚠️ **`childNodes` includes whitespace text nodes.** If your HTML has indentation and line breaks between tags, `childNodes` will have many `#text` nodes. This trips up beginners constantly. Unless you specifically need text nodes, **always use `children`** for element access.

---

## 1.5 — First and Last Child

```js
const list = document.getElementById("list");

// With text nodes included:
console.log(list.firstChild);   // Likely a #text (whitespace before first <li>)
console.log(list.lastChild);    // Likely a #text (whitespace after last <li>)

// Element-only (skip text nodes):
console.log(list.firstElementChild);  // Output: <li>Apple</li>
console.log(list.lastElementChild);   // Output: <li>Cherry</li>
```

| Property | What it returns |
|---|---|
| `firstChild` | First child of any node type |
| `lastChild` | Last child of any node type |
| `firstElementChild` | First child that is an Element |
| `lastElementChild` | Last child that is an Element |

> ✅ **Always prefer `firstElementChild` / `lastElementChild`** over `firstChild` / `lastChild` unless you specifically need text or comment nodes.

---

## 1.6 — Sibling Navigation

```html
<div>
  <p id="first">First</p>
  <p id="second">Second</p>
  <p id="third">Third</p>
</div>
```

```js
const second = document.getElementById("second");

// Including text nodes:
console.log(second.previousSibling);  // Probably a #text node (whitespace)
console.log(second.nextSibling);      // Probably a #text node (whitespace)

// Elements only:
console.log(second.previousElementSibling);  // Output: <p id="first">First</p>
console.log(second.nextElementSibling);       // Output: <p id="third">Third</p>

// At the boundaries:
const first = document.getElementById("first");
console.log(first.previousElementSibling);  // Output: null  (no element before it)

const third = document.getElementById("third");
console.log(third.nextElementSibling);      // Output: null  (no element after it)
```

---

## 1.7 — The Complete Navigation Property Map

```
                   parentNode / parentElement
                          ▲
                          │
previousElementSibling ◄──┤──► nextElementSibling
                          │
                    [current node]
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
        firstElementChild            lastElementChild
              │     children[0..n]   │
              └─────────────────────►┘
```

| Property | Returns | Includes text/comment nodes? |
|---|---|---|
| `parentNode` | Parent (any type) | — |
| `parentElement` | Parent element | — |
| `childNodes` | All children | ✅ Yes |
| `children` | Element children | ❌ No |
| `firstChild` | First child (any type) | ✅ Yes |
| `lastChild` | Last child (any type) | ✅ Yes |
| `firstElementChild` | First child element | ❌ No |
| `lastElementChild` | Last child element | ❌ No |
| `previousSibling` | Sibling before (any type) | ✅ Yes |
| `nextSibling` | Sibling after (any type) | ✅ Yes |
| `previousElementSibling` | Sibling element before | ❌ No |
| `nextElementSibling` | Sibling element after | ❌ No |
| `childElementCount` | Number of child elements | — |

---

## 1.8 — Practical Navigation: Walking Up to a Specific Ancestor

A common real-world task: find the closest ancestor of a given type. Modern JavaScript provides `.closest()` for this:

```js
// Given a button deep inside a table cell, find the row:
const btn = document.querySelector(".delete-btn");
const row = btn.closest("tr");   // Walk up until a <tr> is found
row.remove();                    // Delete the entire row
```

But you can also walk manually:

```js
function findAncestor(element, tagName) {
  let current = element.parentElement;
  while (current !== null) {
    if (current.tagName.toLowerCase() === tagName.toLowerCase()) {
      return current;
    }
    current = current.parentElement;
  }
  return null;   // Reached the top without finding it
}
```

> 🤔 **Thinking question:** What happens if you call `findAncestor` and the element has no ancestor with the given tag? Trace through the `while` loop — what does `current` become when you go above `<html>`?

---

## 1.9 — `childElementCount` — How Many Children?

```js
const list = document.getElementById("list");
console.log(list.childElementCount);   // Output: 3  (three <li> elements)

// Equivalent to (but faster than):
console.log(list.children.length);     // Output: 3
```

---

---

# CHAPTER 2 — DOM NODES

---

## What Are DOM Nodes?

Everything in an HTML document — every tag, every piece of text, every comment, every attribute — is represented as a **Node** in the DOM tree. Understanding the different node types and how to create, insert, move, and remove them is the foundation of all dynamic web development.

---

## 2.1 — Node Types

Every node has a `nodeType` property — a number identifying what kind of node it is:

| Constant | Value | What it represents | Example |
|---|---|---|---|
| `Node.ELEMENT_NODE` | 1 | An HTML element | `<div>`, `<p>`, `<img>` |
| `Node.ATTRIBUTE_NODE` | 2 | An attribute | `id="box"` |
| `Node.TEXT_NODE` | 3 | Text content | `"Hello World"` |
| `Node.COMMENT_NODE` | 8 | An HTML comment | `<!-- comment -->` |
| `Node.DOCUMENT_NODE` | 9 | The document itself | `document` |
| `Node.DOCUMENT_TYPE_NODE` | 10 | The doctype declaration | `<!DOCTYPE html>` |
| `Node.DOCUMENT_FRAGMENT_NODE` | 11 | A document fragment | `DocumentFragment` |

```js
console.log(document.nodeType);                          // Output: 9  (DOCUMENT_NODE)
console.log(document.body.nodeType);                     // Output: 1  (ELEMENT_NODE)
console.log(document.body.firstChild.nodeType);          // Output: 3  (TEXT_NODE — whitespace)
console.log(document.doctype.nodeType);                  // Output: 10 (DOCUMENT_TYPE_NODE)
```

**Checking node type in practice:**

```js
function processNode(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    console.log("Element:", node.tagName);
  } else if (node.nodeType === Node.TEXT_NODE) {
    console.log("Text:", node.nodeValue.trim() || "(whitespace)");
  } else if (node.nodeType === Node.COMMENT_NODE) {
    console.log("Comment:", node.nodeValue);
  }
}
```

---

## 2.2 — Node Properties: `nodeName` and `nodeValue`

| Node Type | `nodeName` | `nodeValue` |
|---|---|---|
| Element | Tag name (e.g., `"DIV"`, `"P"`) | `null` |
| Text | `"#text"` | The text content |
| Comment | `"#comment"` | The comment text |
| Document | `"#document"` | `null` |
| Attribute | Attribute name | Attribute value |

```js
const div   = document.createElement("div");
const text  = document.createTextNode("Hello");
const comment = document.createComment("This is a comment");

console.log(div.nodeName);     // Output: DIV
console.log(div.nodeValue);    // Output: null

console.log(text.nodeName);    // Output: #text
console.log(text.nodeValue);   // Output: Hello

console.log(comment.nodeName);  // Output: #comment
console.log(comment.nodeValue); // Output: This is a comment
```

---

## 2.3 — Creating New Nodes

JavaScript provides factory methods on the `document` object to create new nodes:

**`document.createElement(tagName)`** — create an element node:

```js
const div  = document.createElement("div");
const para = document.createElement("p");
const btn  = document.createElement("button");

div.id        = "container";
para.className = "description";
btn.textContent = "Click me";
```

**`document.createTextNode(text)`** — create a text node:

```js
const text = document.createTextNode("This is plain text.");
// Note: text nodes have no innerHTML, no class, no id — just text
```

**`document.createComment(text)`** — create a comment node:

```js
const comment = document.createComment("Added by script on " + new Date().toLocaleDateString());
```

**`document.createDocumentFragment()`** — create a fragment (batch container):

```js
const fragment = document.createDocumentFragment();
// Explained in detail in section 2.7
```

---

## 2.4 — Inserting Nodes: `appendChild()` and `insertBefore()`

**`appendChild(newNode)`** — append as the LAST child:

```js
const list = document.getElementById("my-list");
const item = document.createElement("li");
item.textContent = "New item";

list.appendChild(item);   // Adds to the end of the list
```

**`insertBefore(newNode, referenceNode)`** — insert BEFORE a specific existing child:

```js
const list      = document.getElementById("my-list");
const newItem   = document.createElement("li");
const firstItem = list.firstElementChild;

newItem.textContent = "I'm first now!";
list.insertBefore(newItem, firstItem);   // Insert before the first item
```

**`insertBefore` with `null` as reference — appends to end:**

```js
list.insertBefore(newItem, null);  // Same as appendChild(newItem)
```

---

## 2.5 — Modern Insertion Methods (ES6+)

These methods offer cleaner syntax for common insertion patterns:

```js
const parent = document.getElementById("container");
const child  = document.getElementById("existing-child");
const newEl  = document.createElement("div");
newEl.textContent = "New element";

// Insert at start of parent:
parent.prepend(newEl);

// Insert at end of parent:
parent.append(newEl);

// Insert immediately before a node (on the node itself, not the parent):
child.before(newEl);

// Insert immediately after a node:
child.after(newEl);

// Replace a node with another:
child.replaceWith(newEl);
```

**Accepting strings (not just nodes):**

```js
// append() and prepend() can also accept plain strings — creates text nodes automatically:
parent.append("Some text", newEl, " more text");
```

| Method | Where it inserts | Called on |
|---|---|---|
| `appendChild(node)` | End of children | Parent |
| `insertBefore(node, ref)` | Before `ref` child | Parent |
| `prepend(node/string)` | Start of children | Parent |
| `append(node/string)` | End of children | Parent |
| `before(node/string)` | Before this element | The element itself |
| `after(node/string)` | After this element | The element itself |
| `replaceWith(node/string)` | Replaces this element | The element itself |

---

## 2.6 — Removing Nodes: `removeChild()` and `remove()`

**`remove()`** — remove an element directly (modern, clean):

```js
const elem = document.getElementById("old-banner");
elem.remove();   // Gone from the DOM
```

**`removeChild(child)`** — remove via the parent (older approach):

```js
const parent = document.getElementById("container");
const child  = document.getElementById("old-item");
parent.removeChild(child);
```

**Remove all children of an element:**

```js
// Method 1 — while loop (safe, handles live collections):
const list = document.getElementById("my-list");
while (list.firstChild) {
  list.removeChild(list.firstChild);
}

// Method 2 — innerHTML (faster but loses event listeners):
list.innerHTML = "";

// Method 3 — replaceChildren() (modern, clean):
list.replaceChildren();
```

> ⚠️ **`innerHTML = ""` destroys event listeners.** If you attached click handlers to the children, clearing `innerHTML` removes those listeners permanently — and can cause memory leaks if references to the old elements are held elsewhere. Use `removeChild` in a loop when you need to preserve listener cleanup.

---

## 2.7 — Replacing Nodes: `replaceChild()`

```js
const parent  = document.getElementById("container");
const oldNode = document.getElementById("old-heading");
const newNode = document.createElement("h2");
newNode.textContent = "New Heading";

parent.replaceChild(newNode, oldNode);
// oldNode is replaced by newNode in the DOM
```

---

## 2.8 — Moving Nodes

A crucial insight: inserting a node that already exists in the DOM **moves** it — it does not copy it:

```js
const footer = document.getElementById("footer");
const header = document.getElementById("header");
const logo   = document.getElementById("logo");

// Move the logo from footer to header:
header.appendChild(logo);   // logo is removed from footer and added to header

// The DOM now has logo ONLY in header — it was moved, not copied
```

To copy instead of move, use `cloneNode()`:

```js
const original = document.getElementById("card-template");

// Shallow clone (element only, no children):
const shallow = original.cloneNode(false);

// Deep clone (element AND all its descendants):
const deep = original.cloneNode(true);

document.getElementById("gallery").appendChild(deep);
// The original stays where it is; a copy goes into gallery
```

---

## 2.9 — `DocumentFragment` — Batch Insertions for Performance

When building many nodes and inserting them into the DOM, inserting one at a time causes the browser to **re-render repeatedly** — once per insertion. A `DocumentFragment` is an off-screen container: build everything inside it first, then insert the whole thing in one operation — one render.

```js
// ❌ Slow — 100 separate DOM insertions (100 reflows):
const list = document.getElementById("product-list");
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = "Product " + (i + 1);
  list.appendChild(li);   // Browser may reflow here
}

// ✅ Fast — 1 DOM insertion (1 reflow):
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = "Product " + (i + 1);
  fragment.appendChild(li);   // Off-screen — no browser work
}
list.appendChild(fragment);   // ONE insertion — one reflow
```

After `appendChild(fragment)`, the fragment itself is empty — its children moved to `list`. The fragment is now reusable.

---

## 2.10 — `textContent` vs `innerHTML` vs `innerText`

| Property | What it reads/writes | HTML tags? | Hidden elements? |
|---|---|---|---|
| `textContent` | Raw text of element and all descendants | ❌ Stripped | ✅ Included |
| `innerHTML` | Full HTML markup of children | ✅ Parsed/rendered | ✅ Included |
| `innerText` | Visible text only (respects CSS) | ❌ Stripped | ❌ Excluded |

```html
<p id="demo">Hello <strong>World</strong> <span style="display:none">Hidden</span></p>
```

```js
const p = document.getElementById("demo");

console.log(p.textContent);
// Output: "Hello World Hidden"  ← all text, including hidden

console.log(p.innerHTML);
// Output: "Hello <strong>World</strong> <span style=\"display:none\">Hidden</span>"

console.log(p.innerText);
// Output: "Hello World"  ← only visible text (Hidden is display:none)
```

> ⚠️ **Never use `innerHTML` to insert untrusted user input.** Setting `element.innerHTML = userInput` where `userInput` contains `<script>` tags or `onerror` attributes is a **Cross-Site Scripting (XSS) vulnerability**. Use `textContent` for text, or sanitise before using `innerHTML`.

---

## 2.11 — `contains()` and `isEqualNode()`

```js
const container = document.getElementById("container");
const child     = document.getElementById("child");

// Check if container contains child anywhere in its subtree:
console.log(container.contains(child));   // Output: true
console.log(container.contains(container)); // Output: true  (a node contains itself)

// Check if two nodes have identical structure and content:
const div1 = document.createElement("div");
const div2 = document.createElement("div");
div1.textContent = "Hello";
div2.textContent = "Hello";

console.log(div1.isEqualNode(div2));  // Output: true  (same structure and text)
console.log(div1 === div2);           // Output: false  (different objects in memory)
```

---

---

# CHAPTER 3 — HTML COLLECTIONS

---

## What Is an HTMLCollection?

An **`HTMLCollection`** is a live, ordered list of element nodes. "Live" means it updates automatically when the DOM changes — if you add or remove matching elements, the collection reflects that immediately without requiring a new query.

HTMLCollections are returned by:
- `element.children` — all element children
- `document.getElementsByTagName(tag)` — elements by tag name
- `document.getElementsByClassName(cls)` — elements by class name
- `document.forms` — all form elements
- `document.images` — all image elements
- `document.links` — all anchor/area elements
- `document.scripts` — all script elements

---

## 3.1 — Accessing HTMLCollection Items

```html
<ul id="list">
  <li id="a">Apple</li>
  <li id="b">Banana</li>
  <li id="c">Cherry</li>
</ul>
```

```js
const list  = document.getElementById("list");
const items = list.children;   // HTMLCollection

console.log(items.length);        // Output: 3

// By index:
console.log(items[0].textContent);  // Output: Apple
console.log(items[1].textContent);  // Output: Banana

// By id (HTMLCollection-specific):
console.log(items.namedItem("b").textContent);  // Output: Banana
// Equivalent to items["b"] for named items:
console.log(items["c"].textContent);            // Output: Cherry
```

---

## 3.2 — "Live" Collections — The Critical Behaviour

```js
const list  = document.getElementById("list");
const items = list.children;   // Live HTMLCollection

console.log(items.length);   // Output: 3

// Add a new item to the DOM:
const newLi = document.createElement("li");
newLi.textContent = "Date";
list.appendChild(newLi);

// The collection INSTANTLY reflects the change — no re-query needed:
console.log(items.length);   // Output: 4  ← updated automatically!
```

**This liveness is a double-edged sword:**

```js
// ❌ Dangerous loop — collection length changes as you delete:
const items = document.getElementsByTagName("li");
for (let i = 0; i < items.length; i++) {
  items[i].remove();   // After removing items[0], items[1] becomes items[0]
                       // You end up skipping every other element!
}

// ✅ Safe approach 1 — iterate backwards:
for (let i = items.length - 1; i >= 0; i--) {
  items[i].remove();
}

// ✅ Safe approach 2 — convert to a static array first:
Array.from(items).forEach(item => item.remove());
```

> ⚠️ **The live collection loop bug is one of the most common DOM mistakes.** When removing from a live collection in a forward loop, you will always skip every other element. Iterating backwards or converting to an array first are the two safe solutions.

---

## 3.3 — Iterating an HTMLCollection

`HTMLCollection` is **array-like but NOT a real array**. It has `.length` and index access, but no `.forEach()`, `.map()`, `.filter()`, etc.

```js
const items = document.getElementById("list").children;

// ❌ Does not work:
// items.forEach(item => ...)   // TypeError: items.forEach is not a function

// ✅ Method 1 — classic for loop (always works):
for (let i = 0; i < items.length; i++) {
  console.log(items[i].textContent);
}

// ✅ Method 2 — for...of (works with HTMLCollection):
for (const item of items) {
  console.log(item.textContent);
}

// ✅ Method 3 — convert to array, then use all array methods:
const arr = Array.from(items);
arr.forEach(item => console.log(item.textContent));

const texts = arr.map(item => item.textContent);
const long  = arr.filter(item => item.textContent.length > 5);
```

---

## 3.4 — `document.getElementsByTagName()` Returns an HTMLCollection

```js
const allDivs  = document.getElementsByTagName("div");
const allParas = document.getElementsByTagName("p");
const allElems = document.getElementsByTagName("*");   // Every element

console.log(allDivs.length);   // Count of divs on the page

// Access by index:
console.log(allDivs[0].id);

// It's live — adding a div to the DOM increases allDivs.length immediately
```

---

## 3.5 — `document.getElementsByClassName()` Returns an HTMLCollection

```js
const cards = document.getElementsByClassName("card");

// Also search within a specific container:
const container = document.getElementById("gallery");
const photos    = container.getElementsByClassName("photo");
```

---

## 3.6 — Special HTMLCollections on `document`

```js
// All <form> elements:
console.log(document.forms.length);
console.log(document.forms[0]);            // First form
console.log(document.forms["login-form"]); // By name attribute

// All <img> elements:
console.log(document.images.length);
document.images[0].src = "new-image.jpg";

// All <a> elements with href (and <area> elements):
console.log(document.links.length);

// All <script> elements:
console.log(document.scripts.length);
```

---

## 3.7 — HTMLCollection vs querySelectorAll — Key Comparison

| Feature | `HTMLCollection` | `NodeList` from `querySelectorAll` |
|---|---|---|
| Live / Static? | **Live** (updates automatically) | **Static** (snapshot at query time) |
| Contains | Elements only | Any node type |
| Index access | ✅ `[0]` | ✅ `[0]` |
| `namedItem()` | ✅ Yes | ❌ No |
| `forEach()` | ❌ No | ✅ Yes |
| `map()`, `filter()` | ❌ No | ❌ No (use `Array.from` first) |
| Returned by | `children`, `getElementsBy*` | `querySelectorAll`, `childNodes` |

---

---

# CHAPTER 4 — NODELISTS

---

## What Is a NodeList?

A **`NodeList`** is an ordered collection of nodes — similar to an `HTMLCollection`, but with key differences. NodeLists can contain any node type (elements, text nodes, comments), and come in two flavours: **live** and **static**.

NodeLists are returned by:
- `element.childNodes` — **live** NodeList of all children
- `document.querySelectorAll()` — **static** NodeList of matching elements
- `document.getElementsByName()` — **live** NodeList by name attribute

---

## 4.1 — Static NodeList from `querySelectorAll()`

`querySelectorAll()` returns a **static snapshot** — it captures matching elements at the moment of the query and never changes after that:

```js
const items = document.querySelectorAll("li");

console.log(items.length);   // Output: 3  (say there are 3 at query time)

// Add a new li to the DOM:
const newLi = document.createElement("li");
newLi.textContent = "Date";
document.getElementById("list").appendChild(newLi);

// Static — does NOT update:
console.log(items.length);   // Output: 3  ← still 3! Not 4.
```

This is the **opposite** of `HTMLCollection`. Static snapshots are safer for loops but require a new query if you want fresh results.

---

## 4.2 — Live NodeList from `childNodes`

`element.childNodes` returns a **live** NodeList that includes ALL child node types:

```js
const list  = document.getElementById("list");
const nodes = list.childNodes;   // Live NodeList — includes text nodes!

console.log(nodes.length);   // e.g., 7 (3 <li> + 4 text/whitespace nodes)

// Add a new child:
const newLi = document.createElement("li");
list.appendChild(newLi);

console.log(nodes.length);   // e.g., 8 — live update!
```

---

## 4.3 — Accessing NodeList Items

```js
const items = document.querySelectorAll(".product");

// By index:
console.log(items[0]);
console.log(items.item(0));   // Equivalent — .item() method

// Length:
console.log(items.length);

// Check if empty:
if (items.length === 0) {
  console.log("No products found");
}
```

---

## 4.4 — Iterating a NodeList

NodeList from `querySelectorAll` has `forEach()` built in (unlike HTMLCollection):

```js
const paragraphs = document.querySelectorAll("p");

// forEach works directly on NodeList:
paragraphs.forEach(function(para) {
  para.style.color = "blue";
});

// for...of also works:
for (const para of paragraphs) {
  console.log(para.textContent);
}

// Classic for loop (always safe):
for (let i = 0; i < paragraphs.length; i++) {
  paragraphs[i].classList.add("highlighted");
}

// Convert to array for full array method access:
const arr      = Array.from(paragraphs);
const longOnes = arr.filter(p => p.textContent.length > 50);
const texts    = arr.map(p => p.textContent);
```

> ⚠️ **NodeList does NOT have `.map()`, `.filter()`, `.reduce()` etc.** Only `forEach()`, `keys()`, `values()`, `entries()` are built in. Convert with `Array.from()` or `[...nodeList]` for full array power.

---

## 4.5 — Iterating `childNodes` Safely

Since `childNodes` is live and includes text nodes:

```js
const list = document.getElementById("list");

// Filter to only element nodes while iterating:
list.childNodes.forEach(function(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    console.log("Element:", node.tagName, node.textContent);
  } else if (node.nodeType === Node.TEXT_NODE) {
    const trimmed = node.nodeValue.trim();
    if (trimmed) console.log("Text:", trimmed);
  }
});
```

---

## 4.6 — NodeList Keys, Values, and Entries

```js
const items = document.querySelectorAll("li");

// keys() — iterates over indices:
for (const index of items.keys()) {
  console.log(index);   // Output: 0, 1, 2
}

// values() — iterates over nodes:
for (const node of items.values()) {
  console.log(node.textContent);
}

// entries() — iterates over [index, node] pairs:
for (const [index, node] of items.entries()) {
  console.log(`${index}: ${node.textContent}`);
}
```

---

## 4.7 — Live vs Static — When Does It Matter?

```js
// Scenario: You query a list, then add items, then query again.

const listEl = document.getElementById("list");

// Live reference — reflects current state:
const live = listEl.children;   // HTMLCollection

// Static snapshot — frozen at query time:
const snap = listEl.querySelectorAll("li");   // NodeList

console.log(live.length, snap.length);   // Both: 3

listEl.appendChild(document.createElement("li"));

console.log(live.length);  // Output: 4  ← updated automatically
console.log(snap.length);  // Output: 3  ← frozen at query time
```

**Decision guide:**

| Situation | Use |
|---|---|
| Need to reflect future DOM changes automatically | Live: `children`, `getElementsBy*` |
| Need a safe snapshot to iterate without mutations affecting the loop | Static: `querySelectorAll()` |
| Removing/adding while iterating | Static: convert to `Array.from()` |
| Performance-critical, repeatedly accessed list | Static: cache with `querySelectorAll()` |
| Watching form inputs as they're added | Live: `document.forms` or `children` |

---

## 4.8 — Spread and Destructuring with NodeLists and HTMLCollections

Both can be spread into arrays using the spread operator:

```js
const items = document.querySelectorAll("li");

// Spread into array:
const arr   = [...items];

// Destructure:
const [first, second, ...rest] = document.querySelectorAll("li");
console.log(first.textContent);   // Output: first list item's text
console.log(rest.length);         // Remaining items

// Use in a function that expects an array:
function processAll(elements) {
  return elements.map(el => el.textContent.toUpperCase());
}
processAll([...items]);
```

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — DOM Navigation: Build a Breadcrumb Trail

**Objective:** Given a deeply nested element, generate a breadcrumb trail by walking up the DOM using `parentElement`.

**Scenario:** A documentation website. When a user clicks any heading, a breadcrumb appears at the top showing the path: `Document > section.content > article > h2`.

**Warm-up mini-example:**

```js
// Walk up the tree and collect tag names:
function getAncestors(element) {
  const path = [];
  let current = element;
  while (current && current !== document.body) {
    path.unshift(current.tagName.toLowerCase());
    current = current.parentElement;
  }
  return path;
}

const h2 = document.querySelector("h2");
console.log(getAncestors(h2));
// e.g., Output: ['section', 'article', 'h2']
```

**Step-by-step instructions:**

1. Create an HTML page with at least 3 levels of nesting (e.g., `body > div.wrapper > section > article > h2`).
2. Write `buildBreadcrumb(element)` that starts at `element`, walks up with `parentElement`, and builds an array of `{ tag, id, className }` objects for each ancestor.
3. Write `renderBreadcrumb(path)` that creates a `<nav>` with `<span>` separators between each step.
4. Attach a `click` event to each heading that triggers both functions and updates a `<div id="breadcrumb">` at the top.

**Self-check questions:**
1. When does `parentElement` return `null` — what node are you at when that happens?
2. Why use `unshift()` instead of `push()` when building the ancestor path?

---

## Exercise 2 — DOM Nodes: Dynamic Comment Thread Builder

**Objective:** Build a live comment thread where each comment is built from scratch using `createElement`, `createTextNode`, `appendChild`, and `DocumentFragment`.

**Scenario:** A blog post comment section. Users can add comments and reply to existing ones.

**Warm-up mini-example:**

```js
function createComment(author, text) {
  const article = document.createElement("article");
  article.className = "comment";

  const strong = document.createElement("strong");
  strong.textContent = author;

  const p = document.createElement("p");
  p.textContent = text;

  article.appendChild(strong);
  article.appendChild(p);
  return article;
}
```

**Step-by-step instructions:**

1. Write `createCommentNode(author, text, timestamp)` that builds a comment `<article>` with three children: a `<header>` containing the author name and formatted timestamp, a `<p>` for the text, and a `<button>` labelled "Reply".
2. Write `addComments(commentsData)` that uses `DocumentFragment` to batch-insert an array of comment objects at once.
3. Attach a delegated click listener to the comments container that detects "Reply" button clicks.
4. When "Reply" is clicked, use `after()` on the clicked comment's `<article>` to insert a new reply comment node immediately after it.
5. Write `removeComment(btn)` that walks up from a delete button to the `.comment` article using `closest()`, then calls `.remove()`.

**Self-check questions:**
1. Why use `DocumentFragment` when loading initial comments instead of appending each one individually?
2. What is the risk of using `innerHTML` to render user-entered comment text? What do you use instead?

---

## Exercise 3 — HTMLCollection: Live DOM Monitoring Dashboard

**Objective:** Use the live nature of HTMLCollection to build a real-time element counter.

**Scenario:** A developer dashboard showing how many of each element type exist on the page, updating live as elements are added or removed.

**Warm-up mini-example:**

```js
// HTMLCollection stays live — always reflects current state:
const divs = document.getElementsByTagName("div");

setInterval(() => {
  console.log("Current div count:", divs.length);
}, 1000);

// Any div added or removed will update the count automatically.
```

**Step-by-step instructions:**

1. Create an HTML page with buttons to add and remove `<div>`, `<p>`, and `<span>` elements from a container.
2. Set up live HTMLCollections for each tag type using `getElementsByTagName`.
3. Create a `<table id="monitor">` with one row per element type.
4. On every button click, update the count cells by reading `.length` from the live collections — no re-querying needed.
5. Add a `setInterval` that logs the counts every second to confirm liveness.

**Self-check questions:**
1. If you used `querySelectorAll("div")` instead of `getElementsByTagName("div")`, would the count update? Why?
2. The dangerous loop bug: write an example that demonstrates the bug, then fix it using the two safe approaches from Section 3.2.

---

## Exercise 4 — NodeList: Batch DOM Manipulation with querySelectorAll

**Objective:** Use static NodeLists and their `forEach` / array conversion capabilities to batch-modify elements.

**Scenario:** A content management tool that applies formatting, filtering, and transformation to selected content blocks.

**Step-by-step instructions:**

1. Create a page with 10 `<article>` elements, each with a `data-category` attribute (`"tech"`, `"sport"`, or `"science"`), a title `<h3>`, and a body `<p>`.
2. Write `filterByCategory(cat)` using `querySelectorAll` that shows only articles of the given category (sets `display:none` on others).
3. Write `highlightMatches(keyword)` that uses `querySelectorAll("article p")` and wraps matching text in a `<mark>` tag. Use `innerHTML` only on a per-element basis after stripping existing marks.
4. Write `getStats()` that uses `querySelectorAll` with multiple selectors and returns `{ total, byCategory }`.
5. Compare performance: run `querySelectorAll` vs `getElementsByTagName` 10,000 times in a loop and log timing.

**Self-check questions:**
1. Why is the NodeList from `querySelectorAll` safer for the category filter loop than an HTMLCollection?
2. What does `querySelectorAll("article p, article h3")` return, and in what order?

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Interactive Kanban Board — Built Entirely with DOM APIs

**Scenario:** You are building a lightweight Kanban board (like Trello) where cards can be added to columns, moved between columns, and deleted — entirely using DOM navigation, node creation, HTMLCollections, and NodeLists. No frameworks. No libraries. Pure DOM.

This project uses every concept from all four chapters:
- Navigation (Ch.1): `parentElement`, `children`, `nextElementSibling`, `closest()`
- Nodes (Ch.2): `createElement`, `createDocumentFragment`, `appendChild`, `remove`, `cloneNode`, `textContent`
- HTMLCollections (Ch.3): `children`, live collection awareness, named item access
- NodeLists (Ch.4): `querySelectorAll`, `forEach`, `Array.from`, static vs live awareness

---

### Stage 1 — Board Structure and Column Creation

```html
<!-- Static HTML structure: -->
<div id="board">
  <div class="column" id="col-todo"       data-status="todo">
    <h2 class="col-title">To Do</h2>
    <div class="card-list"></div>
    <button class="add-card-btn">+ Add Card</button>
  </div>
  <div class="column" id="col-in-progress" data-status="in-progress">
    <h2 class="col-title">In Progress</h2>
    <div class="card-list"></div>
    <button class="add-card-btn">+ Add Card</button>
  </div>
  <div class="column" id="col-done"       data-status="done">
    <h2 class="col-title">Done</h2>
    <div class="card-list"></div>
    <button class="add-card-btn">+ Add Card</button>
  </div>
</div>
<div id="card-counts"></div>
```

```js
// --- Card data model ---
const cards = [
  { id: "c1", title: "Design wireframes",   priority: "high",   status: "todo"        },
  { id: "c2", title: "Write API spec",       priority: "medium", status: "todo"        },
  { id: "c3", title: "Set up CI/CD",         priority: "high",   status: "in-progress" },
  { id: "c4", title: "Unit test auth module",priority: "low",    status: "in-progress" },
  { id: "c5", title: "Deploy to staging",    priority: "high",   status: "done"        },
];

// --- Create a single card DOM node ---
function createCardNode(card) {
  const article = document.createElement("article");
  article.className = "card priority-" + card.priority;
  article.dataset.cardId = card.id;
  article.dataset.status = card.status;

  // Title
  const titleEl = document.createElement("h3");
  titleEl.className = "card-title";
  titleEl.textContent = card.title;    // textContent — safe, no XSS

  // Priority badge
  const badge = document.createElement("span");
  badge.className = "badge badge-" + card.priority;
  badge.textContent = card.priority.toUpperCase();

  // Action buttons
  const actions = document.createElement("div");
  actions.className = "card-actions";

  const moveLeft  = document.createElement("button");
  moveLeft.className   = "btn-move btn-left";
  moveLeft.textContent = "◀";
  moveLeft.title       = "Move left";

  const moveRight = document.createElement("button");
  moveRight.className   = "btn-move btn-right";
  moveRight.textContent = "▶";
  moveRight.title       = "Move right";

  const deleteBtn = document.createElement("button");
  deleteBtn.className   = "btn-delete";
  deleteBtn.textContent = "✕";
  deleteBtn.title       = "Delete card";

  actions.append(moveLeft, moveRight, deleteBtn);
  article.append(titleEl, badge, actions);

  return article;
}
```

---

### Stage 2 — Batch Loading with DocumentFragment

```js
// Load all cards using DocumentFragment — one DOM insertion per column:
function loadInitialCards(cards) {
  const fragments = {
    "todo":        document.createDocumentFragment(),
    "in-progress": document.createDocumentFragment(),
    "done":        document.createDocumentFragment(),
  };

  cards.forEach(card => {
    fragments[card.status].appendChild(createCardNode(card));
  });

  // Insert each fragment in one operation per column:
  Object.entries(fragments).forEach(([status, fragment]) => {
    const col = document.querySelector(`[data-status="${status}"] .card-list`);
    col.appendChild(fragment);
  });

  updateCounts();
}

loadInitialCards(cards);
```

---

### Stage 3 — Event Delegation for All Card Actions

```js
// One listener on the board handles ALL card interactions:
document.getElementById("board").addEventListener("click", function(event) {
  const btn = event.target;

  // --- Delete card ---
  if (btn.classList.contains("btn-delete")) {
    const card = btn.closest(".card");
    card.remove();
    updateCounts();
    return;
  }

  // --- Move card left ---
  if (btn.classList.contains("btn-left")) {
    const card      = btn.closest(".card");
    const curList   = card.closest(".card-list");
    const curCol    = curList.closest(".column");
    const prevCol   = curCol.previousElementSibling;  // Navigate to sibling column

    if (prevCol) {
      const targetList = prevCol.querySelector(".card-list");
      targetList.appendChild(card);   // Move (not copy) card to previous column
      card.dataset.status = prevCol.dataset.status;
      updateCounts();
    }
    return;
  }

  // --- Move card right ---
  if (btn.classList.contains("btn-right")) {
    const card      = btn.closest(".card");
    const curList   = card.closest(".card-list");
    const curCol    = curList.closest(".column");
    const nextCol   = curCol.nextElementSibling;   // Navigate to next sibling

    if (nextCol) {
      const targetList = nextCol.querySelector(".card-list");
      targetList.appendChild(card);
      card.dataset.status = nextCol.dataset.status;
      updateCounts();
    }
    return;
  }

  // --- Add new card button ---
  if (btn.classList.contains("add-card-btn")) {
    const col = btn.closest(".column");
    showAddCardForm(col);
    return;
  }
});
```

---

### Stage 4 — Live Counts with HTMLCollection Awareness

```js
function updateCounts() {
  const columns = document.getElementById("board").children;
  // 'columns' is a live HTMLCollection — always reflects current DOM state

  const countContainer = document.getElementById("card-counts");
  countContainer.innerHTML = "";   // Clear existing counts

  // Iterate the live collection:
  for (const col of columns) {
    const cardList   = col.querySelector(".card-list");
    const cardCount  = cardList.children.length;   // Live children count
    const status     = col.dataset.status;
    const title      = col.querySelector(".col-title").textContent;

    const span = document.createElement("span");
    span.className   = "count-badge";
    span.textContent = `${title}: ${cardCount}`;
    span.style.background = cardCount === 0 ? "#eee" : "#4CAF50";
    countContainer.appendChild(span);
  }
}
```

---

### Stage 5 — Add Card Form and Inline Insertion

```js
function showAddCardForm(column) {
  // Remove any existing open form first:
  const existing = document.querySelector(".add-card-form");
  if (existing) existing.remove();

  const form = document.createElement("form");
  form.className = "add-card-form";

  const input = document.createElement("input");
  input.type        = "text";
  input.placeholder = "Card title...";
  input.required    = true;

  const select = document.createElement("select");
  ["high", "medium", "low"].forEach(priority => {
    const opt   = document.createElement("option");
    opt.value   = priority;
    opt.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    select.appendChild(opt);
  });

  const submitBtn = document.createElement("button");
  submitBtn.type        = "submit";
  submitBtn.textContent = "Add";

  const cancelBtn = document.createElement("button");
  cancelBtn.type        = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", () => form.remove());

  form.append(input, select, submitBtn, cancelBtn);

  // Insert form before the "+ Add Card" button:
  const addBtn = column.querySelector(".add-card-btn");
  column.insertBefore(form, addBtn);
  input.focus();

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title    = input.value.trim();
    const priority = select.value;
    const status   = column.dataset.status;

    if (!title) return;

    const newCard = createCardNode({
      id:       "c" + Date.now(),
      title,
      priority,
      status
    });

    const cardList = column.querySelector(".card-list");
    cardList.appendChild(newCard);
    form.remove();
    updateCounts();
  });
}
```

---

### Stage 6 — Search and Filter with querySelectorAll

```js
// Add a search input at the top of the board:
function initSearch() {
  const searchInput = document.createElement("input");
  searchInput.type        = "search";
  searchInput.placeholder = "Filter cards...";
  searchInput.id          = "card-search";

  document.body.insertBefore(searchInput, document.getElementById("board"));

  searchInput.addEventListener("input", function() {
    const query = this.value.trim().toLowerCase();

    // querySelectorAll — static snapshot (safe to iterate while hiding cards):
    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
      const title   = card.querySelector(".card-title").textContent.toLowerCase();
      const visible = !query || title.includes(query);
      card.style.display = visible ? "" : "none";
    });

    updateCounts();
  });
}

// Priority filter buttons:
function initPriorityFilter() {
  const filterBar = document.createElement("div");
  filterBar.id = "filter-bar";

  ["all", "high", "medium", "low"].forEach(priority => {
    const btn = document.createElement("button");
    btn.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    btn.dataset.filter = priority;

    btn.addEventListener("click", function() {
      // Update active button:
      document.querySelectorAll("#filter-bar button").forEach(b =>
        b.classList.toggle("active", b === btn)
      );

      // Show/hide cards:
      document.querySelectorAll(".card").forEach(card => {
        const show = priority === "all" || card.classList.contains("priority-" + priority);
        card.style.display = show ? "" : "none";
      });
    });

    filterBar.appendChild(btn);
  });

  document.body.insertBefore(filterBar, document.getElementById("board"));
  filterBar.querySelector("[data-filter='all']").classList.add("active");
}

initSearch();
initPriorityFilter();
```

---

### Stage 7 — Advanced: Column Stats Using NodeList Traversal

```js
function getColumnStats() {
  const stats = {};

  // Use querySelectorAll for a static snapshot — safe for building a report:
  const columns = document.querySelectorAll(".column");

  columns.forEach(col => {
    const status    = col.dataset.status;
    const cardNodes = col.querySelectorAll(".card");
    const high      = col.querySelectorAll(".priority-high").length;
    const medium    = col.querySelectorAll(".priority-medium").length;
    const low       = col.querySelectorAll(".priority-low").length;

    stats[status] = {
      total: cardNodes.length,
      high, medium, low,
      titles: Array.from(cardNodes).map(c => c.querySelector(".card-title").textContent)
    };
  });

  return stats;
}

function printStats() {
  const stats = getColumnStats();
  console.log("\n=== Kanban Board Stats ===");
  for (const [col, data] of Object.entries(stats)) {
    console.log(`\n${col.toUpperCase()} (${data.total} cards):`);
    console.log(`  High: ${data.high} | Medium: ${data.medium} | Low: ${data.low}`);
    console.log(`  Cards: ${data.titles.join(", ")}`);
  }
}

// Add a stats button:
const statsBtn = document.createElement("button");
statsBtn.textContent = "Print Stats";
statsBtn.addEventListener("click", printStats);
document.body.appendChild(statsBtn);
```

---

**Reflection Questions:**

1. In Stage 3, moving a card uses `column.nextElementSibling` to find the next column. What does `nextElementSibling` return for the last column's "Move Right" button? How does the `if (nextCol)` guard handle this?
2. In Stage 4, `updateCounts()` reads `cardList.children.length` using a **live** HTMLCollection. If the count were read from a cached `querySelectorAll` snapshot taken at page load, what would happen after cards are moved or deleted?
3. The `loadInitialCards` function uses one `DocumentFragment` per column. What would be the measurable difference (in DOM reflows) between this approach and appending each card directly one at a time with 5 cards per column?
4. The search filter uses `querySelectorAll(".card")` — a static snapshot — instead of a live collection. Why is a static snapshot actually *safer* here, even though the filter sets `display:none` which changes the DOM?
5. `createCardNode` uses `textContent` to set the card title. If `innerHTML` were used instead (`titleEl.innerHTML = card.title`), what security risk would arise if card titles came from user input?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What is the difference between `childNodes` and `children`?

**Q2:** Why should you almost always use `firstElementChild` rather than `firstChild`?

**Q3:** What is the difference between `remove()` and `removeChild()`?

**Q4:** What is a `DocumentFragment` and why is it better than appending elements one by one?

**Q5:** What is the difference between a **live** collection and a **static** NodeList? Give one example of each.

**Q6:** Why is it dangerous to use a forward `for` loop to remove items from a live `HTMLCollection`?

**Q7:** What does `element.closest("table")` do, and how is it different from `parentElement`?

**Q8:** `NodeList` from `querySelectorAll` has `forEach`. Does it have `map`? What do you write instead?

**Q9:** What is the difference between `cloneNode(false)` and `cloneNode(true)`?

**Q10:** Given `const items = document.querySelectorAll("li")`, what happens to `items.length` if you add a new `<li>` to the page? Why?

---

## Answer Key

**A1:** `childNodes` returns a **live NodeList** of ALL child nodes — elements, text nodes, comment nodes, and whitespace. `children` returns a **live HTMLCollection** of **element children only** (no text, no comments). In practice, always use `children` unless you specifically need text or comment nodes.

**A2:** `firstChild` returns the first child node of any type — and because HTML files typically have whitespace/newline text nodes between tags, `firstChild` almost always returns a `#text` node, not the element you want. `firstElementChild` skips text and comment nodes and returns the first real element child.

**A3:** `remove()` is called directly on the element being removed: `elem.remove()`. It's clean, modern, and needs no parent reference. `removeChild(child)` is called on the **parent**: `parent.removeChild(child)`. It's the older approach and requires you to have a reference to the parent.

**A4:** A `DocumentFragment` is an off-screen container node. You add elements to it without affecting the live DOM — no reflows happen. When you insert the fragment into the DOM, all its children move in one single operation, triggering only one reflow. Without it, each individual `appendChild` can trigger a separate reflow, making batch insertions significantly slower.

**A5:** A **live** collection automatically reflects DOM changes after it's created — examples: `element.children`, `document.getElementsByTagName("div")`. A **static** NodeList is a frozen snapshot of the DOM at the moment of the query and never updates — example: `document.querySelectorAll("div")`.

**A6:** When you call `items[i].remove()` in a forward loop, the element is removed from the live collection and all subsequent elements shift down by one index. The loop then increments `i`, but the element that was at position `i+1` is now at position `i` — it gets skipped. Result: only every other element is removed. Fix: iterate backwards, or convert to a static array first with `Array.from()`.

**A7:** `element.closest("table")` walks **up** the DOM tree from the element — checking the element itself, then its parent, then its grandparent — until it finds a `<table>` ancestor (or reaches the document root and returns `null`). `parentElement` only goes **one level up** — it returns the immediate parent. `closest` is like `parentElement` but keeps going until it finds a match.

**A8:** No — `NodeList` from `querySelectorAll` has `forEach`, `keys`, `values`, and `entries`, but not `map`, `filter`, or `reduce`. To use those, convert first: `Array.from(items).map(...)` or `[...items].filter(...)`.

**A9:** `cloneNode(false)` creates a shallow copy — only the element itself, with no children. `cloneNode(true)` creates a deep copy — the element plus all its descendant nodes. Neither version copies event listeners that were added with `addEventListener`.

**A10:** `items.length` stays the same — it does NOT update. `querySelectorAll` returns a **static** NodeList that is a snapshot at the time of the call. Adding a new `<li>` after the query does not affect `items`. To get an updated count, you must call `querySelectorAll` again.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can navigate to parent, children, and siblings using element-only properties | ✓ |
| 2 | Understand why `firstElementChild` is preferred over `firstChild` | ✓ |
| 3 | Can walk up the tree with `parentElement` and `closest()` | ✓ |
| 4 | Know all node types (element, text, comment, document, fragment) and `nodeType` values | ✓ |
| 5 | Can create elements, text nodes, and comments with `document.create*` methods | ✓ |
| 6 | Can insert nodes with `appendChild`, `insertBefore`, `prepend`, `append`, `before`, `after` | ✓ |
| 7 | Can remove nodes with `remove()` and `removeChild()` | ✓ |
| 8 | Understand that inserting an existing node moves it (and use `cloneNode` to copy) | ✓ |
| 9 | Know when and how to use `DocumentFragment` for batch insertions | ✓ |
| 10 | Understand the difference between `textContent`, `innerHTML`, and `innerText` | ✓ |
| 11 | Understand what an `HTMLCollection` is and that it is **live** | ✓ |
| 12 | Can safely iterate an HTMLCollection (avoiding the live-removal loop bug) | ✓ |
| 13 | Understand what a `NodeList` is, and the difference between live and static | ✓ |
| 14 | Can use `forEach`, `for...of`, and `Array.from()` on NodeLists | ✓ |
| 15 | Built the full Kanban board project combining all four DOM chapters | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| `firstChild` returns a text node | Whitespace between tags creates text nodes | Use `firstElementChild` |
| Forward loop removal from live collection | Removing shifts indices; every other element skipped | Loop backwards, or use `Array.from()` first |
| `innerHTML = userInput` (XSS risk) | HTML tags in user input are parsed and executed | Use `textContent` for user data |
| `innerHTML = ""` loses event listeners | Removes elements without cleanup | Use `removeChild` loop or `replaceChildren()` |
| Forgetting `cloneNode` — accidentally moving | `appendChild` moves existing nodes, not copies | Use `node.cloneNode(true)` to copy |
| Assuming `querySelectorAll` is live | It returns a static snapshot | Re-query after DOM changes if fresh results needed |
| Using `childNodes` expecting elements | Includes text/comment/whitespace nodes | Use `children` for element-only access |
| No `closest()` guard for null | If no ancestor matches, `closest()` returns null | Always null-check: `const row = btn.closest("tr"); if (row) ...` |
| `NodeList.map()` doesn't exist | NodeList isn't a real Array | Use `Array.from(list).map(...)` or `[...list].map(...)` |
| Missing `return` in `Reflect.set` trap | (irrelevant here — DOM context) | — |

---

## One-Sentence Summary

> JavaScript DOM navigation — moving through the tree with parent, child, and sibling properties — combined with the ability to create, insert, move, and remove nodes, and to work with live HTMLCollections and static NodeLists, gives you complete programmatic control over every element on a web page at runtime.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript DOM (4 pages)*
