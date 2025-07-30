# Challenge 7: Unlimited Carrots Knapsack Problem

## Problem

Find the maximum value achievable with unlimited carrots of different types in a bag with limited weight capacity.

## Solution

Optimized unbounded knapsack using dynamic programming:

- **Time Complexity**: O(capacity × carrot types)
- **Space Complexity**: O(capacity)

## Key Functions

- `getMaxValue(carrotTypes, capacity)` - Returns maximum achievable value
- `getOptimalSelection(carrotTypes, capacity)` - Returns actual carrot selection

## Example Results

### Original Example (36kg capacity)

- Carrot types: [{kg: 5, price: 100}, {kg: 7, price: 150}, {kg: 3, price: 70}]
- **Result**: 840 value using 12x 3kg/$70 carrots
- **Strategy**: Highest value-to-weight ratio (70/3 = 23.33)

### High Value Density (10kg capacity)

- Carrot types: [{kg: 1, price: 15}, {kg: 3, price: 20}, {kg: 4, price: 30}]
- **Result**: 150 value using 10x 1kg/$15 carrots
- **Strategy**: Small, high-value carrots maximize utilization

### Mixed Efficiency (15kg capacity)

- Carrot types: [{kg: 2, price: 12}, {kg: 5, price: 32}, {kg: 8, price: 40}]
- **Result**: 96 value using 3x 5kg/$32 carrots
- **Strategy**: Best balance of value density and capacity utilization
- Input validation
