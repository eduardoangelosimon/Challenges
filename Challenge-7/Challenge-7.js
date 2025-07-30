function getMaxValue(carrotTypes, capacity) {
  if (!carrotTypes?.length || capacity <= 0) return 0;

  const dp = new Array(capacity + 1).fill(0);

  for (let cap = 1; cap <= capacity; cap++) {
    for (const carrot of carrotTypes) {
      if (carrot.kg <= cap) {
        dp[cap] = Math.max(dp[cap], dp[cap - carrot.kg] + carrot.price);
      }
    }
  }

  return dp[capacity];
}

function getOptimalSelection(carrotTypes, capacity) {
  if (!carrotTypes?.length || capacity <= 0) return [];

  const dp = new Array(capacity + 1).fill(0);
  const choice = new Array(capacity + 1).fill(-1);

  for (let cap = 1; cap <= capacity; cap++) {
    for (let i = 0; i < carrotTypes.length; i++) {
      const carrot = carrotTypes[i];
      if (carrot.kg <= cap) {
        const value = dp[cap - carrot.kg] + carrot.price;
        if (value > dp[cap]) {
          dp[cap] = value;
          choice[cap] = i;
        }
      }
    }
  }

  const selection = [];
  let remaining = capacity;
  while (remaining > 0 && choice[remaining] !== -1) {
    const chosenCarrot = carrotTypes[choice[remaining]];
    selection.push(chosenCarrot);
    remaining -= chosenCarrot.kg;
  }

  return selection;
}

const examples = [
  {
    name: "Original Example",
    carrotTypes: [
      { kg: 5, price: 100 },
      { kg: 7, price: 150 },
      { kg: 3, price: 70 },
    ],
    capacity: 36,
  },
  {
    name: "High Value Density",
    carrotTypes: [
      { kg: 1, price: 15 },
      { kg: 3, price: 20 },
      { kg: 4, price: 30 },
    ],
    capacity: 10,
  },
  {
    name: "Mixed Efficiency",
    carrotTypes: [
      { kg: 2, price: 12 },
      { kg: 5, price: 32 },
      { kg: 8, price: 40 },
    ],
    capacity: 15,
  },
];

examples.forEach(({ name, carrotTypes, capacity }) => {
  const maxValue = getMaxValue(carrotTypes, capacity);
  const selection = getOptimalSelection(carrotTypes, capacity);
  const totalWeight = selection.reduce((sum, c) => sum + c.kg, 0);

  console.log(`\n${name}:`);
  console.log(`Capacity: ${capacity}kg | Max Value: ${maxValue}`);
  console.log(
    `Selection: ${selection.length} carrots (${totalWeight}kg total)`
  );

  const counts = {};
  selection.forEach((carrot) => {
    const key = `${carrot.kg}kg/$${carrot.price}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  Object.entries(counts).forEach(([type, count]) => {
    console.log(`  ${count}x ${type}`);
  });
});
