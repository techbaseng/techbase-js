---
render_with_liquid: false
title: "JavaScript Graphics: Canvas, Plotly, Chart.js, Google Charts & D3.js"
nav_order: 44
---

> **What You Will Learn:**
> By the end of this tutorial you will understand how to draw shapes and animations on an HTML canvas, plot interactive charts with Plotly, create beautiful graphs with Chart.js, embed Google Charts, and build data visualisations with D3.js. You will also build a complete **Sales Dashboard** project that ties every library together.

---

## Table of Contents
1. [What Is JavaScript Graphics?](#1-what-is-javascript-graphics)
2. [The HTML Canvas Element](#2-the-html-canvas-element)
3. [Drawing on a Canvas (Canvas API)](#3-drawing-on-a-canvas-canvas-api)
4. [Plotly.js — Interactive Charts](#4-plotlyjs--interactive-charts)
5. [Chart.js — Beautiful Charts](#5-chartjs--beautiful-charts)
6. [Google Charts](#6-google-charts)
7. [D3.js — Data-Driven Documents](#7-d3js--data-driven-documents)
8. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
9. [Phase 3 — Project: Monthly Sales Dashboard](#phase-3--project-monthly-sales-dashboard)
10. [Self-Assessment Quiz](#self-assessment-quiz)
11. [Completion Checklist](#completion-checklist)

---

# 1. What Is JavaScript Graphics?

## Real-World Analogy

Think of a painter who wants to display results from a survey at a community centre in Lagos. Instead of just reading numbers aloud, they draw pie charts and bar graphs on a whiteboard — the audience understands the data instantly.

That is exactly what JavaScript graphics libraries do. They take raw numbers (data) and turn them into **visual pictures** inside a web browser.

---

## Why Does This Matter?

Data that is presented as plain text is hard to understand at a glance:

```text
January: 45000
February: 62000
March: 38000
April: 71000
```

The same data as a bar chart tells a story in seconds — you can spot trends, peaks, and dips without reading every number.

---

## The Two Approaches to JavaScript Graphics

| Approach | Description | Examples |
|---|---|---|
| **Low-level (manual drawing)** | You write code that draws every pixel, line, and shape yourself | HTML Canvas API |
| **High-level (library)** | You provide data; the library draws the chart for you | Plotly, Chart.js, Google Charts, D3 |

---

## Which Library Should You Use?

| Library | Best For | Difficulty |
|---|---|---|
| **Canvas API** | Animations, games, custom shapes | Medium |
| **Plotly.js** | Scientific / statistical charts, built-in interactivity | Easy–Medium |
| **Chart.js** | Clean website charts (bar, pie, line) | Easy |
| **Google Charts** | Quick charts with Google's polish | Easy |
| **D3.js** | Fully custom, complex data visualisations | Advanced |

> 💡 **Real-world note:** Front-end developers, data analysts, and dashboard builders use these tools every day. Learning them makes you a much more valuable developer.

---

# 2. The HTML Canvas Element

## What Is the Canvas?

The `<canvas>` element is a **blank rectangular drawing surface** inside your web page. By itself it shows nothing — it is like a whiteboard before anyone picks up a marker.

JavaScript then acts as the marker — it draws shapes, text, images, and animations onto the canvas.

---

## Anatomy of a Canvas

```html
<canvas id="myCanvas" width="400" height="200"></canvas>
```

| Part | What It Means |
|---|---|
| `id="myCanvas"` | A unique name so JavaScript can find this canvas |
| `width="400"` | 400 pixels wide |
| `height="200"` | 200 pixels tall |

> ⚠️ **Common beginner mistake:** Do NOT set canvas dimensions using CSS (`style="width:400px"`). Always use the `width` and `height` HTML attributes, or set them in JavaScript. Using CSS stretches the canvas and distorts drawings.

---

## The Coordinate System

The canvas uses a **grid system** starting at the top-left corner:

```
(0,0) ──────────────────→ x increases rightward
  │
  │
  │
  ↓
  y increases downward
```

So the point `(100, 50)` means:
- 100 pixels from the **left**
- 50 pixels from the **top**

---

## Getting the Drawing Context

Before drawing anything, you must ask the canvas for its **drawing tool** — called a **context**:

```javascript
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
```

| Code | Meaning |
|---|---|
| `document.getElementById("myCanvas")` | Find the canvas element on the page |
| `.getContext("2d")` | Ask for a **2D drawing context** (a set of drawing tools) |
| `ctx` | Short for "context" — this is your drawing tool |

Think of `ctx` as the pen you hold. Every drawing command starts with `ctx`.

---

# 3. Drawing on a Canvas (Canvas API)

## 3.1 Drawing Rectangles

The simplest shape to draw is a **rectangle**.

### Three rectangle methods

| Method | What It Does |
|---|---|
| `ctx.fillRect(x, y, width, height)` | Draws a **filled** (solid) rectangle |
| `ctx.strokeRect(x, y, width, height)` | Draws a rectangle **outline** (no fill) |
| `ctx.clearRect(x, y, width, height)` | Erases a rectangular area |

---

### Micro-Demo 1 — A Red Square

```html
<!DOCTYPE html>
<html>
<body>
  <canvas id="c1" width="300" height="150"></canvas>

  <script>
    const canvas = document.getElementById("c1");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";          // Choose the fill colour
    ctx.fillRect(50, 30, 100, 80);  // Draw a rectangle
    // Position: x=50, y=30  |  Size: 100 wide, 80 tall
  </script>
</body>
</html>
```

**Expected output:** A solid red rectangle appears on the page, 100px wide and 80px tall, starting 50px from the left and 30px from the top.

---

### Thinking Question 🤔
> What would happen if you changed `ctx.fillStyle = "red"` to `ctx.fillStyle = "#00FF00"`?

Answer: The rectangle would be bright green. `#00FF00` is a hex colour code for green.

---

### Micro-Demo 2 — A Rectangle Outline

```javascript
ctx.strokeStyle = "blue";        // Outline colour
ctx.lineWidth = 4;               // Make the outline 4px thick
ctx.strokeRect(10, 10, 200, 100); // Draw just the border
```

**Expected output:** A blue bordered rectangle outline, no fill inside.

---

### Micro-Demo 3 — Fill and Stroke Together

```javascript
ctx.fillStyle = "lightyellow";
ctx.fillRect(20, 20, 160, 80);   // Fill first

ctx.strokeStyle = "orange";
ctx.lineWidth = 3;
ctx.strokeRect(20, 20, 160, 80); // Then outline on top
```

**Expected output:** A light-yellow rectangle with an orange border.

---

## 3.2 Drawing Lines and Paths

For anything other than rectangles, you use **paths** — a sequence of drawing commands that form a shape.

### The Path Workflow

```
1. ctx.beginPath()      ← Start a new path (clear the pen)
2. ctx.moveTo(x, y)     ← Lift pen and place it at starting point
3. ctx.lineTo(x, y)     ← Draw a line to this point
4. ctx.stroke()         ← Actually make the line visible
```

---

### Micro-Demo 4 — A Diagonal Line

```javascript
ctx.beginPath();
ctx.moveTo(10, 10);    // Start point (top-left area)
ctx.lineTo(290, 140);  // End point (bottom-right area)
ctx.strokeStyle = "black";
ctx.lineWidth = 2;
ctx.stroke();          // Render the line

// Output: A diagonal black line crosses the canvas
```

---

### Micro-Demo 5 — A Triangle

```javascript
ctx.beginPath();
ctx.moveTo(150, 10);   // Top point
ctx.lineTo(50, 140);   // Bottom-left
ctx.lineTo(250, 140);  // Bottom-right
ctx.closePath();       // Draw the final line back to the start (closes the shape)
ctx.fillStyle = "green";
ctx.fill();

// Output: A solid green triangle
```

> 💡 `ctx.closePath()` automatically draws a straight line from the current position back to the starting point, closing the shape.

---

## 3.3 Drawing Circles and Arcs

Circles are drawn with `ctx.arc()`.

### Syntax

```javascript
ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
```

| Parameter | Meaning |
|---|---|
| `x, y` | Centre of the circle |
| `radius` | Radius in pixels |
| `startAngle` | Where the arc starts (in **radians**) |
| `endAngle` | Where the arc ends (in **radians**) |
| `counterClockwise` | Optional. `true` = draw backwards. Default is `false` |

> 💡 **Radians vs Degrees:** A full circle = 360 degrees = `2 * Math.PI` radians. For a full circle, use `startAngle = 0` and `endAngle = 2 * Math.PI`.

---

### Micro-Demo 6 — A Full Circle

```javascript
ctx.beginPath();
ctx.arc(150, 75, 50, 0, 2 * Math.PI); // Centre(150,75), radius=50
ctx.fillStyle = "tomato";
ctx.fill();
ctx.strokeStyle = "darkred";
ctx.lineWidth = 3;
ctx.stroke();

// Output: A tomato-red filled circle with a dark-red border
```

---

### Micro-Demo 7 — A Half Circle (Semicircle)

```javascript
ctx.beginPath();
ctx.arc(150, 75, 50, 0, Math.PI); // 0 to π = half circle (bottom half)
ctx.fillStyle = "cornflowerblue";
ctx.fill();

// Output: The bottom half of a blue circle
```

---

## 3.4 Drawing Text on Canvas

```javascript
ctx.font = "24px Arial";          // Font size and family
ctx.fillStyle = "black";
ctx.fillText("Hello Lagos!", 50, 80);  // Text, x, y

// Output: Black text "Hello Lagos!" drawn at position (50, 80)
```

| Method | What It Does |
|---|---|
| `ctx.fillText(text, x, y)` | Draws solid/filled text |
| `ctx.strokeText(text, x, y)` | Draws outlined (hollow) text |
| `ctx.font` | Sets font size and family |
| `ctx.textAlign` | Aligns text: `"left"`, `"center"`, `"right"` |

---

### Micro-Demo 8 — Centred Title Text

```javascript
ctx.font = "bold 28px Georgia";
ctx.fillStyle = "#2c3e50";
ctx.textAlign = "center";
ctx.fillText("Sales Report", canvas.width / 2, 40);

// Output: Bold dark text "Sales Report" centred horizontally
```

---

## 3.5 Images on Canvas

```javascript
const img = new Image();
img.src = "logo.png";

img.onload = function () {
  ctx.drawImage(img, 0, 0, 200, 100);
  // Draws logo.png at (0,0), scaled to 200x100px
};
```

> ⚠️ **Always draw images inside `img.onload`**. If you try to draw before the image loads, you get a blank space — the image hasn't arrived yet.

---

## 3.6 Canvas Animations

Animation works by **rapidly clearing and redrawing** the canvas many times per second. The browser provides `requestAnimationFrame()` which calls your drawing function before every screen refresh (~60 times/second).

---

### Micro-Demo 9 — A Moving Ball

```html
<!DOCTYPE html>
<html>
<body>
  <canvas id="ballCanvas" width="400" height="200" style="border:1px solid #ccc"></canvas>
  <script>
    const canvas = document.getElementById("ballCanvas");
    const ctx = canvas.getContext("2d");

    let x = 20;      // Ball's horizontal position
    let dx = 3;      // Speed: moves 3px per frame

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Erase previous frame

      // Draw ball
      ctx.beginPath();
      ctx.arc(x, 100, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "royalblue";
      ctx.fill();

      // Bounce off walls
      if (x + 20 > canvas.width || x - 20 < 0) {
        dx = -dx; // Reverse direction
      }

      x += dx; // Move the ball

      requestAnimationFrame(draw); // Schedule next frame
    }

    draw(); // Start the animation
  </script>
</body>
</html>
```

**Expected output:** A blue ball bounces left and right across the canvas continuously.

---

### Breaking Down the Animation

| Line | Purpose |
|---|---|
| `ctx.clearRect(...)` | Wipes the entire canvas — without this, old drawings remain and you see a smear |
| `x += dx` | Moves the ball's position |
| `if (x + 20 > canvas.width)` | Checks if the ball has hit the right wall |
| `dx = -dx` | Flips the direction (positive becomes negative) |
| `requestAnimationFrame(draw)` | Asks the browser to call `draw` again at the next screen refresh |

> 💡 **Real-world use:** Canvas animations are used in browser games, interactive product demos, data visualisation animations, and loading spinners.

---

## 3.7 Common Canvas Beginner Mistakes

```javascript
// ❌ WRONG — drawing without a context
const canvas = document.getElementById("myCanvas");
canvas.fillRect(10, 10, 100, 50); // Error! fillRect is not on canvas

// ✅ RIGHT — always draw on the context (ctx)
const ctx = canvas.getContext("2d");
ctx.fillRect(10, 10, 100, 50);
```

```javascript
// ❌ WRONG — drawing a path without beginPath()
ctx.moveTo(0, 0);
ctx.lineTo(100, 100);
ctx.stroke();
// This may draw extra lines connected to previous paths

// ✅ RIGHT — always beginPath() first
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(100, 100);
ctx.stroke();
```

```javascript
// ❌ WRONG — setting colour AFTER drawing
ctx.fillRect(10, 10, 100, 50);
ctx.fillStyle = "red"; // Too late — the rectangle is already drawn in default black

// ✅ RIGHT — set colour BEFORE drawing
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 50);
```

---

# 4. Plotly.js — Interactive Charts

## What Is Plotly.js?

Plotly.js is a **high-level charting library** — you give it data and configuration, and it produces a beautiful interactive chart. It is used heavily in scientific research, financial dashboards, and data analytics platforms.

> 💡 **Real-world use:** Nigerian fintech companies and data analysts use Plotly to visualise transaction trends, exchange rate movements, and customer growth metrics.

---

## 4.1 Including Plotly

Add this `<script>` tag in your HTML `<head>`:

```html
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

You also need a `<div>` where the chart will appear:

```html
<div id="myPlot"></div>
```

---

## 4.2 Your First Plotly Chart — A Line Chart

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <div id="myPlot"></div>

  <script>
    // 1. Define the data
    const data = [
      {
        x: ["Jan", "Feb", "Mar", "Apr", "May"],
        y: [45000, 62000, 38000, 71000, 58000],
        type: "scatter",   // "scatter" with lines = line chart
        mode: "lines+markers",
        name: "Revenue (₦)"
      }
    ];

    // 2. Define the layout (title, axis labels)
    const layout = {
      title: "Monthly Revenue 2024",
      xaxis: { title: "Month" },
      yaxis: { title: "Revenue (₦)" }
    };

    // 3. Render the chart
    Plotly.newPlot("myPlot", data, layout);
  </script>
</body>
</html>
```

**Expected output:** An interactive line chart with data points appears. You can hover each point to see its value, zoom in, and pan.

---

### Breaking Down Plotly's Three Parts

```
data      → What to draw (your numbers and labels)
layout    → How the chart looks (title, axis labels, colours)
Plotly.newPlot() → Combines them and renders inside a div
```

---

## 4.3 Understanding the Data Object

Each **trace** (a line, bar, or pie set) is one object inside the `data` array:

```javascript
{
  x: [...],      // X-axis values (labels or numbers)
  y: [...],      // Y-axis values (your actual data)
  type: "...",   // "scatter" | "bar" | "pie" | "histogram" | etc.
  mode: "...",   // For scatter: "lines" | "markers" | "lines+markers"
  name: "..."    // Label shown in the legend
}
```

---

## 4.4 Bar Chart

```javascript
const data = [
  {
    x: ["Tunde", "Amaka", "Chidi", "Fatima"],
    y: [87, 92, 78, 95],
    type: "bar",
    marker: { color: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"] }
  }
];

const layout = { title: "Student Exam Scores" };

Plotly.newPlot("myDiv", data, layout);

// Output: A colourful bar chart comparing four students' scores
```

---

## 4.5 Pie Chart

```javascript
const data = [
  {
    labels: ["Food", "Transport", "Rent", "Entertainment"],
    values: [35000, 15000, 80000, 10000],
    type: "pie"
  }
];

const layout = { title: "Monthly Budget Breakdown (₦)" };

Plotly.newPlot("myDiv", data, layout);

// Output: An interactive pie chart showing budget proportions.
// Hover any slice to see the exact value and percentage.
```

---

## 4.6 Multiple Traces (Two Lines on One Chart)

```javascript
const data = [
  {
    x: ["Jan", "Feb", "Mar", "Apr"],
    y: [120000, 145000, 98000, 162000],
    type: "scatter",
    mode: "lines+markers",
    name: "Lagos Branch"
  },
  {
    x: ["Jan", "Feb", "Mar", "Apr"],
    y: [80000, 92000, 105000, 88000],
    type: "scatter",
    mode: "lines+markers",
    name: "Abuja Branch"
  }
];

const layout = { title: "Branch Sales Comparison (₦)" };
Plotly.newPlot("myDiv", data, layout);

// Output: Two coloured lines on one chart — easy to compare branches
```

> 💡 Add as many trace objects as you like inside the `data` array. Plotly automatically assigns different colours and a legend.

---

## 4.7 Common Plotly Mistakes

```javascript
// ❌ WRONG — passing the element, not the ID string
Plotly.newPlot(document.getElementById("myDiv"), data, layout);

// ✅ RIGHT — pass the ID as a plain string
Plotly.newPlot("myDiv", data, layout);
```

```javascript
// ❌ WRONG — x and y arrays of different lengths
const data = [{
  x: ["Jan", "Feb", "Mar"],    // 3 items
  y: [100, 200],               // 2 items — mismatch!
  type: "bar"
}];
// The chart will be wrong or broken

// ✅ RIGHT — x and y must be the same length
const data = [{
  x: ["Jan", "Feb", "Mar"],
  y: [100, 200, 300],
  type: "bar"
}];
```

---

# 5. Chart.js — Beautiful Charts

## What Is Chart.js?

Chart.js is one of the most popular charting libraries in web development. It produces **responsive, animated charts** with a simple API. It is used in business dashboards, school management systems, and e-commerce analytics pages.

---

## 5.1 Including Chart.js

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

And create a `<canvas>` (not a `<div>`) — Chart.js draws inside a canvas:

```html
<canvas id="myChart" width="400" height="200"></canvas>
```

---

## 5.2 Your First Chart.js Chart

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <canvas id="myChart" width="400" height="200"></canvas>

  <script>
    // 1. Get the canvas element
    const ctx = document.getElementById("myChart");

    // 2. Create the chart
    new Chart(ctx, {
      type: "bar",                         // Chart type
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],  // X-axis labels
        datasets: [{
          label: "Revenue (₦ thousands)",
          data: [45, 62, 38, 71, 58],      // Y-axis values
          backgroundColor: [              // Bar colours
            "#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Monthly Sales Performance"
          }
        }
      }
    });
  </script>
</body>
</html>
```

**Expected output:** Five coloured bars represent January through May sales. The chart animates in on load.

---

## 5.3 Understanding Chart.js Structure

```
new Chart(canvas, {
  type: "...",          ← "bar" | "line" | "pie" | "doughnut" | "radar" | "scatter"
  data: {
    labels: [...],      ← X-axis labels (what each bar/point represents)
    datasets: [...]     ← Array of datasets (one per line/bar group)
  },
  options: { ... }      ← Titles, tooltips, scales, animations
})
```

---

## 5.4 Line Chart

```javascript
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Website Visitors",
      data: [120, 345, 290, 410, 388],
      borderColor: "#3498db",          // Line colour
      backgroundColor: "rgba(52, 152, 219, 0.15)", // Fill under line
      fill: true,                      // Fill area under line
      tension: 0.4                     // Curve the line (0 = straight, 1 = very curved)
    }]
  }
});

// Output: A smooth curved line chart with a blue fill under the line
```

---

## 5.5 Pie and Doughnut Charts

```javascript
// Pie Chart
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Food", "Transport", "Rent", "Savings"],
    datasets: [{
      data: [35, 15, 40, 10],
      backgroundColor: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12"]
    }]
  }
});

// Output: A colourful pie chart showing percentage of each category
```

```javascript
// Doughnut Chart — same as pie but with a hole in the middle
new Chart(ctx, {
  type: "doughnut",
  data: { /* same as pie */ }
});
```

---

## 5.6 Multiple Datasets (Grouped Bars)

```javascript
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Lagos",
        data: [120, 145, 98, 162],
        backgroundColor: "#3498db"
      },
      {
        label: "Abuja",
        data: [80, 92, 105, 88],
        backgroundColor: "#e74c3c"
      }
    ]
  }
});

// Output: Grouped bars — for each quarter, two bars appear side by side
```

---

## 5.7 Radar Chart (Spider Web Chart)

Great for comparing multiple attributes of entities:

```javascript
new Chart(ctx, {
  type: "radar",
  data: {
    labels: ["Speed", "Reliability", "Cost", "Support", "Features"],
    datasets: [
      {
        label: "Product A",
        data: [80, 70, 90, 65, 85],
        borderColor: "#3498db",
        backgroundColor: "rgba(52, 152, 219, 0.2)"
      },
      {
        label: "Product B",
        data: [60, 90, 75, 80, 70],
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)"
      }
    ]
  }
});

// Output: Two overlapping spider-web shapes — easy to compare strengths
```

---

## 5.8 Useful Chart.js Options

```javascript
options: {
  responsive: true,              // Chart resizes with the browser window
  plugins: {
    legend: {
      position: "top"            // Legend position: "top"|"bottom"|"left"|"right"
    },
    title: {
      display: true,
      text: "My Chart Title"
    },
    tooltip: {
      enabled: true              // Show data values on hover
    }
  },
  scales: {
    y: {
      beginAtZero: true          // Y axis starts at 0 (recommended)
    }
  }
}
```

---

## 5.9 Common Chart.js Mistakes

```javascript
// ❌ WRONG — using a <div> instead of <canvas>
<div id="myChart"></div>
// Chart.js requires a <canvas> element

// ✅ RIGHT
<canvas id="myChart"></canvas>
```

```javascript
// ❌ WRONG — labels and data arrays of different lengths
labels: ["Jan", "Feb", "Mar"],   // 3
data:   [100, 200]               // 2 — chart will be wrong

// ✅ RIGHT — they must match
labels: ["Jan", "Feb", "Mar"],
data:   [100, 200, 300]
```

```javascript
// ❌ WRONG — creating two Chart instances on the same canvas
new Chart(ctx, { ... });
new Chart(ctx, { ... }); // Error: Canvas already in use

// ✅ RIGHT — one chart per canvas
// Destroy the old chart first if replacing it:
const chart = new Chart(ctx, { ... });
chart.destroy(); // Later, if you need to replace it
new Chart(ctx, { ... });
```

---

# 6. Google Charts

## What Is Google Charts?

Google Charts is a **free, web-based charting service by Google**. You load the library from Google's servers, write simple JavaScript, and Google renders the chart inside a `<div>`.

> 💡 **Real-world use:** Government agencies, NGOs, and organisations that already use Google Workspace often prefer Google Charts because of its clean styling and easy integration.

---

## 6.1 How to Load Google Charts

Google Charts has a **two-step loading process**, which is different from other libraries:

```html
<!-- Step 1: Load the loader script -->
<script src="https://www.gstatic.com/charts/loader.js"></script>

<script>
  // Step 2: Load the specific chart package you need
  google.charts.load("current", { packages: ["corechart"] });

  // Step 3: Set a callback — called when the library is ready
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    // Your chart code goes here
  }
</script>
```

> ⚠️ **This three-step pattern is required for every Google Chart.** Never try to draw a chart before `setOnLoadCallback` fires — the library may not have loaded yet.

---

## 6.2 Your First Google Chart — A Line Chart

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://www.gstatic.com/charts/loader.js"></script>
  <script>
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // 1. Create a data table
      const data = new google.visualization.DataTable();

      // 2. Define columns
      data.addColumn("string", "Month");
      data.addColumn("number", "Revenue (₦)");

      // 3. Add rows
      data.addRows([
        ["Jan", 45000],
        ["Feb", 62000],
        ["Mar", 38000],
        ["Apr", 71000],
        ["May", 58000]
      ]);

      // 4. Configure the chart
      const options = {
        title: "Monthly Revenue 2024",
        curveType: "function",   // Smooth curve instead of straight lines
        legend: { position: "bottom" }
      };

      // 5. Draw the chart in a div
      const chart = new google.visualization.LineChart(
        document.getElementById("myChart")
      );
      chart.draw(data, options);
    }
  </script>
</head>
<body>
  <div id="myChart" style="width:600px; height:300px;"></div>
</body>
</html>
```

**Expected output:** A smooth Google-styled line chart with a title and legend.

---

## 6.3 Understanding Google Charts Data Tables

Google Charts uses a special **DataTable** object instead of plain arrays. Think of it like a spreadsheet:

```
| Month (string) | Revenue (number) |
|----------------|-----------------|
| "Jan"          | 45000           |
| "Feb"          | 62000           |
```

```javascript
const data = new google.visualization.DataTable();
data.addColumn("string", "Month");      // Column 1: text labels
data.addColumn("number", "Revenue");    // Column 2: numbers
data.addRows([
  ["Jan", 45000],                       // Each inner array = one row
  ["Feb", 62000]
]);
```

---

## 6.4 Bar Chart

```javascript
function drawChart() {
  const data = google.visualization.arrayToDataTable([
    ["City", "Sales"],   // First row = column headers
    ["Lagos",  320000],
    ["Abuja",  210000],
    ["PH",     175000],
    ["Kano",   140000]
  ]);

  const options = { title: "Sales by City (₦)" };

  const chart = new google.visualization.BarChart(
    document.getElementById("myDiv")
  );
  chart.draw(data, options);
}

// Output: A horizontal bar chart comparing cities
```

> 💡 `google.visualization.arrayToDataTable()` is a shortcut — it builds a DataTable directly from a 2D array (first row = headers).

---

## 6.5 Pie Chart

```javascript
function drawChart() {
  const data = google.visualization.arrayToDataTable([
    ["Category", "Amount"],
    ["Food",          35000],
    ["Transport",     15000],
    ["Rent",          80000],
    ["Entertainment", 10000]
  ]);

  const options = {
    title: "Monthly Budget (₦)",
    is3D: true              // Optional: 3D-style pie chart
  };

  const chart = new google.visualization.PieChart(
    document.getElementById("myDiv")
  );
  chart.draw(data, options);
}

// Output: A 3D pie chart. Click any slice to highlight it.
```

---

## 6.6 Available Google Chart Types

| Chart Class | Type |
|---|---|
| `google.visualization.LineChart` | Line chart |
| `google.visualization.BarChart` | Horizontal bar chart |
| `google.visualization.ColumnChart` | Vertical bar chart |
| `google.visualization.PieChart` | Pie chart |
| `google.visualization.AreaChart` | Area / filled line chart |
| `google.visualization.ScatterChart` | Scatter plot |
| `google.visualization.Table` | Data table |

---

## 6.7 Common Google Charts Mistakes

```javascript
// ❌ WRONG — trying to draw a chart before the library loads
drawChart(); // Called immediately, library not ready yet

// ✅ RIGHT — always wait for the callback
google.charts.setOnLoadCallback(drawChart);
```

```javascript
// ❌ WRONG — using arrayToDataTable with mismatched row lengths
const data = google.visualization.arrayToDataTable([
  ["Month", "Lagos", "Abuja"],  // 3 columns
  ["Jan", 45000]                // Only 2 values — will throw an error
]);

// ✅ RIGHT — every row must have a value for each column
const data = google.visualization.arrayToDataTable([
  ["Month", "Lagos", "Abuja"],
  ["Jan", 45000, 30000]
]);
```

---

# 7. D3.js — Data-Driven Documents

## What Is D3.js?

D3 stands for **Data-Driven Documents**. Unlike the other libraries which draw charts for you, D3 gives you **complete control** over how data maps to visual elements. It is powerful enough to create any visualisation imaginable — but it requires more code.

> 💡 **Real-world use:** D3 is the choice for newspapers, research institutions, and data journalism. Publications like The New York Times and FiveThirtyEight use D3 for their interactive graphics.

---

## 7.1 Including D3

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

D3 works with **SVG** (Scalable Vector Graphics) — a technology for drawing resolution-independent shapes inside a web page.

---

## 7.2 D3 Core Concept: Selecting and Binding

D3's most important idea is the **data join** — connecting data values to HTML or SVG elements.

```
data  →  select elements  →  bind data  →  transform elements
```

Think of it like this: you have a list of 5 numbers, and you want one rectangle on screen for each number. D3 creates those rectangles and "attaches" each number to each rectangle, then lets you say "make each rectangle as tall as its number."

---

## 7.3 D3 Selection (Like querySelector)

```javascript
d3.select("body")          // Select ONE element (like querySelector)
d3.selectAll("p")          // Select ALL matching elements (like querySelectorAll)
d3.select("#myDiv")        // Select by ID
d3.select(".myClass")      // Select by class
```

---

## 7.4 Micro-Demo — Add a Paragraph with D3

```javascript
d3.select("body")
  .append("p")             // Add a <p> element to body
  .text("Hello from D3!"); // Set its text content

// Output: "Hello from D3!" appears on the page
```

---

## 7.5 Binding Data to Elements

```javascript
const cities = ["Lagos", "Abuja", "Port Harcourt"];

d3.select("body")
  .selectAll("p")           // Select all <p> (even if none exist yet)
  .data(cities)             // Bind the array — one item per element
  .enter()                  // For each item without a matching element...
  .append("p")              // ...create a new <p>...
  .text(d => d);            // ...and set its text to the data value

// Output:
// Lagos
// Abuja
// Port Harcourt
// (Three separate paragraphs appear)
```

### Breaking Down the Chain

| Step | Meaning |
|---|---|
| `.selectAll("p")` | "I want to work with paragraph elements" |
| `.data(cities)` | "Here is my data — one value per element" |
| `.enter()` | "For each data item that doesn't have a matching element yet…" |
| `.append("p")` | "…create a new `<p>` element" |
| `.text(d => d)` | "Set its text to the data value (`d`)" |

> 💡 The function `d => d` is an **accessor function**. D3 calls this for each data point and passes the value as `d`. You use `d` to read the data value.

---

## 7.6 Your First D3 Bar Chart

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    .bar { fill: steelblue; }
    .bar:hover { fill: orange; }
  </style>
</head>
<body>
<script>
  const data = [45, 62, 38, 71, 58]; // Monthly revenue (₦ thousands)
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];

  const width = 400, height = 200;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };

  // 1. Create an SVG container
  const svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // 2. Define scales
  const xScale = d3.scaleBand()
    .domain(months)
    .range([margin.left, width - margin.right])
    .padding(0.2);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - margin.bottom, margin.top]);

  // 3. Draw bars
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(months[i]))
    .attr("y", d => yScale(d))
    .attr("width", xScale.bandwidth())
    .attr("height", d => (height - margin.bottom) - yScale(d));

  // 4. Add X axis
  svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

  // 5. Add Y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));
</script>
</body>
</html>
```

**Expected output:** Five blue bars representing monthly revenue. Hovering a bar turns it orange. Axes with labels appear automatically.

---

## 7.7 D3 Concepts Explained

### Scales

Scales **convert your data values into pixel positions**. Without a scale, you would manually calculate pixel positions for every bar — tedious and error-prone.

```javascript
// scaleLinear — maps a continuous range of numbers to pixels
const yScale = d3.scaleLinear()
  .domain([0, 100])     // Data range: 0 to 100
  .range([200, 0]);     // Pixel range: 0 (top) to 200 (bottom)

// When data = 50, yScale(50) = 100 pixels from top (the midpoint)
```

```javascript
// scaleBand — evenly divides space for categorical (text) labels
const xScale = d3.scaleBand()
  .domain(["Jan", "Feb", "Mar"]) // Categories
  .range([0, 400])               // Pixel space
  .padding(0.2);                 // 20% gap between bars

// xScale("Feb") returns the pixel position where February's bar should start
// xScale.bandwidth() returns the width of each bar
```

---

### Axes

D3 axes automatically draw tick marks and labels based on your scale:

```javascript
// Attach an X axis (bottom) to an SVG group element
svg.append("g")
  .attr("transform", "translate(0, 200)")   // Move to bottom of chart
  .call(d3.axisBottom(xScale));             // Draw axis using xScale

// Attach a Y axis (left)
svg.append("g")
  .attr("transform", "translate(50, 0)")    // Move to left of chart
  .call(d3.axisLeft(yScale));
```

---

### Accessor Functions

D3 uses accessor functions extensively. The pattern `(d, i) => ...` means:

```javascript
.attr("x", (d, i) => xScale(months[i]))
//           ^  ^
//           |  index: position in the array (0, 1, 2...)
//           datum: the actual data value (45, 62, 38...)
```

---

## 7.8 D3 vs Higher-Level Libraries

| Feature | D3 | Chart.js / Plotly |
|---|---|---|
| Control | Total — you design everything | Limited to built-in chart types |
| Learning curve | Steep | Gentle |
| Custom visuals | Yes (maps, trees, networks, etc.) | No |
| Lines of code | Many | Few |
| Best for | Unique, bespoke visualisations | Standard business charts |

> 💡 **Professional tip:** Most developers use Chart.js or Plotly for everyday dashboards, and bring in D3 only when they need something highly custom.

---

## 7.9 Common D3 Beginner Mistakes

```javascript
// ❌ WRONG — forgetting to call .enter() before appending
svg.selectAll("rect")
  .data(data)
  .append("rect");  // Nothing is created — .enter() is missing

// ✅ RIGHT
svg.selectAll("rect")
  .data(data)
  .enter()          // Required to create elements for new data
  .append("rect");
```

```javascript
// ❌ WRONG — confusing SVG coordinate directions for bar heights
.attr("height", d => yScale(d)) // Wrong! yScale returns the Y position, not height

// ✅ RIGHT — height is the distance from the bar top to the bottom of the chart
.attr("height", d => chartHeight - yScale(d))
```

---

# Phase 2 — Applied Exercises

---

## Exercise 1: Canvas Drawing — Naija Flag

**Objective:** Draw the Nigerian flag using Canvas API.

**Scenario:** You are building an educational website about Nigeria. The landing page needs a canvas-drawn Nigerian flag.

**Warm-up:** First, draw two separate green rectangles to ensure you understand `fillRect`.

**Step-by-Step Instructions:**

1. Create an HTML file with a `<canvas id="flag" width="300" height="200">`.
2. Get the 2D context.
3. The Nigerian flag has three vertical strips: **green | white | green**. Each strip is 100px wide and 200px tall.
4. Draw the left green strip: `fillRect(0, 0, 100, 200)`.
5. Draw the white middle strip: `fillRect(100, 0, 100, 200)`.
6. Draw the right green strip: `fillRect(200, 0, 100, 200)`.

**Hints:**
- Set `ctx.fillStyle = "#008751"` for Nigeria green.
- Set `ctx.fillStyle = "white"` for the middle strip.

**Expected output:**
```
[ Green | White | Green ]  ← 300x200 canvas
```

**Self-check questions:**
- What does `fillRect(200, 0, 100, 200)` mean? (x=200, y=0, width=100, height=200)
- What would happen if all three strips were 90px wide instead of 100px?
- How would you add a thin black border around the entire flag?

**What-if challenge:** Can you also use `ctx.strokeRect()` to add a black border around the entire flag canvas?

---

## Exercise 2: Plotly — Student Score Tracker

**Objective:** Create an interactive chart showing a student's weekly quiz scores.

**Scenario:** Babatunde is tutoring five students. He wants a visual dashboard to track their quiz performance across five weeks.

**Warm-up:** First plot just one student's scores as a line with `mode: "lines+markers"`.

**Step-by-Step Instructions:**

1. Set up an HTML file with Plotly CDN and a `<div id="scorePlot">`.
2. Create `weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"]`.
3. Create scores arrays for two students: Tunde `[60, 72, 68, 80, 75]` and Amaka `[55, 60, 78, 82, 90]`.
4. Define two trace objects (one per student) with `type: "scatter"` and `mode: "lines+markers"`.
5. Add a layout with title `"Weekly Quiz Scores"` and axis labels.
6. Call `Plotly.newPlot()`.

**Hints:**
- Add a `name` property to each trace to label the legend correctly.
- Set `marker: { size: 8 }` to make data points larger and easier to see.

**Expected output:** Two coloured lines on one chart. Hovering a point shows the exact score.

**Self-check questions:**
- How would you add a third student, Chidi, with scores `[70, 65, 74, 78, 85]`?
- What `type` would you use if you wanted vertical bars instead of lines?
- How does the legend help when multiple lines are on one chart?

---

## Exercise 3: Chart.js — Monthly Budget Doughnut

**Objective:** Visualise a personal monthly budget as a doughnut chart.

**Scenario:** Fatima wants to see how she spends her monthly ₦250,000 salary.

**Warm-up:** First create a simple pie chart with just three categories.

**Budget Data:**
```
Rent:          ₦90,000
Food:          ₦45,000
Transport:     ₦25,000
Savings:       ₦50,000
Entertainment: ₦20,000
Utilities:     ₦20,000
```

**Step-by-Step Instructions:**

1. Create HTML with Chart.js CDN and a `<canvas id="budgetChart">`.
2. Get the canvas element and create a `new Chart()` with `type: "doughnut"`.
3. Set `labels` to the six categories.
4. Set `data` to the six amounts.
5. Pick six distinct `backgroundColor` colours.
6. Add a title "Fatima's Monthly Budget (₦250,000)".

**Hints:**
- Set `responsive: true` in options so the chart scales with the browser.
- Set `plugins.legend.position: "right"` to show the legend on the right side.

**Expected output:** A doughnut chart divided into six coloured sections.

**Self-check questions:**
- What is the difference between a `"pie"` and `"doughnut"` type in Chart.js?
- How would you show the actual percentage on each segment? (Hint: look up `Chart.js datalabels plugin`)
- How would this chart change if Fatima got a ₦30,000 raise and added it to Savings?

---

## Exercise 4: Google Charts — City Population Comparison

**Objective:** Build a bar chart comparing the population of Nigerian cities.

**Scenario:** A geography teacher wants to show students a quick visual of Nigerian city populations.

**Data:**
```
Lagos:         15,000,000
Kano:           4,000,000
Ibadan:         3,800,000
Abuja:          3,600,000
Port Harcourt:  2,500,000
```

**Step-by-Step Instructions:**

1. Include the Google Charts loader.
2. Load the `"corechart"` package.
3. In your `drawChart` callback, use `arrayToDataTable` to build the data.
4. Use `google.visualization.ColumnChart` (vertical bars).
5. Set options: `title: "Nigerian City Populations"`, `legend: { position: "none" }`.

**Hints:**
- Use `colors: ["#008751"]` in options to colour bars Nigeria-green.
- Set the container div's style to `width: 600px; height: 350px`.

**Expected output:** Five green vertical bars, tallest for Lagos.

**Self-check questions:**
- What is the difference between `BarChart` and `ColumnChart` in Google Charts?
- Why must you wait for `setOnLoadCallback` before calling `drawChart`?

---

## Exercise 5: D3 — Horizontal Progress Bars

**Objective:** Use D3 to create horizontal progress bars showing project completion percentages.

**Scenario:** A project manager wants a simple visual showing how complete each of four projects is.

**Data:**
```javascript
const projects = [
  { name: "Website Redesign", complete: 75 },
  { name: "Mobile App",       complete: 45 },
  { name: "API Integration",  complete: 90 },
  { name: "Database Upgrade", complete: 30 }
];
```

**Warm-up:** First create a single rectangle 200px wide using D3's `svg.append("rect")`.

**Step-by-Step Instructions:**

1. Create an SVG 500px wide × 200px tall.
2. For each project, append a grey background `rect` 400px wide × 25px tall.
3. Append a coloured `rect` whose width is `(complete / 100) * 400` pixels.
4. Append a `text` element showing the project name and percentage.
5. Position each row 45px apart using the index `i`.

**Hints:**
- Use `.data(projects).enter().append(...)` pattern.
- Use `(d, i) => i * 45` for vertical positioning.
- Set `fill: "#2ecc71"` for the progress bar colour.

**Expected output:**
```
Website Redesign ████████████████████░░░░░░  75%
Mobile App       ██████████████░░░░░░░░░░░░  45%
API Integration  ███████████████████████░░░  90%
Database Upgrade █████████░░░░░░░░░░░░░░░░░  30%
```

---

# Phase 3 — Project: Monthly Sales Dashboard

## Project Overview

**Project name:** Naija Sales Performance Dashboard

**Scenario:** You are a junior developer at a Nigerian e-commerce startup. The marketing manager wants a web-based dashboard showing monthly performance data across three channels: Online, Retail Store, and Wholesale. The dashboard must include:

- A **line chart** showing monthly revenue trends (Chart.js)
- A **pie chart** showing channel distribution (Chart.js)
- A **bar chart** showing city performance (Google Charts)
- A **D3 metric bar** showing targets vs. actuals

---

## Stage 1 — Setup & Core Structure

**Objective:** Create the HTML shell and load all libraries.

**Simple example first:**

```html
<!-- Minimal multi-library setup -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://d3js.org/d3.v7.min.js"></script>
```

**Full Stage 1 Code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Naija Sales Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://www.gstatic.com/charts/loader.js"></script>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f0f2f5; padding: 20px; }
    h1 { text-align: center; color: #2c3e50; margin-bottom: 20px; }
    .dashboard { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .card {
      background: white; border-radius: 8px;
      padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .card h2 { font-size: 16px; color: #555; margin-bottom: 15px; }
    .full-width { grid-column: 1 / -1; }
  </style>
</head>
<body>
  <h1>🇳🇬 Naija Sales Performance Dashboard — 2024</h1>

  <div class="dashboard">
    <div class="card full-width">
      <h2>Monthly Revenue Trend (₦)</h2>
      <canvas id="trendChart" height="80"></canvas>
    </div>
    <div class="card">
      <h2>Sales by Channel</h2>
      <canvas id="channelChart"></canvas>
    </div>
    <div class="card">
      <h2>City Performance (₦)</h2>
      <div id="cityChart" style="height:250px"></div>
    </div>
    <div class="card full-width">
      <h2>Target vs Actual</h2>
      <div id="targetViz"></div>
    </div>
  </div>

  <script src="dashboard.js"></script>
</body>
</html>
```

**Expected output:** A two-column dashboard grid with four white cards. All charts are empty at this stage.

---

## Stage 2 — Adding Charts

**File: dashboard.js**

### Part A — Revenue Trend Line Chart (Chart.js)

```javascript
// ── PART A: Revenue Trend (Chart.js) ─────────────────────────
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const revenue = {
  online:    [85, 92, 78, 105, 113, 98, 122, 135, 118, 140, 162, 189],
  retail:    [60, 58, 72, 65,  80,  75, 88,  92,  85,  98,  110, 125],
  wholesale: [120, 115, 130, 125, 142, 138, 155, 148, 160, 172, 180, 195]
};

new Chart(document.getElementById("trendChart"), {
  type: "line",
  data: {
    labels: months,
    datasets: [
      {
        label: "Online (₦k)",
        data: revenue.online,
        borderColor: "#3498db",
        backgroundColor: "rgba(52,152,219,0.1)",
        fill: true, tension: 0.4
      },
      {
        label: "Retail (₦k)",
        data: revenue.retail,
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231,76,60,0.1)",
        fill: true, tension: 0.4
      },
      {
        label: "Wholesale (₦k)",
        data: revenue.wholesale,
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46,204,113,0.1)",
        fill: true, tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "₦ (thousands)" } }
    }
  }
});
```

---

### Part B — Channel Pie Chart (Chart.js)

```javascript
// ── PART B: Sales by Channel (Chart.js) ──────────────────────
const totalByChannel = [
  revenue.online.reduce((a, b) => a + b, 0),
  revenue.retail.reduce((a, b) => a + b, 0),
  revenue.wholesale.reduce((a, b) => a + b, 0)
];

new Chart(document.getElementById("channelChart"), {
  type: "doughnut",
  data: {
    labels: ["Online", "Retail", "Wholesale"],
    datasets: [{
      data: totalByChannel,
      backgroundColor: ["#3498db", "#e74c3c", "#2ecc71"]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "bottom" }
    }
  }
});
```

---

### Part C — City Bar Chart (Google Charts)

```javascript
// ── PART C: City Performance (Google Charts) ─────────────────
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(function () {
  const cityData = google.visualization.arrayToDataTable([
    ["City", "Revenue (₦k)", { role: "style" }],
    ["Lagos",         520, "color: #3498db"],
    ["Abuja",         310, "color: #e74c3c"],
    ["Port Harcourt", 245, "color: #2ecc71"],
    ["Kano",          185, "color: #f39c12"],
    ["Ibadan",        160, "color: #9b59b6"]
  ]);

  const cityOptions = {
    legend: "none",
    hAxis: { title: "Revenue (₦ thousands)" },
    vAxis: { title: "City" }
  };

  new google.visualization.BarChart(
    document.getElementById("cityChart")
  ).draw(cityData, cityOptions);
});
```

---

### Part D — Target vs Actual (D3)

```javascript
// ── PART D: Target vs Actual (D3) ────────────────────────────
const targets = [
  { channel: "Online",    target: 1500, actual: 1337 },
  { channel: "Retail",    target: 1200, actual: 1008 },
  { channel: "Wholesale", target: 1800, actual: 1768 }
];

const svgW = 560, svgH = 160;
const barH = 28, gap = 50;

const svg = d3.select("#targetViz")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

const xScale = d3.scaleLinear()
  .domain([0, 2000])
  .range([120, svgW - 20]);

targets.forEach((t, i) => {
  const y = i * (barH + gap) + 10;
  const pct = Math.round((t.actual / t.target) * 100);

  // Background track
  svg.append("rect")
    .attr("x", 120).attr("y", y)
    .attr("width", svgW - 140).attr("height", barH)
    .attr("fill", "#ecf0f1").attr("rx", 4);

  // Target line
  svg.append("line")
    .attr("x1", xScale(t.target)).attr("x2", xScale(t.target))
    .attr("y1", y - 5).attr("y2", y + barH + 5)
    .attr("stroke", "#e74c3c").attr("stroke-width", 2)
    .attr("stroke-dasharray", "4,3");

  // Actual bar
  svg.append("rect")
    .attr("x", 120).attr("y", y)
    .attr("width", xScale(t.actual) - 120).attr("height", barH)
    .attr("fill", pct >= 100 ? "#2ecc71" : "#3498db")
    .attr("rx", 4);

  // Channel label
  svg.append("text")
    .attr("x", 0).attr("y", y + barH / 2 + 5)
    .attr("font-size", 13).attr("fill", "#2c3e50")
    .text(t.channel);

  // Percentage label
  svg.append("text")
    .attr("x", xScale(t.actual) + 6).attr("y", y + barH / 2 + 5)
    .attr("font-size", 12).attr("fill", "#555")
    .text(`${pct}%`);
});
```

**Expected output for the full dashboard:**
- Top: A three-line chart showing annual revenue per channel
- Left middle: A doughnut chart showing channel split
- Right middle: A horizontal bar chart of city revenues
- Bottom: Three horizontal progress bars with target lines

---

## Stage 3 — Enhancements & Reflection

### Adding a Summary Stats Bar

```javascript
// Add KPI summary cards above the dashboard
const totalRevenue = Object.values(revenue)
  .flat()
  .reduce((a, b) => a + b, 0);

const bestMonth = months[revenue.online.map((_, i) =>
  revenue.online[i] + revenue.retail[i] + revenue.wholesale[i]
).indexOf(Math.max(...revenue.online.map((_, i) =>
  revenue.online[i] + revenue.retail[i] + revenue.wholesale[i]
)))];

console.log(`Total Annual Revenue: ₦${totalRevenue.toLocaleString()}k`);
console.log(`Best Month: ${bestMonth}`);
// Output example:
// Total Annual Revenue: ₦3,929k
// Best Month: Dec
```

---

### Reflection Questions

1. **Why use Chart.js for the trend chart instead of raw Canvas API?**
   Chart.js handles axis drawing, scaling, animation, tooltips, and legends automatically. Doing all that manually with Canvas would require hundreds of extra lines of code.

2. **When would you choose D3 over Chart.js for the target bars?**
   The target-vs-actual bars with a dashed target line and conditional colouring are difficult to build with Chart.js. D3 makes it easy to position every element exactly where it needs to be.

3. **How would this dashboard work in a real company?**
   In production, the data arrays would come from an API call (fetch or Axios) rather than being hardcoded. The dashboard would refresh periodically to show live data.

4. **What would you add to make this dashboard production-ready?**
   - Date range picker to filter months
   - Export to PNG / PDF button
   - Mobile-responsive layout adjustments
   - Loading spinners while data fetches
   - Error handling if the API is unavailable

---

### Optional Advanced Features

- **Animate the D3 bars:** Use `.transition().duration(800)` before `.attr("width", ...)` to make bars grow in smoothly.
- **Add Plotly for a scatter plot:** Show the relationship between marketing spend and revenue per month.
- **Dark mode toggle:** Use a CSS class swap and update all chart colours on toggle.
- **Data export:** Add a button that downloads the chart as a PNG using `chart.toBase64Image()` (Chart.js) or `Plotly.downloadImage()`.

---

# Self-Assessment Quiz

**Instructions:** Answer without looking at the notes. Check answers after.

1. What method do you use to start drawing a path on a Canvas?
2. What does `ctx.clearRect(0, 0, canvas.width, canvas.height)` do in an animation?
3. What is the difference between `fillRect` and `strokeRect`?
4. In Plotly, what property of a trace object sets its chart type (bar, line, pie)?
5. What does `mode: "lines+markers"` do in a Plotly scatter trace?
6. In Chart.js, why must you use a `<canvas>` element and not a `<div>`?
7. What does `new Chart(ctx, { type, data, options })` return — can you store it in a variable? Why would you?
8. In Google Charts, what does `setOnLoadCallback` do and why is it required?
9. What is the purpose of `.enter()` in D3's data join?
10. What is the difference between `d3.scaleLinear()` and `d3.scaleBand()`?

---

## Answer Key

1. `ctx.beginPath()` — it clears any previously open path so your new path starts fresh.
2. It wipes the entire canvas clean so the next frame draws on a blank surface, preventing visual smearing from previous frames.
3. `fillRect` draws a solid (filled) rectangle; `strokeRect` draws only the outline/border, no fill.
4. The `type` property — e.g. `type: "bar"`, `type: "pie"`, `type: "scatter"`.
5. It draws both connected lines between points AND small circular dots at each data point.
6. Chart.js uses the Canvas 2D API internally — it must render onto a `<canvas>`, not a generic container.
7. Yes: `const myChart = new Chart(...)`. Storing it lets you call `myChart.destroy()` later (needed before replacing) or update its data dynamically.
8. It registers a function to run **after** the Google Charts library has fully loaded. Without it, calling chart constructors would fail because the library isn't ready.
9. `.enter()` returns a selection for each data item that does **not yet** have a matching DOM element — it tells D3 to create new elements for those items.
10. `scaleLinear` maps a continuous number range (e.g. 0–100) to pixels. `scaleBand` divides pixel space evenly among categorical items (text labels like months or city names) and provides a `bandwidth()` for bar widths.

---

# Completion Checklist

- [ ] I understand what the HTML `<canvas>` element is and how to get its 2D context
- [ ] I can draw rectangles, lines, circles, and text using the Canvas API
- [ ] I understand the Canvas coordinate system (origin at top-left)
- [ ] I can create a basic Canvas animation using `requestAnimationFrame`
- [ ] I can build line, bar, and pie charts with Plotly.js and understand its `data / layout` structure
- [ ] I understand Plotly traces and can plot multiple datasets on one chart
- [ ] I can create charts with Chart.js using the `type / data / options` structure
- [ ] I know when to use Chart.js's `doughnut`, `radar`, and grouped `bar` types
- [ ] I understand Google Charts' mandatory three-step loading process
- [ ] I can use `arrayToDataTable` as a shortcut to build Google Charts data
- [ ] I understand D3's core data-join pattern: `selectAll → data → enter → append`
- [ ] I can create and use `scaleLinear` and `scaleBand` in D3
- [ ] I can draw D3 axes with `axisBottom` and `axisLeft`
- [ ] I have built the complete Naija Sales Dashboard combining all four libraries
- [ ] I can explain when to use each library based on the use case

---

> **Summary:** JavaScript provides multiple paths to data visualisation — from the low-level Canvas API where you control every pixel, to high-level libraries like Chart.js, Plotly, and Google Charts that generate beautiful charts from simple data structures, to D3 which offers complete programmatic control for fully custom visualisations. Matching the right tool to the task is a key professional skill.
