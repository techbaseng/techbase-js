---
title: "JavaScript Web APIs: Web APIs Introduction · Fetch API · Geolocation API · History API · Pointer Events · Web Storage · Constraint Validation API · Web Workers"
nav_order: 40
---

## Table of Contents
1. [Web APIs Introduction](#1-web-apis-introduction)
2. [Fetch API](#2-fetch-api)
3. [Geolocation API](#3-geolocation-api)
4. [History API](#4-history-api)
5. [Pointer Events API](#5-pointer-events-api)
6. [Web Storage API](#6-web-storage-api)
7. [Constraint Validation API](#7-constraint-validation-api)
8. [Web Workers API](#8-web-workers-api)
9. [Applied Exercises](#9-applied-exercises)
10. [Project Simulation — Lagos Community Dashboard](#10-project-simulation--lagos-community-dashboard)
11. [Completion Checklist · Quiz · Gotchas](#11-completion-checklist--quiz--gotchas)

---

# 1. Web APIs Introduction

## 1.1 What Is a Web API?

**API** stands for **Application Programming Interface**. Think of it as a *contract* between two pieces of software: one side says "I will give you this service if you ask me in exactly this way." The other side follows that agreement to get the service.

> **Real-world analogy:** When you walk into a restaurant, you don't go into the kitchen and cook your own food. You pick up the *menu* (the API), tell the waiter what you want (make a *request*), and the kitchen prepares it and returns it to you (the *response*). You never need to know how the kitchen works internally.

**A Web API** is a built-in browser feature or a remote server that your JavaScript code can talk to — following a defined set of rules — to get something done.

---

## 1.2 Why Do Web APIs Exist?

Without APIs, every developer would have to:
- Write their own GPS logic from scratch to get a user's location.
- Write their own networking layer to fetch data from a server.
- Build their own multi-threading engine to run tasks in the background.

Web APIs solve all of this. The browser ships with a rich collection of ready-to-use APIs so you can focus on *what* you want to build, not *how* these features work internally.

---

## 1.3 Categories of Web APIs

Web APIs come in two flavours:

| Category | Description | Examples |
|---|---|---|
| **Browser APIs** | Built into the browser | Geolocation, Web Storage, Web Workers, History |
| **Third-Party APIs** | Remote servers you connect to | Google Maps API, Twitter/X API, Paystack API |

This tutorial focuses on **Browser APIs** — they are always available as long as the user has a modern browser.

---

## 1.4 Key Browser APIs at a Glance

```
Browser
  ├── Fetch API          → Load data from servers without reloading the page
  ├── Geolocation API    → Get the user's GPS coordinates
  ├── History API        → Control the browser back/forward navigation
  ├── Pointer Events     → Handle mouse, touch, and stylus input uniformly
  ├── Web Storage        → Save data in the browser (localStorage / sessionStorage)
  ├── Validation API     → Check form inputs before submission
  └── Web Workers        → Run JavaScript in a background thread
```

> 🤔 **Thinking question:** Before Web APIs existed, how do you think developers fetched data from a server? (Hint: the whole page had to reload.)

---

# 2. Fetch API

## 2.1 What Problem Does Fetch Solve?

Before the Fetch API, browsers used a technology called **XMLHttpRequest (XHR)** to load data without refreshing a page. XHR was verbose, confusing, and hard to read.

The **Fetch API** is a modern, clean, Promise-based replacement. It lets your JavaScript ask a server for data — text, JSON, images, files — and get a response, all without the user ever seeing a page reload.

> **Real-world analogy:** You're building a shopping app. When a user searches for "phone chargers," you don't want to reload the whole page. You use Fetch to *quietly* ask the server in the background: "Give me all products matching 'phone charger'" and update just the product list.

---

## 2.2 How `fetch()` Works — The Basics

```js
fetch(url)
  .then(response => response.json())   // Step 1: Parse the raw response
  .then(data => console.log(data))     // Step 2: Use the data
  .catch(error => console.error(error)); // Step 3: Handle errors
```

`fetch()` always returns a **Promise**. A Promise is JavaScript's way of saying: *"I don't have the answer right now, but I will call you back when I do."*

### Step-by-step breakdown:

| Step | What happens |
|---|---|
| `fetch(url)` | Sends an HTTP GET request to the URL |
| `.then(res => res.json())` | Converts the raw HTTP response body into a usable JavaScript object |
| `.then(data => ...)` | Works with the actual data |
| `.catch(err => ...)` | Catches network errors (no internet, server down, etc.) |

---

## 2.3 Micro-demo: Fetching a Fake API

```js
// JSONPlaceholder is a free fake REST API — perfect for practising
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(user => {
    console.log(user.name);    // Output: Leanne Graham
    console.log(user.email);   // Output: Sincere@april.biz
    console.log(user.address.city); // Output: Gwenborough
  })
  .catch(error => console.error("Network error:", error));
```

### What each line does:
- `fetch(url)` — Fires an HTTP GET request.
- `response.json()` — The raw response comes as a stream. `.json()` reads the stream and parses it into a plain JavaScript object. It also returns a Promise, which is why there's a second `.then()`.
- `user.name` — At this point `user` is a real JavaScript object; you can access properties normally.

---

## 2.4 Understanding the Response Object

Before you can use the data, you first receive a **Response** object. This object carries metadata about the HTTP reply.

```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => {
    console.log(response.ok);      // true (status was 200–299)
    console.log(response.status);  // 200
    console.log(response.url);     // "https://jsonplaceholder.typicode.com/posts/1"

    // NOW parse the body
    return response.json();
  })
  .then(post => {
    console.log(post.title);
    // Output: sunt aut facere repellat provident...
  });
```

> ⚠️ **Beginner mistake:** Many beginners try to do `fetch(url).then(data => data.title)`. This fails because the first `.then` receives a *Response object*, not the actual data. You must call `.json()` (or `.text()`) first.

```js
// ❌ Wrong — data is a Response object, not the JSON body
fetch(url).then(data => console.log(data.title));

// ✅ Correct — parse first, then read properties
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.title));
```

---

## 2.5 The `async/await` Style (Modern & Readable)

The same Fetch request written with `async/await` reads like plain English:

```js
async function getUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log(user.name);   // Output: Leanne Graham
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getUser();
```

### Line-by-line:
- `async function getUser()` — Declares an asynchronous function. Inside it, you can use `await`.
- `await fetch(...)` — Pauses *this function only* (not the whole page) until the HTTP response arrives.
- `await response.json()` — Pauses again until the body has been fully read and parsed.
- `try/catch` — If the network fails, the error goes to `catch` instead of crashing the script.

---

## 2.6 POST Request — Sending Data to a Server

Fetch is not just for reading data. You can also **send** data using the second argument — the `options` object.

```js
async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",                        // HTTP method
    headers: {
      "Content-Type": "application/json"   // Tell the server: "I'm sending JSON"
    },
    body: JSON.stringify({                 // Convert JS object to JSON string
      title: "Lagos Tech Meetup",
      body: "An amazing event for developers in Ikeja.",
      userId: 1
    })
  });

  const newPost = await response.json();
  console.log(newPost.id);       // Output: 101 (fake server echoes the new ID)
  console.log(newPost.title);    // Output: Lagos Tech Meetup
}

createPost();
```

### Common HTTP Methods:

| Method | Purpose |
|---|---|
| `GET` | Read/fetch data (default) |
| `POST` | Create new data |
| `PUT` | Replace existing data |
| `PATCH` | Update part of existing data |
| `DELETE` | Delete data |

---

## 2.7 Checking for HTTP Errors

A `fetch()` Promise **only rejects** on network failures (no internet, DNS failure). A `404 Not Found` or `500 Server Error` does **not** reject the promise — you must check manually.

```js
async function safeGet(url) {
  const response = await fetch(url);

  // ❌ This is NOT automatically thrown
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
}

safeGet("https://jsonplaceholder.typicode.com/users/9999")
  .then(data => console.log(data))
  .catch(err => console.error(err.message));
// Output: HTTP Error: 404
```

> 🤔 **Thinking question:** Why do you think the Fetch API designers decided not to auto-reject on 4xx/5xx status codes?

---

## 2.8 Fetch in Real-World Nigerian Context

```js
// Fetching currency exchange rates
async function getNairaRate() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();

  const nairaRate = data.rates.NGN;
  console.log(`1 USD = ₦${nairaRate}`);
  // Output: 1 USD = ₦1590.00 (rate at time of request)
}

getNairaRate();
```

---

# 3. Geolocation API

## 3.1 What Is the Geolocation API?

The **Geolocation API** lets you ask the browser: *"Where is the user right now?"* The browser then asks the user for permission, and if granted, returns the device's coordinates (latitude and longitude).

> **Real-world analogy:** It's exactly like tapping "Allow" when a food delivery app asks *"Can we access your location?"* Your phone reports its GPS coordinates back to the app so it can show your address.

**How location is determined:**
- Mobile devices: GPS chip (most accurate)
- Laptops with Wi-Fi: Triangulation from nearby Wi-Fi hotspots
- Desktop PCs: IP address (less accurate)

---

## 3.2 Accessing the API

The Geolocation API lives at `navigator.geolocation`:

```js
// Check if the browser supports Geolocation
if ("geolocation" in navigator) {
  console.log("Geolocation is supported!");
} else {
  console.log("Your browser doesn't support Geolocation.");
}
```

---

## 3.3 `getCurrentPosition()` — One-time Location

```js
navigator.geolocation.getCurrentPosition(
  successCallback,   // Called when location is found
  errorCallback,     // Called when something goes wrong
  options            // Optional configuration object
);
```

### Full working example:

```js
function onSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const accuracy = position.coords.accuracy; // metres

  console.log(`Latitude: ${lat}`);       // e.g. 6.4550
  console.log(`Longitude: ${lon}`);      // e.g. 3.3841
  console.log(`Accuracy: ±${accuracy}m`); // e.g. ±15m
}

function onError(error) {
  switch (error.code) {
    case 1: console.error("Permission denied by user"); break;
    case 2: console.error("Position unavailable (GPS failed)"); break;
    case 3: console.error("Timeout — took too long to get location"); break;
  }
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);
```

### What is inside `position`?

```
position
  ├── coords.latitude           → Decimal degrees (e.g. 6.4550)
  ├── coords.longitude          → Decimal degrees (e.g. 3.3841)
  ├── coords.altitude           → Metres above sea level (or null)
  ├── coords.accuracy           → Accuracy of lat/lon in metres
  ├── coords.altitudeAccuracy   → Accuracy of altitude in metres (or null)
  ├── coords.heading            → Direction of travel in degrees (or null)
  ├── coords.speed              → Speed in metres/second (or null)
  └── timestamp                 → Unix timestamp of when position was acquired
```

---

## 3.4 Options Object

```js
const options = {
  enableHighAccuracy: true,   // Use GPS chip (drains battery more, more accurate)
  timeout: 10000,             // Max milliseconds to wait (10 seconds)
  maximumAge: 60000           // Accept a cached result up to 60 seconds old
};

navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
```

---

## 3.5 `watchPosition()` — Continuous Tracking

Unlike `getCurrentPosition()` which fires once, `watchPosition()` keeps firing every time the device moves.

```js
// Start watching
const watchId = navigator.geolocation.watchPosition(
  position => {
    const { latitude, longitude } = position.coords;
    console.log(`Moving to: ${latitude}, ${longitude}`);
    // Update a map marker here in a real app
  },
  error => console.error(error.message)
);

// Stop watching after 30 seconds
setTimeout(() => {
  navigator.geolocation.clearWatch(watchId);
  console.log("Stopped tracking.");
}, 30000);
```

> **Real-world use:** A ride-hailing app like Bolt shows the driver's car moving on the map in real time. `watchPosition()` is how that works on the driver's phone.

---

## 3.6 Using Coordinates with Google Maps

```js
navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;

  // Build a Google Maps URL — opens in any browser
  const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  console.log("Open your location:", mapsUrl);
  // Output: https://www.google.com/maps?q=6.455,3.384
});
```

---

## 3.7 Privacy & Best Practices

```js
// ✅ Always check for support before calling
if (!navigator.geolocation) {
  showFallbackUI(); // Show a manual address form
  return;
}

// ✅ Always handle errors gracefully
navigator.geolocation.getCurrentPosition(success, error => {
  if (error.code === 1) {
    alert("Please enable location access to use this feature.");
  }
});

// ✅ Never use enableHighAccuracy when precision isn't needed
// It drains the user's battery unnecessarily
```

> 🤔 **Thinking question:** Why do you think browsers require user permission before exposing GPS data? What harm could occur if any website could read your location silently?

---

# 4. History API

## 4.1 What Is the History API?

The **History API** gives JavaScript control over the browser's navigation history — the same history behind the Back and Forward buttons. It lets you:
- Move backward and forward in history programmatically.
- **Add new entries** to the history without loading a new page.
- **Replace** the current history entry silently.

> **Real-world analogy:** Imagine a single-page application like Twitter. When you click on a tweet, the URL changes from `/home` to `/tweet/12345` — but the page never reloads. The History API is the engine behind that URL change.

This is the foundation of **Single Page Applications (SPAs)** built with frameworks like React, Vue, and Angular.

---

## 4.2 `history.back()` · `history.forward()` · `history.go()`

These mirror the browser buttons:

```js
// Go back one page (same as clicking ←)
history.back();

// Go forward one page (same as clicking →)
history.forward();

// Go back 2 pages
history.go(-2);

// Go forward 3 pages
history.go(3);

// Reload the current page
history.go(0);
```

```js
// How many entries are in the history stack?
console.log(history.length);
// Output: 5 (for example, if you visited 5 pages)
```

---

## 4.3 `pushState()` — Add a History Entry Without Reloading

This is the powerful modern method. It changes the URL in the address bar *and* adds an entry to the history stack — all without making an HTTP request.

```js
history.pushState(stateObject, title, url);
```

| Parameter | Description |
|---|---|
| `stateObject` | Any JavaScript object you want to store with this entry (retrieved later via `popstate`) |
| `title` | Currently ignored by most browsers — pass `""` |
| `url` | The new URL to display. Must be same origin (same domain) |

### Example:

```js
// User is on: https://myapp.com/home

history.pushState({ page: "products" }, "", "/products");
// URL is now: https://myapp.com/products
// Page did NOT reload — only the URL changed

history.pushState({ page: "phone" }, "", "/products/phone");
// URL is now: https://myapp.com/products/phone
// Still no reload

console.log(history.length); // Increased by 2
```

---

## 4.4 `replaceState()` — Replace Without Adding to History

`replaceState` works the same as `pushState` but instead of *adding* a new entry, it *replaces* the current one. The Back button won't go to the old URL.

```js
// Use case: redirecting a user after login without leaving the login page in history
history.replaceState({ page: "dashboard" }, "", "/dashboard");
// URL changed, but pressing Back won't go back to /login
```

> **When to use each:**
> - `pushState` → Normal page navigation (clicking links, viewing products)
> - `replaceState` → Post-login redirect, fixing a URL typo, search filter updates

---

## 4.5 The `popstate` Event — Responding to Navigation

When the user clicks Back or Forward (or you call `history.go()`), the browser fires a `popstate` event. This is how SPAs know which "page" to render.

```js
window.addEventListener("popstate", function(event) {
  console.log("Navigation happened!");
  console.log("State:", event.state);
  // event.state is whatever you passed to pushState/replaceState

  // In a real SPA, you'd render the correct component here
  if (event.state && event.state.page === "products") {
    renderProductsPage();
  }
});

// Simulate navigating to a products page
history.pushState({ page: "products" }, "", "/products");

// When user presses Back, popstate fires with { page: "products" }
```

> ⚠️ **Important:** `popstate` does NOT fire when you call `pushState` or `replaceState` directly. It only fires when the user navigates (back/forward) or you call `history.go()`.

---

## 4.6 Building a Simple SPA Router

```js
// A very basic client-side router using the History API
const routes = {
  "/":         () => renderHome(),
  "/about":    () => renderAbout(),
  "/contact":  () => renderContact()
};

function navigate(path) {
  history.pushState({ path }, "", path);
  routes[path]?.();
}

window.addEventListener("popstate", (e) => {
  const path = e.state?.path || "/";
  routes[path]?.();
});

// Example: clicking a nav link
document.getElementById("about-link").addEventListener("click", (e) => {
  e.preventDefault();          // Don't do a real page navigation
  navigate("/about");          // Use our SPA router instead
});
```

---

# 5. Pointer Events API

## 5.1 What Is the Pointer Events API?

In the early days of the web, mouse events (`mousedown`, `mousemove`, `mouseup`) were all that existed. Then touchscreens arrived, needing separate touch events (`touchstart`, `touchmove`, `touchend`). Then stylus pens arrived.

The **Pointer Events API** unifies all three input types under one consistent event model. One set of events works for mouse, touch, and stylus.

> **Real-world analogy:** Instead of having three different TV remotes for three different TVs, you get one universal remote that controls all of them.

---

## 5.2 Pointer Events vs Mouse/Touch Events

| Old Mouse Event | Old Touch Event | New Pointer Event |
|---|---|---|
| `mousedown` | `touchstart` | `pointerdown` |
| `mousemove` | `touchmove` | `pointermove` |
| `mouseup` | `touchend` | `pointerup` |
| `mouseover` | — | `pointerover` |
| `mouseout` | — | `pointerout` |
| `mouseenter` | — | `pointerenter` |
| `mouseleave` | — | `pointerleave` |
| — | — | `pointercancel` |
| — | — | `gotpointercapture` |
| — | — | `lostpointercapture` |

---

## 5.3 The Pointer Event Object

Every pointer event passes an event object with rich information:

```js
document.addEventListener("pointerdown", function(event) {
  console.log(event.pointerId);    // Unique ID for this pointer (useful for multi-touch)
  console.log(event.pointerType);  // "mouse", "touch", or "pen"
  console.log(event.clientX);      // X coordinate in the viewport
  console.log(event.clientY);      // Y coordinate in the viewport
  console.log(event.pressure);     // 0–1 (stylus/touch pressure; 0 for mouse)
  console.log(event.width);        // Contact area width (touch)
  console.log(event.height);       // Contact area height (touch)
  console.log(event.isPrimary);    // true = first/main touch point in multi-touch
});
```

---

## 5.4 Basic Pointer Event Example

```js
const canvas = document.getElementById("drawCanvas");

canvas.addEventListener("pointerdown", (e) => {
  console.log(`Drawing started by: ${e.pointerType}`);
  // Output: "Drawing started by: mouse"   (on laptop)
  // Output: "Drawing started by: touch"   (on phone)
  // Output: "Drawing started by: pen"     (on Surface/iPad with stylus)
});

canvas.addEventListener("pointermove", (e) => {
  if (e.buttons > 0) {  // Only draw while button/finger is pressed
    console.log(`Drawing at: ${e.clientX}, ${e.clientY}`);
  }
});

canvas.addEventListener("pointerup", (e) => {
  console.log("Drawing stopped.");
});
```

---

## 5.5 Pointer Capture — Keeping Events Locked to One Element

When the user presses a button and then drags the mouse *off* the button, mouse events normally stop firing on that button. **Pointer capture** solves this by locking all pointer events to one element until release.

```js
const slider = document.getElementById("slider");

slider.addEventListener("pointerdown", (e) => {
  // Lock all pointer events to this element
  slider.setPointerCapture(e.pointerId);
});

slider.addEventListener("pointermove", (e) => {
  // This fires even if the mouse has moved outside the slider
  console.log("Slider value:", e.clientX);
});

slider.addEventListener("pointerup", (e) => {
  // Release the capture
  slider.releasePointerCapture(e.pointerId);
});
```

> **Use case:** Custom sliders, drag-and-drop handles, drawing apps — anywhere the user needs to drag freely without the element "losing" the pointer.

---

## 5.6 Multi-Touch with Pointer Events

```js
let activePointers = new Map();

canvas.addEventListener("pointerdown", (e) => {
  activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  console.log(`Active touches: ${activePointers.size}`);
});

canvas.addEventListener("pointerup", (e) => {
  activePointers.delete(e.pointerId);
  console.log(`Active touches: ${activePointers.size}`);
});

// When 2 touches are active, you can detect pinch-to-zoom, rotate, etc.
```

---

## 5.7 Preventing Default Touch Behaviour

On mobile, the browser has built-in behaviours for touch (scrolling, zooming). If you build a touch-based app (like a drawing canvas), you need to prevent these:

```js
// Prevent scrolling/zooming when touching the canvas
canvas.addEventListener("touchstart", e => e.preventDefault(), { passive: false });

// Or even better — use CSS to disable it entirely for a specific element:
// canvas { touch-action: none; }
```

---

# 6. Web Storage API

## 6.1 What Is Web Storage?

Before Web Storage, browsers stored data using **cookies** — but cookies have major drawbacks: 4KB size limit, sent with every HTTP request, difficult syntax.

**Web Storage** gives each website a dedicated in-browser key-value store with two variants:

| Feature | `localStorage` | `sessionStorage` |
|---|---|---|
| Survives page reload | ✅ Yes | ✅ Yes |
| Survives tab close | ✅ Yes | ❌ No |
| Survives browser close | ✅ Yes | ❌ No |
| Shared across tabs | ✅ Yes (same origin) | ❌ No (tab-specific) |
| Storage limit | ~5–10MB | ~5–10MB |
| Sent to server? | ❌ No | ❌ No |

> **Real-world analogy:**
> - `localStorage` = Your notebook at home. Still there when you return tomorrow.
> - `sessionStorage` = A sticky note on your desk. Gone when you leave the office.

---

## 6.2 The Storage API Methods

Both `localStorage` and `sessionStorage` share the exact same API:

```js
// Store a value
storage.setItem("key", "value");

// Read a value
const value = storage.getItem("key");

// Remove one item
storage.removeItem("key");

// Clear ALL items in this storage
storage.clear();

// Number of items stored
console.log(storage.length);

// Get the key name at a specific index
const keyName = storage.key(0);
```

---

## 6.3 `localStorage` in Action

```js
// --- Saving data ---
localStorage.setItem("username", "Tunde");
localStorage.setItem("city", "Lagos");
localStorage.setItem("theme", "dark");

// --- Reading data ---
const username = localStorage.getItem("username");
console.log(username);   // Output: Tunde

// If a key doesn't exist, getItem returns null
const missing = localStorage.getItem("nonexistent");
console.log(missing);    // Output: null

// --- Removing data ---
localStorage.removeItem("theme");
console.log(localStorage.getItem("theme")); // Output: null

// --- Count items ---
console.log(localStorage.length); // Output: 2 (username, city remain)

// --- Iterate all keys ---
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, "=", localStorage.getItem(key));
}
// Output:
// username = Tunde
// city = Lagos
```

---

## 6.4 Storing Objects and Arrays (JSON Serialization)

Web Storage only stores **strings**. To store objects or arrays, you must convert them with `JSON.stringify()` and `JSON.parse()`:

```js
// ❌ Wrong — stores "[object Object]" not the actual data
const user = { name: "Babatunde", age: 28 };
localStorage.setItem("user", user);
console.log(localStorage.getItem("user")); // Output: [object Object]

// ✅ Correct — serialize first
localStorage.setItem("user", JSON.stringify(user));

// ✅ Correct — parse when reading back
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name); // Output: Babatunde
console.log(savedUser.age);  // Output: 28
```

### Storing an array:

```js
const recentSearches = ["iPhone 15", "Samsung S24", "MacBook Air"];
localStorage.setItem("searches", JSON.stringify(recentSearches));

const loaded = JSON.parse(localStorage.getItem("searches"));
console.log(loaded[0]); // Output: iPhone 15
console.log(loaded.length); // Output: 3
```

---

## 6.5 `sessionStorage` in Action

```js
// Store data for this tab session only
sessionStorage.setItem("cartStep", "payment");
sessionStorage.setItem("orderId", "ORD-2024-08871");

// Read it
console.log(sessionStorage.getItem("orderId")); // Output: ORD-2024-08871

// When the tab is closed, ALL of this is wiped automatically
```

**Use cases for `sessionStorage`:**
- Multi-step form data (so pressing Back restores your answers)
- Shopping cart state during checkout
- Temporary filters that reset when the user closes the tab

---

## 6.6 The `storage` Event — Syncing Across Tabs

When `localStorage` is changed in one tab, a `storage` event fires in **all other tabs** of the same origin. This allows real-time sync.

```js
// In Tab 2, listening for changes made by Tab 1:
window.addEventListener("storage", function(event) {
  console.log("Key changed:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("Changed by URL:", event.url);
});

// In Tab 1:
localStorage.setItem("theme", "light");
// Tab 2 immediately logs:
// Key changed: theme
// Old value: dark
// New value: light
```

> **Real-world use:** Dark/light mode that syncs instantly across all open tabs of your app.

---

## 6.7 Checking Storage Availability

```js
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const testKey = "__storage_test__";
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

if (storageAvailable("localStorage")) {
  console.log("localStorage is available!");
} else {
  console.log("Use cookies or another fallback.");
}
```

> 💡 **Why check?** In private/incognito mode on some browsers, `localStorage` may be disabled or throw a `SecurityError` when you try to write to it.

---

# 7. Constraint Validation API

## 7.1 What Problem Does It Solve?

HTML5 introduced form validation attributes like `required`, `minlength`, `pattern`, `type="email"`, etc. The browser enforces these automatically. But sometimes you need:
- Custom error messages in Yoruba, Igbo, or Pidgin English.
- Dynamic validation logic (e.g., "password must match confirm-password").
- Validation triggered programmatically.

The **Constraint Validation API** gives JavaScript access to the browser's built-in validation engine so you can read, control, and customise it.

---

## 7.2 HTML Validation Constraints (The Source of Truth)

```html
<form id="registrationForm">
  <input id="name"     type="text"     required minlength="2" maxlength="50">
  <input id="email"    type="email"    required>
  <input id="phone"    type="tel"      pattern="[0-9]{11}" title="Enter 11 digits">
  <input id="age"      type="number"   min="18" max="100">
  <input id="website"  type="url">
  <button type="submit">Register</button>
</form>
```

---

## 7.3 Key API Properties

Every form element exposes these properties:

```js
const emailInput = document.getElementById("email");
emailInput.value = "not-an-email";

// validity — A ValidityState object with boolean flags
console.log(emailInput.validity.valid);        // false
console.log(emailInput.validity.typeMismatch); // true  (wrong type)
console.log(emailInput.validity.valueMissing); // false (value was provided)

// validationMessage — The browser's built-in error message
console.log(emailInput.validationMessage);
// Output: "Please include an '@' in the email address."

// willValidate — true if this element participates in validation
console.log(emailInput.willValidate); // true

// checkValidity() — true if valid, false if not (and fires 'invalid' event)
console.log(emailInput.checkValidity()); // false
```

---

## 7.4 The `ValidityState` Object — All Flags

```js
const input = document.getElementById("age");
input.value = "15";

const v = input.validity;

console.log(v.valueMissing);    // true if required but empty
console.log(v.typeMismatch);    // true if value doesn't match type (e.g. "abc" in type="email")
console.log(v.patternMismatch); // true if value doesn't match pattern attribute
console.log(v.tooLong);         // true if value exceeds maxlength
console.log(v.tooShort);        // true if value is below minlength
console.log(v.rangeUnderflow);  // true if number < min
console.log(v.rangeOverflow);   // true if number > max
console.log(v.stepMismatch);    // true if value doesn't match step
console.log(v.badInput);        // true if browser can't convert value
console.log(v.customError);     // true if setCustomValidity() was used
console.log(v.valid);           // true if ALL of the above are false
```

---

## 7.5 `setCustomValidity()` — Custom Error Messages

```js
const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", function() {
  if (this.value.length !== 11) {
    // Set a custom error — this also makes validity.customError = true
    this.setCustomValidity("Phone number must be exactly 11 digits (e.g. 08012345678)");
  } else {
    // Clear the custom error — restores normal validation
    this.setCustomValidity("");
  }
});
```

> ⚠️ **Common mistake:** Forgetting to clear the custom error:
> ```js
> // ❌ Wrong — once set, customError stays forever even if fixed
> if (phone.length < 11) setCustomValidity("Too short");
>
> // ✅ Correct — clear it when the value becomes valid
> if (phone.length < 11) {
>   setCustomValidity("Too short");
> } else {
>   setCustomValidity(""); // Clears the error
> }
> ```

---

## 7.6 `reportValidity()` — Show Validation UI Programmatically

```js
const form = document.getElementById("registrationForm");

document.getElementById("checkBtn").addEventListener("click", function() {
  // This checks ALL fields and shows native browser validation UI (red outline, tooltip)
  const isValid = form.reportValidity();

  if (isValid) {
    console.log("Form is valid! Ready to submit.");
  } else {
    console.log("Form has errors. Fix them first.");
  }
});
```

---

## 7.7 Full Custom Validation Example (No Browser Defaults)

```js
const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent browser's default submission

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  let isFormValid = true;

  // Clear previous custom errors
  [name, email, phone].forEach(field => field.setCustomValidity(""));

  // Custom rule: name must not contain numbers
  if (/\d/.test(name.value)) {
    name.setCustomValidity("Abeg, name no fit contain numbers.");
    isFormValid = false;
  }

  // Use built-in email validation
  if (!email.validity.valid) {
    email.setCustomValidity("Enter valid email address.");
    isFormValid = false;
  }

  // Custom phone check
  if (!/^0[7-9][01]\d{8}$/.test(phone.value)) {
    phone.setCustomValidity("Enter valid Nigerian number (e.g. 08012345678).");
    isFormValid = false;
  }

  if (isFormValid) {
    console.log("Form submitted successfully!");
    form.submit();
  } else {
    form.reportValidity(); // Show all custom error messages
  }
});
```

---

# 8. Web Workers API

## 8.1 The Problem: JavaScript Is Single-Threaded

JavaScript runs on a single thread. That means it can only do **one thing at a time**. If you run a heavy calculation — sorting a million records, processing a large image — it **blocks the entire page**. Buttons freeze. Animations stutter. Scrolling locks up. The user sees a frozen UI.

> **Real-world analogy:** Imagine a bank with only one teller. If one customer has 1000 transactions to process, everyone else in the queue has to wait. **Web Workers** are like hiring extra tellers — they work in separate booths simultaneously.

---

## 8.2 How Web Workers Solve This

A **Web Worker** is a JavaScript file that runs in a **completely separate background thread**. It can do heavy computation without touching the main thread. The main thread (your page) and the worker communicate by **passing messages** back and forth.

```
Main Thread (UI)                Worker Thread (Background)
     |                                    |
     |---[postMessage("start")]---------> |
     |                          [does heavy work]
     |<--[postMessage(result)]----------- |
     |                                    |
   (UI stays responsive)        (computation done!)
```

---

## 8.3 What Workers CAN and CANNOT Do

| ✅ Can Do | ❌ Cannot Do |
|---|---|
| Run JavaScript | Access the DOM (no `document`, `window`) |
| `fetch()` / XMLHttpRequest | Access `localStorage` / `sessionStorage` |
| Use timers (`setTimeout`, `setInterval`) | Use `alert()`, `confirm()`, `prompt()` |
| Import scripts (`importScripts`) | Directly manipulate the page |
| Use `postMessage` to communicate | Use `document.getElementById` etc. |

---

## 8.4 Creating a Worker

You need **two separate files**:

**`main.js`** (runs on the main thread):
```js
// Create the worker — it loads from a separate JS file
const worker = new Worker("worker.js");

// Send a message TO the worker
worker.postMessage({ task: "heavyCalc", input: 1000000 });

// Receive a message FROM the worker
worker.onmessage = function(event) {
  console.log("Worker result:", event.data);
  // Output: Worker result: { sum: 500000500000 }
};

// Handle errors from the worker
worker.onerror = function(error) {
  console.error("Worker error:", error.message);
};
```

**`worker.js`** (runs on the background thread):
```js
// Listen for messages from the main thread
self.onmessage = function(event) {
  const { task, input } = event.data;

  if (task === "heavyCalc") {
    let sum = 0;
    for (let i = 1; i <= input; i++) {
      sum += i;  // Adds 1 + 2 + 3 + ... + 1,000,000
    }
    // Send the result back to the main thread
    self.postMessage({ sum });
  }
};
```

> `self` inside a worker refers to the worker's global scope (similar to `window` in the main thread).

---

## 8.5 Terminating a Worker

```js
// From the main thread — immediately stops the worker
worker.terminate();
console.log("Worker has been stopped.");

// From inside the worker itself
self.close();
```

---

## 8.6 `importScripts()` — Loading Libraries in a Worker

Workers can't use `<script>` tags. Instead, they use `importScripts()`:

```js
// Inside worker.js
importScripts("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js");

// Now lodash is available inside this worker
const result = _.chunk([1,2,3,4,5,6], 2);
self.postMessage(result);
// Sends: [[1,2],[3,4],[5,6]]
```

---

## 8.7 Shared Workers — One Worker for Multiple Tabs

A **SharedWorker** is one background thread that *multiple browser tabs* can connect to simultaneously — useful for shared state or coordinating tabs.

```js
// In main thread (multiple tabs can do this)
const sharedWorker = new SharedWorker("shared-worker.js");

sharedWorker.port.postMessage("Hello from tab!");

sharedWorker.port.onmessage = (e) => {
  console.log("Shared worker says:", e.data);
};

sharedWorker.port.start(); // Must call start() for SharedWorker
```

```js
// shared-worker.js
self.onconnect = function(e) {
  const port = e.ports[0];
  port.onmessage = function(event) {
    console.log("Received from a tab:", event.data);
    port.postMessage("All tabs acknowledged.");
  };
  port.start();
};
```

---

## 8.8 Real-World Worker Example — Sorting a Large Dataset

```js
// main.js
const worker = new Worker("sort-worker.js");

// Generate 500,000 random numbers
const bigArray = Array.from({ length: 500000 }, () => Math.random() * 1000000);

console.time("Sort");
worker.postMessage(bigArray);

worker.onmessage = (e) => {
  console.timeEnd("Sort");
  console.log("First 5 sorted:", e.data.slice(0, 5));
  // Output: Sort: 230ms
  // Output: First 5 sorted: [0.00012, 0.00045, 0.0012, ...]
};
```

```js
// sort-worker.js
self.onmessage = function(e) {
  const sorted = e.data.sort((a, b) => a - b);
  self.postMessage(sorted);
};
```

Without the worker, this sort would freeze the UI for ~230ms every time. With the worker, the UI stays perfectly smooth.

---

# 9. Applied Exercises

## Exercise 1 — Fetch: Student Grade Loader

**Objective:** Fetch student data from an API and display their grades.

**Scenario:** You're building a school management system for Redeemer's High School, Lagos. Teachers need to look up a student's grade by ID without reloading the page.

**Warm-up:**
```js
// Try this first — fetch user 3 and log their name and username
fetch("https://jsonplaceholder.typicode.com/users/3")
  .then(r => r.json())
  .then(u => console.log(u.name, u.username));
// Output: Clementine Bauch Samantha
```

**Exercise:**
```js
// Step 1: Fetch the post with id = 5 (simulate "grade record 5")
// Step 2: Log the post's userId, id, and title
// Step 3: If the fetch fails or id doesn't exist (try id=9999), show an error message
// Step 4 (Challenge): Add a function that accepts any id and fetches that record

async function getGradeRecord(studentId) {
  // Your code here
}
```

**Hints:**
- Use `response.ok` to detect 404 errors.
- Use `async/await` with `try/catch`.
- Log the error message clearly in the catch block.

**Self-check questions:**
1. What does `response.json()` return?
2. Why must you check `response.ok` manually?
3. What is the difference between a network error and a 404 error in Fetch?

---

## Exercise 2 — Geolocation: Nearest Branch Finder

**Objective:** Get the user's coordinates and calculate which Lagos branch of a bank they are nearest to.

**Scenario:** Wema Bank wants a "Find Nearest Branch" button on their website.

```js
const branches = [
  { name: "Ikeja Branch",    lat: 6.6018,  lon: 3.3515 },
  { name: "Victoria Island", lat: 6.4281,  lon: 3.4219 },
  { name: "Surulere",        lat: 6.5059,  lon: 3.3564 },
  { name: "Lekki Phase 1",   lat: 6.4441,  lon: 3.4786 }
];

function getDistance(lat1, lon1, lat2, lon2) {
  // Simple Euclidean approximation — fine for this exercise
  return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
}

// Step 1: Call getCurrentPosition()
// Step 2: For each branch, compute the distance from the user's position
// Step 3: Find the branch with the smallest distance
// Step 4: Log "Nearest branch: [branch name]"
// Step 5 (Challenge): Handle permission denied gracefully with a message

function findNearestBranch() {
  // Your code here
}
```

**Self-check questions:**
1. What three error codes can the Geolocation API return?
2. When would `enableHighAccuracy: true` drain battery?
3. What does the `watchPosition` method do differently from `getCurrentPosition`?

---

## Exercise 3 — Web Storage: Shopping Cart

**Objective:** Build a persistent shopping cart using `localStorage`.

**Scenario:** You're building a mini-store. Items added to the cart must persist after the page is refreshed.

```js
// The store's product catalogue
const products = [
  { id: 1, name: "Indomie Carton",  price: 7500  },
  { id: 2, name: "Peak Milk 400g",  price: 3200  },
  { id: 3, name: "Milo 400g",       price: 4100  }
];

// Step 1: Create an addToCart(productId) function
//         - Load existing cart from localStorage (or start with [])
//         - If product already in cart, increase quantity
//         - Otherwise, add { ...product, quantity: 1 }
//         - Save updated cart back to localStorage

// Step 2: Create a displayCart() function
//         - Load cart from localStorage
//         - Log each item: "2x Indomie Carton — ₦15,000"
//         - Log total: "Total: ₦15,000"

// Step 3: Create a clearCart() function
//         - Remove the cart key from localStorage

// Step 4: Verify by calling:
addToCart(1);
addToCart(1);
addToCart(3);
displayCart();
// Expected Output:
// 2x Indomie Carton — ₦15,000
// 1x Milo 400g — ₦4,100
// Total: ₦19,100
```

**Self-check questions:**
1. Why can't you store a plain object directly with `setItem()`?
2. What is the difference between `localStorage` and `sessionStorage`?
3. When does the `storage` event fire, and in which tab?

---

## Exercise 4 — Web Workers: Background Prime Finder

**Objective:** Find all prime numbers up to 500,000 without freezing the UI.

```js
// main.js
// Step 1: Create a worker from "prime-worker.js"
// Step 2: Send { limit: 500000 } to the worker
// Step 3: When the worker replies, log:
//         "Found [count] primes. Largest: [biggest prime]"
// Step 4: Add a button on the page that animates freely while the worker runs
//         (proves the UI is not frozen)

// prime-worker.js
// Step 1: Receive the limit
// Step 2: Use a simple trial-division sieve to find all primes up to limit
// Step 3: Send back { count, largest } to the main thread
```

**Self-check questions:**
1. Why can't a Web Worker access `document.getElementById`?
2. What method stops a worker from the main thread?
3. What is the difference between a `Worker` and a `SharedWorker`?

---

# 10. Project Simulation — Lagos Community Dashboard

## Overview

You will build a **multi-feature community dashboard** for a fictional Lagos neighbourhood association — **Surulere Residents Connect**. The dashboard will use all eight APIs covered in this tutorial.

**Features:**
1. **Weather Widget** — Fetch current weather via an API
2. **Nearby Services Map** — Show user's location and nearest amenities
3. **Announcements Board** — Fetch and display community notices from a REST API
4. **Dark/Light Mode** — Persisted with `localStorage`, synced across tabs
5. **Report a Problem Form** — With full Constraint Validation
6. **Background Data Processor** — Use a Web Worker to analyse neighbourhood data
7. **SPA Navigation** — Switch sections without page reload using History API
8. **Drawing/Touch Board** — Community whiteboard using Pointer Events

---

## Stage 1: Project Setup & Core Infrastructure

**Preview example:**
```js
// A tiny SPA shell — before adding any features
const app = {
  currentSection: "home",

  navigate(section) {
    history.pushState({ section }, "", `/${section}`);
    this.render(section);
  },

  render(section) {
    document.getElementById("content").innerHTML =
      `<h2>${section.toUpperCase()}</h2><p>Loading ${section} content...</p>`;
  }
};

window.addEventListener("popstate", e => app.render(e.state?.section || "home"));
app.render("home");
```

**Stage 1 Tasks:**
```
1. Create index.html with nav links: Home | Announcements | Map | Report | Whiteboard
2. Set up a router using History API (pushState + popstate)
3. Create render functions that swap content without reload
4. Add a theme toggle (light/dark) that saves to localStorage
5. On page load, read theme from localStorage and apply it
6. Listen for the storage event to sync theme across tabs
```

**Expected output:**
- Clicking nav links changes the URL (`/announcements`, `/map`, etc.) without reload.
- Refreshing the page shows the correct section.
- Toggling dark mode persists after refresh.

---

## Stage 2: Fetch, Geolocation & Web Workers

**Preview example:**
```js
// Fetch announcements and find the 3 most recent ones in a worker
const worker = new Worker("filter-worker.js");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then(r => r.json())
  .then(posts => {
    worker.postMessage({ posts, limit: 3 });
  });

worker.onmessage = e => {
  console.log("Top 3 announcements:", e.data);
};
```

**Stage 2 Tasks:**
```
1. Fetch 20 posts from JSONPlaceholder as "community announcements"
2. Pass them to a Web Worker that:
   - Sorts by id (descending)
   - Filters to only posts with titles longer than 40 characters
   - Returns the top 5 results
3. Display results on the Announcements page
4. Add a Geolocation button on the Map page:
   - Shows "Finding your location..." while waiting
   - Displays lat/lon when found
   - Shows the nearest of 5 hardcoded Surulere landmarks
5. Handle all Geolocation error codes gracefully
```

**Expected output:**
- Announcements section shows 5 filtered community notices.
- Map section shows user's coordinates and nearest landmark.
- Worker runs without freezing the page (verify by adding an animated spinner).

---

## Stage 3: Forms, Whiteboard & Deployment Polish

**Preview example:**
```js
// Pointer-based whiteboard preview
const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
let isDrawing = false;

canvas.style.touchAction = "none"; // Prevent scroll on touch

canvas.addEventListener("pointerdown", e => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointermove", e => {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

canvas.addEventListener("pointerup", () => isDrawing = false);
```

**Stage 3 Tasks:**
```
1. Build the Report a Problem form with fields:
   - Name (required, no digits, minlength 2)
   - Email (required, type="email")
   - Nigerian phone (pattern: ^0[7-9][01]\d{8}$)
   - Problem description (required, minlength 20)
   - Category (required: "Road | Light | Water | Security")
   All with setCustomValidity() messages in plain English/Pidgin

2. On valid submit: save the report to localStorage and confirm to user

3. Build the Whiteboard section:
   - Canvas element with pointer events (works on mouse AND touch)
   - Colour picker for pen colour
   - Pen size slider
   - Clear button
   - Save button (downloads canvas as PNG)
   - Show pointer type ("You are drawing with: mouse/touch/pen")

4. Add a localStorage-based history of submitted reports:
   - Show last 5 reports on the Map page as "Known Issues"

5. Polish: add loading spinners for all async operations
```

**Expected output:**
- Form rejects invalid Nigerian phone numbers with Pidgin error message.
- Whiteboard works with mouse on laptop and finger on mobile.
- Submitted reports appear in the "Known Issues" list and persist on refresh.

---

## Reflection Questions

1. When would you use `sessionStorage` instead of `localStorage` in the dashboard?
2. If two users submit a problem report at the same time, what issue would arise with `localStorage` as the "database"? How would a real company solve this?
3. The Web Worker receives 1000 posts and sorts them. What would happen to the UI if you ran the same sort on the main thread?
4. Why is it important to call `setCustomValidity("")` when an input becomes valid again?
5. The Pointer Events API works for mouse, touch, and pen. What accessibility scenario does this solve compared to mouse-only events?
6. If a user navigates to `/announcements` by typing it directly in the address bar (not using your SPA router), what needs to happen server-side to support this?

---

## Optional Advanced Features

- Add offline support: cache fetched announcements in `localStorage`; show cached data when the network is unavailable.
- Use a `SharedWorker` to sync the cart/report count badge across multiple open tabs.
- Use `history.replaceState` to update the URL whenever a filter changes (e.g., category filter on announcements) without adding to history.
- Add `enableHighAccuracy: true` to the geolocation call and display how the accuracy changes.
- Use pointer pressure (`e.pressure`) to make the drawing pen width dynamic on stylus input.

---

# 11. Completion Checklist · Quiz · Gotchas

## ✅ Completion Checklist

- [ ] I can explain the difference between a Browser API and a Third-Party API.
- [ ] I can use `fetch()` with both `.then()` chains and `async/await`.
- [ ] I know why I must check `response.ok` manually in Fetch.
- [ ] I can retrieve a user's location with `getCurrentPosition()` and handle all 3 error codes.
- [ ] I understand the difference between `pushState()` and `replaceState()`.
- [ ] I know when `popstate` fires and when it does NOT fire.
- [ ] I can use Pointer Events to handle mouse, touch, and stylus input in one handler.
- [ ] I know how to store objects in `localStorage` using `JSON.stringify` and `JSON.parse`.
- [ ] I know the difference between `localStorage` (persists) and `sessionStorage` (tab-only).
- [ ] I can use `setCustomValidity()` to set AND clear custom error messages.
- [ ] I understand why `setCustomValidity("")` must be called to clear errors.
- [ ] I know that Web Workers cannot access the DOM.
- [ ] I can communicate between a worker and the main thread using `postMessage`.
- [ ] I built the Lagos Community Dashboard (or a significant portion of it).

---

## 🏆 10-Question Self-Assessment Quiz

**Q1.** What does `response.json()` return?
- a) A plain JavaScript object
- b) A JSON string
- c) A Promise that resolves to a JavaScript object ✅
- d) Nothing — it logs to the console

**Q2.** A `fetch()` to an invalid URL that returns a 404 status — does the `.catch()` run?
- a) Yes ❌
- b) No — you must check `response.ok` manually ✅

**Q3.** Which Geolocation error code means "user denied permission"?
- a) 0 ❌
- b) 1 ✅
- c) 2 ❌
- d) 3 ❌

**Q4.** `history.pushState()` fires the `popstate` event?
- a) True ❌
- b) False ✅ (popstate fires on back/forward navigation, not on pushState)

**Q5.** Which Pointer Event property tells you whether input came from a finger or a mouse?
- a) `event.inputDevice` ❌
- b) `event.pointerType` ✅
- c) `event.deviceType` ❌
- d) `event.touchType` ❌

**Q6.** You call `localStorage.setItem("cart", { items: [] })`. What is stored?
- a) The object `{ items: [] }` ❌
- b) The string `"[object Object]"` ✅
- c) An empty array ❌

**Q7.** The `storage` event fires in:
- a) The same tab that changed `localStorage` ❌
- b) All other tabs of the same origin ✅
- c) All browser windows globally ❌

**Q8.** After calling `setCustomValidity("Error message")`, what must you call to clear the error?
- a) `setCustomValidity(null)` ❌
- b) `setCustomValidity("")` ✅
- c) `clearValidity()` ❌
- d) It clears automatically when the user types ❌

**Q9.** A Web Worker can access `document.getElementById()`:
- a) True ❌
- b) False ✅

**Q10.** What is the difference between `Worker` and `SharedWorker`?
- a) `SharedWorker` is faster ❌
- b) `SharedWorker` can be shared between multiple tabs/pages of the same origin ✅
- c) `Worker` runs on the server ❌
- d) There is no difference ❌

**Answer key:** 1-c, 2-b, 3-b, 4-b, 5-b, 6-b, 7-b, 8-b, 9-b, 10-b

---

## 🚨 Key Gotchas Summary

| # | Gotcha | Fix |
|---|---|---|
| 1 | Trying to read `data.property` in the first `.then()` of a fetch | Always call `.json()` first; data is in the **second** `.then()` |
| 2 | Assuming `fetch()` rejects on 404/500 | Always check `response.ok` or `response.status` manually |
| 3 | Storing plain objects with `localStorage.setItem` | Always use `JSON.stringify()` before storing and `JSON.parse()` after reading |
| 4 | Thinking `popstate` fires on `pushState` | `popstate` only fires on back/forward navigation or `history.go()` |
| 5 | Forgetting `setCustomValidity("")` when input becomes valid | The `customError` flag stays `true` until you explicitly clear it with `""` |
| 6 | Trying to use `document` inside a Web Worker | Workers have no DOM access — send results back via `postMessage` |
| 7 | Using `mouse*` events only — breaks on touch devices | Use Pointer Events for unified mouse/touch/pen handling |
| 8 | Not handling Geolocation error codes | Always pass an error callback with a `switch` on `error.code` |
| 9 | Forgetting `touch-action: none` on a Pointer Events canvas | Without it, scrolling/zooming interfere with drawing on mobile |
| 10 | Not checking `response.ok` after fetch returns | A successful network request ≠ a successful HTTP status |

---

## 💬 Final Reflection Questions

1. The Fetch API, Geolocation, and Web Workers all involve **asynchronous** operations. What is the one core concept that all three rely on to handle async behaviour?
2. If you were building a ride-hailing app like Bolt, which APIs from this tutorial would you use — and for what specific feature?
3. A Web Worker and an `async function` both avoid blocking the UI thread. What is the fundamental architectural difference between the two?
4. You need to remember a user's language preference (English/Yoruba/Igbo) across sessions but reset their active shopping session on each visit. Which storage type would you use for each, and why?
5. Your client says: *"Our form validation is breaking for users in Northern Nigeria using older Android phones."* Which API properties would you use to diagnose whether the issue is constraint validation browser support or network-related?

---

> **One-sentence summary:** JavaScript's built-in Web APIs — Fetch, Geolocation, History, Pointer Events, Web Storage, Constraint Validation, and Web Workers — give every browser application a complete toolkit for networking, location, navigation, input, persistence, form integrity, and parallel computing, all without installing any external library.
