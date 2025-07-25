# 📁 logItemsWithIncreasingDelay.js

## 📝 Description

This script logs each item in an array to the console using an **exponentially increasing delay pattern**:  
1 second, 2 seconds, 4 seconds, 8 seconds, etc.  
It uses `async/await` and `setTimeout` wrapped in a Promise to create the delay sequence.

## 🚀 How to Use

1. Open the browser's Developer Console (F12 → Console tab).
2. Paste the code.
3. Call the function with your desired array, for example:

```javascript
logItemsWithIncreasingDelay(["First", "Second", "Third", "Fourth"]);
```

4. Watch the console print each item after increasing delays.

## 📦 Features

- Starts logging after 1 second.
- Doubles the delay each time (`1s`, `2s`, `4s`, `8s`, ...).
- Works with any array (numbers, strings, emojis, etc.).
- Simple to integrate into teaching, demos, or async testing.

## ⏱ Example Timing

If the input is:
```javascript
["🍎", "🍊", "🍌", "🍇"]
```

Then the output will be:
- 🍎 at 1 second
- 🍊 at 3 seconds
- 🍌 at 7 seconds
- 🍇 at 15 seconds

(Each delay includes all previous delays accumulated.)

## 🔧 Source Code

```javascript
async function logItemsWithIncreasingDelay(arr) {
  let delay = 1000;

  for (const item of arr) {
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(item);
    delay *= 2;
  }
}
```