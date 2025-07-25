# 📁 areBracketsBalanced.js

## 📝 Description

This JavaScript function determines whether a given string of brackets is **balanced** and **properly nested**. It supports three types of brackets:

- Parentheses `()`
- Square brackets `[]`
- Curly braces `{}`

The function returns `true` if the brackets are correctly opened and closed in the right order; otherwise, it returns `false`.

## 🚀 How to Use

1. Copy the source code below into your JavaScript environment (browser console, Node.js, etc.).
2. Call `areBracketsBalanced()` with a string of brackets.

### Example:

```javascript
areBracketsBalanced("{[]}");      // true
areBracketsBalanced("{(])}");     // false
areBracketsBalanced("([{}])");    // true
areBracketsBalanced("({[)]}");    // false
areBracketsBalanced("");          // true
areBracketsBalanced("}");         // false
```

## 📦 Features

- Validates brackets using a stack-based approach (efficient and clean).
- Supports all major bracket types.
- Ignores strings without brackets or with just one character.
- Can be easily extended to ignore non-bracket characters if needed.

## 🔧 Source Code

```javascript
function areBracketsBalanced(input) {
  const stack = [];
  const bracketPairs = {
    ")": "(",
    "]": "[",
    "}": "{"
  };

  for (const char of input) {
    if (["(", "[", "{"].includes(char)) {
      stack.push(char);
    } else if ([")", "]", "}"].includes(char)) {
      if (stack.pop() !== bracketPairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

## 🛠 Tips

- To ignore non-bracket characters (e.g., `"if (x > y) { return x; }"`), filter the input string to only keep brackets before validating.
- The logic can be adapted for HTML tag validation, XML parsing, etc.