---
title: "JavaScript Events: Introduction to Events · Mouse Events · Keyboard Events · Load Events · Timing Events · Event Management · DOM Events · EventListener API"
nav_order: 29
---

## Table of Contents
1. [What Are JavaScript Events?](#1-what-are-javascript-events)
2. [Mouse Events](#2-mouse-events)
3. [Keyboard Events](#3-keyboard-events)
4. [Load Events](#4-load-events)
5. [Timing Events](#5-timing-events)
6. [Event Management — The Event Object](#6-event-management--the-event-object)
7. [HTML DOM Events — Inline & Property Handlers](#7-html-dom-events--inline--property-handlers)
8. [addEventListener — The Professional Way](#8-addeventlistener--the-professional-way)
9. [Applied Exercises](#9-applied-exercises)
10. [Project Simulation: Interactive Quiz App](#10-project-simulation-interactive-quiz-app)
11. [Completion Checklist & Summary](#11-completion-checklist--summary)

---

# PHASE 1 — CONCEPTUAL UNDERSTANDING

## 1. What Are JavaScript Events?

### The Core Idea

A webpage by itself is static — it just sits there. **Events** are what make it come alive.

An **event** is something that happens in the browser. It could be triggered by:
- **The user** — clicking, typing, scrolling, hovering
- **The browser itself** — finishing loading a page, losing internet connection
- **Time passing** — a countdown reaching zero, a slideshow advancing

When an event occurs, JavaScript can **listen** for it and **respond** by running a function. That function is called an **event handler** or **event listener**.

> **Real-world analogy:** Think of a doorbell. The doorbell button is the element. Pressing it is the event. The chime sound is the handler (the response). You wired up the doorbell — that is registering a listener.

---

### The Three-Part Event Model

Every event interaction has three parts:

```
[ Element ] ──fires──► [ Event ] ──triggers──► [ Handler Function ]

   <button>              "click"              function showAlert() { ... }
   <input>               "keydown"            function checkInput() { ... }
   window                "load"               function initPage() { ... }
```

---

### A First Event — Three Ways Side by Side

Before going deep, see the same result achieved three different ways. We cover each way fully in sections 7 and 8.

```html
<!-- WAY 1: Inline HTML attribute (old style) -->
<button onclick="alert('Clicked!')">Click Me</button>

<!-- WAY 2: DOM property (classic JS style) -->
<button id="btn2">Click Me</button>
<script>
  document.getElementById("btn2").onclick = function() {
    alert("Clicked!");
  };
</script>

<!-- WAY 3: addEventListener (modern, recommended) -->
<button id="btn3">Click Me</button>
<script>
  document.getElementById("btn3").addEventListener("click", function() {
    alert("Clicked!");
  });
</script>
```

All three produce the same visible result. The differences matter greatly in complex code — we will explain why in sections 7 and 8.

---

### Common HTML Events Quick-Reference

| Event | Fires when... |
|---|---|
| `onclick` | User clicks an element |
| `ondblclick` | User double-clicks an element |
| `onmouseover` | Mouse pointer enters an element |
| `onmouseout` | Mouse pointer leaves an element |
| `onmousemove` | Mouse pointer moves over an element |
| `onmousedown` | Mouse button is pressed down |
| `onmouseup` | Mouse button is released |
| `onkeydown` | A keyboard key is pressed |
| `onkeyup` | A keyboard key is released |
| `onkeypress` | A key that produces a character is pressed (deprecated) |
| `oninput` | Input value changes (fires instantly) |
| `onchange` | Input value changes and loses focus |
| `onfocus` | Element receives focus |
| `onblur` | Element loses focus |
| `onsubmit` | A form is submitted |
| `onload` | Page or resource finishes loading |
| `onresize` | Browser window is resized |
| `onscroll` | Element or page is scrolled |
| `oncontextmenu` | Right mouse button is clicked |

---

## 2. Mouse Events

### The Full Mouse Event Sequence

When a user clicks the mouse, several events fire in order:

```
mousedown  →  mouseup  →  click
```

When double-clicking:

```
mousedown  →  mouseup  →  click  →  mousedown  →  mouseup  →  click  →  dblclick
```

Understanding this sequence prevents bugs where you attach a handler to `click` but it fires twice during a double-click.

---

### All Mouse Events Explained

| Event | Fires when... | Notes |
|---|---|---|
| `click` | Full click (down + up) on element | Most common event |
| `dblclick` | Two clicks within 500ms | Can conflict with `click` handlers |
| `mousedown` | Button pressed down | Fires before `click` |
| `mouseup` | Button released | Fires before `click` |
| `mousemove` | Pointer moves over element | Fires very frequently — be careful |
| `mouseover` | Pointer enters element or a child | Bubbles — fires for child elements too |
| `mouseout` | Pointer leaves element or a child | Bubbles |
| `mouseenter` | Pointer enters element | Does NOT bubble |
| `mouseleave` | Pointer leaves element | Does NOT bubble |
| `contextmenu` | Right-click or context menu key | Can be prevented |
| `wheel` | Mouse wheel is scrolled | Also fires on trackpad |

---

### `mouseover` vs `mouseenter` — A Critical Distinction

This confuses many beginners. The difference:

- **`mouseover`** fires when the mouse enters the element **and also when it enters any child element** inside it
- **`mouseenter`** fires **only** when the mouse enters the element itself, not its children

```html
<div id="outer" style="padding:30px; background:#ddd;">
  Outer Div
  <p id="inner" style="background:#aaa;">Inner Paragraph</p>
</div>

<p id="log"></p>

<script>
  var log = document.getElementById("log");

  // mouseover fires when entering outer AND when entering inner
  document.getElementById("outer").addEventListener("mouseover", function() {
    log.innerHTML += "mouseover fired<br>";
  });

  // mouseenter fires ONLY when entering outer
  document.getElementById("outer").addEventListener("mouseenter", function() {
    log.innerHTML += "mouseenter fired<br>";
  });
</script>
```

**Expected output when you move mouse from outside → outer → inner → back to outer:**
- `mouseover` fires 3 times
- `mouseenter` fires 1 time

> 💡 **Rule of thumb:** Use `mouseenter`/`mouseleave` for hover effects on a container. Use `mouseover`/`mouseout` when you deliberately want child entry/exit to trigger the handler too.

---

### Mouse Coordinates — The Event Object's `clientX` and `clientY`

Every mouse event carries coordinate data telling you exactly where the mouse was:

| Property | Description |
|---|---|
| `event.clientX` | X position relative to the **viewport** (visible area) |
| `event.clientY` | Y position relative to the **viewport** |
| `event.pageX` | X position relative to the **full page** (includes scroll) |
| `event.pageY` | Y position relative to the **full page** |
| `event.screenX` | X position relative to the **physical screen** |
| `event.screenY` | Y position relative to the **physical screen** |
| `event.offsetX` | X position relative to the **element itself** |
| `event.offsetY` | Y position relative to the **element itself** |

```html
<div id="canvas" style="width:400px; height:200px; background:#eee; border:1px solid #ccc;">
  Move your mouse here
</div>
<p id="coords">X: — | Y: —</p>

<script>
  document.getElementById("canvas").addEventListener("mousemove", function(event) {
    document.getElementById("coords").innerText =
      "Client: " + event.clientX + ", " + event.clientY +
      "  |  Offset: " + event.offsetX + ", " + event.offsetY;
  });
</script>
```

**Expected output:** As the mouse moves over the div, the coordinates update in real time.

---

### Which Mouse Button Was Pressed?

```javascript
element.addEventListener("mousedown", function(event) {
  switch(event.button) {
    case 0: console.log("Left button");   break;
    case 1: console.log("Middle button"); break;
    case 2: console.log("Right button");  break;
  }
});
```

---

### Detecting Modifier Keys During Mouse Events

```javascript
element.addEventListener("click", function(event) {
  if (event.shiftKey)   console.log("Shift + Click");
  if (event.ctrlKey)    console.log("Ctrl + Click");
  if (event.altKey)     console.log("Alt + Click");
  if (event.metaKey)    console.log("Cmd + Click (Mac)");
});
```

---

### Practical Example: Hover Card Effect

```html
<div id="card" style="
  width: 180px;
  padding: 20px;
  background: #3498db;
  color: white;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
">
  Hover over me!
</div>

<script>
  var card = document.getElementById("card");

  card.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-4px)";
    this.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
  });

  card.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });
</script>
```

**Expected output:** The card lifts and gains a shadow on hover, returns to normal when the mouse leaves.

> 💡 **What is `this` inside an event handler?** When a regular `function` is used as an event handler, `this` refers to the element the event was attached to. So `this.style` is the same as `card.style` here. (Arrow functions do NOT bind `this` this way — more on this in section 8.)

---

### Preventing the Default Context Menu

```html
<div id="box" style="width:200px; height:100px; background:#e8e8e8; padding:10px;">
  Right-click me
</div>
<div id="customMenu" style="
  display:none;
  position:fixed;
  background:white;
  border:1px solid #ccc;
  padding:8px 0;
  border-radius:4px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
  z-index: 999;
">
  <div style="padding:6px 20px; cursor:pointer;">✏️ Edit</div>
  <div style="padding:6px 20px; cursor:pointer;">🗑️ Delete</div>
  <div style="padding:6px 20px; cursor:pointer;">📋 Copy</div>
</div>

<script>
  var box = document.getElementById("box");
  var menu = document.getElementById("customMenu");

  box.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Suppress default right-click menu

    menu.style.display = "block";
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
  });

  document.addEventListener("click", function() {
    menu.style.display = "none"; // Hide menu on any click
  });
</script>
```

**Expected output:** Right-clicking the box shows a custom menu at the cursor position. Clicking anywhere hides it.

---

## 3. Keyboard Events

### The Three Keyboard Events

| Event | Fires when... | Key property | Use for |
|---|---|---|---|
| `keydown` | Key is first pressed | Physical key | Detecting any key including Shift, Ctrl, arrows |
| `keyup` | Key is released | Physical key | Running code after a keypress completes |
| `keypress` | A character key is pressed | Character produced | **Deprecated** — use `keydown` instead |

> ⚠️ **`keypress` is deprecated** and may not work in all browsers. Always use `keydown` or `keyup` in new code.

---

### The `event.key` Property — What Was Pressed?

```html
<input type="text" id="field" placeholder="Type anything...">
<p id="output">Press a key</p>

<script>
  document.getElementById("field").addEventListener("keydown", function(event) {
    document.getElementById("output").innerHTML =
      "<strong>Key:</strong> " + event.key + "<br>" +
      "<strong>Code:</strong> " + event.code + "<br>" +
      "<strong>KeyCode (legacy):</strong> " + event.keyCode;
  });
</script>
```

**Try pressing different keys and observe:**

| Key Pressed | `event.key` | `event.code` |
|---|---|---|
| `a` | `"a"` | `"KeyA"` |
| `A` (with Shift) | `"A"` | `"KeyA"` |
| `Enter` | `"Enter"` | `"Enter"` |
| `ArrowLeft` | `"ArrowLeft"` | `"ArrowLeft"` |
| `Space` | `" "` (a space) | `"Space"` |
| `1` (number row) | `"1"` | `"Digit1"` |
| `1` (numpad) | `"1"` | `"Numpad1"` |

**Key difference between `key` and `code`:**
- `event.key` — the **logical** key: what character or action it produces (affected by Shift, Caps Lock, keyboard language)
- `event.code` — the **physical** key: its position on the keyboard (never changes regardless of modifier keys or language)

> 💡 **Rule of thumb:** Use `event.key` when you care about what character was typed. Use `event.code` when you care about which physical key was pressed (e.g., game controls where `W` should always move forward regardless of keyboard language).

---

### Detecting Special Keys

```javascript
document.addEventListener("keydown", function(event) {

  // Single special keys
  if (event.key === "Enter")     console.log("Enter pressed");
  if (event.key === "Escape")    console.log("Escape pressed");
  if (event.key === "Backspace") console.log("Backspace pressed");
  if (event.key === "Tab")       console.log("Tab pressed");
  if (event.key === "Delete")    console.log("Delete pressed");

  // Arrow keys
  if (event.key === "ArrowUp")    console.log("Up arrow");
  if (event.key === "ArrowDown")  console.log("Down arrow");
  if (event.key === "ArrowLeft")  console.log("Left arrow");
  if (event.key === "ArrowRight") console.log("Right arrow");

  // Function keys
  if (event.key === "F1")  console.log("F1 pressed");
  if (event.key === "F12") console.log("F12 pressed");
});
```

---

### Modifier Key Combinations

```javascript
document.addEventListener("keydown", function(event) {

  // Ctrl + S (Save shortcut)
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // Prevent browser's default save dialog
    console.log("Custom save triggered!");
  }

  // Ctrl + Z (Undo)
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    console.log("Undo triggered!");
  }

  // Shift + Enter (common in chat apps — send without newline)
  if (event.shiftKey && event.key === "Enter") {
    event.preventDefault();
    console.log("Send message (without newline)!");
  }
});
```

> 💡 **Modifier key properties:**
> - `event.ctrlKey` — Ctrl key held
> - `event.shiftKey` — Shift key held
> - `event.altKey` — Alt key held
> - `event.metaKey` — Cmd (Mac) or Windows key held

---

### Keyboard Event Sequence Demo

```html
<input id="demo" placeholder="Watch the log...">
<div id="log" style="font-family:monospace; background:#f4f4f4; padding:10px; height:120px; overflow-y:auto;"></div>

<script>
  var log = document.getElementById("log");
  var input = document.getElementById("demo");

  function logEvent(type, event) {
    var entry = document.createElement("div");
    entry.innerHTML =
      "<span style='color:#888;'>[" + type + "]</span> " +
      "key=<strong>" + event.key + "</strong>  " +
      "code=" + event.code;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight; // Auto-scroll
  }

  input.addEventListener("keydown",  function(e) { logEvent("keydown ", e); });
  input.addEventListener("keyup",    function(e) { logEvent("keyup   ", e); });
</script>
```

**Expected output:** Each key press shows both events in order, colour-coded by type.

---

### Practical Example: Keyboard-Navigable Dropdown

```html
<input type="text" id="search" placeholder="Search... (use ↑↓ to navigate, Enter to select)">
<ul id="dropdown" style="
  border:1px solid #ccc;
  list-style:none;
  padding:0;
  margin:0;
  max-height:150px;
  overflow-y:auto;
  background:white;
"></ul>

<script>
  var items = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Date", "Elderberry"];
  var activeIndex = -1;

  document.getElementById("search").addEventListener("keydown", function(event) {
    var listItems = document.querySelectorAll("#dropdown li");

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, listItems.length - 1);
      updateActive(listItems);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActive(listItems);
    } else if (event.key === "Enter" && activeIndex >= 0) {
      this.value = listItems[activeIndex].innerText;
      document.getElementById("dropdown").innerHTML = "";
      activeIndex = -1;
    }
  });

  document.getElementById("search").addEventListener("input", function() {
    var query = this.value.toLowerCase();
    var dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = "";
    activeIndex = -1;

    if (query === "") return;

    items.filter(function(item) {
      return item.toLowerCase().startsWith(query);
    }).forEach(function(item) {
      var li = document.createElement("li");
      li.innerText = item;
      li.style.padding = "8px 12px";
      li.style.cursor = "pointer";
      li.addEventListener("click", function() {
        document.getElementById("search").value = item;
        dropdown.innerHTML = "";
      });
      dropdown.appendChild(li);
    });
  });

  function updateActive(listItems) {
    listItems.forEach(function(li, i) {
      li.style.backgroundColor = i === activeIndex ? "#3498db" : "";
      li.style.color = i === activeIndex ? "white" : "";
    });
  }
</script>
```

---

### Preventing Default Key Behaviour

```javascript
// Prevent typing numbers in a "letters only" field
document.getElementById("lettersOnly").addEventListener("keydown", function(event) {
  var isLetter = /^[a-zA-Z\s]$/.test(event.key);
  var isControl = ["Backspace","Delete","ArrowLeft","ArrowRight","Tab"].includes(event.key);

  if (!isLetter && !isControl) {
    event.preventDefault(); // Block the character
  }
});
```

---

## 4. Load Events

### What Are Load Events?

Load events tell you about the **lifecycle of the page** — from when the browser starts parsing HTML, to when every image and script has fully downloaded, to when the user is about to leave.

---

### The Page Loading Timeline

```
HTML parsing starts
    │
    ▼
DOM tree built (HTML parsed)
    │
    ▼  ← DOMContentLoaded fires here
    │
    ▼
Images, stylesheets, iframes finish loading
    │
    ▼  ← window "load" fires here
    │
    ▼
User interacts with page
    │
    ▼
User navigates away ← "beforeunload" fires
    │
    ▼
Page is unloaded  ← "unload" fires
```

---

### `DOMContentLoaded` — DOM Ready, Resources May Still Be Loading

```javascript
document.addEventListener("DOMContentLoaded", function() {
  // The HTML is parsed. All elements exist. But images may still be loading.
  console.log("DOM is ready!");
  console.log("Number of images:", document.images.length); // Count exists
  console.log("First image loaded?", document.images[0].complete); // May be false
});
```

> 💡 **When to use:** Any initialisation code that needs DOM elements but doesn't need images to be visible yet. This is the most common place to put page initialisation code.

---

### `window.onload` — Everything Fully Loaded

```javascript
window.addEventListener("load", function() {
  // Everything is loaded: HTML, CSS, images, scripts, fonts
  console.log("Fully loaded!");

  var img = document.getElementById("hero");
  console.log("Image natural width:", img.naturalWidth); // Now accurate
});
```

> 💡 **When to use:** When your code depends on image dimensions, canvas drawing from images, or any resources that must be fully downloaded. It fires later than `DOMContentLoaded`.

---

### Comparing `DOMContentLoaded` vs `load`

```html
<script>
  document.addEventListener("DOMContentLoaded", function() {
    console.log("1. DOM ready");
  });

  window.addEventListener("load", function() {
    console.log("2. Everything loaded");
  });

  console.log("3. Inline script running");
</script>
```

**Console output order:**
```
3. Inline script running    ← runs immediately as parser hits the script
1. DOM ready                ← fires when HTML parsing completes
2. Everything loaded        ← fires when all resources are done
```

---

### Load Events on Individual Resources

You can detect when a specific image or script finishes loading:

```html
<img id="photo" src="large-image.jpg">

<script>
  var img = document.getElementById("photo");

  img.addEventListener("load", function() {
    console.log("Image loaded! Size:", this.naturalWidth + "x" + this.naturalHeight);
  });

  img.addEventListener("error", function() {
    console.log("Image failed to load!");
    this.src = "fallback.jpg"; // Show a fallback image
  });
</script>
```

---

### `beforeunload` — Warn Before Leaving

```javascript
window.addEventListener("beforeunload", function(event) {
  // Show a confirmation dialog when the user tries to leave
  event.preventDefault();

  // Modern browsers show a generic message; you cannot customise it
  event.returnValue = ""; // Required for the dialog to show in Chrome
});
```

**Expected output:** When the user tries to close the tab or navigate away, the browser shows: "Leave site? Changes you made may not be saved."

> ⚠️ Only add `beforeunload` when there is genuinely unsaved data (like a form being filled out). Adding it unconditionally annoys users.

---

### `unload` — Final Cleanup

```javascript
window.addEventListener("unload", function() {
  // Page is being destroyed. Very limited time to run code.
  // Good for: sending analytics data, cleanup of resources
  navigator.sendBeacon("/analytics", JSON.stringify({ session_end: Date.now() }));
});
```

> ⚠️ The `unload` event is unreliable on mobile browsers. Prefer `pagehide` for mobile-compatible teardown.

---

### `resize` — Window Dimensions Changed

```javascript
window.addEventListener("resize", function() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  document.getElementById("dims").innerText = w + " × " + h + " px";
});
```

> 💡 `resize` fires **many times per second** while the window is being dragged. For performance, use **debouncing** — wait until resizing stops before running heavy code:

```javascript
var resizeTimer;
window.addEventListener("resize", function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    console.log("Resize finished. New size:", window.innerWidth);
    // Run expensive layout recalculation here
  }, 250); // Wait 250ms after last resize event
});
```

---

### `scroll` — Page or Element Scrolled

```javascript
window.addEventListener("scroll", function() {
  var scrolled = window.scrollY; // Pixels scrolled from the top

  // Show/hide a "Back to Top" button
  var backBtn = document.getElementById("backToTop");
  backBtn.style.display = scrolled > 300 ? "block" : "none";
});
```

**Sticky header that changes style on scroll:**

```javascript
window.addEventListener("scroll", function() {
  var header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");    // Add compact style
  } else {
    header.classList.remove("scrolled");
  }
});
```

---

### `online` and `offline` — Network Status

```javascript
window.addEventListener("online", function() {
  document.getElementById("status").innerText = "✅ Back online";
  document.getElementById("status").style.backgroundColor = "#c8f7c5";
});

window.addEventListener("offline", function() {
  document.getElementById("status").innerText = "⚠️ No internet connection";
  document.getElementById("status").style.backgroundColor = "#fdc5c5";
});
```

---

## 5. Timing Events

### What Are Timing Events?

Timing events are JavaScript's built-in clock tools. They let you run code **after a delay** or **repeatedly on a schedule** — without blocking other code from running.

---

### `setTimeout` — Run Once After a Delay

```javascript
// Syntax: setTimeout(function, milliseconds)
// Returns a numeric ID you can use to cancel it

var timerId = setTimeout(function() {
  console.log("This runs after 3 seconds");
}, 3000); // 3000ms = 3 seconds
```

**Clearing a timeout (cancelling it before it fires):**

```javascript
var timerId = setTimeout(function() {
  console.log("This will never run");
}, 5000);

// Cancel the timeout before the 5 seconds are up
clearTimeout(timerId);
```

---

### `setInterval` — Run Repeatedly on a Schedule

```javascript
// Syntax: setInterval(function, milliseconds)
// Returns a numeric ID you can use to cancel it

var count = 0;
var intervalId = setInterval(function() {
  count++;
  console.log("Tick number: " + count);

  if (count >= 5) {
    clearInterval(intervalId); // Stop after 5 ticks
    console.log("Done!");
  }
}, 1000); // Every 1000ms = every 1 second
```

**Expected output:**
```
Tick number: 1    (after 1s)
Tick number: 2    (after 2s)
Tick number: 3    (after 3s)
Tick number: 4    (after 4s)
Tick number: 5    (after 5s)
Done!
```

---

### Building a Digital Clock

```html
<div id="clock" style="font-size: 48px; font-family: monospace; text-align: center;"></div>

<script>
  function updateClock() {
    var now = new Date();

    var hours   = String(now.getHours()).padStart(2, "0");   // "09", not "9"
    var minutes = String(now.getMinutes()).padStart(2, "0");
    var seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").innerText =
      hours + ":" + minutes + ":" + seconds;
  }

  updateClock(); // Show immediately (no 1-second delay on first load)
  setInterval(updateClock, 1000);
</script>
```

**Expected output:** A live clock that ticks every second.

> 💡 **Why call `updateClock()` before `setInterval`?** `setInterval` waits the full interval before the first call. Calling the function manually first removes the 1-second blank screen at startup.

---

### `setTimeout` Inside Itself — Recursive Timeout

A common alternative to `setInterval` is to schedule the next call from within the function itself:

```javascript
function tick() {
  console.log("Tick at: " + new Date().toLocaleTimeString());

  // Schedule next call after this one finishes
  setTimeout(tick, 1000);
}

setTimeout(tick, 1000);
```

**Why use this pattern instead of `setInterval`?**
- `setInterval` fires every `n` ms regardless of whether the previous execution finished
- Recursive `setTimeout` waits for each execution to complete before scheduling the next one
- For API calls or any async work, recursive `setTimeout` prevents overlapping calls

---

### Timing Precision Warning

```javascript
// setInterval is NOT precise — it drifts over time
var start = Date.now();
var count = 0;

var id = setInterval(function() {
  count++;
  var elapsed = Date.now() - start;
  var expected = count * 1000;
  var drift = elapsed - expected;
  console.log("Tick " + count + " — drift: " + drift + "ms");

  if (count >= 5) clearInterval(id);
}, 1000);
```

**Why it drifts:** JavaScript is single-threaded. If other code is running when the interval fires, the browser queues the timer callback and runs it as soon as the thread is free. For precise timekeeping, use `Date.now()` as the source of truth.

---

### Debounce and Throttle — Essential Timer Patterns

**Debounce:** Wait until the user stops doing something before running the handler.

```javascript
function debounce(fn, delay) {
  var timer;
  return function() {
    var args = arguments;
    var context = this;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// Only runs the search 400ms after the user stops typing
var search = debounce(function(query) {
  console.log("Searching for:", query);
}, 400);

document.getElementById("searchInput").addEventListener("input", function() {
  search(this.value);
});
```

**Throttle:** Run the handler at most once per time window, even if triggered many times.

```javascript
function throttle(fn, limit) {
  var inThrottle = false;
  return function() {
    if (!inThrottle) {
      fn.apply(this, arguments);
      inThrottle = true;
      setTimeout(function() { inThrottle = false; }, limit);
    }
  };
}

// Only logs scroll position at most once every 200ms
var onScroll = throttle(function() {
  console.log("Scroll position:", window.scrollY);
}, 200);

window.addEventListener("scroll", onScroll);
```

---

### Countdown Timer

```html
<h2 id="timer" style="font-size: 48px; font-family: monospace;">00:10</h2>
<button onclick="startCountdown()">Start</button>
<button onclick="stopCountdown()">Stop</button>
<button onclick="resetCountdown()">Reset</button>

<script>
  var totalSeconds = 10;
  var remaining = totalSeconds;
  var intervalId = null;

  function updateDisplay() {
    var mins = Math.floor(remaining / 60);
    var secs = remaining % 60;
    document.getElementById("timer").innerText =
      String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  }

  function startCountdown() {
    if (intervalId) return; // Already running

    intervalId = setInterval(function() {
      remaining--;
      updateDisplay();

      if (remaining <= 0) {
        clearInterval(intervalId);
        intervalId = null;
        document.getElementById("timer").innerText = "Time's up!";
        document.getElementById("timer").style.color = "red";
      }
    }, 1000);
  }

  function stopCountdown() {
    clearInterval(intervalId);
    intervalId = null;
  }

  function resetCountdown() {
    stopCountdown();
    remaining = totalSeconds;
    document.getElementById("timer").style.color = "";
    updateDisplay();
  }
</script>
```

---

## 6. Event Management — The Event Object

### What Is the Event Object?

Every time an event fires, the browser creates an **Event object** and passes it automatically to your handler. This object is a rich package of information about what just happened.

```javascript
element.addEventListener("click", function(event) {
  // "event" is the Event object — name it whatever you like
  // Common names: event, e, evt
  console.log(event);
});
```

---

### Universal Event Object Properties

| Property | Type | Description |
|---|---|---|
| `event.type` | String | The event type: `"click"`, `"keydown"`, etc. |
| `event.target` | Element | The element that **actually received** the event |
| `event.currentTarget` | Element | The element **the listener is attached to** |
| `event.timeStamp` | Number | Milliseconds since page load when event fired |
| `event.bubbles` | Boolean | Does this event type bubble? |
| `event.cancelable` | Boolean | Can the default be prevented? |
| `event.defaultPrevented` | Boolean | Has `preventDefault()` been called? |
| `event.isTrusted` | Boolean | Was this event from a real user (not programmatic)? |

---

### `event.target` vs `event.currentTarget`

This is one of the most important — and confusing — concepts in event handling.

```html
<div id="container">
  <button id="btn">Click Me</button>
</div>

<script>
  document.getElementById("container").addEventListener("click", function(event) {
    // currentTarget: always the element the listener is ON (the container div)
    console.log("currentTarget:", event.currentTarget.id); // "container"

    // target: the element the user ACTUALLY clicked (the button)
    console.log("target:", event.target.id); // "btn"
  });
</script>
```

**Visual breakdown:**
```
User clicks the <button>
        │
        ▼ event fires on button
  event.target = <button>         ← where the click physically happened
        │
        ▼ event bubbles up to the <div>
  event.currentTarget = <div>     ← where the listener is attached
```

---

### Event Bubbling — The Core Mechanism

By default, events **bubble up** the DOM tree. A click on a child element also triggers click handlers on every ancestor.

```html
<div id="grandparent" style="padding:30px; background:#fde8a0;">
  Grandparent
  <div id="parent" style="padding:20px; background:#c8f7c5;">
    Parent
    <div id="child" style="padding:10px; background:#c5d5fc;">
      Child (click me)
    </div>
  </div>
</div>

<p id="log"></p>

<script>
  var log = document.getElementById("log");

  ["grandparent", "parent", "child"].forEach(function(id) {
    document.getElementById(id).addEventListener("click", function(e) {
      log.innerHTML += id + " handler fired (target: " + e.target.id + ")<br>";
    });
  });
</script>
```

**When you click "Child":**
```
child handler fired (target: child)
parent handler fired (target: child)
grandparent handler fired (target: child)
```

> 💡 **Notice:** `event.target` is always `child` (where the click happened), but the handler fires three times as the event bubbles up through all three elements.

---

### `event.stopPropagation()` — Stop the Bubble

```javascript
document.getElementById("child").addEventListener("click", function(event) {
  event.stopPropagation(); // Stop the event from bubbling further
  console.log("Child handler — bubble stopped here");
});

document.getElementById("parent").addEventListener("click", function() {
  console.log("Parent — this will NOT fire if child was clicked");
});
```

> ⚠️ Use `stopPropagation` sparingly. Stopping bubbles can break other code that relies on event delegation (covered next). Think carefully before using it.

---

### `event.preventDefault()` — Stop the Default Browser Action

Some events have built-in browser behaviours. `preventDefault()` stops those:

| Event | Default behaviour prevented |
|---|---|
| Click on `<a href="...">` | Navigation to the URL |
| Click submit button in `<form>` | Form submission |
| `keydown` with `Tab` | Moving focus to next element |
| `contextmenu` | Showing right-click menu |
| `wheel` over a scrollable area | Scrolling the page |
| `dragstart` on an image | Browser drag-and-drop of the image |

```javascript
// Prevent form from submitting the normal way
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Now YOU control what happens
  validateAndSubmit();
});

// Prevent link navigation
document.getElementById("myLink").addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Link clicked but not navigating");
});
```

---

### Event Delegation — Handling Events on Many Elements Efficiently

Instead of adding a listener to every button/item individually, add **one listener to a parent** and use `event.target` to detect which child was clicked.

**Without event delegation (inefficient for large lists):**

```javascript
// Adds 100 separate event listeners
var items = document.querySelectorAll(".menu-item");
items.forEach(function(item) {
  item.addEventListener("click", function() {
    console.log("Clicked:", this.innerText);
  });
});
```

**With event delegation (one listener handles all):**

```html
<ul id="menu">
  <li class="menu-item">Home</li>
  <li class="menu-item">About</li>
  <li class="menu-item">Services</li>
  <li class="menu-item">Contact</li>
</ul>

<script>
  document.getElementById("menu").addEventListener("click", function(event) {
    // Check if the click was on a menu item (not the <ul> itself)
    if (event.target.classList.contains("menu-item")) {
      console.log("Clicked:", event.target.innerText);
      // Remove active from all, add to clicked
      document.querySelectorAll(".menu-item").forEach(function(el) {
        el.classList.remove("active");
      });
      event.target.classList.add("active");
    }
  });
</script>
```

**The huge advantage of delegation:** Items added to the list AFTER the listener is registered are automatically covered. No re-attaching needed.

---

### Event Capturing — The Other Direction

Events actually travel in two phases:

1. **Capture phase** — from `document` down to the target (rarely used)
2. **Bubble phase** — from the target back up to `document` (default)

```javascript
// Third argument: true = capture phase, false (default) = bubble phase
parent.addEventListener("click", function() {
  console.log("Parent — CAPTURE phase");
}, true);  // ← true enables capture

child.addEventListener("click", function() {
  console.log("Child — bubble phase");
}, false); // ← default
```

**Click on child — output order:**
```
Parent — CAPTURE phase    (capture fires first, going DOWN)
Child — bubble phase      (bubble fires second, going UP)
```

> 💡 In practice, use capturing only when you specifically need a parent to intercept an event before the target sees it. Default bubble phase handles 99% of use cases.

---

### `stopImmediatePropagation()` — Stop Other Listeners on the Same Element

```javascript
element.addEventListener("click", function(event) {
  console.log("Handler 1 — runs");
  event.stopImmediatePropagation(); // Stops all other listeners on THIS element too
});

element.addEventListener("click", function() {
  console.log("Handler 2 — NEVER runs");
});
```

Compare with `stopPropagation()`: that stops the event reaching **parent** elements. `stopImmediatePropagation()` additionally stops other handlers on the **same** element.

---

## 7. HTML DOM Events — Inline & Property Handlers

### Three Ways to Register Event Handlers

Before `addEventListener` existed, there were two older approaches. All three are in active use today, so you must understand all of them.

---

### Way 1 — HTML Inline Attribute (Oldest)

```html
<button onclick="handleClick()">Click</button>
<button onmouseover="this.style.background='yellow'" onmouseout="this.style.background=''">Hover</button>
```

**Characteristics:**
- Handler code is written **inside the HTML attribute** as a string
- The string is evaluated in the context of the element
- `this` refers to the element inside the string
- Can only assign **one handler** per event per element

**Limitations:**
- Mixes HTML structure with JavaScript behaviour — hard to maintain
- Difficult to handle dynamic elements
- The attribute value is actually wrapped in a function by the browser, which can cause `this` binding confusion

**When you see it:** Legacy codebases, simple demos, quick prototypes. Avoid in new projects.

---

### Way 2 — DOM Property Assignment (Classic)

```html
<button id="btn">Click Me</button>

<script>
  var btn = document.getElementById("btn");

  // Assign a function to the event property
  btn.onclick = function() {
    console.log("Clicked!");
    console.log("this is:", this.id); // "btn" — `this` works correctly
  };

  // To remove it
  btn.onclick = null;
</script>
```

**Characteristics:**
- Keeps JavaScript separate from HTML
- `this` inside the handler correctly refers to the element
- Clean syntax
- **Critical limitation: only ONE handler per event** — assigning a second one overwrites the first

```javascript
btn.onclick = function() { console.log("First handler"); };
btn.onclick = function() { console.log("Second handler"); };
// Only "Second handler" runs — the first was overwritten!
```

---

### Common DOM Event Properties

All HTML elements have these event properties you can assign:

```javascript
element.onclick       = handler;
element.ondblclick    = handler;
element.onmouseover   = handler;
element.onmouseout    = handler;
element.onmouseenter  = handler;
element.onmouseleave  = handler;
element.onmousemove   = handler;
element.onmousedown   = handler;
element.onmouseup     = handler;
element.onkeydown     = handler;
element.onkeyup       = handler;
element.oninput       = handler;
element.onchange      = handler;
element.onfocus       = handler;
element.onblur        = handler;
element.onsubmit      = handler;
element.onload        = handler;
element.onscroll      = handler;
element.onresize      = handler; // (on window)
element.oncontextmenu = handler;
```

---

### The `onchange` vs `oninput` Distinction

| Event | Fires when... |
|---|---|
| `oninput` | The value changes — fires on **every keystroke**, immediately |
| `onchange` | The value changes AND the element **loses focus** (or Enter is pressed for selects) |

```html
<input id="demo" type="text" placeholder="Type here">
<p>oninput log: <span id="inputLog"></span></p>
<p>onchange log: <span id="changeLog"></span></p>

<script>
  var el = document.getElementById("demo");

  el.oninput = function() {
    document.getElementById("inputLog").innerText = this.value;
  };

  el.onchange = function() {
    document.getElementById("changeLog").innerText = this.value;
  };
</script>
```

**Observation:** `inputLog` updates on every single keystroke. `changeLog` only updates after you click away from the input.

---

### `onfocus` and `onblur`

```html
<input id="fname" placeholder="First name">
<input id="lname" placeholder="Last name">

<script>
  var inputs = document.querySelectorAll("input");

  inputs.forEach(function(input) {
    input.onfocus = function() {
      this.style.outline = "3px solid #3498db";
      this.style.backgroundColor = "#eaf4fd";
    };

    input.onblur = function() {
      this.style.outline = "";
      this.style.backgroundColor = "";
    };
  });
</script>
```

**Expected output:** Each input gets a blue outline and light blue background when focused, returning to normal when the user tabs away.

---

## 8. addEventListener — The Professional Way

### Why `addEventListener` Is the Right Choice

`addEventListener` solves every limitation of the inline and property approaches:

| Feature | Inline HTML | Property (`onclick =`) | `addEventListener` |
|---|---|---|---|
| Multiple handlers per event | ❌ | ❌ | ✅ |
| Easy to remove individual handlers | ❌ | ❌ (set null removes all) | ✅ |
| Works on any event phase (capture/bubble) | ❌ | ❌ | ✅ |
| Separates HTML from JavaScript | ❌ | ✅ | ✅ |
| Readable for complex handler logic | ❌ | ✅ | ✅ |

---

### Basic Syntax

```javascript
// Syntax:
// element.addEventListener(eventType, handlerFunction, options)

element.addEventListener("click", function(event) {
  console.log("Clicked!");
});
```

- `eventType` — a string like `"click"`, `"keydown"`, `"scroll"` — **no "on" prefix** (unlike `onclick`)
- `handlerFunction` — the function to call. Can be anonymous or a named reference
- `options` — optional: a boolean for capture phase, or an options object

---

### Using a Named Function Reference

```javascript
function handleClick(event) {
  console.log("Button clicked at:", event.clientX, event.clientY);
}

var btn = document.getElementById("btn");

// Pass the function REFERENCE — do NOT call it (no parentheses)
btn.addEventListener("click", handleClick);      // ✅ correct
btn.addEventListener("click", handleClick());    // ❌ wrong — calls it immediately
```

Using named functions is crucial for removal (see `removeEventListener` below).

---

### Multiple Handlers — The Key Advantage

```javascript
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  console.log("Handler 1: analytics logged");
});

btn.addEventListener("click", function() {
  console.log("Handler 2: button animated");
});

btn.addEventListener("click", function() {
  console.log("Handler 3: modal opened");
});

// All three run when the button is clicked, in order
```

This is impossible with `onclick =` assignment.

---

### `removeEventListener` — Detaching Handlers

```javascript
function handleResize() {
  console.log("Window resized to:", window.innerWidth);
}

// Add the listener
window.addEventListener("resize", handleResize);

// Remove it later (must pass the same function reference)
window.removeEventListener("resize", handleResize);
```

> ⚠️ **You cannot remove anonymous functions:**

```javascript
// This CANNOT be removed because there is no reference to the function
btn.addEventListener("click", function() {
  console.log("I can never be specifically removed");
});

// removeEventListener needs the exact same function reference:
btn.removeEventListener("click", function() { /* ... */ }); // ❌ Does nothing
```

---

### The `{ once: true }` Option — Run Exactly Once

```javascript
// This handler fires only the first time the button is clicked,
// then automatically removes itself
btn.addEventListener("click", function() {
  console.log("First click only!");
}, { once: true });
```

**Real-world use:** Initialisation code, "intro" animations, one-time user acknowledgements ("Don't show again").

---

### The `{ passive: true }` Option — Performance Boost for Scroll

```javascript
// Tells the browser: "this handler will NEVER call preventDefault()"
// The browser can then scroll immediately without waiting for JS to run
window.addEventListener("scroll", function() {
  updateScrollIndicator();
}, { passive: true });
```

Using `{ passive: true }` for touch and scroll events can significantly improve scroll performance on mobile devices.

---

### Full Options Object

```javascript
element.addEventListener("click", handler, {
  once:    true,   // Remove after first call
  capture: false,  // Use bubble phase (default)
  passive: true    // Never calls preventDefault (scroll performance)
});
```

---

### `this` in `addEventListener` vs Arrow Functions

```javascript
var btn = document.getElementById("btn");

// Regular function: `this` = the element the listener is on
btn.addEventListener("click", function() {
  console.log(this.id);       // "btn" ✅
  this.style.color = "red";   // Works ✅
});

// Arrow function: `this` is inherited from the surrounding scope
// (NOT the element)
btn.addEventListener("click", () => {
  console.log(this);          // window (or undefined in strict mode) ❌
  // this.style.color = "red"; would fail
});

// To use an arrow function AND get the element, use event.target:
btn.addEventListener("click", (event) => {
  console.log(event.target.id);       // "btn" ✅
  event.target.style.color = "red";   // Works ✅
});
```

---

### Attaching Listeners to Multiple Elements

```html
<button class="action-btn" data-action="save">Save</button>
<button class="action-btn" data-action="print">Print</button>
<button class="action-btn" data-action="export">Export</button>

<script>
  // Loop and attach — each button gets its own listener
  document.querySelectorAll(".action-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var action = this.getAttribute("data-action");
      console.log("Action triggered:", action);
    });
  });
</script>
```

---

### Building a Custom Event System

JavaScript allows you to create and dispatch your own events:

```javascript
// Create a custom event
var myEvent = new CustomEvent("orderPlaced", {
  detail: {
    orderId: "ORD-1234",
    total: 59.99,
    items: ["Book", "Pen"]
  },
  bubbles: true,       // Should the event bubble?
  cancelable: true     // Can it be cancelled?
});

// Listen for the custom event
document.addEventListener("orderPlaced", function(event) {
  console.log("Order received:", event.detail.orderId);
  console.log("Total:", event.detail.total);
  updateOrderUI(event.detail);
});

// Dispatch (fire) the event
document.getElementById("checkoutBtn").addEventListener("click", function() {
  document.dispatchEvent(myEvent);
});
```

> 💡 **Real-world use:** Custom events are how large applications keep different modules loosely connected. A checkout module can fire `orderPlaced` without knowing anything about the analytics module or notification module that listen for it.

---

### Event Listener Memory — Best Practices

1. **Remove listeners when no longer needed** — especially in single-page apps where components are created and destroyed

```javascript
// Component setup
function initModal() {
  document.addEventListener("keydown", closeOnEscape);
}

function destroyModal() {
  document.removeEventListener("keydown", closeOnEscape); // Clean up!
}

function closeOnEscape(event) {
  if (event.key === "Escape") destroyModal();
}
```

2. **Avoid creating functions inside loops** — each creates a new function object

```javascript
// ❌ Creates N new function objects
items.forEach(function(item) {
  item.addEventListener("click", function() { handleItem(item); });
});

// ✅ Reuse one function, use event delegation
container.addEventListener("click", function(event) {
  if (event.target.classList.contains("item")) {
    handleItem(event.target);
  }
});
```

---

# PHASE 2 — APPLIED EXERCISES

---

## 9. Applied Exercises

---

### Exercise 1: Mouse Tracker with Trail Effect

**Objective:** Use `mousemove` to track and display the mouse's position, and create a trailing dot effect.

**Real-world scenario:** You are building a creative portfolio site and want a subtle custom cursor trail to wow visitors.

**Warm-up mini-example:**

```html
<div id="pos">Move your mouse</div>
<script>
  document.addEventListener("mousemove", function(e) {
    document.getElementById("pos").innerText = e.clientX + ", " + e.clientY;
  });
</script>
```

**Your exercise:**

Build a full-page tracker that:
- Shows `X, Y` coordinates in a corner display
- Creates small coloured dots (10×10px divs) at the mouse position as it moves
- Dots fade out and are removed from the DOM after 800ms
- Each dot gets a random colour from a palette of 5 colours

**Step-by-step instructions:**

1. Listen for `mousemove` on `document`
2. In the handler, update the coordinate display with `event.clientX` and `event.clientY`
3. Create a `<div>` positioned with `position:fixed`, `left: event.clientX`, `top: event.clientY`
4. Set a random background colour from an array
5. Use `transition: opacity 0.8s` and then set `opacity = 0` after a 10ms delay
6. Use `setTimeout(dot.remove, 800)` to remove the element after the fade

**Hints:**

```javascript
var colours = ["#e74c3c","#3498db","#2ecc71","#f39c12","#9b59b6"];
var colour = colours[Math.floor(Math.random() * colours.length)];
```

**Self-check questions:**
1. Why is it important to remove the dots from the DOM after they fade? What happens if you don't?
2. Why use `setTimeout(dot.remove, 800)` and not `dot.remove()` directly?
3. The `mousemove` event fires many times per second. How would you throttle dot creation to prevent too many dots at once?

---

### Exercise 2: Keyboard-Driven Image Gallery

**Objective:** Navigate an image gallery using arrow keys and the keyboard.

**Real-world scenario:** A photography portfolio where users can press left/right to browse photos and Escape to close a lightbox.

**Step-by-step instructions:**

1. Create an array of at least 5 image URLs (use placeholder URLs like `https://picsum.photos/600/400?random=1`)
2. Display the current image in a large `<img>` element
3. Show `Image 1 of 5` below it
4. Listen for `keydown` on `document`:
   - `ArrowRight` or `ArrowDown` → advance to the next image
   - `ArrowLeft` or `ArrowUp` → go to the previous image
   - `Home` → go to the first image
   - `End` → go to the last image
5. Wrap around: after the last image, go back to the first
6. Add `<` and `>` buttons for mouse users too
7. Show a CSS transition on the image when it changes (`opacity: 0 → 1`)

**Key logic for wrapping:**

```javascript
currentIndex = (currentIndex + 1 + images.length) % images.length;
```

**Self-check questions:**
1. Why does `(currentIndex - 1 + images.length) % images.length` work for going backwards without going negative?
2. How does the modulo `%` operator make the wrap-around logic work?
3. Why do we listen on `document` rather than a specific element?

---

### Exercise 3: Smart Form with Real-Time Validation

**Objective:** Build a registration form that validates each field live, using all three keyboard events.

**Fields:**

| Field | Validation |
|---|---|
| Username | 3–15 chars, letters/numbers/underscores only |
| Email | Valid email format |
| Password | 8+ chars, 1 uppercase, 1 number, 1 special character |

**Features to build:**

1. On `input`: Show a coloured message (green/red) updating as they type
2. On `focus`: Highlight the field and show a helpful hint tooltip
3. On `blur`: Run final validation and lock in the error/success state
4. On `keydown` in the password field: Show which requirements are met using live checkmarks

**Password requirement list:**

```html
<ul id="passRequirements">
  <li id="req-length">✗ At least 8 characters</li>
  <li id="req-upper">✗ At least 1 uppercase letter</li>
  <li id="req-number">✗ At least 1 number</li>
  <li id="req-special">✗ At least 1 special character (!@#$%)</li>
</ul>
```

**Hint for updating requirements:**

```javascript
function updateReq(id, passed) {
  var el = document.getElementById(id);
  el.innerText = (passed ? "✓ " : "✗ ") + el.innerText.slice(2);
  el.style.color = passed ? "green" : "red";
}
```

---

### Exercise 4: Event Delegation Menu System

**Objective:** Build a dynamic navigation system using only ONE event listener.

**Real-world scenario:** A CMS sidebar where menu items are loaded dynamically from an API. You can't attach individual listeners because items are added after page load.

**Step-by-step instructions:**

1. Create a `<nav>` with sections: Home, Products, Blog, Contact
2. Products has a **dropdown submenu** that opens on hover using `mouseenter`/`mouseleave`
3. All navigation clicks are handled by **one** listener on the `<nav>` element
4. In the handler, use `event.target.dataset.page` to identify which page was clicked
5. Update a `<main>` area with fake content for each page
6. Add a "New Menu Item" button that:
   - Adds a new `<li>` to the nav dynamically
   - Works with the existing delegation listener immediately — no new listener needed

**Self-check questions:**
1. How does event delegation work for dynamically added items?
2. What is the difference between `event.target` and `event.currentTarget` in your single listener?
3. How would you prevent the dropdown from closing when moving from the menu item to its submenu?

---

### Exercise 5: Stopwatch with Timing Events

**Objective:** Build a fully functional stopwatch.

**Features:**
- Start / Stop / Reset / Lap buttons
- Displays `MM:SS.ms` (minutes, seconds, milliseconds)
- Lap times stored and displayed in a list
- Start button label changes to "Pause" when running

**Key logic:**

```javascript
var startTime = null;
var elapsedTime = 0; // ms
var timerInterval = null;

function start() {
  startTime = Date.now() - elapsedTime; // Resume from where we stopped
  timerInterval = setInterval(update, 10); // Update every 10ms
}

function stop() {
  elapsedTime = Date.now() - startTime;
  clearInterval(timerInterval);
}

function update() {
  var elapsed = Date.now() - startTime;
  var ms = Math.floor((elapsed % 1000) / 10);
  var s  = Math.floor((elapsed / 1000) % 60);
  var m  = Math.floor(elapsed / 60000);
  document.getElementById("display").innerText =
    pad(m) + ":" + pad(s) + "." + pad(ms);
}

function pad(n) { return String(n).padStart(2, "0"); }
```

**Self-check questions:**
1. Why do we use `Date.now()` as the source of truth rather than incrementing a counter in `setInterval`?
2. What does `elapsedTime = Date.now() - startTime` save when the user clicks Stop?
3. Why set the interval to 10ms but display only 2 digits of milliseconds?

---

# PHASE 3 — PROJECT SIMULATION

---

## 10. Project Simulation: Interactive Quiz App

### Project Overview

You are a developer at **LearnFast**, an online education platform. You are building a **timed multiple-choice quiz engine** — a single-page app that:

- Presents questions one at a time
- Tracks time per question and total time
- Accepts keyboard shortcuts (number keys 1–4 to answer, Escape to skip)
- Shows animated progress and score tracking
- Validates hover/click interactions with visual feedback
- Ends with a results screen and replay option

---

### Stage 1: Setup & Core Quiz Logic

**Goal:** Display questions, handle answers via mouse click and keyboard.

**Preview micro-example:**

```javascript
var questions = [
  {
    question: "Which keyword declares a variable in modern JavaScript?",
    options: ["var", "let", "dim", "local"],
    correct: 1  // Index of correct answer
  }
];

var currentQuestion = 0;
var score = 0;

function showQuestion() {
  var q = questions[currentQuestion];
  document.getElementById("questionText").innerText = q.question;

  var optionsList = document.getElementById("options");
  optionsList.innerHTML = "";

  q.options.forEach(function(option, index) {
    var li = document.createElement("li");
    li.innerText = (index + 1) + ". " + option;
    li.dataset.index = index;
    li.classList.add("option");
    optionsList.appendChild(li);
  });
}
```

**Milestones:**

- [ ] Array of at least 8 quiz questions with 4 options each and a correct index
- [ ] `showQuestion()` renders the current question
- [ ] Clicking an option: highlights it (green if correct, red if wrong), shows correct answer
- [ ] After 1.5 seconds, auto-advances to the next question
- [ ] Score increments on correct answers
- [ ] **Keyboard shortcut:** pressing `1`, `2`, `3`, or `4` selects the corresponding option
- [ ] **Escape key:** skips the current question (marks as skipped, advances)
- [ ] Progress bar fills proportionally as questions are answered

---

### Stage 2: Timer and Event Delegation

**Goal:** Add per-question time pressure and efficient event handling.

**Preview micro-example — per-question timer:**

```javascript
var timePerQuestion = 15; // seconds
var timeLeft;
var questionTimer;

function startQuestionTimer() {
  timeLeft = timePerQuestion;
  updateTimerDisplay();

  questionTimer = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  var el = document.getElementById("timer");
  el.innerText = timeLeft + "s";
  el.style.color = timeLeft <= 5 ? "red" : "#333";
}

function handleTimeout() {
  // Mark as wrong, show correct answer, then advance
  markAnswerAs("timeout");
  setTimeout(nextQuestion, 1500);
}
```

**Milestones:**

- [ ] 15-second countdown per question, displayed visually
- [ ] Timer turns red when ≤ 5 seconds remain
- [ ] Timer resets for each new question
- [ ] Auto-submits and marks wrong if time runs out
- [ ] Event delegation on the options container — one listener handles all option clicks
- [ ] `mouseover`/`mouseleave` on options for hover styling (without affecting already-answered questions)
- [ ] `beforeunload` warning if quiz is in progress: "Your quiz progress will be lost"

---

### Stage 3: Results and Replay

**Goal:** Show final results with animation, replay capability, and review mode.

**Preview micro-example — building result summary:**

```javascript
function showResults() {
  var percentage = Math.round((score / questions.length) * 100);
  var grade = percentage >= 90 ? "A" :
              percentage >= 80 ? "B" :
              percentage >= 70 ? "C" :
              percentage >= 60 ? "D" : "F";

  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML =
    "<h2>Quiz Complete!</h2>" +
    "<p class='score-display'>" + score + "/" + questions.length + "</p>" +
    "<p>" + percentage + "% — Grade: " + grade + "</p>";

  // Animate score counting up from 0
  var displayScore = 0;
  var counter = setInterval(function() {
    displayScore++;
    document.querySelector(".score-display").innerText =
      displayScore + "/" + questions.length;
    if (displayScore >= score) clearInterval(counter);
  }, 100);
}
```

**Milestones:**

- [ ] Results screen shows score, percentage, grade, and total time taken
- [ ] Score number animates counting up from 0
- [ ] "Review Answers" button shows each question with user's answer vs. correct answer
- [ ] Questions answered correctly shown in green, incorrectly in red, skipped in grey
- [ ] "Try Again" button resets all state and restarts the quiz
- [ ] A confetti animation (using `setInterval` + `createElement`) fires if score ≥ 80%

---

### Complete Project Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LearnFast Quiz Engine</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      background: #f0f2f5;
    }

    #quizCard {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    /* Progress bar */
    #progressBar {
      height: 8px;
      background: #ecf0f1;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    #progressFill {
      height: 100%;
      background: linear-gradient(to right, #3498db, #2ecc71);
      border-radius: 4px;
      transition: width 0.5s ease;
      width: 0%;
    }

    /* Header row */
    .quiz-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    #questionNumber { color: #888; font-size: 0.9em; }
    #score-display { font-weight: bold; color: #2ecc71; }
    #timer {
      font-size: 1.4em;
      font-weight: bold;
      font-family: monospace;
      min-width: 40px;
      text-align: right;
    }

    /* Question */
    #questionText {
      font-size: 1.3em;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    /* Options */
    #options {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    #options li {
      padding: 14px 18px;
      margin-bottom: 10px;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.1s;
      user-select: none;
    }

    #options li:hover:not(.answered) {
      border-color: #3498db;
      background: #eaf4fd;
      transform: translateX(4px);
    }

    #options li.correct {
      border-color: #2ecc71;
      background: #d5f5e3;
    }

    #options li.wrong {
      border-color: #e74c3c;
      background: #fde8e6;
    }

    #options li.reveal {
      border-color: #2ecc71;
      background: #eafaf1;
    }

    #options li.answered { cursor: default; }

    /* Feedback */
    #feedback {
      text-align: center;
      font-size: 1.1em;
      min-height: 28px;
      margin-top: 16px;
      font-weight: bold;
    }

    /* Keyboard hint */
    .keyboard-hint {
      text-align: center;
      color: #aaa;
      font-size: 0.8em;
      margin-top: 12px;
    }

    /* Results */
    #resultsScreen {
      display: none;
      text-align: center;
    }

    .big-score {
      font-size: 72px;
      font-weight: bold;
      color: #3498db;
      margin: 10px 0;
    }

    .grade-badge {
      display: inline-block;
      width: 70px;
      height: 70px;
      line-height: 70px;
      border-radius: 50%;
      font-size: 32px;
      font-weight: bold;
      color: white;
      margin: 10px;
    }

    /* Buttons */
    .btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      margin: 6px;
      transition: transform 0.1s, box-shadow 0.1s;
    }
    .btn:active { transform: scale(0.97); }
    .btn-primary { background: #3498db; color: white; }
    .btn-success { background: #2ecc71; color: white; }
    .btn-secondary { background: #95a5a6; color: white; }

    /* Review */
    #reviewSection { margin-top: 20px; text-align: left; }
    .review-item {
      padding: 12px;
      margin-bottom: 8px;
      border-radius: 6px;
      border: 1px solid #ddd;
    }
    .review-item.correct-review { background: #d5f5e3; border-color: #2ecc71; }
    .review-item.wrong-review   { background: #fde8e6; border-color: #e74c3c; }
    .review-item.skip-review    { background: #f0f0f0; border-color: #ccc; }

    /* Confetti particle */
    .confetti {
      position: fixed;
      width: 10px;
      height: 10px;
      border-radius: 2px;
      pointer-events: none;
      animation: fall 1.5s ease-in forwards;
    }
    @keyframes fall {
      to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
  </style>
</head>
<body>

<div id="quizCard">

  <!-- QUIZ SCREEN -->
  <div id="quizScreen">
    <div id="progressBar"><div id="progressFill"></div></div>

    <div class="quiz-header">
      <span id="questionNumber">Question 1 of 8</span>
      <span id="score-display">Score: 0</span>
      <span id="timer">15s</span>
    </div>

    <p id="questionText">Loading question...</p>

    <ul id="options"></ul>

    <p id="feedback"></p>
    <p class="keyboard-hint">Press 1–4 to answer · ESC to skip</p>
  </div>

  <!-- RESULTS SCREEN -->
  <div id="resultsScreen">
    <h2>🎉 Quiz Complete!</h2>
    <div class="big-score" id="animatedScore">0/8</div>
    <div id="gradeBadge" class="grade-badge">?</div>
    <p id="percentText"></p>
    <p id="timeText"></p>
    <div>
      <button class="btn btn-primary" onclick="replayQuiz()">🔄 Try Again</button>
      <button class="btn btn-secondary" onclick="toggleReview()">📖 Review Answers</button>
    </div>
    <div id="reviewSection"></div>
  </div>
</div>

<script>
// ── DATA ──────────────────────────────────────────────────────────────────────
var questions = [
  {
    q: "What does DOM stand for?",
    options: ["Document Object Model","Display Object Method","Data Output Mode","Dynamic Object Map"],
    correct: 0
  },
  {
    q: "Which method finds an element by its id?",
    options: ["querySelector","getElementsByTagName","getElementById","findElement"],
    correct: 2
  },
  {
    q: "Which event fires instantly on every keystroke?",
    options: ["onchange","onblur","oninput","onkeypress"],
    correct: 2
  },
  {
    q: "What does event.preventDefault() do?",
    options: [
      "Stops the event from bubbling",
      "Stops the browser's default action",
      "Removes the event listener",
      "Cancels all pending timers"
    ],
    correct: 1
  },
  {
    q: "Which function runs code once after a delay?",
    options: ["setInterval","setTimeout","requestAnimationFrame","clearInterval"],
    correct: 1
  },
  {
    q: "What is the correct way to attach multiple handlers to one event?",
    options: [
      "element.onclick = fn1; element.onclick = fn2;",
      "element.on('click', fn1, fn2)",
      "element.addEventListener('click', fn1); element.addEventListener('click', fn2);",
      "element.attachEvent(fn1); element.attachEvent(fn2);"
    ],
    correct: 2
  },
  {
    q: "Which fires ONLY when the mouse enters the element itself (not children)?",
    options: ["mouseover","mouseenter","mousemove","mousedown"],
    correct: 1
  },
  {
    q: "What does event.stopPropagation() do?",
    options: [
      "Prevents the default browser action",
      "Stops the event from reaching parent elements",
      "Removes the event from the queue",
      "Stops all timers"
    ],
    correct: 1
  }
];

// ── STATE ─────────────────────────────────────────────────────────────────────
var currentQ = 0;
var score = 0;
var answered = false;
var timeLeft = 15;
var questionTimer = null;
var quizStartTime = null;
var userAnswers = []; // Stores { selectedIndex, correct, skipped }
var reviewVisible = false;
var gradeColors = { A:"#2ecc71", B:"#27ae60", C:"#f39c12", D:"#e67e22", F:"#e74c3c" };

// ── INIT ──────────────────────────────────────────────────────────────────────
function initQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  userAnswers = [];
  quizStartTime = Date.now();
  document.getElementById("quizScreen").style.display = "block";
  document.getElementById("resultsScreen").style.display = "none";
  showQuestion();
}

// ── SHOW QUESTION ─────────────────────────────────────────────────────────────
function showQuestion() {
  answered = false;
  var q = questions[currentQ];

  document.getElementById("questionText").innerText = q.q;
  document.getElementById("questionNumber").innerText =
    "Question " + (currentQ + 1) + " of " + questions.length;
  document.getElementById("feedback").innerText = "";

  // Progress bar
  document.getElementById("progressFill").style.width =
    (currentQ / questions.length * 100) + "%";

  // Build options
  var ol = document.getElementById("options");
  ol.innerHTML = "";

  q.options.forEach(function(opt, i) {
    var li = document.createElement("li");
    li.innerHTML = "<strong>" + (i + 1) + ".</strong> " + opt;
    li.dataset.index = i;
    ol.appendChild(li);
  });

  startTimer();
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
function startTimer() {
  clearInterval(questionTimer);
  timeLeft = 15;
  updateTimer();

  questionTimer = setInterval(function() {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      handleTimeout();
    }
  }, 1000);
}

function updateTimer() {
  var el = document.getElementById("timer");
  el.innerText = timeLeft + "s";
  el.style.color = timeLeft <= 5 ? "#e74c3c" : "#333";
}

function handleTimeout() {
  if (answered) return;
  answered = true;
  revealAnswer(null, "timeout");
}

// ── EVENT DELEGATION on options list ─────────────────────────────────────────
document.getElementById("options").addEventListener("click", function(event) {
  var li = event.target.closest("li");
  if (!li || answered) return;
  selectAnswer(parseInt(li.dataset.index));
});

// ── KEYBOARD SHORTCUTS ────────────────────────────────────────────────────────
document.addEventListener("keydown", function(event) {
  if (document.getElementById("quizScreen").style.display === "none") return;

  if (!answered && ["1","2","3","4"].includes(event.key)) {
    var idx = parseInt(event.key) - 1;
    if (idx < questions[currentQ].options.length) {
      selectAnswer(idx);
    }
  }

  if (event.key === "Escape" && !answered) {
    answered = true;
    revealAnswer(null, "skipped");
  }
});

// ── ANSWER LOGIC ──────────────────────────────────────────────────────────────
function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  clearInterval(questionTimer);

  var correct = questions[currentQ].correct;
  var isRight = selectedIndex === correct;
  if (isRight) score++;

  userAnswers.push({
    selected: selectedIndex,
    correct: correct,
    skipped: false,
    wasRight: isRight
  });

  revealAnswer(selectedIndex, isRight ? "correct" : "wrong");
}

function revealAnswer(selectedIndex, result) {
  var items = document.querySelectorAll("#options li");
  var correct = questions[currentQ].correct;

  items.forEach(function(li) { li.classList.add("answered"); });

  if (result === "correct") {
    items[selectedIndex].classList.add("correct");
    document.getElementById("feedback").innerHTML =
      '<span style="color:#2ecc71">✓ Correct!</span>';
  } else if (result === "wrong") {
    items[selectedIndex].classList.add("wrong");
    items[correct].classList.add("reveal");
    document.getElementById("feedback").innerHTML =
      '<span style="color:#e74c3c">✗ Wrong.</span> Correct: <strong>' +
      questions[currentQ].options[correct] + '</strong>';
  } else if (result === "timeout") {
    items[correct].classList.add("reveal");
    document.getElementById("feedback").innerHTML =
      '<span style="color:#e67e22">⏱ Time\'s up!</span> Correct: <strong>' +
      questions[currentQ].options[correct] + '</strong>';
    userAnswers.push({ selected: null, correct: correct, skipped: false, wasRight: false });
  } else if (result === "skipped") {
    items[correct].classList.add("reveal");
    document.getElementById("feedback").innerHTML =
      '<span style="color:#95a5a6">⏭ Skipped.</span> Correct: <strong>' +
      questions[currentQ].options[correct] + '</strong>';
    userAnswers.push({ selected: null, correct: correct, skipped: true, wasRight: false });
  }

  document.getElementById("score-display").innerText = "Score: " + score;

  setTimeout(nextQuestion, 1800);
}

// ── ADVANCE ───────────────────────────────────────────────────────────────────
function nextQuestion() {
  currentQ++;
  if (currentQ >= questions.length) {
    showResults();
  } else {
    showQuestion();
  }
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
function showResults() {
  clearInterval(questionTimer);
  document.getElementById("quizScreen").style.display = "none";
  var results = document.getElementById("resultsScreen");
  results.style.display = "block";

  document.getElementById("progressFill").style.width = "100%";

  var totalTime = Math.round((Date.now() - quizStartTime) / 1000);
  var pct = Math.round(score / questions.length * 100);
  var grade = pct >= 90 ? "A" : pct >= 80 ? "B" : pct >= 70 ? "C" : pct >= 60 ? "D" : "F";

  document.getElementById("percentText").innerText = pct + "% — Grade: " + grade;
  document.getElementById("timeText").innerText = "Completed in " + totalTime + " seconds";

  var badge = document.getElementById("gradeBadge");
  badge.innerText = grade;
  badge.style.backgroundColor = gradeColors[grade];

  // Animate score counting up
  var display = 0;
  var counter = setInterval(function() {
    display++;
    document.getElementById("animatedScore").innerText = display + "/" + questions.length;
    if (display >= score) clearInterval(counter);
  }, 120);

  if (pct >= 80) launchConfetti();
}

// ── REVIEW ────────────────────────────────────────────────────────────────────
function toggleReview() {
  reviewVisible = !reviewVisible;
  var section = document.getElementById("reviewSection");

  if (!reviewVisible) {
    section.innerHTML = "";
    return;
  }

  section.innerHTML = "<h3>Answer Review</h3>";

  questions.forEach(function(q, i) {
    var answer = userAnswers[i];
    if (!answer) return;

    var div = document.createElement("div");
    div.className = "review-item " +
      (answer.skipped ? "skip-review" : answer.wasRight ? "correct-review" : "wrong-review");

    var userAnswerText = answer.selected !== null
      ? q.options[answer.selected]
      : (answer.skipped ? "Skipped" : "Timed out");

    div.innerHTML =
      "<strong>Q" + (i+1) + ":</strong> " + q.q + "<br>" +
      "<span>Your answer: <em>" + userAnswerText + "</em></span><br>" +
      (!answer.wasRight
        ? "<span style='color:#2ecc71'>Correct: <em>" + q.options[answer.correct] + "</em></span>"
        : "");

    section.appendChild(div);
  });
}

// ── REPLAY ────────────────────────────────────────────────────────────────────
function replayQuiz() {
  reviewVisible = false;
  document.getElementById("reviewSection").innerHTML = "";
  // Shuffle questions
  questions.sort(function() { return Math.random() - 0.5; });
  initQuiz();
}

// ── CONFETTI ─────────────────────────────────────────────────────────────────
function launchConfetti() {
  var colours = ["#e74c3c","#3498db","#2ecc71","#f1c40f","#9b59b6","#e67e22"];
  var count = 0;
  var burst = setInterval(function() {
    for (var i = 0; i < 5; i++) {
      var dot = document.createElement("div");
      dot.className = "confetti";
      dot.style.left = Math.random() * 100 + "vw";
      dot.style.top = "-10px";
      dot.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
      dot.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      document.body.appendChild(dot);
      setTimeout(function(d) { d.remove(); }, 1600, dot);
    }
    count++;
    if (count >= 10) clearInterval(burst);
  }, 120);
}

// ── BEFOREUNLOAD WARNING ──────────────────────────────────────────────────────
window.addEventListener("beforeunload", function(event) {
  if (currentQ > 0 && currentQ < questions.length &&
      document.getElementById("quizScreen").style.display !== "none") {
    event.preventDefault();
    event.returnValue = "";
  }
});

// ── START ─────────────────────────────────────────────────────────────────────
initQuiz();
</script>

</body>
</html>
```

---

### Reflection Questions

1. **Event delegation is used on the options list.** Why is this better than adding a click listener to each `<li>` individually? What would happen if you needed to dynamically add more options?

2. **Both keyboard and mouse can trigger the same action (answer a question).** How does the code ensure that answering via keyboard does not conflict with a simultaneous mouse click?

3. **The `beforeunload` listener has conditions before showing the warning.** Why are those conditions important? What would the user experience be without them?

4. **The confetti uses `setInterval` with a nested `setTimeout`.** What role does each timer play, and why are both needed?

5. **How would this project change in a real company?** Consider: loading questions from a database, saving progress if the user refreshes, supporting multiple users, tracking analytics per question.

---

### Optional Advanced Features

- [ ] **Difficulty levels:** `easy` (30s), `medium` (15s), `hard` (8s) — selected before quiz starts
- [ ] **Category filter:** Tag each question with a category; let users choose which categories to include
- [ ] **LocalStorage resume:** Save quiz progress so a page refresh can resume from where the user left off
- [ ] **Leaderboard:** Record name + score + time in `localStorage`, show top 5 scores
- [ ] **Sound effects:** Use the Web Audio API to play a short tone on correct/wrong answers
- [ ] **Custom events:** Dispatch a custom `quizComplete` event when finished; have a separate analytics listener handle it

---

# 11. Completion Checklist & Summary

---

## Completion Checklist

| # | Topic | Covered? |
|---|---|---|
| 1 | What events are and the three-part model (element → event → handler) | ✅ |
| 2 | Three ways to register handlers: inline, property, addEventListener | ✅ |
| 3 | All mouse events: click, dblclick, mousedown, mouseup, mousemove | ✅ |
| 4 | `mouseover` vs `mouseenter` — bubbling distinction | ✅ |
| 5 | Mouse coordinates: clientX/Y, pageX/Y, offsetX/Y | ✅ |
| 6 | Mouse button detection and modifier keys (ctrlKey, shiftKey, etc.) | ✅ |
| 7 | Keyboard events: `keydown`, `keyup`, deprecated `keypress` | ✅ |
| 8 | `event.key` vs `event.code` — logical vs physical key | ✅ |
| 9 | Modifier key combinations (Ctrl+S, Shift+Enter, etc.) | ✅ |
| 10 | Preventing default key behaviour | ✅ |
| 11 | Page lifecycle: `DOMContentLoaded` vs `load` vs `beforeunload` vs `unload` | ✅ |
| 12 | Load events on individual resources (img load/error) | ✅ |
| 13 | `resize` and `scroll` with debouncing and throttling | ✅ |
| 14 | `online`/`offline` network events | ✅ |
| 15 | `setTimeout` and `clearTimeout` | ✅ |
| 16 | `setInterval` and `clearInterval` | ✅ |
| 17 | Recursive `setTimeout` pattern | ✅ |
| 18 | Debounce and throttle utility patterns | ✅ |
| 19 | The Event Object: `type`, `target`, `currentTarget`, `timeStamp` | ✅ |
| 20 | `event.target` vs `event.currentTarget` | ✅ |
| 21 | Event bubbling — how events travel up the tree | ✅ |
| 22 | `event.stopPropagation()` and `event.stopImmediatePropagation()` | ✅ |
| 23 | `event.preventDefault()` and which events support it | ✅ |
| 24 | Event delegation — one listener for many elements | ✅ |
| 25 | Event capturing — the other direction of propagation | ✅ |
| 26 | `onchange` vs `oninput` distinction | ✅ |
| 27 | `onfocus` and `onblur` | ✅ |
| 28 | `addEventListener` — full syntax and advantages | ✅ |
| 29 | `removeEventListener` — why named functions are required | ✅ |
| 30 | `{ once: true }` and `{ passive: true }` options | ✅ |
| 31 | `this` in regular functions vs arrow functions in event handlers | ✅ |
| 32 | Custom events with `CustomEvent` and `dispatchEvent` | ✅ |
| 33 | Memory management — removing listeners when done | ✅ |
| 34 | Applied exercises with real-world scenarios | ✅ |
| 35 | Full quiz project using events, timers, delegation, keyboard, and lifecycle events | ✅ |

---

## Common Beginner Errors — Quick Reference

| Mistake | Why it happens | Fix |
|---|---|---|
| `addEventListener("onclick", ...)` — notice the "on" | Mixing property style with addEventListener | Remove "on": use `"click"`, not `"onclick"` |
| Handler fires immediately: `btn.addEventListener("click", fn())` | Called the function instead of passing a reference | Pass reference: `fn`, not `fn()` |
| `removeEventListener` does nothing | Trying to remove an anonymous function | Always use named functions when removal is needed |
| Multiple `setInterval` stacking up | Starting a new interval without clearing the old one | Always `clearInterval(id)` before starting a new one |
| `this` is `undefined` in arrow function handler | Arrow functions don't bind their own `this` | Use regular `function` or use `event.target` |
| `event.key` returns wrong value | Using `keyCode` (deprecated) | Use `event.key` for reliable modern key detection |
| `stopPropagation` breaks unrelated listeners | Stopping bubbling too aggressively | Use event delegation; only stop propagation when truly necessary |
| `DOMContentLoaded` fires too late (after script runs inline) | Script placed at top of `<head>` without `defer` | Move scripts to end of `<body>` or use `defer` attribute |
| `onchange` not firing while typing | Expecting it to fire on every keystroke | Use `oninput` for real-time feedback, `onchange` for final value |
| Double `setInterval` ticking (interval not cleared on re-start) | Start function called twice | Guard with `if (intervalId) return;` or clear first |

---

## One-Sentence Summary

> **JavaScript events transform static pages into interactive experiences — by mastering the three-part model (element → event → handler), the bubbling mechanism, the Event Object, and `addEventListener`'s full capabilities, you gain complete control over every user interaction and browser lifecycle moment.**

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source: W3Schools JavaScript Events series (8 pages) · Format: Markdown*
