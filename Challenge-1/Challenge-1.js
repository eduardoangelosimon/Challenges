(function findDuplicatesPrompt() {
  const input = prompt("Enter items separated by commas (e.g., 1,2,3,2,4,1):");

  if (!input) {
    console.log("No input provided.");
    return;
  }

  const array = input.split(",").map((item) => item.trim());
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
