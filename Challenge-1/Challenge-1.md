# 📁 findDuplicatesPrompt.js

## 📝 Description

This script allows a user to **find duplicate items** in any array entered via a browser prompt. It’s designed to be copy-pasted and executed directly in the browser's developer console (F12 → Console tab). The user inputs comma-separated values, and the script prints any duplicates found.

## 🚀 How to Use

1. Open any webpage in your browser.
2. Press **F12** to open the Developer Tools.
3. Click on the **Console** tab.
4. Paste the entire code from `findDuplicatesPrompt.js`.
5. Press **Enter** to run.
6. Input items when prompted (e.g. `apple, banana, orange, apple, kiwi, banana`).
7. View the results in the console.

## 📦 Features

- Accepts any type of comma-separated string.
- Automatically trims whitespace from items.
- Outputs a clean list of duplicates.
- Friendly messages for empty or clean input.
- No external libraries required.

## 📌 Example

**Input:**
```
dog, cat, bird, dog, fish, cat
```

**Console Output:**
```
⚠️ Duplicates found: [ 'dog', 'cat' ]
```

**Input with no duplicates:**
```
apple, banana, cherry
```

**Console Output:**
```
✅ No duplicates found.
```

## 🔧 Source Code

```javascript
(function findDuplicatesPrompt() {
  const input = prompt("Enter items separated by commas (e.g., 1,2,3,2,4,1):");

  if (!input) {
    console.log("No input provided.");
    return;
  }

  const array = input.split(',').map(item => item.trim());
  const seen = new Set();
  const duplicates = new Set();

  for (const item of array) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  if (duplicates.size === 0) {
    console.log("✅ No duplicates found.");
  } else {
    console.log("⚠️ Duplicates found:", Array.from(duplicates));
  }
})();
```