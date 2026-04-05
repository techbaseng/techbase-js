---
render_with_liquid: false
title: "JavaScript Dates: Creating · Formatting · Reading · Changing Every Date in JavaScript"
nav_order: 12
---

## 📑 Table of Contents
1. [Background: What Is a Date Object?](#1-background-what-is-a-date-object)
2. [Topic 1 — Creating Date Objects (4 Ways)](#2-topic-1--creating-date-objects-4-ways)
3. [Topic 2 — JavaScript Date Formats](#3-topic-2--javascript-date-formats)
4. [Topic 3 — Get Date Methods (Reading Dates)](#4-topic-3--get-date-methods-reading-dates)
5. [Topic 4 — Set Date Methods (Changing Dates)](#5-topic-4--set-date-methods-changing-dates)
6. [Topic 5 — Complete Date Reference](#6-topic-5--complete-date-reference)
7. [Applied Exercises](#7-applied-exercises)
8. [Mini Project — Event Countdown & Schedule Builder](#8-mini-project--event-countdown--schedule-builder)
9. [Completion Checklist](#9-completion-checklist)

---

## 1. Background: What Is a Date Object?

Before anything else, you need to understand *why* JavaScript has a special thing called a **Date object**.

Think about everyday life. You tell someone: *"The meeting is on the 5th of March 2026 at 9 AM."* That sentence contains a year, a month, a day, and a time. JavaScript needs a structured way to store, read, compare, and calculate all of those parts together. That is exactly what a **Date object** does.

A **Date object** is a built-in JavaScript tool that stores a single moment in time. It knows the year, month, day, hour, minute, second, and even milliseconds of that moment.

### The Secret Inside Every Date: Milliseconds Since 1 January 1970

Here is the most important concept about JavaScript dates:

> **Every JavaScript date is internally stored as a single large number — the number of milliseconds that have passed since January 1, 1970, 00:00:00 UTC (Coordinated Universal Time).**

This starting point — January 1, 1970 — is called the **Unix Epoch** (or ECMAScript Epoch). It is a universal agreement shared by most programming languages.

| Moment | Milliseconds |
|--------|-------------|
| January 1, 1970 00:00:00 | `0` |
| January 2, 1970 00:00:00 | `86,400,000` (1 day = 24 × 60 × 60 × 1000) |
| January 1, 2024 00:00:00 | `1,704,067,200,000` |
| Dates before 1970 | Negative numbers |

Why is this useful? Because storing dates as a single number makes comparing them trivial. Earlier dates have smaller numbers; later dates have bigger numbers. To find "days between two dates", subtract and divide.

> 💡 **TIP:** There are 1,000 ms in 1 second · 60,000 ms in 1 minute · 3,600,000 ms in 1 hour · **86,400,000 ms in 1 full day.** You will use 86,400,000 frequently.

> 🤔 **THINK ABOUT IT:** If dates before 1970 have *negative* millisecond values, what would `new Date(-86400000)` represent? (Answer: December 31, 1969 — exactly one day before the epoch.)

> 🏢 **REAL WORLD:** Every database record, order timestamp, chat message, and social media post is stored somewhere as a millisecond number. JavaScript converts it to a human-readable form when needed.

---
---

## 2. Topic 1 — Creating Date Objects (4 Ways)

> **Phase 1 — Conceptual Understanding**

There are **4 ways** to create a Date object. All use the `new Date()` constructor — only what you put *inside* the parentheses changes.

---

### Way 1 — `new Date()` — Current Date and Time (No Arguments)

The simplest way. Captures the exact moment this line of code runs.

```javascript
const now = new Date();
console.log(now);
```

**▶ Expected Output (your output will show your current time):**
```
Sun Mar 01 2026 14:30:00 GMT+0000 (Coordinated Universal Time)
```

> 🏢 **REAL WORLD:** Every time a user clicks "Submit Order", the system runs `new Date()` and saves it as the order timestamp — the "Order placed at…" line in your confirmation email.

---

### Way 2 — `new Date(milliseconds)` — From a Number

Pass a raw millisecond number. JavaScript counts forward from January 1, 1970.

```javascript
const epoch = new Date(0);            // Exactly the starting point
console.log(epoch.toDateString());    // Thu Jan 01 1970

const oneDay = new Date(86400000);    // 1 day after epoch
console.log(oneDay.toDateString());   // Fri Jan 02 1970

const y2024 = new Date(1704067200000); // January 1, 2024
console.log(y2024.toDateString());     // Mon Jan 01 2024
```

**▶ Expected Output:**
```
Thu Jan 01 1970
Fri Jan 02 1970
Mon Jan 01 2024
```

> 🏢 **REAL WORLD:** APIs often return dates as millisecond timestamps in JSON, e.g. `"created_at": 1704067200000`. You convert it immediately with `new Date(1704067200000)`.

---

### Way 3 — `new Date(dateString)` — From a Text String

Pass a date as text. JavaScript parses (reads and understands) it.

```javascript
const d1 = new Date("2024-01-15");
console.log(d1.toDateString());    // Mon Jan 15 2024

const d2 = new Date("January 15, 2024");
console.log(d2.toDateString());    // Mon Jan 15 2024

const d3 = new Date("01/15/2024");
console.log(d3.toDateString());    // Mon Jan 15 2024
```

**▶ Expected Output:**
```
Mon Jan 15 2024
Mon Jan 15 2024
Mon Jan 15 2024
```

> ⚠️ **WATCH OUT:** Not all string formats work reliably in all browsers. The safest format is **ISO 8601** (`"YYYY-MM-DD"`). We cover all formats in Topic 2.

---

### Way 4 — `new Date(year, month, day, hours, minutes, seconds, ms)` — From Specific Parts

Pass each part separately. This is the **most precise and reliable** way to create a specific date. Only `year` and `month` are required — the rest default to `0` (day defaults to `1`).

```javascript
const d1 = new Date(2024, 0, 15);         // Jan 15, 2024
console.log(d1.toDateString());           // Mon Jan 15 2024

const d2 = new Date(2024, 0, 15, 9, 30, 0); // Jan 15, 2024 at 9:30:00 AM
console.log(d2.toTimeString().slice(0, 8));  // 09:30:00
```

**▶ Expected Output:**
```
Mon Jan 15 2024
09:30:00
```

#### ⚠️ CRITICAL RULE — Months Are 0-Indexed!

This is the **single most common beginner mistake** with JavaScript dates. Months start at **0**, not 1.

| Month Name | `new Date()` index |
|------------|-------------------|
| January | **0** |
| February | **1** |
| March | **2** |
| April | **3** |
| May | **4** |
| June | **5** |
| July | **6** |
| August | **7** |
| September | **8** |
| October | **9** |
| November | **10** |
| December | **11** |

```javascript
// ❌ WRONG — this creates FEBRUARY 15, not January!
const wrong = new Date(2024, 1, 15);
console.log(wrong.toDateString()); // Thu Feb 15 2024  ← not what you wanted!

// ✅ CORRECT — month 0 = January
const correct = new Date(2024, 0, 15);
console.log(correct.toDateString()); // Mon Jan 15 2024
```

> 🐛 **COMMON MISTAKE:** `new Date(2024, 12, 1)` does NOT throw an error — it silently wraps around to **January 1, 2025!** JavaScript overflows months into the next year. Useful for arithmetic, dangerous if accidental.

---

### ⚠️ The 1-Argument Trap

If you pass **exactly one number**, JavaScript treats it as **milliseconds** (Way 2), NOT a year:

```javascript
// ❌ This does NOT create the year 2024 — it creates 2024 ms after epoch!
const trap = new Date(2024);
console.log(trap.toDateString()); // Thu Jan 01 1970  ← wrong!

// ✅ To specify year only, always pass at least year AND month:
const correct = new Date(2024, 0); // January 1, 2024
console.log(correct.toDateString()); // Mon Jan 01 2024
```

---

### `Date.now()` — Get Current Timestamp as a Raw Number

`Date.now()` is called on `Date` itself (not an instance). Returns the current time as a millisecond number — no Date object created.

```javascript
const ms = Date.now();
console.log(ms);                          // e.g. 1706745600000
console.log(new Date(ms).toDateString()); // e.g. Mon Jan 29 2024
```

> 🏢 **REAL WORLD:** Used to measure how long code takes to run. Record `Date.now()` before and after an operation and subtract.

```javascript
const start = Date.now();
// ... some heavy task ...
const end = Date.now();
console.log("Took:", (end - start), "ms");
```

---

### Displaying a Date — Overview of Output Methods

```javascript
const d = new Date(2024, 0, 15, 9, 30, 0); // Jan 15, 2024, 9:30 AM

console.log(d.toString());           // Mon Jan 15 2024 09:30:00 GMT+0000 (UTC)
console.log(d.toDateString());       // Mon Jan 15 2024
console.log(d.toTimeString());       // 09:30:00 GMT+0000 (UTC)
console.log(d.toISOString());        // 2024-01-15T09:30:00.000Z
console.log(d.toUTCString());        // Mon, 15 Jan 2024 09:30:00 GMT
console.log(d.toLocaleDateString()); // 1/15/2024  (depends on locale)
```

**▶ Expected Output:**
```
Mon Jan 15 2024 09:30:00 GMT+0000 (Coordinated Universal Time)
Mon Jan 15 2024
09:30:00 GMT+0000 (Coordinated Universal Time)
2024-01-15T09:30:00.000Z
Mon, 15 Jan 2024 09:30:00 GMT
1/15/2024
```

> 💡 **TIP:** When you `console.log()` a Date object directly, JavaScript automatically calls `toString()` on it — that's why you see the long string.

---

### Summary: The 4 Ways to Create a Date

| Constructor | Use When |
|-------------|----------|
| `new Date()` | You want the current date/time right now |
| `new Date(ms)` | You have a stored millisecond timestamp |
| `new Date(string)` | You have a date as text (use ISO format!) |
| `new Date(y, m, d, ...)` | You want a specific date with full control |

---
---

## 3. Topic 2 — JavaScript Date Formats

> **Phase 1 — Conceptual Understanding**

When creating a date from a **string**, the format of that string determines how it is interpreted. JavaScript supports three standard formats, with very different reliability levels.

### The 3 Date Input Formats

| Format Type | Example | Reliability |
|-------------|---------|------------|
| ISO 8601 | `"2024-01-15"` | ✅ Most reliable — always use this |
| Long Date | `"January 15 2024"` | ✅ Works in most modern browsers |
| Short Date | `"01/15/2024"` | ⚠️ Ambiguous — avoid in global apps |

---

### Format 1: ISO 8601 ✅ — The International Standard

ISO 8601 is an international standard for writing dates. It is the **officially recommended format for JavaScript** because it is consistent across all browsers and countries. The rule is always: **Year first, then Month, then Day, separated by hyphens.**

```
YYYY-MM-DD                    → date only
YYYY-MM                       → month precision
YYYY                          → year precision
YYYY-MM-DDTHH:MM:SS           → date + time  (T separates them)
YYYY-MM-DDTHH:MM:SSZ          → date + time in UTC  (Z = "Zulu" = UTC)
YYYY-MM-DDTHH:MM:SS+HH:MM     → date + time with timezone offset
```

#### Date-only ISO examples:

```javascript
const full  = new Date("2024-01-15"); // Full precision
const month = new Date("2024-01");    // January 1, 2024
const year  = new Date("2024");       // January 1, 2024

console.log(full.toDateString());  // Mon Jan 15 2024
console.log(month.toDateString()); // Mon Jan 01 2024
console.log(year.toDateString());  // Mon Jan 01 2024
```

**▶ Expected Output:**
```
Mon Jan 15 2024
Mon Jan 01 2024
Mon Jan 01 2024
```

#### Date + Time ISO examples:

```javascript
// Without Z — treated as LOCAL time (midnight in your timezone)
const local = new Date("2024-01-15T09:30:00");
console.log(local.toTimeString()); // 09:30:00 (in your local timezone)

// With Z — treated as UTC time
const utc = new Date("2024-01-15T09:30:00Z");
console.log(utc.toUTCString()); // Mon, 15 Jan 2024 09:30:00 GMT
```

#### ⚠️ The Timezone Date-Shift Trap

ISO date-only strings like `"2024-01-15"` are treated as **UTC midnight**. If you are in a timezone *behind* UTC (e.g. Americas), UTC midnight is still the previous day locally — so your date shows one day early.

```javascript
// In timezone UTC-5 (e.g. New York):
const d = new Date("2024-01-15");
console.log(d.toLocaleDateString());
// ❌ Shows "1/14/2024" — one day early!

// Fix — treat as local midnight instead:
const safe = new Date("2024-01-15T00:00:00");  // No Z = local time
console.log(safe.toLocaleDateString());
// ✅ Shows "1/15/2024"
```

> 🐛 **COMMON MISTAKE:** This timezone trap has confused millions of developers. Whenever you create a date from a date-only ISO string and plan to display it locally, always append `T00:00:00` (no Z) to force it to be treated as local midnight.

---

### Format 2: Long Date Format

Uses the full or abbreviated English month name. Day and year can come in any order.

```javascript
const d1 = new Date("January 15 2024");   // Month name first
const d2 = new Date("Jan 15 2024");       // Abbreviated month name
const d3 = new Date("15 January 2024");   // Day first also works
const d4 = new Date("January 15, 2024");  // Comma is fine too

console.log(d1.toDateString()); // Mon Jan 15 2024
console.log(d2.toDateString()); // Mon Jan 15 2024
console.log(d3.toDateString()); // Mon Jan 15 2024
console.log(d4.toDateString()); // Mon Jan 15 2024
```

**▶ Expected Output:**
```
Mon Jan 15 2024
Mon Jan 15 2024
Mon Jan 15 2024
Mon Jan 15 2024
```

Month names are **case-insensitive**: `"JANUARY"`, `"january"`, and `"January"` all work.

---

### Format 3: Short Date Format (US-style MM/DD/YYYY)

```javascript
const d = new Date("01/15/2024"); // Month / Day / Year
console.log(d.toDateString()); // Mon Jan 15 2024
```

**▶ Expected Output:** `Mon Jan 15 2024`

> ⚠️ **WATCH OUT:** `"04/05/2024"` is ambiguous. In the US it means **April 5**. In most other countries it reads as **5th of April** (same result here) — but `"05/04/2024"` means **May 4** in the US and **April 5** in Europe. Never use this format in international apps.

---

### Displaying Dates in Different Locales: `toLocaleDateString()`

This method automatically displays a date in the format natural to a given country or language.

```javascript
const d = new Date(2024, 0, 15); // January 15, 2024

console.log(d.toLocaleDateString("en-US")); // 1/15/2024
console.log(d.toLocaleDateString("en-GB")); // 15/01/2024
console.log(d.toLocaleDateString("de-DE")); // 15.1.2024
console.log(d.toLocaleDateString("ar-EG")); // ١٥‏/١‏/٢٠٢٤
```

**▶ Expected Output:**
```
1/15/2024
15/01/2024
15.1.2024
١٥‏/١‏/٢٠٢٤
```

#### Adding formatting options:

```javascript
const d = new Date(2024, 0, 15);
const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

console.log(d.toLocaleDateString("en-US", options)); // Monday, January 15, 2024
console.log(d.toLocaleDateString("en-GB", options)); // Monday, 15 January 2024
console.log(d.toLocaleDateString("fr-FR", options)); // lundi 15 janvier 2024
console.log(d.toLocaleDateString("de-DE", options)); // Montag, 15. Januar 2024
```

**▶ Expected Output:**
```
Monday, January 15, 2024
Monday, 15 January 2024
lundi 15 janvier 2024
Montag, 15. Januar 2024
```

> 🏢 **REAL WORLD:** International flight booking sites display `"Mon Jan 15 2024"` as `"Montag, 15. Januar 2024"` to German users — all from the same Date object, just formatted differently.

---
---

## 4. Topic 3 — Get Date Methods (Reading Dates)

> **Phase 1 — Conceptual Understanding**

**Get methods** read individual parts from a Date object — year, month, day, hour, etc. They all start with `get`. They **never modify the date**; they only read and return a value. Every Get method returns a **number**.

---

### Our Test Date

We will use this date for all examples:

```javascript
// new Date(year, month, day, hours, minutes, seconds, ms)
//                      month 2 = MARCH (0-indexed!)
const d = new Date(2024, 2, 20, 14, 30, 45, 500);
//   Human reading: March 20, 2024 at 2:30:45.500 PM
```

---

### `getFullYear()` — The 4-Digit Year

```javascript
const d = new Date(2024, 2, 20);
console.log(d.getFullYear()); // 2024
```

**▶ Expected Output:** `2024`

> 🐛 **COMMON MISTAKE:** An older deprecated method `getYear()` returns years relative to 1900 — e.g. `124` for year 2024. **Never use it.** Always use `getFullYear()`.

---

### `getMonth()` — Month Number (0–11)

Returns a number from **0 (January)** to **11 (December)**.

```javascript
const d = new Date(2024, 2, 20); // March
console.log(d.getMonth()); // 2  ← NOT 3! March = index 2.
```

**▶ Expected Output:** `2`

To display a human-friendly month, add 1 or use a names array:

```javascript
const d = new Date(2024, 2, 20);

const humanNumber = d.getMonth() + 1; // 3
console.log("Month number:", humanNumber);

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
console.log("Month name:", monthNames[d.getMonth()]); // March
```

**▶ Expected Output:**
```
Month number: 3
Month name: March
```

---

### `getDate()` — Day of the Month (1–31)

Returns the day of the month. Note: NOT zero-indexed — this one starts at 1.

```javascript
const d = new Date(2024, 2, 20);
console.log(d.getDate()); // 20
```

**▶ Expected Output:** `20`

> 💡 **TIP:** Do NOT confuse `getDate()` (day of month 1–31) with `getDay()` (day of week 0–6). They are completely different!

---

### `getDay()` — Day of the Week (0–6)

Returns **0 (Sunday)** through **6 (Saturday)**.

```javascript
const d = new Date(2024, 2, 20); // March 20, 2024 was a Wednesday
console.log(d.getDay()); // 3
```

**▶ Expected Output:** `3`

Convert to a name with an array:

```javascript
const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date(2024, 2, 20);
console.log(dayNames[d.getDay()]); // Wednesday
```

**▶ Expected Output:** `Wednesday`

> 🤔 **THINK ABOUT IT:** `getDay()` starts from Sunday (0) — the US convention. If you need Monday as day 1 (ISO week), use: `(d.getDay() + 6) % 7` → gives 0 for Mon, 6 for Sun.

---

### `getHours()` — Hours (0–23, 24-hour format)

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45); // 2:30 PM
console.log(d.getHours()); // 14
```

**▶ Expected Output:** `14`

---

### `getMinutes()` — Minutes (0–59)

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45);
console.log(d.getMinutes()); // 30
```

**▶ Expected Output:** `30`

---

### `getSeconds()` — Seconds (0–59)

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45);
console.log(d.getSeconds()); // 45
```

**▶ Expected Output:** `45`

---

### `getMilliseconds()` — Milliseconds (0–999)

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45, 500);
console.log(d.getMilliseconds()); // 500
```

**▶ Expected Output:** `500`

---

### `getTime()` — Full Timestamp (ms since epoch)

Returns the raw millisecond number stored inside the Date object. The most powerful Get method for comparisons and calculations.

```javascript
const d = new Date(2024, 0, 1); // January 1, 2024
console.log(d.getTime()); // 1704067200000
```

#### Calculating days between two dates:

```javascript
const start = new Date(2024, 0, 1);    // Jan 1, 2024
const end   = new Date(2024, 11, 31);  // Dec 31, 2024

const diffMs   = end.getTime() - start.getTime();
const diffDays = Math.round(diffMs / 86400000);

console.log("Days in 2024:", diffDays); // 365
```

**▶ Expected Output:** `Days in 2024: 365`

> 🏢 **REAL WORLD:** "Posted 3 days ago", "Expires in 7 days", "Delivery in 5 business days" — all built by subtracting `getTime()` values and converting from ms to days.

---

### `getTimezoneOffset()` — UTC Offset (minutes)

Returns the difference in minutes between your local timezone and UTC. Positive = west of UTC (behind UTC), negative = east of UTC (ahead of UTC).

```javascript
const d = new Date();
console.log(d.getTimezoneOffset());
// 0 in UTC, 300 in UTC-5 (US Eastern), -60 in UTC+1 (Central Europe)
```

---

### UTC Get Methods — Reading in Universal Time

Every local Get method has a **UTC twin** for reading time in Coordinated Universal Time, regardless of the user's timezone.

| Local Method | UTC Method |
|-------------|-----------|
| `getFullYear()` | `getUTCFullYear()` |
| `getMonth()` | `getUTCMonth()` |
| `getDate()` | `getUTCDate()` |
| `getDay()` | `getUTCDay()` |
| `getHours()` | `getUTCHours()` |
| `getMinutes()` | `getUTCMinutes()` |
| `getSeconds()` | `getUTCSeconds()` |
| `getMilliseconds()` | `getUTCMilliseconds()` |

```javascript
const d = new Date("2024-01-15T02:00:00Z"); // 2 AM UTC

console.log(d.getUTCHours()); // 2   — always correct in UTC
console.log(d.getHours());    // Varies by timezone, e.g. 21 if you're UTC-5
```

> 🏢 **REAL WORLD:** Flight times, international API timestamps, and server logs are always in UTC. Use `getUTC*()` methods to read them correctly before converting to local time for display.

---

### Complete Formatted Date String — Combining All Get Methods

```javascript
function formatDateTime(date) {
  const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];

  const weekday = days[date.getDay()];
  const month   = months[date.getMonth()];
  const day     = date.getDate();
  const year    = date.getFullYear();
  const hh      = String(date.getHours()).padStart(2, "0");
  const mm      = String(date.getMinutes()).padStart(2, "0");
  const ss      = String(date.getSeconds()).padStart(2, "0");

  return `${weekday}, ${month} ${day}, ${year} — ${hh}:${mm}:${ss}`;
}

const d = new Date(2024, 2, 20, 9, 5, 3);
console.log(formatDateTime(d));
```

**▶ Expected Output:**
```
Wednesday, March 20, 2024 — 09:05:03
```

> 💡 **TIP:** `.padStart(2, "0")` pads numbers to 2 digits: `5` → `"05"`. Without it, your time would display as `9:5:3` — looks wrong for a clock.

---
---

## 5. Topic 4 — Set Date Methods (Changing Dates)

> **Phase 1 — Conceptual Understanding**

**Set methods** *change* a Date object. They modify it directly (in place) and also **return the new timestamp as a millisecond number**. All Set methods start with `set`.

---

### `setFullYear(year [, month, day])` — Change the Year

```javascript
const d = new Date(2024, 2, 20); // March 20, 2024
console.log("Before:", d.getFullYear()); // 2024

d.setFullYear(2030);
console.log("After:", d.getFullYear());  // 2030
console.log(d.toDateString());           // Fri Mar 20 2030
```

**▶ Expected Output:**
```
Before: 2024
After: 2030
Fri Mar 20 2030
```

Setting year, month, and day in one call:

```javascript
const d = new Date();
d.setFullYear(2026, 5, 15); // June 15, 2026  (month 5 = June)
console.log(d.toDateString()); // Mon Jun 15 2026
```

---

### `setMonth(month [, day])` — Change the Month

```javascript
const d = new Date(2024, 2, 20); // March 20, 2024
d.setMonth(11);                   // → December
console.log(d.toDateString());    // Fri Dec 20 2024
```

**▶ Expected Output:** `Fri Dec 20 2024`

#### Month Overflow — Wraps Into Next Year

```javascript
const d = new Date(2024, 2, 20);
d.setMonth(13);                 // 13 = 2nd month of next year = Feb 2025
console.log(d.toDateString()); // Thu Feb 20 2025
```

**▶ Expected Output:** `Thu Feb 20 2025`

Adding months with overflow:

```javascript
const d = new Date(2024, 10, 15); // Nov 15, 2024
d.setMonth(d.getMonth() + 3);     // Add 3 months → Feb 2025
console.log(d.toDateString());    // Sat Feb 15 2025
```

---

### `setDate(day)` — Change the Day of Month

This is the **most commonly used Set method** because it lets you add or subtract days.

```javascript
const d = new Date(2024, 2, 20); // March 20
d.setDate(1);
console.log(d.toDateString()); // Fri Mar 01 2024
```

#### Adding Days — The Essential Pattern

```javascript
const d = new Date(2024, 2, 20); // March 20, 2024
d.setDate(d.getDate() + 15);     // Add 15 days
console.log(d.toDateString());   // Wed Apr 03 2024 ← wrapped into April!
```

**▶ Expected Output:** `Wed Apr 03 2024`

#### Subtracting Days:

```javascript
const d = new Date(2024, 2, 5); // March 5
d.setDate(d.getDate() - 10);    // Subtract 10 days
console.log(d.toDateString());  // Thu Feb 24 2024 ← wrapped into February!
```

**▶ Expected Output:** `Thu Feb 24 2024`

> 🏢 **REAL WORLD:** "Trial ends in 14 days", "Subscription renews in 30 days", "Appointment in 7 days" — all use `setDate(getDate() + n)`.

> 💡 **TIP:** Always **copy** a Date before modifying it if you need to keep the original:
> ```javascript
> const original = new Date(2024, 2, 20);
> const copy = new Date(original);   // Independent copy
> copy.setDate(copy.getDate() + 14); // Only copy is modified
> ```

---

### `setHours(hours [, min, sec, ms])` — Change the Hours

```javascript
const d = new Date(2024, 2, 20, 14, 30, 0); // 2:30 PM
d.setHours(9);
console.log(d.toTimeString().slice(0, 8)); // 09:30:00
```

Setting all time parts at once:

```javascript
const d = new Date(2024, 2, 20);
d.setHours(18, 45, 30, 0); // 6:45:30.000 PM
console.log(d.toTimeString().slice(0, 8)); // 18:45:30
```

---

### `setMinutes(min [, sec, ms])` — Change the Minutes

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45);
d.setMinutes(0);
console.log(d.toTimeString().slice(0, 8)); // 14:00:45
```

---

### `setSeconds(sec [, ms])` — Change the Seconds

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45);
d.setSeconds(0);
console.log(d.getSeconds()); // 0
```

---

### `setMilliseconds(ms)` — Change the Milliseconds

```javascript
const d = new Date(2024, 2, 20, 14, 30, 45, 500);
d.setMilliseconds(0);
console.log(d.getMilliseconds()); // 0
```

---

### `setTime(ms)` — Replace the Entire Date

Completely overwrites the date using a raw millisecond number.

```javascript
const d = new Date(2024, 2, 20);
console.log("Before:", d.toDateString()); // Wed Mar 20 2024

d.setTime(0); // Reset to Unix Epoch
console.log("After:", d.toDateString()); // Thu Jan 01 1970
```

**▶ Expected Output:**
```
Before: Wed Mar 20 2024
After: Thu Jan 01 1970
```

---

### UTC Set Methods

| Local | UTC Equivalent |
|-------|---------------|
| `setFullYear()` | `setUTCFullYear()` |
| `setMonth()` | `setUTCMonth()` |
| `setDate()` | `setUTCDate()` |
| `setHours()` | `setUTCHours()` |
| `setMinutes()` | `setUTCMinutes()` |
| `setSeconds()` | `setUTCSeconds()` |
| `setMilliseconds()` | `setUTCMilliseconds()` |

---

### All Set Methods at a Glance

| Method | Arguments | What It Sets |
|--------|----------|-------------|
| `setFullYear(y, m?, d?)` | year [, month, day] | Year (and optionally month, day) |
| `setMonth(m, d?)` | month 0–11 [, day] | Month (and optionally day) |
| `setDate(d)` | 1–31 (overflow OK) | Day of month |
| `setHours(h, m?, s?, ms?)` | 0–23 [, min, sec, ms] | Hours (and optionally min/sec/ms) |
| `setMinutes(m, s?, ms?)` | 0–59 [, sec, ms] | Minutes (and optionally sec, ms) |
| `setSeconds(s, ms?)` | 0–59 [, ms] | Seconds (and optionally ms) |
| `setMilliseconds(ms)` | 0–999 | Milliseconds |
| `setTime(ms)` | Any number | Entire date (full replacement) |

---
---

## 6. Topic 5 — Complete Date Reference

> Your one-stop quick reference for every JavaScript Date method and property.

---

### Creating Dates

| Constructor / Method | Description | Returns |
|---------------------|-------------|---------|
| `new Date()` | Current local date and time | Date |
| `new Date(ms)` | Date from milliseconds since epoch | Date |
| `new Date(string)` | Date parsed from string | Date |
| `new Date(y, m, d, h, min, s, ms)` | Date from individual parts | Date |
| `Date.now()` | Current time in ms (static method) | Number |
| `Date.parse(string)` | Convert date string → ms | Number |

---

### All Get Methods

| Method | Range | Description |
|--------|-------|-------------|
| `getFullYear()` | 4-digit year | Year (local) |
| `getMonth()` | 0–11 | Month (0=Jan) (local) |
| `getDate()` | 1–31 | Day of month (local) |
| `getDay()` | 0–6 | Day of week (0=Sun) (local) |
| `getHours()` | 0–23 | Hours (local) |
| `getMinutes()` | 0–59 | Minutes (local) |
| `getSeconds()` | 0–59 | Seconds (local) |
| `getMilliseconds()` | 0–999 | Milliseconds (local) |
| `getTime()` | Large number | Milliseconds since epoch |
| `getTimezoneOffset()` | Minutes | UTC offset (positive = west) |
| `getUTCFullYear()` | 4-digit year | Year (UTC) |
| `getUTCMonth()` | 0–11 | Month (UTC) |
| `getUTCDate()` | 1–31 | Day of month (UTC) |
| `getUTCDay()` | 0–6 | Day of week (UTC) |
| `getUTCHours()` | 0–23 | Hours (UTC) |
| `getUTCMinutes()` | 0–59 | Minutes (UTC) |
| `getUTCSeconds()` | 0–59 | Seconds (UTC) |
| `getUTCMilliseconds()` | 0–999 | Milliseconds (UTC) |

---

### All Set Methods

| Method | Arguments | Sets |
|--------|----------|------|
| `setFullYear(y,m?,d?)` | year [,month,day] | Year (local) |
| `setMonth(m,d?)` | month [,day] | Month (local) |
| `setDate(d)` | day | Day of month (local) |
| `setHours(h,m?,s?,ms?)` | hr [,min,sec,ms] | Hours (local) |
| `setMinutes(m,s?,ms?)` | min [,sec,ms] | Minutes (local) |
| `setSeconds(s,ms?)` | sec [,ms] | Seconds (local) |
| `setMilliseconds(ms)` | ms | Milliseconds (local) |
| `setTime(ms)` | number | Entire date |
| `setUTCFullYear(y,m?,d?)` | same | Year (UTC) |
| `setUTCMonth(m,d?)` | same | Month (UTC) |
| `setUTCDate(d)` | same | Day of month (UTC) |
| `setUTCHours(h,m?,s?,ms?)` | same | Hours (UTC) |
| `setUTCMinutes(m,s?,ms?)` | same | Minutes (UTC) |
| `setUTCSeconds(s,ms?)` | same | Seconds (UTC) |
| `setUTCMilliseconds(ms)` | same | Milliseconds (UTC) |

---

### Display / Conversion Methods

| Method | Output Example |
|--------|---------------|
| `toString()` | `"Mon Jan 15 2024 09:30:00 GMT+0000 (UTC)"` |
| `toDateString()` | `"Mon Jan 15 2024"` |
| `toTimeString()` | `"09:30:00 GMT+0000 (UTC)"` |
| `toISOString()` | `"2024-01-15T09:30:00.000Z"` |
| `toUTCString()` | `"Mon, 15 Jan 2024 09:30:00 GMT"` |
| `toLocaleDateString()` | `"1/15/2024"` (locale-dependent) |
| `toLocaleTimeString()` | `"9:30:00 AM"` (locale-dependent) |
| `toLocaleString()` | `"1/15/2024, 9:30:00 AM"` (locale-dependent) |
| `valueOf()` | Same number as `getTime()` |

---

### `Date.parse()` — String to Milliseconds

```javascript
const ms = Date.parse("2024-01-15");
console.log(ms); // 1705276800000

const d = new Date(ms);
console.log(d.toDateString()); // Mon Jan 15 2024
```

**▶ Expected Output:**
```
1705276800000
Mon Jan 15 2024
```

---
---

## 7. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Date Detective 🔍

**Objective:** Practice creating Date objects and reading all their parts with Get methods.

**Scenario:** You are building a **hospital patient record system**. Each patient's date of birth is stored as a Date object. Extract and display readable information.

#### Warm-up Micro-Demo:

```javascript
const birthday = new Date(1990, 5, 25); // June 25, 1990
console.log("Year :", birthday.getFullYear()); // 1990
console.log("Month:", birthday.getMonth());    // 5  (June = index 5)
console.log("Day  :", birthday.getDate());     // 25
```

**▶ Expected Output:**
```
Year : 1990
Month: 5
Day  : 25
```

#### Task A — Extract All Parts

```javascript
const patientDOB = new Date(1985, 7, 12, 8, 30, 0); // Aug 12, 1985 at 8:30 AM

// Write code to:
// 1. Print the 4-digit year                → 1985
// 2. Print the month NAME using an array  → "August"
// 3. Print the day of the month           → 12
// 4. Print the day of the WEEK by name    → "Monday"
// 5. Print the time as "HH:MM"            → "08:30"
```

**Hints:**
- Build `const monthNames = ["January", "February", ...]`
- Build `const dayNames = ["Sunday", "Monday", ...]`
- Use `.padStart(2, "0")` on hours and minutes

**Expected output:**
```
Year    : 1985
Month   : August
Day     : 12
Weekday : Monday
Time    : 08:30
```

#### Task B — Calculate Patient Age

```javascript
const dob   = new Date(1985, 7, 12); // August 12, 1985
const today = new Date();

// Step 1: Subtract years
let age = today.getFullYear() - dob.getFullYear();

// Step 2: If birthday hasn't occurred yet this year, subtract 1
const birthdayThisYear = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
if (today < birthdayThisYear) age--;

console.log("Patient age:", age);
```

**Self-check questions:**
- Why is Step 2 necessary?
- What does `getMonth()` return for August?
- What would `getDay()` return for a Sunday?

> 🏢 **REAL WORLD:** Hospitals calculate age dynamically — never store it as a fixed number, because age changes on every birthday.

---

### Exercise 2 — Date Formatter 🌍

**Objective:** Practice formatting dates for different countries.

**Scenario:** An **international e-commerce platform** must display the same order date differently for US, UK, German, and French customers.

#### Warm-up Micro-Demo:

```javascript
const orderDate = new Date(2024, 11, 25); // Dec 25, 2024
console.log(orderDate.toLocaleDateString("en-US")); // 12/25/2024
console.log(orderDate.toLocaleDateString("en-GB")); // 25/12/2024
```

#### Task A — Multi-Locale Display Function

```javascript
function displayForLocale(date, locale) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(locale, options);
}

const order = new Date(2024, 11, 25);
console.log(displayForLocale(order, "en-US")); // Wednesday, December 25, 2024
console.log(displayForLocale(order, "en-GB")); // Wednesday, 25 December 2024
console.log(displayForLocale(order, "de-DE")); // Mittwoch, 25. Dezember 2024
console.log(displayForLocale(order, "fr-FR")); // mercredi 25 décembre 2024
```

**▶ Expected Output:**
```
Wednesday, December 25, 2024
Wednesday, 25 December 2024
Mittwoch, 25. Dezember 2024
mercredi 25 décembre 2024
```

#### Task B — ISO String to Readable

```javascript
const isoStrings = ["2024-03-15", "2024-07-04", "2024-12-31"];

const dayNames   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

isoStrings.forEach(iso => {
  const d = new Date(iso + "T00:00:00"); // ← T00:00:00 avoids timezone shift!
  const weekday = dayNames[d.getDay()];
  const month   = monthNames[d.getMonth()];
  const day     = d.getDate();
  const year    = d.getFullYear();
  console.log(`${weekday}, ${month} ${day}, ${year}`);
});
```

**▶ Expected Output:**
```
Friday, March 15, 2024
Thursday, July 4, 2024
Tuesday, December 31, 2024
```

**Self-check questions:**
- What problem does appending `T00:00:00` solve?
- Why does `toLocaleDateString("de-DE", ...)` print German day names?
- Which format is best for storing dates in a database?

---

### Exercise 3 — Date Manipulator ⚙️

**Objective:** Practice using Set methods to calculate future and past dates.

**Scenario:** You're building a **subscription billing system**. On signup, calculate trial end date, first billing date, and annual renewal date.

#### Warm-up Micro-Demo:

```javascript
const today = new Date(2024, 2, 1); // March 1 (simulated)
today.setDate(today.getDate() + 7);
console.log(today.toDateString()); // Fri Mar 08 2024
```

#### Task A — Calculate Subscription Dates

```javascript
const signupDate = new Date(2024, 2, 15); // March 15, 2024

const trialEnd = new Date(signupDate);
trialEnd.setDate(trialEnd.getDate() + 14);

const firstBilling = new Date(signupDate);
firstBilling.setDate(firstBilling.getDate() + 30);
firstBilling.setHours(9, 0, 0, 0); // Set billing notification to 9:00 AM

const annualRenewal = new Date(signupDate);
annualRenewal.setFullYear(annualRenewal.getFullYear() + 1);
annualRenewal.setHours(9, 0, 0, 0);

console.log("Signup        :", signupDate.toDateString());
console.log("Trial ends    :", trialEnd.toDateString());
console.log("First billing :", firstBilling.toDateString(), "at", firstBilling.toTimeString().slice(0,8));
console.log("Annual renewal:", annualRenewal.toDateString());
```

**▶ Expected Output:**
```
Signup        : Fri Mar 15 2024
Trial ends    : Fri Mar 29 2024
First billing : Mon Apr 15 2024 at 09:00:00
Annual renewal: Sat Mar 15 2025
```

#### Task B — Next Business Day Function

```javascript
function nextBusinessDay(date) {
  const next = new Date(date);       // copy — do not mutate original
  next.setDate(next.getDate() + 1);  // always go forward at least 1 day

  // Keep skipping while it's Saturday (6) or Sunday (0)
  while (next.getDay() === 0 || next.getDay() === 6) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

const friday = new Date(2024, 2, 15);   // Friday
const saturday = new Date(2024, 2, 16); // Saturday

console.log("After Friday  :", nextBusinessDay(friday).toDateString());   // Mon Mar 18
console.log("After Saturday:", nextBusinessDay(saturday).toDateString()); // Mon Mar 18
```

**▶ Expected Output:**
```
After Friday  : Mon Mar 18 2024
After Saturday: Mon Mar 18 2024
```

**Self-check questions:**
- Why must you `new Date(date)` before modifying inside the function?
- What happens when you call `setDate(32)` on a March date?
- What do the extra three zeros in `setHours(9, 0, 0, 0)` do?

**Optional what-if challenge:** Modify `nextBusinessDay()` to skip an array of public holidays. How would you compare two dates to check if they're the same day?

---
---

## 8. Mini Project — Event Countdown & Schedule Builder

> **Phase 3 — Project Simulation**

**Real-world scenario:** You are a developer at a **school administration company**. Build a scheduler that stores upcoming events, calculates countdowns, attaches start times, computes reminder dates, and prints a full formatted report.

---

### 🔵 Stage 1 — Setup: Store Events and Display Basics

**Goal:** Create Date objects for all events, apply start times with `setHours()`, and display each event cleanly.

#### Simple stage preview:

```javascript
const event = { name: "Science Fair", date: new Date(2026, 4, 20) };
const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];
console.log(`${event.name}: ${monthNames[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`);
```

**▶ Expected Output:** `Science Fair: May 20, 2026`

#### Stage 1 Full Code:

```javascript
"use strict";

const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

// Events — month is 0-indexed!
const schoolEvents = [
  { name: "Orientation Day",       date: new Date(2026, 3,  6),  startHour: 8  }, // Apr 6
  { name: "Science Fair",          date: new Date(2026, 4, 20),  startHour: 9  }, // May 20
  { name: "Sports Day",            date: new Date(2026, 5, 13),  startHour: 7  }, // Jun 13
  { name: "End of Year Concert",   date: new Date(2026, 6, 15),  startHour: 18 }, // Jul 15
  { name: "School Reopening",      date: new Date(2026, 8,  1),  startHour: 8  }, // Sep 1
  { name: "Prize Giving Ceremony", date: new Date(2026, 11,  4), startHour: 10 }  // Dec 4
];

// Attach start times to each event
schoolEvents.forEach(ev => ev.date.setHours(ev.startHour, 0, 0, 0));

function displayBasic(ev) {
  const d       = ev.date;
  const weekday = dayNames[d.getDay()];
  const month   = monthNames[d.getMonth()];
  const day     = d.getDate();
  const year    = d.getFullYear();
  const hh      = String(d.getHours()).padStart(2, "0");
  const mm      = String(d.getMinutes()).padStart(2, "0");
  console.log(`📅 ${ev.name}`);
  console.log(`   ${weekday}, ${month} ${day}, ${year} at ${hh}:${mm}\n`);
}

console.log("=".repeat(44));
console.log("     SCHOOL EVENT SCHEDULE 2026");
console.log("=".repeat(44));
schoolEvents.forEach(displayBasic);
```

**▶ Expected Output:**
```
============================================
     SCHOOL EVENT SCHEDULE 2026
============================================
📅 Orientation Day
   Monday, April 6, 2026 at 08:00

📅 Science Fair
   Wednesday, May 20, 2026 at 09:00

📅 Sports Day
   Saturday, June 13, 2026 at 07:00

📅 End of Year Concert
   Wednesday, July 15, 2026 at 18:00

📅 School Reopening
   Tuesday, September 1, 2026 at 08:00

📅 Prize Giving Ceremony
   Friday, December 4, 2026 at 10:00
```

**Reflection:** Why did we use `setHours(ev.startHour, 0, 0, 0)` with all four arguments rather than just `setHours(ev.startHour)`?

---

### 🟢 Stage 2 — Countdown Calculator

**Goal:** Calculate how many days until each event from today using `getTime()` subtraction.

#### Simple stage preview:

```javascript
const today     = new Date(2026, 2, 1);  // Mar 1 (simulated today)
const eventDate = new Date(2026, 4, 20); // May 20
const days = Math.round((eventDate.getTime() - today.getTime()) / 86400000);
console.log("Days until Science Fair:", days); // 80
```

**▶ Expected Output:** `Days until Science Fair: 80`

#### Stage 2 Full Code:

```javascript
function getDaysUntil(eventDate) {
  const today = new Date();
  // Strip time components — compare dates only, not hours
  const t = new Date(today.getFullYear(),     today.getMonth(),     today.getDate());
  const e = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  return Math.round((e.getTime() - t.getTime()) / 86400000);
}

function countdownLabel(days) {
  if (days < 0)  return `✅ ${Math.abs(days)} day(s) ago`;
  if (days === 0) return `🎉 TODAY!`;
  if (days === 1) return `⚡ Tomorrow!`;
  if (days <= 7)  return `🔔 In ${days} days — this week!`;
  return `📆 In ${days} days`;
}

console.log("=".repeat(50));
console.log("          EVENT COUNTDOWN");
console.log("=".repeat(50));
schoolEvents.forEach(ev => {
  const days  = getDaysUntil(ev.date);
  const label = countdownLabel(days);
  console.log(`${ev.name.padEnd(28)} ${label}`);
});
```

**▶ Expected Output (sample — depends on actual current date):**
```
==================================================
          EVENT COUNTDOWN
==================================================
Orientation Day              📆 In 36 days
Science Fair                 📆 In 80 days
Sports Day                   📆 In 104 days
End of Year Concert          📆 In 136 days
School Reopening             📆 In 184 days
Prize Giving Ceremony        📆 In 278 days
```

**Reflection:** Why do we strip time with `new Date(year, month, date)` before subtracting? What bug would occur if we subtracted raw `getTime()` values at 2 PM vs. 9 AM?

---

### 🟠 Stage 3 — Full Formatted Report

**Goal:** Generate a complete report with reminder dates (7 days before each event), summary counts, and professional formatting.

#### Simple stage preview:

```javascript
// Reminder = 7 days before event
const eventDate    = new Date(2026, 4, 20); // May 20
const reminderDate = new Date(eventDate);   // copy first!
reminderDate.setDate(reminderDate.getDate() - 7);
console.log("Reminder:", reminderDate.toDateString()); // Wed May 13 2026
```

**▶ Expected Output:** `Reminder: Wed May 13 2026`

#### Stage 3 Full Code:

```javascript
function getReminderDate(eventDate) {
  const r = new Date(eventDate);     // Always copy — never mutate the original
  r.setDate(r.getDate() - 7);
  return r;
}

function printFullReport(events) {
  const now = new Date();
  const genStr = now.toLocaleDateString("en-GB", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  });

  console.log("\n" + "=".repeat(56));
  console.log("        SCHOOL EVENTS — MASTER SCHEDULE");
  console.log(`        Generated: ${genStr}`);
  console.log("=".repeat(56));

  events.forEach(ev => {
    const days      = getDaysUntil(ev.date);
    const label     = countdownLabel(days);
    const weekday   = dayNames[ev.date.getDay()];
    const month     = monthNames[ev.date.getMonth()];
    const day       = ev.date.getDate();
    const year      = ev.date.getFullYear();
    const time      = ev.date.toTimeString().slice(0, 5);
    const reminder  = getReminderDate(ev.date);
    const remindStr = reminder.toLocaleDateString("en-GB");

    console.log("\n" + "-".repeat(56));
    console.log(`  🎓 ${ev.name.toUpperCase()}`);
    console.log(`     When    : ${weekday}, ${month} ${day}, ${year} at ${time}`);
    console.log(`     Status  : ${label}`);
    console.log(`     Reminder: Send notification on ${remindStr}`);
  });

  const upcoming = events.filter(ev => getDaysUntil(ev.date) >= 0);
  const past     = events.filter(ev => getDaysUntil(ev.date) <  0);

  console.log("\n" + "=".repeat(56));
  console.log(`  Total: ${events.length}  |  Upcoming: ${upcoming.length}  |  Past: ${past.length}`);
  console.log("=".repeat(56) + "\n");
}

printFullReport(schoolEvents);
```

**▶ Expected Output (sample with today = March 1, 2026):**
```
========================================================
        SCHOOL EVENTS — MASTER SCHEDULE
        Generated: Sunday, March 01, 2026
========================================================

--------------------------------------------------------
  🎓 ORIENTATION DAY
     When    : Monday, April 6, 2026 at 08:00
     Status  : 📆 In 36 days
     Reminder: Send notification on 30/03/2026

--------------------------------------------------------
  🎓 SCIENCE FAIR
     When    : Wednesday, May 20, 2026 at 09:00
     Status  : 📆 In 80 days
     Reminder: Send notification on 13/05/2026

--------------------------------------------------------
  🎓 PRIZE GIVING CEREMONY
     When    : Friday, December 4, 2026 at 10:00
     Status  : 📆 In 278 days
     Reminder: Send notification on 27/11/2026

========================================================
  Total: 6  |  Upcoming: 6  |  Past: 0
========================================================
```

**Reflection questions:**
- Why is `new Date(eventDate)` in `getReminderDate()` critical — what would break without it?
- How would you sort `schoolEvents` by date before printing?
- Would you store these events in a database as ISO strings or as millisecond numbers? Why?
- How would you extend this to support recurring annual events?

**Optional advanced features:**
- Find and highlight the soonest upcoming event
- Group events by month into a calendar-style display
- Add public holiday detection using an array of holiday dates
- Calculate how many school days (Mon–Fri, no holidays) remain until each event

---
---

## 9. Completion Checklist

- ✅ I understand that every JavaScript Date is stored internally as **milliseconds since January 1, 1970 (Unix Epoch)**.
- ✅ I can create Date objects using all **4 methods**: `new Date()`, `new Date(ms)`, `new Date(string)`, and `new Date(y, m, d, h, min, s, ms)`.
- ✅ I know **months are 0-indexed** (January=0, December=11) and account for this every time.
- ✅ I know that `new Date(2024)` does NOT create the year 2024 — it creates 2024 ms after the epoch.
- ✅ I can explain the **three date string formats** (ISO 8601, Long Date, Short Date) and know which is most reliable.
- ✅ I understand the **timezone date-shift trap**: ISO date-only strings default to UTC midnight and can display one day early — fixed by appending `T00:00:00`.
- ✅ I can use `toLocaleDateString(locale, options)` to display dates for different countries.
- ✅ I can use all **Get methods** to read individual date parts, including `getTime()` for full timestamp comparisons.
- ✅ I know the difference between `getDate()` (day of month 1–31) and `getDay()` (day of week 0–6).
- ✅ I can subtract two `getTime()` values and divide by 86,400,000 to get the number of days between two dates.
- ✅ I can use all **Set methods** to modify dates, and understand overflow (e.g. `setDate(45)` wraps into the next month).
- ✅ I use `setDate(getDate() + n)` as the standard pattern for adding days, and `new Date(original)` to copy before modifying.
- ✅ I know the difference between local-time methods and **UTC methods** (`getUTCHours`, `setUTCDate`, etc.).
- ✅ I completed all three exercises and the full three-stage mini-project.
- ✅ I can explain how JavaScript Dates apply in real-world apps: order timestamps, countdowns, billing cycles, age calculations, international formatting.

---

### 📌 One-Sentence Summary of Each Topic

**Creating Dates:** JavaScript's `Date` object stores time as milliseconds since January 1, 1970, and can be created four ways — but always remember months are 0-indexed and `new Date(n)` treats `n` as milliseconds not a year.

**Date Formats:** ISO 8601 (`"YYYY-MM-DD"`) is the safest and most reliable string format; date-only ISO strings default to UTC midnight and can display one day off in local time — fix by appending `T00:00:00`.

**Get Methods:** Every Get method reads one part of a Date object as a number — use name arrays to convert `getMonth()` and `getDay()` to readable strings, and subtract `getTime()` values to calculate durations.

**Set Methods:** Every Set method modifies a Date object in place and supports overflow (values beyond valid range wrap into the next unit), making `setDate(getDate() + n)` the cleanest way to add any number of days.

**Complete Reference:** The full Date API provides 4 constructors, 2 static methods, 18 Get methods, 16 Set methods, and 8 display methods — with both local-timezone and UTC variants for every read and write operation.

---

> 📘 *Built from W3Schools.com — `js_dates` | `js_date_formats` | `js_date_methods` | `js_date_methods_set` | `js_date_reference`*
> *Framework: Understand → Practice → Create*
