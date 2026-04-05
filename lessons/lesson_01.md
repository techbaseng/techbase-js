---
render_with_liquid: false
title: "Lesson 01 – JavaScript Tutorial — Introduction, Placement & Output"
nav_order: 1
---

## 📌 What This Lesson Covers
By the end of this lesson you will understand:

- What JavaScript is and why it exists
- What JavaScript can do on a webpage
- Where to place JavaScript code (inside a page or in a separate file)
- Four ways JavaScript can display or output information

This lesson follows three phases: **Understand → Practice → Build.**

# PHASE 1 — CONCEPTUAL UNDERSTANDING

---

## 1.1 What Is JavaScript?

### The Simple Explanation

Imagine a webpage as a building.
- **HTML** is the structure — the walls, floors, and rooms.
- **CSS** is the decoration — the paint, furniture, and lighting.
- **JavaScript** is the electricity — it makes things *move, respond, and come alive.*

Without JavaScript, a webpage is a static printed page. With JavaScript, it becomes an interactive app.

---

### Why Does JavaScript Exist?

In the early days of the internet (1990s), webpages could only display text and images. There was no way to respond to a user clicking a button without reloading the entire page from the server — which was slow and frustrating.

**JavaScript was created in 1995 by Brendan Eich at Netscape** to solve this problem. It runs *directly in the browser*, so it can respond to user actions instantly — no server round-trip needed.

---

### What Can JavaScript Do? (Real-World Examples)

| Action | Real-World Example |
|---|---|
| Change page content | Clicking "Show More" reveals hidden text |
| React to user input | A form warns you if you left a field empty |
| Animate elements | A menu slides open when you click a hamburger icon |
| Communicate with servers | Google search shows suggestions as you type |
| Store data locally | A shopping cart remembers your items |
| Control multimedia | A play button starts a video |

---

### Micro-Demo 1 — JavaScript Changes Content Instantly

```html

<p id="greeting">Hello, visitor!</p>

<button onclick="changeText()">Click Me</button>

<script>

 function changeText() {

   document.getElementById("greeting").innerHTML = "Hello, JavaScript learner!";

 }

</script>

```

**What happens:** When you click the button, the paragraph text changes — no page reload.

**Expected output:** The paragraph updates from *"Hello, visitor!"* to *"Hello, JavaScript learner!"*

> 🤔 **Thinking question:** What do you think would happen if you clicked the button a second time?

---

## 1.2 JavaScript Is Everywhere

JavaScript is the **only programming language that runs natively in web browsers**. Every major website — Google, YouTube, Facebook, Amazon — uses JavaScript.

It also runs on servers (using **Node.js**), mobile apps (using **React Native**), and desktop apps (using **Electron**). Learning JavaScript opens doors to almost every area of software development.

---

## 2.1 Where Do You Put JavaScript? (JS Placement)

JavaScript code must be placed somewhere the browser can find and execute it. There are **three main places** you can put JavaScript.

---

### Place 1 — Inside the `<head>` Tag

```html

<!DOCTYPE html>

<html>

 <head>

   <script>

     function sayHello() {

       alert("Hello from the head!");

     }

   </script>

 </head>

 <body>

   <button onclick="sayHello()">Say Hello</button>

 </body>

</html>

```



**What this does:** The script is loaded before the page content appears.

**When to use it:** For scripts that must be ready before the user sees anything — for example, setting up configuration values.



> ⚠️ **Beginner Mistake:** Placing large scripts in `<head>` can slow down how fast the page appears, because the browser reads and runs the script before showing the content. Use this sparingly.



---



### Place 2 — Inside the `<body>` Tag (Recommended for Beginners)



```html

<!DOCTYPE html>

<html>

 <body>

   <h1>My Page</h1>

   <p id="demo">Original text.</p>



   <script>

     document.getElementById("demo").innerHTML = "Changed by JavaScript!";

   </script>

 </body>

</html>

```



**Expected output:** The paragraph shows *"Changed by JavaScript!"* when the page loads.



**Why this works better:** The HTML content loads and appears first, then JavaScript runs. The user sees the page faster.



> 💡 **Best practice:** Place your `<script>` tag just **before the closing `</body>` tag**. This ensures all HTML elements exist before JavaScript tries to interact with them.



---



### Place 3 — In an External File (Professional Standard)



As projects grow, keeping JavaScript inside HTML becomes messy. Professional developers put JavaScript in a **separate `.js` file**.



**Step 1 — Create a file called `myScript.js`:**

```javascript

function greetUser() {

 alert("Welcome to my website!");

}

```



**Step 2 — Link it in your HTML file:**

```html

<!DOCTYPE html>

<html>

 <body>

   <button onclick="greetUser()">Greet Me</button>



   <script src="myScript.js"></script>

 </body>

</html>

```



**Expected output:** Clicking the button shows an alert saying *"Welcome to my website!"*



---



### Why Use External Files?



| Reason | Explanation |
|---|---|
| **Cleaner code** | HTML handles structure; JS handles behaviour — each in its own file |
| **Reusability** | One `.js` file can be linked to 100 different HTML pages |
| **Caching** | The browser saves the JS file after the first download — pages load faster |
| **Team work** | Designers edit HTML; developers edit JS — no conflicts |



---



### You Can Link Multiple External Files



```html

<script src="utilities.js"></script>

<script src="animations.js"></script>

<script src="formValidation.js"></script>

```



Each file is loaded in order, top to bottom.



> 🤔 **Thinking question:** If `animations.js` depends on a function defined in `utilities.js`, which file must come first?



---



### What the `src` Attribute Does



`src` stands for **source**. It tells the browser where to find the JavaScript file.



```html

<script src="myScript.js"></script>

```



- `src="myScript.js"` → file is in the same folder as the HTML file

- `src="js/myScript.js"` → file is inside a folder called `js`

- `src="https://example.com/myScript.js"` → file is loaded from the internet (e.g., a library like jQuery)



> ⚠️ **Beginner Mistake:** When using `src`, do not put any code between the opening and closing `<script>` tags. The browser ignores it.



```html

<!-- This is WRONG — the alert will be ignored -->

<script src="myScript.js">

 alert("This will never run!");

</script>



<!-- This is CORRECT -->

<script src="myScript.js"></script>

```



---



---



## 3.1 JavaScript Output — Four Ways to Display Information



JavaScript has four main ways to output or display data. Each one serves a different purpose.



---



### Method 1 — `innerHTML` (Change Content on the Page)



This is the most common and most useful method. It lets JavaScript write or change content *inside* an HTML element.



**How it works — step by step:**



```html

<p id="result">I will be changed.</p>



<script>

 document.getElementById("result").innerHTML = "JavaScript changed me!";

</script>

```



Breaking it down line by line:



| Code Part | What It Does |
|---|---|
| `document` | Refers to the entire HTML page |
| `.getElementById("result")` | Finds the HTML element with `id="result"` |
| `.innerHTML` | Refers to the content inside that element |
| `= "JavaScript changed me!"` | Replaces the content with this new text |



**Expected output:** The paragraph displays *"JavaScript changed me!"*



---



**Real-world use case:** Displaying the result of a calculation on the page.



```html

<p id="answer"></p>



<script>

 let price = 50;

 let tax = 5;

 let total = price + tax;

 document.getElementById("answer").innerHTML = "Total: $" + total;

</script>

```



**Expected output:** The paragraph shows *"Total: $55"*



---



### Method 2 — `document.write()` (Write Directly to the Page)



This method writes content directly into the HTML document as it is being built.



```html

<script>

 document.write("Hello, World!");

</script>

```



**Expected output:** The page displays *Hello, World!*



---



> ⚠️ **Critical Warning — The Most Important Beginner Mistake with `document.write()`**



If you use `document.write()` *after* the page has finished loading (for example, inside a button click), it will **delete the entire page** and replace it with only what you wrote.



```html

<h1>My Important Page</h1>

<button onclick="document.write('Oops!')">Click Me</button>

```



**Expected output after clicking:** The entire page — including the heading and button — disappears. Only *"Oops!"* remains.



**When to use it:** Only for quick testing or learning. Never in real projects.



---



### Method 3 — `window.alert()` (Pop-Up Alert Box)



This shows a small pop-up box with a message. The user must click OK to dismiss it before interacting with the page again.



```html

<script>

 window.alert("Welcome to this website!");

</script>

```



**Expected output:** A pop-up box appears with the message *"Welcome to this website!"* and an OK button.



You can also write it without the `window.` prefix — both are identical:



```html

<script>

 alert("Hello!");

</script>

```



---



**Real-world use case:** Warning a user about something important.



```html

<button onclick="alert('Your session is about to expire!')">Check Session</button>

```



> ⚠️ **Beginner Mistake:** Overusing `alert()` is very annoying for users. In professional projects, messages are usually shown on the page using `innerHTML` instead.



---



### Method 4 — `console.log()` (Output to the Developer Console)



This is the developer's most important debugging tool. It outputs information to the browser's **developer console** — a hidden panel that only developers can see. Regular website visitors never see it.



```javascript

console.log("The page has loaded.");

console.log(42);

console.log("Price:", 199.99);

```



**Expected output (in the browser console):**

```

The page has loaded.

42

Price: 199.99

```



---



**How to open the console:**

- **Windows/Linux:** Press `F12` → click the **Console** tab

- **Mac:** Press `Cmd + Option + J`



---



**Real-world use case:** Checking the value of a variable while debugging.



```javascript

let userName = "Alice";

let userAge = 30;



console.log("User name:", userName);

console.log("User age:", userAge);

```



**Expected console output:**

```

User name: Alice

User age: 30

```



> 💡 Professional developers use `console.log()` constantly while building and testing. It's your best friend when something isn't working as expected.



---



### Summary Table — Which Output Method to Use?



| Method | Where Output Appears | Best Used For |
|---|---|---|
| `innerHTML` | On the webpage | Displaying results to users |
| `document.write()` | On the webpage | Quick testing only |
| `window.alert()` | Pop-up box | One-time important warnings |
| `console.log()` | Browser console | Debugging and development |



---



---



# PHASE 2 — APPLIED EXERCISES



---



## Exercise 1 — Warm-Up: Your First JavaScript Output



**Objective:** Write JavaScript that displays a personalised message on the page.



**Scenario:** You are building a simple welcome page for a school portal. When the page loads, it should greet the student by name.



---



**Warm-Up Mini-Example First:**



```html

<p id="msg"></p>

<script>

 document.getElementById("msg").innerHTML = "Good morning!";

</script>

```

Expected output: *Good morning!*



---



**Your Exercise:**



**Step 1** — Create an HTML file with this structure:

```html

<!DOCTYPE html>

<html>

 <body>

   <h1>School Portal</h1>

   <p id="welcome"></p>

   <p id="date-info"></p>



   <script>

     // Your code goes here

   </script>

 </body>

</html>

```



**Step 2** — Inside the `<script>` tag, use `innerHTML` to:

- Display *"Welcome back, [your name]!"* in the `welcome` paragraph

- Display *"Today is a great day to learn JavaScript."* in the `date-info` paragraph



**Step 3** — Also add a `console.log()` statement that prints your name to the console.



**Hints:**

- Use `document.getElementById("welcome").innerHTML = ...`

- Replace `[your name]` with your actual name as a string in quotes



**Self-Check Questions:**

1. What does `id="welcome"` do in HTML?

2. Why did you place your `<script>` tag before `</body>`?

3. Can you see your `console.log()` output? Where did you look?



**Optional What-If Challenge:** What happens if you misspell the `id` in your JavaScript — for example, writing `"welcom"` instead of `"welcome"`? Try it and observe the result.



---



## Exercise 2 — External Script File



**Objective:** Separate JavaScript into its own `.js` file and link it to an HTML page.



**Scenario:** You are a junior web developer at a company. Your team lead tells you: *"Keep all JavaScript in separate files. It's easier to maintain."*



---



**Warm-Up Mini-Example:**



`helper.js`:

```javascript

alert("Script file loaded successfully!");

```

`index.html`:

```html

<script src="helper.js"></script>

```

Expected output: An alert box saying *"Script file loaded successfully!"*



---



**Your Exercise:**



**Step 1** — Create a file called `welcome.js` with one function:

```javascript

function showWelcome() {

 document.getElementById("msg").innerHTML = "Welcome! This message came from an external file.";

 console.log("showWelcome function was called.");

}

```



**Step 2** — Create `index.html`:

```html

<!DOCTYPE html>

<html>

 <body>

   <h2>External Script Demo</h2>

   <p id="msg">Waiting for JavaScript...</p>

   <button onclick="showWelcome()">Load Message</button>



   <script src="welcome.js"></script>

 </body>

</html>

```



**Step 3** — Open the page and click the button.



**Expected output:**

- Paragraph changes to: *"Welcome! This message came from an external file."*

- Console shows: *"showWelcome function was called."*



**Self-Check Questions:**

1. What would happen if you moved `<script src="welcome.js"></script>` to the `<head>` tag instead?

2. Why is separating HTML and JavaScript into different files considered professional practice?

3. What does the `src` attribute tell the browser?



**Optional What-If Challenge:** Try linking two `.js` files. Put a different message in each and display both on the page.



---



## Exercise 3 — Comparing All Four Output Methods



**Objective:** Use all four output methods in one page and understand the difference between each.



**Scenario:** You are testing a small data dashboard. Before presenting it to your team, you want to display test data in multiple ways to understand how each method works.



---



**Step 1** — Build this page:

```html

<!DOCTYPE html>

<html>

 <body>

   <h2>Output Methods Test</h2>

   <p id="display-area">Results will appear here.</p>

   <button onclick="runAllOutputs()">Run All Outputs</button>



   <script>

     function runAllOutputs() {

       // Method 1: innerHTML

       document.getElementById("display-area").innerHTML = "Method 1: innerHTML is working!";



       // Method 2: console.log

       console.log("Method 2: console.log is working!");



       // Method 3: alert

       alert("Method 3: alert is working!");



       // Note: document.write is intentionally NOT used here — why?

     }

   </script>

 </body>

</html>

```



**Expected output:**

- Page text changes to: *"Method 1: innerHTML is working!"*

- Console shows: *"Method 2: console.log is working!"*

- Alert box appears with: *"Method 3: alert is working!"*



**Self-Check Questions:**

1. Which output method would you use if you wanted to show a calculation result to your website's visitors?

2. Which method is invisible to the user but useful to you as a developer?

3. Why was `document.write()` not used inside the button click function?



---



---



# PHASE 3 — PROJECT SIMULATION



---



## Mini-Project: Personal Profile Card with JavaScript



**Project Overview:** You will build a personal profile card webpage that uses JavaScript to display information dynamically. This simulates a real task a junior front-end developer might be given on their first week at a company.



---



### Stage 1 — Setup & Core Logic



**Goal:** Create the HTML structure and use JavaScript to populate it with data.



**Illustrative Preview First:**

```html

<p id="job-title"></p>

<script>

 document.getElementById("job-title").innerHTML = "Junior Web Developer";

</script>

```

Expected output: *Junior Web Developer*



---



**Your Stage 1 Task:**



```html

<!DOCTYPE html>

<html>

 <head>

   <title>Profile Card</title>

 </head>

 <body>

   <h1 id="full-name"></h1>

   <p id="job-role"></p>

   <p id="location"></p>

   <p id="bio"></p>



   <script src="profile.js"></script>

 </body>

</html>

```



**Create `profile.js`:**

```javascript

// Personal data

let name = "Jordan Smith";

let role = "Junior Web Developer";

let city = "Lagos, Nigeria";

let bio = "Passionate about building clean, user-friendly websites using HTML, CSS, and JavaScript.";



// Display data on the page

document.getElementById("full-name").innerHTML = name;

document.getElementById("job-role").innerHTML = "Role: " + role;

document.getElementById("location").innerHTML = "Location: " + city;

document.getElementById("bio").innerHTML = bio;



// Log to console for debugging

console.log("Profile loaded for:", name);

```



**Expected page output:**

```

Jordan Smith

Role: Junior Web Developer

Location: Lagos, Nigeria

Passionate about building clean, user-friendly websites using HTML, CSS, and JavaScript.

```

**Expected console output:**

```

Profile loaded for: Jordan Smith

```



---



### Stage 2 — Adding Features



**Goal:** Add a button that shows a contact alert and a skills section.



**Add to your HTML (inside `<body>`, before the script tag):**

```html

<h3>Skills</h3>

<p id="skills-list"></p>

<button onclick="showContact()">Contact Me</button>

```



**Add to your `profile.js`:**

```javascript

// Skills

let skills = "HTML, CSS, JavaScript, Git";

document.getElementById("skills-list").innerHTML = skills;



// Contact alert

function showContact() {

 alert("You can reach " + name + " at jordan.smith@email.com");

}

```



**Expected output when button is clicked:**

Alert box: *"You can reach Jordan Smith at jordan.smith@email.com"*



---



### Stage 3 — Displaying Results & Reflection



**Goal:** Add a visitor counter simulation and finalise the project.



**Add to `profile.js`:**

```javascript

// Simulate a visitor count

let visitorCount = 1042;

document.getElementById("bio").innerHTML += "<br><br><em>This profile has been viewed " + visitorCount + " times.</em>";



console.log("Visitor count displayed:", visitorCount);

```



**Expected additional page output (appended to bio):**

```

This profile has been viewed 1042 times.

```



---



**Reflection Questions:**



1. In a real company, where would the visitor count actually come from? (Hint: think about databases and servers.)

2. Why is it better to store the name in a variable (`let name = "Jordan Smith"`) rather than typing `"Jordan Smith"` everywhere?

3. How would you update this profile card to show a different person's information? What would you change?

4. If this were a real product, which output method — `innerHTML`, `alert`, or `console.log` — would users interact with, and which one would only the developer see?



---



**Optional Advanced Features to Explore:**

- Add a profile photo using JavaScript to set an `<img>` tag's `src` attribute

- Display today's date automatically using JavaScript's built-in `Date` object

- Add a second profile and a button to toggle between the two



---



---



# ✅ COMPLETION CHECKLIST



| Item | Status |
|---|---|
| JavaScript explained as the "electricity" of the web | ✅ |
| Three placement locations explained with examples | ✅ |
| External file setup and `src` attribute explained | ✅ |
| All four output methods explained with examples and warnings | ✅ |
| Common beginner mistakes highlighted and corrected | ✅ |
| Three applied exercises with warm-ups, hints, and self-checks | ✅ |
| Real-world project built across three stages | ✅ |
| Reflection questions answered | ✅ |
| Every concept includes at least one example with visible expected output | ✅ |



---



**One-sentence summary:** JavaScript is the language that makes webpages interactive, and you control where it runs, how it is organised, and how it communicates with users through four distinct output methods — each suited to a different purpose.

