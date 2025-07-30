# Challenge 5: Two Eggs Problem

## Problem Statement

A building has 100 floors. One of the floors is the highest floor an egg can be dropped from without breaking. If an egg is dropped from above that floor, it will break. If it is dropped from that floor or below, it will be completely undamaged and you can drop the egg again.

**Goal:** Given two eggs, find the highest floor an egg can be dropped from without breaking, with as few drops as possible in the worst-case scenario.

## Solution Approaches

### 1. Dynamic Programming Solution

A general solution that works for any number of eggs and floors using the principle of optimal substructure.

**Recurrence Relation:**

```
dp[i][j] = 1 + min(max(dp[i-1][k-1], dp[i][j-k])) for k = 1 to j
```

**Complexity:**

- Time: O(n²)
- Space: O(n²)

### 2. Optimized Mathematical Solution (2 Eggs Only)

An elegant O(1) solution specifically designed for the two-eggs problem.

**Mathematical Foundation:**

- Choose x such that: x + (x-1) + (x-2) + ... + 1 ≥ n
- This simplifies to: x(x+1)/2 ≥ n
- Solution: `x = ceil((-1 + sqrt(1 + 8n))/2)`

**Complexity:**

- Time: O(1)
- Space: O(1)

## Results for 100 Floors

**Optimal Strategy:**

- First drop: Floor 14 (since 14×15/2 = 105 ≥ 100)
- Drop sequence: [14, 27, 39, 50, 60, 69, 77, 84, 90, 95, 99]
- **Worst case: 14 drops**

**Test Results:**

- Both DP and optimal solutions: 14 drops maximum
- Tested critical floors: 10, 50, 90
- Worst case scenario: Critical floor 13 (requires exactly 14 drops)

## Big O Analysis

| Solution Type        | Time Complexity | Space Complexity | Scalability                             |
| -------------------- | --------------- | ---------------- | --------------------------------------- |
| Dynamic Programming  | O(n²)           | O(n²)            | General solution for any number of eggs |
| Mathematical Formula | O(1)            | O(1)             | Specific to 2 eggs, instant calculation |

**Performance Insight:** The mathematical solution provides the same result as DP but calculates it instantly, demonstrating how mathematical optimization can transform an O(n²) problem into O(1).
