---
title: "JavaScript Browser Object Model (BOM): Window · Screen · Location · History · Navigator · Popups · Timing · Cookies"
nav_order: 39
---

> **How to use this tutorial**
> The Browser Object Model (BOM) is JavaScript's interface to the browser itself — everything outside the HTML document. It controls the window size, the URL in the address bar, navigation history, the user's device info, alerts and dialogs, timers, and persistent cookie storage. These are the APIs that make web applications feel like real software.
>
> - **Phase 1 – Comprehension:** Full explanations, every property and method demonstrated, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project combining all eight chapters

---

# TABLE OF CONTENTS
1. [Chapter 1 — The Window Object](#chapter-1--the-window-object)
2. [Chapter 2 — The Screen Object](#chapter-2--the-screen-object)
3. [Chapter 3 — The Location Object](#chapter-3--the-location-object)
4. [Chapter 4 — The History Object](#chapter-4--the-history-object)
5. [Chapter 5 — The Navigator Object](#chapter-5--the-navigator-object)
6. [Chapter 6 — Popup Boxes](#chapter-6--popup-boxes)
7. [Chapter 7 — Timing Events](#chapter-7--timing-events)
8. [Chapter 8 — Cookies](#chapter-8--cookies)
9. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
10. [Phase 3 — Project Simulation](#phase-3--project-simulation)
11. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — THE WINDOW OBJECT

## What Is the Window Object?

The **`window`** object is the global object of the browser environment. It represents the browser window (or tab) that your JavaScript is running in. Every global variable, every global function, and every built-in browser API is a property of `window`.

**Real-world analogy — the operating system desktop:**
The `window` object is like a computer's desktop environment. Every application (your scripts), every file (your variables), and every system tool (alerts, timers, location) exists within it. Just as you don't need to say "desktop.calculator" to open the calculator — you just click it — in JavaScript you don't need to write `window.alert()`, you can just write `alert()`.

---

## 1.1 — `window` Is the Global Object

Every global variable and function automatically becomes a property of `window`:

```js
// These are all equivalent:
var myVar = 42;
console.log(myVar);           // Output: 42
console.log(window.myVar);    // Output: 42  ← same thing

function greet() { return "Hello"; }
console.log(greet());         // Output: Hello
console.log(window.greet());  // Output: Hello  ← same thing

// Built-in globals are also window properties:
console.log(window.document === document);   // Output: true
console.log(window.console  === console);    // Output: true
console.log(window.Math     === Math);       // Output: true
console.log(window.JSON     === JSON);       // Output: true
```

> ⚠️ **`let` and `const` do NOT attach to `window`.** Only `var` declarations at global scope become properties of `window`. Variables declared with `let` or `const` are global in scope but not properties of the global object.

```js
var   a = 1;  console.log(window.a);  // Output: 1     ← attached
let   b = 2;  console.log(window.b);  // Output: undefined
const c = 3;  console.log(window.c);  // Output: undefined
```

---

## 1.2 — Window Size Properties

These tell you the dimensions of the visible browser viewport (the area where the web page is rendered):

```js
// Inner dimensions — the viewport (excluding toolbars, scrollbars):
console.log(window.innerWidth);    // e.g., Output: 1280  (pixels)
console.log(window.innerHeight);   // e.g., Output: 720   (pixels)

// Outer dimensions — the entire browser window including chrome:
console.log(window.outerWidth);    // e.g., Output: 1360
console.log(window.outerHeight);   // e.g., Output: 840
```

| Property | What it measures |
|---|---|
| `innerWidth` | Width of the viewport (content area) |
| `innerHeight` | Height of the viewport (content area) |
| `outerWidth` | Width of the entire browser window |
| `outerHeight` | Height of the entire browser window |

**Real-world use — responsive JavaScript:**

```js
function checkLayout() {
  if (window.innerWidth < 768) {
    document.body.classList.add("mobile");
    document.body.classList.remove("desktop");
  } else {
    document.body.classList.add("desktop");
    document.body.classList.remove("mobile");
  }
}

window.addEventListener("resize", checkLayout);
checkLayout();   // Run on load too
```

---

## 1.3 — Window Position and Scrolling

```js
// Position of the window on the screen:
console.log(window.screenX);   // Pixels from left of screen
console.log(window.screenY);   // Pixels from top of screen

// How far the page has been scrolled:
console.log(window.scrollX);   // Horizontal scroll position
console.log(window.scrollY);   // Vertical scroll position

// Scroll to a specific position:
window.scrollTo(0, 500);        // Scroll to x=0, y=500 pixels from top

// Scroll by a relative amount:
window.scrollBy(0, 100);        // Scroll down 100px from current position

// Smooth scroll to top:
window.scrollTo({ top: 0, behavior: "smooth" });

// Scroll to a specific element:
document.getElementById("section-3").scrollIntoView({ behavior: "smooth" });
```

---

## 1.4 — Opening and Closing Windows

```js
// Open a new window or tab:
const newWindow = window.open(
  "https://example.com",  // URL
  "_blank",               // Target: "_blank" = new tab, "_self" = same tab
  "width=600,height=400"  // Window features (only relevant for popup windows)
);

// Close the opened window programmatically:
newWindow.close();

// Close the current window (only works if JS opened it):
window.close();
```

**Window features string:**

```js
const popup = window.open(
  "https://example.com",
  "myPopup",
  "width=800,height=600,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no"
);
```

> ⚠️ **Most browsers block `window.open()` unless triggered by a user action** (a click, key press, etc.). Calling it on page load or in a `setTimeout` will usually be blocked by the browser's popup blocker.

---

## 1.5 — Resizing and Moving Windows

```js
// Resize the window to a specific size:
window.resizeTo(1024, 768);

// Resize by a relative amount:
window.resizeBy(100, 50);

// Move the window to a specific screen position:
window.moveTo(0, 0);

// Move by a relative amount:
window.moveBy(50, 50);
```

> ⚠️ These methods only work on windows **opened by JavaScript** (`window.open()`). They have no effect on the main browser tab.

---

## 1.6 — Key `window` Properties Summary

| Property / Method | Description |
|---|---|
| `window.innerWidth / innerHeight` | Viewport dimensions |
| `window.outerWidth / outerHeight` | Full browser window dimensions |
| `window.screenX / screenY` | Window position on screen |
| `window.scrollX / scrollY` | Current scroll offset |
| `window.document` | The DOM document |
| `window.location` | Current URL (Chapter 3) |
| `window.history` | Navigation history (Chapter 4) |
| `window.navigator` | Browser/device info (Chapter 5) |
| `window.screen` | Screen info (Chapter 2) |
| `window.localStorage` | Persistent local storage |
| `window.sessionStorage` | Session storage |
| `window.open()` | Open new window/tab |
| `window.close()` | Close current window |
| `window.alert/confirm/prompt()` | Dialog boxes (Chapter 6) |
| `window.setTimeout/setInterval()` | Timers (Chapter 7) |
| `window.scrollTo/scrollBy()` | Control scroll position |
| `window.print()` | Open print dialog |

---

## 1.7 — `window.print()`

```js
// Open the browser's print dialog:
document.getElementById("print-btn").addEventListener("click", () => {
  window.print();
});
```

---

---

# CHAPTER 2 — THE SCREEN OBJECT

---

## What Is the Screen Object?

The **`window.screen`** object contains information about the user's **physical screen** (the monitor or display), not the browser window. This is useful for responsive design decisions, full-screen applications, and understanding the display environment.

---

## 2.1 — Screen Dimensions

```js
// Total screen size (the physical monitor):
console.log(screen.width);         // e.g., Output: 1920
console.log(screen.height);        // e.g., Output: 1080

// Available screen area (excluding taskbar, dock, etc.):
console.log(screen.availWidth);    // e.g., Output: 1920
console.log(screen.availHeight);   // e.g., Output: 1040  (1080 - 40px taskbar)
```

**The difference between screen and available screen:**

```
┌─────────────────────────────────────┐ ← screen.height (e.g., 1080px)
│                                     │
│         Browser / App Area          │ ← screen.availHeight (e.g., 1040px)
│                                     │
├─────────────────────────────────────┤
│         Taskbar / Dock              │ ← taken by OS (40px)
└─────────────────────────────────────┘
```

---

## 2.2 — Color Depth and Pixel Depth

```js
// Bits used to represent colour per pixel:
console.log(screen.colorDepth);   // Output: 24  (standard 24-bit colour)
console.log(screen.pixelDepth);   // Output: 24  (almost always same as colorDepth)
```

| Value | Colours Available | Name |
|---|---|---|
| 8 | 256 | Indexed colour |
| 16 | 65,536 | High colour |
| 24 | 16,777,216 | True colour (standard today) |
| 32 | 4,294,967,296 | True colour + alpha |

---

## 2.3 — Screen Orientation

```js
// The Screen Orientation API:
console.log(screen.orientation.type);   // e.g., "landscape-primary"
// Possible values: "portrait-primary", "portrait-secondary",
//                 "landscape-primary", "landscape-secondary"

// Lock orientation (mobile — requires fullscreen):
screen.orientation.lock("portrait").catch(err => {
  console.log("Orientation lock failed:", err.message);
});

// Listen for orientation changes:
screen.orientation.addEventListener("change", () => {
  console.log("Orientation changed to:", screen.orientation.type);
});
```

---

## 2.4 — Practical Uses of Screen Data

```js
function getDeviceClass() {
  const w = screen.width;
  if (w < 480)  return "phone";
  if (w < 1024) return "tablet";
  return "desktop";
}

function centerWindow(width, height) {
  const left = Math.round((screen.availWidth  - width)  / 2);
  const top  = Math.round((screen.availHeight - height) / 2);
  return `width=${width},height=${height},left=${left},top=${top}`;
}

const popup = window.open(
  "https://example.com/login",
  "login",
  centerWindow(500, 600)
);
```

---

---

# CHAPTER 3 — THE LOCATION OBJECT

---

## What Is the Location Object?

The **`window.location`** object represents the current URL in the browser's address bar. It lets you read every part of the URL separately, redirect the browser to a new URL, reload the page, and even modify the URL without triggering a navigation (for single-page apps).

**Real-world analogy — a postal address:**
A URL like `https://shop.example.com:8080/products/shoes?size=42&color=red#reviews` is like a detailed postal address where each part has a specific meaning. `location` is the system that can read each part independently or let you rewrite the whole address.

---

## 3.1 — URL Anatomy and Location Properties

```
https://shop.example.com:8080/products/shoes?size=42&color=red#reviews
│      │                  │   │               │                 │
│      └── hostname        │   └── pathname    └── search        └── hash
└── protocol              └── port
```

```js
// Full URL: https://shop.example.com:8080/products/shoes?size=42&color=red#reviews

console.log(location.href);      // "https://shop.example.com:8080/products/shoes?size=42&color=red#reviews"
console.log(location.protocol);  // "https:"
console.log(location.host);      // "shop.example.com:8080"  (hostname + port)
console.log(location.hostname);  // "shop.example.com"  (without port)
console.log(location.port);      // "8080"
console.log(location.pathname);  // "/products/shoes"
console.log(location.search);    // "?size=42&color=red"
console.log(location.hash);      // "#reviews"
console.log(location.origin);    // "https://shop.example.com:8080"
```

---

## 3.2 — Redirecting with `location.href` and `location.assign()`

**Method 1 — set `location.href`:**

```js
// Navigate to a new page:
location.href = "https://www.example.com";

// Relative navigation:
location.href = "/dashboard";

// Navigate within the same site:
location.href = location.origin + "/checkout";
```

**Method 2 — `location.assign(url)`:**

```js
// Identical effect to setting href — keeps history entry:
location.assign("https://www.example.com/login");
```

Both of these add an entry to the browser history (user can press Back to return).

---

## 3.3 — `location.replace()` — Navigate Without History

`replace()` navigates to a new URL but **replaces** the current history entry — the user cannot press Back to return:

```js
// Use case: redirect after login (don't want user to go "back" to login page)
location.replace("/dashboard");

// Use case: redirect from old URL to new URL
if (location.pathname === "/old-page") {
  location.replace("/new-page");
}
```

| Method | Adds to history? | User can go Back? |
|---|---|---|
| `location.href = url` | ✅ Yes | ✅ Yes |
| `location.assign(url)` | ✅ Yes | ✅ Yes |
| `location.replace(url)` | ❌ No (replaces) | ❌ No |

---

## 3.4 — Reloading the Page with `location.reload()`

```js
// Reload the current page:
location.reload();

// Force reload from server (bypass cache):
location.reload(true);   // Note: the parameter is non-standard and ignored in modern browsers
```

---

## 3.5 — Working with Query String Parameters

```js
// Parse query string parameters with URLSearchParams:
// URL: /search?query=javascript&sort=recent&page=2

const params = new URLSearchParams(location.search);

console.log(params.get("query"));   // Output: javascript
console.log(params.get("sort"));    // Output: recent
console.log(params.get("page"));    // Output: 2  (string, not number)
console.log(params.get("missing")); // Output: null

// Check if a parameter exists:
console.log(params.has("query"));   // Output: true

// Iterate all parameters:
params.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
// Output:
// query: javascript
// sort: recent
// page: 2

// Build a new query string:
const newParams = new URLSearchParams({ topic: "dom", level: "advanced" });
const newUrl = location.pathname + "?" + newParams.toString();
console.log(newUrl);   // Output: /search?topic=dom&level=advanced
```

---

## 3.6 — The Hash Fragment

```js
// Read the current hash (anchor):
console.log(location.hash);   // e.g., "#section-2"

// Change the hash without full page reload:
location.hash = "#contact";   // Scrolls to element with id="contact"

// Listen for hash changes:
window.addEventListener("hashchange", () => {
  const section = location.hash.slice(1);   // Remove the "#"
  console.log("Navigated to section:", section);
  loadContent(section);   // Simple SPA router
});
```

---

## 3.7 — `history.pushState()` for SPA URL Management

For single-page applications, you can update the URL without any navigation:

```js
// Change URL to /products/42 without reloading:
history.pushState(
  { productId: 42 },   // State object (available in popstate handler)
  "",                  // Title (mostly ignored by browsers)
  "/products/42"       // New URL
);

console.log(location.pathname);   // Output: /products/42  (URL updated!)
// Page did NOT reload — this is client-side routing
```

---

---

# CHAPTER 4 — THE HISTORY OBJECT

---

## What Is the History Object?

The **`window.history`** object provides access to the browser's navigation history for the current session. You can move forward and backward through the history stack, and in modern browsers, you can also add or modify history entries without triggering a page load.

---

## 4.1 — History Length

```js
console.log(history.length);   // Output: e.g., 5 (entries in the history stack)
```

---

## 4.2 — Navigating the History Stack

```js
// Go back one page (same as clicking the browser Back button):
history.back();

// Go forward one page (same as clicking the browser Forward button):
history.forward();

// Go a specific number of steps back or forward:
history.go(-1);    // One step back (same as back())
history.go(-2);    // Two steps back
history.go(1);     // One step forward (same as forward())
history.go(0);     // Reload current page
```

**Practical use — custom back button:**

```js
document.getElementById("back-btn").addEventListener("click", () => {
  if (history.length > 1) {
    history.back();
  } else {
    location.href = "/home";   // No history — go to home
  }
});
```

---

## 4.3 — `pushState()` — Add to History Without Navigation

`history.pushState(state, title, url)` adds a new entry to the history stack and updates the address bar URL — without loading a new page. This is the foundation of all single-page application (SPA) routers.

```js
// Navigate to a "virtual" page:
history.pushState(
  { page: "about" },  // State: any serialisable data
  "About Us",         // Title: usually ignored by browsers
  "/about"            // URL: what the address bar should show
);

// Navigation to /about happened "virtually":
console.log(location.pathname);  // Output: /about
// But the page did NOT reload — the DOM is unchanged
```

**Handling the state when user presses Back:**

```js
window.addEventListener("popstate", function(event) {
  console.log("User navigated back/forward");
  console.log("State:", event.state);   // The state object you pushed

  if (event.state && event.state.page) {
    renderPage(event.state.page);   // Re-render the correct view
  }
});
```

---

## 4.4 — `replaceState()` — Modify Current History Entry

`history.replaceState(state, title, url)` updates the current history entry (and URL) without adding a new one:

```js
// Update URL to reflect current filter without creating a new history entry:
function applyFilter(category) {
  const url = `/products?category=${category}`;
  history.replaceState({ category }, "", url);
  renderProducts(category);
}
```

| Method | History entries | Use when |
|---|---|---|
| `pushState()` | Adds new entry | User should be able to press Back |
| `replaceState()` | Modifies current entry | URL should update without new Back entry |
| `location.assign()` | Adds new entry + navigates | Full page navigation with Back support |
| `location.replace()` | Replaces current + navigates | Full page navigation without Back |

---

## 4.5 — A Minimal SPA Router

```js
const routes = {
  "/":        () => "<h1>Home</h1>",
  "/about":   () => "<h1>About</h1>",
  "/contact": () => "<h1>Contact</h1>"
};

function navigate(path) {
  const render = routes[path] || (() => "<h1>404 Not Found</h1>");
  document.getElementById("app").innerHTML = render();
  history.pushState({ path }, "", path);
}

// Handle browser back/forward:
window.addEventListener("popstate", e => {
  const path = e.state?.path ?? location.pathname;
  const render = routes[path] || (() => "<h1>404 Not Found</h1>");
  document.getElementById("app").innerHTML = render();
});

// Intercept internal links:
document.addEventListener("click", e => {
  const link = e.target.closest("a[href]");
  if (link && link.origin === location.origin) {
    e.preventDefault();
    navigate(link.pathname);
  }
});

// Initial render:
navigate(location.pathname);
```

> 🤔 **Thinking question:** Why must you listen for `popstate` separately from `pushState`? Does `pushState` fire a `popstate` event?

---

---

# CHAPTER 5 — THE NAVIGATOR OBJECT

---

## What Is the Navigator Object?

The **`window.navigator`** object contains information about the browser and the device it's running on. It's your JavaScript window into the user's environment — what browser they're using, what platform they're on, whether they're online, and which hardware capabilities their device has.

---

## 5.1 — Browser Identification

```js
// Full user-agent string (less useful nowadays — often spoofed):
console.log(navigator.userAgent);
// e.g., "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."

// Application name (usually "Netscape" for historical reasons — useless):
console.log(navigator.appName);     // Output: Netscape

// Application code name (always "Mozilla" — useless):
console.log(navigator.appCodeName); // Output: Mozilla

// Browser version string (complex, not reliable):
console.log(navigator.appVersion);

// Browser name from Brands API (modern, reliable):
if (navigator.userAgentData) {
  navigator.userAgentData.brands.forEach(b => {
    console.log(b.brand, b.version);
  });
  console.log("Mobile:", navigator.userAgentData.mobile);
}
```

> ⚠️ **Do not use `userAgent` for browser detection in new code.** The User-Agent string is frequently spoofed, notoriously unreliable, and hard to parse correctly. Use **feature detection** instead — check whether a capability exists rather than which browser is being used.

```js
// ❌ Bad — browser detection:
if (navigator.userAgent.includes("Chrome")) {
  doChromeThing();
}

// ✅ Good — feature detection:
if ("geolocation" in navigator) {
  doGeolocationThing();
}

if (typeof IntersectionObserver !== "undefined") {
  setupLazyLoading();
}
```

---

## 5.2 — Language and Locale

```js
// User's preferred language:
console.log(navigator.language);     // e.g., "en-US", "fr-FR", "zh-CN"

// All preferred languages (ordered by preference):
console.log(navigator.languages);    // e.g., ["en-US", "en", "fr"]
```

**Using language for i18n:**

```js
function getPreferredLocale() {
  return navigator.language || navigator.languages[0] || "en-US";
}

function formatPrice(amount) {
  return new Intl.NumberFormat(getPreferredLocale(), {
    style:    "currency",
    currency: "USD"
  }).format(amount);
}

console.log(formatPrice(1234.56));   // Output depends on locale
// en-US: "$1,234.56"
// fr-FR: "1 234,56 $US"
```

---

## 5.3 — Online / Offline Status

```js
console.log(navigator.onLine);   // Output: true  (if connected)

// Listen for connection changes:
window.addEventListener("online", () => {
  console.log("Connection restored!");
  document.getElementById("status").textContent = "Online";
  syncPendingData();
});

window.addEventListener("offline", () => {
  console.log("Connection lost.");
  document.getElementById("status").textContent = "Offline — changes will sync when reconnected";
});
```

---

## 5.4 — Geolocation API

```js
// Check if geolocation is available:
if (!("geolocation" in navigator)) {
  console.log("Geolocation is not supported.");
}

// Get current position:
navigator.geolocation.getCurrentPosition(
  function(position) {
    const { latitude, longitude, accuracy } = position.coords;
    console.log(`Lat: ${latitude}, Lon: ${longitude}, Accuracy: ±${accuracy}m`);
  },
  function(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied geolocation request.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information unavailable.");
        break;
      case error.TIMEOUT:
        console.log("Location request timed out.");
        break;
    }
  },
  {
    enableHighAccuracy: true,   // GPS-level accuracy (battery cost)
    timeout:            10000,  // Max milliseconds to wait
    maximumAge:         0       // Don't use cached position
  }
);

// Watch position continuously (e.g., for turn-by-turn navigation):
const watchId = navigator.geolocation.watchPosition(
  position => updateMapPosition(position.coords),
  error => console.error("Watch error:", error.message)
);

// Stop watching:
navigator.geolocation.clearWatch(watchId);
```

---

## 5.5 — Platform and Hardware

```js
// Operating system / CPU platform:
console.log(navigator.platform);          // e.g., "Win32", "MacIntel", "Linux x86_64"

// CPU cores (hardware concurrency):
console.log(navigator.hardwareConcurrency); // e.g., 8  (logical CPU cores)
// Used for deciding how many Web Workers to spawn

// Device memory (GB, approximate):
console.log(navigator.deviceMemory);       // e.g., 8  (GB)
// Low values (<= 1) suggest adjusting content quality
```

---

## 5.6 — Cookie and Java Enabled

```js
console.log(navigator.cookieEnabled);  // Output: true/false
// Use before trying to set cookies
```

---

## 5.7 — The Clipboard API

```js
// Copy text to clipboard (modern API):
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard!");
  } catch (err) {
    console.error("Copy failed:", err);
  }
}

// Paste text from clipboard:
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("Pasted:", text);
    return text;
  } catch (err) {
    console.error("Paste failed:", err.message);
    return null;
  }
}
```

---

## 5.8 — Service Worker Registration

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(registration => {
      console.log("Service Worker registered, scope:", registration.scope);
    })
    .catch(error => {
      console.error("Service Worker registration failed:", error);
    });
}
```

---

---

# CHAPTER 6 — POPUP BOXES

---

## What Are Browser Popup Dialogs?

JavaScript provides three built-in dialog methods that display popup boxes to the user. They are **blocking** — the entire page freezes until the user responds. They appear as native OS dialogs (not styled HTML).

> ⚠️ **Use popups sparingly.** Native dialogs block all JavaScript execution, cannot be styled to match your site's design, and are widely considered bad UX. For modern applications, use custom modal dialogs built with HTML/CSS instead. However, understanding the built-in ones is essential — they're still used for quick debugging, simple confirmations, and development tools.

---

## 6.1 — `alert()` — Display a Message

Shows a dialog with a message and an OK button. Returns `undefined`.

```js
alert("Your session has expired. Please log in again.");

// With window prefix (identical):
window.alert("File saved successfully.");
```

**Use cases:** Debugging quick values, displaying critical non-interactive messages.

---

## 6.2 — `confirm()` — Ask a Yes/No Question

Shows a dialog with a message and OK / Cancel buttons. Returns `true` (OK) or `false` (Cancel):

```js
const confirmed = confirm("Are you sure you want to delete this item? This cannot be undone.");

if (confirmed) {
  deleteItem();
  console.log("Item deleted.");
} else {
  console.log("Deletion cancelled.");
}
```

**Micro-demo — chaining confirms:**

```js
function logout() {
  if (confirm("Log out of your account?")) {
    if (confirm("Save your work first?")) {
      saveWork();
    }
    performLogout();
  }
}
```

---

## 6.3 — `prompt()` — Ask for User Input

Shows a dialog with a text input field. Returns the typed string, or `null` if the user cancels:

```js
const name = prompt("What is your name?");

if (name === null) {
  console.log("User cancelled the prompt.");
} else if (name.trim() === "") {
  console.log("User entered nothing.");
} else {
  console.log("Hello, " + name + "!");
}
```

**With a default value:**

```js
const city = prompt("Enter your city:", "London");
// "London" is pre-filled in the input field
```

> ⚠️ **Always check for `null` from `prompt()`.** If the user presses Cancel (or Escape), `prompt` returns `null` — not an empty string. Calling `.trim()` on `null` throws a TypeError.

```js
// Safe pattern:
const input = prompt("Enter a number:");
if (input !== null) {
  const num = parseFloat(input);
  if (!isNaN(num)) {
    console.log("You entered:", num);
  }
}
```

---

## 6.4 — Why Build Custom Modals Instead

```js
// Custom confirm dialog — styled, non-blocking, fully controllable:
function customConfirm(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal">
        <p>${message}</p>
        <button id="modal-ok">OK</button>
        <button id="modal-cancel">Cancel</button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector("#modal-ok").addEventListener("click", () => {
      overlay.remove();
      resolve(true);
    });
    overlay.querySelector("#modal-cancel").addEventListener("click", () => {
      overlay.remove();
      resolve(false);
    });
  });
}

// Usage:
const confirmed = await customConfirm("Delete this file?");
if (confirmed) deleteFile();
```

---

---

# CHAPTER 7 — TIMING EVENTS

---

## What Are Timing Events?

JavaScript's timing functions schedule code to run in the future — either once after a delay, or repeatedly at intervals. They are the foundation of animations, polling, auto-save, debouncing, rate limiting, and every other time-based feature in web development.

> 💡 **Timers are asynchronous.** They are handed off to the browser's Web API layer and run via the event loop. The delay is a *minimum* — not a guarantee. If the call stack is busy, the callback waits in the queue.

---

## 7.1 — `setTimeout()` — Execute Once After a Delay

```js
const timerId = setTimeout(function() {
  console.log("This runs after 2 seconds");
}, 2000);

// Cancel before it fires:
clearTimeout(timerId);
```

**Passing arguments:**

```js
function greet(name, greeting) {
  console.log(`${greeting}, ${name}!`);
}

setTimeout(greet, 1000, "Alice", "Good morning");
// After 1 second → Output: Good morning, Alice!
```

---

## 7.2 — `setInterval()` — Execute Repeatedly

```js
let count = 0;
const intervalId = setInterval(function() {
  count++;
  console.log("Tick", count);
  if (count >= 5) {
    clearInterval(intervalId);
    console.log("Done!");
  }
}, 1000);
```

---

## 7.3 — `clearTimeout()` and `clearInterval()`

```js
// Always store the ID if you might need to cancel:
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("visible");

  clearTimeout(toastTimer);   // Cancel any previous hide-toast timer

  toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 3000);
}
```

---

## 7.4 — Common Timing Patterns

**Debounce — wait for the user to stop:**

```js
function debounce(fn, delay) {
  let timerId = null;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn.apply(this, args), delay);
  };
}

const debouncedSearch = debounce(function(query) {
  console.log("Searching for:", query);
  fetchResults(query);
}, 400);

document.getElementById("search-input").addEventListener("input", e => {
  debouncedSearch(e.target.value);
});
```

**Throttle — execute at most once per interval:**

```js
function throttle(fn, interval) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= interval) {
      lastRun = now;
      fn.apply(this, args);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
}, 100);   // At most once every 100ms

window.addEventListener("scroll", throttledScroll);
```

**Countdown timer:**

```js
function startCountdown(seconds, onTick, onComplete) {
  let remaining = seconds;

  onTick(remaining);

  const id = setInterval(() => {
    remaining--;
    onTick(remaining);

    if (remaining <= 0) {
      clearInterval(id);
      onComplete();
    }
  }, 1000);

  return id;   // Return id so caller can cancel if needed
}

startCountdown(
  10,
  seconds => document.getElementById("timer").textContent = seconds,
  ()      => document.getElementById("timer").textContent = "Time's up!"
);
```

**Polling — check for updates periodically:**

```js
let pollId = null;

function startPolling(url, interval = 5000) {
  async function check() {
    try {
      const res  = await fetch(url);
      const data = await res.json();
      updateUI(data);
    } catch (e) {
      console.warn("Poll failed:", e.message);
    }
  }

  check();   // Run immediately
  pollId = setInterval(check, interval);
}

function stopPolling() {
  clearInterval(pollId);
  pollId = null;
}

startPolling("/api/notifications");
```

**Recursive `setTimeout` — preferred over `setInterval` for async work:**

```js
function scheduleCheck() {
  setTimeout(async () => {
    await doWork();
    scheduleCheck();  // Only schedule next after current completes
  }, 5000);
}

scheduleCheck();
```

---

## 7.5 — `requestAnimationFrame()` — Animation Timing

For smooth animations, use `requestAnimationFrame` instead of `setInterval`:

```js
let position = 0;
const box = document.getElementById("moving-box");

function animate(timestamp) {
  position += 2;
  box.style.left = position + "px";

  if (position < 400) {
    requestAnimationFrame(animate);   // Request next frame
  }
}

requestAnimationFrame(animate);   // Start animation

// Cancel:
const frameId = requestAnimationFrame(animate);
cancelAnimationFrame(frameId);
```

`requestAnimationFrame` runs at the display's refresh rate (typically 60fps), pauses when the tab is not visible, and is far more battery-efficient than `setInterval` for animations.

---

---

# CHAPTER 8 — COOKIES

---

## What Are Cookies?

**Cookies** are small pieces of text data that a website stores on the user's computer via the browser. They are automatically sent back to the server with every HTTP request to that domain, making them the traditional mechanism for sessions, preferences, and tracking.

**Real-world analogy — a loyalty card:**
When you visit a store, they give you a loyalty card with your customer number. Every time you return, you show the card — the store immediately knows who you are, your preferences, and your purchase history. A cookie is your browser's "loyalty card" for a website.

---

## 8.1 — The `document.cookie` Interface

Cookie access in JavaScript uses a deliberately odd interface — the `document.cookie` property both reads and writes, but behaves differently in each direction:

```js
// Reading: returns ALL cookies as a single string:
console.log(document.cookie);
// Output: "username=Alice; theme=dark; sessionId=abc123"

// Writing: sets ONE cookie (does NOT overwrite all others):
document.cookie = "username=Bob";
console.log(document.cookie);
// Output: "username=Bob; theme=dark; sessionId=abc123"
// ↑ Only username changed — other cookies unaffected
```

> ⚠️ **This is counterintuitive.** Assigning to `document.cookie` does not replace the entire cookie string — it adds or updates a single cookie. This confuses almost every beginner.

---

## 8.2 — Cookie Attributes

A cookie is more than just a name and value. It has attributes that control its lifetime, visibility, and security:

```js
// Full cookie syntax:
document.cookie = "name=value; expires=DATE; path=/; domain=example.com; Secure; SameSite=Strict";
```

| Attribute | Meaning |
|---|---|
| `name=value` | The cookie data (required) |
| `expires=DATE` | When the cookie expires (GMT string); if omitted, it's a session cookie |
| `max-age=SECONDS` | Lifetime in seconds from now (overrides `expires`) |
| `path=/` | Which URL paths the cookie applies to |
| `domain=example.com` | Which domains can access the cookie |
| `Secure` | Only sent over HTTPS |
| `HttpOnly` | Cannot be accessed by JavaScript (server-set only) |
| `SameSite=Strict/Lax/None` | Cross-site cookie behaviour |

---

## 8.3 — Setting a Cookie

```js
function setCookie(name, value, daysToExpire) {
  let cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  if (daysToExpire) {
    const expires = new Date();
    expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    cookieStr += "; expires=" + expires.toUTCString();
  }

  cookieStr += "; path=/";   // Accessible from all paths on the domain
  document.cookie = cookieStr;
}

// Set a cookie that expires in 30 days:
setCookie("theme", "dark", 30);

// Set a session cookie (expires when browser closes):
setCookie("temp_token", "xyz789");

// Set a cookie with max-age:
document.cookie = "preference=compact; max-age=3600; path=/";
// Expires in 3600 seconds (1 hour)
```

---

## 8.4 — Reading a Cookie

Since `document.cookie` returns all cookies as one long string, you need to parse it:

```js
function getCookie(name) {
  const cookieName = encodeURIComponent(name) + "=";
  const cookies    = document.cookie.split("; ");

  for (const cookie of cookies) {
    if (cookie.startsWith(cookieName)) {
      return decodeURIComponent(cookie.slice(cookieName.length));
    }
  }
  return null;   // Cookie not found
}

console.log(getCookie("theme"));       // Output: dark
console.log(getCookie("nonExistent")); // Output: null
```

---

## 8.5 — Deleting a Cookie

JavaScript cannot directly delete a cookie. The trick is to set its expiry to a date in the past:

```js
function deleteCookie(name) {
  // Set expiry to epoch (1 Jan 1970) — browser immediately discards it:
  document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

deleteCookie("theme");
console.log(getCookie("theme"));   // Output: null  ← gone
```

> ⚠️ **Cookie deletion requires matching `path` and `domain`.** If you set a cookie with `path=/admin`, you must delete it with `path=/admin` too. A delete with `path=/` will NOT remove a cookie set with `path=/admin`.

---

## 8.6 — A Complete Cookie Manager

```js
const CookieManager = {
  set(name, value, options = {}) {
    const {
      days    = null,
      path    = "/",
      domain  = "",
      secure  = location.protocol === "https:",
      sameSite = "Lax"
    } = options;

    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (days !== null) {
      const d = new Date();
      d.setTime(d.getTime() + days * 86400000);
      cookie += `; expires=${d.toUTCString()}`;
    }

    cookie += `; path=${path}`;
    if (domain)   cookie += `; domain=${domain}`;
    if (secure)   cookie += "; Secure";
    cookie += `; SameSite=${sameSite}`;

    document.cookie = cookie;
  },

  get(name) {
    const key   = encodeURIComponent(name) + "=";
    const found = document.cookie.split("; ").find(c => c.startsWith(key));
    return found ? decodeURIComponent(found.slice(key.length)) : null;
  },

  delete(name, path = "/") {
    this.set(name, "", { days: -1, path });
  },

  exists(name) {
    return this.get(name) !== null;
  },

  getAll() {
    if (!document.cookie) return {};
    return document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, ...valueParts] = cookie.split("=");
      acc[decodeURIComponent(key)] = decodeURIComponent(valueParts.join("="));
      return acc;
    }, {});
  },

  deleteAll() {
    Object.keys(this.getAll()).forEach(name => this.delete(name));
  }
};

// Usage:
CookieManager.set("username", "Alice", { days: 7 });
CookieManager.set("theme",    "dark",  { days: 365 });

console.log(CookieManager.get("username"));   // Output: Alice
console.log(CookieManager.getAll());
// Output: { username: 'Alice', theme: 'dark' }

CookieManager.delete("username");
console.log(CookieManager.exists("username")); // Output: false
```

---

## 8.7 — Cookies vs localStorage vs sessionStorage

| Feature | Cookies | localStorage | sessionStorage |
|---|---|---|---|
| Size limit | ~4KB per cookie | ~5–10MB | ~5–10MB |
| Sent to server | ✅ With every request | ❌ Never | ❌ Never |
| Expiry | Configurable | Never (manual clear) | Tab/session close |
| Accessible in JS | ✅ (unless HttpOnly) | ✅ | ✅ |
| Cross-tab | ✅ | ✅ | ❌ |
| Security features | HttpOnly, Secure, SameSite | None | None |
| Best for | Sessions, auth, server communication | User preferences, cached data | Temporary form state |

---

## 8.8 — Privacy, Consent, and GDPR

In many jurisdictions (EU, UK, California), setting non-essential cookies without user consent is **illegal**. A compliant cookie implementation:

```js
function hasCookieConsent() {
  return CookieManager.get("cookie_consent") === "accepted";
}

function requestCookieConsent() {
  const banner = document.getElementById("cookie-banner");
  banner.style.display = "block";

  document.getElementById("accept-cookies").addEventListener("click", () => {
    CookieManager.set("cookie_consent", "accepted", { days: 365 });
    banner.style.display = "none";
    initAnalytics();        // Now safe to start analytics
    initMarketingCookies(); // And marketing cookies
  });

  document.getElementById("reject-cookies").addEventListener("click", () => {
    CookieManager.set("cookie_consent", "rejected", { days: 365 });
    banner.style.display = "none";
    // Do NOT set analytics or marketing cookies
  });
}

// On page load:
if (!hasCookieConsent()) {
  requestCookieConsent();
} else if (CookieManager.get("cookie_consent") === "accepted") {
  initAnalytics();
}
```

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Window and Screen: Responsive Window Manager

**Objective:** Use `window.innerWidth`, `screen.width`, and the `resize` event to create an adaptive layout controller.

**Scenario:** A web dashboard that switches between a sidebar layout (desktop), a tab layout (tablet), and a single-column layout (mobile). A "Device Info" panel shows live `screen` and `window` data.

**Warm-up mini-example:**

```js
function getBreakpoint() {
  const w = window.innerWidth;
  if (w < 480)  return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}
console.log(getBreakpoint());
```

**Step-by-step instructions:**

1. Create three layout modes: `mobile`, `tablet`, `desktop` — each applies a different CSS class to `document.body`.
2. Write `applyLayout()` that sets the correct class based on `window.innerWidth`.
3. Debounce the `resize` event (300ms) and call `applyLayout` on each debounced trigger.
4. Build a live info panel that updates on every resize showing: `window.innerWidth`, `window.innerHeight`, `screen.width`, `screen.availHeight`, `screen.colorDepth`, and the current breakpoint.
5. Add a button that calls `window.print()` only on desktop (guard with `getBreakpoint() === "desktop"`).

**Self-check questions:**
1. Why is it better to use `window.innerWidth` rather than `screen.width` for responsive layout decisions?
2. What is the difference between debouncing and throttling the resize event? Which is more appropriate here?

---

## Exercise 2 — Location and History: Client-Side Router

**Objective:** Build a working 4-page SPA router using `history.pushState`, `location.pathname`, and the `popstate` event.

**Scenario:** A portfolio website with pages: Home, Projects, About, Contact.

**Step-by-step instructions:**

1. Create route definitions: `{ "/": renderHome, "/projects": renderProjects, "/about": renderAbout, "/contact": renderContact }`.
2. Write a `navigate(path)` function that calls `pushState` and renders the correct page into `#app`.
3. Intercept all `<a>` clicks within the document using event delegation — prevent default and call `navigate` instead.
4. Handle `popstate` to re-render when the user presses Back/Forward.
5. Use `URLSearchParams` to parse a query string — on the projects page, `?tag=javascript` should filter shown projects.
6. Add a `beforeNavigate` hook that calls `confirm()` if the current page has unsaved state.

**Self-check questions:**
1. What does `history.pushState` do with the first argument (the state object)?
2. Why does going directly to `/about` (typing it in the address bar) fail in a pure client-side router, and how would you fix it on the server?

---

## Exercise 3 — Navigator: Feature Detection Dashboard

**Objective:** Build a "Browser Capabilities" dashboard using `navigator` properties and feature detection.

**Scenario:** An app that must know what it can use before initialising various features.

**Step-by-step instructions:**

1. Build a `detectCapabilities()` function that returns an object with the following fields, each as `true/false` or the value: `{ language, onLine, cookiesEnabled, geolocationAvailable, hardwareConcurrency, deviceMemory, clipboardAvailable, serviceWorkerAvailable, touchSupport }`.
2. Render a capability table with green/red indicators for boolean fields.
3. Add a "Test Geolocation" button that calls `navigator.geolocation.getCurrentPosition` and displays `latitude`, `longitude`, and `accuracy`.
4. Add a "Copy Device Info" button that uses `navigator.clipboard.writeText` to copy the JSON report.
5. Monitor `navigator.onLine` and update a status bar on `online`/`offline` events.

**Self-check questions:**
1. Why is `"geolocation" in navigator` better than checking `navigator.geolocation !== undefined`?
2. What happens if the user denies the geolocation permission? How do you handle this gracefully?

---

## Exercise 4 — Timing: Advanced Timer Toolkit

**Objective:** Build four reusable timing utilities and demonstrate each one.

**Step-by-step instructions:**

1. **Stopwatch:** `createStopwatch()` returns an object with `start()`, `pause()`, `reset()`, and `getElapsed()`. Uses `setInterval` internally and displays the time in `MM:SS.ms` format.
2. **Countdown timer:** `createCountdown(seconds, onTick, onEnd)` counts down to zero, calling `onTick(remaining)` each second. Returns a `cancel()` function.
3. **Debounce:** `debounce(fn, ms)` — described in Chapter 7. Apply to a search input.
4. **Throttle:** `throttle(fn, ms)` — described in Chapter 7. Apply to a scroll event logger.

For each utility:
- Demonstrate it working correctly
- Demonstrate what happens if you call the cancel/clear function midway

**Self-check questions:**
1. The stopwatch uses `setInterval`. What drift problem can occur over time with `setInterval`, and how would `Date.now()` fix it?
2. A throttled scroll handler fires "at most once per 100ms". If the user scrolls for 3 seconds continuously, roughly how many times will the handler fire?

---

## Exercise 5 — Cookies: Preference Persistence System

**Objective:** Build a complete user preference system using the `CookieManager` from Section 8.6.

**Scenario:** A news website that remembers: selected theme (dark/light), font size, preferred news categories, and the last-visited article.

**Step-by-step instructions:**

1. Use `CookieManager.set/get` to persist: `theme` (dark/light, 365 days), `fontSize` (small/medium/large, 365 days), `categories` (comma-separated list, 90 days), `lastVisited` (article ID, session cookie — no expiry).
2. On page load, read all four preferences and apply them immediately before the first render (avoids flash of unstyled content).
3. Provide UI controls (theme toggle, font size buttons, category checkboxes) that both update the DOM and write to cookies.
4. Add a "Clear All Preferences" button that calls `CookieManager.deleteAll()` and reloads the page.
5. Implement a cookie consent banner that only allows preference cookies after consent is given.

**Self-check questions:**
1. Why do you apply preferences before the first render? What user experience problem does this prevent?
2. Why should the `lastVisited` cookie be a session cookie rather than a 365-day cookie?

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: Full-Featured Web App Shell

**Scenario:** You are building the application shell for a progressive web app (PWA) — the infrastructure that every page of the app shares. It handles: URL routing (History API), user session persistence (cookies), device detection (Navigator + Screen), adaptive UI (Window resize), timed notifications (setTimeout), and first-load setup including cookie consent.

This project uses all eight chapters together in a realistic, integrated system.

---

### Stage 1 — App Configuration and Device Profiling

```js
// --- App-wide configuration ---
const AppConfig = Object.freeze({
  name:        "MyApp",
  version:     "2.1.0",
  cookiePrefix: "myapp_",
  sessionCookieName: "session_token",
  preferenceKeys: ["theme", "fontSize", "language", "notifications"],
  routes: {
    "/":           { title: "Home",     component: "HomePage"     },
    "/dashboard":  { title: "Dashboard",component: "DashboardPage"},
    "/settings":   { title: "Settings", component: "SettingsPage" },
    "/profile":    { title: "Profile",  component: "ProfilePage"  },
  }
});

// --- Device profiling using screen + navigator ---
const DeviceProfile = (function() {
  function getBreakpoint() {
    const w = window.innerWidth;
    if (w < 480)  return "xs";
    if (w < 768)  return "sm";
    if (w < 1024) return "md";
    if (w < 1440) return "lg";
    return "xl";
  }

  function getDeviceType() {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const bp       = getBreakpoint();
    if (bp === "xs" || bp === "sm") return "mobile";
    if (bp === "md" && hasTouch)    return "tablet";
    return "desktop";
  }

  return {
    get breakpoint()    { return getBreakpoint(); },
    get deviceType()    { return getDeviceType(); },
    get screenWidth()   { return screen.width; },
    get screenHeight()  { return screen.height; },
    get viewportWidth() { return window.innerWidth; },
    get viewportHeight(){ return window.innerHeight; },
    get colorDepth()    { return screen.colorDepth; },
    get language()      { return navigator.language; },
    get onLine()        { return navigator.onLine; },
    get cpuCores()      { return navigator.hardwareConcurrency || 1; },
    get deviceMemory()  { return navigator.deviceMemory || null; },
    get isLowEnd()      { return (navigator.deviceMemory || 4) <= 1 || navigator.hardwareConcurrency <= 2; },

    summary() {
      return {
        breakpoint:  this.breakpoint,
        deviceType:  this.deviceType,
        screen:      `${this.screenWidth}×${this.screenHeight}`,
        viewport:    `${this.viewportWidth}×${this.viewportHeight}`,
        language:    this.language,
        onLine:      this.onLine,
        cpuCores:    this.cpuCores,
        deviceMemory: this.deviceMemory,
        isLowEnd:    this.isLowEnd
      };
    }
  };
})();

console.log("Device Profile:", DeviceProfile.summary());
```

---

### Stage 2 — Session and Preference Management (Cookies)

```js
// --- Namespaced cookie manager (uses AppConfig.cookiePrefix) ---
const SessionManager = {
  _key(name) { return AppConfig.cookiePrefix + name; },

  // Session token (no expiry = session cookie):
  setSession(token) {
    CookieManager.set(this._key("session"), token, { secure: true, sameSite: "Strict" });
  },
  getSession() { return CookieManager.get(this._key("session")); },
  clearSession(){ CookieManager.delete(this._key("session")); },
  isLoggedIn()  { return !!this.getSession(); },

  // Persistent user preferences (365 days):
  setPreference(key, value) {
    if (!AppConfig.preferenceKeys.includes(key)) {
      throw new Error(`Unknown preference key: "${key}"`);
    }
    CookieManager.set(this._key("pref_" + key), value, { days: 365 });
  },

  getPreference(key, defaultValue = null) {
    return CookieManager.get(this._key("pref_" + key)) ?? defaultValue;
  },

  getAllPreferences() {
    return AppConfig.preferenceKeys.reduce((acc, key) => {
      acc[key] = this.getPreference(key);
      return acc;
    }, {});
  },

  // Apply all saved preferences to the document:
  applyPreferences() {
    const theme    = this.getPreference("theme",    "light");
    const fontSize = this.getPreference("fontSize", "medium");
    const lang     = this.getPreference("language", navigator.language.split("-")[0]);

    document.documentElement.setAttribute("data-theme",    theme);
    document.documentElement.setAttribute("data-fontsize", fontSize);
    document.documentElement.lang = lang;

    console.log(`Applied preferences: theme=${theme}, fontSize=${fontSize}, lang=${lang}`);
  }
};

// Apply preferences immediately — before first render (prevents FOUC):
SessionManager.applyPreferences();
```

---

### Stage 3 — Client-Side Router (Location + History)

```js
// --- Router ---
const Router = {
  _currentState: null,
  _beforeEachHooks: [],

  beforeEach(hook) {
    this._beforeEachHooks.push(hook);
  },

  async navigate(path, state = {}, replace = false) {
    const route = AppConfig.routes[path];

    if (!route) {
      console.warn("No route for:", path);
      this.navigate("/", {}, true);
      return;
    }

    // Run beforeEach hooks (e.g., auth guard):
    for (const hook of this._beforeEachHooks) {
      const allowed = await hook(path, this._currentState);
      if (!allowed) return;
    }

    this._currentState = { path, ...state };

    if (replace) {
      history.replaceState(this._currentState, route.title, path);
    } else {
      history.pushState(this._currentState, route.title, path);
    }

    document.title = `${route.title} — ${AppConfig.name}`;
    this._render(route);
  },

  _render(route) {
    const app = document.getElementById("app");
    app.innerHTML = `
      <div class="page" data-component="${route.component}">
        <h1>${route.title}</h1>
        <p>Component: ${route.component}</p>
        <p>Path: ${location.pathname}</p>
      </div>
    `;
    // In a real app: instantiate and mount route.component here
    console.log("Rendered:", route.title, "at", location.pathname);
  },

  init() {
    // Handle browser back/forward:
    window.addEventListener("popstate", (event) => {
      const state = event.state;
      if (state?.path) {
        const route = AppConfig.routes[state.path];
        if (route) {
          this._currentState = state;
          document.title = `${route.title} — ${AppConfig.name}`;
          this._render(route);
        }
      }
    });

    // Intercept internal link clicks:
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (link && new URL(link.href).origin === location.origin) {
        event.preventDefault();
        this.navigate(link.pathname);
      }
    });

    // Render the initial route:
    const initialPath  = location.pathname;
    const initialRoute = AppConfig.routes[initialPath];
    if (initialRoute) {
      this._currentState = { path: initialPath };
      this._render(initialRoute);
    } else {
      this.navigate("/", {}, true);
    }
  }
};

// Auth guard example:
Router.beforeEach((path, prevState) => {
  if (path === "/dashboard" && !SessionManager.isLoggedIn()) {
    console.log("Auth guard: redirecting to home");
    Router.navigate("/", {}, true);
    return false;
  }
  return true;
});
```

---

### Stage 4 — Notification System (Timing Events)

```js
// --- In-app notification system using setTimeout ---
const NotificationManager = {
  _queue: [],
  _activeTimer: null,
  _container: null,

  init() {
    this._container = document.createElement("div");
    this._container.id = "notification-container";
    document.body.appendChild(this._container);
  },

  show(message, type = "info", duration = 4000) {
    const toast = document.createElement("div");
    toast.className   = `notification notification-${type}`;
    toast.textContent = message;
    toast.setAttribute("role", "alert");

    this._container.appendChild(toast);

    // Trigger transition (needs a tick for CSS):
    setTimeout(() => toast.classList.add("visible"), 10);

    // Auto-dismiss:
    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 300);   // Wait for CSS transition
    }, duration);
  },

  success(msg, dur) { this.show(msg, "success", dur); },
  error(msg,   dur) { this.show(msg, "error",   dur); },
  warning(msg, dur) { this.show(msg, "warning", dur); },

  // Scheduled reminder (uses setTimeout):
  scheduleReminder(message, delayMs) {
    const id = setTimeout(() => {
      this.show("⏰ Reminder: " + message, "info", 8000);
    }, delayMs);
    console.log(`Reminder scheduled in ${delayMs / 1000}s (ID: ${id})`);
    return id;
  }
};
```

---

### Stage 5 — Connectivity Monitor and Auto-Save (Timing + Navigator)

```js
// --- Connectivity status using navigator.onLine ---
const ConnectivityMonitor = {
  _pollId: null,
  _wasOffline: false,

  init() {
    this._update();

    window.addEventListener("online",  () => this._onOnline());
    window.addEventListener("offline", () => this._onOffline());

    // Periodic health-check (belt-and-suspenders):
    this._pollId = setInterval(() => this._check(), 30000);
  },

  _update() {
    const statusEl = document.getElementById("connection-status");
    if (statusEl) {
      statusEl.textContent = navigator.onLine ? "🟢 Online" : "🔴 Offline";
      statusEl.className   = navigator.onLine ? "status-online" : "status-offline";
    }
  },

  _onOnline() {
    this._update();
    if (this._wasOffline) {
      NotificationManager.success("Connection restored! Syncing changes...");
      this._wasOffline = false;
      AutoSave.flush();   // Push any pending saves
    }
  },

  _onOffline() {
    this._update();
    this._wasOffline = true;
    NotificationManager.warning("You are offline. Changes will be saved locally.");
  },

  async _check() {
    try {
      await fetch("/api/ping", { method: "HEAD", cache: "no-store" });
    } catch {
      if (navigator.onLine) {
        // navigator.onLine said "online" but request failed — server might be down:
        NotificationManager.error("Server unreachable. Check your connection.");
      }
    }
  },

  destroy() { clearInterval(this._pollId); }
};

// --- Debounced auto-save ---
const AutoSave = {
  _pendingData: null,
  _saveTimer:   null,
  _lastSaved:   null,
  DEBOUNCE_MS:  2000,

  schedule(data) {
    this._pendingData = data;
    clearTimeout(this._saveTimer);

    document.getElementById("save-status").textContent = "Unsaved changes...";

    this._saveTimer = setTimeout(() => this._save(), this.DEBOUNCE_MS);
  },

  async _save() {
    if (!this._pendingData) return;

    if (!navigator.onLine) {
      // Store in cookie for later (small data only):
      CookieManager.set("pending_save", JSON.stringify(this._pendingData));
      document.getElementById("save-status").textContent = "Saved offline — will sync when online";
      return;
    }

    try {
      await fetch("/api/save", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(this._pendingData)
      });

      this._pendingData = null;
      this._lastSaved   = new Date();
      document.getElementById("save-status").textContent =
        "Saved at " + this._lastSaved.toLocaleTimeString();
      CookieManager.delete("pending_save");   // Clear any offline backup

    } catch (err) {
      NotificationManager.error("Save failed: " + err.message);
    }
  },

  flush() {
    clearTimeout(this._saveTimer);
    this._save();
  }
};
```

---

### Stage 6 — Cookie Consent and App Initialisation

```js
// --- Cookie consent banner ---
const ConsentManager = {
  CONSENT_COOKIE: "myapp_consent",
  CONSENT_VERSION: "v2",  // Bump to re-ask after policy changes

  hasConsent() {
    return CookieManager.get(this.CONSENT_COOKIE) === this.CONSENT_VERSION;
  },

  showBanner() {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = `
      <p>${AppConfig.name} uses cookies to remember your preferences and keep you logged in.</p>
      <button id="consent-accept">Accept All</button>
      <button id="consent-essential">Essential Only</button>
      <a href="/privacy">Privacy Policy</a>
    `;
    document.body.appendChild(banner);

    document.getElementById("consent-accept").addEventListener("click", () => {
      CookieManager.set(this.CONSENT_COOKIE, this.CONSENT_VERSION, { days: 365 });
      banner.remove();
      this._onConsented("all");
    });

    document.getElementById("consent-essential").addEventListener("click", () => {
      CookieManager.set(this.CONSENT_COOKIE, this.CONSENT_VERSION + "-essential", { days: 365 });
      banner.remove();
      this._onConsented("essential");
    });
  },

  _onConsented(level) {
    console.log("Cookie consent level:", level);
    if (level === "all") {
      // Now safe to initialise analytics, marketing, etc.
    }
    App.init();
  }
};

// --- Main application bootstrap ---
const App = {
  init() {
    console.log(`${AppConfig.name} v${AppConfig.version} initialising...`);
    console.log("Device:", DeviceProfile.summary());

    // Initialise systems:
    NotificationManager.init();
    ConnectivityMonitor.init();
    Router.init();

    // Respond to window resize with debounce:
    window.addEventListener("resize", debounce(() => {
      document.body.dataset.breakpoint = DeviceProfile.breakpoint;
      document.body.dataset.device     = DeviceProfile.deviceType;
    }, 200));

    // Set initial breakpoint:
    document.body.dataset.breakpoint = DeviceProfile.breakpoint;
    document.body.dataset.device     = DeviceProfile.deviceType;

    // Recovery: restore any pending save from offline cookie:
    const pending = CookieManager.get("myapp_pending_save");
    if (pending) {
      NotificationManager.warning("Restoring unsaved changes from last session...");
      AutoSave.schedule(JSON.parse(pending));
    }

    NotificationManager.success(`Welcome to ${AppConfig.name}!`, 2000);
    console.log("App ready.");
  },

  start() {
    if (!ConsentManager.hasConsent()) {
      // Show banner — init will be called after consent:
      ConsentManager.showBanner();
    } else {
      this.init();
    }
  }
};

// --- Entry point ---
App.start();
```

---

**Reflection Questions:**

1. `SessionManager.applyPreferences()` is called before `App.init()` — even before consent is checked. Is this correct? What category of cookies (essential vs non-essential) do preference cookies belong to, and does their use require consent?
2. The `ConnectivityMonitor` uses both `navigator.onLine` events AND a polling interval with `fetch`. Why is `navigator.onLine` alone insufficient, and what failure scenario does the periodic `fetch` to `/api/ping` catch that `navigator.onLine` misses?
3. The `AutoSave` system stores pending data in a cookie when offline. A cookie's maximum size is approximately 4KB. What would you use instead for larger documents, and why are cookies specifically used for this cross-session persistence in this design?
4. The Router's `beforeEach` hook returns `false` to cancel navigation. In the current design, if the auth guard redirects to `/`, it calls `Router.navigate("/", {}, true)` which adds to history, then calls `Router.navigate` for the original path which adds another entry. What history stack issue could this cause, and how would you fix it?
5. `DeviceProfile.isLowEnd` checks `deviceMemory <= 1` and `hardwareConcurrency <= 2`. In a real app, how would you use this flag to serve a "lite" experience? Give two concrete, user-visible differences between the normal and lite experience.

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What is the difference between `window.innerWidth` and `screen.width`?

**Q2:** What does `location.replace("/new-page")` do differently from `location.href = "/new-page"`?

**Q3:** Write code that reads the `size` parameter from the URL `/shop?size=42&color=red`.

**Q4:** What is the difference between `history.pushState()` and `history.replaceState()`?

**Q5:** Why should you not use `navigator.userAgent` for browser detection? What should you use instead?

**Q6:** What are the three native popup methods, and what does each return?

**Q7:** Why does assigning to `document.cookie` not overwrite all existing cookies?

**Q8:** Write a function that sets a cookie named `"user"` with value `"Alice"` that expires in 7 days.

**Q9:** What is the difference between `cookies`, `localStorage`, and `sessionStorage`?

**Q10:** A `setInterval` with 100ms delay fires 10 times per second. After the user's tab has been hidden for 5 minutes and they return, what might happen to the timer? What alternative handles this better?

---

## Answer Key

**A1:** `window.innerWidth` is the width of the **browser viewport** — the visible content area inside the browser window, excluding toolbars and scrollbars. `screen.width` is the width of the **physical display monitor** — a fixed hardware measurement. For responsive layout decisions, use `innerWidth`. For window placement calculations, use `screen` properties.

**A2:** `location.href = "/new-page"` navigates to the new page and adds an entry to the browser history — the user can press Back to return. `location.replace("/new-page")` navigates but **replaces** the current history entry, so the user cannot press Back to return to the previous page.

**A3:**
```js
const params = new URLSearchParams(location.search);
const size   = params.get("size");   // Output: "42"
```

**A4:** `pushState()` adds a **new entry** to the history stack — the user's Back button will be able to return to the previous state. `replaceState()` **modifies the current entry** — no new Back step is added. Use `pushState` when the user should be able to go back; use `replaceState` when just updating a URL without creating a new history point (e.g., filter parameters).

**A5:** The User-Agent string is easily spoofed, complex to parse correctly, and frequently changes between browser versions. Instead, use **feature detection** — test whether a specific API or property exists before using it: `if ("geolocation" in navigator)` rather than checking the UA string.

**A6:** `alert(message)` — shows a message, returns `undefined`. `confirm(message)` — shows OK/Cancel, returns `true` (OK) or `false` (Cancel). `prompt(message, default?)` — shows a text input, returns the typed string or `null` if cancelled.

**A7:** `document.cookie` uses a special interface: **reading** it returns all cookies as a string, but **writing** to it sets or updates only one cookie — it does not replace the entire cookie jar. This is intentional by design to allow individual cookie management without touching others.

**A8:**
```js
function setUserCookie(value) {
  const expires = new Date();
  expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = `user=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}
setUserCookie("Alice");
```

**A9:** **Cookies**: ~4KB, sent to server automatically with every request, can have expiry, support HttpOnly/Secure flags. **localStorage**: ~5–10MB, client-side only, persists until manually cleared. **sessionStorage**: ~5–10MB, client-side only, cleared when the tab/session closes. Cookies are best for session tokens and server-shared data; localStorage for client-only persistent preferences; sessionStorage for temporary per-tab state.

**A10:** Browsers throttle or pause timers in hidden/background tabs (Chrome throttles to at most once per minute for background tabs). On return, multiple queued callbacks may fire rapidly. For animation, use `requestAnimationFrame` (automatically pauses when hidden). For time-sensitive intervals, record `Date.now()` at each tick and calculate elapsed time yourself rather than counting ticks.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Know the key `window` properties: `innerWidth/Height`, `outerWidth/Height`, `scrollX/Y` | ✓ |
| 2 | Can open and close browser windows with `window.open()` | ✓ |
| 3 | Know all `screen` properties and when to use them vs `window` properties | ✓ |
| 4 | Can read every part of a URL using `location` properties | ✓ |
| 5 | Understand the difference between `assign()`, `href`, and `replace()` | ✓ |
| 6 | Can parse query string parameters with `URLSearchParams` | ✓ |
| 7 | Can navigate history with `back()`, `forward()`, `go()` | ✓ |
| 8 | Can implement a client-side router with `pushState` and `popstate` | ✓ |
| 9 | Understand why `userAgent` is unreliable and use feature detection instead | ✓ |
| 10 | Can use `navigator.language`, `onLine`, `geolocation`, `clipboard`, `hardwareConcurrency` | ✓ |
| 11 | Know all three popup methods, what they return, and when NOT to use them | ✓ |
| 12 | Can build a custom modal as a Promise-based alternative to `confirm()` | ✓ |
| 13 | Can use `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval` correctly | ✓ |
| 14 | Can implement debounce and throttle from scratch | ✓ |
| 15 | Can set, read, and delete cookies with proper attributes | ✓ |
| 16 | Know the difference between cookies, localStorage, and sessionStorage | ✓ |
| 17 | Understand GDPR/consent requirements for non-essential cookies | ✓ |
| 18 | Built the full App Shell project combining all eight BOM chapters | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Using `screen.width` for breakpoints | Screen size ≠ viewport size | Use `window.innerWidth` for layout decisions |
| `window.open()` blocked by browser | Called outside a user action | Only call from click/keypress handlers |
| `location.href = url` when you want no Back | Creates a history entry | Use `location.replace(url)` for no-back redirects |
| `prompt()` `.trim()` crash | Returns `null` on cancel | Always check `if (input !== null)` first |
| `document.cookie = "..."` overwrites nothing | Write-to-cookie sets ONE cookie | This is intentional — each assignment sets/updates one |
| Cookie deletion without matching path/domain | Cookie is invisible after "deletion" | Match path and domain exactly when deleting |
| `setInterval` drift over time | Each interval is measured from the previous callback | Record `Date.now()` and compute elapsed time |
| Not debouncing resize/scroll handlers | Fires hundreds of times per second | Always debounce or throttle resize/scroll |
| `history.pushState` doesn't fire `popstate` | `popstate` only fires on Back/Forward | Listen to both `pushState` routing and `popstate` |
| Ignoring `navigator.onLine` unreliability | `onLine` can say "true" when server is down | Supplement with a periodic `fetch` health-check |

---

## One-Sentence Summary

> JavaScript's Browser Object Model gives you programmatic control over the entire browser environment — the window dimensions, the address bar URL, the navigation history, the device's capabilities, user-facing dialogs, precisely timed events, and persistent cookie storage — making it possible to build fully interactive, stateful web applications that feel as capable as native desktop software.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript BOM (8 pages)*
