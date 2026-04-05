---
render_with_liquid: false
title: "JavaScript Typed Arrays, ArrayBuffers, DataView & Atomics"
nav_order: 37
---

> **How to use this tutorial**
> This tutorial covers JavaScript's binary data system — the low-level infrastructure behind image processing, audio, networking, WebAssembly, and shared memory between threads. It's the layer that separates JavaScript from systems-level languages like C and Rust — and increasingly, JavaScript can do what they do.
>
> - **Phase 1 – Comprehension:** Full explanations, every API demonstrated, real-world analogies, thinking questions
> - **Phase 2 – Practice:** Real-world exercises with warm-ups, hints, and self-checks
> - **Phase 3 – Creation:** A full multi-stage project combining all six chapters

---

# TABLE OF CONTENTS
1. [Chapter 1 — Typed Arrays](#chapter-1--typed-arrays)
2. [Chapter 2 — Typed Array Methods](#chapter-2--typed-array-methods)
3. [Chapter 3 — Typed Array Reference](#chapter-3--typed-array-reference)
4. [Chapter 4 — ArrayBuffers](#chapter-4--arraybuffers)
5. [Chapter 5 — DataView](#chapter-5--dataview)
6. [Chapter 6 — Atomics](#chapter-6--atomics)
7. [Phase 2 — Applied Exercises](#phase-2--applied-exercises)
8. [Phase 3 — Project Simulation](#phase-3--project-simulation)
9. [Quiz & Completion Checklist](#quiz--completion-checklist)

---

# CHAPTER 1 — TYPED ARRAYS

## What Is a Typed Array?

A **Typed Array** is a fixed-length, fixed-type view into a block of raw binary memory. Unlike regular JavaScript arrays — which can hold any mix of values (`[1, "hello", true, null]`) and resize freely — a typed array holds only one specific numeric type and never changes size.

**Real-world analogy — a spreadsheet column:**
Imagine a spreadsheet where one column is declared as "integers only, no more than 255". Every cell in that column can only hold a whole number from 0–255. The computer can pack those values tightly together in memory because it knows exactly how big each one is. A regular JS array is like a column with no rules — flexible but wasteful.

---

## 1.1 — Why Typed Arrays Exist: The Performance Problem

Regular JavaScript arrays have a major performance drawback for numerical computation:

```js
// Regular array — each element is a full JavaScript value object
// Every number is stored as a 64-bit float with type metadata
// Elements can be non-contiguous in memory
const nums = [1, 2, 3, 4, 5];

// Operations on regular arrays:
// - Each read/write involves type checking and boxing/unboxing
// - No guarantee of contiguous memory (hard for CPU cache)
// - Can't pass directly to WebGL, WebAssembly, AudioContext, etc.
```

Typed arrays fix all three problems:

| Feature | Regular Array | Typed Array |
|---|---|---|
| Element type | Any mixed type | Fixed single numeric type |
| Memory layout | Non-contiguous, heap-allocated | Contiguous, raw binary buffer |
| Size | Dynamic (can push/pop) | Fixed at creation time |
| Direct API use | Cannot pass to WebGL, WASM etc. | Designed for binary APIs |
| Performance (numeric) | Slower (type checks every element) | Much faster (hardware-level ops) |
| Index access | Bounds-checked JS object | Direct memory offset arithmetic |

**Real-world uses of typed arrays:**

| Domain | Use |
|---|---|
| WebGL / Three.js | Vertex positions, colours, normals (Float32Array) |
| Web Audio API | Audio sample buffers (Float32Array) |
| WebSockets / Fetch | Binary protocol data (Uint8Array) |
| Canvas / Image processing | Pixel RGBA data (Uint8ClampedArray) |
| File reading | Raw file bytes (Uint8Array) |
| WebAssembly | Shared memory with WASM modules |
| Cryptography (SubtleCrypto) | Keys, signatures, encrypted data |
| SharedArrayBuffer + Workers | Shared state between threads |

---

## 1.2 — The Memory Architecture: Buffer + View

Typed arrays use a two-layer architecture:

```
┌─────────────────────────────────────────────┐
│            ArrayBuffer (raw bytes)          │
│  [ 00 ] [ 00 ] [ 00 ] [ 00 ] [ 00 ] [ 00 ] │  ← 6 bytes of raw memory
└────────────────────┬────────────────────────┘
                     │  interpreted by
          ┌──────────┼──────────────┐
          ▼          ▼              ▼
   Int8Array    Uint16Array    Float32Array
   (6 values)   (3 values)     (1.5 values!)
```

The same raw bytes can be viewed as different types simultaneously. The buffer doesn't care — it's just bytes.

---

## 1.3 — Creating Typed Arrays: Three Ways

**Method 1 — Specify a length (fills with zeros):**

```js
const arr = new Int32Array(4);    // 4 elements × 4 bytes = 16 bytes of memory
console.log(arr);                 // Output: Int32Array(4) [0, 0, 0, 0]
console.log(arr.length);          // Output: 4
console.log(arr.byteLength);      // Output: 16  (4 elements × 4 bytes each)
```

**Method 2 — From an array or iterable (copies values in):**

```js
const fromArray = new Uint8Array([10, 20, 30, 255]);
console.log(fromArray);           // Output: Uint8Array(4) [10, 20, 30, 255]

const fromSet = new Float32Array(new Set([1.1, 2.2, 3.3]));
console.log(fromSet);             // Output: Float32Array(3) [1.1, 2.2, 3.3]
```

**Method 3 — From an existing ArrayBuffer (most powerful — shared memory):**

```js
const buffer = new ArrayBuffer(8);   // 8 bytes of raw memory

// Two different views into the SAME 8 bytes:
const int32View  = new Int32Array(buffer);    // 2 elements (8 ÷ 4 bytes each)
const uint8View  = new Uint8Array(buffer);    // 8 elements (8 ÷ 1 byte each)

int32View[0] = 256;    // Write 256 as a 32-bit integer

// The bytes changed — and both views see the change:
console.log(int32View[0]);   // Output: 256
console.log(uint8View[0]);   // Output: 0    ← first byte of 256 in little-endian
console.log(uint8View[1]);   // Output: 1    ← second byte of 256 (0x00 0x01 0x00 0x00)
```

---

## 1.4 — Reading and Writing Elements

Typed arrays use the same index notation as regular arrays:

```js
const scores = new Uint8Array(5);

scores[0] = 95;
scores[1] = 88;
scores[2] = 72;
scores[3] = 100;
scores[4] = 61;

console.log(scores[2]);    // Output: 72
console.log(scores);       // Output: Uint8Array(5) [95, 88, 72, 100, 61]

// Iterate like a regular array:
for (const score of scores) {
  process.stdout.write(score + " ");
}
// Output: 95 88 72 100 61
```

---

## 1.5 — Type Overflow: What Happens at the Boundaries

This is one of the most important concepts for typed arrays. Each type can only hold values within its range. What happens when you exceed the range depends on the type:

**Unsigned integers wrap around (modular arithmetic):**

```js
const u8 = new Uint8Array(1);   // Range: 0 to 255

u8[0] = 255;
console.log(u8[0]);   // Output: 255

u8[0] = 256;          // 256 mod 256 = 0 (wraps to 0)
console.log(u8[0]);   // Output: 0

u8[0] = 257;          // 257 mod 256 = 1
console.log(u8[0]);   // Output: 1

u8[0] = -1;           // -1 mod 256 = 255
console.log(u8[0]);   // Output: 255
```

**Signed integers also wrap (two's complement):**

```js
const i8 = new Int8Array(1);   // Range: -128 to 127

i8[0] = 127;
console.log(i8[0]);   // Output: 127

i8[0] = 128;          // Wraps to -128
console.log(i8[0]);   // Output: -128

i8[0] = 129;          // Wraps to -127
console.log(i8[0]);   // Output: -127
```

**`Uint8ClampedArray` clamps instead of wrapping (used for pixel data):**

```js
const clamped = new Uint8ClampedArray(3);

clamped[0] = 300;    // Clamped to 255 (max)
clamped[1] = -50;    // Clamped to 0 (min)
clamped[2] = 128;    // In range — stays 128

console.log(clamped);   // Output: Uint8ClampedArray(3) [255, 0, 128]
```

> 💡 **Why `Uint8ClampedArray` for pixels?** An RGBA pixel has each channel (red, green, blue, alpha) stored as a value 0–255. If a calculation produces 300 (which could happen when brightening an image), you want 255 (full brightness), not 44 (the wrapped value). Clamping is the correct behaviour for colour channels.

> 🤔 **Thinking question:** What would happen if pixel processing used `Uint8Array` instead of `Uint8ClampedArray` for an image brightening operation? What visual artefact would result?

---

## 1.6 — Key Properties of Typed Arrays

```js
const arr = new Float32Array(10);

console.log(arr.length);         // Output: 10  — number of elements
console.log(arr.byteLength);     // Output: 40  — total bytes (10 × 4 bytes per float32)
console.log(arr.byteOffset);     // Output: 0   — starting byte offset within the buffer
console.log(arr.BYTES_PER_ELEMENT); // Output: 4  — bytes per element (Float32 = 4)
console.log(arr.buffer);         // Output: ArrayBuffer { byteLength: 40 }
console.log(arr.buffer === arr.buffer); // Output: true — reference to underlying buffer
```

| Property | Type | Description |
|---|---|---|
| `.length` | number | Number of elements |
| `.byteLength` | number | Total bytes occupied |
| `.byteOffset` | number | Byte offset from start of buffer |
| `.BYTES_PER_ELEMENT` | number | Bytes per single element |
| `.buffer` | ArrayBuffer | The underlying raw memory |

---

---

# CHAPTER 2 — TYPED ARRAY METHODS

---

## Overview

Typed arrays share most of the regular `Array` methods — but with important constraints. They always return a new typed array of the **same type** (not a regular array), and they operate on fixed-size contiguous memory.

---

## 2.1 — `set()` — Bulk Copy Into a Typed Array

`set(array, offset?)` copies values from any array or typed array into this typed array, starting at the optional offset:

```js
const dest = new Uint8Array(8);

dest.set([10, 20, 30, 40]);         // Copy to positions 0–3
console.log(dest);
// Output: Uint8Array(8) [10, 20, 30, 40, 0, 0, 0, 0]

dest.set([50, 60], 4);              // Copy to positions 4–5 (offset = 4)
console.log(dest);
// Output: Uint8Array(8) [10, 20, 30, 40, 50, 60, 0, 0]

// Efficient bulk copy from another typed array:
const src  = new Uint8Array([1, 2, 3]);
const dest2 = new Uint8Array(6);
dest2.set(src, 3);
console.log(dest2);
// Output: Uint8Array(6) [0, 0, 0, 1, 2, 3]
```

> 💡 **`set()` is highly optimised.** When copying between typed arrays of the same type, it uses `memcpy` at the C level — the fastest possible byte copy. Use it instead of element-by-element assignment whenever you need bulk data transfer.

---

## 2.2 — `subarray()` — Create a View Without Copying

`subarray(begin, end?)` returns a new typed array that views a slice of the **same underlying buffer**. No data is copied.

```js
const full = new Uint8Array([10, 20, 30, 40, 50, 60, 70, 80]);

const slice = full.subarray(2, 5);   // Elements at index 2, 3, 4
console.log(slice);   // Output: Uint8Array(3) [30, 40, 50]

// Modifying the subarray modifies the original:
slice[0] = 99;
console.log(full);
// Output: Uint8Array(8) [10, 20, 99, 40, 50, 60, 70, 80]  ← position 2 changed!
```

**`subarray()` vs `slice()` — crucial distinction:**

```js
const arr = new Uint8Array([1, 2, 3, 4, 5]);

const sub   = arr.subarray(1, 4);  // View — same buffer, no copy
const copy  = arr.slice(1, 4);     // Copy — new buffer

sub[0] = 99;
copy[0] = 77;

console.log(arr[1]);   // Output: 99  ← subarray mutation visible
console.log(arr[1]);   // Output: 99  ← copy mutation NOT visible
```

| Method | Copies data? | Shares buffer? | Modifying affects original? |
|---|---|---|---|
| `subarray(start, end)` | ❌ No | ✅ Yes | ✅ Yes |
| `slice(start, end)` | ✅ Yes | ❌ No | ❌ No |

---

## 2.3 — `copyWithin()` — Copy Within the Same Array

Copies a section of the array to another position within the same array:

```js
const arr = new Uint8Array([1, 2, 3, 4, 5, 6]);

// copyWithin(target, start, end?)
// Copy elements at [1,3) to position 3:
arr.copyWithin(3, 1, 3);
console.log(arr);   // Output: Uint8Array(6) [1, 2, 3, 2, 3, 6]
//                                                      ↑   ↑
//                                             positions 3,4 got values from positions 1,2
```

**Real-world use:** Scrolling a circular buffer — instead of allocating new memory, shift data within the existing buffer.

---

## 2.4 — `fill()` — Fill With a Value

```js
const arr = new Int32Array(5);
arr.fill(7);                     // Fill all with 7
console.log(arr);   // Output: Int32Array(5) [7, 7, 7, 7, 7]

arr.fill(0, 2, 4);               // Fill positions 2–3 with 0
console.log(arr);   // Output: Int32Array(5) [7, 7, 0, 0, 7]
```

---

## 2.5 — Iteration Methods (Shared with Array)

All standard array iteration methods work on typed arrays and return **typed arrays of the same type**:

```js
const pixels = new Uint8Array([100, 150, 200, 250]);

// map — transform each element (returns same typed array type):
const brightened = pixels.map(p => Math.min(255, p + 50));
console.log(brightened);   // Output: Uint8Array(4) [150, 200, 250, 255]

// filter — select elements (returns same typed array type):
const bright = pixels.filter(p => p > 150);
console.log(bright);   // Output: Uint8Array(2) [200, 250]

// reduce — aggregate:
const total = pixels.reduce((sum, p) => sum + p, 0);
console.log(total);    // Output: 700

// find / findIndex:
const first  = pixels.find(p => p > 180);
const firstI = pixels.findIndex(p => p > 180);
console.log(first, firstI);   // Output: 200  2

// every / some:
console.log(pixels.every(p => p > 0));    // Output: true
console.log(pixels.some(p => p > 240));   // Output: true

// forEach:
pixels.forEach((val, idx) => console.log(`[${idx}]: ${val}`));
```

> ⚠️ **`map()` on a typed array returns a typed array, not a regular array.** `Uint8Array.map(fn)` returns a `Uint8Array`. If the mapping function returns fractional values, they'll be truncated. Use `Array.from(typedArr).map(fn)` if you need a regular array back.

---

## 2.6 — `from()` and `of()` — Static Creation Methods

```js
// TypedArray.from() — like Array.from, with an optional map function:
const doubled = Int16Array.from([1, 2, 3, 4, 5], x => x * 2);
console.log(doubled);   // Output: Int16Array(5) [2, 4, 6, 8, 10]

// TypedArray.of() — create from arguments:
const vals = Float32Array.of(1.1, 2.2, 3.3);
console.log(vals);   // Output: Float32Array(3) [1.1, 2.2, 3.3]
```

---

## 2.7 — Sorting Typed Arrays

```js
const nums = new Int16Array([40, -10, 5, 100, -3]);
nums.sort();
console.log(nums);   // Output: Int16Array(5) [-10, -3, 5, 40, 100]

// Custom comparator:
const desc = new Int16Array([40, -10, 5, 100, -3]);
desc.sort((a, b) => b - a);
console.log(desc);   // Output: Int16Array(5) [100, 40, 5, -3, -10]
```

> 💡 **Unlike regular arrays, typed array numeric sort is correct by default.** Regular `Array.sort()` uses lexicographic (string) order unless given a comparator — `[10, 9, 80].sort()` gives `[10, 80, 9]`. Typed arrays always sort numerically.

---

## 2.8 — Conversion Methods

```js
const arr = new Float32Array([1.5, 2.7, 3.14]);

// To regular array:
const regular = Array.from(arr);
console.log(regular);   // Output: [1.5, 2.700000047683716, 3.140000104904175]
// Note: Float32 has limited precision — values are approximate

// To string:
console.log(arr.join(" | "));   // Output: 1.5 | 2.700000047683716 | 3.1400001049...
console.log(arr.toString());    // Output: 1.5,2.700000047683716,3.1400001049...
```

---

---

# CHAPTER 3 — TYPED ARRAY REFERENCE

---

## 3.1 — All Typed Array Types

| Constructor | Element Size | Value Range | Description |
|---|---|---|---|
| `Int8Array` | 1 byte | −128 to 127 | 8-bit signed integer |
| `Uint8Array` | 1 byte | 0 to 255 | 8-bit unsigned integer |
| `Uint8ClampedArray` | 1 byte | 0 to 255 (clamped) | 8-bit unsigned, clamped at boundaries |
| `Int16Array` | 2 bytes | −32,768 to 32,767 | 16-bit signed integer |
| `Uint16Array` | 2 bytes | 0 to 65,535 | 16-bit unsigned integer |
| `Int32Array` | 4 bytes | −2,147,483,648 to 2,147,483,647 | 32-bit signed integer |
| `Uint32Array` | 4 bytes | 0 to 4,294,967,295 | 32-bit unsigned integer |
| `Float32Array` | 4 bytes | ~±3.4 × 10³⁸ | 32-bit IEEE 754 float |
| `Float64Array` | 8 bytes | ~±1.8 × 10³⁰⁸ | 64-bit IEEE 754 float (JS `number`) |
| `BigInt64Array` | 8 bytes | −2⁶³ to 2⁶³−1 | 64-bit signed BigInt |
| `BigUint64Array` | 8 bytes | 0 to 2⁶⁴−1 | 64-bit unsigned BigInt |

---

## 3.2 — Choosing the Right Type

| Use Case | Best Type | Why |
|---|---|---|
| Pixel/colour data | `Uint8ClampedArray` | 0–255 per channel, clamping prevents artefacts |
| Raw bytes (network, file) | `Uint8Array` | Standard byte representation |
| Audio samples | `Float32Array` | Normalised −1.0 to 1.0 range |
| 3D vertex data (WebGL) | `Float32Array` | GPU expects 32-bit floats |
| Indices (3D meshes) | `Uint16Array` or `Uint32Array` | Counts of vertices; 16-bit for small meshes |
| General integer computation | `Int32Array` | Good range, no surprises |
| High-precision calculation | `Float64Array` | Same as JS `number` |
| 64-bit integer IDs | `BigInt64Array` | When IDs exceed 2⁵³ |

---

## 3.3 — Static Properties

```js
console.log(Int8Array.BYTES_PER_ELEMENT);      // Output: 1
console.log(Float32Array.BYTES_PER_ELEMENT);   // Output: 4
console.log(Float64Array.BYTES_PER_ELEMENT);   // Output: 8

console.log(Int8Array.name);    // Output: Int8Array
```

---

## 3.4 — Complete Instance Method Reference

| Method | Description | Returns |
|---|---|---|
| `set(array, offset?)` | Bulk copy values from array into this | `undefined` |
| `subarray(begin?, end?)` | New view of slice — same buffer | TypedArray |
| `slice(begin?, end?)` | New typed array with copied data | TypedArray |
| `copyWithin(target, start, end?)` | Copy elements within array | TypedArray |
| `fill(value, start?, end?)` | Fill with a constant value | TypedArray |
| `sort(compareFn?)` | Sort in-place | TypedArray |
| `reverse()` | Reverse in-place | TypedArray |
| `indexOf(value, fromIndex?)` | First index of value | number |
| `lastIndexOf(value, fromIndex?)` | Last index of value | number |
| `includes(value, fromIndex?)` | Whether value exists | boolean |
| `find(predicate)` | First matching element | element or `undefined` |
| `findIndex(predicate)` | Index of first match | number |
| `every(predicate)` | All elements satisfy? | boolean |
| `some(predicate)` | Any element satisfies? | boolean |
| `forEach(callback)` | Iterate without return | `undefined` |
| `map(callback)` | Transform each element | TypedArray (same type) |
| `filter(predicate)` | Keep matching elements | TypedArray (same type) |
| `reduce(callback, initial?)` | Aggregate to single value | any |
| `reduceRight(callback, initial?)` | Aggregate from right | any |
| `join(separator?)` | Concatenate as string | string |
| `keys()` | Iterator over indices | Iterator |
| `values()` | Iterator over values | Iterator |
| `entries()` | Iterator over [index, value] pairs | Iterator |
| `at(index)` | Element at index (supports negative) | element |

---

---

# CHAPTER 4 — ARRAYBUFFERS

---

## What Is an ArrayBuffer?

An **`ArrayBuffer`** is a fixed-size block of raw binary memory. It is the actual storage — the bytes themselves. You cannot read from or write to an `ArrayBuffer` directly. You must create a **view** (a Typed Array or DataView) to interact with its contents.

**Real-world analogy — a warehouse floor:**
The `ArrayBuffer` is an empty warehouse floor. You can't do anything with just the floor. To work in the warehouse, you need to define zones: "Zone A is for boxes (Int32Array), Zone B is for envelopes (Uint8Array)." The zones are views — they define how to interpret the space.

---

## 4.1 — Creating an ArrayBuffer

```js
const buffer = new ArrayBuffer(16);   // Allocate 16 bytes of memory

console.log(buffer.byteLength);       // Output: 16
console.log(buffer instanceof ArrayBuffer);  // Output: true
```

The buffer is zeroed out automatically — all bytes start as `0x00`.

> ⚠️ **`ArrayBuffer` size is fixed at creation.** You cannot resize it after the fact. If you need more space, you must create a new (larger) buffer and copy the data.

---

## 4.2 — ArrayBuffer Is Not Directly Readable

```js
const buffer = new ArrayBuffer(4);
console.log(buffer[0]);   // Output: undefined  ← can't read directly!

// You must create a view:
const view = new Uint8Array(buffer);
view[0] = 42;
console.log(view[0]);     // Output: 42
```

---

## 4.3 — Multiple Views on the Same Buffer

The same `ArrayBuffer` can be viewed through multiple typed arrays simultaneously. They all share the same underlying bytes:

```js
const buffer = new ArrayBuffer(4);   // 4 bytes

const u8   = new Uint8Array(buffer);    // 4 elements (1 byte each)
const u16  = new Uint16Array(buffer);   // 2 elements (2 bytes each)
const u32  = new Uint32Array(buffer);   // 1 element  (4 bytes each)

// Write a single 32-bit value:
u32[0] = 0x01020304;

// Observe how it's stored in bytes (little-endian on most systems):
console.log(u8[0].toString(16));  // Output: 4  (least significant byte first)
console.log(u8[1].toString(16));  // Output: 3
console.log(u8[2].toString(16));  // Output: 2
console.log(u8[3].toString(16));  // Output: 1  (most significant byte last)

// The 16-bit view sees two 16-bit numbers:
console.log(u16[0].toString(16)); // Output: 304
console.log(u16[1].toString(16)); // Output: 102
```

This illustrates **endianness** — the order in which bytes are stored for multi-byte values.

---

## 4.4 — Endianness Explained

**Endianness** describes whether the **most significant byte** (the "big end") or **least significant byte** (the "little end") is stored first in memory.

```
Value: 0x01020304 (decimal: 16909060)

Big-endian (network byte order):
Byte 0: 01   Byte 1: 02   Byte 2: 03   Byte 3: 04
(most significant first)

Little-endian (most CPUs: x86, ARM):
Byte 0: 04   Byte 1: 03   Byte 2: 02   Byte 3: 01
(least significant first)
```

Most modern CPUs (x86, ARM) use **little-endian**. Network protocols and file formats often use **big-endian** (also called "network byte order"). When reading/writing binary files or network data, you must handle endianness explicitly — this is what `DataView` (Chapter 5) is designed for.

---

## 4.5 — Typed Array Views with Offset

You can create a typed array that starts at a specific byte offset within the buffer:

```js
const buffer = new ArrayBuffer(16);

// First Int32 view — covers bytes 0–3:
const view1 = new Int32Array(buffer, 0, 1);

// Second Int32 view — covers bytes 4–7:
const view2 = new Int32Array(buffer, 4, 1);

// Third Int32 view — covers bytes 8–15:
const view3 = new Int32Array(buffer, 8, 2);

view1[0] = 100;
view2[0] = 200;
view3[0] = 300;
view3[1] = 400;

// Read all through a full view:
const all = new Int32Array(buffer);
console.log(all);   // Output: Int32Array(4) [100, 200, 300, 400]
```

**Constructor signature:** `new TypedArray(buffer, byteOffset?, length?)`

| Parameter | Description |
|---|---|
| `buffer` | The ArrayBuffer to view |
| `byteOffset` | Starting byte (must be aligned to element size) |
| `length` | Number of elements (not bytes!) |

> ⚠️ **Alignment requirement:** `byteOffset` must be a multiple of `BYTES_PER_ELEMENT`. Trying to create `new Int32Array(buffer, 1)` (offset 1 is not a multiple of 4) throws a `RangeError`.

---

## 4.6 — Copying an ArrayBuffer: `slice()`

`ArrayBuffer.prototype.slice(begin, end?)` returns a new `ArrayBuffer` with a **copy** of the bytes:

```js
const original = new ArrayBuffer(8);
const view = new Uint8Array(original);
view.set([1, 2, 3, 4, 5, 6, 7, 8]);

// Copy bytes 2–5:
const copy = original.slice(2, 6);
const copyView = new Uint8Array(copy);
console.log(copyView);   // Output: Uint8Array(4) [3, 4, 5, 6]

// Modifying the copy does NOT affect the original:
copyView[0] = 99;
console.log(view[2]);    // Output: 3  ← original unchanged
```

---

## 4.7 — Transferable ArrayBuffers

In web Workers (parallel threads), `ArrayBuffer` objects can be **transferred** — zero-copy move of ownership from one thread to another:

```js
// Main thread:
const buffer = new ArrayBuffer(1024 * 1024);  // 1MB
const view   = new Uint8Array(buffer);
view.fill(42);

// Transfer to Worker (zero-copy — buffer becomes unusable in main thread):
worker.postMessage({ data: buffer }, [buffer]);   // buffer in transfer list

// After transfer, buffer is detached:
console.log(buffer.byteLength);   // Output: 0  ← detached!
// console.log(view[0]);          // ❌ TypeError: buffer is detached
```

**Transferring** moves the underlying memory to the worker — avoiding the cost of copying 1MB of data. The original thread can no longer access it.

---

## 4.8 — `SharedArrayBuffer` — Shared Memory Between Threads

`SharedArrayBuffer` is a special buffer type that can be **shared** (not just transferred) between the main thread and Workers — both can read and write the same memory simultaneously:

```js
// Main thread:
const shared = new SharedArrayBuffer(4);   // 4 bytes, shared
const view   = new Int32Array(shared);
view[0] = 0;   // Initial value: 0

// Send to Worker (shared — NOT transferred, original still accessible):
worker.postMessage({ buffer: shared });

// Both threads can now read/write view[0] simultaneously
// (Use Atomics for safe concurrent access — see Chapter 6!)
```

> ⚠️ **`SharedArrayBuffer` requires specific HTTP headers** (`Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`) due to Spectre security concerns. These prevent cross-origin timing attacks.

---

---

# CHAPTER 5 — DATAVIEW

---

## What Is DataView?

`DataView` is a flexible, low-level interface for reading and writing multiple numeric types from any byte position in an `ArrayBuffer`, with **explicit control over endianness**. While typed arrays interpret the entire buffer as one homogeneous type, `DataView` lets you read a byte here, a 32-bit float there, a 16-bit integer somewhere else — in any byte order you need.

**Real-world analogy — a multi-format file parser:**
Binary file formats (images, audio files, 3D models) often have headers with mixed types: a 2-byte magic number, a 4-byte integer for file size, a 1-byte version flag, a 4-byte float for a scale factor. `DataView` is the tool for parsing such heterogeneous binary data.

---

## 5.1 — Creating a DataView

```js
const buffer = new ArrayBuffer(16);
const view   = new DataView(buffer);

// Optional offset and length:
const subView = new DataView(buffer, 4, 8);   // Start at byte 4, 8 bytes long
```

---

## 5.2 — Writing Data with DataView

`DataView` provides individual setter methods for every numeric type:

```js
const buffer = new ArrayBuffer(16);
const view   = new DataView(buffer);

view.setUint8(0, 0xFF);               // Write byte 0xFF at byte offset 0
view.setInt16(1, -1000, true);        // Write int16 at offset 1 (little-endian)
view.setInt16(3, -1000, false);       // Write int16 at offset 3 (big-endian)
view.setFloat32(5, 3.14, true);       // Write float32 at offset 5 (little-endian)
view.setUint32(9, 0xDEADBEEF, true);  // Write uint32 at offset 9 (little-endian)
```

**Setter signature:** `view.setTypeName(byteOffset, value, littleEndian?)`

| Parameter | Description |
|---|---|
| `byteOffset` | Byte position to write at (no alignment requirement — unlike typed arrays) |
| `value` | The value to write |
| `littleEndian` | `true` = little-endian, `false` or omitted = big-endian |

---

## 5.3 — Reading Data with DataView

```js
const buffer = new ArrayBuffer(16);
const view   = new DataView(buffer);

// Write some values:
view.setUint8(0, 255);
view.setInt32(1, -1, false);          // Big-endian
view.setFloat64(5, Math.PI, true);    // Little-endian

// Read them back:
console.log(view.getUint8(0));         // Output: 255
console.log(view.getInt32(1, false));  // Output: -1  (big-endian)
console.log(view.getFloat64(5, true)); // Output: 3.141592653589793  (little-endian)
```

**Getter signature:** `view.getTypeName(byteOffset, littleEndian?)`

---

## 5.4 — Complete DataView Method Reference

| Getter | Setter | Bytes Read/Written | Description |
|---|---|---|---|
| `getInt8(offset)` | `setInt8(offset, value)` | 1 | Signed 8-bit integer |
| `getUint8(offset)` | `setUint8(offset, value)` | 1 | Unsigned 8-bit integer |
| `getInt16(offset, le?)` | `setInt16(offset, value, le?)` | 2 | Signed 16-bit integer |
| `getUint16(offset, le?)` | `setUint16(offset, value, le?)` | 2 | Unsigned 16-bit integer |
| `getInt32(offset, le?)` | `setInt32(offset, value, le?)` | 4 | Signed 32-bit integer |
| `getUint32(offset, le?)` | `setUint32(offset, value, le?)` | 4 | Unsigned 32-bit integer |
| `getFloat32(offset, le?)` | `setFloat32(offset, value, le?)` | 4 | 32-bit float |
| `getFloat64(offset, le?)` | `setFloat64(offset, value, le?)` | 8 | 64-bit float (JS `number`) |
| `getBigInt64(offset, le?)` | `setBigInt64(offset, value, le?)` | 8 | 64-bit signed BigInt |
| `getBigUint64(offset, le?)` | `setBigUint64(offset, value, le?)` | 8 | 64-bit unsigned BigInt |

---

## 5.5 — No Alignment Requirement (Key Advantage)

Typed arrays require byte offsets to be aligned to the element size:

```js
const buffer = new ArrayBuffer(8);

// ❌ Typed array at odd offset:
const ta = new Int32Array(buffer, 1);   // RangeError: offset must be multiple of 4

// ✅ DataView at any offset:
const dv = new DataView(buffer);
dv.setInt32(1, 42);   // Perfectly fine — byte offset 1
console.log(dv.getInt32(1));   // Output: 42
```

This makes `DataView` essential for parsing binary formats where fields are not naturally aligned.

---

## 5.6 — Parsing a Binary File Header

A practical example — parsing a hypothetical binary file format:

```js
// Simulate a binary file header:
// Bytes 0–1:  Magic number (0x4A53 = "JS" in ASCII)
// Bytes 2–5:  File version (uint32, big-endian)
// Bytes 6–9:  Data length in bytes (uint32, little-endian)
// Bytes 10–13: Scale factor (float32, little-endian)
// Byte  14:   Flags (uint8 bitmask)

const buffer = new ArrayBuffer(15);
const dv     = new DataView(buffer);

// Write (simulate file creation):
dv.setUint16(0,  0x4A53, false);       // Big-endian magic
dv.setUint32(2,  2,      false);       // Version 2, big-endian
dv.setUint32(6,  1024,   true);        // 1024 bytes of data, little-endian
dv.setFloat32(10, 1.5,   true);        // Scale 1.5x, little-endian
dv.setUint8(14, 0b00000101);           // Flags: bit 0 and bit 2 set

// Read (simulate file parsing):
const magic    = dv.getUint16(0, false);
const version  = dv.getUint32(2, false);
const dataLen  = dv.getUint32(6, true);
const scale    = dv.getFloat32(10, true);
const flags    = dv.getUint8(14);

console.log("Magic:",   magic.toString(16).toUpperCase()); // Output: 4A53
console.log("Version:", version);          // Output: 2
console.log("Data len:",dataLen);           // Output: 1024
console.log("Scale:",   scale);            // Output: 1.5
console.log("Flags:",   flags.toString(2).padStart(8, "0")); // Output: 00000101
console.log("Flag 0 set?", !!(flags & 0b00000001));  // Output: true
console.log("Flag 1 set?", !!(flags & 0b00000010));  // Output: false
console.log("Flag 2 set?", !!(flags & 0b00000100));  // Output: true
```

---

## 5.7 — DataView Properties

```js
const buffer = new ArrayBuffer(32);
const view   = new DataView(buffer, 8, 16);   // Start at byte 8, 16 bytes long

console.log(view.buffer);       // Output: ArrayBuffer { byteLength: 32 }  ← the full buffer
console.log(view.byteOffset);   // Output: 8    ← starting byte
console.log(view.byteLength);   // Output: 16   ← length of this view
```

---

---

# CHAPTER 6 — ATOMICS

---

## What Are Atomics?

`Atomics` is a built-in object that provides **atomic operations** on `SharedArrayBuffer`s — operations that complete fully without being interrupted by other threads. No method can be called with `new`; all methods are static.

**The concurrency problem:**
When multiple threads access shared memory simultaneously, operations that look "simple" in JavaScript are actually multiple CPU instructions. Another thread can interrupt between those instructions, causing **race conditions** — corrupted data from concurrent, interleaved writes.

**Real-world analogy — a shared bank account:**
Imagine two bank tellers (threads) updating the same account simultaneously. Teller 1 reads the balance: £500. Teller 2 reads the balance: £500. Teller 1 adds £100 and writes £600. Teller 2 adds £200 and writes £700. The final balance is £700 — but it should be £800. Both tellers read the same old value before either wrote their update. This is a race condition.

An **atomic operation** is like a single transaction: read, modify, write as one uninterruptible action. No other teller can read or write until the whole operation is done.

---

## 6.1 — When Do You Need Atomics?

Atomics are **only needed with `SharedArrayBuffer`** (shared between threads). Regular `ArrayBuffer` is accessible from only one thread at a time, so no concurrency issues exist.

```js
// Single thread — no atomics needed:
const arr = new Int32Array(new ArrayBuffer(4));
arr[0]++;   // Safe — no other thread can see this

// Multi-thread — atomics required:
const shared = new SharedArrayBuffer(4);
const sarr   = new Int32Array(shared);
// ❌ sarr[0]++ — NOT safe if multiple workers do this simultaneously
// ✅ Atomics.add(sarr, 0, 1)  — safe
```

---

## 6.2 — `Atomics.add()` and `Atomics.sub()` — Atomic Arithmetic

Returns the value **before** the operation:

```js
const shared = new SharedArrayBuffer(4);
const sarr   = new Int32Array(shared);
sarr[0] = 10;

const before = Atomics.add(sarr, 0, 5);   // Atomically: sarr[0] += 5
console.log(before);     // Output: 10   ← value BEFORE the add
console.log(sarr[0]);    // Output: 15   ← value AFTER

const before2 = Atomics.sub(sarr, 0, 3);  // Atomically: sarr[0] -= 3
console.log(before2);    // Output: 15
console.log(sarr[0]);    // Output: 12
```

---

## 6.3 — `Atomics.load()` and `Atomics.store()` — Safe Read and Write

Reading or writing a value with a guaranteed memory fence — no reordering:

```js
const shared = new SharedArrayBuffer(4);
const sarr   = new Int32Array(shared);

Atomics.store(sarr, 0, 42);        // Write 42 atomically
const value = Atomics.load(sarr, 0); // Read atomically
console.log(value);   // Output: 42
```

> 💡 **Why not just use `sarr[0] = 42`?** In a single-threaded context, `sarr[0] = 42` is fine. But in a multi-threaded context, the CPU may reorder memory operations for performance optimisation. `Atomics.store()` includes a **memory fence** that prevents reordering — ensuring other threads see writes in the correct order.

---

## 6.4 — `Atomics.exchange()` — Atomic Set and Return Old Value

Writes a new value and returns the previous value, atomically:

```js
const shared = new SharedArrayBuffer(4);
const sarr   = new Int32Array(shared);
sarr[0] = 100;

const old = Atomics.exchange(sarr, 0, 999);
console.log(old);      // Output: 100  ← previous value
console.log(sarr[0]);  // Output: 999  ← new value
```

**Use case:** Implementing a "take" operation — grab a value and replace it with a sentinel like `0` or `-1`, atomically.

---

## 6.5 — `Atomics.compareExchange()` — The Lock Primitive

This is the most powerful Atomics method — the foundation of lock-free algorithms. It writes a new value **only if** the current value equals an expected value:

```js
Atomics.compareExchange(typedArray, index, expectedValue, replacementValue)
// Returns the ACTUAL value before the operation
// If actual === expected → replaces with replacement → returns expected
// If actual !== expected → does nothing → returns actual
```

```js
const shared = new SharedArrayBuffer(4);
const sarr   = new Int32Array(shared);
sarr[0] = 5;

// Try to change 5 → 10 (should succeed):
const result1 = Atomics.compareExchange(sarr, 0, 5, 10);
console.log(result1);   // Output: 5   ← old value (5 === expected, so swap happened)
console.log(sarr[0]);   // Output: 10  ← updated!

// Try to change 5 → 20 (should fail — current value is 10, not 5):
const result2 = Atomics.compareExchange(sarr, 0, 5, 20);
console.log(result2);   // Output: 10  ← actual value (10 !== 5, so no swap)
console.log(sarr[0]);   // Output: 10  ← unchanged
```

**`compareExchange` for implementing a mutex (lock):**

```js
// Lock convention: 0 = unlocked, 1 = locked

function lock(sarr, index) {
  // Spin until we successfully change 0 → 1 (acquire the lock):
  while (Atomics.compareExchange(sarr, index, 0, 1) !== 0) {
    Atomics.wait(sarr, index, 1);   // Sleep while locked (see 6.7)
  }
}

function unlock(sarr, index) {
  Atomics.store(sarr, index, 0);     // Release the lock
  Atomics.notify(sarr, index, 1);    // Wake one waiting thread
}
```

---

## 6.6 — Bitwise Atomic Operations

Perform bitwise operations atomically — returning the old value:

```js
const shared = new SharedArrayBuffer(4);
const sarr   = new Uint32Array(shared);
sarr[0] = 0b00001111;

// AND — keep only bits that are set in both:
console.log(Atomics.and(sarr, 0, 0b00110011));
console.log(sarr[0].toString(2));   // Output: 11  (0b00001111 & 0b00110011)

sarr[0] = 0b00001111;
// OR — set all bits that are set in either:
console.log(Atomics.or(sarr, 0, 0b00110011));
console.log(sarr[0].toString(2));   // Output: 111111  (0b00001111 | 0b00110011)

sarr[0] = 0b00001111;
// XOR — flip bits that differ:
console.log(Atomics.xor(sarr, 0, 0b00110011));
console.log(sarr[0].toString(2));   // Output: 111100  (0b00001111 ^ 0b00110011)
```

**Real-world use:** Atomic flag manipulation — safely set, clear, or toggle individual bits in a shared flags register without read-modify-write races.

---

## 6.7 — `Atomics.wait()` and `Atomics.notify()` — Thread Synchronisation

These two methods implement a **futex** (fast userspace mutex) — an efficient way for threads to sleep and be woken:

**`Atomics.wait(sarr, index, value, timeout?)`:**
- Checks if `sarr[index] === value`
- If yes: puts the thread to sleep (blocks execution), returns `"ok"` when woken
- If no: returns `"not-equal"` immediately (value already changed)
- If timeout expires: returns `"timed-out"`

```js
// Worker thread code:
const shared = new SharedArrayBuffer(4);
const sarr   = new Int32Array(shared);

// Worker sleeps until sarr[0] is no longer 0:
const result = Atomics.wait(sarr, 0, 0);
// (Thread sleeps here until notify() is called)
console.log("Woken up! Result:", result);   // Output: Woken up! Result: ok
```

**`Atomics.notify(sarr, index, count?)`:**
Wakes up `count` threads waiting on `sarr[index]` (default: wake all):

```js
// Main thread wakes up waiting workers:
Atomics.store(sarr, 0, 1);           // Change the value first
Atomics.notify(sarr, 0, 1);          // Wake 1 waiting thread
```

> ⚠️ **`Atomics.wait()` cannot be called on the main browser thread** — it would block the UI completely. Use it only in Web Workers. The main thread can use `Atomics.waitAsync()` (returns a Promise) instead.

---

## 6.8 — `Atomics.isLockFree()` — Performance Hint

Returns whether atomic operations on a given element size are implemented as truly hardware-atomic operations (vs. a software lock):

```js
console.log(Atomics.isLockFree(1));   // Output: true  — hardware atomic for 1-byte values
console.log(Atomics.isLockFree(2));   // Output: true
console.log(Atomics.isLockFree(4));   // Output: true  — most important (Int32Array)
console.log(Atomics.isLockFree(8));   // Output: true on 64-bit systems, false on 32-bit
```

If `isLockFree(n)` returns `true`, atomic operations on n-byte elements use a single CPU instruction and are very fast. If `false`, they fall back to a slower software mechanism.

---

## 6.9 — Complete Atomics Reference

| Method | Signature | Returns | Description |
|---|---|---|---|
| `add` | `(sarr, i, val)` | Old value | `sarr[i] += val` atomically |
| `sub` | `(sarr, i, val)` | Old value | `sarr[i] -= val` atomically |
| `and` | `(sarr, i, val)` | Old value | `sarr[i] &= val` atomically |
| `or` | `(sarr, i, val)` | Old value | `sarr[i] \|= val` atomically |
| `xor` | `(sarr, i, val)` | Old value | `sarr[i] ^= val` atomically |
| `load` | `(sarr, i)` | Current value | Read with memory fence |
| `store` | `(sarr, i, val)` | Stored value | Write with memory fence |
| `exchange` | `(sarr, i, val)` | Old value | Write and return old value |
| `compareExchange` | `(sarr, i, exp, rep)` | Old value | Replace only if `sarr[i] === exp` |
| `wait` | `(sarr, i, val, timeout?)` | `"ok"` / `"not-equal"` / `"timed-out"` | Sleep until `sarr[i] !== val` |
| `waitAsync` | `(sarr, i, val, timeout?)` | Promise | Async version of wait (main thread) |
| `notify` | `(sarr, i, count?)` | Threads woken | Wake sleeping threads |
| `isLockFree` | `(byteSize)` | boolean | Whether ops are hardware-atomic |

---

---

# PHASE 2 — APPLIED EXERCISES

---

## Exercise 1 — Typed Array Fundamentals: Image Brightness Adjustment

**Objective:** Use `Uint8ClampedArray` to simulate adjusting image brightness without overflow artefacts.

**Scenario:** A photo editing app needs a brighten/darken function that operates directly on pixel data.

**Warm-up mini-example:**

```js
// Simulated 2×2 RGBA image (16 bytes: R G B A for each pixel):
const pixels = new Uint8ClampedArray([
  100, 150, 200, 255,   // Pixel 1: R=100, G=150, B=200, A=255
  50,  80,  120, 255,   // Pixel 2: R=50,  G=80,  B=120, A=255
  200, 210, 220, 255,   // Pixel 3: R=200, G=210, B=220, A=255
  30,  40,  50,  128,   // Pixel 4: R=30,  G=40,  B=50,  A=128
]);
```

**Step-by-step instructions:**

1. Write `brighten(pixels, amount)` that adds `amount` to every R, G, B channel (skipping every 4th byte — alpha). Returns a new `Uint8ClampedArray`. Clamping should prevent overflow.
2. Write `darken(pixels, amount)` that subtracts `amount` from every R, G, B channel.
3. Write `grayscale(pixels)` that converts each pixel to grayscale: `gray = 0.299*R + 0.587*G + 0.114*B`, setting R=G=B=gray.
4. Write `invert(pixels)` that computes `255 - value` for each R, G, B channel.
5. Test each function and confirm values stay within 0–255.

**Hint — iterating only RGB channels (skip alpha every 4th byte):**

```js
for (let i = 0; i < pixels.length; i += 4) {
  pixels[i]     = /* R */;
  pixels[i + 1] = /* G */;
  pixels[i + 2] = /* B */;
  // pixels[i + 3] = alpha — skip this
}
```

**Self-check questions:**
1. What would happen to pixel value 220 when brightened by 50 with `Uint8Array` vs `Uint8ClampedArray`?
2. Why does grayscale use weights 0.299, 0.587, 0.114 rather than simply `(R + G + B) / 3`?

---

## Exercise 2 — ArrayBuffer and Multiple Views: Binary Packet Encoder

**Objective:** Build a binary network packet encoder/decoder using ArrayBuffer with multiple views.

**Scenario:** A multiplayer game sends compact binary packets containing a player ID (uint16), position X (float32), position Y (float32), and health (uint8).

**Packet layout (11 bytes total):**

```
Byte 0–1:  Player ID  (Uint16, little-endian)
Byte 2–5:  Position X (Float32, little-endian)
Byte 6–9:  Position Y (Float32, little-endian)
Byte 10:   Health     (Uint8)
```

**Step-by-step instructions:**

1. Write `encodePlayerPacket(id, x, y, health)` using `DataView` to write each field.
2. Write `decodePlayerPacket(buffer)` using `DataView` to read each field back.
3. Verify round-trip: `decodePlayerPacket(encodePlayerPacket(42, 100.5, -200.75, 87))` returns the original values.
4. Write `encodeBatch(players)` that accepts an array of player objects and packs all their packets into one larger buffer (no gaps between packets).
5. Write `decodeBatch(buffer, playerCount)` to read them all back.

**Expected usage:**

```js
const packet = encodePlayerPacket(42, 100.5, -200.75, 87);
console.log(packet.byteLength);   // Output: 11

const player = decodePlayerPacket(packet);
console.log(player);
// { id: 42, x: 100.5, y: -200.75, health: 87 }
```

**Self-check questions:**
1. Why is `DataView` used here rather than creating multiple typed arrays over the buffer?
2. What is the memory saving of using this 11-byte packet compared to a JSON string like `{"id":42,"x":100.5,"y":-200.75,"health":87}` (25 bytes)?

---

## Exercise 3 — subarray vs slice: Memory-Efficient Ring Buffer

**Objective:** Use `subarray()` (zero-copy view) to implement a ring buffer for streaming data.

**Scenario:** An audio streaming pipeline processes data in 256-sample chunks. A larger 1024-sample buffer holds all chunks, and `subarray` windows are used to process each chunk without copying.

**Step-by-step instructions:**

1. Create a `Float32Array` of 1024 elements (simulating a filled audio buffer).
2. Fill it with sample data: `Math.sin(i * 0.01)` for each element `i`.
3. Write `processChunk(buffer, offset, size)` that returns a `subarray` view for the chunk at `offset`.
4. Process all four 256-element chunks using `processChunk`, computing the RMS (root mean square) value of each chunk: `sqrt(sum(x²) / n)`.
5. Demonstrate that modifying a value through the subarray changes the source buffer.
6. Use `slice()` to create an independent copy of chunk 2. Modify the copy and show the original is unaffected.

**Expected output pattern:**

```
Chunk 0 (bytes 0–255): RMS = 0.707...
Chunk 1 (bytes 256–511): RMS = 0.707...
Chunk 2 (bytes 512–767): RMS = 0.707...
Chunk 3 (bytes 768–1023): RMS = 0.707...
```

**Self-check questions:**
1. How many bytes would be copied total if `slice()` were used for all four chunks instead of `subarray()`?
2. What is the `byteOffset` of the subarray for chunk 3?

---

## Exercise 4 — Atomics: Shared Counter with Worker Threads

**Objective:** Implement a race-condition-safe shared counter using `SharedArrayBuffer` and `Atomics`.

**Scenario:** A file processing pipeline: the main thread spawns 4 worker threads, each processing 250 files. They all increment a shared counter when a file is done. The main thread displays progress.

**Step-by-step instructions (conceptual — implement where Workers are available):**

1. Create `new SharedArrayBuffer(4)` and wrap in `new Int32Array(shared)`.
2. In each worker, loop 250 times: `Atomics.add(sarr, 0, 1)` for each "file processed."
3. In the main thread, poll the counter with `Atomics.load(sarr, 0)` and display progress.
4. Compare with a naive `sarr[0]++` — demonstrate why it can produce wrong totals (race condition).

**The race condition demonstrated (without Atomics):**

```js
// Without Atomics — two workers running simultaneously:
// Worker A reads: sarr[0] = 500
// Worker B reads: sarr[0] = 500  (before A writes!)
// Worker A writes: sarr[0] = 501
// Worker B writes: sarr[0] = 501  (overwrote A's increment!)
// Expected: 502. Actual: 501. One increment was LOST.

// With Atomics.add():
// The read-modify-write is ONE atomic CPU instruction.
// No other thread can interrupt between read and write.
// Result is always exactly 1000 after 4 × 250 increments.
```

**Self-check questions:**
1. Why does `Atomics.wait()` need to be called in a Worker, not the main thread?
2. If `Atomics.isLockFree(4)` returns `false` on a device, does `Atomics.add()` still work correctly? What changes?

---

## Exercise 5 — DataView: BMP File Header Parser

**Objective:** Parse the header of a BMP (bitmap) image file stored in an ArrayBuffer.

**BMP Header structure (first 14 bytes):**

```
Bytes 0–1:  Signature       ("BM" = 0x42 0x4D, Uint8 × 2)
Bytes 2–5:  File size       (Uint32, little-endian)
Bytes 6–7:  Reserved 1      (Uint16)
Bytes 8–9:  Reserved 2      (Uint16)
Bytes 10–13: Pixel data offset (Uint32, little-endian)
```

**DIB Header (next 40 bytes, starting at byte 14):**

```
Bytes 14–17: Header size     (Uint32, little-endian, always 40 for BITMAPINFOHEADER)
Bytes 18–21: Image width     (Int32, little-endian)
Bytes 22–25: Image height    (Int32, little-endian)
Bytes 26–27: Colour planes   (Uint16, little-endian, always 1)
Bytes 28–29: Bits per pixel  (Uint16, little-endian: 1, 4, 8, 24, 32)
```

**Step-by-step instructions:**

1. Create an ArrayBuffer of 54 bytes (header only, no pixel data).
2. Write a function `writeBMPHeader(dv, width, height, bpp)` that fills in all header fields correctly.
3. Write a function `parseBMPHeader(buffer)` using DataView that reads and returns a header object.
4. Round-trip test: write a 640×480 24-bit BMP header, parse it back, verify all fields.

**Self-check questions:**
1. The BMP signature bytes spell "BM". How do you verify this? (`String.fromCharCode(dv.getUint8(0), dv.getUint8(1))`)
2. Why does BMP use little-endian byte order for integers? (Hint: think about which CPU architecture BMP was designed for)

---

---

# PHASE 3 — PROJECT SIMULATION

---

## Project: High-Performance Binary Data Processing Pipeline

**Scenario:** You are building a binary data processing pipeline for a sensor network application. Hundreds of IoT sensors transmit compact binary packets over WebSocket. Your system must:

1. Parse incoming binary packets from multiple sensors
2. Process pixel-level data (simulating sensor image snapshots)
3. Share processing state between a main thread and worker threads safely
4. Encode processed results back into compact binary format for storage
5. Provide a type-safe, validated view layer over raw memory

This project uses all six chapters: Typed Arrays (Ch.1), Methods (Ch.2), Reference (Ch.3), ArrayBuffers (Ch.4), DataView (Ch.5), Atomics (Ch.6).

---

### Stage 1 — Sensor Packet Protocol (DataView + ArrayBuffer)

```js
// --- Sensor packet format (32 bytes) ---
// Byte 0:     Sensor ID       (Uint8)
// Byte 1:     Packet type     (Uint8: 0=status, 1=reading, 2=alert)
// Bytes 2–3:  Sequence number (Uint16, big-endian)
// Bytes 4–7:  Timestamp       (Uint32, little-endian, Unix ms mod 2³²)
// Bytes 8–11: Reading value   (Float32, little-endian)
// Bytes 12–15: Battery level  (Float32, little-endian, 0.0–1.0)
// Bytes 16–19: Temperature    (Float32, little-endian, Celsius)
// Bytes 20–23: Latitude       (Float32, little-endian)
// Bytes 24–27: Longitude      (Float32, little-endian)
// Bytes 28–29: Status flags   (Uint16, little-endian bitmask)
// Bytes 30–31: CRC checksum   (Uint16, big-endian)

const PACKET_SIZE = 32;

const PacketType = Object.freeze({ STATUS: 0, READING: 1, ALERT: 2 });
const StatusFlag = Object.freeze({
  ONLINE:      0b0000000000000001,
  LOW_BATTERY: 0b0000000000000010,
  OVERHEATING: 0b0000000000000100,
  DATA_ERROR:  0b0000000000001000,
});

function encodeSensorPacket(sensor) {
  const buffer = new ArrayBuffer(PACKET_SIZE);
  const dv     = new DataView(buffer);

  dv.setUint8(0,   sensor.id);
  dv.setUint8(1,   sensor.type);
  dv.setUint16(2,  sensor.sequence, false);    // Big-endian sequence
  dv.setUint32(4,  sensor.timestamp, true);    // Little-endian timestamp
  dv.setFloat32(8, sensor.reading,   true);
  dv.setFloat32(12, sensor.battery,  true);
  dv.setFloat32(16, sensor.temperature, true);
  dv.setFloat32(20, sensor.latitude,    true);
  dv.setFloat32(24, sensor.longitude,   true);
  dv.setUint16(28, sensor.flags,     true);

  // Simple checksum: XOR all bytes 0–29:
  let crc = 0;
  const bytes = new Uint8Array(buffer, 0, 30);
  for (const byte of bytes) crc ^= byte;
  dv.setUint16(30, crc, false);   // Big-endian CRC

  return buffer;
}

function decodeSensorPacket(buffer) {
  const dv = new DataView(buffer);

  // Verify CRC:
  let crc = 0;
  const bytes = new Uint8Array(buffer, 0, 30);
  for (const byte of bytes) crc ^= byte;
  const storedCRC = dv.getUint16(30, false);
  if (crc !== storedCRC) throw new Error("CRC mismatch — packet corrupted");

  const flags = dv.getUint16(28, true);

  return {
    id:          dv.getUint8(0),
    type:        dv.getUint8(1),
    sequence:    dv.getUint16(2, false),
    timestamp:   dv.getUint32(4, true),
    reading:     dv.getFloat32(8, true),
    battery:     dv.getFloat32(12, true),
    temperature: dv.getFloat32(16, true),
    latitude:    dv.getFloat32(20, true),
    longitude:   dv.getFloat32(24, true),
    flags,
    isOnline:    !!(flags & StatusFlag.ONLINE),
    lowBattery:  !!(flags & StatusFlag.LOW_BATTERY),
    overheating: !!(flags & StatusFlag.OVERHEATING),
  };
}

// Test:
const packet = encodeSensorPacket({
  id: 7, type: PacketType.READING, sequence: 1024,
  timestamp: Date.now() & 0xFFFFFFFF,
  reading: 23.45, battery: 0.72, temperature: 31.2,
  latitude: 6.5244, longitude: 3.3792,
  flags: StatusFlag.ONLINE
});

const decoded = decodeSensorPacket(packet);
console.log(`Sensor ${decoded.id}: ${decoded.reading.toFixed(2)} @ ${decoded.battery.toFixed(0) * 100}% battery`);
// Output: Sensor 7: 23.45 @ 72% battery
```

---

### Stage 2 — Batch Packet Ring Buffer (TypedArray Methods)

```js
// A circular ring buffer for sensor packets using a single large ArrayBuffer:
class SensorRingBuffer {
  #buffer;
  #view;
  #capacity;
  #writeHead;
  #count;

  constructor(capacity) {
    this.#capacity  = capacity;
    this.#buffer    = new ArrayBuffer(capacity * PACKET_SIZE);
    this.#view      = new Uint8Array(this.#buffer);
    this.#writeHead = 0;
    this.#count     = 0;
  }

  push(packetBuffer) {
    const src    = new Uint8Array(packetBuffer);
    const offset = this.#writeHead * PACKET_SIZE;

    // Use set() for fast bulk copy:
    this.#view.set(src, offset);

    this.#writeHead = (this.#writeHead + 1) % this.#capacity;
    if (this.#count < this.#capacity) this.#count++;
  }

  get(index) {
    if (index >= this.#count) throw new RangeError("Index out of bounds");
    const offset = index * PACKET_SIZE;

    // Return a subarray view — zero copy:
    return this.#buffer.slice(offset, offset + PACKET_SIZE);
  }

  // Get all packets as an array of decoded objects:
  decodeAll() {
    const results = [];
    for (let i = 0; i < this.#count; i++) {
      try {
        results.push(decodeSensorPacket(this.get(i)));
      } catch (e) {
        results.push({ error: e.message, index: i });
      }
    }
    return results;
  }

  get size()     { return this.#count; }
  get isFull()   { return this.#count === this.#capacity; }
  get byteUsed() { return this.#count * PACKET_SIZE; }
}

// Test the ring buffer:
const ringBuffer = new SensorRingBuffer(100);

// Simulate receiving 5 sensor packets:
for (let i = 0; i < 5; i++) {
  const pkt = encodeSensorPacket({
    id: i + 1, type: PacketType.READING, sequence: i,
    timestamp: (Date.now() + i * 1000) & 0xFFFFFFFF,
    reading: 20 + Math.random() * 10,
    battery: 0.5 + Math.random() * 0.5,
    temperature: 25 + Math.random() * 15,
    latitude: 6.5 + Math.random() * 0.1,
    longitude: 3.3 + Math.random() * 0.1,
    flags: StatusFlag.ONLINE
  });
  ringBuffer.push(pkt);
}

console.log(`Buffer size: ${ringBuffer.size} packets (${ringBuffer.byteUsed} bytes)`);
// Output: Buffer size: 5 packets (160 bytes)
```

---

### Stage 3 — Image Processing Pipeline (Uint8ClampedArray)

```js
// Simulate a 32×32 grayscale sensor snapshot as RGBA data:
class SensorImage {
  #pixels;
  #width;
  #height;

  constructor(width, height) {
    this.#width  = width;
    this.#height = height;
    this.#pixels = new Uint8ClampedArray(width * height * 4);
  }

  static fromGrayscaleData(grayData, width, height) {
    const img = new SensorImage(width, height);
    for (let i = 0; i < grayData.length; i++) {
      const px = i * 4;
      img.#pixels[px]     = grayData[i];   // R
      img.#pixels[px + 1] = grayData[i];   // G
      img.#pixels[px + 2] = grayData[i];   // B
      img.#pixels[px + 3] = 255;           // A (fully opaque)
    }
    return img;
  }

  // Apply threshold: pixels above threshold → white, below → black:
  threshold(level) {
    const result = new SensorImage(this.#width, this.#height);
    for (let i = 0; i < this.#pixels.length; i += 4) {
      const gray  = this.#pixels[i];
      const value = gray >= level ? 255 : 0;
      result.#pixels.set([value, value, value, 255], i);
    }
    return result;
  }

  // Brighten by delta (clamping handled automatically by Uint8ClampedArray):
  brighten(delta) {
    const result = new SensorImage(this.#width, this.#height);
    for (let i = 0; i < this.#pixels.length; i += 4) {
      result.#pixels[i]     = this.#pixels[i]     + delta;
      result.#pixels[i + 1] = this.#pixels[i + 1] + delta;
      result.#pixels[i + 2] = this.#pixels[i + 2] + delta;
      result.#pixels[i + 3] = this.#pixels[i + 3];   // Preserve alpha
    }
    return result;
  }

  // Histogram: count pixels in each 0–255 intensity bucket:
  histogram() {
    const hist = new Uint32Array(256);
    for (let i = 0; i < this.#pixels.length; i += 4) {
      hist[this.#pixels[i]]++;   // Count red channel (R=G=B for grayscale)
    }
    return hist;
  }

  // Compute mean intensity:
  meanIntensity() {
    const hist  = this.histogram();
    let total   = 0;
    let pixels  = 0;
    for (let i = 0; i < 256; i++) {
      total  += i * hist[i];
      pixels += hist[i];
    }
    return total / pixels;
  }

  get data()   { return this.#pixels; }
  get width()  { return this.#width; }
  get height() { return this.#height; }
}

// Simulate a sensor snapshot:
const grayValues = new Uint8Array(32 * 32);
for (let i = 0; i < grayValues.length; i++) {
  grayValues[i] = Math.floor(50 + 150 * Math.abs(Math.sin(i * 0.1)));
}

const img = SensorImage.fromGrayscaleData(grayValues, 32, 32);
const brightened = img.brighten(50);
const thresholded = img.threshold(128);

console.log("Original mean:", img.meanIntensity().toFixed(1));
console.log("Brightened mean:", brightened.meanIntensity().toFixed(1));
```

---

### Stage 4 — Shared Processing Stats (SharedArrayBuffer + Atomics)

```js
// Shared statistics counters between main thread and workers.
// Layout (all Int32):
// Index 0: Total packets received
// Index 1: Total packets processed
// Index 2: Total errors
// Index 3: Lock flag (0=unlocked, 1=locked)

const STAT_RECEIVED   = 0;
const STAT_PROCESSED  = 1;
const STAT_ERRORS     = 2;
const LOCK_INDEX      = 3;

class SharedStats {
  #sarr;

  constructor(sharedBuffer) {
    this.#sarr = new Int32Array(sharedBuffer);
  }

  incrementReceived()  { return Atomics.add(this.#sarr, STAT_RECEIVED, 1); }
  incrementProcessed() { return Atomics.add(this.#sarr, STAT_PROCESSED, 1); }
  incrementErrors()    { return Atomics.add(this.#sarr, STAT_ERRORS, 1); }

  getReceived()   { return Atomics.load(this.#sarr, STAT_RECEIVED); }
  getProcessed()  { return Atomics.load(this.#sarr, STAT_PROCESSED); }
  getErrors()     { return Atomics.load(this.#sarr, STAT_ERRORS); }

  getReport() {
    return {
      received:  this.getReceived(),
      processed: this.getProcessed(),
      errors:    this.getErrors(),
      pending:   this.getReceived() - this.getProcessed() - this.getErrors()
    };
  }

  reset() {
    Atomics.store(this.#sarr, STAT_RECEIVED,  0);
    Atomics.store(this.#sarr, STAT_PROCESSED, 0);
    Atomics.store(this.#sarr, STAT_ERRORS,    0);
  }
}

// Simulate processing 20 packets with some errors:
const statsBuffer = new SharedArrayBuffer(4 * 4);   // 4 Int32 values
const stats       = new SharedStats(statsBuffer);

for (let i = 0; i < 20; i++) {
  stats.incrementReceived();

  // Simulate 10% error rate:
  if (Math.random() < 0.1) {
    stats.incrementErrors();
  } else {
    stats.incrementProcessed();
  }
}

const report = stats.getReport();
console.log("\n=== Processing Report ===");
console.log(`Received:  ${report.received}`);
console.log(`Processed: ${report.processed}`);
console.log(`Errors:    ${report.errors}`);
console.log(`Pending:   ${report.pending}`);
```

---

### Stage 5 — Full Pipeline Integration

```js
class SensorPipeline {
  #ringBuffer;
  #stats;
  #imageStore;

  constructor(bufferCapacity = 100) {
    this.#ringBuffer = new SensorRingBuffer(bufferCapacity);
    const statsBuffer = new SharedArrayBuffer(4 * 4);
    this.#stats      = new SharedStats(statsBuffer);
    this.#imageStore = new Map();
  }

  // Accept a raw ArrayBuffer (from WebSocket):
  receivePacket(rawBuffer) {
    this.#stats.incrementReceived();
    try {
      const packet = decodeSensorPacket(rawBuffer);
      this.#ringBuffer.push(rawBuffer);
      this.#stats.incrementProcessed();
      return packet;
    } catch (e) {
      this.#stats.incrementErrors();
      console.warn("Packet decode failed:", e.message);
      return null;
    }
  }

  // Process all buffered packets and generate a status report:
  generateReport() {
    const packets = this.#ringBuffer.decodeAll();
    const valid   = packets.filter(p => !p.error);
    const stats   = this.#stats.getReport();

    // Aggregate by sensor ID:
    const bySensor = new Map();
    for (const packet of valid) {
      if (!bySensor.has(packet.id)) {
        bySensor.set(packet.id, { id: packet.id, count: 0, readings: [] });
      }
      const sensor = bySensor.get(packet.id);
      sensor.count++;
      sensor.readings.push(packet.reading);
    }

    // Compute averages using Float32Array for efficiency:
    const summary = [];
    for (const [id, sensor] of bySensor) {
      const fa  = new Float32Array(sensor.readings);
      const avg = fa.reduce((s, v) => s + v, 0) / fa.length;
      const max = fa.reduce((m, v) => Math.max(m, v), -Infinity);
      const min = fa.reduce((m, v) => Math.min(m, v),  Infinity);
      summary.push({ id, count: sensor.count, avg, max, min });
    }

    return {
      pipeline: stats,
      sensors: summary.sort((a, b) => a.id - b.id),
      bufferUsage: `${this.#ringBuffer.size} / ${this.#ringBuffer.isFull ? "FULL" : "OK"}`
    };
  }
}

// Run the full pipeline:
const pipeline = new SensorPipeline(100);

// Simulate 15 incoming packets from 3 sensors:
for (let seq = 0; seq < 15; seq++) {
  const sensorId = (seq % 3) + 1;
  const buf = encodeSensorPacket({
    id: sensorId, type: PacketType.READING, sequence: seq,
    timestamp: (Date.now() + seq * 100) & 0xFFFFFFFF,
    reading: 20 + sensorId * 5 + Math.sin(seq) * 2,
    battery: 0.8 - seq * 0.01, temperature: 28 + sensorId,
    latitude: 6.5244 + sensorId * 0.01, longitude: 3.3792,
    flags: StatusFlag.ONLINE
  });
  pipeline.receivePacket(buf);
}

const report = pipeline.generateReport();
console.log("\n========= PIPELINE REPORT =========");
console.log("Buffer:", report.bufferUsage);
console.log("Stats:", report.pipeline);
console.log("\nSensor Summaries:");
for (const s of report.sensors) {
  console.log(`  Sensor ${s.id}: ${s.count} readings | avg=${s.avg.toFixed(2)} min=${s.min.toFixed(2)} max=${s.max.toFixed(2)}`);
}
```

---

**Reflection Questions:**

1. The ring buffer uses `Uint8Array.set()` for bulk packet copies. Why is this more efficient than copying with a `for` loop even for small 32-byte packets — and how does the efficiency gain scale with packet size?
2. The `SensorImage` class stores pixel data as `Uint8ClampedArray`. If images needed to be transferred to a Worker for processing, would you use `ArrayBuffer` transfer (detach from main thread) or `SharedArrayBuffer` sharing? What are the trade-offs?
3. The `SharedStats` class uses `Atomics.load()` to read counters and `Atomics.add()` to increment them. If the report generation reads three counters (`received`, `processed`, `errors`) in three separate `Atomics.load()` calls, is the result guaranteed to be a consistent snapshot? What problem could occur, and how would you fix it?
4. The CRC checksum in `encodeSensorPacket` uses XOR across all bytes. What is the computational complexity (`O(n)` where n = packet bytes)? How does using a single `Uint8Array` view over the buffer enable this without any data copying?
5. `Float32Array` is used to aggregate sensor readings in `generateReport`. What precision loss occurs when storing `reading` values (originally JavaScript `number` = Float64) in a `Float32Array`? When does this matter, and when is it acceptable?

---

---

# QUIZ & COMPLETION CHECKLIST

---

## Self-Assessment Quiz

**Q1:** What are the two differences between a `Uint8Array` and a `Uint8ClampedArray`?

**Q2:** What is an `ArrayBuffer`, and why can't you read data directly from it?

**Q3:** What is the difference between `subarray()` and `slice()` on a typed array?

**Q4:** Write code that creates a 12-byte `ArrayBuffer` and reads the 4 bytes at offset 4 as a little-endian `Uint32`.

**Q5:** What is endianness, and why does `DataView` need explicit endianness parameters?

**Q6:** Why do you need `Atomics` when working with `SharedArrayBuffer`? What problem does it solve?

**Q7:** What does `Atomics.compareExchange(sarr, 0, expected, replacement)` do, and when does the swap NOT happen?

**Q8:** What is the difference between transferring an `ArrayBuffer` to a Worker vs using a `SharedArrayBuffer`?

**Q9:** Why does `Uint8Array.map()` return a `Uint8Array` rather than a regular array? What issue could this cause?

**Q10:** In what situations would you choose `DataView` over a typed array for reading from an `ArrayBuffer`?

---

## Answer Key

**A1:** `Uint8Array` wraps on overflow (256 becomes 0, 257 becomes 1, -1 becomes 255). `Uint8ClampedArray` clamps — values above 255 become 255, values below 0 become 0. Both hold values in the range 0–255 for in-range inputs.

**A2:** An `ArrayBuffer` is raw binary memory with no type information. JavaScript cannot know whether bytes represent integers, floats, or characters — that interpretation requires a **view** (typed array or DataView) that defines type, size, and byte offset.

**A3:** `subarray(start, end)` returns a new typed array that **shares the same underlying buffer** — no data is copied, and mutations to the subarray affect the original. `slice(start, end)` returns a new typed array with **a copy of the data** — independent from the original.

**A4:**
```js
const buffer = new ArrayBuffer(12);
const dv     = new DataView(buffer);
dv.setUint32(4, 0xDEADBEEF, true);  // Write something first
console.log(dv.getUint32(4, true).toString(16));  // Read as little-endian Uint32
```

**A5:** Endianness is the byte order for multi-byte values: **little-endian** stores the least significant byte first (most CPUs); **big-endian** stores the most significant byte first (network protocols, some file formats). Typed arrays use the native CPU endianness, which varies by device. `DataView` requires explicit `littleEndian` arguments so code produces consistent results on all platforms.

**A6:** JavaScript is single-threaded normally. With `SharedArrayBuffer`, multiple threads can read/write the same memory simultaneously. A seemingly simple operation like `sarr[0]++` is actually three CPU instructions (load, add, store). Another thread can interrupt between them, causing both threads to read the same old value and each write back a value incremented by 1 — net result: only +1 instead of +2. `Atomics` operations are indivisible — the CPU completes the entire read-modify-write as one uninterruptible unit.

**A7:** `compareExchange` atomically checks if `sarr[0] === expected`. If yes: replaces with `replacement` and returns the old (expected) value. If no: does nothing and returns the current actual value. The swap does NOT happen when the current value differs from `expected` — this is used to implement lock-free algorithms and mutexes.

**A8:** **Transfer** (`postMessage(buf, [buf])`) moves ownership — the original thread can no longer access the buffer (byteLength becomes 0). **SharedArrayBuffer** allows both threads to read/write the same memory simultaneously, requiring `Atomics` for safe access. Transfer is "give it away"; sharing is "both have it at once."

**A9:** TypedArray `map()` returns the same typed array type to preserve the fixed numeric type contract. If the mapping function returns values outside the type's range (e.g., multiplying `Uint8Array` values by 10 can exceed 255), they silently overflow or clamp. Use `Array.from(typedArr).map(fn)` if you need a regular `number` array with no overflow.

**A10:** Use `DataView` when: (1) the buffer contains multiple different numeric types at specific offsets (e.g., file headers, network packets); (2) you need explicit endianness control per field; (3) byte offsets are not aligned to the element size (typed arrays require alignment); (4) you're parsing a binary format defined by an external standard.

---

## Completion Checklist

| # | Requirement | ✓ |
|---|---|---|
| 1 | Can create typed arrays using all three methods (length, iterable, buffer) | ✓ |
| 2 | Understand type overflow: wrapping (Uint8/Int8) vs clamping (Uint8ClampedArray) | ✓ |
| 3 | Can use `set()`, `subarray()`, `slice()`, `fill()`, `copyWithin()` correctly | ✓ |
| 4 | Know when `subarray()` shares memory vs `slice()` copies it | ✓ |
| 5 | Can use all typed array iteration methods: `map`, `filter`, `reduce`, `find` etc. | ✓ |
| 6 | Know all 11 typed array types, their byte sizes, and value ranges | ✓ |
| 7 | Can create an `ArrayBuffer` and access it through multiple views | ✓ |
| 8 | Understand endianness and how it affects multi-byte values | ✓ |
| 9 | Understand the difference between `ArrayBuffer` transfer and `SharedArrayBuffer` | ✓ |
| 10 | Can create a `DataView` and use all getter/setter methods | ✓ |
| 11 | Can parse a multi-type binary format using `DataView` with explicit endianness | ✓ |
| 12 | Understand why `Atomics` is needed for `SharedArrayBuffer` operations | ✓ |
| 13 | Can use `Atomics.add`, `load`, `store`, `exchange`, `compareExchange` | ✓ |
| 14 | Understand `Atomics.wait()` / `notify()` for thread synchronisation | ✓ |
| 15 | Built the full Sensor Pipeline project combining all six chapters | ✓ |

---

## Key Gotchas Summary

| Mistake | Why It Happens | Fix |
|---|---|---|
| Using `Uint8Array` for pixel data | Values above 255 wrap instead of clamp | Use `Uint8ClampedArray` for colour channels |
| Reading `ArrayBuffer` directly | ArrayBuffer has no accessor methods | Create a typed array or DataView view |
| Misaligned typed array offset | `new Int32Array(buf, 1)` — 1 is not a multiple of 4 | Ensure `byteOffset` is multiple of `BYTES_PER_ELEMENT` |
| Assuming same endianness | Typed arrays use native CPU endian — varies by device | Use `DataView` with explicit endian flag for cross-platform |
| Forgetting `subarray` shares memory | Modifying the subarray modifies the source | Use `slice()` for an independent copy |
| Using `sarr[i]++` with SharedArrayBuffer | Non-atomic: read-modify-write can be interrupted | Use `Atomics.add(sarr, i, 1)` |
| Calling `Atomics.wait()` on main thread | Blocks the entire UI | Use `Atomics.waitAsync()` on main thread; `wait()` in Workers only |
| `Float32Array` map returns Float32Array | Values may be truncated to 32-bit float precision | Use `Array.from().map()` for regular number array |
| Forgetting CRC/validation on binary data | Corrupted packets parsed as valid data | Always validate checksums before processing |
| Not storing interval/transfer IDs | Cannot cancel intervals; cannot revoke transfer | Store all IDs; track transferred buffers |

---

## One-Sentence Summary

> JavaScript's binary data system — TypedArrays for fixed-type numerical storage, ArrayBuffers as the raw memory layer, DataView for heterogeneous and endian-aware parsing, and Atomics for race-condition-free shared memory between threads — brings systems-level performance directly into JavaScript for graphics, audio, networking, and parallel computation.

---

*Tutorial generated by AI_TUTORIAL_GENERATOR · Source curriculum: W3Schools JavaScript Binary Data (6 pages)*
