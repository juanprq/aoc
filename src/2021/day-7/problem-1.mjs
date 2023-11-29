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
      cost += Math.abs(i - data[j]);
    }

    if (cost < minCost) {
      minCost = cost;
    }
  }

  return minCost;
}

export const expectedValue = 37;
