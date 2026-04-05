---
title: "JavaScript AJAX: AJAX Intro · XMLHttpRequest · Sending Requests · Handling Responses · XML Files · PHP & ASP Integration · Database Communication · AJAX Applications & Examples"
nav_order: 41
---

## Table of Contents
1. [Chapter 1 — What Is AJAX?](#chapter-1)
2. [Chapter 2 — The XMLHttpRequest Object](#chapter-2)
3. [Chapter 3 — Sending AJAX Requests](#chapter-3)
4. [Chapter 4 — Handling AJAX Responses](#chapter-4)
5. [Chapter 5 — Loading XML Files with AJAX](#chapter-5)
6. [Chapter 6 — AJAX with PHP](#chapter-6)
7. [Chapter 7 — AJAX with ASP](#chapter-7)
8. [Chapter 8 — AJAX and Databases](#chapter-8)
9. [Chapter 9 — AJAX Applications](#chapter-9)
10. [Chapter 10 — AJAX Examples Gallery](#chapter-10)
11. [Phase 2 — Applied Exercises](#phase-2)
12. [Phase 3 — Project: Live Product Search Dashboard](#phase-3)
13. [Completion Checklist](#checklist)

---

<a name="chapter-1"></a>
## Chapter 1 — What Is AJAX?

### 1.1 The Real-World Problem AJAX Solves

Imagine you are on a shopping website — Jumia Nigeria. You type a product name into the search box and, instead of the entire page reloading, only the search results section updates. The header, footer, and your shopping cart stay exactly where they are.

Before AJAX, every user action that required new data from a server caused the **entire page to reload** — a slow, jarring experience. AJAX was invented to fix this.

**AJAX** stands for:
- **A** — Asynchronous
- **J** — JavaScript
- **A** — And
- **X** — XML (though today JSON is far more common)

> **Simple definition:** AJAX lets a web page communicate with a server in the background — fetching or sending data — without reloading the page.

---

### 1.2 What "Asynchronous" Means

The word **asynchronous** is the most important word in AJAX. Let's understand it with an analogy.

**Synchronous (blocking):** You call a restaurant to order food. You stay on hold the entire time the chef cooks — you cannot do anything else until your food is ready. This is how a full page reload works.

**Asynchronous (non-blocking):** You place your order and hang up. You go watch TV, read the news, do whatever you want. When the food arrives, you're notified. This is how AJAX works.

```javascript
// Synchronous analogy in JavaScript (blocking — bad for UX)
const data = fetchDataSynchronously(); // Everything freezes here
console.log(data);                     // Only runs after fetch completes

// Asynchronous (AJAX style — non-blocking)
fetchDataAsync(function(data) {
  console.log(data);   // Runs whenever server responds
});
console.log("I run immediately, without waiting!"); // Runs right away
// Output:
// "I run immediately, without waiting!"
// [data from server arrives later]
```

---

### 1.3 What AJAX Is NOT

| Myth | Reality |
|------|---------|
| AJAX is a programming language | ❌ No. It is a technique using existing technologies |
| AJAX only works with XML data | ❌ No. JSON, plain text, and HTML are all common |
| AJAX requires a special library | ❌ No. It is built into all modern browsers |
| AJAX is the same as the Fetch API | ❌ No. Fetch is a newer alternative to AJAX's `XMLHttpRequest` |

---

### 1.4 How AJAX Works — Step by Step

```
User Action (e.g., types in search box)
        ↓
JavaScript creates an XMLHttpRequest object
        ↓
Request is sent to the server (background)
        ↓
User keeps interacting with the page
        ↓
Server processes request, sends back data
        ↓
JavaScript receives data, updates only relevant part of page
        ↓
User sees updated content — no page reload!
```

---

### 1.5 Technologies AJAX Uses

AJAX is not a single technology — it is a **combination** of:

| Technology | Role |
|------------|------|
| **HTML/CSS** | Structure and style of the page |
| **JavaScript** | Sends and receives data, updates the DOM |
| **XMLHttpRequest (or Fetch API)** | The mechanism that talks to the server |
| **Server-side language (PHP, Node.js, etc.)** | Processes the request and returns data |
| **JSON or XML** | Format of the data exchanged |

---

### 1.6 Real-World AJAX Use Cases in Nigeria and Beyond

| Application | How AJAX is Used |
|-------------|-----------------|
| **Flutterwave payment** | Validates card details without reloading |
| **Cowrywise investment app** | Loads portfolio data live |
| **Konga product search** | Shows suggestions as you type |
| **Gmail** | Sends emails without reloading the inbox |
| **Google Maps** | Loads map tiles as you pan and zoom |
| **Twitter/X** | Loads new tweets without a full refresh |

---

### 1.7 Thinking Question

> 🤔 What would your favourite website feel like if every button click triggered a full page reload? Think of three things that would be worse about the experience.

---

<a name="chapter-2"></a>
## Chapter 2 — The XMLHttpRequest Object

### 2.1 What Is the XMLHttpRequest Object?

The **XMLHttpRequest (XHR) object** is the engine behind AJAX. It is a built-in JavaScript object that browsers provide, which allows you to:
- Make HTTP requests to a server
- Receive responses
- Do all of this without reloading the page

Think of it as a **private courier** your JavaScript code can dispatch to fetch information from a server and bring it back.

```javascript
// Creating the courier
const xhr = new XMLHttpRequest();

console.log(typeof xhr); // Output: "object"
```

---

### 2.2 Browser Compatibility Note

Modern browsers (Chrome, Firefox, Edge, Safari) all support `XMLHttpRequest`. Very old Internet Explorer (IE5, IE6) used a different approach (`ActiveXObject`). You may sometimes see legacy compatibility code:

```javascript
// Legacy compatibility pattern (rarely needed today)
let xhr;

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();          // Modern browsers
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP"); // Old IE
}

console.log("XHR object ready:", xhr); // Output: XHR object ready: XMLHttpRequest {}
```

> For any project targeting modern users (2020+), simply use `new XMLHttpRequest()` directly.

---

### 2.3 The XHR Object's Key Properties

Once you create an XHR object, it comes with built-in properties that track the state and results of your request.

#### `readyState` — The Lifecycle Tracker

Every AJAX request passes through **5 states**, numbered 0–4:

| Value | Constant Name | Meaning |
|-------|--------------|---------|
| `0` | `UNSENT` | Object created, `open()` not yet called |
| `1` | `OPENED` | `open()` has been called |
| `2` | `HEADERS_RECEIVED` | `send()` called, headers received |
| `3` | `LOADING` | Response body being received |
| `4` | `DONE` | Request complete, full response received |

```javascript
const xhr = new XMLHttpRequest();
console.log(xhr.readyState); // Output: 0  (UNSENT)

xhr.open("GET", "https://api.example.com/data");
console.log(xhr.readyState); // Output: 1  (OPENED)
```

---

#### `status` — The HTTP Response Code

After the server responds, `xhr.status` contains the **HTTP status code**:

| Code | Meaning |
|------|---------|
| `200` | OK — request succeeded |
| `201` | Created — resource created |
| `400` | Bad Request — malformed request |
| `401` | Unauthorized — login required |
| `403` | Forbidden — no permission |
| `404` | Not Found — resource doesn't exist |
| `500` | Internal Server Error — server crashed |

```javascript
// After a successful request:
console.log(xhr.status);     // Output: 200
console.log(xhr.statusText); // Output: "OK"
```

---

#### `responseText` and `responseXML`

| Property | Contains |
|----------|----------|
| `xhr.responseText` | Server response as a plain string |
| `xhr.responseXML` | Server response parsed as an XML document |

```javascript
// After a successful request returning JSON text:
console.log(xhr.responseText);
// Output: '{"name":"Tunde","balance":50000}'

// Parse it into a real JavaScript object:
const data = JSON.parse(xhr.responseText);
console.log(data.name);    // Output: "Tunde"
console.log(data.balance); // Output: 50000
```

---

### 2.4 The `onreadystatechange` Event Handler

Every time `readyState` changes, the browser fires this event. You assign a **callback function** to it:

```javascript
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  console.log("State changed to:", xhr.readyState);
};

xhr.open("GET", "data.json");
xhr.send();

// Output (in sequence):
// "State changed to: 1"
// "State changed to: 2"
// "State changed to: 3"
// "State changed to: 4"
```

In practice you only care about state `4` (done) and status `200` (success):

```javascript
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log("Success! Data:", xhr.responseText);
  }
};
```

---

### 2.5 Common Beginner Mistake — Checking State Too Early

```javascript
// ❌ WRONG — readyState is checked before send() completes
const xhr = new XMLHttpRequest();
xhr.open("GET", "data.json");
xhr.send();
console.log(xhr.responseText); // Output: "" (empty — request not done yet!)

// ✅ CORRECT — check inside the event handler
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText); // Output: actual data
  }
};
```

> **Why this happens:** `send()` is asynchronous. JavaScript does not wait for the server — it immediately continues to the next line. The response only exists after the event fires.

---

<a name="chapter-3"></a>
## Chapter 3 — Sending AJAX Requests

### 3.1 The Two Key Methods: `open()` and `send()`

To make an AJAX request, you always follow these steps:
1. **Create** the XHR object
2. **Configure** it with `open()`
3. **Send** it with `send()`

```javascript
const xhr = new XMLHttpRequest();     // Step 1: Create
xhr.open("GET", "products.json");     // Step 2: Configure
xhr.send();                           // Step 3: Send
```

---

### 3.2 The `open()` Method — Deep Dive

```javascript
xhr.open(method, url, async, user, password);
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `method` | String | ✅ Yes | HTTP method: `"GET"`, `"POST"`, `"PUT"`, `"DELETE"` |
| `url` | String | ✅ Yes | The server endpoint URL |
| `async` | Boolean | Optional | `true` (default, non-blocking) or `false` (blocking — avoid!) |
| `user` | String | Optional | Username for authentication |
| `password` | String | Optional | Password for authentication |

```javascript
// GET request (most common for reading data)
xhr.open("GET", "/api/products");

// POST request (for sending/creating data)
xhr.open("POST", "/api/orders");

// With explicit async flag (true is the default)
xhr.open("GET", "/api/users", true);
```

---

### 3.3 GET vs POST — When to Use Which

#### GET Requests

Used for **reading** or **fetching** data. Parameters are sent in the URL.

```javascript
// Fetching all products
xhr.open("GET", "/api/products");
xhr.send(); // No body needed for GET

// Fetching with query parameters
xhr.open("GET", "/api/products?category=electronics&maxPrice=100000");
xhr.send();
// The URL becomes: /api/products?category=electronics&maxPrice=100000
```

**GET characteristics:**
- Data is visible in the URL (don't use for passwords!)
- Can be bookmarked and cached
- Limited data size (~2000 characters in URL)
- Idempotent — calling it multiple times has the same result

#### POST Requests

Used for **sending** data to the server (creating, updating resources). Data goes in the request body.

```javascript
const xhr = new XMLHttpRequest();
xhr.open("POST", "/api/orders");

// Tell the server what format we're sending
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Data goes into send(), not the URL
xhr.send("product=iPhone&quantity=2&price=450000");
```

**POST characteristics:**
- Data is in the body (not visible in URL)
- Better for sensitive data (passwords, payment info)
- No size limit (practically)
- Not cached by default

---

### 3.4 The `setRequestHeader()` Method

Before sending, you can add **HTTP headers** to your request. Headers are metadata that tell the server how to interpret your request.

```javascript
xhr.setRequestHeader(headerName, headerValue);
```

Common headers:

```javascript
// Tell server you're sending URL-encoded form data
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Tell server you're sending JSON
xhr.setRequestHeader("Content-Type", "application/json");

// Add an authorization token
xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9...");

// Tell server what format you accept back
xhr.setRequestHeader("Accept", "application/json");
```

> ⚠️ You must call `setRequestHeader()` **after** `open()` but **before** `send()`.

---

### 3.5 The `send()` Method — Sending Data

```javascript
xhr.send(body);
```

| Scenario | What to Pass |
|----------|-------------|
| GET request | `null` or nothing |
| POST with form data | `"key=value&key2=value2"` |
| POST with JSON | `JSON.stringify({ key: value })` |
| POST with FormData | A `FormData` object |

```javascript
// GET — no body
xhr.open("GET", "/api/data");
xhr.send();   // OR: xhr.send(null);

// POST with URL-encoded data
xhr.open("POST", "/api/register");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send("name=Babatunde&email=tunde@example.com&city=Lagos");

// POST with JSON
xhr.open("POST", "/api/transfer");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({
  from: "Tunde",
  to: "Chioma",
  amount: 25000,
  currency: "NGN"
}));
```

---

### 3.6 Preventing Caching with GET Requests

Browsers may **cache** GET responses — returning old data instead of fetching fresh data from the server. To prevent this, append a unique timestamp to the URL:

```javascript
// ❌ Might return cached (stale) data
xhr.open("GET", "/api/stockprice");
xhr.send();

// ✅ Forces a fresh request every time
const timestamp = new Date().getTime(); // e.g., 1718023456789
xhr.open("GET", "/api/stockprice?t=" + timestamp);
xhr.send();
// URL becomes: /api/stockprice?t=1718023456789
```

---

### 3.7 `onload`, `onerror`, `onprogress` — Modern Event Handlers

Beyond `onreadystatechange`, XHR supports cleaner event handlers:

```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "/api/data");

// Fires when request completes successfully
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log("Data received:", xhr.responseText);
  }
};

// Fires on network errors (no internet, server down)
xhr.onerror = function() {
  console.log("Network error! Check your connection.");
};

// Fires periodically as data is downloaded (useful for large files)
xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    const percent = (event.loaded / event.total) * 100;
    console.log("Downloaded:", Math.round(percent) + "%");
  }
};

xhr.send();
```

---

<a name="chapter-4"></a>
## Chapter 4 — Handling AJAX Responses

### 4.1 The Response Arrives — What Now?

When the server sends data back, it arrives as text in `xhr.responseText`. Your job as the developer is to:
1. Detect that the response has fully arrived (`readyState === 4`)
2. Confirm it was successful (`status === 200`)
3. Parse the response appropriately
4. Update the DOM with the new data

---

### 4.2 The `onreadystatechange` Pattern — Full Example

```javascript
function loadUserData(userId) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/users/" + userId);

  xhr.onreadystatechange = function() {
    // We only care about state 4 (DONE)
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Success — process the response
        const user = JSON.parse(xhr.responseText);
        document.getElementById("userName").innerText = user.name;
        document.getElementById("userBalance").innerText = "₦" + user.balance.toLocaleString();
      } else {
        // Error — show a message
        document.getElementById("error").innerText =
          "Failed to load user. Status: " + xhr.status;
      }
    }
  };

  xhr.send();
}

// Call it:
loadUserData(42);

// If server returns: {"name":"Babatunde","balance":500000}
// Page updates: userName → "Babatunde", userBalance → "₦500,000"
```

---

### 4.3 Using `responseText` — Plain Text and JSON

**Plain text response:**
```javascript
// Server returns: "Request processed successfully"
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
    // Output: "Request processed successfully"
  }
};
```

**JSON response (most common):**
```javascript
// Server returns: {"products":[{"name":"Laptop","price":450000},{"name":"Phone","price":150000}]}

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const products = data.products;

    products.forEach(function(product) {
      console.log(product.name + ": ₦" + product.price.toLocaleString());
    });

    // Output:
    // Laptop: ₦450,000
    // Phone: ₦150,000
  }
};
```

---

### 4.4 Using `responseXML` — XML Responses

If the server returns XML, you can access it as a parsed DOM document via `xhr.responseXML`.

**Server returns:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<banks>
  <bank>
    <name>GTBank</name>
    <code>058</code>
  </bank>
  <bank>
    <name>Access Bank</name>
    <code>044</code>
  </bank>
</banks>
```

**JavaScript to read it:**
```javascript
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const xmlDoc = xhr.responseXML;                      // Already a DOM object
    const banks = xmlDoc.getElementsByTagName("bank");   // Like querySelectorAll

    for (let i = 0; i < banks.length; i++) {
      const name = banks[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
      const code = banks[i].getElementsByTagName("code")[0].childNodes[0].nodeValue;
      console.log(name + " — Code: " + code);
    }

    // Output:
    // GTBank — Code: 058
    // Access Bank — Code: 044
  }
};
```

---

### 4.5 Updating the DOM with AJAX Data

The real power of AJAX is updating page content without refreshing. Here are the key DOM update patterns:

```javascript
// Method 1: Update text content
document.getElementById("balance").innerText = "₦" + amount.toLocaleString();

// Method 2: Update HTML content (renders HTML tags)
document.getElementById("productList").innerHTML = "<li>Laptop</li><li>Phone</li>";

// Method 3: Build HTML from array data
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const items = JSON.parse(xhr.responseText);
    let html = "<ul>";

    items.forEach(function(item) {
      html += `<li>${item.name} — ₦${item.price.toLocaleString()}</li>`;
    });

    html += "</ul>";
    document.getElementById("results").innerHTML = html;
  }
};
```

---

### 4.6 Common Beginner Mistake — Parsing Non-JSON

```javascript
// ❌ WRONG — server returned plain text, not JSON
const data = JSON.parse("Server error: database unavailable");
// Output: SyntaxError: Unexpected token 'S'

// ✅ CORRECT — always verify before parsing
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    try {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
    } catch (error) {
      console.log("Response is not JSON:", xhr.responseText);
    }
  }
};
```

---

### 4.7 The `getAllResponseHeaders()` Method

You can inspect the server's response headers:

```javascript
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    console.log(xhr.getAllResponseHeaders());
    // Output (sample):
    // content-type: application/json; charset=utf-8
    // content-length: 245
    // date: Mon, 01 Jan 2025 12:00:00 GMT
  }
};
```

Or get a specific header:
```javascript
const contentType = xhr.getResponseHeader("content-type");
console.log(contentType); // Output: "application/json; charset=utf-8"
```

---

<a name="chapter-5"></a>
## Chapter 5 — Loading XML Files with AJAX

### 5.1 Why Load XML Files?

XML (eXtensible Markup Language) was the original data format for AJAX. Many legacy systems, government APIs, financial institutions, and enterprise software still use XML. Understanding how to load and parse XML files remains an important skill.

> **Think of XML as a filing cabinet.** Each `<tag>` is a labelled folder, and the content inside is the document. Tags can nest inside each other, just like folders inside folders.

---

### 5.2 A Sample XML File

Imagine a file called `nigerian_states.xml` on your server:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<states>
  <state>
    <name>Lagos</name>
    <capital>Ikeja</capital>
    <region>Southwest</region>
    <population>15000000</population>
  </state>
  <state>
    <name>Kano</name>
    <capital>Kano City</capital>
    <region>Northwest</region>
    <population>13000000</population>
  </state>
  <state>
    <name>Rivers</name>
    <capital>Port Harcourt</capital>
    <region>South-south</region>
    <population>7000000</population>
  </state>
</states>
```

---

### 5.3 Loading the XML File — Full Walkthrough

**HTML structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Nigerian States</title>
</head>
<body>
  <h2>Nigerian States Information</h2>
  <button onclick="loadStates()">Load States</button>
  <div id="statesList"></div>

  <script src="states.js"></script>
</body>
</html>
```

**JavaScript (`states.js`):**
```javascript
function loadStates() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "nigerian_states.xml");  // Request the XML file

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      displayStates(xhr.responseXML);  // Pass the XML document to our display function
    }
  };

  xhr.send();
}

function displayStates(xmlDoc) {
  // Get all <state> elements from the XML
  const states = xmlDoc.getElementsByTagName("state");
  let html = "<table border='1'>";
  html += "<tr><th>State</th><th>Capital</th><th>Region</th><th>Population</th></tr>";

  for (let i = 0; i < states.length; i++) {
    const name       = getXMLValue(states[i], "name");
    const capital    = getXMLValue(states[i], "capital");
    const region     = getXMLValue(states[i], "region");
    const population = getXMLValue(states[i], "population");

    html += `<tr>
      <td>${name}</td>
      <td>${capital}</td>
      <td>${region}</td>
      <td>${Number(population).toLocaleString()}</td>
    </tr>`;
  }

  html += "</table>";
  document.getElementById("statesList").innerHTML = html;
}

// Helper function: extract text from an XML element by tag name
function getXMLValue(parentNode, tagName) {
  const elements = parentNode.getElementsByTagName(tagName);
  if (elements.length > 0 && elements[0].childNodes.length > 0) {
    return elements[0].childNodes[0].nodeValue;
  }
  return "";
}

// After clicking the button, the page renders:
// | State  | Capital       | Region     | Population |
// | Lagos  | Ikeja         | Southwest  | 15,000,000 |
// | Kano   | Kano City     | Northwest  | 13,000,000 |
// | Rivers | Port Harcourt | South-south| 7,000,000  |
```

---

### 5.4 Navigating the XML DOM

When you use `xhr.responseXML`, you get a **DOM document** — similar to the HTML DOM, but representing XML. Here are the key navigation methods:

```javascript
const xmlDoc = xhr.responseXML;

// Get elements by tag name (returns HTMLCollection)
const states = xmlDoc.getElementsByTagName("state");     // All <state> elements
const names  = xmlDoc.getElementsByTagName("name");      // All <name> elements

// Access individual items
const firstState = states[0];                            // First <state> element
const stateName  = names[0].childNodes[0].nodeValue;    // Text content of first <name>

// Get attributes (if the XML uses them)
// e.g., <state code="LA"> → state.getAttribute("code") === "LA"

console.log(states.length);   // Output: 3 (three <state> elements)
console.log(stateName);       // Output: "Lagos"
```

---

### 5.5 Common Beginner Mistake — Treating XML Like JSON

```javascript
// ❌ WRONG — XML is not JSON, you cannot use JSON.parse on it
const data = JSON.parse(xhr.responseXML);
// Output: TypeError — responseXML is already a document, not a string

// ❌ WRONG — trying to access XML like object properties
const name = xmlDoc.states.state[0].name;
// Output: TypeError — XML is DOM-based, not object-property-based

// ✅ CORRECT — use DOM methods
const name = xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue;
// Output: "Lagos"
```

---

<a name="chapter-6"></a>
## Chapter 6 — AJAX with PHP

### 6.1 How AJAX and PHP Work Together

PHP is a **server-side language** that runs on the server (not in the browser). When your JavaScript sends an AJAX request to a `.php` file, PHP executes on the server and sends a response back.

```
Browser (JavaScript)  →  AJAX Request  →  Server (PHP)
Browser (JavaScript)  ←  Response      ←  Server (PHP output)
```

This is how most dynamic websites work:
- **Front end** (JavaScript): Sends requests, updates UI
- **Back end** (PHP): Queries database, processes logic, returns data

---

### 6.2 Classic Use Case — Auto-Suggest / Typeahead

When a user types in a search box, AJAX sends each keystroke to PHP, which searches a database and returns matching suggestions — all without a page reload.

**HTML (index.html):**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Search Nigerian Banks</title>
</head>
<body>
  <h2>Bank Lookup</h2>
  <p>
    <label>Type a bank name:</label>
    <input type="text" id="bankInput" oninput="lookupBank(this.value)">
  </p>
  <div id="suggestions"></div>

  <script>
    function lookupBank(query) {
      if (query.length === 0) {
        document.getElementById("suggestions").innerHTML = "";
        return; // Don't search for empty string
      }

      const xhr = new XMLHttpRequest();
      xhr.open("GET", "lookup_bank.php?q=" + encodeURIComponent(query));

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          document.getElementById("suggestions").innerHTML = xhr.responseText;
        }
      };

      xhr.send();
    }
  </script>
</body>
</html>
```

**PHP (lookup_bank.php):**
```php
<?php
// Sample bank list (in a real app, this comes from a database)
$banks = [
  "Access Bank",
  "GTBank (Guaranty Trust Bank)",
  "First Bank of Nigeria",
  "Zenith Bank",
  "UBA (United Bank for Africa)",
  "Fidelity Bank",
  "Sterling Bank",
  "Polaris Bank",
  "Union Bank",
  "Wema Bank"
];

$query = strtolower($_GET["q"]);  // Get search term from URL parameter
$results = [];

foreach ($banks as $bank) {
  if (strpos(strtolower($bank), $query) !== false) {
    $results[] = "<p>" . $bank . "</p>";
  }
}

if (count($results) === 0) {
  echo "<p>No banks found matching: " . htmlspecialchars($query) . "</p>";
} else {
  echo implode("", $results);
}
?>
```

**What happens when user types "zen":**
```
JavaScript sends: GET lookup_bank.php?q=zen
PHP finds: "Zenith Bank"
PHP echoes: <p>Zenith Bank</p>
JavaScript inserts into #suggestions div: Zenith Bank appears below input
```

---

### 6.3 Using POST with PHP

For sending data securely (login forms, payments), use POST:

**JavaScript:**
```javascript
function processPayment(amount, recipient) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "process_payment.php");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("paymentResult").innerHTML = xhr.responseText;
    }
  };

  const data = "amount=" + amount + "&recipient=" + encodeURIComponent(recipient);
  xhr.send(data);
}

// Call:
processPayment(50000, "Chioma Okafor");
```

**PHP (process_payment.php):**
```php
<?php
$amount    = $_POST["amount"];
$recipient = $_POST["recipient"];

// Validation
if (!is_numeric($amount) || $amount <= 0) {
  echo "Invalid amount.";
  exit;
}

// In real app: process payment via Flutterwave/Paystack API
// Simulate success:
echo "✅ Transfer of ₦" . number_format($amount) . " to " . htmlspecialchars($recipient) . " was successful!";
?>
```

**PHP response received by JavaScript:**
```
✅ Transfer of ₦50,000 to Chioma Okafor was successful!
```

---

### 6.4 PHP Returning JSON

Modern practice is to have PHP return **JSON** instead of raw HTML:

**PHP:**
```php
<?php
header("Content-Type: application/json"); // Tell client we're sending JSON

$user = [
  "id"      => 42,
  "name"    => "Babatunde",
  "balance" => 500000,
  "city"    => "Lagos"
];

echo json_encode($user);
// Output: {"id":42,"name":"Babatunde","balance":500000,"city":"Lagos"}
?>
```

**JavaScript:**
```javascript
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const user = JSON.parse(xhr.responseText);
    console.log("Hello, " + user.name + "!");
    console.log("Your balance: ₦" + user.balance.toLocaleString());
    // Output:
    // Hello, Babatunde!
    // Your balance: ₦500,000
  }
};
```

---

<a name="chapter-7"></a>
## Chapter 7 — AJAX with ASP

### 7.1 What is ASP?

**ASP (Active Server Pages)** and its modern version **ASP.NET** are Microsoft's server-side web technologies. ASP files use the `.asp` or `.aspx` extension and run on Windows servers (typically with IIS — Internet Information Services).

Many Nigerian government portals, banking backends, and enterprise systems built in the early 2000s run on ASP. The JavaScript/AJAX side works **identically** — only the server-side language changes.

---

### 7.2 ASP Classic — Auto-Suggest Example

**HTML (index.html):** *(identical to the PHP version)*
```html
<input type="text" id="nameInput" oninput="lookupPerson(this.value)">
<div id="suggestions"></div>

<script>
  function lookupPerson(query) {
    if (query.length === 0) {
      document.getElementById("suggestions").innerHTML = "";
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "lookup.asp?q=" + encodeURIComponent(query));

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        document.getElementById("suggestions").innerHTML = xhr.responseText;
      }
    };

    xhr.send();
  }
</script>
```

**ASP Classic (lookup.asp):**
```asp
<%
Dim query
query = LCase(Request.QueryString("q"))

' Sample data (in real app, from database)
Dim names(4)
names(0) = "Babatunde Adewale"
names(1) = "Chioma Okafor"
names(2) = "Emeka Eze"
names(3) = "Funmilayo Okonkwo"
names(4) = "Gbenga Adeleke"

Dim i
For i = 0 To 4
  If InStr(LCase(names(i)), query) > 0 Then
    Response.Write("<p>" & names(i) & "</p>")
  End If
Next
%>
```

---

### 7.3 ASP.NET — Modern Approach

**ASP.NET** is Microsoft's modern successor to ASP Classic. It uses C# or VB.NET and supports JSON natively:

**ASP.NET Web API Controller (C#):**
```csharp
[HttpGet]
[Route("api/users/search")]
public IActionResult SearchUsers(string q) {
    var users = new List<string> { "Babatunde", "Chioma", "Emeka" };
    var matches = users.Where(u => u.ToLower().Contains(q.ToLower())).ToList();
    return Ok(matches); // Returns JSON array
}
```

**JavaScript (identical pattern):**
```javascript
xhr.open("GET", "/api/users/search?q=" + encodeURIComponent(query));
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const names = JSON.parse(xhr.responseText);
    // ["Babatunde", "Chioma"]
    names.forEach(name => {
      document.getElementById("results").innerHTML += "<p>" + name + "</p>";
    });
  }
};
xhr.send();
```

> **Key insight:** The JavaScript/AJAX code barely changes between PHP, ASP, Node.js, or any other server. AJAX communicates using standard HTTP — it doesn't care what language the server uses.

---

<a name="chapter-8"></a>
## Chapter 8 — AJAX and Databases

### 8.1 The Full Stack: Browser → AJAX → Server → Database

AJAX's most powerful use case is fetching data from a **database** without reloading the page. Here is the complete flow:

```
User types in search box
        ↓
JavaScript creates AJAX request
        ↓
Request goes to server (PHP/Node.js/Python)
        ↓
Server queries database (MySQL/PostgreSQL/MongoDB)
        ↓
Database returns rows/documents
        ↓
Server formats data as JSON
        ↓
AJAX response arrives in browser
        ↓
JavaScript updates the DOM
User sees results — page never reloaded!
```

---

### 8.2 Example — Displaying Customer Data from MySQL

**Database table `customers`:**
```
| id | name              | email                  | city          | balance  |
|----|-------------------|------------------------|---------------|----------|
| 1  | Babatunde Adewale | tunde@example.com      | Lagos         | 500000   |
| 2  | Chioma Okafor     | chioma@example.com     | Enugu         | 250000   |
| 3  | Emeka Eze         | emeka@example.com      | Abuja         | 750000   |
```

**HTML:**
```html
<h2>Customer Lookup</h2>
<select id="customerId" onchange="loadCustomer(this.value)">
  <option value="">-- Select a Customer --</option>
  <option value="1">Babatunde Adewale</option>
  <option value="2">Chioma Okafor</option>
  <option value="3">Emeka Eze</option>
</select>

<div id="customerCard"></div>
```

**JavaScript:**
```javascript
function loadCustomer(id) {
  if (!id) {
    document.getElementById("customerCard").innerHTML = "";
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "get_customer.php?id=" + id);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const customer = JSON.parse(xhr.responseText);

      document.getElementById("customerCard").innerHTML = `
        <div style="border:1px solid #ccc; padding:16px; border-radius:8px;">
          <h3>${customer.name}</h3>
          <p>📧 ${customer.email}</p>
          <p>📍 ${customer.city}</p>
          <p>💰 Balance: ₦${Number(customer.balance).toLocaleString()}</p>
        </div>
      `;
    }
  };

  xhr.send();
}
```

**PHP (get_customer.php) with MySQL:**
```php
<?php
header("Content-Type: application/json");

$id = intval($_GET["id"]); // intval prevents SQL injection

// Database connection
$conn = new mysqli("localhost", "db_user", "db_password", "finance_db");

if ($conn->connect_error) {
  echo json_encode(["error" => "Database connection failed"]);
  exit;
}

// Prepared statement (safe from SQL injection)
$stmt = $conn->prepare("SELECT name, email, city, balance FROM customers WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$customer = $result->fetch_assoc();

$stmt->close();
$conn->close();

echo json_encode($customer);
// Output: {"name":"Babatunde Adewale","email":"tunde@example.com","city":"Lagos","balance":"500000"}
?>
```

---

### 8.3 Inserting Data into a Database via AJAX

You can also **write** to a database without reloading:

**JavaScript:**
```javascript
function addProduct(name, price, category) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "add_product.php");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      if (result.success) {
        document.getElementById("message").innerHTML =
          "✅ Product added with ID: " + result.newId;
      } else {
        document.getElementById("message").innerHTML =
          "❌ Error: " + result.error;
      }
    }
  };

  xhr.send(JSON.stringify({ name, price, category }));
}

// Call:
addProduct("Samsung Galaxy A55", 450000, "Electronics");
// Output on page: ✅ Product added with ID: 104
```

**PHP (add_product.php):**
```php
<?php
header("Content-Type: application/json");

$data     = json_decode(file_get_contents("php://input"), true);
$name     = $data["name"];
$price    = $data["price"];
$category = $data["category"];

$conn = new mysqli("localhost", "db_user", "db_password", "shop_db");
$stmt = $conn->prepare("INSERT INTO products (name, price, category) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $name, $price, $category);

if ($stmt->execute()) {
  echo json_encode(["success" => true, "newId" => $conn->insert_id]);
} else {
  echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
```

---

### 8.4 Common Beginner Mistake — SQL Injection

```php
// ❌ DANGEROUS — never do this
$id = $_GET["id"];
$query = "SELECT * FROM customers WHERE id = " . $id;
// If user sends id=1 OR 1=1, they get ALL customers!
// If user sends id=1; DROP TABLE customers--, they can DELETE your entire table!

// ✅ SAFE — always use prepared statements
$stmt = $conn->prepare("SELECT * FROM customers WHERE id = ?");
$stmt->bind_param("i", $id); // "i" = integer — PHP ensures it's a number
```

---

<a name="chapter-9"></a>
## Chapter 9 — AJAX Applications

### 9.1 AJAX in Modern Web Applications

AJAX is the backbone of virtually every modern web application. Let's explore the most important real-world patterns.

---

### 9.2 Pattern 1 — Live Search (Typeahead)

The most common AJAX application: search results that appear as you type.

```html
<input type="text" id="searchBox" placeholder="Search products..." oninput="search(this.value)">
<div id="searchResults"></div>
```

```javascript
let searchTimer; // For debouncing

function search(query) {
  // Debounce: don't fire on every keystroke, wait 300ms after user stops typing
  clearTimeout(searchTimer);

  if (query.length < 2) {
    document.getElementById("searchResults").innerHTML = "";
    return;
  }

  searchTimer = setTimeout(function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/products/search?q=" + encodeURIComponent(query));

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const products = JSON.parse(xhr.responseText);
        let html = "";

        if (products.length === 0) {
          html = "<p>No products found.</p>";
        } else {
          products.forEach(function(p) {
            html += `<div class="result-item">
              <strong>${p.name}</strong> — ₦${p.price.toLocaleString()}
            </div>`;
          });
        }

        document.getElementById("searchResults").innerHTML = html;
      }
    };

    xhr.send();
  }, 300); // Wait 300ms before sending request
}
```

---

### 9.3 Pattern 2 — Infinite Scroll

Load more content as the user scrolls to the bottom — used by Twitter, Facebook, Instagram.

```javascript
let page = 1;
let loading = false;

window.addEventListener("scroll", function() {
  // Check if user is near the bottom of the page
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (nearBottom && !loading) {
    loadMorePosts();
  }
});

function loadMorePosts() {
  loading = true;
  document.getElementById("loader").style.display = "block";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/posts?page=" + page + "&limit=10");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const posts = JSON.parse(xhr.responseText);

      posts.forEach(function(post) {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        document.getElementById("feed").appendChild(div);
      });

      page++;
      loading = false;
      document.getElementById("loader").style.display = "none";
    }
  };

  xhr.send();
}
```

---

### 9.4 Pattern 3 — Form Submission Without Page Reload

Submitting a form with AJAX keeps the user on the page:

```html
<form id="contactForm">
  <input type="text" id="fullName" placeholder="Full Name" required>
  <input type="email" id="email" placeholder="Email" required>
  <textarea id="message" placeholder="Your message"></textarea>
  <button type="button" onclick="submitForm()">Send Message</button>
</form>
<div id="formStatus"></div>
```

```javascript
function submitForm() {
  const name    = document.getElementById("fullName").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic client-side validation
  if (!name || !email || !message) {
    document.getElementById("formStatus").innerHTML =
      '<span style="color:red">❌ Please fill all fields.</span>';
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/contact");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById("formStatus").innerHTML =
          '<span style="color:green">✅ Message sent! We will reply within 24 hours.</span>';
        document.getElementById("contactForm").reset(); // Clear form
      } else {
        document.getElementById("formStatus").innerHTML =
          '<span style="color:red">❌ Failed to send. Please try again.</span>';
      }
    }
  };

  xhr.send(JSON.stringify({ name, email, message }));
}
```

---

### 9.5 Pattern 4 — Real-Time Data Updates (Polling)

If you need to show live data (stock prices, football scores, delivery tracking), you can **poll** the server at regular intervals:

```javascript
function startLiveTracking(orderId) {
  // Poll every 5 seconds
  const intervalId = setInterval(function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/orders/" + orderId + "/status");

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const order = JSON.parse(xhr.responseText);
        updateTrackingUI(order);

        // Stop polling if order is delivered
        if (order.status === "Delivered") {
          clearInterval(intervalId);
          console.log("Order delivered! Stopped polling.");
        }
      }
    };

    xhr.send();
  }, 5000); // 5000ms = 5 seconds
}

function updateTrackingUI(order) {
  const statusMap = {
    "Processing"  : "🔄 Order is being processed",
    "Dispatched"  : "🚚 Order is on its way",
    "Out_for_delivery": "📦 Out for delivery in your area",
    "Delivered"   : "✅ Order delivered!"
  };

  document.getElementById("orderStatus").innerText =
    statusMap[order.status] || order.status;
}

// Start:
startLiveTracking("ORD-2024-0042");
```

---

### 9.6 Pattern 5 — File Upload with Progress

```html
<input type="file" id="fileInput">
<button onclick="uploadFile()">Upload</button>
<progress id="progressBar" value="0" max="100" style="width:100%"></progress>
<div id="uploadStatus"></div>
```

```javascript
function uploadFile() {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploadedBy", "Babatunde");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/upload");

  // Track upload progress
  xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
      const percent = Math.round((event.loaded / event.total) * 100);
      document.getElementById("progressBar").value = percent;
      document.getElementById("uploadStatus").innerText = percent + "% uploaded...";
    }
  };

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      document.getElementById("uploadStatus").innerText =
        "✅ File uploaded! URL: " + result.fileUrl;
    }
  };

  xhr.send(formData); // FormData — no Content-Type header needed, browser sets it automatically
}
```

---

<a name="chapter-10"></a>
## Chapter 10 — AJAX Examples Gallery

### 10.1 Example 1 — Fetch and Display Plain Text

The simplest possible AJAX example — load a text file and display it:

```javascript
function loadReadme() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "README.txt");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("content").innerText = xhr.responseText;
    }
  };

  xhr.send();
}

// Assuming README.txt contains: "Welcome to the Cowrywise Learning Platform."
// After calling loadReadme():
// #content element displays: "Welcome to the Cowrywise Learning Platform."
```

---

### 10.2 Example 2 — Load HTML Fragments

AJAX can load **partial HTML** from the server and inject it into the page. This is how old-school Single Page Applications (SPAs) worked:

```javascript
// Load a navigation menu HTML fragment
function loadNavigation() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "partials/navigation.html");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("navContainer").innerHTML = xhr.responseText;
    }
  };

  xhr.send();
}

// navigation.html contains:
// <nav>
//   <a href="/">Home</a>
//   <a href="/products">Products</a>
//   <a href="/contact">Contact</a>
// </nav>
```

---

### 10.3 Example 3 — Cascading Dropdowns

When selecting a state populates the LGA (Local Government Area) dropdown automatically:

```html
<label>State:</label>
<select id="stateSelect" onchange="loadLGAs(this.value)">
  <option value="">-- Select State --</option>
  <option value="lagos">Lagos</option>
  <option value="kano">Kano</option>
  <option value="rivers">Rivers</option>
</select>

<label>LGA:</label>
<select id="lgaSelect">
  <option value="">-- Select LGA --</option>
</select>
```

```javascript
function loadLGAs(stateCode) {
  if (!stateCode) return;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/lgas?state=" + stateCode);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const lgas = JSON.parse(xhr.responseText);
      const lgaSelect = document.getElementById("lgaSelect");

      // Clear existing options
      lgaSelect.innerHTML = "<option value=''>-- Select LGA --</option>";

      // Populate with new options
      lgas.forEach(function(lga) {
        const option = document.createElement("option");
        option.value = lga.code;
        option.textContent = lga.name;
        lgaSelect.appendChild(option);
      });
    }
  };

  xhr.send();
}

// When "Lagos" is selected:
// Server returns: [{"code":"eti-osa","name":"Eti-Osa"},{"code":"surulere","name":"Surulere"},...]
// LGA dropdown populates automatically
```

---

### 10.4 Example 4 — Like / Favourite Button

A common social media interaction that uses AJAX:

```html
<button id="likeBtn" onclick="toggleLike(42)">
  ❤️ Like (<span id="likeCount">128</span>)
</button>
```

```javascript
let liked = false;

function toggleLike(postId) {
  const xhr = new XMLHttpRequest();
  const method = liked ? "DELETE" : "POST";
  xhr.open(method, "/api/posts/" + postId + "/like");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);
      document.getElementById("likeCount").innerText = result.totalLikes;
      liked = !liked;
      document.getElementById("likeBtn").style.color = liked ? "red" : "inherit";
    }
  };

  xhr.send();
}

// After clicking "Like":
// Like (129) — button turns red
// After clicking again:
// Like (128) — button returns to normal
```

---

### 10.5 Example 5 — AJAX with the `fetch()` API (Modern Alternative)

The **Fetch API** is the modern, promise-based replacement for `XMLHttpRequest`. It is cleaner and is preferred in new projects:

```javascript
// XMLHttpRequest version (traditional)
function getDataXHR() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/products");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);
      console.log(products);
    }
  };
  xhr.send();
}

// Fetch API version (modern — same result, cleaner code)
async function getDataFetch() {
  try {
    const response = await fetch("/api/products");
    const products = await response.json();
    console.log(products);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// Both output:
// [{"id":1,"name":"Laptop","price":450000},{"id":2,"name":"Phone","price":150000}]
```

> **When to use which:**
> - Legacy projects / maximum browser support → `XMLHttpRequest`
> - New projects → `fetch()` (cleaner, Promise-based, supports async/await)

---

### 10.6 Example 6 — AJAX Error Handling Patterns

A production-quality AJAX request always handles errors gracefully:

```javascript
function robustRequest(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  // Set a timeout (8 seconds)
  xhr.timeout = 8000;

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        // 2xx = success
        try {
          const data = JSON.parse(xhr.responseText);
          onSuccess(data);
        } catch (e) {
          onError("Response is not valid JSON");
        }
      } else if (xhr.status >= 400 && xhr.status < 500) {
        // 4xx = client error
        onError("Client error: " + xhr.status + " " + xhr.statusText);
      } else if (xhr.status >= 500) {
        // 5xx = server error
        onError("Server error: " + xhr.status + " " + xhr.statusText);
      }
    }
  };

  xhr.ontimeout = function() {
    onError("Request timed out after 8 seconds");
  };

  xhr.onerror = function() {
    onError("Network error — check internet connection");
  };

  xhr.send();
}

// Usage:
robustRequest(
  "/api/products",
  function(data) { console.log("Success:", data); },
  function(error) { console.error("Failed:", error); }
);
```

---

<a name="phase-2"></a>
## Phase 2 — Applied Exercises

### Exercise 1 — Warm-Up: Your First AJAX Request

**Objective:** Practice the fundamental AJAX pattern: open → onreadystatechange → send.

**Scenario:** You are building a page for a Lagos restaurant. When the user clicks a button, the today's menu should load from the server.

**Warm-up mini-example:**
```javascript
// This pattern is what you'll use:
const xhr = new XMLHttpRequest();
xhr.open("GET", "some_file.json");
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText); // Data is here
  }
};
xhr.send();
```

**Instructions:**
1. Create an HTML file with a `<button>` and a `<div id="menu">`
2. Create a `menu.json` file:
   ```json
   {
     "date": "Monday",
     "items": [
       { "name": "Jollof Rice", "price": 1500 },
       { "name": "Egusi Soup", "price": 2000 },
       { "name": "Pounded Yam", "price": 1800 }
     ]
   }
   ```
3. Write a `loadMenu()` function that fetches `menu.json` with AJAX
4. Parse the JSON and display each item with its price in `#menu`
5. Show the day of the week as a heading

**Hints:**
- Use `JSON.parse(xhr.responseText)` to convert string → object
- Use `.toLocaleString()` to format prices with commas
- Use template literals for clean HTML building

**Self-check questions:**
- What does `readyState === 4` mean?
- What would happen if you used `readyState === 3`?
- What does `status === 200` confirm?

---

### Exercise 2 — Intermediate: POST with Form Data

**Objective:** Send form data to a server using an AJAX POST request.

**Scenario:** Build a student registration form for a Lagos online school. When submitted, data is sent to the server without page reload.

**Warm-up:**
```javascript
// POST pattern:
xhr.open("POST", "/register");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({ name: "Tunde", course: "JavaScript" }));
```

**Instructions:**
1. Create a form with: Full Name, Email, Course (dropdown: JavaScript, Python, React), Phone
2. Add a "Register" button (type="button" — not submit!)
3. On click, collect all values and send via AJAX POST to `/api/register`
4. Display a success message if status is 200, an error message otherwise
5. Clear the form on success

**What-if challenges:**
- What if the user submits an empty form? Add validation before sending.
- What if the server is slow? Add a "Registering..." loading message while waiting.
- What if you want to confirm before submitting? Use `confirm()` dialog.

**Self-check questions:**
- Why use `type="button"` instead of `type="submit"`?
- Why call `encodeURIComponent()` on URL parameters?
- What's the difference between sending JSON and URL-encoded data?

---

### Exercise 3 — Advanced: Cascading Data with Error Handling

**Objective:** Build a bank account selector that loads accounts after a customer is selected, with full error handling.

**Scenario:** A fintech company in Lagos needs a transaction initiation form. Selecting a customer should load their accounts dynamically.

**Instructions:**
1. Create a `customers.json` and `accounts.json` on your server (or simulate with a mock API)
2. Build a page with: Customer dropdown (loads from AJAX), Account dropdown (loads based on customer selection)
3. When both are selected, show the account balance
4. Handle network errors with a retry button
5. Show a loading spinner while requests are in-flight

**Self-check questions:**
- How do you prevent the second dropdown from showing stale data?
- Why is debouncing important for search boxes?
- What's the risk of making AJAX calls in rapid succession?

---

<a name="phase-3"></a>
## Phase 3 — Project: Live Product Search Dashboard

### Project Overview

Build a full AJAX-powered product search dashboard for **KongaMart** — a fictional Nigerian e-commerce platform. Users can search for products, filter by category, and add to a cart — all without the page ever reloading.

**Expected Final Result:**
- Search box with live results as user types (debounced)
- Category filter that updates results via AJAX
- Product cards with "Add to Cart" buttons
- A cart counter in the header that updates via AJAX
- Error and loading states

---

### Stage 1 — Setup & Core Search

**Simple illustrative example first:**
```javascript
// The core pattern for this stage:
function searchProducts(query) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/products?q=" + encodeURIComponent(query));
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      renderProducts(JSON.parse(xhr.responseText));
    }
  };
  xhr.send();
}
```

**Full Stage 1 Code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KongaMart — Live Search</title>
  <style>
    * { box-sizing: border-box; font-family: sans-serif; }
    body { margin: 0; background: #f5f5f5; }

    header {
      background: #e63946;
      color: white;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    header h1 { margin: 0; font-size: 24px; }

    #cartCount {
      background: white;
      color: #e63946;
      border-radius: 50%;
      padding: 4px 10px;
      font-weight: bold;
    }

    .controls {
      padding: 20px 24px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    #searchBox {
      flex: 1;
      padding: 10px 16px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
      min-width: 200px;
    }

    #categoryFilter {
      padding: 10px 16px;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
    }

    #status {
      padding: 8px 24px;
      color: #666;
      font-size: 14px;
    }

    #productGrid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
      padding: 16px 24px;
    }

    .product-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .product-card h3 { margin: 0 0 8px; color: #333; }
    .product-card .price { color: #e63946; font-size: 20px; font-weight: bold; }
    .product-card .category { color: #888; font-size: 13px; margin-bottom: 12px; }

    .add-btn {
      width: 100%;
      padding: 10px;
      background: #e63946;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }

    .add-btn:hover { background: #c1121f; }
    .add-btn:disabled { background: #ccc; cursor: not-allowed; }

    .loading { text-align: center; padding: 40px; color: #888; font-size: 18px; }
    .error { color: red; padding: 20px 24px; }
  </style>
</head>
<body>

<header>
  <h1>🛍️ KongaMart</h1>
  <div>🛒 Cart: <span id="cartCount">0</span></div>
</header>

<div class="controls">
  <input
    type="text"
    id="searchBox"
    placeholder="Search products..."
    oninput="handleSearch(this.value)"
  >
  <select id="categoryFilter" onchange="handleSearch(document.getElementById('searchBox').value)">
    <option value="">All Categories</option>
    <option value="electronics">Electronics</option>
    <option value="fashion">Fashion</option>
    <option value="food">Food & Grocery</option>
    <option value="home">Home & Living</option>
  </select>
</div>

<div id="status"></div>
<div id="productGrid"></div>

<script>
  // ─── State ────────────────────────────────────────────────────────────
  let cartCount = 0;
  let searchTimer = null;

  // ─── Mock product data (simulates a server database) ─────────────────
  const ALL_PRODUCTS = [
    { id: 1, name: "Samsung Galaxy A55", price: 450000, category: "electronics", rating: 4.5 },
    { id: 2, name: "Tecno Camon 20", price: 185000, category: "electronics", rating: 4.2 },
    { id: 3, name: "Infinix Hot 40", price: 120000, category: "electronics", rating: 4.0 },
    { id: 4, name: "Dell Laptop 15\"", price: 850000, category: "electronics", rating: 4.7 },
    { id: 5, name: "Ankara Print Dress", price: 12000, category: "fashion", rating: 4.6 },
    { id: 6, name: "Men's Agbada Set", price: 35000, category: "fashion", rating: 4.4 },
    { id: 7, name: "Adire Tie-Dye Shirt", price: 8500, category: "fashion", rating: 4.1 },
    { id: 8, name: "Dangote Sugar 1kg", price: 1800, category: "food", rating: 4.8 },
    { id: 9, name: "Indomie Noodles (40 packs)", price: 8000, category: "food", rating: 4.9 },
    { id: 10, name: "Golden Morn Cereal", price: 4500, category: "food", rating: 4.3 },
    { id: 11, name: "Polyester Curtains", price: 18000, category: "home", rating: 4.2 },
    { id: 12, name: "Gas Cooker 4-Burner", price: 95000, category: "home", rating: 4.5 },
  ];

  // ─── Simulate an AJAX call with setTimeout (mimics network delay) ─────
  function simulateAJAX(query, category, callback) {
    // Show loading
    document.getElementById("status").innerText = "🔍 Searching...";
    document.getElementById("productGrid").innerHTML = '<div class="loading">Loading products...</div>';

    // Simulate 400ms server response time
    setTimeout(function() {
      let results = ALL_PRODUCTS;

      if (query) {
        results = results.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (category) {
        results = results.filter(p => p.category === category);
      }

      callback(results);
    }, 400);
  }

  // ─── Search handler with debouncing ───────────────────────────────────
  function handleSearch(query) {
    clearTimeout(searchTimer);

    const category = document.getElementById("categoryFilter").value;

    searchTimer = setTimeout(function() {
      simulateAJAX(query, category, function(products) {
        renderProducts(products, query);
      });
    }, 300);
  }

  // ─── Render products to the grid ──────────────────────────────────────
  function renderProducts(products, query) {
    const grid   = document.getElementById("productGrid");
    const status = document.getElementById("status");

    if (products.length === 0) {
      status.innerText = "No products found.";
      grid.innerHTML = '<div class="loading">😕 No results found. Try a different search.</div>';
      return;
    }

    status.innerText = products.length + " product(s) found";
    grid.innerHTML = products.map(function(p) {
      const stars = "⭐".repeat(Math.round(p.rating));
      return `
        <div class="product-card">
          <div class="category">${p.category.toUpperCase()}</div>
          <h3>${p.name}</h3>
          <div class="price">₦${p.price.toLocaleString()}</div>
          <div style="margin-bottom:12px;">${stars} (${p.rating})</div>
          <button class="add-btn" onclick="addToCart(${p.id}, '${p.name}', this)">
            🛒 Add to Cart
          </button>
        </div>
      `;
    }).join("");
  }

  // ─── Add to Cart ──────────────────────────────────────────────────────
  function addToCart(productId, productName, button) {
    button.disabled = true;
    button.innerText = "Adding...";

    // Simulate AJAX call to POST /api/cart
    setTimeout(function() {
      cartCount++;
      document.getElementById("cartCount").innerText = cartCount;
      button.innerText = "✅ Added!";

      setTimeout(function() {
        button.disabled = false;
        button.innerText = "🛒 Add to Cart";
      }, 1500);
    }, 300);
  }

  // ─── Initial load ─────────────────────────────────────────────────────
  handleSearch("");
</script>

</body>
</html>
```

**Expected output:** A fully functional product search page. Typing "samsung" shows 1 result. Selecting "Food" shows 3 products. Clicking "Add to Cart" increments the cart counter.

---

### Stage 2 — Adding Real AJAX to Stage 1

Now replace the `simulateAJAX` function with a real XHR call to your backend:

```javascript
// Replace simulateAJAX with this:
function fetchProducts(query, category, callback) {
  document.getElementById("status").innerText = "🔍 Searching...";
  document.getElementById("productGrid").innerHTML = '<div class="loading">Loading...</div>';

  const params = new URLSearchParams();
  if (query)    params.append("q", query);
  if (category) params.append("category", category);

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/products?" + params.toString());

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const products = JSON.parse(xhr.responseText);
          callback(products);
        } catch (e) {
          showError("Invalid response from server.");
        }
      } else {
        showError("Server error: " + xhr.status);
      }
    }
  };

  xhr.onerror = function() {
    showError("Network error. Check your connection.");
  };

  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    showError("Request timed out. Server may be slow.");
  };

  xhr.send();
}

function showError(message) {
  document.getElementById("status").innerText = "";
  document.getElementById("productGrid").innerHTML =
    `<div class="error">❌ ${message} <button onclick="handleSearch('')">Retry</button></div>`;
}
```

---

### Stage 3 — Deployment & Reflection

**Checklist before deploying:**
- [ ] All AJAX requests handle errors (network failure, 404, 500)
- [ ] Search is debounced (no request on every keystroke)
- [ ] Loading states are shown while requests are in-flight
- [ ] Results are sanitized before inserting into the DOM
- [ ] Sensitive data is not exposed in URL parameters

**Reflection Questions:**
1. 🤔 How would this dashboard perform with 10,000 products? What changes would you make to the server-side query?
2. 🤔 How would you add pagination (Page 1, 2, 3...) to the AJAX search?
3. 🤔 What security risks exist if you directly insert `xhr.responseText` into `innerHTML` without sanitization?
4. 🤔 How would a real company cache AJAX responses to reduce server load?
5. 🤔 How does this AJAX approach compare to using React or Vue's state management?

**Optional Advanced Features:**
- Add a price range slider (min/max) that triggers a new AJAX call on change
- Implement sorting (by price, rating, name) without reloading
- Add a "wishlist" feature that persists to `localStorage` between sessions
- Add keyboard navigation through search results (up/down arrow keys)
- Implement request cancellation — cancel an in-flight request if the user types again before it completes

---

<a name="checklist"></a>
## Completion Checklist

| # | Topic | Understood | Practised |
|---|-------|-----------|----------|
| 1 | What AJAX is and what problem it solves | ☐ | ☐ |
| 2 | The XMLHttpRequest lifecycle (readyState 0–4) | ☐ | ☐ |
| 3 | `open()`, `send()`, `setRequestHeader()` methods | ☐ | ☐ |
| 4 | GET vs POST — when and how to use each | ☐ | ☐ |
| 5 | Handling `responseText` (plain text and JSON) | ☐ | ☐ |
| 6 | Handling `responseXML` and XML DOM navigation | ☐ | ☐ |
| 7 | AJAX with PHP — GET/POST, JSON responses | ☐ | ☐ |
| 8 | AJAX with ASP — Classic and .NET | ☐ | ☐ |
| 9 | AJAX with databases — read and write patterns | ☐ | ☐ |
| 10 | Real-world patterns: search, infinite scroll, polling | ☐ | ☐ |
| 11 | Error handling (status codes, timeout, network errors) | ☐ | ☐ |
| 12 | Debouncing and caching prevention | ☐ | ☐ |
| 13 | The modern `fetch()` API as an alternative | ☐ | ☐ |
| 14 | Built and tested the KongaMart dashboard | ☐ | ☐ |

---

## Key Gotchas — What Beginners Get Wrong

| ❌ Mistake | ✅ Fix |
|-----------|--------|
| Reading `xhr.responseText` outside the `onreadystatechange` handler | Always read it inside the handler, after `readyState === 4` |
| Forgetting to check `xhr.status === 200` | Always check both `readyState === 4` AND `status === 200` |
| Using `JSON.parse()` on non-JSON responses | Wrap in `try-catch` or check `Content-Type` header first |
| Not setting `Content-Type` header for POST requests | Always call `setRequestHeader()` before `send()` |
| Building URLs with unsanitized user input (SQL injection, XSS) | Use `encodeURIComponent()` client-side; use prepared statements server-side |
| Making AJAX calls on every keystroke | Debounce search inputs with `setTimeout` / `clearTimeout` |
| Assuming AJAX works cross-origin by default | Same-origin policy blocks cross-domain requests unless the server sends CORS headers |
| Setting `async: false` in `open()` | This blocks the browser — never do it in production |

---

## Chapter Summary

> **AJAX** allows JavaScript to communicate with a server in the background — fetching or sending data without reloading the page. It uses the **XMLHttpRequest** object, configured with `open()` and triggered with `send()`. Responses arrive asynchronously via the `onreadystatechange` event, where `readyState === 4 && status === 200` signals success. AJAX works with any server-side language (PHP, ASP.NET, Node.js) and powers patterns like live search, infinite scroll, form submission, and real-time updates that define the modern web experience.

---

*Tutorial authored using the AI Tutorial Generator framework — Phase 1: Comprehension → Phase 2: Practice → Phase 3: Creation.*
