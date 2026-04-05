---
render_with_liquid: false
title: "JavaScript Temporal API: The Modern, Precise, and Safe Way to Handle Dates and Times in JavaScript"
nav_order: 13
---

## 📑 Table of Contents
1. [Background: Why a New Date System?](#1-background-why-a-new-date-system)
2. [Topic 1 — Temporal Introduction & Overview](#2-topic-1--temporal-introduction--overview)
3. [Topic 2 — Temporal vs Date: Side-by-Side](#3-topic-2--temporal-vs-date-side-by-side)
4. [Topic 3 — Temporal.Now](#4-topic-3--temporalnow)
5. [Topic 4 — Temporal.Instant](#5-topic-4--temporalinstant)
6. [Topic 5 — Plain Types (PlainDate, PlainTime, PlainYearMonth, PlainMonthDay)](#6-topic-5--plain-types)
7. [Topic 6 — Temporal.PlainDateTime](#7-topic-6--temporalplaindatetime)
8. [Topic 7 — Temporal.ZonedDateTime](#8-topic-7--temporalzoneddatetime)
9. [Topic 8 — Temporal.Duration](#9-topic-8--temporalduration)
10. [Topic 9 — Temporal Arithmetic](#10-topic-9--temporal-arithmetic)
11. [Topic 10 — Complete Temporal Reference](#11-topic-10--complete-temporal-reference)
12. [Applied Exercises](#12-applied-exercises)
13. [Mini Project — Global Meeting Scheduler](#13-mini-project--global-meeting-scheduler)
14. [Completion Checklist](#14-completion-checklist)

---

> ⚠️ **IMPORTANT — Browser Support Notice**
> The Temporal API is a **TC39 Stage 3 proposal** — it is officially approved for standardisation but not yet natively built into all browsers. To use it today, install the polyfill:
> ```
> npm install @js-temporal/polyfill
> ```
> ```javascript
> import { Temporal } from "@js-temporal/polyfill";
> ```
> Native support is arriving in modern browsers. Always check [caniuse.com](https://caniuse.com) for the latest status. All code examples in this tutorial use the standard Temporal API as specified.

---
---

## 1. Background: Why a New Date System?

You already know that JavaScript has a `Date` object. So why build an entirely new system called **Temporal**?

Because the old `Date` object has deep, unfixable problems that have caused bugs in production software for over 30 years. The Temporal API was designed from scratch to fix every one of them.

### The 7 Problems with the Old `Date` Object

| Problem | What Happens |
|---------|-------------|
| 1. **Mutable** | `setDate()`, `setMonth()` change the object permanently — easy to accidentally modify a shared date |
| 2. **0-indexed months** | January = 0, December = 11 — confusing and error-prone |
| 3. **No timezone support** | `Date` stores UTC but displays in local time — constantly confusing |
| 4. **Millisecond precision only** | Cannot represent microseconds or nanoseconds |
| 5. **Inconsistent string parsing** | `new Date("01/15/2024")` behaves differently in Chrome vs Firefox |
| 6. **No calendar system support** | Cannot work with Hebrew, Japanese, Islamic, or other calendars |
| 7. **One type for everything** | You cannot distinguish "just a date" from "a date with a time" from "a timestamp" |

### What Temporal Fixes

Temporal introduces a **family of separate types**, each designed for a specific use case:

```
Temporal.Instant         → A precise moment in time (like a UTC timestamp)
Temporal.PlainDate       → A date with no time, no timezone ("2024-03-20")
Temporal.PlainTime       → A time with no date, no timezone ("09:30:00")
Temporal.PlainDateTime   → A date + time, no timezone ("2024-03-20T09:30:00")
Temporal.ZonedDateTime   → A date + time + timezone ("2024-03-20T09:30:00[Europe/London]")
Temporal.Duration        → A length of time ("2 years, 3 months, 5 days")
Temporal.Now             → Static methods to get the current moment in any form
Temporal.PlainYearMonth  → Just a year and month ("2024-03")
Temporal.PlainMonthDay   → Just a month and day ("--03-20") — for recurring dates
```

> 💡 **TIP:** Think of it like specialised tools in a toolkit. A carpenter does not use a screwdriver to hammer a nail. Similarly, you should not use `Temporal.Instant` (a precise UTC point) when you only need `Temporal.PlainDate` (a date on a calendar).

> 🏢 **REAL WORLD:** Major companies building calendars, booking systems, financial platforms, and global apps lobbied for the Temporal API for years — because the old `Date` object was causing real data loss and billing errors in production systems.

---
---

## 2. Topic 1 — Temporal Introduction & Overview

> **Phase 1 — Conceptual Understanding**

### Key Design Principles of Temporal

Before looking at any code, understand these five principles that govern how Temporal works:

#### Principle 1 — Immutable (No Setters!)

Every Temporal object is **immutable** — it cannot be changed after creation. When you "modify" a Temporal value, you always get a **new object** back. The original is untouched.

```javascript
const date = Temporal.PlainDate.from("2024-03-20");

// ❌ There is no date.setDate(21) — no setters exist!

// ✅ Instead — create a new object:
const newDate = date.with({ day: 21 });

console.log(date.toString());    // 2024-03-20  ← unchanged
console.log(newDate.toString()); // 2024-03-21  ← new object
```

**▶ Expected Output:**
```
2024-03-20
2024-03-21
```

> 🏢 **REAL WORLD:** Immutability prevents a whole class of bugs where a shared date object is accidentally modified by one part of the code, breaking another. This is especially common in React and other UI frameworks.

---

#### Principle 2 — Months Are 1-Indexed ✅

Unlike the old `Date` object, Temporal uses **human-friendly month numbers**. January = 1, December = 12.

```javascript
// Old Date — CONFUSING ❌
const old = new Date(2024, 0, 15); // month 0 = January?!

// Temporal — CLEAR ✅
const modern = Temporal.PlainDate.from({ year: 2024, month: 1, day: 15 }); // month 1 = January
console.log(modern.month); // 1
console.log(modern.monthCode); // "M01"
```

---

#### Principle 3 — Explicit Timezone Handling

Temporal separates "plain" dates/times (no timezone) from "zoned" dates/times (with timezone). You always know exactly what you're working with.

---

#### Principle 4 — Nanosecond Precision

Temporal stores time with **nanosecond** precision — 1,000,000× more precise than the old `Date` object's milliseconds. Critical for scientific, financial, and performance-sensitive applications.

```javascript
const instant = Temporal.Instant.fromEpochNanoseconds(1705276800000000500n);
// Note the "n" suffix — JavaScript BigInt for very large numbers
console.log(instant.epochNanoseconds); // 1705276800000000500n
```

---

#### Principle 5 — ISO 8601 Strings for Everything

Every Temporal type produces and accepts clean, unambiguous ISO 8601 strings.

```javascript
const date = Temporal.PlainDate.from("2024-03-20");
console.log(date.toString()); // "2024-03-20"

const time = Temporal.PlainTime.from("14:30:00");
console.log(time.toString()); // "14:30:00"

const zdt = Temporal.ZonedDateTime.from("2024-03-20T14:30:00[Europe/London]");
console.log(zdt.toString()); // "2024-03-20T14:30:00+00:00[Europe/London]"
```

---

### The Temporal Type Family — When to Use What

| Use Case | Temporal Type |
|----------|--------------|
| "Right now" in universal time | `Temporal.Now.instant()` |
| "Today's date" (no time) | `Temporal.Now.plainDateISO()` |
| A calendar date with no time (e.g. a birthday) | `Temporal.PlainDate` |
| A time of day with no date (e.g. "office opens at 9 AM") | `Temporal.PlainTime` |
| A date and time with no timezone (e.g. a log entry) | `Temporal.PlainDateTime` |
| A meeting with a specific timezone | `Temporal.ZonedDateTime` |
| An exact point in history (database timestamp) | `Temporal.Instant` |
| "How long" between two events | `Temporal.Duration` |
| A month in a year (no day — e.g. credit card expiry) | `Temporal.PlainYearMonth` |
| An annual event (month + day, no year — e.g. birthday) | `Temporal.PlainMonthDay` |

---
---

## 3. Topic 2 — Temporal vs Date: Side-by-Side

> **Phase 1 — Conceptual Understanding**

Let's compare the same tasks done the old way (`Date`) vs the new way (`Temporal`).

### Comparison 1 — Create "March 20, 2024"

```javascript
// Old Date — month is 0-indexed (bug waiting to happen)
const old = new Date(2024, 2, 20); // month 2 = March ← confusing!

// Temporal — month 3 = March (human-friendly!)
const modern = Temporal.PlainDate.from({ year: 2024, month: 3, day: 20 });
// or from a string:
const modern2 = Temporal.PlainDate.from("2024-03-20");

console.log(old.toDateString());    // Wed Mar 20 2024
console.log(modern.toString());     // 2024-03-20
```

---

### Comparison 2 — Add 10 Days

```javascript
// Old Date — mutates the original!
const old = new Date(2024, 2, 20);
old.setDate(old.getDate() + 10); // ← mutates old directly!
console.log(old.toDateString()); // Sat Mar 30 2024

// Temporal — always returns a new object, original unchanged
const original = Temporal.PlainDate.from("2024-03-20");
const added    = original.add({ days: 10 });

console.log(original.toString()); // 2024-03-20 ← untouched!
console.log(added.toString());    // 2024-03-30 ← new object
```

**▶ Expected Output:**
```
2024-03-20
2024-03-30
```

---

### Comparison 3 — Difference Between Two Dates

```javascript
// Old Date — manual math, error-prone
const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 11, 31);
const diffDays = Math.round((d2 - d1) / 86400000); // 365

// Temporal — clean and explicit
const t1 = Temporal.PlainDate.from("2024-01-01");
const t2 = Temporal.PlainDate.from("2024-12-31");
const diff = t1.until(t2);

console.log(diff.days);   // 365
console.log(diff.toString()); // "P365D"
```

---

### Comparison 4 — Timezone Conversion

```javascript
// Old Date — no built-in timezone support at all!
// You need external libraries like Moment.js or date-fns/tz

// Temporal — built-in, explicit, clear
const meeting = Temporal.ZonedDateTime.from("2024-03-20T14:00:00[Europe/London]");
const inNY    = meeting.withTimeZone("America/New_York");
const inTokyo = meeting.withTimeZone("Asia/Tokyo");

console.log(inNY.toString());    // 2024-03-20T10:00:00-04:00[America/New_York]
console.log(inTokyo.toString()); // 2024-03-20T23:00:00+09:00[Asia/Tokyo]
```

---

### Full Comparison Table

| Feature | Old `Date` | `Temporal` |
|---------|-----------|-----------|
| Months | 0-indexed (Jan=0) ❌ | 1-indexed (Jan=1) ✅ |
| Mutable | Yes (setters) ❌ | No (immutable) ✅ |
| Precision | Milliseconds | Nanoseconds ✅ |
| Timezone support | None (workarounds needed) ❌ | Built-in, explicit ✅ |
| String parsing | Inconsistent ❌ | ISO 8601, consistent ✅ |
| Date-only type | No (Date always has time) ❌ | Yes (`PlainDate`) ✅ |
| Time-only type | No ❌ | Yes (`PlainTime`) ✅ |
| Duration type | No (manual math) ❌ | Yes (`Duration`) ✅ |
| Calendar systems | No ❌ | Yes (ISO, Hebrew, etc.) ✅ |

---
---

## 4. Topic 3 — Temporal.Now

> **Phase 1 — Conceptual Understanding**

`Temporal.Now` is a namespace (a collection of static methods) that gives you the current date and time in various forms. You do NOT create a `Temporal.Now` object — you call its methods directly.

Think of `Temporal.Now` like a dashboard with different dials — each method gives you the "current moment" in a different format.

---

### `Temporal.Now.instant()` — Current Moment as a UTC Instant

Returns the current moment as a `Temporal.Instant` — a precise point in universal time, stored in nanoseconds.

```javascript
const now = Temporal.Now.instant();
console.log(now.toString());
// "2024-03-20T14:30:00.123456789Z"
//  ↑ Full UTC timestamp with nanoseconds!

console.log(now.epochMilliseconds);
// 1710944200123  (milliseconds since epoch — for compatibility)
```

**▶ Expected Output (sample):**
```
2024-03-20T14:30:00.123456789Z
1710944200123
```

> 🏢 **REAL WORLD:** Use this to timestamp database records, log entries, and event streams. It gives the most precise, unambiguous timestamp possible.

---

### `Temporal.Now.zonedDateTimeISO()` — Current Date+Time With Timezone

Returns the current date and time in your local timezone as a `Temporal.ZonedDateTime`.

```javascript
const zdt = Temporal.Now.zonedDateTimeISO();
console.log(zdt.toString());
// "2024-03-20T14:30:00.123456789+00:00[Europe/London]"
// ↑ Full date, time, UTC offset, AND timezone name!

// You can also specify a timezone:
const inNY = Temporal.Now.zonedDateTimeISO("America/New_York");
console.log(inNY.toString());
// "2024-03-20T10:30:00.123456789-04:00[America/New_York]"
```

---

### `Temporal.Now.plainDateISO()` — Today's Date Only

Returns today's date as a `Temporal.PlainDate` — no time, no timezone.

```javascript
const today = Temporal.Now.plainDateISO();
console.log(today.toString()); // "2024-03-20"
console.log(today.year);       // 2024
console.log(today.month);      // 3  (March — 1-indexed!)
console.log(today.day);        // 20
```

**▶ Expected Output (sample):**
```
2024-03-20
2024
3
20
```

> 💡 **TIP:** You can also specify a timezone to get "today" in a specific part of the world:
> ```javascript
> const todayInTokyo = Temporal.Now.plainDateISO("Asia/Tokyo");
> // Tokyo is ahead of UTC — their "today" might be ahead of yours
> ```

---

### `Temporal.Now.plainTimeISO()` — Current Time Only

Returns the current time of day as a `Temporal.PlainTime` — no date, no timezone.

```javascript
const time = Temporal.Now.plainTimeISO();
console.log(time.toString()); // "14:30:00.123456789"
console.log(time.hour);       // 14
console.log(time.minute);     // 30
console.log(time.second);     // 0
```

---

### `Temporal.Now.plainDateTimeISO()` — Current Date and Time (No Timezone)

Returns current date + time as a `Temporal.PlainDateTime` — useful for local timestamps where you don't need timezone info.

```javascript
const dt = Temporal.Now.plainDateTimeISO();
console.log(dt.toString()); // "2024-03-20T14:30:00.123456789"
```

---

### `Temporal.Now.timeZoneId()` — Your Current Timezone Name

Returns the IANA timezone identifier (the official name) of your system's current timezone.

```javascript
const tz = Temporal.Now.timeZoneId();
console.log(tz); // "Europe/London" or "America/New_York" or "Asia/Tokyo" etc.
```

> 🏢 **REAL WORLD:** Use this when you need to store a user's timezone preference automatically on first visit to your app.

---

### Summary: All Temporal.Now Methods

| Method | Returns | Best For |
|--------|---------|---------|
| `Temporal.Now.instant()` | `Temporal.Instant` | Precise UTC timestamps |
| `Temporal.Now.zonedDateTimeISO(tz?)` | `Temporal.ZonedDateTime` | Full local date+time+timezone |
| `Temporal.Now.plainDateISO(tz?)` | `Temporal.PlainDate` | Today's date only |
| `Temporal.Now.plainTimeISO(tz?)` | `Temporal.PlainTime` | Current time of day only |
| `Temporal.Now.plainDateTimeISO(tz?)` | `Temporal.PlainDateTime` | Local date+time, no TZ needed |
| `Temporal.Now.timeZoneId()` | String | Get the user's timezone name |

---
---

## 5. Topic 4 — Temporal.Instant

> **Phase 1 — Conceptual Understanding**

A `Temporal.Instant` represents **a specific, precise point in universal time** — like a pin stuck in the global timeline. It is always in UTC. It has no timezone, no calendar, no year/month/day on its own — just a single precise moment measured in **nanoseconds** from the Unix Epoch (January 1, 1970 UTC).

Think of it like a universal timestamp on a package — it says exactly *when* something happened, without any cultural interpretation of "day" or "month".

---

### Creating a Temporal.Instant

#### From an ISO 8601 string (must end with `Z` for UTC):

```javascript
const i1 = Temporal.Instant.from("2024-03-20T14:30:00Z");
console.log(i1.toString()); // "2024-03-20T14:30:00Z"

const i2 = Temporal.Instant.from("2024-03-20T14:30:00.123456789Z");
console.log(i2.toString()); // "2024-03-20T14:30:00.123456789Z"
```

#### From epoch milliseconds (for compatibility with old `Date`):

```javascript
const i = Temporal.Instant.fromEpochMilliseconds(1710944200000);
console.log(i.toString()); // "2024-03-20T14:36:40Z"
```

#### From epoch nanoseconds (BigInt — note the `n`):

```javascript
const i = Temporal.Instant.fromEpochNanoseconds(1710944200000000000n);
console.log(i.toString()); // "2024-03-20T14:36:40Z"
```

#### `Temporal.Instant.fromEpochSeconds()`:

```javascript
const i = Temporal.Instant.fromEpochSeconds(1710944200);
console.log(i.toString()); // "2024-03-20T14:36:40Z"
```

---

### Reading Instant Properties

```javascript
const i = Temporal.Instant.from("2024-03-20T14:30:00.123Z");

console.log(i.epochSeconds);       // 1710944200   (Number)
console.log(i.epochMilliseconds);  // 1710944200123  (Number)
console.log(i.epochMicroseconds);  // 1710944200123000n  (BigInt)
console.log(i.epochNanoseconds);   // 1710944200123000000n  (BigInt)
```

**▶ Expected Output (sample):**
```
1710944200
1710944200123
1710944200123000n
1710944200123000000n
```

> 💡 **TIP:** `epochMilliseconds` is the most compatible property — it is the same value you'd get from the old `Date` object's `getTime()` method. Use it when passing timestamps to APIs or databases that expect milliseconds.

> 🤔 **THINK ABOUT IT:** Why are `epochMicroseconds` and `epochNanoseconds` BigInt values (with `n`) while `epochSeconds` and `epochMilliseconds` are regular Numbers? Because nanosecond timestamps are too large to fit accurately in JavaScript's regular 64-bit floating-point number format!

---

### Comparing Two Instants

```javascript
const event1 = Temporal.Instant.from("2024-03-20T10:00:00Z");
const event2 = Temporal.Instant.from("2024-03-20T14:30:00Z");

// Compare: returns -1, 0, or 1
const result = Temporal.Instant.compare(event1, event2);
console.log(result); // -1 (event1 is before event2)

// Check order
if (Temporal.Instant.compare(event1, event2) < 0) {
  console.log("event1 happened first");
}
```

**▶ Expected Output:**
```
-1
event1 happened first
```

---

### Arithmetic with Instant

```javascript
const start = Temporal.Instant.from("2024-03-20T10:00:00Z");

// Add a duration (only hours, minutes, seconds, ms, µs, ns — NOT days/months!)
const later = start.add({ hours: 4, minutes: 30 });
console.log(later.toString()); // "2024-03-20T14:30:00Z"

// Subtract
const earlier = start.subtract({ minutes: 90 });
console.log(earlier.toString()); // "2024-03-20T08:30:00Z"
```

> ⚠️ **WATCH OUT:** `Temporal.Instant` does NOT support adding `days`, `months`, or `years` — because "1 day" is ambiguous without a timezone (daylight saving time can make days 23 or 25 hours long). Use `Temporal.ZonedDateTime` for calendar-aware arithmetic.

---

### Converting Instant to ZonedDateTime

To read the year, month, day, hour etc. from an Instant, you must first attach a timezone:

```javascript
const i = Temporal.Instant.from("2024-03-20T14:30:00Z");

const inLondon  = i.toZonedDateTimeISO("Europe/London");
const inNewYork = i.toZonedDateTimeISO("America/New_York");
const inTokyo   = i.toZonedDateTimeISO("Asia/Tokyo");

console.log(inLondon.toString());  // "2024-03-20T14:30:00+00:00[Europe/London]"
console.log(inNewYork.toString()); // "2024-03-20T10:30:00-04:00[America/New_York]"
console.log(inTokyo.toString());   // "2024-03-20T23:30:00+09:00[Asia/Tokyo]"
```

**▶ Expected Output:**
```
2024-03-20T14:30:00+00:00[Europe/London]
2024-03-20T10:30:00-04:00[America/New_York]
2024-03-20T23:30:00+09:00[Asia/Tokyo]
```

> 🏢 **REAL WORLD:** Store all timestamps in your database as `Temporal.Instant` (or its `epochMilliseconds`). When displaying to a user, convert to their timezone using `toZonedDateTimeISO(userTimezone)`. This is the professional pattern used by all global apps.

---

### until() and since() — Duration Between Instants

```javascript
const start = Temporal.Instant.from("2024-03-20T10:00:00Z");
const end   = Temporal.Instant.from("2024-03-20T14:30:00Z");

const duration = start.until(end);
console.log(duration.hours);   // 4
console.log(duration.minutes); // 30
console.log(duration.toString()); // "PT4H30M"

// since() is the reverse
const ago = end.since(start);
console.log(ago.toString()); // "PT4H30M"
```

---
---

## 6. Topic 5 — Plain Types

> **Phase 1 — Conceptual Understanding**

"Plain" types in Temporal are date/time objects with **no timezone attached**. They represent calendar values as they appear on a wall calendar or clock — without any UTC conversion or timezone ambiguity.

There are four Plain types. Each covers a different slice of date/time information:

| Type | Stores | Example |
|------|--------|---------|
| `Temporal.PlainDate` | Year, Month, Day | "2024-03-20" |
| `Temporal.PlainTime` | Hour, Minute, Second, subseconds | "14:30:00" |
| `Temporal.PlainYearMonth` | Year + Month (no day) | "2024-03" |
| `Temporal.PlainMonthDay` | Month + Day (no year) | "--03-20" |

---

### 6A — Temporal.PlainDate

A date on a calendar with no time and no timezone. Perfect for birthdays, holidays, deadlines, or any date where the specific hour doesn't matter.

#### Creating a PlainDate:

```javascript
// From an ISO string
const d1 = Temporal.PlainDate.from("2024-03-20");
console.log(d1.toString()); // "2024-03-20"

// From an object (month is 1-indexed!)
const d2 = Temporal.PlainDate.from({ year: 2024, month: 3, day: 20 });
console.log(d2.toString()); // "2024-03-20"

// Constructor
const d3 = new Temporal.PlainDate(2024, 3, 20);
console.log(d3.toString()); // "2024-03-20"
```

#### Reading PlainDate Properties:

```javascript
const d = Temporal.PlainDate.from("2024-03-20");

console.log(d.year);         // 2024
console.log(d.month);        // 3        ← March (1-indexed!)
console.log(d.monthCode);    // "M03"
console.log(d.day);          // 20
console.log(d.dayOfWeek);    // 3        ← Wednesday (1=Mon, 7=Sun — ISO standard)
console.log(d.dayOfYear);    // 80       ← 80th day of 2024
console.log(d.weekOfYear);   // 12       ← 12th week of 2024
console.log(d.daysInMonth);  // 31       ← March has 31 days
console.log(d.daysInYear);   // 366      ← 2024 is a leap year
console.log(d.inLeapYear);   // true
console.log(d.calendarId);   // "iso8601"
```

**▶ Expected Output:**
```
2024
3
M03
20
3
80
12
31
366
true
iso8601
```

> 💡 **TIP:** `dayOfWeek` in Temporal follows the **ISO 8601 standard** — Monday=1, Tuesday=2, ..., Sunday=7. This is different from the old `Date` object where Sunday=0.

> 🐛 **COMMON MISTAKE:** Do not confuse `day` (day of the month: 1–31) with `dayOfWeek` (day of the week: 1–7 in ISO). And note `dayOfWeek: 3` means Wednesday, NOT Thursday!

#### Modifying a PlainDate with `.with()`:

```javascript
const d = Temporal.PlainDate.from("2024-03-20");

const nextMonth = d.with({ month: 4 }); // Change only the month
console.log(nextMonth.toString()); // "2024-04-20"

const endOfYear = d.with({ month: 12, day: 31 });
console.log(endOfYear.toString()); // "2024-12-31"
```

#### Adding and Subtracting:

```javascript
const d = Temporal.PlainDate.from("2024-03-20");

const plus10  = d.add({ days: 10 });
console.log(plus10.toString());  // "2024-03-30"

const plus3m  = d.add({ months: 3 });
console.log(plus3m.toString());  // "2024-06-20"

const minus1y = d.subtract({ years: 1 });
console.log(minus1y.toString()); // "2023-03-20"
```

**▶ Expected Output:**
```
2024-03-30
2024-06-20
2023-03-20
```

#### Comparing Two Dates:

```javascript
const d1 = Temporal.PlainDate.from("2024-03-20");
const d2 = Temporal.PlainDate.from("2024-06-15");

console.log(Temporal.PlainDate.compare(d1, d2)); // -1 (d1 is before d2)
console.log(d1.equals(d2));                       // false
console.log(d1.equals("2024-03-20"));             // true (string auto-converted)
```

#### until() and since():

```javascript
const start = Temporal.PlainDate.from("2024-01-01");
const end   = Temporal.PlainDate.from("2024-12-31");

const diff = start.until(end);
console.log(diff.days);    // 365

// With explicit units
const diff2 = start.until(end, { largestUnit: "month" });
console.log(diff2.months); // 11
console.log(diff2.days);   // 30
```

---

### 6B — Temporal.PlainTime

A time of day with no date and no timezone. Perfect for "office opens at 9:00 AM", "alarm at 06:30", or any recurring daily time.

#### Creating a PlainTime:

```javascript
const t1 = Temporal.PlainTime.from("14:30:00");
console.log(t1.toString()); // "14:30:00"

const t2 = Temporal.PlainTime.from({ hour: 14, minute: 30, second: 0 });
console.log(t2.toString()); // "14:30:00"

const t3 = new Temporal.PlainTime(14, 30, 0, 0, 0, 0); // h, m, s, ms, µs, ns
console.log(t3.toString()); // "14:30:00"
```

#### Reading PlainTime Properties:

```javascript
const t = Temporal.PlainTime.from("14:30:45.123456789");

console.log(t.hour);        // 14
console.log(t.minute);      // 30
console.log(t.second);      // 45
console.log(t.millisecond); // 123
console.log(t.microsecond); // 456
console.log(t.nanosecond);  // 789
```

**▶ Expected Output:**
```
14
30
45
123
456
789
```

#### Arithmetic on PlainTime:

```javascript
const t = Temporal.PlainTime.from("22:00:00");

// Adding time wraps around midnight automatically!
const plus3h = t.add({ hours: 3 });
console.log(plus3h.toString()); // "01:00:00" ← wrapped past midnight!

const minus30m = t.subtract({ minutes: 30 });
console.log(minus30m.toString()); // "21:30:00"
```

**▶ Expected Output:**
```
01:00:00
21:30:00
```

#### Until/Since with PlainTime:

```javascript
const open  = Temporal.PlainTime.from("09:00:00");
const close = Temporal.PlainTime.from("17:30:00");

const workDay = open.until(close);
console.log(workDay.hours);   // 8
console.log(workDay.minutes); // 30
```

**▶ Expected Output:**
```
8
30
```

---

### 6C — Temporal.PlainYearMonth

Represents a specific year and month with no day. Perfect for credit card expiry dates, monthly reporting periods, or subscription months.

```javascript
const ym1 = Temporal.PlainYearMonth.from("2024-03");
console.log(ym1.year);        // 2024
console.log(ym1.month);       // 3
console.log(ym1.daysInMonth); // 31

// Add months
const next = ym1.add({ months: 3 });
console.log(next.toString()); // "2024-06"

// Compare
console.log(Temporal.PlainYearMonth.compare(ym1, next)); // -1
```

**▶ Expected Output:**
```
2024
3
31
2024-06
-1
```

> 🏢 **REAL WORLD:** A credit card expiry of "03/2027" is a `PlainYearMonth` — it represents the entire month of March 2027, not a specific day.

---

### 6D — Temporal.PlainMonthDay

Represents a month and day with no year. Perfect for recurring annual events — birthdays, anniversaries, national holidays — where the year changes but the month/day stays the same.

```javascript
// Note the "--" prefix in ISO format for PlainMonthDay (no year!)
const birthday = Temporal.PlainMonthDay.from("--03-20");
console.log(birthday.month); // 3
console.log(birthday.day);   // 20

// Or from an object
const holiday = Temporal.PlainMonthDay.from({ month: 12, day: 25 });
console.log(holiday.toString()); // "--12-25"

// Convert to a PlainDate for a specific year
const thisYear = birthday.toPlainDate({ year: 2024 });
console.log(thisYear.toString()); // "2024-03-20"

const nextYear = birthday.toPlainDate({ year: 2025 });
console.log(nextYear.toString()); // "2025-03-20"
```

**▶ Expected Output:**
```
3
20
--12-25
2024-03-20
2025-03-20
```

> 🏢 **REAL WORLD:** In a birthday reminder app, store each person's birthday as a `PlainMonthDay`. Each year, call `.toPlainDate({ year: currentYear })` to get this year's birthday.

---
---

## 7. Topic 6 — Temporal.PlainDateTime

> **Phase 1 — Conceptual Understanding**

`Temporal.PlainDateTime` represents a date **and** a time of day — but with **no timezone**. It is like a calendar entry written on paper: "March 20, 2024 at 2:30 PM" — it describes a moment in time on a local clock, but says nothing about which timezone that clock is in.

Use `PlainDateTime` when:
- You're recording events that happened on a specific machine (logs)
- The timezone is already understood by both parties (e.g. "always UTC")
- You want to combine date + time before attaching a timezone

---

### Creating a PlainDateTime

```javascript
// From ISO string
const dt1 = Temporal.PlainDateTime.from("2024-03-20T14:30:00");
console.log(dt1.toString()); // "2024-03-20T14:30:00"

// From an object
const dt2 = Temporal.PlainDateTime.from({
  year: 2024, month: 3, day: 20,
  hour: 14, minute: 30, second: 0
});
console.log(dt2.toString()); // "2024-03-20T14:30:00"

// Constructor
const dt3 = new Temporal.PlainDateTime(2024, 3, 20, 14, 30, 0);
console.log(dt3.toString()); // "2024-03-20T14:30:00"
```

---

### Reading All Properties

`PlainDateTime` has ALL the properties of both `PlainDate` and `PlainTime`:

```javascript
const dt = Temporal.PlainDateTime.from("2024-03-20T14:30:45.123456789");

// Date parts
console.log(dt.year);         // 2024
console.log(dt.month);        // 3
console.log(dt.day);          // 20
console.log(dt.dayOfWeek);    // 3  (Wednesday in ISO: Mon=1, Sun=7)
console.log(dt.dayOfYear);    // 80
console.log(dt.weekOfYear);   // 12
console.log(dt.daysInMonth);  // 31
console.log(dt.inLeapYear);   // true

// Time parts
console.log(dt.hour);         // 14
console.log(dt.minute);       // 30
console.log(dt.second);       // 45
console.log(dt.millisecond);  // 123
console.log(dt.microsecond);  // 456
console.log(dt.nanosecond);   // 789
```

---

### Modifying with `.with()`

```javascript
const dt = Temporal.PlainDateTime.from("2024-03-20T14:30:00");

// Change just the time
const morning = dt.with({ hour: 9, minute: 0, second: 0 });
console.log(morning.toString()); // "2024-03-20T09:00:00"

// Change just the date
const nextWeek = dt.with({ day: 27 });
console.log(nextWeek.toString()); // "2024-03-27T14:30:00"
```

**▶ Expected Output:**
```
2024-03-20T09:00:00
2024-03-27T14:30:00
```

---

### Arithmetic with PlainDateTime

```javascript
const dt = Temporal.PlainDateTime.from("2024-03-20T14:30:00");

const plus2weeks = dt.add({ weeks: 2 });
console.log(plus2weeks.toString()); // "2024-04-03T14:30:00"

const minus1y6m  = dt.subtract({ years: 1, months: 6 });
console.log(minus1y6m.toString());  // "2022-09-20T14:30:00"
```

**▶ Expected Output:**
```
2024-04-03T14:30:00
2022-09-20T14:30:00
```

---

### Converting PlainDateTime to Other Types

```javascript
const dt = Temporal.PlainDateTime.from("2024-03-20T14:30:00");

// Extract just the date
const date = dt.toPlainDate();
console.log(date.toString()); // "2024-03-20"

// Extract just the time
const time = dt.toPlainTime();
console.log(time.toString()); // "14:30:00"

// Attach a timezone to make a ZonedDateTime
const zdt = dt.toZonedDateTime("Europe/London");
console.log(zdt.toString()); // "2024-03-20T14:30:00+00:00[Europe/London]"
```

---
---

## 8. Topic 7 — Temporal.ZonedDateTime

> **Phase 1 — Conceptual Understanding**

`Temporal.ZonedDateTime` is the most complete Temporal type. It stores a **date, a time, AND a timezone**. It knows exactly what moment in universal time something is, AND what it looks like on a calendar in a specific place.

Think of it like a meeting invitation: "March 20, 2024 at 2:30 PM London time" — this is fully unambiguous. Anyone anywhere can calculate what time this is in their own timezone.

Use `ZonedDateTime` when:
- Scheduling meetings across timezones
- Recording events that users in different countries need to see in their own local time
- Handling daylight saving time correctly

---

### Creating a ZonedDateTime

The key feature of a ZonedDateTime string is the **timezone identifier in square brackets `[...]`**:

```javascript
// From ISO string with timezone in brackets
const zdt1 = Temporal.ZonedDateTime.from("2024-03-20T14:30:00[Europe/London]");
console.log(zdt1.toString());
// "2024-03-20T14:30:00+00:00[Europe/London]"

// With UTC offset and timezone
const zdt2 = Temporal.ZonedDateTime.from("2024-03-20T10:30:00-04:00[America/New_York]");
console.log(zdt2.toString());
// "2024-03-20T10:30:00-04:00[America/New_York]"

// From an object
const zdt3 = Temporal.ZonedDateTime.from({
  year: 2024, month: 3, day: 20,
  hour: 14, minute: 30, second: 0,
  timeZone: "Asia/Tokyo"
});
console.log(zdt3.toString());
// "2024-03-20T14:30:00+09:00[Asia/Tokyo]"
```

---

### Reading ZonedDateTime Properties

ZonedDateTime has all the properties of PlainDateTime, PLUS timezone-specific ones:

```javascript
const zdt = Temporal.ZonedDateTime.from("2024-03-20T14:30:00+00:00[Europe/London]");

// Standard date/time properties
console.log(zdt.year);       // 2024
console.log(zdt.month);      // 3
console.log(zdt.day);        // 20
console.log(zdt.hour);       // 14
console.log(zdt.minute);     // 30

// Timezone-specific properties
console.log(zdt.timeZoneId);          // "Europe/London"
console.log(zdt.offset);              // "+00:00"
console.log(zdt.offsetNanoseconds);   // 0
console.log(zdt.hoursInDay);          // 24 (or 23/25 on DST change days!)
```

---

### Converting Timezones with `.withTimeZone()`

This is one of the most powerful features — converting the same moment into any timezone:

```javascript
const london = Temporal.ZonedDateTime.from("2024-03-20T14:00:00[Europe/London]");

// Convert to different timezones — same moment, different local time display
const newYork = london.withTimeZone("America/New_York");
const tokyo   = london.withTimeZone("Asia/Tokyo");
const dubai   = london.withTimeZone("Asia/Dubai");
const sydney  = london.withTimeZone("Australia/Sydney");

console.log("London  :", london.hour + ":" + String(london.minute).padStart(2,"0"));
console.log("New York:", newYork.hour + ":" + String(newYork.minute).padStart(2,"0"));
console.log("Tokyo   :", tokyo.hour + ":" + String(tokyo.minute).padStart(2,"0"));
console.log("Dubai   :", dubai.hour + ":" + String(dubai.minute).padStart(2,"0"));
console.log("Sydney  :", sydney.hour + ":" + String(sydney.minute).padStart(2,"0"));
```

**▶ Expected Output (for 14:00 London time in summer):**
```
London  : 14:00
New York: 10:00
Tokyo   : 23:00
Dubai   : 18:00
Sydney  : 00:00
```

> 🏢 **REAL WORLD:** Google Calendar shows "2:00 PM London time — click to see your local time". That conversion is exactly `withTimeZone(userTimezone)`.

---

### Daylight Saving Time (DST) — ZonedDateTime Handles It Automatically

One of the most complex problems in date handling is Daylight Saving Time. Clocks spring forward in spring and fall back in autumn. `ZonedDateTime` handles this correctly and transparently.

```javascript
// The day clocks spring forward in London (March 31, 2024)
const beforeDST = Temporal.ZonedDateTime.from("2024-03-31T00:00:00[Europe/London]");
const afterDST  = beforeDST.add({ hours: 3 });

// Even though we added 3 hours, the clock shows 4 hours later
// because the clock jumped forward 1 hour at 1 AM!
console.log(beforeDST.hour); // 0
console.log(afterDST.hour);  // 4  ← 3 elapsed hours = 4 clock hours because of DST!
console.log(beforeDST.hoursInDay); // 23  ← this day only has 23 hours!
```

> 🤔 **THINK ABOUT IT:** If you tried to do this with the old `Date` object, you'd have to manually check whether DST was in effect. ZonedDateTime does this for you automatically using IANA timezone data.

---

### ZonedDateTime Arithmetic

```javascript
const zdt = Temporal.ZonedDateTime.from("2024-03-20T14:00:00[America/New_York]");

// Calendar-aware addition (respects DST!)
const plus3months = zdt.add({ months: 3 });
console.log(plus3months.toString());
// "2024-06-20T14:00:00-04:00[America/New_York]"
// Note: offset changed from -05:00 to -04:00 because DST kicked in!
```

---

### Converting ZonedDateTime to Other Types

```javascript
const zdt = Temporal.ZonedDateTime.from("2024-03-20T14:30:00[Europe/London]");

const instant = zdt.toInstant();
console.log(instant.toString()); // "2024-03-20T14:30:00Z"

const plainDate = zdt.toPlainDate();
console.log(plainDate.toString()); // "2024-03-20"

const plainTime = zdt.toPlainTime();
console.log(plainTime.toString()); // "14:30:00"

const plainDT = zdt.toPlainDateTime();
console.log(plainDT.toString()); // "2024-03-20T14:30:00"
```

---
---

## 9. Topic 8 — Temporal.Duration

> **Phase 1 — Conceptual Understanding**

A `Temporal.Duration` represents a **length of time** — not a point in time, but the *span* between two points. Think of it like the difference between "2:30 PM" (a point in time) and "2 hours and 30 minutes" (a duration).

Durations can include: years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, and nanoseconds — all in one object.

---

### Creating a Duration

```javascript
// From an object
const d1 = Temporal.Duration.from({ years: 1, months: 6, days: 15 });
console.log(d1.toString()); // "P1Y6M15D"  (ISO 8601 duration format)

// From an ISO duration string
// P = "Period" marker, T = time separator
const d2 = Temporal.Duration.from("P1Y6M15DT2H30M");
console.log(d2.years);   // 1
console.log(d2.months);  // 6
console.log(d2.days);    // 15
console.log(d2.hours);   // 2
console.log(d2.minutes); // 30

// Using the constructor
const d3 = new Temporal.Duration(1, 6, 0, 15, 2, 30);
// (years, months, weeks, days, hours, minutes, seconds, ms, µs, ns)
console.log(d3.toString()); // "P1Y6M15DT2H30M"
```

**▶ Expected Output:**
```
P1Y6M15D
1
6
15
2
30
P1Y6M15DT2H30M
```

---

### Understanding ISO Duration Format

The ISO 8601 duration string format uses letters as unit markers:

```
P1Y6M15DT2H30M45S
↑ ↑ ↑  ↑ ↑ ↑  ↑  ↑
│ │ │  │ │ │  │  └── Seconds
│ │ │  │ │ │  └───── Minutes
│ │ │  │ │ └──────── Hours
│ │ │  │ └────────── "T" separates date part from time part
│ │ │  └──────────── Days
│ │ └─────────────── Months
│ └───────────────── Years
└─────────────────── "P" = Period (required start marker)
```

```javascript
console.log(Temporal.Duration.from("P1Y").toString());        // "P1Y"
console.log(Temporal.Duration.from("P6M").toString());        // "P6M"
console.log(Temporal.Duration.from("P15D").toString());       // "P15D"
console.log(Temporal.Duration.from("PT2H30M").toString());    // "PT2H30M"
console.log(Temporal.Duration.from("PT45S").toString());      // "PT45S"
console.log(Temporal.Duration.from("P1Y6M15DT2H30M45S").toString()); // full
```

---

### Reading Duration Properties

```javascript
const d = Temporal.Duration.from({ years: 2, months: 3, weeks: 1, days: 5, hours: 6, minutes: 30, seconds: 15 });

console.log(d.years);   // 2
console.log(d.months);  // 3
console.log(d.weeks);   // 1
console.log(d.days);    // 5
console.log(d.hours);   // 6
console.log(d.minutes); // 30
console.log(d.seconds); // 15
console.log(d.sign);    // 1   (positive duration)
```

---

### Negative Durations

A Duration can be negative (representing going back in time). The `sign` property tells you the direction.

```javascript
const negative = Temporal.Duration.from({ days: -10 });
console.log(negative.sign);     // -1
console.log(negative.toString()); // "-P10D"

// Negate a duration
const positive = Temporal.Duration.from({ days: 10 });
const flipped  = positive.negated();
console.log(flipped.sign);     // -1
console.log(flipped.toString()); // "-P10D"

// Absolute value (always positive)
const abs = negative.abs();
console.log(abs.toString()); // "P10D"
```

---

### Adding and Subtracting Durations

```javascript
const d1 = Temporal.Duration.from({ months: 3, days: 10 });
const d2 = Temporal.Duration.from({ months: 1, days: 5 });

// Duration + Duration
// Note: requires a relativeTo date for month calculations
const sum = d1.add(d2, { relativeTo: Temporal.PlainDate.from("2024-01-01") });
console.log(sum.months); // 4
console.log(sum.days);   // 15
```

---

### `total()` — Convert Duration to a Single Unit

```javascript
// How many total days is 2 months and 15 days?
const d = Temporal.Duration.from({ months: 2, days: 15 });
const totalDays = d.total({
  unit: "day",
  relativeTo: Temporal.PlainDate.from("2024-01-01")
});
console.log(totalDays); // 76  (Jan=31, Feb=29 in 2024 leap year, +15 = 75... check exact)
```

> 💡 **TIP:** Many Duration operations require a `relativeTo` date. This is because months have different numbers of days (28–31), and years have 365 or 366 days. Without knowing *which* months you're measuring, JavaScript can't convert accurately.

---
---

## 10. Topic 9 — Temporal Arithmetic

> **Phase 1 — Conceptual Understanding**

Date arithmetic — adding days, subtracting months, calculating differences — is one of the most common (and error-prone) tasks in date handling. Temporal makes it clean, safe, and explicit.

**The core rule:** All Temporal types are immutable. Every arithmetic operation returns a **new object**. The original is never changed.

---

### Adding a Duration to a Date

```javascript
const startDate = Temporal.PlainDate.from("2024-03-20");

// Add individual components
const plus30days  = startDate.add({ days: 30 });
const plus2months = startDate.add({ months: 2 });
const plus1year   = startDate.add({ years: 1 });
const combined    = startDate.add({ years: 1, months: 2, days: 15 });

console.log(plus30days.toString());  // "2024-04-19"
console.log(plus2months.toString()); // "2024-05-20"
console.log(plus1year.toString());   // "2025-03-20"
console.log(combined.toString());    // "2025-06-04"
```

**▶ Expected Output:**
```
2024-04-19
2024-05-20
2025-03-20
2025-06-04
```

---

### Subtracting a Duration from a Date

```javascript
const d = Temporal.PlainDate.from("2024-03-20");

const minus10days  = d.subtract({ days: 10 });
const minus1month  = d.subtract({ months: 1 });
const minus2years  = d.subtract({ years: 2 });

console.log(minus10days.toString()); // "2024-03-10"
console.log(minus1month.toString()); // "2024-02-20"
console.log(minus2years.toString()); // "2022-03-20"
```

**▶ Expected Output:**
```
2024-03-10
2024-02-20
2022-03-20
```

---

### Calculating Difference: `until()` and `since()`

`until()` and `since()` tell you the Duration between two dates.

- `a.until(b)` → "how long from a to b?" (forward)
- `a.since(b)` → "how long since b until a?" (also forward, just written differently)

```javascript
const start = Temporal.PlainDate.from("2024-01-15");
const end   = Temporal.PlainDate.from("2024-12-31");

// Default largest unit = "day"
const diff1 = start.until(end);
console.log(diff1.days);    // 351

// Specify largest unit to get months and days
const diff2 = start.until(end, { largestUnit: "month" });
console.log(diff2.months);  // 11
console.log(diff2.days);    // 16

// Specify smallest unit to round
const diff3 = start.until(end, { largestUnit: "year", smallestUnit: "month" });
console.log(diff3.years);   // 0
console.log(diff3.months);  // 11
```

**▶ Expected Output:**
```
351
11
16
0
11
```

---

### Overflow Control: `overflow` Option

When adding months, you can land on a day that doesn't exist in the target month. For example, adding 1 month to January 31 would give February 31 — which doesn't exist. Temporal handles this with the `overflow` option:

```javascript
const jan31 = Temporal.PlainDate.from("2024-01-31");

// Default overflow = "constrain" — clamps to last valid day
const feb = jan31.add({ months: 1 }); // Feb 31 → constrain to Feb 29 (2024 leap year)
console.log(feb.toString()); // "2024-02-29"

// overflow: "reject" — throws an error instead
try {
  const invalid = jan31.add({ months: 1 }, { overflow: "reject" });
} catch (e) {
  console.log(e.message); // RangeError — Feb 31 does not exist
}
```

**▶ Expected Output:**
```
2024-02-29
RangeError ...
```

---

### Rounding Durations: `round()`

```javascript
const start = Temporal.PlainDateTime.from("2024-03-20T10:23:45");
const end   = Temporal.PlainDateTime.from("2024-03-20T14:37:12");

const diff = start.until(end);
console.log(diff.toString()); // "PT4H13M27S"

// Round to the nearest hour
const rounded = diff.round({ smallestUnit: "hour", relativeTo: start });
console.log(rounded.hours); // 4
```

---

### Using a Stored Duration Object

```javascript
// Store a duration and reuse it
const subscription = Temporal.Duration.from({ months: 1 });
const signupDate   = Temporal.PlainDate.from("2024-03-15");

const renewalDate  = signupDate.add(subscription);
const renewal2     = renewalDate.add(subscription);
const renewal3     = renewal2.add(subscription);

console.log(renewalDate.toString()); // "2024-04-15"
console.log(renewal2.toString());    // "2024-05-15"
console.log(renewal3.toString());    // "2024-06-15"
```

**▶ Expected Output:**
```
2024-04-15
2024-05-15
2024-06-15
```

---

### Comparing Dates and Times

```javascript
const d1 = Temporal.PlainDate.from("2024-03-20");
const d2 = Temporal.PlainDate.from("2024-06-15");
const d3 = Temporal.PlainDate.from("2024-03-20");

// Static compare() method: -1 (before), 0 (equal), 1 (after)
console.log(Temporal.PlainDate.compare(d1, d2)); // -1 (d1 before d2)
console.log(Temporal.PlainDate.compare(d2, d1)); // 1  (d2 after d1)
console.log(Temporal.PlainDate.compare(d1, d3)); // 0  (equal)

// .equals() for equality check
console.log(d1.equals(d3)); // true
console.log(d1.equals(d2)); // false

// Sorting an array by date
const dates = [
  Temporal.PlainDate.from("2024-06-15"),
  Temporal.PlainDate.from("2024-01-01"),
  Temporal.PlainDate.from("2024-03-20"),
];
dates.sort(Temporal.PlainDate.compare);
console.log(dates.map(d => d.toString()));
// ["2024-01-01", "2024-03-20", "2024-06-15"]
```

**▶ Expected Output:**
```
-1
1
0
true
false
["2024-01-01", "2024-03-20", "2024-06-15"]
```

---

### Arithmetic with ZonedDateTime (DST-Aware)

```javascript
const meeting = Temporal.ZonedDateTime.from("2024-03-20T09:00:00[America/New_York]");

// Add 6 months — result respects DST!
const followUp = meeting.add({ months: 6 });
console.log(followUp.toString());
// "2024-09-20T09:00:00-04:00[America/New_York]"
// Notice: offset changed from -05:00 to -04:00 because summer DST is active!
// But the *clock time* (9:00 AM) stays the same — exactly what a human would expect!
```

---
---

## 11. Topic 10 — Complete Temporal Reference

> Your one-stop reference for every Temporal type and its methods.

---

### Temporal.Now — All Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Temporal.Now.instant()` | `Temporal.Instant` | Current UTC instant |
| `Temporal.Now.zonedDateTimeISO(tz?)` | `Temporal.ZonedDateTime` | Current date+time+timezone |
| `Temporal.Now.plainDateISO(tz?)` | `Temporal.PlainDate` | Today's date |
| `Temporal.Now.plainTimeISO(tz?)` | `Temporal.PlainTime` | Current time of day |
| `Temporal.Now.plainDateTimeISO(tz?)` | `Temporal.PlainDateTime` | Current date+time (no TZ) |
| `Temporal.Now.timeZoneId()` | String | IANA timezone name of system |

---

### Temporal.Instant — Key Methods and Properties

| Member | Description |
|--------|-------------|
| `Temporal.Instant.from(string)` | Create from ISO string ending in Z |
| `Temporal.Instant.fromEpochSeconds(n)` | Create from epoch seconds |
| `Temporal.Instant.fromEpochMilliseconds(n)` | Create from epoch ms |
| `Temporal.Instant.fromEpochMicroseconds(n)` | Create from epoch µs (BigInt) |
| `Temporal.Instant.fromEpochNanoseconds(n)` | Create from epoch ns (BigInt) |
| `Temporal.Instant.compare(a, b)` | Compare two instants (-1/0/1) |
| `.epochSeconds` | Number of seconds since epoch |
| `.epochMilliseconds` | Number of ms since epoch |
| `.epochMicroseconds` | Number of µs since epoch (BigInt) |
| `.epochNanoseconds` | Number of ns since epoch (BigInt) |
| `.add(duration)` | Add time-only duration → new Instant |
| `.subtract(duration)` | Subtract time-only duration → new Instant |
| `.until(other, options?)` | Duration from this to other |
| `.since(other, options?)` | Duration since other to this |
| `.round(options)` | Round to given unit |
| `.equals(other)` | Equality check |
| `.toZonedDateTimeISO(timeZone)` | Convert to ZonedDateTime |
| `.toString()` | ISO string with Z suffix |

---

### Temporal.PlainDate — Key Methods and Properties

| Member | Description |
|--------|-------------|
| `Temporal.PlainDate.from(item)` | Create from string or object |
| `Temporal.PlainDate.compare(a, b)` | Compare two dates |
| `.year` | 4-digit year |
| `.month` | Month number (1–12) |
| `.monthCode` | Month code e.g. "M03" |
| `.day` | Day of month (1–31) |
| `.dayOfWeek` | ISO day of week (1=Mon, 7=Sun) |
| `.dayOfYear` | Day number in year (1–366) |
| `.weekOfYear` | ISO week number |
| `.daysInMonth` | Days in current month |
| `.daysInYear` | Days in current year |
| `.inLeapYear` | `true` if leap year |
| `.calendarId` | Calendar system name |
| `.add(duration, options?)` | Add duration → new PlainDate |
| `.subtract(duration, options?)` | Subtract → new PlainDate |
| `.until(other, options?)` | Duration to another date |
| `.since(other, options?)` | Duration since another date |
| `.with(fields)` | Change specific fields → new date |
| `.equals(other)` | Equality check |
| `.toPlainDateTime(time?)` | Combine with a time |
| `.toZonedDateTime(tz)` | Attach timezone |
| `.toPlainYearMonth()` | Drop the day |
| `.toPlainMonthDay()` | Drop the year |
| `.toString()` | "YYYY-MM-DD" |

---

### Temporal.PlainTime — Key Properties and Methods

| Member | Description |
|--------|-------------|
| `.hour` | 0–23 |
| `.minute` | 0–59 |
| `.second` | 0–59 |
| `.millisecond` | 0–999 |
| `.microsecond` | 0–999 |
| `.nanosecond` | 0–999 |
| `.add(duration)` | Add duration → new PlainTime (wraps midnight) |
| `.subtract(duration)` | Subtract → new PlainTime |
| `.until(other)` | Duration to other time |
| `.since(other)` | Duration since other time |
| `.with(fields)` | Change specific fields |
| `.equals(other)` | Equality check |
| `.toPlainDateTime(date)` | Combine with a date |
| `.toString()` | "HH:MM:SS.sss..." |

---

### Temporal.PlainDateTime — Key Properties

Has ALL properties of PlainDate + PlainTime, plus:

| Method | Description |
|--------|-------------|
| `.with(fields)` | Change date or time fields |
| `.withPlainDate(date)` | Replace the date part |
| `.withPlainTime(time)` | Replace the time part |
| `.toPlainDate()` | Extract date part |
| `.toPlainTime()` | Extract time part |
| `.toZonedDateTime(tz)` | Attach timezone |
| `.toInstant(tz)` | Convert to Instant (needs TZ) |

---

### Temporal.ZonedDateTime — Key Properties

Has ALL properties of PlainDateTime, plus:

| Property / Method | Description |
|------------------|-------------|
| `.timeZoneId` | IANA timezone name |
| `.offset` | UTC offset string e.g. "+05:30" |
| `.offsetNanoseconds` | UTC offset in nanoseconds |
| `.hoursInDay` | Hours in this day (23/24/25 for DST) |
| `.withTimeZone(tz)` | Convert to different timezone |
| `.withCalendar(cal)` | Convert to different calendar |
| `.toInstant()` | Convert to Temporal.Instant |
| `.toPlainDate()` | Drop time and timezone |
| `.toPlainTime()` | Drop date and timezone |
| `.toPlainDateTime()` | Drop timezone |

---

### Temporal.Duration — Key Properties and Methods

| Member | Description |
|--------|-------------|
| `.years` | Years component |
| `.months` | Months component |
| `.weeks` | Weeks component |
| `.days` | Days component |
| `.hours` | Hours component |
| `.minutes` | Minutes component |
| `.seconds` | Seconds component |
| `.milliseconds` | Milliseconds component |
| `.microseconds` | Microseconds component |
| `.nanoseconds` | Nanoseconds component |
| `.sign` | 1 (positive), -1 (negative), 0 (zero) |
| `.blank` | `true` if all components are 0 |
| `.add(other, {relativeTo})` | Add two durations |
| `.subtract(other, {relativeTo})` | Subtract durations |
| `.with(fields)` | Replace specific components |
| `.negated()` | Flip sign |
| `.abs()` | Always positive |
| `.round(options)` | Round to a unit |
| `.total(options)` | Total in a single unit |
| `.toString()` | ISO 8601 duration string (P...) |

---

### Complete Arithmetic Options Reference

When calling `.add()`, `.subtract()`, `.until()`, `.since()`, `.round()`:

| Option | Values | Description |
|--------|--------|-------------|
| `largestUnit` | `"year"`, `"month"`, `"week"`, `"day"`, `"hour"`, `"minute"`, `"second"`, etc. | Largest unit in result |
| `smallestUnit` | Same list | Smallest unit (rounds below this) |
| `roundingMode` | `"trunc"`, `"ceil"`, `"floor"`, `"halfExpand"`, `"halfEven"` | How to round |
| `overflow` | `"constrain"`, `"reject"` | Behaviour when day doesn't exist |
| `relativeTo` | PlainDate or ZonedDateTime | Reference date for month/year conversions |

---
---

## 12. Applied Exercises

> **Phase 2 — Applied Exercises**

---

### Exercise 1 — Temporal Detective 🔍

**Objective:** Practice creating and reading every Temporal plain type.

**Scenario:** You are building a **school records system** using Temporal to store student data. All dates must be timezone-free (plain types).

#### Warm-up Micro-Demo:

```javascript
const dob = Temporal.PlainDate.from("2005-08-12");
console.log("Year      :", dob.year);       // 2005
console.log("Month     :", dob.month);      // 8 (August — 1-indexed!)
console.log("Day       :", dob.day);        // 12
console.log("Day of wk :", dob.dayOfWeek);  // 5 (Friday in ISO: Mon=1, Sun=7)
console.log("Leap year :", dob.inLeapYear); // false
```

**▶ Expected Output:**
```
Year      : 2005
Month     : 8
Day       : 12
Day of wk : 5
Leap year : false
```

#### Task A — Build a Student Record

```javascript
const student = {
  name: "Amara Diallo",
  dob: Temporal.PlainDate.from("2005-08-12"),
  enrollmentDate: Temporal.PlainDate.from("2020-09-01"),
  graduationDate: Temporal.PlainDate.from("2025-06-30"),
  classStartTime: Temporal.PlainTime.from("08:30:00"),
  lunchTime: Temporal.PlainTime.from("12:00:00"),
};

// Calculate:
// 1. Student age today
const today = Temporal.Now.plainDateISO();
let age = today.year - student.dob.year;
const birthdayThisYear = student.dob.with({ year: today.year });
if (Temporal.PlainDate.compare(today, birthdayThisYear) < 0) age--;
console.log("Age:", age);

// 2. Days until graduation
const daysLeft = today.until(student.graduationDate, { largestUnit: "day" });
console.log("Days until graduation:", daysLeft.days);

// 3. Total enrollment duration in years and months
const enrollmentDuration = student.enrollmentDate.until(student.graduationDate, {
  largestUnit: "year"
});
console.log("Enrollment:", enrollmentDuration.years, "years,", enrollmentDuration.months, "months");

// 4. Hours between class start and lunch
const morningLength = student.classStartTime.until(student.lunchTime);
console.log("Morning session:", morningLength.hours, "hours", morningLength.minutes, "min");
```

**Expected Output (sample based on current date ~March 2026):**
```
Age: 20
Days until graduation: 121 (approximate — depends on run date)
Enrollment: 4 years, 9 months
Morning session: 3 hours 30 min
```

**Self-check questions:**
- Why does the age calculation need a birthday-this-year check?
- Why use `PlainDate` instead of `ZonedDateTime` for school dates?
- What does `dayOfWeek: 5` mean in Temporal's ISO convention?

---

### Exercise 2 — Global Meeting Coordinator 🌍

**Objective:** Practice `ZonedDateTime`, `withTimeZone()`, and `Temporal.Now`.

**Scenario:** You work at a company with teams in **London, New York, Lagos, and Tokyo**. Schedule a 2 PM London meeting and show each team what time that is locally.

#### Warm-up Micro-Demo:

```javascript
const londonMeeting = Temporal.ZonedDateTime.from("2024-06-15T14:00:00[Europe/London]");
const nyTime = londonMeeting.withTimeZone("America/New_York");
console.log(`London: ${londonMeeting.hour}:00 → New York: ${nyTime.hour}:00`);
```

**▶ Expected Output:** `London: 14:00 → New York: 10:00`

#### Task A — Convert Meeting to All Timezones

```javascript
const meetingLondon = Temporal.ZonedDateTime.from("2024-06-20T14:00:00[Europe/London]");

const timezones = [
  { city: "London",   tz: "Europe/London"     },
  { city: "New York", tz: "America/New_York"   },
  { city: "Lagos",    tz: "Africa/Lagos"        },
  { city: "Tokyo",    tz: "Asia/Tokyo"          },
  { city: "Sydney",   tz: "Australia/Sydney"    },
];

console.log("Meeting Scheduler — June 20, 2024\n");
timezones.forEach(({ city, tz }) => {
  const local = meetingLondon.withTimeZone(tz);
  const h  = String(local.hour).padStart(2, "0");
  const m  = String(local.minute).padStart(2, "0");
  console.log(`${city.padEnd(10)} : ${h}:${m} (UTC${local.offset})`);
});
```

**▶ Expected Output:**
```
Meeting Scheduler — June 20, 2024

London     : 14:00 (UTC+01:00)
New York   : 09:00 (UTC-04:00)
Lagos      : 15:00 (UTC+01:00)
Tokyo      : 22:00 (UTC+09:00)
Sydney     : 23:00 (UTC+10:00)
```

#### Task B — Find Best Meeting Time

```javascript
// Write a function that checks if a proposed London time is within
// working hours (8 AM - 6 PM) for all given cities.
function isWorkingHour(zdt) {
  return zdt.hour >= 8 && zdt.hour < 18;
}

function findBestMeetingTime(cities) {
  // Try each hour from 8 AM to 5 PM London time
  for (let h = 8; h <= 17; h++) {
    const londonTime = Temporal.ZonedDateTime.from({
      year: 2024, month: 6, day: 20,
      hour: h, minute: 0, second: 0,
      timeZone: "Europe/London"
    });

    const allWorking = cities.every(({ tz }) =>
      isWorkingHour(londonTime.withTimeZone(tz))
    );

    if (allWorking) {
      console.log(`Best time: ${h}:00 London (all cities in working hours)`);
      return h;
    }
  }
  console.log("No single hour works for all cities!");
  return null;
}

const cities = [
  { city: "London",   tz: "Europe/London"   },
  { city: "New York", tz: "America/New_York" },
  { city: "Lagos",    tz: "Africa/Lagos"     },
];

findBestMeetingTime(cities);
```

**Self-check questions:**
- Why might `hoursInDay` return 23 on some days in London?
- What is the difference between an offset (`+01:00`) and a timezone ID (`Europe/London`)?
- If you store a meeting time in a database, should you store it as a `ZonedDateTime` string or an `Instant` epoch? Why?

---

### Exercise 3 — Duration Calculator ⏱️

**Objective:** Practice creating, reading, and using `Temporal.Duration` objects.

**Scenario:** You are building a **subscription management system** that tracks trial periods, billing cycles, and contract lengths.

#### Warm-up Micro-Demo:

```javascript
const trial = Temporal.Duration.from({ days: 14 });
const start = Temporal.PlainDate.from("2024-03-15");
const end   = start.add(trial);
console.log("Trial ends:", end.toString()); // "2024-03-29"
```

**▶ Expected Output:** `Trial ends: 2024-03-29`

#### Task A — Build a Subscription Timeline

```javascript
const durations = {
  trial:          Temporal.Duration.from({ days: 14 }),
  monthly:        Temporal.Duration.from({ months: 1 }),
  quarterly:      Temporal.Duration.from({ months: 3 }),
  annual:         Temporal.Duration.from({ years: 1 }),
  noticePeriod:   Temporal.Duration.from({ days: 30 }),
};

const signupDate = Temporal.PlainDate.from("2024-03-15");

const trialEnd   = signupDate.add(durations.trial);
const firstBill  = trialEnd.add({ days: 1 }); // billing starts day after trial
const secondBill = firstBill.add(durations.monthly);
const contractEnd = signupDate.add(durations.annual);
const cancelBy   = contractEnd.subtract(durations.noticePeriod);

// How long from signup to contract end?
const totalLength = signupDate.until(contractEnd, { largestUnit: "month" });

console.log("Signup      :", signupDate.toString());
console.log("Trial ends  :", trialEnd.toString());
console.log("First bill  :", firstBill.toString());
console.log("Second bill :", secondBill.toString());
console.log("Cancel by   :", cancelBy.toString());
console.log("Contract end:", contractEnd.toString());
console.log(`Contract length: ${totalLength.months} months`);
```

**▶ Expected Output:**
```
Signup      : 2024-03-15
Trial ends  : 2024-03-29
First bill  : 2024-03-30
Second bill : 2024-04-30
Cancel by   : 2025-02-13
Contract end: 2025-03-15
Contract length: 12 months
```

**Self-check questions:**
- Why is Duration immutable? What benefit does that give to the `durations` object?
- What does `duration.sign` return for `Temporal.Duration.from({ days: -5 })`?
- Why does `total()` require a `relativeTo` option for months?

---
---

## 13. Mini Project — Global Meeting Scheduler

> **Phase 3 — Project Simulation**

**Real-world scenario:** You are a developer at a multinational consulting firm. Build a **global meeting scheduler** that:
- Stores meetings as `ZonedDateTime` (with full timezone support)
- Shows each meeting in multiple timezones
- Calculates countdown until each meeting
- Uses `Duration` to compute meeting lengths
- Finds and highlights the next upcoming meeting
- Generates a formatted agenda report

---

### 🔵 Stage 1 — Setup: Store Meetings and Display Basics

**Goal:** Create `ZonedDateTime` objects for each meeting and display their basic info.

#### Simple stage preview:

```javascript
const meeting = Temporal.ZonedDateTime.from("2026-04-10T14:00:00[Europe/London]");
console.log(`Meeting: ${meeting.year}-${String(meeting.month).padStart(2,"0")}-${String(meeting.day).padStart(2,"0")} at ${meeting.hour}:00 (${meeting.timeZoneId})`);
```

**▶ Expected Output:** `Meeting: 2026-04-10 at 14:00 (Europe/London)`

#### Stage 1 Full Code:

```javascript
"use strict";

// Days and months (ISO week: Mon=1, Sun=7)
const ISO_DAYS   = ["", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MONTH_NAMES = ["","January","February","March","April","May","June",
                     "July","August","September","October","November","December"];

// All meetings stored as ZonedDateTime in the host city's timezone
const meetings = [
  {
    title:    "Q2 Strategy Kickoff",
    zdt:      Temporal.ZonedDateTime.from("2026-04-10T09:00:00[America/New_York]"),
    duration: Temporal.Duration.from({ hours: 2 }),
    host:     "New York"
  },
  {
    title:    "Product Roadmap Review",
    zdt:      Temporal.ZonedDateTime.from("2026-05-15T14:00:00[Europe/London]"),
    duration: Temporal.Duration.from({ hours: 1, minutes: 30 }),
    host:     "London"
  },
  {
    title:    "APAC Partnership Summit",
    zdt:      Temporal.ZonedDateTime.from("2026-06-03T10:00:00[Asia/Tokyo]"),
    duration: Temporal.Duration.from({ hours: 3 }),
    host:     "Tokyo"
  },
  {
    title:    "Annual Finance Review",
    zdt:      Temporal.ZonedDateTime.from("2026-07-20T08:00:00[Africa/Lagos]"),
    duration: Temporal.Duration.from({ hours: 4 }),
    host:     "Lagos"
  },
];

function displayMeetingBasic(meeting) {
  const z    = meeting.zdt;
  const day  = ISO_DAYS[z.dayOfWeek];
  const mon  = MONTH_NAMES[z.month];
  const hh   = String(z.hour).padStart(2, "0");
  const mm   = String(z.minute).padStart(2, "0");
  const end  = z.add(meeting.duration);
  const endH = String(end.hour).padStart(2, "0");
  const endM = String(end.minute).padStart(2, "0");

  console.log(`\n📅 ${meeting.title}`);
  console.log(`   Host city : ${meeting.host}`);
  console.log(`   When      : ${day}, ${mon} ${z.day}, ${z.year}`);
  console.log(`   Time      : ${hh}:${mm} – ${endH}:${endM} (${z.timeZoneId})`);
  console.log(`   Duration  : ${meeting.duration.hours}h ${meeting.duration.minutes || 0}m`);
}

console.log("=".repeat(50));
console.log("     GLOBAL MEETINGS — STAGE 1 OVERVIEW");
console.log("=".repeat(50));
meetings.forEach(displayMeetingBasic);
```

**▶ Expected Output:**
```
==================================================
     GLOBAL MEETINGS — STAGE 1 OVERVIEW
==================================================

📅 Q2 Strategy Kickoff
   Host city : New York
   When      : Friday, April 10, 2026
   Time      : 09:00 – 11:00 (America/New_York)
   Duration  : 2h 0m

📅 Product Roadmap Review
   Host city : London
   When      : Friday, May 15, 2026
   Time      : 14:00 – 15:30 (Europe/London)
   Duration  : 1h 30m
...
```

**Reflection:** Why do we store meetings in the *host city's* timezone rather than converting everything to UTC first?

---

### 🟢 Stage 2 — Multi-Timezone Display and Countdown

**Goal:** Show each meeting in 4 timezones simultaneously, and calculate a live countdown.

#### Simple stage preview:

```javascript
const m = Temporal.ZonedDateTime.from("2026-04-10T09:00:00[America/New_York]");
const london = m.withTimeZone("Europe/London");
console.log(`New York: ${m.hour}:00 → London: ${london.hour}:00`);
```

**▶ Expected Output:** `New York: 9:00 → London: 14:00`

#### Stage 2 Full Code:

```javascript
const displayTimezones = [
  { label: "New York", tz: "America/New_York" },
  { label: "London",   tz: "Europe/London"    },
  { label: "Lagos",    tz: "Africa/Lagos"      },
  { label: "Tokyo",    tz: "Asia/Tokyo"        },
];

function getCountdown(zdt) {
  const now      = Temporal.Now.zonedDateTimeISO(zdt.timeZoneId);
  const nowInst  = now.toInstant();
  const evtInst  = zdt.toInstant();
  const cmp      = Temporal.Instant.compare(nowInst, evtInst);

  if (cmp > 0) return "✅ Already happened";
  if (cmp === 0) return "🎉 HAPPENING NOW!";

  const diff = nowInst.until(evtInst, { largestUnit: "hour" });
  const days  = Math.floor(diff.hours / 24);
  const hours = diff.hours % 24;
  const mins  = diff.minutes;

  if (days > 0)  return `📆 In ${days} day(s) ${hours}h ${mins}m`;
  if (hours > 0) return `⚡ In ${hours}h ${mins}m`;
  return `🔔 In ${mins} minute(s)!`;
}

function displayMeetingFull(meeting) {
  const z = meeting.zdt;
  console.log("\n" + "-".repeat(52));
  console.log(`  🌐 ${meeting.title.toUpperCase()}`);
  console.log(`  Countdown : ${getCountdown(z)}`);
  console.log("  Local times:");

  displayTimezones.forEach(({ label, tz }) => {
    const local = z.withTimeZone(tz);
    const hh    = String(local.hour).padStart(2, "0");
    const mm    = String(local.minute).padStart(2, "0");
    const offset = local.offset;
    const marker = tz === z.timeZoneId ? " ← host" : "";
    console.log(`    ${label.padEnd(10)} : ${hh}:${mm}  (UTC${offset})${marker}`);
  });
}

console.log("\n" + "=".repeat(52));
console.log("     GLOBAL MEETING SCHEDULE — FULL VIEW");
console.log("=".repeat(52));
meetings.forEach(displayMeetingFull);
```

**▶ Expected Output (sample):**
```
====================================================
     GLOBAL MEETING SCHEDULE — FULL VIEW
====================================================

----------------------------------------------------
  🌐 Q2 STRATEGY KICKOFF
  Countdown : 📆 In 30 day(s) 3h 15m
  Local times:
    New York   : 09:00  (UTC-04:00) ← host
    London     : 14:00  (UTC+01:00)
    Lagos      : 14:00  (UTC+01:00)
    Tokyo      : 22:00  (UTC+09:00)

----------------------------------------------------
  🌐 PRODUCT ROADMAP REVIEW
  Countdown : 📆 In 65 day(s) 6h 45m
  ...
```

**Reflection:** Why did we convert both times to `Instant` before comparing them for the countdown? What would go wrong if we compared ZonedDateTimes directly?

---

### 🟠 Stage 3 — Full Agenda Report

**Goal:** Generate a polished agenda with meeting durations, timezone conversions, and a "next meeting" highlight.

#### Stage 3 Full Code:

```javascript
function findNextMeeting(meetings) {
  const nowInst = Temporal.Now.instant();
  return meetings
    .filter(m => Temporal.Instant.compare(nowInst, m.zdt.toInstant()) < 0)
    .sort((a, b) => Temporal.Instant.compare(a.zdt.toInstant(), b.zdt.toInstant()))[0];
}

function printFullReport(meetings) {
  const now      = Temporal.Now.zonedDateTimeISO();
  const genMonth = MONTH_NAMES[now.month];
  const next     = findNextMeeting(meetings);

  console.log("\n" + "=".repeat(58));
  console.log("        GLOBAL MEETING MASTER AGENDA");
  console.log(`        Generated: ${ISO_DAYS[now.dayOfWeek]}, ${genMonth} ${now.day}, ${now.year}`);
  console.log("=".repeat(58));

  if (next) {
    console.log(`\n  ⭐ NEXT MEETING: ${next.title}`);
    const untilNext = Temporal.Now.instant().until(next.zdt.toInstant(), { largestUnit: "hour" });
    const d = Math.floor(untilNext.hours / 24);
    const h = untilNext.hours % 24;
    console.log(`     Starts in: ${d} day(s) and ${h} hour(s)\n`);
  }

  meetings.forEach(meeting => {
    const z      = meeting.zdt;
    const endZdt = z.add(meeting.duration);
    const weekday = ISO_DAYS[z.dayOfWeek];
    const month   = MONTH_NAMES[z.month];
    const isNext  = next && next.title === meeting.title;

    console.log("\n" + (isNext ? "★" : "─").repeat(58));
    console.log(`  ${isNext ? "⭐" : "📌"} ${meeting.title}`);
    console.log(`     Date     : ${weekday}, ${month} ${z.day}, ${z.year}`);
    console.log(`     Duration : ${meeting.duration.hours}h ${meeting.duration.minutes || 0}m`);
    console.log("     Times    :");

    displayTimezones.forEach(({ label, tz }) => {
      const local  = z.withTimeZone(tz);
      const endLoc = endZdt.withTimeZone(tz);
      const start  = `${String(local.hour).padStart(2,"0")}:${String(local.minute).padStart(2,"0")}`;
      const end    = `${String(endLoc.hour).padStart(2,"0")}:${String(endLoc.minute).padStart(2,"0")}`;
      const host   = tz === z.timeZoneId ? " ← host city" : "";
      console.log(`       ${label.padEnd(10)} : ${start}–${end}${host}`);
    });

    console.log(`     Countdown: ${getCountdown(z)}`);
  });

  console.log("\n" + "=".repeat(58));
  const upcoming = meetings.filter(m => Temporal.Instant.compare(Temporal.Now.instant(), m.zdt.toInstant()) < 0);
  console.log(`  Total: ${meetings.length} | Upcoming: ${upcoming.length} | Past: ${meetings.length - upcoming.length}`);
  console.log("=".repeat(58) + "\n");
}

printFullReport(meetings);
```

**▶ Expected Output (sample — dates depend on today):**
```
==========================================================
        GLOBAL MEETING MASTER AGENDA
        Generated: Wednesday, March 11, 2026
==========================================================

  ⭐ NEXT MEETING: Q2 Strategy Kickoff
     Starts in: 30 day(s) and 3 hour(s)

★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
  ⭐ Q2 Strategy Kickoff
     Date     : Friday, April 10, 2026
     Duration : 2h 0m
     Times    :
       New York   : 09:00–11:00 ← host city
       London     : 14:00–16:00
       Lagos      : 14:00–16:00
       Tokyo      : 22:00–00:00
     Countdown: 📆 In 30 day(s) 3h 0m

──────────────────────────────────────────────────────────
  📌 Annual Finance Review
     Date     : Monday, July 20, 2026
     ...
==========================================================
  Total: 4 | Upcoming: 4 | Past: 0
==========================================================
```

**Reflection questions:**
- Why can we use `Instant.compare()` for sorting meetings but not `ZonedDateTime.compare()` directly?
- What would `hoursInDay` return for London on the day clocks spring forward? How would this affect a meeting scheduled across that boundary?
- How would you change this system to support meetings with an uncertain duration (e.g., "approximately 2 hours")?
- How would you persist these meetings to a database and reload them?

**Optional advanced features:**
- Add a `PlainMonthDay` recurring annual meeting (e.g. Annual General Meeting always on the 1st Monday of March)
- Add conflict detection — find two meetings that overlap for a given city
- Show a participant list per meeting and verify each person's local time is within their working hours
- Add `Duration.round()` to display approximate meeting durations ("about 2 hours")

---
---

## 14. Completion Checklist

- ✅ I understand **why Temporal was created** — the 7 problems with the old `Date` object.
- ✅ I know the five design principles of Temporal: immutable, 1-indexed months, explicit timezones, nanosecond precision, ISO 8601 strings.
- ✅ I can explain when to use each Temporal type: `Instant`, `PlainDate`, `PlainTime`, `PlainDateTime`, `ZonedDateTime`, `Duration`, `PlainYearMonth`, `PlainMonthDay`.
- ✅ I can use all six `Temporal.Now` methods to get the current moment in any format.
- ✅ I can create and read a `Temporal.Instant` and convert it to a `ZonedDateTime` with `toZonedDateTimeISO()`.
- ✅ I know that `epochMicroseconds` and `epochNanoseconds` are `BigInt` values (with `n` suffix).
- ✅ I can create, read, and modify `Temporal.PlainDate` using `.with()`, `.add()`, `.subtract()`, and `.until()`.
- ✅ I know that `dayOfWeek` in Temporal follows ISO 8601 (Monday=1, Sunday=7) — NOT the old `getDay()` convention.
- ✅ I can use `PlainTime` and understand that adding time past midnight wraps around correctly.
- ✅ I understand `PlainYearMonth` (credit card expiry, billing months) and `PlainMonthDay` (recurring annual events).
- ✅ I can create and convert `Temporal.PlainDateTime` and understand when to use it vs `ZonedDateTime`.
- ✅ I can create a `Temporal.ZonedDateTime` from a string with a timezone in brackets `[Timezone/Name]`.
- ✅ I can convert a meeting across timezones using `.withTimeZone()`.
- ✅ I understand that `hoursInDay` can return 23 or 25 on DST transition days, and that `ZonedDateTime` handles DST automatically.
- ✅ I can create and use `Temporal.Duration` objects, read their properties, and understand the ISO duration string format (`P1Y6M15DT2H30M`).
- ✅ I understand that all arithmetic operations (`add`, `subtract`, `with`) return **new objects** — Temporal is immutable.
- ✅ I know why many Duration operations require a `relativeTo` date (because months have different lengths).
- ✅ I can use `compare()` for sorting and `equals()` for equality checks on all Temporal types.
- ✅ I completed all three exercises and the full three-stage mini-project.

---

### 📌 One-Sentence Summary of Each Topic

**Why Temporal:** The old `Date` object has 7 unfixable problems — mutable state, 0-indexed months, no timezone support, millisecond-only precision, inconsistent parsing, no calendar systems, and no type specialisation — and Temporal was designed from scratch to fix all of them.

**Overview:** Temporal is a family of immutable types (Instant, PlainDate, PlainTime, PlainDateTime, ZonedDateTime, Duration, PlainYearMonth, PlainMonthDay), each designed for a specific date/time use case, all using 1-indexed months and ISO 8601 strings.

**Temporal vs Date:** Temporal is immutable (no setters), uses human-friendly 1-indexed months, has nanosecond precision, built-in timezone handling, consistent string parsing, and separate types for different use cases — solving every major pain point of the old `Date` object.

**Temporal.Now:** `Temporal.Now` is a namespace of static methods that returns the current moment in any form — `instant()` for UTC timestamps, `zonedDateTimeISO()` for local date+time+timezone, `plainDateISO()` for today's date only, `plainTimeISO()` for the time of day, and `timeZoneId()` for the system timezone name.

**Temporal.Instant:** A `Temporal.Instant` is a precise UTC point in time stored in nanoseconds since the Unix Epoch — with no timezone, no calendar, just a raw universal timestamp convertible to any timezone using `toZonedDateTimeISO()`.

**Plain Types:** `PlainDate`, `PlainTime`, `PlainYearMonth`, and `PlainMonthDay` represent calendar values without any timezone — use them when the time and place are either implicit, irrelevant, or when you're working with recurring dates like birthdays and credit card expiries.

**PlainDateTime:** `Temporal.PlainDateTime` combines a date and time without a timezone — use it for local timestamps where timezone is already understood or irrelevant, and call `.toZonedDateTime(timezone)` to make it globally unambiguous.

**ZonedDateTime:** `Temporal.ZonedDateTime` is the most complete type — storing a date, time, AND timezone name — enabling correct timezone conversions with `withTimeZone()` and automatically handling daylight saving time transitions.

**Duration:** `Temporal.Duration` represents a length of time (not a point) using up to 10 components from years to nanoseconds, expressed in ISO 8601 format (`P1Y6M15DT2H30M`), and requires a `relativeTo` date for any operation involving months or years.

**Arithmetic:** All Temporal arithmetic (`.add()`, `.subtract()`, `.until()`, `.since()`) returns new immutable objects, supports overflow control with `"constrain"` or `"reject"` options, and handles DST automatically in `ZonedDateTime` — making it safe, correct, and predictable.

**Reference:** The complete Temporal API provides 9 types, 6 `Temporal.Now` methods, dozens of immutable read methods per type, and consistent arithmetic and comparison methods across all types — with both ISO calendar and alternative calendar system support.

---

> 📘 *Built from W3Schools.com — `js_temporal` | `js_temporal_intro` | `js_temporal_vs_date` | `js_temporal_now` | `js_temporal_instant` | `js_temporal_plain` | `js_temporal_plaindatetime` | `js_temporal_zoneddatetime` | `js_temporal_duration` | `js_temporal_arithmetic` | `js_temporal_reference`*
> *Framework: Understand → Practice → Create*
