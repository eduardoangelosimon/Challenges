/**
 * Two Eggs Problem Solution
 *
 * Problem: Find the highest floor an egg can be dropped from without breaking,
 * using two eggs with minimum drops in the worst-case scenario.
 */

/**
 * @param {number} floors
 * @param {number} eggs
 * @returns {number}
 */
function twoEggsDP(floors, eggs = 2) {
  const dp = createDPTable(eggs, floors);

  initializeBaseCases(dp, eggs, floors);

  fillDPTable(dp, eggs, floors);

  return dp[eggs][floors];
}

function createDPTable(eggs, floors) {
  return Array(eggs + 1)
    .fill(null)
    .map(() => Array(floors + 1).fill(0));
}

function initializeBaseCases(dp, eggs, floors) {
  for (let floor = 1; floor <= floors; floor++) {
    dp[1][floor] = floor;
  }

  for (let egg = 1; egg <= eggs; egg++) {
    dp[egg][1] = 1;
  }
}

function fillDPTable(dp, eggs, floors) {
  for (let currentEggs = 2; currentEggs <= eggs; currentEggs++) {
    for (let currentFloors = 2; currentFloors <= floors; currentFloors++) {
      dp[currentEggs][currentFloors] = findMinDropsForState(
        dp,
        currentEggs,
        currentFloors
      );
    }
  }
}

function findMinDropsForState(dp, eggs, floors) {
  let minDrops = Infinity;

  for (let dropFloor = 1; dropFloor <= floors; dropFloor++) {
    const worstCaseDrops = calculateWorstCase(dp, eggs, floors, dropFloor);
    minDrops = Math.min(minDrops, worstCaseDrops);
  }

  return minDrops;
}

function calculateWorstCase(dp, eggs, floors, dropFloor) {
  const eggBreaks = dp[eggs - 1][dropFloor - 1];
  const eggSurvives = dp[eggs][floors - dropFloor];

  return 1 + Math.max(eggBreaks, eggSurvives);
}

/**
 * @param {number} floors - Total number of floors
 * @returns {number} Minimum drops needed in worst case
 */
function twoEggsOptimal(floors) {
  return Math.ceil((-1 + Math.sqrt(1 + 8 * floors)) / 2);
}

/**
 *
 * @param {number} floors
 * @returns {number[]}
 */
function getOptimalSequence(floors) {
  const firstDrop = twoEggsOptimal(floors);
  const sequence = [];
  let currentFloor = firstDrop;
  let interval = firstDrop - 1;

  while (currentFloor <= floors) {
    sequence.push(currentFloor);
    currentFloor += interval;
    interval = Math.max(1, interval - 1);
  }

  return sequence;
}

/**
 * @param {number} floors - Total floors in building
 * @param {number} criticalFloor
 * @returns {SimulationResult}
 */

function simulateOptimalStrategy(floors, criticalFloor) {
  const strategy = new TwoEggsStrategy(floors);
  return strategy.findCriticalFloor(criticalFloor);
}

class TwoEggsStrategy {
  constructor(floors) {
    this.floors = floors;
    this.firstDropFloor = twoEggsOptimal(floors);
    this.drops = [];
    this.eggsRemaining = 2;
  }

  findCriticalFloor(criticalFloor) {
    const firstEggResult = this.executeFirstEggStrategy(criticalFloor);

    if (this.eggsRemaining === 1) {
      this.executeSecondEggStrategy(criticalFloor, firstEggResult);
    }

    return this.getResults(criticalFloor);
  }

  executeFirstEggStrategy(criticalFloor) {
    let currentFloor = this.firstDropFloor;
    let interval = this.firstDropFloor - 1;

    while (currentFloor <= this.floors && this.eggsRemaining > 1) {
      this.drops.push(currentFloor);

      if (currentFloor >= criticalFloor) {
        this.eggsRemaining--;
        return {
          lastSafeFloor: this.getLastSafeFloor(),
          brokenFloor: currentFloor,
        };
      }

      currentFloor += interval;
      interval = Math.max(1, interval - 1);
    }

    return null;
  }

  executeSecondEggStrategy(criticalFloor, firstEggResult) {
    if (!firstEggResult) return;

    const { lastSafeFloor, brokenFloor } = firstEggResult;

    for (let floor = lastSafeFloor + 1; floor < brokenFloor; floor++) {
      this.drops.push(floor);

      if (floor >= criticalFloor) {
        break;
      }
    }
  }

  getLastSafeFloor() {
    return this.drops.length > 1 ? this.drops[this.drops.length - 2] : 0;
  }

  getResults(criticalFloor) {
    return {
      totalDrops: this.drops.length,
      dropsSequence: [...this.drops],
      criticalFloorFound: criticalFloor,
      optimalFirstDrop: this.firstDropFloor,
    };
  }
}

function runTest100Floors() {
  const floors = 100;
  console.log("=== Two Eggs Problem - 100 Floors Building ===\n");

  console.log(`Building with ${floors} floors:`);

  const dpResult = twoEggsDP(floors, 2);
  const optimalResult = twoEggsOptimal(floors);

  console.log(`  DP Solution: ${dpResult} drops (worst case)`);
  console.log(`  Optimal Solution: ${optimalResult} drops (worst case)`);

  const sequence = getOptimalSequence(floors);
  console.log(`  Optimal sequence: [${sequence.join(", ")}]`);

  console.log("  Simulation examples:");
  runSimulationExamples100();
}

function runSimulationExamples100() {
  const floors = 100;
  const testCriticalFloors = [10, 50, 90]; // Specific test cases for 100 floors

  testCriticalFloors.forEach((criticalFloor) => {
    const simulation = simulateOptimalStrategy(floors, criticalFloor);
    console.log(
      `    Critical floor ${criticalFloor}: ${simulation.totalDrops} drops ` +
        `[${simulation.dropsSequence.join(", ")}]`
    );
  });

  console.log("\n  Worst Case Scenario:");
  showWorstCaseScenario();
}

function showWorstCaseScenario() {
  const floors = 100;
  const worstCaseCriticalFloor = 13; // Critical floor just below first drop (14)

  console.log(`    Critical floor ${worstCaseCriticalFloor} (worst case):`);

  const simulation = simulateOptimalStrategy(floors, worstCaseCriticalFloor);
  console.log(`      Total drops: ${simulation.totalDrops} drops`);
  console.log(`      Drop sequence: [${simulation.dropsSequence.join(", ")}]`);

  console.log(`      Explanation:`);
  console.log(`        • First egg: 1 drop at floor 14 (breaks)`);
  console.log(
    `        • Second egg: 13 drops (floors 1-13) to find critical floor 13`
  );
  console.log(`        • Total: 1 + 13 = 14 drops (maximum possible)`);
  console.log(
    `        • This proves the algorithm's 14-drop worst case guarantee`
  );
}

function explainStrategy() {
  console.log("=== Strategy Explanation ===\n");

  printStrategyOverview();
  printMathematicalFoundation();
  printConcreteExample();
}

function printStrategyOverview() {
  console.log("The optimal strategy for 2 eggs:");
  console.log(
    "1. First egg: Drop at calculated intervals that decrease by 1 each time"
  );
  console.log(
    "2. If first egg breaks: Use second egg for linear search from last safe floor"
  );
  console.log("3. The intervals are chosen so that worst case is minimized\n");
}

function printMathematicalFoundation() {
  console.log("Mathematical Foundation:");
  console.log("• For n floors, start at floor x where x(x+1)/2 ≥ n");
  console.log("• This ensures that in worst case, we need exactly x drops");
  console.log("• Formula: x = ceil((-1 + sqrt(1 + 8n))/2)\n");
}

function printConcreteExample() {
  const floors = 100;
  const optimalFirst = twoEggsOptimal(floors);
  const sequence = getOptimalSequence(floors);

  console.log(`Example for ${floors} floors:`);
  console.log(
    `• Optimal first drop: Floor ${optimalFirst} (since ${optimalFirst}×${
      optimalFirst + 1
    }/2 = ${(optimalFirst * (optimalFirst + 1)) / 2} ≥ ${floors})`
  );
  console.log(`• Drop sequence: [${sequence.join(", ")}]`);
  console.log(
    `• Worst case: ${optimalFirst} drops (if critical floor is ${
      optimalFirst - 1
    }, we need 1 + ${optimalFirst - 1} = ${optimalFirst} drops)`
  );
}

const moduleExports = {
  // Core algorithms
  twoEggsDP,
  twoEggsOptimal,

  // Utility functions
  simulateOptimalStrategy,
  getOptimalSequence,

  // Demo functions
  runTest100Floors,
  explainStrategy,

  // Helper class
  TwoEggsStrategy,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = moduleExports;
}

if (typeof require !== "undefined" && require.main === module) {
  explainStrategy();
  runTest100Floors();
}
