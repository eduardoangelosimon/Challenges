function areBracketsBalanced(input) {
  const stack = [];
  const bracketPairs = {
    ")": "(",
    "]": "[",
    "}": "{",
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
