const memo = {};
function calculateMovementCost(x) {
  if (x === 0) return 0;
  if (x === 1) return 1;
  if (memo[x]) return memo[x];

  const result = x + calculateMovementCost(x - 1);
  memo[x] = result;

  return result;
};

export default function(input) {
  let data = input[0]
    .split(',')
    .map(v => parseInt(v, 10));

  // the value should be inside the numbers
  const min = Math.min(...data);
  const max = Math.max(...data);

  let minCost = Infinity;
  for (let i = min; i <= max; i++) {

    let cost = 0;
    for (let j = 0; j < data.length; j++) {
      cost += calculateMovementCost(Math.abs(i - data[j]));
    }

    if (cost < minCost) {
      minCost = cost;
    }
  }

  return minCost;
}

export const expectedValue = 168;
